'use client';

/**
 * AchievementScene — the Duolingo "achievement unlocked" moment.
 * Achievements are their own reward: there is no payout to claim here, only
 * recognition. The badge medallion pops in with a shine sweep over the tier
 * ladder while the unlock is marked seen so Herald stops surfacing it.
 */

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import SceneShell from '../SceneShell';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { BadgeGlyph } from '@/components/achievements/badgeArt';
import { markAchievementSeen } from '@/lib/achievements';
import { playClaimArpeggio } from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';

type AchievementSceneInput = Extract<CelebrationScene, { kind: 'ACHIEVEMENT' }>;

interface AchievementSceneProps {
  scene: AchievementSceneInput;
  onAdvance: () => void;
}

export default function AchievementScene({ scene, onAdvance }: AchievementSceneProps) {
  const reducedMotion = useReducedMotion();

  // ── Mark viewed + reveal sound ────────────────────────────────────────────
  useEffect(() => {
    markAchievementSeen(scene.badgeId, scene.tier).then((ok) => {
      if (ok) window.dispatchEvent(new CustomEvent('achievement:refresh'));
    });
    playClaimArpeggio();
    playHaptic('medium');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SceneShell
      cta={{ text: scene.ctaText ?? 'CONTINUE', onClick: onAdvance, variant: 'green' }}
    >
      <motion.h1
        className={styles.headline}
        initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        Achievement unlocked!
      </motion.h1>

      {/* Badge medallion */}
      <motion.div
        className={styles.achvStage}
        initial={reducedMotion ? false : { scale: 0.3, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 16 }}
      >
        <div
          className={styles.achvMedal}
          style={{
            background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35) 0%, transparent 42%), ${scene.badgeBg}`,
            boxShadow: `0 10px 0 0 rgba(0,0,0,0.22), 0 22px 48px rgba(0,0,0,0.45)`,
          }}
        >
          {scene.iconSrc ? (
            <Image src={scene.iconSrc} alt="" width={52} height={52} style={{ objectFit: 'contain' }} />
          ) : (
            <BadgeGlyph badgeId={scene.badgeId} size={44} />
          )}
          {/* Shine sweep */}
          {!reducedMotion && (
            <motion.div
              aria-hidden
              className={styles.achvShine}
              initial={{ x: '-140%' }}
              animate={{ x: '160%' }}
              transition={{ delay: 0.45, duration: 0.7, ease: 'easeInOut' }}
            />
          )}
        </div>

        {/* Tier ladder */}
        <div className={styles.achvTierRow} aria-label={`Tier ${scene.tier} of ${scene.maxTier}`}>
          {Array.from({ length: scene.maxTier }).map((_, i) => {
            const level = i + 1;
            const isDone = level <= scene.tier;
            const isCurrent = level === scene.tier;
            return (
              <motion.span
                key={level}
                className={[
                  styles.achvTierDot,
                  isDone ? styles.achvTierDotDone : '',
                  isCurrent ? styles.achvTierDotCurrent : '',
                ].join(' ')}
                style={isDone ? { backgroundColor: scene.badgeBg } : undefined}
                initial={reducedMotion ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: reducedMotion ? 0 : 0.5 + i * 0.09, type: 'spring', stiffness: 500, damping: 22 }}
              />
            );
          })}
        </div>
      </motion.div>

      <p className={styles.subhead}>
        <strong>{scene.badgeTitle}</strong>
        {scene.maxTier > 1 ? ` · Tier ${scene.tier} of ${scene.maxTier}` : ''}
        {' — '}
        {scene.tierDescription}
      </p>
    </SceneShell>
  );
}
