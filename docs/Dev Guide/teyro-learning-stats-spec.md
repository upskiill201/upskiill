# Teyro — "Learning Stats" Feature Spec
**Status:** Ready for engineering handoff
**Owner:** Joel Ndakwe
**Feature:** Home Screen v2 → Learning Stats widget + `/dashboard/profile/analytics` deep-dive page

---

## PART 0 — How This Feature Actually Works (read this first)

### What kind of feature this is

This is the odd one out among the features built so far — Today's Mission, Mystery Chest, and Weekly Lucky Spin are all reward loops with a claim step and an animation payoff. Learning Stats has no reward, no claim, nothing to win. Its job is **reflection, not action** — it's the part of the Hook Model's "investment" stage that shows the student the value they've already stored up (Nir Eyal's stored-value idea: the more they use the product, the more evidence accumulates that they're actually becoming someone who does this). Get this one wrong and it's just a boring stat card; get it right and it's quiet proof to the student that the habit is working, which is its own kind of pull back into the app.

Two things follow from that:
1. **The numbers have to be trustworthy.** Unlike a reward pull, where "it feels exciting" is most of the job, here "it's accurate and doesn't contradict itself" is most of the job. A wrong lesson count or a rank that flickers between two values on refresh does real damage to trust in every other number in the app.
2. **It's a funnel, not a dead end.** The widget is a compressed preview; "View More Stats" is where the actual depth lives. The widget's job is to be interesting enough to make the tap happen, not to be the final answer.

### The journey

**1. Student sees the widget on the home screen.**
Four numbers (Lessons, Hours, XP Earned, Rank) for a selected time period (defaulting to whatever period the screenshot shows — "This Month"), plus a period selector and a "View More Stats" link.

**2. Student changes the period** (e.g., This Week → This Month → All Time).
All four numbers update together, consistently, for the same underlying date range — never a state where Lessons reflects "This Week" while Rank is still showing last period's value.

**3. Student taps "View More Stats."**
They land on `/dashboard/profile/analytics`, which opens already scoped to the same period they had selected on the home screen (carried via a route param) — not reset back to a default, which would feel like the app forgot what they were just looking at. This page is the actual analytics destination: trends over time, a course-by-course breakdown, and the full numbers behind the summary tiles.

**4. Underlying activity keeps happening.**
If the student completes a lesson while the widget is visible, the numbers should ideally reflect that without a manual refresh — same real-time philosophy as the other three features, though this is lower-stakes here than a reward claim (§4 covers why this is a nice-to-have here rather than a hard requirement).

---

## PART 1 — Data Architecture: Why This Needs Rollups, Not Live Aggregation

Every number on this widget could, in principle, be computed by querying raw event tables directly ("sum XP transactions where created_at is in this range"). That does not scale — by the time there are meaningfully large numbers of users with months of history, a live aggregation query per widget load is a real cost, and it only gets worse for the full analytics page's trend charts, which need this data sliced many different ways.

**Approach: a daily rollup table, updated incrementally by the same event consumers already built for the other features.**

`user_daily_stats` — one row per user per calendar day (in the user's local timezone, same principle used throughout the other specs):

| Column | Type | Notes |
|---|---|---|
| `user_id` | uuid | |
| `stat_date` | date | user's local date |
| `lessons_completed` | int | incremented by the same `LessonCompletedEvent` consumer pattern from Today's Mission |
| `xp_earned` | int | incremented by the same `XPEarnedEvent` consumer |
| `minutes_active` | int | see §1.1 — this is the one genuinely new tracking mechanism this feature needs |

Composite primary key `(user_id, stat_date)`, upserted incrementally as events arrive — never recomputed from scratch on read. Period queries (This Week / This Month / All Time) become a simple indexed `SUM(...) WHERE user_id = ? AND stat_date BETWEEN ? AND ?` — fast regardless of how much history a user has, and the same table directly powers the trend charts on the full analytics page without a separate pipeline.

### 1.1 "Hours" needs its own tracking mechanism — this is the real engineering lift in this feature

Lesson completion and XP already have events firing elsewhere in the app (reused, not rebuilt, per the table above). **Active time spent does not currently have an equivalent signal**, and it's worth being explicit that "Hours: 5.8" is a genuinely different kind of measurement than the other three tiles:

- **Not** derived from a lesson's authored/expected duration (that measures the content, not the student — two students who both "complete" a 10-minute lesson may have spent very different actual time on it).
- **Should be** derived from actual session activity: the client sends lightweight heartbeat pings (e.g., every 30–60s) while the student is actively engaged in a lesson (foreground, not idle). The backend sums heartbeat intervals into `minutes_active` for that day, and explicitly does **not** count time where the tab was backgrounded, the device was locked, or no heartbeat arrived for longer than some idle threshold (so leaving a lesson open overnight doesn't add 8 hours to someone's stats).
- This needs its own dedicated ticket and its own edge-case handling (§7.4) — it's not a byproduct of the other two event types, and it's the number most vulnerable to being wrong if built carelessly (either undercounting genuine focused time, or overcounting idle/backgrounded time).

---

## PART 2 — Rank / Percentile: Reuse the Leaderboard's Own Ranking, Don't Build a Second One

The home screen already has a separate Leaderboard feature. **This widget's "Rank: Top 14%" must be derived from the same underlying ranking computation the Leaderboard uses**, not a parallel calculation — if these two disagreed about where a student stands, that's a worse trust problem than either number being individually imperfect.

### 2.1 What "Rank" measures

Needs to be confirmed against however the Leaderboard already defines ranking (§9.1) — most likely XP earned within the selected period, compared against a cohort. Whatever that definition is, this widget should call the same ranking service/query, scoped to the widget's currently selected period, rather than reimplementing percentile math independently.

### 2.2 Why rank can't be computed live, per-request

Computing "what percentile am I in" requires knowing where every other relevant user stands, which is not something to run as a synchronous query on every widget load. This should be a **periodic batch computation** (e.g., nightly, or however frequently the Leaderboard itself already refreshes rankings) that produces a `user_rank_snapshots` table the widget reads from — meaning the displayed rank has some inherent lag (freshness caveat, §7.2), same as most real product leaderboards do.

### 2.3 Cohort size matters

A percentile computed against a tiny cohort (e.g., a brand-new course with 4 enrolled students) is misleading — "Top 14%" sounds meaningful but could just mean "3rd out of 4 people." Define a minimum cohort size below which the widget shows a neutral state ("Not enough learners yet to rank you") instead of a real but meaningless percentage (§7.3).

---

## PART 3 — Period Selector Behavior

- Options: at minimum This Week / This Month / All Time (confirm exact set and default against the actual dropdown options intended — the screenshot only shows "This Month" selected, not the full menu).
- Changing the period triggers **one** request for the full tile set (or a client-side recompute from an already-fetched wider dataset, if that's cheaper — see §4), never four independent requests per tile that could resolve out of order and show mismatched periods across tiles even momentarily.
- Numbers transition with a brief count-up/count-down tween (similar mechanism to the balance counters in the other three specs, just without the fly-in icon — this is a readout, not a reward) rather than an instant jump-cut, so the change registers as "the same widget showing different data" rather than a flicker.
- Loading state: skeleton placeholders on the four tiles while a period switch is in flight, not a blank widget or stale numbers sitting there silently while a new request resolves.

---

## PART 4 — Frontend State Management & Real-Time Considerations

- React Query cache keyed by `['learningStats', period]`. Switching periods is a cache-key change, so previously-viewed periods can restore instantly from cache without a network round trip if the student flips back and forth.
- **Real-time updates are a nice-to-have here, not a hard requirement**, unlike the reward features. Recommend: reuse the same piggyback mechanism (§ Today's Mission, Part 1.1) by having `POST /lessons/:id/complete` optionally include an updated `todayStatsDelta` the client can merge into the currently-displayed period's numbers if "This Week" or "This Month" is the active selection (both would include today). This keeps the app's overall real-time philosophy consistent without requiring a dedicated Realtime subscription just for a stat readout — flag as a phase-2 nice-to-have if timeline is tight (§12.1), since staleness here is genuinely lower-stakes than a stuck reward claim.
- No optimistic updates needed here — there's no claim/grant sequence to protect against, so a straightforward fetch-and-render is fine.

---

## PART 5 — "View More Stats" → `/dashboard/profile/analytics`

### 5.1 Navigation & context carry-over

Tapping "View More Stats" navigates with the currently selected period as a route/query param, e.g. `/dashboard/profile/analytics?period=month` — the destination page should initialize its own period selector to match, not reset to its own default. This is a small detail but it's the difference between the navigation feeling continuous versus feeling like two disconnected screens that happen to be linked.

### 5.2 What the analytics page should contain (content outline, for design/product to refine — engineering-relevant scope only)

- **Expanded summary tiles**: the same four numbers, plus additional context the compact widget doesn't have room for (e.g., current streak, best single day, days active out of days in period).
- **Trend chart**: lessons/XP/hours over time within the selected period (line or bar), sourced directly from `user_daily_stats` (§1) — this table was specifically designed to serve this without a separate data pipeline.
- **Course-by-course breakdown**: stats split per enrolled course, not just an app-wide total — likely the single most-requested drill-down once a student has more than one course going.
- **Rank detail**: the same rank shown on the widget, plus (if the cohort/comparison model supports it) some context on what it's measured against, so "Top 14%" doesn't feel like an unexplained number dropped on the page.

This section is intentionally a scope outline, not a full spec of the analytics page — that page likely deserves its own dedicated spec pass once the widget's data foundation (Parts 1–2) is built, since the trend chart and course breakdown both depend directly on `user_daily_stats` existing and being correct first.

---

## PART 6 — Data Model (summary)

Already introduced above; consolidated here for reference:

- **`user_daily_stats`** (§1) — `(user_id, stat_date)` PK, `lessons_completed`, `xp_earned`, `minutes_active`. Updated incrementally by event consumers, never recomputed from scratch.
- **`user_rank_snapshots`** (§2.2) — `user_id`, `period_type`, `period_start`, `rank_percentile`, `cohort_size`, `computed_at`. Written by the periodic batch job, read (not computed) by both this widget and the Leaderboard feature.
- **Course-level breakdown** (for the full analytics page, §5.2) reuses existing per-course progress data already tracked elsewhere in the platform — not a new table, just a new aggregation view over data that already exists.

---

## PART 7 — Edge Cases & Error Handling

### 7.1 Timezone boundaries
Same principle as every other feature in this series — "This Week" and "This Month" boundaries are computed in the user's stored local timezone, not server UTC, and `stat_date` in the rollup table is written in that same local-date terms so period sums line up correctly.

### 7.2 Rank freshness / staleness
Because rank is a batch computation (§2.2), it can lag actual current activity by up to a full batch cycle. This should be surfaced honestly rather than implied to be live — e.g. a small "as of [time]" note on the rank tile or the analytics page, rather than letting it silently imply real-time accuracy it doesn't have.

### 7.3 Small cohort / insufficient data for rank
Below a defined minimum cohort size (§2.3), show a neutral "not enough data yet" state rather than a technically-correct-but-meaningless percentage. Same principle for a brand-new student with no activity yet in the selected period — see §7.5.

### 7.4 "Hours" undercounting or overcounting
- **Overcounting risk:** a lesson left open in a backgrounded tab overnight must not accumulate real minutes — heartbeat pings from a backgrounded/inactive tab should stop or be explicitly excluded, and any gap beyond an idle threshold should not be backfilled as active time.
- **Undercounting risk:** heartbeat interval too long relative to how briefly a genuinely fast learner spends on a lesson could undercount short, real sessions. Tune the heartbeat interval and the idle threshold together, and test against realistic fast-completion sessions, not just long ones (§10).
- **Missed heartbeats from network issues:** a dropped heartbeat shouldn't be treated as "was idle" and silently zero out that interval if the *next* heartbeat arrives on schedule — a brief network hiccup shouldn't cost the student real tracked time. Define a reasonable grace window before an interval is discarded as idle.

### 7.5 New user / zero-activity period
A student with genuinely zero activity in the selected period should see an encouraging empty/low-data state ("Complete a lesson to start tracking this week!") rather than a discouraging or confusing set of literal zeros with no framing — this is a copy/UX detail worth deciding deliberately (§12.2), not defaulting to a bare "0" across all four tiles.

### 7.6 Period selector race condition
If the student switches periods rapidly (e.g., taps through This Week → This Month → All Time quickly), only the response matching the **currently selected** period should ever be rendered — an earlier, slower-resolving request for a period the student has already navigated away from must not overwrite the current, correct display when it eventually completes. Standard "ignore stale responses" handling in the data layer (React Query naturally handles this by request key, but confirm defaults line up given the discussion in §4).

### 7.7 Piggybacked real-time delta doesn't match the active period
If the phase-2 real-time delta (§4) fires while "All Time" is selected, a same-day lesson completion should still be reflected (it's part of All Time too) — the merge logic needs to apply correctly regardless of which period is currently active, not just for "This Week"/"This Month" as the more obvious cases.

### 7.8 Navigation deep-link with an invalid/unsupported period param
If `/dashboard/profile/analytics?period=xyz` is reached with a malformed or unsupported period value (direct URL entry, old bookmark after a period-option change), fall back to a sensible default rather than erroring the page.

---

## PART 8 — API Summary

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/stats/summary?period=week\|month\|all_time` | Returns the four widget tiles' values for the given period |
| `GET` | `/api/stats/analytics?period=...` | Returns the fuller dataset backing `/dashboard/profile/analytics` — trend series, course breakdown, expanded tiles |

`POST /lessons/:id/complete` optionally gains a `todayStatsDelta` field if the phase-2 real-time merge (§4) is implemented — not a new endpoint, an addition to an existing response, consistent with how the other three features integrate with this same endpoint.

---

## PART 9 — Open Questions to Confirm Against the Existing Leaderboard System

Rather than analytics events, the priority here is confirming a few things against systems that already exist elsewhere in the app, since this feature is explicitly designed to reuse them rather than duplicate them:

9.1. **Exact ranking definition** — confirm what metric and cohort the existing Leaderboard uses, so `user_rank_snapshots` (§2, §6) computes the identical thing rather than a plausible-but-different approximation.
9.2. **Batch cadence** — confirm how often the Leaderboard's own rankings refresh, so this feature's rank freshness (§7.2) matches rather than introducing a second, different lag.
9.3. **Minimum cohort size** — confirm whether the Leaderboard already has a defined minimum-cohort rule (§2.3, §7.3) to reuse, rather than this feature inventing its own threshold that could disagree with the Leaderboard's.

---

## PART 10 — Test Coverage

### Unit
- Rollup upsert logic: repeated events for the same `(user_id, stat_date)` correctly accumulate rather than overwrite; correct handling of the local-date boundary at midnight.
- Period-sum query: correct results for This Week / This Month / All Time across a range of test dates and timezones, including a user who just crossed a period boundary mid-session.
- Heartbeat aggregation: correct `minutes_active` accumulation for continuous activity; correctly excludes gaps beyond the idle threshold; correctly handles a single missed-then-recovered heartbeat within the grace window (§7.4) without discarding legitimate active time.
- Rank percentile calculation: correct percentile math against a known synthetic cohort; correct fallback behavior below the minimum cohort size.

### Integration
- `GET /api/stats/summary`: consistent results across all four tiles for a given period (no tile computed against a subtly different date range than the others).
- Period switch: rapid sequential requests resolve with only the latest-selected period ever rendered (§7.6).
- Navigation deep link: `/dashboard/profile/analytics?period=month` correctly initializes to the "month" view; malformed param falls back gracefully (§7.8).
- Rank freshness: `computed_at` timestamp on `user_rank_snapshots` is surfaced correctly and matches the actual batch job's last run.

### End-to-end
- Complete a lesson → (once the phase-2 real-time delta is implemented) widget's "This Week"/"This Month"/"All Time" numbers update without a manual refresh, correctly, regardless of which period is currently selected (§7.7).
- Switch periods on the widget → all four tiles update together, count-up transition plays, no mismatched-period flicker.
- Tap "View More Stats" → lands on the analytics page pre-scoped to the same period, not reset to a default.
- New user with zero activity → widget shows the encouraging empty state, not bare zeros (§7.5).
- Small-cohort student → rank tile shows the neutral "not enough data" state rather than a real-looking but meaningless percentile (§7.3).
- Simulated backgrounded-tab-overnight session → `minutes_active` for that day does not include the idle overnight gap (§7.4).

### Manual QA / trust check
- Spot-check a handful of real accounts' displayed numbers against a manual query of the underlying raw events, across at least one of each: a brand-new user, a long-tenured heavy user, and a user who's part of a very small course cohort — this is the kind of feature where "the number looks plausible" isn't sufficient confidence, since a wrong number here is a trust problem, not just a cosmetic one.

---

## PART 11 — Engineering Tickets

**TEYRO-STATS-1: `user_daily_stats` rollup table & event consumer wiring**
Schema per Part 6; wire `LessonCompletedEvent` and `XPEarnedEvent` consumers to upsert incrementally (reusing the same event infrastructure already built for Today's Mission, not a parallel system).

**TEYRO-STATS-2: Active-time heartbeat tracking**
Client-side heartbeat pings during active lesson sessions, backend aggregation into `minutes_active` with idle-gap exclusion and the missed-heartbeat grace window (§1.1, §7.4). This is the ticket most worth padding on estimate — it's the genuinely new tracking mechanism in this feature, everything else reuses existing systems.

**TEYRO-STATS-3: Rank computation batch job**
Periodic job producing `user_rank_snapshots`, built against the confirmed existing Leaderboard ranking definition and cadence (§9), with the minimum-cohort-size fallback.

**TEYRO-STATS-4: `GET /api/stats/summary` endpoint**
Period-scoped tile query per Part 3/§7.1, correct timezone handling, single consistent response for all four tiles.

**TEYRO-STATS-5: Home screen widget frontend**
Period selector, count-up number transitions, loading skeletons, empty-state copy (§7.5), navigation to the analytics page with period carried over (§5.1).

**TEYRO-STATS-6: `GET /api/stats/analytics` + `/dashboard/profile/analytics` page**
Trend chart and course breakdown sourced from `user_daily_stats`, expanded tiles, rank detail with freshness note (§7.2), deep-link period param handling (§7.8) — scoped per the content outline in §5.2, likely deserving its own follow-up spec once this foundation exists.

**TEYRO-STATS-7 (phase 2, optional): Real-time stats delta**
`todayStatsDelta` addition to the lesson-complete response and client-side merge logic per §4, correctly applied regardless of active period (§7.7).

**TEYRO-STATS-8: Test suite**
Full matrix from Part 10, including the manual trust-check pass against real account data before this ships.

---

## PART 12 — Open Product Decisions (flag before/during build)

1. **Real-time updates: build now or phase 2?** (§4, TEYRO-STATS-7) — recommend phase 2 given lower stakes than the reward features, but confirm that's acceptable given the "always live, no refresh" philosophy established elsewhere in the app.
2. **Empty-state copy and exact zero-activity treatment** (§7.5) — needs actual copy, not just "something encouraging."
3. **Minimum cohort size for rank** (§2.3, §7.3, §9.3) — confirm against existing Leaderboard logic rather than inventing a new threshold.
4. **Exact period selector options** — confirm the full dropdown menu (This Week / This Month / All Time, or something more granular like Last 7 Days / Last 30 Days) since the screenshot only shows one selected value, not the full option set.
5. **Heartbeat interval and idle threshold values** (§1.1, §7.4) — concrete numbers (e.g. 30s ping, 2min idle cutoff) need to be chosen and tuned, not left implicit.
6. **Scope of `/dashboard/profile/analytics`** (§5.2) — confirm whether this spec's content outline is sufficient to start engineering against, or whether it needs its own dedicated design/spec pass before TEYRO-STATS-6 is built.
