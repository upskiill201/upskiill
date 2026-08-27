# Creator Studio Audit — Progress & Status

> **Date:** 2026-08-26 · **Branch:** `fix/creator-security-hotfixes` (off `origin/staging` @ `6876d21`) · **Status:** ✅ Phases 1–5 COMPLETE (11 commits) — pushed, PR into `staging`
>
> Scope: the entire creator journey — creator onboarding (16 steps), creator auth, course creation wizard, curriculum builders, lesson builder, and the studio surface (dashboard, analytics, earnings, students, settings) — frontend and backend.

---

## 0. Status summary

### Where we are

**All five phases are DONE.** The Phase 5 tail landed as `ed683eb`: verification-email cooldown + double-fire guards, lessonType vocabulary aligned to what's actually authorable (video/text/audio; saves no longer corrupt legacy labels), resource-PATCH payloads unified, generation-guarded curriculum refetch (no more resurrected deletes), login-link escape hatch for abandoned signups + honest recovery-banner step names, history-sentinel back guard while dirty, payout methods made honest (per-type validation, SWIFT/routing captured, pending-confirmation instead of fake "Verified", USD-only labeled per product decision), and `resolveKey` now honors keyVersion for rotation. Currency decision locked: **label clearly, keep USD-only** — marketing copy alignment deferred to a content pass.

### What we've accomplished

- **The audit (2026-08-26):** ~90 ranked findings from five parallel deep-dives tracing FE → API → service → Prisma, plus a cross-cutting review (§1a; live findings reference in §3).
- **Phase 1 — Security hotfixes** (`8b99feb`, `b202373`, `6002689`, `5855989`): closed every privilege-escalation path found (switchRole allowlist, ADMIN stripped at signup/firebase DTO+service, `email_verified` enforced before account linking), lesson PATCH mass assignment, unauthenticated avatar/thumbnail uploads, and committed secret fallbacks (prod now fails fast without `JWT_SECRET`/`EARNINGS_ENC_KEY`).
- **Phase 2 — Money correctness** (`0025cb4`): refunds/disputes fan out across ALL sale rows of a multi-course charge (proportional allocation, per-row caps, replay-safe dedupe refs; dispute-won restores every row); payout cancel/approve race closed with guarded conditional writes under the same lock; CSV exports iterate real pages instead of silently truncating at 100 rows.
- **Phase 3 — Lesson-builder data-loss UX** (`b048d44`): 409 conflicts surfaced via an actionable banner (Keep my changes / Load saved version) instead of silent last-write-wins auto-retry; failed saves can no longer fake "Saved" or disarm the close-guard, interval autosave, and offline flush (the old code adopted the server version *on failure*); Save&Exit and step navigation only proceed when the save succeeded; SPA link navigation guarded while dirty; first route-level `error.tsx` in the repo.
- **Regression coverage:** earnings suite grown to 20 specs (multi-course reversal, allocation dust invariant, dispute-won restore-all, race guards, full-pagination CSV); frontend typechecks and production-builds clean.

### Current state

| Item | State |
|---|---|
| Branch | `fix/creator-security-hotfixes` — 7 commits ahead of `origin/staging` @ `6876d21`, **local only, not pushed, no PR** |
| Verification (Phase 4) | Backend build ✅ · auth suite 32/32 (+6 new), full backend 229/238 (same 9 pre-existing `orders`/`payment` failures as pristine base) · frontend `tsc --noEmit` ✅ + `next build` ✅ |
| Migration gate | ⚠️ `20260826120000_profile_biggest_challenge_jsonb` must reach staging/prod via `prisma migrate deploy` (hand-authored per workaround; additive, all-NULL column) |
| Parallel work | ⚠️ Merge-conflict zones with the uncommitted student-audit worktree (`feat/onboarding-challenge-real-rewards`): `auth.service/firebaseSignIn`, verify-email role routing (their B3 ≈ our `/verify-email` page), students.service.spec tsc fixes. Whichever merges second reconciles |
| Open findings | All 🟡 Mediums; ⚪ Lows — plus Highs #4/#5/#6/#7/#8/#10 deferred into the Phase 5 sweep order below (H2/H9 done Phase 1, H1/H3/H11 done Phases 3–4) |

### Next steps

1. ~~Push + PR~~ deferred by decision — all phases land locally first, then one push/PR into `staging`.
2. ~~Phase 4 — Onboarding persistence + verification repair~~ ✅ DONE 2026-08-26.
3. **Phase 5 — Mediums sweep** (agreed order in §4; diff against parallel student branch first).
4. **Cleanup pass** — delete legacy flows/dead components/codemod scripts; align CLAUDE.md with reality (cookie name, session-exchange endpoint, presign location); triage the pre-existing `orders`/`payment`/`proxy` test debt so real regressions stay visible.

## 1. What we've accomplished

### 1a. The audit (2026-08-26)

- **Five parallel deep audits** covering every layer of the creator flow, each tracing frontend → API → service → Prisma end-to-end:
  1. Creator onboarding (FE steps 1–16 + shell + `backend/src/creator-onboarding`)
  2. Creator auth (signup/login/reset/verify pages + `backend/src/auth` lifecycle)
  3. Course creation wizard + curriculum builders + `backend/src/course`
  4. Lesson builder (all components + sync queue + S3 upload pipeline + `backend/src/lesson`)
  5. Studio dashboard, analytics, earnings/money, students, settings (+ payment webhook paths)
- Plus a **cross-cutting review** (route protection middleware, upload routes, role switching, repo hygiene).
- **~90 findings total**, ranked by severity. Top findings hand-verified against source before reporting.
- Question resolved: **there is no duplicate `backend/src/courses` module** — only `backend/src/course`. The real duplication problem is *frontend*: three builder generations writing the same rows.
- Audit outcome saved to persistent memory (`teyro-creator-studio-audit-2026-08`) so future sessions know the defects and fix progress.

### 1b. Fixes shipped — commit-by-commit

| Commit | What it closed |
|---|---|
| `8b99feb` | **C1** `switchRole` allowlist (STUDENT↔INSTRUCTOR only, case-obfuscation rejected) · **C2** ADMIN stripped from signup/firebase role inputs at DTO (`@IsIn` → 400) *and* service layers · **C3** `email_verified === true` enforced before any email-based account linking; business rejections pass through unwrapped instead of being disguised as "Invalid Firebase Token" · committed JWT fallback removed from strategy/module/service |
| `b202373` | **C4** lesson PATCH mass assignment: explicit field allowlist replaces `...restFields` spread (`status='published'` bypass, XP/version tampering, cross-course theft all impossible); writes bump optimistic-lock `version`, matching lesson.service semantics |
| `6002689` | Boot fails fast when production lacks `JWT_SECRET`/`EARNINGS_ENC_KEY`; second guard inside `crypto.util.resolveKey` so earnings crypto can never run on the dev key |
| `5855989` | **C5** avatar/thumbnail upload routes verify sessions via new shared `frontend/lib/server-session.ts` (backend stays single source of truth — same trust model as existing `verifyLessonOwnership`); S3 keys scoped under `avatars/<uid>/…`, `thumbnails/<uid>/…` |
| `0025cb4` | **M1** refund/dispute reversal fans out across ALL sale rows of a multi-course charge (proportional allocation, per-row caps, deterministic dedupe refs; dispute-won restores every CHARGEBACK row) · **M2** `cancelOwnPayout` guarded conditional write under the payout lock + from-status guard on `transitionPayout` (kills double-payout race) · **M3** CSV export iterates real pages instead of silently truncating at 100 rows |
| `b048d44` | **M4** lesson-builder data-loss cluster: 409s surfaced via Keep-my-changes / Load-saved-version banner instead of stale-payload auto-retry; failed saves no longer call `adoptServerVersion()` (which cleared `isDirty` → fake "Saved", disarmed close-guard/autosave/offline-flush); Save&Exit & next-step navigate only on success; new `useLinkNavigationGuard` blocks in-app link nav while dirty; first repo `error.tsx` under `[lessonId]/` |
| `2bb7cbc` | **H1** magic links doubly dead → fixed: link carries the RAW code to the new app-origin `/verify-email` page, which POSTs `/auth/verify-link` through the proxied route (first-party cookie, throttled 10/15min, click-gated so scanner prefetches can't consume tokens); the double-hash and API-origin-cookie defects are both structurally gone; legacy GET survives as redirect shim · **H3** onboarding persistence: `biggestChallenge` multi-select array vs `String?` column made hydration throw & get swallowed (every email-path answer lost) → column widened to `Json?` via additive migration + legacy-string normalization; `/auth/firebase` no longer drops the payload (hydrates new/just-upgraded creators only — never clobbers existing creators' settings edits); link-account branch now sets the session cookie; draft-sync module deleted (GET/PUT: zero callers + unauthenticated arbitrary-ID read/write; POST minted orphan rows forever) |

## 2. Current state — verification detail

- Hotfix branch `fix/creator-security-hotfixes` cut from `origin/staging` (`6876d21`, the exact audited code state). `main` is 117 commits stale vs staging, so staging is the correct base + PR target. Unrelated WIP checkpointed on `feat/onboarding-challenge-real-rewards` @ `757314a`. Audit docs left untracked so they follow branch switches.
- Verification: backend `npm run build` clean; frontend `npx tsc --noEmit` + `next build` clean; full backend suite **229/238** (was 213/222 pre-Phase-2, 223/232 post-Phase-3 — the +17 are our regression tests). The 9 failures (`orders.service.spec`, `payment.service.spec`) plus 8 frontend `proxy.test.ts` failures are **pre-existing**, verified identical on pristine `6876d21` via stash. Not caused by our changes.
- ⚠️ Deploy note: Render/Vercel must have `JWT_SECRET` + `EARNINGS_ENC_KEY` set in production env vars before this merges to prod, or boot now fails by design. Migration `20260826120000_profile_biggest_challenge_jsonb` rides `prisma migrate deploy`.
- ⚠️ Parallel-branch overlap (student audit, uncommitted in `.claude/worktrees/onboarding-rewards` on `feat/onboarding-challenge-real-rewards`): expect merge conflicts in `firebaseSignIn`, verify-email role routing (their B3 vs our `/verify-email` page), and `students.service.spec` tsc fixes — their branch also already covers several of our Phase 5 Mediums (strict ValidationPipe rollout, check-email/verify-code throttles, CSPRNG codes). Re-check §5 Mediums against their diff before re-fixing.
- Everything not explicitly marked ✅ FIXED in §3 remains **open**.

## 3. Findings summary

### 🔴 Critical — Security
| # | Issue | Location | Status |
|---|---|---|---|
| C1 | Self-promotion to ADMIN via `/auth/switch-role` (only INSTRUCTOR/STUDENT blocked) | `backend/src/auth/auth.service.ts:655-680` | ✅ FIXED `8b99feb` |
| C2 | Client-chosen role accepted at signup & `/auth/firebase` (`@IsEnum(Role)` allows ADMIN) | `backend/src/auth/dto/signup.dto.ts:26`, `auth.controller.ts:29` | ✅ FIXED `8b99feb` |
| C3 | Firebase account takeover — `email_verified` never checked, email claim trusted | `auth.service.ts:517-561` | ✅ FIXED `8b99feb` |
| C4 | Mass assignment on `PATCH /courses/lessons/:id` (`whitelist:false` + `...restFields` spread) → publish bypass, XP tampering, cross-course lesson theft; never bumps `version` | `main.ts:50-56`, `course.service.ts:1852-1866` | ✅ FIXED `b202373` |
| C5 | Unauthenticated uploads: avatar route writes to prod S3; thumbnail route signs anonymous presigned PUTs | `frontend/app/api/upload/avatar/route.ts`, `frontend/app/api/upload/thumbnail/route.ts:21-65` | ✅ FIXED `5855989` |

### 🔴 Critical — Money & data loss
| # | Issue | Location | Status |
|---|---|---|---|
| M1 | Multi-course refunds reverse only ONE ledger row → creators keep refunded money | `earnings.service.ts:253-371` (also `recordDisputeOpened`) | ✅ FIXED `0025cb4` |
| M2 | `cancelOwnPayout` race → double payout (unconditional status overwrite) | `earnings.service.ts:966-990` | ✅ FIXED `0025cb4` |
| M3 | CSV export silently clamped to 100 rows despite requesting 5000 | `earnings.service.ts:725` vs `:1146` | ✅ FIXED `0025cb4` |
| M4 | Lesson-builder silent data loss cluster: failed save shown as "Saved" (disarms close-guard + autosave); Save&Exit navigates on failure; 409 auto-retries stale payload = last-write-wins | `useSyncQueue.ts:97-147,189-209`, `lesson-builder/[lessonId]/page.tsx:448-482` | ✅ FIXED `b048d44` |

### 🟠 High
1. ~~Email verification magic link doubly broken~~ ✅ FIXED `2bb7cbc` — raw-code link → app-origin page → throttled exchange; cookie lands first-party
2. ~~JWT secret fallback committed in source~~ ✅ FIXED `8b99feb`/`6002689` · `auth.service.ts:633`
3. ~~Onboarding answers mostly never persist~~ ✅ FIXED `2bb7cbc` — array/JSONB fix, firebase forwarding, link-branch cookie
4. Stored XSS from creator rich text to students (unsanitized Quill HTML) · `app/learn/[id]/section/[sectionIndex]/page.tsx:1038-1047`
5. Publish gates exist only in UI (server checks modules/lessons only); Step 4 publishes stale unsaved edits; courses-list dropdown skips checklist · `course.service.ts:1425-1453`, `Step4PreviewPublish.tsx:112-224`
6. No Course-level optimistic locking; three UIs wholesale-PATCH same row, last-write-wins · schema (Course lacks `version`), `builder/[id]/page.tsx:394-461`, `manage/page.tsx:102-129`
7. Deleting modules/lessons on live courses cascades away student progress · `course.service.ts:1764-1884`
8. Signup "link existing account" = password oracle, no lockout · `auth.service.ts:36-101`
9. ~~`EARNINGS_ENC_KEY` committed dev fallback, no prod fail-fast~~ ✅ FIXED `6002689` · `crypto.util.ts:22`
10. Privacy controls unenforced: `profileVisibility` ignored publicly; 4 toggles read by nothing; fabricated "Founding Creator" card for everyone · `settings/page.tsx:1374-1453`, `profile.service.ts:321-533`
11. ~~SPA nav loses unsaved lesson edits; partial autosave failure still shows "Saved"~~ ✅ FIXED `b048d44` — link nav guarded while dirty, failures surface instead of faking "Saved" · browser back/forward remains unguarded → tracked with "history inversion" in Phase 5 flow bugs

### 🟡 Medium (grouped)
- **UI lies:** `_count.enrolments` typo → student counts always 0 (`app/creator/page.tsx:77`) · "Who is this course for?" never persisted behind green "Saved!" · module duration/difficulty collected then dropped · fake "Auto-saved 2 min ago" badge · `rating || 5.0` invented metrics · hardcoded "DRAFT"/"0min" header · notification bell hardcoded `3` · preview toggle doesn't control access (server force-frees first two lessons).
- **Money/PII:** payout methods auto-marked verified, no routing/SWIFT captured, validation = length ≥ 6 · USD-only ledger vs XAF mobile-money marketing · key-version rotation ignored by `resolveKey`.
- **Scale:** students endpoints rebuild all progress rows in memory per request · public slug-fallback scans 2000 users per miss · draft rows accumulate forever, no throttle on creation.
- **Security hygiene:** ValidationPipe `whitelist:false` repo-wide · enumeration oracles (`check-email`, resend-verification) · `/auth/verify-code` brute-forceable · tokens returned in JSON alongside cookie · `/earnings` missing RolesGuard · public `/courses/:id/plans` leaks drafts · ~~creator-onboarding drafts take `@Body() any`, no auth/ownership~~ ✅ module deleted `2bb7cbc`. *(Note: strict-pipe rollout + check-email/verify-code throttles already exist on the parallel student branch — reconcile at merge instead of re-fixing.)*
- **Flow bugs:** Enter-key double-submit duplicates modules/lessons AND spams verification emails until IP throttle · first "Save & Continue" creates course but stays on step 1 · save navigates forward even when it fails · manage page permanent skeleton on load error · publish errors swallowed in courses list · recovery banner dead-end after signup abandonment · browser-history back/forward inversion · duplicates lose resources/subtitle/goals · negative prices accepted end-to-end · `lessonType` enum drift · resource-PATCH divergence between two components · optimistic delete/restore race.

### ⚪ Low / hygiene
Three generations of onboarding components (legacy mock live at `/creator-onboarding-test`) · 10 dead lesson-builder components · ~18 codemod scripts (`fix-*.js`, `verify_*.py`) in frontend root · two near-duplicate optional-JWT guards · pricing-engine duplicated FE/BE · emoji/raw-SVG/fa6 icon violations · hardcoded hex inline styles · unsanitized `dangerouslySetInnerHTML` previews · missing reduced-motion guards · no `/api/v1` prefix anywhere (CLAUDE.md hard stop unimplemented repo-wide) · CLAUDE.md says cookie `auth_token`, code uses `access_token` (**doc drift — do not "fix" proxy.ts**).

### ✅ Verified solid (do not break while fixing)
httpOnly cookie discipline (zero localStorage tokens) · login lockout + password-reset crypto · ownership scoping across analytics/students/course mutations (except C4 vector) · direct-to-S3 multipart upload pipeline · append-only integer ledger + verified Stripe/MeSomb webhooks · audited admin-only payout-detail reveal · exemplary Loading/Error/Empty states in analytics/students · server-authoritative XP/time · correct UTC date math · onboarding step numbering is 1:1 correct.

## 4. Next steps (agreed attack order)

### ✅ Phase 1 — Security hotfixes — DONE 2026-08-26
All six items landed and verified (commits + notes in §1b). Remaining follow-on from this phase: push `fix/creator-security-hotfixes`, open PR into `staging`.

### ✅ Phase 2 — Money correctness — DONE 2026-08-26
All three items landed in one commit (`0025cb4`) with 20/20 earnings specs passing:
- **M1** — refund/dispute reversal fans out across ALL matched SALE/RENEWAL rows (proportional largest-remainder allocation, per-row debits capped at each row's credit, deterministic dedupe refs `re_<id>:<saleId>`); `recordDisputeWon` now restores every CHARGEBACK row, legacy bare-`dp_` refs still matched. Per-row gross now consistent with debits; requested amount kept in metadata.
- **M2** — `cancelOwnPayout` is a status-guarded `updateMany` under the same user lock the admin state machine takes; `transitionPayout` write is also conditional on the status it validated against (concurrency → loud `409`, never blind overwrite).
- **M3** — CSV export iterates real pages of 100 until `total` covered instead of asking for a page size that gets clamped.

### ✅ Phase 3 — Lesson-builder conflict & data-loss UX — DONE 2026-08-26
Landed as one commit (`b048d44`); tsc + `next build` clean, eslint delta vs baseline = +1 file-idiomatic `any`, −1 warning:
- **409s surfaced, not auto-retried** — useSyncQueue reports `conflict` status and `{ok, conflict}`; the stale-payload silent last-write-wins retry is gone. Exported `resyncVersion()` (version-only adoption, never clears dirty) + new `clearLocalBackups()`.
- **Failed saves never disarm guards** — the worst bug: manual save & publish 409 branches called `adoptServerVersion()` ON FAILURE → cleared `isDirty`, footer said "Saved", close-guard + interval autosave + offline flush all silently disarmed. Now an actionable banner: **Keep my changes** (adopt server counter → explicit re-save) / **Load saved version** (confirm-discard → reload server state as snapshot baseline via shared `applyLoadedLesson` + `pendingBaselineRef`).
- **Failure-aware navigation** — Save & Exit, Save & Continue, and next-step advance only when the save actually succeeded.
- **SPA nav guard** — new `useLinkNavigationGuard` intercepts `<a>` clicks capture-phase while dirty/saving (covers sidebar lesson switches + breadcrumbs). beforeunload already existed. Browser back/forward remains unguarded (app-router history can't be aborted safely) — folded into the existing "history inversion" Phase 5 item.
- **First `error.tsx` in repo** under `[lessonId]/` — render crashes show recoverable screen instead of white-out.

### ✅ Phase 4 — Onboarding persistence + verification repair — DONE 2026-08-26
Landed as one commit (`2bb7cbc`); backend build + frontend tsc/next-build clean, auth suite 32/32 (+6 specs):
- **biggestChallenge type mismatch** — Profile column `String?` → `Json?` (additive migration `20260826120000_profile_biggest_challenge_jsonb`, hand-authored SQL + rollback comment per workaround; column provably all-NULL since the throw predated any write). `hydrateFromOnboarding` normalizes legacy bare strings to arrays. Also fixed adjacent drift: `launchGoal` now reads the key the shell actually saves (`courseFormat`).
- **Firebase onboarding forwarding** — controller passes `dto.onboarding` into `firebaseSignIn`; service hydrates when the account just gained creator access (new user or upgrade). Explicitly does NOT re-hydrate existing creators (stale localStorage would clobber settings-page edits). DTO gains `@IsObject`.
- **Link-account cookie** — signup sets the session cookie whenever its result carries an access_token (the verified link branch); unverified paths still return none.
- **Magic-link repair** — email builds `${APP_URL}/verify-email?token=<raw code>` (single-hash contract restored; resend path too). New app-origin `/verify-email` page: click-gated confirm (scanner-prefetch safe), POSTs new throttled `/auth/verify-link` through the proxied route → first-party cookie → role-aware redirect (INSTRUCTOR → onboarding/16, else dashboard). Old `GET /auth/verify-email` kept as redirect shim for stale emails. Note: audit's "\v template bug" description didn't match current source — the real defects were double-hash + API-origin URL + wrong-domain cookie, all covered.
- **Draft-sync removal** — backend `creator-onboarding` module deleted (controller/service/module + app.module refs); shell's step-1 POST and `saveDraftId` removed; lib type for step7 corrected to `string[]`. Draft linking in auth.service kept as guarded no-op for stale payloads; Prisma model untouched (no destructive migration).

### Phase 5 — Mediums sweep — 5a/5b/5c DONE 2026-08-26, tail remains
Landed in three commits:
- **5a `248746d` — UI lies + endpoint hygiene:** `enrolments` typo (student counts were always 0) · invented ratings (5.0/4.9) now real-or-hidden/"New" · hardcoded bell "3" badge removed · manage header real publish state, fake "0min video" gone · dead lesson-builder Header.tsx (fake "Auto-saved 2 min ago") deleted · `/earnings/*` behind INSTRUCTOR/ADMIN RolesGuard · `/courses/:id/plans` filters published (draft price leak) · negative/non-finite prices rejected in updateCourse · `minPrice=abc` no longer 500s · raw JWTs stripped from all auth JSON responses (cookie is the only transport; FE never read the JSON token).
- **5b `b5bc633` — perf:** StudentsService shares a 60s promise-cache of the roster context per creator (page load used to rebuild the whole dataset + all progress rows 4–6×); slug fallback for public creator profiles pushed into Postgres (was: fetch 2000 users per miss, and blind beyond that cap).
- **5c `130e82e` — flow bugs:** Save & Continue advances only on success AND new courses no longer stay stranded on step 1 · module/lesson modal double-Enter duplicate lock · courses-list publish/unpublish surfaces the server's real rejection reason + alerts on network failure · manage page gets a retry error screen instead of eternal skeleton · duplicateCourse copies shortDescription/xpReward/resources/steps+contents (duplicates lost their 4-phase content before).

### ✅ Phase 5 tail — DONE 2026-08-26 (`ed683eb`)
All nine items closed:
- [x] Verification-email spam — 60s mint-cooldown in `resendVerification` + double-fire guards (step 15, Google button, verify-code entry)
- [x] `lessonType` enum drift — picker trimmed to authorable video/text/audio; 'interactive' card removed (backend coerced it to video); saves preserve legacy labels via loaded-type ref
- [x] Resource-PATCH divergence — LearningResources now sends sizeBytes like DeepenTab
- [x] Optimistic delete/restore race — generation guard on curriculum refetch
- [x] Recovery banner dead-end — "log in instead" link on signup 409 for existing verified accounts; banner step names match current flow
- [x] Browser back/forward while dirty — history sentinel: first Back asks, second confirmed press leaves, saving consumes the sentinel
- [x] Payout methods — per-type validation, SWIFT/routing into the encrypted blob's reserved slot, pending-confirmation instead of auto-verified, payout gate dropped from that flag (admin review is the control)
- [x] keyVersion rotation honored by `resolveKey` (EARNINGS_ENC_KEY_V\<n\> contract)
- [x] USD vs XAF — **product decision locked:** label clearly, keep USD-only; marketing copy alignment deferred to a content pass

Deferred to merge with student branch (already fixed there): strict ValidationPipe rollout, check-email/verify-code throttles + brute-force caps, CSPRNG codes.

## 5. Notes / decisions pending

- ~~Whether Phase 1 lands as its own branch~~ **Resolved:** `fix/creator-security-hotfixes` off `origin/staging` (not `main` — staging is the live lineage and PR target). PR → `staging`, then rides the staging→main promotion. Not pushed yet.
- Decide fate of legacy flows: `/creator-onboarding-test`, `components/features/creator-onboarding*`, 10 dead lesson-builder components, codemod scripts — recommend deletion PR after hotfixes.
- CLAUDE.md updates needed: cookie name (`access_token`), real session-exchange endpoint, actual upload-presign location — align docs with reality so future agents don't "correct" working code.
- Pre-existing test debt found during verification (unrelated to audit): `orders.service.spec` + `payment.service.spec` (9 tests) fail on clean `6876d21`; frontend `proxy.test.ts` (8 tests) same. Worth a cleanup pass so real regressions stay visible.
