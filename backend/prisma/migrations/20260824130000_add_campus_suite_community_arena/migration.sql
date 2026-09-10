-- Migration: add_campus_suite_community_arena
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback: DROP TABLE "course_weekly_xp"; ALTER TABLE "posts" DROP COLUMN "isPinned"; ALTER TABLE "posts" DROP COLUMN "title";
-- Backup required: NO (additive only)
-- Deployment order: migration first, then code

-- Campus Suite (The Commons / Pulse / The Arena):
-- 1) posts gains optional title + isPinned for the community feed
-- 2) course_weekly_xp is the per-course weekly XP ledger powering The Arena leaderboard

-- AlterTable posts
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "title" TEXT;
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "isPinned" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable course_weekly_xp
CREATE TABLE IF NOT EXISTS "course_weekly_xp" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "divisionId" TEXT,
    "weekStartDate" TEXT NOT NULL,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "lessonsCompleted" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_weekly_xp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "course_weekly_xp_userId_courseId_weekStartDate_key" ON "course_weekly_xp"("userId", "courseId", "weekStartDate");

-- CreateIndex (Arena standings scan — DESC matches ORDER BY xpEarned DESC)
CREATE INDEX IF NOT EXISTS "course_weekly_xp_courseId_weekStartDate_xpEarned_idx" ON "course_weekly_xp"("courseId", "weekStartDate", "xpEarned" DESC);

-- AddForeignKey
DO $$ BEGIN
    ALTER TABLE "course_weekly_xp" ADD CONSTRAINT "course_weekly_xp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    ALTER TABLE "course_weekly_xp" ADD CONSTRAINT "course_weekly_xp_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null; END $$;
