-- Type: ADDITIVE / DATA BACKFILL ONLY — updates the value of a column this
-- same feature just introduced (20260910100000_add_course_review_workflow),
-- on a narrow, explicit WHERE clause. No column, table, or constraint
-- changes; no row is deleted.
--
-- WHY: publishCourse() now refuses to (re)publish a course unless
-- reviewStatus = 'APPROVED'. Every course defaulted to 'DRAFT' in the prior
-- migration — including courses that are ALREADY live today. Without this
-- backfill, an existing creator who unpublishes their already-published
-- course (a previously harmless, ordinary action) would be permanently
-- unable to republish it, because it would suddenly need an approval that
-- didn't exist when they first published it. That is a real regression on
-- live product data, not merely a new-course concern.
--
-- This grandfathers in every course that is CURRENTLY published as
-- 'APPROVED' — they already cleared the old bar (being live), so they clear
-- the new one too. Draft/unpublished courses are untouched and start fresh
-- under the new review gate, which is the intended behavior for new work.
--
-- Idempotent: safe to run more than once, and safe to run in any order
-- relative to the schema migration it follows (either both have run, or
-- neither has — the WHERE clause only ever matches published courses).
--
-- Rollback:
--   UPDATE "Course" SET "reviewStatus" = 'DRAFT', "reviewedAt" = NULL, "reviewedBy" = NULL WHERE "published" = true;
--   (Only safe if no course has been reviewed for real since this ran —
--   check course_reviews for rows with a non-null reviewerId first.)

UPDATE "Course"
SET "reviewStatus" = 'APPROVED', "reviewedAt" = "updatedAt"
WHERE "published" = true AND "reviewStatus" = 'DRAFT';
