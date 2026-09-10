'use client';

/**
 * ItemUnlockedScene — "you just earned the right to buy this".
 *
 * This is the scene that makes the economy a loop rather than a menu. It fires
 * the moment a learning requirement is met, anywhere in the app, and it always
 * shows the price: the point is not "well done", it is "here is the thing you
 * wanted, and here is what it costs" — which sends the learner back to
 * learning with a target.
 */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import SceneShell from '../../celebration/SceneShell';
import sceneStyles from '../../celebration/Scene.module.css';
import styles from '../ShopScene.module.css';
import ShopItemArt from '../ShopItemArt';
import CelebrationMascot from '../../celebration/CelebrationMascot';
import { TypewriterBubble } from '../../celebration/ScenePrimitives';
import { rarityStyle, SLOT_LABELS } from '@/lib/shop/cosmetics';
import type { ShopScene } from '@/context/ShopEngineContext';
import { playClaimArpeggio } from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';
import { pickUnlockLine } from '@/lib/tey/shopEngineVoice';

type Input = Extract<ShopScene, { kind: 'ITEM_UNLOCKED' }>;

export default function ItemUnlockedScene({
  scene,
  onAdvance,
}: {
  scene: Input;
  onAdvance: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const { item } = scene;
  const tone = rarityStyle(item.rarity);
  const [teyLine] = useState(() => pickUnlockLine());

  useEffect(() => {
    playClaimArpeggio();
    playHaptic('medium');
  }, []);

  const canBuyNow = item.affordable && !item.soldOut && Boolean(scene.onBuy);

  return (
    <SceneShell
      cta={{
        text: canBuyNow ? `BUY FOR ${item.price.toLocaleString()}` : 'VIEW IN SHOP',
        onClick: () => {
          if (canBuyNow) scene.onBuy?.(item);
          onAdvance();
        },
        variant: canBuyNow ? 'green' : 'blue',
      }}
      secondaryCta={{ text: 'MAYBE LATER', onClick: onAdvance }}
    >
      <motion.h1
        className={sceneStyles.headline}
        initial={reducedMotion ? false : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
      >
        New in your shop!
      </motion.h1>

      <div className={styles.pedestal}>
        {!reducedMotion && (
          <motion.span
            className={styles.pedestalGlow}
            style={{ '--glow': tone.glow } as React.CSSProperties}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
          />
        )}
        <motion.div
          initial={reducedMotion ? false : { scale: 0.3, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={
            reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 16 }
          }
        >
          <ShopItemArt art={item.art} category={item.category} rarity={item.rarity} size="hero" />
        </motion.div>
        <div className={styles.pedestalShadow} aria-hidden />
      </div>

      <div style={{ textAlign: 'center', color: tone.color }}>
        <span className={styles.rarityRibbon}>
          <span className={styles.raritySparkle}>✦</span>
          {tone.label}
          <span className={styles.raritySparkle}>✦</span>
        </span>
      </div>

      <h2 className={styles.itemName}>{item.name}</h2>
      <p className={styles.itemDesc}>{item.description}</p>
      {item.slot && (
        <p className={styles.slotHint}>{SLOT_LABELS[item.slot]} · equip from your profile</p>
      )}

      {/* What they actually did to earn it — the receipt matters more than the
          congratulation, because it tells them how the next one works. */}
      <motion.div
        className={styles.receipt}
        initial={reducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.35 }}
      >
        <Check className={styles.receiptIcon} strokeWidth={3} />
        <span className={styles.receiptText}>{item.unlock.label}</span>
      </motion.div>

      <motion.div
        className={styles.priceRow}
        initial={reducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.35 }}
      >
        {item.discountPercent > 0 && (
          <span className={styles.priceStruck}>{item.basePrice.toLocaleString()}</span>
        )}
        <span className={styles.priceTag}>
          <Image src="/Icons/Coin.png" alt="" width={22} height={22} />
          {item.price.toLocaleString()}
        </span>
        {item.discountPercent > 0 && (
          <span className={styles.discountChip}>-{item.discountPercent}%</span>
        )}
      </motion.div>

      {!item.affordable && (
        <p className={styles.substituteNote}>
          You&apos;re {item.coinsShort.toLocaleString()} coins away. Finish a few more lessons and
          it&apos;s yours.
        </p>
      )}

      <CelebrationMascot pose="cheer" entrance="puff" />
      <TypewriterBubble text={teyLine} startDelay={700} />
    </SceneShell>
  );
}
