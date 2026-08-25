'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './StatPill.module.css';

export type StatType = 'streak' | 'gem' | 'lives' | 'coin' | 'level';

/**
 * - 'flat': borderless Duolingo homescreen style — bare icon + bold colored number
 * - 'candy': tactile 3D pills with per-stat colors (shop coin card context)
 */
export type StatVariant = 'flat' | 'candy';

interface StatPillProps {
  type: StatType;
  value: number | string;
  /** Accessible name only — values render without visible text labels (Duolingo style) */
  label?: string;
  /** Tighter gutters for narrow containers (drawer / mobile) */
  compact?: boolean;
  variant?: StatVariant;
  onClick?: () => void;
  className?: string;
}

const STAT_CONFIG: Record<
  StatType,
  {
    icon: string;
    defaultLabel: string;
    color: string;
  }
> = {
  streak: {
    icon: '/Icons/burn.png',
    defaultLabel: 'Streak',
    color: '#EA580C',
  },
  gem: {
    icon: '/Icons/gem.png',
    defaultLabel: 'XP',
    color: '#0172FD',
  },
  lives: {
    icon: '/Icons/heart.png',
    defaultLabel: 'Lives',
    color: '#E11D48',
  },
  coin: {
    icon: '/Icons/Coin.png',
    defaultLabel: 'Coins',
    color: '#CA8A04',
  },
  level: {
    icon: '/Icons/user-profile.png',
    defaultLabel: 'Level',
    color: '#9333EA',
  },
};

/** Brand --text-muted: used for a cold (0-day) streak, like Duolingo's gray fire */
const INACTIVE_COLOR = '#94A3B8';

function formatStatValue(val: number | string): string {
  if (typeof val === 'number') {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
    return String(val);
  }
  return String(val);
}

/**
 * Duolingo-style flat game stat: icon + bold colored number, no border, no 3D.
 */
export const StatPill: React.FC<StatPillProps> = ({
  type,
  value,
  label,
  compact = false,
  variant = 'flat',
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

  // A cold (0-day) streak renders grayed-out, like Duolingo's inactive fire
  const isInactive = type === 'streak' && Number(value) <= 0;
  const valueColor = isInactive ? INACTIVE_COLOR : cfg.color;

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
      className={[
        styles.pillBtn,
        typePillClass,
        variant === 'candy' ? styles.candy : '',
        compact ? styles.pillBtnCompact : '',
        className || '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`${displayLabel}: ${value}`}
    >
      {/* Icon with subtle hover micro-bounce */}
      <motion.div
        className={styles.iconWrapper}
        style={isInactive ? { filter: 'grayscale(1) opacity(0.55)' } : undefined}
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
          alt=""
          fill
          sizes="28px"
          style={{ objectFit: 'contain' }}
          priority
        />
      </motion.div>

      {/* Bold colored value, Duolingo-style */}
      <span className={styles.statValue} style={{ color: valueColor }}>
        {formattedValue}
      </span>
    </motion.button>
  );
};

export default StatPill;
