'use client';

import { motion } from 'framer-motion';
import { Glyph, type GlyphName } from '@/components/art/Glyph';
import type { PlanPricing } from '@/lib/pricing-engine';
import styles from './PlanRow.module.css';

interface PlanRowProps {
  plan: PlanPricing;
  selected: boolean;
  onSelect: () => void;
  /** Ribbon chip pinned to the top edge, e.g. BEST VALUE · SAVE 50%. Must be true. */
  badge?: { icon: GlyphName; text: string };
  /**
   * What this plan would cost at the other plan's rate — the monthly price ×
   * 12 on the yearly row — struck through as the price anchor. Real numbers
   * from the ladder only, never an invented "was" price.
   */
  anchorPrice?: number;
  /**
   * Set only when a validated coupon quote applies to THIS plan — the number
   * always comes from the backend's /coupons/validate response, never
   * computed here. Coupons discount the FIRST payment only, and the row says so.
   */
  discountedPrice?: number;
  /** Formats a USD amount for display — local currency for Cameroon (lib/localPrice.ts). */
  format?: (usd: number) => string;
}

const money = (n: number) => `$${n.toFixed(2)}`;

/**
 * Duolingo-style selectable plan row. Paywall rules it follows (App Store
 * paywall practice, and the auto-renewal disclosure laws behind it):
 *   - Lead with the per-month price, so plans compare like for like.
 *   - Always state the amount actually billed and how often — no plan may
 *     hide its real charge behind a per-month figure.
 *   - Anchors and savings are computed from the real ladder, never invented.
 */
export default function PlanRow({ plan, selected, onSelect, badge, anchorPrice, discountedPrice, format = money }: PlanRowProps) {
  const isYearly = plan.plan === 'YEARLY';
  const perMonth = plan.effectiveMonthly ?? plan.price;
  const hasCoupon = discountedPrice !== undefined && plan.formattedPrice !== 'FREE';

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`${styles.planRow} ${selected ? styles.planRowSelected : ''}`}
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
    >
      {badge && (
        <span className={styles.badgeChip}>
          <Glyph name={badge.icon} size={10} strokeWidth={2.75} />
          <span>{badge.text}</span>
        </span>
      )}

      <span className={styles.radioCircle} aria-hidden="true">
        {selected && <span className={styles.radioDot} />}
      </span>

      <span className={styles.rowInfo}>
        <span className={styles.planName}>{isYearly ? 'Yearly' : 'Monthly'}</span>
        <span className={styles.savingsTextNeutral}>
          {isYearly ? `${format(plan.price)} billed once a year` : 'Billed every month'}
        </span>
        {isYearly && plan.savingsPercent ? (
          <span className={styles.savingsText}>You save {plan.savingsPercent}%</span>
        ) : null}
      </span>

      <span className={styles.priceGroup}>
        {plan.formattedPrice === 'FREE' ? (
          <span className={styles.priceAmount}>FREE</span>
        ) : (
          <>
            <span className={styles.priceAmount}>
              {format(perMonth)}
              <span className={styles.perMonth}>/mo</span>
            </span>
            {hasCoupon ? (
              <>
                <span className={styles.anchorRow}>
                  <span className={styles.priceOriginal}>{format(plan.price)}</span>
                  <span className={`${styles.anchorNow} ${styles.priceDiscounted}`}>{format(discountedPrice!)}</span>
                </span>
                <span className={styles.couponAppliedChip}>Coupon · first payment</span>
              </>
            ) : isYearly && anchorPrice && anchorPrice > plan.price ? (
              <span className={styles.anchorRow}>
                <span className={styles.priceOriginal}>{format(anchorPrice)}</span>
                <span className={styles.anchorNow}>{format(plan.price)}/yr</span>
              </span>
            ) : null}
          </>
        )}
      </span>
    </motion.button>
  );
}
