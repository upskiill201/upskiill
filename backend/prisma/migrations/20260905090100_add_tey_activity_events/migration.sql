-- Type: ADDITIVE ONLY — new table, no existing data touched.
--
-- Deliberately NOT reusing learning_events: that table is read by creator
-- analytics (analytics.service.ts:324,655,833; students.service.ts:276) and
-- requires non-null entityType/entityId, which app_opened / daily_goal_missed
-- cannot supply. Mixing high-volume client telemetry into it would both bloat
-- its [userId, createdAt DESC] index and risk semantic drift in creator
-- dashboards.
--
-- Rollback:
--   DROP TABLE "tey_activity_events";

CREATE TABLE "tey_activity_events" (
  "id"             TEXT NOT NULL,
  "userId"         TEXT NOT NULL,
  "eventType"      TEXT NOT NULL,
  "source"         TEXT NOT NULL DEFAULT 'SERVER',
  "entityType"     TEXT,
  "entityId"       TEXT,
  "props"          JSONB,
  "idempotencyKey" TEXT,
  "occurredAt"     TIMESTAMP(3) NOT NULL,
  "receivedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "localDate"      TEXT NOT NULL,

  CONSTRAINT "tey_activity_events_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "tey_activity_events_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Partial unique index: retries and double-flushes from the client batcher are
-- free. Prisma cannot express `WHERE ... IS NOT NULL`, so this lives only here.
CREATE UNIQUE INDEX "tey_activity_events_idempotencyKey_key"
  ON "tey_activity_events"("idempotencyKey")
  WHERE "idempotencyKey" IS NOT NULL;

CREATE INDEX "tey_activity_events_userId_occurredAt_idx"
  ON "tey_activity_events"("userId", "occurredAt" DESC);

CREATE INDEX "tey_activity_events_eventType_occurredAt_idx"
  ON "tey_activity_events"("eventType", "occurredAt" DESC);
