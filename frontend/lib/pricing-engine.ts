/**
 * Teyro Course Access Pricing Engine
 *
 * Converts a creator's single Course Base Value (e.g. $30) into an automated,
 * psychology-backed subscription ladder (Weekly, Monthly, Yearly).
 *
 * Formulas (since 2026-09-28 — the creator's price IS the yearly plan):
 *  - Yearly (365 days): the creator's price (min $9.99)
 *  - Monthly (30 days): Yearly ÷ 6, rounded up — yearly saves 50% (min $2.99)
 *  - Weekly (7 days):   Base Price ÷ 10 (min $0.99) — legacy tier, removed in
 *    the upcoming app release
 * Display only — the backend's identical engine decides the charge.
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

  // 2. Yearly Calculation (365 Days) — since 2026-09-28 the creator's price
  //    IS the yearly plan.
  const yearlyPrice = roundToCleanPrice(Math.max(MIN_YEARLY_FLOOR, cleanBase));

  // 3. Monthly Calculation (30 Days) — yearly ÷ 6, rounded UP to the cent, so
  //    paying yearly always saves at least 50%.
  const monthlyPrice = Math.max(MIN_MONTHLY_FLOOR, Math.ceil((yearlyPrice / 6) * 100 - 1e-9) / 100);

  // Calculations for savings comparison
  const monthlySavingsVsWeekly = Math.round(((weeklyPrice * 4 - monthlyPrice) / (weeklyPrice * 4)) * 100);
  // The real saving — shown to learners, so it is never rounded up.
  const yearlySavingsVsMonthly = Math.floor(((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12)) * 100);

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
    savingsText: `Save ${yearlySavingsVsMonthly}% vs monthly`,
    savingsPercent: yearlySavingsVsMonthly,
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
