'use client';

/**
 * The moment between two steps of a lesson, full screen and short:
 *
 *   ✓ LEARN COMPLETE                    ✓ PRACTICE DONE
 *   Next: Apply                         9 of 10 right · best run 6
 *   10 questions · combo bonus up to +5 Next: Reflect
 *
 * A step finished should feel finished. The old version was a small pill
 * under the progress bar that was easy to miss; this one stamps the step
 * done, shows how the learner did, and names what's next, so every lesson
 * has a few clear "levels" instead of one long scroll.
 *
 * It goes on by itself after a moment (or a tap anywhere, or the footer
 * button), so it never adds a chore.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Glyph, type GlyphName } from '@/components/art/Glyph';
import { useCallback, useEffect, useRef } from 'react';
import { playSound } from '@/lib/audio/lessonSounds';
import { celebrationHaptic } from '@/lib/haptics';
import { PHASE_COLOR, PHASE_LABEL, PHASE_ORDER, type LessonPhase } from '@/lib/lesson/content';

const ICON: Record<LessonPhase, GlyphName> = { learn: 'book', apply: 'target', reflect: 'pencil', deepen: 'bulb' };

const DONE_TITLE: Record<LessonPhase, string> = {
  learn: 'Learn complete!',
  apply: 'Practice done!',
  reflect: 'Reflection saved!',
  deepen: 'All done!',
};

export interface PhaseGateProps {
  from: LessonPhase;
  to: LessonPhase;
  /** What just happened, in a line ("9 of 10 right · best run 6"). */
  result: string | null;
  /** What's next, in a line ("10 questions · combo bonus up to +5 XP"). */
  ahead: string | null;
  /** A small flame chip when the learner is on a run into the next step. */
  hot?: string | null;
  onGo: () => void;
}

const AUTO_MS = 2600;

export function PhaseGate({ from, to, result, ahead, hot, onGo }: PhaseGateProps) {
  const reducedMotion = useReducedMotion();
  const done = useRef(false);
  const go = useRef(onGo);
  useEffect(() => {
    go.current = onGo;
  });
  const fire = useCallback(() => {
    if (done.current) return;
    done.current = true;
    go.current();
  }, []);

  useEffect(() => {
    playSound('phaseGate', PHASE_ORDER.indexOf(to));
    celebrationHaptic('soft');
    const t = setTimeout(fire, AUTO_MS);
    return () => clearTimeout(t);
  }, [to, fire]);

  const fromGlyph = ICON[from];
  const toGlyph = ICON[to];
  const fromColor = PHASE_COLOR[from];
  const toColor = PHASE_COLOR[to];

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center text-center py-8 cursor-pointer"
      onClick={fire}
      role="status"
      aria-live="polite"
    >
      {/* The finished step, stamped. */}
      <motion.div
        className="relative w-[120px] h-[120px] rounded-full flex items-center justify-center"
        style={{ backgroundColor: fromColor, boxShadow: `0 8px 0 color-mix(in srgb, ${fromColor} 70%, black)` }}
        initial={reducedMotion ? { opacity: 0 } : { scale: 0.3, opacity: 0, rotate: -30 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 13 }}
      >
        <Glyph name={fromGlyph} className="w-14 h-14 text-white stroke-[2.5]" />
        <motion.span
          className="absolute -right-1 -bottom-1 w-11 h-11 rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: '0 3px 0 var(--border)' }}
          initial={reducedMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 600, damping: 12 }}
        >
          <Glyph name="check" className="w-7 h-7 stroke-[4]" style={{ color: 'var(--lesson-correct)' }} />
        </motion.span>
        {!reducedMotion && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{ border: `6px solid ${fromColor}` }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          />
        )}
      </motion.div>

      <motion.h2
        className="mt-6 text-[28px] md:text-[34px] font-extrabold leading-tight"
        style={{ color: fromColor, fontFamily: 'var(--font-jakarta)' }}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.18, type: 'spring', stiffness: 520, damping: 18 }}
      >
        {DONE_TITLE[from]}
      </motion.h2>
      {result && (
        <motion.p
          className="mt-1.5 text-[16px] font-bold text-[var(--text-secondary)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {result}
        </motion.p>
      )}
      {hot && (
        <motion.span
          className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13.5px] font-extrabold"
          style={{ color: 'var(--lesson-gold-dark)', backgroundColor: 'color-mix(in srgb, var(--lesson-gold) 18%, var(--bg-card))' }}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 600, damping: 14 }}
        >
          <Glyph name="flame" className="w-4 h-4" />
          {hot}
        </motion.span>
      )}

      {/* What's next, sliding in. */}
      <motion.div
        className="mt-8 w-full max-w-[380px] rounded-[20px] p-4 flex items-center gap-3.5 text-left"
        style={{ backgroundColor: `color-mix(in srgb, ${toColor} 12%, var(--bg-card))`, border: `2px solid color-mix(in srgb, ${toColor} 35%, var(--bg-card))` }}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, type: 'spring', stiffness: 380, damping: 26 }}
      >
        <span
          className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: toColor, boxShadow: `0 3px 0 color-mix(in srgb, ${toColor} 70%, black)` }}
        >
          <Glyph name={toGlyph} className="w-6 h-6 text-white stroke-[2.75]" />
        </span>
        <span className="min-w-0">
          <span className="block text-[12.5px] font-extrabold uppercase tracking-[0.1em]" style={{ color: toColor }}>
            Next up
          </span>
          <span className="block text-[19px] font-extrabold text-ink leading-tight">{PHASE_LABEL[to]}</span>
          {ahead && <span className="block mt-0.5 text-[14px] font-bold text-[var(--text-secondary)] leading-snug">{ahead}</span>}
        </span>
      </motion.div>

      {/* The bar that fills while it waits: a countdown you can see. */}
      {!reducedMotion && (
        <div className="mt-6 w-[140px] h-[6px] rounded-full overflow-hidden bg-[var(--border)]" aria-hidden="true">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: toColor }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
          />
        </div>
      )}

    </div>
  );
}

export default PhaseGate;
