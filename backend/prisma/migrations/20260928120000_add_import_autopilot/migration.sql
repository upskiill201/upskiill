-- Type: ADDITIVE ONLY
-- Course importer autopilot (Teyro HQ): the course settings an admin picks
-- up front, so the importer can analyze the structure and build the draft
-- course without the admin coming back to click through each step.
-- All nullable or defaulted; existing imports keep today's manual flow.
--
-- Rollback:
--   ALTER TABLE "course_imports" DROP COLUMN IF EXISTS "autopilotNote";
--   ALTER TABLE "course_imports" DROP COLUMN IF EXISTS "courseLevel";
--   ALTER TABLE "course_imports" DROP COLUMN IF EXISTS "courseCategory";
--   ALTER TABLE "course_imports" DROP COLUMN IF EXISTS "courseTitle";
--   ALTER TABLE "course_imports" DROP COLUMN IF EXISTS "autopilot";

ALTER TABLE "course_imports" ADD COLUMN IF NOT EXISTS "autopilot" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "course_imports" ADD COLUMN IF NOT EXISTS "courseTitle" TEXT;
ALTER TABLE "course_imports" ADD COLUMN IF NOT EXISTS "courseCategory" TEXT;
ALTER TABLE "course_imports" ADD COLUMN IF NOT EXISTS "courseLevel" TEXT;
ALTER TABLE "course_imports" ADD COLUMN IF NOT EXISTS "autopilotNote" TEXT;
