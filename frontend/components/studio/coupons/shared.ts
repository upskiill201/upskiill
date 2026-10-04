export type CouponDiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT';
export type AccessPlan = 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type CouponDerivedStatus =
  | 'SCHEDULED'
  | 'ACTIVE'
  | 'PAUSED'
  | 'DISABLED'
  | 'ARCHIVED'
  | 'EXPIRED'
  | 'USAGE_LIMIT_REACHED';

export interface Coupon {
  id: string;
  code: string;
  internalName: string | null;
  discountType: CouponDiscountType;
  discountValue: number;
  state: string;
  derivedStatus: CouponDerivedStatus;
  startsAt: string;
  expiresAt: string | null;
  maxRedemptions: number | null;
  successfulRedemptions: number;
  eligibleCourses: { courseId: string; course?: { id: string; title: string } }[];
  eligiblePlans: { plan: AccessPlan }[];
  createdAt: string;
}

export interface CouponAnalytics {
  redemptions: number;
  grossUsd: number;
  discountUsd: number;
  netUsd: number;
  creatorEarningsUsd: number;
  teyroEarningsUsd: number;
}

export interface CouponDetail extends Coupon {
  redemptions: {
    id: string;
    publicId: string;
    courseId: string;
    plan: AccessPlan;
    originalPriceUsd: number;
    discountAmountUsd: number;
    finalPriceUsd: number;
    outcome: string;
    createdAt: string;
  }[];
  analytics: CouponAnalytics;
}

export function usd(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function discountLabel(coupon: Pick<Coupon, 'discountType' | 'discountValue'>): string {
  return coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}% OFF` : `${usd(coupon.discountValue)} OFF`;
}

export const STATUS_LABEL: Record<CouponDerivedStatus, string> = {
  SCHEDULED: 'Scheduled',
  ACTIVE: 'Active',
  PAUSED: 'Paused',
  DISABLED: 'Disabled',
  ARCHIVED: 'Archived',
  EXPIRED: 'Expired',
  USAGE_LIMIT_REACHED: 'Limit reached',
};

export const STATUS_PILL_CLASS: Record<CouponDerivedStatus, string> = {
  SCHEDULED: 'pillScheduled',
  ACTIVE: 'pillActive',
  PAUSED: 'pillPaused',
  DISABLED: 'pillDisabled',
  ARCHIVED: 'pillArchived',
  EXPIRED: 'pillExpired',
  USAGE_LIMIT_REACHED: 'pillUsageLimitReached',
};
