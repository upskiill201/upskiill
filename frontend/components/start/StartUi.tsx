'use client';

/**
 * Shared pieces for the /start install gateway, Duolingo-style: chunky 3D
 * buttons, white lipped cards, a green step bar, and Tey speaking in a
 * bubble. Styles in Start.module.css (tokens only).
 */

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './Start.module.css';

export { styles as startStyles };

export const panelVariants: Variants = {
  hidden: { y: 22, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 320, damping: 28 } },
  exit: { y: -14, opacity: 0, transition: { duration: 0.16 } },
};

/**
 * Primary CTA. `busy` shows a spinner inside the button rather than swapping
 * it out, so the tap target never moves under the thumb.
 */
export function StartButton({
  children,
  onClick,
  ariaLabel,
  busy = false,
  disabled = false,
  icon,
  tone = 'blue',
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
  busy?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  tone?: 'blue' | 'green';
}) {
  const inert = busy || disabled;
  return (
    <button
      type="button"
      onClick={() => {
        if (inert) return;
        // Feedback fires on the tap itself, before any async work.
        playHaptic('medium', false);
        playSound('nodeTap');
        onClick();
      }}
      aria-label={ariaLabel}
      aria-busy={busy}
      disabled={inert}
      className={`${styles.button} ${tone === 'green' ? styles.buttonGreen : ''}`}
    >
      {busy ? <span className={styles.spinner} aria-hidden="true" /> : icon}
      <span>{children}</span>
    </button>
  );
}

/** Quiet escape hatch. Every install screen has one — no screen is a dead end. */
export function StartGhostButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        playHaptic('light', false);
        playSound('cardBack');
        onClick();
      }}
      className={styles.ghost}
    >
      {children}
    </button>
  );
}

export function StartCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}

/** The guide's progress: Duolingo's chunky green bar, with a readable label. */
export function StepProgress({ total, current, label }: { total: number; current: number; label: string }) {
  return (
    <div
      className={styles.progress}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-valuetext={label}
    >
      <motion.span
        className={styles.progressFill}
        animate={{ width: `${((current + 1) / total) * 100}%` }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      />
    </div>
  );
}

/** A headline with one phrase in brand blue. */
export function StartHeadline({
  lead,
  accent,
  size = 'lg',
}: {
  lead: React.ReactNode;
  accent?: React.ReactNode;
  size?: 'lg' | 'md';
}) {
  const reduce = useReducedMotion();
  return (
    <motion.h1
      initial={reduce ? false : { y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className={`${styles.headline} ${size === 'md' ? styles.headlineMd : ''}`}
    >
      {lead}
      {accent ? (
        <>
          {' '}
          <span>{accent}</span>
        </>
      ) : null}
    </motion.h1>
  );
}

export function StartSubtitle({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      initial={reduce ? false : { y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.08, type: 'spring', stiffness: 380, damping: 30 }}
      className={styles.subtitle}
    >
      {children}
    </motion.p>
  );
}

/** Tey saying a line, bubble on the right. */
export function TeySays({ children, pose = 'pointing' }: { children: React.ReactNode; pose?: 'pointing' | 'welcome' | 'cheering' }) {
  return (
    <div className={styles.tey}>
      <Image
        src={`/User onbarding Assets/tey/${pose}.webp`}
        alt=""
        width={64}
        height={80}
        className={styles.teyImg}
      />
      <p className={styles.bubble}>{children}</p>
    </div>
  );
}

/** A "what you get" row. The label always says it in words. */
export function StartBenefit({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className={styles.benefit}>
      <span className={styles.benefitIcon} aria-hidden="true">
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}
