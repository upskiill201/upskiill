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
| 1 | Activity events + learner state | **shipped (this module)** |
| 2 | Decision engine + scheduler | planned |
| 3 | Web push + deep links | planned |
| 4 | Admin dashboard | planned |
| 5 | AI provider abstraction | planned |
| 6 | WhatsApp | future |
| 7 | Rive mascot states | future |

Phase 1 ships dark. Nothing here is user-visible; it exists so the system starts
accumulating timezone and activity data, which every later phase depends on and
which takes real calendar time to fill.

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
| `GET /tey/me/state` | The learner's current state; re-projects when stale, which is how the system self-heals after a dropped event |
| `PATCH /tey/me/timezone` | Explicit zone capture on app boot |
| `POST /tey/events` | Batched client telemetry (≤50, throttled 30/min) |

Routes are mounted unversioned at root to match the live API's existing layout.

---

## Frontend

`lib/tey-track.ts` buffers events and flushes on 20 events / 10s /
`visibilitychange` / `pagehide` (via `sendBeacon`), persisting the queue to
`sessionStorage`. It stops after a 401 so a logged-out tab does not loop.
`components/providers/TeyActivityProvider.tsx` mounts it on learner routes.
