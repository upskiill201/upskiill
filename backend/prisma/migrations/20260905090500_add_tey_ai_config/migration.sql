-- Type: ADDITIVE ONLY — two new tables.
--
-- API keys use the SAME AES-256-GCM envelope as creator payout methods
-- (backend/src/earnings/crypto.util.ts, format v1:<keyVer>:<iv>:<tag>:<cipher>),
-- reused verbatim so there is exactly one crypto implementation to audit and
-- one production fail-fast on a missing EARNINGS_ENC_KEY.
--
-- Rollback:
--   DROP TABLE "tey_ai_usage";
--   DROP TABLE "tey_ai_provider_configs";

CREATE TABLE "tey_ai_provider_configs" (
  "id"              TEXT NOT NULL,
  "name"            TEXT NOT NULL,
  "kind"            TEXT NOT NULL,
  "baseUrl"         TEXT,
  "model"           TEXT NOT NULL,
  "encryptedApiKey" TEXT NOT NULL,
  "keyVersion"      INTEGER NOT NULL DEFAULT 1,
  "keyTail"         TEXT NOT NULL,
  "isActive"        BOOLEAN NOT NULL DEFAULT false,
  "isFallback"      BOOLEAN NOT NULL DEFAULT false,
  "maxOutputTokens" INTEGER NOT NULL DEFAULT 400,
  "temperature"     DOUBLE PRECISION NOT NULL DEFAULT 0.8,
  "timeoutMs"       INTEGER NOT NULL DEFAULT 8000,
  "inputCostPer1k"  DECIMAL(10,6) NOT NULL DEFAULT 0,
  "outputCostPer1k" DECIMAL(10,6) NOT NULL DEFAULT 0,
  "dailyBudgetUsd"  DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  "lastTestAt"      TIMESTAMP(3),
  "lastTestOk"      BOOLEAN,
  "lastTestError"   TEXT,
  "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "tey_ai_provider_configs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "tey_ai_provider_configs_name_key"
  ON "tey_ai_provider_configs"("name");

CREATE INDEX "tey_ai_provider_configs_isActive_idx"
  ON "tey_ai_provider_configs"("isActive");

-- At most one active primary, and at most one active fallback. Enforced in the
-- database rather than the service, because "two providers are somehow both
-- default" is the kind of state that only shows up under concurrent admin
-- edits and is miserable to debug from a bill.
CREATE UNIQUE INDEX "tey_ai_one_active_primary"
  ON "tey_ai_provider_configs"(("isActive"))
  WHERE "isActive" = true AND "isFallback" = false;

CREATE UNIQUE INDEX "tey_ai_one_active_fallback"
  ON "tey_ai_provider_configs"(("isActive"))
  WHERE "isActive" = true AND "isFallback" = true;

CREATE TABLE "tey_ai_usage" (
  "id"           TEXT NOT NULL,
  "day"          TEXT NOT NULL,
  "providerId"   TEXT NOT NULL,
  "userId"       TEXT,
  "purpose"      TEXT NOT NULL,
  "calls"        INTEGER NOT NULL DEFAULT 0,
  "inputTokens"  INTEGER NOT NULL DEFAULT 0,
  "outputTokens" INTEGER NOT NULL DEFAULT 0,
  "costUsd"      DECIMAL(12,6) NOT NULL DEFAULT 0,
  "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "tey_ai_usage_pkey" PRIMARY KEY ("id")
);

-- COALESCE so per-user rows and global rollups share one rollup key. Prisma
-- cannot express a unique index over an expression, so this lives only here.
CREATE UNIQUE INDEX "tey_ai_usage_rollup_key"
  ON "tey_ai_usage"("day", "providerId", COALESCE("userId", ''), "purpose");

CREATE INDEX "tey_ai_usage_day_idx" ON "tey_ai_usage"("day");
CREATE INDEX "tey_ai_usage_userId_day_idx" ON "tey_ai_usage"("userId", "day");
