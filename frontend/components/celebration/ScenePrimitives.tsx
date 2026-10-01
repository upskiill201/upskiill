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
import { playSound } from '@/lib/audio/lessonSounds';

// ─── CountUpNumber ───────────────────────────────────────────────────────────

export function CountUpNumber({
  value,
  duration = 0.5,
  className,
  from,
}: {
  value: number;
  duration?: number;
  className?: string;
  /** Mount-time origin for a one-shot count-up (e.g. 40 → 55). */
  from?: number;
}) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(from ?? value);
  // What's on screen right now. Each run animates from here — not from the
  // last target — so a run cut short (React dev double-invoking effects, or
  // the value changing mid-count) resumes instead of freezing at the start.
  const shownRef = useRef(from ?? value);

  useEffect(() => {
    const start = shownRef.current;
    if (start === value) return;
    // Reduced motion renders the final value directly (below) — no count to run.
    if (reducedMotion) return;
    const controls = animate(start, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        shownRef.current = Math.round(v);
        setDisplay(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value, duration, reducedMotion]);

  return (
    <span className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {(reducedMotion ? value : display).toLocaleString()}
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
        if (i % 3 === 0) playSound('typeTick');
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
      setTimeout(() => playSound('statTick', i), i * 190 + 120)
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

// ─── ChestAura (the "this is a moment" layer) ────────────────────────────────

/** Fixed ring geometry — deterministic so the sparkles never reshuffle when
 *  the scene re-renders on a tap. Angles are deliberately uneven: a perfectly
 *  regular ring reads as a loading spinner, not as magic.
 *
 *  Radii are large on purpose. The chest fills most of this box, so anything
 *  inside ~130px is simply painted behind it and never seen. */
const AURA_SPARKLES = [
  { deg: 18, radius: 168, size: 22, dur: 2.1, delay: 0 },
  { deg: 66, radius: 150, size: 14, dur: 2.6, delay: 0.7 },
  { deg: 112, radius: 176, size: 18, dur: 1.9, delay: 1.3 },
  { deg: 154, radius: 145, size: 12, dur: 2.4, delay: 0.35 },
  { deg: 203, radius: 182, size: 24, dur: 2.2, delay: 1.05 },
  { deg: 241, radius: 158, size: 15, dur: 2.8, delay: 1.75 },
  { deg: 288, radius: 172, size: 19, dur: 2.0, delay: 0.5 },
  { deg: 322, radius: 140, size: 13, dur: 2.5, delay: 1.5 },
  { deg: 350, radius: 186, size: 16, dur: 2.3, delay: 2.0 },
];

/** Motes rise up the flanks of the chest rather than behind it. */
const AURA_MOTES = [
  { x: -148, drift: 18, dur: 4.2, delay: 0 },
  { x: -120, drift: -14, dur: 5.1, delay: 1.1 },
  { x: 128, drift: 20, dur: 4.6, delay: 2.3 },
  { x: 156, drift: -10, dur: 5.4, delay: 0.6 },
  { x: -168, drift: 26, dur: 4.9, delay: 3.1 },
  { x: 142, drift: -20, dur: 5.6, delay: 1.9 },
];

/**
 * The glow, god-rays, sparkle ring and motes that sit behind the treasure
 * chest — the difference between "an animation played" and "something
 * happened to me".
 *
 * `energy` (0 → 1) winds the whole layer up as the learner taps, so the scene
 * builds towards the reveal instead of looping at one intensity. `tapIndex`
 * remounts the shockwave ring, which is how each tap gets its own outward
 * pulse without an imperative animation handle.
 *
 * Purely decorative and pointer-events: none — it must never sit between the
 * learner's finger and the chest.
 */
export function ChestAura({ energy = 0, tapIndex = 0 }: { energy?: number; tapIndex?: number }) {
  const reducedMotion = useReducedMotion();
  const clamped = Math.max(0, Math.min(1, energy));

  return (
    <div
      className={styles.chestAura}
      style={{ '--aura-energy': clamped } as React.CSSProperties}
      aria-hidden
    >
      <div className={styles.auraRays} />
      <div className={styles.auraGlow} />

      {AURA_SPARKLES.map((s, i) => {
        const rad = (s.deg * Math.PI) / 180;
        return (
          <span
            key={i}
            className={styles.auraSparkle}
            style={
              {
                fontSize: s.size,
                '--sx': `${Math.cos(rad) * s.radius}px`,
                '--sy': `${Math.sin(rad) * s.radius}px`,
                '--sdur': `${s.dur}s`,
                '--sdelay': `${s.delay}s`,
              } as React.CSSProperties
            }
          >
            ✦
          </span>
        );
      })}

      {!reducedMotion &&
        AURA_MOTES.map((m, i) => (
          <span
            key={i}
            className={styles.auraMote}
            style={
              {
                '--mx': `${m.x}px`,
                '--mdrift': `${m.drift}px`,
                '--mdur': `${m.dur}s`,
                '--mdelay': `${m.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}

      {/* Keyed on the tap index so React remounts it per tap and the ring
          replays from the start — a CSS animation on a persistent node would
          only ever fire once. */}
      {!reducedMotion && tapIndex > 0 && <div key={tapIndex} className={styles.auraShock} />}
    </div>
  );
}

// ─── RewardPile (drop-in gems/coins) ─────────────────────────────────────────

/** Deterministic hash → [0,1). Seeded so a re-render never reshuffles a pile
 *  the learner is already watching land. */
function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface PileItem {
  /** Resting position, in % of the stage box. */
  x: number;
  y: number;
  size: number;
  /** Where it spills from — the chest mouth, not straight overhead. */
  spawnX: number;
  spinFrom: number;
  spinTravel: number;
  restRotate: number;
  /** Projectile timings and heights. */
  delay: number;
  launch: number;
  peak: number;
  fall: number;
  bounce: number;
  /** Painter's-algorithm depth: lower in the heap draws in front. */
  z: number;
}

/**
 * Lay items out as a heap rather than a fixed pyramid: wide base, narrowing
 * as it climbs, with per-item jitter so it reads as a poured pile instead of
 * a grid. Rows fill bottom-up so the pile visibly *builds*.
 */
function buildPile(count: number): PileItem[] {
  const items: PileItem[] = [];
  // Row widths taper as the heap climbs. Generated rather than hard-coded so
  // this works for 5 items and for 34.
  const rows: number[] = [];
  let remaining = count;
  let width = Math.max(3, Math.round(Math.sqrt(count) * 1.6));
  while (remaining > 0) {
    const n = Math.min(remaining, width);
    rows.push(n);
    remaining -= n;
    width = Math.max(1, width - (rows.length % 2 === 0 ? 2 : 1));
  }

  const rowCount = rows.length;
  // Total width of the heap scales with how much is in it. A fixed spread
  // makes five items read as a scattered row rather than a small pile.
  const baseSpread = Math.min(84, 24 + count * 1.9);
  let i = 0;
  rows.forEach((n, row) => {
    // Bottom row sits on the shadow; each row above stacks with overlap so
    // the items nest into each other instead of stacking like plates.
    const yBase = 88 - row * (30 / Math.max(1, rowCount));
    const spread = baseSpread - row * ((baseSpread * 0.55) / Math.max(1, rowCount));
    for (let c = 0; c < n; c++) {
      const t = n === 1 ? 0.5 : c / (n - 1);
      const jx = (rand(i * 3.1) - 0.5) * (spread / Math.max(2, n)) * 0.9;
      const jy = (rand(i * 7.7) - 0.5) * 4.5;
      const size = 44 + rand(i * 5.3) * 16 + (rowCount - row) * 1.5;
      items.push({
        x: 50 + (t - 0.5) * spread + jx,
        y: yBase + jy,
        size,
        // Spilling out of the chest mouth: spawn clustered near the centre.
        spawnX: 50 + (rand(i * 11.3) - 0.5) * 18,
        spinFrom: (rand(i * 2.9) - 0.5) * 120,
        // Keeps tumbling through the whole flight instead of snapping to rest.
        spinTravel: (rand(i * 29.3) - 0.5) * 460,
        restRotate: (rand(i * 13.1) - 0.5) * 34,
        // Bottom rows land first — the heap fills from the floor up.
        delay: row * 0.075 + c * 0.028 + rand(i * 17.3) * 0.05,
        launch: 0.24 + rand(i * 31.7) * 0.1,
        // Apex height. Kept deliberately low: the scene headline sits directly
        // above this stage, and anything much taller throws coins across
        // "+50 COINS" on the way up. Outer items go a little higher so the
        // spill fans into an arc instead of rising as one column.
        peak: 48 + rand(i * 19.7) * 52 + Math.abs(t - 0.5) * 66,
        fall: 0.3 + rand(i * 37.1) * 0.13,
        bounce: 10 + rand(i * 23.1) * 14,
        z: Math.round(items.length + row * -40 + yBase * 4),
      });
      i++;
    }
  });
  return items;
}

/**
 * Physical pile: items pour out of the chest, accelerate under gravity, and
 * bounce-settle into a heap on the shadow ellipse.
 *
 * Deliberately not a physics engine. Each item runs a hand-authored keyframe
 * track — ease-in on the way down (acceleration), ease-out on each rebound,
 * two diminishing bounces, and a squash/stretch pair on impact. That reads as
 * weight far more cheaply than solving collisions for thirty sprites, and it
 * keeps every item on the compositor (transform/opacity only).
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
  const visible = Math.max(1, Math.min(40, count));
  // Built once per pile: re-deriving on every render would reshuffle the heap
  // mid-fall.
  const items = React.useMemo(() => buildPile(visible), [visible]);

  useEffect(() => {
    if (reducedMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    items.forEach((item, i) => {
      // Fire on the actual first impact, not on a flat cadence, so the sound
      // layer matches what the eye sees landing.
      const impactMs = startDelay + (item.delay + item.launch + item.fall) * 1000;
      timers.push(setTimeout(() => onItemLand?.(i), impactMs));
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, startDelay, reducedMotion]);

  return (
    <div
      data-reward-pile
      style={{
        position: 'relative',
        width: 'min(86vw, 340px)',
        height: 'clamp(170px, 30vh, 240px)',
      }}
      aria-hidden
    >
      {items.map((item, i) => {
        // Horizontal travel from the chest mouth to the resting slot, in px
        // against the stage width.
        const dx = ((item.spawnX - item.x) / 100) * 300;
        // Projectile track: launch up out of the chest, apex, accelerate
        // down, then two diminishing bounces. Segment durations in seconds.
        const segs = [item.launch, item.fall, 0.12, 0.11, 0.07, 0.06];
        const total = segs.reduce((a, b) => a + b, 0);
        let acc = 0;
        const times = [0, ...segs.map((s) => (acc += s) / total)];
        return (
          <motion.div
            key={i}
            className={styles.pileItem}
            style={{
              width: item.size,
              height: item.size,
              left: `${item.x}%`,
              top: `${item.y}%`,
              marginLeft: -item.size / 2,
              marginTop: -item.size / 2,
              zIndex: item.z,
            }}
            initial={
              reducedMotion
                ? false
                : { y: -26, x: dx, opacity: 0, rotate: item.spinFrom, scaleX: 1, scaleY: 1 }
            }
            animate={
              reducedMotion
                ? { y: 0, x: 0, opacity: 1, rotate: item.restRotate }
                : {
                    // Out of the chest → apex → impact → bounce → settle.
                    y: [-26, -item.peak, 0, -item.bounce, 0, -item.bounce * 0.3, 0],
                    // Most of the lateral travel happens on the way up, so the
                    // spill fans outward at the apex and then drops nearly
                    // straight down — a fountain, not a swarm drifting
                    // sideways into place. Frozen after impact: a coin that
                    // has landed does not slide.
                    x: [dx, dx * 0.3, 0, 0, 0, 0, 0],
                    opacity: [0, 1, 1, 1, 1, 1, 1],
                    rotate: [
                      item.spinFrom,
                      item.spinFrom + item.spinTravel * 0.45,
                      item.spinFrom + item.spinTravel,
                      item.restRotate * 1.12,
                      item.restRotate,
                      item.restRotate,
                      item.restRotate,
                    ],
                    // Stretch along the fast vertical segments, squash hard on
                    // each impact — the weight cue that sells the landing.
                    scaleX: [0.86, 0.94, 0.96, 1.22, 0.98, 1.08, 1],
                    scaleY: [1.14, 1.06, 1.04, 0.78, 1.02, 0.94, 1],
                  }
            }
            transition={
              reducedMotion
                ? { delay: i * 0.012, duration: 0.2 }
                : {
                    delay: startDelay / 1000 + item.delay,
                    duration: total,
                    times,
                    // Decelerate into the apex, accelerate out of it — the
                    // whole reason this reads as gravity rather than a tween.
                    ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'],
                  }
            }
          >
            <Image
              src={iconSrc}
              alt=""
              width={Math.round(item.size)}
              height={Math.round(item.size)}
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 5px color-mix(in srgb, var(--color-ink) 22%, transparent))',
                width: '100%',
                height: '100%',
              }}
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
                    stroke="currentColor"
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

// ─── AnimatedProgressBar (milestone fills) ───────────────────────────────────

/**
 * Progress beat for the section/course milestone scenes: the fill sweeps
 * from `from`% to `to`%, then a single shine crosses the finished track.
 * Under reduced motion it renders straight at the end value, no animation.
 */
export function AnimatedProgressBar({
  from,
  to,
  delay = 0,
  tone = 'green',
}: {
  from: number;
  to: number;
  /** Seconds to wait before the sweep starts (choreography sequencing). */
  delay?: number;
  tone?: 'green' | 'blue' | 'gold';
}) {
  const reducedMotion = useReducedMotion();
  const toneClass =
    tone === 'blue'
      ? styles.barFillBlue
      : tone === 'gold'
        ? styles.barFillGold
        : styles.barFillGreen;

  return (
    <div
      className={styles.barTrack}
      role="progressbar"
      aria-valuenow={Math.round(to)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={`${styles.barFill} ${toneClass}`}
        initial={reducedMotion ? false : { width: `${from}%` }}
        animate={{ width: `${to}%` }}
        transition={{ delay, duration: 1.05, ease: [0.34, 1.25, 0.64, 1] }}
      >
        {!reducedMotion && (
          <span
            className={styles.barShine}
            style={{ animationDelay: `${delay + 1.0}s` }}
          />
        )}
      </motion.div>
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
