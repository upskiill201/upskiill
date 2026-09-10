'use client';

/**
 * ChestRevealScene — the paid Mystery Chest opening.
 *
 * The reward is already decided and persisted by the time this renders (the
 * server rolls it inside the purchase transaction), so the choreography here
 * is pure theatre over a settled result — skipping it can never change or
 * lose what was won.
 */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Gift } from 'lucide-react';
import SceneShell from '../../celebration/SceneShell';
import sceneStyles from '../../celebration/Scene.module.css';
import styles from '../ShopScene.module.css';
import ShopItemArt from '../ShopItemArt';
import CelebrationMascot from '../../celebration/CelebrationMascot';
import { TypewriterBubble } from '../../celebration/ScenePrimitives';
import { rarityStyle } from '@/lib/shop/cosmetics';
import type { ShopScene } from '@/context/ShopEngineContext';
import { playClaimArpeggio, playGemChime } from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';
import { pickChestRevealLine } from '@/lib/tey/chestVoice';

type Input = Extract<ShopScene, { kind: 'CHEST_REVEAL' }>;

type Beat = 'SHAKE' | 'OPEN';

export default function ChestRevealScene({
  scene,
  onAdvance,
}: {
  scene: Input;
  onAdvance: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const [beat, setBeat] = useState<Beat>(reducedMotion ? 'OPEN' : 'SHAKE');
  const tone = rarityStyle(scene.rarity);
  const [teyLine] = useState(() => pickChestRevealLine(scene.rarity));

  useEffect(() => {
    if (reducedMotion) return;
    playHaptic('light');
    const timer = setTimeout(() => {
      setBeat('OPEN');
      playClaimArpeggio();
      playHaptic('medium');
      playGemChime(0);
    }, 1100);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  const opened = beat === 'OPEN';

  return (
    <SceneShell
      cta={opened ? { text: 'COLLECT', onClick: onAdvance, variant: 'gold' } : null}
      onSkip={!opened ? () => setBeat('OPEN') : undefined}
      cornerBalance={{ currency: 'COINS', value: scene.coinsAfter }}
    >
      <h1 className={sceneStyles.headline}>{opened ? 'Look at that!' : 'Opening…'}</h1>

      <div className={styles.chestStage}>
        {opened && !reducedMotion && (
          <motion.div
            className={styles.chestBeam}
            initial={{ opacity: 0, scaleY: 0.4 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            aria-hidden
          />
        )}

        {!opened ? (
          <motion.div
            className={styles.chestBox}
            style={{ background: `linear-gradient(135deg, ${scene.accent}, #1F2A44)` }}
            animate={
              reducedMotion
                ? {}
                : { rotate: [0, -6, 6, -5, 5, 0], scale: [1, 1.04, 1, 1.04, 1] }
            }
            transition={{ duration: 1.05, ease: 'easeInOut' }}
          >
            <Gift className={styles.chestGlyph} strokeWidth={1.8} />
          </motion.div>
        ) : (
          <motion.div
            initial={reducedMotion ? false : { scale: 0.3, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={
              reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 15 }
            }
            style={{ display: 'grid', placeItems: 'center' }}
          >
            {scene.item ? (
              <ShopItemArt
                art={scene.item.art}
                category={scene.item.slot ?? 'POWER_UP'}
                rarity={scene.item.rarity}
                size="hero"
              />
            ) : (
              <Image
                src="/Icons/Coin.png"
                alt=""
                width={150}
                height={150}
                style={{ objectFit: 'contain' }}
                priority
              />
            )}
          </motion.div>
        )}
      </div>

      {opened && (
        <>
          {scene.item && (
            <>
              <div style={{ textAlign: 'center', color: tone.color }}>
                <span className={styles.rarityRibbon}>
                  <span className={styles.raritySparkle}>✦</span>
                  {tone.label}
                  <span className={styles.raritySparkle}>✦</span>
                </span>
              </div>
              <h2 className={styles.itemName}>{scene.item.name}</h2>
            </>
          )}

          <motion.div
            className={styles.rewardRow}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            {scene.coins > 0 && (
              <span className={styles.rewardChip}>
                <Image src="/Icons/Coin.png" alt="" width={22} height={22} />+
                {scene.coins.toLocaleString()}
              </span>
            )}
          </motion.div>

          {scene.substituted && (
            <p className={styles.substituteNote}>
              You already owned everything at this rarity, so the drop was paid out in coins
              instead — no duplicates, ever.
            </p>
          )}

          <CelebrationMascot pose="cheer" entrance="puff" />
          <TypewriterBubble text={teyLine} startDelay={300} />
        </>
      )}
    </SceneShell>
  );
}
