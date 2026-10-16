'use client';

/**
 * The combo, felt everywhere while it lasts:
 *
 *   ComboChip   rides above the progress bar: flame, run, the rung's name
 *               ("On fire"), and how far to the next rung ("2 to Blazing").
 *   ComboAura   the edges of the screen warm up with the run: gold at 3,
 *               orange at 5, hot at 7, white-gold at 10. Never on top of
 *               anything (pointer-events: none), gone the moment it breaks.
 *   ComboBreak  a run of 3+ that ends gets a small, honest marker
 *               ("Run ended at 6"): loss you can see makes the next run
 *               matter, without ever scolding.
 *
 * Rungs and their bonus XP come from lib/lesson/hype.ts (mirrors the server).
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { comboRung, nextRung } from '@/lib/lesson/hype';

const TIER_COLOR = ['var(--lesson-gold)', 'var(--lesson-gold)', 'var(--lesson-gold)', 'var(--warning)', 'var(--lesson-heart)', 'var(--lesson-heart)'];
const TIER_INK = ['var(--lesson-gold-dark)', 'var(--lesson-gold-dark)', 'var(--lesson-gold-dark)', 'var(--lesson-gold-dark)', 'var(--lesson-heart)', 'var(--lesson-heart)'];

export function ComboChip({ run }: { run: number }) {
  const reducedMotion = useReducedMotion();
  const rung = comboRung(run);
  const up = nextRung(run);
  return (
    <AnimatePresence>
      {rung && (
        <motion.div
          key={rung.name}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ type: 'spring', stiffness: 600, damping: 20 }}
          className="absolute -top-[25px] left-1 right-1 flex items-center gap-1.5 text-[13px] font-extrabold uppercase tracking-[0.07em] whitespace-nowrap overflow-hidden"
          style={{ color: TIER_INK[rung.tier] }}
          aria-live="polite"
        >
          <motion.span
            className="inline-flex"
            animate={reducedMotion ? undefined : { scale: [1, 1.3, 1], rotate: [0, -10, 0] }}
            transition={{ duration: rung.tier >= 4 ? 0.55 : 0.9, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Flame className="w-4 h-4 fill-current" aria-hidden="true" />
          </motion.span>
          <motion.span key={run} initial={reducedMotion ? false : { scale: 1.5 }} animate={{ scale: 1 }} className="tabular-nums">
            {run}
          </motion.span>
          <span>· {rung.name}</span>
          {up && (
            <span className="ml-auto normal-case tracking-normal font-bold text-[12px] text-[var(--text-muted)]">
              {up.away} to {up.rung.name}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ComboAura({ run }: { run: number }) {
  const reducedMotion = useReducedMotion();
  const rung = comboRung(run);
  const tier = rung?.tier ?? 0;
  const color = TIER_COLOR[tier];
  const spread = [0, 0, 26, 40, 56, 72][tier];
  return (
    <AnimatePresence>
      {tier >= 2 && (
        <motion.div
          key="aura"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[1]"
          initial={{ opacity: 0 }}
          animate={reducedMotion ? { opacity: 0.7 } : { opacity: [0.55, 0.95, 0.55] }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: tier >= 4 ? 0.9 : 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            boxShadow: `inset 0 0 ${spread}px ${Math.round(spread / 3)}px color-mix(in srgb, ${color} 55%, transparent)`,
          }}
        />
      )}
    </AnimatePresence>
  );
}

export interface ComboBreakEvent {
  /** The run that just ended. */
  run: number;
  key: number;
}

export function ComboBreak({ event }: { event: ComboBreakEvent | null }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[calc(env(safe-area-inset-top)+66px)] md:top-[90px] z-[4] flex justify-center">
      <AnimatePresence>
        {event && (
          <motion.div
            key={event.key}
            role="status"
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-extrabold"
            style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-section)', border: '2px solid var(--border)' }}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.8 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: [0, -3, 3, 0] }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 520, damping: 18, rotate: { duration: 0.45, ease: 'easeInOut' } }}
          >
            <Flame className="w-4 h-4" aria-hidden="true" />
            Run ended at {event.run}. Start a new one!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
