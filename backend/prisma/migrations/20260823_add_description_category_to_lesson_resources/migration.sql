-- Migration: add_description_and_category_to_lesson_resources
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback: ALTER TABLE "LessonResource" DROP COLUMN IF EXISTS description; ALTER TABLE "LessonResource" DROP COLUMN IF EXISTS category;
-- Backup required: NO (additive only)
-- Deployment order: migration first, then code

ALTER TABLE "LessonResource" ADD COLUMN "description" TEXT;
ALTER TABLE "LessonResource" ADD COLUMN "category" TEXT;
