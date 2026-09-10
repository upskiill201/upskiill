-- Migration: add_processed_webhook_events
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback: DROP TABLE IF EXISTS "processed_webhook_events";
-- Backup required: NO (additive only)
-- Deployment order: migration first, then code

-- Idempotency ledger: provider webhooks are retried and can overlap
-- (e.g. checkout.session.completed + invoice.payment_succeeded for the same
-- first period). Every processed delivery is recorded here so replays never
-- double-extend a student's entitlement.
CREATE TABLE "processed_webhook_events" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventType" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "processed_webhook_events_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "processed_webhook_events_provider_eventId_key" ON "processed_webhook_events"("provider", "eventId");
