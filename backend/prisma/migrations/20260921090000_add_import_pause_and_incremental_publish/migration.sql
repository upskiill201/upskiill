-- Type: ADDITIVE ONLY
--
-- Adds (a) pause/resume state to an import and (b) the links that make
-- incremental publishing safe: an import lesson/module remembers which real
-- Lesson/Section it was written to, so appending a later batch can skip what
-- it already created instead of duplicating it.
--
-- All columns nullable with no default: existing rows read as NULL, which the
-- app treats as "never paused" / "not yet written to a course".
--
-- Rollback:
--   ALTER TABLE "course_imports" DROP COLUMN "pauseRequestedAt";
--   ALTER TABLE "course_imports" DROP COLUMN "pausedAt";
--   ALTER TABLE "course_imports" DROP COLUMN "statusBeforePause";
--   ALTER TABLE "course_import_modules" DROP COLUMN "createdSectionId";
--   ALTER TABLE "course_import_lessons" DROP COLUMN "createdLessonId";
--   ALTER TABLE "course_import_lessons" DROP COLUMN "addedToCourseAt";
--   (the PAUSED enum value cannot be dropped in Postgres without recreating
--    the type; it is inert if unused.)

ALTER TYPE "CourseImportStatus" ADD VALUE IF NOT EXISTS 'PAUSED';

ALTER TABLE "course_imports" ADD COLUMN "pauseRequestedAt" TIMESTAMP(3);
ALTER TABLE "course_imports" ADD COLUMN "pausedAt" TIMESTAMP(3);
ALTER TABLE "course_imports" ADD COLUMN "statusBeforePause" "CourseImportStatus";

ALTER TABLE "course_import_modules" ADD COLUMN "createdSectionId" TEXT;

ALTER TABLE "course_import_lessons" ADD COLUMN "createdLessonId" TEXT;
ALTER TABLE "course_import_lessons" ADD COLUMN "addedToCourseAt" TIMESTAMP(3);
