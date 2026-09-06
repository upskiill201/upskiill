# Tey Personality Audit — Progress Tracker

> Work done on `perf/speed-optimization-pass` (uncommitted, working tree).
> Full plan: `C:\Users\HP\.claude\plans\i-want-you-to-sparkling-sunbeam.md`
> Last updated: 2026-09-06.

---

## 📌 Where We Are (the 30-second read)

The ask: make Tey (the mascot) feel like a character reacting to the learner, not a system printing notifications — across celebrations, leaderboard, shop, streaks, achievements, and more. An audit (3 parallel codebase explorations) found the personality work already existed in two separate, mature, unconnected places — the leaderboard's `teyMessages.ts` pool and a full backend push-notification engine (`backend/src/tey/`) — while almost everything else in the Celebration Engine had a single fixed string and, in several cases, **no mascot at all**.

**Scope was deliberately split into phases** (confirmed with the user): this pass covers the **Celebration Engine core gaps** plus two small, high-leverage, unrelated fixes (a notification-bell bug, shop error reason-codes). Shop Engine's own scenes, Lucky Spin, onboarding voice, empty/error states, and the offline page are explicitly **deferred** to follow-up passes — not forgotten, just not built yet.

**Status in one line:** Phase 1 implemented and now confirmed working live in the browser (Level-up scene verified end-to-end) — one real bug found and fixed along the way (see below), a couple of unrelated environment hiccups resolved, and most of the manual verification checklist still to run through.

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

---

## 📍 Current State

- All changes are **uncommitted**, sitting in the working tree on `perf/speed-optimization-pass`.
- New files: `frontend/lib/tey/{pool,streakVoice,xpClaimVoice,levelUpVoice,achievementVoice,chestVoice,milestoneVoice,shopVoice}.ts`.
- Modified: `backend/src/shop/shop.service.ts`; and on the frontend — `CelebrationContext.tsx`, `teyMessages.ts`, `notificationCopy.tsx`, `shop/api.ts`, `shop/types.ts`, `ShopItemCard.tsx`, the shop dashboard page, `LeaderboardRankWatcher.tsx`, `LeagueResultWatcher.tsx`, the real lesson-complete page, and 10 celebration scene components.
- `frontend/.env.local` is back to its original state (no `NEXT_PUBLIC_ENVIRONMENT` line) — both dev servers are running (frontend `:3000`, backend `:3001`).
- **Level-up scene confirmed working live.** Everything else in the checklist below is still unverified.

---

## 🔜 Next Steps

1. **Finish the manual run-through on `localhost:3000`** — only Level-up is confirmed so far:
   - [x] Trigger a level-up → speech bubble appears, doesn't reroll on re-render. **Confirmed.**
   - [ ] Complete 2-3 lessons in a row → confirm the `CLAIM` scene headline varies (now that the hardcoded override is removed).
   - [ ] Unlock an achievement → confirm mascot + bubble now appear where the scene used to be silent.
   - [ ] Open the daily chest → confirm the tap-to-open phase reads mischievous, not just "Tap to open!".
   - [ ] Complete a section / hit a course-progress milestone / complete a course → confirm mascot + reacting line on each.
   - [ ] Trigger a leaderboard rank change and a weekly league settlement → confirm the subhead now varies too.
   - [ ] Open the notification bell with a `TEY_*` row present → confirm the real Tey body renders.
   - [ ] Attempt an unaffordable shop purchase and an already-owned one → confirm Tey-voiced errors, and that an uncovered error still falls back sensibly.
   - [ ] Confirm no sound double-fires on any newly-bubbled scene, and that muting SFX silences the new voice-reveal ticks too.
2. If anything looks off, report what was tapped/expected vs. seen — same process that caught the CLAIM-title bug.
3. Once the checklist above is clean, **commit Phase 1** (nothing has been committed yet — nice checkpoint before starting Phase 2).
4. **Decide on Phase 2 scope** (deferred, not started): Shop Engine's own 4 scenes (`PurchaseSuccessScene`, `ItemUnlockedScene`, `ChestRevealScene`, `CollectionCompleteScene` — currently zero mascot, zero pooled copy), Lucky Spin de-duplication (`WeeklyLuckySpinCard.tsx` / `HeraldSpinReveal.tsx` currently copy-paste the same prize string), Mystery Chest dashboard card, Hearts popover.
5. **Decide on Phase 3 scope** (deferred): onboarding voice reconciliation (`useMessagePool.ts`'s register reads as a different character than the "mischievous owl" spec), empty/error-state Tey variant for lower-stakes surfaces (leaning on `EmptyState.tsx` and the already-shipped precedent `"Your quest got lost in the clouds."`), the offline page, and a judgment call on whether `CommunityWelcomeScene.tsx`'s distinct "confident narrator" voice should be left as-is or pulled toward Tey's register.
