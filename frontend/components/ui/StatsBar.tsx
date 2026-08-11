'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StatPill, StatType } from './StatPill';
import { useGamification } from '@/context/GamificationContext';
import { useStreakModal } from '@/context/StreakContext';
import StreakPopover from '@/components/streak/StreakPopover';
import CoinsPopover from '@/components/coins/CoinsPopover';
import styles from './StatsBar.module.css';

export interface StatsBarProps {
  /** Extra className for layout positioning (e.g. alignment in a header row) */
  className?: string;
  /** Compact mode: hides the labels so it fits narrow containers (drawer / mobile) */
  compact?: boolean;
  /**
   * Visual style:
   * - 'default': borderless, like the dashboard homescreen
   * - 'pill': candy-3D rounded pills with per-stat colors, like the shop coin card
   */
  variant?: 'default' | 'pill';
  onStreakClick?: () => void;
  onCoinsClick?: () => void;
  onXpClick?: () => void;
  onLivesClick?: () => void;
  onLevelClick?: () => void;
}

/**
 * Live gamification stats bar — streak, coins, XP, hearts & level.
 * Reads from the global GamificationContext so every value updates in real time.
 */
export const StatsBar: React.FC<StatsBarProps> = ({
  className,
  compact = false,
  variant = 'default',
  onStreakClick,
  onCoinsClick,
  onXpClick,
  onLivesClick,
  onLevelClick,
}) => {
  const router = useRouter();
  const { streakDays, coins, xp, lives, userLevel } = useGamification();
  const { openStreakModal } = useStreakModal();

  // Streak popover hover & pin state
  const [isStreakHovered, setIsStreakHovered] = useState(false);
  const [isStreakPinned, setIsStreakPinned] = useState(false);
  const streakRef = useRef<HTMLDivElement>(null);

  // Coins popover hover & pin state
  const [isCoinHovered, setIsCoinHovered] = useState(false);
  const [isCoinPinned, setIsCoinPinned] = useState(false);
  const coinRef = useRef<HTMLDivElement>(null);

  // Close popovers when clicking anywhere outside on screen
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (streakRef.current && !streakRef.current.contains(e.target as Node)) {
        setIsStreakPinned(false);
        setIsStreakHovered(false);
      }
      if (coinRef.current && !coinRef.current.contains(e.target as Node)) {
        setIsCoinPinned(false);
        setIsCoinHovered(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleStreakClick = () => {
    if (onStreakClick) {
      onStreakClick();
    } else {
      setIsStreakPinned((prev) => !prev);
    }
  };

  const handleCoinClick = () => {
    if (onCoinsClick) {
      onCoinsClick();
    } else {
      setIsCoinPinned((prev) => !prev);
    }
  };

  const showStreakPopover = isStreakHovered || isStreakPinned;
  const showCoinPopover = isCoinHovered || isCoinPinned;

  const stats: { type: StatType; value: number | string; onClick?: () => void; pillClass: string }[] = [
    { type: 'streak', value: streakDays, onClick: handleStreakClick, pillClass: styles.pillStreak },
    { type: 'coin', value: coins, onClick: handleCoinClick, pillClass: styles.pillCoin },
    { type: 'gem', value: xp, onClick: onXpClick, pillClass: styles.pillGem },
    { type: 'lives', value: lives, onClick: onLivesClick, pillClass: styles.pillLives },
    { type: 'level', value: `Lvl ${userLevel}`, onClick: onLevelClick, pillClass: styles.pillLevel },
  ];

  return (
    <div
      className={`${styles.bar} ${compact ? styles.compact : ''} ${
        variant === 'pill' ? styles.pillBar : ''
      } ${className ?? ''}`}
      aria-label="Your learning stats"
    >
      {stats.map((s) => {
        const isStreak = s.type === 'streak';
        const isCoin = s.type === 'coin';

        return (
          <div
            key={s.type}
            ref={isStreak ? streakRef : isCoin ? coinRef : undefined}
            style={{ position: 'relative' }}
            onMouseEnter={
              isStreak
                ? () => setIsStreakHovered(true)
                : isCoin
                ? () => setIsCoinHovered(true)
                : undefined
            }
            onMouseLeave={
              isStreak
                ? () => setIsStreakHovered(false)
                : isCoin
                ? () => setIsCoinHovered(false)
                : undefined
            }
            className={variant === 'pill' ? `${styles.pill} ${s.pillClass}` : undefined}
          >
            <StatPill
              type={s.type}
              value={s.value}
              compact={compact}
              onClick={s.onClick}
              labelClassName={styles.label}
            />

            {isStreak && showStreakPopover && (
              <StreakPopover
                onClose={() => {
                  setIsStreakHovered(false);
                  setIsStreakPinned(false);
                }}
              />
            )}

            {isCoin && showCoinPopover && (
              <CoinsPopover
                onClose={() => {
                  setIsCoinHovered(false);
                  setIsCoinPinned(false);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsBar;
