# Teyro — "Today's Mission" Feature Spec
**Status:** Ready for engineering handoff
**Owner:** Joel Ndakwe
**Feature:** Home Screen v2 → Today's Mission widget

---

## PART 0 — How This Feature Actually Works (read this first)

This section is the full experience, end to end, before any implementation detail. Everything below it exists to make this section true in production.

### The journey

**1. Student opens the app.**
`GET /api/missions/today` fires as part of the home screen load. If no mission set exists yet for this user's local "today," one is generated server-side in the same request (lazy generation, §3) — the student never sees a loading/empty state for missions, it's just there.

**2. Student does the actual thing (finishes a lesson).**
This is the important part: **mission progress is never a separate system the student has to "check."** It rides along on actions they're already taking. When they complete a lesson, the `POST /lessons/:id/complete` call that already happens returns the updated mission state *in the same response* — `missionsUpdated: [...]`. The client updates the mission cards instantly, in the same beat as the lesson-complete screen, with zero extra network round trip and zero page refresh. See Part 1 for exactly how.

**3. A mission crosses its target.**
The card transitions from "in progress" to "ready to claim" the instant that response comes back — progress bar fills, the CLAIM REWARD button lights up (color change + a subtle pulse/glow loop, GSAP), and a small badge/icon change signals "this is now actionable." This state change is visible immediately, not after a refresh, not after leaving and re-entering the screen.

**4. Student taps Claim.**
Button gives instant tactile feedback (press/scale, no network wait — pure client-side, §2) so it never feels laggy even on a slow connection. The claim request hits the server. On success:
- A coin/XP icon visually detaches from the mission card and flies to the top nav balance counter along a curved path (~700ms).
- The top balance counter bumps and counts up from old value to new value.
- The mission card locks into a "Claimed ✓" state — dimmed, checkmark, button replaced with a static label. It cannot be tapped again; the Claim button is not just disabled, it's **gone**, replaced entirely.
- Tey (the mascot) reacts — a quick excited animation state, maybe a one-line comment.

This is the "juice" — see Part 2 for exact choreography.

**5. Student refreshes the page, closes the app, comes back tomorrow.**
The claimed mission is claimed, permanently, because it's a database fact, not client state. There is no code path where a refresh, a second tab, a second device, or a flaky network re-opens a claimed mission or re-grants a reward. If two tabs are open and the student claims from Tab A, Tab B updates itself within a second or two without a manual refresh, because it's subscribed to the same underlying data (§1, real-time sync).

**6. All 3 missions get claimed.**
This is the peak of the loop, and it should feel bigger than an individual claim — a distinct celebratory animation (not just 3x the small one), because that's the moment worth making memorable. See Part 2.4.

**7. Mission day resets.**
At the student's local midnight, that mission set becomes historical. Any mission that was completed but never claimed is gone — the reward is lost. This is a deliberate design choice (loss aversion, ties to the Hook Model's investment stage) and is why a "your reward is about to expire" nudge  fires ~1hr before reset if something's sitting unclaimed (§8.4).

### The rules this journey depends on (stated plainly, then implemented below)

- A student never sees the same mission *type* two days running (generation excludes recent types, §5).
- A reward can be claimed **exactly once**, enforced by the database, not the UI (§7).
- Mission state is never out of sync with reality — no "it says claimed but I didn't get my coins" and no "I definitely finished this but it still says in progress" (§1, §7).
- Every part of the reward feedback (flying coin, counter bump, card lock) only ever plays in response to a **confirmed server state**, never a guess (§2).

---

## PART 1 — Real-Time Completion Detection & No-Refresh Guarantee

The requirement: mission cards must reflect true progress **immediately**, without the student refreshing, and without the app polling aggressively in a way that drains battery/data or feels laggy.

### 1.1 Primary mechanism: piggyback on the action's own response

Every event that can move a mission forward (finishing a lesson, earning XP, maintaining a streak) already requires the client to call a server endpoint to record that action in the first place. So instead of the client completing a lesson, then separately polling "did my missions change?" — the mission-progress delta is computed server-side as part of that same request-response cycle and returned in the payload:

```
POST /api/lessons/:id/complete
→ {
    xpEarned: 20,
    missionsUpdated: [
      { userMissionId, progress, target, status, justCompleted: true }
    ]
  }
```

The client reads `missionsUpdated` off this response and updates the relevant mission card(s) directly — no extra request, no delay, no refresh. This covers the overwhelming majority of cases, since virtually every way a mission progresses is itself a user-initiated, server-recorded action.

### 1.2 Cross-tab / cross-device sync: Supabase Realtime

Because Teyro is on Supabase/Postgres already, subscribe the client to Postgres change events on `user_missions` filtered to the logged-in user (RLS-respecting):

```js
supabase
  .channel('user-missions')
  .on('postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'user_missions', filter: `user_id=eq.${userId}` },
    (payload) => queryClient.setQueryData(['missions', 'today'], mergeMissionUpdate(payload))
  )
  .subscribe()
```

This is the **safety net**, not the primary mechanism — it's what makes a second open tab, or the mobile app in the background, catch up instantly if a claim or progress update happened elsewhere. It also protects against the (rare) case where a mission-advancing event didn't originate from a direct client request (e.g. a backfill job, a support-tool adjustment).

### 1.3 Fallback: refetch on focus

Standard React Query behavior — `refetchOnWindowFocus: true` on the `GET /missions/today` query. If the realtime channel ever drops (network blip, tab was asleep), coming back to the tab triggers a fresh fetch, so state can never silently go stale for long.

### 1.4 Source of truth

The client **never** invents mission state. Every visual state (in progress / completed / claimed) is derived from a server payload — either the initial fetch, the piggybacked action response, or the realtime push. There is no client-side "I think this is done" logic.

---

## PART 2 — Animation & Reward Claim Choreography

Tech stack in use: **GSAP** (Club GreenSock — CustomEase, DrawSVG, CustomBounce), **Rive** for Tey, **Framer Motion** for component-level interaction. This section maps each moment in Part 0 to a concrete animation.

### 2.1 Instant tap feedback (before the network even responds)

The moment the student taps "Claim Reward":
- Button: `scale(1) → scale(0.95) → scale(1)`, ~120ms, `CustomBounce` ease. Pure client-side, fires on `pointerdown`, has zero dependency on the network — this is what makes the button *feel* responsive even on a slow connection.
- Button enters a brief loading micro-state (subtle pulse or spinner swap) while the claim request is in flight. Typical claim response time should be well under 300ms; if it isn't, this is where a slow backend would visibly hurt the feel, so the claim endpoint should be treated as a latency-sensitive path.
- **The reward animation itself does not start until the server confirms success.** This is deliberate — never animate a reward you might have to take back if the claim fails.

### 2.2 The coin/XP flight (on confirmed success)

1. A cloned icon (coin or XP gem, matching `reward_type`) spawns at the mission card's reward position.
2. GSAP timeline animates it along a bezier/arc path to the corresponding balance counter in the top nav (coins icon or XP icon), ~650–800ms, `power2.inOut` or similar — an arc reads as more "alive" than a straight line.
3. On arrival: the target counter does a scale bump (`1 → 1.15 → 1`) and the number itself count-up-animates from old value to new value over ~400ms (RAF-driven tween, not a jump-cut).
4. If a mission grants two currencies at once (e.g. XP + coins), stagger the two flights by ~100ms rather than firing simultaneously — reads cleaner, avoids visual clutter.

### 2.3 Mission card resolution

- Progress bar fills to 100% and locks solid.
- A checkmark badge fades/scales in over the reward icon.
- "CLAIM REWARD" button is replaced (not just disabled) with a static "✓ Claimed" label — removing the interactive element entirely prevents any accidental re-tap from even reaching the network layer.
- Card dims slightly (opacity ~0.7, or a subtle desaturation) to visually signal "done, move on."
- After a short beat (~1.5s, so the student actually sees the confirmed state before anything moves), the card can reorder to the bottom of the mission list or collapse — don't do this instantly, it reads as the card vanishing rather than completing.

### 2.4 The bigger moment: all 3 missions claimed

This should visibly outrank an individual claim, otherwise every claim feels the same and the animation stops registering as a reward (reward fatigue). Recommend: Tey (Rive state machine) shifts into a distinct "celebration" state, a short confetti burst plays across the whole widget (not just one card), and optionally a small bonus (e.g. bonus coins, or a Mystery Chest unlock nudge) is granted — this creates a genuine variable-reward peak at the top of the daily loop rather than three identical beats in a row.

### 2.5 Sound (optional, respect Audio Settings)

A short, distinct claim SFX (not the same as lesson-complete SFX, so the ear can tell them apart) — gated behind the existing Audio Settings toggle in the nav.

### 2.6 Failure state

If the claim request fails (network error, `409`, `410` — see Part 4): button re-enables, a small shake animation plays on the button (`CustomEase`, ~200ms), and an inline toast/error message appears near the card ("Couldn't claim — check your connection" / "This mission's reward already expired, resetting…" for a 410). No partial animation ever plays.

---

## PART 3 — Frontend State Management & Fetching Strategy

- **Data layer:** React Query (or SWR) as the single cache for mission state, keyed `['missions', 'today']`.
- **Global balance store:** top-nav balances (coins, XP, gems, hearts) live in one shared cache/store, not duplicated per-widget state — so a claim from the mission card, a Mystery Chest open, and a Shop purchase all read/write the *same* balance source. This is what prevents balance drift where different parts of the UI show different numbers.
- **Mutation flow for claim:**
  1. `onMouseDown`/`onPointerDown`: fire the client-only tap animation (§2.1), immediately disable the button.
  2. Call the `claimMission` mutation.
  3. `onSuccess`: merge the server response into the React Query cache (mission → `CLAIMED`, balances → new values), then trigger the reward animation callback using the *server-confirmed* values.
  4. `onError`: re-enable the button (unless the error is `410 EXPIRED`, in which case refetch `GET /missions/today` instead so the student sees the real current state, not a re-enabled button for a mission that's actually gone), show inline error/shake.
- **No optimistic reward-state updates.** Optimistic UI is fine for the tap-feedback micro-interaction (§2.1) because it has no data consequence if reverted. It is **not** used for anything that implies a reward was granted, since that has to be reversible-looking if the server disagrees, which feels broken.
- **Realtime subscription** (§1.2) writes into the same React Query cache via `setQueryData`, so there's one rendering path regardless of whether an update came from a direct fetch, a piggybacked action response, or a push.

---

## PART 4 — Data Model

### `mission_templates`
Defines the pool of possible mission types. Config-driven, not hardcoded, so mission types can be added/tuned without a deploy.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `type` | enum | `COMPLETE_LESSONS`, `EARN_XP`, `MAINTAIN_STREAK`, `PRACTICE_SESSION`, `PERFECT_LESSON` (future) |
| `title` | text | e.g. "Complete 1 lesson" |
| `icon` | text | asset key |
| `default_target` | int | e.g. 1, 20 |
| `reward_type` | enum | `XP`, `COINS`, `GEMS` |
| `reward_amount` | int | |
| `difficulty_tier` | enum | `easy`, `medium`, `hard` — used for weighted selection |
| `active` | bool | soft-disable without deleting |

### `daily_mission_sets`
One row per user per mission-day.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK |
| `mission_day` | date | computed in **user's local timezone**, not server UTC (§8.1) |
| `generated_at` | timestamptz | |
| `reset_at` | timestamptz | when this set becomes stale |

### `user_missions`
The individual missions (default N=3) inside a set.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `daily_mission_set_id` | uuid | FK |
| `mission_template_id` | uuid | FK |
| `target` | int | snapshot at generation time — don't join live to the template, or a later template edit could retroactively change an in-progress mission |
| `progress` | int | default 0 |
| `status` | enum | `IN_PROGRESS`, `COMPLETED`, `CLAIMED`, `EXPIRED` |
| `reward_type` | enum | snapshot |
| `reward_amount` | int | snapshot |
| `completed_at` | timestamptz | nullable |
| `claimed_at` | timestamptz | nullable |

### `reward_transactions` (shared ledger — not mission-specific)
Every currency change in the whole app should go through this table, not just missions, so the balance is always derivable from a single append-only source of truth.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | |
| `currency` | enum | `XP`, `COINS`, `GEMS`, `HEARTS` |
| `amount` | int | signed (+/-) |
| `source_type` | enum | `MISSION_CLAIM`, `MYSTERY_CHEST`, `LUCKY_SPIN`, `LESSON_COMPLETE`, `SHOP_PURCHASE`, ... |
| `source_id` | uuid | e.g. the `user_missions.id` being claimed |
| `idempotency_key` | text | **unique constraint** — this single column is what makes "claim twice" structurally impossible, see §7 |
| `created_at` | timestamptz | |

---

## PART 5 — Mission Generation Rules

**Trigger:** Lazy generation on the first `GET /api/missions/today` request of a new mission-day for that user — **not** a global cron job. A cron sweeping all users at UTC midnight is wrong here because users span timezones; lazy generation on first request is naturally timezone-correct and avoids one giant fan-out job.

**Algorithm:**
1. Compute `mission_day` = today's date in `user.timezone`.
2. Check for an existing `daily_mission_sets` row at `(user_id, mission_day)`. If found → return it unchanged (idempotent — a second request the same day never regenerates or resets anything).
3. If not found → select N=3 templates:
   - Weighted random by `difficulty_tier`.
   - **Always include exactly one `COMPLETE_LESSONS` mission** — the anchor mission tying the widget back to the core product loop (open question §9.3 on whether this is a hard rule).
   - **Hard rule: exclude any `type` used in this user's mission sets from the last 2 days.** This is what guarantees "not the same mission every day" — enforced in the selection query, not left to chance.
   - Scale `target` values off the user's trailing 7-day activity average (clamped to a sane min/max), so targets stay achievable-but-effortful whether the student is brand new or advanced. Falls back to `mission_template.default_target` if there's no history yet (new user).
4. Insert `daily_mission_sets` + N `user_missions` rows; `reset_at` = start of next `mission_day` in the user's timezone.

---

## PART 6 — Progress Tracking (event-driven)

Missions do **not** poll for their own updates — they're advanced by consuming domain events that already fire elsewhere in the app.

| Event | Missions it can advance |
|---|---|
| `LessonCompletedEvent` | `COMPLETE_LESSONS` (+1), `PRACTICE_SESSION` if applicable |
| `XPEarnedEvent` | `EARN_XP` (+amount) |
| `StreakMaintainedEvent` (fired once/day when the streak requirement is met) | `MAINTAIN_STREAK` (+1) |

```
for each active user_mission where status = IN_PROGRESS
  and mission_template.type matches event type
  and daily_mission_set.mission_day = today (user tz):
    progress = min(progress + event.value, target)
    if progress >= target:
        status = COMPLETED
        completed_at = now()
        emit MissionCompletedEvent  →  drives §1.1's `missionsUpdated` payload
                                     →  drives realtime push (§1.2)
```

Every consumer call uses the originating event's own idempotency/event ID, so an at-least-once queue redelivering an event can never double-count progress.

---

## PART 7 — Claim Flow: Why Double-Claiming Is Structurally Impossible

**Endpoint:** `POST /api/missions/:userMissionId/claim`

```
BEGIN TRANSACTION
  1. SELECT user_mission FOR UPDATE (row lock — blocks a concurrent second claim
     request on the exact same mission from reading a stale pre-claim state)
  2. Validate:
     - exists and belongs to requesting user            → else 404
     - status == COMPLETED                               → else 409 MISSION_NOT_CLAIMABLE
     - daily_mission_set.mission_day == today (user tz)  → else 410 MISSION_EXPIRED
  3. Insert reward_transactions row with
       idempotency_key = `mission_claim:{user_mission_id}`
     → the UNIQUE CONSTRAINT on this column means a retried or duplicated
       request produces a constraint violation, which the handler catches
       and treats as "already claimed, return the existing result" — not
       a second grant. This is the actual mechanism that makes double-claiming
       impossible, not just UI disabling.
  4. Apply the balance change (increment user's live XP/coins/gems)
  5. status = CLAIMED, claimed_at = now()
COMMIT

Return: { newBalance: {...}, rewardGranted: {...}, missionId }
```

**Why this survives a refresh:** `status` and `claimed_at` are database columns. `GET /missions/today` always reads current DB state — there is no separate "has the user claimed this" flag living only in the browser. A refresh, a new tab, a new device, or the app being killed and reopened all read the same row and all see `CLAIMED`. The frontend removing the Claim button entirely on `CLAIMED` (§2.3) is a UX nicety, not what prevents the double-grant — the database constraint is what actually prevents it, even if a client bug somehow re-sent a claim request.

---

## PART 8 — Edge Cases & Error Handling

### 8.1 Timezone boundary
`mission_day` is computed from an IANA timezone stored on the user profile (captured at signup, updatable in settings; falls back to device offset at first request if unset, then persisted). Server UTC day is never used as the reset boundary — it would reset missions at a random local hour for most users.

### 8.2 Double-claim / rapid double-tap
Handled at two layers: client disables the button on first tap (§2.1/§3), and the database transaction + unique `idempotency_key` (§7) makes a duplicate request a safe no-op regardless of what the client does. Even a buggy client retry, a doubled webhook, or a malicious replayed request cannot grant twice.

### 8.3 Stale client claims after reset
Client had the tab open across a mission-day boundary and taps Claim on a now-expired mission. Server validates `mission_day == today` at claim time (not generation time) → `410 MISSION_EXPIRED`. Client catches this specifically, refetches `GET /missions/today`, and swaps in the new set — never a silent failure or a stuck button (§3).

### 8.4 Unclaimed-but-completed mission at reset
**Product decision (see §11):** expires at reset, matching the loss-aversion framing from Part 0. A WhatsApp/push nudge fires ~1hr before reset if a mission is completed-but-unclaimed — this is a well-justified external trigger, not a nag, because it's telling the student something true and time-sensitive.

### 8.5 Partial reward grant failure
If a reward spans multiple currencies and one leg fails mid-transaction, the entire claim transaction rolls back (§7 steps 3–5 are one transaction) — nothing is marked `CLAIMED`, no partial `reward_transactions` row persists. Client sees a retryable error and shows "Something went wrong, try again," never a half-animated, half-granted state.

### 8.6 Duplicate/redelivered domain events
Covered in §6 — event consumer checks the source event's own idempotency ID before applying progress.

### 8.7 New user, no activity history
Target-scaling formula (§5) falls back to `mission_template.default_target` when there's no trailing 7-day average to scale from, rather than producing a degenerate or divide-by-zero target.

### 8.8 Streak mission vs. Streak Freeze interaction
`MAINTAIN_STREAK` should be driven by the exact same `StreakMaintainedEvent` the real streak counter uses — not a parallel calculation — so a Streak Freeze item (which preserves the streak without new activity) can't create a mismatch where the streak survives but this mission never completes. Whether a freeze should complete this mission at all is a product call (§11.2), but whichever way it's decided, it must be the *same* signal the streak system itself uses, or the two will drift.

### 8.9 Realtime channel drops
If the Supabase Realtime subscription disconnects (background tab, network blip), `refetchOnWindowFocus` (§1.3) catches the app back up as soon as it's active again — the student is never staring at permanently stale mission state.

### 8.10 Mission set generation race (two simultaneous first-requests)
If a student opens the app on two devices at almost the same instant on a new mission-day, both could attempt generation concurrently. Guard with a unique constraint on `(user_id, mission_day)` in `daily_mission_sets` — the second insert fails, the handler catches that and re-reads the row the first request just created, so both devices converge on the same single set rather than ending up with two.

---

## PART 9 — API Summary

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/missions/today` | Returns current mission set (generates if none exists for today), each with `progress`, `target`, `status`, `reset_at` |
| `POST` | `/api/missions/:userMissionId/claim` | Claims a completed mission's reward |

`POST /lessons/:id/complete`, XP-granting endpoints, and streak-update logic are **not** new endpoints for this feature — they're existing action endpoints that get one additional field (`missionsUpdated`) added to their response payload (§1.1).

No client-facing endpoint exists for progress updates — that only ever happens server-side via event consumers.

---

## PART 10 — Analytics Events

- `mission_set_generated` `{user_id, mission_day, template_ids}`
- `mission_progress_updated` `{user_mission_id, progress, target}`
- `mission_completed` `{user_mission_id, time_to_complete}`
- `mission_claimed` `{user_mission_id, reward_type, reward_amount}`
- `mission_expired_unclaimed` `{user_mission_id}` — a high rate here on a given mission type is a signal it's either too hard or the claim UX is being missed, independent of whether the difficulty scaling is "correct" on paper
- `all_daily_missions_claimed` `{user_id, mission_day}` — the celebratory-moment event (§2.4)

---

## PART 11 — Test Coverage

### Unit
- Mission generation: correct exclusion of last-2-days types; correct target scaling with full history, partial history, zero history; correct fallback to `default_target`.
- Progress consumer: correct increment; caps at `target` (never overshoots); idempotent against a redelivered event ID; ignores events for missions not `IN_PROGRESS`, not today, or already `COMPLETED`/`CLAIMED`.
- Claim handler: rejects non-`COMPLETED` status (409); rejects non-today mission_day (410); accepts and transitions `COMPLETED → CLAIMED` exactly once.

### Integration
- Full claim transaction: row lock behavior under concurrent requests to the same `user_missionId` (fire two simultaneous claim calls in a test, assert exactly one `reward_transactions` row is created and one balance increment applied).
- `idempotency_key` unique constraint: assert a second insert attempt with the same key throws a constraint violation and is handled as "already claimed," not a 500.
- `mission_day` unique constraint on `daily_mission_sets`: assert concurrent first-requests converge on one set (§8.10).
- Lesson-complete endpoint: assert `missionsUpdated` payload is present and accurate when a lesson completion pushes a mission to `COMPLETED`.

### End-to-end (frontend + backend)
- Complete a lesson that finishes a mission → mission card updates to "ready to claim" **without a page refresh**.
- Claim a mission → balance counter updates, mission card locks to `Claimed ✓`, Claim button is removed from the DOM (not just disabled).
- Refresh the page after claiming → mission still shows `Claimed ✓`, no Claim button re-appears.
- Open two tabs, claim in Tab A → Tab B reflects the claim within a few seconds without manual refresh (realtime sync, §1.2).
- Attempt to claim a mission from yesterday (simulate crossing the reset boundary with the tab still open) → `410`, client refetches and shows the new set, no stuck/broken button.
- Rapid double-tap the Claim button → exactly one reward granted, verified against `reward_transactions`.
- New user with zero history gets a valid, non-degenerate mission set on first load.
- Complete all 3 missions in one day → celebratory animation event fires exactly once (`all_daily_missions_claimed`), not once per mission.

### Manual QA / feel
- Claim animation timing feels responsive even on throttled 3G (button feedback is instant regardless of network per §2.1; reward animation only after real confirmation, and that lag should be checked doesn't feel sluggish).
- Individual claim vs. all-3-claimed animation are visibly, not just numerically, different in weight (§2.4) — confirm the bigger moment actually reads as bigger.
- Audio Settings toggle correctly mutes/unmutes claim SFX.

---

## PART 12 — Engineering Tickets

**TEYRO-MISSION-1: Data model & migrations**
`mission_templates`, `daily_mission_sets` (with unique `(user_id, mission_day)`), `user_missions`, `reward_transactions` (with unique `idempotency_key`) per Part 4. Seed `mission_templates` with launch mission types.

**TEYRO-MISSION-2: Mission generation service**
Lazy generation per Part 5 — timezone-aware `mission_day`, recent-type exclusion, target scaling with fallback, race-safe on concurrent first-requests (§8.10).

**TEYRO-MISSION-3: Event consumers for progress tracking**
Consumers for `LessonCompletedEvent`, `XPEarnedEvent`, `StreakMaintainedEvent` per Part 6, with idempotency handling.

**TEYRO-MISSION-4: Claim endpoint + reward ledger**
`POST /missions/:id/claim` per Part 7 — row locking, idempotency-key constraint, transactional balance update.

**TEYRO-MISSION-5: Piggyback mission updates onto action endpoints**
Add `missionsUpdated` to the response of `POST /lessons/:id/complete` and any other XP/streak-granting endpoints (Part 1.1) — this is the primary real-time mechanism and should ship before the realtime-channel work, since it covers the majority of cases on its own.

**TEYRO-MISSION-6: Supabase Realtime sync**
Subscribe client to `user_missions` changes per Part 1.2, wired into the shared React Query cache, as the cross-tab/cross-device safety net.

**TEYRO-MISSION-7: Expiry handling + pre-reset nudge**
Mark unclaimed-completed missions `EXPIRED` at `reset_at`; hook the ~1hr-before-reset nudge into WhatsApp/push (pending §11.1 decision).

**TEYRO-MISSION-8: Frontend claim UX + animation**
Instant tap feedback, claim mutation wiring, coin/XP flight animation, balance counter count-up, card lock state, all-3-claimed celebration state, Tey (Rive) reaction, failure/shake state — per Part 2 and Part 3.

**TEYRO-MISSION-9: Test suite**
Full matrix from Part 11 — unit, integration, and e2e, before this ships to production.

---

## PART 13 — Open Product Decisions (flag before/during build)

1. Does an unclaimed-but-completed mission expire at reset, or carry a grace period? (§8.4) — spec assumes **expire at reset + pre-reset nudge**.
2. Does `MAINTAIN_STREAK` mission complete when a Streak Freeze is used, or only on genuine same-day activity? (§8.8)
3. Should the mission set always include exactly one `COMPLETE_LESSONS` mission (recommended, ties the widget to the core loop), or can all 3 occasionally be non-lesson missions?
4. Reset cadence — confirmed as a fixed local-midnight boundary (matches the "Resets in Xh Ym" countdown already in the UI), not a rolling 24h from generation time. Flag if that's not actually the intent.
5. Bonus reward on "all 3 claimed" (§2.4, §10) — is there an actual bonus grant, or is the celebration purely animation/no extra currency? Affects whether `TEYRO-MISSION-4`'s ledger logic needs a fourth `source_type`.
