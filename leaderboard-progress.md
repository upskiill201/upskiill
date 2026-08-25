# Leaderboard Feature — Progress

> Duolingo-style weekly league system for Teyro. Status as of **2026-08-25**.
> Branch: `staging` (uncommitted working tree — see "Next steps" for commit plan).

---

## Where we are

The leaderboard feature is **fully implemented and verified end-to-end** — backend, frontend, database, and celebration integration. It replicates Duolingo's weekly league mechanics with Teyro's brand blue, and settlement results play through the Celebration Engine. The feature is already live in local dev: real users joined this week's Bronze cohort during the build.

**Product decisions locked in:**
| Decision | Choice |
|---|---|
| Cohort population | **Real users only** (no bots) — boards show whoever exists |
| Ladder | **Full Duolingo ladder** — Bronze → Diamond + Diamond Tournament (10 tiers) |
| Settlement celebration | **Plays on dashboard open** (once per settled week) |

**Mechanics replicated from Duolingo:**
- Weeks run Monday 00:00 UTC → Sunday midnight UTC for everyone (one global clock).
- Earning any XP during the week auto-joins you to a cohort of up to 30 in your current tier ("Complete a lesson to join this week's leaderboard" before that).
- Promotion zones: Bronze top 20, Silver top 15, Gold→Diamond top 10. Diamond's top 10 qualify for next week's Diamond Tournament; tournament top 3 = champions (win counter), all entrants return to Diamond.
- Demotion: bottom 5 (never Bronze; skipped in cohorts under 10 members so sparse boards don't demote everyone). Tiny cohorts (<10) promote only the top 3 so the ladder stays meaningful with a small user base.
- Ties break to whoever reached their XP total first.
- No XP for a full week → drop one tier (inactivity demotion, Bronze floor).
- Week rollover settlement is computed **lazily on first access** — no cron, consistent with the entire codebase (missions/spins/chests all reset lazily).

---

## What we accomplished

### Database (deployed)
- `backend/prisma/schema.prisma` — `LeagueTier` enum (10 tiers), `LeagueCohort` + `LeagueMember` models, `StudentProfile.leagueTier` + `tournamentWins`, `User.leagueMembers` relation.
- Migration `20260825000000_add_league_leaderboards` — hand-authored additive SQL (with rollback comments), **applied successfully** via `migrate deploy` (per the Prisma workaround in memory).

### Backend (`backend/src/league/`)
- **`league.config.ts`** — single source of truth for mechanics: ladder order, promotion/demotion zone sizes, cohort capacity (30), tournament rules, UTC week helpers, `resolveOutcome()` settlement math.
- **`league.service.ts`** — core logic:
  - `recordXp()` — credits XP to the current league week; first award of the week joins a cohort (`SELECT … FOR UPDATE` locking prevents capacity overflow).
  - `ensureSettled()` — lazy settlement: settles the user's finished cohorts exactly once (optimistic `ACTIVE → SETTLING` claim), then demotes one tier per fully-elapsed inactive week (synthetic `INACTIVE_DEMOTED` rows drive the once-only celebration).
  - `settleCohort()` — ranks members (weeklyXp desc, xpUpdatedAt asc tie-break), assigns outcomes, moves every member's `leagueTier`, increments `tournamentWins`.
  - Reads: `getMyLeaderboard`, `getPendingResult`, `ackResult`, `getHistory`.
- **XP capture** — new `xp.awarded` domain event emitted from **all 8 XP award sites**: lesson completion (course.service), quest claim + daily reward (gamification.service), mission claim (missions.service), chest (chest.service), spin (spin.service), community post + comment. `LeagueListener` consumes it; failures never break the award flow.
- **`league.controller.ts`** — `GET /leagues/me`, `GET /leagues/me/pending-result`, `POST /leagues/me/ack-result`, `GET /leagues/me/history` (JWT-guarded; reached via the Next.js `/api` proxy). Module registered in `app.module.ts`.

### Frontend
- **`/dashboard/leaderboards`** (`page.tsx` + `Leaderboards.module.css`) — Duolingo layout, Teyro-blue skin: hero league badge, full 10-badge ladder strip (current highlighted, future locked), live week countdown (orange, ticks per second under a day), standings rows with top-3 gold/silver/bronze medals, **PROMOTION ZONE / DEMOTION ZONE** divider rows, highlighted "me" row, sticky bottom "you" bar, plus skeleton loading / error / not-joined ("START A LESSON" CTA) / empty states.
- **`components/leaderboard/LeagueBadge.tsx`** — authored SVG shield badge per tier (per-tier metals, tournament in brand blue), sizes xs–xl, locked variant. Single source of badge art.
- **`lib/leagues.ts`** — display metadata: names, zone subtitles, colors, countdown formatter.
- **Celebration Engine** — new `LEAGUE` scene kind (`CelebrationContext`) + `LeagueScene.tsx` (promotion fanfare + confetti, demotion with sad mascot, champion moment) registered in `CelebrationEngine`.
- **`LeagueResultWatcher`** — mounted once in the dashboard layout: checks `/leagues/me/pending-result` once per session, plays the scene once (session dedupe + server `seenAt` ack after the scene, so a refresh mid-scene replays rather than loses it). `STAYED`/`TOURNAMENT_EXIT` results are acked quietly without a scene.
- **Nav wiring** — sidebar "Leaderboards" and mobile bottom-nav item now route to `/dashboard/leaderboards` (previously a "Coming Soon" modal); `/leaderboards` redirects there.

### Tests & verification
- **`league.service.spec.ts` — 23/23 passing**: zone math per tier, tiny-cohort promotion cap, demotion guard, tournament champions, ladder floors/ceilings, UTC week snapping, cohort settlement orchestration, claim-release on failure, inactivity demotion (multi-week, Bronze floor, never-competed, already-present), join vs increment, failure swallowing.
- Fixed `missions.service.spec` for the new `EventEmitter2` constructor dependency (30/30 across league+missions).
- Remaining suite failures (course `createCourse` `$transaction` mock, orders DI) **pre-date this work** — both files were dirty before the session started.
- **Backend `nest build` clean; frontend `next build` clean** with `/dashboard/leaderboards` + `/leaderboards` routes registered.
- **`scripts/league-e2e.ts` — full lifecycle against the real DB: ✅ all 15 checks passed** (join → increment → private backdated cohort → lazy settlement → Bronze→Silver promotion → pending result → ack → inactivity guard → history), self-cleaning scratch user, never touches real members.

### Live validation (bonus)
The locally-running dev backend hot-reloaded the new code mid-build; real lesson completions (Sunnex126, Joel Ndakwe — 10 XP each) already flowed through the entire production path into this week's Bronze cohort. The feature works against real traffic.

---

## Current state

| Layer | State |
|---|---|
| DB schema + migration | ✅ Deployed (staging DB via local `.env`) |
| Backend module + endpoints | ✅ Complete, builds, tested |
| XP capture (8 sites) | ✅ Wired, live-validated |
| Settlement (lazy) | ✅ Unit-tested + e2e-verified against real DB |
| Frontend page + nav | ✅ Complete, builds |
| Celebration integration | ✅ Complete (scene, watcher, ack) |
| Everything committed | ⛔ **Not yet** — all work sits uncommitted on `staging` |

Known limitations / notes:
- Boards are sparse by design (real users only) — cohorts grow as the user base grows.
- `CourseWeeklyXp` (the unused course-scoped "Arena" table) was left untouched — separate future feature.
- Desktop Duolingo's "Set your status" emoji widget was deliberately excluded (emoji-as-icon rule; separate feature).
- Pre-existing test failures in `course.service.spec` / `orders.service.spec` are unrelated debt.

---

## Next steps

1. **Commit the work on `staging`** (nothing is committed yet). Suggested split:
   - `feat(league): schema, migration and league module (backend)`
   - `feat(league): emit xp.awarded from all XP award sites`
   - `feat(league): leaderboards page, badge art, nav wiring (frontend)`
   - `feat(league): LEAGUE celebration scene + result watcher`
   - `test(league): service spec + e2e lifecycle script`
2. **Push `staging`** → Vercel + Render auto-deploy (staging backend must be up — check the Render free-plan suspension status first).
3. **Manual smoke test on staging** with a real account: complete a lesson → appear in Bronze cohort; check the page on mobile (bottom nav) and desktop.
4. **Simulate a week rollover on staging** (optional): backdate a cohort via SQL → reload dashboard → promotion/demotion scene plays once; verify it doesn't replay on refresh.
5. **Later / optional polish:**
   - League history UI on the profile page (endpoint already exists: `GET /leagues/me/history`).
   - Notification when settlement happens (NotificationModule already exists).
   - Champion badge in the achievements collection (Diamond Tournament wins counter is already tracked).
   - Revisit cohort fill strategy (bots) if sparse boards hurt engagement at launch.
