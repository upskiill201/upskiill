-- Type: ADDITIVE ONLY — new shop-economy tables + three nullable columns on
-- an existing table. No data is rewritten, no column is dropped or retyped,
-- so this is safe to deploy while the current shop keeps serving traffic.
--
-- What this adds:
--   user_shop_items    — the single ownership table (charges, boosts, cosmetics)
--   user_shop_unlocks  — items whose learning requirement was just met, plus
--                        the seenAt stamp the Shop Engine uses to fire its
--                        "unlocked" scene exactly once
--   user_shop_state    — daily-visit reward streak, claimed collections,
--                        permanent freeze-capacity upgrades
--   shop_transactions.{rarity,category,idempotencyKey}
--                      — spend analytics + the retry guard the purchase
--                        endpoint never had (a replayed POST used to
--                        double-charge)
--
-- The catalogue itself is deliberately NOT a table: item definitions live in
-- backend/src/shop/shop.registry.ts, because every item's effect is code and a
-- half-mirrored DB catalogue would only ever drift.
--
-- Rollback:
--   DROP TABLE "user_shop_unlocks";
--   DROP TABLE "user_shop_items";
--   DROP TABLE "user_shop_state";
--   DROP INDEX "shop_transactions_idempotencyKey_key";
--   ALTER TABLE "shop_transactions"
--     DROP COLUMN "idempotencyKey",
--     DROP COLUMN "rarity",
--     DROP COLUMN "category";

-- ── Ownership ────────────────────────────────────────────────────────────────

CREATE TABLE "user_shop_items" (
  "id"           TEXT NOT NULL,
  "userId"       TEXT NOT NULL,
  "itemId"       TEXT NOT NULL,
  "quantity"     INTEGER NOT NULL DEFAULT 0,
  "equipped"     BOOLEAN NOT NULL DEFAULT false,
  "expiresAt"    TIMESTAMP(3),
  "firstOwnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "user_shop_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "user_shop_items_userId_itemId_key"
  ON "user_shop_items" ("userId", "itemId");

-- Backs the equipped-loadout read that runs on every profile render.
CREATE INDEX "user_shop_items_userId_equipped_idx"
  ON "user_shop_items" ("userId", "equipped");

ALTER TABLE "user_shop_items"
  ADD CONSTRAINT "user_shop_items_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ── Unlock notifications ─────────────────────────────────────────────────────

CREATE TABLE "user_shop_unlocks" (
  "id"         TEXT NOT NULL,
  "userId"     TEXT NOT NULL,
  "itemId"     TEXT NOT NULL,
  "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "seenAt"     TIMESTAMP(3),

  CONSTRAINT "user_shop_unlocks_pkey" PRIMARY KEY ("id")
);

-- One unlock row per item per learner: the unique index is what makes the
-- "did this just unlock?" write idempotent under concurrent requests.
CREATE UNIQUE INDEX "user_shop_unlocks_userId_itemId_key"
  ON "user_shop_unlocks" ("userId", "itemId");

-- Backs the pending-unlocks poll (userId + seenAt IS NULL).
CREATE INDEX "user_shop_unlocks_userId_seenAt_idx"
  ON "user_shop_unlocks" ("userId", "seenAt");

ALTER TABLE "user_shop_unlocks"
  ADD CONSTRAINT "user_shop_unlocks_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ── Per-learner shop meta ────────────────────────────────────────────────────

CREATE TABLE "user_shop_state" (
  "userId"              TEXT NOT NULL,
  "lastVisitDay"        TEXT,
  "visitStreak"         INTEGER NOT NULL DEFAULT 0,
  "claimedCollections"  JSONB NOT NULL DEFAULT '[]',
  "freezeCapacityBonus" INTEGER NOT NULL DEFAULT 0,
  "updatedAt"           TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "user_shop_state_pkey" PRIMARY KEY ("userId")
);

ALTER TABLE "user_shop_state"
  ADD CONSTRAINT "user_shop_state_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ── Purchase ledger: analytics + retry guard ─────────────────────────────────

ALTER TABLE "shop_transactions" ADD COLUMN "rarity"         TEXT;
ALTER TABLE "shop_transactions" ADD COLUMN "category"       TEXT;
ALTER TABLE "shop_transactions" ADD COLUMN "idempotencyKey" TEXT;

-- Nullable + UNIQUE: Postgres allows many NULLs, so legacy rows and the
-- back-compat purchase path (which sends no key) are unaffected, while any
-- request that DOES carry a key can only ever commit once.
CREATE UNIQUE INDEX "shop_transactions_idempotencyKey_key"
  ON "shop_transactions" ("idempotencyKey");
