import { calculateCoursePricingLadder, roundToCleanPrice } from './pricing-engine';

describe('PricingEngine', () => {
  it('should calculate correct weekly, monthly, and yearly ladder for a $30 course', () => {
    const result = calculateCoursePricingLadder(30);

    expect(result.baseValue).toBe(30);
    expect(result.isFree).toBe(false);

    // Weekly: 30 / 10 = 3.00
    expect(result.weekly.price).toBe(3.00);
    expect(result.weekly.formattedPrice).toBe('$3.00');
    expect(result.weekly.durationDays).toBe(7);

    // Monthly: 3.00 * 4 * 0.70 = 8.40
    expect(result.monthly.price).toBe(8.40);
    expect(result.monthly.formattedPrice).toBe('$8.40');
    expect(result.monthly.durationDays).toBe(30);
    expect(result.monthly.isDefault).toBe(true);

    // Yearly: 30 * 0.80 = 24.00
    expect(result.yearly.price).toBe(24.00);
    expect(result.yearly.formattedPrice).toBe('$24.00');
    expect(result.yearly.durationDays).toBe(365);
    expect(result.yearly.isBestValue).toBe(true);
  });

  it('should calculate correct ladder for a $50 course', () => {
    const result = calculateCoursePricingLadder(50);

    // Weekly: 50 / 10 = 5.00
    expect(result.weekly.price).toBe(5.00);
    // Monthly: 5.00 * 4 * 0.70 = 14.00
    expect(result.monthly.price).toBe(14.00);
    // Yearly: 50 * 0.80 = 40.00
    expect(result.yearly.price).toBe(40.00);
  });

  it('should calculate correct ladder for a $100 course', () => {
    const result = calculateCoursePricingLadder(100);

    // Weekly: 100 / 10 = 10.00
    expect(result.weekly.price).toBe(10.00);
    // Monthly: 10.00 * 4 * 0.70 = 28.00
    expect(result.monthly.price).toBe(28.00);
    // Yearly: 100 * 0.80 = 80.00
    expect(result.yearly.price).toBe(80.00);
  });

  it('should enforce minimum price floors for low priced courses (e.g. $3 course)', () => {
    const result = calculateCoursePricingLadder(3);

    // Weekly raw: 0.30 -> min floor is 0.99
    expect(result.weekly.price).toBe(0.99);
    // Monthly raw: 0.99 * 4 * 0.7 = 2.77 -> min floor is 2.99
    expect(result.monthly.price).toBe(2.99);
    // Yearly raw: 3 * 0.8 = 2.40 -> min floor is 9.99
    expect(result.yearly.price).toBe(9.99);
  });

  it('should handle free course (price 0)', () => {
    const result = calculateCoursePricingLadder(0);

    expect(result.isFree).toBe(true);
    expect(result.weekly.formattedPrice).toBe('FREE');
    expect(result.monthly.formattedPrice).toBe('FREE');
    expect(result.yearly.formattedPrice).toBe('FREE');
  });
});
