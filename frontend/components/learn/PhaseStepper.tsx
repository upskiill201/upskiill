'use client';

/**
 * PhaseStepper — the Learn → Apply → Reflect → Deepen progress indicator, and
 * the owner of the three-beat unlock choreography.
 *
 * Replaces two near-duplicate inline copies that previously lived in the
 * section page (one on the start screen with its progress hardcoded to 0%, one
 * in the player). Keeping them in sync by hand had already failed: the fourth
 * step could never render as completed, and `.circleCompleted` was defined
 * byte-identically to `.circleActive`, so a finished step and the current step
 * looked the same.
 *
 * ── Why the choreography lives here rather than in the page's handlers ─────
 * The three beats are a timed sequence whose audio has to stay locked to the
 * motion (the travel sweep is tuned to the line's transition duration). Split
 * across the page's four advance handlers, that timing would drift the first
 * time someone edited one of them. The page just sets `lessonPhase`; this
 * component watches it change and plays the whole beat sequence.
 *
 * The one advance this cannot see is finishing the lesson from Deepen — that
 * is not a phase change — so the page fires the final ladder note itself.
 *
 *   Beat 1 · Seal    0-250ms   step behind you stamps to completed
 *   Beat 2 · Travel  250-600ms fill grows, dot rides it to the next step
 *   Beat 3 · Unlock  600-950ms next circle turns, ring pulses out
 */

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { playPhaseSeal, playPhaseTravel, playPhaseUnlock } from '@/lib/audio/lessonAudio';
import { playHaptic } from '@/lib/haptics';
import styles from './Learn.module.css';

export type LessonPhase = 'start' | 'learn' | 'apply' | 'reflect' | 'deepen';

const STEPS: { phase: Exclude<LessonPhase, 'start'>; label: string }[] = [
  { phase: 'learn', label: 'Learn' },
  { phase: 'apply', label: 'Apply' },
  { phase: 'reflect', label: 'Reflect' },
  { phase: 'deepen', label: 'Deepen' },
];

/**
 * How far along the track each phase sits, as a percentage of the distance
 * between the first and last circle.
 *
 * Learn is 8%, not 0%. Opening a lesson by showing the learner a bar at
 * literal zero tells them they have accomplished nothing; a small head start
 * measurably increases the odds of finishing (the endowed progress effect).
 * They have, after all, already turned up.
 */
const PHASE_PROGRESS: Record<LessonPhase, number> = {
  start: 8,
  learn: 8,
  apply: 33,
  reflect: 66,
  deepen: 100,
};

const phaseIndex = (phase: LessonPhase) =>
  phase === 'start' ? 0 : STEPS.findIndex((s) => s.phase === phase);

const BEAT_SEAL_MS = 250;
const BEAT_TRAVEL_MS = 350;
const BEAT_UNLOCK_MS = 350;

interface PhaseStepperProps {
  phase: LessonPhase;
  /** Renders the close control in the bar when provided. */
  onClose?: () => void;
  /** Suppresses the unlock choreography — used on the pre-lesson start screen,
   *  where nothing has been unlocked yet. */
  staticDisplay?: boolean;
}

export default function PhaseStepper({ phase, onClose, staticDisplay = false }: PhaseStepperProps) {
  const reducedMotion = useReducedMotion();
  const prevPhaseRef = useRef<LessonPhase>(phase);

  // Which step is mid-stamp, and which is mid-unlock. `null` when idle.
  const [sealingStep, setSealingStep] = useState<number | null>(null);
  const [unlockingStep, setUnlockingStep] = useState<number | null>(null);

  useEffect(() => {
    const prev = prevPhaseRef.current;
    prevPhaseRef.current = phase;

    if (staticDisplay || phase === prev) return;

    const from = phaseIndex(prev);
    const to = phaseIndex(phase);

    // Only celebrate forward movement. Going backwards (or jumping into a
    // lesson mid-way in review mode) just updates the display.
    if (to <= from) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Beat 1 — seal the step behind you.
    playPhaseSeal();
    playHaptic('light', false);
    if (!reducedMotion) setSealingStep(from);

    // Beat 2 — the fill travels. The line's own CSS/spring transition runs
    // regardless; this is the sound and the dot that ride along with it.
    timers.push(
      setTimeout(() => {
        setSealingStep(null);
        playPhaseTravel();
      }, BEAT_SEAL_MS)
    );

    // Beat 3 — the next step unlocks. This is the ladder note; `to - 1` maps
    // learn→apply to rung 0, apply→reflect to rung 1, reflect→deepen to rung 2.
    timers.push(
      setTimeout(() => {
        playPhaseUnlock(to - 1);
        playHaptic('teyroSnap', false);
        if (!reducedMotion) {
          setUnlockingStep(to);
          timers.push(setTimeout(() => setUnlockingStep(null), BEAT_UNLOCK_MS));
        }
      }, BEAT_SEAL_MS + BEAT_TRAVEL_MS)
    );

    return () => timers.forEach(clearTimeout);
  }, [phase, staticDisplay, reducedMotion]);

  const activeIndex = phaseIndex(phase);
  const fillPercent = PHASE_PROGRESS[phase];

  return (
    <div className={styles.headerBar}>
      <div className={styles.stepper}>
        <div className={styles.lineTrack} />

        <motion.div
          className={styles.lineFill}
          initial={false}
          animate={{ width: `calc((100% - 52px) * ${fillPercent / 100})` }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: BEAT_TRAVEL_MS / 1000, delay: BEAT_SEAL_MS / 1000, ease: 'easeInOut' }
          }
        />

        {/* The dot rides the end of the fill, so it is positioned off the same
            percentage rather than animated independently. */}
        {!reducedMotion && (
          <motion.div
            className={styles.travelDot}
            initial={false}
            animate={{
              left: `calc(26px + (100% - 52px) * ${fillPercent / 100})`,
              opacity: sealingStep !== null || unlockingStep !== null ? 1 : 0,
            }}
            transition={{
              left: { duration: BEAT_TRAVEL_MS / 1000, delay: BEAT_SEAL_MS / 1000, ease: 'easeInOut' },
              opacity: { duration: 0.2 },
            }}
          />
        )}

        {STEPS.map((step, idx) => {
          const isDone = idx < activeIndex;
          const isCurrent = idx === activeIndex && phase !== 'start';
          const isStartFirst = idx === 0 && phase === 'start';

          const circleClass = isDone
            ? styles.circleCompleted
            : isCurrent || isStartFirst
              ? styles.circleActive
              : styles.circleUpcoming;

          return (
            <div key={step.phase} className={styles.step}>
              <div className={styles.circleWrap}>
                <motion.div
                  className={`${styles.circle} ${circleClass}`}
                  animate={
                    reducedMotion
                      ? {}
                      : sealingStep === idx
                        ? { scale: [1, 1.25, 1] }
                        : unlockingStep === idx
                          ? { scale: [1, 1.18, 0.96, 1] }
                          : { scale: 1 }
                  }
                  transition={{ duration: sealingStep === idx ? 0.25 : 0.35, ease: 'easeOut' }}
                >
                  {isDone ? <Check size={22} strokeWidth={3.5} /> : idx + 1}
                </motion.div>

                <AnimatePresence>
                  {unlockingStep === idx && (
                    <motion.span
                      key="ring"
                      className={styles.unlockRing}
                      initial={{ scale: 1, opacity: 0.85 }}
                      animate={{ scale: 1.7, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: BEAT_UNLOCK_MS / 1000, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>
              </div>

              <span
                className={`${styles.label} ${
                  isCurrent || isStartFirst ? styles.labelActive : isDone ? styles.labelDone : ''
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {onClose && (
        <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Close lesson">
          <X size={20} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
