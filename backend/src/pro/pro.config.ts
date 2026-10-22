/**
 * Teyro Pro: one subscription that unlocks every course.
 *
 * Every number the paywall shows comes from here or from Stripe's live
 * prices, never from copy. Founder decisions, 2026-10-22: $12.99/month,
 * $59.99/year, 7-day trial with a card, 3 free lessons a day, a one-time
 * 30% first-year offer only for "too expensive", creators paid from a 50%
 * per-subscriber pool.
 */
import type { ProPlan } from '@prisma/client';

export const PRO_PRICES_MINOR: Record<ProPlan, number> = {
  MONTHLY: 1299,
  YEARLY: 5999,
};

/** Stripe lookup keys; prices are immutable, so a new price is a new _vN key. */
export const PRO_PRICE_LOOKUP_KEYS: Record<ProPlan, string> = {
  MONTHLY: 'teyro_pro_monthly_usd_v1',
  YEARLY: 'teyro_pro_yearly_usd_v1',
};
export const PRO_PRODUCT_ID = 'teyro_pro';
export const PRO_EXIT_COUPON_ID = 'teyro_pro_exit_y1_30_v1';
export const PRO_PORTAL_CONFIG_KEY = 'pro_portal_v1';

/** Stripe API version for Pro only; the legacy course client stays on acacia. */
export const PRO_STRIPE_API_VERSION = '2026-03-25.dahlia';

export const PRO_TRIAL_DAYS = 7;
/** Trial reminder lands between 48h and 24h before the trial ends (day 5). */
export const PRO_TRIAL_REMINDER_HOURS_BEFORE = 48;

export const PRO_EXIT_OFFER = {
  kind: 'EXIT_YEARLY_FIRST_YEAR',
  plan: 'YEARLY' as ProPlan,
  percentOff: 30,
  hours: 24,
} as const;

/** Grace after a failed renewal. A failed first charge after a trial gets none. */
export function proGraceDays(): number {
  const n = Number(process.env.PRO_GRACE_DAYS ?? 7);
  return Number.isFinite(n) && n >= 0 ? n : 7;
}

export function proFreeDailyCap(): number {
  const n = Number(process.env.PRO_FREE_DAILY_CAP ?? 3);
  return Number.isInteger(n) && n > 0 ? n : 3;
}

export function proPoolSharePct(): number {
  const n = Number(process.env.PRO_POOL_SHARE_PCT ?? 50);
  return Number.isInteger(n) && n >= 0 && n <= 100 ? n : 50;
}

/** Days a free learner waits before moving their free course to another. */
export const FREE_COURSE_SWITCH_DAYS = 30;

/** Checkout attempt caps per user: the card-testing defence. */
export const PRO_ATTEMPTS_PER_HOUR = 5;
export const PRO_ATTEMPTS_PER_DAY = 10;

export function isProductionEnvironment(): boolean {
  return (
    process.env.ENVIRONMENT === 'production' ||
    (process.env.NODE_ENV === 'production' && !process.env.ENVIRONMENT)
  );
}

/**
 * Pro gates access only when switched on. Unset means on everywhere except
 * production, so staging and local dev get it automatically and production
 * waits for the founder to set PRO_ENABLED=true on launch day.
 */
export function isProEnabled(): boolean {
  const flag = process.env.PRO_ENABLED;
  if (flag === 'true') return true;
  if (flag === 'false') return false;
  return !isProductionEnvironment();
}

export const PAYWALL_MOMENTS = [
  'ONBOARDING',
  'LOCKED_LESSON',
  'DAILY_LIMIT',
  'OUT_OF_HEARTS',
  'AFTER_SUCCESS',
  'RETURN_AFTER_BREAK',
  'DEEP_LINK',
  'SETTINGS',
  'STREAK_REPAIR',
] as const;
export type PaywallMoment = (typeof PAYWALL_MOMENTS)[number];
