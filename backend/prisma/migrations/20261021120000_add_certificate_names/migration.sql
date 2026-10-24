-- Type: ADDITIVE ONLY
-- Certificate names. Learners confirm the real name to print on their
-- certificates before the first one is issued, apart from their profile
-- name (which can be a nickname). Three nullable columns on "User" and a log
-- of every change (confirmation, the one free correction, support changes).
-- No existing column or row is changed.
--
-- Rollback:
--   DROP TABLE IF EXISTS "certificate_name_changes";
--   ALTER TABLE "User" DROP COLUMN IF EXISTS "certificateName",
--     DROP COLUMN IF EXISTS "certificateNameConfirmedAt",
--     DROP COLUMN IF EXISTS "certificateNameCorrectedAt";

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "certificateName" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "certificateNameConfirmedAt" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "certificateNameCorrectedAt" TIMESTAMP(3);

CREATE TABLE IF NOT EXISTS "certificate_name_changes" (
  "id"        TEXT NOT NULL,
  "userId"    TEXT NOT NULL,
  "oldName"   TEXT,
  "newName"   TEXT NOT NULL,
  "source"    TEXT NOT NULL DEFAULT 'LEARNER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "certificate_name_changes_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "certificate_name_changes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "certificate_name_changes_userId_idx" ON "certificate_name_changes"("userId");
