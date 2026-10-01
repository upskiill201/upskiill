# Tey Intelligence Layer

Tey's awareness layer: it observes meaningful learner activity, maintains a
current picture of each learner, and (in later phases) decides when Tey should
intervene and delivers that intervention.

The architecture the whole module exists to preserve:

```
ACTIVITY → STATE → DECISION → CONTEXT → DELIVERY
```

with `AI = language / reasoning / personalization`, never `AI = source of truth`.

---

## Status

| Phase | What | State |
|---|---|---|
| 1 | Activity events + learner state | **shipped** |
| 2 | Decision engine + scheduler | **shipped (dry-run)** |
| 3 | Web push + deep links | **shipped** |
| 4 | Admin dashboard | **shipped** |
| 5 | AI provider abstraction | **shipped (disarmed)** |
| 6 | WhatsApp | future (premium) |
| 7 | Rive mascot states | future |
| 8 | Duolingo-grade ladder, event hub, unlock journey, creator push | **shipped** (2026-09-28) — see "Notification program" below |

Delivery is **off by default**. With `TEY_DELIVERY_ENABLED` unset the scheduler
claims due actions, revalidates them, and records what it *would* have sent to
`tey_deliveries` — then sends nothing. A week of those rows answers "do the
rules fire at sane times, at sane volumes, for the right people?" without a
single learner being interrupted. Turn it on for a staff allowlist first.

---

## The rules that keep this module honest

**1. There is no streak logic here.**
Four competing streak implementations already exist in this codebase
(`course.service.ts`, `progress.service.ts`, `streak.service.ts`,
`gamification.service.ts`) with divergent freeze rules. `LearnerStateService`
calls `StreakService.getStreakStats()` and copies the result — that function is
the reconciling read path, so calling it *is* the reconciliation.

A test in `state/learner-state.service.spec.ts` walks this directory and fails
the build if anything under `tey/` starts doing its own streak date arithmetic.
If it fails, delegate to `StreakService`; do not relax the test.

**2. The client cannot report progress.**
`POST /tey/events` accepts only the event types the backend cannot observe
(`app_opened`, `lesson_opened`, `lesson_abandoned`, …). Server-authoritative
types are rejected with a 400. That allowlist is a security boundary, not a
convention — accepting `lesson_completed` from a browser would let anyone forge
XP and streaks.

**3. `learner_state` is a cache, never a source of truth.**
Every column is reproducible from `StudentProfile` + `UserDailyActivity` +
`StreakService`. It exists so the decision engine can read one indexed row
instead of redoing that work for every scheduled action. A failed write to it
logs and moves on.

**4. Nothing here may break its caller.**
Activity ingest, state projection, and timezone capture all swallow their own
errors. Telemetry must never fail a lesson completion.

---

## Layout

```
contracts/     the shared vocabulary — event types, learner states, TeyContext
activity/      ingest: the single writer for tey_activity_events
state/         timezone resolution, the projection, and the pure derivers
decision/      pure rules + the engine that decides whether Tey should act
scheduler/     the Postgres due queue, the claim, and the tick
delivery/      policy gate, templates, deep links, and the channels
listeners/     server-side capture from existing domain events
```

`tey.constants.ts` holds every threshold, so tuning does not mean grepping.

---

## Timezone

The rest of the codebase reads a per-request `x-timezone-offset` header. That is
fine for request-scoped work and useless to a scheduler, which has to decide at
runtime whether it is 8pm for a given learner with nobody around to ask.

So `User.timezone` (IANA) and `User.timezoneOffsetMinutes` are persisted, captured
opportunistically on app boot and on every activity flush. IANA is preferred
because it survives DST; the offset is the fallback. `state/local-time.util.ts`
is the only place that resolves this, and `TEY_DEFAULT_TIMEZONE` covers a learner
who has neither yet.

---

## Why a new event table

`learning_events` was the obvious candidate and is the wrong one: it is read by
creator analytics (`analytics.service.ts`, `students.service.ts`) and its
`entityType`/`entityId` are non-nullable, so `app_opened` cannot be expressed.
Mixing client telemetry into it would bloat its index and risk semantic drift in
creator dashboards. `tey_activity_events` is separate and disposable.

---

## The event seam

`TeyListener` subscribes to `learning.activity.recorded`, **not**
`lesson.completed`. EventEmitter2 fires `{ async: true }` listeners concurrently
and unawaited, so a listener on `lesson.completed` would race
`GamificationListener` and read today's activity row before
`ProgressService.recordLearningActivity` wrote it — reporting XP one lesson
behind. Emitting downstream of that write removes the race structurally.

The consequence for later phases: a dropped in-process event costs *freshness*,
never correctness, because the scheduler re-projects from source tables before it
sends anything.

---

## API

| Route | Purpose |
|---|---|
| `GET /tey/me/state` | The learner's current state; re-projects when stale and re-plans, which is how the system self-heals after a dropped event |
| `PATCH /tey/me/timezone` | Explicit zone capture on app boot |
| `POST /tey/events` | Batched client telemetry (≤50, throttled 30/min) |
| `POST /tey/scheduler/tick` | External tick, behind `x-tey-scheduler-secret`. Refuses when the secret is unset rather than running open. |

Routes are mounted unversioned at root to match the live API's existing layout.

---

## Frontend

`lib/tey-track.ts` buffers events and flushes on 20 events / 10s /
`visibilitychange` / `pagehide` (via `sendBeacon`), persisting the queue to
`sessionStorage`. It stops after a 401 so a logged-out tab does not loop.
`components/providers/TeyActivityProvider.tsx` mounts it on learner routes.

---

## The scheduler

**It never scans learners.** The tick costs `O(rows WHERE status='PENDING' AND
dueAt <= now())`, served by a partial index whose *size* is the pending count —
not the user count. A learner with no queued action is invisible to it.

Actions are created only by events, and `INACTIVE_RETURN` stops escalating after
day 7, so a learner who goes dark holds at most one pending row and then leaves
the queue entirely. There is no daily sweep anywhere in this module, by design.

**Claiming** is one `UPDATE ... FROM (SELECT ... FOR UPDATE SKIP LOCKED)`. That
clause is the whole multi-instance story: two Render instances ticking at the
same moment each get a disjoint batch — no Redis, no leader election, no
singleton assumption.

**Every action is revalidated against freshly projected state before it sends.**
Scheduled at 8pm, learner studies at 9pm, fires at 10pm → `SKIPPED`. This is
also what makes the lossy in-process event chain safe: a dropped event costs
freshness, never a wrong send.

### Two triggers, on purpose

An in-process `@Cron('30 * * * * *')` **and** `POST /tey/scheduler/tick` behind a
shared secret. The backend runs on Render's free plan, which spins the service
down when idle — and a sleeping instance runs no cron, so 20:30 reminders would
simply never fire. An external caller both wakes the service and drives the
tick. Both paths are idempotent because the claim serializes them.

Long term this feature wants a paid instance; the endpoint makes it work in the
meantime rather than pretending the constraint does not exist.

---

## Environment

| Variable | Default | Meaning |
|---|---|---|
| `TEY_SCHEDULER_ENABLED` | on in production | Drive the queue. Off in dev so `start:dev` does not process real actions. |
| `TEY_DELIVERY_ENABLED` | `false` | Actually send. While unset the scheduler is in dry-run. |
| `TEY_SCHEDULER_SECRET` | unset | Shared secret for `POST /tey/scheduler/tick`. Unset ⇒ the endpoint refuses rather than running unauthenticated. |

---

## Rule interactions worth knowing

`STREAK_AT_RISK` (≈20:30) and `STREAK_CRITICAL` (22:00) are **two stages of one
evening**, not competitors — CRITICAL deliberately does not supersede AT_RISK,
because doing so would mean the at-risk nudge never fired for a learner with no
freeze, which is exactly the learner it exists for. Keeping the total volume
sane is the policy layer's job, not the rule graph's.

`STREAK_CRITICAL` stays silent when a freeze would cover the miss. Telling
someone their streak is about to die while the product silently saves it is a
lie, and the first time a learner notices, every future CRITICAL loses meaning.

`INACTIVE_RETURN` never fires for a learner with a live streak, and
`DAILY_GOAL_INCOMPLETE` never fires for one who has been away a day or more.
Between them that leaves no gap and no overlap: the streak rules own engaged
learners, the win-back ladder owns lapsed ones — and unlike the daily nudge, the
ladder knows when to stop.

---

## Verifying

```bash
npm test -- tey/            # unit
npx ts-node scripts/tey-e2e.ts   # against the database .env points at
```

The e2e script proves the two properties the design rests on: an action whose
reason no longer holds is SKIPPED rather than sent, and one whose reason still
holds is processed.

---

## Delivery

```
TeyContext
   → policy gate      (kill switch → prefs → quiet hours → cap → gap → cooldown → target)
   → render           (TEMPLATE first, always)
   → ledger row       (written first: its id is what the deep link embeds)
   → in-app row       (unconditional)
   → push             (best effort)
```

**In-app is unconditional and push is the second channel on the same message.**
That ordering is what makes the feature degrade gracefully to exactly what
ships today for a learner who never grants permission — or who is on iOS
without an installed PWA.

**Every policy denial writes a distinct `skipReason`** and a `SUPPRESSED` ledger
row. Without those rows the admin dashboard could only report what was sent,
and "we wanted to nudge 400 people tonight and suppressed 120, here is exactly
why" is the more useful half of the picture.

### Web Push, not FCM

FCM's web channel *is* W3C Web Push with a Google endpoint in front — it adds
no delivery capability on the web, but it does require the firebase JS SDK
client-side plus a second service worker. This app has a hand-written `sw.js`
deliberately chosen over next-pwa, and two service workers on one origin means
scope conflicts and a second cache lifecycle. When a native Android app exists,
FCM becomes correct — and slots in as another `TeyChannel` with nothing above
it changing.

### The iOS ceiling

iOS exposes `PushManager` **only to a PWA installed to the Home Screen**
(16.4+). In mobile Safari a permission button would prompt nothing and silently
fail, so `useTeyPush` reports `needsInstall` and the UI offers installation
instead. `push_subscriptions.platform` records this, so reachability by
platform can be measured rather than assumed — and it is the strongest argument
for bringing WhatsApp forward.

### Deep links

`/learn/{courseId}/section/{n}?lesson={lessonId}&tey={deliveryId}`

The target is resolved and **validated at send time**, so a deleted or
unpublished lesson has already degraded LESSON → COURSE → HOME before a
notification exists. The lesson player is the second line of defence: an
unknown `?lesson=` — or one past the learner's current unlock point — is
ignored and falls through to normal behaviour. That index guard is
security-relevant: a deep link must never become a way around lesson
sequencing or the paywall.

`proxy.ts` now preserves the destination through the login wall
(`/login?next=…`, sanitized by `sanitizeNextPath`). Without it, a learner whose
7-day JWT expired taps a reminder and lands on a generic dashboard with the
lesson silently discarded.

### Environment

| Variable | Meaning |
|---|---|
| `TEY_DELIVERY_ENABLED` | `true` to actually send. Unset ⇒ dry-run. |
| `TEY_PUSH_ENABLED` | `false` is the global kill switch, checked before anything else. |
| `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` | `npx web-push generate-vapid-keys`. The private key never leaves the server. |
| `VAPID_SUBJECT` | `mailto:` contact for push services. |
| `NEXT_PUBLIC_ENABLE_SW` | Frontend. `true` registers the service worker in dev, so push is testable without deploying. |

---

## Admin

`/admin` — Tey's command center. Overview, rules, deliveries, queue, health.

Backed by `/tey/admin/*`, guarded by **class-level** `@Roles(Role.ADMIN)`. That
placement is load-bearing: `RolesGuard` returns `true` when no `@Roles`
metadata is present, so a controller that forgets the decorator is open to every
logged-in student. `tey-admin.controller.spec.ts` asserts the decorator exists
and that STUDENT/INSTRUCTOR are refused.

Auth is defence in depth — `proxy.ts` cookie wall, then a server-side role check
in `app/admin/layout.tsx`, then the guard. Only the guard is authoritative; the
first two exist so an unauthorized visitor gets a redirect rather than a page of
failed requests.

**`POST /tey/admin/test-push` sends only to the calling admin.** The recipient
comes from the session and there is deliberately no parameter to override it —
a "send to any user" endpoint behind an admin login is the most direct route
from admin panel to accidental spam cannon, and an operator can always test on
their own account. A spec asserts the handler takes no body.

Two things the dashboard deliberately surfaces:

* **Dry-run is shown as a banner**, not buried in config. It is the first
  answer to "why did nobody get a notification?", and every delivery number on
  the page looks broken until you know it.
* **Suppression reasons are a first-class panel.** Knowing 120 nudges were held
  back only helps if you can see which policy did it — quiet hours reads very
  differently from no-subscription.

Open rates are hidden below 10 sends rather than printing a confident 0% or
100% off three deliveries.

---

## AI

**Off by default** (`TEY_AI_ENABLED` unset). Even switched on, most nudges never
reach it.

```
render(ctx)
  → is this reason AI-eligible?   no  → template
  → budget check                  no  → template
  → provider call                fail → template   (fallback provider first)
  → schema validation            fail → template
  → AI copy
```

The eligibility set is deliberately small — `INACTIVE_RETURN`,
`COURSE_NEAR_COMPLETION`, `PROGRESS_CELEBRATION`. "Your streak is at risk" says
the same true thing every evening; there is nothing for a model to add and
every call is money Teyro does not have. `CRITICAL` never waits on a model at
all: spending up to 8 seconds phrasing "your streak ends in two hours" is a bad
trade.

### Providers

One interface, three adapters, all over global `fetch` — no vendor SDKs, so no
lockfile churn and one place per provider where the wire format lives.

| Adapter | Covers |
|---|---|
| `openai-compatible` | OpenAI, OpenRouter, Groq, NVIDIA, DeepSeek, Together, Ollama, LM Studio — the only thing that varies is `baseUrl` |
| `anthropic` | Native Messages API. A separate adapter because the differences are real: system as a top-level field, content blocks, `x-api-key`, a required version header, and no JSON mode (emulated with a forced tool) |
| `gemini` | Seeded default. Key as a query param, `systemInstruction`, `model` in place of `assistant`, and a JSON-Schema dialect that wants UPPERCASE types and rejects `additionalProperties` |

Each normalizes usage into one `{ inputTokens, outputTokens }` shape. That
normalization is where cost accounting either works or silently reports zero,
so every adapter has a fixture test for it.

### Keys

Encrypted with the **same AES-256-GCM envelope as creator payout methods**
(`earnings/crypto.util.ts`), so there is one crypto implementation to audit and
one production fail-fast. `AiConfigService.toView` is the only way a provider
row leaves the service, and it destructures the ciphertext away — a new
endpoint cannot leak a key by forgetting to omit a field. A spec asserts no
view ever serializes one.

### Tools

`userId` is **injected from the session and is never a model-supplied
argument**. No tool schema contains a user-identifying field, so no prompt
injection can reach another learner's data — a spec walks every schema to
confirm it. Mutating tools are refused outright on the proactive path; only the
conversational path (a later phase) may enable them. A failing tool returns its
failure so the model can tell the learner the truth rather than inventing
success.

### Budgets

Global daily USD, per-learner calls/day, and a proactive-message cap, all
checked before the call and recorded after. Breach means a template, never a
retry. Known limitation, deliberately accepted: the pre-flight check is
read-then-write and can overshoot slightly under concurrency — this is a
guardrail against a runaway loop, not a ledger, and the overshoot is fractions
of a cent.

### Environment

| Variable | Default | Meaning |
|---|---|---|
| `TEY_AI_ENABLED` | off | Master switch. Off ⇒ templates only. |
| `TEY_AI_DAILY_BUDGET_USD` | `2` | Global spend ceiling per UTC day. |
| `TEY_AI_MAX_CALLS_PER_USER_DAY` | `20` | Per-learner call cap. |
| `TEY_AI_MAX_PROACTIVE_DAY` | `200` | Nudge-generation cap across all learners. |

Provider credentials are **not** env vars — they are configured at
`/admin` and encrypted at rest. `scripts/seed-tey-ai.ts` seeds a Gemini
provider from `GEMINI_API_KEY`, inactive, for an operator to enable after
testing the connection.

`scripts/seed-tey-ai-codecraft.ts` does the same for
[CodeCraft](https://codecraftapi.com) (`CODECRAFT_API_KEY`, optional
`CODECRAFT_MODEL`) — a fully OpenAI-compatible aggregator, so it needs no new
adapter, just a `kind: 'OPENAI_COMPATIBLE'` row pointed at CodeCraft's
`baseUrl`. Both env vars are seed-time-only: read once by the script, then
encrypted into the database. Neither is ever read at runtime.

---

## Notification program (2026-09-28)

Duolingo's reminder shape, in Tey's voice, across push, the in-app bell and
email — for learners and for creators.

### The learner's day (reminder rules)

| Rung | Rule | When (learner-local) |
|---|---|---|
| Practice reminder | `DAILY_GOAL_INCOMPLETE` | the hour they chose (`preferredHour`), else habit, else 12:00 on a streak / 18:00 without. Skipped for a streak learner whose hour is after 16:00 — the saver covers them |
| Streak saver | `STREAK_AT_RISK` | 20:00 (or their later chosen hour, capped 21:00) |
| Last call | `STREAK_CRITICAL` | 22:00, only with no freeze to cover it |
| Freeze used | event `streak.freeze.used` | when StreakService spends one |
| Streak lost | `STREAK_LOST` | the day it's noticed; leads with the repair offer (price + hours left) when one is open |
| Repair closing | `STREAK_REPAIR_EXPIRING` | once, on the offer's last day |
| First lesson | `FIRST_LESSON` | account days 0, 1, 3, 6 with no lesson yet |
| Win-back | `INACTIVE_RETURN` | days 1, 2, 3, 5, 7, 14, 21, 30 — day 30 is "These reminders don't seem to be working, so I'll stop", and nothing sends after it |

The practice reminder, saver and last call share the device tag `tey-today`,
so each replaces the one before on the lock screen instead of stacking.

**The planner wake-up (`DAY_PLANNER`).** Rules only plan *today*, and they
used to be planned only by the learner's own activity — so the day after a
lesson, the day that matters most, was silent unless they opened the app.
`planFor` now also queues a `DAY_PLANNER` row for 06:00 tomorrow (jittered)
while the learner is reachable: on a streak, holding a repair offer, within
30 days of their last lesson, or in their first week. It never delivers; it
re-projects and plans that day. Past the last rung nobody is woken, so the
queue still costs nothing for learners who have gone. `reseedPlanners`
(every 3h) re-seeds any recently-active learner whose chain broke.

### Event notifications (`notify/`)

`TeyNotifyService` is the hub for "something happened": dedupe → bell row
(always) → push gate → ledger row → push. `notify.catalogue.ts` lists every
kind with its settings toggle, throttle, push TTL and device tag. Event pushes
have their own per-audience daily cap (learner 3, creator 8); the reminder
policy counts only reminder rules (`REMINDER_RULE_IDS`), so a league
overtake can't swallow the streak saver.

| Kind | Source | Notes |
|---|---|---|
| `STREAK_FREEZE_USED` | `StreakService.reconcile` | once per save |
| `LEAGUE_PASSED` | `LeagueService.announceOvertakes` | to the learner who was passed; names the rival and the new rank, says so if it cost them the promotion zone. Throttled 3h. The passer gets a bell-only `TEY_LEAGUE_CLIMB` row |
| `LEAGUE_ENDING` | Sunday 15:00 UTC cron | only learners with something at stake: promotion zone, within 3 places of it, or demotion zone |
| `LEAGUE_RESULT` | `league.settled` | cohorts now settle Monday 00:20 UTC, so results arrive on time. "Held your spot" is bell-only |
| `COURSE_UNLOCK` | the unlock journey | below |
| `STUDIO_*` | `studio.notified` (studio listener, course review) | push only; the studio listener keeps writing its own bell rows |

### The lesson-3 unlock journey

`CourseUnlockJourney` starts when a learner finishes the last free lesson of
a paid course (`common/course-unlock.util.ts` is the single definition of "at
the paywall", shared with the email processor). Three stages, each re-checked
against the real paywall state before sending and dropped the moment the
learner unlocks, starts a checkout (the abandoned-checkout emails own them
then), or the course goes away:

| Stage | Push + bell | Email |
|---|---|---|
| 1 | ~22h later (same time next day) — "Next up: <real lesson title>" | ~3h later — the next lessons by name |
| 2 | day 3 — lessons left, or a real learner count (≥10) | day 3 — the course's own outcomes |
| 3 | day 7 — "your progress is saved" | day 7 — says it's the last one |

Night-time stages are moved to 18:00 local. No fake urgency, no invented
discounts; creator coupons are never auto-published in these messages.

### Email side

* `learning.streak-at-risk` is now the fallback for learners push can't reach
  (no device, push off, or delivery in dry-run) — one warning, one channel.
* `reengagement.inactive` is live: days 3/7/14/30, day 30 the goodbye; only
  lapses that began around the activation date qualify.
* `conversion.course-unlock-1..3` — the journey's emails.
* `creator.weekly-digest` — Monday 09:00 UTC: sales, earnings, new learners,
  lessons done, finishes, and questions still waiting for an answer. Skipped
  for an all-zero week. Unsubscribe scope `CREATOR_DIGEST`.

### Settings

`tey_notification_prefs` gained `leagueUpdates`, `courseOffers` and
`creatorActivity` (migration `20260928150000_add_notify_categories`,
additive, defaults true). Learner settings show League updates and Course
updates; creator settings show one Studio notifications switch.

### Crons outside the Tey tick

| Cron | Env gate |
|---|---|
| `league-week-ending`, `league-settle-week` | `LEAGUE_CRON_ENABLED` (defaults on in production) |
| `email-reengagement-scan`, `email-creator-digest-scan` | `EMAIL_SCHEDULER_ENABLED` + the flow's own flag |
| `tey-planner-reseed` | `TEY_SCHEDULER_ENABLED` |

On Render's free plan these only run while the instance is awake; the
external `POST /tey/scheduler/tick` covers the reminder queue only.
