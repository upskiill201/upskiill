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
 */

import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface PhaseTransitionProps {
  /** Changing this is what triggers the transition. */
  phaseKey: string;
  className?: string;
  children: React.ReactNode;
}

export default function PhaseTransition({ phaseKey, className, children }: PhaseTransitionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={phaseKey}
        className={className}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 48 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -48 }}
        transition={
          reducedMotion
            ? { duration: 0.12 }
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
