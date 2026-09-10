# Teyro — "Weekly Lucky Spin" Feature Spec
**Status:** Ready for engineering + design handoff
**Owner:** Joel Ndakwe
**Feature:** Home Screen v2 → Weekly Lucky Spin widget

---

## PART 0 — How This Feature Actually Works (read this first)

### What kind of feature this is

Mystery Chest is a daily pull tied to a small action (finish a lesson). Lucky Spin is the **weekly event** — lower frequency, so it needs to feel like a bigger occasion when it comes around, not a smaller version of the chest. Where the chest's mechanic is "shake, crack, reveal," the spin's mechanic is a literal wheel — and a wheel only works if it looks and behaves like the wheels people already know from real games (Wheel of Fortune, Coin Master, a casino wheel), not like a progress bar that happens to be circular. That expectation is doing a lot of work here: if the wheel doesn't decelerate like a real spinning object, doesn't tick past each segment, doesn't have weight and a satisfying "clunk" on landing, it reads as fake immediately, and the whole feature falls flat no matter how good the prize pool is.

### The journey

**1. Spin becomes available at the start of the week.**
Per the existing UI, this resets weekly (the screen shows "Spins reset in 2d 12h" and the Weekly Progress card's own week runs Monday–Sunday) — so the spin's week boundary should match that same weekly cycle the student already sees elsewhere on the page, not run on its own independent schedule.

**2. Student taps "Spin Now."**
The server has already determined the outcome before any animation starts — same non-negotiable rule as Mystery Chest (§6 there): the client never rolls its own random result and never knows the outcome until the spin sequence completes. What the client *does* know immediately is a target segment to land on, which it uses to drive the physics of the spin (§2).

**3. The wheel spins.**
Fast start, multiple full rotations, real deceleration (not a linear slowdown — a spinning wheel with friction slows down in a curve, fast then a long tail), an audible tick each time a segment boundary passes the pointer, ticks getting slower and further apart as the wheel loses speed — this is what sells "physical object with momentum" instead of "CSS animation."

**4. The wheel settles on the winning segment.**
A small overshoot-and-settle wobble at the very end (like a real wheel with a pointer flap catching on the pocket) rather than stopping dead — this single detail is most of what separates a convincing wheel from an unconvincing one.

**5. The prize reveals and flies to the balance bar.**
Same fly-and-count-up mechanic used in the other two features, so all three reward moments in the app feel like they belong to the same system, not three unrelated widgets.

**6. Spin locks for the week.**
Refresh-proof, tab-proof, device-proof, same database-backed guarantee as the other two features.

**7. New week, new spin.**

---

## PART 1 — Availability & No-Refresh Guarantee

### 1.1 Availability condition

Per the current design, this spin is **unconditionally available once per week** — unlike Mystery Chest, there's no stated unlock requirement (no "complete a lesson first" gate mentioned for this widget). That's worth confirming deliberately rather than assuming (§13.1) — it's a real product choice whether every rewarding surface in the app should be tied back to the core learning action, or whether one purely-free weekly treat is fine as-is.

### 1.2 Real-time state

Because there's no unlock condition to piggyback on an action response, this widget's state (`AVAILABLE` / `SPUN`) is simpler than the chest's — it's just read from `GET /api/spin/current-week` on load. It still benefits from Supabase Realtime sync on `weekly_spins` (same pattern as the other two features) so a spin used in one tab/device reflects instantly in another, and from `refetchOnWindowFocus` as the fallback.

---

## PART 2 — Wheel Physics & Animation

This is the section that makes or breaks the feature. Stack: **GSAP** with a custom rotation tween (no built-in "wheel" library — this needs to be hand-tuned), Web Audio for the tick sequence (sample-accurate timing matters more here than for a one-shot SFX).

### 2.1 The wheel must be visually static, only the *landing* is random

The segment layout (order, colors, which reward sits where) is a **fixed, designer-authored configuration**, identical for every student and every spin — only which segment the wheel stops on changes. This matters for two reasons: players build a mental map of the wheel over repeated weekly visits ("gems are always across from the streak freeze"), and it means probability is controlled by *backend weighting per segment*, completely decoupled from how big each segment looks. A common industry trick, and the one this spec uses: segments can be visually equal-sized wedges even though their actual win probability differs — e.g. 8 equal wedges, but the "50 coins" wedge might appear twice in the layout (two separate slices going to the same reward) while "Streak Freeze" appears once, making the common reward roughly 2x as likely as the rare one just from slice count, on top of whatever explicit weighting is configured. This is intentional and standard for this genre.

### 2.2 Server determines the outcome first, client computes the physics

```
1. Client requests POST /api/spin/spin
2. Server performs a weighted roll across active `spin_wheel_segments`
   using a CSPRNG (identical security posture to Mystery Chest §6)
3. Server returns: { landedSegmentIndex, rewardType, rewardAmount, rarityTier }
4. Client, using the shared fixed segment layout (§2.1), computes:
     targetAngle = (segmentIndex * segmentWidthDegrees)
                   + segmentWidthDegrees/2       // center of the wedge
                   + randomJitter(±30% of segment width)  // avoid landing
                                                            // dead-center every
                                                            // time, feels less
                                                            // mechanical
     totalRotation = (fullSpinCount * 360) + targetAngle
                     // fullSpinCount: random 5–8, cosmetic only, doesn't
                     // affect fairness since the destination is already fixed
5. GSAP tween rotates the wheel element by totalRotation degrees over the
   spin duration (§2.3), landing precisely under the fixed pointer.
```

The wheel visually "chooses" a result, but the result was never in doubt from the moment the server responded — the animation is a reveal mechanism, not a randomness mechanism, exactly like Mystery Chest.

### 2.3 Spin timing & easing

- Total duration: ~4.5–6 seconds. Long enough to feel like a real object with mass, short enough not to feel like a stall.
- Easing: NOT a simple `ease-out`. Use a custom cubic-bezier or GSAP `CustomEase` that mimics real friction — fast acceleration/near-constant top speed for the first ~20% of the duration, then a long decelerating tail for the remaining ~80%, with the very last ~5% of rotation slowing dramatically (this is what sells "it's about to stop, right... here").
- Final settle: a small overshoot (rotate ~3–6° past the target) then a quick spring-back to the exact target angle (`CustomBounce`, low amplitude, 1–2 oscillations, ~250ms) — the "pointer flap catching the pocket" detail from Part 0.

### 2.4 Tick sound & pointer flex

- A physical flap/pointer at the top should visually flex/bend slightly (a couple degrees, quick spring-back) each time a segment divider passes under it — small, but this is the detail that makes the wheel feel like it's making contact with something rather than spinning in a vacuum.
- Each divider-pass triggers a short tick sound. Tick *rate* follows the wheel's actual angular velocity (i.e., generate tick timestamps from the GSAP tween's progress callback, not a fixed interval) so the ticks audibly slow down in sync with the visual deceleration — a fixed-interval tick track that doesn't match the visual slowdown is an easy way to break the illusion.
- Final tick (the one that lands) is a distinct, slightly heavier sound than the pass-through ticks.

### 2.5 Anticipation build before the spin even starts

- On tap: instant client-only feedback (button press, no network wait — same principle as the other two features), and the wheel can do a tiny "wind-up" flinch (rotate a couple degrees backward, like a golf club at the top of a backswing) before the real spin animation kicks off once the server responds. This absorbs any network latency the same way Mystery Chest's pre-shake does.
- Chase lights: if the wheel rim has light-bulb style accents (very common in this genre, see Part 5), they should animate in a sequential "chase" pattern for the entire duration of the spin, syncing conceptually with the sense of building energy, and can burst/flash together at the landing moment.

### 2.6 Reveal & fly-to-balance

Same mechanic as the other two features: prize icon pulses/scales at the landing segment, brief hold (~500–700ms) so it's actually readable, then flies to the corresponding top-nav balance counter with the count-up tween. Rarity-tier visual differentiation follows the same tiering used in Mystery Chest §2.5 (common gets a modest flourish, rare gets a bigger flash/particle burst/distinct SFX) — this is a shared visual language across both random-reward features, not something reinvented per feature.

### 2.7 Failure state

If the spin request fails after tap: wheel returns to idle (no spin plays at all — there is nothing to "revert" visually since the physical spin never starts until the server has responded, unlike the chest's pre-shake which is ambiguous and safe to abandon), inline error shown, retry available.

### 2.8 Full-screen presentation mode

**This is a required behavior, not optional polish: the wheel does not spin inline on the home screen.** The home screen shows a compact, non-interactive preview of the wheel (static art, no live physics) inside its widget slot, purely to signal "there's a spin available." Tapping that widget — or its "Spin Now" CTA — opens the wheel in a **dedicated full-screen takeover**, and the entire experience from Part 2 (wind-up, spin, tick sequence, landing, reveal) plays out in that full-screen view, not inside the small home-screen card. Two reference screenshots are being sent directly to the dev alongside this document — build against those visually, this section describes the *behavior* around them.

**Why full-screen and not inline:** the wheel needs real screen real estate to read clearly while spinning (segment labels, tick detail, the pointer flex) and to carry the dramatic, arcade/casino feel described in Part 5 — a wheel spinning inside a small dashboard-sized card cannot deliver that, no matter how well the physics are tuned. This matches both reference screenshots, where the wheel occupies the full device viewport.

**Entry transition:**
- Tap on the home-screen widget triggers a modal/route transition to the full-screen spin view — a scale-and-fade-up from the widget's position (or a straightforward slide-up/cross-fade) is appropriate; avoid a hard instant cut, the transition itself should feel like "stepping into the game."
- The rest of the home screen dims/is covered entirely — this is a true takeover (new route or full-screen modal), not an expanding card that pushes other content around.

**Full-screen layout** (matching the reference screenshots' composition, not their exact copy/branding):
- Deep, dark radial-gradient/burst background filling the entire screen — light rays emanating outward from the wheel's center, exactly as in both references. This is the "stage" described in Part 5, just scaled to fill the viewport instead of a widget-sized card.
- Wheel centered and sized to be the dominant element on screen — large enough that segment icons and the pointer detail are clearly legible.
- Glowing pointer/marker fixed at the top (12 o'clock), matching the highlighted marker style in both screenshots.
- Center hub houses the "SPIN" call-to-action itself (as in Image 2), or the CTA sits just below the wheel (as in Image 1) — either pattern is acceptable, pick whichever reads more clearly once real content is in place; the important part is a single unambiguous primary action, not two competing spin buttons.
- A clear, reachable close/dismiss control (back arrow or X) so the student isn't trapped in the full-screen view if they change their mind — visible before the spin starts; it should either hide or disable itself once a spin is actually in motion (§2.2–2.3), so it can't be used to interrupt an in-flight spin the server has already committed the result for.
- Small dotted/bulb lights tracing the outer rim, as in both references — this is the same chase-light detail from Part 5, and it should actually animate (sequential chase) during the spin, not just sit there as static decoration.

**What NOT to carry over from the reference screenshots:** both examples are from real-money casino-style products and include a **bet/stake selection step** (Image 2's amount buttons — 10/20/50/100/500/1000 — and "PLACE A BET") and, in Image 1, a separate daily-login-streak claim panel bolted onto the same screen. Neither of those is part of this feature. **Reference the screenshots for the wheel's visual chrome, background, pointer, rim lighting, and overall full-screen staging only** — Teyro's spin has no staking/betting step (it's a single free weekly spin, per Part 0–1) and no secondary streak panel bundled into this screen (Teyro already has its own streak/heatmap surfaces elsewhere). Flag this explicitly to the dev so the betting UI pattern doesn't get built by default just because it's present in the reference images.

**Exit / return to home screen:**
- After the reveal-and-fly-to-balance sequence (§2.6) completes and its brief hold has played, the full-screen view can either auto-dismiss back to the home screen after a short pause (~1.5–2s) or wait for an explicit "Done"/tap-to-continue — pick whichever tests better, but don't leave the student stranded on a "you won!" screen with no visible way forward.
- On return to the home screen, the widget should already reflect the "used this week" resting state — this falls straight out of the state management already specified in Part 3/§1.2, since the full-screen view and the home-screen widget share the same underlying query cache, not separate state.

---

## PART 3 — Frontend State Management

Same principles as the other two features: single React Query cache entry for spin state, shared balance store for the granted reward, no optimistic reward state, animation only ever plays from a confirmed server payload. The one addition specific to this feature: the segment layout config (§2.1) should be fetched once and cached/memoized client-side (it's static content, not per-user state) rather than re-fetched on every load, since it never changes between spins for a given app version.

---

## PART 4 — Data Model

### `spin_wheel_segments`
Fixed, designer-authored wheel layout — shared across all users. Config-driven so the prize table and layout can be tuned without a client deploy (segment *count* and visual order should stay stable across a season/release, since players learn the wheel — but reward amounts/weights can be tuned more freely).

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `segment_index` | int | 0-based position around the wheel, fixed visual order |
| `reward_type` | enum | `COINS`, `GEMS`, `HEARTS`, `XP_BOOST`, `STREAK_FREEZE`, `XP` |
| `amount_min` | int | |
| `amount_max` | int | |
| `rarity_tier` | enum | `common`, `uncommon`, `rare` |
| `weight` | int | actual win-probability weight — independent of visual slice size (§2.1) |
| `color_key` | text | design token reference, not a raw hex (Part 5) |
| `active` | bool | |

### `weekly_spins`
One row per user per spin-week.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK |
| `week_start` | date | Monday, in the user's local timezone — must match the same week boundary the Weekly Progress card already uses, so the two widgets never disagree about what "this week" means |
| `status` | enum | `AVAILABLE`, `SPUN` |
| `spun_at` | timestamptz | nullable |
| `landed_segment_index` | int | nullable until spun |
| `reward_snapshot_type` | enum | nullable, snapshot |
| `reward_snapshot_amount` | int | nullable, snapshot |

Reward grants reuse the existing `reward_transactions` ledger and `user_inventory` table introduced in Mystery Chest — this is the third feature writing into the same shared reward infrastructure, which is the point of having built it that way.

---

## PART 5 — Visual & Motion Design Direction

This is a deliberate departure from the rest of the app's dashboard/card language, and should be treated as its own design surface, not a themed variant of a standard card component.

**Reference screenshots:** two example screenshots are being sent to the dev alongside this document showing the target look — a dark radial-burst background, a glowing bezeled wheel rim with dotted rim lighting, saturated high-contrast segment colors with bold icons, a glowing pointer marker, and a center/below-wheel spin button. Match that visual language for the wheel itself and its full-screen staging (§2.8). Do **not** replicate the bet/stake-amount selector or the separate daily-login panel visible in those references — those belong to the source products' real-money betting mechanics and aren't part of this feature (see §2.8 for the explicit scope note on this).

**What to avoid:**
- Soft, uniformly-rounded corners on the wheel or its housing. A wheel is a mechanical object — its edges should read as machined, not squishy.
- Flat pastel fills with no depth cues (no drop shadow, no rim light, no bevel). That reads as a generic SaaS dashboard tile, not a game object.
- Placing the wheel inside a generic white/light-gray rounded card identical to every other widget on the page. The wheel needs its own visual "stage" — see below.
- Thin 1px hairline borders. Game UI at this scale uses thick, high-contrast strokes (often 3–6px equivalent) with a visible bevel/highlight, not subtle dividers.
- A single flat brand color repeated everywhere. Segment-to-segment contrast needs to be strong enough to read the wheel at a glance mid-spin, which flat monochrome fails at.

**What to build toward instead** (reference points: casino wheels, Coin Master's spin wheel, Candy Crush's reward wheel — not admin-dashboard UI kits):
- **A dark, vignette-style "stage" behind the wheel** — a radial gradient darkening toward the edges of the widget — so the wheel itself becomes the visual focal point rather than competing with the rest of the page's light background.
- **A raised metallic/gem-toned outer rim** around the wheel with a clear light-source-consistent highlight and shadow, giving it real dimensionality — not a flat colored ring.
- **A chase-light border** (small bulb/gem accents around the rim that light up in sequence) — cheap to build, does enormous work for "this is a game object, not a chart."
- **High-contrast, alternating segment colors** (2–4 colors max, deliberately chosen for contrast against each other, not just against the background) with a visible divider line between segments (a thin bright stroke, not just a color change) so the eye can track individual wedges while it's spinning.
- **A distinct, weighty pointer/flap** at the top — should look like it has physical presence (a small drop shadow beneath it, a highlight along its edge) since it's the thing that visually "catches" the result.
- **A chunky, tactile "SPIN NOW" call-to-action** — beveled/embossed rather than a flat rounded rectangle, ideally with its own idle "breathing" pulse animation to draw the eye when a spin is available (mirrors the chest's idle glow, §2.2 in the Mystery Chest spec, so the two random-reward widgets share a consistent "this has something for you" idle signal).
- **Typography inside/around the wheel should be bold and legible mid-motion** — segment labels (if present) need enough weight/size and contrast to be readable even while the wheel is moving fast, or skip in-wedge text entirely and rely on icon + color only, revealing the specific amount only after landing.

The underlying instruction here — build this like someone who's spent a career on game UI, not dashboard UI — is really a request to treat this widget as a distinct visual system with its own depth, lighting, and motion language, deliberately inconsistent with the flatter card-based rest of the home screen, because that inconsistency is what signals "this one's a game, engage with it differently."

---

## PART 6 — Edge Cases & Error Handling

### 6.1 Week boundary definition
`week_start` must be computed identically to whatever logic already drives the Weekly Progress card's "M T W T F S S" range, in the user's local timezone — if these two widgets used different week-start logic (e.g. one Monday-start, one Sunday-start), the page would visibly contradict itself. Confirm and share the exact week-boundary utility rather than reimplementing it here.

### 6.2 Double-tap / concurrent spin requests
Same pattern as the other two features: row lock on the `weekly_spins` row plus a unique `idempotency_key` on the resulting `reward_transactions`/`user_inventory` write (`spin_claim:{weekly_spin_id}`) makes a duplicate request a safe no-op, not a second grant — this is the actual mechanism, with the client also disabling the Spin button on first tap as a UX nicety on top.

### 6.3 Stale client spins after week rollover
Client had the tab open across the weekly boundary and taps Spin on a now-expired week's row. Server validates `week_start == currentWeekStart(userTz)` at spin time → `410 SPIN_EXPIRED`, client refetches and shows the new week's available spin.

### 6.4 Reward overflow / already-at-cap
Same substitution principle as Mystery Chest §8.5 — if the roll lands on Hearts and the student's already capped, or a stackable item is at its max, substitute an equivalent-value fallback (coins) server-side rather than revealing a reward that can't actually be granted.

### 6.5 Segment layout changes mid-week / between sessions
If the wheel's segment configuration is edited (rebalanced weights, new segment added) between when a student last saw the wheel and their next spin, the client should always fetch the current layout fresh at spin time (not rely on a long-lived cache) so the animation always matches a layout that's actually consistent with what the server just rolled against — a stale cached layout could visually land the wheel on the wrong-looking segment for the reward returned.

### 6.6 Reward pool misconfiguration
Same as Mystery Chest §8.7 — all-inactive segments or zero total weight should be caught by config validation before it can reach the roll logic in production, and the spin endpoint should fail safely (nothing granted, alerting fires) rather than erroring mid-transaction.

### 6.7 Client killed/reconnects mid-spin-animation
If the app is closed or crashes after the server has already committed the roll (§2.2 step 2–3) but before the client finishes playing the animation, the reward has already been granted server-side — on next load, `GET /api/spin/current-week` should return `status: SPUN` with the snapshot reward, and the client should show the resting "already spun, here's what you won" state rather than trying to replay a spin animation for a result the current session never actually requested live.

### 6.8 Full-screen view dismissed or backgrounded mid-spin
If the student navigates away (system back button, app backgrounded, browser tab switched) after the spin request has already been sent but before the in-view animation finishes, the result is already committed server-side (same situation as §6.7's reconnect case). On returning to the full-screen view or the home screen, state should resolve to the resting "already spun, here's what you won" view rather than attempting to resume or replay an animation for a request that's no longer live — never re-trigger a second spin because the first one's animation didn't get to finish.

### 6.9 Realtime channel drops / generation race
Same fallback and race-safety patterns as the other two features (`refetchOnWindowFocus`, unique constraint on `(user_id, week_start)` for the row itself).

---

## PART 7 — API Summary

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/spin/current-week` | Returns this week's spin state (`AVAILABLE` / `SPUN`), generating the row if needed |
| `GET` | `/api/spin/wheel-config` | Returns the static segment layout (§2.1) — cacheable, versioned, not per-user |
| `POST` | `/api/spin/spin` | Performs the server-side weighted roll, returns the landing segment + reward |

---

## PART 8 — Analytics Events

- `weekly_spin_available` `{user_id, week_start}`
- `weekly_spin_used` `{user_id, week_start, landed_segment_index, reward_type, reward_amount, rarity_tier}`
- `weekly_spin_expired_unused` `{user_id, week_start}` — signals whether visibility/CTA strength on this widget is actually enough, since unlike the chest there's no unlock gate that would explain a low usage rate
- `spin_reward_overflow_substituted` `{user_id, original_reward_type, substituted_reward_type}`

---

## PART 9 — Test Coverage

### Unit
- Weighted roll over the active segment pool approximates configured weights over many trials; never selects an inactive segment.
- Target-angle calculation: given a `landedSegmentIndex` and the fixed layout, the computed `targetAngle` always lands the pointer within the correct segment's arc (including the jitter range never crossing into a neighboring segment).
- Overflow substitution logic, identical test shape to Mystery Chest.

### Integration
- Spin transaction: concurrent spin requests on the same `weekly_spins` row → exactly one grant, verified against the ledger.
- Week-boundary consistency: assert `week_start` computation matches the Weekly Progress card's own week-start utility for a range of test dates/timezones (this is the test that catches the two widgets disagreeing, §6.1).
- Config validation: zero-weight/all-inactive segment pool caught before reaching the roll logic.

### End-to-end
- Spin becomes available at the correct local week boundary.
- Full spin: tap → server roll → wheel animates and lands precisely on the segment matching the returned `landedSegmentIndex` (assert final rendered rotation angle corresponds to the correct segment, not just "an animation played").
- Reward flies to balance, spin locks to "used this week," refresh-proof.
- Reload/reconnect mid-animation (§6.7) resolves to the correct resting state without replaying a stale animation.
- Rapid double-tap → exactly one reward granted.
- Week rollover with tab left open → stale spin attempt returns `410`, client recovers gracefully.
- Tap the home-screen widget → full-screen takeover opens correctly, close control works pre-spin and is hidden/disabled once a spin is in flight, and returning to the home screen after a completed spin shows the correct "used this week" resting state on the widget.
- Background/switch away mid-spin, then return → resolves to the correct post-spin resting state without replaying or double-triggering a spin (§6.8).

### Manual QA / feel
- The deceleration curve actually reads as "friction," not a linear or simple ease-out slowdown — compare against a real casino/game wheel reference side by side.
- Tick sounds audibly track the visual slowdown in real time, not a fixed metronome.
- The landing settle (overshoot + spring-back) is felt, not just technically present — if it's too subtle to notice, it's not doing its job.
- Visual design review specifically against Part 5's "avoid" list — flag anything that reads as a themed dashboard card rather than a game object.
- Rarity-tier differentiation on rare pulls (Streak Freeze, high Gems) is unmistakably a bigger moment than a common coin result, consistent with Mystery Chest's tiering.

---

## PART 10 — Engineering Tickets

**TEYRO-SPIN-1: Data model & migrations**
`spin_wheel_segments`, `weekly_spins` (unique `(user_id, week_start)`). Seed initial segment layout and weights.

**TEYRO-SPIN-2: Weekly spin availability service**
Lazy generation of the week's row, timezone-aware, matching the Weekly Progress card's week-boundary logic exactly (§6.1) — this should call the *same* shared utility, not a re-derived one.

**TEYRO-SPIN-3: Spin endpoint + weighted roll + reward ledger**
`POST /spin/spin` — CSPRNG weighted selection, row locking, idempotency-key constraint, overflow substitution, writes into the shared `reward_transactions`/`user_inventory` infrastructure from Mystery Chest.

**TEYRO-SPIN-4: Wheel config endpoint**
`GET /spin/wheel-config` — versioned, cacheable static layout response.

**TEYRO-SPIN-5: Supabase Realtime sync**
Subscribe to `weekly_spins` changes, same pattern as the other two features.

**TEYRO-SPIN-6: Frontend wheel physics & animation**
Full choreography from Part 2 — server-result-driven angle calculation, custom-friction easing, tick sound generation synced to tween progress, overshoot/settle, chase lights, reveal + fly-to-balance, failure state.

**TEYRO-SPIN-7: Full-screen takeover route/modal**
Home-screen static preview widget → tap → full-screen modal/route per §2.8, entry/exit transitions, close control (with the pre-spin-only visibility rule), and correct state resolution on return to the home screen including the backgrounded-mid-spin case (§6.8).

**TEYRO-SPIN-8: Visual design pass**
Implement Part 5's direction against the two reference screenshots — dark stage/vignette, metallic rim, chase lights, high-contrast segment styling, embossed CTA, applied consistently across both the home-screen preview and the full-screen view. Explicit design review checkpoint against the "avoid" list and the "what not to carry over" scope note (§2.8) before this ships.

**TEYRO-SPIN-9: Test suite**
Full matrix from Part 9, including the cross-widget week-boundary consistency test.

---

## PART 11 — Open Product Decisions (flag before/during build)

1. Should Weekly Spin have an unlock condition (e.g. tied to weekly activity) like Mystery Chest does, or stay a no-strings-attached weekly freebie as currently designed? (§1.1)
2. Exact segment layout and weight table — how many segments, which rewards, and the visual-slice-vs-actual-weight split described in §2.1. This is a numbers/economy decision, same category as the chest's drop-rate table, not an engineering one.
3. Confirm the shared week-start utility referenced throughout (§6.1) actually exists yet, or needs to be extracted from wherever the Weekly Progress card currently computes it, so both features definitely agree.
4. Whether extra spins should ever be purchasable with Gems (the Shop's "future items" list leaves room for this) — affects whether `weekly_spins` needs to support more than one row per user per week down the line.
