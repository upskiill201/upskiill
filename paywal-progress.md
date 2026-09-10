# Teyro Paywall & Payments — Progress

> Snapshot: 2026-08-25, end of session · branch `staging` · companion to the approved plan in `.claude/plans/eager-yawning-valley.md`

---

## Where we are (TL;DR)

The course paywall has gone through three waves of work, and **Wave 3 is now fully built and verified**:

1. **Wave 1 (shipped):** `CoursePaywallModal` redesigned into a Duolingo "Super"-style sheet + unlock-flow hardening.
2. **Wave 2 (shipped):** Fixed the Stripe `"Not a valid URL"` checkout failure on both client and server.
3. **Wave 3 (shipped & verified):** The modal is **gone** — replaced by a full-page, stepped-scene Duolingo unlock experience at `/learn/[id]/unlock` (celebrate → wall → plans), and Mobile Money expanded from Cameroon-only to **13 countries** via MeSomb. All automated gates are green (backend jest/tsc, frontend tsc/eslint/build), the first **manual QA round happened**: 3 layout bugs were found, fixed, and re-verified.

**Remaining:** finish manual QA against live payment rails, fill env secrets, confirm MeSomb operators on the dashboard, and **commit the work** (everything is still uncommitted on `staging`).

---

## Accomplished — Waves 1–2 (shipped earlier)

| Item | Files | State |
|---|---|---|
| Modal redesign (plan rows, benefit carousel, gold 3D CTA, a11y) | `frontend/components/features/course-paywall/*` | ✅ |
| Shared post-payment polling hook (timer-leak fix, StrictMode-safe) | `frontend/hooks/usePostPaymentUnlock.ts` | ✅ |
| USD→XAF display helper | `frontend/lib/currency.ts`, `app/checkout/page.tsx` | ✅ |
| Stripe "Not a valid URL" fix — client sends absolute return URLs | modal `handleSubscribe` | ✅ |
| Stripe fix — server-side sanitizer + open-redirect guard | `backend/src/payment/return-url.util.ts` | ✅ 7/7 tests |
| Provider default-URL fallback chain honors `APP_URL` | `stripe.provider.ts` | ✅ |
| Pre-existing payment spec DI failure repaired | `payment.service.spec.ts` | ✅ |

---

## Accomplished — Wave 3 backend: 13-country MeSomb (verified 2026-08-25)

| File | Contents |
|---|---|
| `backend/src/payment/mesomb-countries.ts` | Registry of 13 markets (CM CG GA BF BJ CI SN CD KE RW UG ZM SL): dial codes, currencies, phone rules, operators (verified vs unverified flags). Helpers: `getMesombCountry`, `getDefaultMesombCountry`, `assertServiceForCountry`, `normalizeNationalNumber`, `fxRateFor` (env-overridable), `localAmountFromUsd` (ceil — never undercharge) |
| `mesomb-countries.spec.ts` | 13 unit tests (FX overrides, dial/trunk stripping, strict CM prefix) — ✅ green |
| `providers/mesomb.provider.ts` | Registry-driven country/currency/amount/service/phone validation; SDK exception mapping (InvalidClient→400 fixable · ServiceNotFound→503 "try another operator" · PermissionDenied→503); PENDING keeps real `response.reference`; `getAccountCountries()` (10-min TTL, 800ms timeout, null-safe); prod warns if `MESOMB_WEBHOOK_SECRET` missing |
| `payment.controller.ts` | `POST subscribe` accepts `country`; JWT-guarded `GET mesomb/config`; legacy `mesomb/collect` country passthrough; `mesomb/webhook` now passes `req.body` Buffer + `X-MeSomb-Webhook-Signature` header (rawBody:true already on in main.ts) |
| `payment.service.ts` | `assertDatabaseReachable()` maps Prisma P1001/P1002 → friendly 503 ("Payment rails are warming up…"); `grantCourseAccessWithRetry()` (3 attempts) + CRITICAL log + honest 503 when money is collected but grant fails; `getMesombConfig()` (registry ∩ account countries / env override); webhook converts using the `{ccy, rate}` FX snapshot embedded at collect time (legacy refs still ÷600 XAF); **webhook auth rewritten to MeSomb's documented scheme** — `verifyMesombSignature()` validates `X-MeSomb-Webhook-Signature: t=<ts>,v1=<hex>` = HMAC-SHA256(`MESOMB_WEBHOOK_SECRET`, `"<ts>.<rawBody>"`), ±300s replay window, timing-safe compare, 503 when the secret is unset (previously a plain `x-webhook-secret` string compare that would have rejected every real MeSomb callback) |
| `interfaces/payment-provider.interface.ts` | `country?: string` on `CreateSubscriptionInput` |

**Verification:** `npx jest src/payment` → **3 suites / 30 tests passed** (24 prior + 6 new webhook-signature tests: wrong secret, tampered body, stale timestamp, malformed header, unset secret, happy path) · `tsc --noEmit` → only the pre-existing unrelated spec errors (auth/students) · MeSomb account verified live via `backend/scripts/mesomb-account-check.mjs` (all 13 countries supported).

### Live local verification (2026-08-25, local backend + real secret)

| Probe | Result |
|---|---|
| Signed webhook → `/payment/mesomb/webhook` | ✅ 201 `{"received":true}`, grant attempted (junk user fails gracefully, claim released) |
| Unsigned webhook | ✅ 400 rejected |
| Wrong-secret signature | ✅ 400 rejected with diagnostic message |
| Stripe webhook, garbage signature | ✅ 400 rejected (was **500 crash** before the rawBody fix — live Stripe webhooks were silently broken) |

**Two critical corrections found by this pass:**
1. **Route shape:** the backend has **NO `/api/v1` global prefix** (despite CLAUDE.md §5) — the Next.js rewrite maps `/api/*` → `${backend}/:path*`, so the real MeSomb endpoint URL is `https://teyro-backend.onrender.com/payment/mesomb/webhook` (staging: `upskiill-backend...`). If the dashboard endpoint was registered with `/api/v1/`, fix it there.
2. **rawBody bug (both providers):** with `rawBody: true` (main.ts), `req.body` is the *parsed object* — only `req.rawBody` holds the exact signed bytes. The MeSomb controller now passes `req.rawBody` (HMAC over a parsed object could never match), and the **Stripe controller had the same latent bug** (`req.body as Buffer` → `constructEvent` 500 on every real webhook); both fixed with a `req.rawBody ??` fallback.

---

## Accomplished — Wave 3 frontend: full-page unlock journey (shipped 2026-08-25)

| Layer | Files | Notes |
|---|---|---|
| Shared libs | `lib/mesomb-countries.client.ts` (static registry mirror), `hooks/useMesombConfig.ts` (stale-while-revalidate, module cache, never gates render), `lib/momo-phone.ts`, `lib/fx-rates.ts` (`formatLocalFromUsd`, ceil-matches server; literal `NEXT_PUBLIC_FX_*` reads — dynamic keys don't inline), `lib/return-to.ts` (`sanitizeReturnTo`, `buildUnlockHref`) | ✅ |
| Carousel prop | `BenefitCarousel.tsx` gains `autoAdvanceMs?: number \| null` (default 6000); plans scene passes `null` | ✅ |
| Hook extraction | `usePostPaymentUnlock.ts` → exported `usePollCourseAccess`; `enabled` is stable per mount (lint rule `set-state-in-effect`); restarts = remount with a key | ✅ |
| Scenes | `components/features/course-unlock/`: `JourneySceneShell` (onboarding spring 320/32/0.9), `SceneCelebrate` (real-progress nodes ≤9 circles + "+K" compress + pulsing frontier, mini confetti burst), `SceneWall` (art-directed Tey_thinking + gate card), `ScenePlans` (PlanRow ladder · Card\|MoMo rail · picker+phone+local amount · autoplay-off carousel · trust bar/footer dock), `CountryOperatorPicker` (text-only select + radio chips, disabled = "coming soon"), `PhoneField` (dial chip + a11y errors), `WaitingForApproval` (keyed PollWatcher ~3s×20, NEVER confetti), `SuccessBeat` (single-shot win sound + confetti → sanitized redirect), shared `unlock.module.css` | ✅ |
| Page | `app/learn/[id]/unlock/page.tsx`: DashboardLayout `isWide hideMobileChrome`, lazy-captured `returnTo`/`payment` BEFORE URL cleanup, cancelled→starts at plans, hasAccess→instant success beat, price≤0 guard, 401 login shell, absolute Stripe URLs carrying returnTo | ✅ |
| Rewire + delete | Both locked branches on `/learn/[id]` and section 403 → `router.push(buildUnlockHref(...))`; `CoursePaywallModal.tsx` + `.module.css` DELETED, zero code refs (`PlanRow`/`BenefitCarousel`/`valueProps` kept in place) | ✅ |

---

## QA round 1 (user, 2026-08-25) — 3 issues found → all fixed & re-verified

| # | Symptom | Root cause | Fix |
|---|---|---|---|
| 1 | Celebrate "Keep going" CTA clipped on desktop, gone on mobile | `.stage` used `min-height: 100dvh` inside DashboardLayout's immersive content box, which is *shorter* than 100dvh on desktop (`.content` padding 40px) and *taller* than the visual viewport on mobile (legacy `min-height: 100vh` beats `height: 100dvh` when browser chrome shows). Parent `overflow: hidden` clipped the dock. | Stage sizes to parent: `height: 100%` + `max-height: 100dvh`, no `min-height`. Scroll area above shrinks; docked CTA pinned visible at any height. Same fix for loading/error shells. |
| 2 | Wall "Unlock the rest of the course" missing on mobile | Same root cause as #1 | Same fix |
| 3 | Plans scene on desktop: dead void on the left where a mascot should be | No companion column existed | Desktop-only (≥1024px) `plansAside`: `Tey_thinking_desktop.webp` + one-line note left of the form; `display:none` below 1024px so mobile unchanged |

> ⚠️ **Layout gotcha for ANY future full-page takeover inside DashboardLayout** (`hideMobileChrome`): the parent `.immersiveContent` is `height:100dvh; overflow:hidden` but `.content` keeps `min-height:100vh` + padding. Never use `min-height:100dvh` on the page root — use `height:100%; max-height:100dvh` and let inner scroll areas shrink. Docked CTAs must be `flex: 0 0 auto` last children.

---

## QA round 2 (user, 2026-08-25) — 2 issue classes → all fixed & re-verified

**A. Mobile CTA invisibility (celebrate/wall/plans).** Headless-Chromium measurement of the exact CSS chain (`.dashboardContainer → .main → .content.immersiveContent → .stage → … → .sceneDock`) at 393×852 proved the *current* rules already pin the dock on-screen in every honest viewport (incl. simulated `100vh` floor > viewport and font-boosted tall content) — the screenshots most likely came from a stale dev bundle (dev server was down at the time). Two real holes were closed anyway, either of which reproduces the symptom on real devices:
1. **No `100vh` fallback before any `100dvh`** — on browsers without dynamic-viewport units the `dvh` declarations are *dropped entirely*, so `.immersiveContent` kept its `min-height:100vh` floor (largest-viewport height) and `.stage` had **no max-height at all** → dock pushed below the fold and clipped by `overflow:hidden`. Fixed: `height/max-height: 100vh; 100dvh` pairs in `.immersiveContent` (base + ≤768px), `.stage`, `.centerShell`; `.immersiveContent` now also resets `min-height: 0`.
2. **Flex items lacked explicit `min-height: 0`** — `.sceneViewport/.slidePane/.sceneScroll` now declare it so the scroll area always absorbs overflow instead of pushing the dock.

**B. Mascot distortion + tiny desktop mascot.** All four unlock mascots had `width`/`height` attrs that broke the assets' intrinsic ratios (Next/Image letterboxes via CSS `height:auto`, but the attrs set a wrong box): `Step_7_tey_verified_state.webp` is **670×1176 full-bleed portrait** (was forced into 110×110 / 140×140 → squashed ~40%); `Tey_thinking_desktop.webp` is **800×533 landscape with the robot in only ~30% of the canvas** (aside rendered him ~80×150px — the "too small" report). Fixes:
- `SceneCelebrate`: 110×**193**; desktop bump to 150px wide (≥768px).
- `SceneWall`: dropped the `<picture>` desktop swap to the landscape asset (stretched + 70% padding); uses the 800×1200 portrait at 180×**270** everywhere.
- `ScenePlans` aside: swapped to the full-bleed portrait at 230×**403** (`clamp(190px, 16vw, 240px)`) — robot now reads ~400px tall on desktop.
- `SuccessBeat`: 140×**246**.

**Verification:** harness screenshots at 393×852 & 1440×900 show the dock pinned and the chain resolving exactly (stage = viewport − padding); `tsc --noEmit` clean; eslint clean on all touched files (1 pre-existing error in `dashboard/layout.tsx` `fetchMe` effect, untouched); production build ✓ with `/learn/[id]/unlock` emitted.

---

## Current state of verification

| Check | Status |
|---|---|
| Backend `src/payment` jest | ✅ 3 suites / 24 tests passed |
| Backend `tsc --noEmit` | ✅ only the 5 pre-existing unrelated spec errors |
| Frontend `tsc --noEmit` | ✅ clean |
| Frontend eslint (all unlock-flow files) | ✅ clean (1 pre-existing `set-state-in-effect` error in `dashboard/layout.tsx`, untouched) |
| Frontend production build | ✅ success, `/learn/[id]/unlock` emitted (re-built after QA round 2) |
| Orphan grep (`CoursePaywallModal`) | ✅ zero code references |
| Manual QA — layout | ✅ round 1 (3 fixes) + round 2 (dvh fallbacks, min-height resets, 4 mascot ratio fixes); chain verified by headless measurement + screenshots at 393×852 / 1440×900 |
| Manual QA — payment rails | ⏳ Stripe sandbox `4242…` round-trip · MoMo PENDING → late approval · reduced-motion |
| Git | ⏳ **nothing committed yet** — all Wave 3 work sits uncommitted on `staging` |

## Next steps (ordered)

1. ▶️ **Restart the dev server + hard-refresh, then re-check the scenes** (`npm run dev` in `/frontend`). QA round 2 proved the chain on disk pins the CTA at every honest viewport — if the button is still missing after a fresh server + cache-bypassing reload (Ctrl+Shift+R), the next suspect is the device-frame emulation overlay, so also try the device toolbar *without* "Show device frame" or a real phone via `npm run dev -- -H 0.0.0.0`.
2. **Commit the Wave 3 work** (backend + frontend; everything is verified). Suggest: one commit for the 13-country MeSomb backend, one for the unlock journey + modal deletion + QA-round-1/2 fixes — or a single cohesive commit if preferred.
3. **Finish payment-rails QA:** Stripe sandbox round-trip (returns land on `/unlock?payment=success` → polls → success beat → redirect to `returnTo`), MeSomb test-mode ACTIVE inline celebrate, PENDING → late approval flips via poll, reduced-motion pass.
4. **Fill env vars** (below) in backend `.env` / Render dashboard and frontend `.env.local`.
5. **MeSomb dashboard check:** confirm operator codes beyond `MTN/ORANGE/AIRTEL` (e.g. KE `MPESA`, CD `VODACOM`); correct guesses in the two registry files (one-line edits each).
6. **Deploy:** push `staging` → verify on staging URLs → PR to `main` (production deploy via manual GitHub Action).

## Needs from you / external

- **✅ MeSomb account verified programmatically (2026-08-25)** — `node scripts/mesomb-account-check.mjs` (new read-only helper in `backend/scripts/`) hit `getStatus()` with the keys already in `backend/.env`: account **"Teyro"** is live and active, and it reports **all 13 registry countries supported** (CM KE RW UG CI BJ SN SL BF CG ZM GA CD — exact match, no country corrections needed). Notes: `allow_deposit_api: false` (disbursements disabled — irrelevant, we only collect); settlement float shows MTN/CM/XAF only. Keys are therefore **valid production keys** — treat local `.env` accordingly.
- **Env vars still to fill:**
  - Backend: ~~`MESOMB_WEBHOOK_SECRET`~~ ✅ **set locally (2026-08-25)** — MeSomb endpoint signing secret pasted into `backend/.env`; verification is armed (fail-closed). **Still needed: the same variable in the Render dashboard** (staging + prod services — local `.env` does not deploy), and confirm the registered endpoint URL points at the Render backend, not localhost (MeSomb can't reach a dev machine). Optional: `MESOMB_DEFAULT_COUNTRY=CM` · `MESOMB_ACCOUNT_COUNTRIES=` · `FX_USD_TO_*` (commented out in `.env`; if you override any backend rate you MUST mirror `NEXT_PUBLIC_FX_USD_TO_*` in `frontend/.env.local` + Vercel or displayed ≠ charged).
  - **Zero-money webhook QA tool:** `backend/scripts/mesomb-webhook-simulate.mjs` signs a SUCCESS payload with the local secret and POSTs it to a deployed webhook URL — verifies delivery + signature (+ grant path with a real userId/courseId) without moving money. Keys are LIVE: any real collect is real money (cheapest rung = weekly plan).
- **Operator codes still to confirm** (the account status doesn't list per-country services): guesses flagged `verified: false` — MOOV (CG GA BF BJ CI), CELTIS (BJ), WAVE (CI SN), FREE (SN), VODACOM (CD), MPESA (KE), TELKOM (KE), AFRICELL (CD SL), ZAMTEL (ZM). Check the MeSomb dashboard's services page (or a 1-unit sandbox collect), then fix code/label/`verified` in BOTH registries (`backend/src/payment/mesomb-countries.ts` + `frontend/lib/mesomb-countries.client.ts`). Wrong guesses degrade gracefully (503 "try another operator"), so this is confirmation, not a blocker.
- **DB incident root cause:** staging Supabase was unreachable at that moment; TCP probe now succeeds → transient/paused free-tier project. If it recurs, restore the project in the Supabase dashboard or point local `DATABASE_URL` elsewhere. Code now degrades to a friendly 503 regardless.
- **Staging backend note:** Render free plan suspension (see memory) blocks staging-rails QA until monthly reset or upgrade — local dev servers work fine for QA in the meantime.
