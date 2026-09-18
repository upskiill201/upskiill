-- Type: ADDITIVE ONLY
-- Rollback: ALTER TABLE "course_imports" DROP COLUMN "createdCourseId";
--           (CourseImportStatus enum values cannot be dropped in Postgres —
--           leaving COURSE_CREATED unused is harmless if rolled back.)

ALTER TYPE "CourseImportStatus" ADD VALUE IF NOT EXISTS 'COURSE_CREATED';

ALTER TABLE "course_imports" ADD COLUMN "createdCourseId" TEXT;
