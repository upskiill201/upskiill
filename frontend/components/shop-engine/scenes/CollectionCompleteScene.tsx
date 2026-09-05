'use client';

/**
 * CollectionCompleteScene — the top of the ladder.
 *
 * The reward item here cannot be bought at any price, which is the entire
 * point: it proves the wearer finished a set rather than spent a balance. The
 * scene leads with that fact.
 */

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Lock } from 'lucide-react';
import SceneShell from '../../celebration/SceneShell';
import sceneStyles from '../../celebration/Scene.module.css';
import styles from '../ShopScene.module.css';
import ShopItemArt from '../ShopItemArt';
import { rarityStyle } from '@/lib/shop/cosmetics';
import type { ShopScene } from '@/context/ShopEngineContext';
import { playClaimArpeggio, playGemChime } from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';

type Input = Extract<ShopScene, { kind: 'COLLECTION_COMPLETE' }>;

export default function CollectionCompleteScene({
  scene,
  onAdvance,
}: {
  scene: Input;
  onAdvance: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const tone = rarityStyle(scene.rewardItem?.rarity ?? 'LEGENDARY');

  useEffect(() => {
    playClaimArpeggio();
    playHaptic('heavy');
    const timer = setTimeout(() => playGemChime(0), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SceneShell
      cta={{ text: 'CONTINUE', onClick: onAdvance, variant: 'gold' }}
      cornerBalance={{ currency: 'COINS', value: scene.coinsAfter }}
    >
      <motion.h1
        className={sceneStyles.headline}
        initial={reducedMotion ? false : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
      >
        Collection complete!
      </motion.h1>

      <p className={sceneStyles.subhead}>
        You finished the <strong>{scene.collectionName}</strong>.
      </p>

      <div className={styles.collectionStrip} style={{ color: scene.accent }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.span
            key={i}
            className={`${styles.collectionDot} ${styles.collectionDotFilled}`}
            initial={reducedMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: reducedMotion ? 0 : 0.25 + i * 0.1,
              type: 'spring',
              stiffness: 500,
              damping: 20,
            }}
          />
        ))}
      </div>

      {scene.rewardItem && (
        <>
          <div className={styles.pedestal}>
            {!reducedMotion && (
              <motion.span
                className={styles.pedestalGlow}
                style={{ '--glow': tone.glow } as React.CSSProperties}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            )}
            <motion.div
              initial={reducedMotion ? false : { scale: 0.3, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { delay: 0.35, type: 'spring', stiffness: 280, damping: 15 }
              }
            >
              <ShopItemArt
                art={scene.rewardItem.art}
                category="FRAME"
                rarity={scene.rewardItem.rarity}
                size="hero"
              />
            </motion.div>
            <div className={styles.pedestalShadow} aria-hidden />
          </div>

          <div style={{ textAlign: 'center' }}>
            <span className={styles.exclusiveTag}>
              <Lock size={13} strokeWidth={2.6} />
              Cannot be bought
            </span>
          </div>

          <h2 className={styles.itemName}>{scene.rewardItem.name}</h2>
        </>
      )}

      <motion.div
        className={styles.rewardRow}
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.35 }}
      >
        <span className={styles.rewardChip}>
          <Image src="/Icons/Coin.png" alt="" width={22} height={22} />+
          {scene.rewardCoins.toLocaleString()}
        </span>
      </motion.div>
    </SceneShell>
  );
}
