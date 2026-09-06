# Tey Personality Audit — Progress Tracker

> Phase 1 committed on `perf/speed-optimization-pass` (commit `8861262`) and pushed live to `staging`.
> Phase 2 committed on `perf/speed-optimization-pass` and pushed live to `staging` — see §Phase 2 below.
> Full plan: `C:\Users\HP\.claude\plans\i-want-you-to-sparkling-sunbeam.md`
> Last updated: 2026-09-06.

---

## 📌 Where We Are (the 30-second read)

The ask: make Tey (the mascot) feel like a character reacting to the learner, not a system printing notifications — across celebrations, leaderboard, shop, streaks, achievements, and more. An audit (3 parallel codebase explorations) found the personality work already existed in two separate, mature, unconnected places — the leaderboard's `teyMessages.ts` pool and a full backend push-notification engine (`backend/src/tey/`) — while almost everything else in the Celebration Engine had a single fixed string and, in several cases, **no mascot at all**.

**Scope was deliberately split into phases** (confirmed with the user): this pass covers the **Celebration Engine core gaps** plus two small, high-leverage, unrelated fixes (a notification-bell bug, shop error reason-codes). Shop Engine's own scenes, Lucky Spin, onboarding voice, empty/error states, and the offline page are explicitly **deferred** to follow-up passes — not forgotten, just not built yet.

**Status in one line:** Phase 1 is implemented, live-verified (Level-up scene confirmed end-to-end by the user), committed, and pushed to `staging` — it should be live wherever staging auto-deploys to. Most of the manual verification checklist is still open, and Phase 2/3 haven't been scoped yet.

---

## ✅ What We've Accomplished

### 1. Audited the whole app for Tey's voice (3 parallel explorations)

Found two independent, mature "pool of Tey lines, don't repeat the last one" systems already in the codebase, plus a backend personality engine nobody was seeing:

| System | What it is |
|---|---|
| `frontend/lib/leaderboard/teyMessages.ts` | Full rotating pools per leaderboard/league event, wired into `LeaderboardScene`/`LeagueScene` via a `teyLine` field. The most mature pre-existing pattern — this pass's reference implementation. |
| `backend/src/tey/` | A complete push/in-app nudge engine: `tey-personality.ts` (the canonical character spec — mischievous, teases the streak/task, never the learner), `message-templates.ts` (deterministic variant pools, including the exact passive-aggressive-when-inactive tone requested: `streakAtRiskTeasing`, `inactiveReturn`). Already well-written — but its bell-rendered copy was being silently masked (see #4). |
| `frontend/hooks/onboarding/useMessagePool.ts` + `HeraldStreakReveal.tsx`'s inline pool | Two smaller, weaker variants of the same idea, in a different voice register. Left alone this pass — flagged for the deferred "onboarding voice reconciliation" phase. |

Everywhere else — Achievement, Level-up, XP/Claim, Chest, Section-complete, Section-unlocked, Course-progress, Course-complete — had one hardcoded string and no pooling, and Achievement/Chest/Claim/Course-progress had **zero mascot presence**.

### 2. Built one shared Tey voice module instead of a 4th/5th copy of the pooling logic

- New `frontend/lib/tey/pool.ts` — the pick-random-non-repeating helper, extracted from `teyMessages.ts` so every domain shares it.
- `teyMessages.ts` refactored onto it (pure refactor, zero behavior change).
- New domain pool files, each tiered by magnitude/context per the spec's "small win / big win / huge" framing:
  `streakVoice.ts`, `xpClaimVoice.ts`, `levelUpVoice.ts`, `achievementVoice.ts`, `chestVoice.ts`, `milestoneVoice.ts`, `shopVoice.ts`.

### 3. Wired Tey into every Celebration Engine scene that was silent

- **Achievement** — gained a mascot + speech bubble (previously had neither), tiered by max-tier vs. normal unlock.
- **Level-up** — gained a speech bubble (previously silent), tiered by milestone levels (every 5th).
- **Claim/XP** — pooled title tiered by XP magnitude, still overridable by callers (Daily Reward, Lucky Spin keep their own titles).
- **Chest** — mischievous pre-open copy ("Hmm… should we open it? 😈") + a mascot that didn't exist before, rarity-reactive reveal line.
- **Streak** — the one fixed line per mode replaced with pools tiered by day-count milestones (7/14/21/30/50/100…).
- **Section-complete / Course-complete** — added speech bubbles next to mascots that were already there but silent.
- **Course-progress / Section-unlocked** — gained mascot + reacting copy where there was previously none at all.
- **Leaderboard / League** — extended the existing `teyLine` pattern to the **subhead** too (it was always a fixed ternary even when the headline varied).

### 4. Fixed the notification-bell override bug

`frontend/lib/notificationCopy.tsx` was unconditionally preferring a flat generic fallback over the real, personality-flavored body the backend's Tey engine already writes — meaning none of that copy (including the passive-aggressive inactivity nudges) ever reached the bell UI. Now `TEY_*` rows prefer their real `body`, falling back only when one is missing.

### 5. Added Tey voice to Shop's blocked-reason/error copy, with a small additive backend change

- `backend/src/shop/shop.service.ts` now sends a machine-readable `code` (`INSUFFICIENT_COINS`, `HEARTS_FULL`, `FREEZE_BANK_FULL`, `AT_MAX`, `ALREADY_OWNED`, `LOCKED`, `GRANTED_BY_COLLECTION`) alongside every existing plain-text `blockedReason`/exception `message` — additive, nothing that reads `.message` today breaks.
- Frontend `ShopError` now carries that `code`; a new `shopVoice.ts` pool renders a Tey-flavored line by code, **falling back to the raw backend message** for anything not covered (the near-impossible states weren't worth a personality pass).
- Wired into `ShopItemCard.tsx`'s blocked-reason display and the purchase/claim failure toasts in the shop page.

### 6. Verified without touching the UI yet

- `tsc --noEmit` clean on both frontend and backend (two pre-existing, unrelated spec-file errors confirmed via `git stash` to already exist on the base commit).
- Full `next build` succeeded across all 381+ routes.
- ESLint run against every touched file: zero new issues. A handful of `react-hooks/refs` errors surfaced from a stricter rule the project's actual build doesn't gate on — all confirmed pre-existing via `git stash` diff, except the pattern this pass **did** introduce (reading `ref.current` during render), which was corrected everywhere to match the codebase's own established idiom: lazy `useState(() => ...)` initializers (the same pattern already used for `settled`/`showBadge` in `LeaderboardScene.tsx`/`LeagueScene.tsx`).

### 7. Live-tested, found and fixed a real gap, fixed two environment hiccups

- **Real bug found**: the everyday "finish a lesson" path (`frontend/app/(app)/learn/[id]/section/[sectionIndex]/page.tsx:775`) hardcoded `title: 'Lesson complete!'` on every completion — overriding the new XP pool by design (the same override exists so Daily Reward/Lucky Spin keep their own custom titles), so the highest-frequency celebration in the app never actually showed the new copy. Removed the hardcode; `pickClaimTitle`'s pool now fires on real lesson completions. Confirmed no other real production call site has the same issue (Achievement/Level-up/Streak's real triggers were already clean — only dev-test-bench buttons hardcode overrides, which is expected/fine).
- **Environment hiccup #1**: the dev-only "Dev Test Bench" widget (`RewardRunTestWidget.tsx`, dashboard page item #9) needs `NEXT_PUBLIC_ENVIRONMENT=development` to render — wasn't set locally. Briefly added it to `.env.local`, but it also has to load through the app's service-worker/PWA caching layer, which was serving a stale bundle mismatched against the freshly-toggled flag and threw a hydration error on `/dashboard`. **Reverted** the env var — not needed to verify the actual work, since production code paths (real lesson completion, a level-up console-dispatch, real chest opens) exercise the same scenes without it.
- **Environment hiccup #2**: backend process restarted/crashed independently mid-session (unrelated to this branch's diff) causing a transient "progress could not be saved" error — resolved once the backend came back up.
- **Verified live**: dispatching the real `teyro:level-up` window event from the browser console showed the new pooled headline **and** a speech bubble that didn't exist before, confirmed by the user. Real lesson completions after the fix are expected to show the new `CLAIM` pool (not yet independently re-confirmed post-fix).

### 8. Committed and shipped to staging

- Final verification pass before committing: `tsc --noEmit` clean (frontend + backend), `nest build` clean, full `next build` clean across every route.
- Staged and committed exactly the 31 files belonging to this work — deliberately excluding two things sitting untracked/modified in the same working directory that belong to a **different, concurrently-running session**: an in-progress fix to `AnimatedRankList.tsx` and that session's own `leaderboard_community_engine_progress.md`. Neither was touched.
- Commit `8861262` — `feat(celebration): give Tey a consistent voice across the Celebration Engine` — pushed to `perf/speed-optimization-pass`.
- `staging` was confirmed to be at the exact same prior commit as `perf/speed-optimization-pass` (a clean ancestor, so a pure fast-forward), so it was updated directly via `git push origin perf/speed-optimization-pass:staging` — deliberately avoiding a local `git checkout staging`, which would have disrupted the other session's in-progress, uncommitted work in this same checkout. No force-push, no merge commit, both branches confirmed aligned at `8861262` afterward.

---

## Phase 2 — Shop Engine scenes, Lucky Spin dedup, Mystery Chest card, Hearts popover

Scoped and implemented in this pass (uncommitted). Research first (an Explore agent mapped all four areas against the codebase — file paths, exact hardcoded lines, and which queue system each goes through), then wired one domain at a time following the exact `ChestScene.tsx` reference pattern (lazy `useState(() => pick...())` so a re-render never rerolls the line mid-read, `CelebrationMascot` + `TypewriterBubble` for anything that's a full scene).

1. **Shop Engine's own 4 scenes** (`frontend/components/shop-engine/scenes/{PurchaseSuccessScene,ItemUnlockedScene,ChestRevealScene,CollectionCompleteScene}.tsx`) — none had a mascot or pooled copy before. New `frontend/lib/tey/shopEngineVoice.ts` (kept separate from `shopVoice.ts`, which is only the shop *error* pool) adds `pickPurchaseLine`/`pickUnlockLine`/`pickCollectionCompleteLine`, tiered by rarity where the scene has it. `ChestRevealScene` (the *paid* chest, a different scene from the free daily `ChestScene`) reuses `chestVoice.ts`'s existing `pickChestRevealLine` directly rather than duplicating a near-identical pool — same "was it rare?" reaction either way. All four now render `<CelebrationMascot pose="cheer" entrance="puff" />` + `<TypewriterBubble>` after their existing reward beat.
2. **Lucky Spin de-duplication** (`frontend/components/dashboard/v2/WeeklyLuckySpinCard.tsx` + `frontend/components/herald/HeraldSpinReveal.tsx`) — both files hardcoded an identical `🎉 YOU WON ${amount} ${name}!` template in two places each. New `frontend/lib/tey/spinVoice.ts` (`pickSpinPrizeMessage`) replaces all four call sites, tiered by the landed segment's `rarityTier` (looked up from `wheelConfig[landedSegmentIndex]`) — fixes the duplication and adds voice in the same move. The downstream full-page `CLAIM` scene these hand off to already had Tey voice from Phase 1 — untouched.
3. **Mystery Chest dashboard card** (`frontend/components/dashboard/v2/MysteryChestCard.tsx`) — the persistent widget itself (not the `ChestScene` reveal it triggers, which already had Tey) had 3 static status strings. Extended `chestVoice.ts` with `pickChestCardLockedStatus/ReadyStatus/OpenedStatus`; wired via `useMemo` keyed on `chestState.status` so the line refreshes on a real state transition, not on every re-render.
4. **Hearts popover** (`frontend/components/hearts/HeartsPopover.tsx`) — voice-only, no mascot added (it's a small anchored hover/pin popover, not a scene — a mascot didn't fit the compact real estate on a first pass). New `frontend/lib/tey/heartsVoice.ts` (`pickHeartsSubtitle`) replaces the static full/not-full subtitle with 3 tiers (full/low/empty), wired via `useMemo` keyed on `[lives, maxLives]`.

**Verification:** `tsc --noEmit` clean across the frontend. `eslint` on all touched files: only 3 pre-existing issues surfaced (an `any` type on `wheelConfig` state in both spin files, and an unused `isAvailable` var in `HeraldSpinReveal.tsx`) — confirmed via `git diff` that none of those lines were touched by this pass; zero new lint issues introduced. Not yet manually clicked through in the browser.

**Committed and shipped to staging** — decided to ship ahead of the manual click-through this time (unlike Phase 1's stricter checkpoint) since typecheck/lint were clean and the change surface per scene is small and additive (new mascot+bubble appended after existing content, existing hardcoded strings swapped 1:1 for pooled equivalents). Staged and committed exactly the 13 files belonging to this work — deliberately excluding `CourseDetail.module.css`, `Explore.module.css`, `frontend/app/(app)/dev/`, `frontend/frontend.log`, and `leaderboard_community_engine_progress.md`, all of which belong to a different, concurrently-running session or are local log noise. `staging` was confirmed at the same commit as `perf/speed-optimization-pass` before pushing (clean fast-forward), updated via `git push origin perf/speed-optimization-pass:staging` — no local `staging` checkout, no force-push.

---

## 📍 Current State

- **Phase 1 is committed and live on `staging`** (commit `8861262`) — should be deployed wherever this project's staging pipeline auto-deploys to (Vercel/Render per project convention).
- New files: `frontend/lib/tey/{pool,streakVoice,xpClaimVoice,levelUpVoice,achievementVoice,chestVoice,milestoneVoice,shopVoice}.ts`.
- Modified: `backend/src/shop/shop.service.ts`; and on the frontend — `CelebrationContext.tsx`, `teyMessages.ts`, `notificationCopy.tsx`, `shop/api.ts`, `shop/types.ts`, `ShopItemCard.tsx`, the shop dashboard page, `LeaderboardRankWatcher.tsx`, `LeagueResultWatcher.tsx`, the real lesson-complete page, and 10 celebration scene components.
- `frontend/.env.local` is back to its original state (no `NEXT_PUBLIC_ENVIRONMENT` line) — both dev servers are running locally (frontend `:3000`, backend `:3001`) for anyone who wants to keep testing against them.
- **Level-up scene is the only checklist item confirmed live so far.** Everything else in Phase 1 is implemented and shipped, but not yet independently re-confirmed by clicking through it.
- **Phase 2 is committed and live on `staging`** — see §Phase 2 above for scope. Not yet manually clicked through in the browser (shipped ahead of that checkpoint this time, on the strength of clean typecheck/lint and small additive diffs per scene).
- New files this pass: `frontend/lib/tey/{shopEngineVoice,spinVoice,heartsVoice}.ts`; extended `frontend/lib/tey/chestVoice.ts` with the 3 dashboard-card status pools.
- Modified this pass: the 4 shop-engine scenes, `WeeklyLuckySpinCard.tsx`, `HeraldSpinReveal.tsx`, `MysteryChestCard.tsx`, `HeartsPopover.tsx`.
- Phase 3 is still fully unscoped.

---

## 🔜 Next Steps

1. **Manually verify Phase 2 live on `staging`** (now the more visible venue — a regression there is real, not just local):
   - [ ] Buy a shop item → `PurchaseSuccessScene` shows mascot + bubble reacting to rarity.
   - [ ] Meet an unlock requirement → `ItemUnlockedScene` shows mascot + bubble.
   - [ ] Buy and open a paid Mystery Chest → `ChestRevealScene` shows mascot + bubble reacting to rarity.
   - [ ] Complete a cosmetic collection → `CollectionCompleteScene` shows mascot + bubble.
   - [ ] Spin the Weekly Lucky Spin from both entry points (dashboard card and Herald overlay) → prize message varies and reacts to rarity, no longer the fixed `🎉 YOU WON...` string.
   - [ ] Watch the Mystery Chest dashboard card across a full day-cycle (locked → ready → opened) → status line varies per state, doesn't reroll on unrelated re-renders.
   - [ ] Hover/tap the hearts pill with hearts full, partial, and at zero → subtitle varies per tier.
2. **Finish the Phase 1 manual run-through** (still open, listed for completeness — only Level-up confirmed so far): CLAIM headline variation on real lesson completions, Achievement mascot/bubble, daily chest tap-hint tone, Section/Course-complete and Course-progress/Section-unlock mascot+line, leaderboard/league subhead variation, notification bell real body, shop error Tey-voicing + fallback, and no double-firing sound on any newly-bubbled scene.
3. If anything looks off in either checklist, report what was tapped/expected vs. seen — same process that's caught every real bug so far in this audit.
4. **Decide on Phase 3 scope** (deferred): onboarding voice reconciliation (`useMessagePool.ts`'s register reads as a different character than the "mischievous owl" spec), empty/error-state Tey variant for lower-stakes surfaces (leaning on `EmptyState.tsx` and the already-shipped precedent `"Your quest got lost in the clouds."`), the offline page, and a judgment call on whether `CommunityWelcomeScene.tsx`'s distinct "confident narrator" voice should be left as-is or pulled toward Tey's register.
5. **Note for whoever picks this up next**: another session may still be active in this same repo checkout on unrelated leaderboard/course-detail work (`CourseDetail.module.css`, `Explore.module.css`, a `dev/` route were seen untracked/modified in the working tree throughout this pass) — check `git status` before assuming the working tree only reflects this doc's history, and don't stage/commit files outside this pass's own list above.
