-- Type: ADDITIVE ONLY
-- Reach tracking: whether a learner installed the app, what their browser
-- answered about notifications, and HQ's manual "please install + turn on
-- reminders" asks. All nullable, no backfill.
--
-- Rollback:
--   ALTER TABLE "User" DROP COLUMN "pwaInstalledAt", DROP COLUMN "pwaLastSeenAt",
--     DROP COLUMN "notificationPermission", DROP COLUMN "reachAskRequestedAt",
--     DROP COLUMN "reachAskShownAt";

ALTER TABLE "User"
  ADD COLUMN "pwaInstalledAt" TIMESTAMP(3),
  ADD COLUMN "pwaLastSeenAt" TIMESTAMP(3),
  ADD COLUMN "notificationPermission" TEXT,
  ADD COLUMN "reachAskRequestedAt" TIMESTAMP(3),
  ADD COLUMN "reachAskShownAt" TIMESTAMP(3);
