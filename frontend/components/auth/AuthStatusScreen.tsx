'use client';

/**
 * One-message auth screens — "check your email", "that link expired",
 * "password updated" — in the welcome screen's style: a springy badge, a
 * chunky title, one line, one big button. Plays its cue on arrival.
 */

import Link from 'next/link';
import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X, type LucideIcon } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';
import { authStyles as styles } from './AuthUi';

export interface AuthStatusScreenProps {
  Icon: LucideIcon;
  tone: 'good' | 'bad';
  title: string;
  children: React.ReactNode;
  action: { label: string; href: string };
  secondary?: { label: string; href: string };
  closeHref: string;
}

export default function AuthStatusScreen({
  Icon,
  tone,
  title,
  children,
  action,
  secondary,
  closeHref,
}: AuthStatusScreenProps) {
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    hydrateSoundPreferences();
    playSound(tone === 'good' ? 'correct' : 'wrong');
    playHaptic(tone === 'good' ? 'success' : 'error', false);
  }, [tone]);

  return (
    <div className={styles.screen}>
      <header className={styles.topBar}>
        <Link href={closeHref} className={styles.iconBtn} aria-label="Close" onClick={() => playSound('cardBack')}>
          <X size={26} strokeWidth={3} />
        </Link>
      </header>
      <main className={`${styles.formPane} ${styles.center}`}>
        <motion.span
          className={`${styles.sentBadge} ${tone === 'bad' ? styles.sentBadgeBad : ''}`}
          initial={reduce ? false : { scale: 0.4, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 14 }}
        >
          <Icon size={44} strokeWidth={2.5} aria-hidden="true" />
        </motion.span>
        <h1 className={styles.formTitle}>{title}</h1>
        <p className={styles.formSub}>{children}</p>
        <Link href={action.href} className={styles.primary} onClick={() => playSound('navTap', 2)}>
          {action.label}
        </Link>
        {secondary && (
          <Link href={secondary.href} className={styles.forgot} onClick={() => playSound('navTap', 1)}>
            {secondary.label}
          </Link>
        )}
      </main>
    </div>
  );
}
