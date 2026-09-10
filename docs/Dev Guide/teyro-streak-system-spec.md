# Teyro — Streak System Spec
**Status:** Ready for engineering + design handoff
**Owner:** Joel Ndakwe
**Feature:** Core streak tracking (backend) + the streak flame, calendar modal, and Streak Society/Friend Streaks UI (frontend) — built to match Duolingo's model closely

**Reference screenshots:** four Duolingo screenshots are being sent to the dev alongside this document — desktop streak modal (Personal tab with calendar, Image 2), Friends tab empty state (Image 3), the flame counter + modal in context on the learn page (Image 1), and the mobile stacked layout (Image 4). Build the UI directly against these; this document specifies the *behavior and logic* underneath them.

---

## PART 0 — How This Feature Actually Works (read this first)

### What a streak actually is

A streak is one number — "how many days in a row have you shown up" — but it's the single most-cited mechanic for why habit apps like Duolingo work, because it converts a soft feeling ("I've been consistent") into a hard, visible number the student doesn't want to see drop to zero. Nir Eyal's loss-aversion framing applies directly here: the fear of *losing* a 12-day streak pulls harder than the appeal of building an unknown future one. Everything in this spec exists in service of that number being **always accurate, always visible, and worth protecting.**

### The journey

**1. Student completes a lesson today.**
If they haven't already completed one today, their streak count increments by one. The flame icon in the top stats bar (already visible across the app) updates — per the RewardRun spec's §2.4, this is a direct pulse-and-count-up at the stats bar itself, not a flying icon, since a streak day isn't "collected" from a source the way a coin is.

**2. Student taps the flame icon.**
A modal opens (Image 1/2) with two tabs — **Personal** and **Friends**. Personal shows the current streak count, a calendar of the current month with active days marked, and (if this is genuinely their longest streak ever) a personal-best banner. If they're below a 7-day streak, a locked "Streak Society" teaser is shown underneath, same as Duolingo's.

**3. If they miss a day entirely,** the streak resets — unless they're holding a Streak Freeze (already part of Teyro's inventory system from the Mystery Chest/Shop specs), which automatically covers exactly one missed day and keeps the streak alive.

**4. The Friends tab** is the shell for a paired "streak with a friend" feature — shown here as an empty state with an "Add Friends" CTA (Image 3), matching Duolingo, but the full mutual-streak logic depends on Teyro having an actual friends/follow system, which isn't confirmed to exist yet — scoped explicitly in Part 4 as a dependency, not built blind here.

---

## PART 1 — Core Streak Logic (the part that has to be exactly right)

### 1.1 What counts as a streak day
**At least one lesson completed within a given calendar day, in the student's local timezone** — this is the rule stated directly in your ask, and it's also the same rule already being tracked for the Learning Stats feature's `user_daily_stats.lessons_completed` — this spec reuses that table rather than tracking a second, parallel record of "was the student active today" (§3).

### 1.2 Canonical fields (fixing a real bug flagged in the diagnostic trace)
The diagnostic trace already surfaced that streak logic in the current codebase is split across inconsistent fields (`lastActiveAt` used by quest claiming, a separate streak calculation elsewhere, and a timezone offset that gets ignored in the actual day-boundary comparison). This spec defines the **one** canonical source of truth going forward:

| Field | Meaning |
|---|---|
| `currentStreak` | consecutive days including today, if today already counts |
| `longestStreak` | personal best, ever |
| `lastStreakDate` | the last local calendar date that counted toward the streak |

Every feature that touches streaks — lesson completion, the streak-protection banner, missions' `STREAK_ACTIVE` type, Herald, RewardRun's pulse — reads and writes through this one source, not independent calculations. This directly fixes the trace's finding that quest claiming used a different field than lesson completion.

### 1.3 The update algorithm (runs on lesson completion)
```
today = current date in student's local timezone (stored IANA tz, same rule used throughout this whole spec series)

if lastStreakDate == today:
    # already counted today, no change
    return

daysSinceLastStreak = today - lastStreakDate   # in whole days; null lastStreakDate = first-ever activity

if lastStreakDate is null:
    currentStreak = 1

elif daysSinceLastStreak == 1:
    # consecutive day
    currentStreak += 1

elif daysSinceLastStreak > 1:
    missedDays = daysSinceLastStreak - 1
    if freezesAvailable >= missedDays:
        consume(missedDays, from: user_inventory.STREAK_FREEZE)   # §2
        currentStreak += 1   # today extends the streak, missed days were "covered"
    else:
        currentStreak = 1    # streak broken, today starts a fresh one

lastStreakDate = today
wasNewPersonalBest = currentStreak > longestStreak
longestStreak = max(longestStreak, currentStreak)
```

`wasNewPersonalBest` is exactly what drives the "You've earned your longest streak ever!" banner (Image 2) — and per §6.3, it should only ever be shown as a fresh celebration once, not every time the student happens to reopen the modal afterward.

### 1.4 Removing the "streak recovery/initialization" bug
The diagnostic trace found a code path (`GamificationService.getMyStats()`) that can initialize or "recover" a streak to a hardcoded 3 days under some condition. **This should not exist.** Streak state must only ever be a true function of actual completion history (§1.3's algorithm, backed by real `user_daily_stats` rows) — never a shortcut that sets an arbitrary value. Remove this path as part of building the canonical system in §1.2.

---

## PART 2 — Streak Freeze Interaction

Streak Freeze is already part of Teyro's inventory system (introduced in the Mystery Chest and Weekly Spin specs, stored in the shared `user_inventory` table) — this spec doesn't create a new item type, it defines exactly how the existing one gets consumed.

- **One freeze covers exactly one missed day** (§1.3's `missedDays` count) — if a student misses 2 days in a row and holds 2+ freezes, both get consumed automatically to bridge the gap; if they hold fewer freezes than missed days, the streak resets rather than partially applying.
- Consumption is automatic — the student doesn't get asked "use a freeze?" after the fact, since by the time they're back in the app the missed day has already passed; this matches Duolingo's own behavior (freezes protect retroactively, not proactively).
- **A freeze-triggered save should feel different from a genuine streak extension** — recommend a distinct "Streak Freeze used — your streak is safe!" toast/moment rather than the identical celebratory pulse used for a normal day's increment (§6.2 in RewardRun's spec already establishes per-currency/event visual differentiation as a pattern; this is the same principle applied here) — flagged as a design decision to confirm (§9.1), not hard-coded as identical to a normal streak day by default.

---

## PART 3 — Personal Tab: Calendar & Data Reuse

### 3.1 Reusing `user_daily_stats` instead of a new table
The Learning Stats spec already introduced `user_daily_stats` (one row per user per local day, tracking `lessons_completed`). The streak calendar (Image 2/4) needs exactly this data — "was the student active on day X" — so it should query that same table (`lessons_completed > 0` for a given date) rather than maintaining a second, parallel "active days" record that could drift out of sync with it.

### 3.2 Calendar rendering rules
- Today: highlighted distinctly (filled orange circle in the reference).
- Days within the current active streak: visually marked as "on-streak."
- Days that broke a previous streak (a gap, even if a freeze later covered a *different* gap): shown as neutral/inactive, not marked.
- Future days: neutral, no marking.
- Month navigation (prev/next arrows per the reference) should be able to show streak history from past months, not just the current one — the underlying `user_daily_stats` query already supports any date range.

### 3.3 Streak Society (locked teaser, current scope)
Per the reference (locked at <7-day streak, "Reach a 7 day streak to join the Streak Society and earn exclusive rewards"), this spec covers **the locked teaser UI and the threshold check only** — build the card showing the lock, the 7-day requirement, and unlock it visually once `currentStreak >= 7`. **What Streak Society actually grants once unlocked is out of scope here** and needs its own product decision (§9.2) before building further — don't invent reward content to fill the unlock state.

---

## PART 4 — Friends Tab: Scoped as a UI Shell, Not the Full Feature

Duolingo's Friend Streaks is a **mutual** streak between two specific users — both have to be active each day to keep their shared flame alive, distinct from either person's personal streak. This is a materially bigger feature than the personal streak system (it needs a real friend/follow relationship, a second streak-tracking entity per friend pair, and its own break/reset/notification logic for *two* people instead of one).

**Recommendation for this pass:** build the Friends tab as the empty-state shell shown in Image 3 — the illustration, the "Start Friend Streaks to make daily progress together!" copy, and an "Add Friends" CTA — without the underlying mutual-streak logic yet. This matches what a student would see before ever adding a friend regardless, so it's not a placeholder that needs ripping out later, it's the correct first state of the real feature.

Teyro's home screen already shows a "Friends Activity" widget (activity from other learners in the *same course*), which is not the same thing as a mutual friends/follow system — confirm whether that concept already extends to actual friend relationships, or whether Friend Streaks needs its own dependency spec once a friends system is scoped (§9.3).

---

## PART 5 — Data Model

Extending the existing student profile (or a dedicated `user_streak` table, whichever fits the current schema better):

| Column | Type | Notes |
|---|---|---|
| `current_streak` | int | §1.2 |
| `longest_streak` | int | §1.2 |
| `last_streak_date` | date | §1.2 — the one canonical field, replacing whatever mix of fields the trace found |

Reused, not newly created:
- `user_inventory` (`STREAK_FREEZE` quantity) — from the Mystery Chest/Weekly Spin specs.
- `user_daily_stats` (`lessons_completed`) — from the Learning Stats spec, now also powering the calendar.

Optional but recommended:
- `streak_events` — a lightweight append-only log (`user_id`, `event_type`: `EXTENDED` / `FREEZE_CONSUMED` / `RESET`, `date`, `resulting_streak`) — genuinely useful for support/debugging when a student disputes "why did my streak reset," which is one of the most common support tickets for apps with this mechanic.

---

## PART 6 — Real-Time / No-Refresh Guarantee

### 6.1 Piggyback on the lesson-complete response
Consistent with every other feature in this series, `POST /lessons/:id/complete` gains:

```
→ {
    ...,
    streakUpdate: {
      currentStreak,
      longestStreak,
      isNewPersonalBest,
      freezeConsumed: false   // or the count consumed, per §2
    }
  }
```

This is what RewardRun's existing streak-pulse animation (its spec, §2.4) consumes directly — no separate fetch needed for the stats-bar flame to update live, wherever in the app the lesson was completed (including via Herald, per that spec, if the completion happens somewhere the stats bar isn't the student's current focus).

### 6.2 Modal's own data
When the student actually opens the streak modal, it fetches fresh via `GET /api/streak/me` (current/longest/freezes available) and `GET /api/streak/calendar?month=YYYY-MM` (backed by `user_daily_stats`, §3.1) — this doesn't need to be real-time-pushed the way the stats bar counter does, since it's only relevant while the modal is actually open.

### 6.3 Personal-best banner: show once, not every time
`isNewPersonalBest` should only surface the celebratory banner **the first time it's true after actually happening** — if the student closes the modal and reopens it later the same day (or any day after), the banner shouldn't reappear just because `currentStreak` still happens to equal `longestStreak`. Track this the same way Herald tracks "already surfaced this session/transition" (that spec's §2.2) — key it off the specific date the record was set, not off a live comparison every time the modal opens.

---

## PART 7 — Edge Cases & Error Handling

### 7.1 Timezone changes (student travels)
Same governing rule as every other spec in this series — `today` is always computed from the student's stored IANA timezone, never server UTC. If the timezone itself changes (e.g., the student updates it, or it's re-detected on a trip), the very next completion's day-boundary check should use the new timezone going forward — don't attempt to retroactively recompute past days.

### 7.2 Multiple lessons completed same day
`lastStreakDate == today` check (§1.3) prevents double-incrementing — the second, third, etc. lesson that day still returns a `streakUpdate` payload (so the frontend has consistent data to work with) but with no change to `currentStreak`.

### 7.3 Freeze count exactly insufficient
If missed days = 2 and the student holds exactly 1 freeze, per §1.3's algorithm the streak resets (all-or-nothing per the gap, not partial credit) — confirm this matches the intended policy, since Duolingo's actual behavior here is worth double-checking directly rather than assuming (§9.1 covers the freeze-consumption policy as an explicit decision point).

### 7.4 Streak-protection banner consistency
The home screen already shows a banner ("Finish one lesson today to protect your 3-day streak") — this must be driven by the exact same `currentStreak`/`lastStreakDate` state defined here, not a separately maintained calculation, or the banner and the modal could disagree about the student's actual streak.

### 7.5 Removing the recovery/initialization bug (§1.4) without breaking existing users
If any current users already have a streak value that came from the buggy recovery path, migrating to the canonical system (§1.2) needs a one-time reconciliation pass — decide whether to trust existing `currentStreak` values as-is at migration time, or recompute them retroactively from `user_daily_stats` history where available (more accurate, but only possible as far back as that table has data).

### 7.6 Friends tab before the dependency (§4) is resolved
The empty-state shell should render correctly and never error even if no friends/mutual-streak backend exists yet — the "Add Friends" CTA can lead to whatever friend-adding flow already exists (or a "coming soon" state) without blocking the rest of this spec's core streak system from shipping.

### 7.7 Realtime/cross-device consistency
Same Supabase Realtime pattern as the rest of the series — if a lesson is completed on one device, the streak flame and any open modal on a second device/tab reflect it without a manual refresh.

---

## PART 8 — API Summary

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/streak/me` | Current streak, longest streak, freezes available |
| `GET` | `/api/streak/calendar?month=YYYY-MM` | Active/inactive days for the given month, backed by `user_daily_stats` |

`POST /lessons/:id/complete` gains the `streakUpdate` field (§6.1) — not a new endpoint, an addition to the same response already growing to carry RewardRun, Today's Mission, Mystery Chest, and Lesson Path Unlock data.

---

## PART 9 — Open Product Decisions (flag before/during build)

1. **Freeze-consumption feedback**: identical visual/audio treatment to a normal streak extension, or a distinct "Streak Freeze used" moment? (§2) Recommend distinct, needs confirmation.
2. **What Streak Society actually grants once unlocked** (§3.3) — this spec only builds the locked teaser and the 7-day threshold check; the actual reward/benefit needs its own decision and likely its own follow-up spec.
3. **Friend Streaks dependency** (§4) — confirm whether a friends/follow system already exists or is planned, and whether the mutual-streak logic should be scoped now or genuinely deferred until that dependency is resolved.
4. **Freeze shortfall policy** (§7.3) — confirm all-or-nothing per gap (this spec's default) matches the intended design, versus, e.g., partial credit or a different threshold rule.
5. **Historical data migration** (§7.5) — how to reconcile existing (possibly bugged) streak values against the new canonical system at rollout.
