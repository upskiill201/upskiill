import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { EnrollmentCreatedEvent } from '../../common/events/enrollment-created.event';
import { LESSON_QUIT_EVENT, type LessonQuitEvent } from '../../common/events/lesson-quit.event';
import { firstLessonState, type FirstLessonInfo } from '../../common/first-lesson.util';
import { EmailJobRepository } from '../../email/jobs/email-job.repository';
import { PrismaService } from '../../prisma/prisma.service';
import type { TeyReason } from '../contracts/tey-context.types';
import { resolveLocalNow } from '../state/local-time.util';
import { TeyActionRepository, ScheduledActionRow } from '../scheduler/tey-action.repository';
import { TeyNotifyService } from './tey-notify.service';

/** Pseudo rule id for journey steps in tey_scheduled_actions (not a TEY_RULE). */
export const FIRST_LESSON_JOURNEY = 'FIRST_LESSON_JOURNEY';


const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

/**
 * The ladder, measured from the moment they enrolled. Email 0 lands while
 * they're still on the high of joining; push 1 a few hours later, the next
 * day around the hour they joined (the hour they evidently have free), then
 * day 3 and a last word on day 6. Someone who hasn't started after a week has
 * told us something, and we listen.
 */
const PUSH_STAGES = [
  { stage: 1, after: 3 * HOUR },
  { stage: 2, after: 22 * HOUR },
  { stage: 3, after: 3 * DAY },
  { stage: 4, after: 6 * DAY },
] as const;
const EMAIL_STAGES = [
  { stage: 0, after: 15 * MIN },
  { stage: 1, after: DAY },
  { stage: 2, after: 3 * DAY + HOUR },
  { stage: 3, after: 6 * DAY + HOUR },
] as const;

/** Left lesson 1 part-way: a push while it's fresh, an email a bit later. */
const RESUME_PUSH_AFTER = 45 * MIN;
const RESUME_EMAIL_AFTER = 2 * HOUR;

/**
 * The first-lesson journey: enrolled is not started, and the gap between the
 * two is where Teyro loses most of its learners. From the moment someone
 * enrolls, Tey works the gap — push, bell and email, in his own cheeky voice,
 * every line built from the real course (lesson 1's real title and length)
 * and the learner's own onboarding answers.
 *
 * Every step re-checks `firstLessonState` before it goes out, so the whole
 * journey falls silent the moment they finish a lesson in the course (or are
 * busy learning elsewhere, or the course goes away).
 */
@Injectable()
export class FirstLessonJourney {
  private readonly logger = new Logger(FirstLessonJourney.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly actions: TeyActionRepository,
    private readonly hub: TeyNotifyService,
    private readonly emailJobs: EmailJobRepository,
  ) {}

  @OnEvent('enrollment.created', { async: true })
  async onEnrolled(event: EnrollmentCreatedEvent) {
    try {
      await this.start(event.userId, event.courseId, new Date());
    } catch (err) {
      this.logger.warn(`first-lesson journey start failed: ${(err as Error).message}`);
    }
  }

  @OnEvent(LESSON_QUIT_EVENT, { async: true })
  async onLessonQuit(event: LessonQuitEvent) {
    try {
      await this.startResume(event, new Date());
    } catch (err) {
      this.logger.warn(`first-lesson resume start failed: ${(err as Error).message}`);
    }
  }

  /**
   * Catch-up: enrolments from the last few days with nothing finished and no
   * journey yet — the ones made before this shipped, or by a path that never
   * emitted `enrollment.created`. Only the steps still ahead are queued, so
   * a late start never fires a burst of stale messages.
   */
  @Cron('0 7 * * * *', { name: 'first-lesson-journey-backfill' })
  async scheduledBackfill(): Promise<void> {
    const on = process.env.TEY_SCHEDULER_ENABLED;
    if (on === 'false' || (on !== 'true' && process.env.NODE_ENV !== 'production')) return;
    try {
      const n = await this.backfill();
      if (n > 0) this.logger.log(`first-lesson backfill: started=${n}`);
    } catch (err) {
      this.logger.warn(`first-lesson backfill failed: ${(err as Error).message}`);
    }
  }

  async backfill(now = new Date()): Promise<number> {
    const rows = await this.prisma.enrollment.findMany({
      where: { createdAt: { gte: new Date(now.getTime() - 6 * DAY) } },
      select: { userId: true, courseId: true, createdAt: true, completedLessons: true },
      take: 500,
    });
    let started = 0;
    for (const r of rows) {
      if (Array.isArray(r.completedLessons) && r.completedLessons.length > 0) continue;
      if (await this.start(r.userId, r.courseId, r.createdAt, now)) started++;
    }
    return started;
  }

  /**
   * Queues the ladder. `enrollment.created` fires on every enroll call, so
   * this is idempotent: one journey per learner per course, ever. Steps more
   * than an hour in the past (a late start) are skipped. Returns whether a
   * journey was started.
   */
  async start(userId: string, courseId: string, enrolledAt: Date, now = new Date()): Promise<boolean> {
    const running = await this.prisma.teyScheduledAction.findUnique({
      where: { dedupeKey: `${FIRST_LESSON_JOURNEY}:${userId}:${courseId}:1` },
      select: { id: true },
    });
    if (running) return false;
    const marker = await this.prisma.teyScheduledAction.findFirst({
      where: { userId, dedupeKey: { startsWith: `${FIRST_LESSON_JOURNEY}:${userId}:${courseId}:` } },
      select: { id: true },
    });
    if (marker) return false;

    const state = await firstLessonState(this.prisma, userId, courseId, { now });
    // Only a busy-elsewhere learner gets the journey anyway (it re-checks later).
    if (!state.eligible && state.reason !== 'LEARNING_ELSEWHERE') return false;

    const offset = await this.offsetFor(userId);
    const stale = (at: Date) => at.getTime() < now.getTime() - HOUR;
    let queued = 0;
    for (const s of PUSH_STAGES) {
      const dueAt = toDaytime(new Date(enrolledAt.getTime() + s.after), offset);
      if (stale(dueAt)) continue;
      queued++;
      await this.actions.upsertIntent(userId, {
        ruleId: FIRST_LESSON_JOURNEY as TeyReason,
        priority: 'MEDIUM',
        dueAt,
        expiresAt: new Date(dueAt.getTime() + 12 * HOUR),
        dedupeKey: `${FIRST_LESSON_JOURNEY}:${userId}:${courseId}:${s.stage}`,
        contextHint: { courseId, stage: s.stage } as never,
      });
    }
    for (const s of EMAIL_STAGES) {
      // A late start still sends the welcome (now) if they joined today.
      const lateWelcome = s.stage === 0 && now.getTime() - enrolledAt.getTime() < 20 * HOUR;
      const at = lateWelcome ? new Date(Math.max(now.getTime(), enrolledAt.getTime() + s.after)) : new Date(enrolledAt.getTime() + s.after);
      if (stale(at)) continue;
      queued++;
      await this.emailJobs.enqueue({
        userId,
        eventType: 'FIRST_LESSON_STAGE',
        templateKey: 'learning.first-lesson',
        // The welcome goes now whatever the hour; the rest wait for daytime.
        dueAt: s.stage === 0 ? at : toDaytime(at, offset),
        dedupeKey: `learning.first-lesson:${userId}:${courseId}:${s.stage}`,
        payload: { courseId, stage: s.stage },
      });
    }
    return queued > 0;
  }

  /** They opened their first lesson and left part-way: one push, one email. */
  async startResume(event: LessonQuitEvent, quitAt: Date) {
    const state = await firstLessonState(this.prisma, event.userId, event.courseId, {
      lessonId: event.lessonId,
      now: quitAt,
    });
    if (!state.eligible) return;

    const offset = await this.offsetFor(event.userId);
    const pushAt = toDaytime(new Date(quitAt.getTime() + RESUME_PUSH_AFTER), offset);
    await this.actions.upsertIntent(event.userId, {
      ruleId: FIRST_LESSON_JOURNEY as TeyReason,
      priority: 'MEDIUM',
      dueAt: pushAt,
      expiresAt: new Date(pushAt.getTime() + 12 * HOUR),
      dedupeKey: `${FIRST_LESSON_JOURNEY}:${event.userId}:${event.courseId}:resume:${event.lessonId}`,
      contextHint: { courseId: event.courseId, stage: 'resume', lessonId: event.lessonId } as never,
    });
    await this.emailJobs.enqueue({
      userId: event.userId,
      eventType: 'FIRST_LESSON_STAGE',
      templateKey: 'learning.first-lesson',
      dueAt: toDaytime(new Date(quitAt.getTime() + RESUME_EMAIL_AFTER), offset),
      dedupeKey: `learning.first-lesson:${event.userId}:${event.courseId}:resume:${event.lessonId}`,
      payload: {
        courseId: event.courseId,
        stage: 'resume',
        lessonId: event.lessonId,
        progressPct: event.progressPct,
      },
    });
  }

  /** One push + bell step, re-checked against the learner's real state now. */
  async process(action: ScheduledActionRow): Promise<{ sent: boolean; skipReason?: string }> {
    const hint = (action.context ?? {}) as { courseId?: string; stage?: number | 'resume'; lessonId?: string };
    if (!hint.courseId || !hint.stage) {
      await this.actions.markSkipped(action.id, 'BAD_CONTEXT');
      return { sent: false, skipReason: 'BAD_CONTEXT' };
    }

    const state = await firstLessonState(this.prisma, action.userId, hint.courseId, {
      lessonId: hint.stage === 'resume' ? hint.lessonId : undefined,
    });
    if (!state.eligible) {
      await this.actions.markSkipped(action.id, state.reason);
      return { sent: false, skipReason: state.reason };
    }

    const user = await this.prisma.user.findUnique({
      where: { id: action.userId },
      select: { fullName: true },
    });
    const copy = firstLessonPush(hint.stage, state, user?.fullName?.split(' ')[0] || '');
    const outcome = await this.hub.notify({
      userId: action.userId,
      kind: 'FIRST_LESSON',
      ...copy,
      url: state.lessonPath,
      dedupeKey: `first-lesson:${state.course.id}:${hint.stage}${hint.lessonId ? `:${hint.lessonId}` : ''}`,
      inbox: { type: 'TEY_FIRST_LESSON', entityType: 'Course', entityId: state.course.id, collapseDaily: true },
    });

    if (outcome.pushed) {
      await this.actions.markSent(action.id);
      return { sent: true };
    }
    await this.actions.markSkipped(action.id, outcome.reason);
    return { sent: false, skipReason: outcome.reason };
  }

  private async offsetFor(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { timezone: true, timezoneOffsetMinutes: true },
    });
    return resolveLocalNow(user).offsetMinutes;
  }
}

/**
 * Tey's lines for each step: cheeky, a touch passive-aggressive, never cruel.
 * The facts in them (lesson title, minutes) are always the course's own.
 */
export function firstLessonPush(
  stage: number | 'resume',
  info: FirstLessonInfo,
  firstName: string,
): { title: string; body: string } {
  const lesson = info.lesson.title;
  const mins = info.lesson.minutes ? `${info.lesson.minutes} min` : 'a few minutes';
  const you = firstName ? `, ${firstName}` : '';
  switch (stage) {
    case 'resume':
      return {
        title: 'You left mid-lesson. I noticed.',
        body: `Your spot in "${lesson}" is saved. Finish it before I start taking it personally.`,
      };
    case 1:
      return {
        title: `Lesson 1 is just sitting there${you}`,
        body: `"${lesson}" takes ${mins}. I'll pretend I'm not counting.`,
      };
    case 2:
      return {
        title: "It's been a day. Lesson 1 noticed.",
        body: `${info.course.title} starts with ${mins}. Today's the day${you}. I believe in you. Mostly.`,
      };
    case 3:
      return {
        title: "I'm not mad. I'm disappointed.",
        body: `Three days and "${lesson}" is still untouched. ${mins}. Go on. I'll wait. Again.`,
      };
    case 4:
    default:
      return {
        title: 'Okay, last nudge about lesson 1',
        body: `I'll stop asking. But "${lesson}" is still ${mins}, and still yours. Surprise me.`,
      };
  }
}

/**
 * Keeps a nudge out of the learner's night: one that would land after 21:00
 * local moves to 18:00 the next evening, one in the small hours to 18:00 that
 * same day.
 */
function toDaytime(at: Date, offsetMinutes: number): Date {
  const local = new Date(at.getTime() - offsetMinutes * 60_000);
  const hour = local.getUTCHours();
  if (hour >= 8 && hour < 21) return at;
  const day = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), 18));
  if (hour >= 21) day.setUTCDate(day.getUTCDate() + 1);
  return new Date(day.getTime() + offsetMinutes * 60_000);
}
