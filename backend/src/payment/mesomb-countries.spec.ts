import {
  MESOMB_COUNTRIES,
  assertServiceForCountry,
  fxRateFor,
  getDefaultMesombCountry,
  getMesombCountry,
  localAmountFromUsd,
  normalizeNationalNumber,
} from './mesomb-countries';

describe('mesomb-countries registry', () => {
  it('contains exactly 13 unique ISO-2 countries with dial codes', () => {
    expect(MESOMB_COUNTRIES).toHaveLength(13);
    const codes = MESOMB_COUNTRIES.map((c) => c.code);
    expect(new Set(codes).size).toBe(13);
    for (const c of MESOMB_COUNTRIES) {
      expect(c.code).toMatch(/^[A-Z]{2}$/);
      expect(c.dialCode).toMatch(/^\+\d{2,3}$/);
      expect(c.currency).toMatch(/^[A-Z]{3}$/);
      expect(c.operators.length).toBeGreaterThan(0);
    }
  });

  describe('getMesombCountry / getDefaultMesombCountry', () => {
    it('resolves case-insensitively and rejects unknown codes', () => {
      expect(getMesombCountry('cm')?.name).toBe('Cameroon');
      expect(getMesombCountry(' KE ')?.currency).toBe('KES');
      expect(getMesombCountry('XX')).toBeUndefined();
      expect(getMesombCountry(undefined)).toBeUndefined();
      expect(getMesombCountry('')).toBeUndefined();
    });

    it('falls back to Cameroon unless MESOMB_DEFAULT_COUNTRY overrides', () => {
      expect(getDefaultMesombCountry().code).toBe('CM');
      process.env.MESOMB_DEFAULT_COUNTRY = 'SN';
      try {
        expect(getDefaultMesombCountry().code).toBe('SN');
        // Unset env falls back to CM
        process.env.MESOMB_DEFAULT_COUNTRY = 'ZZ';
        expect(getDefaultMesombCountry().code).toBe('CM');
      } finally {
        delete process.env.MESOMB_DEFAULT_COUNTRY;
      }
    });
  });

  describe('assertServiceForCountry', () => {
    const cm = getMesombCountry('CM')!;
    const ke = getMesombCountry('KE')!;

    it('defaults to the first operator when service is missing', () => {
      expect(assertServiceForCountry(cm)).toEqual({ ok: true, resolved: 'MTN' });
      expect(assertServiceForCountry(cm, '  ')).toEqual({ ok: true, resolved: 'MTN' });
    });

    it('is case-insensitive and returns the registry code', () => {
      expect(assertServiceForCountry(cm, 'orange')).toEqual({ ok: true, resolved: 'ORANGE' });
    });

    it('rejects operators that do not serve the country', () => {
      const result = assertServiceForCountry(ke, 'ORANGE');
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error).toContain('not available in Kenya');
    });
  });

  describe('normalizeNationalNumber', () => {
    const cm = getMesombCountry('CM')!;
    const sn = getMesombCountry('SN')!;

    it('accepts bare, spaced, dial-coded and international CM numbers (strict prefix 6)', () => {
      expect(normalizeNationalNumber('670123456', cm)).toEqual({ ok: true, national: '670123456' });
      expect(normalizeNationalNumber('670 123 456', cm)).toEqual({ ok: true, national: '670123456' });
      expect(normalizeNationalNumber('+237 670 123 456', cm)).toEqual({ ok: true, national: '670123456' });
      expect(normalizeNationalNumber('00237670123456', cm)).toEqual({ ok: true, national: '670123456' });
      expect(normalizeNationalNumber('(237) 670-123-456', cm)).toEqual({
        ok: true,
        national: '670123456',
      });
    });

    it('rejects CM numbers not starting with a mobile prefix or of wrong length', () => {
      expect(normalizeNationalNumber('570123456', cm).ok).toBe(false);
      expect(normalizeNationalNumber('12345', cm).ok).toBe(false);
    });

    it('strips dial codes and trunk zero for other countries', () => {
      expect(normalizeNationalNumber('+221 77 123 45 67', sn)).toEqual({
        ok: true,
        national: '771234567',
      });
      expect(normalizeNationalNumber('0771234567', sn)).toEqual({ ok: true, national: '771234567' });
    });

    it('returns a fixable error mentioning the example number', () => {
      const result = normalizeNationalNumber('nope', cm);
      expect(result.ok).toBe(false);
      expect(result.error).toContain(cm.phoneExample);
      expect(normalizeNationalNumber('', cm).ok).toBe(false);
    });
  });

  describe('fxRateFor / localAmountFromUsd', () => {
    const cm = getMesombCountry('CM')!;
    const ke = getMesombCountry('KE')!;

    it('bakes defaults and honors FX_USD_TO_<CCY> overrides', () => {
      expect(fxRateFor(cm)).toBe(600);
      process.env.FX_USD_TO_KES = '130';
      try {
        expect(fxRateFor(ke)).toBe(130);
      } finally {
        delete process.env.FX_USD_TO_KES;
      }
    });

    it('ignores invalid override values', () => {
      process.env.FX_USD_TO_KES = 'not-a-number';
      try {
        expect(fxRateFor(ke)).toBe(129);
        process.env.FX_USD_TO_KES = '-5';
        expect(fxRateFor(ke)).toBe(129);
      } finally {
        delete process.env.FX_USD_TO_KES;
      }
    });

    it('rounds UP so the payer never undercharges, and reports what it used', () => {
      process.env.FX_USD_TO_XAF = '600';
      try {
        // 9.99 * 600 = 5994 exact; 9.995 * 600 = 5997 → ceil keeps integer boundary honest
        expect(localAmountFromUsd(9.99, cm)).toEqual({
          amount: 5994,
          currency: 'XAF',
          rateUsed: 600,
        });
        const odd = localAmountFromUsd(10.001, cm);
        expect(odd.amount).toBe(Math.ceil(10.001 * 600));
        expect(odd.amount).toBeGreaterThanOrEqual(10.001 * 600);
      } finally {
        delete process.env.FX_USD_TO_XAF;
      }
    });
  });
});
