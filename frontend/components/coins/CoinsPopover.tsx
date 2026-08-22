'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Zap, ShoppingBag, Snowflake } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { playHaptic } from '@/lib/haptics';
import styles from './CoinsPopover.module.css';

interface CoinsPopoverProps {
  onClose?: () => void;
}

export default function CoinsPopover({ onClose }: CoinsPopoverProps) {
  const router = useRouter();
  const { coins } = useGamification();

  const handleGoToShop = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHaptic('medium');
    if (onClose) onClose();
    router.push('/dashboard/shop');
  };

  return (
    <div className={styles.popoverCard} role="dialog" aria-label="Coins Popover">
      {/* Top Hero Header (Golden/Amber Banner) */}
      <div className={styles.heroHeader}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroTextGroup}>
            <h3 className={styles.heroTitle}>{coins} Coins</h3>
            <p className={styles.heroSubtitle}>
              Spend your coins in the Shop to protect your streak & unlock boosts!
            </p>
          </div>

          <div className={styles.coinIconWrap}>
            <Image
              src="/Icons/Coin.png"
              alt="Coins"
              width={48}
              height={48}
              className={styles.coinImg}
              priority
            />
          </div>
        </div>
      </div>

      {/* Popover Content Cards (Featured Shop Items) */}
      <div className={styles.cardContent}>
        {/* Shop Item 1: Streak Freeze */}
        <div className={styles.shopItemCard} onClick={handleGoToShop}>
          <div className={styles.itemIconWrap} style={{ background: '#E0F2FE' }}>
            <Snowflake size={22} color="#0284C7" />
          </div>
          <div className={styles.itemText}>
            <div className={styles.itemHeaderRow}>
              <h4 className={styles.itemTitle}>Streak Freeze</h4>
              <span className={styles.unlockedBadge}>UNLOCKED</span>
            </div>
            <p className={styles.itemSubtitle}>
              Protects your streak if you miss a full day of activity.
            </p>
          </div>
        </div>

        {/* Shop Item 2: XP Boost */}
        <div className={styles.shopItemCard} onClick={handleGoToShop}>
          <div className={styles.itemIconWrap} style={{ background: '#FEF3C7' }}>
            <Zap size={22} color="#D97706" />
          </div>
          <div className={styles.itemText}>
            <div className={styles.itemHeaderRow}>
              <h4 className={styles.itemTitle}>2x XP Boost</h4>
              <span className={styles.unlockedBadge}>UNLOCKED</span>
            </div>
            <p className={styles.itemSubtitle}>
              Earn double XP points on all completed lessons today.
            </p>
          </div>
        </div>
      </div>

      {/* Popover Action Button (Go to Shop) */}
      <div className={styles.footerRow}>
        <button
          type="button"
          onClick={handleGoToShop}
          className={styles.actionBtn3D}
        >
          <ShoppingBag size={18} />
          <span>VISIT SHOP</span>
        </button>
      </div>
    </div>
  );
}
