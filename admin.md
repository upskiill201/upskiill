# Teyro Admin Center — Progress Summary

> Internal tracking doc, not user-facing. Last updated: 2026-09-11.
> Mirrors the phase plan the Admin Center build has followed since Phase 1.

---

## 1. Where we are

Three phases shipped: **Foundation**, **Users**, and **Courses (expanded into a full review & publication workflow)**. The Admin Center is a real, working internal tool today — not a mockup — covering user account management and the entire course lifecycle from draft to published, gated by Teyro's own review process.

**This is merged into `main`**, via PR #291 (`staging` → `main`). Confirmed by walking the actual commit graph, not assumed — `main`'s tip is a merge commit that already contains every admin commit through the course-review-workflow work.

**Live in production — confirmed 2026-09-11.** Checked the actual `Deploy — Production` GitHub Action run history (not assumed): all 4 admin migrations below (`add_admin_audit_log`, `add_course_featured`, `add_course_review_workflow`, `backfill_approved_for_live_courses`) were applied to the **production** Supabase instance in run `34509327749` on 2026-09-10T17:38 UTC — before this doc's last update. A further production deploy ran today at 2026-09-11T19:58:57Z (run `34641737652`, `workflow_dispatch`, success), 5 minutes after PR #291's merge commit landed on `main`, applying the WhatsApp webhooks migration — so production is now schema-current with everything in `main`, admin work included. Both `upskiill-backend.onrender.com` and `teyro-backend.onrender.com` answer `200` on `/health`; `/admin/summary` returns `401` (auth-guard, not a 500), consistent with working code against a matching schema. **Remaining, lower-stakes check:** nobody has yet logged into `teyro.app/admin` as a real admin to eyeball that Users/Courses actually render data end-to-end — the migration/deploy evidence makes this very likely fine, just not click-tested.

---

## 2. What's been accomplished

### Phase 1 — Admin Foundation
- New `backend/src/admin` module: `GET /admin/summary` (real platform counts — users by role/status, course counts, creator counts, payouts pending review). No fabricated metrics.
- `AdminShell` sidebar rebuilt: Overview + a "Tey" group (existing notification pages, routes unchanged) + a disabled "Soon" preview of the full planned IA (Users, Courses, Creators, Moderation, Payments, Payouts, Gamification, Shop & Rewards, Analytics, Content, Promotions, Platform, System Health, Audit Logs, Admins & Permissions).
- New shared primitives in `AdminUI.tsx`: `Modal`, `ConfirmDialog` (optional mandatory-reason field), `Pagination`, `PermissionGate`, `SearchInput` (debounced), `TabGroup`, `Button` (3D-pressed), `adminMutate` (write-side fetch helper that surfaces real backend error messages).
- Duolingo-inspired visual pass: thicker borders, bigger radii, "3D pressed" buttons, bolder type — matching the rest of the app's existing style language (`DuolingoButton3D`, dashboard pill CTAs) instead of a generic SaaS look.
- Fixed a pre-existing bug surfaced by this work: the public marketing header was rendering on top of `/admin` pages (`HeaderWrapper.tsx` never excluded `/admin`).

### Phase 2 — Users
- `AdminAuditLog` model — general-purpose admin audit trail (generalized from the earnings-only `EarningsAuditLog`), additive migration, already applied to the staging DB.
- `/admin/users`: search, role/status filters, pagination.
- `/admin/users/[id]`: Account, Learning, Recent activity, Coin & gem transactions, Administrative history.
- Actions: **Suspend** (mandatory reason, blocks self-suspension, blocks double-suspend), **Unsuspend**, **Unlock** (clears the automatic 5-failed-login-attempts lockout — a distinct, self-resolving state from Suspend, added after a follow-up question about what `LOCKED` meant).
- Deliberately **not built**: XP/coins/hearts/streak editing — the only existing shortcut for that (`grantTestReward`) is test-only and would desync `StudentProfile`/`UserStats`/`GemTransaction`. Flagged as deferred, not silently skipped.

### Phase 3 — Courses, expanded into a full Review & Publication Workflow
Originally shipped as a lighter course list/detail/publish/feature module, then explicitly expanded per a detailed follow-up spec into a complete pre-publication review gate:

- **New lifecycle**: `Course.reviewStatus` — `DRAFT → SUBMITTED → UNDER_REVIEW → {APPROVED | CHANGES_REQUESTED (resubmit loop) | REJECTED}` — kept separate from the existing `published` boolean (a course can be Approved-but-unpublished, or Published while a later edit quietly reopens it to Draft).
- **`CourseReviewService`** (standalone module, avoids a Course↔Lesson circular dependency): `submitForReview`, `startReview`, `requestChanges`, `approve`, `reject`, and an edit-lock guard (`assertEditableAndReopen`) wired into all course-structure and lesson-content mutation methods — refuses edits while actively under review, silently reopens an `APPROVED` course to `DRAFT` if edited afterward so a stale approval can never stay attached to changed content.
- **One shared readiness gate** (`course-readiness.util.ts`) used by both `submitForReview` and the existing `publishCourse` — no second, possibly-drifting definition of "ready to publish."
- **`publishCourse` now refuses any course that isn't `reviewStatus === 'APPROVED'`** — for admin-initiated publishes too, no bypass path. This is the actual security boundary, not a hidden frontend button.
- Reused the general `Notification` model (extended with an optional `deepLink`) for the seven review-event notifications — no second notification system built.
- **Backfill migration**: every course that was *already* published got grandfathered as `reviewStatus = APPROVED` — without this, the new gate would have permanently blocked every existing creator from ever republishing a course that predates the review system. Verified against real staging data (8/8 live courses correctly backfilled) before it shipped.
- Admin side: `/admin/courses` (review-status filter, oldest-submission-first review queue sort) and `/admin/courses/[id]` (full Review card — status, timestamps, state-aware Start Review / Approve / Request Changes / Reject actions, complete history, plus real module/lesson inspection).
- Creator side: the course wizard's "Publish Course" button became "Submit for Review"; the course-builder "manage" page gained a review-status banner with Teyro's feedback and a Submit/Resubmit action; the courses list's row action and status badge are now review-aware instead of a flat Publish/Draft toggle.
- 47 new backend tests covering the review lifecycle, the edit-lock/reopen guard, the publish gate, and the admin decision wrappers. 96 frontend tests unaffected. Full suite: **669 backend / 96 frontend, all passing**, both apps typecheck/lint/build clean.
- Deliberately **not built**: course Archive, approve/reject as a *moderation* system (no schema concept of it — that belongs to the future Moderation phase), reviewer assignment, SLAs, an internal-notes field in the admin UI (backend supports it, UI doesn't collect it yet).

### Incidental fixes along the way
- The header-leak bug (Phase 1, above).
- Diagnosed (not a code bug): after three rapid staging deploys in one session, a stale service worker got stuck controlling an already-open admin tab, serving old JS chunk references for the heavily-changed courses page and falling back to the app's own `/offline` screen — which looks exactly like a generic "This page couldn't load" error. Confirmed via Incognito test. Resolved by clearing the service worker / closing all tabs to the site, not a deploy.

---

## 3. Current state

- **Branch:** the admin work (`632674a` and everything before it) is merged into both `staging` and `main` (via PR #291). `staging` is currently 2 commits ahead of `main` — a WhatsApp connection panel added to the Admin Center by separate work, not part of this project's scope, merged as PR #292. No open PRs right now.
- **Live routes:** `/admin`, `/admin/users`, `/admin/users/[id]`, `/admin/courses`, `/admin/courses/[id]`, plus the pre-existing Tey pages (`/admin/rules`, `/admin/deliveries`, `/admin/queue`, `/admin/health`), plus (on `staging` only, not yet in `main`) a WhatsApp panel from unrelated work.
- **Database:** 4 additive migrations shipped this project (`add_admin_audit_log`, `add_course_featured`, `add_course_review_workflow`, `backfill_approved_for_live_courses`), confirmed applied to **both** staging and production Supabase instances — production confirmed via the `Deploy — Production` Action log, see §1.
- **Verification standard held throughout:** every phase — backend build/typecheck/lint/tests, frontend build/typecheck/lint/tests, production build route check, staging health check — before being reported done.
- **Resolved:** the "This page couldn't load" symptom on `/admin/courses` was a stale service worker stuck on an old build after several rapid staging deploys (confirmed via an Incognito test), not a code bug — cleared by unregistering the service worker / closing all site tabs.
- **Open item:** none blocking. Optional: click through `teyro.app/admin` as a real admin once to eyeball Users/Courses rendering live data (see §1).

---

## 4. Next steps

**Immediate:** none — the production-database question from §1 is settled (migrations confirmed applied, deploy confirmed run). Optional: a real-admin click-through of `teyro.app/admin` for peace of mind, but nothing is blocked on it.

**Phase 4 — Creators: shipped and live on staging as of 2026-09-11.** Merged via `feat/admin-phase4-creators` into `staging`; `Deploy — Staging` ran clean (no new migrations needed), backend `/admin/creators*` and frontend `/admin/creators` both confirmed responding correctly on staging.
- Backend: `backend/src/admin/admin-creators.service.ts` (new) — `GET /admin/creators/summary`, `GET /admin/creators`, `GET /admin/creators/:id`, `POST /admin/creators/:id/verify`, `POST /admin/creators/:id/unverify`. Wired into the existing `AdminController`/`AdminModule` (now imports `EarningsModule` to reuse `EarningsService#getAdminCreatorLedger` for the Earnings tab — no re-derived financial math).
- Frontend: `/admin/creators` (metrics + search + status/verification filters + sort + paginated table) and `/admin/creators/[id]` (account, creator profile, courses, earnings/payout history, creator activity, admin history). `AdminShell.tsx`'s "Creators" nav item promoted from `COMING_SOON` to live.
- **Suspend/unsuspend deliberately NOT reimplemented** — the creator detail page calls the existing `POST /admin/users/:id/suspend|unsuspend` endpoints directly. There is no separate creator-suspend concept; suspending a creator is suspending the underlying `User`.
- **Verify/unverify is genuinely new** — no mutation path existed for `InstructorProfile.verificationStatus` before this phase. Upserts the profile (seeding `displayName` from `User.fullName`) if a creator has never had one.
- **Featured Creator deliberately deferred** (user decision, 2026-09-11) — no `isFeatured`/`featuredAt`/`featuredBy` field exists anywhere in the schema (only the per-course `Course.featured` does), and there's no discovery surface yet to consume a creator-level flag. Revisit once one exists.
- **Also deferred, consistent with the spec's own scoping rules:** a dedicated paginated student roster (§16 — summary counts only, no learner list); performance trend charts (§15 — metrics shown, no time-series); a `/admin/payouts/[id]` deep link (§18 — that page doesn't exist yet, so payouts render inline instead).
- 8 new backend tests (`admin-creators.service.spec.ts`) covering verify/unverify guardrails and list-filter validation. Full suite: **731/731 backend** (one `tey-scheduler` test is flaky under full-suite ordering, confirmed pre-existing and unrelated — passes in isolation and on rerun), **96/96 frontend**, both apps typecheck/lint/build clean.
- **Not yet done:** manually click-tested by a real admin in a browser (live on staging, but no human has clicked through it yet).

**Phase 6 — Payments & Phase 7 — Payouts: implemented 2026-09-12 on `feat/admin-phase6-7-payments-payouts` (based on the Phase 4 branch), awaiting approval to merge into staging.**
- Backend: `admin-payments.service.ts` and `admin-payouts.service.ts` (both new) — `GET /admin/payments/overview`, `GET /admin/payments/transactions[/:id]`, `GET /admin/payouts/overview`, `GET /admin/payouts[/:id]`, `POST /admin/payouts/:id/{review,approve,reject,mark-paid,fail,cancel,reveal-method}`. Zero schema changes — everything (transaction ledger, payout state machine, threshold, audit log) already existed from the earlier Earnings/Payouts build; this phase is genuinely just an admin read/action surface on top of it.
- **No refund-initiation action was built** — confirmed via architecture audit that no code path anywhere calls a real provider refund API (Stripe or Mésomb); the only existing "refund" handling is reactive, recording the result of a refund issued through the Stripe Dashboard after its webhook fires. Per the phase spec's own rule ("do not build fake refund functionality"), Payments displays refund history but has no working Refund button. Flagged, not silently skipped.
- **Payout mutations are 100% pass-through** to `EarningsService#transitionPayout`, which already had race-safe locking, an explicit status-transition table, and full audit logging from the earlier Earnings work — this phase added zero new business logic there, only real search/pagination on top of `listAdminPayouts` (which was a flat unpaginated 200-row fetch).
- **Also discovered, flagged, and deliberately left alone:** `OrdersService.checkout()` — a separate MVP guest-checkout path — creates `Order`+`Enrollment` with no payment provider call and no `EarningsTransaction`, meaning any real purchase through that path today produces zero creator earnings. Not this phase's bug to fix silently; worth a dedicated look.
- Frontend: `/admin/payments` (date-range metrics, provider volume, recent transactions), `/admin/payments/transactions[/[id]]` (full ledger, search/filter/sort/paginate, detail with revenue allocation + refund chain + admin history), `/admin/payouts` (metrics + list) and `/admin/payouts/[id]` (detail, contextual status-based actions, an audited "reveal payout method" action). "Payments"/"Payouts" promoted from `COMING_SOON` to live nav.
- 16 new backend tests. Full suite: **746/746 backend**, **96/96 frontend**, both apps typecheck/lint/build clean; both new route trees confirmed emitted in the production build.
- **Not yet done:** merged into staging, deployed, or click-tested — awaiting approval (see the testing guide handed to the user alongside this update).

**Later phases, unstarted, roughly in the order the original master plan laid out:**
- Phase 5 — Moderation (central queue; currently only `Post.status` exists as a moderation primitive anywhere in the schema).
- Phase 8 — Gamification & Economy (XP/coins/hearts/shop config) — this is exactly the territory the Phase 2 XP-editing deferral flagged as needing a closer look at `StudentProfile`/`UserStats`/`GemTransaction` reconciliation before building on it safely.
- Phase 9 — Move the Tey notification pages from `/admin/rules` etc. to `/admin/tey/*` (deliberately deferred every phase so far to avoid route churn while everything else was still moving).
- Phase 10 — Analytics (DAU/WAU/MAU, retention, revenue — needs new aggregation infrastructure; nothing like this exists platform-wide today, only per-creator).
- Phase 11 — Content & Promotions.
- Phase 12 — Platform Settings.
- Phase 13 — System Health.
- Phase 14 — Audit Logs UI (the `AdminAuditLog` data already exists from Phase 2 — this phase is mostly a `/admin/audit-logs` browsing UI on top of it).
- Phase 15 — Admins & Permissions (real RBAC — today it's a single `ADMIN` role with no tiers; would need new schema).
- Phase 16 — Final hardening pass across everything above.

**Known deferred items to revisit, not forgotten:**
- XP/coins/hearts/streak admin editing (Phase 2) — needs the gamification reconciliation work first.
- Course Archive as a distinct state from Unpublish (Phase 3).
- Internal-note field in the admin review UI (backend-ready, no UI yet).
- Lesson Builder doesn't visually grey out inputs during active review — the save is still blocked server-side with a clear message, just no visual affordance yet.
