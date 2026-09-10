-- Migration: add_daily_goal_to_student_profile
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback: ALTER TABLE "student_profiles" DROP COLUMN "dailyGoalXp";
-- Backup required: NO (additive only)
-- Deployment order: migration first, then code
--
-- Duolingo-style daily goal (XP/day) for the student profile settings page.
-- 20 Casual | 50 Regular | 100 Serious | 200 Intense. Default 20 = Casual.
--
-- NOTE: applied via `npx prisma migrate deploy` because the historical chain
-- cannot replay on a shadow database (`20260729_add_lucky_spin_segments`
-- seeds `spin_wheel_segments`, which no migration creates).

ALTER TABLE "student_profiles" ADD COLUMN "dailyGoalXp" INTEGER NOT NULL DEFAULT 20;
