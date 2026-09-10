-- Type: ADDITIVE ONLY
-- NOTE: ChestRewardPool/DailyChest models existed in schema.prisma with no
-- matching migration — same class of gap as spin_wheel_segments. Staging's
-- copy of these tables only exists from an out-of-band db push; a fresh
-- database (production) 500s on GET /chest/today (DailyChest.findUnique/
-- create against a table that was never created).

-- CreateTable
CREATE TABLE IF NOT EXISTS "chest_reward_pool" (
    "id" TEXT NOT NULL,
    "rewardType" TEXT NOT NULL,
    "amountMin" INTEGER,
    "amountMax" INTEGER,
    "rarityTier" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "chest_reward_pool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "daily_chests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chestDay" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'LOCKED',
    "unlockedAt" TIMESTAMP(3),
    "openedAt" TIMESTAMP(3),
    "rewardPoolId" TEXT,
    "rewardSnapshotType" TEXT,
    "rewardSnapshotAmount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_chests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "daily_chests_userId_chestDay_key" ON "daily_chests"("userId", "chestDay");
CREATE INDEX IF NOT EXISTS "daily_chests_userId_idx" ON "daily_chests"("userId");

-- AddForeignKey
ALTER TABLE "daily_chests" ADD CONSTRAINT "daily_chests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_chests" ADD CONSTRAINT "daily_chests_rewardPoolId_fkey" FOREIGN KEY ("rewardPoolId") REFERENCES "chest_reward_pool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Rollback SQL (manual):
-- DROP TABLE IF EXISTS "daily_chests";
-- DROP TABLE IF EXISTS "chest_reward_pool";
