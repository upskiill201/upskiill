-- Type: ADDITIVE ONLY — two nullable columns, no backfill required.
--
-- The Tey scheduler cannot ask a browser "what time is it for you?" at 8pm, so
-- the learner's timezone has to be persisted. IANA is primary (survives DST);
-- the fixed offset is a fallback for clients that cannot resolve a zone name
-- and mirrors what the existing x-timezone-offset header already carries.
--
-- Rollback:
--   ALTER TABLE "User" DROP COLUMN "timezone";
--   ALTER TABLE "User" DROP COLUMN "timezoneOffsetMinutes";

ALTER TABLE "User" ADD COLUMN "timezone" TEXT;
ALTER TABLE "User" ADD COLUMN "timezoneOffsetMinutes" INTEGER;
