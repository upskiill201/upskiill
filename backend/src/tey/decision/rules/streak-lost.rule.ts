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
 * Past this many days away, a lost streak is old news — the win-back ladder
 * (INACTIVE_RETURN) owns the learner from here. A streak breaks the day after
 * a missed day, later only when freezes covered part of the gap.
 */
const LOSS_IS_NEWS_FOR_DAYS = 3;

/**
 * Acknowledges a streak that has just ended — once, on the day it is noticed.
 *
 * deriveStreakState() (learner-state.derivers.ts) already computes
 * STREAK_LOST when a gap has burned past any freeze; this rule only decides
 * when to say so. When StreakService has a repair offer open, the message
 * leads with it: Duolingo's "you can still get it back" is the single most
 * effective line in the whole streak flow, and here it is also true.
 */
export const StreakLostRule: TeyRule = {
  id: 'STREAK_LOST',
  priority: 'MEDIUM',
  cooldownHours: 24,
  // The loss IS today's message — a separate "come back" ping the same day
  // would be the same news twice.
  supersedes: ['DAILY_GOAL_INCOMPLETE', 'INACTIVE_RETURN'],

  plan(state, now): ScheduleIntent | null {
    if (state.streakState !== 'STREAK_LOST') return null;
    // Nothing to key the "once per loss" dedupe off without this.
    if (!state.lastStreakEarnedDate) return null;
    if ((state.daysSinceLastActivity ?? 0) > LOSS_IS_NEWS_FOR_DAYS) return null;

    const hour = reminderHour(state, TEY_THRESHOLDS.defaultAtRiskHour, 9, 20);
    const dueAt = withJitter(localTimeToday(now, hour, 0), state.userId);
    const expiresAt = localTimeToday(now, 21, 30);
    if (dueAt >= expiresAt) return null;

    // Scoped to the loss itself, not today's date — this must fire exactly
    // once per broken streak, however many times planning re-runs.
    return {
      ruleId: 'STREAK_LOST',
      priority: 'MEDIUM',
      dueAt,
      expiresAt,
      dedupeKey: dedupeKeyFor(
        'STREAK_LOST',
        state.userId,
        state.lastStreakEarnedDate,
      ),
      contextHint: { reason: 'STREAK_LOST', urgency: 'MEDIUM' },
    };
  },

  stillRelevant(state) {
    return state.streakState === 'STREAK_LOST' && !state.todayGoalCompleted;
  },

  buildContext(state, now): TeyContext {
    return {
      v: 1,
      reason: 'STREAK_LOST',
      urgency: 'MEDIUM',
      learnerState: {
        engagement: state.engagementState,
        streak: state.streakState,
        performance: state.performanceState,
        course: state.courseState,
      },
      facts: factsFrom(state, now, TEY_THRESHOLDS.weeklyXpTarget),
      // With a repair open, the streak screen is where it gets fixed.
      recommendedAction: state.repair
        ? 'OPEN_APP'
        : state.target.type === 'LESSON'
          ? 'COMPLETE_LESSON'
          : 'RESUME_COURSE',
      target: state.repair ? { type: 'STREAK' } : state.target,
      // The streak is gone, so no teasing — but a repair is a real, urgent
      // offer, and saying so plainly is the kind thing to do.
      tone: state.repair ? 'URGENT_PLAYFUL' : 'ENCOURAGING',
      teyState: 'STREAK_LOST',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
