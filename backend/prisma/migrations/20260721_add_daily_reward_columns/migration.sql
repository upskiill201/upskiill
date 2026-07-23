-- Migration: add_daily_reward_columns
-- Adds lastRewardClaimedAt and dailyRewardCyclePosition to student_profiles.

ALTER TABLE "student_profiles"
  ADD COLUMN "lastRewardClaimedAt" TIMESTAMP(3),
  ADD COLUMN "dailyRewardCyclePosition" INTEGER NOT NULL DEFAULT 1;
