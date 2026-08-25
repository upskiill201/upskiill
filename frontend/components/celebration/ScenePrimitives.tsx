'use client';

/**
 * Celebration scene atoms — the shared Duolingo-grammar building blocks:
 * count-up numbers, typewriter speech bubbles, stat pills that pop in
 * one-by-one, physical reward piles, week calendars, rarity labels.
 */

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, animate } from 'framer-motion';
import styles from './Scene.module.css';
import {
  CelebrationCurrency,
  CURRENCY_ICONS,
  CURRENCY_COLORS,
} from './currency';
import type { StreakWeekDay } from '@/context/CelebrationContext';
import { playScenePop, playGemChime, playTypingTick } from '@/lib/audio/celebrationAudio';

// ─── CountUpNumber ───────────────────────────────────────────────────────────

export function CountUpNumber({
  value,
  duration = 0.5,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = value;
    if (from === value) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(from, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, duration, reducedMotion]);

  return (
    <span className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {display.toLocaleString()}
    </span>
  );
}

// ─── TypewriterBubble ────────────────────────────────────────────────────────

export function TypewriterBubble({
  text,
  startDelay = 500,
  onDone,
}: {
  text: string;
  startDelay?: number;
  onDone?: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const [shown, setShown] = useState(reducedMotion ? text : '');
  const doneRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setShown(text);
      onDone?.();
      return;
    }
    setShown('');
    doneRef.current = false;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i % 3 === 0) playTypingTick();
        if (i >= text.length) {
          if (interval) clearInterval(interval);
          if (!doneRef.current) {
            doneRef.current = true;
            onDone?.();
          }
        }
      }, 26);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, startDelay, reducedMotion]);

  return <div className={styles.speechBubble}>{shown}</div>;
}

// ─── StatPillRow ─────────────────────────────────────────────────────────────

export interface StatPillItem {
  label: string;
  value: string;
  iconSrc?: string;
  color?: string;
}

/** Pills pop in one-by-one with a mallet pop each (Duolingo stat reveal). */
export function StatPillRow({ items }: { items: StatPillItem[] }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timers = items.map((_, i) =>
      setTimeout(() => playScenePop(i), i * 190 + 120)
    );
    return () => timers.forEach(clearTimeout);
  }, [items, reducedMotion]);

  return (
    <div className={styles.statPillRow}>
      {items.map((item, i) => (
        <motion.div
          key={`${item.label}-${i}`}
          className={styles.statPill}
          initial={reducedMotion ? false : { scale: 0, opacity: 0, y: 14 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            delay: reducedMotion ? 0 : i * 0.19,
            type: 'spring',
            stiffness: 420,
            damping: 17,
          }}
        >
          <span className={styles.statPillLabel}>{item.label}</span>
          <span className={styles.statPillValue}>
            {item.iconSrc && (
              <Image src={item.iconSrc} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />
            )}
            <span style={item.color ? { color: item.color } : undefined}>{item.value}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── RewardPile (drop-in gems/coins) ─────────────────────────────────────────

/** Pyramid slot positions for up to 7 items (percentages of the stage box). */
const PILE_SLOTS = [
  { x: 50, y: 62 },
  { x: 30, y: 74 },
  { x: 70, y: 74 },
  { x: 50, y: 84 },
  { x: 16, y: 86 },
  { x: 84, y: 86 },
  { x: 50, y: 44 },
];

/**
 * Physical pile: items drop from above and bounce onto the shadow ellipse,
 * building one after another (chest reveal grammar).
 */
export function RewardPile({
  iconSrc,
  count,
  onItemLand,
  startDelay = 250,
}: {
  iconSrc: string;
  count: number;
  onItemLand?: (index: number) => void;
  startDelay?: number;
}) {
  const reducedMotion = useReducedMotion();
  const visible = Math.max(1, Math.min(PILE_SLOTS.length, count));

  useEffect(() => {
    if (reducedMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < visible; i++) {
      timers.push(setTimeout(() => onItemLand?.(i), startDelay + i * 170));
    }
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, startDelay, reducedMotion]);

  return (
    <div
      style={{
        position: 'relative',
        width: 'min(78vw, 300px)',
        height: 'clamp(150px, 26vh, 210px)',
      }}
      aria-hidden
    >
      {Array.from({ length: visible }).map((_, i) => {
        const slot = PILE_SLOTS[i];
        const size = i === 0 ? 64 : 56 - (i % 2) * 4;
        return (
          <motion.div
            key={i}
            className={styles.pileItem}
            style={{ width: size, height: size, left: `${slot.x}%`, top: `${slot.y}%` }}
            initial={reducedMotion ? false : { y: -260, opacity: 0, rotate: i % 2 ? 18 : -18, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, rotate: i % 2 ? 6 : -6, scale: 1 }}
            transition={
              reducedMotion
                ? { delay: i * 0.03 }
                : {
                    delay: startDelay / 1000 + i * 0.17,
                    type: 'spring',
                    stiffness: 320,
                    damping: 15,
                    mass: 0.9,
                  }
            }
          >
            <Image
              src={iconSrc}
              alt=""
              width={size}
              height={size}
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.4))' }}
              priority
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── WeekCalendarRow ─────────────────────────────────────────────────────────

/** Duolingo week tracker — days check off one-by-one, today gold. */
export function WeekCalendarRow({ days, startDelay = 900 }: { days: StreakWeekDay[]; startDelay?: number }) {
  const reducedMotion = useReducedMotion();
  const [checkedCount, setCheckedCount] = useState(reducedMotion ? days.length : 0);

  useEffect(() => {
    if (reducedMotion) {
      setCheckedCount(days.length);
      return;
    }
    setCheckedCount(0);
    let n = 0;
    const interval = setInterval(() => {
      n += 1;
      setCheckedCount(n);
      if (n >= days.length) clearInterval(interval);
    }, Math.max(140, 900 / Math.max(1, days.length)) * 1.4);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days.length, reducedMotion]);

  return (
    <motion.div
      className={styles.weekRow}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: startDelay / 1000 - 0.35, duration: 0.4, ease: 'easeOut' }}
    >
      {days.map((day, i) => {
        const isDone = day.completed && i < checkedCount;
        const cellClass = isDone
          ? day.isToday
            ? `${styles.weekDayCell} ${styles.weekDayCellToday}`
            : `${styles.weekDayCell} ${styles.weekDayCellDone}`
          : styles.weekDayCell;
        return (
          <div className={styles.weekDay} key={`${day.label}-${i}`}>
            <span
              className={`${styles.weekDayLabel} ${day.isToday ? styles.weekDayLabelToday : ''}`}
            >
              {day.label}
            </span>
            <motion.div
              className={cellClass}
              animate={isDone ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              {isDone && (
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={styles.weekDayCheck}
                  initial={reducedMotion ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 500, damping: 18 }}
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="#FFFFFF"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              )}
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}

// ─── RarityLabel ─────────────────────────────────────────────────────────────

export function RarityLabel({ tier }: { tier: string }) {
  const normalized = (tier || 'common').toLowerCase();
  const tierClass =
    normalized === 'rare'
      ? styles.rarityRare
      : normalized === 'epic' || normalized === 'legendary'
        ? styles.rarityEpic
        : styles.rarityCommon;
  return (
    <motion.div
      initial={false}
      animate={{ scale: [0.6, 1.12, 1], opacity: [0, 1, 1] }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <span className={`${styles.rarityLabel} ${tierClass}`}>{normalized}</span>
      <span className={styles.raritySpark}>✦ ✦ ✦</span>
    </motion.div>
  );
}

// ─── BalanceRow (deposit target) ─────────────────────────────────────────────

export function BalanceRow({
  currency,
  value,
}: {
  currency: CelebrationCurrency;
  value: number;
}) {
  return (
    <div className={styles.balanceRow}>
      <Image
        src={CURRENCY_ICONS[currency]}
        alt={currency}
        width={56}
        height={56}
        className={styles.balanceIcon}
        priority
      />
      <CountUpNumber value={value} className={styles.balanceValue} duration={0.35} />
    </div>
  );
}

// ─── FlyingReward (mascot toss → balance deposit flight) ─────────────────────

/**
 * The physical reward the mascot tosses: a single icon that arcs from the
 * mascot's position into the balance row, then pops it. Self-contained —
 * render it during the deposit beat of a scene.
 */
export function FlyingReward({
  currency,
  from,
  to,
  onArrive,
}: {
  currency: CelebrationCurrency;
  from: { x: number; y: number };
  to: { x: number; y: number };
  onArrive?: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const crestX = (from.x + to.x) / 2 + (Math.random() - 0.5) * 40;
  const crestY = Math.min(from.y, to.y) - 90 - Math.random() * 40;
  const arrivedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      onArrive?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const size = 44;

  if (reducedMotion) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        zIndex: 100300,
        pointerEvents: 'none',
      }}
      initial={{ x: from.x - size / 2, y: from.y - size / 2, scale: 1.25, opacity: 1, rotate: 0 }}
      animate={{
        x: [from.x - size / 2, crestX - size / 2, to.x - size / 2],
        y: [from.y - size / 2, crestY - size / 2, to.y - size / 2],
        scale: [1.25, 1.05, 0.9],
        rotate: currency === 'COINS' ? [0, 220, 540] : [0, 90, 180],
        opacity: 1,
      }}
      transition={{ duration: 0.62, ease: [0.4, 0, 0.6, 1], times: [0, 0.45, 1] }}
      onAnimationComplete={() => {
        if (!arrivedRef.current) {
          arrivedRef.current = true;
          onArrive?.();
        }
      }}
    >
      <Image
        src={CURRENCY_ICONS[currency]}
        alt=""
        width={size}
        height={size}
        style={{
          objectFit: 'contain',
          filter: `drop-shadow(0 4px 14px ${CURRENCY_COLORS[currency]})`,
        }}
        priority
      />
    </motion.div>
  );
}
