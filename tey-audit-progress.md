# Tey Personality Audit — Progress Tracker

> Phase 1 committed on `perf/speed-optimization-pass` (commit `8861262`) and pushed live to `staging`.
> Phase 2 committed on `perf/speed-optimization-pass` and pushed live to `staging` — see §Phase 2 below.
> Phase 3 committed on `perf/speed-optimization-pass` and pushed live to `staging` — see §Phase 3 below.
> Full plan: `C:\Users\HP\.claude\plans\i-want-you-to-sparkling-sunbeam.md`
> Last updated: 2026-09-07.

---

## 📌 Where We Are (the 30-second read)

The ask: make Tey (the mascot) feel like a character reacting to the learner, not a system printing notifications — across celebrations, leaderboard, shop, streaks, achievements, and more. An audit (3 parallel codebase explorations) found the personality work already existed in two separate, mature, unconnected places — the leaderboard's `teyMessages.ts` pool and a full backend push-notification engine (`backend/src/tey/`) — while almost everything else in the Celebration Engine had a single fixed string and, in several cases, **no mascot at all**.

**Scope was deliberately split into phases** (confirmed with the user): this pass covers the **Celebration Engine core gaps** plus two small, high-leverage, unrelated fixes (a notification-bell bug, shop error reason-codes). Shop Engine's own scenes, Lucky Spin, onboarding voice, empty/error states, and the offline page are explicitly **deferred** to follow-up passes — not forgotten, just not built yet.

**Status in one line:** All three planned phases (Celebration Engine core gaps, Shop Engine/Lucky Spin/Chest-card/Hearts, onboarding/empty-state/offline/community-welcome) are implemented, typecheck/lint-clean, committed, and pushed live to `staging` on the same commit. Only Phase 1's Level-up scene has been independently clicked through in the browser so far — the rest of the manual verification checklist (all three phases) is the main open item, see §Next Steps.

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

## Phase 3 — onboarding voice reconciliation, empty/error states, offline page, community-welcome judgment call

Scoped and implemented in this pass (committed and pushed — see below). Research first (an Explore agent read every file involved end-to-end and reported exact current copy, tone comparisons against the spec, and every call site), then four independent pieces of work:

1. **Onboarding voice reconciliation** — `frontend/hooks/onboarding/useMessagePool.ts` (feeds `Step9Content.tsx`'s drag-and-drop challenge) had its own "beeping robot" pool (`"Bloop! Perfect fit! 🤖✨"`, `"Zot! Exactly right! ⚡"`) — a different, generic arcade-mascot voice with no wit and heavy stacked emoji, plus its own component-local `useRef` dedupe that reset on remount. `HeraldStreakReveal.tsx`'s inline 4-line pool (`"Consistency is your superpower! High five!"`) read as an earnest motivational-poster coach — zero emoji, zero teasing, and no dedupe logic at all (could repeat the same line twice in a row). Both reconciled onto Tey's actual register (mischievous, sparing emoji, teases the task) and onto the shared `pickFromPool` mechanism: new `frontend/lib/tey/onboardingVoice.ts` (`useMessagePool.ts` is now a 12-line wrapper around it, same public API so `Step9Content.tsx` needed zero changes) and a new pool added to `frontend/lib/tey/streakVoice.ts` (`pickHeraldStreakLine`), wired into `HeraldStreakReveal.tsx` via `useMemo` keyed on the overlay opening.
2. **Empty/error-state Tey variant** — found two *different* `EmptyState` components in the codebase: `components/ui/EmptyState.tsx` (used on learner-facing dashboard pages — feed, communities, a single community's post list, all three already using `TeyMascot` as the icon but with one fixed description string) and a separate `EmptyState` in `components/creator/analytics/bits.tsx` (used across every creator/instructor-dashboard surface — students, analytics, earnings). Deliberately scoped this to the **learner-facing set only** — the creator dashboard is a business/ops tool for instructors, not a Tey-voiced surface, same persona boundary already established for `CommunityWelcomeScene` below. New `frontend/lib/tey/emptyStateVoice.ts` pools the description on `dashboard/feed`, `dashboard/communities`, and `dashboard/community/[courseId]`'s three post-list-empty variants (lesson/filter/general). Separately, systematized the one already-shipped precedent for error-state tone — `"Your quest got lost in the clouds."` on `dashboard/quests` — which was a single hardcoded string with no pooling mechanism at all, into a new reusable `frontend/lib/tey/errorStateVoice.ts` (`pickErrorHeadline(key)`) and wired it into that page's local `ErrorState`. Other learner-facing pages with their own ad-hoc error/empty copy (my-learning, leaderboards, explore, shop) were **not** touched this pass — flagged as a candidate for a future pass rather than folded in here, since "leaning on `EmptyState.tsx` and the precedent" was the literal scope named, not every fetch-error fallback in the app.
3. **Offline page** (`frontend/app/offline/page.tsx`) — already showed a Tey mascot image (the "thinking" pose) but the copy was three plain, sincere, unpooled sentences. Added `frontend/lib/tey/offlineVoice.ts` (`pickOfflineBodyLine`) for the body line only — title and the functional "this page will work again" hint stay fixed, since those carry real information the learner needs regardless of tone. Kept the page a pure Server Component with zero client JS, per its own documented constraint (nothing can be fetched when it's shown) — the pool pick is a plain function call at render time, no hooks, no client bundle added.
4. **`CommunityWelcomeScene.tsx` — the judgment call** — this scene's entire point, per its own file-header doc comment, is to be real and instructional ("a community is the one reward that means nothing until you understand what it's for"): it explains *how* and *why* to post, like, and answer, in a confident-narrator voice with zero emoji and zero mischief. Decided **not** to rewrite that instructional copy into Tey's joke-mascot register — teaching "the one you think is too basic is the one five other people also have" doesn't want a wisecrack. But the scene had **zero mascot presence** at all (unlike every other Celebration Engine scene), which was the actual inconsistency worth fixing. Added a small, silent `CelebrationMascot` (pose `hug`, no speech bubble, no pooled line) at the very end of the flow's last beat (the "SAY HI" sign-off) — visual continuity with the rest of the engine without disturbing the voice that's doing real teaching work.

**Verification:** `tsc --noEmit` clean across the frontend. `eslint` on all 13 touched files: only 2 pre-existing warnings surfaced (`claimable` unused in `quests/page.tsx`, `longestStreak` unused in `HeraldStreakReveal.tsx`) — confirmed via `git diff` that neither variable appears anywhere in this pass's diff of either file; zero new lint issues introduced. Not yet manually clicked through in the browser (same call as Phase 2 — shipped ahead of that checkpoint on the strength of clean typecheck/lint and small, additive/1:1-substitution diffs).

**Committed and pushed to staging** — staged and committed exactly the 13 files belonging to this work, same exclusion list as Phase 2 (other session's `CourseDetail.module.css`, `Explore.module.css`, `frontend/app/(app)/dev/`, `frontend/frontend.log`, `leaderboard_community_engine_progress.md`). Pushed to `perf/speed-optimization-pass`, then fast-forwarded `staging` the same way (ancestor alignment confirmed before and after, no local `staging` checkout, no force-push).

---

## 📍 Current State

- **Phase 1 is committed and live on `staging`** (commit `8861262`) — should be deployed wherever this project's staging pipeline auto-deploys to (Vercel/Render per project convention).
- New files: `frontend/lib/tey/{pool,streakVoice,xpClaimVoice,levelUpVoice,achievementVoice,chestVoice,milestoneVoice,shopVoice}.ts`.
- Modified: `backend/src/shop/shop.service.ts`; and on the frontend — `CelebrationContext.tsx`, `teyMessages.ts`, `notificationCopy.tsx`, `shop/api.ts`, `shop/types.ts`, `ShopItemCard.tsx`, the shop dashboard page, `LeaderboardRankWatcher.tsx`, `LeagueResultWatcher.tsx`, the real lesson-complete page, and 10 celebration scene components.
- `frontend/.env.local` is back to its original state (no `NEXT_PUBLIC_ENVIRONMENT` line) — both dev servers are running locally (frontend `:3000`, backend `:3001`) for anyone who wants to keep testing against them.
- **Level-up scene is the only checklist item confirmed live so far.** Everything else in Phase 1 is implemented and shipped, but not yet independently re-confirmed by clicking through it.
- **Phase 2 is committed and live on `staging`** — see §Phase 2 above for scope. Not yet manually clicked through in the browser.
- New files (Phase 2): `frontend/lib/tey/{shopEngineVoice,spinVoice,heartsVoice}.ts`; extended `frontend/lib/tey/chestVoice.ts` with the 3 dashboard-card status pools.
- Modified (Phase 2): the 4 shop-engine scenes, `WeeklyLuckySpinCard.tsx`, `HeraldSpinReveal.tsx`, `MysteryChestCard.tsx`, `HeartsPopover.tsx`.
- **Phase 3 is committed and live on `staging`** — see §Phase 3 above for scope. Not yet manually clicked through in the browser.
- New files (Phase 3): `frontend/lib/tey/{onboardingVoice,emptyStateVoice,errorStateVoice,offlineVoice}.ts`; extended `frontend/lib/tey/streakVoice.ts` with `pickHeraldStreakLine`.
- Modified (Phase 3): `useMessagePool.ts` (now a thin wrapper), `HeraldStreakReveal.tsx`, `dashboard/feed/page.tsx`, `dashboard/communities/page.tsx`, `dashboard/community/[courseId]/page.tsx`, `dashboard/quests/page.tsx`, `app/offline/page.tsx`, `CommunityWelcomeScene.tsx`.
- All three phases now sit on `staging` at the same commit — no phase is ahead of another on that branch.

---

## 🔜 Next Steps

1. **Manually verify Phase 3 live on `staging`:**
   - [ ] Play the onboarding drag-and-drop challenge (Step 9) → toast/mascot lines read mischievous ("Nice, that's the one 🙂", "Okay, you're on a roll 😏"), not the old "Bloop!"/"Zot!" robot lines.
   - [ ] Trigger the Herald streak-commit overlay → speech bubble line reads in Tey's voice, varies across multiple opens, no back-to-back repeats.
   - [ ] Empty the feed / communities / a community's post list → description text is pooled (reload a few times to see it vary), mascot still shows.
   - [ ] Force the Quests page into an error state → headline varies across reloads, still ends with "Try again".
   - [ ] Load `/offline` (devtools → offline, or throttle to offline and navigate) → body text is pooled, mascot and title unchanged.
   - [ ] Trigger `CommunityWelcomeScene` (2nd lesson completion) → confirm the small mascot now appears on the final "SAY HI" beat with no speech bubble, and the instructional copy on every beat is unchanged.
2. **Manually verify Phase 2 live on `staging`** (still open from last pass):
   - [ ] Buy a shop item → `PurchaseSuccessScene` shows mascot + bubble reacting to rarity.
   - [ ] Meet an unlock requirement → `ItemUnlockedScene` shows mascot + bubble.
   - [ ] Buy and open a paid Mystery Chest → `ChestRevealScene` shows mascot + bubble reacting to rarity.
   - [ ] Complete a cosmetic collection → `CollectionCompleteScene` shows mascot + bubble.
   - [ ] Spin the Weekly Lucky Spin from both entry points (dashboard card and Herald overlay) → prize message varies and reacts to rarity, no longer the fixed `🎉 YOU WON...` string.
   - [ ] Watch the Mystery Chest dashboard card across a full day-cycle (locked → ready → opened) → status line varies per state, doesn't reroll on unrelated re-renders.
   - [ ] Hover/tap the hearts pill with hearts full, partial, and at zero → subtitle varies per tier.
3. **Finish the Phase 1 manual run-through** (still open, listed for completeness — only Level-up confirmed so far): CLAIM headline variation on real lesson completions, Achievement mascot/bubble, daily chest tap-hint tone, Section/Course-complete and Course-progress/Section-unlock mascot+line, leaderboard/league subhead variation, notification bell real body, shop error Tey-voicing + fallback, and no double-firing sound on any newly-bubbled scene.
4. If anything looks off in any of the three checklists, report what was tapped/expected vs. seen — same process that's caught every real bug so far in this audit.
5. **Not built this pass, flagged as a real follow-up candidate, not forgotten**: Tey voice for the other learner-facing pages with their own ad-hoc empty/error copy (my-learning, leaderboards, explore, shop) — Phase 3 only covered `EmptyState.tsx`'s callers and the one already-shipped error-tone precedent, per the scope as named; a judgment call on whether the creator-dashboard `EmptyState` (a separate component in `components/creator/analytics/bits.tsx`, business-toned, ~10 call sites) should ever get Tey's voice or stay professional by design.
6. **Note for whoever picks this up next**: another session may still be active in this same repo checkout on unrelated leaderboard/course-detail work (`CourseDetail.module.css`, `Explore.module.css`, a `dev/` route were seen untracked/modified in the working tree throughout this pass) — check `git status` before assuming the working tree only reflects this doc's history, and don't stage/commit files outside this pass's own list above.
