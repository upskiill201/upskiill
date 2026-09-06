'use client';

/**
 * LevelUpScene — full-screen level-up takeover: fanfare + confetti burst,
 * the level badge counts old → new, Tey cheers, bonus coins rain into view.
 */

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import SceneShell from '../SceneShell';
import CelebrationMascot from '../CelebrationMascot';
import { CountUpNumber, RewardPile, TypewriterBubble } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { CURRENCY_ICONS } from '../currency';
import { playLevelUpFanfare } from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';
import { pickLevelUpVoice } from '@/lib/tey/levelUpVoice';

type LevelUpSceneInput = Extract<CelebrationScene, { kind: 'LEVEL_UP' }>;

interface LevelUpSceneProps {
  scene: LevelUpSceneInput;
  onAdvance: () => void;
}

const CONFETTI_COLORS = ['#3D5AFE', '#6C8CFF', '#FFD54D', '#FFFFFF'];

export default function LevelUpScene({ scene, onAdvance }: LevelUpSceneProps) {
  const reducedMotion = useReducedMotion();
  const firedRef = useRef(false);

  // Lazy initializer, not an effect: picked once per scene instance so a
  // re-render never rerolls the headline/speech mid-reveal.
  const [voice] = useState(() => pickLevelUpVoice(scene.newLevel));

  // Badge number flips old → new once the badge has landed
  const [shownLevel, setShownLevel] = useState(reducedMotion ? scene.newLevel : scene.oldLevel);
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    playLevelUpFanfare();
    playHaptic('teyroCelebration');
    if (!reducedMotion && typeof window !== 'undefined') {
      confetti({
        particleCount: 140,
        spread: 100,
        startVelocity: 45,
        origin: { x: 0.5, y: 0.35 },
        colors: CONFETTI_COLORS,
        scalar: 1,
        disableForReducedMotion: true,
      });
      const side = setTimeout(() => {
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
      const flip = setTimeout(() => setShownLevel(scene.newLevel), 900);
      return () => {
        clearTimeout(side);
        clearTimeout(flip);
      };
    }
  }, [scene.newLevel, reducedMotion]);

  const pileCount = Math.max(3, Math.min(7, Math.ceil((scene.bonusCoins ?? 0) / 20)));

  return (
    <SceneShell
      cta={{ text: 'KEEP GOING', onClick: onAdvance, variant: 'blue' }}
      cornerBalance={
        typeof scene.bonusCoins === 'number'
          ? { currency: 'COINS', value: scene.bonusCoins }
          : null
      }
    >
      <h1 className={styles.headline}>{scene.teyLine ?? voice.headline}</h1>

      {/* Level badge — counts old → new */}
      <motion.div
        initial={reducedMotion ? false : { scale: 0.4, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 16 }}
      >
        <div className={styles.levelBadge}>
          <span className={styles.levelBadgeLabel}>LEVEL</span>
          <CountUpNumber value={shownLevel} duration={0.8} className={styles.levelBadgeValue} />
        </div>
      </motion.div>

      {/* Bonus coins rain down */}
      {typeof scene.bonusCoins === 'number' && scene.bonusCoins > 0 && (
        <>
          <RewardPile
            iconSrc={CURRENCY_ICONS.COINS}
            count={pileCount}
            startDelay={reducedMotion ? 0 : 1100}
            onItemLand={() => {
              if (!reducedMotion) playHaptic('light');
            }}
          />
          <div className={styles.balanceRow}>
            <Image src={CURRENCY_ICONS.COINS} alt="" width={34} height={34} style={{ objectFit: 'contain' }} />
            <span className={styles.subhead}>
              +{scene.bonusCoins.toLocaleString()} COINS BONUS
            </span>
          </div>
        </>
      )}

      <CelebrationMascot pose="cheer" entrance="puff" />
      <TypewriterBubble text={voice.speech} startDelay={typeof scene.bonusCoins === 'number' && scene.bonusCoins > 0 ? 1400 : 700} />
    </SceneShell>
  );
}
