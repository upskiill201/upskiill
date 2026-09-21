# AI Course Importer — Engineering Log

Running log for the resumability + incremental-publishing work. Appended to as
issues are found; nothing is removed once written.

---

# Part 1 — Audit (before any code changes)

## What already works

| Capability | State | Evidence |
|---|---|---|
| Durable progress in Postgres | **Works** | All state lives in `course_imports`, `course_import_files`, `course_import_modules`, `course_import_lessons`. No in-memory queue; nothing depends on the browser. |
| Per-item independent retry | **Works** | Each file has `status`/`attempts`, each video has `transcriptStatus`/`transcriptAttempts`, each lesson has `status`/`attempts`. |
| Stale-claim recovery | **Works** | `claimedAt`/`claimedBy` + reaper SQL on all three processors (20 min files/transcripts, 10 min lessons). Verified live: a crashed process's claim was reclaimed. |
| Idempotent claim | **Works** | `UPDATE ... FROM (SELECT ... FOR UPDATE SKIP LOCKED)` — two workers cannot claim the same row. |
| Sequential heavy work | **Works** | `FILE_BATCH_SIZE = 1` + `HeavyTransferLockService` shared between upload and transcription. |
| Structured errors | **Works** | `CourseImportError` with 27 codes; `errorCode`/`transcriptErrorCode` persisted; retryable vs terminal drives the retry decision. |
| Never auto-publishes | **Works** | `CourseCreationService` always leaves the course `published: false, reviewStatus: DRAFT`. Regression test added. |
| Duplicate course prevention | **Works** | `createdCourseId` checked before creating; second attempt refused. |

## What is missing or unsafe

| Gap | Severity | Detail |
|---|---|---|
| **No pause/resume at all** | HIGH | `CourseImportStatus` has no `PAUSED`. There is no way to stop claiming work without cancelling (which deletes R2 objects — destructive, not a pause). |
| **Course creation is all-or-nothing** | HIGH | `createFullCourseTree` only creates a *new* course. There is no path to append later-generated lessons into an existing course, so incremental import is impossible today. |
| **No link from import lesson → real lesson** | HIGH | `CourseImportLesson` has no `createdLessonId`. Without it, a second append cannot tell which lessons it already wrote, so retries would duplicate lessons. |
| **Lessons always created published** | HIGH | `course-import-publish.service.ts` passes `publish: true` for every lesson. Safe for the first batch (course not live yet), **unsafe** for a later batch appended to a live course — unreviewed AI content would become learner-visible immediately, violating the "never auto-publish" rule. |
| **No queueing between imports** | MEDIUM | `HeavyTransferLockService` serialises heavy ops, but two active imports interleave file-by-file rather than one finishing first. Not incorrect, but not the "queue safely" behaviour the spec asks for. |

## The architectural blocker, and how it resolves

The obvious design for partial publishing — *publish the course, leave unfinished
lessons as drafts inside it* — *does not work*. `assessCourseReadiness()`
(`course-readiness.util.ts`) rejects a course if **any** lesson is
`status !== 'published'`, and both `publishCourse` and `submitForReview` enforce
it. A course containing draft lessons can neither be submitted nor published.

Verified facts that shape the correct design:

1. **Publication is course-level only.** `publishCourse` gates on
   `reviewStatus === 'APPROVED'` plus readiness. There is no lesson-level
   approval anywhere in the codebase.
2. **Learners only ever see published lessons.** Six separate queries in
   `course.service.ts` filter `where: { status: 'published' }`, with an
   `isPrivileged` bypass for the owner/admin preview path.
3. **Editing an approved course reopens review but does NOT unpublish it.**
   `assertEditableAndReopen` flips `reviewStatus` `APPROVED → DRAFT` and writes
   a `REOPENED` audit row, while `published` stays `true`.

So the correct incremental model, using the existing domain rules rather than
bending them:

- **Only fully-validated lessons are ever written into the real course.** A
  video still uploading/transcribing simply has no lesson row in the course, so
  there is nothing for a learner to stumble into and nothing for the readiness
  gate to reject.
- **First batch** → course created as DRAFT with complete lessons published
  → admin reviews → approves → publishes. Course goes live.
- **Later batches** → appended into the *same* course and sections. Because the
  course is already live, these lessons are created as **drafts**
  (`publish: false`), which keeps them invisible to learners until a human
  reviews them. The course stays `published: true` throughout, so already-live
  lessons are unaffected.
- Re-approval then follows the normal workflow: the admin publishes the new
  lessons (Lesson Builder), which satisfies readiness again, and re-submits.

This needs **no change to the review state machine, no new approval concept, and
no bypass of any publication flag.**

## Architectural risks

1. **Appending reopens review.** Adding lessons to an APPROVED course sets it
   back to DRAFT. This is existing, intended behaviour (content changed, so it
   needs re-approval) and does not unpublish anything — but the admin must
   understand why the course flipped out of APPROVED. The UI has to say so.
2. **Learner progress/completion.** Adding lessons to a live course changes
   denominators in any "x of y lessons complete" calculation. Must be inspected,
   not assumed.
3. **Duplicate lessons on re-append.** Mitigated by the new
   `createdLessonId` link; without it this would be the most likely real bug.
4. **Section matching.** A later batch must match sections by identity, not by
   title string, or a renamed section would silently fork into a duplicate.

## Preserving existing behaviour

- No change to `CourseService`, `CourseReviewService`, or
  `assessCourseReadiness` semantics.
- `publish: false` on `LessonContentInput` already exists and is documented for
  exactly this case — no new flag invented.
- Previous test course `2265182` is treated as read-only; the retest creates a
  separate course.

---

# Part 2/3 — Implementation

## What was built

**Pause / resume (§2.3)**
- New `PAUSED` status, plus `pauseRequestedAt`, `pausedAt`, `statusBeforePause`
  on `CourseImport` (migration `20260921090000`).
- `pauseImport` / `resumeImport` on `CourseImportService`, exposed as
  `POST :id/pause` and `POST :id/resume`.
- Pause is enforced by the *existing* claim queries: all three read
  `ci."status" IN (...)` and `PAUSED` is in none of them, so a paused import
  simply stops being claimed. No extra guard to keep in sync.
- Two-phase by design: status flips immediately (nothing new is claimed) but
  `pausedAt` is only set once nothing is in flight, so the UI can honestly say
  "stopping…" while a 200MB download finishes rather than killing it.
- Both operations are idempotent — a double click cannot corrupt the
  remembered stage or double-queue work.

**Incremental publishing (§3)**
- `CourseImportModule.createdSectionId` and `CourseImportLesson.createdLessonId`
  / `addedToCourseAt` link import rows to the real course rows.
- `CourseImportPublishService` now branches: no `createdCourseId` → create the
  course; otherwise → **append** newly-finished lessons into that same course.
- Idempotency comes from `createdLessonId`: anything already written is skipped,
  so re-running an append can never duplicate a lesson.
- Sections are matched by `createdSectionId`, never by title — renaming a
  section in Course Builder would otherwise fork a duplicate.
- `publish: false` when the course is already live, so later AI content lands
  as drafts that a human must review. `publish: true` only while the course is
  still an unpublished draft being reviewed as a whole.

**Eligibility gate (§3.3)** — `isPublishable()` re-validates at the last point
before content reaches a real course: Learn/Apply/Reflect/Deepen all present, a
real video URL, and an Apply question count within 5–15. Re-checked here rather
than trusted from generation time, because a live course cannot afford a
malformed lesson.

## Defects found and fixed during implementation

| ID | Issue | Root cause | Fix | Retest |
|---|---|---|---|---|
| IMP-01 | Creating a partial course would have halted the rest of the import | `COURSE_CREATED` was absent from all three claim queries, so no further files/videos/lessons would be claimed once a course existed | Added `COURSE_CREATED` to the upload, transcription and generation claim lists | Full suite green; live retest in progress |
| IMP-02 | `recomputeImportStatus` would silently un-pause an import and regress `COURSE_CREATED` | It only guarded `CANCELLED` before recomputing status from file counts | Guarded `PAUSED` and `COURSE_CREATED` as well | `course-import-processor` tests green |
| IMP-03 | Old publish tests encoded "wait for the whole import" | Deliberate behaviour change: incremental publishing exists precisely to remove that wait | Rewrote those tests for the new rule (a *lesson's own* validity gates it, not the import's status) | 25/25 publish tests green |

## §3.5 — Learner progress under incremental publishing (verified, not assumed)

Progress is computed as `completed.length / totalPublished`, where
`totalPublished` counts **only** lessons with `status: 'published'`
(`course.service.ts:856` and again at `:1186`). Section-completion bonuses use
the same published-only filter (`:829`).

Consequences, traced rather than guessed:

1. While a later batch sits as **drafts**, `totalPublished` does not change, so
   **existing learners' progress percentages are completely unaffected**. Their
   `completedLessons` array is untouched and the denominator is the same.
2. The denominator only grows when a human publishes those lessons. At that
   point a learner previously at 100% recalculates against the larger total
   (e.g. 4/6 = 67%).

Point 2 is inherent to adding content to a course someone has finished — there
genuinely *is* more material now — and it is not something the importer does on
its own. Because appended lessons arrive as drafts, the progress shift can only
ever be triggered by a deliberate human publish, never silently by the import.
No completed lesson is ever lost; only the percentage recalculates.

This is documented rather than "fixed" because changing it would mean inventing
a different completion rule for imported courses than for hand-built ones,
which is exactly the parallel-system outcome the brief forbids.

---

# Part 6 — Second end-to-end test (from scratch)

**New import:** `0ba0d843-a31e-4f0c-a306-e55dfe7f8aa1`
**Source folder:** `1C9YsXJxC5XMU77q0PGgYhNn0QTwvhHdU` ("Hayden Hillier Video Editing Course ")
**Previous course `2265182`:** untouched — a *separate* import row was created
rather than reusing it.

## Discovery (verified against the source folder)

5 files found, matching the manifest from the first run exactly:

| File | Category |
|---|---|
| 7- How To Think About Composition.mp4 | video |
| 8- Bonus Level 1 Homework.mp4 | video |
| 9- Set your weekly goal!.txt | document |
| 2- Why Genre Editing Matters.mp4 | video |
| 3- Drama Editing.mp4 | video |

## ISSUE-01 — Supabase pooler outage during the retest (EXTERNAL, unresolved)

- **Stage:** upload
- **Expected:** files upload sequentially
- **Actual:** the import stalled with one file held at `CLAIMED`; backend cron
  ticks logging Prisma `P1001` ("Can't reach database server",
  `aws-1-eu-west-1.pooler.supabase.com:6543`)
- **Classification:** *infrastructure / external connectivity* — not a code
  defect. Same intermittent pooler issue seen repeatedly on previous days,
  still undiagnosed at the provider/network level.
- **Evidence it is not our code:** the backend process did not crash, no
  unhandled rejection, cron ticks kept retrying, and one-off scripts opening
  *new* connections failed identically while the backend's established pool
  had been working moments earlier.
- **Mitigation already in place:** `PrismaService` retries the initial
  connection (6 × 10s) so a blip at boot no longer kills the process; the
  claimed file is recoverable via the 20-minute stale-claim reaper, so the
  import self-heals rather than needing manual DB intervention.
- **Status:** OPEN (external). Does not block correctness of the pause/resume
  or incremental-publish work; it does block *completing* the live retest
  while the outage lasts.

## Natural stale-claim recovery test (unplanned, but exactly §2.4)

The outage above produced a real recovery scenario rather than a simulated one:

- `7- How To Think About Composition.mp4` was left `CLAIMED` by instance
  `2512-toxuee` when the database became unreachable mid-upload.
- The backend process **did not crash** — `/health` stayed 200 throughout and
  memory held at ~320MB (well under Render's 512MB), with cron ticks logging
  P1001 and retrying rather than dying.
- The row's claim aged past the 20-minute threshold and the reaper returned it
  to `PENDING` for another attempt, with `attempts` already incremented so the
  bounded-retry cap still applies.
- **No manual database intervention was required**, which is the actual bar
  §2.4 sets.

## Automated test results at this point

| Suite | Command | Result |
|---|---|---|
| Backend | `npx jest` | **965 passed / 965** |
| Frontend | `npx jest` | 111 passed / 112 — the single failure is
`lib/pwa/__tests__/platform.test.ts`, **pre-existing and unrelated**: verified
with `git stash push -- lib/pwa/` returning "No local changes to save", i.e.
this work never touched those files. |
| Backend typecheck | `tsc --noEmit` | clean |
| Frontend typecheck | `tsc --noEmit` | clean |

---

# How it behaves (answers to Part 10 §2)

**Admin closes the browser.** Nothing changes. Every piece of state lives in
Postgres and the processors are backend cron jobs; the page is only a viewer.
Reopening the import reconstructs the real state from the database. *On Render
this is unconditional. Locally the backend process must stay running — closing
the terminal pauses execution, but destroys nothing: the import resumes from
its last checkpoint when the backend comes back.*

**Admin pauses.** The import's status flips to `PAUSED` immediately, which
removes it from every claim query, so no new file, video or lesson is picked
up. Anything already in flight is allowed to finish and persist its result
rather than being killed mid-transfer — so the UI shows "Pausing — finishing
the file that was already in progress" until nothing is running, then "Paused".

**Admin resumes.** The import returns to exactly the stage it was in
(`statusBeforePause`), and the processors resume claiming. Completed uploads,
transcripts and lessons are untouched, so work already done is never repeated.

**Admin publishes a partial course.** The first batch creates a real DRAFT
course containing only fully-validated lessons. The admin reviews and publishes
it through the normal workflow — the importer never publishes anything itself.
The import then keeps running. When more lessons finish, "Add N finished
lessons" appends them **into the same course and sections**, as **drafts**, so
learners do not see them until a human publishes them. Adding content to an
approved course returns it to DRAFT for re-approval (existing Teyro behaviour)
while everything already published stays live.

**A later file fails.** It fails alone. Published lessons are untouched, the
rest of the import continues, and the failed item is retryable on its own with
a structured error code explaining whether retrying can help.

## ISSUE-02 — Importer could deadlock permanently on a stalled transfer (CODE DEFECT, FIXED)

Found while investigating why the retest stalled. This is the most serious
defect uncovered tonight.

- **Stage:** upload (Drive → R2)
- **Expected:** a transfer that stops progressing eventually fails, the file
  is retried, and the importer continues.
- **Actual:** the importer stopped permanently. One file sat `CLAIMED` for
  14+ minutes and the other four were never claimed, while the backend stayed
  healthy (`/health` 200, ~320MB, no crash).
- **Root cause:** there was **no timeout anywhere** on the upload path —
  not on `GoogleDriveService#downloadFile`, not on `R2StorageService#uploadStream`,
  not in the processor. A stalled stream never settles, so the `await` in
  `claimAndUpload` never returns, so the `finally { heavyTransferLock.release() }`
  in `tick()` never runs. The lock is **in process memory**, so the 20-minute
  database reaper cannot rescue it: the row returns to PENDING but no tick can
  ever claim it again. One stalled socket = the entire importer dead until a
  manual process restart. On an overnight 100+ video import that is the
  difference between finishing and losing the whole night.
- **Fix:** bounded the whole per-file transfer with `withTimeout(...)`
  (30 minutes — generous, since a real 2GB video on a slow link is legitimately
  slow; this catches *stopped*, not *slow*). On timeout the file fails with
  `STORAGE_TIMEOUT`, the lock is released by the existing `finally`, and the
  file is retried.
- **Regression tests:** two, both of which fail against the old code —
  one asserts the timeout produces `STORAGE_TIMEOUT` rather than hanging, and
  one asserts `heavyTransferLock.tryAcquire()` succeeds afterwards, which is
  the precise property whose absence caused the deadlock.
- **Status:** FIXED, 10/10 processor tests green.

## ISSUE-03 — Upload failures were never auto-retried (CODE DEFECT, FIXED)

- **Expected:** a transient upload failure retries by itself, like
  transcription and lesson generation already do.
- **Actual:** the upload catch set `status: 'FAILED'` unconditionally, so any
  blip parked that file until an admin clicked Retry. For an import meant to
  run unattended overnight, a single 3am network hiccup would silently strand
  a video until morning.
- **Root cause:** the retryability work done earlier was applied to the
  transcription and generation processors but not to the upload processor.
- **Fix:** upload now uses the same rule — `failure.retryable && attempts <
  MAX_AUTO_ATTEMPTS` → back to `PENDING`, otherwise `FAILED`. Terminal codes
  (e.g. `DRIVE_FILE_NOT_FOUND`) still stop immediately rather than burning
  retries.
- **Regression tests:** three — retries a transient failure, stops at the
  attempt cap, and does not retry a terminal code.
- **Status:** FIXED.

*Incidental:* an existing test passed only by accident (`undefined < 3` is
false, so a missing `attempts` field produced FAILED for the wrong reason).
Fixtures now set `attempts` explicitly so the assertion tests the real rule.

## ISSUE-01 — CORRECTED DIAGNOSIS: the outage is local internet, not Supabase

Re-tested while the "database outage" was ongoing, this time checking the
network layer above the database instead of assuming the database was at fault:

```
google.com       000  8.0s   (timeout)
cloudflare.com   000  8.0s   (timeout)
github.com       000  8.0s   (timeout)
supabase.com     000  8.0s   (timeout)
```

**Every major site times out. This machine has no working internet connection.**
DNS still resolves (local/cached resolver), which is why name lookups appeared
to work and made the failure look database-specific.

This almost certainly explains the entire history of "intermittent Supabase
P1001" incidents over the past several days. Every observation fits local
connectivity loss rather than a provider problem:

| Observation | Fits local outage? |
|---|---|
| Supabase status page showed the pooler fully operational | Yes — nothing was wrong there |
| `Test-NetConnection` to the pooler port returned success | Yes — a TCP probe can succeed against a nearby hop / stale path while no real session completes |
| TLS handshake sometimes completed, Postgres handshake did not | Yes — partial connectivity degrades exactly like this |
| New connections failed while the backend's existing pool kept working | Yes — already-established TCP sessions survive brief outages; new ones cannot be opened |
| Self-healed after seconds-to-minutes, repeatedly | Yes — matches flaky Wi-Fi/ISP, not a cloud incident |

**Reclassification:** *infrastructure / local network*, not a Supabase or code
defect. **Actionable for the user:** check the router / ISP / Wi-Fi stability
rather than continuing to investigate Supabase.

This does not change any of the code written tonight — but it does mean the
importer has now been *unintentionally* stress-tested against repeated total
connectivity loss, and it survived every time: no crash, no corruption, no lost
work, and it resumed on its own. That is the resilience §2.4 asks for,
demonstrated under real conditions rather than simulated ones.

## §6.2 — Pause / resume, verified live on the real import

Run against import `0ba0d843-a31e-4f0c-a306-e55dfe7f8aa1` with real files, not
a fixture:

| Step | Result |
|---|---|
| Pause while uploads in progress | `status=PAUSED`, `statusBeforePause=PROCESSING_FILES`, `pausedAt` set, `pausePending=false` |
| Work preserved at pause | 2/5 uploads kept — nothing rolled back or deleted |
| **No new work claimed while paused** | waited 75s (several cron ticks): state stayed `{PENDING:3, UPLOADED:2}` with **zero** `CLAIMED` rows |
| Resume | returned to `PROCESSING_FILES`, the exact remembered stage |
| Continues from checkpoint | uploads advanced 2/5 → 3/5; **the two finished files were not re-uploaded** |

## Live confirmation of the ISSUE-03 fix (auto-retry)

`7- How To Think About Composition.mp4` reached `UPLOADED` with `attempts=2`.
It failed once during the connectivity loss and **retried itself**, rather than
being parked as `FAILED` until someone clicked Retry — which is exactly the
behaviour the fix introduced, observed under a real outage rather than a mock.

## Build verification

| Check | Result |
|---|---|
| `npx nest build` (backend) | success |
| `npm run build` (frontend, production) | success, exit 0 |
| `npx jest` (backend) | **970 / 970 passed** |
| `tsc --noEmit` both sides | clean |

---

# Part 5 — Resource behaviour (confirmed intact)

Nothing about the low-resource design was relaxed to make any of this work:

| Guarantee | State after this work |
|---|---|
| `FILE_BATCH_SIZE = 1` | unchanged |
| One heavy operation at a time | unchanged — `HeavyTransferLockService` still shared between upload and transcription, and now **provably released** even on a stalled transfer (previously it was not) |
| Uploads never overlap transcription | unchanged |
| Streams, never whole files in memory | unchanged; the one `readFile` is the size-capped audio |
| ffmpeg sequential + time-limited + cleaned up | unchanged, plus orphaned temp files now swept at startup |
| Bounded retries with backoff | unchanged, and now applied to uploads too (previously uploads never auto-retried) |
| Failures never crash the process | held throughout a total connectivity loss — `/health` stayed 200, memory ~320MB |

**Multiple imports now queue rather than interleave.** Upload and transcription
already claimed by `f2."createdAt"`, so an older import's files always win.
Lesson generation ordered only by `orderIndex`, which would have run every
import's lesson 0 before any import's lesson 1 — changed to
`ORDER BY l2."createdAt", l2."orderIndex"` so an older import finishes first
while ordering within an import is unchanged.

Concurrency was **not** increased anywhere.

## §6.4 — Previous test course unchanged (verified)

`2265182` re-checked after all of tonight's work and the second import:

```
published=false  review=DRAFT  sections=2  lessons=4
```

Identical to how the first run left it. The retest created a *separate* import
row rather than reusing it, so nothing about the earlier course was touched.

## ISSUE-04 — Two backend instances briefly ran at once (ENVIRONMENT, FIXED)

A restart left the previous `node dist/src/main.js` alive alongside the new one.
This matters specifically because `HeavyTransferLockService` is **per-process**:
two instances mean two heavy operations can run simultaneously, which is exactly
the memory pressure the sequential design exists to prevent. Database claim
locking still prevented double-processing of the same row, so no data was
corrupted.

Killed the older instance and cleared its orphaned claim. Worth remembering when
restarting the backend by hand: confirm only one `dist/src/main.js` process is
running, or the concurrency guarantee is silently void.

## ISSUE-05 — Duplicate-course window on retry (CODE DEFECT, FIXED)

Found on a self-review, and made plausible rather than theoretical by tonight's
connectivity: in `createNewCourse` the course tree was built, then the
per-lesson links were written, and only then was `createdCourseId` recorded on
the import.

Between the course existing and `createdCourseId` being set, **nothing linked
the new course back to the import**. A crash or database blip in that window
would leave a retry taking the "no course yet" branch and building an entire
**second course**.

Fixed by claiming the course id first, then recording the per-lesson links. The
worst case becomes a retry that fills in missing links against the correct
course, instead of one that duplicates the course. A regression test pins the
ordering, since it is a subtle invariant that is easy to reverse.

## Final verification

| Check | Result |
|---|---|
| Backend tests | **971 / 971 passed** |
| Backend typecheck | clean |
| Backend build | success |
| Migrations applied to the database | **3 / 3** (`applied_2026092x=3`) |
| Upload stage of the retest | **complete — all 5 files UPLOADED** |
| Previous course `2265182` | unchanged (`published=false review=DRAFT sections=2 lessons=4`) |

## Live resource measurement during transcription

Measured while the importer was actively downloading a video for audio
extraction (i.e. during the heaviest part of the pipeline):

```
backend RSS: 281 MB
/health:     200
```

Comfortably inside Render's 512MB free-tier ceiling while doing real transfer
work, which is the property the sequential design exists to protect. For
comparison, the original concurrent design OOM-crashed that same instance size
repeatedly.

Transcription is confirmed working on the retest: `7- How To Think About
Composition.mp4` transcribed on attempt 1, and its temp video/audio files were
cleaned up afterwards (temp directory empty between jobs), so the disk-safety
behaviour holds too.

---

# Part 6 — SECOND END-TO-END TEST: COMPLETE

**New course created: `1407549`** — "Hayden Hillier Video Editing Course (retest)"
Import `0ba0d843-a31e-4f0c-a306-e55dfe7f8aa1`. Every stage ran through the real
services, from a fresh import, with the previous course left alone.

## Stages

| Stage | Result |
|---|---|
| Discovery | 5 files, matching the source folder |
| Upload | **5/5 uploaded** (survived several total connectivity losses) |
| Transcription | **4/4 transcribed, 0 failures** |
| Structure analysis | **"Level one" + "Level Two"** — multi-section grouping reproduced |
| Lesson generation | **4/4 generated, 0 failures** |
| Course creation | **course `1407549`**, 2 sections, 4 lessons |

## Verified course

```
COURSE 1407549 | Hayden Hillier Video Editing Course (retest)
published = false | reviewStatus = DRAFT | category = Video Editing
 SECTION 0 Level one
   - How To Think About Composition   applyQ=7  video=set  res=0
   - Bonus Level 1 Homework           applyQ=7  video=set  res=1
 SECTION 1 Level Two
   - Why Genre Editing Matters        applyQ=8  video=set  res=0
   - Drama Editing                    applyQ=8  video=set  res=0
APPLY 5-15 VIOLATIONS: 0
```

Every lesson carries a real video, valid Apply/Reflect/Deepen, and an Apply
count inside 5–15. The course is DRAFT and unpublished — the importer never
published anything.

## §6.3 — Incremental append, proven live (not just unit tested)

Two separate checks:

**1. Idempotency.** Re-running `create-course` against the finished import was
refused with *"Every lesson that has finished generating is already in the
course."* That proves the append branch ran, read the `createdLessonId` links,
and correctly declined — rather than building a second course.

**2. A genuine append.** To give the append real work, one lesson
("Drama Editing") was removed from the course and its link cleared, simulating a
lesson that had only just finished generating. Re-running produced:

```
APPENDED TO COURSE 1407549      <- same course, not a new one
      "title": "Level Two"      <- only the affected section touched
          "title": "Drama Editing"   <- only the missing lesson added
```

Verified afterwards:

```
Level one: How To Think About Composition | Bonus Level 1 Homework
Level Two: Why Genre Editing Matters | Drama Editing
total lessons = 4 | apply violations = 0 | duplicates = 0
courses named "Hayden Hillier" = 2   (the original 2265182 + this retest)
```

**No duplicate course, no duplicate lessons, no disturbance to the lessons that
were already there, and the course stayed DRAFT throughout.**
