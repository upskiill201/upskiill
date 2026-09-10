'use client';

/**
 * SectionUnlockedScene — forward momentum beat. The next section starts
 * locked, rattles, bursts open in a white flash, then its preview card
 * springs in with START SECTION / BACK TO COURSE. The lock state itself was
 * already persisted server-side by lesson completion — this scene only tells
 * the learner about it.
 */

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Clock, Lock, LockOpen } from 'lucide-react';
import SceneShell from '../SceneShell';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { playChestBurst, playWhoosh } from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';
import { pickSectionUnlockedHeadline } from '@/lib/tey/milestoneVoice';

type SectionUnlockedInput = Extract<CelebrationScene, { kind: 'SECTION_UNLOCKED' }>;

interface SectionUnlockedSceneProps {
  scene: SectionUnlockedInput;
  onAdvance: () => void;
}

const SHAKE_AT_MS = 500;
/** Flash + swap to the unlocked state */
const REVEAL_AT_MS = 1200;

export default function SectionUnlockedScene({ scene, onAdvance }: SectionUnlockedSceneProps) {
  const reducedMotion = useReducedMotion();
  const [shakeBeat, setShakeBeat] = useState(false);
  const [unlockBeat, setUnlockBeat] = useState(false);
  // Derived, not synced: if the reduced-motion media query resolves late the
  // end state renders immediately without any effect-driven state churn.
  const revealed = unlockBeat || reducedMotion === true;
  const shaking = shakeBeat && !revealed;
  // Lazy initializer, not an effect: picked once per scene instance so a
  // re-render never rerolls the headline mid-reveal.
  const [headline] = useState(() => pickSectionUnlockedHeadline());

  useEffect(() => {
    playHaptic('teyroCelebration');
    if (reducedMotion) return;

    playWhoosh('down');
    const shakeTimer = setTimeout(() => {
      setShakeBeat(true);
      playHaptic('medium');
    }, SHAKE_AT_MS);
    const revealTimer = setTimeout(() => {
      setUnlockBeat(true);
      playChestBurst();
      playHaptic('success');
    }, REVEAL_AT_MS);
    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(revealTimer);
    };
  }, [reducedMotion]);

  // Navigation CTAs must also advance() — otherwise the full-page overlay
  // stays mounted over the destination route.
  const handleStartSection = () => {
    scene.onStartSection();
    onAdvance();
  };
  const handleBackToCourse = () => {
    scene.onBackToCourse();
    onAdvance();
  };

  return (
    <SceneShell
      cta={revealed ? { text: 'START SECTION', onClick: handleStartSection, variant: 'green' } : null}
      secondaryCta={revealed ? { text: 'BACK TO COURSE', onClick: handleBackToCourse } : undefined}
      onSkip={onAdvance}
    >
      {/* Headline lands with the reveal */}
      <motion.h1
        className={styles.headline}
        initial={false}
        animate={revealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        style={{ visibility: revealed ? 'visible' : 'hidden' }}
      >
        {headline}
      </motion.h1>

      {/* The lock that opens */}
      <div className={styles.lockStage}>
        <motion.div
          className={`${styles.lockCircle} ${revealed ? styles.lockCircleUnlocked : styles.lockCircleLocked}`}
          animate={
            shaking && !reducedMotion
              ? { rotate: [0, -9, 8, -7, 6, 0], x: [0, -3, 3, -2, 2, 0] }
              : revealed && !reducedMotion
                ? { scale: [1, 1.22, 1], rotate: 0, x: 0 }
                : { scale: 1, rotate: 0, x: 0 }
          }
          transition={
            shaking
              ? { duration: 0.55, ease: 'easeInOut' }
              : revealed
                ? { duration: 0.45, ease: [0.34, 1.3, 0.64, 1] }
                : { type: 'spring', stiffness: 340, damping: 16 }
          }
        >
          {revealed ? <LockOpen size={42} strokeWidth={2.4} /> : <Lock size={40} strokeWidth={2.4} />}
          {!reducedMotion && revealed && (
            <motion.div
              className={styles.unlockFlash}
              initial={{ opacity: 0.95, scale: 0.55 }}
              animate={{ opacity: 0, scale: 1.9 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )}
        </motion.div>
        <span
          className={`${styles.lockStateLabel} ${revealed ? styles.lockStateLabelUnlocked : ''}`}
        >
          {revealed ? 'Ready to learn' : 'Locked'}
        </span>
      </div>

      {/* Next-section preview */}
      <motion.div
        className={styles.milestoneCard}
        initial={false}
        animate={revealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
        transition={{ delay: revealed ? (reducedMotion ? 0 : 0.35) : 0, duration: 0.38, ease: 'easeOut' }}
      >
        <span className={styles.milestoneKicker}>Up next · {scene.sectionIndexLabel}</span>
        <span className={styles.milestoneTitle}>{scene.sectionTitle}</span>
        <div className={styles.milestoneMetaRow}>
          <span className={styles.milestoneMetaItem}>
            <BookOpen size={15} strokeWidth={2.5} />
            {scene.lessonCount} {scene.lessonCount === 1 ? 'Lesson' : 'Lessons'}
          </span>
          <span className={styles.milestoneMetaItem}>
            <Clock size={15} strokeWidth={2.5} />~{scene.estimatedMinutes} Minutes
          </span>
        </div>
        {scene.description && <p className={styles.previewDesc}>{scene.description}</p>}
      </motion.div>
    </SceneShell>
  );
}
