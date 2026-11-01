-- Type: ADDITIVE ONLY
-- Jump ahead / placement (Teyro Originals): lessons a learner skipped by
-- passing a test. Kept apart from completedLessons so completion stats,
-- certificates, XP, chests and leagues only ever count lessons really done.
--   * Enrollment.testedOutLessons   JSON array of lesson ids, default []
--   * Enrollment.placedAt           when the learner last placed or tested out (NULL = never)
-- New and defaulted or nullable, so existing rows need no backfill.
--
-- Rollback:
--   ALTER TABLE "Enrollment" DROP COLUMN "testedOutLessons";
--   ALTER TABLE "Enrollment" DROP COLUMN "placedAt";

ALTER TABLE "Enrollment" ADD COLUMN "testedOutLessons" JSONB DEFAULT '[]';
ALTER TABLE "Enrollment" ADD COLUMN "placedAt" TIMESTAMP(3);
