'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Zap, Flame, Heart, Award } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { useRewardAnimation, RewardItem } from '@/context/RewardAnimationContext';
import { playHaptic } from '@/lib/haptics';
import styles from './RewardRunTestWidget.module.css';

export default function RewardRunTestWidget() {
  const { refresh } = useGamification();
  const { triggerRewardAnimation } = useRewardAnimation();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleTriggerReward = async (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string,
    rewards: RewardItem[],
    payload: { coins?: number; xp?: number; hearts?: number; streak?: number }
  ) => {
    e.preventDefault();
    playHaptic('medium');
    setIsProcessing(key);

    const buttonElement = e.currentTarget;

    // 1. Immediately fire RewardRun flight animation originating from the clicked test button
    triggerRewardAnimation({
      originElement: buttonElement,
      rewards,
    });

    try {
      // 2. Persist reward to real PostgreSQL database via API
      const res = await fetch('/api/gamification/test-reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        playHaptic('success');
      }
    } catch (err) {
      console.error('Test reward error:', err);
    } finally {
      // 3. Trigger context refresh so top navbar balance syncs perfectly
      if (refresh) await refresh();
      setIsProcessing(null);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={styles.badgeIcon}>
            <Zap size={18} className="text-[#0172FD]" />
          </div>
          <div>
            <h3 className={styles.title}>REWARDRUN LAB & TEST BENCH</h3>
            <p className={styles.subtitle}>
              Test flight physics, trajectory curves & counter synchronization in real time.
            </p>
          </div>
        </div>
        <span className={styles.testBadge}>PROTOTYPE BENCH</span>
      </div>

      <div className={styles.actionsGrid}>
        {/* Button 1: Coins +10 */}
        <button
          type="button"
          disabled={!!isProcessing}
          onClick={(e) =>
            handleTriggerReward(e, 'coins-10', [{ currency: 'COINS', amount: 10 }], { coins: 10 })
          }
          className={`${styles.testBtn} ${styles.btnCoin}`}
        >
          <Image src="/Icons/Coin.png" alt="Coin" width={22} height={22} />
          <span>+10 Coins</span>
        </button>

        {/* Button 2: Coins +50 */}
        <button
          type="button"
          disabled={!!isProcessing}
          onClick={(e) =>
            handleTriggerReward(e, 'coins-50', [{ currency: 'COINS', amount: 50 }], { coins: 50 })
          }
          className={`${styles.testBtn} ${styles.btnCoin}`}
        >
          <Image src="/Icons/Coin.png" alt="Coin" width={22} height={22} />
          <span>+50 Coins</span>
        </button>

        {/* Button 3: XP +20 */}
        <button
          type="button"
          disabled={!!isProcessing}
          onClick={(e) =>
            handleTriggerReward(e, 'xp-20', [{ currency: 'XP', amount: 20 }], { xp: 20 })
          }
          className={`${styles.testBtn} ${styles.btnXp}`}
        >
          <Image src="/Icons/gem.png" alt="XP" width={22} height={22} />
          <span>+20 XP</span>
        </button>

        {/* Button 4: XP +150 (Level Threshold) */}
        <button
          type="button"
          disabled={!!isProcessing}
          onClick={(e) =>
            handleTriggerReward(e, 'xp-150', [{ currency: 'XP', amount: 150 }], { xp: 150 })
          }
          className={`${styles.testBtn} ${styles.btnXp}`}
        >
          <Award size={20} className="text-[#0172FD]" />
          <span>+150 XP (Level Up)</span>
        </button>

        {/* Button 5: Heart +1 */}
        <button
          type="button"
          disabled={!!isProcessing}
          onClick={(e) =>
            handleTriggerReward(e, 'heart-1', [{ currency: 'HEARTS', amount: 1 }], { hearts: 1 })
          }
          className={`${styles.testBtn} ${styles.btnHeart}`}
        >
          <Image src="/Icons/heart.png" alt="Heart" width={22} height={22} />
          <span>+1 Heart</span>
        </button>

        {/* Button 6: Streak +1 */}
        <button
          type="button"
          disabled={!!isProcessing}
          onClick={(e) =>
            handleTriggerReward(e, 'streak-1', [{ currency: 'STREAK', amount: 1 }], { streak: 1 })
          }
          className={`${styles.testBtn} ${styles.btnStreak}`}
        >
          <Image src="/Icons/burn.png" alt="Streak" width={22} height={22} />
          <span>+1 Streak</span>
        </button>
      </div>

      {/* Mega Combo Action */}
      <div className={styles.comboRow}>
        <button
          type="button"
          disabled={!!isProcessing}
          onClick={(e) =>
            handleTriggerReward(
              e,
              'combo-mega',
              [
                { currency: 'COINS', amount: 30 },
                { currency: 'XP', amount: 50 },
                { currency: 'HEARTS', amount: 1 },
              ],
              { coins: 30, xp: 50, hearts: 1 }
            )
          }
          className={styles.comboBtn}
        >
          <Sparkles size={20} />
          <span>Claim Mega Combo: +30 Coins, +50 XP & +1 Heart 🎉</span>
        </button>
      </div>
    </div>
  );
}
