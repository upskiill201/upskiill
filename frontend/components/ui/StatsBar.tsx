'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { StatPill, StatType } from './StatPill';
import { useGamification } from '@/context/GamificationContext';
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
  /**
   * Which pills to show, in order. Defaults to all five. The home screen's
   * mobile HUD shows four, like Duolingo's — five plus the course picker,
   * menu and bell do not fit a 360px phone.
   */
  show?: StatType[];
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
  show,
}) => {
  const router = useRouter();
  const { streakDays, coins, xp, lives, userLevel } = useGamification();

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
      // Popovers render in a portal (see PopoverPortal), outside these refs.
      if ((e.target as Element | null)?.closest?.('[data-stats-popover]')) return;
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

  const allStats: { type: StatType; value: number | string; onClick?: () => void }[] = [
    { type: 'streak', value: streakDays, onClick: handleStreakClick },
    { type: 'coin', value: coins, onClick: handleCoinClick },
    { type: 'gem', value: xp, onClick: handleXpClick },
    { type: 'lives', value: lives, onClick: handleLivesClick },
    { type: 'level', value: `Lvl ${userLevel}`, onClick: handleLevelClick },
  ];
  const stats = show ? allStats.filter((s) => show.includes(s.type)) : allStats;

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
            <StatChange value={s.value} lossIsBad={isLives}>
              <StatPill
                type={s.type}
                value={s.value}
                compact={compact}
                variant={variant === 'pill' ? 'candy' : 'flat'}
                onClick={s.onClick}
              />
            </StatChange>

            {isStreak && showStreakPopover && (
              <PopoverPortal anchor={streakRef}>
              <StreakPopover
                onClose={() => {
                  setIsStreakHovered(false);
                  setIsStreakPinned(false);
                }}
              />
              </PopoverPortal>
            )}

            {isCoin && showCoinPopover && (
              <PopoverPortal anchor={coinRef}>
              <CoinsPopover
                onClose={() => {
                  setIsCoinHovered(false);
                  setIsCoinPinned(false);
                }}
              />
              </PopoverPortal>
            )}

            {isXp && showXpPopover && (
              <PopoverPortal anchor={xpRef}>
              <XpPopover
                onClose={() => {
                  setIsXpHovered(false);
                  setIsXpPinned(false);
                }}
              />
              </PopoverPortal>
            )}

            {isLives && showLivesPopover && (
              <PopoverPortal anchor={livesRef}>
              <HeartsPopover
                onClose={() => {
                  setIsLivesHovered(false);
                  setIsLivesPinned(false);
                }}
              />
              </PopoverPortal>
            )}

            {isLevel && showLevelPopover && (
              <PopoverPortal anchor={levelRef}>
              <LevelPopover
                onClose={() => {
                  setIsLevelHovered(false);
                  setIsLevelPinned(false);
                }}
              />
              </PopoverPortal>
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Renders a popover in document.body, pinned under its stat. The stats bar
 * lives inside scrolling containers (the home page's right rail scrolls on
 * its own), and any overflow there clipped the popover — the streak card was
 * cut in half on desktop home. A fixed layer can't be clipped.
 * The popovers keep their own CSS: absolute, top:100%, right:0 — so this
 * layer is a zero-height box whose right edge sits on the stat's right edge.
 */
function PopoverPortal({ anchor, children }: { anchor: React.RefObject<HTMLDivElement | null>; children: React.ReactNode }) {
  const [box, setBox] = useState<{ top: number; right: number } | null>(null);

  useLayoutEffect(() => {
    const place = () => {
      const el = anchor.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Keep a 344px card on screen: its left edge never past 16px.
      const right = Math.min(window.innerWidth - r.right, window.innerWidth - 16 - 344);
      setBox({ top: r.bottom, right: Math.max(16, right) });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [anchor]);

  if (!box || typeof document === 'undefined') return null;
  return createPortal(
    <div data-stats-popover style={{ position: 'fixed', top: box.top, right: box.right, width: 0, height: 0, zIndex: 9999 }}>
      <div style={{ position: 'relative', width: 0, height: 0 }}>{children}</div>
    </div>,
    document.body,
  );
}

/**
 * Makes a change to a stat visible where the learner is already looking:
 * a bounce and a floating "+5" when it goes up, a shake when hearts go down.
 * (Duolingo's top bar reacts the same way — the number never just swaps.)
 */
function StatChange({ value, lossIsBad, children }: { value: number | string; lossIsBad: boolean; children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [last, setLast] = useState(value);
  const [change, setChange] = useState<{ delta: number; key: number } | null>(null);
  const [seq, setSeq] = useState(0);
  if (value !== last) {
    if (typeof value === 'number' && typeof last === 'number' && value !== last) {
      setSeq(seq + 1);
      setChange({ delta: value - last, key: seq + 1 });
    }
    setLast(value);
  }
  const up = (change?.delta ?? 0) > 0;
  const hurt = !up && lossIsBad && change !== null;

  return (
    <motion.div
      key={change?.key ?? 'steady'}
      style={{ position: 'relative' }}
      animate={
        reducedMotion || !change
          ? undefined
          : up
            ? { scale: [1, 1.18, 1] }
            : hurt
              ? { x: [0, -4, 4, -3, 3, 0] }
              : undefined
      }
      transition={{ duration: 0.45 }}
    >
      {children}
      <AnimatePresence>
        {change && up && !reducedMotion && (
          <motion.span
            key={change.key}
            aria-hidden="true"
            className="absolute left-1/2 -top-1 -translate-x-1/2 pointer-events-none text-[13px] font-extrabold whitespace-nowrap"
            style={{ color: 'var(--success-green)', fontFamily: 'var(--font-jakarta)' }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: [0, 1, 1, 0], y: -18 }}
            transition={{ duration: 1.3, times: [0, 0.15, 0.7, 1] }}
            onAnimationComplete={() => setChange(null)}
          >
            +{change.delta}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default StatsBar;
