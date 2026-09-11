/**
 * Shared error taxonomy and fetch helper for Meta Graph API calls.
 *
 * Deliberately mirrors `tey/ai/ai-provider.interface.ts`'s `AiProviderError`/
 * `aiFetch` pattern rather than importing it: `tey` depends on `whatsapp`
 * (for the real WhatsApp channel), never the other way round.
 */

/** Typed failure, so callers can distinguish "bad token" from "Meta is down". */
export class MetaWhatsAppError extends Error {
  constructor(
    message: string,
    readonly kind:
      | 'AUTH'
      | 'RATE_LIMIT'
      | 'TIMEOUT'
      | 'BAD_REQUEST'
      | 'SERVER'
      | 'UNKNOWN',
    readonly statusCode?: number,
  ) {
    super(message);
    this.name = 'MetaWhatsAppError';
  }
}

/** Maps an HTTP status onto the failure taxonomy above. */
export function classifyMetaStatus(status: number): MetaWhatsAppError['kind'] {
  if (status === 401 || status === 403) return 'AUTH';
  if (status === 429) return 'RATE_LIMIT';
  if (status >= 500) return 'SERVER';
  if (status >= 400) return 'BAD_REQUEST';
  return 'UNKNOWN';
}

/**
 * Shared fetch with a hard timeout, so a stuck Graph API call can never hang
 * an OTP send or a scheduler tick indefinitely.
 */
export async function metaFetch(
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      throw new MetaWhatsAppError(
        `Request timed out after ${timeoutMs}ms`,
        'TIMEOUT',
      );
    }
    throw new MetaWhatsAppError((err as Error).message, 'UNKNOWN');
  } finally {
    clearTimeout(timer);
  }
}
