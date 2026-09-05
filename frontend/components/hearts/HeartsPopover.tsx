'use client';

/**
 * Hearts popover — when the next heart actually arrives (a countdown that,
 * before this, existed server-side and was shown nowhere), whether a Perfect
 * Shield charge is standing by to protect the next one, and a one-tap refill
 * when you're out.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Shield } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { prefetchCatalog } from '@/lib/shop/previewCache';
import type { ShopItem } from '@/lib/shop/types';
import CountdownPill from '@/components/shop/CountdownPill';
import { playHaptic } from '@/lib/haptics';
import styles from './HeartsPopover.module.css';

interface HeartsPopoverProps {
  onClose?: () => void;
}

const REFILL_COST_COINS = 120;
const REFILL_COST_XP = 100;

export default function HeartsPopover({ onClose }: HeartsPopoverProps) {
  const router = useRouter();
  const { lives, maxLives, livesRefillAt, coins, xp, refillLivesWithXp } = useGamification();

  const [shield, setShield] = useState<ShopItem | null>(null);
  const [refilling, setRefilling] = useState(false);

  useEffect(() => {
    prefetchCatalog()
      .then((catalog) => {
        const allItems = catalog.categories.flatMap((c) => c.items);
        setShield(allItems.find((item) => item.id === 'PERFECT_SHIELD') ?? null);
      })
      .catch(() => {});
  }, []);

  const isFull = lives >= maxLives;
  const refillMs = !isFull && livesRefillAt ? new Date(livesRefillAt).getTime() - Date.now() : null;
  const canAfford = coins >= REFILL_COST_COINS || xp >= REFILL_COST_XP;
  const refillLabel = coins >= REFILL_COST_COINS ? `${REFILL_COST_COINS} COINS` : `${REFILL_COST_XP} XP`;

  const goToShop = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHaptic('medium');
    if (onClose) onClose();
    router.push('/dashboard/shop');
  };

  const handleRefill = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (refilling || !canAfford) return;
    playHaptic('medium');
    setRefilling(true);
    try {
      await refillLivesWithXp();
    } finally {
      setRefilling(false);
    }
  };

  return (
    <div
      className={styles.popoverCard}
      role="dialog"
      aria-label="Hearts Popover"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Hero Banner */}
      <div className={styles.heroHeader}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroTextGroup}>
            <h3 className={styles.heroTitle}>
              {lives}/{maxLives} Hearts
            </h3>
            <p className={styles.heroSubtitle}>
              {isFull
                ? 'Full hearts — keep your run going!'
                : 'Lose a heart on a wrong answer in Apply.'}
            </p>
          </div>

          <div className={styles.heartIconWrap}>
            <Image src="/Icons/heart.png" alt="Hearts" width={40} height={40} priority />
          </div>
        </div>

        {/* Mini Heart Row */}
        <div className={styles.miniHeartRow}>
          {Array.from({ length: maxLives }, (_, i) => (
            <div
              key={i}
              className={`${styles.miniHeartDot} ${
                i < lives ? styles.miniHeartFilled : styles.miniHeartEmpty
              }`}
            >
              <Image
                src="/Icons/heart.png"
                alt=""
                width={16}
                height={16}
                style={{ opacity: i < lives ? 1 : 0.35 }}
              />
            </div>
          ))}
        </div>

        {refillMs !== null && refillMs > 0 && (
          <div className={styles.refillCountdownRow}>
            <CountdownPill ms={refillMs} label="+1 heart in" />
          </div>
        )}
      </div>

      {/* Popover Content Cards */}
      <div className={styles.cardContent}>
        {shield && (
          <div className={styles.shieldCard}>
            <div className={styles.shieldLeft}>
              <div className={styles.shieldIconWrap}>
                {shield.unlock.unlocked ? (
                  <Shield size={20} className="text-[#E11D48]" />
                ) : (
                  <Lock size={20} color="#94A3B8" />
                )}
              </div>
              <div className={styles.shieldText}>
                <h4 className={styles.shieldTitle}>Perfect Shield</h4>
                <p className={styles.shieldSubtitle}>
                  {!shield.unlock.unlocked
                    ? shield.unlock.label
                    : shield.quantity > 0
                    ? `${shield.quantity} of ${shield.maxStorage ?? shield.quantity} charges ready`
                    : 'Equip one to protect your hearts'}
                </p>
              </div>
            </div>

            {shield.unlock.unlocked && (
              <button type="button" className={styles.viewListBtn} onClick={goToShop}>
                {shield.quantity > 0 ? 'VIEW' : 'EQUIP'}
              </button>
            )}
          </div>
        )}

        {/* Bottom CTA Button — only when there's a heart missing */}
        {!isFull && (
          <button
            type="button"
            className={styles.viewMoreBtn3D}
            disabled={!canAfford || refilling}
            onClick={(e) => void handleRefill(e)}
          >
            {refilling ? 'REFILLING…' : `REFILL — ${refillLabel}`}
          </button>
        )}
        {!isFull && !canAfford && (
          <p className={styles.affordHint}>Earn more Coins or XP to refill instantly.</p>
        )}
      </div>
    </div>
  );
}
