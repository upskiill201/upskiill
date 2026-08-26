import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

/**
 * Handles reserved for platform routes — a creator can never claim these,
 * otherwise public profile URLs would collide with app routes.
 */
const RESERVED_USERNAMES = new Set([
  'admin', 'api', 'me', 'teyro', 'support', 'help', 'null', 'undefined',
  'creator', 'creators', 'dashboard', 'login', 'signup', 'settings', 'courses',
]);

// Shape of one step's answers coming from the onboarding localStorage payload
interface OnboardingPayload {
  draftId?: string;
  step2?: { creatorType?: string };
  step3?: { categories?: string[] };
  step4?: { audienceSize?: string };
  step5?: { platforms?: string[] };
  step6?: { existingContent?: string[] };
  step7?: { biggestChallenge?: string[] | string };
  step8?: { teachingStyle?: string };
  step9?: { weeklyHours?: string };
  step12?: { courseFormat?: string; launchGoal?: string };
  step13?: { communityOption?: string; bio?: string };
}

/**
 * Shared include for public creator lookups — kept in one place so the
 * exact-match query and the slug-fallback refetch stay identical.
 *
 * Deliberately typed with `satisfies` instead of a `Prisma.UserInclude`
 * return annotation: Prisma can only infer query payload types from the
 * LITERAL include shape. An explicit annotation widens the type and
 * findFirst would silently return the bare User model (no courses/_count).
 */
const creatorInclude = (viewerUserId?: string) =>
  ({
    profile: true,
    instructorProfile: true,
    courses: {
      // PUBLIC endpoint — drafts never leave the creator studio.
      where: { published: true },
      include: {
        sections: {
          include: {
            lessons: {
              select: { id: true, durationMinutes: true },
            },
          },
        },
        reviews: {
          select: { rating: true },
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true,
            sections: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    },
    // Always shaped as an include (a conditional `false` branch would also
    // break payload inference). When there is no viewer we simply filter to
    // nothing — follower ids never equal this sentinel.
    followers: {
      where: viewerUserId ? { followerId: viewerUserId } : { followerId: 'no-viewer' },
    },
    _count: {
      select: {
        followers: true,
        following: true,
        courses: true,
      },
    },
  }) satisfies Prisma.UserInclude;

type CreatorUserPayload = Prisma.UserGetPayload<{
  include: ReturnType<typeof creatorInclude>;
}>;

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  /**
   * Returns the full profile merged with User fields.
   * Used by GET /profile/me and enriched GET /auth/me.
   *
   * Uses an explicit select — never spread the raw User row, which would leak
   * the password hash, verifyToken and lockout counters to the client.
   */
  async getMyProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        role: true,
        isVerified: true,
        hasStudentAccess: true,
        hasCreatorAccess: true,
        whatsappVerified: true,
        createdAt: true,
        profile: true,
        studentProfile: {
          select: {
            xp: true,
            coins: true,
            gems: true,
            lives: true,
            maxLives: true,
            streakDays: true,
            longestStreak: true,
            dailyGoalXp: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const [followersCount, followingCount] = await Promise.all([
      this.prisma.userFollow.count({ where: { followingId: userId } }),
      this.prisma.userFollow.count({ where: { followerId: userId } }),
    ]);

    return {
      ...user,
      followersCount,
      followingCount,
    };
  }

  /**
   * Checks if a @username is available for this user.
   */
  async checkUsernameAvailability(rawUsername: string, userId: string) {
    const username = rawUsername.trim().toLowerCase().replace(/^@/, '');
    if (!username || username.length < 3 || username.length > 30) {
      return { available: false, message: 'Username must be 3-30 characters.' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { available: false, message: 'Only letters, numbers, and underscores.' };
    }
    const existing = await (this.prisma.profile as any).findFirst({
      where: {
        username: { equals: username, mode: 'insensitive' },
        NOT: { userId },
      },
    });
    if (existing) {
      return { available: false, message: 'Username is already taken.' };
    }
    return { available: true, username };
  }

  /**
   * Updates profile and/or user fields in a single transaction.
   * Handles User.fullName, avatarUrl, username checks, all creator profile
   * fields, and student settings (dailyGoalXp → StudentProfile).
   */
  async updateMyProfile(userId: string, dto: UpdateProfileDto) {
    // The global ValidationPipe runs without `whitelist`, so undeclared keys
    // survive onto the instance. creatorStatus is system-controlled ("Founding
    // Creator" etc.) — strip it defensively so no client can grant itself a badge.
    const incoming = dto as UpdateProfileDto & Record<string, unknown>;
    delete incoming.creatorStatus;

    const { fullName, avatarUrl, username, dailyGoalXp, ...profileFields } = incoming;

    // Policy check on the handle (the DTO validates shape; this enforces the rules).
    let cleanUsername: string | null = null;
    if (username !== undefined && username !== null) {
      const candidate = username.trim().toLowerCase().replace(/^@/, '');
      if (candidate) {
        if (candidate.length < 3 || candidate.length > 30) {
          throw new BadRequestException('Username must be 3-30 characters.');
        }
        if (!/^[a-zA-Z0-9_]+$/.test(candidate)) {
          throw new BadRequestException('Usernames can only contain letters, numbers, and underscores.');
        }
        if (RESERVED_USERNAMES.has(candidate)) {
          throw new BadRequestException(`@${candidate} is reserved by Teyro.`);
        }
        cleanUsername = candidate;
      }
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        // 1. Update User fields if provided (never blank out the identity)
        const userUpdates: any = {};
        if (fullName !== undefined && fullName.trim()) userUpdates.fullName = fullName.trim();
        if (avatarUrl !== undefined) userUpdates.avatarUrl = avatarUrl;

        if (Object.keys(userUpdates).length > 0) {
          await tx.user.update({
            where: { id: userId },
            data: userUpdates,
          });
        }

        // 2. Student settings — daily goal lives on StudentProfile, not Profile
        if (dailyGoalXp !== undefined) {
          await tx.studentProfile.upsert({
            where: { userId },
            create: { userId, dailyGoalXp },
            update: { dailyGoalXp },
          });
        }

        // 3. Handle username if provided
        const cleanProfileData: any = { ...profileFields };
        if (avatarUrl !== undefined) cleanProfileData.avatarUrl = avatarUrl;

        if (cleanUsername) {
          const existing = await tx.profile.findFirst({
            where: {
              username: { equals: cleanUsername, mode: 'insensitive' },
              NOT: { userId },
            },
          });
          if (existing) {
            throw new BadRequestException(`Username @${cleanUsername} is already taken.`);
          }
          cleanProfileData.username = cleanUsername;
          cleanProfileData.usernameLastChangedAt = new Date();
        }

      // 4. Upsert Profile row
      await tx.profile.upsert({
        where: { userId },
        create: { userId, ...cleanProfileData },
        update: cleanProfileData,
      });

      // 5. Also synchronize InstructorProfile row if it exists or for creator status
      const instructorData: any = {};
      if (fullName) instructorData.displayName = fullName.trim();
      if (cleanProfileData.headline) instructorData.professionalHeadline = cleanProfileData.headline;
      if (cleanProfileData.bio) instructorData.bio = cleanProfileData.bio;
      if (avatarUrl) instructorData.avatarUrl = avatarUrl;
      if (cleanProfileData.website) instructorData.websiteUrl = cleanProfileData.website;
      if (cleanProfileData.linkedin) instructorData.linkedinUrl = cleanProfileData.linkedin;
      if (cleanProfileData.youtube) instructorData.youtubeUrl = cleanProfileData.youtube;
      if (cleanProfileData.skills) instructorData.expertise = cleanProfileData.skills;

      if (Object.keys(instructorData).length > 0) {
        await tx.instructorProfile.upsert({
          where: { userId },
          create: {
            userId,
            displayName: fullName?.trim() || 'Creator',
            ...instructorData,
          },
          update: instructorData,
        });
      }
      });
    } catch (e) {
      // Two creators racing for the same handle: the DB unique index is the
      // final arbiter — surface it as a friendly 400 instead of a raw 500.
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new BadRequestException('That username was just taken by someone else — pick another.');
      }
      throw e;
    }

    return this.getMyProfile(userId);
  }

  /**
   * Permanently deletes the user account (cascades to Profile, Enrollments, etc).
   */
  async deleteMyAccount(userId: string) {
    await this.prisma.user.delete({ where: { id: userId } });
    return { message: 'Account deleted successfully' };
  }

  /**
   * Hydrates the creator Profile from their onboarding answers.
   * Called automatically by AuthService after a successful creator signup.
   */
  async hydrateFromOnboarding(userId: string, data: OnboardingPayload) {
    // Step 7 is a multi-select: the live shell sends string[], but very old
    // stored payloads may hold a bare string — normalize to an array.
    const rawChallenge = data.step7?.biggestChallenge;
    const biggestChallenge = Array.isArray(rawChallenge)
      ? rawChallenge
      : rawChallenge
        ? [rawChallenge]
        : null;

    const profileData = {
      niche: data.step3?.categories?.[0] ?? null,
      subCategories: data.step3?.categories ?? [],
      audienceSize: data.step4?.audienceSize ?? null,
      platforms: data.step5?.platforms ?? [],
      biggestChallenge,
      teachingStyle: data.step8?.teachingStyle ?? null,
      weeklyHours: data.step9?.weeklyHours ?? null,
      // The current flow's step 12 asks what to build/launch first and saves
      // it under `courseFormat`; older drafts used `launchGoal`.
      launchGoal: data.step12?.courseFormat ?? data.step12?.launchGoal ?? null,
      bio: data.step13?.bio ?? null,
    };

    // Remove null entries so we don't overwrite existing data
    const cleanData = Object.fromEntries(
      Object.entries(profileData).filter(([, v]) => v !== null && v !== undefined)
    );

    if (Object.keys(cleanData).length === 0) return;

    await this.prisma.profile.upsert({
      where: { userId },
      create: { userId, ...cleanData },
      update: cleanData,
    });
  }

  /**
   * Returns public creator profile with aggregated stats and courses.
   */
  async getPublicCreatorProfile(rawIdentifier: string, viewerUserId?: string) {
    const identifier = rawIdentifier.trim().toLowerCase().replace(/^@/, '');

    // NOTE: deliberately NOT matchable by email — a public endpoint that
    // resolves email addresses would let anyone probe who has an account.
    let user: CreatorUserPayload | null = await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: rawIdentifier },
          { profile: { username: { equals: identifier, mode: 'insensitive' } } },
          { instructorProfile: { displayName: { equals: rawIdentifier, mode: 'insensitive' } } },
          { fullName: { equals: rawIdentifier, mode: 'insensitive' } },
        ],
      },
      include: creatorInclude(viewerUserId),
    });

    // Flexible slug matching if not found by exact match ("Ada Lovelace" →
    // "adalovelace"). BOUNDED + EXACT: bidirectional substring matching used
    // to let "/creator-profile/ma" resolve to "Maria Johnson". The slug
    // computation happens IN Postgres now — the old version shipped up to
    // 2000 candidate rows into JS per miss AND silently missed every creator
    // beyond that newest-2000 cap.
    if (!user) {
      const cleanSearch = identifier.replace(/[^a-z0-9]/g, '');
      if (cleanSearch.length > 0) {
        const rows = await this.prisma.$queryRaw<{ id: string }[]>`
          SELECT u.id FROM "User" u
          LEFT JOIN "Profile" p ON p."userId" = u.id
          WHERE LOWER(REGEXP_REPLACE(u."fullName", '[^a-z0-9]', '', 'g')) = ${cleanSearch}
             OR LOWER(REGEXP_REPLACE(COALESCE(p."username", ''), '[^a-z0-9]', '', 'g')) = ${cleanSearch}
          ORDER BY u."createdAt" DESC
          LIMIT 1
        `;
        const matchId = rows[0]?.id;
        if (matchId) {
          user = await this.prisma.user.findFirst({
            where: { id: matchId },
            include: creatorInclude(viewerUserId),
          });
        }
      }
    }

    if (!user) {
      throw new NotFoundException(`Creator @${rawIdentifier} not found`);
    }

    // Calculate aggregated metrics — REAL data only. A creator with no
    // reviews has no rating; the UI hides the row instead of inventing one.
    const totalLearners = user.courses.reduce(
      (sum, c) => sum + (c._count?.enrollments || c.studentsCount || 0),
      0
    );

    const allRatings: number[] = [];
    user.courses.forEach((c) => {
      c.reviews?.forEach((r) => allRatings.push(r.rating));
    });
    const avgRating =
      allRatings.length > 0
        ? Number((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1))
        : null;

    const formattedCourses = user.courses.map((c) => {
      const lessonCount = c.sections.reduce((acc, s) => acc + s.lessons.length, 0);
      const courseRatings = (c.reviews ?? []).map((r) => r.rating);
      return {
        id: c.id,
        slug: c.slug || c.id,
        title: c.title,
        description: c.shortDescription || c.description,
        level: c.level || 'Beginner',
        lessonsCount: lessonCount,
        studentsCount: c._count?.enrollments || c.studentsCount || 0,
        rating:
          courseRatings.length > 0
            ? Number(
                (
                  courseRatings.reduce((a, b) => a + b, 0) / courseRatings.length
                ).toFixed(1),
              )
            : null,
        reviewsCount: courseRatings.length,
        category: c.category || 'General',
        thumbnailUrl: c.thumbnailUrl,
        iconType: c.category?.toLowerCase().includes('python') || c.title?.toLowerCase().includes('python')
          ? 'python'
          : c.category?.toLowerCase().includes('javascript') || c.title?.toLowerCase().includes('javascript') || c.title?.toLowerCase().includes('js')
          ? 'js'
          : c.category?.toLowerCase().includes('react') || c.title?.toLowerCase().includes('react')
          ? 'react'
          : 'code',
      };
    });

    const featuredCourse = formattedCourses[0] || null;
    const remainingCourses = formattedCourses.slice(1);

    // Derive skills from profile or course categories/titles
    let rawSkills: any =
      user.profile?.skills || user.instructorProfile?.expertise || [];
    if (!Array.isArray(rawSkills) && typeof rawSkills === 'object' && rawSkills !== null) {
      rawSkills = Object.values(rawSkills);
    }
    let skills: string[] = [];
    if (Array.isArray(rawSkills) && rawSkills.length > 0) {
      skills = rawSkills
        .map((s: any) => {
          if (typeof s === 'string') return s.trim();
          if (typeof s === 'object' && s !== null) {
            return (s.name || s.skill || s.title || s.label || '').trim();
          }
          return String(s || '').trim();
        })
        .filter((s) => s.length > 0);
    }

    if (skills.length === 0) {
      // Derive from real course data only — never pad with a fake list. The
      // frontend hides the "What I teach" section when this stays empty.
      const courseSkills = new Set<string>();
      user.courses.forEach((c) => {
        if (c.category && c.category !== 'Uncategorized') courseSkills.add(c.category);
        if (Array.isArray(c.skills)) c.skills.forEach((s: any) => courseSkills.add(String(s)));
      });
      skills = Array.from(courseSkills).slice(0, 8);
    }

    const languages =
      (Array.isArray(user.profile?.languages) ? (user.profile.languages as string[]) : null) || [];

    const headline =
      user.instructorProfile?.professionalHeadline ||
      user.profile?.headline ||
      user.profile?.niche ||
      '';

    const bio =
      user.instructorProfile?.bio ||
      user.profile?.bio ||
      user.profile?.tagline ||
      '';

    const about =
      user.profile?.about ||
      user.instructorProfile?.bio ||
      user.profile?.bio ||
      '';

    const avatarUrl =
      user.instructorProfile?.avatarUrl ||
      user.profile?.avatarUrl ||
      user.avatarUrl ||
      null;

    // Honest badges only — derived from real data, omitted when unearned.
    // The frontend hides the whole achievements card when this list is empty.
    const achievements: { id: string; title: string; icon: string; color: string }[] = [];
    if (user.profile?.creatorStatus === 'founding_creator') {
      achievements.push({ id: 'founding-badge', title: 'Founding Creator', icon: 'trophy', color: 'purple' });
    }
    if (user.courses.length >= 3) {
      achievements.push({ id: 'creator-badge', title: 'Prolific Creator', icon: 'trophy', color: 'blue' });
    }
    if (totalLearners >= 1000) {
      achievements.push({
        id: 'learners-badge',
        title: `${(totalLearners / 1000).toFixed(0)}K Learners`,
        icon: 'users',
        color: 'amber',
      });
    }
    if (avgRating !== null && avgRating >= 4.5) {
      achievements.push({ id: 'rating-badge', title: 'Top Rated', icon: 'star', color: 'amber' });
    }

    // Honor the creator's privacy toggles (unset = visible; explicit false hides).
    const privacy = (user.profile?.privacySettings ?? {}) as Record<string, boolean>;
    const canShow = (flag: string): boolean => privacy[flag] !== false;

    return {
      id: user.id,
      fullName: user.instructorProfile?.displayName || user.fullName,
      username: user.profile?.username || user.fullName.toLowerCase().replace(/[^a-z0-9]/g, ''),
      avatarUrl,
      isVerified: user.isVerified || user.instructorProfile?.verificationStatus === 'VERIFIED' || user.hasCreatorAccess,
      creatorStatus: user.profile?.creatorStatus || 'founding_creator',
      headline,
      bio,
      about,
      location: canShow('showLocation') ? user.profile?.location || null : null,
      languages,
      skills,
      yearsOfExperience: user.instructorProfile?.yearsOfExperience ?? null,
      followersCount: user._count?.followers || 0,
      followingCount: user._count?.following || 0,
      coursesCount: user.courses.length,
      learnersCount: totalLearners,
      rating: avgRating,
      isFollowing: viewerUserId && Array.isArray(user.followers) ? user.followers.length > 0 : false,
      featuredCourse,
      courses: remainingCourses,
      achievements,
    };
  }

  /**
   * Toggles following a creator.
   */
  async toggleFollow(creatorId: string, followerId: string) {
    if (creatorId === followerId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    // An unknown target must 404, not surface as a Prisma FK violation (500).
    const creator = await this.prisma.user.findUnique({
      where: { id: creatorId },
      select: { id: true },
    });
    if (!creator) {
      throw new NotFoundException('Creator not found');
    }

    // Toggle + recount atomically so a concurrent follow can't skew the count.
    const { isFollowing, followersCount } = await this.prisma.$transaction(
      async (tx) => {
        const existing = await tx.userFollow.findUnique({
          where: {
            followerId_followingId: {
              followerId,
              followingId: creatorId,
            },
          },
          select: { id: true },
        });

        if (existing) {
          await tx.userFollow.delete({
            where: { id: existing.id },
          });
        } else {
          await tx.userFollow.create({
            data: {
              followerId,
              followingId: creatorId,
            },
          });
        }

        const followersCount = await tx.userFollow.count({
          where: { followingId: creatorId },
        });
        return { isFollowing: !existing, followersCount };
      },
    );

    return { isFollowing, followersCount };
  }
}
