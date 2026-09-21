import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { spawn } from 'child_process';
import { createWriteStream } from 'fs';
import { mkdir, readdir, readFile, rm, stat, unlink } from 'fs/promises';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';
import ffmpegPath from 'ffmpeg-static';
import { AiConfigService } from '../tey/ai/ai-config.service';
import { AiBudgetService } from '../tey/ai/ai-budget.service';
import {
  CourseImportError,
  codeForHttpStatus,
} from '../course-import/course-import-error';

/** Groq's own limit for the Whisper endpoint. Audio extracted at
 *  AUDIO_BITRATE_KBPS stays well under this for any realistic lesson
 *  length — see the module doc comment below for the math. */
export const MAX_AUDIO_BYTES = 25 * 1024 * 1024;
const DOWNLOAD_TIMEOUT_MS = 10 * 60 * 1000;
const FFMPEG_TIMEOUT_MS = 5 * 60 * 1000;
const UPLOAD_TIMEOUT_MS = 5 * 60 * 1000;
/** Mono, 16kHz (Whisper's own internal rate — anything higher is wasted
 *  bytes), 40kbps — tuned for spoken word, not music. A full 1-hour lesson
 *  comes out well under Groq's 25MB cap at this rate (≈18MB), so this
 *  deliberately doesn't implement chunking for longer files; if a real
 *  import ever needs a video longer than that, it'll fail clearly rather
 *  than silently truncate, and chunking can be added then. */
const AUDIO_BITRATE_KBPS = 40;
/** Target size per chunk when a lesson's audio exceeds MAX_AUDIO_BYTES.
 *  Deliberately under the hard cap: MP3 frame/container overhead means a
 *  segment's real size drifts a little above the nominal bitrate maths, and
 *  a chunk that lands over the limit would fail the whole lesson. */
const TARGET_CHUNK_BYTES = 20 * 1024 * 1024;
/** We encode the audio ourselves at a constant AUDIO_BITRATE_KBPS, so the
 *  byte/second rate is known rather than probed — no ffprobe needed (and
 *  ffmpeg-static ships only ffmpeg). */
export const AUDIO_BYTES_PER_SECOND = (AUDIO_BITRATE_KBPS * 1000) / 8;
export const CHUNK_SECONDS = Math.floor(
  TARGET_CHUNK_BYTES / AUDIO_BYTES_PER_SECOND,
);

type TranscriptionCredentials = NonNullable<
  Awaited<ReturnType<AiConfigService['resolveRawCourseImportCredentials']>>
>;

/**
 * Transcribes lesson videos via Groq's Whisper endpoint instead of Gemini's
 * native video understanding — see the AI Course Importer's cost/reliability
 * discussion: Gemini's free tier couldn't handle a real 40+ video course
 * without repeated "model overloaded" failures, and paying for Gemini isn't
 * an option pre-launch. Trades Gemini's simplicity (send the whole video,
 * done) for a genuinely free, audio-only path: download the video, use
 * ffmpeg to strip out just the audio track locally (the video's picture is
 * never sent anywhere), then upload the much smaller audio file to Groq.
 *
 * Net effect on the backend versus the Gemini path: less data transferred
 * per video (audio-only upload instead of a second full-video upload), but
 * a new, genuinely CPU-bound step (ffmpeg's decode/encode) that Render's
 * free-tier 0.1 CPU allocation has never had to do before — see the
 * project's own discussion of this trade-off before treating it as free.
 *
 * Reuses the same OPENAI_COMPATIBLE credential already configured for
 * lesson generation (AiConfigService#resolveRawCourseImportCredentials) —
 * Groq bills/rate-limits Whisper separately from chat completions under the
 * same account key, so no second credential setup is needed.
 */
@Injectable()
export class GroqWhisperTranscriptionService implements OnModuleInit {
  private readonly logger = new Logger(GroqWhisperTranscriptionService.name);

  /** The per-job `finally` block cleans up on any normal failure, but it
   *  cannot run if the process is killed outright (OOM, SIGKILL, an
   *  uncaught exception) — and a killed job leaves a multi-hundred-MB video
   *  behind. Those orphans accumulated across several crashes during
   *  development and would eventually fill Render's small temp disk, so
   *  anything left from a previous process is swept at startup. Only files
   *  matching this service's own prefix are touched.
   *
   *  Assumes one backend process per machine — the same assumption
   *  HeavyTransferLockService already relies on. If this ever scales
   *  horizontally on shared storage, a starting instance would delete a
   *  sibling's in-flight files and this needs an age/ownership check. */
  async onModuleInit(): Promise<void> {
    try {
      const dir = tmpdir();
      const orphans = (await readdir(dir)).filter((name) =>
        name.startsWith('course-import-'),
      );
      if (orphans.length === 0) return;

      await Promise.all(
        orphans.map((name) =>
          rm(join(dir, name), { recursive: true, force: true }).catch(
            () => undefined,
          ),
        ),
      );
      this.logger.log(
        `Cleaned up ${orphans.length} orphaned course-import temp file(s) from a previous run.`,
      );
    } catch (err) {
      // Never block startup over housekeeping.
      this.logger.warn(
        `Could not sweep orphaned temp files: ${(err as Error).message}`,
      );
    }
  }

  constructor(
    private readonly aiConfig: AiConfigService,
    private readonly budget: AiBudgetService,
  ) {}

  async transcribe(videoUrl: string): Promise<{ text: string }> {
    const decision = await this.budget.checkCourseImport();
    if (!decision.allow) {
      throw new CourseImportError(
        'AI_BUDGET_EXCEEDED',
        `Course-import AI budget reached for today (${decision.reason}) — raise COURSE_IMPORT_AI_DAILY_BUDGET_USD/COURSE_IMPORT_AI_MAX_CALLS_PER_DAY or wait until tomorrow.`,
      );
    }

    const creds = await this.aiConfig.resolveRawCourseImportCredentials();
    if (!creds) {
      throw new CourseImportError(
        'PROVIDER_NOT_CONFIGURED',
        'No active course-import AI provider configured — add one named "course-import-generation" from /admin/ai first.',
      );
    }

    const jobId = randomUUID();
    const videoPath = join(tmpdir(), `course-import-${jobId}.video`);
    const audioPath = join(tmpdir(), `course-import-${jobId}.mp3`);
    const chunkDir = join(tmpdir(), `course-import-${jobId}-chunks`);

    try {
      await this.downloadToFile(videoUrl, videoPath);
      await this.extractAudio(videoPath, audioPath);

      // The video is only ever needed to get the audio out — drop it before
      // the (potentially long) transcription stage rather than holding a
      // multi-GB temp file on Render's small disk for the whole job.
      await unlink(videoPath).catch(() => undefined);

      const text = await this.transcribeAudio(audioPath, chunkDir, creds);
      return { text };
    } finally {
      await Promise.all([
        unlink(videoPath).catch(() => undefined),
        unlink(audioPath).catch(() => undefined),
        rm(chunkDir, { recursive: true, force: true }).catch(() => undefined),
      ]);
    }
  }

  /** Single request when the audio fits Groq's cap, otherwise split into
   *  time-ordered chunks and stitch the transcripts back together. Splitting
   *  beats failing: a 90-minute lesson is a legitimate import, and the
   *  alternative (silently truncating at the cap) would lose real teaching
   *  content without telling anyone. */
  private async transcribeAudio(
    audioPath: string,
    chunkDir: string,
    creds: TranscriptionCredentials,
  ): Promise<string> {
    const { size } = await stat(audioPath);
    if (size <= MAX_AUDIO_BYTES) {
      return this.uploadForTranscription(audioPath, creds);
    }

    this.logger.log(
      `Extracted audio is ${(size / 1e6).toFixed(1)}MB — over the ${(MAX_AUDIO_BYTES / 1e6).toFixed(0)}MB limit, splitting into ~${CHUNK_SECONDS}s chunks.`,
    );
    const chunkPaths = await this.splitAudio(audioPath, chunkDir);

    const parts: string[] = [];
    for (const [index, chunkPath] of chunkPaths.entries()) {
      const { size: chunkSize } = await stat(chunkPath);
      if (chunkSize > MAX_AUDIO_BYTES) {
        throw new CourseImportError(
          'AUDIO_CHUNK_TOO_LARGE',
          `Audio chunk ${index + 1}/${chunkPaths.length} is still ${(chunkSize / 1e6).toFixed(1)}MB after splitting — the source audio's real bitrate is higher than expected.`,
        );
      }
      this.logger.log(
        `Transcribing chunk ${index + 1}/${chunkPaths.length}...`,
      );
      parts.push(await this.uploadForTranscription(chunkPath, creds));
    }

    return parts.join(' ');
  }

  /** ffmpeg's segment muxer with `-c copy` — re-muxes at chunk boundaries
   *  without re-encoding, so this is fast and lossless even on Render's
   *  0.1 CPU. The `%03d` pattern zero-pads, so sorting the directory
   *  lexicographically yields chronological order. */
  private async splitAudio(
    audioPath: string,
    chunkDir: string,
  ): Promise<string[]> {
    await mkdir(chunkDir, { recursive: true });
    await this.runFfmpeg(
      [
        '-y',
        '-i', audioPath,
        '-f', 'segment',
        '-segment_time', String(CHUNK_SECONDS),
        '-c', 'copy',
        join(chunkDir, 'chunk-%03d.mp3'),
      ],
      'audio splitting',
    );

    const names = (await readdir(chunkDir))
      .filter((n) => n.endsWith('.mp3'))
      .sort();
    if (names.length === 0) {
      throw new CourseImportError(
        'FFMPEG_FAILED',
        'ffmpeg produced no audio chunks while splitting.',
      );
    }
    return names.map((n) => join(chunkDir, n));
  }

  private async downloadToFile(url: string, path: string): Promise<void> {
    const res = await fetch(url, { signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS) });
    if (!res.ok || !res.body) {
      throw new CourseImportError(
        codeForHttpStatus(res.status, 'STORAGE'),
        `Could not download video for transcription (HTTP ${res.status}).`,
      );
    }
    // `readable.pipe(writable)` returns `writable`, so a `.on('error', ...)`
    // chained onto it only ever catches errors from the destination file
    // stream, never the source. A slow download that trips the abort
    // timeout above emits its error on the SOURCE (the fetch body) with no
    // listener attached — Node treats that as an uncaught exception and
    // crashes the whole process. `pipeline()` correctly propagates errors
    // from either side and tears down both streams.
    await pipeline(Readable.fromWeb(res.body as never), createWriteStream(path));
  }

  /** Shells out to the ffmpeg binary ffmpeg-static bundles — no system
   *  package install needed on Render, it ships as a plain npm dependency. */
  private extractAudio(videoPath: string, audioPath: string): Promise<void> {
    return this.runFfmpeg(
      [
        '-y', // overwrite the temp path without prompting
        '-i', videoPath,
        '-vn', // drop video entirely — audio only
        '-ac', '1', // mono
        '-ar', '16000', // 16kHz — Whisper's own internal rate
        '-b:a', `${AUDIO_BITRATE_KBPS}k`,
        audioPath,
      ],
      'audio extraction',
    );
  }

  private runFfmpeg(args: string[], stage: string): Promise<void> {
    // Narrowed to a plain local so the closure below (a separate function
    // scope, where TS can't assume the module-level import wasn't
    // reassigned) still sees it as `string`, not `string | null`.
    const ffmpegBinary: string | null = ffmpegPath;
    if (!ffmpegBinary) {
      throw new CourseImportError(
        'FFMPEG_NOT_FOUND',
        'ffmpeg binary not found (ffmpeg-static failed to resolve).',
      );
    }
    return new Promise((resolve, reject) => {
      const proc = spawn(ffmpegBinary, args);

      const timeout = setTimeout(() => {
        proc.kill('SIGKILL');
        reject(
          new CourseImportError(
            'FFMPEG_TIMEOUT',
            `ffmpeg ${stage} timed out after ${FFMPEG_TIMEOUT_MS / 1000}s.`,
          ),
        );
      }, FFMPEG_TIMEOUT_MS);

      // Bounded: ffmpeg is chatty on stderr and a long job would otherwise
      // grow this string for the whole run, only for us to slice(-500).
      let stderr = '';
      proc.stderr.on('data', (chunk: Buffer) => {
        stderr = (stderr + chunk.toString()).slice(-2000);
      });
      proc.on('error', (err) => {
        clearTimeout(timeout);
        reject(
          new CourseImportError(
            'FFMPEG_NOT_FOUND',
            `Could not start ffmpeg: ${err.message}`,
            err,
          ),
        );
      });
      proc.on('close', (code) => {
        clearTimeout(timeout);
        if (code === 0) resolve();
        else
          reject(
            new CourseImportError(
              'FFMPEG_FAILED',
              `ffmpeg ${stage} exited with code ${code}: ${stderr.slice(-500)}`,
            ),
          );
      });
    });
  }

  /** One provider request. Size is already guaranteed under the cap by the
   *  caller (single-file check or per-chunk check), so this only has to do
   *  the upload and its own budget accounting — recorded per request so a
   *  chunked lesson counts as the several calls it genuinely is. */
  private async uploadForTranscription(
    audioPath: string,
    creds: TranscriptionCredentials,
  ): Promise<string> {
    const audioBuffer = await readFile(audioPath);
    const form = new FormData();
    form.append('file', new Blob([audioBuffer], { type: 'audio/mpeg' }), 'audio.mp3');
    form.append('model', 'whisper-large-v3-turbo');
    form.append('response_format', 'json');

    const res = await fetch(`${creds.baseUrl.replace(/\/+$/, '')}/audio/transcriptions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${creds.apiKey}` },
      body: form,
      signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new CourseImportError(
        codeForHttpStatus(res.status, 'TRANSCRIPTION'),
        `Groq transcription request failed (${res.status}): ${detail.slice(0, 200)}`,
      );
    }

    const json = (await res.json()) as { text?: string };
    const text = json.text?.trim();
    if (!text) {
      throw new CourseImportError(
        'TRANSCRIPTION_EMPTY',
        'Groq returned no transcript text — this video may have no speech in it.',
      );
    }

    await this.budget.record(
      creds.providerId,
      'COURSE_IMPORT',
      { inputTokens: 0, outputTokens: 0 }, // Whisper bills per-second of audio, not tokens — see resolveRawCourseImportCredentials' doc comment.
      {
        inputCostPer1k: creds.inputCostPer1k,
        outputCostPer1k: creds.outputCostPer1k,
      },
    );

    return text;
  }
}
