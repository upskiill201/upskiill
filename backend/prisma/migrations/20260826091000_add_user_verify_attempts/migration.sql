-- Type: ADDITIVE ONLY
-- Counts failed verify-code submissions per user so a 6-digit code cannot be
-- brute-forced inside its 10-minute TTL. On the 5th miss the pending code is
-- voided and the learner must request a fresh one.
--
-- Rollback:
-- ALTER TABLE "User" DROP COLUMN IF EXISTS "verifyAttempts";

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "verifyAttempts" INTEGER NOT NULL DEFAULT 0;
