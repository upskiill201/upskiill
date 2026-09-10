'use client';

/**
 * XP popover — how much you've earned, and the two places that XP actually
 * pays off next: your Sage achievement tier, and a live XP boost if one's
 * running. Level-focused "what unlocks next" content lives in LevelPopover
 * instead, so the two don't just repeat the same number back at you.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Zap } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { prefetchAchievements, type AchievementPreview } from '@/lib/achievements/previewCache';
import { prefetchCatalog } from '@/lib/shop/previewCache';
import type { ShopCatalog } from '@/lib/shop/types';
import CountdownPill from '@/components/shop/CountdownPill';
import { playHaptic } from '@/lib/haptics';
import styles from './XpPopover.module.css';

interface XpPopoverProps {
  onClose?: () => void;
}

const XP_PER_LEVEL = 100;
const XP_BOOST_ITEM_IDS = ['XP_BOOST_15', 'XP_BOOST_2X'];

export default function XpPopover({ onClose }: XpPopoverProps) {
  const router = useRouter();
  const { xp, xpInCurrentLevel, userLevel } = useGamification();

  const [sage, setSage] = useState<AchievementPreview | null>(null);
  const [activeBoostMs, setActiveBoostMs] = useState<number | null>(null);

  useEffect(() => {
    prefetchAchievements()
      .then((list) => setSage(list.find((a) => a.id === 'sage') ?? null))
      .catch(() => {});

    prefetchCatalog()
      .then((catalog: ShopCatalog) => {
        const allItems = catalog.categories.flatMap((c) => c.items);
        const boost = allItems.find(
          (item) => XP_BOOST_ITEM_IDS.includes(item.id) && item.activeUntil,
        );
        if (boost?.activeUntil) {
          const ms = new Date(boost.activeUntil).getTime() - Date.now();
          if (ms > 0) setActiveBoostMs(ms);
        }
      })
      .catch(() => {});
  }, []);

  const toNextLevel = Math.max(0, XP_PER_LEVEL - xpInCurrentLevel);
  const fillPct = Math.min(100, Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100));

  const goToAchievements = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHaptic('medium');
    if (onClose) onClose();
    router.push('/dashboard/profile#achievements');
  };

  return (
    <div
      className={styles.popoverCard}
      role="dialog"
      aria-label="XP Popover"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Hero Banner */}
      <div className={styles.heroHeader}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroTextGroup}>
            <h3 className={styles.heroTitle}>{xp.toLocaleString()} XP</h3>
            <p className={styles.heroSubtitle}>
              {toNextLevel} XP to Level {userLevel + 1}
            </p>
          </div>

          <div className={styles.gemIconWrap}>
            <Sparkles size={24} color="#FFFFFF" />
          </div>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${fillPct}%` }} />
        </div>
      </div>

      {/* Popover Content Cards */}
      <div className={styles.cardContent}>
        {sage && (
          <div className={styles.sageCard}>
            <div className={styles.sageIconWrap}>
              <Sparkles size={20} className="text-[#0172FD]" />
            </div>
            <div className={styles.sageText}>
              <h4 className={styles.sageTitle}>Sage · Tier {sage.currentTier}</h4>
              <p className={styles.sageSubtitle}>
                {sage.currentMetricVal.toLocaleString()}/{sage.nextTarget.toLocaleString()} XP
                toward {sage.nextDescription}
              </p>
            </div>
          </div>
        )}

        {activeBoostMs !== null && (
          <div className={styles.boostCard}>
            <div className={styles.boostLeft}>
              <Zap size={18} color="#FFFFFF" fill="#FFFFFF" />
              <span className={styles.boostLabel}>2× XP boost active</span>
            </div>
            <CountdownPill ms={activeBoostMs} label="Ends in" />
          </div>
        )}

        {/* Bottom CTA Button */}
        <button type="button" className={styles.viewMoreBtn3D} onClick={goToAchievements}>
          VIEW ACHIEVEMENTS
        </button>
      </div>
    </div>
  );
}
