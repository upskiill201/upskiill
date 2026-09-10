# Monthly Quest Feature — Progress Summary

> Status snapshot as of **2026-08-24** — updated after the Duolingo-style UI-polish pass. Covers what's built, what's verified, and what's next for the Teyro Monthly Quest (Duolingo-style monthly challenge).

---

## 1. What We Set Out To Build

A Duolingo-style **monthly quest**: one big monthly goal made of smaller milestone sub-quests, with claiming and celebration moments running through the Celebration Engine.

**Confirmed product decisions:**
- **Model:** Goal-days + milestones (kept the previously scaffolded design) — hit your daily XP goal on N target days; milestones unlock at ⅓ / ⅔ / full.
- **Surfaces:** `/dashboard/quests` page + dashboard card + sidebar widget (all three).
- **Celebrations:** Post-lesson progress beats **and** server-first claim scenes.

## 2. How the Feature Works

- **Goal-day** = a day where `UserDailyActivity.xpEarned >= dailyGoalXp` AND `lessonsCompleted >= 1`.
- **Target days by commitment tier:** 20 XP → 12 days · 50 → 15 · 100 → 18 · 200 → 20. Mid-month joiners get a prorated target (floor 4). Target frozen at row creation.
- **Milestones** (`monthly-quest.registry.ts`):
  | Milestone | Threshold | Reward |
  |---|---|---|
  | Warm-Up (M1) | ⅓ of target | +40 coins |
  | Halfway Hero (M2) | ⅔ of target | +1 streak freeze |
  | Monthly Champion (FINAL) | full target | +250 coins + badge |
- **Status flow:** `ACTIVE → COMPLETED` (all goal-days counted) `→ FULLY_CLAIMED` (final claimed). Past months stay claimable forever.
- **Progress path:** lesson completed → `lesson.completed` event → GamificationListener step 3b (`evaluateProgress`) reads `UserDailyActivity`, appends an idempotent snapshot entry inside one `$transaction`.
- **Claim path:** atomic transaction guarding eligibility → double-claim check → ledger insert with unique `idempotencyKey` (P2002 replay → 409) → wallet application (coins / freeze bank + inventory) → badge stamp on FINAL.

## 3. What Was Accomplished This Session

### Backend
| Item | File(s) | State |
|---|---|---|
| Controller (dual-path `/api/v2/monthly-quest/*`) | `backend/src/monthly-quest/monthly-quest.controller.ts` | ✅ new |
| Module + registrations | `monthly-quest.module.ts`, `app.module.ts`, `gamification.module.ts` | ✅ done |
| Listener wiring (step 3b after `recordLearningActivity`) | `gamification/listeners/gamification.listener.ts` | ✅ done |
| Latent compile fix (Prisma `Json` cast on `goalSnapshot`) | `monthly-quest.service.ts` | ✅ fixed |
| Unit tests — **17/17 passing** | `monthly-quest.service.spec.ts` | ✅ new |

### Frontend
| Item | File(s) | State |
|---|---|---|
| API client + shared celebration chain builder | `frontend/lib/monthlyQuest.ts` | ✅ new |
| Data hook (live refresh via `quest:refresh` / `lesson:completed`) | `frontend/hooks/useMonthlyQuest.ts` | ✅ new |
| Post-lesson watcher (+1 goal-day beats, chained claims, reload-safe) | `frontend/components/quests/QuestProgressWatcher.tsx` in `app/layout.tsx` | ✅ new |
| Dashboard card (milestone track + inline CLAIM) | `components/dashboard/v2/MonthlyQuestCard.tsx` + CSS; inserted into `app/dashboard/page.tsx` | ✅ new |
| Quests page (hero track, explainer, milestone cards, history, all states) | `frontend/app/dashboard/quests/page.tsx` + CSS | ✅ new |
| Legacy `/quests` stub → redirects to `/dashboard/quests` | `frontend/app/quests/page.tsx` | ✅ updated |
| Sidebar nav "Quests" live (`isComingSoon: false`) | `app/dashboard/layout.tsx` | ✅ updated |
| Sidebar locked placeholders → live widget (both section/default variants) | `components/layout/RightSidebar.tsx` + `components/quests/MonthlyQuestWidget.tsx` | ✅ swapped |

### Unblocked build (pre-existing breakage from concurrent work)
- Added `'MISSIONS'` to `HeraldOverlayType` (`context/HeraldContext.tsx`)
- Renamed variable shadowing `claimed` state in `HeraldOverlay.tsx`

### UI pass — Duolingo-style polish (session 2, same day)

All three quest surfaces now share the **Celebration Engine's Duolingo grammar**: deep-navy `#101A2E` panels with brand-blue ambient glow, Baloo 2 (`--font-celebration`) display type, chunky 3D hard-shadow buttons/nodes, gold `#FFC800` accents. Chest-node milestones like Duolingo's monthly challenge.

| Item | File(s) | State |
|---|---|---|
| Quests page CSS rewritten (navy celebration hero + ambient glow, chest-node track, goal-day calendar, 3D milestone cards/buttons, trophy-amber champion repaint) | `app/dashboard/quests/QuestsPage.module.css` | ✅ rewritten |
| Quests page TSX (Tey mascot anchor w/ reduced-motion-safe bob, chest nodes as real claim `<button>`s on the track, new `GoalDayCalendar` month grid, Sparkles section headers, champion history rows) | `app/dashboard/quests/page.tsx` | ✅ rewritten |
| Dashboard card CSS (navy panel, recessed chest nodes, Baloo numerals, 3D gold CLAIM pill) | `components/dashboard/v2/MonthlyQuestCard.module.css` | ✅ rewritten |
| Dashboard card TSX (coin/lock icons → chest treatment, unused icon imports dropped) | `components/dashboard/v2/MonthlyQuestCard.tsx` | ✅ updated |
| Sidebar widget rewritten (same navy panel inline, chest nodes + `nodePulseWidget` keyframe, Baloo fraction, 3D CLAIM) | `components/quests/MonthlyQuestWidget.tsx` | ✅ rewritten |

**Design language details (kept consistent across surfaces):**
- Track nodes: locked = grayscale chest in recessed navy node · claimable = gold pulsing node w/ full-color chest · claimed = dimmed chest + green check badge (page) / dimmed chest (card+widget)
- Page hero track: chunky 14px glossy gold fill with coin end-cap (turns green at 100%)
- **Goal-day calendar** (new): Duolingo-style month grid — blue cell + check = earned goal day, dashed = upcoming, muted = missed, today outlined (gold + pulse if today already counted). Built from `countedDays` + `daysRemaining`, so it inherits the backend's timezone handling
- Milestone cards: white 3D cards (hard bottom shadow), segmented per-day progress bars, gold 3D CLAIM buttons in Baloo
- No new icon libraries (lucide + existing PNG assets only: `tressure-chest-locked.png`, `dashboard tey.png`, `Coin.png`, `snowflake.svg`); currency stays coins

## 4. Current State & Verification

- ✅ Backend typecheck clean for all quest files
- ✅ Frontend `tsc` fully clean (re-verified after UI pass)
- ✅ `next build` succeeds — `✓ Compiled successfully`, `/dashboard/quests` in route manifest
- ✅ `npx jest monthly-quest missions.service gamification` → quest + missions suites green
- ⚠️ **Not yet exercised end-to-end in a browser** (no localhost run yet this session)
- ⚠️ **Migration not yet applied** anywhere — `20260824120000_add_user_monthly_quests` ships via `prisma migrate deploy` on next backend deploy; local dev needs `npx prisma migrate deploy` first (**local `.env` targets the staging Supabase DB — confirm before deploying from local**)

## 5. Known Pre-existing Issues (not quest-related, left untouched)

1. `achievements.service.spec.ts` — 1 failing test; `achievements.service.ts` had large in-flight changes (+383/−194) whose spec wasn't updated.
2. `backend/src/community/` doesn't compile (`feed.service.ts` missing `Prisma` import, null-safety issues, etc.) — module appeared mid-session.
3. Backend spec files for auth/profile/students have older pre-existing TS errors.

## 6. Next Steps

1. **Apply migration locally/staging** (`prisma migrate deploy`) so the backend can serve quests
2. **Manual E2E on localhost:3000/3001:** complete a qualifying lesson → verify CLAIM → STREAK → QUEST beat chain; claim M1 from card/page/widget; confirm single payout on double-click; check history rendering; eyeball the new calendar + chest nodes
3. **Push branch → staging auto-deploy** → repeat smoke test on staging URL
4. Later: badge gallery reading `badgeId`, friend-quest social layer (Phase 2 candidates)

---

*Key files if resuming: plan at `.claude/plans/playful-baking-whale.md` · backend contract in `monthly-quest.service.ts` (`buildCurrentPayload` / `claimMilestone` return shapes) · frontend contract in `lib/monthlyQuest.ts`.*
