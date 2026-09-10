# Teyro — Lesson Path Unlock Spec
**Status:** Ready for engineering handoff
**Owner:** Joel Ndakwe
**Feature:** Course Lesson Map — node states, sequential unlocking, and the "next journey unlocked" reveal animation

---

## PART 0 — How This Feature Actually Works (read this first)

### What this map is actually for

The lesson map isn't just a progress display — it's the thing a student looks at right after finishing a lesson, which makes it one of the most emotionally important screens in the app. Duolingo's version of this works because the map does something the completion screen alone can't: it shows the student **exactly what's next**, and makes getting there feel like it was worth earning. Get the unlock moment right and returning to the map after a lesson becomes its own small reward, on top of whatever XP/coins RewardRun already animated on the completion screen.

### The journey

**1. Student finishes a lesson.**
The completion/results screen shows XP and coin gains (RewardRun handles this, per the separate RewardRun spec — that document owns the flying-currency animation, this one owns what happens on the map itself).

**2. Student returns to the map.**
This is the key moment. The map doesn't just silently show updated data — it plays a short, staged reveal:
- The node they just finished flips from "current" to **completed** (fills in, checkmark badge pops in with a bounce).
- The path line between that node and the next one **draws forward**, like the trail is physically extending.
- The next node **unlocks** — it transitions from a dim, locked appearance into full color, with a brief "pop" (a small overshoot-and-settle scale, same family of motion as the reward reveals elsewhere in this app) and then settles into a gentle idle pulse that says "tap me, I'm ready."

This sequence is the "next journey unlocked" feeling — not a single node's state flipping, but a small chain reaction that visibly moves the student's progress forward one step.

**3. If finishing this lesson also completes the whole section**, a second, bigger moment follows: the section-progress ring fills to 100%, and the section's bonus mystery chest (the one shown in the "Unlock Bonus Reward" card) becomes claimable — its own reveal, sequenced *after* the node-unlock animation finishes, not simultaneously with it, so the two moments don't compete for attention.

**4. If the student just opens the map on its own** (not right after finishing something — e.g., navigating in from the sidebar hours later), **none of this animation plays.** The map renders its current, accurate state directly. The unlock reveal is a one-time "welcome back, here's what changed" moment tied to having just earned it, not something that replays every time the map is viewed — replaying it on every visit would cheapen it fast.

---

## PART 1 — Node States & the Underlying Model

### 1.1 States
Each lesson node on the map is in exactly one state at any time:

| State | Appearance (per the current design) | Interactive? |
|---|---|---|
| `LOCKED` | Dimmed/greyed, no "START" affordance | No — tapping should give gentle feedback, not silently do nothing (§6.6) |
| `AVAILABLE` | Full color, "START" label, idle pulse | Yes — this is the current node the student would tap next |
| `COMPLETED` | Filled color with a checkmark badge (as shown for already-finished lessons) | Yes — tappable to review/redo, but see §6.2 for why redoing doesn't replay the unlock animation |

### 1.2 Unlock rule (default: strictly linear)
Completing lesson N marks lesson N+1 (next by defined order within the section) as `AVAILABLE`. This spec assumes **strictly sequential unlocking** — a student cannot skip ahead to a locked lesson regardless of any other progress — matching the standard Duolingo-style model and consistent with the screenshot showing a clear single path with no branching. If non-linear access (test-out, jump-ahead) is ever wanted, that's a distinct product decision to flag explicitly (§9.1), not something to build implicitly.

### 1.3 Crossing a section boundary
When the last lesson in a section is completed, the unlock rule extends to the first lesson of the *next* section (if the student is enrolled and that section itself isn't gated behind something else, like a prerequisite course). This should trigger both the standard node-unlock reveal (§0, step 2) and the section-completion chest reveal (§0, step 3) in sequence, not as two competing simultaneous animations.

---

## PART 2 — Data Model

### `user_lesson_progress`
One row per user per lesson.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | |
| `lesson_id` | uuid | FK |
| `status` | enum | `LOCKED`, `AVAILABLE`, `COMPLETED` |
| `completed_at` | timestamptz | nullable |
| `unlocked_at` | timestamptz | nullable — when this row transitioned to `AVAILABLE`; used to detect "was this just unlocked" for the reveal animation (§4) |

### `section_completion_chests`
Structurally identical in spirit to Mystery Chest's `daily_chests` table (same spec, same reward-roll mechanics reused per §5) — just keyed by section-completion instead of by day.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | |
| `section_id` | uuid | |
| `status` | enum | `LOCKED`, `READY_TO_OPEN`, `OPENED` |
| `reward_snapshot_type` / `reward_snapshot_amount` | | same pattern as Mystery Chest |

---

## PART 3 — Real-Time / No-Refresh Guarantee

Same governing principle as every other feature in this series: the map should never require a manual refresh to reflect true state, and no animation ever plays ahead of a confirmed server response.

### 3.1 Primary mechanism: piggyback on the lesson-complete response
`POST /lessons/:id/complete` (already gaining fields for RewardRun and Today's Mission/Mystery Chest in their respective specs) gains one more:

```
→ {
    ...,
    pathUpdate: {
      completedLessonId,
      nextLessonId,          // null if this was the last lesson in the course
      nextLessonNowAvailable: true,
      sectionCompleted: false,
      sectionChestStatus: { status: "READY_TO_OPEN" }  // only present if relevant
    }
  }
```

The client uses this payload directly to drive the map's reveal sequence when the student navigates back to it — this is also exactly how the client distinguishes "I should play the unlock animation" from "just render current state" (§4): the animation plays only when arriving at the map carrying a fresh, not-yet-displayed `pathUpdate`.

### 3.2 Cross-tab / cross-device sync
Supabase Realtime subscription on `user_lesson_progress`, same pattern as every other feature — if a lesson is completed on one device, a second open tab/device converges without a manual refresh (though it would apply the state directly without replaying the reveal animation there, per §4.2).

---

## PART 4 — Determining When the Reveal Animation Should Play

This is the detail that makes the difference between "delightful the first time" and "annoying every time."

### 4.1 The trigger
The reveal sequence (§0 step 2–3) plays **only** when the map is loaded as part of returning from a just-completed lesson — i.e., the client is holding a fresh `pathUpdate` payload from that specific completion request that hasn't been "consumed" yet. Once consumed (the animation has played), it's discarded — a subsequent visit to the same map, even seconds later, renders the final state directly with no animation.

### 4.2 Implementation approach
- The lesson-completion flow should carry the `pathUpdate` payload forward to the map view (e.g., via client-side navigation state/route state, not a URL param that could be bookmarked/replayed) — arriving at the map any other way (sidebar navigation, browser back button days later, a second tab) never carries this payload, so it never triggers the reveal.
- Realtime-pushed updates (§3.2) update the underlying data silently, without ever triggering the reveal sequence — the reveal is tied specifically to "the current session's own action just caused this," not to "this data recently changed for any reason."

### 4.3 Redoing an already-completed lesson (§1.1, `COMPLETED` is still tappable)
Re-completing a lesson that's already `COMPLETED` should not fire the unlock reveal — there's nothing new being unlocked. The completion response for a redo should either omit `pathUpdate` entirely or return it with `nextLessonNowAvailable: false` (nothing changed), and the client should render any updated stats (XP, if redoing grants any) via RewardRun without touching the map's node states.

---

## PART 5 — Animation Choreography

Stack consistent with the rest of this series: GSAP for sequencing, SVG for the path line itself (enables the stroke-draw technique below), no Rive (per the earlier project-wide note — sprite/CSS-based Tey reactions where relevant).

### 5.0 Design direction: this needs to read as a game, not a checklist updating

The failure mode to actively avoid here is the same one flagged for the Weekly Spin widget: a technically-correct state change (node goes from grey to colored, a line gets longer) that reads as a settings page updating rather than something earned. Reference points worth actually looking at side by side while building this: **Duolingo's path** (the direct model), but also **Candy Crush's world map**, **Super Mario World's level map**, and **Clash Royale's path/chest reveals** — all of these treat "unlocking the next thing" as a small event with weight, sound, and a bit of camera reaction, not a passive redraw.

**Avoid:**
- A flat color-swap with no motion — the node just silently becoming a different color the instant the screen loads.
- A single easing curve applied uniformly to everything (path draw, node pop, badge scale) — real game feel comes from each element having its own distinct timing/weight, not one generic "ease-out" reused everywhere.
- Total silence. A visual-only sequence with no accompanying sound or haptic cue is the single easiest way for this to feel like a UI update instead of a game moment.
- Perfectly flat, thin-stroke node circles — see the node-design note below.

**Build toward:**
- **Node design as a chunky medallion/badge, not a flat circle.** A locked node, an available node, and a completed node should each look like a distinct physical object with real dimensionality — a beveled rim, a drop shadow, an inner highlight — the same visual language already specced for the Weekly Spin wheel and Mystery Chest. A completed node earning its checkmark should feel like a badge being awarded, not a bullet point getting checked off.
- **A small camera "punch" on the big beats.** When the just-completed node locks in (§5.1) and again when the next node fully unlocks (§5.3), a very brief (1–2 frame equivalent, ~80–120ms) scale-punch on the surrounding viewport — the whole map briefly, subtly zooms in a couple percent and springs back — sells weight and impact far more than animating the node alone in isolation. Keep it small; this is a punch, not a screen shake that disorients.
- **Sound and haptics as first-class parts of the sequence, not an afterthought** — see §5.6. A path-draw "whoosh," a distinct "clunk" as the node locks into its unlocked state, and (on mobile) a light haptic tap on that same beat, are what most directly separate "felt like a game" from "watched an animation."
- **Particle/confetti weight scaled to significance**, same principle used throughout this series: a routine single-node unlock gets a small, localized sparkle (§5.1's existing note); the section-completion chest becoming claimable (§5.4) should visibly outrank it — a wider burst, brighter colors, longer hang-time — so the two don't read as the same-sized moment.
- **The idle pulse on a freshly-unlocked node should have real presence** — not a subtle 2% opacity breathe, but a noticeable glow/scale loop that would catch your eye from a normal viewing distance, the same energy level as the chest and spin-wheel idle states elsewhere in the app.

### 5.1 Node completion (the just-finished lesson)
- The node's fill transitions from its "current" appearance to the completed color/state.
- A checkmark badge scales in with a small bounce (`CustomBounce`, ~250–350ms) — matches the "landing" feel already established for reward arrivals elsewhere in this series, so completion moments across the app share a visual vocabulary.
- Small, localized particle/sparkle burst — modest, this is a routine completion, not a rare event (contrast with §5.3's bigger treatment).
- Paired with the small camera-punch (§5.0) on the checkmark's landing frame, and a short, satisfying "lock-in" sound (a soft clunk/chime, distinct from RewardRun's coin/XP sounds so the ear doesn't confuse "I completed a step" with "I earned currency").

### 5.2 Path segment draw
- The connecting line/path between the just-completed node and the next node animates via an SVG `stroke-dashoffset` technique (draw-on effect), ~400–600ms, easing that reads as "flowing forward" (e.g. `power2.out`) rather than linear.
- This is what visually sells "your progress physically extended," distinct from the node states just changing independently of each other.
- A rising "whoosh"/travel sound tracks the draw's progress (not a static one-shot played once at the start) — reinforces the sense of something moving *toward* the next node, setting up its unlock as the payoff.

### 5.3 Next node unlock
- Starts from the `LOCKED` appearance (dim, lock icon if the design includes one).
- Lock icon fades/breaks away (~150–200ms) — consider a small "shatter" or "pop" treatment on the lock itself rather than a plain fade, consistent with the game-feel direction in §5.0.
- Node scales up with an elastic overshoot-and-settle (`CustomBounce`, similar family to Mystery Chest's reveal settle and RewardRun's landing bumps — deliberate visual consistency across the whole app's "something just became available/was granted" language).
- This is the biggest beat in the routine (non-section-completion) sequence — pair it with the camera punch (§5.0), the most distinct sound cue in this whole sequence (a clear, bright "unlocked!" chime — this is the one moment in the flow most worth spending real sound-design effort on), and on mobile, a light-to-medium haptic tap timed to the same frame.
- "START" label and the idle pulse loop (subtle glow/scale breathing, low amplitude, continuous) begin once the node settles — this is the ambient signal inviting the next tap, consistent with the same idle-pulse pattern already used for the Mystery Chest and Weekly Spin CTAs, tuned per §5.0 to have real, noticeable presence rather than being too subtle to register.
- If the newly-unlocked node is off-screen (a long winding path), the map smoothly pans/scrolls to bring it into view as part of this beat — not a hard jump cut.

### 5.4 Section-completion chest reveal (only if applicable)
Sequenced to start **after** §5.3 settles, not concurrently — the section-progress ring (per the existing sidebar widget) animates its fill to 100%, and the chest's "Claim Reward" button becomes enabled with its own idle pulse. Actually opening the chest reuses the exact reveal choreography already specified in the Mystery Chest spec (shake → crack → reveal → fly-to-balance via RewardRun) — this feature only owns *unlocking* it, not a second, separate opening animation.

### 5.5 First-ever visit / no prior action to animate from
A brand-new student's very first map view (or any view not arriving via §4.1's trigger) renders every node in its correct resting state directly — no reveal sequence plays, since there's nothing that was "just" unlocked in this session.

### 5.6 Sound & haptics summary

| Beat | Sound | Haptic (mobile) |
|---|---|---|
| Node completes (§5.1) | soft lock-in clunk/chime | light tap |
| Path draws (§5.2) | rising whoosh, tracks progress | none |
| Next node unlocks (§5.3) | bright, distinct "unlocked!" chime — the standout cue of the sequence | light–medium tap |
| Section chest ready (§5.4) | bigger fanfare, clearly outranking the routine unlock chime | medium tap |

All gated behind the existing Audio Settings toggle already established for the other reward features — this sequence should feel muted-but-still-satisfying with sound off (motion and haptics alone still need to carry the moment), not broken or empty.

---

## PART 6 — Edge Cases & Error Handling

### 6.1 Section boundary crossing (§1.3)
The reveal sequence for "last lesson in section" needs to correctly chain: node-complete → path-draw → next-section's-first-node-unlock → (if applicable) section-chest-reveal, potentially spanning a different visual area of the map (the start of a new section) — verify the auto-scroll (§5.3) correctly brings the *new section's* first node into view, not just the next node in the old section's local area.

### 6.2 Redo doesn't replay the reveal (§4.3)
Covered above — restated as a required test case (§7).

### 6.3 Locked node tapped
Tapping a `LOCKED` node should give clear, friendly feedback (e.g., a small toast or shake: "Complete the lessons before this one first!") rather than doing nothing silently or erroring — a locked node that just doesn't respond to taps reads as broken, not as intentionally gated.

### 6.4 Realtime-pushed update arriving mid-reveal-animation
If a Realtime push (§3.2) for unrelated progress (e.g., a different course, or the same course completed on another device) arrives while this session's own reveal animation is actively playing, the incoming update should merge into the underlying data without interrupting or restarting the in-flight animation — the animation is scoped to what *this session* just did, not a live mirror of every incoming update.

### 6.5 Network failure mid-lesson-completion
If the completion request itself fails, no `pathUpdate` exists to consume, and the map (when eventually visited) shows the pre-completion state accurately — no premature/optimistic unlocking, consistent with the "never animate or unlock ahead of a confirmed response" rule used throughout this series.

### 6.6 Very long paths / many locked nodes ahead
Rendering performance for a course with a long lesson sequence — confirm the map virtualizes or otherwise handles rendering many nodes without jank, independent of the animation work itself; this is a baseline rendering concern the unlock feature depends on being solid.

### 6.7 Student completes the very last lesson in the entire course
`nextLessonId` is `null` in the `pathUpdate` payload (§3.1) — the reveal sequence should stop after §5.1/§5.2 (no next node to unlock) and instead lead into whatever the course-completion moment is (out of scope for this spec, but flag that this payload shape needs to communicate "no next lesson" distinctly from "next lesson exists but something went wrong").

---

## PART 7 — Test Coverage

### Unit
- Unlock rule: completing lesson N correctly sets lesson N+1 to `AVAILABLE`; completing the last lesson in a section correctly cascades into the next section's first lesson (§1.3); completing the course's final lesson produces `nextLessonId: null` without erroring.
- Redo detection: completing an already-`COMPLETED` lesson never re-triggers `nextLessonNowAvailable: true` for an already-available/completed next node.

### Integration
- `pathUpdate` payload accuracy across: mid-section completion, section-boundary completion (with and without a section chest becoming ready), course-final-lesson completion.
- Section chest `READY_TO_OPEN` transition correctly ties to the "all lessons in section complete" condition, not an earlier partial-progress state.

### End-to-end
- Complete a lesson → return to map → full reveal sequence plays in the correct order (node completes → path draws → next node unlocks → idle pulse begins), matching §5.
- Complete the last lesson in a section → reveal sequence correctly chains into the next section and (if applicable) the section-chest reveal, without the two competing simultaneously (§5.4, §6.1).
- Navigate to the map via the sidebar (not right after a completion) → no reveal animation plays, correct resting state shown directly (§5.5).
- Redo an already-completed lesson → no unlock reveal, XP-only RewardRun animation if applicable (§4.3, §6.2).
- Tap a locked node → friendly feedback shown, no navigation/error (§6.3).
- Simulate a Realtime push for unrelated progress arriving mid-animation → in-flight animation completes undisturbed, unrelated data still merges correctly (§6.4).
- Failed completion request → map shows accurate pre-completion state on next visit, no phantom unlock (§6.5).

### Manual QA / feel
- The unlock "pop" and idle pulse on the newly-available node should read as genuinely inviting, not just a color change — compare directly against Duolingo's own path-unlock feel as a reference point, since that's the explicit bar being set.
- Auto-scroll/pan to bring an off-screen newly-unlocked node into view feels smooth, not jarring, across a few different path lengths/positions.
- Section-completion chest reveal feels like a distinctly bigger moment than a routine single-lesson unlock, consistent with the "save the big treatment for rare moments" principle used throughout this series.
- Design review specifically against §5.0's avoid list — flag anything that reads as a state update rather than an earned moment: flat color-swaps, uniform easing across every element, silence, thin flat node circles. Compare the sequence directly against Duolingo's path and at least one of Candy Crush/Super Mario World/Clash Royale's map or chest reveals as a side-by-side bar.

---

## PART 8 — Engineering Tickets

**TEYRO-PATH-1: Data model & migrations**
`user_lesson_progress`, `section_completion_chests` per Part 2.

**TEYRO-PATH-2: Unlock rule service**
Sequential unlock logic per Part 1, including section-boundary cascading (§1.3) and course-completion handling (§6.7).

**TEYRO-PATH-3: `pathUpdate` on the lesson-complete response**
Add the payload described in §3.1 to the existing `POST /lessons/:id/complete` endpoint (same endpoint already gaining fields for RewardRun and the other reward features — coordinate so this doesn't become four separate additions landing in four separate PRs against the same response shape).

**TEYRO-PATH-4: Frontend reveal sequence**
Full choreography from Part 5 — node completion, path-draw, node unlock, idle pulse, auto-scroll, section-chest hand-off — gated by the "was this just earned this session" trigger logic from Part 4. Explicitly includes the game-feel elements from §5.0/§5.6: node medallion/badge visual design, camera-punch beats, sound design, and mobile haptics — not just the state-transition motion alone. Design review checkpoint against §5.0's avoid list before this ships.

**TEYRO-PATH-5: Section-completion chest integration**
Reuse the Mystery Chest spec's open/reveal mechanics (server-side roll, claim flow, RewardRun hand-off) against the `section_completion_chests` table instead of `daily_chests` — this should be a thin adapter over already-built chest infrastructure, not a parallel implementation.

**TEYRO-PATH-6: Supabase Realtime sync + locked-node feedback**
Cross-tab sync per §3.2, with the animation-suppression rule (§6.4); locked-node tap feedback per §6.3.

**TEYRO-PATH-7: Test suite**
Full matrix from Part 7.

---

## PART 9 — Open Product Decisions (flag before/during build)

1. **Strictly linear unlocking, confirmed?** (§1.2) — this spec assumes no skip-ahead/test-out capability exists. If the "Jump to Unit" control seen elsewhere in the app is meant to bypass locking rather than just navigate the map's viewport to an already-unlocked unit, that's a materially different feature and needs its own scope, not an assumption baked in here.
2. **Section-completion chest reward table** — does it share the exact same reward pool/weights as the daily Mystery Chest, or does it warrant its own (likely better) reward tier, since it takes meaningfully more effort to earn than a single day's lesson? Same category of decision as the drop-rate calls already flagged in the Mystery Chest spec.
3. **Course-completion moment** (§6.7) — out of scope here, but needs its own spec pass once this foundation exists, since finishing an entire course is a bigger milestone than finishing a section.
4. **Locked-node feedback copy/style** (§6.3) — toast, shake, or something else; needs actual design, not just "give feedback."
