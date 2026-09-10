import type { TeyContext } from '../../contracts/tey-context.types';
import { TEY_THRESHOLDS } from '../../tey.constants';
import {
  dedupeKeyFor,
  factsFrom,
  localTimeToday,
  ScheduleIntent,
  TeyRule,
  withJitter,
} from './rule.types';

/**
 * The ordinary daily nudge, for learners with no streak on the line.
 *
 * Anyone with a live streak gets the higher-urgency STREAK_AT_RISK path
 * instead; this one exists so a learner who is just starting out (or who has
 * already lost their streak) still hears from Tey, without borrowing urgency
 * that does not apply to them.
 */
export const DailyGoalIncompleteRule: TeyRule = {
  id: 'DAILY_GOAL_INCOMPLETE',
  priority: 'MEDIUM',
  cooldownHours: 20,
  supersedes: [],

  plan(state, now): ScheduleIntent | null {
    if (state.todayGoalCompleted) return null;
    // Leave it to the streak rules -- they say the same thing with real stakes.
    if (state.streakDays >= 1) return null;
    // A learner who has never started needs onboarding, not a study reminder.
    if (state.engagementState === 'NEW') return null;

    // Only for learners who are actually *in* the habit right now. Anyone who
    // has been away a day or more belongs to INACTIVE_RETURN, which knows when
    // to escalate and — crucially — when to stop. Without this guard, someone
    // gone two months would be told they had not hit "today's goal", which is
    // both absurd and unstoppable, since this rule has no ladder to fall off.
    if ((state.daysSinceLastActivity ?? Number.POSITIVE_INFINITY) >= 1) {
      return null;
    }

    const usual = state.usualHourLocal ?? TEY_THRESHOLDS.defaultAtRiskHour;
    const hour = Math.max(Math.min(usual + 1, 20), 18);

    const dueAt = withJitter(localTimeToday(now, hour, 0), state.userId);
    const expiresAt = localTimeToday(now, 21, 0);
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
