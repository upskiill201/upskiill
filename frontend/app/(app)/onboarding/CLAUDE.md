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

| Step | What happens | Why it's there |
|---|---|---|
| `splash`, `welcome` | Tey + Get started / I have an account | Duolingo's entry |
| `intro` | Tey says hi | The app talks to them |
| `name` | What should I call you? | Used on every later screen |
| `goal` | The outcome (`lib/onboarding/goals.ts`, 8 goals) | Drives the paywall headline |
| `category` | Categories that have onboarding-ready courses; only the single best match for the goal gets "Best for your goal" | |
| `course` | Real course cards from the catalog | Choosing it makes it theirs |
| `experience`, `situation` | Level and life situation | Tey's tone, reactions |
| `source` | How did you hear about us | Attribution (+ playbook lift) |
| `daily` | 5 / 10 / 20 / 30 min, "Recommended" on 10 | Duolingo's daily goal |
| `projection` | "Chapter 1 done by {date}" from the course's REAL lesson count and minutes | A personal result before any ask |
| `reminder-time` | When should Tey nudge you | Sets the reminder hour |
| `commit` | Hold-to-commit (1.5 s) | Commitment and consistency |
| `lesson-intro` | Lesson 1 title, its real minutes and exercise count | |
| `lesson` | **The chosen course's real lesson 1** in `LessonPlayer` | The aha moment |
| `chest` | Gift chest: +20 Coins, +1 streak freeze, held until saved | Variable reward |
| `save` | Signup (Google, or email + 6-digit code) | Loss aversion: their lesson is waiting |
| `plan` | "Building {name}'s plan" checklist naming their answers | Name the goal right before the paywall |
| `paywall` | `ProPaywall moment="ONBOARDING"` | Paywall moment 1 |
| `result` | Free: "Chapter 1 of {course} is yours, two lessons a day" | End on a high |
| `install` | `RemindersScreen`: install first, then push (Duolingo order) | |
| `enter` | Marks the server session complete, routes to the course home | |

**Every question must change a later screen** (the playbook's cutting rule).
A question that changes nothing gets cut, not kept "for data".

---

## The real lesson, before signup

- `GET /onboarding-flow/catalog` lists published courses whose lesson 1 has
  exercises (an intro video with nothing to do is no aha moment). Cached 5 min.
- `GET /onboarding-flow/courses/:id/first-lesson` returns **only** lesson
  index 0 of a catalog course. Nothing else becomes public.
- `LessonStep` plays it in `LessonPlayer` with `simulate` and
  `pathOverride={null}`: graded on the device, nothing saved, hearts free.
- On finish it posts `POST /onboarding-flow/lesson-claim` and keeps the opaque
  claim token. The server stores only its SHA-256 (30-day TTL) and computes
  the XP itself. **The client's XP is never trusted.**
- At signup the answers carry `lesson.claimToken`;
  `UserOnboardingService.applyPreSignupAnswers` calls `settleLessonClaim`
  once per token, in one transaction:
  - sets the focus course and `freeCourseId`;
  - grants the chest (idempotency key `onboarding_chest:{userId}`);
  - emits `onboarding.lesson_settled`, whose listener in `course/` enrols the
    learner and runs the real `markLessonComplete` (XP, streak day 1, events).

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
- Once the lesson is finished (`> LOSS_FROM`) and until signup, leaving loses
  something real (nothing is saved before signup), so Back opens `QuitSheet`
  with that truth and one optional "why" tap, and `beforeunload` warns.
  Exiting the lesson itself also opens the sheet. **Before the lesson there
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

`OnboardingShell`, `lib/onboarding/steps.ts`, the dialogue engine and most of
`components/onboarding/screens/` no longer render for learners. v3 reuses
`NameScreen`, `RemindersScreen` (with `onNotificationsAnswer`, which skips
the v2 session save), `OnboardingLayout`, `OnboardingFooter` and
`OptionCard`. Don't build new learner screens on the v2 shell.

## Testing

- `lib/onboarding/__tests__/` and `components/onboarding/__tests__/`
  (`npx jest lib/onboarding components/onboarding`).
- Backend: `src/onboarding-flow/*.spec.ts`, `src/user-onboarding/*.spec.ts`.
- In the browser: run the whole flow signed out on a 375×812 viewport with a
  throwaway `@example.com` signup, then check the DB for the enrolment,
  lesson 1, the chest and the linked events.
