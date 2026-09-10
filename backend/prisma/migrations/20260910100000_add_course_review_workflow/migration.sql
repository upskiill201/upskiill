-- Type: ADDITIVE ONLY — two new enums, four new nullable/defaulted columns
-- on an existing table, and one new table. No existing column, row, or
-- constraint is altered or removed.
--
-- WHY: Courses could previously be published directly by their creator with
-- no Teyro review step. This introduces a review gate in front of the
-- EXISTING publish mechanism (Course.published, set only by
-- CourseService#publishCourse) — reviewStatus is a precondition layered on
-- top of that call, not a second publishing system. See course.service.ts
-- and course-review.service.ts.
--
-- BACKFILL: every existing course gets reviewStatus='DRAFT' (the column
-- default). This is intentionally conservative — it means an already-
-- published course now technically reads as "never reviewed" by this new
-- field, but that's fine: publishCourse's new reviewStatus==='APPROVED'
-- gate only blocks *future* publish calls, and no code path unpublishes an
-- already-live course as a side effect of this migration. Nothing already
-- live goes offline.
--
-- Rollback:
--   DROP TABLE IF EXISTS "course_reviews";
--   ALTER TABLE "Course" DROP COLUMN IF EXISTS "reviewStatus";
--   ALTER TABLE "Course" DROP COLUMN IF EXISTS "submittedForReviewAt";
--   ALTER TABLE "Course" DROP COLUMN IF EXISTS "reviewedAt";
--   ALTER TABLE "Course" DROP COLUMN IF EXISTS "reviewedBy";
--   DROP TYPE IF EXISTS "CourseReviewAction";
--   DROP TYPE IF EXISTS "CourseReviewStatus";

CREATE TYPE "CourseReviewStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'CHANGES_REQUESTED', 'APPROVED', 'REJECTED');
CREATE TYPE "CourseReviewAction" AS ENUM ('SUBMITTED', 'STARTED_REVIEW', 'CHANGES_REQUESTED', 'APPROVED', 'REJECTED', 'REOPENED');

ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "reviewStatus" "CourseReviewStatus" NOT NULL DEFAULT 'DRAFT';
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "submittedForReviewAt" TIMESTAMP(3);
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "reviewedAt" TIMESTAMP(3);
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "reviewedBy" TEXT;

CREATE INDEX IF NOT EXISTS "Course_reviewStatus_submittedForReviewAt_idx"
  ON "Course"("reviewStatus", "submittedForReviewAt");

CREATE TABLE "course_reviews" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "reviewerId" TEXT,
    "action" "CourseReviewAction" NOT NULL,
    "previousStatus" "CourseReviewStatus" NOT NULL,
    "newStatus" "CourseReviewStatus" NOT NULL,
    "feedback" TEXT,
    "internalNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_reviews_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "course_reviews"
  ADD CONSTRAINT "course_reviews_courseId_fkey"
  FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX IF NOT EXISTS "course_reviews_courseId_createdAt_idx"
  ON "course_reviews"("courseId", "createdAt");
