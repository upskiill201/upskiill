'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Zap, Flame, Heart, Award } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { useRewardAnimation, RewardItem } from '@/context/RewardAnimationContext';
import { useHerald } from '@/context/HeraldContext';
import { playHaptic } from '@/lib/haptics';
import styles from './RewardRunTestWidget.module.css';

export default function RewardRunTestWidget() {
  const { refresh } = useGamification();
  const { triggerRewardAnimation, openClaimModal } = useRewardAnimation();
  const { openMissionsModal, openStreakModal, openChestModal, openSpinModal } = useHerald();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleOpenDuolingoClaim = (currency: 'COINS' | 'XP' | 'HEARTS', amount: number) => {
    playHaptic('medium');
    openClaimModal({
      title: `+${amount} ${currency === 'XP' ? 'GEMS' : currency}`,
      subtitle: 'Duolingo-Style Reward Claim',
      rewards: [{ currency, amount }],
      onClaim: async () => {
        const payload = currency === 'COINS' ? { coins: amount } : currency === 'XP' ? { xp: amount } : { hearts: amount };
        await fetch('/api/gamification/test-reward', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        }).catch(() => {});
        if (refresh) await refresh();
      },
    });
  };

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

      {/* DUOLINGO EXPERIENCE TEST BENCH */}
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: '2px dashed #E2E8F0', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: '#0172FD', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            ✨ DUOLINGO-STYLE GAMIFICATION MODALS
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: 6 }}>
            PREVIEW
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
          {/* Duolingo Claim +1 Coin (Single Item Pile) */}
          <button
            type="button"
            onClick={() => handleOpenDuolingoClaim('COINS', 1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 12px',
              backgroundColor: '#FEFCE8',
              border: '2px solid #FDE047',
              borderRadius: 12,
              color: '#B45309',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            <Image src="/Icons/Coin.png" alt="1 Coin" width={18} height={18} />
            <span>+1 Coin (Single)</span>
          </button>

          {/* Duolingo Claim +10 Gems (Full Pile) */}
          <button
            type="button"
            onClick={() => handleOpenDuolingoClaim('XP', 10)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 12px',
              backgroundColor: '#EFF6FF',
              border: '2px solid #BFDBFE',
              borderRadius: 12,
              color: '#0172FD',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            <Image src="/Icons/gem.png" alt="Gems" width={18} height={18} />
            <span>+10 Gems (Pile)</span>
          </button>

          {/* Duolingo Multi-Reward Queue (Sequential Steps) */}
          <button
            type="button"
            onClick={() => {
              playHaptic('medium');
              openClaimModal({
                title: 'Multi-Reward Unlock!',
                subtitle: 'Claim each reward one by one!',
                rewards: [
                  { currency: 'XP', amount: 20 },
                  { currency: 'COINS', amount: 15 },
                  { currency: 'HEARTS', amount: 1 },
                ],
                onClaim: async () => {
                  await fetch('/api/gamification/test-reward', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ xp: 20, coins: 15, hearts: 1 }),
                  }).catch(() => {});
                  if (refresh) await refresh();
                },
              });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 12px',
              backgroundColor: '#EFF6FF',
              border: '2px solid #93C5FD',
              borderRadius: 12,
              color: '#1D4ED8',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            <Sparkles size={16} />
            <span>Multi-Reward Flow</span>
          </button>

          {/* Duolingo Missions Modal */}
          <button
            type="button"
            onClick={() => { playHaptic('medium'); openMissionsModal(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 12px',
              backgroundColor: '#F0FDF4',
              border: '2px solid #86EFAC',
              borderRadius: 12,
              color: '#15803D',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            <Sparkles size={16} />
            <span>Daily Missions</span>
          </button>

          {/* Duolingo Streak Screen */}
          <button
            type="button"
            onClick={() => { playHaptic('medium'); openStreakModal(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 12px',
              backgroundColor: '#FFF7ED',
              border: '2px solid #FED7AA',
              borderRadius: 12,
              color: '#EA580C',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            <Flame size={16} />
            <span>Streak Screen</span>
          </button>

          {/* Duolingo Mystery Chest */}
          <button
            type="button"
            onClick={() => { playHaptic('medium'); openChestModal(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 12px',
              backgroundColor: '#FAF5FF',
              border: '2px solid #DDD6FE',
              borderRadius: 12,
              color: '#7E22CE',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            <Image src="/Tressure box.png" alt="Chest" width={18} height={18} />
            <span>Mystery Chest</span>
          </button>
        </div>
      </div>
    </div>
  );
}
