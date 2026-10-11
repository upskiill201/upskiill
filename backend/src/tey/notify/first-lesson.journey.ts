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
import {
  DAY,
  FIRST_LESSON_EMAIL,
  FIRST_LESSON_PUSH,
  HOUR,
  MINUTE,
  NAG_HORIZON_DAYS,
  nextStep,
  toDaytime,
} from '../../common/nag-cadence';
import { TeyActionRepository, ScheduledActionRow } from '../scheduler/tey-action.repository';
import { TeyNotifyService } from './tey-notify.service';

/** Pseudo rule id for journey steps in tey_scheduled_actions (not a TEY_RULE). */
export const FIRST_LESSON_JOURNEY = 'FIRST_LESSON_JOURNEY';


/**
 * The ladder (common/nag-cadence.ts), from the moment they enrolled: an email
 * at 15 minutes, a push at 3h and the next day around the hour they joined,
 * then a push a day for two weeks and every other day after; email on days
 * 1, 3, 6, 10, 14, then weekly, then fortnightly. It does not stop until a
 * lesson in the course is finished (founder's rule): it eases off instead.
 */
/** Left lesson 1 part-way: a push while it's fresh, an email a bit later. */
const RESUME_PUSH_AFTER = 45 * MINUTE;
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
   * Hourly: every enrolment with nothing finished gets its next push and
   * next email queued, whenever none is pending. This is what makes the
   * journey last until they act (each step only ever queues the one after),
   * and it also starts journeys for enrolments that never fired
   * `enrollment.created` or predate this feature.
   */
  @Cron('0 7 * * * *', { name: 'first-lesson-journey-top-up' })
  async scheduledTopUp(): Promise<void> {
    const on = process.env.TEY_SCHEDULER_ENABLED;
    if (on === 'false' || (on !== 'true' && process.env.NODE_ENV !== 'production')) return;
    try {
      const n = await this.topUpAll();
      if (n > 0) this.logger.log(`first-lesson top-up: queued=${n}`);
    } catch (err) {
      this.logger.warn(`first-lesson top-up failed: ${(err as Error).message}`);
    }
  }

  async topUpAll(now = new Date()): Promise<number> {
    const rows = await this.prisma.enrollment.findMany({
      where: { createdAt: { gte: new Date(now.getTime() - NAG_HORIZON_DAYS * DAY) } },
      select: { userId: true, courseId: true, createdAt: true, completedLessons: true },
      take: 5000,
    });
    let queued = 0;
    for (const r of rows) {
      if (Array.isArray(r.completedLessons) && r.completedLessons.length > 0) continue;
      queued += await this.topUp(r.userId, r.courseId, r.createdAt, now);
    }
    return queued;
  }

  /** Kept for the enrolment event: the first top-up IS the start. */
  async start(userId: string, courseId: string, enrolledAt: Date, now = new Date()): Promise<boolean> {
    return (await this.topUp(userId, courseId, enrolledAt, now)) > 0;
  }

  /**
   * Queues the next push and the next email of this learner's ladder unless
   * one is already waiting. Idempotent (dedupe keys are per step), so the
   * event, the hourly cron and a retry can all call it. Returns how many
   * steps it queued.
   */
  async topUp(userId: string, courseId: string, enrolledAt: Date, now = new Date()): Promise<number> {
    const state = await firstLessonState(this.prisma, userId, courseId, { now });
    // Busy learning elsewhere: keep the ladder alive; it re-checks at send.
    if (!state.eligible && state.reason !== 'LEARNING_ELSEWHERE') return 0;

    const pushPrefix = `${FIRST_LESSON_JOURNEY}:${userId}:${courseId}:`;
    const emailPrefix = `learning.first-lesson:${userId}:${courseId}:`;
    const notResume = { NOT: { dedupeKey: { contains: ':resume:' } } };
    const [pushPending, emailPending] = await Promise.all([
      this.prisma.teyScheduledAction.findFirst({
        where: { userId, status: 'PENDING', AND: [{ dedupeKey: { startsWith: pushPrefix } }, notResume] },
        select: { id: true },
      }),
      this.prisma.emailJob.findFirst({
        where: { userId, status: 'PENDING', AND: [{ dedupeKey: { startsWith: emailPrefix } }, notResume] },
        select: { id: true },
      }),
    ]);

    const offset = await this.offsetFor(userId);
    let queued = 0;

    if (!pushPending) {
      const step = await this.firstFreeStep(FIRST_LESSON_PUSH, enrolledAt, now, (i) => `${pushPrefix}${i + 1}`, 'action');
      if (step) {
        const dueAt = toDaytime(step.at, offset);
        await this.actions.upsertIntent(userId, {
          ruleId: FIRST_LESSON_JOURNEY as TeyReason,
          priority: 'MEDIUM',
          dueAt,
          expiresAt: new Date(dueAt.getTime() + 12 * HOUR),
          dedupeKey: `${pushPrefix}${step.index + 1}`,
          contextHint: { courseId, stage: step.index + 1 } as never,
        });
        queued++;
      }
    }

    if (!emailPending) {
      const step = await this.firstFreeStep(FIRST_LESSON_EMAIL, enrolledAt, now, (i) => `${emailPrefix}${i}`, 'email');
      if (step) {
        // The welcome goes now even when it's late (they joined today); the
        // rest wait for daytime.
        const welcome = step.index === 0;
        const at = welcome ? new Date(Math.max(step.at.getTime(), now.getTime())) : toDaytime(step.at, offset);
        await this.emailJobs.enqueue({
          userId,
          eventType: 'FIRST_LESSON_STAGE',
          templateKey: 'learning.first-lesson',
          dueAt: at,
          dedupeKey: `${emailPrefix}${step.index}`,
          payload: { courseId, stage: step.index <= 3 ? step.index : 'nag', nag: step.index },
        });
        queued++;
      }
    }
    return queued;
  }

  /**
   * The ladder's next step from now that hasn't been used yet. A late start
   * (enrolled before this shipped) still gets the welcome if they joined
   * within the day; older steps are never back-filled.
   */
  private async firstFreeStep(
    cadence: typeof FIRST_LESSON_PUSH,
    startedAt: Date,
    now: Date,
    key: (i: number) => string,
    table: 'action' | 'email',
  ) {
    const fresh = now.getTime() - startedAt.getTime() < 20 * HOUR;
    let step = fresh && table === 'email' ? { index: 0, at: new Date(startedAt.getTime() + 15 * MINUTE) } : nextStep(cadence, startedAt, now);
    for (let guard = 0; step && guard < 400; guard++) {
      const used =
        table === 'action'
          ? await this.prisma.teyScheduledAction.findUnique({ where: { dedupeKey: key(step.index) }, select: { id: true } })
          : await this.prisma.emailJob.findUnique({ where: { dedupeKey: key(step.index) }, select: { id: true } });
      if (!used) return step;
      const next = nextStep(cadence, startedAt, new Date(step.at.getTime() + 2 * HOUR), HOUR);
      step = next && next.index > step.index ? next : null;
    }
    return null;
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

    if (outcome.pushed) await this.actions.markSent(action.id);
    else await this.actions.markSkipped(action.id, outcome.reason);

    // Queue the next rung now rather than waiting for the hourly top-up.
    if (hint.stage !== 'resume') await this.renew(action.userId, hint.courseId);
    return outcome.pushed ? { sent: true } : { sent: false, skipReason: outcome.reason };
  }

  private async renew(userId: string, courseId: string) {
    try {
      const e = await this.prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId } },
        select: { createdAt: true },
      });
      if (e) await this.topUp(userId, courseId, e.createdAt);
    } catch (err) {
      this.logger.warn(`first-lesson renew failed: ${(err as Error).message}`);
    }
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
 * Past the hand-written steps, Tey cycles through these, escalating in
 * attitude, never in cruelty. {lesson} {mins} {course} {you} are filled in.
 */
const NAG_LINES: { title: string; body: string }[] = [
  { title: 'Knock knock.', body: 'Who’s there? Lesson 1. Lesson 1 who? Exactly. You forgot about it{you}. {mins}.' },
  { title: 'Still enrolled. Still 0 lessons.', body: 'That’s a gym membership you never use. "{lesson}" takes {mins}. Fix it.' },
  { title: 'Is it the video? Be honest.', body: 'I made it skippable. "{lesson}" is {mins}. Out of excuses, aren’t we?' },
  { title: '{course} called', body: 'It asked if you’re coming. I said yes. Please don’t make me a liar{you}.' },
  { title: 'I’ll keep doing this, you know', body: 'Every few days. Forever. Until "{lesson}" is done. {mins} makes it stop.' },
  { title: 'Lesson 1 has a question', body: '"Was it something I said?" Go answer it. {mins}.' },
  { title: 'Fine. I’ll just wait here.', body: 'Alone. With "{lesson}". Which takes {mins}. No pressure{you}.' },
  { title: 'Plot twist: you open the app', body: 'And "{lesson}" is done in {mins}. Best ending. Let’s film it.' },
];

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
  const fill = (t: string) =>
    t.replace(/{lesson}/g, lesson).replace(/{mins}/g, mins).replace(/{course}/g, info.course.title).replace(/{you}/g, you);
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
        title: 'Two days. Lesson 1 is starting to take it personally.',
        body: `"${lesson}" is ${mins}. Just saying. Loudly.`,
      };
    case 4:
      return {
        title: "I'm not mad. I'm disappointed.",
        body: `Three days and "${lesson}" is still untouched. ${mins}. Go on. I'll wait. Again.`,
      };
    default: {
      const line = NAG_LINES[(Number(stage) - 5) % NAG_LINES.length];
      return { title: fill(line.title), body: fill(line.body) };
    }
  }
}
