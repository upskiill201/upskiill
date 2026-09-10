/**
 * Pure derivation of the four learner states (spec §7).
 *
 * No IO, no Prisma, no Date.now() — every input is passed in, which is what
 * makes the state matrix testable as a table. Thresholds live in
 * tey/tey.constants.ts so they are configurable rather than sprinkled through
 * the codebase.
 */

import type {
  CourseState,
  EngagementState,
  PerformanceState,
  StreakState,
} from '../contracts/tey-state.types';
import { TEY_THRESHOLDS } from '../tey.constants';
import { hoursUntilLocalMidnight, TeyLocalNow } from './local-time.util';

export interface StreakStateInput {
  streakDays: number;
  todayGoalCompleted: boolean;
  freezesAvailable: number;
  /** Whole local days since the last streak-earning day; null when never. */
  daysSinceStreakEarned: number | null;
  usualHourLocal: number | null;
  now: TeyLocalNow;
}

/**
 * Note the ordering: "already done today" wins over every risk signal. A
 * learner who finished their goal at 9am must never be told at 8pm that their
 * streak is at risk.
 */
export function deriveStreakState(i: StreakStateInput): StreakState {
  if (i.todayGoalCompleted) return 'STREAK_SAFE';

  if (i.streakDays <= 0) {
    // A gap already burned through the freeze bank is a lost streak, not a
    // "you have no streak yet" — the distinction drives a different message.
    if (i.daysSinceStreakEarned !== null && i.daysSinceStreakEarned > 1) {
      return 'STREAK_LOST';
    }
    return 'NO_STREAK';
  }

  const hoursLeft = hoursUntilLocalMidnight(i.now);
  if (hoursLeft <= TEY_THRESHOLDS.streakCriticalHoursLeft)
    return 'STREAK_CRITICAL';

  // At risk once their usual study window has passed (or, with no habit data
  // yet, once the evening threshold hits).
  const riskHour = i.usualHourLocal ?? TEY_THRESHOLDS.defaultAtRiskHour;
  if (i.now.hour >= Math.min(riskHour + 1, TEY_THRESHOLDS.latestAtRiskHour)) {
    return 'STREAK_AT_RISK';
  }

  return 'STREAK_ACTIVE';
}

export interface EngagementStateInput {
  daysSinceLastActivity: number | null;
  /** Total lifetime lessons — separates a brand-new learner from a dormant one. */
  lifetimeLessons: number;
  /** True when they were inactive long enough to lapse but acted today. */
  returnedToday: boolean;
}

export function deriveEngagementState(
  i: EngagementStateInput,
): EngagementState {
  if (i.lifetimeLessons === 0) return 'NEW';
  if (i.returnedToday) return 'RETURNING';

  const d = i.daysSinceLastActivity;
  if (d === null) return 'NEW';
  if (d <= 0) return 'ACTIVE';
  if (d === 1) return 'INACTIVE_1_DAY';
  if (d < TEY_THRESHOLDS.inactiveDays.medium) return 'COOLING_DOWN';
  if (d < TEY_THRESHOLDS.inactiveDays.long) return 'INACTIVE_3_DAYS';
  if (d < TEY_THRESHOLDS.dormantDays) return 'INACTIVE_7_DAYS';
  return 'DORMANT';
}

export interface CourseStateInput {
  hasCourse: boolean;
  progressPct: number;
  daysSinceCourseActivity: number | null;
}

export function deriveCourseState(i: CourseStateInput): CourseState {
  if (!i.hasCourse) return 'NEW';
  if (i.progressPct >= 100) return 'COMPLETED';
  if (i.progressPct <= 0) return 'NEW';
  if (
    i.daysSinceCourseActivity !== null &&
    i.daysSinceCourseActivity >= TEY_THRESHOLDS.courseAbandonedDays
  ) {
    return 'ABANDONED';
  }
  if (i.progressPct >= TEY_THRESHOLDS.nearCompletionPct)
    return 'NEAR_COMPLETION';
  return 'IN_PROGRESS';
}

/**
 * Performance is deliberately inert in this pass — spec §7 says these states
 * "can be introduced gradually", and nothing in the current rule set branches
 * on it. Shipping the seam without guessing at a signal keeps the first
 * release honest.
 */
export function derivePerformanceState(): PerformanceState {
  return 'STABLE';
}

/**
 * Exponentially-weighted mean of the local hour a learner studies at, used to
 * time reminders. Circular mean, so 23:00 and 01:00 average to midnight rather
 * than to noon.
 */
export function updateUsualHour(
  previousHour: number | null,
  samples: number,
  newHour: number,
): { hour: number; samples: number } {
  const nextSamples = Math.min(samples + 1, TEY_THRESHOLDS.usualHourMaxSamples);
  if (previousHour === null || samples === 0) {
    return { hour: newHour, samples: nextSamples };
  }

  const alpha = TEY_THRESHOLDS.usualHourAlpha;
  const toRad = (h: number) => (h / 24) * 2 * Math.PI;
  const x =
    (1 - alpha) * Math.cos(toRad(previousHour)) +
    alpha * Math.cos(toRad(newHour));
  const y =
    (1 - alpha) * Math.sin(toRad(previousHour)) +
    alpha * Math.sin(toRad(newHour));

  let hour = Math.round(((Math.atan2(y, x) / (2 * Math.PI)) * 24 + 24) % 24);
  if (hour === 24) hour = 0;
  return { hour, samples: nextSamples };
}
