'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type StatType = 'streak' | 'gem' | 'lives' | 'coin';

interface StatPillProps {
  type: StatType;
  value: number | string;
  /** Extra label below the number, defaults match each type */
  label?: string;
  /** Compact mode (icon only + number, no label) */
  compact?: boolean;
  onClick?: () => void;
  className?: string;
}

const STAT_CONFIG: Record<StatType, { icon: string; defaultLabel: string; color: string; glow: string }> = {
  streak: {
    icon: '/Icons/burn.png',
    defaultLabel: 'Day Streak',
    color: '#FF9600',
    glow: 'rgba(255,150,0,0.30)',
  },
  gem: {
    icon: '/Icons/gem.png',
    defaultLabel: 'XP Balance',
    color: '#0172FD',
    glow: 'rgba(1,114,253,0.22)',
  },
  lives: {
    icon: '/Icons/heart.png',
    defaultLabel: 'Lives',
    color: '#FF4B4B',
    glow: 'rgba(255,75,75,0.22)',
  },
  coin: {
    icon: '/Icons/Coin.png',
    defaultLabel: 'Coins',
    color: '#EAB308',
    glow: 'rgba(234,179,8,0.30)',
  },
};

/**
 * Duolingo-style gamified stat pill.
 * Uses generated 3D icon images with spring bounce animation.
 */
export const StatPill: React.FC<StatPillProps> = ({
  type,
  value,
  label,
  compact = false,
  onClick,
  className,
}) => {
  const cfg = STAT_CONFIG[type];
  const displayLabel = label ?? cfg.defaultLabel;

  // Dynamic icon for Coins (Coin.png when > 0, Coin_empty.png when 0)
  const iconSrc =
    type === 'coin'
      ? Number(value) > 0
        ? '/Icons/Coin.png'
        : '/Icons/Coin_empty.png'
      : cfg.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 6 : 10,
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: onClick ? 'pointer' : 'default',
      }}
      whileHover={{ scale: 1.06 }}
      whileTap={{
        scale: 0.88,
        transition: { type: 'spring', stiffness: 600, damping: 14 },
      }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
    >
      {/* 3D icon with float animation */}
      <motion.div
        style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}
        animate={{
          y: [0, -3, 0],
          rotate: type === 'streak' ? [0, -4, 4, 0] : [0, 0, 0, 0],
        }}
        transition={{
          duration: type === 'streak' ? 2.4 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: type === 'gem' ? 0.4 : type === 'lives' ? 0.8 : 0,
        }}
      >
        {/* Glow underneath the icon */}
        <div
          style={{
            position: 'absolute',
            bottom: -4,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 28,
            height: 10,
            borderRadius: '50%',
            background: cfg.glow,
            filter: 'blur(6px)',
            zIndex: 0,
          }}
        />
        <Image
          src={iconSrc}
          alt={displayLabel}
          fill
          sizes="36px"
          style={{ objectFit: 'contain', zIndex: 1 }}
          priority
        />
      </motion.div>

      {/* Number + label */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <motion.span
          key={String(value)}
          initial={{ scale: 1.4, color: cfg.color }}
          animate={{ scale: 1, color: cfg.color }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          style={{
            fontSize: 17,
            fontWeight: 800,
            lineHeight: 1.1,
            color: cfg.color,
            fontFamily: 'var(--font-jakarta), sans-serif',
          }}
        >
          {value}
        </motion.span>

        {!compact && (
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: cfg.color,
              opacity: 0.85,
              whiteSpace: 'nowrap',
              marginTop: 1,
            }}
          >
            {displayLabel}
          </span>
        )}
      </div>
    </motion.button>
  );
};

export default StatPill;
