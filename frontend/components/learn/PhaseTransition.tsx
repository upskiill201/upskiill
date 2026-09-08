'use client';

/**
 * PhaseTransition — the content half of the unlock choreography.
 *
 * The four phases were previously plain sibling conditionals, so advancing
 * replaced the screen instantly. Wrapping them here gives the swap a direction:
 * the phase you finished leaves to the left while its step stamps shut, and the
 * new one arrives from the right as its step unlocks.
 *
 * Timing is deliberately locked to `PhaseStepper`'s beats — exit lands inside
 * Beat 1, entry inside Beat 3 — so the content and the stepper read as one
 * movement rather than two things that happen to animate at once. `mode="wait"`
 * guarantees the order; if you change these numbers, change them there too.
 *
 * ── `variant="portal"` ──────────────────────────────────────────────────────
 * A second, unrelated use: the one-time hop from the pre-lesson start screen
 * into the lesson player itself. That isn't a phase-to-phase step (no beat
 * choreography plays for it — see PhaseStepper's `staticDisplay`), so a lateral
 * slide would read as "one more phase," which is the wrong signal for what is
 * actually a completely different screen. Portal instead scales up and fades,
 * a "stepping through" motion with no timing dependency on PhaseStepper.
 */

import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface PhaseTransitionProps {
  /** Changing this is what triggers the transition. */
  phaseKey: string;
  className?: string;
  children: React.ReactNode;
  /** 'slide' (default) for phase-to-phase steps; 'portal' for the one-off
   *  start-screen → lesson-player hop. */
  variant?: 'slide' | 'portal';
}

export default function PhaseTransition({
  phaseKey,
  className,
  children,
  variant = 'slide',
}: PhaseTransitionProps) {
  const reducedMotion = useReducedMotion();
  const isPortal = variant === 'portal';

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={phaseKey}
        className={className}
        initial={
          reducedMotion
            ? { opacity: 0 }
            : isPortal
              ? { opacity: 0, scale: 0.94 }
              : { opacity: 0, x: 48 }
        }
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
        exit={
          reducedMotion
            ? { opacity: 0 }
            : isPortal
              ? { opacity: 0, scale: 1.05 }
              : { opacity: 0, x: -48 }
        }
        transition={
          reducedMotion
            ? { duration: 0.12 }
            : isPortal
              ? { opacity: { duration: 0.3 }, scale: { type: 'spring', stiffness: 300, damping: 26 } }
              : {
                  // Entry waits out the travel beat so content arrives with the
                  // unlock, not before it.
                  opacity: { duration: 0.3, delay: 0.1 },
                  x: { type: 'spring', stiffness: 320, damping: 30, delay: 0.1 },
                }
        }
        style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
