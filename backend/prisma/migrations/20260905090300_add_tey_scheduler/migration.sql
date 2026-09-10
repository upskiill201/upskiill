-- Type: ADDITIVE ONLY — two new tables, no existing data touched.
--
-- Postgres-native due queue. No Redis, no BullMQ: the claim is a single
-- UPDATE ... FROM (SELECT ... FOR UPDATE SKIP LOCKED), which is safe across any
-- number of Render instances and needs no extra infrastructure.
--
-- Rollback:
--   DROP TABLE "tey_deliveries";
--   DROP TABLE "tey_scheduled_actions";

CREATE TABLE "tey_scheduled_actions" (
  "id"         TEXT NOT NULL,
  "userId"     TEXT NOT NULL,
  "ruleId"     TEXT NOT NULL,
  "priority"   TEXT NOT NULL DEFAULT 'MEDIUM',
  "status"     TEXT NOT NULL DEFAULT 'PENDING',
  "dueAt"      TIMESTAMP(3) NOT NULL,
  "expiresAt"  TIMESTAMP(3),
  "dedupeKey"  TEXT NOT NULL,
  "context"    JSONB,
  "attempts"   INTEGER NOT NULL DEFAULT 0,
  "claimedAt"  TIMESTAMP(3),
  "claimedBy"  TEXT,
  "lastError"  TEXT,
  "skipReason" TEXT,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "tey_scheduled_actions_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "tey_scheduled_actions_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- One live instance of a rule per user per local day.
CREATE UNIQUE INDEX "tey_scheduled_actions_dedupeKey_key"
  ON "tey_scheduled_actions"("dedupeKey");

-- THE hot index.
--
-- Partial, so its SIZE is proportional to the number of PENDING rows — not to
-- total rows, and not to the number of users. This is what makes the scheduler
-- tick O(due) rather than O(users): a learner with no scheduled action is
-- invisible to it, and a dormant learner costs nothing forever.
--
-- Prisma cannot express a partial index, so it lives only here. The resulting
-- `prisma migrate diff` drift is intentional and permanent.
CREATE INDEX "tey_scheduled_actions_due_idx"
  ON "tey_scheduled_actions"("dueAt")
  WHERE "status" = 'PENDING';

-- Reaper: recovers rows claimed by an instance that died before sending.
CREATE INDEX "tey_scheduled_actions_claimed_idx"
  ON "tey_scheduled_actions"("claimedAt")
  WHERE "status" = 'CLAIMED';

-- Cancellation: "drop every pending nudge for this learner".
CREATE INDEX "tey_scheduled_actions_userId_status_idx"
  ON "tey_scheduled_actions"("userId", "status");

CREATE TABLE "tey_deliveries" (
  "id"          TEXT NOT NULL,
  "userId"      TEXT NOT NULL,
  "actionId"    TEXT,
  "channel"     TEXT NOT NULL,
  "ruleId"      TEXT NOT NULL,
  "priority"    TEXT NOT NULL,
  "title"       TEXT NOT NULL,
  "body"        TEXT NOT NULL,
  "deepLink"    TEXT NOT NULL,
  "context"     JSONB NOT NULL,
  "generatedBy" TEXT NOT NULL DEFAULT 'TEMPLATE',
  "status"      TEXT NOT NULL DEFAULT 'SENT',
  "sentAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "openedAt"    TIMESTAMP(3),
  "convertedAt" TIMESTAMP(3),

  CONSTRAINT "tey_deliveries_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "tey_deliveries_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "tey_deliveries_actionId_fkey" FOREIGN KEY ("actionId")
    REFERENCES "tey_scheduled_actions"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Drives the "max N per day / min gap since last" policy checks.
CREATE INDEX "tey_deliveries_userId_sentAt_idx"
  ON "tey_deliveries"("userId", "sentAt" DESC);

CREATE INDEX "tey_deliveries_ruleId_sentAt_idx"
  ON "tey_deliveries"("ruleId", "sentAt" DESC);
