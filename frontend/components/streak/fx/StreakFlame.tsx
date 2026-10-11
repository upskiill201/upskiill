'use client';

/**
 * The streak flame, alive. One picture (/Icons/burn.png) in four looks —
 *
 *   lit     burning: a slow flicker and a warm glow
 *   dim     not yet today: grey, waiting to be lit
 *   frozen  a freeze is holding the streak: icy blue, in a block of ice
 *   out     the streak broke: grey, slumped
 *
 * — and the moves between them, which are the streak moments themselves:
 *
 *   dim/out → lit   IGNITE   sparks, a pop, the colour floods in
 *   frozen  → lit   THAW     the ice shakes, cracks, shards fly, fire roars
 *   lit     → out   FIZZLE   smoke puffs, the flame shrinks and greys
 *
 * Visual only: the screen that uses it times its own sounds to `delay`.
 * Reduced motion shows the final look with no particles.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import styles from './StreakFx.module.css';

export type FlameLook = 'lit' | 'dim' | 'frozen' | 'out';

// Every look uses the same filter functions in the same order, so framer
// can tween between any two of them.
const FILTER: Record<FlameLook, string> = {
  lit: 'grayscale(0) hue-rotate(0deg) saturate(1) brightness(1)',
  dim: 'grayscale(1) hue-rotate(0deg) saturate(1) brightness(1.18)',
  frozen: 'grayscale(0.15) hue-rotate(178deg) saturate(1.5) brightness(1.12)',
  out: 'grayscale(1) hue-rotate(0deg) saturate(1) brightness(1.05)',
};
const OPACITY: Record<FlameLook, number> = { lit: 1, dim: 0.5, frozen: 0.9, out: 0.45 };

/** Ice block pieces: [left%, top%, width%, height%, fly-x, fly-y, spin]. */
const SHARDS: [number, number, number, number, number, number, number][] = [
  [0, 0, 52, 50, -90, -70, -40],
  [48, 0, 52, 50, 90, -80, 35],
  [0, 50, 52, 50, -100, 60, 30],
  [48, 50, 52, 50, 95, 70, -45],
];

function Sparks({ count, ice, size }: { count: number; ice?: boolean; size: number }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (i % 2 ? 0.2 : -0.1);
        const dist = size * (0.55 + (i % 3) * 0.14);
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - size * 0.12,
          d: 6 + (i % 3) * 3,
          delay: (i % 4) * 0.025,
          color: ice
            ? i % 2
              ? 'var(--sfx-ice)'
              : 'var(--sfx-on)'
            : i % 3 === 0
              ? 'var(--sfx-gold)'
              : 'var(--sfx-orange)',
        };
      }),
    [count, ice, size],
  );
  return (
    <>
      {sparks.map((s, i) => (
        <motion.span
          key={i}
          className={styles.particle}
          style={{ width: s.d, height: s.d, marginLeft: -s.d / 2, marginTop: -s.d / 2, background: s.color }}
          initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
          animate={{ x: s.x, y: s.y, scale: [0.4, 1.2, 0], opacity: [1, 1, 0] }}
          transition={{ duration: 0.75, delay: s.delay, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

function Smoke({ size }: { size: number }) {
  return (
    <>
      {[0, 1, 2, 3].map((i) => {
        const d = size * (0.18 + i * 0.04);
        return (
          <motion.span
            key={i}
            className={styles.particle}
            style={{ width: d, height: d, marginLeft: -d / 2, marginTop: -d, background: 'var(--sfx-smoke)' }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
            animate={{ x: (i % 2 ? 1 : -1) * size * 0.12, y: -size * (0.5 + i * 0.12), opacity: [0, 0.7, 0], scale: [0.4, 1.3] }}
            transition={{ duration: 1.1, delay: i * 0.12, ease: 'easeOut' }}
          />
        );
      })}
    </>
  );
}

export function StreakFlame({
  from,
  to = from,
  delay = 0,
  size = 160,
  idle = true,
}: {
  /** How it looks when it appears. */
  from: FlameLook;
  /** What it becomes — the moment — after `delay` ms. */
  to?: FlameLook;
  delay?: number;
  /** px; the flame is square. */
  size?: number;
  /** Keep a lit flame flickering once it's settled. */
  idle?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  // Which move has played: "from→to" once its delay has passed.
  const [played, setPlayed] = useState<string | null>(null);
  const move = `${from}>${to}`;

  useEffect(() => {
    if (reducedMotion || from === to) return;
    const t = setTimeout(() => setPlayed(move), delay);
    return () => clearTimeout(t);
  }, [move, from, to, delay, reducedMotion]);

  const moved = played === move && from !== to && !reducedMotion;
  const look: FlameLook = reducedMotion || from === to || moved ? to : from;

  const igniting = moved && to === 'lit' && (from === 'dim' || from === 'out');
  const thawing = moved && to === 'lit' && from === 'frozen';
  const fizzling = moved && to === 'out' && from === 'lit';
  const settledLit = look === 'lit' && (!moved || igniting || thawing);

  // The pop of the moment itself; afterwards, the idle flicker.
  const pop = igniting
    ? { scale: [0.82, 1.32, 0.94, 1.06, 1], rotate: [0, -6, 4, -2, 0] }
    : thawing
      ? { scale: [1, 1.38, 0.95, 1.05, 1], rotate: [0, 5, -4, 2, 0] }
      : fizzling
        ? { scale: [1, 1.08, 0.78], rotate: [0, -4, 9] }
        : null;

  return (
    <div className={`${styles.fx} ${styles.flameWrap}`} style={{ width: size, height: size }}>
      {/* Warm (or icy) light behind the flame. */}
      <motion.span
        aria-hidden="true"
        className={`${styles.glow} ${look === 'frozen' ? styles.glowIce : ''}`}
        initial={false}
        animate={{
          opacity: look === 'lit' || look === 'frozen' ? 1 : 0,
          scale: igniting || thawing ? [0.6, 1.25, 1] : 1,
        }}
        transition={{ duration: 0.7 }}
      />

      <motion.div
        style={{ width: '100%', height: '100%' }}
        initial={false}
        animate={pop ?? { scale: 1, rotate: look === 'out' ? 9 : 0 }}
        transition={pop ? { duration: fizzling ? 0.8 : 0.75, ease: 'easeOut' } : { duration: 0.3 }}
      >
        <motion.div
          style={{ width: '100%', height: '100%', transformOrigin: '50% 90%' }}
          animate={
            settledLit && idle && !reducedMotion
              ? { scaleY: [1, 1.05, 0.98, 1.03, 1], scaleX: [1, 0.98, 1.02, 0.99, 1], rotate: [0, 1.5, -1.5, 1, 0] }
              : { scaleY: 1, scaleX: 1, rotate: 0 }
          }
          transition={
            settledLit && idle && !reducedMotion
              ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: moved ? 0.8 : 0 }
              : { duration: 0.2 }
          }
        >
          <motion.div
            style={{ width: '100%', height: '100%', position: 'relative' }}
            initial={false}
            animate={{ filter: FILTER[look], opacity: OPACITY[look] }}
            // A thaw swaps colour at once, hidden by the shattering ice — a slow
            // hue tween from icy blue back to orange would pass through green.
            transition={{ duration: thawing ? 0.06 : igniting ? 0.35 : 0.6, ease: 'easeOut' }}
          >
            <Image src="/Icons/burn.png" alt="" aria-hidden="true" fill priority sizes={`${size}px`} className={styles.flameImg} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* The ice block: whole while frozen, in shards as it thaws. */}
      <AnimatePresence>
        {(look === 'frozen' || thawing) && (
          <motion.div
            key="ice"
            aria-hidden="true"
            className={styles.ice}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={
              thawing
                ? { opacity: 1, x: [0, -4, 4, -3, 3, 0] }
                : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0 }}
            transition={thawing ? { duration: 0.3 } : { duration: 0.45 }}
          >
            {SHARDS.map(([l, t, w, h, fx, fy, spin], i) => (
              <motion.span
                key={i}
                className={styles.iceShard}
                style={{
                  left: `${l}%`,
                  top: `${t}%`,
                  width: `${w}%`,
                  height: `${h}%`,
                  borderRadius: ['18px 4px 4px 4px', '4px 18px 4px 4px', '4px 4px 4px 18px', '4px 4px 18px 4px'][i],
                }}
                animate={thawing ? { x: fx, y: fy, rotate: spin, opacity: 0, scale: 0.7 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
                transition={thawing ? { duration: 0.6, delay: 0.05, ease: 'easeOut' } : { duration: 0 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!reducedMotion && (igniting || thawing) && (
        <>
          <motion.span
            aria-hidden="true"
            className={`${styles.ring} ${thawing ? styles.ringIce : ''}`}
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
          <Sparks count={thawing ? 14 : 12} ice={thawing} size={size} />
          {thawing && <Sparks count={10} size={size * 0.8} />}
        </>
      )}
      {!reducedMotion && fizzling && <Smoke size={size} />}
    </div>
  );
}

export default StreakFlame;
