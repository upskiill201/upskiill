# Teyro — "Mystery Chest" Feature Spec
**Status:** Ready for engineering handoff
**Owner:** Joel Ndakwe
**Feature:** Home Screen v2 → Mystery Chest widget

---

## PART 0 — How This Feature Actually Works (read this first)

### Why this one is different from Today's Mission

Today's Mission has a **fixed** reward for a **fixed** action — the variability lives in which missions show up, not in what you get. Mystery Chest is the opposite: the action to unlock it is fixed and simple (finish today's lesson), but **what's inside is genuinely unknown until you open it.** This is the closest thing in the app to the Skinner-box mechanic — a slot-machine pull, not a checklist. That means two things have to be true for it to work as intended:

1. The reward **must** be determined server-side, at the moment of opening, with real randomness the client cannot predict or influence. If the client ever knows (or could infer) the reward before the open animation plays, the suspense is fake and eventually someone notices.
2. The **anticipation beat matters as much as the reward itself.** The shake, the crack of light, the pause before reveal — that's not decoration, that's the actual mechanic Nir Eyal is describing when he talks about pigeons pecking a disc. Skimp on the reveal and you've built a random-reward dispenser, not a mystery chest.

### The journey

**1. Chest starts locked.**
On page load, the chest widget shows a locked state — dimmed, padlock icon, "Complete today's lesson to unlock." This is visible immediately, no separate check needed (§1).

**2. Student completes a lesson.**
The same `POST /lessons/:id/complete` response that already updates mission state (from the Today's Mission spec) also carries a `chestUnlocked: true` flag once the day's unlock condition is met. The chest widget transitions from locked to unlocked **in that same moment** — no refresh, no separate poll. The lock icon animates open, the chest itself gets a subtle idle "glow/shimmer" loop to draw the eye (this is the external trigger for the rest of the session — "there's a chest waiting").

**3. Student taps the chest / "Claim Chest."**
Instant tap feedback (client-only, §2.1), then the actual reward is requested from the server. The server has already decided the reward at this point — the animation that follows is a *reveal*, not a live roll happening in the UI.

**4. The open animation plays.**
Chest shakes, cracks with a light burst, lid pops open, and the reward item flies out and settles into view with a rarity-appropriate flourish (a common coin reward gets a modest sparkle; a rare Streak Freeze gets a much bigger, distinct treatment — see §2). Only after this plays does the reward actually land in the student's balance/inventory, with the same fly-to-top-bar mechanic used in Today's Mission.

**5. Chest locks into "opened" state for the day.**
No re-open, no second roll. Refresh-proof, tab-proof, device-proof — same database-backed guarantee as mission claims.

**6. Next day, local midnight, a new chest appears — locked again.**

---

## PART 1 — Unlock Detection & No-Refresh Guarantee

Same underlying approach as Today's Mission, applied to the unlock condition instead of mission progress.

### 1.1 Primary mechanism: piggyback on the lesson-complete response

`POST /lessons/:id/complete` gains one more field alongside `missionsUpdated`:

```
→ {
    xpEarned: 20,
    missionsUpdated: [...],
    chestStatus: { unlocked: true, chestId, status: "READY_TO_OPEN" }
  }
```

The client updates the chest widget straight off this response — same request, same instant, no polling.

### 1.2 Cross-tab / cross-device sync

Same Supabase Realtime pattern as missions — subscribe to `daily_chests` filtered by `user_id`. If the unlock condition is met via any path (including a future non-lesson unlock condition), or the chest is opened in another tab, all sessions converge without a manual refresh.

### 1.3 Fallback

`refetchOnWindowFocus` on the chest query, identical rationale to Today's Mission §1.3.

---

## PART 2 — Animation & Reveal Choreography

This is the section that matters most for this feature. Stack: **GSAP** (timeline sequencing, `CustomBounce`, `MotionPath` for the reward-item arc), **canvas-confetti** or a lightweight particle burst for the crack-open moment.

**Note on Tey (the mascot):** Rive isn't in the stack yet, so any Tey reaction below is GSAP/CSS-driven — swapping between a small set of pre-rendered sprite/Lottie states via class toggles and transform/opacity tweens, not a Rive state machine. Same note as the Today's Mission spec: this only matters for *how* the reaction is built, not *when* it fires.

### 2.1 Locked state (idle)

- Padlock icon, chest slightly desaturated/greyed.
- No animation loop — a locked state shouldn't visually compete for attention against the unlocked, actionable one. Motion should read as "this is available," so save it for step 2.2.

### 2.2 Unlock moment

- Padlock does a quick "unlock" spin/fade-out (~300ms).
- Chest color/saturation restores to full.
- Chest enters a subtle idle loop — gentle glow pulse or a light shimmer sweep across it, low-amplitude, non-distracting but noticeable in peripheral vision. This is the ambient external trigger for the rest of the session.
- Optional: Tey gets a small "something's ready" sprite/state change if Tey is in view elsewhere on the screen.

### 2.3 Tap feedback (before server responds)

Identical philosophy to Today's Mission §2.1 — instant, client-only, network-independent:
- Chest does a quick squash/stretch on tap (~120ms), button/CTA scales down and back.
- Chest may start a "building anticipation" pre-shake immediately (small, ambiguous — doesn't commit to an outcome), so there's zero dead time waiting on the network even if the request takes a couple hundred ms.

### 2.4 Reveal sequence (only after server confirms the reward)

This is a fixed choreography with variable intensity by rarity tier:

1. **Shake** (~400–600ms): chest rocks side to side, amplitude increasing, `elastic` or `CustomBounce` ease — builds tension.
2. **Crack** (~150ms): a bright flash/light-crack SVG or particle burst at the seam of the lid, screen has a very brief subtle flash (low opacity white overlay, ~80ms) — the "something's happening" beat.
3. **Lid opens** (~300ms): lid rotates open, light rays emanate from inside (radial gradient or SVG rays, GSAP-animated opacity/scale).
4. **Reward reveal** (~400–600ms): the reward icon rises out of the chest along a `MotionPath` arc, scales up to a "hero" size in the center of the widget, with rarity-tier treatment (§2.5).
5. **Settle & fly to balance** (~600–800ms): after a brief hold (~600ms, long enough to actually read what it is), the reward icon shrinks and flies to the corresponding top-nav counter, same fly-and-count-up mechanic as Today's Mission §2.2. Chest closes and locks into "opened today" state.

Total sequence: roughly 2–3 seconds, deliberately not instant — the whole point is the anticipation, not the speed.

### 2.5 Rarity-tier visual differentiation

Reward tiers need to *look* different in weight, or the "rare" ones stop feeling rare:

| Tier | Example reward | Treatment |
|---|---|---|
| Common | Coins (small amount) | Standard reveal sequence (§2.4), single-color sparkle, modest reward-icon scale |
| Uncommon | Hearts, small XP Boost | Reveal sequence + a slightly bigger scale-up, two-tone sparkle |
| Rare | Gems, Streak Freeze | Full sequence with a bigger screen flash, gold/purple particle burst, reward icon has its own brief spin/shine pass, distinct "rare reward" SFX sting, and Tey reacts visibly (celebration sprite/state) |

This tiering is also what protects the *mission* celebration (Today's Mission §2.4) from feeling redundant — chest rarity and "all missions claimed" are two different kinds of peak moments, not the same effect reused.

### 2.6 Sound

Distinct SFX per phase — shake rumble, crack, lid creak/whoosh, reward chime (rarity-scaled: common chime vs. a richer rare-reward jingle). Gated behind the existing Audio Settings toggle.

### 2.7 Failure state

If the open request fails after tap (network error, or a race where the chest was somehow already opened elsewhere a second earlier): chest snaps back to its pre-tap idle state, no partial reveal ever plays, inline error/toast shown, tap re-enabled if the failure is retryable (network) or the widget refreshes to "already opened" state if the failure is a `409` (already claimed elsewhere — see §7).

---

## PART 3 — Frontend State Management

Same principles as Today's Mission:

- Single React Query cache entry for chest state (`['chest', 'today']`), single shared balance/inventory store for anything the chest can grant.
- **No optimistic reward reveal.** The entire point of this feature is that the reward is unknown until confirmed — there is no version of this where the client guesses. The reveal animation is *sequenced from* the server's response payload, not started speculatively.
- Tap feedback (§2.3) is the only part that's instant/client-only, and it deliberately doesn't commit to an outcome (no color/icon implying what's inside).
- On success: cache updated to `OPENED`, reward + rarity stored, animation plays once off that data, then the widget re-renders to its "opened today" resting state.
- On realtime push indicating the chest was opened elsewhere (e.g. same account on another device): if the animation hasn't played locally yet, skip straight to the resting "opened" state on this tab rather than trying to replay a reveal for a reward this session didn't request.

---

## PART 4 — Data Model

### `chest_reward_pool`
Config-driven reward table, so drop rates can be tuned without a deploy — same philosophy as `mission_templates`.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `reward_type` | enum | `COINS`, `GEMS`, `HEARTS`, `XP_BOOST`, `STREAK_FREEZE` |
| `amount_min` | int | for ranged rewards (e.g. coins 10–30) |
| `amount_max` | int | |
| `rarity_tier` | enum | `common`, `uncommon`, `rare` |
| `weight` | int | relative selection weight — weights across all active rows should be validated to be internally consistent (see §8.7) |
| `active` | bool | |

### `daily_chests`
One row per user per chest-day.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK |
| `chest_day` | date | user's local timezone, same pattern as `mission_day` |
| `status` | enum | `LOCKED`, `READY_TO_OPEN`, `OPENED` |
| `unlocked_at` | timestamptz | nullable |
| `opened_at` | timestamptz | nullable |
| `reward_pool_id` | uuid | FK, nullable until opened — **not populated at generation time**, only at the moment of opening (§6) |
| `reward_snapshot_type` | enum | nullable, snapshot of what was actually granted |
| `reward_snapshot_amount` | int | nullable, snapshot |

**Why is the reward not decided at chest-creation time?** Because the reward roll must happen at the moment of the open request, server-side, using that request as the trigger — deciding it earlier and just "revealing" a pre-computed value stored since midnight would still be secure, but ties the RNG timing to generation rather than the actual player action, which is a less natural place to reason about fairness/audit logs. Either approach is technically valid; this spec recommends roll-on-open for auditability (the transaction that opens the chest is the same transaction that determines what's inside).

### `user_inventory`
Shared inventory table for stackable items that both the Chest and the Shop can grant — avoids building two separate systems for the same items.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | |
| `item_type` | enum | `STREAK_FREEZE`, `XP_BOOST` |
| `quantity` | int | for `STREAK_FREEZE` |
| `active_until` | timestamptz | for `XP_BOOST`, if boosts are duration-based rather than stackable count (§8.6) |

`COINS`, `GEMS`, `HEARTS` continue to use the existing `reward_transactions` ledger from Today's Mission — no need for a separate table, this feature just becomes another `source_type` value (`MYSTERY_CHEST`).

---

## PART 5 — Chest Generation & Unlock Rules

**Generation:** Lazy, same pattern as missions — first `GET /api/chest/today` request of a new `chest_day` creates the row if it doesn't exist, status `LOCKED`. Unique constraint on `(user_id, chest_day)` guards the same concurrent-first-request race as Today's Mission §8.10.

**Unlock condition:** `status: LOCKED → READY_TO_OPEN` when the day's unlock requirement is met. Per the current design ("Unlocked after completing today's lesson"), this fires off the same `LessonCompletedEvent` consumer pattern used for missions (Today's Mission §6) — specifically, unlock as soon as at least 1 lesson is completed for the `chest_day`. This should be implemented as its own lightweight consumer, not bolted onto the mission consumer, so the two systems can evolve independently (e.g. if the unlock condition changes to "earn any XP" later, only this consumer changes).

---

## PART 6 — Reward Determination (server-side RNG)

**This must never be computed or trusted from the client.** The open endpoint (§7) performs the roll itself, using the active rows in `chest_reward_pool`:

```
1. Fetch all active chest_reward_pool rows.
2. totalWeight = sum(weight for all rows)
3. roll = secure_random_int(0, totalWeight)   // use a CSPRNG, not Math.random()
4. walk the weighted list, find which row `roll` lands in
5. if the row has an amount range, roll a second uniform random value within [amount_min, amount_max]
6. that's the reward — grant it (§7), snapshot it onto daily_chests, return it in the response
```

Using a cryptographically secure random source matters here specifically because this is a real-money-adjacent mechanic (in-app currency with a shop attached) — a predictable or client-seedable RNG is the kind of thing that gets found and exploited.

---

## PART 7 — Open Flow: Why Double-Opening Is Structurally Impossible

**Endpoint:** `POST /api/chest/:chestId/open`

```
BEGIN TRANSACTION
  1. SELECT daily_chest FOR UPDATE (row lock)
  2. Validate:
     - exists and belongs to requesting user     → else 404
     - status == READY_TO_OPEN                    → else 409 CHEST_NOT_OPENABLE
     - chest_day == today (user tz)                → else 410 CHEST_EXPIRED
  3. Perform the weighted roll (§6)
  4. Insert reward_transactions or user_inventory row with
       idempotency_key = `chest_open:{chest_id}`
     → same unique-constraint pattern as mission claims (Today's Mission §7) —
       this is the actual mechanism preventing a double-open, not client-side
       disabling.
  5. Apply the reward:
     - COINS / GEMS / HEARTS  → reward_transactions ledger, live balance update
     - STREAK_FREEZE          → user_inventory quantity += 1
     - XP_BOOST                → user_inventory active_until extended/set (§8.6)
  6. Handle overflow cases (§8.5) before finalizing the granted reward
  7. status = OPENED, opened_at = now(), reward_snapshot_* populated
COMMIT

Return: { rewardType, rewardAmount, rarityTier, newBalance/newInventory }
```

Refresh-proof for the identical reason missions are: `status` is a database fact, not client state. `GET /api/chest/today` always reflects it.

---

## PART 8 — Edge Cases & Error Handling

### 8.1 Timezone boundary
Same pattern as missions — `chest_day` from the user's stored IANA timezone, never server UTC.

### 8.2 Double-tap / concurrent open requests
Row lock + unique `idempotency_key`, identical to Today's Mission §8.2/§7.

### 8.3 Stale client opens after reset
Same `410 CHEST_EXPIRED` pattern as missions §8.3 — client refetches `GET /chest/today` and shows the fresh locked chest for the new day.

### 8.4 Unopened chest at reset
**Product decision needed (§13):** does an unopened-but-unlocked chest carry over, or does the day's chest simply disappear at reset with a new one appearing? Recommend: same loss-aversion pattern as missions — it expires, with a pre-reset nudge if it's sitting unlocked-and-unopened ("Your Mystery Chest is waiting!").

### 8.5 Reward overflow / already-at-cap
- **Hearts reward, but user is already at max hearts (e.g. 5/5):** granting nothing would feel like a broken reward. Recommend converting the roll to an equivalent coin value at open time (server-side substitution, still logged/snapshotted as what was actually granted) rather than silently discarding it or showing a reward the student can't actually receive.
- **Streak Freeze reward, but user already holds a max-stack (if a cap is decided for the Shop):** same substitution principle — define a fallback reward so nothing is ever revealed and then not actually granted.

### 8.6 XP Boost stacking behavior
Undefined until decided (§13.3): does opening a chest with an XP Boost while one is already active **extend** the duration, **stack** the multiplier, or **do nothing** (wasted roll)? "Wasted roll" is the worst option experientially — recommend extend-duration as the default unless there's a specific reason to cap it, and apply the same reward-substitution principle as §8.5 if a hard cap is chosen.

### 8.7 Reward pool misconfiguration
If someone editing `chest_reward_pool` in the admin/config layer sets all rows to `active = false`, or weights that sum to zero, the roll in §6 has nothing to select from. The open endpoint should hard-fail safely (500, chest stays `READY_TO_OPEN`, nothing granted, alerting fires) rather than crashing mid-transaction or granting a null reward — this is a configuration bug, not a runtime edge case, and should be caught by a startup/config-validation check as well as defensively at roll time.

### 8.8 Unlock event race with chest generation
If the `LessonCompletedEvent` unlock consumer fires before the chest row for today has been lazily generated (e.g. student's very first `GET /chest/today` hasn't happened yet this session but they somehow completed a lesson — unlikely given lesson-complete requires the app to be loaded, but worth guarding), the consumer should upsert/generate the chest row itself if missing, rather than assuming it always already exists.

### 8.9 Realtime channel drops
Same fallback as missions — `refetchOnWindowFocus`.

### 8.10 Generation race (two devices, same instant, new day)
Same unique-constraint-on-`(user_id, chest_day)` pattern as Today's Mission §8.10.

---

## PART 9 — API Summary

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/chest/today` | Returns today's chest state (`LOCKED` / `READY_TO_OPEN` / `OPENED`), generating the row if needed |
| `POST` | `/api/chest/:chestId/open` | Performs the server-side roll and grants the reward |

`POST /lessons/:id/complete` gains the `chestStatus` field (§1.1) — not a new endpoint, an addition to an existing response.

---

## PART 10 — Analytics Events

- `chest_generated` `{user_id, chest_day}`
- `chest_unlocked` `{user_id, chest_day, unlocked_at}`
- `chest_opened` `{user_id, chest_day, reward_type, reward_amount, rarity_tier}`
- `chest_expired_unopened` `{user_id, chest_day}` — a high rate here signals either the unlock condition is too demanding or the open CTA isn't visible/compelling enough
- `chest_reward_overflow_substituted` `{user_id, original_reward_type, substituted_reward_type}` — tracks how often the §8.5 fallback fires; a high rate might mean a reward's drop rate needs rebalancing against how often users are actually capped on that resource

---

## PART 11 — Test Coverage

### Unit
- Weighted roll: given a known pool, distribution over many trials approximates the configured weights within tolerance; roll never selects an inactive row; amount-range rolls stay within `[amount_min, amount_max]`.
- Overflow substitution: hearts-at-max correctly substitutes to coins; substituted value is logged accurately.
- Unlock consumer: fires exactly once per `chest_day` even if multiple qualifying lesson-complete events occur that day (first one flips `LOCKED → READY_TO_OPEN`, subsequent ones are no-ops).

### Integration
- Open transaction: concurrent open requests on the same `chestId` → exactly one `reward_transactions`/`user_inventory` write, verified.
- `idempotency_key` uniqueness enforced at the DB level, duplicate insert attempt handled gracefully by the API, not a 500.
- Config validation: reward pool with zero total weight or all-inactive rows is caught before it can reach the roll logic in production.

### End-to-end
- Complete a lesson → chest widget flips from locked to unlocked **without a page refresh**.
- Open the chest → full reveal animation plays once, reward lands in the correct balance/inventory, chest locks to "opened today."
- Refresh after opening → chest still shows "opened today," no re-open affordance present.
- Two tabs open, open the chest in Tab A → Tab B reflects "opened" within a few seconds without manual refresh.
- Attempt to open after the day's reset boundary (tab left open overnight) → `410`, client refetches and shows a fresh locked chest.
- Rapid double-tap open → exactly one reward granted.
- Roll lands on Hearts while user is capped → substitution reward is what's actually revealed and granted (i.e. the animation reflects the *real* granted reward, never the pre-substitution one).

### Manual QA / feel
- Rarity tiers are visually and audibly distinguishable at a glance — a rare Streak Freeze pull should be unmistakably a bigger moment than a common coin pull.
- Reveal sequence timing (§2.4) doesn't feel like a stall on a slow connection — verify the tap-feedback beat (§2.3) covers any network latency so there's never a moment of "did my tap register?"
- Locked-state chest doesn't visually compete with the unlocked one for attention (§2.1) — check against the rest of the home screen for visual hierarchy.

---

## PART 12 — Engineering Tickets

**TEYRO-CHEST-1: Data model & migrations**
`chest_reward_pool`, `daily_chests` (unique `(user_id, chest_day)`), `user_inventory`. Seed the reward pool with launch drop rates.

**TEYRO-CHEST-2: Chest generation service**
Lazy generation per Part 5, timezone-aware, race-safe (§8.10).

**TEYRO-CHEST-3: Unlock consumer**
Standalone consumer on `LessonCompletedEvent` (or whatever the final unlock condition is decided to be, §13.1) flipping `LOCKED → READY_TO_OPEN`, idempotent per chest per day, self-healing if the chest row doesn't exist yet (§8.8).

**TEYRO-CHEST-4: Open endpoint + weighted roll + reward ledger**
`POST /chest/:id/open` per Part 6 and Part 7 — CSPRNG-based weighted selection, row locking, idempotency-key constraint, overflow/substitution handling (§8.5), inventory writes for stackable items.

**TEYRO-CHEST-5: Piggyback chest status onto lesson-complete response**
Add `chestStatus` to `POST /lessons/:id/complete` (§1.1) — ships alongside or right after Today's Mission's equivalent ticket, likely the same PR given they touch the same endpoint.

**TEYRO-CHEST-6: Supabase Realtime sync for chest state**
Subscribe to `daily_chests` changes, same pattern as Today's Mission's realtime ticket.

**TEYRO-CHEST-7: Expiry handling + pre-reset nudge**
Mark unopened-but-unlocked chests appropriately at reset if that's the decided behavior (§13.1); hook into WhatsApp/push nudge.

**TEYRO-CHEST-8: Frontend reveal animation**
Full choreography from Part 2 — shake, crack, lid open, reward reveal with rarity-tier treatment, fly-to-balance, Tey reaction, sound, failure/shake state.

**TEYRO-CHEST-9: Test suite**
Full matrix from Part 11.

---

## PART 13 — Open Product Decisions (flag before/during build)

1. Unopened-but-unlocked chest at reset: expire with a pre-reset nudge (recommended, matches missions), or carry over/grace period? (§8.4)
2. Exact launch drop-rate table — what weight/amount range per reward type, and is there any "pity" mechanism (e.g. guaranteed rare after N common pulls) to protect against a genuinely unlucky streak feeling punishing rather than just random? Not in scope of this spec's mechanics, but the numbers themselves are a product/economy call, not an engineering one.
3. XP Boost stacking rule — extend duration, hard cap with substitution fallback, or something else? (§8.6)
4. Streak Freeze max-stack cap, if any — ties directly into the Shop feature spec, should be decided once, not separately per feature.
5. Confirm the unlock condition is exactly "complete 1 lesson" and not, e.g., tied to XP earned or mission completion — affects which event the unlock consumer (§5, TEYRO-CHEST-3) actually listens to.
6. Reward roll timing: roll-on-open (recommended, this spec's default) vs. roll-at-generation-time-and-reveal-later — confirm no reason exists (e.g. a marketing "preview your chest" feature) to need the reward decided earlier.
