/**
 * Derived learner states (spec §7). These are deterministic, not AI-generated.
 *
 * They are persisted as plain strings on `learner_state` rather than Postgres
 * enums: the spec says explicitly that "the exact state model should evolve",
 * and `ALTER TYPE ... ADD VALUE` cannot run inside a transaction, which makes
 * enum evolution painful under this repo's hand-authored migration workflow.
 * The closed unions live here, where TypeScript actually enforces them.
 */

export const STREAK_STATES = [
  'NO_STREAK',
  'STREAK_SAFE',
  'STREAK_ACTIVE',
  'STREAK_AT_RISK',
  'STREAK_CRITICAL',
  'STREAK_LOST',
] as const;
export type StreakState = (typeof STREAK_STATES)[number];

export const ENGAGEMENT_STATES = [
  'NEW',
  'ACTIVE',
  'COOLING_DOWN',
  'INACTIVE_1_DAY',
  'INACTIVE_3_DAYS',
  'INACTIVE_7_DAYS',
  'RETURNING',
  'DORMANT',
] as const;
export type EngagementState = (typeof ENGAGEMENT_STATES)[number];

export const COURSE_STATES = [
  'NEW',
  'IN_PROGRESS',
  'ABANDONED',
  'NEAR_COMPLETION',
  'COMPLETED',
] as const;
export type CourseState = (typeof COURSE_STATES)[number];

export const PERFORMANCE_STATES = [
  'PERFORMING_WELL',
  'STABLE',
  'STRUGGLING',
  'DECLINING',
  'IMPROVING',
] as const;
export type PerformanceState = (typeof PERFORMANCE_STATES)[number];

/** Where a nudge should send the learner. Discriminated so the deep-link
 *  builder is exhaustive at compile time. */
export type TeyTarget =
  | { type: 'LESSON'; courseId: string; sectionIndex: number; lessonId: string }
  | { type: 'COURSE'; courseId: string }
  | { type: 'STREAK' }
  | { type: 'HOME' };

/** The full projection, as the decision engine sees it. */
export interface LearnerStateSnapshot {
  userId: string;

  // Mirrored from StreakService — never recomputed in this module.
  streakDays: number;
  longestStreak: number;
  lastStreakEarnedAt: Date | null;
  /** Same instant as lastStreakEarnedAt, as a YYYY-MM-DD string — precomputed
   *  here so rules can build a dedupe key without touching the Date field
   *  themselves (see learner-state.service.spec.ts's streak-math guard). */
  lastStreakEarnedDate: string | null;
  freezesAvailable: number;

  localDate: string;
  todayXp: number;
  todayLessons: number;
  dailyGoalXp: number;
  todayGoalCompleted: boolean;

  weeklyLessons: number;
  weeklyXp: number;

  streakState: StreakState;
  engagementState: EngagementState;
  courseState: CourseState;
  performanceState: PerformanceState;

  target: TeyTarget;
  currentCourseId: string | null;
  currentCourseTitle: string | null;
  currentLessonId: string | null;
  courseProgressPct: number;

  usualHourLocal: number | null;
  usualHourSamples: number;

  lastActivityAt: Date | null;
  daysSinceLastActivity: number | null;
  consecutiveIgnoredNudges: number;

  /** A lesson opened today with no later server-confirmed completion for it.
   *  Null once it's finished (or once the local day rolls over). */
  openLessonId: string | null;
  openLessonStartedAt: Date | null;

  /*
   * Filled by a FRESH projection only — the cached row does not carry them.
   * Every send path (scheduler revalidation, planning after a fire, the
   * activity listener) projects fresh, so a rule treats `undefined` as "not
   * known" and falls back.
   */

  /** The reminder hour the learner chose (TeyNotificationPrefs.preferredHour). */
  preferredHour?: number | null;
  /** StreakService's open repair offer, copied — never recomputed here. */
  repair?: { lostStreak: number; costCoins: number; expiresAt: Date } | null;
  /** Whole days since the account was created, for first-lesson nudges. */
  accountAgeDays?: number | null;
}
