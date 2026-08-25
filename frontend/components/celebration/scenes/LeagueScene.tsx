'use client';

/**
 * LeagueScene — full-page weekly settlement verdict: promotion fanfare with
 * the new league's shield, demotion with the mascot in sympathy, or the
 * Diamond Tournament champion moment. Plays once per settled week via the
 * LeagueResultWatcher.
 */

import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import SceneShell from '../SceneShell';
import CelebrationMascot from '../CelebrationMascot';
import LeagueBadge from '@/components/leaderboard/LeagueBadge';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { getLeagueMeta } from '@/lib/leagues';
import {
  playLossMotif,
  playSparkle,
  playStreakFanfare,
  playWhoosh,
} from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';

type LeagueSceneInput = Extract<CelebrationScene, { kind: 'LEAGUE' }>;

interface LeagueSceneProps {
  scene: LeagueSceneInput;
  onAdvance: () => void;
}

const CONFETTI_COLORS = ['#3D5AFE', '#6C8CFF', '#FFD54D', '#FFFFFF', '#4EC3EA'];

export default function LeagueScene({ scene, onAdvance }: LeagueSceneProps) {
  const reducedMotion = useReducedMotion();
  const firedRef = useRef(false);
  const promoted = scene.outcome === 'PROMOTED' || scene.outcome === 'CHAMPION';
  const toMeta = getLeagueMeta(scene.toTier);
  const fromMeta = getLeagueMeta(scene.fromTier);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    playHaptic('teyroCelebration');

    if (promoted) {
      playStreakFanfare();
      if (!reducedMotion && typeof window !== 'undefined') {
        confetti({
          particleCount: 150,
          spread: 110,
          startVelocity: 45,
          origin: { x: 0.5, y: 0.32 },
          colors: CONFETTI_COLORS,
          disableForReducedMotion: true,
        });
        setTimeout(() => {
          confetti({
            particleCount: 70,
            angle: 60,
            spread: 60,
            origin: { x: 0, y: 0.4 },
            colors: CONFETTI_COLORS,
            disableForReducedMotion: true,
          });
          confetti({
            particleCount: 70,
            angle: 120,
            spread: 60,
            origin: { x: 1, y: 0.4 },
            colors: CONFETTI_COLORS,
            disableForReducedMotion: true,
          });
        }, 350);
      }
    } else {
      playLossMotif();
      playWhoosh('down');
    }
  }, [promoted, reducedMotion]);

  const headline =
    scene.outcome === 'PROMOTED' ? (
      <>
        You advanced to <span className={styles.headlineAccent}>{toMeta.name}!</span>
      </>
    ) : scene.outcome === 'CHAMPION' ? (
      <>
        Diamond Tournament <span className={styles.headlineAccent}>Champion!</span>
      </>
    ) : scene.outcome === 'INACTIVE_DEMOTED' ? (
      <>
        No XP last week — back to{' '}
        <span className={styles.headlineAccent}>{toMeta.name}</span>
      </>
    ) : (
      <>
        You finished #{scene.rank ?? '—'} — down to{' '}
        <span className={styles.headlineAccent}>{toMeta.name}</span>
      </>
    );

  const subhead =
    scene.outcome === 'CHAMPION'
      ? `Top 3 of the tournament — with ${scene.totalXp.toLocaleString()} XP`
      : scene.outcome === 'INACTIVE_DEMOTED'
        ? 'Complete a lesson this week to climb back up'
        : `${scene.totalXp.toLocaleString()} XP earned${scene.rank ? ` · #${scene.rank} in ${fromMeta.name}` : ''}`;

  return (
    <SceneShell
      cta={{
        text: 'VIEW LEADERBOARD',
        onClick: onAdvance,
        variant: promoted ? 'blue' : 'ghost',
      }}
    >
      <motion.h1
        className={styles.headline}
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        {headline}
      </motion.h1>

      {/* The league shield that just came into play */}
      <motion.div
        initial={reducedMotion ? false : { scale: 0.4, opacity: 0, y: promoted ? -30 : 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 17, delay: 0.05 }}
        onAnimationComplete={() => {
          if (!reducedMotion) playSparkle();
        }}
      >
        <LeagueBadge tier={promoted ? scene.toTier : scene.fromTier} size="xl" />
      </motion.div>

      <p className={styles.subhead}>{subhead}</p>

      <CelebrationMascot pose={promoted ? 'cheer' : 'sad'} entrance="puff" />
    </SceneShell>
  );
}
