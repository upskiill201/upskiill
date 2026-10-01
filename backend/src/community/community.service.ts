import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  COMMUNITY_LEVELS,
  levelForPoints,
  pointsToNextLevel,
} from './community-levels';

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
  /** Community level (Skool's number on the avatar). */
  level?: number;
  /** Whether the viewer follows them (Members tab follow button). */
  isFollowing?: boolean;
};

/**
 * Payload for the community welcome moment, returned by completeLesson the
 * one time a learner is seated (see seatAfterSecondLesson).
 */
export interface CommunityUnlockPayload {
  communityId: string;
  courseId: string;
  name: string;
  courseTitle: string;
  thumbnailUrl: string | null;
  memberCount: number;
  postCount: number;
  instructor: { id: string; fullName: string; avatarUrl: string | null } | null;
  members: { id: string; fullName: string; avatarUrl: string | null }[];
  samplePost: {
    id: string;
    postType: string;
    title: string | null;
    excerpt: string;
    commentCount: number;
    likeCount: number;
    authorName: string;
    authorAvatarUrl: string | null;
  } | null;
}

/** All-time community points per member, per community (see levelsFor). */
const levelPointsCache = new Map<string, { points: Map<string, number>; expiresAt: number }>();

/** Granted community access, reused for this long (see assertMember). */
const ACCESS_CACHE_TTL_MS = 30_000;

/**
 * A learner earns their seat in a course's community by finishing this many
 * of its lessons — they arrive with something to say, and the welcome scene
 * (seatAfterSecondLesson) plays the moment it happens.
 */
export const COMMUNITY_UNLOCK_LESSONS = 2;
type AccessResult = Awaited<ReturnType<CommunityService['resolveAccess']>>;
const accessCache = new Map<string, { value: AccessResult; expiresAt: number }>();
const creatorCache = new Map<string, { id: string | null; expiresAt: number }>();

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
    // Every like, comment, vote and page runs this first; on a distant DB its
    // 2–4 sequential lookups were most of an action's latency. A granted
    // answer is reused briefly — the same trade the JWT user cache makes. A
    // refusal is never cached, so a learner who just enrolled gets in at once.
    const key = `${communityId}:${userId}:${userRole ?? ''}`;
    const hit = accessCache.get(key);
    if (hit && hit.expiresAt > Date.now()) return hit.value;

    const value = await this.resolveAccess(communityId, userId, userRole);
    accessCache.set(key, { value, expiresAt: Date.now() + ACCESS_CACHE_TTL_MS });
    if (accessCache.size > 5000) {
      const now = Date.now();
      for (const [k, v] of accessCache) if (v.expiresAt <= now) accessCache.delete(k);
    }
    return value;
  }

  /** The course creator of a community (for the CREATOR badge). Rarely changes, so cached. */
  async creatorIdOf(communityId: string): Promise<string | null> {
    const hit = creatorCache.get(communityId);
    if (hit && hit.expiresAt > Date.now()) return hit.id;
    const row = await this.prisma.community.findUnique({
      where: { id: communityId },
      select: { course: { select: { instructorId: true } } },
    });
    const id = row?.course?.instructorId ?? null;
    creatorCache.set(communityId, { id, expiresAt: Date.now() + 10 * 60_000 });
    return id;
  }

  /**
   * A muted member can read, like and vote, but not post or comment until
   * the creator's mute runs out. Moderators are never muted.
   */
  assertCanWrite(membership: { mutedUntil?: Date | null } | null, isModerator: boolean) {
    if (isModerator || !membership?.mutedUntil) return;
    if (membership.mutedUntil.getTime() > Date.now()) {
      throw new ForbiddenException({
        message: `The creator has paused your posting here until ${membership.mutedUntil.toDateString()}.`,
        code: 'COMMUNITY_MUTED',
        mutedUntil: membership.mutedUntil,
      });
    }
  }

  /** Forget cached access for a learner (after they're removed or banned). */
  forgetAccess(communityId: string, userId: string) {
    for (const k of accessCache.keys()) if (k.startsWith(`${communityId}:${userId}:`)) accessCache.delete(k);
  }

  // Public only so the module-level cache can name its type.
  async resolveAccess(communityId: string, userId: string, userRole?: string) {
    const [community, existing] = await Promise.all([
      this.getCommunityById(communityId),
      this.prisma.communityMembership.findUnique({
        where: { userId_communityId: { userId, communityId } },
      }),
    ]);

    if (userRole === 'ADMIN') return { community, membership: null, isModerator: true };
    if (community.course && community.course.instructorId === userId) {
      // The creator is always a moderator. Seat them only if they aren't
      // already an ADMIN member — this used to run an upsert, a count and an
      // update on every single request a creator made.
      const membership =
        existing?.role === 'ADMIN' ? existing : await this.ensureMembership(communityId, userId, 'ADMIN');
      return { community, membership, isModerator: true };
    }

    if (existing) return { community, membership: existing, isModerator: existing.role === 'ADMIN' };

    // Not seated yet: learners with access get in once they've finished
    // enough lessons (normally seatAfterSecondLesson already seated them —
    // this catches anyone who crossed the line before that existed).
    // Before that, the page shows how close they are instead of a wall.
    const access = await this.courseAccessProgress(userId, community.courseId);
    if (access.hasAccess && access.lessonsDone >= COMMUNITY_UNLOCK_LESSONS) {
      const created = await this.ensureMembership(communityId, userId, 'MEMBER');
      return { community, membership: created, isModerator: false };
    }
    if (access.hasAccess) {
      throw new ForbiddenException({
        message: `Finish ${COMMUNITY_UNLOCK_LESSONS} lessons to join this community.`,
        code: 'COMMUNITY_LOCKED',
        lessonsDone: access.lessonsDone,
        lessonsNeeded: COMMUNITY_UNLOCK_LESSONS,
        courseId: community.courseId,
        communityName: community.name,
        memberCount: community.memberCount,
      });
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

  /**
   * Whether the user can take the course (an enrollment or an unexpired
   * access entitlement), and how many of its lessons they've finished.
   */
  private async courseAccessProgress(
    userId: string,
    courseId: string | null,
  ): Promise<{ hasAccess: boolean; lessonsDone: number }> {
    if (!courseId) return { hasAccess: false, lessonsDone: 0 };

    const [enrollment, entitlement] = await Promise.all([
      this.prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId } },
        select: { id: true, completedLessons: true },
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
    const done = Array.isArray(enrollment?.completedLessons)
      ? (enrollment!.completedLessons as unknown[]).filter((id) => typeof id === 'string').length
      : 0;
    return { hasAccess: Boolean(enrollment || entitlement), lessonsDone: done };
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

  /**
   * Unconditionally seats a learner in a course's community. Never throws.
   * No longer fired by enrollment — that moved to the second completed lesson
   * (seatAfterSecondLesson). Kept for admin/backfill callers that need to seat
   * someone outright.
   */
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
    } else {
      // Not seated: the one access rule (lessons gate, COMMUNITY_LOCKED)
      // lives in resolveAccess. Only non-members pay for the extra lookup.
      effective = (await this.resolveAccess(communityId, userId, userRole)).membership;
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
    viewer?: { id: string; role?: string },
  ) {
    // Only members see who else is in a private community. (This used to
    // check only that the community existed.)
    if (viewer) await this.assertMember(communityId, viewer.id, viewer.role);
    else await this.getCommunityById(communityId);
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

    const ids = rows.map((m) => m.user.id);
    const [levels, follows] = await Promise.all([
      this.levelsFor(communityId, ids),
      viewer && ids.length > 0
        ? this.prisma.userFollow.findMany({
            where: { followerId: viewer.id, followingId: { in: ids } },
            select: { followingId: true },
          })
        : Promise.resolve([] as { followingId: string }[]),
    ]);
    const followed = new Set(follows.map((f) => f.followingId));

    const members: MemberRow[] = rows.map((m) => ({
      id: m.user.id,
      fullName: m.user.fullName,
      avatarUrl: m.user.avatarUrl,
      isCreator: m.role === 'ADMIN',
      streakDays: m.user.studentProfile?.streakDays ?? 0,
      xp: m.user.studentProfile?.xp ?? 0,
      level: levels.get(m.user.id) ?? 1,
      isFollowing: followed.has(m.user.id),
    }));

    return { total, page, pageSize, members };
  }

  /**
   * Recent-commenter facepile + "new comment 2h ago" line for a page of posts.
   *
   * Card design borrows Skool's: the strongest signal that a thread is alive
   * is *who* is in it and *how recently*, not the raw comment count. One
   * windowed query covers the whole page — a per-post query would be N+1.
   */
  /**
   * Each member's Skool-style level (from all-time community points), for the
   * number on their avatar. The whole community's points come from one query,
   * reused for a minute: levels move slowly, and a post list asks for many
   * authors at once.
   */
  async levelsFor(communityId: string, userIds: string[]): Promise<Map<string, number>> {
    const out = new Map<string, number>();
    if (userIds.length === 0) return out;
    let cached = levelPointsCache.get(communityId);
    if (!cached || cached.expiresAt <= Date.now()) {
      const rows = await this.prisma.$queryRaw<{ userId: string; points: number }[]>(Prisma.sql`
        WITH scoped_posts AS (
          SELECT p."id", p."userId" FROM "posts" p
          WHERE p."communityId" = ${communityId} AND p."status" = 'ACTIVE'
        ),
        scoped_comments AS (
          SELECT c."id", c."userId" FROM "comments" c
          JOIN scoped_posts sp ON sp."id" = c."postId"
          WHERE c."status" = 'ACTIVE'
        ),
        contributions AS (
          SELECT sp."userId" AS "userId", 3 AS pts FROM scoped_posts sp
          UNION ALL
          SELECT sc."userId", 1 FROM scoped_comments sc
          UNION ALL
          SELECT sp."userId", 2 FROM "likes" l JOIN scoped_posts sp ON sp."id" = l."entityId"
          WHERE l."entityType" = 'POST' AND l."userId" <> sp."userId"
          UNION ALL
          SELECT sc."userId", 1 FROM "likes" l JOIN scoped_comments sc ON sc."id" = l."entityId"
          WHERE l."entityType" = 'COMMENT' AND l."userId" <> sc."userId"
        )
        SELECT "userId", SUM(pts)::int AS "points" FROM contributions GROUP BY "userId"
      `);
      cached = { points: new Map(rows.map((r) => [r.userId, r.points])), expiresAt: Date.now() + 60_000 };
      levelPointsCache.set(communityId, cached);
    }
    for (const id of userIds) out.set(id, levelForPoints(cached.points.get(id) ?? 0).level);
    return out;
  }

  async getPostDiscussion(postIds: string[]) {
    const empty = new Map<
      string,
      {
        lastCommentAt: Date | null;
        commenters: { id: string; fullName: string; avatarUrl: string | null }[];
      }
    >();
    if (postIds.length === 0) return empty;

    const rows = await this.prisma.$queryRaw<
      {
        postId: string;
        userId: string;
        fullName: string;
        avatarUrl: string | null;
        lastAt: Date;
      }[]
    >(Prisma.sql`
      SELECT t."postId", t."userId", u."fullName", u."avatarUrl", t."lastAt"
      FROM (
        SELECT
          c."postId",
          c."userId",
          MAX(c."createdAt") AS "lastAt",
          ROW_NUMBER() OVER (
            PARTITION BY c."postId" ORDER BY MAX(c."createdAt") DESC
          ) AS rn
        FROM "comments" c
        WHERE c."postId" IN (${Prisma.join(postIds)}) AND c."status" = 'ACTIVE'
        GROUP BY c."postId", c."userId"
      ) t
      JOIN "User" u ON u."id" = t."userId"
      WHERE t.rn <= 5
      ORDER BY t."postId", t."lastAt" DESC
    `);

    for (const r of rows) {
      const entry = empty.get(r.postId) ?? { lastCommentAt: null, commenters: [] };
      // Rows arrive newest-first per post, so the first one carries the
      // post's most recent activity.
      if (!entry.lastCommentAt) entry.lastCommentAt = r.lastAt;
      entry.commenters.push({
        id: r.userId,
        fullName: r.fullName,
        avatarUrl: r.avatarUrl,
      });
      empty.set(r.postId, entry);
    }
    return empty;
  }

  // ── Joining ────────────────────────────────────────────────────────────────

  /**
   * The learner meets their course community after their SECOND lesson — not
   * at enrollment. One lesson in they have nothing to say yet and the room is
   * noise; two lessons in they have a question, a win, or a stuck point, and
   * walking in has a point. Seating them at enrollment also inflated member
   * counts with people who had never opened the course.
   *
   * Returns the payload for the welcome moment the first time it seats them,
   * and null every other time (already a member, fewer than two lessons, or
   * the course has no community).
   */
  async seatAfterSecondLesson(
    courseId: string,
    userId: string,
    completedLessonCount: number,
  ): Promise<CommunityUnlockPayload | null> {
    if (completedLessonCount < COMMUNITY_UNLOCK_LESSONS) return null;
    try {
      const community = await this.prisma.community.findUnique({
        where: { courseId },
        select: {
          id: true,
          name: true,
          memberCount: true,
          course: {
            select: {
              id: true,
              title: true,
              thumbnailUrl: true,
              instructor: { select: { id: true, fullName: true, avatarUrl: true } },
            },
          },
        },
      });
      if (!community) return null;

      const existing = await this.prisma.communityMembership.findUnique({
        where: { userId_communityId: { userId, communityId: community.id } },
        select: { id: true },
      });
      if (existing) return null; // already seated — the moment already happened

      await this.ensureMembership(community.id, userId, 'MEMBER');

      // Faces + a real question make the welcome concrete rather than generic.
      // Both are decorative: if either fails the moment still plays.
      const [faces, sampleQuestion, postCount] = await Promise.all([
        this.prisma.communityMembership.findMany({
          where: { communityId: community.id, userId: { not: userId } },
          orderBy: [{ role: 'desc' }, { joinedAt: 'asc' }],
          take: 6,
          select: { user: { select: { id: true, fullName: true, avatarUrl: true } } },
        }),
        this.prisma.post.findFirst({
          where: {
            communityId: community.id,
            status: 'ACTIVE',
            postType: { in: ['QUESTION', 'DISCUSSION', 'WIN'] },
          },
          orderBy: { lastActivityAt: 'desc' },
          select: {
            id: true,
            title: true,
            contentText: true,
            postType: true,
            commentCount: true,
            likeCount: true,
            user: { select: { fullName: true, avatarUrl: true } },
          },
        }),
        this.prisma.post.count({ where: { communityId: community.id, status: 'ACTIVE' } }),
      ]);

      return {
        communityId: community.id,
        courseId,
        name: community.name,
        courseTitle: community.course?.title ?? community.name,
        thumbnailUrl: community.course?.thumbnailUrl ?? null,
        // memberCount was refreshed by ensureMembership, so this includes them.
        memberCount: await this.prisma.community
          .findUnique({ where: { id: community.id }, select: { memberCount: true } })
          .then((c) => c?.memberCount ?? community.memberCount + 1),
        postCount,
        instructor: community.course?.instructor ?? null,
        members: faces.map((f) => ({
          id: f.user.id,
          fullName: f.user.fullName,
          avatarUrl: f.user.avatarUrl,
        })),
        samplePost: sampleQuestion
          ? {
              id: sampleQuestion.id,
              postType: sampleQuestion.postType,
              title: sampleQuestion.title,
              excerpt: sampleQuestion.contentText.slice(0, 180),
              commentCount: sampleQuestion.commentCount,
              likeCount: sampleQuestion.likeCount,
              authorName: sampleQuestion.user?.fullName ?? 'A learner',
              authorAvatarUrl: sampleQuestion.user?.avatarUrl ?? null,
            }
          : null,
      };
    } catch (err) {
      // Never let the community get in the way of finishing a lesson.
      this.logger.warn(`Second-lesson seating failed for course ${courseId}`, err as Error);
      return null;
    }
  }

  // ── Leaderboards ───────────────────────────────────────────────────────────

  /**
   * Community points measure *showing up for other learners*, not learning:
   *   post authored            +3
   *   comment authored         +1
   *   like received on post    +2
   *   like received on comment +1
   * Self-likes never pay. Every contribution is windowed by the timestamp of
   * the action itself (the like, not the post it landed on), so a two-month-old
   * post that gets liked today scores in this week's board — same as Skool.
   *
   * One SQL round trip returns the whole board; the caller's own row is derived
   * from it in JS rather than costing a second ranked query.
   */
  async getLeaderboard(
    communityId: string,
    viewerId: string,
    opts: { window?: LeaderboardWindow; limit?: number } = {},
  ) {
    const window: LeaderboardWindow = opts.window ?? '30d';
    const limit = Math.min(100, Math.max(3, opts.limit ?? 30));
    const since = windowStart(window);

    const rows = await this.prisma.$queryRaw<
      {
        userId: string;
        fullName: string;
        avatarUrl: string | null;
        isCreator: boolean;
        streakDays: number | null;
        points: number;
      }[]
    >(Prisma.sql`
      WITH scoped_posts AS (
        SELECT p."id", p."userId", p."createdAt"
        FROM "posts" p
        WHERE p."communityId" = ${communityId} AND p."status" = 'ACTIVE'
      ),
      scoped_comments AS (
        SELECT c."id", c."userId", c."createdAt"
        FROM "comments" c
        JOIN scoped_posts sp ON sp."id" = c."postId"
        WHERE c."status" = 'ACTIVE'
      ),
      contributions AS (
        SELECT sp."userId" AS "userId", 3 AS pts
        FROM scoped_posts sp
        WHERE ${since}::timestamptz IS NULL OR sp."createdAt" >= ${since}::timestamptz
        UNION ALL
        SELECT sc."userId", 1
        FROM scoped_comments sc
        WHERE ${since}::timestamptz IS NULL OR sc."createdAt" >= ${since}::timestamptz
        UNION ALL
        SELECT sp."userId", 2
        FROM "likes" l
        JOIN scoped_posts sp ON sp."id" = l."entityId"
        WHERE l."entityType" = 'POST'
          AND l."userId" <> sp."userId"
          AND (${since}::timestamptz IS NULL OR l."createdAt" >= ${since}::timestamptz)
        UNION ALL
        SELECT sc."userId", 1
        FROM "likes" l
        JOIN scoped_comments sc ON sc."id" = l."entityId"
        WHERE l."entityType" = 'COMMENT'
          AND l."userId" <> sc."userId"
          AND (${since}::timestamptz IS NULL OR l."createdAt" >= ${since}::timestamptz)
      )
      SELECT
        u."id"          AS "userId",
        u."fullName"    AS "fullName",
        u."avatarUrl"   AS "avatarUrl",
        (m."role" = 'ADMIN') AS "isCreator",
        prof."streakDays" AS "streakDays",
        SUM(c.pts)::int AS "points"
      FROM contributions c
      JOIN "User" u ON u."id" = c."userId"
      JOIN "community_memberships" m
        ON m."userId" = u."id" AND m."communityId" = ${communityId}
      LEFT JOIN "student_profiles" prof ON prof."userId" = u."id"
      GROUP BY u."id", u."fullName", u."avatarUrl", m."role", prof."streakDays"
      HAVING SUM(c.pts) > 0
      ORDER BY "points" DESC, u."fullName" ASC
    `);

    const entries = rows.map((r, i) => ({
      rank: i + 1,
      userId: r.userId,
      fullName: r.fullName,
      avatarUrl: r.avatarUrl,
      isCreator: r.isCreator,
      streakDays: r.streakDays ?? 0,
      points: r.points,
    }));

    const mine = entries.find((e) => e.userId === viewerId) ?? null;

    return {
      window,
      entries: entries.slice(0, limit),
      /** Total scored members — the returned board is truncated, this is not. */
      scoredMembers: entries.length,
      me: mine ? { rank: mine.rank, points: mine.points } : { rank: null, points: 0 },
    };
  }

  /**
   * The Leaderboards tab payload: all three windows plus the caller's level
   * card. Four ranked queries would be four sequential round trips against a
   * far-away Supabase, so they fire together.
   */
  async getLeaderboardBundle(communityId: string, viewerId: string, userRole?: string) {
    await this.assertMember(communityId, viewerId, userRole);

    const [weekly, monthly, allTime, distribution] = await Promise.all([
      this.getLeaderboard(communityId, viewerId, { window: '7d', limit: 30 }),
      this.getLeaderboard(communityId, viewerId, { window: '30d', limit: 30 }),
      this.getLeaderboard(communityId, viewerId, { window: 'all', limit: 30 }),
      this.getLevelDistribution(communityId),
    ]);

    const myPoints = allTime.me.points;
    const level = levelForPoints(myPoints);

    return {
      weekly,
      monthly,
      allTime,
      me: {
        points: myPoints,
        level: level.level,
        levelName: level.name,
        pointsToNextLevel: pointsToNextLevel(myPoints),
        /** 0–1 fill of the ring drawn around the avatar. */
        levelProgress: levelProgressFraction(myPoints),
      },
      levels: COMMUNITY_LEVELS.map((rung) => ({
        level: rung.level,
        name: rung.name,
        minPoints: rung.minPoints,
        unlocks: rung.unlocks,
        /** Share of members sitting at this rung, whole percent. */
        memberPct: distribution[rung.level] ?? 0,
      })),
    };
  }

  /**
   * Percentage of members at each rung. Members with zero points never appear
   * in the scored CTE, so they are folded back in as level 1 — otherwise a
   * community of lurkers would report "0% of members" on every rung including
   * the one they are actually standing on.
   */
  private async getLevelDistribution(communityId: string): Promise<Record<number, number>> {
    const [scored, memberCount] = await Promise.all([
      this.prisma.$queryRaw<{ userId: string; points: number }[]>(Prisma.sql`
        WITH scoped_posts AS (
          SELECT p."id", p."userId" FROM "posts" p
          WHERE p."communityId" = ${communityId} AND p."status" = 'ACTIVE'
        ),
        scoped_comments AS (
          SELECT c."id", c."userId" FROM "comments" c
          JOIN scoped_posts sp ON sp."id" = c."postId"
          WHERE c."status" = 'ACTIVE'
        ),
        contributions AS (
          SELECT sp."userId" AS "userId", 3 AS pts FROM scoped_posts sp
          UNION ALL SELECT sc."userId", 1 FROM scoped_comments sc
          UNION ALL
          SELECT sp."userId", 2 FROM "likes" l
          JOIN scoped_posts sp ON sp."id" = l."entityId"
          WHERE l."entityType" = 'POST' AND l."userId" <> sp."userId"
          UNION ALL
          SELECT sc."userId", 1 FROM "likes" l
          JOIN scoped_comments sc ON sc."id" = l."entityId"
          WHERE l."entityType" = 'COMMENT' AND l."userId" <> sc."userId"
        )
        SELECT c."userId" AS "userId", SUM(c.pts)::int AS "points"
        FROM contributions c
        JOIN "community_memberships" m
          ON m."userId" = c."userId" AND m."communityId" = ${communityId}
        GROUP BY c."userId"
      `),
      this.prisma.communityMembership.count({ where: { communityId } }),
    ]);

    const counts: Record<number, number> = {};
    for (const row of scored) {
      const lvl = levelForPoints(row.points).level;
      counts[lvl] = (counts[lvl] ?? 0) + 1;
    }
    counts[1] = (counts[1] ?? 0) + Math.max(0, memberCount - scored.length);

    const total = Math.max(1, memberCount);
    const pct: Record<number, number> = {};
    for (const rung of COMMUNITY_LEVELS) {
      pct[rung.level] = Math.round(((counts[rung.level] ?? 0) / total) * 100);
    }
    return pct;
  }
}

export type LeaderboardWindow = '7d' | '30d' | 'all';

/** Inclusive lower bound for a window, or null for all-time. */
function windowStart(window: LeaderboardWindow): Date | null {
  if (window === 'all') return null;
  const days = window === '7d' ? 7 : 30;
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

/** How far through the current rung a point total sits (0–1). */
function levelProgressFraction(points: number): number {
  const current = levelForPoints(points);
  const next = COMMUNITY_LEVELS.find((r) => r.level === current.level + 1);
  if (!next) return 1;
  const span = next.minPoints - current.minPoints;
  if (span <= 0) return 1;
  return Math.max(0, Math.min(1, (points - current.minPoints) / span));
}
