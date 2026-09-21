# AI Course Importer — Full Context Handoff

This document is for another AI assistant that will help debug/extend this feature. It has no prior context on this codebase or this project — everything relevant is below.

## 1. What this tool is and why it exists

Teyro is a gamified learning platform (Duolingo-style: Learn → Apply → Reflect → Deepen lesson structure). The founder is a solo operator who currently builds every course by hand: organizing structure, uploading videos one by one, writing Apply/Reflect/Deepen content, pushing it through an existing Course Builder UI — even when the raw material (videos, PDFs, slides) already exists in a Google Drive folder.

**Goal:** an admin-only "AI Course Importer" that takes a Google Drive folder and produces a Teyro course **draft**, using the exact same course/lesson database schema and publishing workflow as the manual Course Builder (never a parallel system). The founder still reviews and approves every draft before it goes live — this tool never auto-publishes.

## 2. Tech stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Redux, Tailwind CSS v4. Deployed to Vercel.
- **Backend:** NestJS 11, Prisma ORM, PostgreSQL via Supabase, Firebase Admin SDK for auth. Deployed to Render.
- **Storage:** Cloudflare R2 (S3-compatible), migrated from AWS S3 in Sept 2026.
- **No Redis, no queue infra (Bull/BullMQ).** Background jobs use a Postgres-native claim pattern: `UPDATE ... FROM (SELECT ... FOR UPDATE SKIP LOCKED)`, polled by NestJS `@nestjs/schedule` cron jobs.
- Repo is a monorepo (`frontend/`, `backend/`), work happens on a git worktree at `.claude/worktrees/ai-course-importer`, branch `feat/ai-course-importer-phase1`.

## 3. The intended pipeline (7 phases)

1. **Google Drive OAuth** — one-time per-admin connect, so the backend can browse/download from Drive server-side.
2. **Folder selection & file discovery** — admin picks a root Drive folder. The backend recursively walks it: a course root's **direct subfolders** become course "sections" (deeper nesting inherits the parent section, doesn't create new ones). Files get categorized (video/document/presentation/image/other) by mimeType.
3. **Upload phase** — every file gets streamed Drive → backend → R2 (server-side, not browser-direct like every other upload path in this product). One file at a time (see §5, concurrency decision).
4. **Transcription phase** — once ALL files for an import finish uploading, each video gets downloaded again, audio-only extracted via ffmpeg, and sent to a speech-to-text API to produce a transcript. One file at a time, gated to only start after upload phase fully completes.
5. **Structure analysis** — files get grouped into modules (one per section) and lessons (one per video, in order); any non-video resource file attaches to the nearest **preceding** video within its own section.
6. **AI content generation** — each lesson's transcript is sent to an AI provider to generate Apply/Reflect/Deepen content (Learn phase = the video itself). Output is validated against a strict JSON schema before touching the database.
7. **Admin review handoff** — the resulting course lands as an ordinary DRAFT in the *existing* Course Builder / course-review UI (`/admin/courses/[id]`) — this tool never builds its own separate review screen.

Every step is resumable/retryable **per file or per lesson** — one failure must never block or lose the rest of the batch.

## 4. Key architectural decisions and why

- **Reuse existing domain services, don't duplicate.** `course.service.ts`, `lesson.service.ts`, `course-review.service.ts` already implement course/section/lesson creation, optimistic locking (`version` field, 409 on mismatch), and the review state machine (`DRAFT → SUBMITTED → UNDER_REVIEW → APPROVED`, with `published` as a separate boolean gated on `APPROVED`). The importer's `CourseCreationService` wraps these rather than writing new create logic.
- **No Redis/queue library.** Background processing follows the existing `TeyScheduledAction` pattern already in the codebase: a Postgres table with status columns, claimed via `FOR UPDATE SKIP LOCKED` raw SQL, polled by cron. New tables: `CourseImport`, `CourseImportFile`, `CourseImportModule`, `CourseImportLesson`, each with their own status/claim columns.
- **Backend needs its own R2 client.** Every other upload in the product is browser-direct-to-R2 via presigned URLs from Next.js API routes (`frontend/lib/uploadS3Server.ts`). This is the first time the NestJS backend touches object storage directly, because Drive→R2 transfer is server-orchestrated (no browser in the loop). New: `backend/src/storage/r2-storage.service.ts`.
- **AI provider abstraction already existed** ("Tey Intelligence Layer" under `backend/src/tey/ai/`) — encrypted-at-rest API keys (AES-256-GCM, reusing the same envelope as payout credentials), multi-provider adapters (OpenAI-compatible, Anthropic, Gemini), budget caps. Reused, but needed larger token/timeout bounds than its original nudge-copy use case.
- **Validation is stricter here than the rest of the platform.** Course/lesson creation elsewhere uses hand-rolled validation, not class-validator DTOs, and `contentBlocks` is typed `any` with no nested shape checks. Since nothing downstream catches a malformed AI-generated block, the importer's own validation has to be the safety net.
- **Sequential processing, not parallel, by deliberate tradeoff.** See §5 — chosen over concurrency for infrastructure-cost reasons, revisit post-launch.

## 5. The concurrency decision (important context)

A real end-to-end test with a 40-video course exposed two infrastructure limits:

- **Render free tier is 512MB RAM / 0.1 CPU.** Concurrent large-file transfers (a video upload and a transcription download happening at the same time) reliably OOM-crashed the instance, confirmed via Render's own event log.
- **Render free tier has a 5GB/month bandwidth cap.** The 40-video test's heavy re-uploads (Drive → backend → R2, plus Gemini's video-understanding calls at the time) blew through it, suspending both staging and production backends for the rest of the month.
- **Gemini's free tier hit 503 "model overloaded"** at that volume — a genuine capacity ceiling, not something fixable in our code.

**Decisions made in response, all explicitly confirmed with the founder:**
- Cut upload/transcription batch size to 1 (`FILE_BATCH_SIZE = 1`), added a shared in-process mutex (`HeavyTransferLockService`) so upload and transcription processors never run a heavy stream at the same time, and gated transcription to only start once the entire upload phase is done (not per-file).
- Replaced Gemini's native video-understanding transcription with a self-hosted pipeline: `ffmpeg-static` extracts audio-only (mono, 16kHz, 40kbps — small enough that even a 1-hour lesson stays under Groq's 25MB cap), sent to Groq's Whisper endpoint (`whisper-large-v3-turbo`), which is free-tier and reuses the same encrypted provider credential already used for AI content generation.
- **This is intentionally accepted as "slow but free" for now.** The founder's own words: course importing is a pre-launch tool used before real users/revenue exist; once there's revenue, infrastructure gets upgraded and concurrency limits can be relaxed. Do not "fix" this by silently re-adding concurrency — it was a deliberate, cost-driven tradeoff, not an oversight.
- All of this work was built and tested **entirely locally** (not touching Render's bandwidth) specifically because Render was suspended; the plan is to push to staging only once proven locally AND Render's bandwidth resets.

## 6. Real bugs found and fixed this session (read carefully — these are exactly the kind of edge case still likely lurking elsewhere)

1. **Encryption key mismatch (hit twice).** Local dev and deployed environments share one Supabase database, so encrypted-at-rest provider credentials (AES-256-GCM) written by one environment can't be decrypted by another unless they share the same `EARNINGS_ENC_KEY`. Fixed permanently by copying the real key from Render into local `.env`.
2. **DB connection pooling.** Supabase's session-mode pooler (port 5432) has a small (~15) connection ceiling shared across everything touching that database. Switched local/staging to the transaction-mode pooler (port 6543, `pgbouncer=true`, `connection_limit=5`) — production already used this correctly.
3. **Render build OOM.** `nest build`'s default Node heap limit was too small on Render's build machine. Fixed via `NODE_OPTIONS=--max-old-space-size=4096`, wrapped in `cross-env` for Windows/Linux parity.
4. **OpenAI-compatible provider schema compliance (two rounds).** `response_format: {type:'json_object'}` only guarantees syntactically valid JSON — it does NOT enforce field names or array length constraints unless spelled out as text in the prompt (unlike Gemini's native `responseSchema`). First bug: wrong field names entirely (model invented its own). Second bug, after fixing that: correct field names but ignored `maxItems` bounds. Fixed by embedding the full schema (including `minLength`/`maxLength`/`minItems`/`maxItems`) as text in the system prompt.
5. **Trailing-space filenames breaking storage URLs (found today).** Some real Google Drive files have a trailing space in their name (e.g. `"Drama Editing.mp4 "`). The R2 object-key builder sanitized the filename's base portion but NOT its extension, so the extension carried the trailing space straight into the storage key/URL. R2 stored the object fine (byte-for-byte, space included), but `fetch()`'s WHATWG URL parser silently strips trailing whitespace from URL strings before making the request — so every later attempt to download that file for transcription requested a *different, non-existent* URL and got a 404. **Fixed at two layers:** (a) trim the filename before building the key, so future uploads never have this problem, and (b) percent-encode key segments when building the public URL (`encodeURIComponent` per path segment), so any future stray characters survive correctly regardless. Existing already-uploaded files needed their stored `storageUrl` regenerated from their (correct) `storageKey` to unblock them.
6. **Process-crashing stream bug (found today, more serious).** In the video-download step before transcription: `Readable.fromWeb(res.body).pipe(file).on('error', reject)` — `.pipe()` returns the *destination* stream, so `.on('error', ...)` chained onto it only catches errors on the write side, never the read side. When a download exceeded its 10-minute abort timeout (more likely under degraded network conditions — see §7), the resulting error fired on the *source* stream with no listener attached, which Node treats as an uncaught exception and **crashes the entire Node process** — not just that one file. This meant an entire backend restart was needed for what should have been one failed-and-retried file. Fixed by replacing the manual `.pipe()`/event-listener pattern with `stream/promises`'s `pipeline()`, which correctly propagates errors from either side and tears down both streams. **This bug is a strong signal to audit every other manual `.pipe()` call in the codebase for the same pattern** — it was clearly copy-pasted or written the same way elsewhere and may not have been caught yet.
7. **`nest start --watch` dev-server instability.** The TypeScript watch compiler restarted the whole backend process every ~10 seconds due to spurious file-change events (no real source files were actually modified — confirmed via `find -newermt`), likely Windows filesystem-event noise. Each restart killed in-flight DB connections mid-request, which looked exactly like the intermittent Supabase connectivity issue below and caused real confusion diagnosing it. **Workaround used: run a one-shot `nest build` + `node dist/src/main.js` instead of watch mode for any test session where stability matters.** This is a real annoyance for local dev broadly and worth investigating root cause (possibly excluding `dist/` more aggressively from whatever underlying watcher, or an IDE extension's own touch of files) rather than just working around it forever.
8. **Section-grouping `null` vs `undefined` bug.** New section-grouping logic (`groupBySection()`) bucketed files by `file.sectionFolderId`, treating `undefined` and `null` as different bucket keys even though both mean "no section" — a file with `sectionFolderId === undefined` (common in code paths that never explicitly set it) fell into the wrong branch and got `title: undefined` instead of the course's own title. Fixed by normalizing to `?? null` at the bucketing step. Caught via the existing test suite, not live testing — good argument for keeping/expanding unit test coverage on this file specifically.

## 7. Unresolved / ongoing issue — intermittent Supabase connectivity

Throughout this session, the local backend intermittently failed to reach the Supabase connection pooler (`aws-1-eu-west-1.pooler.supabase.com:6543`) with Prisma error `P1001` ("Can't reach database server"), lasting anywhere from a few seconds to about 8 minutes at a time, recurring roughly 6+ times over a few hours, always self-healing.

**Ruled out:**
- Supabase's own status page showed the connection pooler and `eu-west-1` region fully operational throughout — no platform-wide incident.
- The founder confirmed both staging and production Supabase projects are actively running (not paused).
- Raw TCP and TLS handshakes to the pooler succeeded instantly, every single time tested, including during active outage windows (verified via `Test-NetConnection` and `openssl s_client -starttls postgres`, which got a full valid certificate chain).

**Not ruled out / not yet diagnosed:**
- The failure is specifically in the Postgres protocol handshake *after* a successful TCP/TLS connection — consistent with either (a) something specific to this local machine/ISP's routing to that AWS region, or (b) transient project-level pooler connection-limit contention on Supabase's side that wouldn't show on their public status page. Nobody has yet confirmed which by checking Supabase's own **Database → Connection Pooling** dashboard stats for active/rejected connections during an active blip, or by testing from a different network (e.g. phone hotspot) to see if it's local-network-specific.
- **This is a real open question, not something "fixed" this session** — worth prioritizing a real diagnosis if it keeps disrupting work, since it's currently being treated as "wait it out," which isn't sustainable.

## 8. Current state (as of this session)

**Built and locally tested:**
- Full pipeline phases 1–6 (Drive OAuth → upload → transcription → structure analysis → AI generation → review handoff).
- Multi-section Drive folder support (subfolders → course sections), including per-section resource-attachment scoping.
- Sequential-only concurrency model with shared heavy-transfer lock.
- Groq Whisper + ffmpeg transcription pipeline (replacing Gemini).
- Full backend test suite passing (66 suites / 903 tests) after today's fixes.

**Tested against one real course today** (a real Google Drive folder, 5 files: 4 videos + 1 text file) via the admin UI, uncovering and fixing bugs #5 and #6 above.

**Not yet proven:**
- A full run finishing cleanly end-to-end (upload → transcript → AI generation → a real course draft visible in Course Builder) without manual intervention. Today's test got as far as transcription; AI generation and course creation haven't been exercised in this round yet.
- The multi-section grouping code has unit test coverage but hasn't been proven against a real multi-section Drive folder (the founder's next planned test: 2 sections × 2 videos × 2 files each).
- A real 40-video-scale run has not been retried since the Groq/ffmpeg switch and concurrency fixes — the original test that surfaced the OOM/bandwidth issues used the old Gemini-based pipeline.

**Deployment status:** all of today's and recent work is local-only, not pushed to any branch/remote, by explicit standing instruction — the plan is to push to `staging` only once proven locally and Render's monthly bandwidth resets (it was suspended from the earlier 40-video test's bandwidth usage).

## 9. What "fixing this tool" should actually mean going forward

Given the pattern of bugs found today (§6, items 5 and 6 especially), the real risk isn't any single bug — it's that this pipeline has only been run against real data a handful of times, and each real run has found something. Priorities, roughly in order:

1. **Audit for more instances of the `.pipe()`/error-handling bug (#6)** anywhere else in the codebase that streams data (uploads, downloads, file processing) — it's the kind of bug that's easy to copy-paste unknowingly.
2. **Run the pipeline to full completion** at least once (through AI generation and course creation) to prove the later stages work as well as the earlier ones have now been proven.
3. **Diagnose the Supabase connectivity issue properly** (§7) rather than continuing to treat it as background noise — it's eaten significant debugging time by masking itself as other problems.
4. **Test the real multi-section scenario** (2 sections × 2 videos × 2 files) end-to-end, since that code path only has unit coverage so far.
5. **Only after 1–4:** retry a large-scale (30-40 video) run against staging, once Render's bandwidth resets, to confirm the concurrency/OOM fixes actually hold up at real scale — the original problem that started this whole detour.
