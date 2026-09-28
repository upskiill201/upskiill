import type { TeyContext } from '../../contracts/tey-context.types';
import { TEY_THRESHOLDS } from '../../tey.constants';
import {
  dedupeKeyFor,
  factsFrom,
  localTimeToday,
  reminderHour,
  ScheduleIntent,
  TeyRule,
  withJitter,
} from './rule.types';

/**
 * The daily practice reminder — Duolingo's first ping of the day, sent at the
 * time the learner chose.
 *
 * It is the FIRST rung of a learner's day, not a competitor to the streak
 * rules: someone on a streak hears this at their chosen time, then
 * STREAK_AT_RISK in the evening, then STREAK_CRITICAL at 22:00. So it only
 * fires early enough to leave room for the evening rungs — a learner whose
 * chosen hour is already evening gets the streak saver instead of two pings
 * an hour apart.
 */

/** Past this local hour a streak learner's reminder is left to STREAK_AT_RISK. */
const LATEST_FOR_STREAK = 16;

export const DailyGoalIncompleteRule: TeyRule = {
  id: 'DAILY_GOAL_INCOMPLETE',
  priority: 'MEDIUM',
  cooldownHours: 20,
  supersedes: [],

  plan(state, now): ScheduleIntent | null {
    if (state.todayGoalCompleted) return null;
    // A learner who has never started needs FIRST_LESSON, not a study reminder.
    if (state.engagementState === 'NEW') return null;

    const onStreak = state.streakDays >= 1;
    // Without a streak, only learners who are actually in the habit right now.
    // Anyone away a day or more belongs to INACTIVE_RETURN, which knows when
    // to escalate and — crucially — when to stop.
    if (!onStreak && (state.daysSinceLastActivity ?? Number.POSITIVE_INFINITY) >= 1) {
      return null;
    }

    const hour = reminderHour(state, onStreak ? 12 : 18, 8, 20);
    if (onStreak && hour > LATEST_FOR_STREAK) return null;

    const dueAt = withJitter(localTimeToday(now, hour, 0), state.userId);
    const expiresAt = localTimeToday(now, Math.min(hour + 3, 21), 0);
    if (dueAt >= expiresAt) return null;

    return {
      ruleId: 'DAILY_GOAL_INCOMPLETE',
      priority: 'MEDIUM',
      dueAt,
      expiresAt,
      dedupeKey: dedupeKeyFor('DAILY_GOAL_INCOMPLETE', state.userId, now.date),
      contextHint: { reason: 'DAILY_GOAL_INCOMPLETE', urgency: 'MEDIUM' },
    };
  },

  stillRelevant(state) {
    return !state.todayGoalCompleted;
  },

  buildContext(state, now): TeyContext {
    return {
      v: 1,
      reason: 'DAILY_GOAL_INCOMPLETE',
      urgency: 'MEDIUM',
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
