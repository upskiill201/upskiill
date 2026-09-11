-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback:
--   ALTER TABLE "tey_deliveries" DROP COLUMN "providerMessageId";
--   ALTER TABLE "tey_deliveries" DROP COLUMN "deliveredAt";
--   DROP TABLE IF EXISTS "whatsapp_inbound_messages";
-- Backup required: NO (additive only)
-- Deployment order: migration first, then code

-- Meta WhatsApp Cloud API delivery status webhooks are matched back to a
-- TeyDelivery row by the provider's own message id, and the 'delivered'
-- status needs somewhere to land (no column existed for it before).
ALTER TABLE "tey_deliveries" ADD COLUMN "providerMessageId" TEXT;
ALTER TABLE "tey_deliveries" ADD COLUMN "deliveredAt" TIMESTAMP(3);

CREATE INDEX "tey_deliveries_providerMessageId_idx" ON "tey_deliveries"("providerMessageId");

-- Store-only inbox for inbound Meta WhatsApp messages. No processing, no
-- auto-reply — conversational Tey is future work.
CREATE TABLE "whatsapp_inbound_messages" (
    "id" TEXT NOT NULL,
    "fromPhone" TEXT NOT NULL,
    "waMessageId" TEXT NOT NULL,
    "userId" TEXT,
    "body" TEXT,
    "rawPayload" JSONB NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "whatsapp_inbound_messages_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "whatsapp_inbound_messages_waMessageId_key" ON "whatsapp_inbound_messages"("waMessageId");
CREATE INDEX "whatsapp_inbound_messages_fromPhone_receivedAt_idx" ON "whatsapp_inbound_messages"("fromPhone", "receivedAt" DESC);

-- Webhook delivery-status/inbound-message dedup reuses the existing
-- idempotency ledger (provider = 'WHATSAPP_META') rather than a new table.
