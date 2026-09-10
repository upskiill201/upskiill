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

/** The escalation ladder, in whole days away. */
const ESCALATION_DAYS = [1, 3, 7] as const;

function stepFor(days: number | null): number | null {
  if (days === null) return null;
  // The largest rung they have reached. Past the last one, we stop entirely.
  let step: number | null = null;
  for (const d of ESCALATION_DAYS) {
    if (days >= d) step = d;
  }
  return step;
}

/**
 * Win back a lapsed learner, escalating 1 -> 3 -> 7 days and then stopping.
 *
 * This rule is what makes the scheduler self-perpetuating without a cron sweep:
 * when a fired action finds the learner still away, planning runs again and
 * queues the next rung. A learner who never comes back falls off the ladder
 * after day 7 and costs nothing thereafter -- which is the whole reason the
 * system never has to scan every user.
 */
export const InactiveReturnRule: TeyRule = {
  id: 'INACTIVE_RETURN',
  priority: 'LOW',
  cooldownHours: 44,
  supersedes: ['DAILY_GOAL_INCOMPLETE'],

  plan(state, now): ScheduleIntent | null {
    // Never chase someone who has never started -- that is an onboarding job.
    if (state.engagementState === 'NEW') return null;

    // A learner with a live streak belongs to the streak rules. Studying
    // yesterday and not yet today is what a daily habit looks like, not a
    // lapse, and win-back copy aimed at someone on a 12-day run reads as if
    // Tey has not been paying attention.
    if (state.streakDays >= 1) return null;
    // Active today; nothing to win back.
    if (state.todayLessons > 0) return null;

    const days = state.daysSinceLastActivity;
    if (days === null || days < 1) return null;
    // Past the last rung we stop pestering. Silence is a feature.
    if (days > TEY_THRESHOLDS.dormantDays) return null;

    const step = stepFor(days);
    if (step === null) return null;

    // Come back at the hour they used to study -- that is when the habit lives.
    const hour = state.usualHourLocal ?? TEY_THRESHOLDS.defaultAtRiskHour;
    const dueAt = withJitter(localTimeToday(now, hour, 0), state.userId);
    const expiresAt = localTimeToday(now, 21, 30);
    if (dueAt >= expiresAt) return null;

    return {
      ruleId: 'INACTIVE_RETURN',
      priority: days >= 3 ? 'MEDIUM' : 'LOW',
      dueAt,
      expiresAt,
      // Scoped by rung as well as day, so day 3 can fire even though day 1
      // already did.
      dedupeKey: `${dedupeKeyFor('INACTIVE_RETURN', state.userId, now.date)}:${step}`,
      contextHint: {
        reason: 'INACTIVE_RETURN',
        urgency: days >= 3 ? 'MEDIUM' : 'LOW',
      },
    };
  },

  stillRelevant(state) {
    // If they opened a lesson between scheduling and firing, we have nothing
    // to say -- and saying it anyway is exactly what makes reminders feel dumb.
    return state.todayLessons === 0 && (state.daysSinceLastActivity ?? 0) >= 1;
  },

  buildContext(state, now): TeyContext {
    const days = state.daysSinceLastActivity ?? 0;
    return {
      v: 1,
      reason: 'INACTIVE_RETURN',
      urgency: days >= 3 ? 'MEDIUM' : 'LOW',
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
      // Someone coming back after a week gets warmth, never a guilt trip.
      tone: days >= 3 ? 'WARM_WELCOME' : 'ENCOURAGING',
      teyState: days >= 3 ? 'WELCOME_BACK' : 'ENCOURAGING',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
