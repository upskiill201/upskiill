-- Type: ADDITIVE ONLY
-- Stores pre-signup claims of the Step 9 onboarding challenge reward so the
-- celebration can play immediately while the actual XP/coins payout settles
-- once the account exists (signup paths + authenticated session syncs).
--
-- tokenHash         SHA-256 of the opaque claim token shown once to the client
-- phone             optional E.164 fallback key when WhatsApp was verified at Step 6
-- settledByUserId   UNIQUE — one settling account per claim; combined with the
--                   gem_transactions partial unique index (20260825120000)
--                   this makes double payouts impossible in both directions.
--
-- Rollback:
-- DROP TABLE IF EXISTS "onboarding_challenge_claims";

CREATE TABLE IF NOT EXISTS "onboarding_challenge_claims" (
    "tokenHash" TEXT NOT NULL,
    "phone" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "settledByUserId" TEXT,
    "settledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "onboarding_challenge_claims_pkey" PRIMARY KEY ("tokenHash")
);

-- Type: ADDITIVE ONLY (unique constraint backing single-use settlement)
-- Rollback:
-- DROP INDEX IF EXISTS "onboarding_challenge_claims_settledByUserId_key";
CREATE UNIQUE INDEX IF NOT EXISTS "onboarding_challenge_claims_settledByUserId_key"
  ON "onboarding_challenge_claims"("settledByUserId");
