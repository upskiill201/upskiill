-- Migration: add_league_leaderboards
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback:
--   DROP TABLE IF EXISTS "league_members";
--   DROP TABLE IF EXISTS "league_cohorts";
--   ALTER TABLE "student_profiles" DROP COLUMN "leagueTier";
--   ALTER TABLE "student_profiles" DROP COLUMN "tournamentWins";
--   DROP TYPE IF EXISTS "LeagueTier";
-- Backup required: NO (additive only)
-- Deployment order: migration first, then code
--
-- Duolingo-style weekly league system. Users earn XP during a UTC week
-- (Monday 00:00 UTC → Sunday 24:00 UTC) and are ranked inside cohorts of up
-- to 30 within their league tier. At week rollover (computed lazily on first
-- access — no cron) top finishers are promoted, bottom finishers demoted, and
-- StudentProfile.leagueTier carries the standing into the new week.
--
-- league_cohorts  — one competition group per (tier, week, cohortIndex)
-- league_members  — one row per (user, week): weekly XP, final rank, outcome.
--                   cohortId is NULL for synthetic inactivity-demotion rows.
--                   outcome/seenAt drive the one-time settlement celebration.
-- student_profiles.leagueTier — current standing (which tier the user joins
--                   next); tournamentWins counts Diamond Tournament titles.

CREATE TYPE "LeagueTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'SAPPHIRE', 'RUBY', 'EMERALD', 'AMETHYST', 'PEARL', 'DIAMOND', 'DIAMOND_TOURNAMENT');

-- ---------------------------------------------------------------------------
-- league_cohorts
-- ---------------------------------------------------------------------------
CREATE TABLE "league_cohorts" (
    "id" TEXT NOT NULL,
    "league" "LeagueTier" NOT NULL,
    "weekStart" TEXT NOT NULL,
    "cohortIndex" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "settledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "league_cohorts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "league_cohorts_league_weekStart_cohortIndex_key" ON "league_cohorts"("league", "weekStart", "cohortIndex");
CREATE INDEX "league_cohorts_weekStart_idx" ON "league_cohorts"("weekStart");

-- ---------------------------------------------------------------------------
-- league_members
-- ---------------------------------------------------------------------------
CREATE TABLE "league_members" (
    "id" TEXT NOT NULL,
    "cohortId" TEXT,
    "userId" TEXT NOT NULL,
    "weekStart" TEXT NOT NULL,
    "league" "LeagueTier" NOT NULL,
    "weeklyXp" INTEGER NOT NULL DEFAULT 0,
    "xpUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rank" INTEGER,
    "outcome" TEXT,
    "seenAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "league_members_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "league_members_userId_weekStart_key" ON "league_members"("userId", "weekStart");
CREATE INDEX "league_members_cohortId_weeklyXp_idx" ON "league_members"("cohortId", "weeklyXp" DESC);
CREATE INDEX "league_members_userId_weekStart_idx" ON "league_members"("userId", "weekStart" DESC);

ALTER TABLE "league_members" ADD CONSTRAINT "league_members_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "league_cohorts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "league_members" ADD CONSTRAINT "league_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ---------------------------------------------------------------------------
-- student_profiles — current league standing
-- ---------------------------------------------------------------------------
ALTER TABLE "student_profiles" ADD COLUMN "leagueTier" "LeagueTier" NOT NULL DEFAULT 'BRONZE';
ALTER TABLE "student_profiles" ADD COLUMN "tournamentWins" INTEGER NOT NULL DEFAULT 0;
