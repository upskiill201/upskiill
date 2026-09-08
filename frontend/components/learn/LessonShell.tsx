'use client';

/**
 * LessonShell — the stable frame the four lesson phases live inside.
 *
 * Before this, each phase built its own header, its own bottom treatment and
 * its own spacing, so moving between them replaced the entire screen. That is
 * why the lesson felt like four unrelated products rather than four steps of
 * one thing — and it is why transition polish alone would not have fixed it.
 * Unlocking only reads as unlocking if the room stays put and a door opens.
 *
 * The shell owns two things:
 *  - the sticky header (the stepper, promoted from marginal trim to the
 *    primary chrome it should always have been)
 *  - the `--phase-accent` custom property, set once here and inherited by
 *    everything inside, so a phase change re-tints the badge, controls and
 *    header edge together instead of each component tracking the phase itself
 */

import React from 'react';
import PhaseStepper, { LessonPhase } from './PhaseStepper';
import styles from './Learn.module.css';

const PHASE_CLASS: Record<LessonPhase, string> = {
  start: styles.phaseLearn,
  learn: styles.phaseLearn,
  apply: styles.phaseApply,
  reflect: styles.phaseReflect,
  deepen: styles.phaseDeepen,
};

interface LessonShellProps {
  phase: LessonPhase;
  onClose?: () => void;
  /** Start screen shows the stepper as a static preview — nothing unlocked yet. */
  staticStepper?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function LessonShell({
  phase,
  onClose,
  staticStepper = false,
  className,
  children,
}: LessonShellProps) {
  return (
    <div className={`${styles.shell} ${PHASE_CLASS[phase]} ${className ?? ''}`}>
      <PhaseStepper phase={phase} onClose={onClose} staticDisplay={staticStepper} />
      {children}
    </div>
  );
}
