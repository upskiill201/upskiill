import type { LearnerStateSnapshot } from '../contracts/tey-state.types';

/**
 * The in-app "welcome back" banner's data, derived from an already-fetched
 * state snapshot. Pulled out of TeyController so it's unit-testable without
 * the guard/controller stack.
 *
 * This is intentionally NOT a push notification and does not go through
 * TeyPolicyService — it's a synchronous read on page load, not a scheduled
 * interruption. No quiet hours, no daily cap, no cooldown apply here; the
 * frontend is responsible for only showing it once per session.
 */
export interface TeyGreeting {
  streakDays: number;
  /** Streak is still alive but at risk or critical today. */
  atRisk: boolean;
  /** Streak ended and hasn't been rebuilt yet. */
  justLost: boolean;
  daysSinceLastActivity: number | null;
  courseTitle: string | null;
}

export function buildGreeting(state: LearnerStateSnapshot): TeyGreeting {
  return {
    streakDays: state.streakDays,
    atRisk:
      state.streakState === 'STREAK_AT_RISK' ||
      state.streakState === 'STREAK_CRITICAL',
    justLost: state.streakState === 'STREAK_LOST',
    daysSinceLastActivity: state.daysSinceLastActivity,
    courseTitle: state.currentCourseTitle,
  };
}
