import type { TeyContext } from '../../contracts/tey-context.types';
import type { LearnerStateSnapshot } from '../../contracts/tey-state.types';
import type { TeyLocalNow } from '../../state/local-time.util';
import { TEY_THRESHOLDS } from '../../tey.constants';
import {
  factsFrom,
  localTimeToday,
  reminderHour,
  ScheduleIntent,
  TeyRule,
  withJitter,
} from './rule.types';

/**
 * The win-back ladder, in whole days away — Duolingo's shape: daily at first,
 * while the habit is still warm, then spreading out, then one honest
 * "I'll stop" at day 30 and silence after it.
 */
export const ESCALATION_DAYS = [1, 2, 3, 5, 7, 14, 21, 30] as const;
/** The last rung — its copy says Tey is stepping back, and it means it. */
export const FINAL_RUNG = ESCALATION_DAYS[ESCALATION_DAYS.length - 1];

/** Identifies one lapse: the instant the learner was last active. */
function lapseKey(state: { lastActivityAt: Date | null }): string {
  return state.lastActivityAt ? state.lastActivityAt.toISOString().slice(0, 10) : 'never';
}

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
 * Win back a lapsed learner along ESCALATION_DAYS, then stop.
 *
 * The scheduler's daily planner wake-up (DAY_PLANNER) re-plans each lapsed
 * learner once a day, which is what lets a rung fire on a day the learner
 * never opened the app. A learner who never comes back falls off the ladder
 * after the final rung, and the planner stops waking for them too.
 */
export const InactiveReturnRule: TeyRule = {
  id: 'INACTIVE_RETURN',
  priority: 'LOW',
  // Rungs 1-2-3 are consecutive days, so the cooldown only stops a same-day
  // double; the per-rung dedupe key is what keeps each rung to one send.
  cooldownHours: 20,
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
    if (days > FINAL_RUNG) return null;

    const step = stepFor(days);
    if (step === null) return null;

    // Come back at the hour they chose, or used to study -- that is when the
    // habit lives.
    const hour = reminderHour(state, TEY_THRESHOLDS.defaultAtRiskHour, 9, 20);
    const dueAt = withJitter(localTimeToday(now, hour, 0), state.userId);
    const expiresAt = localTimeToday(now, 21, 30);
    if (dueAt >= expiresAt) return null;

    return {
      ruleId: 'INACTIVE_RETURN',
      priority: days >= 3 ? 'MEDIUM' : 'LOW',
      dueAt,
      expiresAt,
      // One send per rung per lapse: keyed by the rung and by the lapse's
      // last active day, so a missed planner day catches the rung up late
      // rather than skipping it, and a new lapse starts a fresh ladder.
      dedupeKey: `INACTIVE_RETURN:${state.userId}:${lapseKey(state)}:${step}`,
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
      // Days 1-2 the habit is still warm, so the owl can be a little
      // dramatic; after that it's warmth, never a guilt trip. The final rung
      // is Tey stepping back — said plainly, once.
      tone:
        days >= FINAL_RUNG
          ? 'NEUTRAL'
          : days >= 3
            ? 'WARM_WELCOME'
            : 'URGENT_PLAYFUL',
      teyState:
        days >= FINAL_RUNG
          ? 'PASSIVE_AGGRESSIVE'
          : days >= 3
            ? 'WELCOME_BACK'
            : 'REMINDER',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
