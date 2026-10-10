-- Type: ADDITIVE ONLY
-- Clean, title-based course URLs (teyro.app/courses/<slug>). When a slug
-- changes, the old one is kept here so public links 301 to the new slug.
-- Existing rows get an empty history; the slug backfill runs in the app
-- (CourseSlugService), not in SQL.
--
-- Rollback:
--   DROP INDEX IF EXISTS "Course_slugHistory_idx";
--   ALTER TABLE "Course" DROP COLUMN "slugHistory";

ALTER TABLE "Course" ADD COLUMN "slugHistory" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

CREATE INDEX "Course_slugHistory_idx" ON "Course" USING GIN ("slugHistory");
