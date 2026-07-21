-- Migration: add_lives_to_student_profiles
-- Adds the lives/hearts gamification system to student_profiles.
-- lives       = current life count (0-5)
-- maxLives    = the cap (always 5 for now)
-- livesLastLostAt = when the last life was deducted (used for timed refill)

ALTER TABLE "student_profiles"
  ADD COLUMN "lives" INTEGER NOT NULL DEFAULT 5,
  ADD COLUMN "maxLives" INTEGER NOT NULL DEFAULT 5,
  ADD COLUMN "livesLastLostAt" TIMESTAMP(3);
