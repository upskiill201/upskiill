-- Migration: add_creator_earnings
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback: DROP TRIGGER IF EXISTS earnings_transactions_immutable ON "earnings_transactions";
--           DROP FUNCTION IF EXISTS forbid_ledger_mutation();
--           DROP TABLE "earnings_audit_logs"; DROP TABLE "creator_payouts";
--           DROP TABLE "creator_payout_methods"; DROP TABLE "earnings_transactions";
--           DROP TABLE "creator_earnings_agreements";
--           DROP TYPE "CreatorTier"; DROP TYPE "EarningsEntryType";
--           DROP TYPE "PayoutStatus"; DROP TYPE "PayoutMethodType";
-- Backup required: NO (additive only)
-- Deployment order: migration first, then code
--
-- Notes:
-- - Ledger/payout tables intentionally have NO foreign keys so financial
--   history survives user/course deletion.
-- - earnings_transactions is APPEND-ONLY: a trigger blocks UPDATE/DELETE at
--   the database level. Corrections are new rows referencing the original.

CREATE TYPE "CreatorTier" AS ENUM ('STANDARD', 'FOUNDING');
CREATE TYPE "EarningsEntryType" AS ENUM ('SALE', 'RENEWAL', 'REFUND', 'CHARGEBACK', 'REVERSAL', 'ADJUSTMENT');
CREATE TYPE "PayoutStatus" AS ENUM ('REQUESTED', 'UNDER_REVIEW', 'PROCESSING', 'PAID', 'REJECTED', 'FAILED', 'CANCELLED');
CREATE TYPE "PayoutMethodType" AS ENUM ('BANK', 'MOBILE_MONEY');

-- ── Revenue-share agreements (history-preserving) ────────────────────────
CREATE TABLE "creator_earnings_agreements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tier" "CreatorTier" NOT NULL DEFAULT 'STANDARD',
    "creatorSharePct" INTEGER NOT NULL,
    "isFounding" BOOLEAN NOT NULL DEFAULT false,
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveUntil" TIMESTAMP(3),
    "notes" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creator_earnings_agreements_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "creator_earnings_agreements_userId_effectiveUntil_idx"
  ON "creator_earnings_agreements"("userId", "effectiveUntil");

-- ── Immutable earnings ledger ────────────────────────────────────────────
CREATE TABLE "earnings_transactions" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "courseId" TEXT,
    "studentId" TEXT,
    "orderId" TEXT,
    "type" "EarningsEntryType" NOT NULL,
    "grossMinor" INTEGER NOT NULL,
    "discountMinor" INTEGER NOT NULL DEFAULT 0,
    "feeMinor" INTEGER NOT NULL DEFAULT 0,
    "netMinor" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "nativeCurrency" TEXT,
    "nativeAmountMinor" INTEGER,
    "creatorSharePct" INTEGER NOT NULL,
    "creatorAmountMinor" INTEGER NOT NULL,
    "teyroAmountMinor" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "providerReference" TEXT,
    "relatedTransactionId" TEXT,
    "reason" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "earnings_transactions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "earnings_transactions_provider_type_providerReference_key"
  ON "earnings_transactions"("provider", "type", "providerReference");
CREATE INDEX "earnings_transactions_creatorId_occurredAt_idx"
  ON "earnings_transactions"("creatorId", "occurredAt");
CREATE INDEX "earnings_transactions_creatorId_type_idx"
  ON "earnings_transactions"("creatorId", "type");
CREATE INDEX "earnings_transactions_courseId_idx" ON "earnings_transactions"("courseId");
CREATE INDEX "earnings_transactions_orderId_idx" ON "earnings_transactions"("orderId");
CREATE INDEX "earnings_transactions_providerReference_idx"
  ON "earnings_transactions"("providerReference");

-- Append-only enforcement at the database level
CREATE OR REPLACE FUNCTION forbid_ledger_mutation() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'earnings_transactions is append-only';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER earnings_transactions_immutable
  BEFORE UPDATE OR DELETE ON "earnings_transactions"
  FOR EACH ROW EXECUTE FUNCTION forbid_ledger_mutation();

-- ── Payout methods (details encrypted at rest) ───────────────────────────
CREATE TABLE "creator_payout_methods" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "PayoutMethodType" NOT NULL,
    "encryptedData" TEXT NOT NULL,
    "keyVersion" INTEGER NOT NULL DEFAULT 1,
    "holderName" TEXT,
    "maskedDisplay" TEXT,
    "bankName" TEXT,
    "country" TEXT,
    "receivingCurrency" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "eligibilityNote" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_payout_methods_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "creator_payout_methods_userId_key" ON "creator_payout_methods"("userId");

-- ── Payouts ──────────────────────────────────────────────────────────────
CREATE TABLE "creator_payouts" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "PayoutStatus" NOT NULL DEFAULT 'REQUESTED',
    "methodSnapshot" JSONB,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "processedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "rejectionReason" TEXT,
    "failureReason" TEXT,
    "cancelReason" TEXT,
    "adminNote" TEXT,
    "externalReference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_payouts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "creator_payouts_publicId_key" ON "creator_payouts"("publicId");
CREATE INDEX "creator_payouts_userId_status_idx" ON "creator_payouts"("userId", "status");
CREATE INDEX "creator_payouts_userId_requestedAt_idx" ON "creator_payouts"("userId", "requestedAt" DESC);
CREATE INDEX "creator_payouts_status_requestedAt_idx" ON "creator_payouts"("status", "requestedAt" DESC);

-- ── Audit trail ──────────────────────────────────────────────────────────
CREATE TABLE "earnings_audit_logs" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorType" TEXT NOT NULL DEFAULT 'SYSTEM',
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "earnings_audit_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "earnings_audit_logs_entityType_entityId_idx"
  ON "earnings_audit_logs"("entityType", "entityId");
CREATE INDEX "earnings_audit_logs_actorId_createdAt_idx"
  ON "earnings_audit_logs"("actorId", "createdAt");
