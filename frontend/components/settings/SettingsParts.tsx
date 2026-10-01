'use client';

/**
 * Shared pieces of the Duolingo-style settings pages — the learner's
 * /dashboard/settings and the creator's /creator/settings: the chunky switch
 * (with a sound each way), icon rows, the floating "Saved" tick, and the
 * loading / error states. Provider-free, so they work outside (app).
 */

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, RefreshCw } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './Settings.module.css';

export { styles as settingsStyles };

/** Duolingo's switch: a chunky pill, blue when on, with a sound each way. */
export function Switch({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={`${styles.switch} ${checked ? styles.switchOn : ''}`}
      onClick={() => {
        const next = !checked;
        playSound(next ? 'toggleOn' : 'toggleOff');
        playHaptic('selection', false);
        onChange(next);
      }}
    >
      <motion.span className={styles.knob} layout transition={{ type: 'spring', stiffness: 700, damping: 36 }} />
    </button>
  );
}

export function Row({
  icon: Icon,
  title,
  sub,
  children,
}: {
  icon: React.ElementType;
  title: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.row}>
      <span className={styles.rowIcon} aria-hidden="true">
        <Icon size={20} strokeWidth={2.5} />
      </span>
      <span className={styles.rowText}>
        <span className={styles.rowTitle}>{title}</span>
        {sub && <span className={styles.rowSub}>{sub}</span>}
      </span>
      {children}
    </div>
  );
}

export function SectionError({ onRetry, what }: { onRetry: () => void; what: string }) {
  return (
    <div className={styles.sectionError} role="alert">
      <AlertCircle size={20} strokeWidth={2.5} aria-hidden="true" />
      <span>Couldn&apos;t load your {what}.</span>
      <button type="button" className={styles.linkBtn} onClick={onRetry}>
        <RefreshCw size={14} strokeWidth={2.75} aria-hidden="true" /> Try again
      </button>
    </div>
  );
}

export function SkeletonRows({ count = 3 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonRow}>
          <span className={styles.skeletonDot} />
          <span className={styles.skeletonLine} />
        </div>
      ))}
    </div>
  );
}

/** A short "Saved" tick that floats in next to a section title. */
export function SavedTick({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className={styles.savedTick}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          role="status"
        >
          <Check size={14} strokeWidth={3} aria-hidden="true" /> Saved
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function useSavedFlash() {
  const [shown, setShown] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  return {
    shown,
    flash: () => {
      setShown(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setShown(false), 1600);
    },
  };
}
