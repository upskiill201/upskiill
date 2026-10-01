-- Type: ADDITIVE ONLY
-- Invite-a-friend: a stable code per learner, and one row per friend who joined.
-- No existing table or column is touched.
--
-- Rollback:
--   DROP TABLE IF EXISTS "referrals";
--   DROP TABLE IF EXISTS "referral_codes";

CREATE TABLE IF NOT EXISTS "referral_codes" (
  "userId"    TEXT NOT NULL,
  "code"      TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "referral_codes_pkey" PRIMARY KEY ("userId"),
  CONSTRAINT "referral_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "referral_codes_code_key" ON "referral_codes"("code");

CREATE TABLE IF NOT EXISTS "referrals" (
  "id"         TEXT NOT NULL,
  "referrerId" TEXT NOT NULL,
  "referredId" TEXT NOT NULL,
  "code"       TEXT NOT NULL,
  "status"     TEXT NOT NULL DEFAULT 'PENDING',
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "rewardedAt" TIMESTAMP(3),
  CONSTRAINT "referrals_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "referrals_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "referrals_referredId_fkey" FOREIGN KEY ("referredId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "referrals_referredId_key" ON "referrals"("referredId");
CREATE INDEX IF NOT EXISTS "referrals_referrerId_createdAt_idx" ON "referrals"("referrerId", "createdAt");
