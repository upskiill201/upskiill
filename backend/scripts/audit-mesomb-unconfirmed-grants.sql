-- Audit: MoMo entitlements granted without a confirmed payment.
--
-- Context: the MeSomb provider used to activate a subscription on
-- isOperationSuccess(), which is true as soon as the USSD prompt is DISPATCHED
-- to the payer — before (and regardless of whether) they enter their PIN.
-- Every learner who merely started a MoMo payment received a full entitlement,
-- a course_subscriptions row, and a creator SALE row in earnings_transactions.
--
-- Detection: a genuine payment eventually produces a MeSomb SUCCESS webhook,
-- which writes processed_webhook_events(provider='MESOMB', "eventId"=<trx pk>).
-- A grant from the buggy synchronous path has no such row.
--
-- READ ONLY. Nothing here mutates. Review before acting on any row.

-- ── 1. Entitlements with no confirming webhook ──────────────────────────────
SELECT
  cs.id                    AS subscription_id,
  cs."userId",
  u.email,
  cs."courseId",
  c.title                  AS course_title,
  cs."providerSubscriptionId",
  cs."pricePaid",
  cs."startedAt",
  e.status                 AS entitlement_status,
  e."expiresAt",
  (e."expiresAt" > now())  AS still_active,
  CASE
    WHEN cs."providerSubscriptionId" LIKE 'mesomb_test_%'    THEN 'MOCK_PATH'
    WHEN cs."providerSubscriptionId" LIKE 'mesomb_pending_%' THEN 'NEVER_SETTLED'
    ELSE 'NO_CONFIRMING_WEBHOOK'
  END                      AS suspicion
FROM course_subscriptions cs
JOIN "User"   u ON u.id = cs."userId"
JOIN "Course" c ON c.id = cs."courseId"
LEFT JOIN course_access_entitlements e
       ON e."userId" = cs."userId" AND e."courseId" = cs."courseId"
LEFT JOIN processed_webhook_events w
       ON w.provider = 'MESOMB' AND w."eventId" = cs."providerSubscriptionId"
WHERE cs.provider = 'MESOMB'
  AND w.id IS NULL          -- no webhook ever confirmed this transaction
ORDER BY cs."startedAt" DESC;


-- ── 2. Creator earnings credited off those same unconfirmed grants ──────────
-- Run this BEFORE any payout run: these are SALE/RENEWAL rows with no money
-- behind them. netMinor is what would be paid out on a phantom payment.
SELECT
  et."publicId",
  et."creatorId",
  et."courseId",
  et."studentId",
  et.type,
  et."grossMinor",
  et."netMinor",
  et."creatorAmountMinor",
  et."nativeCurrency",
  et."nativeAmountMinor",
  et."providerReference",
  et."occurredAt"
FROM earnings_transactions et
LEFT JOIN processed_webhook_events w
       ON w.provider = 'MESOMB' AND w."eventId" = et."providerReference"
WHERE et.provider = 'MESOMB'
  AND w.id IS NULL
ORDER BY et."occurredAt" DESC;


-- ── 3. Bottom line: how much phantom revenue is on the books ────────────────
SELECT
  count(*)                        AS phantom_entries,
  sum(et."grossMinor")   / 100.0  AS phantom_gross_usd,
  sum(et."creatorAmountMinor") / 100.0 AS phantom_creator_owed_usd
FROM earnings_transactions et
LEFT JOIN processed_webhook_events w
       ON w.provider = 'MESOMB' AND w."eventId" = et."providerReference"
WHERE et.provider = 'MESOMB'
  AND w.id IS NULL;
