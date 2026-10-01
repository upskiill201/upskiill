'use client';

/**
 * Level popover — Duolingo's card: your level on the hexagon, the bar to the
 * next one, and the nearest level-gated shop reward (straight from the
 * prefetched catalogue, never invented), with a way into the level page.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { prefetchCatalog } from '@/lib/shop/previewCache';
import type { ShopItem } from '@/lib/shop/types';
import ShopItemArt from '@/components/shop-engine/ShopItemArt';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { levelProgress } from '@/lib/level';
import styles from '../ui/StatPopover.module.css';

interface LevelPopoverProps {
  onClose?: () => void;
}

export default function LevelPopover({ onClose }: LevelPopoverProps) {
  const router = useRouter();
  const { xp } = useGamification();
  const { level, inLevel, target, toNext, percent } = levelProgress(xp);
  const [nextUnlock, setNextUnlock] = useState<ShopItem | null>(null);

  useEffect(() => {
    prefetchCatalog()
      .then((catalog) => {
        const levelLocked = catalog.categories
          .flatMap((c) => c.items)
          .filter((item) => !item.unlock.unlocked && item.unlock.label.startsWith('Reach level'))
          .sort((a, b) => a.unlock.target - b.unlock.target);
        setNextUnlock(levelLocked[0] ?? null);
      })
      .catch(() => {});
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.stopPropagation();
    playHaptic('light', false);
    playSound('navTap', 4);
    onClose?.();
    router.push(href);
  };

  return (
    <div
      className={`${styles.popoverCard} ${styles.level}`}
      role="dialog"
      aria-label="Your level"
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.heroHeader}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroTextGroup}>
            <h3 className={styles.heroTitle}>Level {level}</h3>
            <p className={styles.heroSubtitle}>
              {toNext} XP to Level {level + 1}
            </p>
          </div>
          <span className={styles.heroArt} aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG art */}
            <img src="/art/ui/level-hex.svg" alt="" />
            <span className={styles.heroArtNum}>{level}</span>
          </span>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${Math.max(6, percent)}%` }} />
          <span className={styles.progressLabel}>
            {inLevel} / {target} XP
          </span>
        </div>
      </div>

      <div className={styles.cardContent}>
        {nextUnlock && (
          <button type="button" className={styles.infoCard} onClick={(e) => go(e, '/dashboard/shop')}>
            <span className={styles.infoArt}>
              <ShopItemArt art={nextUnlock.art} category={nextUnlock.category} rarity={nextUnlock.rarity} size="sm" locked />
            </span>
            <span className={styles.infoText}>
              <span className={styles.infoTitle}>{nextUnlock.name}</span>
              <span className={styles.infoSub}>
                <Lock size={12} strokeWidth={2.75} aria-hidden />
                Unlocks at Level {nextUnlock.unlock.target}
              </span>
            </span>
          </button>
        )}

        <button type="button" className={styles.cta} onClick={(e) => go(e, '/dashboard/level')}>
          View progress
        </button>
      </div>
    </div>
  );
}
