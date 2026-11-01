-- Type: ADDITIVE ONLY
-- The Teyro Network, phase 5 (docs/TEYRO_NETWORK_PLAN.md): trained feed
-- ranking models (weights learned weekly from network_events). At most one
-- is active; with none, the feed keeps its hand-set formula.
--
-- Rollback:
--   DROP TABLE IF EXISTS "network_ranking_models";

CREATE TABLE IF NOT EXISTS "network_ranking_models" (
    "id" TEXT NOT NULL,
    "trainedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "samples" INTEGER NOT NULL,
    "positives" JSONB NOT NULL,
    "weights" JSONB NOT NULL,
    "metrics" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    CONSTRAINT "network_ranking_models_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "network_ranking_models_active_idx" ON "network_ranking_models"("active");
