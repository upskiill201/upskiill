import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

// Shape of one step's answers coming from the onboarding localStorage payload
interface OnboardingPayload {
  draftId?: string;
  step2?: { creatorType?: string };
  step3?: { categories?: string[] };
  step4?: { audienceSize?: string };
  step5?: { platforms?: string[] };
  step6?: { existingContent?: string[] };
  step7?: { biggestChallenge?: string };
  step8?: { teachingStyle?: string };
  step9?: { weeklyHours?: string };
  step12?: { launchGoal?: string };
  step13?: { bio?: string };
}

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  /**
   * Returns the full creator profile merged with User fields.
   * Used by GET /profile/me and enriched GET /auth/me.
   */
  async getMyProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
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
   * Handles User.fullName, avatarUrl, username checks, and all creator profile fields.
   */
  async updateMyProfile(userId: string, dto: UpdateProfileDto) {
    const { fullName, avatarUrl, username, ...profileFields } = dto;

    await this.prisma.$transaction(async (tx) => {
      // 1. Update User fields if provided
      const userUpdates: any = {};
      if (fullName !== undefined) userUpdates.fullName = fullName.trim();
      if (avatarUrl !== undefined) userUpdates.avatarUrl = avatarUrl;

      if (Object.keys(userUpdates).length > 0) {
        await tx.user.update({
          where: { id: userId },
          data: userUpdates,
        });
      }

      // 2. Handle username if provided
      const cleanProfileData: any = { ...profileFields };
      if (avatarUrl !== undefined) cleanProfileData.avatarUrl = avatarUrl;

      if (username !== undefined && username !== null) {
        const cleanUsername = username.trim().toLowerCase().replace(/^@/, '');
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
      }

      // 3. Upsert Profile row
      await tx.profile.upsert({
        where: { userId },
        create: { userId, ...cleanProfileData },
        update: cleanProfileData,
      });

      // 4. Also synchronize InstructorProfile row if it exists or for creator status
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
    const profileData = {
      niche: data.step3?.categories?.[0] ?? null,
      subCategories: data.step3?.categories ?? [],
      audienceSize: data.step4?.audienceSize ?? null,
      platforms: data.step5?.platforms ?? [],
      biggestChallenge: data.step7?.biggestChallenge ?? null,
      teachingStyle: data.step8?.teachingStyle ?? null,
      weeklyHours: data.step9?.weeklyHours ?? null,
      launchGoal: data.step12?.launchGoal ?? null,
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

    let user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: rawIdentifier },
          { profile: { username: { equals: identifier, mode: 'insensitive' } } },
          { instructorProfile: { displayName: { equals: rawIdentifier, mode: 'insensitive' } } },
          { fullName: { equals: rawIdentifier, mode: 'insensitive' } },
          { email: { equals: rawIdentifier, mode: 'insensitive' } },
        ],
      },
      include: {
        profile: true,
        instructorProfile: true,
        courses: {
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
        followers: viewerUserId
          ? {
              where: { followerId: viewerUserId },
            }
          : false,
        _count: {
          select: {
            followers: true,
            following: true,
            courses: true,
          },
        },
      },
    });

    // Flexible slug matching if not found by exact match
    if (!user) {
      const allUsers = await this.prisma.user.findMany({
        include: {
          profile: true,
          instructorProfile: true,
          courses: {
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
          followers: viewerUserId
            ? {
                where: { followerId: viewerUserId },
              }
            : false,
          _count: {
            select: {
              followers: true,
              following: true,
              courses: true,
            },
          },
        },
      });

      const cleanSearch = identifier.replace(/[^a-z0-9]/g, '');
      user =
        allUsers.find((u) => {
          const slug1 = u.fullName.toLowerCase().replace(/[^a-z0-9]/g, '');
          const slug2 = (u.profile?.username || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const slug3 = u.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
          return (
            slug1 === cleanSearch ||
            slug2 === cleanSearch ||
            slug3 === cleanSearch ||
            slug1.includes(cleanSearch) ||
            cleanSearch.includes(slug1)
          );
        }) || null;
    }

    if (!user) {
      throw new NotFoundException(`Creator @${rawIdentifier} not found`);
    }

    // Calculate aggregated metrics
    const totalLearners = user.courses.reduce(
      (sum, c) => sum + (c._count?.enrollments || c.studentsCount || 0),
      0
    );

    const allRatings: number[] = [];
    user.courses.forEach((c) => {
      if (c.rating && c.rating > 0) allRatings.push(c.rating);
      c.reviews?.forEach((r) => allRatings.push(r.rating));
    });
    const avgRating =
      allRatings.length > 0
        ? Number((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1))
        : user.courses.length > 0
        ? 4.8
        : 5.0;

    const formattedCourses = user.courses.map((c) => {
      const lessonCount = c.sections.reduce((acc, s) => acc + s.lessons.length, 0);
      return {
        id: c.id,
        slug: c.slug || c.id,
        title: c.title,
        description: c.shortDescription || c.description,
        level: c.level || 'Beginner',
        lessonsCount: lessonCount || (c.curriculum ? (Array.isArray(c.curriculum) ? c.curriculum.length : 12) : 12),
        studentsCount: c._count?.enrollments || c.studentsCount || 0,
        rating: c.rating || 4.8,
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
      const courseSkills = new Set<string>();
      user.courses.forEach((c) => {
        if (c.category && c.category !== 'Uncategorized') courseSkills.add(c.category);
        if (Array.isArray(c.skills)) c.skills.forEach((s: any) => courseSkills.add(String(s)));
      });
      if (courseSkills.size > 0) {
        skills = Array.from(courseSkills).slice(0, 8);
      } else {
        skills = ['Course Creator', 'Education', 'Online Learning'];
      }
    }

    const languages =
      (Array.isArray(user.profile?.languages) ? (user.profile.languages as string[]) : null) || ['English'];

    const headline =
      user.instructorProfile?.professionalHeadline ||
      user.profile?.headline ||
      user.profile?.niche ||
      (user.courses.length > 0 ? `Instructor of ${user.courses[0].title}` : 'Educator & Content Creator');

    const bio =
      user.instructorProfile?.bio ||
      user.profile?.bio ||
      user.profile?.tagline ||
      (user.courses.length > 0
        ? `I teach online courses on Teyro with practical, real-world examples.`
        : 'Educator and course author helping learners build practical skills.');

    const about =
      user.profile?.about ||
      user.instructorProfile?.bio ||
      user.profile?.bio ||
      `Passionate instructor on Teyro dedicated to providing high-quality learning experiences.`;

    const avatarUrl =
      user.instructorProfile?.avatarUrl ||
      user.profile?.avatarUrl ||
      user.avatarUrl ||
      `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.fullName)}`;

    const achievements = [
      {
        id: 'creator-badge',
        title: user.courses.length >= 3 ? 'Prolific Creator' : 'Verified Educator',
        icon: 'diamond',
        color: 'purple',
      },
      {
        id: 'learners-badge',
        title: totalLearners >= 1000 ? `${(totalLearners / 1000).toFixed(0)}K Learners` : `${totalLearners} Learners`,
        icon: 'users',
        color: 'amber',
      },
      {
        id: 'rating-badge',
        title: avgRating >= 4.7 ? 'Top Rated' : 'High Completion',
        icon: 'trophy',
        color: 'blue',
      },
    ];

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
      location: user.profile?.location || 'Remote',
      languages,
      skills,
      yearsOfExperience: user.instructorProfile?.yearsOfExperience || (user.courses.length >= 3 ? 5 : 2),
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

    const existing = await this.prisma.userFollow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId: creatorId,
        },
      },
    });

    if (existing) {
      await this.prisma.userFollow.delete({
        where: { id: existing.id },
      });
      const followersCount = await this.prisma.userFollow.count({
        where: { followingId: creatorId },
      });
      return { isFollowing: false, followersCount };
    } else {
      await this.prisma.userFollow.create({
        data: {
          followerId,
          followingId: creatorId,
        },
      });
      const followersCount = await this.prisma.userFollow.count({
        where: { followingId: creatorId },
      });
      return { isFollowing: true, followersCount };
    }
  }
}
