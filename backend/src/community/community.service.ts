import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const MEMBER_SELECT = {
  id: true,
  fullName: true,
  avatarUrl: true,
  role: true,
  studentProfile: { select: { streakDays: true, xp: true } },
} as const;

export type MemberRow = {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  isCreator: boolean;
  streakDays: number;
  xp: number;
};

@Injectable()
export class CommunityService {
  private readonly logger = new Logger(CommunityService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Resolves the community attached to a course. Communities are created
   * alongside courses (and backfilled), so a missing one is a 404.
   */
  async getCommunityByCourseId(courseId: string) {
    const community = await this.prisma.community.findUnique({
      where: { courseId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnailUrl: true,
            instructorId: true,
            instructor: { select: { id: true, fullName: true, avatarUrl: true } },
          },
        },
      },
    });
    if (!community) throw new NotFoundException('Community not found.');
    return community;
  }

  async getCommunityById(communityId: string) {
    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnailUrl: true,
            instructorId: true,
            instructor: { select: { id: true, fullName: true, avatarUrl: true } },
          },
        },
      },
    });
    if (!community) throw new NotFoundException('Community not found.');
    return community;
  }

  /**
   * Core access rule for every community surface:
   *  1. platform ADMIN → in
   *  2. course creator → in
   *  3. existing membership → in
   *  4. active enrollment/entitlement → lazily seat them, then in
   *  5. otherwise → 403
   * Returns the caller's effective membership row (null for platform admin).
   */
  async assertMember(communityId: string, userId: string, userRole?: string) {
    const community = await this.getCommunityById(communityId);

    if (userRole === 'ADMIN') return { community, membership: null, isModerator: true };
    if (community.course && community.course.instructorId === userId) {
      // Creator without a membership row yet (edge case) — seat them as ADMIN.
      const membership = await this.ensureMembership(communityId, userId, 'ADMIN');
      return { community, membership, isModerator: true };
    }

    const membership = await this.prisma.communityMembership.findUnique({
      where: { userId_communityId: { userId, communityId } },
    });
    if (membership) return { community, membership, isModerator: membership.role === 'ADMIN' };

    // Not seated yet but holds valid access? Join them up automatically.
    if (await this.hasCourseAccess(userId, community.courseId)) {
      const created = await this.ensureMembership(communityId, userId, 'MEMBER');
      return { community, membership: created, isModerator: false };
    }

    throw new ForbiddenException('You are not a member of this community.');
  }

  /** Moderator powers: course creator, community ADMIN membership, or platform admin. */
  async assertModerator(communityId: string, userId: string, userRole?: string) {
    const ctx = await this.assertMember(communityId, userId, userRole);
    if (!ctx.isModerator) {
      throw new ForbiddenException('Only the course creator can do that.');
    }
    return ctx;
  }

  /** True when the user holds an enrollment or an unexpired access entitlement. */
  private async hasCourseAccess(
    userId: string,
    courseId: string | null,
  ): Promise<boolean> {
    if (!courseId) return false;

    const [enrollment, entitlement] = await Promise.all([
      this.prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId } },
        select: { id: true },
      }),
      this.prisma.courseAccessEntitlement.findFirst({
        where: {
          userId,
          courseId,
          status: 'ACTIVE',
          expiresAt: { gte: new Date() },
        },
        select: { id: true },
      }),
    ]);
    return Boolean(enrollment || entitlement);
  }

  /** Idempotent membership creation; keeps the denormalized memberCount honest. */
  async ensureMembership(
    communityId: string,
    userId: string,
    role: 'MEMBER' | 'ADMIN' = 'MEMBER',
  ) {
    const membership = await this.prisma.communityMembership.upsert({
      where: { userId_communityId: { userId, communityId } },
      create: { userId, communityId, role },
      update: role === 'ADMIN' ? { role: 'ADMIN' } : {},
    });

    const count = await this.prisma.communityMembership.count({
      where: { communityId },
    });
    await this.prisma.community
      .update({ where: { id: communityId }, data: { memberCount: count } })
      .catch(() => undefined); // count refresh is best-effort

    return membership;
  }

  /** Seats a learner after enrollment (auto-join hook). Never throws. */
  async joinCourseCommunity(courseId: string, userId: string): Promise<void> {
    try {
      const community = await this.prisma.community.findUnique({
        where: { courseId },
        select: { id: true },
      });
      if (!community) return;
      await this.ensureMembership(community.id, userId, 'MEMBER');
    } catch (err) {
      this.logger.warn(`Auto-join failed for course ${courseId}`, err as Error);
    }
  }

  /** Community landing payload: identity, stats, my role, faces preview. */
  async getOverview(communityId: string, userId: string, userRole?: string) {
    const community = await this.getCommunityById(communityId);

    // One round trip for everything else — with a far-away DB each extra
    // sequential query costs real seconds, so membership, the facepile and
    // the post count all ride together. Access rules match assertMember.
    const [membership, membersPreview, postsCount] = await Promise.all([
      this.prisma.communityMembership.findUnique({
        where: { userId_communityId: { userId, communityId } },
      }),
      this.prisma.communityMembership.findMany({
        where: { communityId },
        orderBy: [{ role: 'desc' }, { joinedAt: 'asc' }], // ADMIN first, then seniors
        take: 14,
        include: { user: { select: MEMBER_SELECT } },
      }),
      this.prisma.post.count({
        where: { communityId, status: 'ACTIVE' },
      }),
    ]);

    // Resolve the caller's standing (same precedence as assertMember).
    let effective = membership;
    let isModerator = false;
    if (userRole === 'ADMIN') {
      isModerator = true;
    } else if (community.course && community.course.instructorId === userId) {
      isModerator = true;
      if (!membership) effective = await this.ensureMembership(communityId, userId, 'ADMIN');
    } else if (membership) {
      isModerator = membership.role === 'ADMIN';
    } else if (await this.hasCourseAccess(userId, community.courseId)) {
      effective = await this.ensureMembership(communityId, userId, 'MEMBER');
    } else {
      throw new ForbiddenException('You are not a member of this community.');
    }

    return {
      id: community.id,
      name: community.name,
      description: community.description,
      memberCount: community.memberCount,
      course: community.course,
      stats: {
        totalPosts: postsCount,
        totalMembers: community.memberCount,
      },
      myMembership: effective
        ? { role: effective.role, joinedAt: effective.joinedAt }
        : { role: 'ADMIN', joinedAt: null }, // platform admin viewer
      isModerator,
      membersPreview: membersPreview.map((m) => ({
        id: m.user.id,
        fullName: m.user.fullName,
        avatarUrl: m.user.avatarUrl,
        isCreator: m.role === 'ADMIN',
        streakDays: m.user.studentProfile?.streakDays ?? 0,
        xp: m.user.studentProfile?.xp ?? 0,
      })),
    };
  }

  /**
   * All communities the user belongs to, in one shot. This exists because the
   * DB can be far away (staging Supabase ≈ 700ms per round trip from dev) —
   * the old pattern of N per-course overview calls multiplied that latency by
   * 4×N. Single round trip: memberships + course + live post count in one SQL.
   */
  async getMyCommunities(userId: string) {
    const rows = await this.prisma.$queryRaw<{
      id: string;
      name: string;
      memberCount: number;
      courseId: string | null;
      courseTitle: string | null;
      courseThumb: string | null;
      instructorId: string | null;
      isModerator: boolean;
      totalPosts: number;
    }[]>(Prisma.sql`
      SELECT
        cm."id", cm."name", cm."memberCount",
        co."id" AS "courseId", co."title" AS "courseTitle",
        co."thumbnailUrl" AS "courseThumb", co."instructorId",
        (m."role" = 'ADMIN' OR co."instructorId" = ${userId}) AS "isModerator",
        (
          SELECT COUNT(*)::int FROM posts p
          WHERE p."communityId" = cm."id" AND p."status" = 'ACTIVE'
        ) AS "totalPosts"
      FROM "community_memberships" m
      JOIN "communities" cm ON cm."id" = m."communityId"
      LEFT JOIN "Course" co ON co."id" = cm."courseId"
      WHERE m."userId" = ${userId}
      ORDER BY (m."role" = 'ADMIN') DESC, m."joinedAt" ASC
    `);

    return {
      communities: rows.map((r) => ({
        id: r.id,
        name: r.name,
        memberCount: r.memberCount,
        totalPosts: r.totalPosts,
        isModerator: r.isModerator,
        course: r.courseId
          ? {
              id: r.courseId,
              title: r.courseTitle ?? '',
              thumbnailUrl: r.courseThumb,
              instructorId: r.instructorId ?? '',
            }
          : null,
      })),
    };
  }

  async getMembers(
    communityId: string,
    opts: { page?: number; pageSize?: number; q?: string } = {},
  ) {
    await this.getCommunityById(communityId); // must exist
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(50, Math.max(1, opts.pageSize ?? 20));
    const where = {
      communityId,
      ...(opts.q
        ? { user: { fullName: { contains: opts.q } } }
        : {}),
    };

    const [total, rows] = await Promise.all([
      this.prisma.communityMembership.count({ where }),
      this.prisma.communityMembership.findMany({
        where,
        orderBy: [{ role: 'desc' }, { joinedAt: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { user: { select: MEMBER_SELECT } },
      }),
    ]);

    const members: MemberRow[] = rows.map((m) => ({
      id: m.user.id,
      fullName: m.user.fullName,
      avatarUrl: m.user.avatarUrl,
      isCreator: m.role === 'ADMIN',
      streakDays: m.user.studentProfile?.streakDays ?? 0,
      xp: m.user.studentProfile?.xp ?? 0,
    }));

    return { total, page, pageSize, members };
  }
}
