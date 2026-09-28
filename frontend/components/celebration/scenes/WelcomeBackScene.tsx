'use client';

/**
 * WelcomeBackScene — the learner returns after a gap since their last lesson,
 * with no live streak reconciliation to carry the moment (see the producer
 * gating in GamificationContext.tsx). No confetti, no fanfare — Tey noticing
 * the gap and being glad they're back: a warm hello (studio "welcomeBack"),
 * never a sad motif.
 * Reuses the exact "Tey looks sad" illustration from the onboarding WhatsApp
 * skip step, rather than the Celebration Engine's default mascot art.
 */

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SceneShell from '../SceneShell';
import { TypewriterBubble } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { celebrationHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { pickWelcomeBackSpeech } from '@/lib/tey/streakVoice';

type WelcomeBackSceneInput = Extract<CelebrationScene, { kind: 'WELCOME_BACK' }>;

interface WelcomeBackSceneProps {
  scene: WelcomeBackSceneInput;
  onAdvance: () => void;
}

export default function WelcomeBackScene({ scene, onAdvance }: WelcomeBackSceneProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    playSound('welcomeBack');
    celebrationHaptic('soft');
  }, []);

  // Picked once per scene instance so a re-render never rerolls the line the
  // learner is mid-reading.
  const [speech] = useState(() => scene.speech ?? pickWelcomeBackSpeech(scene.days));

  return (
    <SceneShell cta={{ text: "LET'S GO", onClick: onAdvance, variant: 'blue' }}>
      <h1 className={styles.headline}>We missed you!</h1>
      <p className={styles.subhead}>
        It&apos;s been {scene.days} day{scene.days === 1 ? '' : 's'} since your last lesson.
      </p>

      <div className={styles.mascotWrap}>
        <Image
          src="/User onbarding Assets/Step_7_tey_skiped_state.webp"
          alt="Tey looking sad"
          fill
          className={styles.mascotImg}
          priority
        />
      </div>

      <TypewriterBubble text={speech} startDelay={500} />
    </SceneShell>
  );
}
