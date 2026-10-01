# Email & Lifecycle Communication System

Source of truth for how Teyro sends email. Code lives in `backend/src/email/`.

## Architecture

```
product event
     |
EventEmitter2 (already used platform-wide — league, achievements, payment, etc.)
     |
EmailLifecycleListener  — does the minimum: enqueue a small job, return
     |
email_jobs (Postgres, FOR UPDATE SKIP LOCKED — same pattern as
     |       tey_scheduled_actions / TeyActionRepository)
     v
EmailSchedulerService (@Cron, ticks every 15s, batched, bounded concurrency)
     |
EmailJobProcessorService — re-fetches fresh state, decides send/skip
     |
EmailDispatchService — eligibility -> idempotency reservation -> render -> provider -> log
     |
EmailProvider (interface) -> ResendEmailProvider (the only concrete implementation)
```

Two emails don't go through the job queue: `auth.verification` and
`auth.welcome`/`auth.password-reset` are dispatched directly and
**not awaited** by their callers in `auth.service.ts` (`void this.authEmails.send...(...)`),
so the HTTP response never waits on Resend, but delivery still happens
immediately rather than on the next cron tick — the queue exists for
everything that needs re-validation or a delay, not for things that don't.

## Why Postgres, not Redis/BullMQ

The codebase already has this exact pattern for push/WhatsApp nudges
(`backend/src/tey/scheduler/`). `email_jobs` copies its claim strategy
(`UPDATE ... FROM (SELECT ... FOR UPDATE SKIP LOCKED)`) instead of
introducing new infrastructure. See `email-job.repository.ts`.

## Event taxonomy

`src/email/types.ts` — `EmailEvent` enum. Not all listed events are wired;
`src/email/templates/registry.ts` is the authoritative list of what's
actually implemented vs. documented-as-future (`enabled: false`, with a
`description` explaining exactly what's missing).

## Categories & preferences

`EmailCategory` (`src/email/types.ts`): TRANSACTIONAL, SECURITY, LEARNING,
ENGAGEMENT, REENGAGEMENT, CONVERSION, PAYMENT, CREATOR, DIGEST, MARKETING.

TRANSACTIONAL and SECURITY can never be suppressed by a preference —
`isAlwaysOn()` short-circuits `EmailPreferenceService.isEligible()` before
any DB read. Everything else is gated by `EmailPreference` (one row per
user, missing row = everything on — a schema change must never silently
opt existing users out of transactional mail, or silently spam pre-existing
users the moment it's added).

## Idempotency

Every send reserves a row in `email_logs` keyed by a unique
`idempotencyKey` **before** rendering or calling the provider
(`EmailLogService.reserve`). The uniqueness is a database constraint, not
an in-memory check — two workers racing on the same key end with one row
and one caught `P2002`. Recurring emails use `templateKey:userId:period`
(e.g. `learning.weekly-summary:u1:2026-09-14`); one-off emails use
`templateKey:entityId`.

## Scheduling & the abandoned-checkout sequence

`CheckoutIntentService.start()` is called once, when a real payment step is
reached (Stripe PaymentIntent creation) — not on course view or paywall
view (spec's "interest vs. intent" distinction). It immediately schedules
all 4 recovery jobs up front via `EmailJobRepository.enqueue()` with
increasing `dueAt`. Nothing polls open checkouts.

Before every send, `EmailJobProcessorService.processCheckoutAbandoned`
re-reads the `CheckoutIntent` row live and refuses to send if:
- `status !== 'STARTED'` (paid, cancelled, expired)
- `recoveryStoppedAt` is set (purchase, unsubscribe, manual stop)
- an equal-or-later stage was already sent (`recoveryStage >= stage`)

`CheckoutIntentService.markPaid()` is called from the `payment.completed`
listener and flips every open intent for that (user, course) to `PAID`,
cancelling all 4 pending jobs — this is the actual enforcement point for
"never email someone to complete a purchase they already completed."
Tested in `checkout-intent.service.spec.ts` and
`jobs/email-job-processor.service.spec.ts`.

Delays are configurable via env, not hardcoded:
`EMAIL_CHECKOUT_RECOVERY_STAGE_{1,2,3,4}_MIN` (see `checkout-intent.service.ts`).

## Unsubscribe / preferences

No DB table for unsubscribe tokens — they're stateless, HMAC-SHA256-signed
(`EmailUnsubscribeService`), scoped to a category (`ALL | MARKETING |
STREAK | DIGEST | LEAGUE | REENGAGEMENT`), 1-year TTL. `GET
/email/unsubscribe?token=...` and `GET /email/preferences?token=...`
(`EmailController`) need no login — the signed token is the auth. There is
no frontend page for this yet; the controller renders a minimal HTML page
directly. Building a real `/settings/emails` frontend page is a documented
follow-up.

## Provider & webhooks

`EmailProvider` interface + `ResendEmailProvider` — the rest of the system
never imports `resend` directly (verify with
`grep -rn "new Resend(" backend/src`, should return exactly one file).
`POST /email/webhooks/resend` verifies the Svix HMAC signature manually
(no `svix` npm dependency added) and updates `EmailLog` by
`providerMessageId` — every handler is a conditional `updateMany`, so a
redelivered webhook is a no-op.

## Environment safety

`EMAIL_MODE` (`production | staging | development`, defaults off
`NODE_ENV`). Outside production, every send is redirected to
`EMAIL_TEST_RECIPIENT` (or a `blackhole@teyro.app` fallback if unset), with
the real recipient prefixed onto the subject. See
`EmailDispatchService.resolveRecipient()`.

## How to add a new lifecycle email

1. Add the event to `EmailEvent` in `types.ts` if it doesn't exist.
2. Add a `TemplateMeta` entry to `templates/registry.ts` (`enabled: true`).
3. Write the template: a `render(data): RenderedEmail` function under
   `templates/<category>/`, built from `templates/shared.ts`'s
   `renderLayout`/`ctaButton`/`escapeHtml` primitives. Escape every
   user-supplied string.
4. Add a `case` to `EmailJobProcessorService.process()` that re-fetches
   fresh data and calls `this.dispatch.dispatch(...)`.
5. Emit the domain event from wherever it actually happens (an existing
   `EventEmitter2` is already injected in most services), and add an
   `@OnEvent(...)` handler in `EmailLifecycleListener` that calls
   `EmailJobRepository.enqueue()` — do the least possible work here; the
   processor re-fetches everything at send time.
6. If it needs a preference toggle, add a field to `EmailPreference`
   (migration) and wire it into `CATEGORY_TO_FIELD` in `email.controller.ts`
   and the `preferenceOptions` passed to `dispatch()`.

## Known limitations (deliberately not built this pass)

- **Two competing streak sources** (`StudentProfile.streakDays` vs.
  `UserLearningStreak.currentStreak`) exist in the schema; the email system
  reads `StudentProfile` (matches `streak.service.ts`'s canonical
  reconciliation). Worth resolving platform-wide, out of scope here.
- **Streak-at-risk and weekly digest** run at a fixed UTC hour, not per-user
  local time — Tey's push pipeline already has real per-user timezone logic
  (`tey/decision/rules/streak-at-risk.rule.ts`); reusing it here would
  couple this system to Tey's nudge cadence. Documented, not silently
  approximated as exact.
- **`security.email-changed`** and **`security.new-login`** templates exist
  but aren't wired — no change-email flow, and no IP/user-agent capture on
  login exists in `auth.service.ts` today.
- **`learning.level-up`**, **`learning.course-progress`**,
  **`learning.course-completed`** — no stored transition/event exists for
  any of these (level is derived on read, course completion has no event).
- **`learning.daily-reminder`** intentionally not built — it would overlap
  with Tey's existing push-nudge cadence rules and double-message the same
  moment.
- **Paystack does not exist in this codebase** (only Stripe + MeSomb) —
  the spec's Paystack references are not applicable here.
- **No subscription-renewal email** — `payment.pending`, `refund-initiated`
  are template-only; the current payment flows don't expose those as
  distinct notifiable states.
- **Creator course-review workflow emails** (`creator.course-approved`,
  etc.) are not wired — no listener exists on `CourseReviewStatus`
  transitions yet.
- **No admin UI** for email observability — `email_logs` has the data
  (status, provider, error, timestamps); a read-only `AdminEmailService`
  surfaced under `/admin` is a natural follow-up, not built this pass.
