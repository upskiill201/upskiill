-- Type: ADDITIVE ONLY
-- Ambassador programme (founder, 2026-10-29): earn Teyro Pro by inviting
-- friends who keep learning. Pro stays on while enough invited friends are
-- active; Teyro HQ can switch the programme off and tune every number.
--
-- Rollback:
--   DROP TABLE IF EXISTS "ambassador_events";
--   DROP TABLE IF EXISTS "ambassadors";
--   ALTER TABLE "referrals" DROP COLUMN IF EXISTS "lessonsDone", DROP COLUMN IF EXISTS "qualifiedAt",
--     DROP COLUMN IF EXISTS "friendState", DROP COLUMN IF EXISTS "stateAt";
--   ALTER TABLE "platform_settings" DROP COLUMN IF EXISTS "ambassadorEnabled",
--     DROP COLUMN IF EXISTS "ambassadorFriendsForPro", DROP COLUMN IF EXISTS "ambassadorQualifyLessons", DROP COLUMN IF EXISTS "ambassadorQualifyStreak",
--     DROP COLUMN IF EXISTS "ambassadorActiveDays", DROP COLUMN IF EXISTS "ambassadorGraceDays";

ALTER TABLE "referrals" ADD COLUMN IF NOT EXISTS "lessonsDone" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "referrals" ADD COLUMN IF NOT EXISTS "qualifiedAt" TIMESTAMP(3);
ALTER TABLE "referrals" ADD COLUMN IF NOT EXISTS "friendState" TEXT;
ALTER TABLE "referrals" ADD COLUMN IF NOT EXISTS "stateAt" TIMESTAMP(3);

ALTER TABLE "platform_settings" ADD COLUMN IF NOT EXISTS "ambassadorEnabled" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "platform_settings" ADD COLUMN IF NOT EXISTS "ambassadorFriendsForPro" INTEGER NOT NULL DEFAULT 5;
ALTER TABLE "platform_settings" ADD COLUMN IF NOT EXISTS "ambassadorQualifyLessons" INTEGER NOT NULL DEFAULT 3;
ALTER TABLE "platform_settings" ADD COLUMN IF NOT EXISTS "ambassadorQualifyStreak" INTEGER NOT NULL DEFAULT 3;
ALTER TABLE "platform_settings" ADD COLUMN IF NOT EXISTS "ambassadorActiveDays" INTEGER NOT NULL DEFAULT 7;
ALTER TABLE "platform_settings" ADD COLUMN IF NOT EXISTS "ambassadorGraceDays" INTEGER NOT NULL DEFAULT 3;

CREATE TABLE IF NOT EXISTS "ambassadors" (
    "userId" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'APP',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "proActive" BOOLEAN NOT NULL DEFAULT false,
    "proSince" TIMESTAMP(3),
    "graceUntil" TIMESTAMP(3),
    "activeFriends" INTEGER NOT NULL DEFAULT 0,
    "qualifiedFriends" INTEGER NOT NULL DEFAULT 0,
    "peakQualified" INTEGER NOT NULL DEFAULT 0,
    "lastEvaluatedAt" TIMESTAMP(3),
    CONSTRAINT "ambassadors_pkey" PRIMARY KEY ("userId"),
    CONSTRAINT "ambassadors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "ambassadors_proActive_idx" ON "ambassadors"("proActive");

CREATE TABLE IF NOT EXISTS "ambassador_events" (
    "id" TEXT NOT NULL,
    "ambassadorId" TEXT NOT NULL,
    "friendId" TEXT,
    "type" TEXT NOT NULL,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ambassador_events_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "ambassador_events_createdAt_idx" ON "ambassador_events"("createdAt");
CREATE INDEX IF NOT EXISTS "ambassador_events_ambassadorId_createdAt_idx" ON "ambassador_events"("ambassadorId", "createdAt");
CREATE INDEX IF NOT EXISTS "ambassador_events_type_createdAt_idx" ON "ambassador_events"("type", "createdAt");
