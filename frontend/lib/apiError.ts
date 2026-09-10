/**
 * Extracts a human-readable message from the backend's error envelopes.
 *
 * The global HttpExceptionFilter sends `{ success: false, error: { code, message } }`
 * while raw NestJS/ValidationPipe errors send `{ message: string | string[] }`.
 * Throwing either object directly into `new Error(...)` is how "[object Object]"
 * leaks into UI error states.
 */
export function extractErrorMessage(data: unknown, status: number): string {
  if (data && typeof data === 'object') {
    const d = data as Record<string, unknown>;

    // HttpExceptionFilter envelope: { success: false, error: { code, message } }
    const err = d.error as string | Record<string, unknown> | undefined;
    if (typeof err === 'string' && err.trim()) return err;
    if (err && typeof err === 'object') {
      const m = (err as Record<string, unknown>).message;
      if (typeof m === 'string' && m.trim()) return m;
      if (Array.isArray(m) && m.length > 0) return m.map(String).join(', ');
    }

    // Raw NestJS shape: { statusCode, message, error }
    if (typeof d.message === 'string' && d.message.trim()) return d.message;
    if (Array.isArray(d.message) && d.message.length > 0) {
      return d.message.map(String).join(', ');
    }
  }
  return `Request failed (${status})`;
}
