'use client';

/**
 * This week, Duolingo's way: seven circles, the counted days joined by a
 * band so a streak reads as one unbroken run. Lessons are orange checks,
 * freezes icy snowflakes, repairs a wrench.
 *
 * With `stampDelay`, today starts as an empty ring and gets stamped at that
 * moment: the band from yesterday grows into it, the circle pops and fills,
 * a ring bursts out. The screen plays `streakStamp` at the same time.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Glyph } from '@/components/art/Glyph';
import { useEffect, useState } from 'react';
import { counts, type WeekCell } from '@/lib/streak/week';
import styles from './StreakFx.module.css';

function Icon({ status }: { status: WeekCell['status'] }) {
  if (status === 'lesson') return <Glyph name="check" size={18} strokeWidth={3.5} />;
  if (status === 'repaired') return <Glyph name="wrench" size={15} strokeWidth={3} />;
  if (status === 'frozen') return <Glyph name="snowflake" size={18} strokeWidth={3} />;
  return null;
}

const LABEL: Record<WeekCell['status'], string> = {
  lesson: 'practiced',
  repaired: 'repaired',
  frozen: 'freeze used',
  none: 'not practiced',
};

export function StreakWeekRow({
  cells,
  stampDelay,
  /** What today becomes when stamped. */
  stampTo = 'lesson',
}: {
  cells: WeekCell[];
  stampDelay?: number;
  stampTo?: WeekCell['status'];
}) {
  const reducedMotion = useReducedMotion();
  const stamping = stampDelay !== undefined;
  const [timerDone, setTimerDone] = useState(false);
  const stamped = !stamping || Boolean(reducedMotion) || timerDone;

  useEffect(() => {
    if (!stamping || reducedMotion) return;
    const t = setTimeout(() => setTimerDone(true), stampDelay);
    return () => clearTimeout(t);
  }, [stamping, stampDelay, reducedMotion]);

  const shown = cells.map((c) => (c.isToday && stamping ? { ...c, status: stamped ? stampTo : 'none' } : c));

  return (
    <div className={`${styles.fx} ${styles.week}`} role="list" aria-label="This week">
      {shown.map((c, i) => {
        const prev = shown[i - 1];
        const joined = i > 0 && prev && counts(prev.status) && counts(c.status);
        const icy = joined && (c.status === 'frozen' || prev.status === 'frozen');
        const isStampCell = c.isToday && stamping;
        const lit = c.status === 'lesson' || c.status === 'repaired';
        const circleClass =
          lit
            ? styles.circleLit
            : c.status === 'frozen'
              ? styles.circleIce
              : c.isToday
                ? styles.circleToday
                : c.isFuture
                  ? styles.circleFuture
                  : '';
        return (
          <div key={c.date} className={styles.weekDay} role="listitem" aria-label={`${c.letter}${c.isToday ? ' (today)' : ''}: ${LABEL[c.status]}`}>
            <span className={`${styles.weekLetter} ${c.isToday ? styles.weekLetterToday : ''}`}>{c.letter}</span>
            <span className={styles.weekCell}>
              {joined && (
                <motion.span
                  aria-hidden="true"
                  className={`${styles.band} ${icy ? styles.bandIce : ''}`}
                  initial={isStampCell && !reducedMotion ? { scaleX: 0 } : false}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                />
              )}
              <motion.span
                className={`${styles.circle} ${circleClass}`}
                initial={false}
                animate={
                  isStampCell && stamped && !reducedMotion
                    ? { scale: [0.5, 1.28, 0.94, 1], rotate: [0, -10, 6, 0] }
                    : { scale: 1, rotate: 0 }
                }
                transition={isStampCell ? { duration: 0.55, delay: 0.12, ease: 'easeOut' } : { duration: 0 }}
              >
                {(!isStampCell || stamped) && (
                  <motion.span
                    style={{ display: 'grid', placeItems: 'center' }}
                    initial={isStampCell && !reducedMotion ? { scale: 0, rotate: -45 } : false}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 600, damping: 14, delay: isStampCell ? 0.25 : 0 }}
                  >
                    <Icon status={c.status} />
                  </motion.span>
                )}
                {isStampCell && !stamped && !reducedMotion && (
                  // Waiting to be lit: today's ring breathes.
                  <motion.span
                    aria-hidden="true"
                    className={styles.stampBurst}
                    style={{ inset: -2, borderWidth: 2 }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.1, 0.6] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  />
                )}
                {isStampCell && stamped && !reducedMotion && (
                  <motion.span
                    aria-hidden="true"
                    className={styles.stampBurst}
                    initial={{ scale: 0.7, opacity: 1 }}
                    animate={{ scale: 1.9, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                  />
                )}
              </motion.span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default StreakWeekRow;
