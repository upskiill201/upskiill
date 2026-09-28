import type { TeyContext } from '../../contracts/tey-context.types';
import { TEY_THRESHOLDS } from '../../tey.constants';
import {
  factsFrom,
  hoursUntil,
  localTimeToday,
  reminderHour,
  ScheduleIntent,
  TeyRule,
  withJitter,
} from './rule.types';

/** Only worth saying when the offer closes within this many hours. */
const MAX_HOURS_LEFT = 30;
/** …and not so close to the end that there is no time left to act on it. */
const MIN_HOURS_LEFT = 2;

/**
 * "Last chance to repair your streak" — the second beat after STREAK_LOST.
 *
 * The window and the price are StreakService's (copied onto the snapshot as
 * `repair`), so this rule only decides WHEN to remind: once, on the offer's
 * final day, at the learner's reminder hour. The day the loss was noticed is
 * STREAK_LOST's to tell; this rule steps aside while that is still news.
 */
export const StreakRepairExpiringRule: TeyRule = {
  id: 'STREAK_REPAIR_EXPIRING',
  priority: 'HIGH',
  cooldownHours: 20,
  supersedes: ['DAILY_GOAL_INCOMPLETE', 'INACTIVE_RETURN'],

  plan(state, now): ScheduleIntent | null {
    const repair = state.repair;
    if (!repair) return null;
    // STREAK_LOST owns the day the loss is first noticed.
    if ((state.daysSinceLastActivity ?? 0) < 3) return null;

    const hour = reminderHour(state, TEY_THRESHOLDS.defaultAtRiskHour, 9, 20);
    const dueAt = withJitter(localTimeToday(now, hour, 0), state.userId);
    const hoursLeft = (repair.expiresAt.getTime() - dueAt.getTime()) / 3_600_000;
    if (hoursLeft > MAX_HOURS_LEFT || hoursLeft < MIN_HOURS_LEFT) return null;

    const expiresAt = new Date(
      Math.min(
        repair.expiresAt.getTime() - MIN_HOURS_LEFT * 3_600_000,
        localTimeToday(now, 21, 30).getTime(),
      ),
    );
    if (dueAt >= expiresAt) return null;

    return {
      ruleId: 'STREAK_REPAIR_EXPIRING',
      priority: 'HIGH',
      dueAt,
      expiresAt,
      // One reminder per offer: the offer's closing instant identifies it.
      dedupeKey: `STREAK_REPAIR_EXPIRING:${state.userId}:${repair.expiresAt.toISOString()}`,
      contextHint: { reason: 'STREAK_REPAIR_EXPIRING', urgency: 'HIGH' },
    };
  },

  stillRelevant(state, now) {
    return !!state.repair && hoursUntil(now, state.repair.expiresAt) >= 1;
  },

  buildContext(state, now): TeyContext {
    return {
      v: 1,
      reason: 'STREAK_REPAIR_EXPIRING',
      urgency: 'HIGH',
      learnerState: {
        engagement: state.engagementState,
        streak: state.streakState,
        performance: state.performanceState,
        course: state.courseState,
      },
      facts: factsFrom(state, now, TEY_THRESHOLDS.weeklyXpTarget),
      recommendedAction: 'OPEN_APP',
      target: { type: 'STREAK' },
      tone: 'URGENT_PLAYFUL',
      teyState: 'STREAK_AT_RISK',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
