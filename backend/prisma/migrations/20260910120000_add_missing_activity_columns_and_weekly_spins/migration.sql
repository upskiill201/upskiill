-- Type: ADDITIVE ONLY
-- NOTE: Found via `prisma migrate diff` against the live production
-- database. user_daily_activity.streakExtended/timeSpentSeconds are used
-- unconditionally by progress/missions/monthly-quest services (unguarded
-- findMany/findUnique select every scalar column), so their absence broke
-- GET /v2/progress/stats-summary, /v2/missions/today and
-- /v2/monthly-quest/current in production ("column does not exist").
-- WeeklySpin never had a migration at all (same class as spin_wheel_segments
-- / daily_chests). Staging already has both from an out-of-band db push,
-- so every statement here is guarded to stay idempotent there.

-- AlterTable
ALTER TABLE "user_daily_activity"
  ADD COLUMN IF NOT EXISTS "streakExtended" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE IF NOT EXISTS "weekly_spins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekStart" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "spunAt" TIMESTAMP(3),
    "landedSegmentIndex" INTEGER,
    "rewardSnapshotType" TEXT,
    "rewardSnapshotAmount" INTEGER,

    CONSTRAINT "weekly_spins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "weekly_spins_userId_weekStart_key" ON "weekly_spins"("userId", "weekStart");
CREATE INDEX IF NOT EXISTS "weekly_spins_userId_idx" ON "weekly_spins"("userId");

-- AddForeignKey (guarded — same idempotency gap as daily_chests)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'weekly_spins_userId_fkey'
  ) THEN
    ALTER TABLE "weekly_spins" ADD CONSTRAINT "weekly_spins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- Rollback SQL (manual):
-- ALTER TABLE "user_daily_activity" DROP COLUMN IF EXISTS "streakExtended", DROP COLUMN IF EXISTS "timeSpentSeconds";
-- DROP TABLE IF EXISTS "weekly_spins";
