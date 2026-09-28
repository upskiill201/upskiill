'use client';

/**
 * Your locker — what you own, and what you're wearing.
 *
 * Without this, a learner who owns three frames could only ever wear the one
 * they bought most recently (the purchase scene equips it, and nothing else
 * ever un-equips it). Cosmetics are only worth buying if you can switch
 * between them, so ownership and the equip slots live together here.
 */

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Package } from 'lucide-react';
import ShopItemArt from '../shop-engine/ShopItemArt';
import { rarityStyle, SLOT_LABELS, type CosmeticSlot } from '@/lib/shop/cosmetics';
import { equipItem, fetchInventory, ShopError } from '@/lib/shop/api';
import type { ShopInventory, ShopItem } from '@/lib/shop/types';
import { playHaptic } from '@/lib/haptics';
import styles from './InventoryLocker.module.css';

const SLOT_ORDER: CosmeticSlot[] = ['FRAME', 'BACKGROUND', 'CELEBRATION_FX', 'XP_FX'];

export default function InventoryLocker({
  onError,
  refreshToken,
}: {
  onError?: (message: string) => void;
  /** Bump to re-read after a purchase. */
  refreshToken?: number;
}) {
  const [inventory, setInventory] = useState<ShopInventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  // Set only after the server confirms the swap (not optimistically on
  // click) — the chip's "snap into place" pop should follow the state
  // actually changing, not a request that might still fail. Equipping was
  // previously an instant, near-silent CSS border-fade with no haptic or
  // motion at all; the haptic on click stays optimistic (immediate tactile
  // response to the tap), the pop below is the confirmed reaction.
  const [justEquippedId, setJustEquippedId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const load = useCallback(async () => {
    try {
      setInventory(await fetchInventory());
    } catch {
      // The locker is secondary to the shop itself — a failure here hides the
      // section rather than blocking the page.
      setInventory(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, refreshToken]);

  const handleEquip = async (item: ShopItem, equipped: boolean) => {
    if (busyId) return;
    playHaptic('selection');
    setBusyId(item.id);
    try {
      await equipItem(item.id, equipped);
      await load();
      if (equipped) {
        setJustEquippedId(item.id);
        setTimeout(() => setJustEquippedId(null), 650);
      }
    } catch (e) {
      onError?.(e instanceof ShopError ? e.message : 'Could not change that.');
    } finally {
      setBusyId(null);
    }
  };

  if (loading || !inventory) return null;

  const cosmetics = inventory.items.filter((i) => i.slot !== null);
  const consumables = inventory.items.filter((i) => i.slot === null && i.quantity > 0);

  // Nothing owned yet — say so plainly rather than rendering an empty shell.
  if (cosmetics.length === 0 && consumables.length === 0) {
    return (
      <div className={styles.empty}>
        <Package size={26} strokeWidth={2} />
        <p>
          Your locker is empty. Buy your first item below and it&apos;ll show up here to equip.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.locker}>
      {SLOT_ORDER.map((slot) => {
        const owned = cosmetics.filter((i) => i.slot === slot);
        if (owned.length === 0) return null;
        const equippedId = inventory.loadout[slot];

        return (
          <div key={slot} className={styles.slotGroup}>
            <div className={styles.slotHead}>
              <h3 className={styles.slotName}>{SLOT_LABELS[slot]}</h3>
              <span className={styles.slotHint}>
                {equippedId ? 'Tap another to switch' : 'Nothing equipped'}
              </span>
            </div>

            <div className={styles.slotRow}>
              {owned.map((item) => {
                const isEquipped = item.id === equippedId;
                const tone = rarityStyle(item.rarity);
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    className={isEquipped ? styles.chipEquipped : styles.chip}
                    style={{ '--rarity': tone.color } as React.CSSProperties}
                    disabled={busyId === item.id}
                    onClick={() => void handleEquip(item, !isEquipped)}
                    aria-pressed={isEquipped}
                    animate={
                      justEquippedId === item.id && !reducedMotion
                        ? { scale: [1, 1.12, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <ShopItemArt
                      art={item.art}
                      category={item.category}
                      rarity={item.rarity}
                      size="sm"
                    />
                    <span className={styles.chipName}>{item.name}</span>
                    {isEquipped && (
                      <span className={styles.chipCheck}>
                        <Check size={12} strokeWidth={3.2} />
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}

      {consumables.length > 0 && (
        <div className={styles.slotGroup}>
          <div className={styles.slotHead}>
            <h3 className={styles.slotName}>Power-ups held</h3>
          </div>
          <div className={styles.slotRow}>
            {consumables.map((item) => (
              <div key={item.id} className={styles.consumable}>
                <ShopItemArt
                  art={item.art}
                  category={item.category}
                  rarity={item.rarity}
                  size="sm"
                />
                <span className={styles.chipName}>{item.name}</span>
                <span className={styles.qty}>×{item.quantity}</span>
              </div>
            ))}
            {/* Freezes live on the profile counter, not the item table — see
                the schema note on UserShopItem for why. */}
            <div className={styles.consumable}>
              <Image src="/art/items/freeze.svg" alt="" width={32} height={32} />
              <span className={styles.chipName}>Streak Freeze</span>
              <span className={styles.qty}>
                {inventory.streakFreezeBank} / {inventory.freezeCap}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
