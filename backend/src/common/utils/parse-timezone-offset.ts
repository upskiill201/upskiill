/**
 * Sanitize a client-supplied timezone offset (minutes) from query params or
 * headers. These arrive as free text, and a NaN slipping into date math
 * produces an Invalid Date whose toISOString() throws RangeError → 500.
 *
 * Valid UTC offsets span ±14h (= ±840 minutes); anything outside — or
 * unparseable — falls back to 0 (UTC).
 */
export function parseTimezoneOffset(raw: string | undefined | null): number {
  const parsed = parseInt(raw ?? '0', 10);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(-840, Math.min(840, parsed));
}
