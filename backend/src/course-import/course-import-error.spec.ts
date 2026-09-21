import {
  CourseImportError,
  codeForHttpStatus,
  isRetryableCode,
  isRetryableStoredCode,
  toCourseImportError,
} from './course-import-error';

describe('course import error taxonomy', () => {
  describe('retryability', () => {
    it.each([
      'TRANSCRIPTION_RATE_LIMIT',
      'TRANSCRIPTION_PROVIDER_ERROR',
      'AI_RATE_LIMIT',
      'AI_SCHEMA_INVALID',
      'STORAGE_TIMEOUT',
    ] as const)('treats %s as worth retrying', (code) => {
      expect(isRetryableCode(code)).toBe(true);
    });

    // These are the ones that previously burned all three attempts (and
    // several minutes) before telling the admin something only they can fix.
    it.each([
      'PROVIDER_NOT_CONFIGURED',
      'AI_BUDGET_EXCEEDED',
      'NO_TRANSCRIPT',
      'STORAGE_OBJECT_NOT_FOUND',
      'FFMPEG_NOT_FOUND',
      'AUDIO_CHUNK_TOO_LARGE',
      'TRANSCRIPTION_EMPTY',
      'DRIVE_PERMISSION_DENIED',
    ] as const)('treats %s as terminal', (code) => {
      expect(isRetryableCode(code)).toBe(false);
    });

    it('exposes retryability on the error instance', () => {
      expect(
        new CourseImportError('AI_RATE_LIMIT', 'slow down').retryable,
      ).toBe(true);
      expect(
        new CourseImportError('NO_TRANSCRIPT', 'nothing to work from')
          .retryable,
      ).toBe(false);
    });
  });

  describe('codeForHttpStatus', () => {
    it('maps 429 to the rate-limit code for the calling subsystem', () => {
      expect(codeForHttpStatus(429, 'TRANSCRIPTION')).toBe(
        'TRANSCRIPTION_RATE_LIMIT',
      );
      expect(codeForHttpStatus(429, 'AI')).toBe('AI_RATE_LIMIT');
      expect(codeForHttpStatus(429, 'DRIVE')).toBe('DRIVE_RATE_LIMIT');
    });

    it('maps 5xx to a retryable provider error', () => {
      expect(isRetryableCode(codeForHttpStatus(503, 'TRANSCRIPTION'))).toBe(
        true,
      );
      expect(isRetryableCode(codeForHttpStatus(500, 'AI'))).toBe(true);
    });

    // The exact failure that wasted three transcription attempts per file
    // when a stale storage URL 404'd.
    it('maps a missing storage object to a terminal code', () => {
      expect(codeForHttpStatus(404, 'STORAGE')).toBe(
        'STORAGE_OBJECT_NOT_FOUND',
      );
      expect(isRetryableCode(codeForHttpStatus(404, 'STORAGE'))).toBe(false);
    });

    it('maps auth failures to terminal codes', () => {
      expect(codeForHttpStatus(403, 'DRIVE')).toBe('DRIVE_PERMISSION_DENIED');
      expect(isRetryableCode(codeForHttpStatus(401, 'AI'))).toBe(false);
    });
  });

  describe('toCourseImportError', () => {
    it('passes through an already-coded error untouched', () => {
      const original = new CourseImportError('FFMPEG_FAILED', 'bad exit');
      expect(toCourseImportError(original)).toBe(original);
    });

    it('classifies an AbortSignal timeout rejection', () => {
      const timeout = new Error('The operation was aborted due to timeout');
      timeout.name = 'TimeoutError';
      expect(toCourseImportError(timeout).code).toBe('STORAGE_TIMEOUT');
    });

    // An unrecognized throw is more often a blip than a permanent state, so
    // it stays retryable rather than failing a file on first contact.
    it('falls back to a retryable UNKNOWN for anything else', () => {
      const failure = toCourseImportError(new TypeError('x is not a function'));
      expect(failure.code).toBe('UNKNOWN');
      expect(failure.retryable).toBe(true);
      expect(failure.message).toContain('x is not a function');
    });

    it('handles a non-Error throw without losing the value', () => {
      expect(toCourseImportError('plain string failure').message).toBe(
        'plain string failure',
      );
    });
  });

  describe('isRetryableStoredCode', () => {
    it('treats a legacy NULL code as retryable', () => {
      // Rows written before this column existed must not become permanently
      // un-retryable just because they predate the taxonomy.
      expect(isRetryableStoredCode(null)).toBe(true);
    });

    it('treats a code this build does not recognize as retryable', () => {
      expect(isRetryableStoredCode('SOME_FUTURE_CODE')).toBe(true);
    });

    it('still reports known terminal codes as terminal', () => {
      expect(isRetryableStoredCode('STORAGE_OBJECT_NOT_FOUND')).toBe(false);
      expect(isRetryableStoredCode('PROVIDER_NOT_CONFIGURED')).toBe(false);
    });

    it('reports known retryable codes as retryable', () => {
      expect(isRetryableStoredCode('AI_RATE_LIMIT')).toBe(true);
    });
  });
});
