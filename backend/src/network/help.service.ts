import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { CommentCreatedEvent, PostCreatedEvent } from '../community/events/community.events';
import { LessonCompletedEvent } from '../course/events/lesson-completed.event';
import { AchievementsService } from '../gamification/achievements.service';
import { PrismaService } from '../prisma/prisma.service';
import { TeyNotifyService } from '../tey/notify/tey-notify.service';
import { firstName } from './buddy.service';
import { HELP_ROUTE_MAX_PER_DAY, HELPERS_PER_QUESTION, INBOX } from './network.constants';

const DAY_MS = 86_400_000;

interface HelperRow {
  id: string;
  completedAt: Date | null;
  lastActiveAt: Date | null;
  isBuddy: boolean;
  helped: number;
  routedToday: number;
}

/** Pure, for tests: who among those who passed the lesson should we ask? */
export function pickHelpers(rows: HelperRow[], now: Date, count = HELPERS_PER_QUESTION): HelperRow[] {
  const scored = rows
    .filter((r) => r.routedToday < HELP_ROUTE_MAX_PER_DAY)
    .map((r) => {
      let score = 0;
      if (r.isBuddy) score += 5;
      const sincePassed = r.completedAt ? (now.getTime() - r.completedAt.getTime()) / DAY_MS : 999;
      // Fresh from the lesson: they still remember where it gets hard.
      if (sincePassed <= 14) score += 2;
      else if (sincePassed <= 60) score += 1;
      const idle = r.lastActiveAt ? (now.getTime() - r.lastActiveAt.getTime()) / DAY_MS : 999;
      if (idle <= 2) score += 2;
      else if (idle <= 7) score += 1;
      // Has helped before — but only a nudge, so it never becomes the same
      // three people answering everything.
      if (r.helped > 0) score += 1;
      return { r, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.r);
}

/**
 * Help & teaching (docs/TEYRO_NETWORK_PLAN.md phase 3). Teaching someone a
 * lesson is one of the best ways to learn it, so a question about a lesson
 * goes to a few people who just passed it:
 *
 *   QUESTION post on a lesson → ask up to 3 who passed it (buddies first,
 *     fresh from it, active) → HELP_REQUEST
 *   anyone answers            → help_routes.answeredAt
 *   the asker then finishes that lesson → helpedAt, HELP_WORKED to every
 *     answerer ("Your answer helped Ada finish …"), Helper badge re-checked
 *
 * Credit comes from the outcome (they got through the lesson), never from
 * likes — so it can't be farmed, and it never pays Coins.
 */
@Injectable()
export class HelpService {
  private readonly logger = new Logger(HelpService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly hub: TeyNotifyService,
    private readonly achievements: AchievementsService,
  ) {}

  @OnEvent('community.post.created', { async: true })
  async onPostCreated(event: PostCreatedEvent) {
    if (event.postType !== 'QUESTION') return;
    try {
      await this.route(event.postId);
    } catch (err) {
      this.logger.warn(`help routing failed: ${(err as Error).message}`);
    }
  }

  /** Public for the e2e script. Returns the helper ids asked. */
  async route(postId: string): Promise<string[]> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        userId: true,
        lessonId: true,
        courseId: true,
        postType: true,
        lesson: { select: { title: true } },
        course: { select: { instructorId: true } },
        user: { select: { fullName: true } },
      },
    });
    if (!post || post.postType !== 'QUESTION' || !post.lessonId || !post.courseId) return [];
    const creatorId = post.course?.instructorId ?? '';

    const rows = await this.prisma.$queryRaw<HelperRow[]>(Prisma.sql`
      SELECT p."userId" AS id, p."completedAt", sp."lastActiveAt",
             EXISTS (
               SELECT 1 FROM study_buddies b
               WHERE b.status = 'ACCEPTED'
                 AND ((b."requesterId" = p."userId" AND b."addresseeId" = ${post.userId})
                   OR (b."addresseeId" = p."userId" AND b."requesterId" = ${post.userId}))
             ) AS "isBuddy",
             (SELECT COUNT(*) FROM help_routes h WHERE h."helperId" = p."userId" AND h."helpedAt" IS NOT NULL)::int AS helped,
             (SELECT COUNT(*) FROM help_routes h
               WHERE h."helperId" = p."userId" AND h."routedAt" >= ${new Date(Date.now() - DAY_MS)})::int AS "routedToday"
      FROM user_lesson_progress p
      JOIN student_profiles sp ON sp."userId" = p."userId"
      WHERE p."lessonId" = ${post.lessonId} AND p.status = 'completed'
        AND p."userId" <> ${post.userId} AND p."userId" <> ${creatorId}
        AND sp."lastActiveAt" >= ${new Date(Date.now() - 14 * DAY_MS)}
      ORDER BY sp."lastActiveAt" DESC
      LIMIT 200`);

    const now = new Date();
    const helpers = pickHelpers(rows, now);
    if (helpers.length === 0) return [];

    await this.prisma.helpRoute.createMany({
      data: helpers.map((h) => ({
        postId: post.id,
        askerId: post.userId,
        helperId: h.id,
        lessonId: post.lessonId!,
        courseId: post.courseId!,
        routedAt: now,
      })),
      skipDuplicates: true,
    });

    const asker = firstName(post.user?.fullName);
    const lesson = post.lesson?.title ?? 'a lesson';
    for (const h of helpers) {
      const days = h.completedAt ? Math.max(0, Math.round((now.getTime() - h.completedAt.getTime()) / DAY_MS)) : null;
      await this.hub.notify({
        userId: h.id,
        kind: 'HELP_REQUEST',
        actorId: post.userId,
        title: `${asker} is stuck on ${lesson}`,
        body:
          days === null
            ? 'You passed it. A quick answer helps them keep going.'
            : `You passed it ${days === 0 ? 'today' : days === 1 ? 'yesterday' : `${days} days ago`}. Explaining it helps you remember it too.`,
        url: `/dashboard/community/${post.courseId}/p/${post.id}`,
        dedupeKey: `help:${post.id}:${h.id}`,
        tag: `network-help-${post.id}`,
        inbox: { type: INBOX.HELP_REQUEST, entityType: 'POST', entityId: post.id },
      });
    }
    return helpers.map((h) => h.id);
  }

  /** Anyone answering a lesson question gets a row — asked or not. */
  @OnEvent('community.comment.created', { async: true })
  async onComment(event: CommentCreatedEvent) {
    if (event.authorId === event.postAuthorId) return;
    try {
      const post = await this.prisma.post.findUnique({
        where: { id: event.postId },
        select: { postType: true, lessonId: true, courseId: true, userId: true },
      });
      if (!post || post.postType !== 'QUESTION' || !post.lessonId || !post.courseId) return;
      const now = new Date();
      await this.prisma.helpRoute.upsert({
        where: { postId_helperId: { postId: event.postId, helperId: event.authorId } },
        create: {
          postId: event.postId,
          askerId: post.userId,
          helperId: event.authorId,
          lessonId: post.lessonId,
          courseId: post.courseId,
          answeredAt: now,
        },
        update: {},
      });
      // An existing (routed) row keeps its first answer time.
      await this.prisma.helpRoute.updateMany({
        where: { postId: event.postId, helperId: event.authorId, answeredAt: null },
        data: { answeredAt: now },
      });
    } catch (err) {
      this.logger.warn(`help answer failed: ${(err as Error).message}`);
    }
  }

  /** The asker finished the lesson they asked about: credit everyone who answered. */
  @OnEvent('lesson.completed', { async: true })
  async onLessonCompleted(event: LessonCompletedEvent) {
    if (!event.isFirstCompletion) return;
    try {
      await this.credit(event.userId, event.lessonId);
    } catch (err) {
      this.logger.warn(`help credit failed: ${(err as Error).message}`);
    }
  }

  /** Public for the e2e script. Returns the helper ids credited. */
  async credit(askerId: string, lessonId: string): Promise<string[]> {
    const rows = await this.prisma.helpRoute.findMany({
      where: { askerId, lessonId, answeredAt: { not: null }, helpedAt: null },
      select: { id: true, helperId: true },
    });
    if (rows.length === 0) return [];
    await this.prisma.helpRoute.updateMany({ where: { id: { in: rows.map((r) => r.id) } }, data: { helpedAt: new Date() } });

    const [asker, lesson] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: askerId }, select: { fullName: true } }),
      this.prisma.lesson.findUnique({ where: { id: lessonId }, select: { title: true } }),
    ]);
    const helpers = [...new Set(rows.map((r) => r.helperId))];
    for (const helperId of helpers) {
      await this.hub.notify({
        userId: helperId,
        kind: 'HELP_WORKED',
        actorId: askerId,
        title: `Your answer helped ${firstName(asker?.fullName)} finish ${lesson?.title ?? 'their lesson'}`,
        body: 'Teaching it counts. You just made someone better at this.',
        url: `/dashboard/u/${askerId}`,
        dedupeKey: `help-worked:${askerId}:${lessonId}:${helperId}`,
        inbox: { type: INBOX.HELP_WORKED, entityType: 'USER', entityId: askerId },
      });
      // The Helper badge reads help_routes; check it now so it unlocks with the news.
      void this.achievements.checkAndAwardAchievements(helperId).catch(() => undefined);
    }
    return helpers;
  }

  /** "Helped N people" on a profile. */
  async helpedCount(userId: string): Promise<number> {
    const rows = await this.prisma.helpRoute.findMany({
      where: { helperId: userId, helpedAt: { not: null } },
      select: { askerId: true },
      distinct: ['askerId'],
    });
    return rows.length;
  }
}
