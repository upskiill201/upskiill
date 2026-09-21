-- Type: ADDITIVE ONLY — four new tables, no existing data touched.
--
-- Foundation for the email/lifecycle communication system. Follows the same
-- Postgres-claim-queue pattern as tey_scheduled_actions (see
-- 20260905090300_add_tey_scheduler/migration.sql) rather than introducing a
-- new queueing technology: email_jobs is claimed with the same
-- UPDATE ... FROM (SELECT ... FOR UPDATE SKIP LOCKED) strategy.
--
-- Rollback:
--   DROP TABLE "checkout_intents";
--   DROP TABLE "email_jobs";
--   DROP TABLE "email_logs";
--   DROP TABLE "email_preferences";

CREATE TABLE "email_preferences" (
  "id"                      TEXT NOT NULL,
  "userId"                  TEXT NOT NULL,
  "marketingOptOut"         BOOLEAN NOT NULL DEFAULT false,
  "learningRemindersOptOut" BOOLEAN NOT NULL DEFAULT false,
  "streakRemindersOptOut"   BOOLEAN NOT NULL DEFAULT false,
  "progressEmailsOptOut"    BOOLEAN NOT NULL DEFAULT false,
  "leagueEmailsOptOut"      BOOLEAN NOT NULL DEFAULT false,
  "weeklyDigestOptOut"      BOOLEAN NOT NULL DEFAULT false,
  "reengagementOptOut"      BOOLEAN NOT NULL DEFAULT false,
  "creatorDigestOptOut"     BOOLEAN NOT NULL DEFAULT false,
  "updatedAt"               TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt"               TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "email_preferences_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "email_preferences_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "email_preferences_userId_key" ON "email_preferences"("userId");

CREATE TABLE "email_logs" (
  "id"                TEXT NOT NULL,
  "userId"            TEXT,
  "email"             TEXT NOT NULL,
  "templateKey"       TEXT NOT NULL,
  "category"          TEXT NOT NULL,
  "idempotencyKey"    TEXT NOT NULL,
  "status"            TEXT NOT NULL,
  "skipReason"        TEXT,
  "provider"          TEXT NOT NULL DEFAULT 'RESEND',
  "providerMessageId" TEXT,
  "sentAt"            TIMESTAMP(3),
  "deliveredAt"       TIMESTAMP(3),
  "openedAt"          TIMESTAMP(3),
  "clickedAt"         TIMESTAMP(3),
  "failedAt"          TIMESTAMP(3),
  "error"             TEXT,
  "metadata"          JSONB,
  "createdAt"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "email_logs_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "email_logs_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- THE idempotency guarantee: the database, not application memory, rejects a
-- second insert for the same logical send. A race between two workers ends
-- with one row and one P2002 error, not two emails.
CREATE UNIQUE INDEX "email_logs_idempotencyKey_key" ON "email_logs"("idempotencyKey");
CREATE INDEX "email_logs_userId_templateKey_idx" ON "email_logs"("userId", "templateKey");
CREATE INDEX "email_logs_status_createdAt_idx" ON "email_logs"("status", "createdAt");
CREATE INDEX "email_logs_category_createdAt_idx" ON "email_logs"("category", "createdAt");

CREATE TABLE "email_jobs" (
  "id"          TEXT NOT NULL,
  "userId"      TEXT,
  "eventType"   TEXT NOT NULL,
  "templateKey" TEXT NOT NULL,
  "status"      TEXT NOT NULL DEFAULT 'PENDING',
  "dueAt"       TIMESTAMP(3) NOT NULL,
  "dedupeKey"   TEXT NOT NULL,
  "payload"     JSONB,
  "attempts"    INTEGER NOT NULL DEFAULT 0,
  "claimedAt"   TIMESTAMP(3),
  "claimedBy"   TEXT,
  "lastError"   TEXT,
  "skipReason"  TEXT,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "email_jobs_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "email_jobs_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "email_jobs_dedupeKey_key" ON "email_jobs"("dedupeKey");

-- Partial index, same reasoning as tey_scheduled_actions_due_idx: size is
-- proportional to PENDING rows only, so the worker tick stays O(due) no
-- matter how many users/jobs exist in total. Prisma cannot express this —
-- lives only here, intentional permanent drift from `prisma migrate diff`.
CREATE INDEX "email_jobs_due_idx" ON "email_jobs"("dueAt") WHERE "status" = 'PENDING';
CREATE INDEX "email_jobs_claimed_idx" ON "email_jobs"("claimedAt") WHERE "status" = 'CLAIMED';
CREATE INDEX "email_jobs_userId_status_idx" ON "email_jobs"("userId", "status");

CREATE TABLE "checkout_intents" (
  "id"                    TEXT NOT NULL,
  "userId"                TEXT NOT NULL,
  "courseId"              TEXT NOT NULL,
  "provider"              TEXT NOT NULL,
  "checkoutRef"           TEXT,
  "amountMinor"           INTEGER NOT NULL,
  "currency"              TEXT NOT NULL DEFAULT 'USD',
  "status"                TEXT NOT NULL DEFAULT 'STARTED',
  "startedAt"             TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "paidAt"                TIMESTAMP(3),
  "recoveryStage"         INTEGER NOT NULL DEFAULT 0,
  "lastRecoveryEmailAt"   TIMESTAMP(3),
  "campaignId"            TEXT NOT NULL,
  "recoveryStoppedAt"     TIMESTAMP(3),
  "recoveryStoppedReason" TEXT,
  "createdAt"             TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"             TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "checkout_intents_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "checkout_intents_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "checkout_intents_userId_status_idx" ON "checkout_intents"("userId", "status");
CREATE INDEX "checkout_intents_status_startedAt_idx" ON "checkout_intents"("status", "startedAt");
