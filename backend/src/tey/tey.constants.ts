/**
 * Tuning knobs for the Tey intelligence layer.
 *
 * Spec §8 requires thresholds to be configurable rather than hard-coded
 * throughout the application. They live here as one frozen object; the admin
 * dashboard overrides a subset of them at runtime in a later phase.
 */

export const TEY_THRESHOLDS = Object.freeze({
  /** Hours left in the learner's local day before a streak goes CRITICAL. */
  streakCriticalHoursLeft: 2,

  /** Local hour used for at-risk timing when we have no habit data yet. */
  defaultAtRiskHour: 19,

  /** Never wait past this local hour to call a streak at risk, however late
   *  the learner's usual study time is. */
  latestAtRiskHour: 21,

  /** Inactivity buckets, in whole local days. */
  inactiveDays: Object.freeze({ short: 1, medium: 3, long: 7 }),

  /** Past this, a learner is dormant and the escalation chain stops. */
  dormantDays: 14,

  /** Days without touching a course before it counts as abandoned. */
  courseAbandonedDays: 7,

  /** Progress percentage at which a course is "nearly done". */
  nearCompletionPct: 80,

  /** Weekly XP goal, mirroring ProgressService.WEEKLY_XP_TARGET. */
  weeklyXpTarget: 300,

  /** Habit model: EWMA weight for each new observation, and the sample cap
   *  beyond which the estimate is considered settled. */
  usualHourAlpha: 0.3,
  usualHourMaxSamples: 30,

  /** How stale a cached learner_state row may be before a read re-projects. */
  stateFreshnessMs: 5 * 60 * 1000,
});

/** Local-day gap after which returning counts as a comeback rather than
 *  ordinary continued activity. */
export const RETURNING_AFTER_DAYS = 3;
