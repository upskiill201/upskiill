/**
 * Phone normalisation & masking helpers for WhatsApp verification.
 *
 * Pure functions (no NestJS dependencies) so they can be unit-tested directly.
 */

/** E.164 sanity check: '+' + 8–15 digits, first digit 1-9. */
const E164_PATTERN = /^\+[1-9]\d{7,14}$/;

/**
 * Smart phone normalisation → E.164 string, or null when implausible.
 *
 * Handles local 9-digit Cameroonian numbers (671405008 → +237671405008),
 * trunk-prefixed numbers (0671405008), 237-prefixed digits, and full
 * international numbers starting with '+'. Anything that can't plausibly
 * route is rejected instead of silently becoming `+<garbage>`.
 */
export function normalisePhone(raw: string): string | null {
  if (!raw || typeof raw !== 'string') return null;

  let clean = raw.replace(/[^\d+]/g, '');

  if (clean.startsWith('+')) {
    return E164_PATTERN.test(clean) ? clean : null;
  }

  // Strip local trunk prefix (e.g. 0 in "0671405008")
  if (clean.startsWith('0')) {
    clean = clean.substring(1);
  }

  // Cameroon default: 9-digit mobile/landline prefixes
  if (clean.length === 9 && (clean.startsWith('6') || clean.startsWith('2'))) {
    return `+237${clean}`;
  }

  // Already country-coded with 237
  if (clean.length === 12 && clean.startsWith('237')) {
    return `+${clean}`;
  }

  const candidate = `+${clean}`;
  return E164_PATTERN.test(candidate) ? candidate : null;
}

/**
 * Masks all but the country code and last 3 digits for safe logging.
 * +237671405008 → +237•••••008
 */
export function maskPhone(e164: string): string {
  if (!e164 || e164.length < 7) return '•••';
  return `${e164.slice(0, 4)}${'•'.repeat(Math.max(e164.length - 7, 1))}${e164.slice(-3)}`;
}
