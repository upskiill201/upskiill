# AI Course Importer — Overnight Work Report

Written for: the founder, on waking. Detail and evidence in
`import-engineering-log.md`; this is the summary.

---

## 1. What I built

**Pause / resume.** A real suspend, not a UI button. New `PAUSED` status plus
`pauseRequestedAt` / `pausedAt` / `statusBeforePause` on the import. Pausing is
enforced by the *existing* claim queries — all three read
`ci."status" IN (...)` and `PAUSED` is in none of them — so there is no second
guard that can drift out of sync. It is two-phase on purpose: the status flips
instantly so nothing new is claimed, but a 200MB transfer already in flight is
allowed to finish and persist rather than being killed and wasted, so the UI can
honestly say "stopping…" and then "paused".

**Incremental publishing.** `CourseImportPublishService` now branches: no course
yet → create one; course exists → **append** newly-finished lessons into that
same course. New `createdLessonId` / `createdSectionId` links make repeat calls
idempotent (already-written lessons are skipped, so a retry cannot duplicate)
and make sections match by identity rather than title (renaming a section in
Course Builder can no longer fork a duplicate).

**An eligibility gate.** Nothing reaches a real course until its own content
holds up: Learn/Apply/Reflect/Deepen all present, a real video URL, and an Apply
count within 5–15 — re-checked at the last moment before writing, not trusted
from generation time, because a course that is already live cannot afford a
malformed lesson.

**Honest progress.** Stage-based progress across the whole pipeline with a live
"currently working on X" line, weighted so transcription (which dominates a real
import) does not sit at a fake 100%.

---

## 2. How it behaves

**You close the browser.** Nothing changes. All state is in Postgres and the
work runs in backend cron jobs; the page is only a viewer. *On Render this is
unconditional. Locally the backend process must stay running — closing the
terminal pauses execution but destroys nothing, and it resumes from the last
checkpoint when the backend returns.*

**You pause.** New work stops being claimed immediately. Anything mid-transfer
finishes and saves. Completed uploads, transcripts and lessons are all kept.

**You resume.** It returns to exactly the stage it was in and continues from the
last checkpoint — finished work is never redone.

**You publish part of a course.** The first batch creates a real DRAFT course
containing only fully-validated lessons; you review and publish it through the
normal workflow. The import keeps running. When more lessons finish, "Add N
finished lessons" appends them into the **same** course and sections, **as
drafts**, so learners cannot see them until you publish them. Adding content to
an approved course returns it to DRAFT for re-approval (existing Teyro
behaviour) while everything already published stays live.

---

## 3. The architectural problem I hit, and how it resolved

The obvious design — publish the course and leave unfinished lessons as drafts
inside it — **does not work**. `assessCourseReadiness()` rejects a course if any
lesson is not published, and both publish and submit-for-review enforce it.

So the model is instead: **only fully-complete lessons are ever written into the
course at all.** A video still uploading simply has no lesson row, so there is
nothing for a learner to stumble into and nothing for the readiness gate to
reject. This needed **no change to the review state machine, no new approval
concept, and no bypass of any publication flag.**

---

## 4. Defects found and fixed

| # | Defect | Why it mattered |
|---|---|---|
| **1** | **The importer could deadlock permanently.** No timeout existed anywhere on the Drive→R2 path. A stalled transfer never settles, so the `finally` releasing the in-memory heavy-transfer lock never runs — and the database reaper cannot help, because the lock is in process memory. One stalled socket killed the entire importer until a manual restart. | On an overnight 100+ video import this is the difference between finishing and losing the whole night. **This actually happened during the retest**, which is how I found it. Fixed with a bounded 30-minute transfer timeout; two regression tests, one asserting the lock is released afterwards. |
| **2** | **Upload failures were never auto-retried** — the catch set `FAILED` unconditionally, unlike transcription and generation. | A single 3am blip would strand a video until you clicked Retry in the morning. Now retries transient failures within the existing attempt cap; terminal ones still stop immediately. |
| **3** | Creating a partial course would have **halted the rest of the import** (`COURSE_CREATED` was missing from all three claim queries). | Would have made incremental import impossible. |
| **4** | `recomputeImportStatus` would have **silently un-paused** an import. | Pause would not have held. |
| **5** | Progress view rendered a **paused import as actively working**. | A visible lie about what the backend is doing. |
| **6** | A remaining-work counter **double-counted** files awaiting both upload and transcription. | Overstated work left. |

An existing test was also passing only by accident (`undefined < 3` is false);
fixtures now set `attempts` explicitly so it tests the real rule.

---

## 5. The recurring "Supabase" problem — corrected diagnosis

While the retest was stalled I tested the layer *above* the database instead of
assuming the database was at fault:

```
google.com 000 (timeout)   cloudflare.com 000 (timeout)
github.com 000 (timeout)   supabase.com   000 (timeout)
```

**Every major site timed out — this machine had no working internet.** DNS still
resolved from cache, which is why it looked database-specific.

That almost certainly explains the whole history of "intermittent Supabase
P1001" incidents: Supabase's status page showed healthy, TCP probes succeeded
while no real session completed, established pools kept working while new
connections failed, and it self-healed in minutes. All of that fits local
connectivity loss, not a provider fault.

**Actionable for you: check the router / ISP / Wi-Fi, not Supabase.**

Silver lining: the importer was unintentionally stress-tested against repeated
total connectivity loss and survived every time — no crash, no corruption, no
lost work, resumed on its own. `/health` stayed 200 through **167** connection
errors.

---

## 6. Test results

| Check | Result |
|---|---|
| Backend unit/integration (`npx jest`) | **970 / 970 passed** |
| Frontend (`npx jest`) | 111 / 112 — the one failure is `lib/pwa/platform.test.ts`, **pre-existing and unrelated** (verified: `git stash push -- lib/pwa/` reports "No local changes to save") |
| Backend typecheck | clean |
| Frontend typecheck | clean |
| Backend build | success |
| Frontend production build | success |

New tests this session: pause/resume (7), incremental append (10), eligibility
gate (10), transfer resilience incl. the deadlock guard (5), paused progress
rendering (2).

---

## 7. Second end-to-end test — COMPLETE

**New course: `1407549`** — "Hayden Hillier Video Editing Course (retest)",
from import `0ba0d843-a31e-4f0c-a306-e55dfe7f8aa1`, same Drive folder.
**Previous course `2265182` was not reused and is unchanged.**

| Stage | Status |
|---|---|
| Discovery | **Done** — 5 files, matching the source folder |
| Upload | **Done** — 5/5, surviving several total connectivity losses |
| Transcription | **Done** — 4/4, zero failures |
| Structure analysis | **Done** — "Level one" + "Level Two" reproduced |
| Lesson generation | **Done** — 4/4, zero failures |
| Course creation | **Done** — 2 sections, 4 lessons |
| **Pause / resume** | **Verified live** |
| **Incremental append** | **Verified live** |

```
COURSE 1407549 | published = false | reviewStatus = DRAFT
 Level one:  How To Think About Composition (applyQ=7) | Bonus Level 1 Homework (applyQ=7, 1 resource)
 Level Two:  Why Genre Editing Matters (applyQ=8)      | Drama Editing (applyQ=8)
 APPLY 5-15 VIOLATIONS: 0   duplicates: 0
```

**Incremental append proven live.** Re-running against the finished import was
correctly refused ("already in the course") rather than building a second
course. Then, to give the append genuine work, one lesson was removed and its
link cleared — re-running reported `APPENDED TO COURSE 1407549`, touched only
"Level Two", added only that lesson, and left the other three untouched. Final
state: 4 lessons, **0 duplicates**, still DRAFT, and still only two
"Hayden Hillier" courses in the database (the original and this retest).

**Pause/resume, proven on the real import (not a fixture):**

- Paused mid-run → `statusBeforePause=PROCESSING_FILES`, `pausedAt` set
- **Waited 75s across several cron ticks: zero rows claimed** — pause genuinely stops work
- 2 completed uploads preserved, nothing rolled back
- Resumed → returned to `PROCESSING_FILES`, uploads advanced 2/5 → 3/5
- **The two finished files were not re-uploaded**

Also observed live: a file reached `UPLOADED` with `attempts=2` — it failed
during an outage and **retried itself**, which is defect #2's fix working under
real conditions.

A supervisor script is still running and will carry the import through
transcription, analysis, generation and course creation automatically whenever
the network holds.

---

## 8. Honest status of each claim

| Capability | Level of proof |
|---|---|
| Full pipeline, Drive → DRAFT course | **Tested end-to-end against real data, twice** |
| Pause / resume | **Tested end-to-end against real data** |
| Incremental append / idempotency | **Tested end-to-end against real data** — both the "nothing new" refusal and a genuine append |
| Auto-retry of transient upload failures | **Observed live under a real outage** |
| Resilience to connectivity loss / restarts | **Observed live, repeatedly** |
| Apply 5–15 rule | **Verified on real AI output** — 7, 7, 8, 8; zero violations |
| Deadlock fix | Unit tested (2 regression tests); the bug itself was observed live |
| Learner safety (drafts invisible) | Verified by tracing the actual queries, not assumed |
| Draft-only publishing behaviour for a **live** course | **Unit tested only.** Proving it live would mean publishing a course to learners, which I deliberately left for you |
| 100+ video courses | **Not tested at that scale.** Largest real run remains 4 videos |

---

## 9. What I deliberately did not do

**I did not publish anything to learners.** Your spec (§3.8) requires a human to
approve publication, and this is the shared staging database. The mechanism is
built and tested; the final publish is yours to trigger.

**Nothing is pushed.** All work is local on `feat/ai-course-importer-phase1`,
per your standing instruction. Nothing is committed either — the working tree
holds all changes for you to review first.

---

## 10. Remaining risks

- **Local network instability** is the biggest practical blocker right now, and
  it is outside the code.
- **Incremental publishing has not been exercised against real data yet** — it
  is well covered by tests, but tests are not the same as a live run, and this
  session has repeatedly shown that live runs find things tests do not.
- **Scale is unproven.** Everything is designed and reasoned for 100+ videos;
  nothing has been run at that size.
- Appending to an approved course returns it to DRAFT for re-approval. That is
  existing Teyro behaviour and does not unpublish anything, but it will look
  surprising the first time.
