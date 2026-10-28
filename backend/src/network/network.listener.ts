import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { LearningActivityRecordedEvent } from '../common/events/learning-activity-recorded.event';
import { EnrollmentCreatedEvent } from '../common/events/enrollment-created.event';
import { LessonCompletedEvent } from '../course/events/lesson-completed.event';
import { PrismaService } from '../prisma/prisma.service';
import { TeyNotifyService } from '../tey/notify/tey-notify.service';
import { localDateFor } from '../tey/state/local-time.util';
import { BuddyService, firstName } from './buddy.service';
import { INBOX, STREAK_MILESTONES, type ActivityType } from './network.constants';
import type { ActivityMeta } from './network-feed.service';
import { NetworkEventsService } from './network-events.service';

const DAY_MS = 86_400_000;

const ENTITY_TYPE: Record<ActivityType, string> = {
  COURSE_STARTED: 'course',
  COURSE_FINISHED: 'course',
  LESSON_COMPLETED: 'lesson',
  STREAK_MILESTONE: 'streak',
  ACHIEVEMENT_UNLOCKED: 'achievement',
  WORK_SHARED: 'lesson',
};

/**
 * Turns learning into network moments:
 *   - writes the feed's activity cards (deduped by a unique key, so a
 *     re-fired event or a re-enrol never doubles a card)
 *   - "your buddy learned today" and "your nudge worked"
 *
 * Every handler swallows its own errors — the network must never fail a
 * lesson completion.
 */
@Injectable()
export class NetworkListener {
  private readonly logger = new Logger(NetworkListener.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly buddies: BuddyService,
    private readonly hub: TeyNotifyService,
    private readonly events: NetworkEventsService,
  ) {}

  @OnEvent('lesson.completed', { async: true })
  async onLessonCompleted(event: LessonCompletedEvent) {
    try {
      const cards: { type: ActivityType; entityId: string; meta: ActivityMeta }[] = [];
      const [course, lesson, enrolment] = await Promise.all([
        this.courseMeta(event.courseId),
        this.prisma.lesson.findUnique({ where: { id: event.lessonId }, select: { title: true } }),
        this.prisma.enrollment.findUnique({
          where: { userId_courseId: { userId: event.userId, courseId: event.courseId } },
          select: { progress: true },
        }),
        // A lesson soon after tapping a friend's card: the north-star event.
        this.events.attributeLesson(event.userId, event.courseId),
      ]);
      if (event.isFirstCompletion && (enrolment?.progress ?? 0) >= 100) {
        cards.push({ type: 'COURSE_FINISHED', entityId: event.courseId, meta: course });
      }
      if (event.isFirstCompletion) {
        cards.push({
          type: 'LESSON_COMPLETED',
          entityId: event.lessonId,
          meta: { ...course, lessonId: event.lessonId, lessonTitle: lesson?.title },
        });
      }
      if (event.isFirstStreakOfDay && STREAK_MILESTONES.has(event.streakDays)) {
        cards.push({
          type: 'STREAK_MILESTONE',
          // A streak can be rebuilt after a break; the day keeps each one distinct.
          entityId: `${event.streakDays}:${event.completedAt.toISOString().slice(0, 10)}`,
          meta: { ...course, streakDays: event.streakDays },
        });
      }
      await this.write(event.userId, cards);
    } catch (err) {
      this.logger.warn(`lesson card failed: ${(err as Error).message}`);
    }
  }

  @OnEvent('enrollment.created', { async: true })
  async onEnrolled(event: EnrollmentCreatedEvent) {
    try {
      // Attribution first, so the new card can say who inspired it.
      const [course, inspirerId] = await Promise.all([
        this.courseMeta(event.courseId),
        this.events.attributeEnrolment(event.userId, event.courseId),
      ]);
      let inspiredBy: { inspiredById?: string; inspiredByName?: string } = {};
      if (inspirerId) {
        const [inspirer, learner] = await Promise.all([
          this.prisma.user.findUnique({ where: { id: inspirerId }, select: { fullName: true } }),
          this.prisma.user.findUnique({ where: { id: event.userId }, select: { fullName: true } }),
        ]);
        inspiredBy = { inspiredById: inspirerId, inspiredByName: firstName(inspirer?.fullName) };
        await this.hub.notify({
          userId: inspirerId,
          kind: 'INSPIRED',
          actorId: event.userId,
          title: `${firstName(learner?.fullName)} started ${course.courseTitle ?? 'a course'} because of you`,
          body: 'Your learning is rubbing off on people. Keep it going.',
          url: '/dashboard/feed',
          dedupeKey: `inspired:${inspirerId}:${event.userId}:${event.courseId}`,
          inbox: { type: INBOX.INSPIRED, entityType: 'USER', entityId: event.userId },
        });
      }
      await this.write(event.userId, [{ type: 'COURSE_STARTED', entityId: event.courseId, meta: { ...course, ...inspiredBy } }]);
    } catch (err) {
      this.logger.warn(`course card failed: ${(err as Error).message}`);
    }
  }

  @OnEvent('achievement.unlocked', { async: true })
  async onAchievement(event: { userId: string; achievementId: string; tier: number; name: string; description?: string }) {
    try {
      await this.write(event.userId, [
        {
          type: 'ACHIEVEMENT_UNLOCKED',
          entityId: `${event.achievementId}:${event.tier}`,
          meta: { achievementName: event.name, achievementDescription: event.description },
        },
      ]);
    } catch (err) {
      this.logger.warn(`achievement card failed: ${(err as Error).message}`);
    }
  }

  /**
   * After the day's first lesson (downstream of the activity write, so
   * "learned today" reads are current):
   *   - each buddy who hasn't learned today hears about it
   *   - anyone who nudged this learner in the last day hears it worked
   */
  @OnEvent('learning.activity.recorded', { async: true })
  async onLearned(event: LearningActivityRecordedEvent) {
    if (!event.isFirstLessonToday) return;
    try {
      const buddyIds = await this.buddies.buddyIdsOf(event.userId);
      const me = await this.prisma.user.findUnique({ where: { id: event.userId }, select: { fullName: true } });
      const name = firstName(me?.fullName);

      if (buddyIds.length) {
        const people = await this.prisma.user.findMany({
          where: { id: { in: buddyIds } },
          select: { id: true, timezone: true, timezoneOffsetMinutes: true },
        });
        const now = new Date();
        const todays = people.map((p) => ({ id: p.id, date: localDateFor(p, now) }));
        const learned = await this.prisma.userDailyActivity.findMany({
          where: { OR: todays.map((t) => ({ userId: t.id, date: t.date })), lessonsCompleted: { gt: 0 } },
          select: { userId: true },
        });
        const done = new Set(learned.map((l) => l.userId));
        for (const t of todays) {
          if (done.has(t.id)) continue;
          await this.hub.notify({
            userId: t.id,
            kind: 'BUDDY_LEARNED',
            actorId: event.userId,
            title: `${name} just did today's lesson`,
            body: 'Your turn. One lesson keeps your buddy streak alive.',
            url: '/dashboard',
            dedupeKey: `buddy-learned:${event.userId}:${t.id}:${t.date}`,
            inbox: { type: INBOX.BUDDY_LEARNED, entityType: 'USER', entityId: event.userId, collapseDaily: true },
          });
        }
      }

      const nudges = await this.prisma.notification.findMany({
        where: {
          userId: event.userId,
          type: INBOX.BUDDY_NUDGE,
          createdAt: { gte: new Date(Date.now() - DAY_MS) },
          actorId: { not: null },
        },
        select: { actorId: true },
      });
      for (const nudger of new Set(nudges.map((n) => n.actorId!))) {
        await this.hub.notify({
          userId: nudger,
          kind: 'NUDGE_WORKED',
          actorId: event.userId,
          title: `Your nudge worked. ${name} just finished a lesson`,
          body: 'You helped a buddy keep going today.',
          url: '/dashboard/network',
          dedupeKey: `nudge-worked:${nudger}:${event.userId}:${event.localDate}`,
          push: false,
          inbox: { type: INBOX.NUDGE_WORKED, entityType: 'USER', entityId: event.userId },
        });
      }
    } catch (err) {
      this.logger.warn(`buddy learned failed: ${(err as Error).message}`);
    }
  }

  private async courseMeta(courseId: string): Promise<ActivityMeta> {
    const c = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, slug: true, thumbnailUrl: true },
    });
    return c ? { courseId: c.id, courseTitle: c.title, courseSlug: c.slug, courseThumb: c.thumbnailUrl } : {};
  }

  private async write(userId: string, cards: { type: ActivityType; entityId: string; meta: ActivityMeta }[]) {
    if (cards.length === 0) return;
    await this.prisma.activityFeed.createMany({
      data: cards.map((c) => ({
        userId,
        activityType: c.type,
        entityType: ENTITY_TYPE[c.type],
        entityId: c.entityId,
        metadata: c.meta as Prisma.InputJsonValue,
      })),
      skipDuplicates: true,
    });
  }
}
