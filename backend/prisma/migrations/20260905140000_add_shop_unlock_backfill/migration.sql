-- Type: ADDITIVE ONLY — one nullable column, no rewrite, no backfill UPDATE.
--
-- Marks when a learner's shop-unlock state was first reconciled. Everything
-- they already qualified for at that moment is written as already-seen, so the
-- Shop Engine only ever announces what they unlock from then on.
--
-- Without it, the first app load after the shop ships would queue a full-page
-- "unlocked!" takeover for every requirement the learner cleared months ago —
-- a long-standing user would face a stack of them before reaching the app.
--
-- NULL means "not yet reconciled", which is the correct state for every
-- existing row: the next sync backfills them silently and stamps this.
--
-- Rollback:
--   ALTER TABLE "user_shop_state" DROP COLUMN "unlocksBackfilledAt";

ALTER TABLE "user_shop_state" ADD COLUMN "unlocksBackfilledAt" TIMESTAMP(3);
