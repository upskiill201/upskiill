-- Migration: add_gamification_upgrades
-- Adds streakFreezeBank, completedQuests and lastQuestResetAt to student_profiles.
-- Alters default xp value to 30.

ALTER TABLE "student_profiles"
  ALTER COLUMN "xp" SET DEFAULT 30,
  ADD COLUMN "streakFreezeBank" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN "completedQuests" JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN "lastQuestResetAt" TIMESTAMP(3);
