-- Type: ADDITIVE ONLY
-- The Teyro Network, phase 2 (docs/TEYRO_NETWORK_PLAN.md): network_events,
-- an append-only log of what happened to feed cards (impressions, taps,
-- cheers, lessons and enrolments that came from a card). The ranking learns
-- from it and "started because of you" is attributed from it.
--
-- Rollback:
--   DROP TABLE IF EXISTS "network_events";

CREATE TABLE IF NOT EXISTS "network_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "activityId" TEXT,
    "authorId" TEXT,
    "courseId" TEXT,
    "position" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "network_events_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "network_events_userId_kind_createdAt_idx" ON "network_events"("userId", "kind", "createdAt");
CREATE INDEX IF NOT EXISTS "network_events_authorId_kind_createdAt_idx" ON "network_events"("authorId", "kind", "createdAt");
CREATE INDEX IF NOT EXISTS "network_events_activityId_idx" ON "network_events"("activityId");
