/**
 * Client-side static mirror of the Mobile Money country registry.
 *
 * Mirrors backend/src/payment/mesomb-countries.ts — keep both in sync.
 * This copy renders INSTANTLY without a network round trip; the network
 * config (`GET /api/payment/mesomb/config`, surfaced through
 * hooks/useMesombConfig) upgrades it with authoritative `enabled` flags
 * for our merchant account. Never skeleton-gate the payment form on the
 * network copy — this static list is always renderable.
 */

export interface MomoOperator {
  /** Exact service string sent to the backend (forwarded to MeSomb). */
  code: string;
  label: string;
  /** false = plausible operator code, not yet confirmed on the dashboard. */
  verified?: boolean;
}

export interface MomoCountry {
  /** ISO-3166 alpha-2, uppercase. */
  code: string;
  name: string;
  dialCode: string; // '+237'
  currency: string; // ISO-4217
  /** Valid national digit lengths after dial-code/trunk-0 stripping. */
  nationalLengths: number[];
  mobilePrefixes?: string[];
  strictPrefix?: boolean;
  phoneExample: string;
  operators: MomoOperator[];
  /** true until the account config says we cannot collect here. */
  enabled: boolean;
}

export const MOMO_COUNTRIES: MomoCountry[] = [
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
  },
];

/** Cameroon is the default market — first launch market and legacy payloads. */
export const CAMEROON_MOMO_COUNTRY_CODE = 'CM';

/** Default market code when the learner hasn't chosen one yet. */
export const DEFAULT_MOMO_COUNTRY_CODE = CAMEROON_MOMO_COUNTRY_CODE;

export function getMomoCountry(code?: string | null): MomoCountry | undefined {
  if (!code) return undefined;
  return MOMO_COUNTRIES.find((c) => c.code === String(code).trim().toUpperCase());
}
