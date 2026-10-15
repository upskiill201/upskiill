-- Type: ADDITIVE ONLY
-- Teyro Originals storylines (docs/ORIGINALS_PLAYBOOK.md §8a): each unit is a
-- story chapter, and the map banner shows where it sits in the story
-- ("40 weeks to go"). One new nullable column; existing sections stay NULL.
--
-- Rollback:
--   ALTER TABLE "course_sections" DROP COLUMN "marker";

ALTER TABLE "course_sections" ADD COLUMN "marker" TEXT;
