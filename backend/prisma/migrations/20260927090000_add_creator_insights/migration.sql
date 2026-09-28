-- Type: ADDITIVE ONLY
-- Creator studio, Programme 4 phase 3 (analytics, learners, community admin).
--
-- 1. user_lesson_progress gains three analytics columns: how often a learner
--    opened the lesson, how often they quit it part-way, and which Apply
--    exercises they missed on the first try. All default to empty, so every
--    existing row stays valid and nothing is backfilled.
-- 2. community_memberships gains a nullable mute-until timestamp set by the
--    course creator.
-- 3. creator_nudges is new: one row per nudge or cheer a creator sends a
--    learner (rate limits and "nudged 2d ago" in the studio).
--
-- Rollback:
--   DROP TABLE IF EXISTS "creator_nudges";
--   ALTER TABLE "community_memberships" DROP COLUMN IF EXISTS "mutedUntil";
--   ALTER TABLE "user_lesson_progress" DROP COLUMN IF EXISTS "missedBlockIds";
--   ALTER TABLE "user_lesson_progress" DROP COLUMN IF EXISTS "quitCount";
--   ALTER TABLE "user_lesson_progress" DROP COLUMN IF EXISTS "openCount";

ALTER TABLE "user_lesson_progress" ADD COLUMN IF NOT EXISTS "openCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "user_lesson_progress" ADD COLUMN IF NOT EXISTS "quitCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "user_lesson_progress" ADD COLUMN IF NOT EXISTS "missedBlockIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

ALTER TABLE "community_memberships" ADD COLUMN IF NOT EXISTS "mutedUntil" TIMESTAMP(3);

CREATE TABLE IF NOT EXISTS "creator_nudges" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "message" VARCHAR(280) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creator_nudges_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "creator_nudges_learnerId_courseId_createdAt_idx" ON "creator_nudges"("learnerId", "courseId", "createdAt");
CREATE INDEX IF NOT EXISTS "creator_nudges_creatorId_createdAt_idx" ON "creator_nudges"("creatorId", "createdAt");

DO $$ BEGIN
  ALTER TABLE "creator_nudges" ADD CONSTRAINT "creator_nudges_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "creator_nudges" ADD CONSTRAINT "creator_nudges_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "creator_nudges" ADD CONSTRAINT "creator_nudges_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
