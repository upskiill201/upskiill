'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { playSound } from '@/lib/audio/lessonSounds';
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
  /**
   * How the stat feels right now (StatsBar decides):
   *  - 'dim'   streak not kept today yet: grey flame, Duolingo's quiet nudge
   *  - 'low'   last heart left: the heart beats
   *  - 'empty' no hearts: grey
   */
  mood?: 'normal' | 'dim' | 'low' | 'empty';
}

// Each stat's colour is a token in StatPill.module.css (.pill_<type>), never hex.
const STAT_CONFIG: Record<StatType, { icon: string; defaultLabel: string }> = {
  streak: { icon: '/Icons/burn.png', defaultLabel: 'Streak' },
  gem: { icon: '/Icons/gem.png', defaultLabel: 'XP' },
  lives: { icon: '/Icons/heart.png', defaultLabel: 'Lives' },
  coin: { icon: '/Icons/Coin.png', defaultLabel: 'Coins' },
  level: { icon: '/Icons/user-profile.png', defaultLabel: 'Level' },
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
  mood = 'normal',
}) => {
  const cfg = STAT_CONFIG[type];
  const displayLabel = label ?? cfg.defaultLabel;
  const reducedMotion = useReducedMotion();

  // The streak number previously just re-rendered to its new value with zero
  // acknowledgment — the only reaction anywhere was the full-screen STREAK
  // scene reserved for the first completion of the day, so on every other
  // page the pill itself was silent. This is the middle ground: a small pop
  // + chime right on the always-visible pill, every time it actually goes up
  // while mounted (a route swap that remounts this component with an
  // already-current value does not retrigger it — only a real increment
  // does, since the ref starts equal to whatever value first arrives).
  const prevValueRef = useRef(value);
  const iconPulse = useAnimationControls();
  const glowPulse = useAnimationControls();
  useEffect(() => {
    if (type === 'streak' && typeof value === 'number' && typeof prevValueRef.current === 'number' && value > prevValueRef.current) {
      playSound('streakTick', 3);
      if (!reducedMotion) {
        void iconPulse.start({
          scale: [1, 1.35, 1],
          rotate: [0, -12, 10, 0],
          y: [0, -3, 0],
          transition: { duration: 0.55, ease: 'easeInOut' },
        });
        void glowPulse.start({
          boxShadow: [
            '0 0 0 0 color-mix(in srgb, var(--warning) 0%, transparent)',
            '0 0 0 6px color-mix(in srgb, var(--warning) 26%, transparent)',
            '0 0 0 0 color-mix(in srgb, var(--warning) 0%, transparent)',
          ],
          transition: { duration: 0.7, ease: 'easeOut' },
        });
      }
    }
    prevValueRef.current = value;
  }, [value, type, reducedMotion, iconPulse, glowPulse]);

  // Dynamic icon for Coins
  const iconSrc =
    type === 'coin'
      ? !(typeof value === 'number' && value <= 0)
        ? '/Icons/Coin.png'
        : '/Icons/Coin_empty.png'
      : cfg.icon;

  // A cold (0-day) streak, or one not kept today yet, renders grey — like
  // Duolingo's unlit fire. No hearts left: a grey heart.
  const isInactive = (type === 'streak' && (Number(value) <= 0 || mood === 'dim')) || mood === 'empty';

  const formattedValue = formatStatValue(value);
  const typePillClass = styles[`pill_${type}`] || '';

  return (
    <motion.button
      type="button"
      id={`stat-pill-${type}`}
      data-stat-pill={type}
      onClick={onClick}
      onMouseEnter={() => {
        if (!reducedMotion) {
          void iconPulse.start({
            y: [0, -2, 0],
            rotate: type === 'streak' ? [0, -5, 5, 0] : 0,
            transition: { duration: 0.35, ease: 'easeInOut' },
          });
        }
      }}
      animate={glowPulse}
      className={[
        styles.pillBtn,
        typePillClass,
        isInactive ? styles.inactive : '',
        mood === 'low' && !reducedMotion ? styles.low : '',
        variant === 'candy' ? styles.candy : '',
        compact ? styles.pillBtnCompact : '',
        className || '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`${displayLabel}: ${value}`}
    >
      {/* Icon with subtle hover micro-bounce, plus a bigger flare the instant
          the streak actually increments — both driven imperatively through
          iconPulse so the two don't fight over the declarative `animate`
          prop. */}
      <motion.div
        className={styles.iconWrapper}
        animate={iconPulse}
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
      <span className={styles.statValue}>
        {formattedValue}
      </span>
    </motion.button>
  );
};

export default StatPill;
