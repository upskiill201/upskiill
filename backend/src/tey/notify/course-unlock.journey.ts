import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
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

const HOUR = 3_600_000;

/**
 * When each stage goes out, measured from the moment the learner finished the
 * last free lesson. Push stage 1 lands the next day at about the time they
 * were studying — the habit hour, found by the learner themselves. Email 1
 * goes the same evening, while the course is still on their mind.
 */
const STAGES = [
  { stage: 1, pushAfter: 22 * HOUR, emailAfter: 3 * HOUR },
  { stage: 2, pushAfter: 3 * 24 * HOUR, emailAfter: 3 * 24 * HOUR + HOUR },
  { stage: 3, pushAfter: 7 * 24 * HOUR, emailAfter: 7 * 24 * HOUR + HOUR },
] as const;

/**
 * The lesson-3 unlock journey: Teyro's paid courses are free for two lessons,
 * and the learner who finishes them and stops is the warmest prospect the
 * product will ever have. Three stages over a week — push + bell + email —
 * each re-checked against the real paywall state before it goes out, and the
 * whole journey stops the moment they unlock, start a checkout (the
 * abandoned-checkout sequence owns them then), or the course goes away.
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
      await this.start(event.userId, event.courseId, event.completedAt ?? new Date());
    } catch (err) {
      this.logger.warn(`unlock journey start failed: ${(err as Error).message}`);
    }
  }

  /** Queues the three stages. Idempotent: the dedupe keys pin one journey per course. */
  async start(userId: string, courseId: string, hitAt: Date) {
    // One journey per course, ever: a later free-preview lesson completing
    // must not push an already-running journey's dates back.
    const running = await this.prisma.teyScheduledAction.findUnique({
      where: { dedupeKey: `${COURSE_UNLOCK}:${userId}:${courseId}:1` },
      select: { id: true },
    });
    if (running) return;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { timezone: true, timezoneOffsetMinutes: true },
    });
    const offset = resolveLocalNow(user).offsetMinutes;

    for (const s of STAGES) {
      const dueAt = toDaytime(new Date(hitAt.getTime() + s.pushAfter), offset);
      await this.actions.upsertIntent(userId, {
        ruleId: COURSE_UNLOCK as TeyReason,
        priority: 'MEDIUM',
        dueAt,
        expiresAt: new Date(dueAt.getTime() + 36 * HOUR),
        dedupeKey: `${COURSE_UNLOCK}:${userId}:${courseId}:${s.stage}`,
        contextHint: { courseId, stage: s.stage } as never,
      });

      await this.emailJobs.enqueue({
        userId,
        eventType: 'COURSE_UNLOCK_STAGE',
        templateKey: `conversion.course-unlock-${s.stage}`,
        dueAt: toDaytime(new Date(hitAt.getTime() + s.emailAfter), offset),
        dedupeKey: `conversion.course-unlock-${s.stage}:${userId}:${courseId}`,
        payload: { courseId, stage: s.stage },
      });
    }
  }

  /** One stage's push + bell row, re-checked against the paywall right now. */
  async process(action: ScheduledActionRow): Promise<{ sent: boolean; skipReason?: string }> {
    const hint = (action.context ?? {}) as { courseId?: string; stage?: number };
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
    const copy =
      hint.stage === 1
        ? {
            title: next ? `Next up: ${next}` : `${course.title} is waiting`,
            body: `You finished the free lessons of ${course.title}. Unlock the rest and keep going while it's fresh.`,
          }
        : hint.stage === 2
          ? {
              title: `${course.title}: ${left} ${left === 1 ? 'lesson' : 'lessons'} to go`,
              body:
                state.learners >= SOCIAL_PROOF_MIN_LEARNERS
                  ? `${state.learners} people are learning this one. Unlock it and pick up right where you stopped.`
                  : `You're ${pct}% in. Unlock the course and finish what you started — I'll cheer loudly.`,
            }
          : {
              title: `Still thinking about ${course.title}?`,
              body: "No pressure. Your progress is saved exactly where you left it, whenever you're ready.",
            };

    const url = `/learn/${course.id}/unlock`;
    const outcome = await this.hub.notify({
      userId: action.userId,
      kind: 'COURSE_UNLOCK',
      ...copy,
      url,
      dedupeKey: `unlock:${course.id}:${hint.stage}`,
      inbox: { type: 'TEY_COURSE_UNLOCK', entityType: 'Course', entityId: course.id, collapseDaily: true },
    });

    if (outcome.pushed) {
      await this.actions.markSent(action.id);
      return { sent: true };
    }
    await this.actions.markSkipped(action.id, outcome.reason);
    return { sent: false, skipReason: outcome.reason };
  }
}

/**
 * Keeps an offer out of the learner's night: one that would land after 21:00
 * local moves to 18:00 the next evening, one in the small hours to 18:00 that
 * same day. An offer that arrives at 03:00 is either unseen or resented.
 */
function toDaytime(at: Date, offsetMinutes: number): Date {
  const local = new Date(at.getTime() - offsetMinutes * 60_000);
  const hour = local.getUTCHours();
  if (hour >= 9 && hour < 21) return at;
  const day = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), 18));
  if (hour >= 21) day.setUTCDate(day.getUTCDate() + 1);
  return new Date(day.getTime() + offsetMinutes * 60_000);
}
