-- Type: ADDITIVE ONLY
-- The Teyro Network, phase 3 (docs/TEYRO_NETWORK_PLAN.md): help_routes —
-- a lesson question routed to people who passed that lesson, whether they
-- answered, and whether the asker then finished the lesson (helpedAt). The
-- Helper badge counts helpedAt rows.
--
-- Rollback:
--   DROP TABLE IF EXISTS "help_routes";

CREATE TABLE IF NOT EXISTS "help_routes" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "askerId" TEXT NOT NULL,
    "helperId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "routedAt" TIMESTAMP(3),
    "answeredAt" TIMESTAMP(3),
    "helpedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "help_routes_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "help_routes_postId_helperId_key" ON "help_routes"("postId", "helperId");
CREATE INDEX IF NOT EXISTS "help_routes_helperId_helpedAt_idx" ON "help_routes"("helperId", "helpedAt");
CREATE INDEX IF NOT EXISTS "help_routes_askerId_lessonId_idx" ON "help_routes"("askerId", "lessonId");
