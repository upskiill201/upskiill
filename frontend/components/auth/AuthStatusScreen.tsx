'use client';

/**
 * One-message auth screens — "check your email", "that link expired",
 * "password updated" — in the welcome screen's style: one of Teyro's own
 * drawings springing in, a chunky title, one line, one big button. Plays its
 * cue on arrival.
 */

import Link from 'next/link';
import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Art, type ArtName } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';
import { authStyles as styles } from './AuthUi';

export interface AuthStatusScreenProps {
  art: ArtName;
  tone: 'good' | 'bad';
  title: string;
  children: React.ReactNode;
  action: { label: string; href: string };
  secondary?: { label: string; href: string };
  closeHref: string;
}

export default function AuthStatusScreen({
  art,
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
          <Glyph name="close" size={26} strokeWidth={3.2} />
        </Link>
      </header>
      <main className={`${styles.formPane} ${styles.center}`}>
        <motion.span
          initial={reduce ? false : { scale: 0.4, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 14 }}
        >
          <Art name={art} size={120} />
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
