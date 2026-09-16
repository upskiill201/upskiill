import type { TeyContext } from '../../contracts/tey-context.types';
import { TEY_THRESHOLDS } from '../../tey.constants';
import {
  dedupeKeyFor,
  factsFrom,
  localTimeToday,
  ScheduleIntent,
  TeyRule,
} from './rule.types';

/** How soon after the triggering completion to celebrate. This is a reaction
 *  to something that just happened, not an evening reminder. */
const CELEBRATE_AFTER_MS = 5 * 60_000;
const CELEBRATE_WINDOW_MS = 2 * 60 * 60_000;

/**
 * A streak just crossed a round number worth marking.
 *
 * Fires only on the day it happens, right after the completion that pushed it
 * there — planning re-runs on every lesson completion (see TeyListener), so
 * this is evaluated at close to the real moment.
 */
export const MilestoneRule: TeyRule = {
  id: 'MILESTONE',
  priority: 'MEDIUM',
  cooldownHours: 24,
  supersedes: [],

  plan(state, now): ScheduleIntent | null {
    if (!state.todayGoalCompleted) return null;
    if (!TEY_THRESHOLDS.milestoneStreakDays.includes(state.streakDays)) {
      return null;
    }

    const nowInstant = localTimeToday(now, 0, now.minutesOfDay);
    const dueAt = new Date(nowInstant.getTime() + CELEBRATE_AFTER_MS);
    const expiresAt = new Date(nowInstant.getTime() + CELEBRATE_WINDOW_MS);

    return {
      ruleId: 'MILESTONE',
      priority: 'MEDIUM',
      dueAt,
      expiresAt,
      // Scoped to the specific milestone number, so a later day at a
      // different round number can still fire.
      dedupeKey: `${dedupeKeyFor('MILESTONE', state.userId, now.date)}:${state.streakDays}`,
      contextHint: { reason: 'MILESTONE', urgency: 'MEDIUM' },
    };
  },

  stillRelevant(state) {
    return (
      state.todayGoalCompleted &&
      TEY_THRESHOLDS.milestoneStreakDays.includes(state.streakDays)
    );
  },

  buildContext(state, now): TeyContext {
    return {
      v: 1,
      reason: 'MILESTONE',
      urgency: 'MEDIUM',
      learnerState: {
        engagement: state.engagementState,
        streak: state.streakState,
        performance: state.performanceState,
        course: state.courseState,
      },
      facts: factsFrom(state, now, TEY_THRESHOLDS.weeklyXpTarget),
      recommendedAction: 'CELEBRATE',
      target: state.target,
      tone: 'CELEBRATORY',
      teyState: 'MILESTONE',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
