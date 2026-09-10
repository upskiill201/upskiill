-- Migration: add_user_monthly_quests
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback: DROP TABLE "user_monthly_quests";
-- Backup required: NO (additive only, new table has no dependents)
-- Deployment order: migration first, then code
--
-- Monthly Quest — one row per user per local month. Progress = goal-days:
-- a day counts when UserDailyActivity.xpEarned >= dailyGoalXp AND at least
-- one lesson was completed that day. goalSnapshot (Json) is append-only so a
-- counted day stays counted even if dailyGoalXp changes mid-month.

CREATE TABLE "user_monthly_quests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "monthKey" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "dailyGoalXpAtStart" INTEGER NOT NULL,
    "targetDays" INTEGER NOT NULL,
    "goalDays" INTEGER NOT NULL DEFAULT 0,
    "goalSnapshot" JSONB NOT NULL DEFAULT '[]',
    "milestonesClaimed" JSONB NOT NULL DEFAULT '[]',
    "finalRewardType" TEXT,
    "finalRewardAmount" INTEGER,
    "badgeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_monthly_quests_pkey" PRIMARY KEY ("id")
);

-- Unique constraint mirrors @@unique([userId, monthKey]); IF NOT EXISTS keeps
-- re-runs (e.g. manual replay against staging) from failing.
CREATE UNIQUE INDEX IF NOT EXISTS "user_monthly_quests_userId_monthKey_key"
    ON "user_monthly_quests"("userId", "monthKey");

CREATE INDEX IF NOT EXISTS "user_monthly_quests_userId_idx"
    ON "user_monthly_quests"("userId");

ALTER TABLE "user_monthly_quests"
    ADD CONSTRAINT "user_monthly_quests_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
