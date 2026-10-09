-- Type: ADDITIVE ONLY
-- Course importer publishes section by section; a lesson that can't be
-- written holds its section back until the admin retries or skips it. This
-- records the skip.
--
-- Rollback:
--   ALTER TABLE "course_import_lessons" DROP COLUMN "skippedAt";

ALTER TABLE "course_import_lessons" ADD COLUMN "skippedAt" TIMESTAMP(3);
