import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TeyNotifyService } from '../tey/notify/tey-notify.service';
import { BuddyService, firstName } from './buddy.service';
import { HelpService } from './help.service';
import { NetworkEventsService } from './network-events.service';
import { RankingModelService } from './ranking-model.service';
import { ReviewService } from './review.service';
import { rankFeed, type RankInput } from './feed-rank';
import {
  CHEER_ENTITY,
  FEED_CANDIDATES,
  FEED_WINDOW_DAYS,
  SHARED_CODE_MAX,
  SHARES_PER_DAY,
  INBOX,
  type ActivityType,
} from './network.constants';

/** What a card carries, written once by the listener so a read needs no joins. */
export interface ActivityMeta {
  courseId?: string;
  courseTitle?: string;
  courseSlug?: string;
  courseThumb?: string | null;
  lessonId?: string;
  lessonTitle?: string;
  streakDays?: number;
  achievementName?: string;
  achievementDescription?: string;
  /** Set on COURSE_STARTED when a friend's card brought them here. */
  inspiredById?: string;
  inspiredByName?: string;
  /** WORK_SHARED: what they built. */
  language?: 'python' | 'sql';
  code?: string;
}

interface RawCard {
  id: string;
  userId: string;
  activityType: string;
  entityId: string;
  metadata: unknown;
  createdAt: Date;
  authorName: string | null;
  authorAvatar: string | null;
  cheerCount: number;
  cheeredByMe: boolean;
  authorProgress: number | null;
  viewerProgress: number | null;
}

type Row = RankInput & Omit<RawCard, 'activityType' | 'metadata' | 'authorProgress' | 'viewerProgress'> & { metadata: ActivityMeta };

const CARD_NOUN: Record<ActivityType, string> = {
  COURSE_STARTED: 'new course',
  LESSON_COMPLETED: 'lesson',
  STREAK_MILESTONE: 'streak',
  ACHIEVEMENT_UNLOCKED: 'achievement',
  COURSE_FINISHED: 'finished course',
  WORK_SHARED: 'code',
};

/**
 * The learning feed: what the people around you are learning, ranked by how
 * likely each card is to get YOU learning. Fan-out on read — one bounded,
 * indexed scan of `activity_feed`, scored in memory, then hydrated with two
 * batched reads (authors, cheers). No per-card queries.
 */
@Injectable()
export class NetworkFeedService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly buddies: BuddyService,
    private readonly hub: TeyNotifyService,
    private readonly events: NetworkEventsService,
    private readonly reviews: ReviewService,
    private readonly help: HelpService,
    private readonly ranking: RankingModelService,
  ) {}

  async feed(viewerId: string) {
    const since = new Date(Date.now() - FEED_WINDOW_DAYS * 86_400_000);
    // One parallel batch = one database round trip. The candidate query
    // resolves "who is in my network" itself (buddies, follows, classmates)
    // and carries author + cheer counts, so nothing is fetched per card.
    const [rows, buddyIds, follows, enrolments, reviews, model] = await Promise.all([
      this.cardRows(
        viewerId,
        Prisma.sql`a."createdAt" >= ${since} AND a."userId" <> ${viewerId} AND (
          a."userId" IN (
            SELECT CASE WHEN "requesterId" = ${viewerId} THEN "addresseeId" ELSE "requesterId" END
            FROM study_buddies
            WHERE status = 'ACCEPTED' AND ("requesterId" = ${viewerId} OR "addresseeId" = ${viewerId}))
          OR a."userId" IN (SELECT "followingId" FROM user_follows WHERE "followerId" = ${viewerId})
          OR EXISTS (
            SELECT 1 FROM "Enrollment" e
            WHERE e."userId" = a."userId"
              AND e."courseId" IN (SELECT "courseId" FROM "Enrollment" WHERE "userId" = ${viewerId})))`,
        FEED_CANDIDATES,
      ),
      this.buddies.buddyIdsOf(viewerId),
      this.prisma.userFollow.findMany({ where: { followerId: viewerId }, select: { followingId: true } }),
      this.prisma.enrollment.findMany({ where: { userId: viewerId }, select: { courseId: true } }),
      // Your own due questions, answered in the feed (the client slots them in).
      this.reviews.due(viewerId).catch(() => []),
      // The learned ranking, when one is switched on (cached in memory).
      this.ranking.active().catch(() => null),
    ]);
    const hasNetwork = buddyIds.length > 0 || follows.length > 0 || enrolments.length > 0;
    const buddies = new Set(buddyIds);
    const enrolled = new Set(enrolments.map((e) => e.courseId));

    const ranked = rankFeed(rows, {
      buddies,
      follows: new Set(follows.map((f) => f.followingId)),
      enrolled,
      now: new Date(),
      model,
    });
    const items = ranked.map((r) => this.view(r.card, 1 + r.folded.length, viewerId, buddies, enrolled));
    return { items, reviews, caughtUp: true, hasNetwork };
  }

  /** One person's recent learning, newest first — the profile timeline. */
  async timeline(viewerId: string, userId: string) {
    const [rows, relation, buddyIds, enrolments, helped] = await Promise.all([
      this.cardRows(viewerId, Prisma.sql`a."userId" = ${userId}`, 20),
      this.buddies.relation(viewerId, userId),
      this.buddies.buddyIdsOf(viewerId),
      this.prisma.enrollment.findMany({ where: { userId: viewerId }, select: { courseId: true } }),
      this.help.helpedCount(userId),
    ]);
    const buddies = new Set(buddyIds);
    const enrolled = new Set(enrolments.map((e) => e.courseId));
    return { items: rows.map((r) => this.view(r, 1, viewerId, buddies, enrolled)), relation, helped };
  }

  /**
   * Proof of work: code that just passed every check in a lesson, shared to
   * the feed. One card per lesson (a re-share replaces it), a few a day, only
   * from a lesson in a course you're taking. Shown as text — never run.
   */
  async shareWork(userId: string, input: { lessonId: string; language: 'python' | 'sql'; code: string }) {
    const code = input.code.replace(/\u0000/g, '').slice(0, SHARED_CODE_MAX).trimEnd();
    if (!code.trim()) throw new BadRequestException('There is no code to share.');

    const startOfDay = new Date(Math.floor(Date.now() / 86_400_000) * 86_400_000);
    const [lesson, sharedToday] = await Promise.all([
      this.prisma.lesson.findUnique({
        where: { id: input.lessonId },
        select: { id: true, title: true, section: { select: { courseId: true } } },
      }),
      this.prisma.activityFeed.count({ where: { userId, activityType: 'WORK_SHARED', createdAt: { gte: startOfDay } } }),
    ]);
    if (!lesson) throw new NotFoundException('That lesson is gone.');
    if (sharedToday >= SHARES_PER_DAY) throw new ConflictException('That is plenty of sharing for today. Come back tomorrow.');
    const courseId = lesson.section.courseId;
    const [enrolled, course] = await Promise.all([
      this.prisma.enrollment.findUnique({ where: { userId_courseId: { userId, courseId } }, select: { id: true } }),
      this.prisma.course.findUnique({ where: { id: courseId }, select: { title: true, slug: true, thumbnailUrl: true } }),
    ]);
    if (!enrolled) throw new BadRequestException('You can only share work from a course you are taking.');

    const metadata: ActivityMeta = {
      courseId,
      courseTitle: course?.title,
      courseSlug: course?.slug,
      courseThumb: course?.thumbnailUrl,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      language: input.language,
      code,
    };
    const card = await this.prisma.activityFeed.upsert({
      where: { userId_activityType_entityId: { userId, activityType: 'WORK_SHARED', entityId: lesson.id } },
      create: { userId, activityType: 'WORK_SHARED', entityType: 'lesson', entityId: lesson.id, metadata: metadata as Prisma.InputJsonValue },
      update: { metadata: metadata as Prisma.InputJsonValue, createdAt: new Date() },
      select: { id: true },
    });
    return { shared: true, activityId: card.id };
  }

  /** Cheer (or un-cheer) a card. Cheers never pay Coins. */
  async cheer(viewerId: string, activityId: string) {
    const key = { userId_entityType_entityId: { userId: viewerId, entityType: CHEER_ENTITY, entityId: activityId } };
    // Three round trips: read (card + my cheer), write, then count + name.
    const [card, existing] = await Promise.all([
      this.prisma.activityFeed.findUnique({
        where: { id: activityId },
        select: { id: true, userId: true, activityType: true, metadata: true },
      }),
      this.prisma.like.findUnique({ where: key, select: { id: true } }),
    ]);
    if (!card) throw new NotFoundException('That card is gone.');
    if (card.userId === viewerId) throw new BadRequestException("You can't cheer your own card.");

    if (existing) {
      await this.prisma.like.delete({ where: key });
    } else {
      await this.prisma.like.create({ data: { userId: viewerId, entityType: CHEER_ENTITY, entityId: activityId } });
    }
    const [cheerCount, actor] = await Promise.all([
      this.prisma.like.count({ where: { entityType: CHEER_ENTITY, entityId: activityId } }),
      existing ? Promise.resolve(null) : this.prisma.user.findUnique({ where: { id: viewerId }, select: { fullName: true } }),
    ]);

    if (!existing) {
      void this.events.log({
        userId: viewerId,
        kind: 'CHEER',
        activityId,
        authorId: card.userId,
        courseId: (card.metadata as ActivityMeta | null)?.courseId ?? null,
      });
      const others = cheerCount - 1;
      const noun = CARD_NOUN[card.activityType as ActivityType] ?? 'progress';
      const who = firstName(actor?.fullName);
      void this.hub.notify({
        userId: card.userId,
        kind: 'NETWORK_CHEER',
        actorId: viewerId,
        title: others > 0 ? `${who} and ${others} other${others === 1 ? '' : 's'} cheered your ${noun}` : `${who} cheered your ${noun}`,
        body: 'Keep it going. Your next lesson is ready.',
        url: '/dashboard/feed?tab=friends',
        dedupeKey: `cheer:${activityId}:${viewerId}`,
        // One bell row per card per day, counting up.
        inbox: { type: INBOX.NETWORK_CHEER, entityType: 'ACTIVITY', entityId: activityId, collapseDaily: true },
      });
    }
    return { cheered: !existing, cheerCount };
  }

  /**
   * Cards with their author and cheer counts in a single query. Cheer counts
   * are index lookups on likes(entityType, entityId), so carrying them for
   * every candidate is cheaper than a second round trip for the winners.
   */
  private async cardRows(viewerId: string, where: Prisma.Sql, limit: number): Promise<Row[]> {
    const rows = await this.prisma.$queryRaw<RawCard[]>(Prisma.sql`
      SELECT a.id, a."userId", a."activityType", a."entityId", a.metadata, a."createdAt",
             u."fullName" AS "authorName", COALESCE(p."avatarUrl", u."avatarUrl") AS "authorAvatar",
             (SELECT count(*)::int FROM likes l WHERE l."entityType" = ${CHEER_ENTITY} AND l."entityId" = a.id) AS "cheerCount",
             EXISTS (SELECT 1 FROM likes l WHERE l."entityType" = ${CHEER_ENTITY} AND l."entityId" = a.id AND l."userId" = ${viewerId}) AS "cheeredByMe",
             -- Near-peer: the author's and the viewer's progress in the card's course.
             ae.progress AS "authorProgress", ve.progress AS "viewerProgress"
      FROM activity_feed a
      JOIN "User" u ON u.id = a."userId"
      LEFT JOIN "Profile" p ON p."userId" = u.id
      LEFT JOIN "Enrollment" ae ON ae."userId" = a."userId" AND ae."courseId" = a.metadata->>'courseId'
      LEFT JOIN "Enrollment" ve ON ve."userId" = ${viewerId} AND ve."courseId" = a.metadata->>'courseId'
      WHERE ${where}
      ORDER BY a."createdAt" DESC
      LIMIT ${limit}`);
    return rows.map(({ authorProgress, viewerProgress, ...r }) => {
      const metadata = (r.metadata ?? {}) as ActivityMeta;
      return {
        ...r,
        activityType: r.activityType as ActivityType,
        courseId: metadata.courseId ?? null,
        metadata,
        progressLead: authorProgress !== null && viewerProgress !== null ? authorProgress - viewerProgress : null,
      };
    });
  }

  private view(card: Row, count: number, viewerId: string, buddies: ReadonlySet<string>, enrolled: ReadonlySet<string>) {
    const m = card.metadata;
    return {
      id: card.id,
      type: card.activityType,
      createdAt: card.createdAt,
      author: {
        id: card.userId,
        name: card.authorName ?? 'Learner',
        avatar: card.authorAvatar,
        isBuddy: buddies.has(card.userId),
      },
      course: m.courseId
        ? { id: m.courseId, title: m.courseTitle ?? 'a course', slug: m.courseSlug ?? null, thumbnailUrl: m.courseThumb ?? null, enrolled: enrolled.has(m.courseId) }
        : null,
      lessonTitle: m.lessonTitle ?? null,
      lessonCount: count,
      streakDays: m.streakDays ?? null,
      achievement: m.achievementName ? { name: m.achievementName, description: m.achievementDescription ?? null } : null,
      inspiredBy: m.inspiredById ? { id: m.inspiredById, name: m.inspiredByName ?? 'a friend' } : null,
      work: m.code ? { language: m.language ?? 'python', code: m.code } : null,
      cheerCount: card.cheerCount,
      cheeredByMe: card.cheeredByMe,
      isMine: card.userId === viewerId,
    };
  }
}
