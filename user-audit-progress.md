# Student Journey Audit — Progress Summary

> **Status as of 2026-08-26, second push:** all fixes implemented and pushed to `staging` (`6876d21..466ae2e`). Backend `tsc` clean · **jest 259/259** · frontend `tsc` clean.
>
> **E2E result:** onboarding journey passed end-to-end in a real browser (signup → verify → dashboard). Two follow-up fix rounds came out of it, both committed and pushed:
>
> 1. **Settlement atomicity (real payout-loss bug, `89fa4a7`)** — DB asserts on the fresh test account caught the challenge reward never landing: old code stamped the claim settled *then* paid in a separate transaction; a Supabase pooler drop mid-payout left it stamped-but-unpaid forever (swallowed error, no retry path). Stamp + payout now commit in one transaction via shared `payoutWithinTx`; failed attempts stay unstamped so authenticated syncs retry. 4 new spec cases. Also made the MeSomb "unconfigured → 503" specs hermetic (Prisma's runtime loads `backend/.env`, which leaked a locally-configured secret into them).
> 2. **Honest dashboard empty states (`466ae2e`)** — brand-new user saw a hardcoded fake course ("Figma UI/UX Essentials", fake `/25` lessons, fake 8%) in CurrentQuestCard and a phantom 3-day streak from GamificationContext's pre-fetch default. Card now shows a GET STARTED empty state routing to /courses; streak defaults are 0 (server truth).
>
> **Skipped (user-approved):** live browser double-payout proof of the atomic settlement (authenticated replay of `challenge-complete/anonymous`). Rationale: the failure mode was reproduced and root-caused live via DB asserts + server log, the fix is structural (single-transaction stamp+pay) and covered by the new spec cases including idempotency; only the one-account live confirmation was skipped. Test account `donkoge77@gmail.com` remains settled-but-unpaid by the OLD code path (its claim was un-stamped during repair attempts; ledger shows no ONBOARDING_CHALLENGE row) — its next authenticated onboarding-answer sync will settle it under the new code, or it can simply be ignored as test data.
>
> Earlier context: first push `6876d21..5917711` carried the deferred-reward feature, hardening pass, and verify-code DTO fix; live smoke verified claim issuance, SHA-256-at-rest, throttles, strict validation.

---

## 1. What This Is

End-to-end audit of the **student side** of Teyro — onboarding → WhatsApp/email verification → signup → dashboard/lesson player → gamification & celebrations — followed by an approved fix plan covering every bug, security hole, flow break, and standards violation found (2×P0, 10×P1, P2 tail).

## 2. Product Decisions Locked (user-approved)

| Question | Decision |
|---|---|
| Step 9 reward fires before signup exists | **Celebrate now, pay at signup** — celebration plays immediately against a server-recorded single-use claim; XP/coins settle when the account appears |
| Placeholder challenge/trophy map nodes | **Keep visible as "Coming soon"**, clicks get honest toast feedback, lock-matching fixed to stable IDs |
| Streak freeze semantics | **Duolingo parity** — one freeze protects one missed day |

## 3. ✅ What We Accomplished

### Phase A — the two P0s

**A1. Deferred Step 9 challenge reward ("celebrate now, pay at signup")** — COMPLETE, backend + frontend
- New `OnboardingChallengeClaim` model + additive migration (`20260826090000_add_onboarding_challenge_claims`) with rollback comments.
- `user-onboarding.service.ts`: idempotent payout core (`payoutChallengeRewardOnce`, guarded by the existing partial unique index), `issueAnonymousClaim()` (32-byte token, SHA-256-at-rest, 30-day TTL, WhatsApp-phone secondary key only when server-proven), atomic single-use `settlePendingChallengeReward()`, and `applyPreSignupAnswers()` hooked into every authenticated session sync.
- New public endpoint `POST /challenge-complete/anonymous` (`OptionalJwtAuthGuard`, 5-per-15-min IP throttle): authenticated callers pay immediately; anonymous get `{status:'PENDING_SIGNUP', claimToken}`.
- All three signup paths settle pending proofs: email `signup()` (new students AND accounts linking student access), `firebaseSignIn()` (previously dropped `onboarding` entirely), and the standalone `/signup` page (both email & Google buttons now forward localStorage answers).
- Frontend: Step 9 posts the anonymous endpoint with the proven Step 6 number; on `PENDING_SIGNUP` it persists `claimToken` inside the step-9 answer (ref-protected — `saveStepAnswer` replaces whole answers), skips balance sync, and ClaimScene renders *"Saved! Credited the moment you create your account."* under the balance row instead of implying an account total exists.
- B3 rode along: verify-email link routes by role (STUDENT → `/dashboard`, INSTRUCTOR → `/creator/onboarding/16`).

**A2. JWT fallback secret killed** — COMPLETE
- `getJwtSecret()` throws at boot when `JWT_SECRET` is unset; wired into `jwt.strategy.ts`, JwtModule registration, and `signToken`. Zero hardcoded fallbacks remain.

### Phase B — all ten P1s

| # | Fix | Status |
|---|---|---|
| B1 | Verify-code brute-force cap: migration adds `User.verifyAttempts`; lookup by email only; dummy-bcrypt on unknown email; ≥5 misses void the code; `timingSafeEqual` compare; atomic miss increment; success resets counter | ✅ |
| B2 | Cross-device resume: empty-localStorage devices await the server session (≤4s) before any step-guard redirect; StrictMode-safe shared-fetch ref (double-mount no longer skips the guard) | ✅ |
| B3 | Verify-email role routing | ✅ (in A1) |
| B4 | One level curve: client formula deleted from `GamificationContext`; server values trusted (defaults L1 / xp%100 pre-fetch) | ✅ |
| B5 | Section chest replays the server-computed `sectionCompletion` payload (stashed per-section at completion); trophy/chest map nodes open the same scene; fake "+100 XP / +50 coins" modal gone; claimed state persisted locally, no replay | ✅ |
| B6 | Challenge/trophy nodes: visible "COMING SOON"/honest toasts; locks use positional stable IDs, not collision-prone title matching | ✅ |
| B7 | My Learning real counts: enrollment endpoint returns per-course lesson totals via ONE grouped query (no N+1); page drops hardcoded "/ 25" | ✅ |
| B8 | Streak-freeze Duolingo parity: gap of N missed days consumes min(N, bank); streak survives only if bank covers the whole gap — partial banks never burn; 5-case spec matrix | ✅ |
| B9 | Auth hygiene: CSPRNG codes everywhere (`crypto.randomInt` for email + WhatsApp OTP); WhatsApp attempts via conditional atomic `updateMany`; login-miss dummy compare; signup compares passwords only on paths that use the result (timing oracle removed) | ✅ |

Plus controller hardening: `verify-code` 10/min, `check-email` 20/min (existence oracle capped), `reset-password` typed DTO + proper 4xx.

### Phase C — standards & polish (~90%)

- ✅ **DOMPurify**: all FOUR `dangerouslySetInnerHTML` sites sanitized (the learn-article body was completely raw before). `cleanHtml` kept only for plain-text contexts, with a comment documenting why its decode-after-strip order must never feed innerHTML.
- ✅ **Strict ValidationPipe enabled** (`whitelist + forbidNonWhitelisted`) after sweeping every DTO'd payload: signup/login/firebase/reset/challenge-complete/checkout/send+verify-otp/profile/community/lesson-builder. Found & fixed a real landmine first — creator settings sends nested entries carrying client-side `id`s, so the profile DTO's nested Inputs now accept optional `id` (otherwise every settings save would 400). Webhooks use raw `@Req` bodies / `@Body('prop')` extraction → unaffected.
- ✅ Dead "Download all" button removed; legacy `OnboardingContext`/`OnboardingOrchestrator` deleted (zero imports verified).
- ✅ Currency emoji violations fixed (💎→`/Icons/gem.png`, 🪙→`/Icons/Coin.png`); CLAUDE.md §5 documents the unversioned-API deviation honestly; §6 cookie name corrected (`access_token`).
- ✅ Step 6 dev-code chip (tap-to-autofill) when the backend sends `devCode` — EXPOSE_DEV_OTP builds only.
- ⬜ Remaining decorative emojis in map badges/toasts (🚀🏆🔓🔒🎉) — deliberately deferred: they're part of a designed node-theming feature (`defaultEmojis` + color map) that deserves a visual pass, not a blind swap.

### Repaired along the way (pre-existing breakage)
- `students.service.spec.ts` stale type errors (×3); `auth.service.spec.ts` missing DI mock + JWT_SECRET; `orders.service.spec.ts` missing EventEmitter2 (broken since `6876d21`); course-spec stale `mockResolvedValueOnce` queue poisoning subsequent tests.

## 4. 📌 Current State

**Verification done:**
- Backend: `tsc --noEmit` clean; **jest 255/255 across 21 suites**, including new coverage for verify-code attempt caps, freeze-parity matrix, enrollment totals (+ no-N+1 assert), and atomic OTP attempts.
- Frontend: `tsc --noEmit` clean (with dompurify installed).
- Both new migrations reviewed: additive-only SQL with rollback comments.
- Prisma client regenerated (note: worktree `node_modules` is a junction to the main checkout — generate EPERMs while the other session runs dev servers; retry when idle).

**Verification NOT yet done (the remaining gap):**
- Live backend boot smoke and the manual fresh-browser E2E journey. Blocked by environment setup, not code: copy `.env` from the main checkout into worktree `backend/` (gitignored, never copied), run `prisma migrate deploy` for the two new migrations, then run the journey locally (:3000/:3001). Render staging is suspended (free plan) — local-only until upgraded.

**Where the work lives:** uncommitted edits in the worktree on top of `757314a`. Nothing pushed; nothing merged. The parallel creator-audit session continues independently on `fix/creator-security-hotfixes` in the main checkout.

## 5. ▶️ Next Steps (in order)

1. **Commit the worktree state** — ~29 files across both apps plus 2 migrations. Suggested split: `feat(onboarding): deferred challenge reward + signup settlement` (schema/migrations/user-onboarding/auth/signup pages) then `feat(student): verification hardening, freeze parity, chest celebrations, strict validation` — or one checkpoint commit if speed matters more than review granularity.
2. **Environment gate:** copy `.env` → worktree `backend/`, `npx prisma migrate deploy` (never `db push`), boot both apps locally.
3. **Manual E2E (fresh browser profile):**
   - Onboarding 1→15: Step 6 verify *and* skip paths; Step 9 → PENDING celebration with pendingCaption, token persisted.
   - Signup via email link (lands student on `/dashboard`) and Google path → DB asserts: `onboarding_challenge_claims.settled_by_user_id` set, exactly one ONBOARDING_CHALLENGE `gem_transaction`, profile +25/+25.
   - Replay/repeat-signup pays nothing extra; authenticated Step 9 revisit pays once.
   - Cross-device resume via cookie copy → resumes at furthest step.
   - Lesson completion: streak day-roll, freeze matrix, repeat-lesson zero-reward; section chest plays server numbers once.
   - My Learning totals; `check-email`/`verify-code` throttle headers; strict-validation smoke of creator settings save + lesson builder autosave (loud 400s = stragglers to fix).
4. **After E2E passes:** PR to `main` per workflow (no direct pushes); staging smoke post-upgrade when Render is paid.
5. **Follow-ups logged for later:** decorative emoji sweep; global `/api/v1` prefix migration (documented deviation); brute-force capping for the GET verify-email LINK token (same 10^6 space as codes, currently uncapped — flagged during B1, out of plan scope); intermittent `P1001 Can't reach database` from the Supabase pooler surfaces as occasional 500s on dashboard stat cards (`GET /v2/progress/stats-summary`) — infra-level fix needed (paid plan / pooling config), frontend cards already surface honest error states; `JourneyPathMap` still receives hardcoded `totalLessons={25}` and a fabricated mission number from `dashboard/page.tsx:106-164` when there is no enrollment (same phantom-data family as CurrentQuestCard, needs its own pass).

## 6. Verified-Good Foundations (unchanged, worth keeping)

- WhatsApp OTP service: hashed codes, cooldowns/windows, attempt locks, replay-safe anonymous proof + atomic claim in `reconcileWhatsappVerification` (now joined by its challenge-reward sibling).
- `completeLesson`: single transaction, re-read idempotency, timezone-aware streaks, server-computed `sectionCompletion` payload.
- Celebration Engine architecture (queue + dedupeKeys + server-first CLAIM scenes) — the deferred-reward design rides exactly this pattern.

## 7. Open Questions

- None blocking. (Original Qs resolved: reward shape, node visibility, freeze semantics.)
