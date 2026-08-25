-- Migration: add_seen_at_to_user_achievements
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback: ALTER TABLE "user_achievements" DROP COLUMN "seenAt";
-- Backup required: NO (additive only)
-- Deployment order: migration first, then code
--
-- Achievements become a pure milestone collection (no currency/XP payouts).
-- seen_at records whether the student has VIEWED an unlock (celebration scene
-- or profile collection) so Herald surfaces each unlock once and stops nudging
-- after it has been seen. Nullable — NULL means "unlocked but not yet seen".

ALTER TABLE "user_achievements" ADD COLUMN "seenAt" TIMESTAMP(3);
