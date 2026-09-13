'use client';

import { Tag, X } from 'lucide-react';
import styles from './unlock.module.css';

/**
 * "Have a coupon code?" entry point for the paywall. Purely presentational —
 * ScenePlans owns the code/quote/error state and the validate() call so the
 * exact same logic path handles both the initial Apply tap and the
 * automatic re-validation that fires when the learner switches plans.
 */

export interface CouponQuoteValid {
  valid: true;
  couponId: string;
  discountAmountUsd: number;
  originalPriceUsd: number;
  finalPriceUsd: number;
  currency: string;
  appliedPlan: string;
}

export interface CouponQuoteInvalid {
  valid: false;
  reason: string;
}

export type CouponQuoteResult = CouponQuoteValid | CouponQuoteInvalid;

export const COUPON_REASON_COPY: Record<string, string> = {
  NOT_FOUND: "This coupon code doesn't exist.",
  EXPIRED: 'This coupon has expired.',
  NOT_STARTED: "This coupon isn't active yet.",
  USAGE_LIMIT_REACHED: 'This coupon has reached its usage limit.',
  DISABLED: 'This coupon is currently unavailable.',
  PAUSED: 'This coupon is currently unavailable.',
  PLAN_NOT_ELIGIBLE: "This coupon isn't available for the selected plan.",
  COURSE_NOT_ELIGIBLE: "This coupon isn't available for this course.",
  BELOW_MINIMUM_CHARGE: "This coupon can't be applied to this plan.",
  COUPONS_DISABLED: 'Coupons are temporarily unavailable right now.',
};

interface CouponFieldProps {
  expanded: boolean;
  onExpand: () => void;
  code: string;
  onCodeChange: (code: string) => void;
  quote: CouponQuoteValid | null;
  error: string | null;
  checking: boolean;
  onApply: () => void;
  onRemove: () => void;
}

export default function CouponField({
  expanded,
  onExpand,
  code,
  onCodeChange,
  quote,
  error,
  checking,
  onApply,
  onRemove,
}: CouponFieldProps) {
  if (quote) {
    return (
      <div className={styles.couponBox}>
        <span className={styles.couponAppliedRow}>
          <Tag size={13} />
          <strong>{code}</strong> applied — you save ${quote.discountAmountUsd.toFixed(2)}
        </span>
        <button
          type="button"
          className={styles.couponRemoveBtn}
          onClick={onRemove}
          aria-label="Remove coupon"
        >
          <X size={13} />
        </button>
      </div>
    );
  }

  if (!expanded) {
    return (
      <button type="button" className={styles.couponToggle} onClick={onExpand}>
        Have a coupon code?
      </button>
    );
  }

  return (
    <div className={styles.couponBox}>
      <input
        className={styles.couponInput}
        placeholder="Enter coupon code"
        value={code}
        onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onApply();
          }
        }}
        aria-invalid={!!error}
      />
      <button
        type="button"
        className={styles.couponApplyBtn}
        disabled={checking || !code.trim()}
        onClick={onApply}
      >
        {checking ? '…' : 'Apply'}
      </button>
      {error && (
        <span className={styles.couponErrorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
