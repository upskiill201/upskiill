/**
 * Structured failures for the import pipeline.
 *
 * Two jobs, and the second is the reason this exists at all:
 *
 * 1. Give the admin UI something better than a raw exception string, so a
 *    failed file can say "the speech-to-text provider was rate limited" and
 *    offer a retry, rather than surfacing a stack-trace fragment.
 *
 * 2. Tell the processors which failures are worth retrying. Without this
 *    every failure burns the full MAX_AUTO_ATTEMPTS budget — a missing R2
 *    object or an unconfigured provider would be retried three times over
 *    several minutes despite having no chance of succeeding, while the
 *    admin waits on a "pending" row that is really already dead.
 */
export type CourseImportErrorCode =
  // Google Drive
  | 'DRIVE_AUTH_FAILED'
  | 'DRIVE_PERMISSION_DENIED'
  | 'DRIVE_FILE_NOT_FOUND'
  | 'DRIVE_RATE_LIMIT'
  | 'DRIVE_DOWNLOAD_FAILED'
  // Object storage
  | 'STORAGE_UPLOAD_FAILED'
  | 'STORAGE_DOWNLOAD_FAILED'
  | 'STORAGE_OBJECT_NOT_FOUND'
  | 'STORAGE_TIMEOUT'
  // Local audio processing
  | 'FFMPEG_FAILED'
  | 'FFMPEG_TIMEOUT'
  | 'FFMPEG_NOT_FOUND'
  | 'AUDIO_CHUNK_TOO_LARGE'
  // Speech-to-text
  | 'TRANSCRIPTION_RATE_LIMIT'
  | 'TRANSCRIPTION_PROVIDER_ERROR'
  | 'TRANSCRIPTION_TIMEOUT'
  | 'TRANSCRIPTION_EMPTY'
  // Lesson content generation
  | 'AI_RATE_LIMIT'
  | 'AI_PROVIDER_ERROR'
  | 'AI_TIMEOUT'
  | 'AI_INVALID_JSON'
  | 'AI_SCHEMA_INVALID'
  | 'AI_BUDGET_EXCEEDED'
  // Configuration / preconditions
  | 'PROVIDER_NOT_CONFIGURED'
  | 'NO_TRANSCRIPT'
  | 'FILE_NOT_UPLOADED'
  // Fallback
  | 'UNKNOWN';

/** Codes that can succeed on a later attempt without anyone changing
 *  anything. Everything not listed here is terminal: retrying it just
 *  delays the admin finding out. */
const RETRYABLE_CODES: ReadonlySet<CourseImportErrorCode> = new Set([
  'DRIVE_RATE_LIMIT',
  'DRIVE_DOWNLOAD_FAILED',
  'STORAGE_UPLOAD_FAILED',
  'STORAGE_DOWNLOAD_FAILED',
  'STORAGE_TIMEOUT',
  'FFMPEG_TIMEOUT',
  'TRANSCRIPTION_RATE_LIMIT',
  'TRANSCRIPTION_PROVIDER_ERROR',
  'TRANSCRIPTION_TIMEOUT',
  'AI_RATE_LIMIT',
  'AI_PROVIDER_ERROR',
  'AI_TIMEOUT',
  // Both AI output failures are retryable on purpose: the same prompt can
  // produce valid output on a second pass, and that is cheaper than making
  // an admin hand-fix a lesson. MAX_AUTO_ATTEMPTS still bounds it.
  'AI_INVALID_JSON',
  'AI_SCHEMA_INVALID',
  'UNKNOWN',
]);

export function isRetryableCode(code: CourseImportErrorCode): boolean {
  return RETRYABLE_CODES.has(code);
}

/** Every code this version knows about — used to tell "a terminal code" from
 *  "a string this build has never heard of". */
const KNOWN_CODES: ReadonlySet<string> = new Set<CourseImportErrorCode>([
  'DRIVE_AUTH_FAILED',
  'DRIVE_PERMISSION_DENIED',
  'DRIVE_FILE_NOT_FOUND',
  'DRIVE_RATE_LIMIT',
  'DRIVE_DOWNLOAD_FAILED',
  'STORAGE_UPLOAD_FAILED',
  'STORAGE_DOWNLOAD_FAILED',
  'STORAGE_OBJECT_NOT_FOUND',
  'STORAGE_TIMEOUT',
  'FFMPEG_FAILED',
  'FFMPEG_TIMEOUT',
  'FFMPEG_NOT_FOUND',
  'AUDIO_CHUNK_TOO_LARGE',
  'TRANSCRIPTION_RATE_LIMIT',
  'TRANSCRIPTION_PROVIDER_ERROR',
  'TRANSCRIPTION_TIMEOUT',
  'TRANSCRIPTION_EMPTY',
  'AI_RATE_LIMIT',
  'AI_PROVIDER_ERROR',
  'AI_TIMEOUT',
  'AI_INVALID_JSON',
  'AI_SCHEMA_INVALID',
  'AI_BUDGET_EXCEEDED',
  'PROVIDER_NOT_CONFIGURED',
  'NO_TRANSCRIPT',
  'FILE_NOT_UPLOADED',
  'UNKNOWN',
]);

/** Retryability for a code read back out of the database, where it is just
 *  a string. A NULL (row written before codes existed) or an unrecognized
 *  value is treated as retryable — the same lenient stance as UNKNOWN, so
 *  the admin still gets a retry button rather than a dead row. */
export function isRetryableStoredCode(code: string | null): boolean {
  if (!code || !KNOWN_CODES.has(code)) return true;
  return isRetryableCode(code as CourseImportErrorCode);
}

export class CourseImportError extends Error {
  constructor(
    readonly code: CourseImportErrorCode,
    message: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'CourseImportError';
  }

  get retryable(): boolean {
    return isRetryableCode(this.code);
  }
}

/** Maps an HTTP status from any of the providers onto the shared codes.
 *  429 and 5xx are the provider having a bad moment; 4xx is us sending
 *  something it will reject just as firmly next time. */
export function codeForHttpStatus(
  status: number,
  kind: 'TRANSCRIPTION' | 'AI' | 'STORAGE' | 'DRIVE',
): CourseImportErrorCode {
  if (status === 429) {
    switch (kind) {
      case 'TRANSCRIPTION':
        return 'TRANSCRIPTION_RATE_LIMIT';
      case 'AI':
        return 'AI_RATE_LIMIT';
      case 'DRIVE':
        return 'DRIVE_RATE_LIMIT';
      case 'STORAGE':
        return 'STORAGE_DOWNLOAD_FAILED';
    }
  }
  if (status === 401 || status === 403) {
    return kind === 'DRIVE' ? 'DRIVE_PERMISSION_DENIED' : 'PROVIDER_NOT_CONFIGURED';
  }
  if (status === 404) {
    switch (kind) {
      case 'DRIVE':
        return 'DRIVE_FILE_NOT_FOUND';
      case 'STORAGE':
        return 'STORAGE_OBJECT_NOT_FOUND';
      default:
        return 'PROVIDER_NOT_CONFIGURED';
    }
  }
  if (status >= 500) {
    switch (kind) {
      case 'TRANSCRIPTION':
        return 'TRANSCRIPTION_PROVIDER_ERROR';
      case 'AI':
        return 'AI_PROVIDER_ERROR';
      case 'DRIVE':
        return 'DRIVE_DOWNLOAD_FAILED';
      case 'STORAGE':
        return 'STORAGE_DOWNLOAD_FAILED';
    }
  }
  return 'UNKNOWN';
}

/** Anything thrown inside a processor, normalized. Errors we raised
 *  ourselves keep their code; everything else (a Prisma blow-up, a TypeError
 *  from a bad assumption) lands on UNKNOWN and stays retryable, because an
 *  unrecognized failure is more often a blip than a permanent condition. */
export function toCourseImportError(err: unknown): CourseImportError {
  if (err instanceof CourseImportError) return err;

  const message = err instanceof Error ? err.message : String(err);

  // An AbortSignal.timeout() rejection is a DOMException, not an Error
  // subclass we control, so it is matched by name rather than type.
  if (err instanceof Error && err.name === 'TimeoutError') {
    return new CourseImportError('STORAGE_TIMEOUT', message, err);
  }

  return new CourseImportError('UNKNOWN', message, err);
}
