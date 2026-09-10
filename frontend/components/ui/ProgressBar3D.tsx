import React from 'react';
import styles from './ProgressBar3D.module.css';

interface ProgressBar3DProps {
  /** 0-100 */
  percentage: number;
  label?: string;
  valueLabel?: string;
  size?: 'sm' | 'md';
  color?: 'blue' | 'green' | 'purple';
  className?: string;
}

/**
 * Duolingo-style 3D-lip progress bar — a raised bottom-border "lip" gives
 * the fill depth, matching the technique already used by
 * `components/creator-onboarding/DuolingoButton3D.tsx` (border-b as depth,
 * no box-shadow/glow anywhere). Purely decorative/non-interactive, so unlike
 * the button there's no active/press state.
 */
export default function ProgressBar3D({
  percentage,
  label,
  valueLabel,
  size = 'md',
  color = 'blue',
  className = '',
}: ProgressBar3DProps) {
  const clamped = Math.max(0, Math.min(100, percentage));

  return (
    <div className={`${styles.container} ${className}`}>
      {(label || valueLabel) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {valueLabel && <span className={styles.value}>{valueLabel}</span>}
        </div>
      )}
      <div
        className={`${styles.track} ${styles[size]}`}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className={`${styles.fill} ${styles[color]}`} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
