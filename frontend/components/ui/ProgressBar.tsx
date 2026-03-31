'use client';

import React, { useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';

export type ProgressBarProps = {
  value: number;             // 0–100
  label?: string;            // "12 of 36 lessons complete"
  showPercentage?: boolean;  // "34%" shown at end
  color?: 'blue' | 'green' | 'purple';
  size?: 'sm' | 'md';
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercentage,
  color = 'blue',
  size = 'md',
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Slight delay to ensure the transition fires in the DOM upon mounting
    const timeout = setTimeout(() => {
      setAnimatedValue(Math.min(100, Math.max(0, value)));
    }, 50);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className={styles.container}>
      {(label || showPercentage) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showPercentage && <span className={styles.percentage}>{Math.round(value)}%</span>}
        </div>
      )}
      <div className={`${styles.track} ${styles[size]}`}>
        <div
          className={`${styles.fill} ${styles[color]}`}
          style={{ width: `${animatedValue}%` }}
          role="progressbar"
          aria-valuenow={animatedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
