'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { PlanPricing } from '@/lib/pricing-engine';
import styles from './PlanRow.module.css';

interface PlanRowProps {
  plan: PlanPricing;
  selected: boolean;
  onSelect: () => void;
  /** Gold ribbon chip pinned to the top edge, e.g. MOST POPULAR. */
  badge?: { icon: LucideIcon; text: string };
  /**
   * Set only when a validated coupon quote applies to THIS plan — the number
   * always comes from the backend's /coupons/validate response, never
   * computed here. `plan.price` still renders, struck through, so the
   * discount always reads as a discount off the real price.
   */
  discountedPrice?: number;
}

/**
 * Duolingo-style selectable plan row — a big tappable radio option used in
 * the course paywall's radiogroup. Savings copy comes straight from the
 * pricing ladder (`plan.savingsText`), never hardcoded.
 */
export default function PlanRow({ plan, selected, onSelect, badge, discountedPrice }: PlanRowProps) {
  const BadgeIcon = badge?.icon;

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`${styles.planRow} ${selected ? styles.planRowSelected : ''}`}
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
    >
      {badge && BadgeIcon && (
        <span className={styles.badgeChip}>
          <BadgeIcon size={10} strokeWidth={2.75} />
          <span>{badge.text}</span>
        </span>
      )}

      {/* Custom radio circle */}
      <span className={styles.radioCircle} aria-hidden="true">
        {selected && <span className={styles.radioDot} />}
      </span>

      <span className={styles.rowInfo}>
        <span className={styles.planName}>{plan.plan}</span>
        {plan.savingsText && (
          <span className={styles.savingsText}>{plan.savingsText}</span>
        )}
        {!plan.savingsText && (
          <span className={styles.savingsTextNeutral}>{plan.periodLabel}</span>
        )}
      </span>

      <span className={styles.priceGroup}>
        {discountedPrice !== undefined && plan.formattedPrice !== 'FREE' ? (
          <>
            <span className={styles.priceOriginal}>${plan.price.toFixed(2)}</span>
            <span className={`${styles.priceAmount} ${styles.priceDiscounted}`}>
              ${discountedPrice.toFixed(2)}
            </span>
            <span className={styles.couponAppliedChip}>Coupon applied</span>
          </>
        ) : (
          <span className={styles.priceAmount}>
            {plan.formattedPrice === 'FREE' ? 'FREE' : `$${plan.price.toFixed(2)}`}
          </span>
        )}
        <span className={styles.priceInterval}>{plan.intervalText}</span>
        {discountedPrice === undefined &&
          plan.effectiveMonthly !== undefined &&
          plan.effectiveMonthly !== plan.price && (
            <span className={styles.effectiveNote}>
              ≈ ${plan.effectiveMonthly.toFixed(2)}/mo
            </span>
          )}
      </span>
    </motion.button>
  );
}
