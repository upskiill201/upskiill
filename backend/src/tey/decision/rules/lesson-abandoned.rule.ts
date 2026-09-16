import type { TeyContext } from '../../contracts/tey-context.types';
import { TEY_THRESHOLDS } from '../../tey.constants';
import {
  dedupeKeyFor,
  factsFrom,
  localTimeToday,
  ScheduleIntent,
  TeyRule,
} from './rule.types';

/**
 * A lesson was opened and left, past a minimum stall window and short of the
 * staleness ceiling.
 *
 * No jitter and no future-scheduled dueAt: by the time `plan()` sees an open
 * lesson past the threshold, the wait has already happened, so it queues for
 * right now. There is no periodic sweep in this module (by design — see
 * tey/README.md), so this only actually gets evaluated the next time
 * `planFor` runs for this learner: their next lesson completion, or their
 * next app open once the welcome banner starts reading learner state on
 * mount. A learner who abandons a lesson and never returns simply never
 * re-evaluates, which is correct — there is nobody to remind.
 */
export const LessonAbandonedRule: TeyRule = {
  id: 'LESSON_ABANDONED',
  priority: 'LOW',
  cooldownHours: 20,
  supersedes: [],

  plan(state, now): ScheduleIntent | null {
    if (!state.openLessonId || !state.openLessonStartedAt) return null;
    // Already hit today's goal via some other lesson — one stalled lesson
    // isn't worth a separate nudge.
    if (state.todayGoalCompleted) return null;

    const nowInstant = localTimeToday(now, 0, now.minutesOfDay).getTime();
    const elapsedMinutes =
      (nowInstant - state.openLessonStartedAt.getTime()) / 60_000;
    if (elapsedMinutes < TEY_THRESHOLDS.lessonAbandonedMinutes) return null;
    if (elapsedMinutes > TEY_THRESHOLDS.lessonAbandonedStaleMinutes)
      return null;

    const dueAt = new Date(nowInstant);
    const expiresAt = new Date(
      state.openLessonStartedAt.getTime() +
        TEY_THRESHOLDS.lessonAbandonedStaleMinutes * 60_000,
    );

    return {
      ruleId: 'LESSON_ABANDONED',
      priority: 'LOW',
      dueAt,
      expiresAt,
      // Scoped to the specific lesson, so a different stalled lesson later
      // today can still fire its own nudge.
      dedupeKey: `${dedupeKeyFor('LESSON_ABANDONED', state.userId, now.date)}:${state.openLessonId}`,
      contextHint: { reason: 'LESSON_ABANDONED', urgency: 'LOW' },
    };
  },

  stillRelevant(state) {
    // Re-derived from fresh state: if they went back and finished it (or
    // finished anything else), openLessonId comes back null on the next
    // projection and this correctly stops.
    return !!state.openLessonId && !state.todayGoalCompleted;
  },

  buildContext(state, now): TeyContext {
    return {
      v: 1,
      reason: 'LESSON_ABANDONED',
      urgency: 'LOW',
      learnerState: {
        engagement: state.engagementState,
        streak: state.streakState,
        performance: state.performanceState,
        course: state.courseState,
      },
      facts: factsFrom(state, now, TEY_THRESHOLDS.weeklyXpTarget),
      recommendedAction:
        state.target.type === 'LESSON' ? 'COMPLETE_LESSON' : 'RESUME_COURSE',
      target: state.target,
      tone: 'ENCOURAGING',
      teyState: 'REMINDER',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
