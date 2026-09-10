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
  supersedes: ['DAILY_GOAL_INCOMPLETE'],

  plan(state, now): ScheduleIntent | null {
    // Nothing to protect.
    if (state.streakDays < 1) return null;
    if (state.todayGoalCompleted) return null;

    // Fire an hour after their usual study time, but never later than the
    // evening cap -- a night owl whose usual hour is 23:00 would otherwise be
    // nudged at midnight, which never arrives.
    const usual = state.usualHourLocal ?? TEY_THRESHOLDS.defaultAtRiskHour;
    const hour = Math.min(usual + 1, TEY_THRESHOLDS.latestAtRiskHour);

    const dueAt = withJitter(localTimeToday(now, hour, 30), state.userId);
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
