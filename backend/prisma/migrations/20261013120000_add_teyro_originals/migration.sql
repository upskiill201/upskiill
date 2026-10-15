-- Type: ADDITIVE ONLY
-- Teyro Originals (docs/ORIGINALS_PLAYBOOK.md): in-house courses grouped
-- into Tracks of linked levels, plus checkpoint markers on lessons.
-- New table, new nullable/defaulted columns only; no backfill, existing
-- courses are untouched (isOriginal = false).
--
-- Rollback:
--   ALTER TABLE "course_lessons" DROP COLUMN "milestone";
--   DROP INDEX "Course_trackId_trackLevel_key";
--   DROP INDEX "Course_isOriginal_idx";
--   ALTER TABLE "Course" DROP CONSTRAINT "Course_trackId_fkey";
--   ALTER TABLE "Course" DROP COLUMN "isOriginal", DROP COLUMN "trackId",
--     DROP COLUMN "trackLevel", DROP COLUMN "upcomingUnits";
--   DROP TABLE "original_tracks";

CREATE TABLE "original_tracks" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "original_tracks_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "original_tracks_slug_key" ON "original_tracks"("slug");

ALTER TABLE "Course"
  ADD COLUMN "isOriginal" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "trackId" TEXT,
  ADD COLUMN "trackLevel" INTEGER,
  ADD COLUMN "upcomingUnits" INTEGER NOT NULL DEFAULT 0;

CREATE INDEX "Course_isOriginal_idx" ON "Course"("isOriginal");
CREATE UNIQUE INDEX "Course_trackId_trackLevel_key" ON "Course"("trackId", "trackLevel");

ALTER TABLE "Course" ADD CONSTRAINT "Course_trackId_fkey"
  FOREIGN KEY ("trackId") REFERENCES "original_tracks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "course_lessons" ADD COLUMN "milestone" TEXT;
