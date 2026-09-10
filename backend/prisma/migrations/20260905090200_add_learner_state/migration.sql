-- Type: ADDITIVE ONLY — new projection table, one row per learner.
--
-- This is a CACHE, not a source of truth. Every column is reproducible from
-- student_profiles + user_daily_activity + StreakService. It exists so the
-- decision engine and scheduler can read one indexed row instead of running
-- streak reconciliation for every due action.
--
-- Notification counts deliberately do NOT live here — the daily cap is derived
-- from the delivery ledger, which is one indexed count and cannot drift.
--
-- Rollback:
--   DROP TABLE "learner_state";

CREATE TABLE "learner_state" (
  "userId"                   TEXT NOT NULL,

  "streakDays"               INTEGER NOT NULL DEFAULT 0,
  "longestStreak"            INTEGER NOT NULL DEFAULT 0,
  "lastStreakEarnedAt"       TIMESTAMP(3),
  "freezesAvailable"         INTEGER NOT NULL DEFAULT 0,

  "localDate"                TEXT,
  "todayXp"                  INTEGER NOT NULL DEFAULT 0,
  "todayLessons"             INTEGER NOT NULL DEFAULT 0,
  "dailyGoalXp"              INTEGER NOT NULL DEFAULT 20,
  "todayGoalCompleted"       BOOLEAN NOT NULL DEFAULT false,

  "weeklyLessons"            INTEGER NOT NULL DEFAULT 0,
  "weeklyXp"                 INTEGER NOT NULL DEFAULT 0,

  "streakState"              TEXT NOT NULL DEFAULT 'NO_STREAK',
  "engagementState"          TEXT NOT NULL DEFAULT 'NEW',
  "courseState"              TEXT NOT NULL DEFAULT 'NEW',
  "performanceState"         TEXT NOT NULL DEFAULT 'STABLE',

  "currentCourseId"          TEXT,
  "currentSectionIndex"      INTEGER,
  "currentLessonId"          TEXT,
  "courseProgressPct"        INTEGER NOT NULL DEFAULT 0,

  "usualHourLocal"           INTEGER,
  "usualHourSamples"         INTEGER NOT NULL DEFAULT 0,

  "lastActivityAt"           TIMESTAMP(3),
  "consecutiveIgnoredNudges" INTEGER NOT NULL DEFAULT 0,

  "computedAt"               TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "revision"                 INTEGER NOT NULL DEFAULT 0,

  CONSTRAINT "learner_state_pkey" PRIMARY KEY ("userId"),
  CONSTRAINT "learner_state_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "learner_state_engagementState_lastActivityAt_idx"
  ON "learner_state"("engagementState", "lastActivityAt");

CREATE INDEX "learner_state_streakState_idx"
  ON "learner_state"("streakState");
