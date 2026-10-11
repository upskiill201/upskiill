-- Type: ADDITIVE ONLY
-- 1. tey_deliveries.skipReason: WHY a nudge didn't reach a phone (no push
--    subscription, quiet hours, opted out, daily cap…). Teyro HQ showed every
--    blocked nudge as a bare "SUPPRESSED" with no way to tell the cause.
-- 2. StudentProfile.longestStreak defaulted to 3, so every brand-new learner
--    showed a "3-day longest streak" they never earned. New rows start at 0,
--    and learners who have never earned a streak day are corrected to 0.
--
-- Rollback:
--   ALTER TABLE "tey_deliveries" DROP COLUMN "skipReason";
--   ALTER TABLE "student_profiles" ALTER COLUMN "longestStreak" SET DEFAULT 3;
--   (the 3 -> 0 correction is not reverted: 3 was never a real value)

ALTER TABLE "tey_deliveries" ADD COLUMN "skipReason" TEXT;

ALTER TABLE "student_profiles" ALTER COLUMN "longestStreak" SET DEFAULT 0;

UPDATE "student_profiles"
SET "longestStreak" = GREATEST(0, "streakDays")
WHERE "longestStreak" = 3
  AND "lastStreakEarnedAt" IS NULL;
