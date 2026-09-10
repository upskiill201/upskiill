/**
 * MeSomb Mobile Money country registry — single source of truth for every
 * market we can collect from via @hachther/mesomb.
 *
 * DESIGN NOTES
 * - Data only: each country is one object literal so correcting an operator
 *   code after checking the MeSomb dashboard is a one-line edit.
 * - Operator codes beyond the SDK's typed union ('MTN'|'ORANGE'|'AIRTEL')
 *   carry `verified: false` until confirmed against the merchant account.
 *   Wrong guesses degrade gracefully: the provider maps MeSomb's own
 *   invalid-service errors to a "try another operator" message, and the
 *   /payment/mesomb/config endpoint greys out countries the account
 *   doesn't support (see MesombProvider.getAccountCountries).
 * - Phone validation is intentionally LENIENT outside Cameroon: we check
 *   plausible national lengths (and prefixes only where flagged strict).
 *   MeSomb's invalid-payer response is the authoritative rejection and is
 *   surfaced as a user-fixable message.
 */

export interface MesombOperator {
  /** Exact service string forwarded to makeCollect(). */
  code: string;
  label: string;
  /** false = plausible but not yet confirmed against the MeSomb dashboard. */
  verified?: boolean;
}

export interface MesombCountry {
  /** ISO-3166 alpha-2, uppercase. */
  code: string;
  name: string;
  dialCode: string; // '+237'
  currency: string; // ISO-4217
  /** Valid national (NSN) digit lengths, after dial code / trunk-0 stripping. */
  nationalLengths: number[];
  /** Advisory mobile prefixes — enforced ONLY when strictPrefix is true. */
  mobilePrefixes?: string[];
  strictPrefix?: boolean;
  phoneExample: string;
  operators: MesombOperator[];
}

export const MESOMB_COUNTRIES: MesombCountry[] = [
  {
    code: 'CM',
    name: 'Cameroon',
    dialCode: '+237',
    currency: 'XAF',
    nationalLengths: [9],
    mobilePrefixes: ['6'],
    strictPrefix: true,
    phoneExample: '670 123 456',
    operators: [
      { code: 'MTN', label: 'MTN MoMo', verified: true },
      { code: 'ORANGE', label: 'Orange Money', verified: true },
    ],
  },
  {
    code: 'CG',
    name: 'Congo (Brazzaville)',
    dialCode: '+242',
    currency: 'XAF',
    nationalLengths: [9],
    phoneExample: '05 555 12 34',
    operators: [
      { code: 'MTN', label: 'MTN MoMo', verified: true },
      { code: 'ORANGE', label: 'Orange Money', verified: true },
      { code: 'MOOV', label: 'Moov Money' },
    ],
  },
  {
    code: 'GA',
    name: 'Gabon',
    dialCode: '+241',
    currency: 'XAF',
    nationalLengths: [7, 8],
    phoneExample: '06 55 22 11',
    operators: [
      { code: 'AIRTEL', label: 'Airtel Money', verified: true },
      { code: 'MOOV', label: 'Moov Money' },
    ],
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    dialCode: '+226',
    currency: 'XOF',
    nationalLengths: [8],
    phoneExample: '70 12 34 56',
    operators: [
      { code: 'ORANGE', label: 'Orange Money', verified: true },
      { code: 'MOOV', label: 'Moov Money' },
    ],
  },
  {
    code: 'BJ',
    name: 'Benin',
    dialCode: '+229',
    currency: 'XOF',
    nationalLengths: [8, 10],
    phoneExample: '97 12 34 56',
    operators: [
      { code: 'MTN', label: 'MTN MoMo', verified: true },
      { code: 'MOOV', label: 'Moov Money' },
      { code: 'CELTIS', label: 'Celtiis Cash' },
    ],
  },
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    dialCode: '+225',
    currency: 'XOF',
    nationalLengths: [10],
    phoneExample: '07 07 12 34 56',
    operators: [
      { code: 'ORANGE', label: 'Orange Money', verified: true },
      { code: 'MTN', label: 'MTN MoMo', verified: true },
      { code: 'MOOV', label: 'Moov Money' },
      { code: 'WAVE', label: 'Wave' },
    ],
  },
  {
    code: 'SN',
    name: 'Senegal',
    dialCode: '+221',
    currency: 'XOF',
    nationalLengths: [9],
    phoneExample: '77 123 45 67',
    operators: [
      { code: 'ORANGE', label: 'Orange Money', verified: true },
      { code: 'FREE', label: 'Free Money' },
      { code: 'WAVE', label: 'Wave' },
    ],
  },
  {
    code: 'CD',
    name: 'DR Congo',
    dialCode: '+243',
    currency: 'CDF',
    nationalLengths: [9],
    phoneExample: '81 234 56 78',
    operators: [
      { code: 'VODACOM', label: 'M-Pesa (Vodacom)' },
      { code: 'ORANGE', label: 'Orange Money', verified: true },
      { code: 'AIRTEL', label: 'Airtel Money', verified: true },
      { code: 'AFRICELL', label: 'Afrimoney' },
    ],
  },
  {
    code: 'KE',
    name: 'Kenya',
    dialCode: '+254',
    currency: 'KES',
    nationalLengths: [9],
    mobilePrefixes: ['7', '1'],
    phoneExample: '712 345 678',
    operators: [
      { code: 'MPESA', label: 'M-Pesa' },
      { code: 'AIRTEL', label: 'Airtel Money', verified: true },
      { code: 'TELKOM', label: 'T-Kash' },
    ],
  },
  {
    code: 'RW',
    name: 'Rwanda',
    dialCode: '+250',
    currency: 'RWF',
    nationalLengths: [9],
    mobilePrefixes: ['7'],
    phoneExample: '721 234 567',
    operators: [
      { code: 'MTN', label: 'MTN MoMo', verified: true },
      { code: 'AIRTEL', label: 'Airtel Money', verified: true },
    ],
  },
  {
    code: 'UG',
    name: 'Uganda',
    dialCode: '+256',
    currency: 'UGX',
    nationalLengths: [9],
    mobilePrefixes: ['7'],
    phoneExample: '772 345 678',
    operators: [
      { code: 'MTN', label: 'MTN MoMo', verified: true },
      { code: 'AIRTEL', label: 'Airtel Money', verified: true },
    ],
  },
  {
    code: 'ZM',
    name: 'Zambia',
    dialCode: '+260',
    currency: 'ZMW',
    nationalLengths: [9],
    mobilePrefixes: ['9', '7'],
    phoneExample: '977 123 456',
    operators: [
      { code: 'MTN', label: 'MTN MoMo', verified: true },
      { code: 'AIRTEL', label: 'Airtel Money', verified: true },
      { code: 'ZAMTEL', label: 'Zamtel Kwacha' },
    ],
  },
  {
    code: 'SL',
    name: 'Sierra Leone',
    dialCode: '+232',
    currency: 'SLE',
    nationalLengths: [7, 8],
    phoneExample: '76 123 456',
    operators: [
      { code: 'ORANGE', label: 'Orange Money', verified: true },
      { code: 'AFRICELL', label: 'Africell Money' },
    ],
  },
];

/** Baked FX defaults (USD → local units). Override with FX_USD_TO_<CCY>. */
const DEFAULT_FX_RATES: Record<string, number> = {
  XAF: 600,
  XOF: 600,
  CDF: 2850,
  KES: 129,
  RWF: 1450,
  SLE: 25,
  UGX: 3700,
  ZMW: 26,
};

export function getMesombCountry(code?: string | null): MesombCountry | undefined {
  if (!code) return undefined;
  return MESOMB_COUNTRIES.find((c) => c.code === String(code).trim().toUpperCase());
}

/** Default market when a caller supplies none (env-overridable, default CM). */
export function getDefaultMesombCountry(): MesombCountry {
  const fromEnv = getMesombCountry(process.env.MESOMB_DEFAULT_COUNTRY);
  return fromEnv ?? MESOMB_COUNTRIES[0]; // index 0 = Cameroon
}

/**
 * Resolve + validate the requested operator for a country. Missing service
 * defaults to the first registered operator (keeps legacy payloads working).
 */
export function assertServiceForCountry(
  country: MesombCountry,
  service?: string,
): { ok: true; resolved: string } | { ok: false; error: string } {
  const requested = service?.trim().toUpperCase();
  if (!requested) {
    return { ok: true, resolved: country.operators[0]?.code ?? 'MTN' };
  }
  const match = country.operators.find(
    (op) => op.code.toUpperCase() === requested,
  );
  if (!match) {
    const available = country.operators.map((op) => op.code).join(', ');
    return {
      ok: false,
      error: `${service} is not available in ${country.name}. Available: ${available}.`,
    };
  }
  return { ok: true, resolved: match.code };
}

export interface NormalizedPhone {
  ok: boolean;
  national?: string;
  error?: string;
}

/**
 * Normalize a payer number to bare national digits for its country:
 * strips spaces/dashes/parens, an optional +/00 international prefix and
 * dial code, and a single trunk '0'. Lengths are validated against the
 * registry; prefixes only where strictPrefix is set (Cameroon today).
 */
export function normalizeNationalNumber(raw: string, country: MesombCountry): NormalizedPhone {
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

/** USD → local currency rate for a country (env override wins). */
export function fxRateFor(country: MesombCountry): number {
  const envName = `FX_USD_TO_${country.currency}`;
  const raw = process.env[envName];
  if (raw) {
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return DEFAULT_FX_RATES[country.currency] ?? 600;
}

export interface LocalAmount {
  /** Whole local-currency units, rounded UP so we never undercharge. */
  amount: number;
  currency: string;
  rateUsed: number;
}

/** Convert a USD price into collectable local units for the country. */
export function localAmountFromUsd(usd: number, country: MesombCountry): LocalAmount {
  const rateUsed = fxRateFor(country);
  return {
    amount: Math.ceil(Math.max(0, Number(usd) || 0) * rateUsed),
    currency: country.currency,
    rateUsed,
  };
}
