-- Type: ADDITIVE ONLY — two new tables and one nullable column.
--
-- Rollback:
--   ALTER TABLE "notifications" DROP COLUMN "deepLink";
--   DROP TABLE "tey_notification_prefs";
--   DROP TABLE "push_subscriptions";

CREATE TABLE "push_subscriptions" (
  "id"           TEXT NOT NULL,
  "userId"       TEXT NOT NULL,
  "endpoint"     TEXT NOT NULL,
  "p256dh"       TEXT NOT NULL,
  "auth"         TEXT NOT NULL,
  "userAgent"    TEXT,
  "platform"     TEXT,
  "isActive"     BOOLEAN NOT NULL DEFAULT true,
  "failureCount" INTEGER NOT NULL DEFAULT 0,
  "lastUsedAt"   TIMESTAMP(3),
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "push_subscriptions_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Unique GLOBALLY, not per user. The endpoint identifies a browser-profile
-- pair, so a shared device re-subscribing under a second account must MOVE the
-- row — otherwise account A's streak reminders arrive on account B's screen.
CREATE UNIQUE INDEX "push_subscriptions_endpoint_key"
  ON "push_subscriptions"("endpoint");

CREATE INDEX "push_subscriptions_userId_isActive_idx"
  ON "push_subscriptions"("userId", "isActive");

CREATE TABLE "tey_notification_prefs" (
  "userId"          TEXT NOT NULL,
  "pushEnabled"     BOOLEAN NOT NULL DEFAULT true,
  "whatsappEnabled" BOOLEAN NOT NULL DEFAULT false,
  "streakReminders" BOOLEAN NOT NULL DEFAULT true,
  "dailyReminders"  BOOLEAN NOT NULL DEFAULT true,
  "milestones"      BOOLEAN NOT NULL DEFAULT true,
  "reengagement"    BOOLEAN NOT NULL DEFAULT true,
  -- Minutes from LOCAL midnight; the window wraps midnight by design.
  "quietHoursStart" INTEGER NOT NULL DEFAULT 1290,  -- 21:30
  "quietHoursEnd"   INTEGER NOT NULL DEFAULT 480,   -- 08:00
  "maxPerDay"       INTEGER NOT NULL DEFAULT 3,
  "preferredHour"   INTEGER,
  "updatedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "tey_notification_prefs_pkey" PRIMARY KEY ("userId"),
  CONSTRAINT "tey_notification_prefs_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Lets the notification bell route a Tey nudge without parsing a URL out of
-- the body text. Null for community rows, which resolve client-side.
ALTER TABLE "notifications" ADD COLUMN "deepLink" TEXT;
