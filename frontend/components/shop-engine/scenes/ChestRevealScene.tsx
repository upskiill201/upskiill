'use client';

/**
 * ChestRevealScene — the paid Mystery Chest opening, Duolingo-style: you open
 * it yourself.
 *
 * The chest (its tier's art) lands and bobs: "Tap to open!". Each tap knocks —
 * a louder, higher knock and a harder shake every time, the lid glowing more
 * — and the third tap bursts it open onto the reward.
 *
 * The reward is already decided and persisted by the time this renders (the
 * server rolls it inside the purchase transaction), so the taps are pure
 * theatre over a settled result: skipping can never change or lose it.
 */

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import SceneShell from '../../celebration/SceneShell';
import sceneStyles from '../../celebration/Scene.module.css';
import styles from '../ShopScene.module.css';
import ShopItemArt from '../ShopItemArt';
import CelebrationMascot from '../../celebration/CelebrationMascot';
import { TypewriterBubble } from '../../celebration/ScenePrimitives';
import { rarityStyle } from '@/lib/shop/cosmetics';
import type { ShopScene } from '@/context/ShopEngineContext';
import { playSound } from '@/lib/audio/lessonSounds';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { pickChestRevealLine } from '@/lib/tey/chestVoice';
import { fireConfetti } from '@/lib/confetti';

type Input = Extract<ShopScene, { kind: 'CHEST_REVEAL' }>;

const TAPS_TO_OPEN = 3;

/** chest-gold etc. from the scene, or read off the name for older callers. */
function chestArtFor(scene: Input): string {
  if (scene.chestArt) return scene.chestArt;
  const n = scene.chestName.toLowerCase();
  return n.includes('gold') ? 'chest-gold' : n.includes('silver') ? 'chest-silver' : 'chest-bronze';
}

export default function ChestRevealScene({
  scene,
  onAdvance,
}: {
  scene: Input;
  onAdvance: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const [taps, setTaps] = useState(0);
  const opened = taps >= TAPS_TO_OPEN;
  const tone = rarityStyle(scene.rarity);
  const [teyLine] = useState(() => pickChestRevealLine(scene.rarity));
  const chest = useAnimationControls();
  const landed = useRef(false);

  // The chest drops onto the stage.
  useEffect(() => {
    if (landed.current) return;
    landed.current = true;
    playSound('chestAppear', scene.rarity.toUpperCase() === 'COMMON' ? 0 : 1);
    playHaptic('light', false);
  }, [scene.rarity]);

  const open = () => {
    setTaps(TAPS_TO_OPEN);
    playSound('chestBurst', scene.rarity.toUpperCase() === 'COMMON' ? 0 : 1);
    celebrationHaptic('big');
    window.setTimeout(() => playSound('chestReward', scene.item ? 4 : 0), 380);
    if (!reducedMotion) fireConfetti({ particleCount: 110, spread: 90, origin: { y: 0.42 } });
  };

  const tap = () => {
    if (opened) return;
    const next = taps + 1;
    if (next >= TAPS_TO_OPEN || reducedMotion) return open();
    setTaps(next);
    playSound('chestTap', next);
    playHaptic(next === 1 ? 'light' : 'medium', false);
    // Harder every knock.
    const k = next * 4;
    void chest.start({
      rotate: [0, -k, k, -k * 0.6, 0],
      scale: [1, 1 + next * 0.05, 1],
      transition: { duration: 0.42, ease: 'easeOut' },
    });
  };

  return (
    <SceneShell
      cta={
        opened
          ? { text: 'COLLECT', onClick: () => { playSound('chestCollect'); onAdvance(); }, variant: 'gold' }
          : { text: 'TAP TO OPEN', onClick: tap, variant: 'gold' }
      }
      onSkip={!opened ? open : undefined}
      cornerBalance={{ currency: 'COINS', value: scene.coinsAfter }}
    >
      <h1 className={sceneStyles.headline}>{opened ? 'Look at that!' : scene.chestName}</h1>
      {!opened && (
        <p className={sceneStyles.subhead}>
          {taps === 0 ? 'Tap the chest to open it!' : taps === 1 ? 'Again!' : 'One more!'}
        </p>
      )}

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

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="chest"
              type="button"
              className={styles.chestTapTarget}
              onClick={tap}
              aria-label={`Tap to open the ${scene.chestName}`}
              initial={reducedMotion ? false : { y: -160, opacity: 0, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { scale: 1.3, opacity: 0, transition: { duration: 0.18 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 16 }}
            >
              <motion.div
                animate={reducedMotion || taps > 0 ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.div animate={chest}>
                  {/* The lid glows brighter with every knock. */}
                  <span
                    className={styles.chestGlow}
                    style={{ opacity: 0.15 + taps * 0.3 } as React.CSSProperties}
                    aria-hidden
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element -- static SVG art */}
                  <img src={`/art/items/${chestArtFor(scene)}.svg`} alt="" className={styles.chestArt} draggable={false} />
                </motion.div>
              </motion.div>
            </motion.button>
          ) : (
            <motion.div
              key="reward"
              initial={reducedMotion ? false : { scale: 0.3, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 15 }}
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
                <Image src="/Icons/Coin.png" alt="" width={150} height={150} style={{ objectFit: 'contain' }} priority />
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
              instead. No duplicates, ever.
            </p>
          )}

          <CelebrationMascot pose="cheer" entrance="puff" />
          <TypewriterBubble text={teyLine} startDelay={300} />
        </>
      )}
    </SceneShell>
  );
}
