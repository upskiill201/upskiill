-- Type: ADDITIVE ONLY — new nullable-then-backfilled column, no data loss.
-- Backs the "Your Journey" dashboard fix: enrollments need a real
-- last-activity signal so the homepage shows whichever course the student
-- is actually progressing through, not just whichever they enrolled in
-- most recently (previous behavior ordered by `id desc`).
--
-- Rollback:
--   ALTER TABLE "Enrollment" DROP COLUMN "updatedAt";

ALTER TABLE "Enrollment" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Seed existing rows so "last touched" isn't uniformly "now" for everyone —
-- best-available signal is their enrollment creation date until the next
-- lesson completion naturally bumps this via Prisma's @updatedAt.
UPDATE "Enrollment" SET "updatedAt" = "createdAt";
