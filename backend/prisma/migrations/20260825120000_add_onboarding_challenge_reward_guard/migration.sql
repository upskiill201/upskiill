-- Type: ADDITIVE ONLY
-- One-time idempotency guard for the onboarding challenge reward (Step 9).
-- The ledger insert for source = 'ONBOARDING_CHALLENGE' can only ever succeed
-- once per user — a duplicate claim attempt fails with P2002 inside the
-- claiming transaction, so concurrent double-fires cannot double-pay.
--
-- Rollback:
-- DROP INDEX IF EXISTS "gem_transactions_onboarding_challenge_unique";

CREATE UNIQUE INDEX IF NOT EXISTS "gem_transactions_onboarding_challenge_unique"
  ON "gem_transactions"("userId")
  WHERE source = 'ONBOARDING_CHALLENGE';
