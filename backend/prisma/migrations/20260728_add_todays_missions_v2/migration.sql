-- AlterTable
ALTER TABLE "student_profiles" ADD COLUMN IF NOT EXISTS "coins" INTEGER NOT NULL DEFAULT 50;

-- CreateTable
CREATE TABLE IF NOT EXISTS "mission_templates" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "objectiveType" TEXT NOT NULL,
    "defaultTarget" INTEGER NOT NULL,
    "defaultRewardType" TEXT NOT NULL,
    "defaultRewardAmount" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mission_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "user_daily_missions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "missionDate" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "objectiveType" TEXT NOT NULL,
    "currentProgress" INTEGER NOT NULL DEFAULT 0,
    "targetValue" INTEGER NOT NULL,
    "rewardType" TEXT NOT NULL,
    "rewardAmount" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "claimedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_daily_missions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "mission_templates_code_key" ON "mission_templates"("code");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "user_daily_missions_userId_missionDate_idx" ON "user_daily_missions"("userId", "missionDate");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "user_daily_missions_userId_templateId_missionDate_key" ON "user_daily_missions"("userId", "templateId", "missionDate");

-- AddForeignKey
ALTER TABLE "user_daily_missions" ADD CONSTRAINT "user_daily_missions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_daily_missions" ADD CONSTRAINT "user_daily_missions_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "mission_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
