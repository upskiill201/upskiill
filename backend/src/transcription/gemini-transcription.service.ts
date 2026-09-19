import { Injectable, Logger } from '@nestjs/common';
import { AiConfigService } from '../tey/ai/ai-config.service';
import { AiBudgetService } from '../tey/ai/ai-budget.service';

/** Video files run well past Gemini's inline-request size limit, so
 *  transcription always goes through the File API rather than inline base64
 *  — this ceiling is generous (Gemini's own limit is much higher) and mostly
 *  guards against ever trying to transcribe something that isn't a lesson
 *  video. */
const MAX_TRANSCRIBE_BYTES = 2 * 1024 * 1024 * 1024; // 2GB, matches the importer's own video cap
const UPLOAD_TIMEOUT_MS = 10 * 60 * 1000; // large files over a slow link
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 5 * 60 * 1000;
const GENERATE_TIMEOUT_MS = 3 * 60 * 1000;

const TRANSCRIPTION_PROMPT =
  'Transcribe the spoken audio in this video verbatim, in the language it is spoken in. ' +
  'Return ONLY the transcript text — no timestamps, no speaker labels, no commentary, ' +
  'no markdown formatting. If there is no intelligible speech, return exactly: [no speech detected]';

interface GeminiFileResource {
  name: string;
  uri: string;
  state: 'PROCESSING' | 'ACTIVE' | 'FAILED';
  mimeType?: string;
}

/**
 * Transcribes lesson videos via Gemini's native audio/video understanding —
 * the free option (see Phase 4 planning): Gemini already has a generous free
 * tier and is already Teyro's seeded default AI provider, so this needs no
 * second paid service or credential. Uses the File API's resumable-upload
 * protocol directly over fetch, matching the rest of tey/ai's "no vendor
 * SDKs" convention — see ai-provider.interface.ts's doc comment.
 *
 * This intentionally does NOT implement AiProvider — that interface is
 * text-in/text-out only; a file upload + poll + multimodal generate is a
 * different shape of interaction entirely.
 */
@Injectable()
export class GeminiTranscriptionService {
  private readonly logger = new Logger(GeminiTranscriptionService.name);

  constructor(
    private readonly aiConfig: AiConfigService,
    private readonly budget: AiBudgetService,
  ) {}

  async transcribe(videoUrl: string): Promise<{ text: string }> {
    // Guards against a runaway import (or a retry loop) racking up an
    // unbounded bill — see AiBudgetService#checkCourseImport's doc comment
    // for why this is separate from the Tey nudge system's own budget check.
    const decision = await this.budget.checkCourseImport();
    if (!decision.allow) {
      throw new Error(
        `Course-import AI budget reached for today (${decision.reason}) — raise COURSE_IMPORT_AI_DAILY_BUDGET_USD/COURSE_IMPORT_AI_MAX_CALLS_PER_DAY or wait until tomorrow.`,
      );
    }

    const creds = await this.aiConfig.resolveRawGeminiCredentials();
    if (!creds) {
      throw new Error(
        'No active Gemini provider configured — connect one from /admin/ai first.',
      );
    }

    const videoRes = await fetch(videoUrl);
    if (!videoRes.ok || !videoRes.body) {
      throw new Error(
        `Could not download video for transcription (HTTP ${videoRes.status}).`,
      );
    }
    const contentType = videoRes.headers.get('content-type') || 'video/mp4';
    const contentLength = Number(videoRes.headers.get('content-length') || 0);
    if (!contentLength) {
      throw new Error(
        'Video response did not report a size — cannot start a resumable upload.',
      );
    }
    if (contentLength > MAX_TRANSCRIBE_BYTES) {
      throw new Error(
        `Video is ${(contentLength / 1e9).toFixed(1)}GB — over the transcription size limit.`,
      );
    }

    const file = await this.uploadResumable(
      creds,
      videoRes.body,
      contentType,
      contentLength,
    );
    const active = await this.waitUntilActive(creds, file.name);
    try {
      const { text, usage } = await this.generateTranscript(
        creds,
        active.uri,
        active.mimeType || contentType,
      );
      await this.budget.record(
        creds.providerId,
        'COURSE_IMPORT',
        usage,
        {
          inputCostPer1k: creds.inputCostPer1k,
          outputCostPer1k: creds.outputCostPer1k,
        },
      );
      return { text };
    } finally {
      this.deleteFile(creds, file.name).catch((err: unknown) => {
        this.logger.warn(
          `Could not clean up Gemini file ${file.name}: ${(err as Error).message}`,
        );
      });
    }
  }

  private async uploadResumable(
    creds: { apiKey: string; baseUrl: string },
    body: ReadableStream<Uint8Array>,
    contentType: string,
    contentLength: number,
  ): Promise<GeminiFileResource> {
    const startRes = await fetch(
      `${creds.baseUrl}/upload/v1beta/files?key=${encodeURIComponent(creds.apiKey)}`,
      {
        method: 'POST',
        headers: {
          'X-Goog-Upload-Protocol': 'resumable',
          'X-Goog-Upload-Command': 'start',
          'X-Goog-Upload-Header-Content-Length': String(contentLength),
          'X-Goog-Upload-Header-Content-Type': contentType,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: { display_name: `course-import-${Date.now()}` },
        }),
        signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS),
      },
    );
    if (!startRes.ok) {
      throw new Error(
        `Gemini upload could not start (HTTP ${startRes.status}): ${(await startRes.text()).slice(0, 200)}`,
      );
    }
    const uploadUrl = startRes.headers.get('x-goog-upload-url');
    if (!uploadUrl) {
      throw new Error(
        'Gemini did not return an upload URL for the resumable upload.',
      );
    }

    const uploadRes = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Length': String(contentLength),
        'X-Goog-Upload-Offset': '0',
        'X-Goog-Upload-Command': 'upload, finalize',
      },
      // @ts-expect-error -- Node's fetch requires duplex for a streamed body; not yet in the lib.dom types this project targets.
      duplex: 'half',
      body,
      signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS),
    });
    if (!uploadRes.ok) {
      throw new Error(
        `Gemini upload failed (HTTP ${uploadRes.status}): ${(await uploadRes.text()).slice(0, 200)}`,
      );
    }
    const json = (await uploadRes.json()) as { file: GeminiFileResource };
    return json.file;
  }

  private async waitUntilActive(
    creds: { apiKey: string; baseUrl: string },
    fileName: string,
  ): Promise<GeminiFileResource> {
    const deadline = Date.now() + POLL_TIMEOUT_MS;
    while (Date.now() < deadline) {
      const res = await fetch(
        `${creds.baseUrl}/v1beta/${fileName}?key=${encodeURIComponent(creds.apiKey)}`,
        {
          signal: AbortSignal.timeout(30_000),
        },
      );
      if (!res.ok) {
        throw new Error(
          `Could not check Gemini file status (HTTP ${res.status}).`,
        );
      }
      const file = (await res.json()) as GeminiFileResource;
      if (file.state === 'ACTIVE') return file;
      if (file.state === 'FAILED')
        throw new Error('Gemini failed to process the uploaded video.');
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }
    throw new Error(
      `Gemini did not finish processing the video within ${POLL_TIMEOUT_MS / 1000}s.`,
    );
  }

  private async generateTranscript(
    creds: { apiKey: string; baseUrl: string; model: string },
    fileUri: string,
    mimeType: string,
  ): Promise<{ text: string; usage: { inputTokens: number; outputTokens: number } }> {
    const res = await fetch(
      `${creds.baseUrl}/v1beta/models/${encodeURIComponent(creds.model)}:generateContent?key=${encodeURIComponent(creds.apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { file_data: { file_uri: fileUri, mime_type: mimeType } },
                { text: TRANSCRIPTION_PROMPT },
              ],
            },
          ],
          generationConfig: { maxOutputTokens: 8192, temperature: 0.1 },
        }),
        signal: AbortSignal.timeout(GENERATE_TIMEOUT_MS),
      },
    );
    if (!res.ok) {
      throw new Error(
        `Gemini transcription request failed (HTTP ${res.status}): ${(await res.text()).slice(0, 200)}`,
      );
    }
    const json = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
      usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number };
    };
    const text = json.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? '')
      .join('')
      .trim();
    if (!text) throw new Error('Gemini returned no transcript text.');
    return {
      text,
      usage: {
        inputTokens: json.usageMetadata?.promptTokenCount ?? 0,
        outputTokens: json.usageMetadata?.candidatesTokenCount ?? 0,
      },
    };
  }

  private async deleteFile(
    creds: { apiKey: string; baseUrl: string },
    fileName: string,
  ): Promise<void> {
    await fetch(
      `${creds.baseUrl}/v1beta/${fileName}?key=${encodeURIComponent(creds.apiKey)}`,
      {
        method: 'DELETE',
        signal: AbortSignal.timeout(15_000),
      },
    );
  }
}
