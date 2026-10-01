import { calculateCoursePricingLadder } from './pricing-engine';

describe('PricingEngine', () => {
  it('uses the creator’s price as the yearly plan, and yearly ÷ 6 as monthly', () => {
    const result = calculateCoursePricingLadder(30);

    expect(result.baseValue).toBe(30);
    expect(result.isFree).toBe(false);

    // Yearly: exactly the price the creator set
    expect(result.yearly.price).toBe(30.0);
    expect(result.yearly.formattedPrice).toBe('$30.00');
    expect(result.yearly.durationDays).toBe(365);
    expect(result.yearly.isBestValue).toBe(true);

    // Monthly: 30 ÷ 6 = 5.00, so yearly saves 50%
    expect(result.monthly.price).toBe(5.0);
    expect(result.monthly.formattedPrice).toBe('$5.00');
    expect(result.monthly.durationDays).toBe(30);
    expect(result.monthly.isDefault).toBe(true);
    expect(result.yearly.savingsPercent).toBe(50);
    expect(result.yearly.savingsText).toBe('Save 50% vs monthly');
  });

  it('rounds monthly UP to the cent so the saving is never below 50%', () => {
    // 50 ÷ 6 = 8.333… → 8.34
    expect(calculateCoursePricingLadder(50).monthly.price).toBe(8.34);
    // 20 ÷ 6 = 3.333… → 3.34 (rounding down would make it "save 49%")
    const twenty = calculateCoursePricingLadder(20);
    expect(twenty.monthly.price).toBe(3.34);
    expect(twenty.yearly.savingsPercent).toBe(50);
  });

  it('calculates the ladder for a $100 course', () => {
    const result = calculateCoursePricingLadder(100);

    expect(result.yearly.price).toBe(100.0);
    expect(result.monthly.price).toBe(16.67);
  });

  it('enforces the minimum floors for low prices (e.g. $3)', () => {
    const result = calculateCoursePricingLadder(3);

    // Yearly raw: 3 → floor 9.99
    expect(result.yearly.price).toBe(9.99);
    // Monthly raw: 9.99 ÷ 6 = 1.67 → floor 2.99
    expect(result.monthly.price).toBe(2.99);
    // The saving reported is the real one, not a rounded-up claim
    expect(result.yearly.savingsPercent).toBe(72);
  });

  it('handles a free course (price 0)', () => {
    const result = calculateCoursePricingLadder(0);

    expect(result.isFree).toBe(true);
    expect(result.monthly.formattedPrice).toBe('FREE');
    expect(result.yearly.formattedPrice).toBe('FREE');
  });

  it('offers exactly two plans, monthly then yearly, with no weekly option', () => {
    const paid = calculateCoursePricingLadder(30);
    expect(paid.plans.map((p) => p.plan)).toEqual(['MONTHLY', 'YEARLY']);
    expect('weekly' in paid).toBe(false);
    expect(calculateCoursePricingLadder(0).plans.map((p) => p.plan)).toEqual(['MONTHLY', 'YEARLY']);
  });
});
