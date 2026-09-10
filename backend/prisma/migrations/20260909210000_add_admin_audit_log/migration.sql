-- Type: ADDITIVE ONLY — one new table, no existing table/column/row touched.
--
-- WHY: The Admin Center (Phase 2 — Users) adds its first destructive admin
-- action (suspend/unsuspend). The admin spec requires every such mutation to
-- leave an audit trail (actor, action, entity, reason, timestamp). The only
-- audit trail that exists today is earnings_audit_logs, scoped to the
-- earnings/payout system — this is its general-purpose counterpart for admin
-- mutations elsewhere (users now; courses/creators/moderation land here too
-- as their phases ship), same shape, generalized.
--
-- No foreign key to "User": audit history must remain readable even if the
-- subject account is later deleted — same reasoning earnings_audit_logs
-- already uses.
--
-- Rollback:
--   DROP TABLE IF EXISTS "admin_audit_logs";

CREATE TABLE "admin_audit_logs" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "actorType" TEXT NOT NULL DEFAULT 'ADMIN',
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "reason" TEXT,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_audit_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "admin_audit_logs_entityType_entityId_idx"
  ON "admin_audit_logs"("entityType", "entityId");
CREATE INDEX "admin_audit_logs_actorId_createdAt_idx"
  ON "admin_audit_logs"("actorId", "createdAt");
