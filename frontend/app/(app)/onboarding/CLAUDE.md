# Teyro Onboarding — Implementation Rules

Scope: `frontend/app/(app)/onboarding/`, `frontend/components/onboarding/`,
`frontend/lib/onboarding/`. Rewritten 2026-09-23 for onboarding v2.

---

## The shape of it

```
marketing site → /start (install gateway) → installed PWA
              → /launch (manifest start_url) → /onboarding/0 → steps 1–14
              → /onboarding/complete
```

**The flow is data, not code.** `lib/onboarding/steps.ts` holds
`STEP_DEFINITIONS`; the shell renders whatever is in it. There is no switch
statement. Reordering, renaming or adding a step is an edit to that array plus
a dialogue rule — not a component rewrite.

| # | Step id | What it asks |
|---|---|---|
| 1 | `welcome` | Tey introduces himself |
| 2 | `name` | Preferred display name |
| 3 | `category` | **Coding or AI** — the primary branch |
| 4 | `goals` | Motivation (multi) |
| 5 | `interests` | Branch-specific: coding areas *or* AI interests (multi) |
| 6 | `experience` | Level, with per-category descriptions |
| 7 | `prior-attempt` | Tried before? *(optional)* |
| 8 | `barriers` | What gets in the way? *(optional, multi)* |
| 9 | `commitment` | Minutes per day |
| 10 | `preferred-time` | When to learn |
| 11 | `path-reveal` | The personalized narrative |
| 12 | `review` | Edit anything |
| 13 | `account` | Sign-up |
| 14 | `reminders` | Notification permission |
| — | completion | `/onboarding/complete`, unnumbered |

**The pre-signup shape-matching challenge was removed** (it used to sit
between `preferred-time` and `path-reveal`, granting a one-time 25 XP + 25
coin reward via an anonymous claim token). It added a step without adding
personalization, and the drop-off audit found it wasn't worth the friction.
The backend's claim-token/reward plumbing (`UserOnboardingService`,
`OnboardingChallengeClaim`) is untouched and dormant — nothing currently
calls it — in case a gamified moment returns here later.

`TOTAL_STEPS` is derived from `STEP_DEFINITIONS.length` (currently 14), never
hardcoded — `lib/pwa/entry.ts`'s resume logic and every progress calculation
read it, so removing or adding a step needs no numeric find-and-replace.
Every learner walks every step; branching changes a step's *content*, never
the flow length, so the `N/14` ratio is always honest.

The completion screen is deliberately not a numbered step: the final step's
`advance` call marks the flow complete *before* routing there, so the bar was
already accurate when the learner last saw it — showing progress again on a
screen with no more steps to take would be a small dishonesty.

---

## Launch scope is two categories

Coding and AI. Both, and their interests, live in
`lib/onboarding/catalog.ts` — **the only place** a category or interest string
may be written. A third category later is one entry there plus a member of
`LearningCategory`.

The category screen carries a scope line ("These are the two tracks Teyro is
built around right now"). Do not remove it: two bare cards read as "the first
two of many", which is exactly the impression onboarding must not give.

`courseCategories` maps a track onto the free-text `Course.category` values
that actually exist. **There is no Category model.** A track with no live
courses is a normal state — the completion screen says so and routes to
explore rather than inventing a course.

---

## Tey is not decoration

Every step resolves three beats through `lib/onboarding/dialogue/`:

- **`ack`** — reacts to the answer given on the *previous* step. This is what
  makes it a conversation instead of a form.
- **`prompt`** — the question, worded from what Tey already knows.
- **`react`** — fires the instant an option is tapped.

Rules live in `dialogue/rules.ts`, sorted by `priority` (higher = more
specific). **No component may contain a category, level or goal conditional** —
if you find yourself writing one, it belongs in a rule.

Four guards are enforced by `__tests__/dialogue.test.ts` and will fail CI:

1. Every used (slot, step) pair needs a **priority-0 catch-all**, so a beat can
   never resolve to nothing.
2. Rules on `barriers` or `prior-attempt` must use a pose from
   `SUPPORTIVE_POSES`. Someone admitting they struggle gets warmth, never a
   smirk.
3. Any rule using `{name}` must supply `linesWithoutName` — the name budget
   suppresses `{name}` when it was used within the last two beats, and needs
   somewhere to fall back to.
4. No line may promise mastery in a timeframe or claim Teyro eliminates a
   barrier. We help with things; we don't cure them.

Everything is deterministic and synchronous. **No LLM call, no network
request** — combining a handful of known answers does not justify an AI round
trip, and onboarding must not depend on a provider being up.

---

## Branching and invalidation

`saveAnswer` in `useOnboardingSession` runs `invalidateDownstream` then
`pruneInvalidInterests` on every write. That is why switching Coding → AI
cannot leave `web-development` attached to an AI learner — including when the
edit comes from the review screen's Edit action rather than by walking back.

`exploring` ("I'm still figuring it out") is mutually exclusive with specific
interests in both directions. Same rule for `none` among barriers.

---

## Storage

- Learner state: `localStorage['teyro_onboarding']`, schema v2, typed answers
  keyed by NAME (`answers.category`), not by step number.
- **The creator flow used to share this exact key** with an incompatible
  schema, and its 7-day expiry could wipe a learner mid-onboarding. It now
  writes `teyro_creator_onboarding`. Do not point anything else at
  `teyro_onboarding`.
- v1 answers are **discarded**, not mapped — see `migrate.ts` for why guessing
  would be worse than re-asking.

Every authenticated request goes through the same-origin `/api/*` proxy. The
auth cookie is `sameSite: 'lax'`, so a direct fetch to `NEXT_PUBLIC_API_URL`
silently 401s. The shell used to have its own copy of the sync that did
exactly that, which is why progress never reached the DB; it now imports
`syncToBackend` from `useOnboardingSession`.

Server side, `onboardingComplete` from the client is a **claim, not a fact**:
`upsertSession` only honours it when the answers satisfy every required
question.

---

## Where answers actually land

Three things graduate out of the answers blob into real profile fields, via
`applyLearningPreferences`:

| Answer | Column |
|---|---|
| `dailyCommitment` | `StudentProfile.dailyGoalXp` (20/50/100/200) |
| `category` / `interests` | `StudentProfile.learningTrack` / `learningInterests` |
| `preferredTime` | `TeyNotificationPrefs.preferredHour` |

The minutes→XP map is pinned on **both** sides
(`lib/onboarding/commitment.ts` and `backend/.../onboarding-answers.ts`) with a
test on each. A fifth minute bucket is not a free choice: `PATCH /profile/me`
validates `@IsIn([20, 50, 100, 200])`.

Barriers and prior attempts stay in the blob on purpose. They personalize
dialogue; they are not profile settings, and self-reported difficulty should
not be copied across extra tables **or sent to analytics** —
`toAnalyticsProperties` enforces that by construction.

---

## Notification permission stays on the final step

Chosen deliberately:

1. **Hard constraint:** it must come after sign-up (step 14). The push
   subscription registers against an authenticated user at
   `POST /api/tey/push/subscriptions`. Asking earlier wins the browser
   permission with nowhere to attach the subscription.
2. By then the learner has set a pace, done a real exercise, and seen their
   personalized path, so the ask has a reason attached — and the copy says so,
   drawing on their barrier and preferred-time answers.

Rules for anyone touching it:

- **Request only inside a user gesture.** Safari scores a programmatic request
  as a denial the learner can only undo in system settings.
- **Permission granted ≠ subscription registered.** Separate states, both
  tracked. A failed subscription heals via `TeyPushProvider.syncExisting`.
- **Never block on a denial.** Declining is a valid answer — neutral copy,
  neutral sound, straight on to the celebration. Never re-prompt.

---

## Sound

`lib/audio/onboardingAudio.ts`. Every cue is synthesised from oscillators on
the shared `SynthBus`, like every other sound in the app. **There are no audio
files in this repo** — do not add one for a UI cue.

- Reaction stings are chosen by the dialogue beat's **pose family**, not
  hand-wired per call site, so line, pose and sound cannot drift apart.
- Feedback fires **after** the state change, and inside a `try`. A throwing
  AudioContext must never be able to swallow a selection — there is a test.
- The toggle in the top bar affects **sound only**. Animations, navigation and
  dialogue are separate concerns.
- `prefers-reduced-motion` is independent of the sound preference.

---

## Accessibility (non-negotiable)

- Tey's beats sit in an `aria-live` region with the full text present from the
  first frame. A reaction must reach someone who cannot see a pose change.
- Selection is signalled three ways: check icon, border, and `aria-checked`.
  **Never colour alone.**
- The progress bar is a real `role="progressbar"` with aria values.
- A disabled Continue explains *why* via `aria-describedby`.
- Option cards are real buttons inside a `fieldset`/`legend`. Note that
  `<fieldset>` already carries an implicit `group` role — adding another one
  makes screen readers announce the question twice.
- Every review-screen Edit button has a distinct accessible name.

---

## Visual layout (Duolingo pattern, 2026-09-24)

- **One responsive tree.** `OnboardingLayout` used to mount a mobile and a
  desktop copy of every screen and hide one with CSS (duplicate ids, two
  aria-live regions, two inputs fighting over autofocus). Never reintroduce a
  second tree.
- **`row` layout (default):** Tey beside a `TeyBubble` holding the question,
  answers directly underneath. Stacking a big Tey above the question pushed
  long lists below the fold on phones. **`hero`** (`layout: 'hero'` in
  `steps.ts`): big centred Tey with the bubble above — for steps with nothing
  to answer (welcome).
- **The question never leaves the bubble.** Tey's reaction to a tap goes in
  the footer next to Continue (tinted bar), not in place of the question.
- **Mascot art lives in `public/User onbarding Assets/tey/`** — tight-cropped
  and edge-feathered copies. The source files carry up to 70% empty canvas,
  which is why Tey looked tiny and changed size between steps. Add new poses
  there cropped the same way; never point a step at an uncropped original.
- Long lists (> 5 options, review, path-reveal) get the `md` Tey so the
  answers still fit on a phone. Lists of 5+ short labels go two-up on desktop.
- The shell focuses the new step with `preventScroll: true` — without it the
  browser scrolled Tey and the question off the top of long steps.
- Copy rules (plain words, no idioms, question in the big line) are at the
  top of `lib/onboarding/dialogue/rules.ts`.

## Mobile layout contract

- Strict `100dvh` on mobile, no page scroll. Only the content region scrolls.
- `env(safe-area-inset-*)` top and bottom.
- The name input scrolls itself into view on focus so the keyboard cannot
  cover the CTA.
- Long option labels wrap; several run to two lines at 360px.

---

## Testing

- `lib/onboarding/__tests__/` — engine, dialogue (including the guard suite),
  analytics. Node env, no DOM.
- `components/onboarding/__tests__/` — jsdom + React Testing Library.
- `jest.config.ts` runs both as separate projects. The node `testMatch` is
  deliberately broad (`**/*.test.ts`): a narrower glob silently dropped an
  existing suite when the projects were first split.
