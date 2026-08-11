'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    hoverBg: string;
    hoverBorder: string;
    activeBg: string;
  }
> = {
  streak: {
    icon: '/Icons/burn.png',
    defaultLabel: 'Day Streak',
    color: '#FF8A00',
    glow: 'rgba(255,138,0,0.25)',
    hoverBg: '#FFF7ED',
    hoverBorder: '#FED7AA',
    activeBg: '#FFEDD5',
  },
  gem: {
    icon: '/Icons/gem.png',
    defaultLabel: 'XP Points',
    color: '#0172FD',
    glow: 'rgba(1,114,253,0.22)',
    hoverBg: '#EFF6FF',
    hoverBorder: '#BFDBFE',
    activeBg: '#DBEAFE',
  },
  lives: {
    icon: '/Icons/heart.png',
    defaultLabel: 'Lives',
    color: '#FF4B4B',
    glow: 'rgba(255,75,75,0.22)',
    hoverBg: '#FEF2F2',
    hoverBorder: '#FCA5A5',
    activeBg: '#FECACA',
  },
  coin: {
    icon: '/Icons/Coin.png',
    defaultLabel: 'Coins',
    color: '#EAB308',
    glow: 'rgba(234,179,8,0.25)',
    hoverBg: '#FEFCE8',
    hoverBorder: '#FDE047',
    activeBg: '#FEF08A',
  },
  level: {
    icon: '/Icons/user-profile.png',
    defaultLabel: 'Level',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.25)',
    hoverBg: '#FAF5FF',
    hoverBorder: '#DDD6FE',
    activeBg: '#E9D5FF',
  },
};

/**
 * Duolingo-style gamified stat pill.
 * Fixed size capsule container with soft hover highlight & 3D active press effect (no balloon/scaling growth).
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
  const [isPressed, setIsPressed] = useState(false);

  // Dynamic icon for Coins
  const iconSrc =
    type === 'coin'
      ? Number(value) > 0
        ? '/Icons/Coin.png'
        : '/Icons/Coin_empty.png'
      : cfg.icon;

  return (
    <motion.button
      type="button"
      id={`stat-pill-${type}`}
      data-stat-pill={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? 6 : 8,
        padding: compact ? '4px 10px' : '6px 12px',
        borderRadius: 14,
        background: isPressed
          ? cfg.activeBg
          : isHovered
          ? cfg.hoverBg
          : 'transparent',
        border: `2px solid ${
          isPressed
            ? cfg.hoverBorder
            : isHovered
            ? cfg.hoverBorder
            : 'transparent'
        }`,
        cursor: onClick ? 'pointer' : 'default',
        transform: isPressed ? 'translateY(2px)' : 'translateY(0)',
        transition:
          'background-color 0.15s ease, border-color 0.15s ease, transform 0.1s ease',
        userSelect: 'none',
        outline: 'none',
      }}
      aria-label={`${displayLabel}: ${value}`}
    >
      {/* 3D icon with subtle hover micro-bounce */}
      <motion.div
        style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}
        animate={{
          y: isHovered ? [0, -3, 0] : 0,
          rotate: isHovered && type === 'streak' ? [0, -6, 6, 0] : 0,
        }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
        }}
      >
        {/* Soft icon shadow glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -2,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 24,
            height: 8,
            borderRadius: '50%',
            background: cfg.glow,
            filter: 'blur(5px)',
            zIndex: 0,
          }}
        />
        <Image
          src={iconSrc}
          alt={displayLabel}
          fill
          sizes="32px"
          style={{ objectFit: 'contain', zIndex: 1 }}
          priority
        />
      </motion.div>

      {/* Number + label */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 900,
            color: cfg.color,
            fontFamily: 'var(--font-jakarta), sans-serif',
            letterSpacing: '-0.01em',
          }}
        >
          {value}
        </span>

        {!compact && (
          <span
            className={labelClassName}
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: cfg.color,
              opacity: 0.85,
              whiteSpace: 'nowrap',
              marginTop: 2,
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
