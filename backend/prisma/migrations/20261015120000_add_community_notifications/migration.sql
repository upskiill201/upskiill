-- Type: ADDITIVE ONLY
-- Community notifications (push + email + bell), delivered for the learner's
-- FOCUS course only:
--   * student_profiles.focusCourseId       the course the learner chose on home / My Learning
--                                          (NULL = fall back to the most recently active enrolment)
--   * tey_notification_prefs.communityActivity   push/bell toggle for community activity
--   * email_preferences.communityOptOut          email opt-out for community activity
-- All three are new, defaulted or nullable, so existing rows need no backfill.
--
-- Rollback:
--   ALTER TABLE "student_profiles" DROP COLUMN "focusCourseId";
--   ALTER TABLE "tey_notification_prefs" DROP COLUMN "communityActivity";
--   ALTER TABLE "email_preferences" DROP COLUMN "communityOptOut";

ALTER TABLE "student_profiles" ADD COLUMN "focusCourseId" TEXT;
ALTER TABLE "tey_notification_prefs" ADD COLUMN "communityActivity" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "email_preferences" ADD COLUMN "communityOptOut" BOOLEAN NOT NULL DEFAULT false;
