# Teyro Pro + onboarding v3: launch checklist

Everything on `feat/onboarding-pro-rebuild` is built and committed locally, not pushed. This is what has to happen, in order, before Teyro Pro takes real money. Tick each box on the day.

**Who does what**
- **Founder:** Stripe dashboard steps, keys and secrets, the go/no-go calls marked *Decide*.
- **Claude:** code steps, and checking each step together on staging.

---

## 0. Decisions still open (*Decide* before launch)

- [x] **Founding Creators under Pro** (decided 2026-10-23): paid exactly like every creator, from the same 50% pool; they keep the Founding badge and founding benefits. All public and in-studio copy now describes the pool. Ship it the same day Pro goes live, because it no longer mentions per-course prices or 70/80%.
- [ ] **Refund policy wording**, for Stripe receipts and `/terms`.
- [ ] **Tax:** turn on Stripe Tax (or not) and choose where you're registered.

## 1. Keys and environments

- [ ] **Local dev uses TEST keys only.** Today `backend/.env` holds a `sk_live_` key and `frontend/.env.local` a live publishable key, while the database is staging.
  - Swap them for `sk_test_…` / `pk_test_…`.
  - The Pro client refuses a live key outside production, and the bootstrap refuses a live key without `--live`.
- [ ] **Staging (Render `teyro-backend-staging`, Vercel staging):** set these to test keys:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_PRO_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_STRIPE_KEY`
- [ ] **Production:** set the live values of the same three. Set them only on launch day, with step 5.

## 2. Stripe objects (bootstrap)

- [ ] **Test mode** (once per test account):
  ```bash
  cd backend && npx ts-node --transpile-only scripts/stripe-pro-bootstrap.ts
  ```
  It creates:
  - product `teyro_pro`;
  - prices `teyro_pro_monthly_usd_v1` ($12.99) and `teyro_pro_yearly_usd_v1` ($59.99);
  - coupon `teyro_pro_exit_y1_30_v1`;
  - the Billing Portal configuration.
- [ ] **Live mode**, on launch day:
  ```bash
  cd backend && npx ts-node --transpile-only scripts/stripe-pro-bootstrap.ts --live
  ```
- [ ] **Stripe dashboard → Settings → Payment methods:** register `teyro.app` for Apple Pay and Google Pay.
- [ ] **Stripe dashboard → Billing:**
  - turn on Smart Retries (failed renewals);
  - turn on customer emails for receipts;
  - turn off Stripe's own trial-ending emails (Teyro sends its own two days before).
- [ ] **Radar:** default rules on; consider blocking prepaid cards for trials.

## 3. Webhooks

- [ ] **Staging:** add an endpoint `https://upskiill-backend.onrender.com/pro/stripe/webhook` in **test** mode. Copy its signing secret into `STRIPE_PRO_WEBHOOK_SECRET`. Subscribe to:
  - `customer.subscription.*`
  - `invoice.paid`, `invoice.payment_failed`, `invoice.payment_action_required`, `invoice.upcoming`
  - `setup_intent.succeeded`, `setup_intent.setup_failed`
  - `charge.refunded`
  - `charge.dispute.*`
- [ ] **Production:** the same endpoint on `https://teyro-backend.onrender.com/pro/stripe/webhook` in **live** mode.
- [ ] **Unsigned events are rejected:** with the secret missing, the route answers 503. Check it once.

## 4. Database

- [ ] **Staging already has these** (the HQ queries ran against them on 2026-10-23):
  - `20261023090000_add_pro_enums`
  - `20261023090100_add_teyro_pro`
  - the onboarding events table
- [ ] **Production:** the "Deploy — Production" action runs `prisma migrate deploy`.
  - First run `npx prisma migrate status` against production and read the list. Other branches' migrations (certificates, revoked sessions) are in the same folder.
  - Additive only. Never `db push` or `migrate reset`.

## 5. Switches (environment variables)

| Variable | Staging | Production (launch day) | What it does |
|---|---|---|---|
| `PRO_ENABLED` | unset (on) | `true` | Pro gates lessons. Unset means on everywhere except production |
| `PRO_CRONS_ENABLED` | unset | unset | `false` pauses Pro maintenance jobs |
| `PRO_POOL_CRON` | `true` to test | `true` | Drafts last month's creator pool on the 8th |
| `PRO_POOL_SHARE_PCT` | `50` | `50` | Creators' share of each subscriber's net payment |
| `PRO_GRACE_DAYS` | `7` | `7` | Access kept after a failed renewal (none after a trial) |
| `PRO_FREE_DAILY_CAP` | `2` | `2` | Free lessons a day |
| `MESOMB_WEBHOOK_SECRET` | set | set | Mobile Money (prepaid Pro) confirmations |

While `PRO_ENABLED` is on, new per-course purchases return `PER_COURSE_RETIRED`. Existing course plans keep working until Pro is paid for.

## 6. Test it end to end on staging (test cards only)

Card numbers come from Stripe's test docs. Run `stripe listen --forward-to localhost:3001/pro/stripe/webhook` for local runs.

- [ ] **Onboarding:**
  - Fresh learner: taste lesson, chest, sign up, plan, paywall.
  - Start the 7-day trial with `4242 4242 4242 4242`. Check the paywall shows the exact charge date and amount.
- [ ] **Trial reminder:** use a Stripe test clock and advance 5 days. The email and push land between 48 and 24 hours before the charge.
- [ ] **Trial converts:** advance past day 7.
  - The invoice is paid and the subscription is ACTIVE.
  - HQ → Pro & payments shows MRR and the payment.
  - The learner's old course plan (if any) stops renewing.
- [ ] **Failed renewal:** `4000 0000 0000 0341`. The status goes past due, then grace, emails, update-card link, recovery.
- [ ] **3DS:** `4000 0027 6000 3184`. The action-required path works.
- [ ] **Decline at checkout:** `4000 0000 0000 0002`. A clear message, then retry.
- [ ] **Same card on a second account:** no second trial.
- [ ] **Close the paywall, choose "too expensive":**
  - The 30% first-year offer appears once, with a real 24h expiry.
  - Renewal is at full price.
- [ ] **Back out of the payment sheet:** the recovery screen appears.
- [ ] **Refund or dispute from the Stripe dashboard:** access ends and HQ shows it.
- [ ] **Mobile Money:** buy a prepaid month. Access runs to the end, then the renewal offer appears.
- [ ] **Free tier:**
  - 3rd lesson in a day: daily-limit paywall.
  - A lesson outside Chapter 1: locked paywall.
  - Hearts at zero: hearts paywall.
- [ ] **Creator pool:**
  - In HQ → Pro & payments, "Work out <month>" makes a draft with sensible totals.
  - "Post" puts the share into the creator's Studio earnings (Teyro Pro pool row, monthly section, bell + push).
  - Post a revision: only the difference is written.
- [ ] **Teyro HQ → Onboarding:** the funnel, screens, quit reasons and journeys look right with a real admin login.

## 7. Launch day, in order

1. Open decisions settled (section 0) and the teach-page copy updated to match.
2. Production keys and webhook secret set (sections 1 and 3).
3. Live bootstrap (section 2).
4. Deploy, then `PRO_ENABLED=true` and `PRO_POOL_CRON=true`.
5. Buy one real yearly plan yourself, check HQ, then refund it from Stripe and check access ends.
6. Watch HQ → Pro & payments and HQ → Onboarding for the first day.

## 8. Known gaps (not blockers, but know them)

- **Not tested with Stripe yet:** checkout, webhooks, the trial and renewals, because the keys here are live. Covered by unit tests and blocked on test keys (section 6 is the real proof).
- **Not tested on a real phone:** Apple Pay and Google Pay, and push on real devices.
- **Dev-only noise:** the dashboard has a dev-mode hydration warning from cached enrollments drawing before the server's empty render. It is harmless, but worth a follow-up.
- **Old v2 onboarding code:** still in the repo (`components/onboarding/screens/*`), routed to v3. Safe to delete later.
