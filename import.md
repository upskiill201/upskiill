# AI Course Importer — Status Summary

_Last updated: 2026-09-21_

## What this tool does

Admin-only pipeline: pick a Google Drive folder → videos/documents move into
Teyro's storage → each video gets transcribed → AI turns each transcript into
a real Learn/Apply/Reflect/Deepen lesson → admin reviews and clicks
"Create course" → a real DRAFT course appears in Course Builder, exactly as
if a human had built it by hand. Nothing is published or submitted for
review automatically — that stays a separate, deliberate admin action.

## What's built and working

- **Google Drive OAuth connect** — folder browsing, preview, encrypted
  refresh token storage. The OAuth callback authenticates via the encrypted
  `state` param, because Google redirects cross-domain straight to the
  backend and can never carry the frontend's login cookie.
- **File upload (Drive → R2)** — Postgres claim-queue background job (no
  Redis), one file at a time, with a bounded transfer timeout.
- **Transcription** — ffmpeg extracts audio locally, Groq's Whisper endpoint
  transcribes it (see "The Gemini → Groq Whisper switch" below). Audio over
  the provider's 25MB cap is split and transcribed in order rather than
  failing.
- **Multi-section course structure** — a course root's direct subfolders
  become real Teyro sections; deeper nesting inherits its parent section.
  Resource files attach to the nearest preceding video **within their own
  section**, so a PDF can never leak across a section boundary.
- **AI lesson content generation** — Groq (OpenAI-compatible), on a separate
  provider credential from live Tey nudges, so a bulk import can never
  compete with real nudge traffic or budget.
- **Course creation** — `CourseCreationService` wraps the exact same
  `CourseService`/`LessonService` calls the manual Course Builder uses, so an
  imported course is indistinguishable from a hand-built one. Per-lesson
  failure isolation: one bad lesson never blocks the rest.
- **Pause / resume** — a real suspend, not a UI button. Pausing stops new
  work being claimed immediately, but lets an in-flight transfer finish and
  persist rather than killing it. Resuming returns to the exact stage and
  continues from the last checkpoint; completed work is never redone.
- **Incremental publishing** — a large course can be imported in batches. The
  first batch creates a DRAFT course from whatever is ready; later batches
  append into that **same** course and sections. `createdLessonId` /
  `createdSectionId` links make repeat calls idempotent, so a retry can never
  duplicate a lesson, and sections match by id rather than title so renaming
  one cannot fork a copy.
- **Learner safety** — only fully-validated lessons are ever written into a
  course, and lessons appended to an **already-published** course are created
  as drafts, so unreviewed AI content is never learner-visible.
- **Admin progress UI** — stage-based progress weighted across the whole
  pipeline (uploads no longer sit at a misleading 100% while hours of
  transcription remain), a live "currently working on X" line, plain-English
  error explanations per failure code, and retry buttons that hide themselves
  when retrying genuinely cannot help.
- **Cost/reliability guardrails** — dedicated daily $ + call-count budget cap
  for import AI calls, best-effort R2 cleanup on cancel, bounded auto-retry
  with backoff, and structured error codes that distinguish retryable from
  terminal failures.

## The Gemini → Groq Whisper switch

A real 40-video course import on staging exposed three compounding problems:
Gemini's free tier couldn't sustain the volume (repeated "model overloaded"
503s), Render's free-tier backend (512MB RAM, 0.1 CPU) kept OOM-crashing from
concurrent large-file transfers, and the whole thing burned through Render's
monthly bandwidth.

The response: transcription now downloads the video, extracts **audio only**
with ffmpeg locally, and uploads that (a few MB) to Groq's Whisper endpoint.
Heavy work is strictly sequential — one upload or one transcription at a time,
never both — coordinated by a shared in-process lock.

## Proven end to end

The full pipeline has produced three real DRAFT courses from the same
"Hayden Hillier Video Editing Course" Drive folder (2 sections, 4 videos,
1 resource):

| Course | How |
|---|---|
| `2265182` | first full run |
| `1407549` | second full run, from a fresh import, to prove repeatability |
| `1437112` | founder's own manual run through the admin UI |

Each came out with the correct two sections, four lessons in order, the
resource attached to the right lesson, a real video on every lesson, valid
Apply/Reflect/Deepen content, **5–15 Apply questions on every lesson**, and
`published: false` / `reviewStatus: DRAFT`.

Also exercised against real data, not fixtures:
- **Pause/resume** — paused mid-run, confirmed zero rows claimed across
  several cron ticks, resumed, and finished uploads continued without
  re-uploading anything already done.
- **Stale-claim recovery** — a backend restart mid-transcription orphaned a
  claim; the reaper returned it to PENDING and it transcribed on attempt 2,
  with no manual database intervention.
- **Incremental append** — a lesson was removed and re-added, landing in the
  correct existing section with no duplicate course and no duplicate lessons.
- **Auto-retry** — a file failed during a real connectivity loss and retried
  itself rather than being stranded.

## Real numbers

- **65 minutes wall clock for 4 videos / 477 MB** on the founder's manual run
  — but ~22 of those minutes were a stale-claim wait caused by a mid-run
  backend restart during debugging. A clean run of this course is closer to
  **~40 minutes**.
- Extrapolating linearly (which is what sequential processing means): a
  **100-video course is roughly 12 GB and 15–20 hours**.
- **Bandwidth is the real ceiling.** Each video is streamed Drive → backend →
  R2, so roughly one full video-size of egress per video. ~12 GB of video is
  ~12 GB of egress. The earlier 40-video test hit ~7.8 GB and suspended the
  Render workspace, which matches this arithmetic closely.

**Conclusion: the importer is not the limiting factor for large courses —
Render's free tier is.** A 100-video course would exhaust the bandwidth
allowance well before finishing.

## Current infrastructure state

- **Render is still suspended** (free-tier bandwidth cap). Vercel is
  unaffected and builds normally.
- **Everything is now committed and pushed to `staging`** (commit
  `23b44ac`). Vercel will build the frontend.
- **Two consequences of Render being down**, worth expecting rather than
  being surprised by:
  1. The three new migrations apply on Render's next deploy, so the backend
     code and the staging schema are briefly out of step. (The staging
     *database* already has all three applied — they were run against it
     during development.)
  2. The deployed frontend expects new API fields (`pausePending`,
     `errorCode`, `addedToCourse`). Against the stale backend these read as
     `undefined` — pages won't break, but pause/resume and error
     explanations won't do anything until Render redeploys.

## What's still not proven

- **Scale.** The largest real run is 4 videos. Nothing has been tested at
  30, 40 or 100 videos under the current architecture.
- **Render's actual CPU behaviour.** ffmpeg on a 0.1 CPU allocation can only
  be measured once deployed, not locally.
- **Long-video chunking.** The splitting code exists and its sizing maths is
  unit-tested, but no video has actually needed it yet.
- **Appending to a genuinely published course.** The draft-only behaviour is
  unit-tested; proving it live would mean publishing a course to learners,
  which is deliberately left as a human decision.

## Known open issue

**Intermittent database connection drops** (Prisma `P1001`) recurred
throughout development. Two confident diagnoses turned out to be wrong: it
was blamed first on local internet, then on connection-pool fragmentation.
Both were real findings — three modules were bypassing the `@Global`
PrismaService and opening 4 pools instead of 1, now fixed — but neither
stopped the flapping. TCP, TLS and Supabase's own REST API all stay healthy
while only the Postgres connection drops, so it is not general connectivity.
**Still unexplained.** The decisive evidence would be Supabase's
**Database → Connection Pooling** stats during an outage, showing whether
connections are being rejected at the pooler.

Worth noting: the importer survived every one of these outages without
crashing, corrupting state, or losing work — it resumed on its own each time.

## Next steps, in order

1. **Wait for Render's bandwidth to reset** (or decide to pay). Nothing
   backend-side can be verified on staging until it redeploys.
2. **Once Render is back:** confirm the three migrations apply cleanly and
   the deployed frontend and backend line up again.
3. **Import a few small real courses on staging first** — enough to build
   confidence and to watch Render's memory/CPU under real ffmpeg load, which
   has never been observed.
4. **Do not attempt a 100-video course on the free tier.** It will suspend
   mid-import. Paid infrastructure first — this is the one place the spend is
   genuinely unavoidable.
5. **Worth doing before bulk imports:** transcription currently re-downloads
   each video from R2 to extract audio. Extracting audio during the initial
   Drive → R2 stream would remove that entire second transfer — a meaningful
   saving in time and disk (though not in egress).
6. **Production promotion** still needs its own env setup from scratch:
   Google Drive OAuth redirect URI + Google Cloud Console entry, R2
   credentials, and AI provider keys re-added through production's own admin
   UI, since it is a separate database. None of that exists on production yet.
