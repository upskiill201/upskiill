import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CommunityService } from './community.service';

export type FeedType = 'all' | 'question' | 'win' | 'announcement';

interface RawFeedRow {
  id: string;
  postType: string;
  title: string | null;
  excerpt: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isPinned: boolean;
  lastActivityAt: Date;
  createdAt: Date;
  authorId: string;
  authorName: string;
  authorAvatar: string | null;
  authorStreak: number | null;
  lessonId: string | null;
  lessonTitle: string | null;
  courseId: string | null;
  courseTitle: string | null;
  courseSlug: string | null;
  courseThumb: string | null;
  communityId: string;
  communityName: string;
  likedByMe: boolean;
  score: number;
}

const FEED_WINDOW_DAYS = 30;

@Injectable()
export class FeedService {
  constructor(
    private prisma: PrismaService,
    private communityService: CommunityService,
  ) {}

  /**
   * Personalized global feed: the best recent posts from every community the
   * learner belongs to. Posts stay owned by their community — this is a
   * discovery layer computed over them (no fan-out table).
   *
   * Ranking: engagement + recency decay + affinity boosts
   *   (announcements, followed authors, in-progress courses; own posts sink).
   */
  async getFeed(
    viewer: { id: string; role?: string },
    opts: { page?: number; pageSize?: number; type?: FeedType } = {},
  ) {
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(30, Math.max(1, opts.pageSize ?? 15));

    const typeFilter =
      opts.type === 'question'
        ? `AND p."postType" IN ('QUESTION', 'DISCUSSION')`
        : opts.type === 'win'
          ? `AND p."postType" IN ('WIN', 'MILESTONE', 'ACHIEVEMENT')`
          : opts.type === 'announcement'
            ? `AND p."postType" IN ('ANNOUNCEMENT', 'CHALLENGE')`
            : '';

    const rows = await this.prisma.$queryRaw<RawFeedRow[]>(Prisma.sql`
      WITH my_communities AS (
        SELECT m."communityId", c."id" AS "courseId"
        FROM "community_memberships" m
        JOIN "communities" c ON c."id" = m."communityId"
        WHERE m."userId" = ${viewer.id}
      ),
      my_courses AS (
        SELECT DISTINCT e."courseId" FROM "Enrollment" e WHERE e."userId" = ${viewer.id}
      ),
      in_progress AS (
        -- courses where at least one enrolled lesson is still unfinished
        SELECT DISTINCT sec."courseId"
        FROM "user_lesson_progress" ulp
        JOIN "course_lessons" l2 ON l2."id" = ulp."lessonId"
        JOIN "course_sections" sec ON sec."id" = l2."sectionId"
        WHERE ulp."userId" = ${viewer.id}
          AND ulp."status" IN ('in_progress', 'unlocked')
      ),
      followed_authors AS (
        SELECT uf."followingId" FROM "user_follows" uf WHERE uf."followerId" = ${viewer.id}
      )
      SELECT
        p."id", p."postType", p."title",
        LEFT(p."contentText", 280) AS "excerpt",
        p."likeCount", p."commentCount", p."viewCount", p."isPinned",
        p."lastActivityAt", p."createdAt",
        u."id" AS "authorId", u."fullName" AS "authorName",
        u."avatarUrl" AS "authorAvatar", sp."streakDays" AS "authorStreak",
        p."lessonId", l."title" AS "lessonTitle",
        co."id" AS "courseId", co."title" AS "courseTitle",
        co."slug" AS "courseSlug", co."thumbnailUrl" AS "courseThumb",
        cm."id" AS "communityId", cm."name" AS "communityName",
        EXISTS (
          -- folded in here so the whole feed is ONE round trip even when the
          -- DB is far away (staging Supabase is ~700ms per query from dev)
          SELECT 1 FROM "likes" lk
          WHERE lk."userId" = ${viewer.id}
            AND lk."entityType" = 'POST'
            AND lk."entityId" = p."id"
        ) AS "likedByMe",
        (
          p."likeCount" * 1 + p."commentCount" * 2
          + GREATEST(0, 72 - EXTRACT(EPOCH FROM (NOW() - p."lastActivityAt")) / 3600)::int * 3
          + CASE WHEN p."postType" IN ('ANNOUNCEMENT', 'CHALLENGE') THEN 50 ELSE 0 END
          + CASE WHEN EXISTS (
              SELECT 1 FROM followed_authors fa WHERE fa."followingId" = p."userId"
            ) THEN 30 ELSE 0 END
          + CASE WHEN EXISTS (
              SELECT 1 FROM my_courses mc WHERE mc."courseId" = p."courseId"
            ) AND EXISTS (
              SELECT 1 FROM in_progress ip WHERE ip."courseId" = p."courseId"
            ) THEN 40 ELSE 0 END
          - CASE WHEN p."userId" = ${viewer.id} THEN 80 ELSE 0 END
        )::int AS "score"
      FROM posts p
      JOIN my_communities mc2 ON mc2."communityId" = p."communityId"
      JOIN communities cm ON cm."id" = p."communityId"
      JOIN "User" u ON u."id" = p."userId"
      LEFT JOIN "student_profiles" sp ON sp."userId" = u."id"
      LEFT JOIN "course_lessons" l ON l."id" = p."lessonId"
      LEFT JOIN "Course" co ON co."id" = p."courseId"
      WHERE p."status" = 'ACTIVE'
        AND p."isPinned" = false
        AND p."lastActivityAt" > NOW() - INTERVAL '${Prisma.raw(String(FEED_WINDOW_DAYS))} days'
        ${Prisma.raw(typeFilter)}
      ORDER BY "score" DESC, p."lastActivityAt" DESC
      LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}
    `);

    return {
      page,
      pageSize,
      items: rows.map((r) => ({
        reason: this.reasonFor(r),
        reasonKind: this.reasonKindFor(r),
        likedByMe: r.likedByMe,
        post: {
          id: r.id,
          postType: r.postType,
          title: r.title,
          excerpt: r.excerpt,
          likeCount: r.likeCount,
          commentCount: r.commentCount,
          lastActivityAt: r.lastActivityAt,
          createdAt: r.createdAt,
          author: {
            id: r.authorId,
            fullName: r.authorName,
            avatarUrl: r.authorAvatar,
            streakDays: r.authorStreak ?? 0,
          },
          lesson: r.lessonId ? { id: r.lessonId, title: r.lessonTitle } : null,
        },
        community: {
          id: r.communityId,
          name: r.communityName,
          courseId: r.courseId,
          courseTitle: r.courseTitle,
          courseSlug: r.courseSlug,
          courseThumbnailUrl: r.courseThumb,
        },
      })),
    };
  }

  /**
   * Short display labels — the community name renders in the card header, so
   * reasons stay compact (the old "From your X community" string made cards
   * announce every community twice).
   */
  private reasonFor(r: RawFeedRow): string {
    const kind = this.reasonKindFor(r);
    switch (kind) {
      case 'announcement': return 'Creator announcement';
      case 'unanswered': return 'Unanswered question';
      case 'win': return 'Community win';
      case 'active': return 'Active discussion';
      case 'course': return 'From your course';
      default: return 'From your communities';
    }
  }

  /** Structured kind behind the label — drives the pill's icon and tint. */
  private reasonKindFor(
    r: RawFeedRow,
  ): 'announcement' | 'unanswered' | 'win' | 'active' | 'course' | 'general' {
    if (r.postType === 'ANNOUNCEMENT' || r.postType === 'CHALLENGE') return 'announcement';
    if (r.postType === 'QUESTION' && r.commentCount === 0) return 'unanswered';
    if (r.postType === 'WIN' || r.postType === 'MILESTONE') return 'win';
    if (r.commentCount >= 3) return 'active';
    return 'general';
  }

  /**
   * Rule-based recommended learning content for the feed rail (no AI —
   * Phase One guard). Three card kinds: continue-learning, unanswered
   * questions from your communities, liveliest discussion.
   */
  async getDiscover(viewer: { id: string }) {
    const [continueCards, questionCards, discussionCard] = await Promise.all([
      this.getContinueLearning(viewer.id),
      this.prisma.post.findMany({
        where: {
          status: 'ACTIVE',
          postType: 'QUESTION',
          commentCount: 0,
          community: { memberships: { some: { userId: viewer.id } } },
        },
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: {
          id: true,
          title: true,
          contentText: true,
          createdAt: true,
          community: {
            select: { name: true, course: { select: { id: true, title: true } } },
          },
        },
      }),
      this.prisma.post.findFirst({
        where: {
          status: 'ACTIVE',
          lastActivityAt: { gte: new Date(Date.now() - 7 * 24 * 3600 * 1000) },
          community: { memberships: { some: { userId: viewer.id } } },
        },
        orderBy: [{ commentCount: 'desc' }, { lastActivityAt: 'desc' }],
        select: {
          id: true,
          title: true,
          commentCount: true,
          likeCount: true,
          community: {
            select: { name: true, course: { select: { id: true, title: true } } },
          },
        },
      }),
    ]);

    return {
      continueLearning: continueCards,
      questions: questionCards.map((q) => ({
        postId: q.id,
        title: q.title ?? q.contentText.slice(0, 90),
        communityName: q.community?.name ?? '',
        courseId: q.community?.course?.id ?? null,
      })),
      activeDiscussion: discussionCard
        ? {
            postId: discussionCard.id,
            title:
              discussionCard.title ??
              `Discussion with ${discussionCard.commentCount} replies`,
            commentCount: discussionCard.commentCount,
            likeCount: discussionCard.likeCount,
            communityName: discussionCard.community?.name ?? '',
            courseId: discussionCard.community?.course?.id ?? null,
          }
        : null,
    };
  }

  /** Next unfinished lesson per active course (max 3), via lesson progress rows. */
  private async getContinueLearning(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: {
        courseId: true,
        progress: true,
        course: { select: { id: true, title: true, thumbnailUrl: true, slug: true } },
      },
    });

    const cards: Array<{
      kind: 'continue';
      courseId: string;
      courseTitle: string;
      thumbnailUrl: string | null;
      progressPct: number;
    }> = [];

    for (const e of enrollments) {
      if (cards.length >= 3) break;
      cards.push({
        kind: 'continue',
        courseId: e.course.id,
        courseTitle: e.course.title,
        thumbnailUrl: e.course.thumbnailUrl,
        progressPct: e.progress,
      });
    }
    return cards;
  }
}
