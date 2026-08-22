/**
 * Teyro Course Access Pricing Engine
 *
 * Converts a creator's single Course Base Value (e.g. $30) into an automated,
 * psychology-backed subscription ladder (Weekly, Monthly, Yearly).
 *
 * Formulas:
 *  - Weekly (7 days):   Base Price ÷ 10 (min $0.99)
 *  - Monthly (30 days): Weekly × 4 × 70% (min $2.99) [30% discount vs weekly]
 *  - Yearly (365 days): Base Price × 80% (min $9.99) [~76% discount vs monthly]
 */

export type AccessPlanType = 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface PlanPricing {
  plan: AccessPlanType;
  durationDays: number;
  price: number;
  formattedPrice: string;
  periodLabel: string;
  intervalText: string;
  badge?: string;
  isDefault?: boolean;
  isBestValue?: boolean;
  savingsText?: string;
  savingsPercent?: number;
  effectiveMonthly?: number;
}

export interface CoursePricingLadder {
  baseValue: number;
  isFree: boolean;
  weekly: PlanPricing;
  monthly: PlanPricing;
  yearly: PlanPricing;
  plans: PlanPricing[];
}

const MIN_WEEKLY_FLOOR = 0.99;
const MIN_MONTHLY_FLOOR = 2.99;
const MIN_YEARLY_FLOOR = 9.99;

/**
 * Clean 2-decimal rounding
 */
export function roundToCleanPrice(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/**
 * Format currency with 2 decimals if has cents, or 2 decimals for standard currency view
 */
export function formatCurrency(amount: number, currency: string = '$'): string {
  if (amount === 0) return 'FREE';
  const rounded = roundToCleanPrice(amount);
  return `${currency}${rounded.toFixed(2)}`;
}

/**
 * Calculate the complete pricing ladder from a course base value
 */
export function calculateCoursePricingLadder(baseValue: number = 0): CoursePricingLadder {
  const cleanBase = Math.max(0, Number(baseValue) || 0);

  if (cleanBase === 0) {
    const freePlan: PlanPricing = {
      plan: 'MONTHLY',
      durationDays: 365,
      price: 0,
      formattedPrice: 'FREE',
      periodLabel: 'Unlimited Access',
      intervalText: 'free',
      isDefault: true,
    };
    return {
      baseValue: 0,
      isFree: true,
      weekly: { ...freePlan, plan: 'WEEKLY', durationDays: 7 },
      monthly: freePlan,
      yearly: { ...freePlan, plan: 'YEARLY', durationDays: 365 },
      plans: [
        { ...freePlan, plan: 'WEEKLY', durationDays: 7, periodLabel: '7 days access' },
        { ...freePlan, plan: 'MONTHLY', durationDays: 30, periodLabel: '30 days access', isDefault: true },
        { ...freePlan, plan: 'YEARLY', durationDays: 365, periodLabel: '365 days access', isBestValue: true },
      ],
    };
  }

  // 1. Weekly Calculation (7 Days)
  const rawWeekly = cleanBase / 10;
  const weeklyPrice = roundToCleanPrice(Math.max(MIN_WEEKLY_FLOOR, rawWeekly));

  // 2. Monthly Calculation (30 Days) - 30% discount on 4 weeks
  const rawMonthly = weeklyPrice * 4 * 0.70;
  const monthlyPrice = roundToCleanPrice(Math.max(MIN_MONTHLY_FLOOR, rawMonthly));

  // 3. Yearly Calculation (365 Days) - 20% discount on base value
  const rawYearly = cleanBase * 0.80;
  const yearlyPrice = roundToCleanPrice(Math.max(MIN_YEARLY_FLOOR, rawYearly));

  // Calculations for savings comparison
  const monthlySavingsVsWeekly = Math.round(((weeklyPrice * 4 - monthlyPrice) / (weeklyPrice * 4)) * 100);
  const yearlySavingsVsMonthly = Math.round(((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12)) * 100);

  const weekly: PlanPricing = {
    plan: 'WEEKLY',
    durationDays: 7,
    price: weeklyPrice,
    formattedPrice: formatCurrency(weeklyPrice),
    periodLabel: '7 days of access',
    intervalText: '/week',
    effectiveMonthly: roundToCleanPrice(weeklyPrice * 4.33),
  };

  const monthly: PlanPricing = {
    plan: 'MONTHLY',
    durationDays: 30,
    price: monthlyPrice,
    formattedPrice: formatCurrency(monthlyPrice),
    periodLabel: '30 days of access',
    intervalText: '/month',
    isDefault: true,
    badge: '⭐ Best for learning',
    savingsText: `Save ${Math.max(15, monthlySavingsVsWeekly)}% vs weekly`,
    savingsPercent: Math.max(15, monthlySavingsVsWeekly),
    effectiveMonthly: monthlyPrice,
  };

  const yearly: PlanPricing = {
    plan: 'YEARLY',
    durationDays: 365,
    price: yearlyPrice,
    formattedPrice: formatCurrency(yearlyPrice),
    periodLabel: '365 days of access',
    intervalText: '/year',
    isBestValue: true,
    badge: '🏆 Best value',
    savingsText: `Save ${Math.max(50, yearlySavingsVsMonthly)}% vs monthly`,
    savingsPercent: Math.max(50, yearlySavingsVsMonthly),
    effectiveMonthly: roundToCleanPrice(yearlyPrice / 12),
  };

  return {
    baseValue: cleanBase,
    isFree: false,
    weekly,
    monthly,
    yearly,
    plans: [weekly, monthly, yearly],
  };
}
