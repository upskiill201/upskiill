-- Type: ADDITIVE ONLY
-- Shareable milestone cards: one row per milestone a learner chose to share
-- (a 7-day streak, a finished chapter, a league podium...). `data` is a
-- server-computed snapshot so the image never trusts numbers from the client,
-- and `slug` is the public link (teyro.app/s/<slug>). `rewardedAt` marks the
-- one-time Coins paid for sharing it. No existing table or column is touched.
--
-- Rollback:
--   DROP TABLE IF EXISTS "share_cards";

CREATE TABLE IF NOT EXISTS "share_cards" (
  "id"           TEXT NOT NULL,
  "slug"         TEXT NOT NULL,
  "userId"       TEXT NOT NULL,
  "kind"         TEXT NOT NULL,
  "milestoneKey" TEXT NOT NULL,
  "data"         JSONB NOT NULL,
  "shareCount"   INTEGER NOT NULL DEFAULT 0,
  "sharedAt"     TIMESTAMP(3),
  "rewardedAt"   TIMESTAMP(3),
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "share_cards_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "share_cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "share_cards_slug_key" ON "share_cards"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "share_cards_userId_milestoneKey_key" ON "share_cards"("userId", "milestoneKey");
CREATE INDEX IF NOT EXISTS "share_cards_userId_createdAt_idx" ON "share_cards"("userId", "createdAt");
