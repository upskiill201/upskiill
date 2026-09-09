-- Type: ADDITIVE ONLY — one new column with a safe default. No existing
-- column, table, or row is altered or removed.
--
-- WHY: Phase 3 of the Admin Center (Courses) adds a "Feature" action for
-- homepage/explore curation. This is deliberately a separate flag from
-- `published` — `published` is the creator's own catalog-visibility toggle
-- (enforced by publishCourse's quality gate), `featured` is a purely
-- editorial admin-only flag layered on top of an already-published course.
--
-- BACKFILL: DEFAULT false applies to every existing row — nothing is
-- featured until an admin explicitly sets it.
--
-- LOCKING NOTE: adding a column with a non-volatile DEFAULT is a
-- metadata-only change in Postgres 11+ — no table rewrite, brief ACCESS
-- EXCLUSIVE lock only.
--
-- Rollback:
--   DROP INDEX IF EXISTS "Course_featured_idx";
--   ALTER TABLE "Course" DROP COLUMN IF EXISTS "featured";

ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT false;
CREATE INDEX IF NOT EXISTS "Course_featured_idx" ON "Course"("featured");
