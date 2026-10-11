import { formatLocalPrice, formatUsd } from '../localPrice';

/**
 * Cameroon sees course prices in FCFA. The figure must equal what the Mobile
 * Money prompt charges: USD × the shared rate (600 by default), rounded UP.
 */
describe('formatLocalPrice', () => {
  it('converts at the Mobile Money rate and groups thousands with spaces', () => {
    expect(formatLocalPrice(60, 'XAF', 'FCFA')).toBe('36 000 FCFA');
    expect(formatLocalPrice(10, 'XAF', 'FCFA')).toBe('6 000 FCFA');
  });

  it('rounds up, never under the charged amount', () => {
    // 9.99 × 600 = 5994
    expect(formatLocalPrice(9.99, 'XAF', 'FCFA')).toBe('5 994 FCFA');
    // 2.991 × 600 = 1794.6 → 1795
    expect(formatLocalPrice(2.991, 'XAF', 'FCFA')).toBe('1 795 FCFA');
  });

  it('treats junk and negatives as zero', () => {
    expect(formatLocalPrice(-5, 'XAF', 'FCFA')).toBe('0 FCFA');
    expect(formatLocalPrice(Number.NaN, 'XAF', 'FCFA')).toBe('0 FCFA');
  });
});

describe('formatUsd', () => {
  it('keeps cents', () => {
    expect(formatUsd(10)).toBe('$10.00');
  });
});
