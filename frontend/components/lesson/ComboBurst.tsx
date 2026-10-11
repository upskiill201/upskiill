'use client';

/**
 * "3 IN A ROW!" — the run milestone, Duolingo-style: a flame punches in over
 * the question, the count slams down under it, sparks fly, and it's gone in
 * about a second. Never blocks a tap (pointer-events: none) and never hides
 * the verdict strip, which sits at the bottom.
 *
 * Bigger runs get bigger: 3 is a pop, 5 adds a second ring of sparks, 7+
 * turns the flame gold-white hot and shakes the stage a little.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { playSound } from '@/lib/audio/lessonSounds';
import { celebrationHaptic } from '@/lib/haptics';

export interface ComboBurstEvent {
  run: number;
  /** Changes on every burst, so two milestones in a row both play. */
  key: number;
}

function Sparks({ count, radius, delay }: { count: number; radius: number; delay: number }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        return { x: Math.cos(a) * radius, y: Math.sin(a) * radius * 0.7, gold: i % 2 === 0 };
      }),
    [count, radius],
  );
  return (
    <>
      {sparks.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute left-1/2 top-[38%] w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full"
          style={{ backgroundColor: s.gold ? 'var(--lesson-gold)' : 'var(--warning)' }}
          initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
          animate={{ x: s.x, y: s.y, scale: [0.4, 1.3, 0], opacity: [1, 1, 0] }}
          transition={{ duration: 0.7, delay, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

export function ComboBurst({ burst, onDone }: { burst: ComboBurstEvent | null; onDone: () => void }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!burst) return;
    // Just behind the "correct" ding, so the two read as one cheer.
    const s = setTimeout(() => {
      playSound('comboBurst', burst.run);
      celebrationHaptic(burst.run >= 7 ? 'big' : 'win');
    }, 160);
    const t = setTimeout(onDone, reducedMotion ? 900 : 1250);
    return () => {
      clearTimeout(s);
      clearTimeout(t);
    };
  }, [burst, onDone, reducedMotion]);

  const tier = burst ? (burst.run >= 7 ? 3 : burst.run >= 5 ? 2 : 1) : 1;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[calc(env(safe-area-inset-top)+64px)] md:top-[96px] z-[3] flex justify-center">
      <AnimatePresence>
        {burst && (
          <motion.div
            key={burst.key}
            role="status"
            aria-live="polite"
            className="relative flex flex-col items-center"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.3, y: 20 }}
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0, x: tier === 3 ? [0, -4, 4, -3, 3, 0] : 0 }
            }
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: -24 }}
            transition={{ type: 'spring', stiffness: 520, damping: 15, x: { duration: 0.4, delay: 0.2 } }}
          >
            {!reducedMotion && <Sparks count={10} radius={110} delay={0.05} />}
            {!reducedMotion && tier >= 2 && <Sparks count={14} radius={160} delay={0.18} />}
            <motion.div
              className="relative w-[88px] h-[88px] md:w-[104px] md:h-[104px]"
              initial={reducedMotion ? false : { rotate: -18 }}
              animate={{ rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              style={tier === 3 ? { filter: 'saturate(1.4) brightness(1.15)' } : undefined}
            >
              <Image src="/Icons/burn.png" alt="" aria-hidden="true" fill sizes="104px" className="object-contain" />
            </motion.div>
            <motion.p
              className="-mt-1 px-4 py-1 rounded-full text-[26px] md:text-[30px] font-extrabold uppercase tracking-[0.04em] text-white leading-tight"
              style={{
                fontFamily: 'var(--font-jakarta)',
                backgroundColor: 'var(--lesson-gold)',
                boxShadow: '0 4px 0 var(--lesson-gold-dark)',
              }}
              initial={reducedMotion ? false : { scale: 1.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.12, type: 'spring', stiffness: 700, damping: 18 }}
            >
              {burst.run} in a row!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ComboBurst;
