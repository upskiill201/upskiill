'use client';

/**
 * The streak count as a rolling odometer: each digit that changes rolls —
 * up and out, the new one in from below when the streak grows; the other
 * way when it falls. Big jumps (a repair, a loss) count through a few
 * steps on the way so the change is *seen*, not just shown.
 *
 * `onStep(i)` fires on every change so the screen can tick in time with it
 * (streakTick going up, streakCountdown going down).
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import styles from './StreakFx.module.css';

/** The values a count passes through: every one when it's close, ~7 when far. */
export function odometerSteps(from: number, to: number, maxSteps = 7): number[] {
  if (from === to) return [];
  const span = Math.abs(to - from);
  const dir = to > from ? 1 : -1;
  if (span <= maxSteps) return Array.from({ length: span }, (_, i) => from + dir * (i + 1));
  return Array.from({ length: maxSteps }, (_, i) => Math.round(from + ((to - from) * (i + 1)) / maxSteps));
}

export function StreakOdometer({
  from,
  to,
  delay = 0,
  stepMs = 110,
  className,
  style,
  onStep,
}: {
  from: number;
  to: number;
  /** ms before the first roll. */
  delay?: number;
  /** ms between steps of a multi-step count. */
  stepMs?: number;
  className?: string;
  style?: CSSProperties;
  onStep?: (step: number, value: number) => void;
}) {
  const reducedMotion = useReducedMotion();
  const run = `${from}>${to}`;
  const steps = useMemo(() => odometerSteps(from, to), [from, to]);
  // How far through this run's steps the counter has rolled (-1: not yet).
  const [at, setAt] = useState<{ run: string; i: number }>({ run, i: -1 });
  const i = at.run === run ? at.i : -1;
  const value = reducedMotion ? to : i < 0 ? from : steps[i];
  const dir: 1 | -1 = to >= from ? 1 : -1;
  const onStepRef = useRef(onStep);
  useEffect(() => {
    onStepRef.current = onStep;
  });

  useEffect(() => {
    if (reducedMotion) return;
    const timers = steps.map((v, k) =>
      setTimeout(() => {
        setAt({ run, i: k });
        onStepRef.current?.(k, v);
      }, delay + k * stepMs),
    );
    return () => timers.forEach(clearTimeout);
  }, [run, steps, delay, stepMs, reducedMotion]);

  const digits = String(value).split('');
  // Right-aligned columns, so the ones place is always the same column.
  const width = Math.max(String(from).length, String(to).length);
  const padded = Array.from({ length: width - digits.length }, () => '').concat(digits);

  return (
    <span className={`${styles.odometer} ${className ?? ''}`} style={style} aria-label={String(value)} role="img">
      {padded.map((d, i) =>
        d === '' ? null : (
          <span key={`col-${width - i}`} className={styles.digit} aria-hidden="true">
            <AnimatePresence initial={false} custom={dir}>
              <motion.span
                key={d}
                className={styles.digitInner}
                custom={dir}
                variants={{
                  enter: (k: number) => ({ y: k > 0 ? '100%' : '-100%', opacity: 0 }),
                  center: { y: '0%', opacity: 1 },
                  exit: (k: number) => ({ y: k > 0 ? '-100%' : '100%', opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 520, damping: 30 }}
              >
                {d}
              </motion.span>
            </AnimatePresence>
          </span>
        ),
      )}
    </span>
  );
}

export default StreakOdometer;
