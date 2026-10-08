-- Type: ADDITIVE ONLY
-- Course importer: long videos are split into bite-size parts (several
-- import lessons share one video file, each playing a clip of it), and
-- Whisper's timed segments are kept so parts can be cut at sentence gaps.
--
-- Rollback:
--   ALTER TABLE "course_import_files" DROP COLUMN "transcriptSegments";
--   ALTER TABLE "course_import_lessons" DROP COLUMN "clipStartSec",
--     DROP COLUMN "clipEndSec", DROP COLUMN "partIndex", DROP COLUMN "partCount";

ALTER TABLE "course_import_files" ADD COLUMN "transcriptSegments" JSONB;

ALTER TABLE "course_import_lessons"
  ADD COLUMN "clipStartSec" INTEGER,
  ADD COLUMN "clipEndSec" INTEGER,
  ADD COLUMN "partIndex" INTEGER,
  ADD COLUMN "partCount" INTEGER;
