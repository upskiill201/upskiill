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
import { playSound } from '@/lib/audio/lessonSounds';
import { confettiColors } from '../confetti';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { pickLevelUpVoice } from '@/lib/tey/levelUpVoice';

type LevelUpSceneInput = Extract<CelebrationScene, { kind: 'LEVEL_UP' }>;

interface LevelUpSceneProps {
  scene: LevelUpSceneInput;
  onAdvance: () => void;
}

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
    playSound('levelUp');
    celebrationHaptic('big');
    if (!reducedMotion && typeof window !== 'undefined') {
      confetti({
        particleCount: 140,
        spread: 100,
        startVelocity: 45,
        origin: { x: 0.5, y: 0.35 },
        colors: confettiColors('brand'),
        scalar: 1,
        disableForReducedMotion: true,
      });
      // Fire-and-forget: the once-only guard above means a cleanup here would
      // cancel this under React's dev double-invoke and never re-arm it.
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.4 },
          colors: confettiColors('brand'),
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.4 },
          colors: confettiColors('brand'),
          disableForReducedMotion: true,
        });
      }, 350);
    }
  }, [scene.newLevel, reducedMotion]);

  // Badge number flips old → new once the badge has landed.
  useEffect(() => {
    if (reducedMotion) return;
    const flip = setTimeout(() => {
      setShownLevel(scene.newLevel);
      playSound('statTick', 3);
      playHaptic('rigid', false);
    }, 900);
    return () => clearTimeout(flip);
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
              if (!reducedMotion) playHaptic('selection', false);
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
