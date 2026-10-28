-- Type: ADDITIVE ONLY
-- The Teyro Network, phase 4 (docs/TEYRO_NETWORK_PLAN.md): squads (with
-- members and once-a-week facts), duels on lesson quizzes, and learning
-- presence for co-learning.
--
-- Rollback:
--   DROP TABLE IF EXISTS "learning_presence";
--   DROP TABLE IF EXISTS "duels";
--   DROP TABLE IF EXISTS "squad_weeks";
--   DROP TABLE IF EXISTS "squad_members";
--   DROP TABLE IF EXISTS "squads";

CREATE TABLE IF NOT EXISTS "squads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "courseId" TEXT,
    "weeklyGoal" INTEGER NOT NULL DEFAULT 15,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "squads_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "squads_inviteCode_key" ON "squads"("inviteCode");

CREATE TABLE IF NOT EXISTS "squad_members" (
    "id" TEXT NOT NULL,
    "squadId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "squad_members_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "squad_members_userId_key" ON "squad_members"("userId");
CREATE INDEX IF NOT EXISTS "squad_members_squadId_idx" ON "squad_members"("squadId");
DO $$ BEGIN
  ALTER TABLE "squad_members" ADD CONSTRAINT "squad_members_squadId_fkey"
    FOREIGN KEY ("squadId") REFERENCES "squads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS "squad_weeks" (
    "id" TEXT NOT NULL,
    "squadId" TEXT NOT NULL,
    "weekStart" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "goalMetAt" TIMESTAMP(3),
    "almostSentAt" TIMESTAMP(3),
    CONSTRAINT "squad_weeks_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "squad_weeks_squadId_weekStart_key" ON "squad_weeks"("squadId", "weekStart");
DO $$ BEGIN
  ALTER TABLE "squad_weeks" ADD CONSTRAINT "squad_weeks_squadId_fkey"
    FOREIGN KEY ("squadId") REFERENCES "squads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS "duels" (
    "id" TEXT NOT NULL,
    "challengerId" TEXT NOT NULL,
    "opponentId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "questionIds" JSONB NOT NULL,
    "challengerAnswers" JSONB,
    "opponentAnswers" JSONB,
    "challengerScore" INTEGER,
    "opponentScore" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'CHALLENGER_TURN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3),
    CONSTRAINT "duels_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "duels_challengerId_status_idx" ON "duels"("challengerId", "status");
CREATE INDEX IF NOT EXISTS "duels_opponentId_status_idx" ON "duels"("opponentId", "status");

CREATE TABLE IF NOT EXISTS "learning_presence" (
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "lessonTitle" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "learning_presence_pkey" PRIMARY KEY ("userId")
);
CREATE INDEX IF NOT EXISTS "learning_presence_seenAt_idx" ON "learning_presence"("seenAt");
