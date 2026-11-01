-- Type: ADDITIVE ONLY
-- Teyro Pro, part 2 of 2: one app-wide subscription (monthly / yearly, 7-day
-- card trial, Mobile Money prepaid), its paywall analytics, the free tier's
-- daily lesson cap, the creator pool, and onboarding v3's analytics + lesson
-- claim. Only new tables and new nullable/defaulted columns; nothing existing
-- is altered or dropped. Billing tables have no foreign keys to "User" so
-- money history survives account deletion (same rule as the earnings ledger).
--
-- Rollback:
--   DROP TABLE IF EXISTS "onboarding_events", "pro_billing_events",
--     "pro_pool_allocations", "pro_pool_runs", "pro_learning_minutes",
--     "free_lesson_claims", "pro_offers", "exit_survey_responses",
--     "paywall_events", "pro_checkout_attempts", "pro_trial_claims",
--     "pro_invoices", "pro_subscriptions";
--   DROP FUNCTION IF EXISTS forbid_pro_minutes_mutation();
--   ALTER TABLE "User" DROP COLUMN IF EXISTS "stripeCustomerId";
--   ALTER TABLE "student_profiles" DROP COLUMN IF EXISTS "freeCourseId",
--     DROP COLUMN IF EXISTS "freeCourseSetAt";
--   ALTER TABLE "onboarding_challenge_claims" DROP COLUMN IF EXISTS "kind",
--     DROP COLUMN IF EXISTS "courseId", DROP COLUMN IF EXISTS "lessonId",
--     DROP COLUMN IF EXISTS "stats";

-- ── New columns on existing tables ──────────────────────────────────────────
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "stripeCustomerId" TEXT;
ALTER TABLE "student_profiles" ADD COLUMN IF NOT EXISTS "freeCourseId" TEXT,
  ADD COLUMN IF NOT EXISTS "freeCourseSetAt" TIMESTAMP(3);
ALTER TABLE "onboarding_challenge_claims" ADD COLUMN IF NOT EXISTS "kind" TEXT NOT NULL DEFAULT 'CHALLENGE',
  ADD COLUMN IF NOT EXISTS "courseId" TEXT,
  ADD COLUMN IF NOT EXISTS "lessonId" TEXT,
  ADD COLUMN IF NOT EXISTS "stats" JSONB;


-- CreateTable
CREATE TABLE IF NOT EXISTS "pro_subscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "ProProvider" NOT NULL,
    "plan" "ProPlan" NOT NULL,
    "status" "ProStatus" NOT NULL,
    "stripeSubscriptionId" TEXT,
    "stripeCustomerId" TEXT,
    "stripePriceId" TEXT,
    "stripeStatus" TEXT,
    "trialStart" TIMESTAMP(3),
    "trialEnd" TIMESTAMP(3),
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "canceledAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "graceUntil" TIMESTAMP(3),
    "hasPaid" BOOLEAN NOT NULL DEFAULT false,
    "autoRenew" BOOLEAN NOT NULL DEFAULT true,
    "offerId" TEXT,
    "checkoutAttemptId" TEXT,
    "cancellationReason" TEXT,
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pro_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "pro_invoices" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "proSubscriptionId" TEXT,
    "provider" "ProProvider" NOT NULL,
    "providerReference" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT,
    "stripeChargeId" TEXT,
    "billingReason" TEXT,
    "plan" "ProPlan" NOT NULL,
    "amountPaidMinor" INTEGER NOT NULL,
    "discountMinor" INTEGER NOT NULL DEFAULT 0,
    "taxMinor" INTEGER NOT NULL DEFAULT 0,
    "feeMinor" INTEGER NOT NULL DEFAULT 0,
    "amountRefundedMinor" INTEGER NOT NULL DEFAULT 0,
    "amountDisputedMinor" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "nativeCurrency" TEXT,
    "nativeAmountMinor" INTEGER,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pro_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "pro_trial_claims" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardFingerprint" TEXT,
    "status" TEXT NOT NULL,
    "checkoutAttemptId" TEXT,
    "stripeSubscriptionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "claimedAt" TIMESTAMP(3),

    CONSTRAINT "pro_trial_claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "pro_checkout_attempts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "ProProvider" NOT NULL DEFAULT 'STRIPE',
    "plan" "ProPlan" NOT NULL,
    "offerId" TEXT,
    "trial" BOOLEAN NOT NULL DEFAULT false,
    "intentType" TEXT,
    "stripeSetupIntentId" TEXT,
    "stripeSubscriptionId" TEXT,
    "status" "ProCheckoutStatus" NOT NULL DEFAULT 'CREATED',
    "lastErrorCode" TEXT,
    "lastDeclineCode" TEXT,
    "paywallSessionId" TEXT,
    "moment" TEXT,
    "recoveryStage" INTEGER NOT NULL DEFAULT 0,
    "recoveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pro_checkout_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "paywall_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "anonymousId" TEXT,
    "sessionId" TEXT NOT NULL,
    "moment" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "plan" TEXT,
    "offerId" TEXT,
    "attemptId" TEXT,
    "variant" TEXT,
    "errorCode" TEXT,
    "declineCode" TEXT,
    "meta" JSONB,
    "clientTs" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paywall_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "exit_survey_responses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "reason" "ExitSurveyReason" NOT NULL,
    "freeText" VARCHAR(500),
    "route" TEXT NOT NULL,
    "offerId" TEXT,
    "moment" TEXT,
    "plan" TEXT,
    "remindAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exit_survey_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "pro_offers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "plan" "ProPlan" NOT NULL,
    "percentOff" INTEGER NOT NULL,
    "stripeCouponId" TEXT,
    "status" "ProOfferStatus" NOT NULL DEFAULT 'OFFERED',
    "offeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "redeemedAt" TIMESTAMP(3),
    "stripeSubscriptionId" TEXT,

    CONSTRAINT "pro_offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "free_lesson_claims" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "day" DATE NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "free_lesson_claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "pro_learning_minutes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "isOriginal" BOOLEAN NOT NULL,
    "seconds" INTEGER NOT NULL,
    "proSubscriptionId" TEXT,
    "proStatus" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pro_learning_minutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "pro_pool_runs" (
    "id" TEXT NOT NULL,
    "month" DATE NOT NULL,
    "revision" INTEGER NOT NULL,
    "status" "ProPoolRunStatus" NOT NULL DEFAULT 'DRAFT',
    "sharePct" INTEGER NOT NULL,
    "recognizedRevenueMinor" INTEGER NOT NULL,
    "creatorPoolMinor" INTEGER NOT NULL,
    "allocatedToCreatorsMinor" INTEGER NOT NULL,
    "retainedOriginalsMinor" INTEGER NOT NULL,
    "unallocatedMinor" INTEGER NOT NULL,
    "totalSeconds" INTEGER NOT NULL,
    "learners" INTEGER NOT NULL,
    "approvedBy" TEXT,
    "postedAt" TIMESTAMP(3),
    "summary" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pro_pool_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "pro_pool_allocations" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "seconds" INTEGER NOT NULL,
    "learners" INTEGER NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "postedDeltaMinor" INTEGER,
    "earningsTransactionId" TEXT,

    CONSTRAINT "pro_pool_allocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "pro_billing_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "proSubscriptionId" TEXT,
    "stripeEventId" TEXT,
    "type" TEXT NOT NULL,
    "fromStatus" TEXT,
    "toStatus" TEXT,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pro_billing_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "onboarding_events" (
    "id" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT NOT NULL,
    "step" TEXT NOT NULL,
    "stepIndex" INTEGER,
    "type" TEXT NOT NULL,
    "answerKey" TEXT,
    "answerValue" VARCHAR(120),
    "ms" INTEGER,
    "reason" TEXT,
    "device" TEXT,
    "source" TEXT,
    "clientTs" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "onboarding_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "pro_subscriptions_stripeSubscriptionId_key" ON "pro_subscriptions"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_subscriptions_userId_status_idx" ON "pro_subscriptions"("userId", "status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_subscriptions_status_trialEnd_idx" ON "pro_subscriptions"("status", "trialEnd");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_subscriptions_status_currentPeriodEnd_idx" ON "pro_subscriptions"("status", "currentPeriodEnd");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "pro_invoices_providerReference_key" ON "pro_invoices"("providerReference");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_invoices_userId_idx" ON "pro_invoices"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_invoices_stripePaymentIntentId_idx" ON "pro_invoices"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_invoices_periodStart_periodEnd_idx" ON "pro_invoices"("periodStart", "periodEnd");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "pro_trial_claims_userId_key" ON "pro_trial_claims"("userId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "pro_trial_claims_cardFingerprint_key" ON "pro_trial_claims"("cardFingerprint");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "pro_checkout_attempts_stripeSetupIntentId_key" ON "pro_checkout_attempts"("stripeSetupIntentId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "pro_checkout_attempts_stripeSubscriptionId_key" ON "pro_checkout_attempts"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_checkout_attempts_userId_createdAt_idx" ON "pro_checkout_attempts"("userId", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_checkout_attempts_status_createdAt_idx" ON "pro_checkout_attempts"("status", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "paywall_events_type_createdAt_idx" ON "paywall_events"("type", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "paywall_events_moment_createdAt_idx" ON "paywall_events"("moment", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "paywall_events_userId_createdAt_idx" ON "paywall_events"("userId", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "paywall_events_sessionId_idx" ON "paywall_events"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "exit_survey_responses_sessionId_key" ON "exit_survey_responses"("sessionId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "exit_survey_responses_reason_createdAt_idx" ON "exit_survey_responses"("reason", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "exit_survey_responses_userId_idx" ON "exit_survey_responses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "pro_offers_userId_kind_key" ON "pro_offers"("userId", "kind");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "free_lesson_claims_userId_day_idx" ON "free_lesson_claims"("userId", "day");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "free_lesson_claims_userId_lessonId_idx" ON "free_lesson_claims"("userId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "free_lesson_claims_userId_day_lessonId_key" ON "free_lesson_claims"("userId", "day", "lessonId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_learning_minutes_completedAt_idx" ON "pro_learning_minutes"("completedAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_learning_minutes_courseId_completedAt_idx" ON "pro_learning_minutes"("courseId", "completedAt");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "pro_learning_minutes_userId_lessonId_key" ON "pro_learning_minutes"("userId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "pro_pool_runs_month_revision_key" ON "pro_pool_runs"("month", "revision");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_pool_allocations_creatorId_idx" ON "pro_pool_allocations"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "pro_pool_allocations_runId_courseId_key" ON "pro_pool_allocations"("runId", "courseId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_billing_events_type_createdAt_idx" ON "pro_billing_events"("type", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "pro_billing_events_userId_createdAt_idx" ON "pro_billing_events"("userId", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "onboarding_events_type_createdAt_idx" ON "onboarding_events"("type", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "onboarding_events_anonymousId_idx" ON "onboarding_events"("anonymousId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "onboarding_events_userId_idx" ON "onboarding_events"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "onboarding_events_step_type_idx" ON "onboarding_events"("step", "type");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "earnings_transactions_publicId_key" ON "earnings_transactions"("publicId");

-- AddForeignKey
ALTER TABLE "pro_pool_allocations" ADD CONSTRAINT "pro_pool_allocations_runId_fkey" FOREIGN KEY ("runId") REFERENCES "pro_pool_runs"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- ── Guarantees the schema can't express ─────────────────────────────────────
-- At most one live Pro subscription per learner.
CREATE UNIQUE INDEX IF NOT EXISTS "pro_subscriptions_one_live_per_user"
  ON "pro_subscriptions"("userId")
  WHERE "status" IN ('TRIALING', 'ACTIVE', 'PAST_DUE');

-- Exit discounts are capped at 30% (founder decision, 2026-10-22).
ALTER TABLE "pro_offers" ADD CONSTRAINT "pro_offers_percent_off_check"
  CHECK ("percentOff" BETWEEN 1 AND 30);

-- Learning minutes are the creator pool's evidence: append-only.
CREATE OR REPLACE FUNCTION forbid_pro_minutes_mutation() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'pro_learning_minutes is append-only';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pro_learning_minutes_immutable
  BEFORE UPDATE OR DELETE ON "pro_learning_minutes"
  FOR EACH ROW EXECUTE FUNCTION forbid_pro_minutes_mutation();
