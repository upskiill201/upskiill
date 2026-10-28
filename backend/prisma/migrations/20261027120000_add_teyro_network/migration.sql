-- Type: ADDITIVE ONLY
-- The Teyro Network, phase 1 (docs/TEYRO_NETWORK_PLAN.md):
--   * study_buddies — the buddy graph (request → accept, one row per pair)
--   * activity_feed — dedupe key + the (userId, createdAt) index the network
--     feed reads with (the table existed but nothing wrote to it)
--   * likes — (entityType, entityId) index so Cheer counts are one indexed scan
--   * tey_notification_prefs.networkActivity — the settings toggle
--
-- Rollback:
--   DROP TABLE IF EXISTS "study_buddies";
--   DROP INDEX IF EXISTS "activity_feed_userId_activityType_entityId_key";
--   DROP INDEX IF EXISTS "activity_feed_userId_createdAt_idx";
--   DROP INDEX IF EXISTS "likes_entityType_entityId_idx";
--   ALTER TABLE "tey_notification_prefs" DROP COLUMN IF EXISTS "networkActivity";

CREATE TABLE IF NOT EXISTS "study_buddies" (
    "id" TEXT NOT NULL,
    "pairKey" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "addresseeId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "courseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" TIMESTAMP(3),
    CONSTRAINT "study_buddies_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "study_buddies_pairKey_key" ON "study_buddies"("pairKey");
CREATE INDEX IF NOT EXISTS "study_buddies_requesterId_status_idx" ON "study_buddies"("requesterId", "status");
CREATE INDEX IF NOT EXISTS "study_buddies_addresseeId_status_idx" ON "study_buddies"("addresseeId", "status");

DO $$ BEGIN
  ALTER TABLE "study_buddies" ADD CONSTRAINT "study_buddies_requesterId_fkey"
    FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "study_buddies" ADD CONSTRAINT "study_buddies_addresseeId_fkey"
    FOREIGN KEY ("addresseeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "activity_feed_userId_activityType_entityId_key" ON "activity_feed"("userId", "activityType", "entityId");
CREATE INDEX IF NOT EXISTS "activity_feed_userId_createdAt_idx" ON "activity_feed"("userId", "createdAt" DESC);
CREATE INDEX IF NOT EXISTS "likes_entityType_entityId_idx" ON "likes"("entityType", "entityId");

ALTER TABLE "tey_notification_prefs" ADD COLUMN IF NOT EXISTS "networkActivity" BOOLEAN NOT NULL DEFAULT true;
