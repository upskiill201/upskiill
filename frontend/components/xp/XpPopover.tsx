'use client';

/**
 * XP popover — Duolingo's card: your XP with the bolt, the bar to the next
 * level, your Sage achievement tier and any running XP boost, and a way into
 * the level page. Level-focused "what unlocks next" lives in LevelPopover.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { prefetchAchievements, type AchievementPreview } from '@/lib/achievements/previewCache';
import { prefetchCatalog } from '@/lib/shop/previewCache';
import type { ShopCatalog } from '@/lib/shop/types';
import CountdownPill from '@/components/shop/CountdownPill';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { levelProgress } from '@/lib/level';
import styles from '../ui/StatPopover.module.css';

interface XpPopoverProps {
  onClose?: () => void;
}

const XP_BOOST_ITEM_IDS = ['XP_BOOST_15', 'XP_BOOST_2X'];

export default function XpPopover({ onClose }: XpPopoverProps) {
  const router = useRouter();
  const { xp } = useGamification();
  const { level, inLevel, target, toNext, percent } = levelProgress(xp);

  const [sage, setSage] = useState<AchievementPreview | null>(null);
  const [activeBoostMs, setActiveBoostMs] = useState<number | null>(null);

  useEffect(() => {
    prefetchAchievements()
      .then((list) => setSage(list.find((a) => a.id === 'sage') ?? null))
      .catch(() => {});

    prefetchCatalog()
      .then((catalog: ShopCatalog) => {
        const allItems = catalog.categories.flatMap((c) => c.items);
        const boost = allItems.find((item) => XP_BOOST_ITEM_IDS.includes(item.id) && item.activeUntil);
        if (boost?.activeUntil) {
          const ms = new Date(boost.activeUntil).getTime() - Date.now();
          if (ms > 0) setActiveBoostMs(ms);
        }
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
    <div className={styles.popoverCard} role="dialog" aria-label="Your XP" onClick={(e) => e.stopPropagation()}>
      <div className={styles.heroHeader}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroTextGroup}>
            <h3 className={styles.heroTitle}>{xp.toLocaleString()} XP</h3>
            <p className={styles.heroSubtitle}>
              {toNext} XP to Level {level + 1}
            </p>
          </div>
          <span className={styles.heroArt} aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG art */}
            <img src="/art/ui/xp-bolt.svg" alt="" />
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
        {sage && (
          <button type="button" className={styles.infoCard} onClick={(e) => go(e, '/dashboard/profile#achievements')}>
            <span className={styles.infoArt} aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element -- static SVG art */}
              <img src="/art/badges/sage.svg" alt="" />
            </span>
            <span className={styles.infoText}>
              <span className={styles.infoTitle}>Sage · Level {sage.currentTier}</span>
              <span className={styles.infoSub}>
                {sage.currentMetricVal.toLocaleString()} / {sage.nextTarget.toLocaleString()} XP to the next level
              </span>
            </span>
          </button>
        )}

        {activeBoostMs !== null && (
          <div className={styles.boostCard}>
            <span className={styles.boostLeft}>
              <Zap size={18} strokeWidth={2.5} fill="currentColor" aria-hidden />
              XP boost active
            </span>
            <CountdownPill ms={activeBoostMs} label="Ends in" />
          </div>
        )}

        <button type="button" className={styles.cta} onClick={(e) => go(e, '/dashboard/level')}>
          View progress
        </button>
      </div>
    </div>
  );
}
