-- Type: ADDITIVE ONLY — column type widening varchar → jsonb.
-- Safe because "biggestChallenge" is guaranteed NULL everywhere: the creator
-- onboarding sent a string[] while this column was String?, so Prisma threw
-- before any value was ever written (the bug this migration accompanies).
-- Rollback:
--   ALTER TABLE "Profile" ALTER COLUMN "biggestChallenge" TYPE text USING NULL;
ALTER TABLE "Profile" ALTER COLUMN "biggestChallenge" TYPE jsonb USING NULL;
