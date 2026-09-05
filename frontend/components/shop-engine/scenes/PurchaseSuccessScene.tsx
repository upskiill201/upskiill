'use client';

/**
 * PurchaseSuccessScene — the moment the coins become a thing you own.
 *
 * The spend is shown, not hidden: the balance counts DOWN from the old total
 * to the new one. A shop that quietly deducts feels like a leak; a shop that
 * shows the ledger feels like a trade, and a trade is what makes the next
 * batch of coins worth earning.
 */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import SceneShell from '../../celebration/SceneShell';
import sceneStyles from '../../celebration/Scene.module.css';
import styles from '../ShopScene.module.css';
import ShopItemArt from '../ShopItemArt';
import { CountUpNumber } from '../../celebration/ScenePrimitives';
import { rarityStyle, SLOT_LABELS, type CosmeticSlot } from '@/lib/shop/cosmetics';
import type { ShopScene } from '@/context/ShopEngineContext';
import { playClaimArpeggio, playGemChime } from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';

type Input = Extract<ShopScene, { kind: 'PURCHASE_SUCCESS' }>;

export default function PurchaseSuccessScene({
  scene,
  onAdvance,
}: {
  scene: Input;
  onAdvance: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const tone = rarityStyle(scene.rarity);
  const [equipping, setEquipping] = useState(false);
  const [equipped, setEquipped] = useState(false);
  // The count-down starts at the pre-purchase balance and settles on the new
  // one a beat later, so the spend is visible rather than instantaneous.
  const [balance, setBalance] = useState(scene.coinsBefore);

  useEffect(() => {
    playClaimArpeggio();
    playHaptic('medium');
    const timer = setTimeout(() => {
      setBalance(scene.coinsAfter);
      playGemChime(0);
    }, 620);
    return () => clearTimeout(timer);
  }, [scene.coinsAfter]);

  const handleEquip = async () => {
    if (!scene.onEquip || equipping || equipped) return;
    setEquipping(true);
    try {
      await scene.onEquip();
      setEquipped(true);
      playHaptic('light');
      // Give the "Equipped" state a beat to register before the scene closes.
      setTimeout(onAdvance, 550);
    } catch {
      // Equipping is optional here — the item is already owned, and the
      // profile can equip it later. Never trap the learner on a failure.
      onAdvance();
    } finally {
      setEquipping(false);
    }
  };

  const canEquip = Boolean(scene.slot && scene.onEquip);

  return (
    <SceneShell
      cta={
        canEquip
          ? {
              text: equipped ? 'EQUIPPED!' : equipping ? 'EQUIPPING…' : 'EQUIP NOW',
              onClick: handleEquip,
              variant: 'green',
              disabled: equipping || equipped,
            }
          : { text: 'CONTINUE', onClick: onAdvance, variant: 'green' }
      }
      secondaryCta={canEquip && !equipped ? { text: 'LATER', onClick: onAdvance } : undefined}
      cornerBalance={{ currency: 'COINS', value: balance }}
    >
      <motion.h1
        className={sceneStyles.headline}
        initial={reducedMotion ? false : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.36, ease: 'easeOut' }}
      >
        It&apos;s yours!
      </motion.h1>

      <div className={styles.pedestal}>
        {!reducedMotion && (
          <motion.span
            className={styles.pedestalGlow}
            style={{ '--glow': tone.glow } as React.CSSProperties}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.45 }}
          />
        )}
        <motion.div
          initial={reducedMotion ? false : { scale: 0.35, opacity: 0, y: -30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={
            reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 15 }
          }
        >
          <ShopItemArt
            art={scene.art}
            category={scene.slot ?? 'POWER_UP'}
            rarity={scene.rarity}
            size="hero"
          />
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

      <h2 className={styles.itemName}>{scene.itemName}</h2>
      <p className={styles.itemDesc}>{scene.message}</p>
      {scene.slot && (
        <p className={styles.slotHint}>
          {SLOT_LABELS[scene.slot as CosmeticSlot] ?? 'Cosmetic'} · one equipped at a time
        </p>
      )}

      <motion.div
        className={styles.ledger}
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35 }}
      >
        <div className={styles.ledgerRow}>
          <span className={styles.ledgerLabel}>Spent</span>
          <span className={`${styles.ledgerValue} ${styles.ledgerSpend}`}>
            <Image src="/Icons/Coin.png" alt="" width={18} height={18} />−
            {scene.price.toLocaleString()}
          </span>
        </div>
        <div className={styles.ledgerDivider} aria-hidden />
        <div className={styles.ledgerRow}>
          <span className={styles.ledgerLabel}>Balance</span>
          <span className={styles.ledgerValue}>
            <Image src="/Icons/Coin.png" alt="" width={18} height={18} />
            <CountUpNumber value={balance} from={scene.coinsBefore} duration={0.6} />
          </span>
        </div>
      </motion.div>
    </SceneShell>
  );
}
