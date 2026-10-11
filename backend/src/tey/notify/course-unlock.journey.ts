import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { HOUR, UNLOCK_EMAIL, UNLOCK_PUSH, nextStep, toDaytime } from '../../common/nag-cadence';
import { courseUnlockState, SOCIAL_PROOF_MIN_LEARNERS } from '../../common/course-unlock.util';
import { LessonCompletedEvent } from '../../course/events/lesson-completed.event';
import { EmailJobRepository } from '../../email/jobs/email-job.repository';
import { PrismaService } from '../../prisma/prisma.service';
import type { TeyReason } from '../contracts/tey-context.types';
import { resolveLocalNow } from '../state/local-time.util';
import { TeyActionRepository, ScheduledActionRow } from '../scheduler/tey-action.repository';
import { TeyNotifyService } from './tey-notify.service';

/** Pseudo rule id for journey steps in tey_scheduled_actions (not a TEY_RULE). */
export const COURSE_UNLOCK = 'COURSE_UNLOCK';

/**
 * The lesson-3 unlock journey: Teyro's paid courses are free for two lessons,
 * and the learner who finishes them and stops is the warmest prospect the
 * product will ever have. Push + bell + email on the UNLOCK cadence
 * (common/nag-cadence.ts): next day, day 3, day 7, then every couple of days
 * easing to every few. It never runs out (founder's rule); every step is
 * re-checked against the real paywall state, and the journey stops the moment
 * they unlock, start a checkout (the abandoned-checkout sequence owns them
 * then), or the course goes away. Only the NEXT step is ever queued; each
 * send queues the one after, and an hourly top-up heals any gap.
 *
 * Every line uses real course data: the next lesson's actual name, the
 * learner's actual progress, a learner count only when it is big enough to
 * mean something. No fake countdowns, no invented discounts.
 */
@Injectable()
export class CourseUnlockJourney {
  private readonly logger = new Logger(CourseUnlockJourney.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly actions: TeyActionRepository,
    private readonly hub: TeyNotifyService,
    private readonly emailJobs: EmailJobRepository,
  ) {}

  @OnEvent('lesson.completed', { async: true })
  async onLessonCompleted(event: LessonCompletedEvent) {
    if (!event.isFirstCompletion) return;
    try {
      const state = await courseUnlockState(this.prisma, event.userId, event.courseId);
      if (!state.eligible) return;
      // One journey per course, ever: a later free lesson must not restart
      // the clock (the hourly top-up keeps an existing journey going).
      const existing = await this.prisma.teyScheduledAction.findFirst({
        where: { userId: event.userId, dedupeKey: { startsWith: `${COURSE_UNLOCK}:${event.userId}:${event.courseId}:` } },
        select: { id: true },
      });
      if (existing) return;
      await this.start(event.userId, event.courseId, event.completedAt ?? new Date());
    } catch (err) {
      this.logger.warn(`unlock journey start failed: ${(err as Error).message}`);
    }
  }

  /** Starts (or continues) the journey: queues its next push and email. */
  async start(userId: string, courseId: string, hitAt: Date, now = new Date()) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { timezone: true, timezoneOffsetMinutes: true },
    });
    const offset = resolveLocalNow(user).offsetMinutes;
    const prefix = `${COURSE_UNLOCK}:${userId}:${courseId}:`;
    const emailPrefix = (stage: number) => `conversion.course-unlock-${stage}:${userId}:${courseId}`;

    const pushPending = await this.prisma.teyScheduledAction.findFirst({
      where: { userId, status: 'PENDING', dedupeKey: { startsWith: prefix } },
      select: { id: true },
    });
    if (!pushPending) {
      let step = nextStep(UNLOCK_PUSH, hitAt, now);
      for (let g = 0; step && g < 300; g++) {
        const used = await this.prisma.teyScheduledAction.findUnique({
          where: { dedupeKey: `${prefix}${step.index + 1}` },
          select: { id: true },
        });
        if (!used) break;
        const n = nextStep(UNLOCK_PUSH, hitAt, new Date(step.at.getTime() + 2 * HOUR), HOUR);
        step = n && n.index > step.index ? n : null;
      }
      if (step) {
        const dueAt = toDaytime(step.at, offset);
        await this.actions.upsertIntent(userId, {
          ruleId: COURSE_UNLOCK as TeyReason,
          priority: 'MEDIUM',
          dueAt,
          expiresAt: new Date(dueAt.getTime() + 36 * HOUR),
          dedupeKey: `${prefix}${step.index + 1}`,
          contextHint: { courseId, stage: step.index + 1, hitAt: hitAt.toISOString() } as never,
        });
      }
    }

    const emailPending = await this.prisma.emailJob.findFirst({
      where: { userId, status: 'PENDING', eventType: 'COURSE_UNLOCK_STAGE', dedupeKey: { contains: `:${userId}:${courseId}` } },
      select: { id: true },
    });
    if (!emailPending) {
      let step = nextStep(UNLOCK_EMAIL, hitAt, now);
      for (let g = 0; step && g < 300; g++) {
        const used = await this.prisma.emailJob.findUnique({
          where: { dedupeKey: emailPrefix(step.index + 1) },
          select: { id: true },
        });
        if (!used) break;
        const n = nextStep(UNLOCK_EMAIL, hitAt, new Date(step.at.getTime() + 2 * HOUR), HOUR);
        step = n && n.index > step.index ? n : null;
      }
      if (step) {
        const stage = step.index + 1;
        await this.emailJobs.enqueue({
          userId,
          eventType: 'COURSE_UNLOCK_STAGE',
          // Stages 1–3 are the hand-written emails; after that they rotate.
          templateKey: `conversion.course-unlock-${Math.min(stage, 3)}`,
          dueAt: toDaytime(step.at, offset),
          dedupeKey: emailPrefix(stage),
          payload: { courseId, stage },
        });
      }
    }
  }

  /**
   * Hourly: every journey that's still eligible gets its next step queued.
   * Journeys are found by their own rows; the start time is the first one's.
   */
  @Cron('0 37 * * * *', { name: 'course-unlock-top-up' })
  async scheduledTopUp(): Promise<void> {
    const on = process.env.TEY_SCHEDULER_ENABLED;
    if (on === 'false' || (on !== 'true' && process.env.NODE_ENV !== 'production')) return;
    try {
      const rows = await this.prisma.teyScheduledAction.findMany({
        where: { ruleId: COURSE_UNLOCK },
        select: { userId: true, dedupeKey: true, createdAt: true, context: true },
        orderBy: { createdAt: 'asc' },
        take: 20000,
      });
      const journeys = new Map<string, { userId: string; courseId: string; hitAt: Date }>();
      for (const r of rows) {
        const courseId = r.dedupeKey.split(':')[2];
        const key = `${r.userId}:${courseId}`;
        if (!courseId || journeys.has(key)) continue;
        const hint = (r.context ?? {}) as { hitAt?: string };
        // Rows from before hitAt was recorded: the first push was due ~22h
        // after the wall, created right at the wall.
        journeys.set(key, { userId: r.userId, courseId, hitAt: hint.hitAt ? new Date(hint.hitAt) : r.createdAt });
      }
      for (const j of journeys.values()) {
        const state = await courseUnlockState(this.prisma, j.userId, j.courseId);
        if (state.eligible) await this.start(j.userId, j.courseId, j.hitAt);
      }
    } catch (err) {
      this.logger.warn(`unlock top-up failed: ${(err as Error).message}`);
    }
  }

  /** One stage's push + bell row, re-checked against the paywall right now. */
  async process(action: ScheduledActionRow): Promise<{ sent: boolean; skipReason?: string }> {
    const hint = (action.context ?? {}) as { courseId?: string; stage?: number; hitAt?: string };
    if (!hint.courseId || !hint.stage) {
      await this.actions.markSkipped(action.id, 'BAD_CONTEXT');
      return { sent: false, skipReason: 'BAD_CONTEXT' };
    }

    const state = await courseUnlockState(this.prisma, action.userId, hint.courseId);
    if (!state.eligible) {
      await this.actions.markSkipped(action.id, state.reason);
      return { sent: false, skipReason: state.reason };
    }

    const { course } = state;
    const next = state.nextLessonTitles[0];
    const pct = Math.round((state.completedLessons / Math.max(1, state.totalLessons)) * 100);
    const left = state.totalLessons - state.completedLessons;
    const copy = unlockPush(hint.stage, {
      course: course.title,
      next,
      pct,
      left,
      learners: state.learners >= SOCIAL_PROOF_MIN_LEARNERS ? state.learners : undefined,
    });

    const url = `/learn/${course.id}/unlock`;
    const outcome = await this.hub.notify({
      userId: action.userId,
      kind: 'COURSE_UNLOCK',
      ...copy,
      url,
      dedupeKey: `unlock:${course.id}:${hint.stage}`,
      inbox: { type: 'TEY_COURSE_UNLOCK', entityType: 'Course', entityId: course.id, collapseDaily: true },
    });

    if (outcome.pushed) await this.actions.markSent(action.id);
    else await this.actions.markSkipped(action.id, outcome.reason);

    // Queue the next rung straight away (the hourly top-up is the backstop).
    try {
      const first = await this.prisma.teyScheduledAction.findFirst({
        where: { userId: action.userId, dedupeKey: { startsWith: `${COURSE_UNLOCK}:${action.userId}:${course.id}:` } },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true },
      });
      const hitAt = hint.hitAt ? new Date(hint.hitAt) : (first?.createdAt ?? new Date());
      await this.start(action.userId, course.id, hitAt);
    } catch (err) {
      this.logger.warn(`unlock renew failed: ${(err as Error).message}`);
    }
    return outcome.pushed ? { sent: true } : { sent: false, skipReason: outcome.reason };
  }
}

/** Tey on the paywall: cheeky and persistent, every fact the course's own. */
export function unlockPush(
  stage: number,
  f: { course: string; next?: string; pct: number; left: number; learners?: number },
): { title: string; body: string } {
  const lessons = `${f.left} ${f.left === 1 ? 'lesson' : 'lessons'}`;
  if (stage === 1) {
    return {
      title: f.next ? `Next up: ${f.next}` : `${f.course} is waiting`,
      body: `You finished the free lessons of ${f.course}. Unlock the rest while it's fresh. I'm right here.`,
    };
  }
  if (stage === 2) {
    return {
      title: `${f.course}: ${lessons} to go`,
      body: f.learners
        ? `${f.learners} people are learning this one. Unlock it and pick up right where you stopped.`
        : `You're ${f.pct}% in. Unlock the course and finish what you started. I'll cheer loudly.`,
    };
  }
  const pool = [
    { title: `Still thinking about ${f.course}?`, body: `Think less, learn more. ${lessons} left and your progress is saved. Unlock it.` },
    { title: `${f.next ?? 'Your next lesson'} is behind a door`, body: "I'd open it for you, but I don't have thumbs. You do. Unlock the course." },
    { title: 'You stopped at the best part', body: `${f.pct}% through ${f.course} and then... nothing? That's a cliffhanger. Unlock the rest.` },
    { title: "I'm going to keep asking", body: `About ${f.course}. Every few days. Until you unlock it. Make it stop: ${lessons} left.` },
    { title: `${f.course} misses you`, body: "It told me. Robots and courses talk. Unlock it and finish what you started." },
    { title: 'Remember why you started?', body: `Because ${f.course} does. ${lessons} between you and finishing it.` },
  ];
  return pool[(stage - 3) % pool.length];
}
