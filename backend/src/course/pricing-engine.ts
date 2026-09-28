/**
 * Teyro Course Access Pricing Engine (Backend)
 *
 * Converts the price a creator sets into a two-plan subscription ladder:
 * Monthly and Yearly. There is no weekly plan — it was removed 2026-09-24.
 * Legacy WEEKLY subscriptions still renew server-side, but no new ones can be
 * bought.
 *
 * Formulas (since 2026-09-28 — the price the creator types IS the yearly plan):
 *  - Yearly (365 days): the creator's price (min $9.99)
 *  - Monthly (30 days): Yearly ÷ 6, so paying yearly saves 50% (min $2.99)
 *
 * Existing Stripe subscriptions keep the amount they were created with; only
 * new checkouts use this ladder. Keep in lockstep with frontend/lib/pricing-engine.ts.
 */

export type AccessPlanType = 'MONTHLY' | 'YEARLY';

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
  monthly: PlanPricing;
  yearly: PlanPricing;
  plans: PlanPricing[];
}

const MIN_MONTHLY_FLOOR = 2.99;
const MIN_YEARLY_FLOOR = 9.99;
/** Months of monthly billing a yearly plan costs: 6 → yearly saves 50%. */
export const YEARLY_IN_MONTHS = 6;

export function roundToCleanPrice(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function formatCurrency(amount: number, currency: string = '$'): string {
  if (amount === 0) return 'FREE';
  const rounded = roundToCleanPrice(amount);
  return `${currency}${rounded.toFixed(2)}`;
}

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
      monthly: freePlan,
      yearly: { ...freePlan, plan: 'YEARLY', durationDays: 365 },
      plans: [
        { ...freePlan, plan: 'MONTHLY', durationDays: 30, periodLabel: '30 days access', isDefault: true },
        { ...freePlan, plan: 'YEARLY', durationDays: 365, periodLabel: '365 days access', isBestValue: true },
      ],
    };
  }

  const yearlyPrice = roundToCleanPrice(Math.max(MIN_YEARLY_FLOOR, cleanBase));
  // Rounded UP to the cent, so "save 50%" is always true, never 49.9%.
  const monthlyPrice = Math.max(MIN_MONTHLY_FLOOR, Math.ceil((yearlyPrice / YEARLY_IN_MONTHS) * 100 - 1e-9) / 100);

  // The real saving — shown to learners, so it must never be rounded up.
  const yearlySavingsVsMonthly = Math.floor(((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12)) * 100);

  const monthly: PlanPricing = {
    plan: 'MONTHLY',
    durationDays: 30,
    price: monthlyPrice,
    formattedPrice: formatCurrency(monthlyPrice),
    periodLabel: '30 days of access',
    intervalText: '/month',
    isDefault: true,
    badge: 'Most flexible',
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
    badge: 'Best value',
    savingsText: `Save ${yearlySavingsVsMonthly}% vs monthly`,
    savingsPercent: yearlySavingsVsMonthly,
    effectiveMonthly: roundToCleanPrice(yearlyPrice / 12),
  };

  return {
    baseValue: cleanBase,
    isFree: false,
    monthly,
    yearly,
    plans: [monthly, yearly],
  };
}

/** Plans a learner can buy today. WEEKLY survives only in the DB enum for legacy renewals. */
export const PURCHASABLE_PLANS: readonly AccessPlanType[] = ['MONTHLY', 'YEARLY'];

export function isPurchasablePlan(plan: unknown): plan is AccessPlanType {
  return typeof plan === 'string' && (PURCHASABLE_PLANS as readonly string[]).includes(plan);
}
