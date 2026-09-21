-- Type: ADDITIVE ONLY
-- Adds machine-readable error codes alongside the existing free-text error
-- columns. Nullable with no default: existing rows keep NULL, which the app
-- treats the same as an unknown/legacy failure.
--
-- Rollback:
--   ALTER TABLE "course_import_files" DROP COLUMN "errorCode";
--   ALTER TABLE "course_import_files" DROP COLUMN "transcriptErrorCode";
--   ALTER TABLE "course_import_lessons" DROP COLUMN "errorCode";

ALTER TABLE "course_import_files" ADD COLUMN "errorCode" TEXT;
ALTER TABLE "course_import_files" ADD COLUMN "transcriptErrorCode" TEXT;
ALTER TABLE "course_import_lessons" ADD COLUMN "errorCode" TEXT;
