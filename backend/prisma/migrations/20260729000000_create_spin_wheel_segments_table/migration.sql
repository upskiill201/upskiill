-- Type: ADDITIVE ONLY
-- NOTE: `20260729_add_lucky_spin_segments` seeds "spin_wheel_segments" but no
-- prior migration ever created the table (SpinWheelSegment model existed in
-- schema.prisma with no matching migration). Staging picked up the table via
-- an out-of-band `db push` at some point, which is why it never surfaced
-- there; a fresh database (production) fails on the seed INSERT. This
-- migration must sort before `20260729_add_lucky_spin_segments` so
-- `migrate deploy` creates the table before seeding it.

-- CreateTable
CREATE TABLE IF NOT EXISTS "spin_wheel_segments" (
    "id" TEXT NOT NULL,
    "segmentIndex" INTEGER NOT NULL,
    "rewardType" TEXT NOT NULL,
    "amountMin" INTEGER NOT NULL,
    "amountMax" INTEGER NOT NULL,
    "rarityTier" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "colorKey" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "spin_wheel_segments_pkey" PRIMARY KEY ("id")
);

-- Rollback SQL (manual):
-- DROP TABLE IF EXISTS "spin_wheel_segments";
