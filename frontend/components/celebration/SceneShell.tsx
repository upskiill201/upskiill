'use client';

/**
 * SceneShell — the full-page dark scene container every celebration plays in.
 * Full-bleed at every viewport width (320px → desktop): ambient glow, centered
 * content column, one full-width 3D CTA pinned to the bottom (safe-area aware).
 */

import React, { type ReactNode } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import styles from './Scene.module.css';
import { CelebrationCurrency, CURRENCY_ICONS } from './currency';

interface SceneShellProps {
  children: ReactNode;
  cta?: {
    text: string;
    onClick: () => void;
    variant?: 'blue' | 'green' | 'gold' | 'ghost';
    disabled?: boolean;
  } | null;
  /**
   * Quiet text action stacked under the primary CTA (e.g. "BACK TO COURSE"
   * under "START SECTION"). Never replaces the primary — scenes that only
   * need one button leave this off.
   */
  secondaryCta?: { text: string; onClick: () => void };
  /**
   * Skip hatch rendered while the bottom CTA is hidden (server-first request
   * in flight, choreography playing). Rewards are persisted server-first, so
   * skipping only skips animation — no scene may ever trap the learner, and
   * mobile has no Escape key.
   */
  onSkip?: () => void;
  /** Small live balance chip in the top-right corner (chest count-up). */
  cornerBalance?: { currency: CelebrationCurrency; value: number } | null;
}

export default function SceneShell({ children, cta, secondaryCta, onSkip, cornerBalance }: SceneShellProps) {
  const ctaClass =
    cta?.variant === 'green'
      ? styles.ctaGreen
      : cta?.variant === 'gold'
        ? styles.ctaGold
        : cta?.variant === 'ghost'
          ? styles.ctaGhost
          : '';

  return (
    <div className={styles.sceneBackdrop} role="dialog" aria-modal="true" aria-label="Celebration">
      <div className={styles.ambientGlow} aria-hidden />

      {cornerBalance && (
        <div className={styles.cornerBalance} aria-live="polite">
          <Image
            src={CURRENCY_ICONS[cornerBalance.currency]}
            alt=""
            width={20}
            height={20}
            style={{ objectFit: 'contain' }}
          />
          {cornerBalance.value.toLocaleString()}
        </div>
      )}

      {onSkip && (
        <button type="button" className={styles.skipButton} onClick={onSkip} aria-label="Skip celebration">
          <X size={16} strokeWidth={2.6} />
        </button>
      )}

      <div className={styles.contentColumn}>
        <div className={styles.contentInner}>{children}</div>
      </div>

      {cta && (
        <div className={styles.bottomAction}>
          <button
            type="button"
            className={`${styles.ctaButton} ${ctaClass}`}
            onClick={cta.onClick}
            disabled={cta.disabled}
          >
            {cta.text}
          </button>
          {secondaryCta && !cta.disabled && (
            <button
              type="button"
              className={styles.secondaryCta}
              onClick={secondaryCta.onClick}
            >
              {secondaryCta.text}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
