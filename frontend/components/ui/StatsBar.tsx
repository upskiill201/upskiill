'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StatPill, StatType } from './StatPill';
import { useGamification } from '@/context/GamificationContext';
import { useStreakModal } from '@/context/StreakContext';
import { playHaptic } from '@/lib/haptics';
import StreakPopover from '@/components/streak/StreakPopover';
import CoinsPopover from '@/components/coins/CoinsPopover';
import XpPopover from '@/components/xp/XpPopover';
import HeartsPopover from '@/components/hearts/HeartsPopover';
import LevelPopover from '@/components/level/LevelPopover';
import { prefetchCatalog } from '@/lib/shop/previewCache';
import { prefetchAchievements } from '@/lib/achievements/previewCache';
import styles from './StatsBar.module.css';

export interface StatsBarProps {
  /** Extra className for layout positioning (e.g. alignment in a header row) */
  className?: string;
  /** Compact mode: hides the labels so it fits narrow containers (drawer / mobile) */
  compact?: boolean;
  /**
   * Visual style:
   * - 'default': flat Duolingo homescreen style — bare icons + bold numbers, no chrome
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

  // XP popover hover & pin state
  const [isXpHovered, setIsXpHovered] = useState(false);
  const [isXpPinned, setIsXpPinned] = useState(false);
  const xpRef = useRef<HTMLDivElement>(null);

  // Hearts (lives) popover hover & pin state
  const [isLivesHovered, setIsLivesHovered] = useState(false);
  const [isLivesPinned, setIsLivesPinned] = useState(false);
  const livesRef = useRef<HTMLDivElement>(null);

  // Level popover hover & pin state
  const [isLevelHovered, setIsLevelHovered] = useState(false);
  const [isLevelPinned, setIsLevelPinned] = useState(false);
  const levelRef = useRef<HTMLDivElement>(null);

  // Warm the shop-preview and achievements caches as soon as the bar mounts,
  // so the coins/XP/hearts/level popovers have data ready the instant
  // someone hovers — no spinner on open.
  useEffect(() => {
    void prefetchCatalog();
    void prefetchAchievements();
  }, []);

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
      if (xpRef.current && !xpRef.current.contains(e.target as Node)) {
        setIsXpPinned(false);
        setIsXpHovered(false);
      }
      if (livesRef.current && !livesRef.current.contains(e.target as Node)) {
        setIsLivesPinned(false);
        setIsLivesHovered(false);
      }
      if (levelRef.current && !levelRef.current.contains(e.target as Node)) {
        setIsLevelPinned(false);
        setIsLevelHovered(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleStreakClick = () => {
    playHaptic('medium');
    if (onStreakClick) {
      onStreakClick();
    } else {
      setIsStreakPinned((prev) => !prev);
    }
  };

  const handleCoinClick = () => {
    playHaptic('medium');
    if (onCoinsClick) {
      onCoinsClick();
    } else {
      setIsCoinPinned((prev) => !prev);
    }
  };

  const handleXpClick = () => {
    playHaptic('medium');
    if (onXpClick) {
      onXpClick();
    } else {
      setIsXpPinned((prev) => !prev);
    }
  };

  const handleLivesClick = () => {
    playHaptic('medium');
    if (onLivesClick) {
      onLivesClick();
    } else {
      setIsLivesPinned((prev) => !prev);
    }
  };

  const handleLevelClick = () => {
    playHaptic('medium');
    if (onLevelClick) {
      onLevelClick();
    } else {
      setIsLevelPinned((prev) => !prev);
    }
  };

  const showStreakPopover = isStreakHovered || isStreakPinned;
  const showCoinPopover = isCoinHovered || isCoinPinned;
  const showXpPopover = isXpHovered || isXpPinned;
  const showLivesPopover = isLivesHovered || isLivesPinned;
  const showLevelPopover = isLevelHovered || isLevelPinned;

  const stats: { type: StatType; value: number | string; onClick?: () => void }[] = [
    { type: 'streak', value: streakDays, onClick: handleStreakClick },
    { type: 'coin', value: coins, onClick: handleCoinClick },
    { type: 'gem', value: xp, onClick: handleXpClick },
    { type: 'lives', value: lives, onClick: handleLivesClick },
    { type: 'level', value: `Lvl ${userLevel}`, onClick: handleLevelClick },
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
        const isXp = s.type === 'gem';
        const isLives = s.type === 'lives';
        const isLevel = s.type === 'level';

        const ref = isStreak
          ? streakRef
          : isCoin
          ? coinRef
          : isXp
          ? xpRef
          : isLives
          ? livesRef
          : isLevel
          ? levelRef
          : undefined;

        const setHovered = isStreak
          ? setIsStreakHovered
          : isCoin
          ? setIsCoinHovered
          : isXp
          ? setIsXpHovered
          : isLives
          ? setIsLivesHovered
          : isLevel
          ? setIsLevelHovered
          : undefined;

        return (
          <div
            key={s.type}
            ref={ref}
            style={{ position: 'relative' }}
            onMouseEnter={setHovered ? () => setHovered(true) : undefined}
            onMouseLeave={setHovered ? () => setHovered(false) : undefined}
            className={variant === 'pill' ? styles.pill : undefined}
          >
            <StatPill
              type={s.type}
              value={s.value}
              compact={compact}
              variant={variant === 'pill' ? 'candy' : 'flat'}
              onClick={s.onClick}
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

            {isXp && showXpPopover && (
              <XpPopover
                onClose={() => {
                  setIsXpHovered(false);
                  setIsXpPinned(false);
                }}
              />
            )}

            {isLives && showLivesPopover && (
              <HeartsPopover
                onClose={() => {
                  setIsLivesHovered(false);
                  setIsLivesPinned(false);
                }}
              />
            )}

            {isLevel && showLevelPopover && (
              <LevelPopover
                onClose={() => {
                  setIsLevelHovered(false);
                  setIsLevelPinned(false);
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
