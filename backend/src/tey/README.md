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
| 5 | AI provider abstraction | planned |
| 6 | WhatsApp | future |
| 7 | Rive mascot states | future |

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
