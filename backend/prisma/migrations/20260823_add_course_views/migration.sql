-- Migration: add_course_views_daily_aggregate
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback: DROP TABLE "course_views";
-- Backup required: NO (additive only)
-- Deployment order: migration first, then code

-- Daily page-view aggregate for course detail pages. One row per
-- (course, day), incremented on visit. Never per-user.
-- NOTE: the Course model has no @@map, so its physical table is "Course".
CREATE TABLE "course_views" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "day" DATE NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_views_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "course_views_courseId_idx" ON "course_views"("courseId");

CREATE UNIQUE INDEX "course_views_courseId_day_key" ON "course_views"("courseId", "day");

ALTER TABLE "course_views" ADD CONSTRAINT "course_views_courseId_fkey"
  FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
