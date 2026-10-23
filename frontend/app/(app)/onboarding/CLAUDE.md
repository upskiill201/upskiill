# Teyro Onboarding — Implementation Rules

Scope: `frontend/app/(app)/onboarding/`, `frontend/components/onboarding/`,
`frontend/lib/onboarding/`. Rewritten 2026-10-23 for **onboarding v3**
(founder, 2026-10-22: Duolingo's shape, a real lesson before signup, then the
Teyro Pro paywall). The v2 rules this replaces are in git history.

---

## The shape of it

Everything lives at **`/onboarding`**, one client component
(`components/onboarding/v3/OnboardingV3.tsx`) that moves between steps itself.
The old numbered routes (`/onboarding/0` … `/onboarding/14`,
`/onboarding/complete`) only render `ToOnboarding`, which redirects here, so
old links, `/start`, `/launch` and the backend's `redirectTo` keep working.

**The flow is data.** `lib/onboarding/v3/flow.ts` holds `STEPS` in order.
Reordering is an edit to that array. `STEP_INDEX` and `progressFor` derive
from it; nothing hardcodes a count.

Duolingo's order (founder, 2026-10-23: "follow Duolingo closely, make it ours, better").

| Step | What happens | Why it's there |
|---|---|---|
| `splash`, `welcome` | Tey with the skill art floating round him; Get started / I have an account | Duolingo's entry |
| `intro` | Tey says hi | The app talks to them |
| `learn` | **"I want to learn…"**: every catalog course grouped under topic headers, the cover as its "flag"; a tap answers and moves on | Duolingo's first question |
| `name` | What should I call you? | Used on every later screen |
| `source` | How did you hear about Teyro (brand tiles) | Attribution (+ playbook lift) |
| `goal` | "Why are you learning {topic}?" (8 goals, `lib/onboarding/goals.ts`) | Drives the paywall headline |
| `experience` | "How much {topic} do you know?" (seed / sprout / tree) | Picks which path card is recommended |
| `daily` | Casual / Regular / Serious / Intense with minutes, "Recommended" on 10 | Duolingo's daily goal |
| `outcome` | What the course really gives: lessons, chapters, practice, certificate | A promise made of facts |
| `projection` | "Chapter 1 done by {date}" from the REAL lesson count and minutes | A personal result before any ask |
| `reminder-time` | When should Tey remind you, with a live preview of the notification | Sets the reminder hour |
| `commit` | Hold-to-commit (1.5 s) on "my promise" | Commitment and consistency |
| `path` | **"New to {topic}?" / "Already know some {topic}?"** (Duolingo's path cards) | Beginner or placement |
| `lesson-intro` → `lesson` → `taste-done` | Tey introduces it, then the **3-minute taste** (below), then "Perfect start!" | The aha moment |
| `placement-intro` → `placement` | "Take a test to jump ahead!", then the course's real placement test | For people who know some |
| `chest` | Gift chest: tapped open (it takes a few taps by design); +20 Coins, +1 freeze, held until saved | Variable reward |
| `save` | What's waiting, then Google, or email → password → code, one field per screen | Loss aversion |
| `plan` | "Building {name}'s plan" naming their answers | Name the goal right before the paywall |
| `paywall` | `ProPaywall moment="ONBOARDING"` | Paywall moment 1 |
| `result` | Free: "Chapter {n} of {course} is yours, two lessons a day" | End on a high |
| `install` | `InstallStep`: Home Screen first, then reminders, then "Enter Teyro" | Duolingo order |
| `enter` | Marks the server session complete; opens lesson 1 at card 2 (taste) or the course home (placement) | |

**Every question must change a later screen** (the playbook's cutting rule).
A question that changes nothing gets cut, not kept "for data".

---

## The aha, before signup: a taste or a placement test

- `GET /onboarding-flow/catalog` lists published courses whose lesson 1 has
  exercises (an intro video with nothing to do is no aha moment), with
  `chapters` and `placement` (offers a placement test). Cached 5 min.
- `GET /onboarding-flow/courses/:id/first-lesson` returns **only** lesson
  index 0 of a catalog course; `GET …/placement` only the placement test of a
  catalog course that has one (`PLACEMENT_TRACKS`). Nothing else is public.
- **The taste** (founder, 2026-10-23: lesson 1 is ~12 min and opens on a long
  read, too much before signup): `LessonStep` trims lesson 1 to its first
  Learn card and first 3 questions and plays it in `LessonPlayer` with
  `simulate`, `autoStart` (no second start screen) and `onTasteDone` (stops
  after the questions, no outro). It saves the device's resume spot at card 2
  (`lib/lesson/resume`) so the real lesson picks up there after signup.
- **The placement test**: `PlacementStep` plays the real test in
  `TestOutPlayer` (`skipIntro`, `continueLabel`), graded on the device like
  the in-app test, and claims the chapter they placed into.
- Either way it posts `POST /onboarding-flow/lesson-claim` with `mode`
  (`TASTE` | `PLACEMENT`) and keeps the opaque token. The server stores only
  its SHA-256 (30-day TTL). **A taste or a test earns no XP**; only a whole
  lesson does (mode `LESSON`, older clients).
- At signup the answers carry `lesson.claimToken`;
  `UserOnboardingService.applyPreSignupAnswers` calls `settleLessonClaim`
  once per token, in one transaction: focus course + `freeCourseId`, the
  chest (idempotency key `onboarding_chest:{userId}`), then the
  `onboarding.lesson_settled` event. Its listener in `course/` enrols the
  learner, then: TASTE marks lesson 1 **started** (not complete, no streak:
  that comes when they finish it in the app); PLACEMENT records the result
  through `TestOutService.submit` (tested-out lessons, `placedAt`).
- The free tier's chapter follows placement: the first chapter they haven't
  tested out of (`LessonAccessService.scopeFrom`), so a learner placed into
  Chapter 3 gets Chapter 3 free, not Chapter 1.

  Settlement is best-effort and never blocks signup or the verification email.
- Learner answers are cleaned by `sanitizeLearnerAnswers` server-side. The
  signup DTO stays loose because the creator flow sends a different shape
  through the same field. **Do not tighten the DTO**: that broke creator
  signup once.

`app/(app)/onboarding/template.tsx` returns its children bare on
`/onboarding`. Its transformed motion wrapper turned the lesson player's
`position: fixed` screens into boxes inside a div (a blank lesson). Don't
wrap this route.

---

## Signup switches the client to the new account

The flow runs signed out until `save`, so the (app) providers cache 401s
(`/api/auth/me` and friends) in the shared SWR cache. On `onSaved`:

1. `clearClientSession()` drops everything cached for whoever was on this
   device before (an expired login's courses would otherwise paint).
2. `mutate(ME_KEY, me)` seeds the new user.

`StudentShell` only redirects to `/login` on a 401 from a **settled** fetch
(`!isValidating`), and SWR doesn't retry 401/403 (`lib/swr.ts`). Before
both fixes, a brand-new learner landed on the dashboard and was bounced to
`/login`.

---

## State, resume, quitting

- `localStorage['teyro_onboarding_v3']` (`lib/onboarding/v3/store.ts`): step,
  answers, anonymousId, pending rewards, lastSeen. Do not reuse
  `teyro_onboarding` (v2) or `teyro_creator_onboarding`.
- Closing the tab and coming back resumes on the exact step; after 5+ minutes
  away a resume card greets them by name.
- After the taste or the test and until signup (`losesProgress`: taste-done,
  chest, save), leaving loses
  something real (nothing is saved before signup), so Back opens `QuitSheet`
  with that truth and one optional "why" tap, and `beforeunload` warns.
  Exiting the lesson or the test also opens the sheet. **Before them there
  is no quit warning.** Never warn about a loss that isn't real.
- After signup the server session is synced (`PUT /api/user-onboarding`,
  `schemaVersion: 3`); `enter` sends `onboardingComplete: true`, which the
  server only honours when the answers satisfy the required questions.

---

## Analytics: who finishes, where they drop, why

`lib/onboarding/v3/track.ts` batches events to `POST /onboarding-flow/events`
(own DB, `OnboardingEvent`, read by Teyro HQ) and mirrors them to PostHog.
Types: VIEW, ANSWER, BACK, QUIT_PROMPT, QUIT_STAY, QUIT, RESUME,
LESSON_START, LESSON_EXIT, LESSON_DONE, SIGNUP_START, SIGNUP, PAYWALL,
INSTALL, PUSH, COMPLETE.

- Events carry the device's `anonymousId`. Signup links that device's events
  to the new user (`linkAnonymousEvents`), so the funnel stitches across it.
- `sendBeacon` on QUIT and on page hide, so a closing tab still reports.
- **Never send the learner's name or free text.** Answer values are option ids.

---

## Art and icons: ours, never stock (founder, 2026-10-23)

- Every answer, reward and moment uses **Teyro's own drawings**:
  `components/onboarding/v3/art/Art.tsx` (flat, chunky, a darker underside
  and a highlight, on a 64-unit grid). Colours come from `art.module.css`,
  derived from the brand tokens; no hex. Check new drawings on the
  `/dev/onboarding-art` bench, on white, before using them.
- Small UI icons (back, sound, check, chevron, mail, eye, lock, close) are
  `art/Glyph.tsx`, also ours. **No lucide icons in onboarding or the
  paywall.** (Brand logos on "How did you hear" use `react-icons/fa`, as the
  repo rule allows; iOS install guides keep the OS's own share icon.)
- Look and pieces: `ui/Kit.tsx` + `ui/v3.module.css` (top bar, Tey and his
  bubble, 3D answer rows and tiles, footer, hero moments). Screens are built
  from these, not from v2's `OnboardingLayout`.
- `.screen` clips sideways overflow (`overflow-x: clip`, not hidden, so the
  sticky footer still works): the chest's canvas is wider than a phone and
  used to widen the page, which also pushed taps off the buttons.
- The chest takes a few taps by design. The button forwards one tap per
  press through the chest's handle; import `TreasureChest` statically
  (`next/dynamic` drops refs). It opens on its own animation, with a fallback
  only after 6 taps.

## Tey is not decoration

- `lib/onboarding/v3/lines.ts`: `lineFor(step)` is the question in Tey's
  bubble, `reactionFor(step, value)` fires on every tap and shows in the
  footer next to Continue. The question never leaves the bubble.
- Lines use their name, goal and course. Durations come from the real lesson
  (`lessonMinutes`). Never a made-up number ("about two minutes" was wrong:
  lessons run 10–12).
- Every line has a pose; the pose family picks the reaction sound.
- Mascot art: `public/User onbarding Assets/tey/`, the cropped copies only.

---

## Sound and music

- **Cues:** `lib/audio/onboardingAudio.ts`, synthesised. **No audio files in
  this repo.** v3 cues: projection, commitTick/commitLocked, planTick/planReady,
  quitWarn, plus the reaction stings.
- **Typing:** Tey's bubble types itself out with keyboard clicks
  (`playTypingKey`), game-dialogue style: about every other letter, never on
  a space, varied in pitch so it sounds like a person. Screen readers get the
  whole line at once.
- **Music:** `lib/audio/onboardingMusic.ts`, an adaptive loop, also
  synthesised.
  - Moods by step (`moodFor`): intro, build, reward, tension.
  - Layers rise with progress (goal gradient). It ducks under celebrations.
  - It stops for the lesson, which brings its own music.
  - It starts only after the first tap (autoplay rules) and follows the
    shared mute toggle.
- Feedback fires after the state change, inside a `try`. A throwing
  AudioContext must never swallow a selection.

---

## Honesty rules (the founder's, enforced in review)

- No fake popularity ("most popular", "most people stick"): "Recommended" only.
- No fake proof or counts; projections and durations come from real data.
- Savings on the paywall are computed from live prices (floor), never typed.
- No line may promise mastery in a timeframe.

---

## Accessibility and layout

- Strict `100dvh` on phones, safe-area insets, only the content region scrolls.
- Selection is shown three ways (check, border, `aria-checked`), never by
  colour alone; option cards are real buttons/radios.
- Tey's lines sit in an `aria-live` region with the full text from the first
  frame.
- Every animation respects `prefers-reduced-motion`; sound is a separate
  preference.
- Notification permission is requested only inside a user gesture, only after
  signup (the push subscription needs an account), and a denial never blocks.

---

## Still in the tree from v2

`OnboardingShell`, `lib/onboarding/steps.ts`, the dialogue engine and
`components/onboarding/screens/` (including `RemindersScreen`, whose logic
`InstallStep` carries over) no longer render for learners. v3 builds only on
`components/onboarding/v3/`. Don't build new learner screens on the v2 shell.

## Testing

- `lib/onboarding/__tests__/` and `components/onboarding/__tests__/`
  (`npx jest lib/onboarding components/onboarding`).
- Backend: `src/onboarding-flow/*.spec.ts`, `src/user-onboarding/*.spec.ts`.
- In the browser: run the whole flow signed out on a 375×812 viewport with a
  throwaway `@example.com` signup, then check the DB for the enrolment,
  lesson 1, the chest and the linked events.
