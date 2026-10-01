-- Type: ADDITIVE ONLY
-- Creator onboarding v2: the full answer set (creator type, teaching
-- experience, existing content, goal…) kept on the creator's Profile. The
-- answers that map to existing columns (niche, subCategories, audienceSize,
-- weeklyHours, launchGoal) still go there. One nullable column; no existing
-- row or column is touched.
--
-- Rollback:
--   ALTER TABLE "Profile" DROP COLUMN IF EXISTS "creatorOnboarding";

ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "creatorOnboarding" JSONB;
