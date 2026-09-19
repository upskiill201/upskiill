-- Type: ADDITIVE ONLY
-- Explicit ordering for course_import_files, matching Drive's natural sort
-- at creation time. CourseStructureAnalysisService needs this to interleave
-- resources with the video they follow. No existing table is altered in a
-- breaking way.

ALTER TABLE "course_import_files"
  ADD COLUMN IF NOT EXISTS "orderIndex" INTEGER NOT NULL DEFAULT 0;
