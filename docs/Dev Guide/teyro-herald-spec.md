# Herald — Teyro's Global "Reward Ready" Alert System
**Status:** Ready for engineering handoff — foundational/shared system
**Owner:** Joel Ndakwe
**Feature:** Cross-cutting — surfaces claimable rewards (missions, chests, spins, level-ups) wherever the student currently is in the app, so they never have to navigate to the home screen just to find out something's ready

---

## PART 0 — How This Feature Actually Works (read this first)

### The problem this solves

Right now, everything gamified about Teyro — Today's Mission, Mystery Chest, Weekly Spin — only shows its state on the home screen. If a student finishes a lesson while genuinely deep in the app (mid-course, browsing the catalog, on their profile) and that action happens to complete a mission or unlock the daily chest, **nothing tells them.** They'd have to think to go back to the home screen and check. That's the opposite of how this is supposed to work — a real game never makes you back out to a menu to discover you leveled up or finished a quest, it interrupts you, briefly and pleasantly, right where you are.

### The journey

**1. Student is mid-lesson, not anywhere near the home screen.**
They finish the lesson. Behind the scenes, that completion happens to push "Earn 20 XP" mission over its target, and/or unlocks today's Mystery Chest.

**2. A small banner slides in — right there, over whatever screen they're on.**
Not a full-screen interruption, not a redirect. A compact, dismissible alert ("Mission Complete: +20 XP" / "Mystery Chest is ready!") appears near the top of the screen, on top of the lesson results screen, the course view, wherever they are.

**3a. If it's a simple reward (a mission), tapping the banner claims it right there.**
One tap, RewardRun's flying-coin/XP animation plays right on the current screen, landing in the stats bar the student can already see in the header (which persists across the app), and the banner dismisses. The student never left the screen they were on.

**3b. If it's a bigger reward (Mystery Chest, Weekly Spin), tapping the banner launches that feature's own full reveal experience as an overlay on top of the current screen** — the same chest-crack-open sequence or full-screen wheel spin already spec'd elsewhere, just triggered from wherever the student happens to be instead of only from the home screen. When it's done, it closes back to exactly where they were — course view still showing the same course, lesson player still paused on the same spot, nothing reset or lost.

**4. If the student ignores the banner, it quietly dismisses after a few seconds.**
Nothing is lost — the reward is still sitting there, claimable next time they do visit the home screen or that feature's native widget. Herald is a heads-up, not a nag; it doesn't re-show itself repeatedly for the same still-unclaimed reward every time the student changes screens.

---

## PART 1 — Two Claim Patterns

### 1.1 Inline quick-claim (simple, single-action rewards)
Applies to: Today's Mission, and (once spec'd) Quests — anything whose claim is a single API call with no dedicated reveal choreography of its own.

- Banner shows the reward summary and a compact "Claim" button, right in the banner.
- Tap → claim request fires → on success, RewardRun's flight animation plays (§4) → banner dismisses.
- No navigation, no overlay, no interruption to whatever the student is doing underneath — this is the lightest-weight path and should feel almost incidental.

### 1.2 Launch full reveal overlay (Mystery Chest, Weekly Spin, section-completion chest)
These features already have their own full spec'd animation sequences (chest shake/crack/reveal, the full-screen wheel spin) that a small banner physically can't contain, and shouldn't try to compress.

- Banner shows a lighter "ready!" nudge with a single affordance (e.g. "Open" / "Spin") rather than a claim button.
- Tapping it **launches that feature's existing reveal experience as a modal/overlay on top of the current screen** — reusing the Mystery Chest spec's open flow or the Weekly Lucky Spin spec's full-screen takeover exactly as already built, just triggered from a different entry point.
- On completion (or dismissal), the overlay closes and the student lands back exactly where they were — same scroll position, same lesson paused at the same point, same course view. This must never route through the home screen as an intermediate step.

---

## PART 2 — Detection: Reusing What's Already Being Built, Not a New Pipeline

Herald doesn't introduce a new way of knowing something became claimable — it listens to the exact same signals already spec'd for each feature:

| Source | Signal Herald listens for |
|---|---|
| Today's Mission | `missionsUpdated` field on the lesson-complete response (Today's Mission spec §1.1), any entry transitioning to `COMPLETED` |
| Mystery Chest | `chestStatus` field on the lesson-complete response (Mystery Chest spec §1.1), transitioning to `READY_TO_OPEN` |
| Section-completion chest | `pathUpdate.sectionChestStatus` on the lesson-complete response (Lesson Path Unlock spec §3.1) |
| Weekly Lucky Spin | Availability is time-based, not event-triggered — detected via the same Supabase Realtime subscription / refetch-on-focus pattern already spec'd, checked once per app session load and on the weekly boundary rather than piggybacked on an action |
| Level-up | Already handled live, wherever the XP-granting action occurred, by RewardRun's own level-up sequence (RewardRun spec Part 3) — Herald doesn't need to separately re-announce this, it already happens in-context by construction |

Herald is a **thin coordination layer** over signals every other spec already produces — it should not require any feature to build a second, parallel notification mechanism.

### 2.1 Suppression: don't announce what's already visible
Before surfacing a banner, Herald checks whether the native widget for that reward (the mission card, the chest widget, the spin widget) is **currently mounted and visible** in the active view — via the same kind of lightweight registry pattern RewardRun uses for its stats-bar destinations. If the widget is visible (e.g., the student is on the home screen watching the mission card tick over live), Herald stays silent — the widget's own UI is already doing this job, a duplicate banner would just be noise.

### 2.2 Once per transition, not once per screen change
A given claimable-state transition (e.g., "chest became ready") triggers Herald **once**. If the student dismisses it or ignores it, navigating to a different screen afterward doesn't re-trigger it — Herald tracks which transitions it's already surfaced this session (a simple in-memory set, cleared on full app reload) so it never nags.

---

## PART 3 — Architecture

### 3.1 A single global overlay, mounted once
Same pattern as RewardRun's animation layer: one `HeraldOverlay` component mounted at the app root (alongside the existing `GamificationContext` provider, per the layout structure already in place), rendering above all other UI via a fixed-position portal. Every feature's "this became claimable" signal flows into one shared queue this component reads from — not separate per-feature notification components scattered around the app.

### 3.2 Queueing
If more than one thing becomes claimable close together (e.g., a lesson completion happens to both finish a mission and unlock the chest in the same response), banners queue and show one at a time, briefly staggered — never stacked on top of each other. Recommend a simple priority order when multiple are queued simultaneously (e.g., missions before chests before spin, or smallest/quickest interaction first) — flagged as an open decision (§8.3), not a hard technical constraint either way.

### 3.3 Positioning
Docked near the top of the screen, below the persistent stats-bar header (which — per the existing screenshots — already appears across course view, lesson map, and other non-home screens) so it doesn't compete visually with it, and positioned to avoid obscuring primary content or any active interaction (e.g., don't cover a video player's controls, don't sit on top of a lesson's answer-input area).

---

## PART 4 — Interaction with RewardRun

For inline quick-claims (§1.1), the reward flight (coin/XP icons flying to the stats-bar counters) plays exactly per the RewardRun spec, just with its origin set to the Herald banner itself rather than a home-screen widget — this requires no changes to RewardRun, only that Herald calls the same `triggerRewardAnimation()` function with the banner's on-screen position as the origin.

### 4.1 What if the stats bar isn't visible right now?
Most views keep the header/stats bar persistent (confirmed by the course-view and lesson-map screenshots already reviewed in this series), so this should be the rare case — but if the student is in a genuinely immersive, header-hidden view (e.g., a fullscreen video moment inside the lesson player), RewardRun's own existing fallback applies unchanged: the underlying value updates immediately and correctly regardless, and the flight animation is skipped rather than aimed at a nonexistent target (RewardRun spec §6.1) — Herald doesn't need to solve this separately, it inherits RewardRun's already-specified behavior.

---

## PART 5 — Returning the Student to Exactly Where They Were

This is the detail that makes §1.2's full-reveal overlays actually safe to use mid-lesson rather than disruptive.

- The overlay (chest open / wheel spin) must render as a true overlay on top of the current screen's existing component tree, not a route navigation that would unmount/reset whatever's underneath (e.g., a paused video's playback position, scroll position in a course catalog, an in-progress lesson's local state).
- On close, the overlay simply removes itself — the screen underneath was never actually left, so there's nothing to "return to" in a navigation sense, which is the whole point: it was always still there, just covered.
- This is a real technical constraint worth stating plainly to the dev: **build these as modal overlays independent of the router, not as full-screen routes**, specifically so they can be safely triggered from any screen in the app without disturbing that screen's state.

---

## PART 6 — Edge Cases & Error Handling

### 6.1 Multiple claimables ready at once
Covered by the queueing rule (§3.2) — verify the queue drains correctly and doesn't drop a later item if the student dismisses an earlier one quickly.

### 6.2 Immersive/header-hidden lesson moments
Per §4.1 — RewardRun's existing fallback covers the animation gracefully; separately, confirm Herald's banner itself has a sensible position/fallback in a header-hidden view (e.g., dock to a fixed screen position rather than "below the header" if there is no header currently rendered).

### 6.3 Realtime reconnect duplicating a notification
If the Weekly Spin availability check (§2, time-based) or a Realtime reconnect re-delivers a state that was already surfaced this session, the once-per-transition tracking (§2.2) must key off the actual state transition (e.g., a specific chest's `id` + its `READY_TO_OPEN` timestamp), not just "chest status is currently READY_TO_OPEN" — otherwise a reconnect could re-fire the same banner for a reward the student already saw announced (though hasn't necessarily claimed yet).

### 6.4 Student mid-critical-flow (e.g., answering a quiz question)
Herald should never block or steal input focus from an active task — it's a passive overlay banner the student can ignore entirely and keep working. Whether it should be deliberately suppressed/delayed during specific critical moments (e.g., not popping up mid-quiz-question) is a product call worth deciding explicitly (§8.4) rather than assuming either way.

### 6.5 Brand-new user during onboarding
A student in the very first onboarding flow (before they've really started using the app) shouldn't be interrupted by Herald banners for things like a chest becoming ready before they understand what a chest even is — recommend suppressing Herald entirely until onboarding is complete, flagged as a decision to confirm (§8.5).

### 6.6 App backgrounded / student not actively looking
If a claimable-state transition happens while the app is backgrounded (e.g., a push-driven weekly spin becoming available), Herald shouldn't try to "catch up" by firing a banner immediately on the very next foreground if that instant coincides with, say, the middle of a lesson video — apply the same non-intrusive, dismissible treatment regardless of timing, never a blocking interstitial.

### 6.7 Full-reveal overlay triggered, then the student navigates away mid-open
If a student somehow navigates elsewhere while a chest/spin overlay is open (e.g., an OS-level back gesture), the overlay should close safely without leaving the underlying claim in an inconsistent state — since the actual grant only happens on a confirmed server response (per every other spec in this series), there's no partial-claim state to worry about, but confirm the overlay itself doesn't error or leave stale UI behind.

---

## PART 7 — Test Coverage

### Unit
- Suppression logic (§2.1): banner correctly withheld when the native widget is genuinely mounted/visible; correctly shown when it isn't.
- Once-per-transition tracking (§2.2, §6.3): a given transition never fires Herald twice in the same session, keyed correctly by entity + transition timestamp, not just current status.
- Queue ordering (§3.2): multiple simultaneous claimables drain in the defined priority order without dropping any.

### Integration
- Lesson-complete response carrying both `missionsUpdated` (a completed mission) and `chestStatus` (chest now ready) in the same payload → Herald correctly queues both, in order, without either being lost.
- RewardRun hand-off from an inline quick-claim triggered via Herald produces the same visual/behavioral result as one triggered from the home-screen widget directly (this is the test that verifies "shared system," consistent with RewardRun's own §7 integration test).

### End-to-end
- Complete a lesson from inside the Lesson Player (not the home screen) that finishes a mission → banner appears over the lesson results screen → tap Claim → RewardRun flight plays targeting the visible header stats bar → banner dismisses → student remains on the lesson flow, no navigation occurred.
- Complete a lesson that unlocks the daily Mystery Chest, from inside a course view → banner nudge appears → tap Open → chest reveal overlay plays in full → closes back to the exact same course view, scroll position preserved.
- Dismiss a banner without claiming → reward remains claimable from its native home-screen widget afterward, no data lost.
- Navigate to a different screen after dismissing → banner does not reappear for that same transition (§2.2).
- Be on the home screen with the mission card visible when it completes → confirm no duplicate Herald banner appears alongside the card's own live update (§2.1).
- Simulate the reward becoming ready while the app is backgrounded → on foreground, banner appears per the standard non-intrusive treatment, not as a blocking interstitial (§6.6).

### Manual QA / feel
- Banner timing and position genuinely doesn't get in the way of actively reading a lesson or interacting with course content — check across a few different screen types (lesson player, course catalog, profile).
- The "return to exactly where you were" guarantee (Part 5) holds up specifically for a paused lesson video — confirm playback position and any in-progress lesson interaction state survive a full chest-open or wheel-spin overlay cycle.

---

## PART 8 — Engineering Tickets

**TEYRO-HERALD-1: Global `HeraldOverlay` + queue**
Root-mounted overlay component and the shared queue it reads from, per Part 3 — the coordination layer every reward source feeds into.

**TEYRO-HERALD-2: Detection wiring across existing signals**
Hook Herald's queue into `missionsUpdated`, `chestStatus`, and `pathUpdate.sectionChestStatus` (already being added to the lesson-complete response by their respective specs) plus the Weekly Spin availability check, per Part 2 — no new backend signals, just consuming what's already being built.

**TEYRO-HERALD-3: Suppression + once-per-transition tracking**
Widget-visibility registry (§2.1) and the session-scoped "already surfaced" tracking keyed by entity + transition (§2.2, §6.3).

**TEYRO-HERALD-4: Inline quick-claim banner**
UI + claim wiring for Today's Mission (and Quests, once spec'd) per §1.1, calling RewardRun's `triggerRewardAnimation()` with the banner as origin.

**TEYRO-HERALD-5: Full-reveal overlay launcher**
Router-independent modal launcher for Mystery Chest / Weekly Spin / section-completion chest per §1.2 and Part 5 — this is the ticket most worth extra care on, since "return to exactly where the student was" is the whole point and the easiest thing to get subtly wrong (e.g., a chest overlay that's technically a route change and resets lesson-player state underneath it).

**TEYRO-HERALD-6: Test suite**
Full matrix from Part 7, including the paused-lesson-video state-preservation check under Manual QA.

---

## PART 9 — Open Product Decisions (flag before/during build)

1. **Priority order when multiple claimables are ready simultaneously** (§3.2) — needs an actual defined order, not left implicit.
2. **Exact banner copy/design per reward type** — needs real design, this spec only defines the mechanics and interaction pattern.
3. Confirmed above as a decision point: **queue ordering rule** — restated here since it's the kind of thing worth deciding once product-side rather than defaulting silently in code.
4. **Should Herald suppress itself during specific critical in-app moments** (mid-quiz-question, mid-video) rather than the current "always show, never block" default? (§6.4)
5. **Suppress entirely during onboarding, confirmed?** (§6.5) — recommended default, needs explicit sign-off.
6. **Feature name** — using "Herald" as a working name throughout this doc; happy to rename if something else fits Teyro's voice better.
