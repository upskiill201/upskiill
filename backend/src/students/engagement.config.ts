/**
 * Single source of truth for learner-status and attention thresholds.
 * Every value is env-overridable (Render dashboard / local .env); nothing
 * else in the app may hardcode these numbers. Defaults chosen so a creator
 * sees "At risk" before the learner is truly gone, not after.
 */

const num = (key: string, dflt: number): number => {
  const v = process.env[key];
  return v !== undefined && v !== '' && !Number.isNaN(Number(v)) ? Number(v) : dflt;
};

export const ENGAGEMENT = Object.freeze({
  /* ── status windows ── */
  ACTIVE_DAYS: num('STUDENTS_ACTIVE_DAYS', 7), // ≤ this many days since activity → reachable
  AT_RISK_FROM_DAY: num('STUDENTS_AT_RISK_FROM_DAY', 8), // ≥ this quiet for → AT_RISK
  INACTIVE_AFTER_DAYS: num('STUDENTS_INACTIVE_AFTER_DAYS', 30), // quiet this long → INACTIVE
  NEW_WITHIN_DAYS: num('STUDENTS_NEW_WITHIN_DAYS', 14), // enrolled within window → NEW candidate
  HIGH_ENGAGE_MIN_STREAK: num('STUDENTS_HIGH_ENGAGE_MIN_STREAK', 3),
  HIGH_ENGAGE_MIN_LESSONS_7D: num('STUDENTS_HIGH_ENGAGE_MIN_LESSONS_7D', 5),

  /* ── course / lesson signals ── */
  NEAR_COMPLETION_PCT: num('STUDENTS_NEAR_COMPLETION_PCT', 90),
  STRUGGLE_ATTEMPTS: num('STUDENTS_STRUGGLE_ATTEMPTS', 2),
  STRUGGLE_TIME_MULT: num('STUDENTS_STRUGGLE_TIME_MULT', 2.5), // × learner median time
  ABANDONED_AFTER_DAYS: num('STUDENTS_ABANDONED_AFTER_DAYS', 7), // started, stalled this long
  STUCK_LESSON_DAYS: num('STUDENTS_STUCK_LESSON_DAYS', 5),
  QUIZ_FAIL_ATTEMPTS: num('STUDENTS_QUIZ_FAIL_ATTEMPTS', 3),
  QUIZ_PASS_SCORE: num('STUDENTS_QUIZ_PASS_SCORE', 70),
  HIGH_PERFORMER_MIN_AVG: num('STUDENTS_HIGH_PERFORMER_MIN_AVG', 80),
  HIGH_PERFORMER_MIN_COMPLETED: num('STUDENTS_HIGH_PERFORMER_MIN_COMPLETED', 3),

  /* ── analysis windows & payload caps ── */
  ATTENTION_SILENT_DAYS: num('STUDENTS_ATTENTION_SILENT_DAYS', 7),
  BEHAVIOR_WINDOW_DAYS: num('STUDENTS_BEHAVIOR_WINDOW_DAYS', 28),
  WEEKDAY_WINDOW_DAYS: num('STUDENTS_WEEKDAY_WINDOW_DAYS', 60),
  JOURNEY_MAX_EVENTS: num('STUDENTS_JOURNEY_MAX_EVENTS', 100),
  LESSONS_MAX_ROWS: num('STUDENTS_LESSONS_MAX_ROWS', 200),
  QUIZ_TIMELINE_MAX: num('STUDENTS_QUIZ_TIMELINE_MAX', 50),
  HOURLY_EVENT_MAX: num('STUDENTS_HOURLY_EVENT_MAX', 500),
});

/** Platform-level learner segment — one per learner, precedence-ordered. */
export type LearnerSegment =
  | 'NEW'
  | 'ACTIVE'
  | 'HIGHLY_ENGAGED'
  | 'NEAR_COMPLETION'
  | 'STRUGGLING'
  | 'HIGH_PERFORMER'
  | 'AT_RISK'
  | 'INACTIVE'
  | 'COMPLETED';

export const SEGMENT_ORDER: LearnerSegment[] = [
  'NEW',
  'HIGHLY_ENGAGED',
  'ACTIVE',
  'NEAR_COMPLETION',
  'STRUGGLING',
  'HIGH_PERFORMER',
  'AT_RISK',
  'INACTIVE',
  'COMPLETED',
];
