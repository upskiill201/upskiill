-- Type: ADDITIVE ONLY
-- Three new per-category push toggles for Tey's notification hub: league
-- moves, course offers (lesson-3 unlock journey) and creator activity.
-- Defaults are true, matching every existing category, so current learners
-- keep receiving exactly what the product sends.
--
-- Rollback:
--   ALTER TABLE "tey_notification_prefs" DROP COLUMN "leagueUpdates";
--   ALTER TABLE "tey_notification_prefs" DROP COLUMN "courseOffers";
--   ALTER TABLE "tey_notification_prefs" DROP COLUMN "creatorActivity";

ALTER TABLE "tey_notification_prefs" ADD COLUMN IF NOT EXISTS "leagueUpdates" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "tey_notification_prefs" ADD COLUMN IF NOT EXISTS "courseOffers" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "tey_notification_prefs" ADD COLUMN IF NOT EXISTS "creatorActivity" BOOLEAN NOT NULL DEFAULT true;
