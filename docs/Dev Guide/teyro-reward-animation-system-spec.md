# RewardRun — Teyro's Shared Reward Collection & Animation System
**Status:** Ready for engineering handoff — foundational/shared system
**Owner:** Joel Ndakwe
**Feature:** Cross-cutting — the animation layer used by every feature that grants Coins, XP, Hearts, or a Streak day (Today's Mission, Mystery Chest, Weekly Lucky Spin, Quests, streak-protection banner, onboarding Daily Reward, and any future reward source)
**Revision note:** Updated against an actual codebase diagnostic trace (Part 9–13) — this revision adds the real integration points, the reward sources the trace didn't cover, and the prerequisite bugs that need fixing before this system can work reliably. Teyro's currency model has been simplified to a single currency, **Coins** — the earlier Coins/Gems confusion described in the trace is a real bug in the current codebase, addressed in Part 11.

---

## PART 0 — Why This Needs to Be Its Own System, Not a Per-Feature Animation

Every reward spec written so far (Today's Mission, Mystery Chest, Weekly Lucky Spin) described its own version of "the reward flies to the top balance bar." If each of those gets built independently, you end up with three slightly different coin animations, three different arc shapes, three different timing curves — and the player *will* notice the inconsistency, because this exact motion happens constantly across the app. It needs to be **one shared system** that every reward-granting feature calls into, the same way they already all share `reward_transactions` on the backend.

### The reference behavior (Temple Run / Coin Master style)

When a reward is granted:
1. One or more small icon "pickups" (transparent-background PNG/SVG — coin, XP gem, heart, flame) spawn at the location where the reward was earned (a mission card, a chest, a wheel, the streak-protection "Continue" button, the onboarding "Claim Day 1 Reward" button — anywhere).
2. They travel along a curved path to the matching icon in the **top stats bar** (🔥 Day Streak, 🪙 Coins, 💎 XP Points, ❤️ Lives, level badge).
3. They arrive **one after another**, not simultaneously — each arrival gives the stats-bar counter a small bump and increments the number, so a reward of several units reads as a little burst of individual collections, not one instant jump.
4. The stats bar is the single, consistent "home" every reward is visibly traveling toward, reinforcing that everything the student does feeds that one bar at the top of the screen.

---

## PART 1 — The Core Mechanic: Collectible Flight, Not a Literal 1-Icon-Per-Unit

### 1.1 Why you can't spawn one icon per actual unit

If a student earns 50 coins, spawning 50 individual flying coin icons is both a performance problem and visually chaotic — real games never do this. Instead:

- A **capped number of visual icons** (recommend 3–6, tunable) spawn regardless of the actual reward amount, staggered in their launch (~80–120ms apart).
- The stats-bar counter's count-up animation is **synced to the icons' arrivals** — the number ticks upward as each visual icon lands, with the final icon's arrival landing exactly on the true final total. The visual icons represent "collecting," the counter is what's actually accurate.
- **Small, exact-count currencies are the exception**: Hearts, and streak-day increments, are always ±1 at a time by nature (you don't earn "5 hearts" in one grant under the current design) — for these, spawn exactly one icon, no capping logic needed.

### 1.2 Worked example

Student claims a mission reward of +20 XP and +10 Coins:
- 4 XP-gem icons spawn from the mission card, staggered, arcing to the XP Points stat, each arrival bumping the XP counter by 5 (20 ÷ 4) until it reads the true new total.
- Simultaneously (or staggered ~100ms after the XP set starts, per §2.4), 3 coin icons spawn and arc to the Coins stat, each arrival bumping the counter by ~3–4 until it reads the true total.
- Total sequence: roughly 1–1.5 seconds for both currencies combined, not a long wait, but distinctly "things arriving" rather than an instant number change.

---

## PART 2 — Per-Currency Behavior

### 2.1 Coins 🪙
- Icon: the existing transparent-background coin icon.
- Motion: a subtle spin/flip on the icon during flight (rotate on its Y-axis or a simple 2D spin) — reads as a coin tumbling through the air, not sliding flatly.
- Arc: a natural upward-then-down bezier curve toward the Coins stat position, with a small randomized horizontal offset per icon in a multi-icon burst so they don't all trace the exact same line (Temple Run's coins visibly scatter slightly even when collected from the same pickup).
- Landing: coin stat icon does a quick scale bump (`1 → 1.15 → 1`) on each arrival.

### 2.2 XP 💎
- Icon: the existing XP gem/cube icon.
- Motion: similar arc/spin to coins, but should feel slightly weightier/slower — XP is the "progress" currency, coins are the "spending" currency, and a small difference in motion feel (e.g., 15–20% longer flight duration) helps them read as conceptually different even though the mechanic is shared.
- **XP flight also drives level progress**, not just the XP Points counter — see Part 3. If a level-up is triggered by this grant, the standard XP flight plays first, then the level-up sequence takes over (§3.2), it does not play simultaneously with a full-screen level-up burst.

### 2.3 Hearts ❤️
- Icon: the existing heart icon, exactly one spawned per grant (§1.1 exception).
- Motion: same arc mechanic as coins/XP, but simpler — a single heart traveling to the Lives stat, landing bump, done.
- **Cap-aware:** if the student is already at max hearts (5/5), no heart animation should ever play for a reward that would exceed the cap — this ties directly to the overflow-substitution rule already established in the Mystery Chest spec (§8.5 there): the *substituted* reward's icon flies instead, never a heart icon flying toward a stat that's already full. This system should accept the already-resolved, already-substituted reward from the backend, not decide substitution itself — substitution logic stays server-side (per the other specs), this system just animates whatever the server actually granted.

### 2.4 Streak day (🔥)
This one is structurally different from the other three and should **not** use the flying-icon mechanic:
- A streak day isn't a variable quantity collected from a source — it's a daily +1 fact. Spawning a flying flame icon from "completing a lesson" toward the streak counter would be misleading (it implies the streak was "earned" the same way coins were, when really it's a state transition: yesterday's streak either continued or didn't).
- Instead: when the day's streak-maintaining action completes, the flame icon **in the stats bar itself** does a direct pulse/glow-and-count-up (e.g., 3 → 4) with a small burst of particles *at* the stats bar, not traveling *to* it from elsewhere.
- Exception: if a feature explicitly frames the streak as something being protected/claimed via an action (e.g., the "Finish one lesson today to protect your 3-day streak" banner with its own `+10 XP / +5 Coins` rewards, per the home screen), the XP/Coins portion of that follows the normal flying mechanic (§2.1–2.2), and the streak-day-continuing itself still resolves as the stats-bar pulse (§2.4), not a separate flying flame.

---

## PART 3 — Level-Up: The One Sequence That's Deliberately Bigger

### 3.1 Why level-up needs its own tier

Every other event in this system is a small, frequent "juice" moment. Leveling up is rare and should read as a genuine milestone, not just a slightly bigger version of an XP pickup — same principle already established in Today's Mission's "all 3 missions claimed" celebration and Mystery Chest's rare-reward tier: **reserve the biggest visual treatment for the moments that are actually rare**, or nothing in the system feels special.

### 3.2 Sequence

1. XP flight plays normally (§2.2) and the XP progress indicator (if the UI has one — a bar under the level badge, consistent with the "35 XP away from Level 2" pattern already shown in the home screen mock) fills toward its threshold as each XP icon lands.
2. If the final XP increment crosses the level threshold: once the XP progress bar visually fills to 100%, it triggers directly into a level-up burst — the level badge in the stats bar does a distinct animation (scale up, brief glow/shine sweep, number flips or counts from old level to new level), a short screen-wide (or stats-bar-localized, TBD in design) particle burst plays, and a "LEVEL UP!" moment is announced (a small banner/toast, and/or Tey reacting per the sprite-based reaction pattern already established in Today's Mission and Mystery Chest — no Rive, same note as those specs).
3. The XP progress bar then resets to 0 and shows overflow progress toward the *next* level (i.e., if the grant was large enough to leave leftover XP past the threshold, that leftover should visibly continue filling the new bar, not vanish).

### 3.3 Multi-level grants (rare edge case)
If a single reward grant is large enough to cross more than one level threshold at once (unlikely under current reward sizes, but not impossible with a large bonus/event reward), don't play the full level-up burst twice in a row back-to-back — collapse it into a single "leveled up to N" sequence reflecting the final level reached, with the intermediate levels not each getting their own full celebration. Flag as a product decision if a different treatment is preferred (§8.4).

---

## PART 4 — Technical Architecture

### 4.1 A single shared component, not per-feature implementations

Build one `RewardAnimationController` (name illustrative) that every feature calls into:

```
triggerRewardAnimation({
  originElement: HTMLElement,       // the DOM node the reward visually comes from
                                     // (mission card's reward badge, chest, wheel segment,
                                     //  streak-protect button, etc.)
  rewards: [
    { currency: 'COINS', amount: 10 },
    { currency: 'XP', amount: 20 },
  ],
  onComplete?: () => void
})
```

- Today's Mission, Mystery Chest, Weekly Spin, the streak-protection banner, and the onboarding Daily Reward panel all call this **same** function with their own origin element and the reward payload the server actually returned — none of them implement their own flight/arc/stagger logic. This is what guarantees visual consistency across every reward moment in the app, and it's also just less code to maintain than three parallel implementations.
- This system is purely a **presentation layer over an already-confirmed server response** — same non-negotiable rule stated in every other spec in this series: it is never invoked speculatively/optimistically, only after the granting request (claim, open, spin, complete) has actually succeeded.

### 4.2 Rendering layer

- Flying icons render in a single top-level "animation layer" (a fixed-position portal/overlay mounted once at the app root, above all other UI via z-index/stacking context) — not inside whatever component happens to trigger them. This avoids clipping issues if the origin element is inside a scrollable container, a modal, or anything else with `overflow: hidden`.
- Destination positions (the Coins/XP/Hearts/Streak/Level icons in the stats bar) are registered once, globally (e.g. via a context provider that the stats bar registers its own icon element refs into on mount), so any feature can trigger a flight toward "the Coins stat" without needing to know where that DOM element actually lives.

### 4.3 Position calculation

- Origin: `originElement.getBoundingClientRect()` read at the moment the animation starts.
- Destination: the registered stats-bar icon's `getBoundingClientRect()`, read fresh each time (not cached), since the stats bar's layout could shift (e.g., responsive breakpoints, a currency icon appearing/disappearing).
- Arc: a simple quadratic bezier between origin and destination, with a control point offset upward/outward to get the natural "arc" rather than a straight line — consistent per currency type (§2) but with the randomized per-icon jitter for multi-icon bursts (§1.1, §2.1).

### 4.4 Counter increment synchronization

The stats-bar counters must never show a value the backend hasn't actually confirmed. Sequence:
1. Server response arrives with the true final values (new coin balance, new XP total, etc.) — same as every other spec's claim/open/spin response.
2. The animation controller computes the *visual* per-icon increments (§1.1) that sum to exactly that confirmed delta — it does not invent or estimate; it distributes the real, known amount across the capped number of visual icons.
3. Each icon's arrival event drives one increment of the on-screen counter, and the very last icon's arrival is guaranteed to land the counter exactly on the server-confirmed total (rounding any remainder into the final increment, not lost or double-counted).

### 4.5 Queueing multiple concurrent reward events

If more than one reward-granting action resolves in close succession (e.g., a mission completion happens to coincide with the streak day resolving, or the student rapidly claims two things back to back), flights **queue and interleave gracefully** rather than firing simultaneous, colliding animations at the same stats-bar target:
- Per-currency, a lightweight queue accepts new "arrival" events and processes them in order — if a second XP grant comes in while the first is still animating, its icons queue up rather than overlapping mid-flight with the first set.
- Different currencies (Coins vs. XP vs. Hearts) can animate fully in parallel with each other, since they're heading to different stats-bar targets — only same-currency events need to queue against each other.

---

## PART 5 — Timing & Feel Reference

| Element | Duration | Notes |
|---|---|---|
| Per-icon flight | ~500–700ms | consistent across currencies, XP slightly longer (§2.2) |
| Stagger between icons in a burst | ~80–120ms | tune so a 4–6 icon burst reads as "quick succession," not a slow drip |
| Stats-bar landing bump | ~150–200ms | scale `1 → 1.15 → 1` |
| Streak pulse (§2.4, not a flight) | ~300–400ms | glow/scale directly at the stats bar |
| Level-up sequence (§3.2) | ~1.5–2.5s total | deliberately the longest of any of these — it's the rare, big moment |

---

## PART 6 — Edge Cases & Error Handling

### 6.1 Stats bar not mounted/visible when a reward resolves
If the student is on a sub-page or scrolled to a position where the top stats bar isn't currently rendered/visible (destination has no registered element to fly toward), skip the flight animation entirely — don't queue it for "later" or attempt to animate toward a stale/off-screen position. Update the underlying value silently; the student sees the correct number next time the stats bar is visible. A small in-place toast/indicator ("+10 XP") near wherever the reward was granted is a reasonable fallback so the moment isn't completely silent.

### 6.2 Origin element unmounts before the animation starts
If the triggering component (a mission card, a chest) unmounts or re-renders in a way that invalidates `originElement` between the server response arriving and the animation actually starting (rare, but possible with fast navigation), fall back to a default origin position (e.g., center of the current viewport, or the last known stats-bar-adjacent position) rather than throwing or silently failing to animate at all.

### 6.3 Rapid-fire reward events (§4.5) under real load
Stress-test the queueing logic specifically against the scenario where a student claims Today's Mission, then immediately opens Mystery Chest, then the streak resolves — all within a couple seconds. The queue should keep the stats bar numerically accurate throughout even if the visual animations are still catching up.

### 6.4 Very large one-off reward (event bonus, admin grant, etc.)
The capped-icon-count approach (§1.1) already handles this gracefully by design — a reward of 500 coins still only spawns the same 3–6 visual icons as a reward of 10 coins, just with each icon representing a larger chunk. No special-casing needed, but worth an explicit test (§7) since it's an easy thing to accidentally hardcode assumptions against (e.g., assuming reward amounts are always "small").

### 6.5 Reduced motion / accessibility
Respect `prefers-reduced-motion`: when set, replace the flying-icon sequence with a simple, fast fade/count-up directly at the stats bar (no travel animation) — the counter still updates correctly and a lightweight visual acknowledgment still plays, just without the motion-heavy flight.

### 6.6 Performance on lower-end devices
Cap the maximum number of concurrent animated DOM/SVG nodes across the whole animation layer (not just per-event) — if the queueing system (§4.5) somehow allows too many simultaneous in-flight icons under a burst of activity, degrade gracefully (e.g., collapse to fewer, larger icons, or skip straight to the landing bump) rather than causing jank.

### 6.7 Hearts overflow (cross-reference)
Already covered structurally in §2.3 — restated here as a required edge case test: a substituted reward (per the Mystery Chest/Weekly Spin overflow rules) must always animate as the *actual* granted reward, never a heart icon flying toward an already-full Lives stat.

---

## PART 7 — Test Coverage

### Unit
- Per-icon increment distribution: given a confirmed total and a capped icon count, increments always sum exactly to the confirmed total, with any remainder resolved on the final icon (never lost, never double-applied).
- Level-threshold crossing detection: correctly triggers the level-up sequence exactly once for a single-level crossing, and correctly collapses a multi-level crossing into one sequence (§3.3) rather than firing twice.
- Reduced-motion fallback: confirms the simplified path is used and still lands on the correct final value.

### Integration
- `triggerRewardAnimation` called from each of the three existing reward-granting features (mission claim, chest open, spin) produces visually equivalent motion for the same currency — this is the test that actually verifies "shared system," not just "each feature animates something."
- Queueing (§4.5) under simulated rapid concurrent events keeps the underlying counters numerically correct throughout, not just at final rest.

### End-to-end
- Full reward grant (e.g., mission claim with XP + Coins) → icons spawn from the correct origin, arc to the correct stats-bar targets, land with the correct final counter values, in the correct stagger order.
- Level-up crossing → XP flight plays, progress bar fills, level-up burst triggers, level badge updates, leftover XP correctly carries into the new level's progress bar.
- Hearts-at-cap scenario → substituted reward's icon (not a heart) is what actually animates (§6.7).
- Stats bar not visible (scrolled away / different page) → no flight attempted, value still updates correctly, fallback toast (if implemented) appears.
- Rapid sequential grants from two different features within the same session → all resolve correctly without colliding or corrupting the displayed totals.

### Manual QA / feel
- Side-by-side comparison of the animation triggered from Today's Mission vs. Mystery Chest vs. Weekly Spin — should look and feel like the same system, not three variations.
- Coin "tumble" spin, XP's slightly weightier feel, and the streak's stats-bar-local pulse (as opposed to a flight) are each distinguishable from one another at a glance — confirms §2's per-currency differentiation reads as intended rather than everything blurring into one generic animation.
- Level-up moment genuinely feels bigger than a normal reward pickup, consistent with the "reserve the big treatment for rare moments" principle threaded through this whole series of specs.

---

## PART 8 — Open Product Decisions (flag before/during build)

1. **Exact capped icon count per burst** (§1.1) — 3–6 is a reasonable starting range, but the right number is really a feel decision best made by watching it in motion, not picked from a spec.
2. **Level-up burst scope** — screen-wide overlay effect, or localized to the stats bar area only? Affects both the visual impact and the implementation complexity (a screen-wide overlay needs to not obstruct whatever the student was doing when they leveled up, e.g. mid-lesson).
3. **Multi-level-crossing treatment** (§3.3) — confirm the "collapse into one sequence" approach is acceptable, versus wanting each level explicitly acknowledged in sequence for a large grant.
4. **Fallback toast content/style** when the stats bar isn't visible (§6.1) — needs actual design, not just "a toast."
5. **Reduced-motion fallback style** (§6.5) — confirm the simplified fade/count-up treatment is sufficient, or whether accessibility requirements call for something more specific.

---

## PART 9 — Confirmed Reward Sources in the Codebase (from diagnostic trace)

A recent diagnostic trace of the actual codebase confirms exactly where reward-granting already happens today. Each of these is a required RewardRun integration point — the trigger call (`triggerRewardAnimation`, Part 4.1) needs to be wired in at each location, once the prerequisite fixes in Part 11 land.

1. **Lesson completion** — `course.service.ts:135`, awards XP (`:280`) and the currency being consolidated to Coins (`:281`, formerly written as `gems`; response field `gemsEarned` at `:407` should become `coinsEarned` once Part 11's field consolidation ships). Origin element: wherever the lesson-completion screen surfaces the reward — this should be a visible, animated moment, not a silent context patch (which is what it currently is, per Part 11.2).
2. **Today's Missions claim** — `TodaysMissionsCard.tsx:240`, calls `refresh()` at `:296`. Backend: `missions.service.ts:438` (XP), `:443` (Coins). Already scoped by the Today's Mission spec's claim flow — RewardRun's origin element is the mission card's Claim button.
3. **Mystery Chest open** — `MysteryChestCard.tsx:74`, `refresh()` at `:104`. Backend: `chest.service.ts:148` (Coins/Hearts), `:160` (Streak Freeze / XP Boost → `UserInventory`). Already scoped by the Mystery Chest spec — origin element is the chest itself.
4. **Weekly Lucky Spin** — `spin.service.ts:49` (Coins/XP/Hearts/Streak Freeze). **Currently broken**: the frontend never calls `refresh()` after a spin (`WeeklyLuckySpinCard.tsx:17`, `:158`) — flagged again in Part 11.2, since RewardRun's fly-to-balance animation is meaningless if the counter it's flying toward never actually updates afterward.
5. **Quest claiming** — `gamification.service.ts:191`. **Not previously spec'd in this series at all** — Quests is its own home-screen nav item, structurally parallel to Today's Missions but distinct. Needs its own claim-flow spec (mirroring the Today's Mission pattern) before RewardRun can be wired into it — see Part 10.
6. **STREAK_ACTIVE mission** — `missions.service.ts:68`, rewards Coins by default when a streak is active. This is really just a specific instance of #2 (a normal mission reward), not a separate reward path — worth naming explicitly since it's the actual mechanism tying missions to streaks.
7. **Section reward chest in the lesson sidebar** — `page.tsx:151`. The "Claim Reward" button currently only triggers a "coming soon" state, no real backend reward exists yet. This is an **unbuilt feature, not a bug** — flag as a future RewardRun integration point once it's actually built (likely a smaller, per-section variant of the Mystery Chest pattern).
8. **"All missions claimed" bonus** — `missions.service.ts:460` returns an `allMissionsClaimed` flag; `TodaysMissionsCard.tsx:287` shows celebration UI only; **no bonus reward is actually granted server-side**. This confirms the open decision already flagged in the Today's Mission spec (§13.5 there) — it now moves from "open decision" to "confirmed gap," and whatever bonus gets decided on needs to feed into RewardRun the same as any other grant.

## PART 10 — Additional Reward Sources Not Yet Covered by the Trace (or Not Yet Built)

The trace only covers what currently exists in the codebase. A few reward-granting surfaces are either planned, partially visible in the UI already, or standard for this genre of app, and should be scoped for RewardRun now rather than discovered piecemeal later:

- **Onboarding "Daily Reward" login-streak calendar** (Day 1–7, distinct from the daily Mystery Chest) — visible on the fresh/onboarding home screen state ("Claim Day 1 Reward"), presumably granting escalating rewards across consecutive days. **Not mentioned anywhere in the trace**, which likely means it isn't wired to the backend gamification system at all yet. Needs its own functional audit before RewardRun integration is even meaningful here.
- **Achievements / Badges** — the home screen's "Next Achievement" widget (e.g. "Wildfire — 2/3 Days") shows progress toward a badge. Not mentioned in the trace at all — needs confirmation of whether completing one currently grants any reward server-side, or is purely a cosmetic unlock (in which case RewardRun might only need a badge-unlock animation, not a currency-flight one).
- **Invite-Friends / referral rewards** — part of Teyro's broader gamification plans; not mentioned in the trace, needs its own audit of what it actually grants (if anything, currently) before RewardRun can hook into it.
- **Level-up bonus** — this spec's Part 3 already covers the level-up *animation*, but doesn't assume any bonus currency is granted alongside it. Confirm whether leveling up should grant something (e.g. a coin bonus) on top of the celebration — if so, that's another trigger point.
- **Weekly/period leaderboard prizes** — common in this genre (top N on the weekly leaderboard earns a bonus); not built, not mentioned in the trace, but worth flagging now since the Leaderboard feature already exists in the app and this is a natural extension of it.
- **Streak milestone bonuses** (e.g. a bigger reward at 7/30/100-day marks, beyond the per-day streak-active mission reward) — not mentioned in the trace, a common retention lever worth considering as a future source.

## PART 11 — Blocking Prerequisites: Foundational Fixes Required Before RewardRun Can Work Reliably

**Read this section before writing any animation code.** RewardRun is a presentation layer over confirmed, accurate reward state (§4.4) — it cannot be trustworthy if the state underneath it is stale, double-counted, or inconsistent, which is exactly what the diagnostic trace found. Building polished flying-coin animations on top of this today would just make the existing bugs more visible, not fix them. These should land before, or at minimum alongside, RewardRun's integration work — not after.

1. **Consolidate Coins/Gems into one field.** The product-level decision is already made — Teyro has one currency, Coins. The backend still has both `coins` and `gems` fields (`schema.prisma:442`), with different reward paths writing to different ones inconsistently (lesson completion → `gems`, missions → `coins`, chest → either, spin → `coins`). This needs an actual migration: pick `coins` as the single field, merge any existing `gems` balances into it, update every reward-granting service (`course.service.ts`, `missions.service.ts`, `chest.service.ts`, `spin.service.ts`) to write to it consistently, and remove the `gems` field and any `gemsEarned`-style response fields once nothing references them anymore. RewardRun cannot correctly animate "coins earned" while half the backend is still incrementing a field the frontend doesn't even display.

2. **Every reward grant must refresh the shared gamification state — every time, not sometimes.** The trace found lesson completion patches only XP/streak into `GamificationContext` (coin/heart changes stay invisible until an unrelated refresh happens to occur), and weekly spin never calls `refresh()` at all. RewardRun's core promise — a coin visibly flies, the stat bar count goes up — is impossible to guarantee if the context backing that stat bar doesn't reliably reflect what the backend just did. Fix: every reward-granting action (lesson complete, mission claim, chest open, spin, quest claim, and anything added later) must, on success, either return authoritative updated totals directly in its response and apply them to shared state immediately, or trigger a guaranteed refresh — pick one approach and apply it consistently across all of them, not a mix.

3. **Stop double-updating mission progress.** Lesson completion advances missions directly (`course.service.ts:358`) *and* again via the `lesson.completed` event listener (`gamification.listener.ts:28`), and the listener doesn't check whether the completion was actually first-time — so re-completing an already-finished lesson can still advance missions, and the direct path's `xpEarned || 20` fallback can still add XP on a repeat completion with 0 actual XP earned. This is a correctness bug independent of RewardRun, but it directly undermines it: an animation faithfully celebrating a wrong, inflated number is worse than no animation, because it makes the wrong number look intentional. Fix: pick one place mission progress gets updated (recommend the event listener, consistent with the pattern already established across this whole spec series — see the Today's Mission spec's Part 6), remove the direct update from `course.service.ts`, and add an explicit first-completion check before advancing anything.

4. **Give Streak Freeze / XP Boost a real display surface.** These are already correctly scoped to `UserInventory` in the Mystery Chest and Weekly Spin specs — the actual codebase writes them there too, but the stat bar has no path to display them at all. This isn't strictly a RewardRun bug (RewardRun would correctly animate a Streak Freeze icon flying toward... nothing, since there's no stat-bar slot for inventory items today) — it's a UI gap that needs a small dedicated fix before these two reward types can be meaningfully animated landing anywhere.

5. **Frontend and backend must calculate level the same way.** Backend uses an exponential XP curve (`gamification.service.ts:473`); frontend independently recalculates level as a flat `Math.floor(xp / 100) + 1` in two separate places (`GamificationContext.tsx:294`, `dashboard/layout.tsx:70`). RewardRun's level-up sequence (§3) triggers off "did this grant cross a level threshold" — if the frontend's notion of that threshold doesn't match the backend's, the level-up animation fires at the wrong moment (too early, too late, or not at all relative to what the backend actually considers a level-up). Fix: frontend must consume the backend-computed level directly from the API response as the single source of truth, and stop recalculating it locally in either location.

6. **Wire the Learning Stats widget to the real stats API.** Per the trace, `LearningStatsCard.tsx` currently hardcodes Lessons: 12, Hours: 5.8, Rank: Top 14%, and never calls `/api/stats/summary` — meaning the Learning Stats spec already written in this series describes intended behavior the current implementation doesn't match yet. Not a RewardRun blocker directly (this widget doesn't grant rewards), but the same class of "spec exists, code doesn't match it yet" issue as everything else here, worth fixing in the same pass.

7. **Fix streak timezone handling.** Lesson completion receives `timezoneOffsetMinutes` but the actual day-boundary comparison uses UTC helpers and ignores that offset (`course.service.ts:226`) — meaning streaks can increment or reset incorrectly around local midnight. Every spec in this series (Today's Mission, Mystery Chest, Weekly Spin, Learning Stats) explicitly requires user-local-timezone day/week boundaries as a hard rule precisely to prevent failure modes like this — this is the concrete bug that requirement exists to catch, and it needs fixing at the actual streak-comparison logic, not just newly-built features.

## PART 12 — How This Changes the Other Feature Specs

This document supersedes the individual "fly to balance" animation descriptions already written into the Today's Mission, Mystery Chest, and Weekly Lucky Spin specs — those should be read as "this feature calls the shared `RewardAnimationController` (this doc) with its own origin element and confirmed reward payload," not as three separate animation implementations. Recommend a short pass updating each of those specs' animation sections to reference this document directly rather than restating the mechanics, so there's one source of truth for how a reward actually flies, and each feature spec only needs to define *what* gets granted and *where on that feature's UI* the animation originates from.

---

## PART 13 — RewardRun Engineering Tickets (Prerequisites + Integration)

**Prerequisite tickets (blocking — land before or alongside the animation work):**

**TEYRO-REWARDRUN-0A: Consolidate Coins/Gems into a single field**
Migrate `gems` data into `coins`, update `course.service.ts`, `missions.service.ts`, `chest.service.ts`, `spin.service.ts` to write consistently to `coins`, remove the `gems` field and `gemsEarned`-style response fields once nothing references them. (§11.1)

**TEYRO-REWARDRUN-0B: Guarantee consistent state refresh on every reward grant**
Every reward-granting endpoint either returns authoritative totals applied immediately to shared context, or triggers a guaranteed refresh — applied consistently across lesson completion, missions, chest, spin, and quests (once quests exist as a spec'd flow). Fixes the weekly-spin-never-refreshes and lesson-completion-only-patches-XP/streak bugs specifically. (§11.2)

**TEYRO-REWARDRUN-0C: Fix mission double-update**
Single source of truth for mission progress advancement (recommend the event-listener path), explicit first-completion check before advancing anything, remove the direct update in `course.service.ts`. (§11.3)

**TEYRO-REWARDRUN-0D: Unify frontend/backend level calculation**
Frontend consumes the backend-computed level directly from the API response in both `GamificationContext.tsx` and `dashboard/layout.tsx`; remove the local `Math.floor(xp / 100) + 1` recalculation entirely. (§11.5)

**TEYRO-REWARDRUN-0E: Fix streak timezone handling**
Correct the day-boundary comparison in `course.service.ts` to actually use `timezoneOffsetMinutes` instead of raw UTC helpers. (§11.7)

**TEYRO-REWARDRUN-0F: Give Streak Freeze / XP Boost a real display surface**
Small UI addition so `UserInventory` items have somewhere to visually land — needed before these two reward types can be included in RewardRun's animated grants. (§11.4)

**TEYRO-REWARDRUN-0G: Wire Learning Stats widget to the real stats API**
Replace the hardcoded values in `LearningStatsCard.tsx` with real calls to `/api/stats/summary`, matching the already-written Learning Stats spec. (§11.6 — not a RewardRun blocker, bundled here since it's the same class of fix)

**Core system tickets:**

**TEYRO-REWARDRUN-1: Build the shared `RewardAnimationController`**
Per Parts 1–5 of this spec — the reusable component every reward source calls into.

**TEYRO-REWARDRUN-2: Integrate RewardRun into the five confirmed existing reward sources**
Lesson completion, Today's Missions claim, Mystery Chest open, Weekly Spin, Quest claim — each just needs its origin element wired to `triggerRewardAnimation()` once 0A/0B are fixed. (§9)

**TEYRO-REWARDRUN-3: Implement the missing "all missions claimed" bonus**
Backend grant + RewardRun hookup — currently celebration-only per the trace. (§9.8)

**TEYRO-REWARDRUN-4: Audit and scope the uncovered reward sources**
Onboarding Daily Reward calendar, Achievements/badges, Invite-Friends — confirm what each currently grants (if anything) before scoping their RewardRun integration. (§10)

**TEYRO-REWARDRUN-5: Build the section-reward chest backend**
Currently a "coming soon" stub in the lesson sidebar — build the real grant once prioritized, then integrate with RewardRun. (§9.7)

**TEYRO-REWARDRUN-6: Quests claim-flow spec**
Quests is a confirmed reward source with no existing spec in this series — needs its own document mirroring the Today's Mission structure before its RewardRun integration can be scoped precisely. (§9.5, §10)
