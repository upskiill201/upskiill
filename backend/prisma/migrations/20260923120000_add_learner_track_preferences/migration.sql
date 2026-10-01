-- Type: ADDITIVE ONLY — two nullable columns, no backfill required.
--
-- Onboarding v2 narrows the launch catalogue to two learning tracks (Coding
-- and AI) and asks which specific interests sit under the chosen one. Those
-- answers already live in OnboardingSession.answers, but that column is a
-- free-form JSON blob: filtering or recommending against it means parsing
-- JSON on every read. These two columns give the parts the app actually
-- consumes a typed, queryable home on the learner's profile.
--
-- Deliberately NOT a course taxonomy. Course.category stays free text (there
-- is no Category model); the mapping from a track to the category strings
-- that exist lives in frontend/lib/onboarding/catalog.ts, so adding a third
-- track later does not require a data migration here.
--
-- Both nullable: every existing learner predates onboarding v2 and must keep
-- working with these unset.
--
-- Rollback:
--   ALTER TABLE "student_profiles" DROP COLUMN "learningTrack";
--   ALTER TABLE "student_profiles" DROP COLUMN "learningInterests";

ALTER TABLE "student_profiles" ADD COLUMN "learningTrack" TEXT;
ALTER TABLE "student_profiles" ADD COLUMN "learningInterests" JSONB;
