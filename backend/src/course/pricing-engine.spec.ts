import { calculateCoursePricingLadder } from './pricing-engine';

describe('PricingEngine', () => {
  it('uses the creator’s price as the yearly plan, and yearly ÷ 6 as monthly', () => {
    const result = calculateCoursePricingLadder(30);

    expect(result.baseValue).toBe(30);
    expect(result.isFree).toBe(false);

    // Weekly (legacy tier): 30 / 10 = 3.00
    expect(result.weekly.price).toBe(3.0);
    expect(result.weekly.formattedPrice).toBe('$3.00');
    expect(result.weekly.durationDays).toBe(7);

    // Monthly: 30 ÷ 6 = 5.00
    expect(result.monthly.price).toBe(5.0);
    expect(result.monthly.formattedPrice).toBe('$5.00');
    expect(result.monthly.durationDays).toBe(30);
    expect(result.monthly.isDefault).toBe(true);

    // Yearly: exactly the creator's price
    expect(result.yearly.price).toBe(30.0);
    expect(result.yearly.formattedPrice).toBe('$30.00');
    expect(result.yearly.durationDays).toBe(365);
    expect(result.yearly.isBestValue).toBe(true);
    expect(result.yearly.savingsPercent).toBe(50);
  });

  it('rounds monthly UP to the cent so the yearly saving is never below 50%', () => {
    expect(calculateCoursePricingLadder(50).monthly.price).toBe(8.34);
    const twenty = calculateCoursePricingLadder(20);
    expect(twenty.monthly.price).toBe(3.34);
    expect(twenty.yearly.savingsPercent).toBe(50);
  });

  it('calculates the ladder for a $100 course', () => {
    const result = calculateCoursePricingLadder(100);

    expect(result.weekly.price).toBe(10.0);
    expect(result.monthly.price).toBe(16.67);
    expect(result.yearly.price).toBe(100.0);
  });

  it('enforces minimum price floors for low priced courses (e.g. $3 course)', () => {
    const result = calculateCoursePricingLadder(3);

    // Weekly raw: 0.30 -> min floor is 0.99
    expect(result.weekly.price).toBe(0.99);
    // Yearly raw: 3 -> min floor is 9.99
    expect(result.yearly.price).toBe(9.99);
    // Monthly raw: 9.99 ÷ 6 = 1.67 -> min floor is 2.99
    expect(result.monthly.price).toBe(2.99);
  });

  it('should handle free course (price 0)', () => {
    const result = calculateCoursePricingLadder(0);

    expect(result.isFree).toBe(true);
    expect(result.weekly.formattedPrice).toBe('FREE');
    expect(result.monthly.formattedPrice).toBe('FREE');
    expect(result.yearly.formattedPrice).toBe('FREE');
  });
});
