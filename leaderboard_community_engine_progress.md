# Leaderboard + Course Community Engine — Progress Tracker

> Work done on `feat/tey-foundation`, merged to `staging` at commit `7a9b442`.
> Last updated: 2026-09-06.

---

## 📌 Where We Are (the 30-second read)

Both the **Leaderboard/League Engine** and the **Course Community Engine** were fully built (backend, data flow, scene components) but neither ever actually appeared for the learner — two separate, unrelated wiring bugs. Both are now fixed, three new stat-pill popovers (XP, Hearts, Level) were built on the same pattern as the existing Streak/Coins popovers, and everything is pushed to `staging` for phone testing.

**Status in one line:** root causes found and fixed, `tsc --noEmit` and `next build` (381 pages) both clean, pushed to staging — **not yet clicked through on a real device.**

---

## ✅ What We've Accomplished

### 1. Diagnosed why neither engine fired

Investigated end-to-end against the working Celebration Engine (streak/level/chest scenes) as a reference and found two unrelated bugs:

| Engine | Root cause |
|---|---|
| **Course Community** | `CelebrationEngine.tsx`'s scene-dispatcher `switch` had no `case 'COMMUNITY_WELCOME'` — the component was imported but never rendered. Backend, data flow, and the frontend trigger (queued after a learner's 2nd completed lesson) were all already correct. |
| **Leaderboard / League** | `LeagueResultWatcher` and `LeaderboardRankWatcher` (the components that listen for results and render the celebration) were only mounted inside the dashboard layout — so they weren't listening at all while a learner was on `/learn/...`, which is exactly where lesson completion (and the `lesson:completed` event they depend on) actually happens. |

**Side effect found along the way:** the missing `COMMUNITY_WELCOME` case didn't just mean "nothing shows" — the full-page celebration portal still mounted around the `null` it rendered, producing an **invisible, full-screen, click-blocking overlay that never cleared** (queue never drains without a scene to advance past). This is a plausible explanation for "the app feels like it's freezing" reports, independent of the missing content itself.

### 2. Fixed both

- Added the missing `case 'COMMUNITY_WELCOME'` to `CelebrationEngine.tsx`'s renderer.
- Moved `LeagueResultWatcher` + `LeaderboardRankWatcher` out of the dashboard-only layout and up to a scope that covers both `/learn` and `/dashboard` (originally the true app root; a parallel performance pass has since relocated the whole authenticated runtime — celebration engine, these watchers, gamification, etc. — into `app/(app)/layout.tsx`, a route group that still covers both routes, so the fix's intent holds).
- Gated both watchers on `profileLoaded` (mirroring `DailyRewardWatcher`'s existing pattern) so logged-out visitors never pay for the extra fetch, and so remounting doesn't silently re-fire a "first sight" check.
- Verified: no `type` errors, and a full local production build reaches all 381 routes cleanly.

### 3. Built XP / Hearts / Level popovers (same session, related engine surface)

Extended the existing hover-to-preview / click-to-stick pattern (previously only on Streak and Coins) to the three remaining stat pills, using only data that already existed server-side:

- **XP** — total XP, progress bar to next level, live Sage-achievement-tier progress, and (only when genuinely active) a live countdown on an XP boost.
- **Hearts** — live heart-regen countdown (data that existed server-side but was shown nowhere until now), Perfect Shield charge status, one-tap refill (120 coins / 100 XP, whichever affordable).
- **Level** — progress bar, and a real "next unlock" teaser pulled from the shop's level-gated items (not invented flavor text).

No backend changes were needed for any of this — everything reads from `GamificationContext`, the already-prefetched shop catalog, or the existing achievements endpoint.

---

## 📍 Current State

- Commit `7a9b442` (`fix(celebration): wire up community + leaderboard scenes, add XP/hearts/level popovers`) is on `staging`, fast-forwarded cleanly, no force-push.
- A **parallel performance-optimization pass** (different session, branch `perf/speed-optimization-pass`) has since landed *on top of* this commit on `staging` — image pipeline, service worker rewrite, request de-duplication, provider re-render fixes, and the runtime-scoping refactor mentioned above. Confirmed our fixes survived that refactor intact (spot-checked: `COMMUNITY_WELCOME` case present, both watchers now mounted in `app/(app)/layout.tsx`, all five stat popovers still wired in `StatsBar.tsx`).
- **Nothing has been tested on a real device yet** — this is the next and only remaining step for this piece of work.
- One stale doc comment noticed in passing (not fixed, not asked for): `frontend/app/(app)/dashboard/leaderboards/page.tsx` still says `LeagueResultWatcher` is "mounted in the dashboard layout" — it now lives in `app/(app)/layout.tsx`.

---

## 🔜 Next Steps

1. **Phone-test on staging** once Vercel/Render finish building:
   - Finish a lesson from `/learn` (not `/dashboard`) and confirm the Community Welcome scene appears on the 2nd completed lesson in a course, with no invisible-overlay freeze afterward.
   - Trigger (or wait for) a mid-week rank change and a weekly league settlement, confirm both surface as full-page scenes even when the learner never manually visits `/dashboard`.
   - Hover/click each of the XP, Hearts, and Level pills in the stats bar; confirm popovers show correct live data and the pin/unpin/outside-click behavior matches Streak/Coins.
2. If anything doesn't render or looks off, report back with what was tapped/expected vs. seen — screenshots help.
3. Optional cleanup (low priority, not urgent): update the stale "mounted in the dashboard layout" comment in `leaderboards/page.tsx`.
