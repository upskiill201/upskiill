/**
 * Sanitize a timezone offset (minutes) from query params, headers, or the
 * persisted User.timezoneOffsetMinutes column. These arrive as free text, and a NaN slipping into date math
 * produces an Invalid Date whose toISOString() throws RangeError → 500.
 *
 * Valid UTC offsets span ±14h (= ±840 minutes); anything outside — or
 * unparseable — falls back to 0 (UTC).
 */
export function parseTimezoneOffset(
  raw: string | number | undefined | null,
): number {
  const parsed =
    typeof raw === 'number' ? Math.trunc(raw) : parseInt(raw ?? '0', 10);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(-840, Math.min(840, parsed));
}
