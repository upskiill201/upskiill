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
}

/**
 * Duolingo-style selectable plan row — a big tappable radio option used in
 * the course paywall's radiogroup. Savings copy comes straight from the
 * pricing ladder (`plan.savingsText`), never hardcoded.
 */
export default function PlanRow({ plan, selected, onSelect, badge }: PlanRowProps) {
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
        <span className={styles.priceAmount}>
          {plan.formattedPrice === 'FREE' ? 'FREE' : `$${plan.price.toFixed(2)}`}
        </span>
        <span className={styles.priceInterval}>{plan.intervalText}</span>
        {plan.effectiveMonthly !== undefined && plan.effectiveMonthly !== plan.price && (
          <span className={styles.effectiveNote}>
            ≈ ${plan.effectiveMonthly.toFixed(2)}/mo
          </span>
        )}
      </span>
    </motion.button>
  );
}
