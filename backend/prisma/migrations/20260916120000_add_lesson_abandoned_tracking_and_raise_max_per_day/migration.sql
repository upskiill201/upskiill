-- Type: ADDITIVE ONLY
--
-- 1. Adds openLessonId/openLessonStartedAt to learner_state, feeding the new
--    LESSON_ABANDONED rule (a lesson opened with no later server-confirmed
--    completion for it). Both nullable, no backfill needed — they populate on
--    the next projection.
--
-- 2. Raises tey_notification_prefs.maxPerDay's default from 3 to 4. With the
--    existing 240-minute minimum gap between pushes and default quiet hours
--    (21:30-08:00, ~13.5 waking hours), at most ~4 pushes can physically land
--    in a day regardless of the cap — so 3 was the binding constraint before
--    any of the newly-added rules (STREAK_LOST, MILESTONE, PROGRESS_CELEBRATION,
--    COURSE_NEAR_COMPLETION, LESSON_ABANDONED) existed. Backfilled so existing
--    learners move too, not just new signups.
--
-- Rollback:
--   ALTER TABLE "learner_state" DROP COLUMN "openLessonId";
--   ALTER TABLE "learner_state" DROP COLUMN "openLessonStartedAt";
--   ALTER TABLE "tey_notification_prefs" ALTER COLUMN "maxPerDay" SET DEFAULT 3;
--   UPDATE "tey_notification_prefs" SET "maxPerDay" = 3 WHERE "maxPerDay" = 4;

ALTER TABLE "learner_state" ADD COLUMN "openLessonId" TEXT;
ALTER TABLE "learner_state" ADD COLUMN "openLessonStartedAt" TIMESTAMP(3);

ALTER TABLE "tey_notification_prefs" ALTER COLUMN "maxPerDay" SET DEFAULT 4;
UPDATE "tey_notification_prefs" SET "maxPerDay" = 4 WHERE "maxPerDay" = 3;
