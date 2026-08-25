-- Migration: add_quiz_score_to_user_lesson_progress
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback: ALTER TABLE "user_lesson_progress" DROP COLUMN IF EXISTS "quizScore";
-- Backup required: NO (additive only)
-- Deployment order: migration first, then code

-- Apply-phase accuracy (0-100) reported by the lesson player at completion.
-- Nullable: lessons without activities and historical completions stay null.
ALTER TABLE "user_lesson_progress" ADD COLUMN "quizScore" DOUBLE PRECISION;
