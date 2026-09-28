'use client';

/**
 * The only chrome a lesson has: close, one progress bar, hearts.
 *
 * The bar grows a slice on every step and every right answer, so progress
 * is felt constantly rather than in four big jumps. It wears the current
 * phase's colour (Learn blue, Apply green, Reflect purple, Deepen orange), so
 * the four-step shape of a Teyro lesson stays visible without a stepper.
 *
 * It also owns the phase-advance sound — seal, travel, unlock, the rising
 * ladder in lib/audio/lessonAudio.ts — because the sound is tuned to the
 * bar's motion and belongs with it.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Flame, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { PHASE_COLOR, PHASE_ORDER, type LessonPhase } from '@/lib/lesson/content';

export function LessonTopBar({
  progress,
  phase,
  combo,
  hearts,
  onClose,
}: {
  /** 0–1 */
  progress: number;
  phase: LessonPhase;
  /** Correct answers in a row; the bar lights up from 3. */
  combo: number;
  /** null hides hearts (admin review). */
  hearts: number | null;
  onClose: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const onFire = combo >= 3;
  const color = onFire ? 'var(--lesson-gold)' : PHASE_COLOR[phase];

  // ── Phase advance: seal → travel → unlock, tuned to the bar's spring.
  const prevPhase = useRef(phase);
  useEffect(() => {
    const from = PHASE_ORDER.indexOf(prevPhase.current);
    const to = PHASE_ORDER.indexOf(phase);
    prevPhase.current = phase;
    if (to <= from) return;
    playSound('phaseSeal');
    playHaptic('light', false);
    const t1 = setTimeout(() => playSound('phaseTravel'), 220);
    const t2 = setTimeout(() => {
      playSound('phaseUnlock', Math.max(0, to - 1));
      playHaptic('teyroSnap', false);
    }, 560);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  // ── A heart lost: it shakes and the number drops.
  const [lastHearts, setLastHearts] = useState(hearts);
  const [heartHit, setHeartHit] = useState(0);
  if (hearts !== lastHearts) {
    if (hearts !== null && lastHearts !== null && hearts < lastHearts) setHeartHit((n) => n + 1);
    setLastHearts(hearts);
  }

  return (
    <div className="shrink-0 pt-[calc(env(safe-area-inset-top)+10px)] md:pt-6">
      <div className="mx-auto w-full max-w-[1040px] px-3 md:px-8 flex items-center gap-3 md:gap-5 h-[52px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Quit lesson"
          className="shrink-0 w-10 h-10 -ml-1 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-section)] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
        >
          <X className="w-7 h-7 stroke-[2.75]" aria-hidden="true" />
        </button>

        <div className="relative flex-1">
          {/* "3 IN A ROW" rides above the bar while a run lasts. */}
          <AnimatePresence>
            {onFire && (
              <motion.div
                key={combo}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                className="absolute -top-[22px] left-2 flex items-center gap-1 text-[12.5px] font-extrabold uppercase tracking-[0.08em]"
                style={{ color: 'var(--lesson-gold-dark)' }}
              >
                <Flame className="w-4 h-4 fill-current" aria-hidden="true" />
                {combo} in a row
              </motion.div>
            )}
          </AnimatePresence>

          <div
            role="progressbar"
            aria-label="Lesson progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            className="h-4 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--border)' }}
          >
            <motion.div
              className="relative h-full rounded-full"
              initial={false}
              animate={{ width: `${progress * 100}%`, backgroundColor: color }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { width: { type: 'spring', stiffness: 170, damping: 22 }, backgroundColor: { duration: 0.3 } }
              }
            >
              {/* The glossy highlight that makes the bar read as a thing. */}
              <span
                aria-hidden="true"
                className="absolute left-2 right-2 top-[3px] h-[4px] rounded-full bg-white/35"
              />
            </motion.div>
          </div>
        </div>

        {hearts !== null && (
          <motion.div
            key={heartHit}
            className="shrink-0 flex items-center gap-1.5"
            animate={heartHit && !reducedMotion ? { x: [0, -5, 5, -3, 3, 0], scale: [1, 1.15, 1] } : undefined}
            transition={{ duration: 0.45 }}
            aria-label={`${hearts} hearts left`}
          >
            <Image src="/Icons/heart.png" alt="" aria-hidden="true" width={28} height={28} className="w-7 h-7" />
            <span
              className="text-[17px] font-extrabold tabular-nums"
              style={{ color: 'var(--lesson-heart)', fontFamily: 'var(--font-jakarta)' }}
            >
              {hearts}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default LessonTopBar;
