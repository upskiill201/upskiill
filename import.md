# AI Course Importer — Status Summary

_Last updated: 2026-09-20_

## What this tool does

Admin-only pipeline: pick a Google Drive folder → videos/documents move into
Teyro's storage → each video gets transcribed → AI turns each transcript into
a real Learn/Apply/Reflect/Deepen lesson → admin reviews and clicks
"Create course" → a real DRAFT course appears in Course Builder, exactly as
if a human had built it by hand. Nothing is published or submitted for
review automatically — that stays a separate, deliberate admin action.

## What's built and working (Phases 1–7, all complete)

- **Google Drive OAuth connect** — folder browsing, preview, encrypted
  refresh token storage. Fixed a real bug this session: the OAuth callback
  route can never carry the frontend's login cookie (Google redirects
  cross-domain, straight to the backend) — it now authenticates via the
  encrypted `state` param instead, the standard pattern for this exact case.
- **File upload (Drive → R2)** — Postgres claim-queue background job (no
  Redis), one file at a time.
- **Transcription** — originally Gemini's native video understanding;
  **replaced this session** with Groq's Whisper endpoint (see "The Gemini →
  Groq Whisper switch" below).
- **AI lesson content generation** — Groq (OpenAI-compatible), separate
  dedicated provider credential from whatever serves live Tey nudges, so a
  bulk import can never compete with real nudge traffic or budget.
- **Course creation** — `CourseCreationService` facade wraps the exact same
  `CourseService`/`LessonService` calls the manual Course Builder uses, so an
  imported course is indistinguishable from a hand-built one. Per-lesson
  failure isolation: one bad lesson never blocks the rest.
- **Admin review UI** — live progress page, per-file/per-lesson retry and
  regenerate, "Create course" gated so it can't be clicked with zero
  successfully-generated lessons.
- **Cost/reliability guardrails** — a dedicated daily $ + call-count budget
  cap for course-import AI calls (separate from Tey's own budget), best-effort
  R2 cleanup when an import is cancelled, auto-retry with growing backoff on
  transient provider errors.

## The Gemini → Groq Whisper switch (this session's biggest pivot)

A real 40-video course import on staging exposed three compounding problems:
1. **Gemini's free tier couldn't sustain the volume** — repeated "model
   overloaded" 503s once dozens of transcription requests queued up in a
   short window. Not a bug, a genuine free-tier capacity ceiling.
2. **Render's free-tier backend (512MB RAM, 0.1 CPU) kept OOM-crashing** —
   confirmed via Render's own event log ("Ran out of memory, used over
   512MB"), repeatedly, over hours. Root cause: the file-upload processor and
   the transcription processor are separate background jobs with no
   coordination between them — both could stream a large (300–700MB) file
   at once, on a server with almost no memory margin.
3. **Paying for Gemini isn't an option right now** — budget is tight and
   shared across other priorities, not just this tool.

Decision: replace Gemini for transcription with **Groq Whisper**, which is
free but audio-only (can't watch a raw video the way Gemini can). Fix:
extract just the audio track locally with **ffmpeg** (`ffmpeg-static` — a
plain npm dependency, no server config needed) before uploading — the video
itself never leaves the server. At a bitrate tuned for speech (not music),
even a full 1-hour lesson's audio comes out under Groq's 25MB limit, so no
chunking logic was needed.

Net effect on server load: **less** bandwidth per video than the old
approach (audio-only upload instead of re-uploading the whole video to
Google), but a genuinely new CPU-bound step (ffmpeg's decode/encode) the
server has never had to do before.

**Verified working locally**, once (a real video, full pipeline, succeeded
on the first attempt, produced an accurate transcript) — see "What's not yet
proven" below for why that's one data point, not a scale-proof.

## Also fixed this session (hardening, found via real testing)

- **Concurrency cut to fully sequential.** File upload was claiming 2 files
  at once; now 1, matching transcription and generation (both already 1).
- **A shared in-process lock** so upload and transcription — the two heavy
  file-streaming stages — can never run at the same moment, even though
  they're separate cron jobs with independent schedules.
- **Transcription now waits for the entire upload phase to finish** before
  starting on an import at all (previously could start once any file
  finished, overlapping with others still uploading).
- **Encryption key mismatches, twice.** AI provider API keys and (separately)
  the ffmpeg/Groq pipeline both broke with "Unsupported state or unable to
  authenticate data" — local dev and the deployed backend must use the
  *same* `EARNINGS_ENC_KEY`, since they share one database. Fixed by copying
  the real key from Render into local `.env`.
- **DB connection pool exhaustion.** Staging's database was on Supabase's
  "session mode" pooler (a ~15-connection ceiling, shared by everything
  touching that database — the backend, ad-hoc scripts, everything). Fixed
  by switching to the transaction-mode pooler (port 6543,
  `pgbouncer=true`), matching what production already correctly used.
- **Render build was OOM-crashing** (separate from the runtime crashes) —
  `nest build`'s TypeScript compile needs more than Node's default heap.
  Fixed by baking `NODE_OPTIONS=--max-old-space-size=4096` into the build
  script itself (via `cross-env`, so it also works on Windows), not relying
  on every environment remembering to set it.
- **The OpenAI-compatible schema-compliance bug** — Groq's JSON mode only
  guarantees valid JSON syntax, never actually reads field-name/length
  constraints unless they're spelled out as text in the prompt (unlike
  Gemini's native structured output). Fixed at the adapter level so it holds
  for any future OpenAI-compatible provider, not just this one call site.
- **Import progress page stopped polling** during the exact window
  transcription was actually running (a status was missing from the
  auto-refresh list) — silent until a manual refresh.
- **"Create course" button showed up even with zero successfully-generated
  lessons** — backend already refused to build an empty course, but the
  button inviting a doomed click is now hidden in that case.

## Current infrastructure state

- **Render (both staging and production backends) is currently suspended**
  — the free Hobby workspace hit its 5GB/month bandwidth cap, largely from
  the 40-video test's heavy Gemini video re-uploads. Resets automatically
  next month; not paying to restore it early right now (budget is ~$50 total,
  earmarked for more than just this tool).
  - **Real, live impact:** the marketing/blog pages on teyro.app still load
    fine (mostly static, Vercel-hosted, unaffected). Anything needing the
    backend — course pages, sign-up, login — is currently broken for real
    visitors, including some organic Google traffic.
- **All further building and testing is happening locally** (localhost
  backend + frontend) — this doesn't touch Render's bandwidth at all, so it's
  safe to keep working without making the suspension worse.
- **Nothing from this session's Gemini→Groq/ffmpeg switch or the
  concurrency/lock fixes has been pushed anywhere yet** — still local-only,
  per instruction to hold everything until it's genuinely proven.
- Everything through Phase 7 (see above) **is** pushed to the `staging`
  branch already, from earlier in this session, before the 40-video test
  revealed the scale problems.

## What's not yet proven

- The new Groq Whisper/ffmpeg pipeline has succeeded exactly **once**, on
  one video, locally. Not yet tested: a full course's worth of videos back
  to back, ffmpeg's real CPU behavior under Render's 0.1 CPU allocation
  (can only be measured once actually deployed, not locally), very long
  videos, or videos with unusual codecs ffmpeg might handle differently.
- **Multi-section course structure — confirmed gap, not yet fixed.** The
  Google Drive folder walker recurses into subfolders but discards which
  subfolder each file came from before that information ever reaches the
  step that groups files into lessons. Right now, no matter how a course is
  organized into Section 1 / Section 2 folders in Drive, everything lands in
  **one single section** in Teyro. Most real courses have multiple sections,
  so this needs fixing before the tool is trustworthy for real course
  imports, not just flat-folder test cases.
- **Resource-file attachment needs re-checking once sections are real.**
  Non-video files currently attach to "the nearest preceding video" in one
  flat list — once files are properly grouped by section, this logic needs
  to work correctly *within* each section, not just globally.

## Next steps, in order

1. **Build real subfolder-aware section grouping** — track each file's
   parent folder all the way from the Drive walk through to
   `CourseImportModule` creation, so Drive's Section 1/Section 2 folders
   become two real sections in Teyro, not one flattened list.
2. **Fix resource-file attachment to work correctly per-section** once (1)
   is in place.
3. **Test locally** with a real multi-section course (the next concrete
   test: 2 sections, 2 videos + 2 files each) to confirm both of the above
   actually work before trusting them.
4. **Keep testing locally, at increasing scale**, until confident — no
   pushing until genuinely proven, since Render is suspended anyway right
   now.
5. **Once Render's bandwidth resets next month** (or a paid decision is
   made — still open, not decided): push everything to `staging`, redo a
   real full-scale (40+ video) test against the actual deployed service
   this time, watching Render's memory/CPU for real (something only
   observable once actually deployed, not locally).
6. **Only after that's proven at real scale**: consider promoting to
   production — which still needs its own env var setup from scratch
   (Google Drive OAuth redirect URI + Google Cloud Console entry, R2
   credentials, AI provider keys re-added through production's own admin UI
   since it's a separate database) — none of that exists on production yet.
