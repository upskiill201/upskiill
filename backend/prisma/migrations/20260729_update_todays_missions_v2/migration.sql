-- AlterTable
ALTER TABLE "mission_templates" ADD COLUMN IF NOT EXISTS "difficultyTier" TEXT NOT NULL DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS "icon" TEXT;

-- AlterTable
ALTER TABLE "user_daily_missions" ADD COLUMN IF NOT EXISTS "dailyMissionSetId" TEXT,
ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS';

-- CreateTable
CREATE TABLE IF NOT EXISTS "daily_mission_sets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "missionDay" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resetAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_mission_sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "reward_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceId" TEXT,
    "idempotencyKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reward_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "daily_mission_sets_userId_missionDay_key" ON "daily_mission_sets"("userId", "missionDay");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "daily_mission_sets_userId_missionDay_idx" ON "daily_mission_sets"("userId", "missionDay");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "reward_transactions_idempotencyKey_key" ON "reward_transactions"("idempotencyKey");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "reward_transactions_userId_idx" ON "reward_transactions"("userId");

-- AddForeignKey
ALTER TABLE "daily_mission_sets" ADD CONSTRAINT "daily_mission_sets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_daily_missions" ADD CONSTRAINT "user_daily_missions_dailyMissionSetId_fkey" FOREIGN KEY ("dailyMissionSetId") REFERENCES "daily_mission_sets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reward_transactions" ADD CONSTRAINT "reward_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
