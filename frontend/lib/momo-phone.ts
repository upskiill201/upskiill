import { getMomoCountry, type MomoCountry } from '@/lib/mesomb-countries.client';

/**
 * Generalized Mobile Money payer-number validation — the client twin of
 * normalizeNationalNumber() in backend/src/payment/mesomb-countries.ts.
 *
 * Lenient by design outside strict-prefix markets: we strip formatting,
 * optional international prefixes (+/00), the dial code and a single trunk
 * '0', then validate plausible national lengths (prefix only where the
 * registry flags strictPrefix — Cameroon today). MeSomb's invalid-payer
 * response stays the authoritative rejection and arrives as a user-fixable
 * submit error.
 */

export interface MomoPhoneResult {
  ok: boolean;
  /** Bare national digits to send to the backend when ok. */
  national?: string;
  error?: string;
}

export function normalizeMomoPhone(raw: string, country: MomoCountry): MomoPhoneResult {
  if (!raw || !raw.trim()) {
    return { ok: false, error: `Enter your ${country.name} Mobile Money number.` };
  }

  let digits = raw.replace(/[()\s\-.]/g, '');
  // Drop international prefixes: '+<dial>' or '00<dial>'.
  digits = digits.replace(/^\+(?:00)?/, '').replace(/^00/, '');
  const dialDigits = country.dialCode.replace('+', '');

  const candidates = new Set<string>([digits]);
  if (digits.startsWith(dialDigits)) {
    const withoutDial = digits.slice(dialDigits.length);
    candidates.add(withoutDial);
    candidates.add(withoutDial.replace(/^0/, ''));
  }
  candidates.add(digits.replace(/^0/, ''));

  for (const candidate of candidates) {
    if (!/^\d+$/.test(candidate)) continue;
    if (!country.nationalLengths.includes(candidate.length)) continue;
    if (
      country.strictPrefix &&
      country.mobilePrefixes &&
      !country.mobilePrefixes.some((p) => candidate.startsWith(p))
    ) {
      continue;
    }
    return { ok: true, national: candidate };
  }

  const lengths = [...new Set(country.nationalLengths)].join(' or ');
  return {
    ok: false,
    error: `Enter a valid ${country.name} Mobile Money number (${lengths} digits, e.g. ${country.phoneExample}).`,
  };
}

/** Validate raw input against a country code; convenience for call sites. */
export function validateMomoPhoneForCountry(
  raw: string,
  countryCode: string | null | undefined,
): MomoPhoneResult {
  const country = getMomoCountry(countryCode);
  if (!country) return { ok: false, error: 'Choose your Mobile Money country first.' };
  return normalizeMomoPhone(raw, country);
}
