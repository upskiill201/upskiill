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
import { Glyph } from '@/components/art/Glyph';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { PHASE_COLOR, PHASE_LABEL, PHASE_ORDER, type LessonPhase } from '@/lib/lesson/content';
import { ComboChip } from './ComboHud';

export function LessonTopBar({
  progress,
  phase,
  combo,
  hearts,
  onClose,
  musicOn = null,
  onToggleMusic,
  stampPhases = PHASE_ORDER,
}: {
  /** 0–1 */
  progress: number;
  phase: LessonPhase;
  /** Correct answers in a row; the bar lights up from 3. */
  combo: number;
  /** null hides hearts (admin review). */
  hearts: number | null;
  onClose: () => void;
  /** The lesson music switch; null hides it. */
  musicOn?: boolean | null;
  onToggleMusic?: () => void;
  /** Phases that get the "unlocked" pill (the rest have a full-screen gate). */
  stampPhases?: LessonPhase[];
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

  // ── Every step forward, a sheen runs along the bar.
  const [lastProgress, setLastProgress] = useState(progress);
  const [shine, setShine] = useState(0);
  if (progress !== lastProgress) {
    if (progress > lastProgress) setShine((n) => n + 1);
    setLastProgress(progress);
  }

  // ── A new step opens: its name drops in under the bar for a moment.
  const [stamp, setStamp] = useState<{ phase: LessonPhase; key: number } | null>(null);
  const [lastPhase, setLastPhase] = useState(phase);
  if (phase !== lastPhase) {
    if (PHASE_ORDER.indexOf(phase) > PHASE_ORDER.indexOf(lastPhase) && stampPhases.includes(phase)) {
      setStamp((s) => ({ phase, key: (s?.key ?? 0) + 1 }));
    }
    setLastPhase(phase);
  }
  useEffect(() => {
    if (!stamp) return;
    const t = setTimeout(() => setStamp(null), 1900);
    return () => clearTimeout(t);
  }, [stamp]);

  return (
    <div className="relative shrink-0 pt-[calc(env(safe-area-inset-top)+10px)] md:pt-6">
      <div className="mx-auto w-full max-w-[1040px] px-3 md:px-8 flex items-center gap-3 md:gap-5 h-[52px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Quit lesson"
          className="shrink-0 w-10 h-10 -ml-1 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-section)] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
        >
          <Glyph name="close" className="w-7 h-7 stroke-[2.75]" />
        </button>

        <div className="relative flex-1">
          {/* The run, named, rides above the bar while it lasts (ComboHud). */}
          <ComboChip run={combo} />

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
              {/* A sheen sweeps along on every step forward. */}
              {shine > 0 && !reducedMotion && (
                <span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-full">
                  <motion.span
                    key={shine}
                    className="absolute top-0 bottom-0 w-10"
                    style={{ background: 'linear-gradient(90deg, transparent, color-mix(in srgb, white 75%, transparent), transparent)' }}
                    initial={{ left: '-40px' }}
                    animate={{ left: '100%' }}
                    transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
                  />
                </span>
              )}
            </motion.div>
          </div>
          {/* On a run, a flame rides the tip of the bar. */}
          <AnimatePresence>
            {onFire && (
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 -mt-[15px] -ml-[13px] w-[26px] h-[30px] pointer-events-none"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, left: `${progress * 100}%` }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ left: { type: 'spring', stiffness: 170, damping: 22 }, default: { type: 'spring', stiffness: 500, damping: 16 } }}
              >
                <Image src="/Icons/burn.png" alt="" fill sizes="26px" className="object-contain" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {musicOn !== null && onToggleMusic && (
          <button
            type="button"
            onClick={onToggleMusic}
            aria-label={musicOn ? 'Turn music off' : 'Turn music on'}
            aria-pressed={musicOn}
            className="relative shrink-0 w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[var(--bg-section)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
            style={{ color: musicOn ? 'var(--brand-purple)' : 'var(--text-muted)' }}
          >
            <Glyph name="music" className="w-5 h-5 stroke-[2.5]" />
            {!musicOn && (
              <span aria-hidden="true" className="absolute w-6 h-[2.5px] rounded-full rotate-45" style={{ backgroundColor: 'var(--text-muted)' }} />
            )}
          </button>
        )}

        {hearts !== null && (
          <div className="relative shrink-0">
            <motion.div
              key={heartHit}
              className="flex items-center gap-1.5"
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
            {/* The lost heart breaks off and falls away, with its "−1". */}
            <AnimatePresence>
              {heartHit > 0 && !reducedMotion && (
                <motion.span
                  key={heartHit}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 flex items-center gap-1"
                  initial={{ y: 0, opacity: 1, rotate: 0 }}
                  animate={{ y: 46, opacity: 0, rotate: 28 }}
                  transition={{ duration: 0.9, ease: 'easeIn' }}
                >
                  <Image src="/Icons/heart.png" alt="" width={28} height={28} className="w-7 h-7 grayscale" />
                  <span className="text-[15px] font-extrabold" style={{ color: 'var(--lesson-heart)' }}>
                    −1
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* "Apply unlocked" — the step's name drops in under the bar. */}
      <div className="pointer-events-none absolute inset-x-0 top-full z-[4] flex justify-center">
        <AnimatePresence>
          {stamp && (
            <motion.div
              key={stamp.key}
              role="status"
              className="mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[14px] font-extrabold uppercase tracking-[0.08em] text-white"
              style={{
                backgroundColor: PHASE_COLOR[stamp.phase],
                boxShadow: `0 3px 0 color-mix(in srgb, ${PHASE_COLOR[stamp.phase]} 72%, black)`,
                fontFamily: 'var(--font-jakarta)',
              }}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 520, damping: 16, delay: reducedMotion ? 0 : 0.5 }}
            >
              <Glyph name="unlock" className="w-4 h-4 stroke-[3]" />
              {PHASE_LABEL[stamp.phase]} unlocked
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default LessonTopBar;
