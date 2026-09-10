-- CreateTable user_inventory
CREATE TABLE IF NOT EXISTS "user_inventory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable user_chests
CREATE TABLE IF NOT EXISTS "user_chests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chestType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'LOCKED',
    "rewardPayload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "openedAt" TIMESTAMP(3),

    CONSTRAINT "user_chests_pkey" PRIMARY KEY ("id")
);

-- CreateTable user_daily_activity
CREATE TABLE IF NOT EXISTS "user_daily_activity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "lessonsCompleted" INTEGER NOT NULL DEFAULT 0,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_daily_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable user_momentum
CREATE TABLE IF NOT EXISTS "user_momentum" (
    "userId" TEXT NOT NULL,
    "momentumScore" INTEGER NOT NULL DEFAULT 0,
    "lastCalculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_momentum_pkey" PRIMARY KEY ("userId")
);

-- CreateTable reward_logs
CREATE TABLE IF NOT EXISTS "reward_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rewardType" TEXT NOT NULL,
    "rewardValue" INTEGER NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reward_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable xp_events
CREATE TABLE IF NOT EXISTS "xp_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceId" TEXT,
    "xpAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xp_events_pkey" PRIMARY KEY ("id")
);

-- Unique Indexes
CREATE UNIQUE INDEX IF NOT EXISTS "user_inventory_userId_itemType_key" ON "user_inventory"("userId", "itemType");
CREATE UNIQUE INDEX IF NOT EXISTS "user_daily_activity_userId_date_key" ON "user_daily_activity"("userId", "date");

-- Performance Indexes
CREATE INDEX IF NOT EXISTS "user_inventory_userId_idx" ON "user_inventory"("userId");
CREATE INDEX IF NOT EXISTS "user_chests_userId_idx" ON "user_chests"("userId");
CREATE INDEX IF NOT EXISTS "user_daily_activity_userId_date_idx" ON "user_daily_activity"("userId", "date");
CREATE INDEX IF NOT EXISTS "reward_logs_userId_idx" ON "reward_logs"("userId");
CREATE INDEX IF NOT EXISTS "xp_events_userId_idx" ON "xp_events"("userId");

-- Foreign Keys
ALTER TABLE "user_inventory" ADD CONSTRAINT "user_inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_chests" ADD CONSTRAINT "user_chests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_daily_activity" ADD CONSTRAINT "user_daily_activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_momentum" ADD CONSTRAINT "user_momentum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "reward_logs" ADD CONSTRAINT "reward_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "xp_events" ADD CONSTRAINT "xp_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
