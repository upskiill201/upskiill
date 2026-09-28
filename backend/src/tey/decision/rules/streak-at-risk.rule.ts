import type { TeyContext } from '../../contracts/tey-context.types';
import type { LearnerStateSnapshot } from '../../contracts/tey-state.types';
import type { TeyLocalNow } from '../../state/local-time.util';
import { TEY_THRESHOLDS } from '../../tey.constants';
import {
  dedupeKeyFor,
  factsFrom,
  localTimeToday,
  ScheduleIntent,
  TeyRule,
  withJitter,
} from './rule.types';

/** The learner has a streak going and has not yet done today's goal. */
export const StreakAtRiskRule: TeyRule = {
  id: 'STREAK_AT_RISK',
  priority: 'HIGH',
  cooldownHours: 20,
  // Not DAILY_GOAL_INCOMPLETE: that is the morning/afternoon rung of the same
  // day and only plans itself early enough to leave room for this one.
  supersedes: [],

  plan(state, now): ScheduleIntent | null {
    // Nothing to protect.
    if (state.streakDays < 1) return null;
    if (state.todayGoalCompleted) return null;

    // The evening rung: 20:00, or the learner's own reminder hour when that
    // is later — but never past the cap, or a night owl whose reminder hour
    // is 23:00 would be nudged at midnight, which never arrives.
    const chosen = state.preferredHour ?? state.usualHourLocal ?? 0;
    const hour = Math.min(Math.max(20, chosen), TEY_THRESHOLDS.latestAtRiskHour);

    const dueAt = withJitter(localTimeToday(now, hour, 0), state.userId);
    // Hand over to STREAK_CRITICAL rather than firing late.
    const expiresAt = localTimeToday(now, 22, 0);
    if (dueAt >= expiresAt) return null;

    return {
      ruleId: 'STREAK_AT_RISK',
      priority: 'HIGH',
      dueAt,
      expiresAt,
      dedupeKey: dedupeKeyFor('STREAK_AT_RISK', state.userId, now.date),
      contextHint: { reason: 'STREAK_AT_RISK', urgency: 'HIGH' },
    };
  },

  stillRelevant(state) {
    // The one check that matters: they may have studied since we scheduled this.
    return state.streakDays >= 1 && !state.todayGoalCompleted;
  },

  buildContext(state, now): TeyContext {
    return {
      v: 1,
      reason: 'STREAK_AT_RISK',
      urgency: 'HIGH',
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
      // Teasing is fine here; it escalates only if they keep ignoring us.
      tone:
        state.consecutiveIgnoredNudges >= 2
          ? 'PLAYFUL_PASSIVE_AGGRESSIVE'
          : 'URGENT_PLAYFUL',
      teyState: 'STREAK_AT_RISK',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
