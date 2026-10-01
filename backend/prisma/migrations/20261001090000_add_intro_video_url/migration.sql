-- Type: ADDITIVE ONLY
-- The homepage introduction video: one nullable YouTube link on the
-- singleton platform_settings row, edited from Teyro HQ. NULL hides the
-- homepage section.
--
-- Rollback:
--   ALTER TABLE "platform_settings" DROP COLUMN "introVideoUrl";

ALTER TABLE "platform_settings" ADD COLUMN "introVideoUrl" TEXT;
