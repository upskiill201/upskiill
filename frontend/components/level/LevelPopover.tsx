'use client';

/**
 * Level popover — same XP number as XpPopover, different angle: not "how
 * much have I earned" but "what does levelling up actually unlock". Pulls
 * the nearest still-locked level-gated item straight out of the shop
 * registry (via the already-prefetched catalog) instead of inventing
 * flavor text the backend has no concept of.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { prefetchCatalog } from '@/lib/shop/previewCache';
import type { ShopItem } from '@/lib/shop/types';
import ShopItemArt from '@/components/shop-engine/ShopItemArt';
import { playHaptic } from '@/lib/haptics';
import styles from './LevelPopover.module.css';

interface LevelPopoverProps {
  onClose?: () => void;
}

const XP_PER_LEVEL = 100;

export default function LevelPopover({ onClose }: LevelPopoverProps) {
  const router = useRouter();
  const { userLevel, xpInCurrentLevel } = useGamification();

  const [nextUnlock, setNextUnlock] = useState<ShopItem | null>(null);

  useEffect(() => {
    prefetchCatalog()
      .then((catalog) => {
        const allItems = catalog.categories.flatMap((c) => c.items);
        const levelLocked = allItems
          .filter((item) => !item.unlock.unlocked && item.unlock.label.startsWith('Reach level'))
          .sort((a, b) => a.unlock.target - b.unlock.target);
        setNextUnlock(levelLocked[0] ?? null);
      })
      .catch(() => {});
  }, []);

  const toNextLevel = Math.max(0, XP_PER_LEVEL - xpInCurrentLevel);
  const fillPct = Math.min(100, Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100));

  const goToShop = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHaptic('medium');
    if (onClose) onClose();
    router.push('/dashboard/shop');
  };

  return (
    <div
      className={styles.popoverCard}
      role="dialog"
      aria-label="Level Popover"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Hero Banner */}
      <div className={styles.heroHeader}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroTextGroup}>
            <h3 className={styles.heroTitle}>Level {userLevel}</h3>
            <p className={styles.heroSubtitle}>
              {toNextLevel} XP to Level {userLevel + 1}
            </p>
          </div>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${fillPct}%` }} />
        </div>
      </div>

      {/* Popover Content Cards */}
      <div className={styles.cardContent}>
        {nextUnlock && (
          <div className={styles.unlockCard}>
            <div className={styles.unlockArt}>
              <ShopItemArt
                art={nextUnlock.art}
                category={nextUnlock.category}
                rarity={nextUnlock.rarity}
                size="sm"
                locked
              />
            </div>
            <div className={styles.unlockText}>
              <h4 className={styles.unlockTitle}>{nextUnlock.name}</h4>
              <p className={styles.unlockSubtitle}>
                <Lock size={12} strokeWidth={2.6} />
                Unlocks at Level {nextUnlock.unlock.target}
              </p>
            </div>
          </div>
        )}

        {/* Bottom CTA Button */}
        <button type="button" className={styles.viewMoreBtn3D} onClick={goToShop}>
          VIEW SHOP
        </button>
      </div>
    </div>
  );
}
