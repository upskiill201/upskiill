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
 * Acknowledges a streak that has already ended — once, not every evening it
 * stays lost.
 *
 * deriveStreakState() (learner-state.derivers.ts) already computes
 * STREAK_LOST when a gap has burned past any freeze; this rule only decides
 * when to say so, and makes sure it says it exactly once.
 */
export const StreakLostRule: TeyRule = {
  id: 'STREAK_LOST',
  priority: 'LOW',
  cooldownHours: 24,
  supersedes: ['DAILY_GOAL_INCOMPLETE'],

  plan(state, now): ScheduleIntent | null {
    if (state.streakState !== 'STREAK_LOST') return null;
    // Nothing to key the "once per loss" dedupe off without this.
    if (!state.lastStreakEarnedDate) return null;

    const hour = state.usualHourLocal ?? TEY_THRESHOLDS.defaultAtRiskHour;
    const dueAt = withJitter(localTimeToday(now, hour, 0), state.userId);
    const expiresAt = localTimeToday(now, 21, 30);
    if (dueAt >= expiresAt) return null;

    // Scoped to the loss itself, not today's date — a streak can sit LOST for
    // days before the learner starts a new one, and this must fire exactly
    // once across that whole span, however many times planning re-runs.
    return {
      ruleId: 'STREAK_LOST',
      priority: 'LOW',
      dueAt,
      expiresAt,
      dedupeKey: dedupeKeyFor(
        'STREAK_LOST',
        state.userId,
        state.lastStreakEarnedDate,
      ),
      contextHint: { reason: 'STREAK_LOST', urgency: 'LOW' },
    };
  },

  stillRelevant(state) {
    return state.streakState === 'STREAK_LOST';
  },

  buildContext(state, now): TeyContext {
    return {
      v: 1,
      reason: 'STREAK_LOST',
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
      // The streak is already gone — nothing left to protect, so no urgency
      // and no teasing. Just a warm nudge to start the next one.
      tone: 'ENCOURAGING',
      teyState: 'STREAK_LOST',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
