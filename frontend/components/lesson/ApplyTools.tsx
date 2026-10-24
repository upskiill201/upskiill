'use client';

/**
 * Two ways out of being stuck, above every Apply question:
 *
 *   [ Skip ]                                   [ Hint (bulbs) ]
 *
 * Skip shows the answer and moves on: no heart lost, the question doesn't
 * come back, it just doesn't count as right. Hint gives a real step toward
 * the answer (lib/lesson/hints.ts) from a small budget per lesson, shown as
 * bulbs. When a learner stalls, the bulb wakes up and offers itself, since
 * help works best at the moment someone is stuck and people often don't ask.
 *
 * Both are quiet until needed: small, to the side, never competing with the
 * question.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Glyph } from '@/components/art/Glyph';

export function ApplyTools({
  hintsLeft,
  hintsTotal,
  canHint,
  nudge,
  onHint,
  onSkip,
  locked,
}: {
  hintsLeft: number;
  hintsTotal: number;
  /** A hint exists for this question (and budget remains). */
  canHint: boolean;
  /** The learner has stalled: the bulb wakes up. */
  nudge: boolean;
  onHint: () => void;
  onSkip: () => void;
  /** After CHECK: nothing to skip or hint. */
  locked: boolean;
}) {
  const reducedMotion = useReducedMotion();
  if (locked) return <div className="h-9" aria-hidden="true" />;
  const hintOn = canHint && hintsLeft > 0;
  return (
    <div className="flex items-center justify-between gap-3 -mb-1">
      <button
        type="button"
        onClick={onSkip}
        className="inline-flex items-center gap-1 h-9 rounded-xl px-2.5 -ml-2.5 text-[14px] font-extrabold uppercase tracking-[0.06em] text-[var(--text-muted)] hover:bg-[var(--bg-section)] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
      >
        <Glyph name="chevronsRight" className="w-4.5 h-4.5 stroke-[2.75]" />
        Skip
      </button>

      <motion.button
        type="button"
        onClick={onHint}
        disabled={!hintOn}
        aria-label={hintOn ? `Get a hint, ${hintsLeft} of ${hintsTotal} left` : 'No hint available'}
        animate={
          hintOn && nudge && !reducedMotion
            ? { scale: [1, 1.08, 1], rotate: [0, -6, 6, 0], boxShadow: ['0 3px 0 var(--lesson-gold-dark)', '0 3px 0 var(--lesson-gold-dark), 0 0 0 8px color-mix(in srgb, var(--lesson-gold) 30%, transparent)', '0 3px 0 var(--lesson-gold-dark)'] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 1.1, repeat: hintOn && nudge ? Infinity : 0, repeatDelay: 0.6 }}
        whileTap={hintOn && !reducedMotion ? { y: 2 } : undefined}
        className="inline-flex items-center gap-2 h-9 rounded-xl px-3 text-[14px] font-extrabold uppercase tracking-[0.06em] cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--lesson-gold)]/30"
        style={
          hintOn
            ? {
                color: 'var(--lesson-gold-dark)',
                backgroundColor: 'color-mix(in srgb, var(--lesson-gold) 16%, var(--bg-card))',
                border: '2px solid color-mix(in srgb, var(--lesson-gold) 55%, var(--bg-card))',
                boxShadow: '0 3px 0 var(--lesson-gold-dark)',
              }
            : { color: 'var(--text-muted)', backgroundColor: 'var(--bg-section)', border: '2px solid var(--border)' }
        }
      >
        <Glyph name="bulb" className={`w-4 h-4 stroke-[2.75] ${hintOn ? 'fill-current' : ''}`} />
        Hint
        <span className="flex items-center gap-1" aria-hidden="true">
          {Array.from({ length: hintsTotal }, (_, i) => (
            <span
              key={i}
              className="block w-2 h-2 rounded-full"
              style={{ backgroundColor: i < hintsLeft ? 'var(--lesson-gold)' : 'var(--border)' }}
            />
          ))}
        </span>
      </motion.button>
    </div>
  );
}

export default ApplyTools;
