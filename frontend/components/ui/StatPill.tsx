'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './StatPill.module.css';

export type StatType = 'streak' | 'gem' | 'lives' | 'coin' | 'level';

interface StatPillProps {
  type: StatType;
  value: number | string;
  /** Extra label below the number, defaults match each type */
  label?: string;
  /** Compact mode (icon only + number, no label) */
  compact?: boolean;
  /** Extra class for the label span (used for responsive hiding) */
  labelClassName?: string;
  onClick?: () => void;
  className?: string;
}

const STAT_CONFIG: Record<
  StatType,
  {
    icon: string;
    defaultLabel: string;
    color: string;
    glow: string;
  }
> = {
  streak: {
    icon: '/Icons/burn.png',
    defaultLabel: 'Streak',
    color: '#EA580C',
    glow: 'rgba(255,138,0,0.25)',
  },
  gem: {
    icon: '/Icons/gem.png',
    defaultLabel: 'XP',
    color: '#0172FD',
    glow: 'rgba(1,114,253,0.22)',
  },
  lives: {
    icon: '/Icons/heart.png',
    defaultLabel: 'Lives',
    color: '#E11D48',
    glow: 'rgba(255,75,75,0.22)',
  },
  coin: {
    icon: '/Icons/Coin.png',
    defaultLabel: 'Coins',
    color: '#CA8A04',
    glow: 'rgba(234,179,8,0.25)',
  },
  level: {
    icon: '/Icons/user-profile.png',
    defaultLabel: 'Level',
    color: '#9333EA',
    glow: 'rgba(168,85,247,0.25)',
  },
};

function formatStatValue(val: number | string): string {
  if (typeof val === 'number') {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
    return String(val);
  }
  return String(val);
}

/**
 * Duolingo-style gamified stat pill with tactile 3D borders.
 */
export const StatPill: React.FC<StatPillProps> = ({
  type,
  value,
  label,
  compact = false,
  labelClassName,
  onClick,
  className,
}) => {
  const cfg = STAT_CONFIG[type];
  const displayLabel = label ?? cfg.defaultLabel;
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic icon for Coins
  const iconSrc =
    type === 'coin'
      ? Number(value) > 0
        ? '/Icons/Coin.png'
        : '/Icons/Coin_empty.png'
      : cfg.icon;

  const formattedValue = formatStatValue(value);
  const typePillClass = styles[`pill_${type}`] || '';

  return (
    <motion.button
      type="button"
      id={`stat-pill-${type}`}
      data-stat-pill={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${styles.pillBtn} ${typePillClass} ${compact ? styles.pillBtnCompact : ''} ${className || ''}`}
      aria-label={`${displayLabel}: ${value}`}
    >
      {/* 3D icon with subtle hover micro-bounce */}
      <motion.div
        className={styles.iconWrapper}
        animate={{
          y: isHovered ? [0, -2, 0] : 0,
          rotate: isHovered && type === 'streak' ? [0, -5, 5, 0] : 0,
        }}
        transition={{
          duration: 0.35,
          ease: 'easeInOut',
        }}
      >
        <Image
          src={iconSrc}
          alt={displayLabel}
          fill
          sizes="28px"
          style={{ objectFit: 'contain' }}
          priority
        />
      </motion.div>

      {/* Number + label */}
      <div className={styles.textCol}>
        <span
          className={styles.statValue}
          style={{ color: cfg.color }}
        >
          {formattedValue}
        </span>

        {!compact && (
          <span
            className={`${styles.statLabel} ${labelClassName || ''}`}
            style={{ color: cfg.color }}
          >
            {displayLabel}
          </span>
        )}
      </div>
    </motion.button>
  );
};

export default StatPill;
