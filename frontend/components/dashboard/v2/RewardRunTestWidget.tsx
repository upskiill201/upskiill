'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Zap, Flame, Heart, Award } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { useRewardAnimation, RewardItem } from '@/context/RewardAnimationContext';
import { useHerald } from '@/context/HeraldContext';
import { useCelebration } from '@/context/CelebrationContext';
import { playHaptic } from '@/lib/haptics';
import styles from './RewardRunTestWidget.module.css';

export default function RewardRunTestWidget() {
  const { refresh } = useGamification();
  const { triggerRewardAnimation, openClaimModal } = useRewardAnimation();
  const { openStreakModal, openSpinModal } = useHerald();
  const { celebrate } = useCelebration();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Dev-only test bench — never ship the fake-reward triggers to real users
  // (it posts to /api/gamification/test-reward against the live backend).
  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'development') return null;

  const handleOpenDuolingoClaim = (currency: 'COINS' | 'XP' | 'HEARTS', amount: number) => {
    playHaptic('medium');
    openClaimModal({
      title: `+${amount} ${currency === 'XP' ? 'XP' : currency}`,
      subtitle: 'Celebration Engine Reward Claim',
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

  if (!isExpanded) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          style={{
            background: 'none',
            border: '1px dashed #CBD5E1',
            borderRadius: '8px',
            padding: '3px 8px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#94A3B8',
            cursor: 'pointer',
          }}
        >
          ⚡ Dev Test Bench (Click to expand)
        </button>
      </div>
    );
  }

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

          {/* Daily Missions — QUEST → CLAIM chain (same as the mission card) */}
          <button
            type="button"
            onClick={() => {
              playHaptic('medium');
              celebrate([
                {
                  kind: 'QUEST',
                  headline: 'Mission complete!',
                  subhead: 'Daily Mission: "Complete 1 lesson"',
                  ctaText: 'CLAIM',
                  rows: [
                    {
                      id: 'm1',
                      label: 'Complete 1 lesson',
                      current: 1,
                      target: 1,
                      highlight: true,
                      reward: { currency: 'XP', amount: 20 },
                    },
                    { id: 'm2', label: 'Earn 20 XP', current: 10, target: 20, reward: { currency: 'COINS', amount: 10 } },
                    { id: 'm3', label: 'Stay on your streak', current: 1, target: 1, reward: { currency: 'COINS', amount: 5 } },
                  ],
                },
                {
                  kind: 'CLAIM',
                  title: '+20 XP',
                  subtitle: 'Daily Mission: "Complete 1 lesson" Completed!',
                  rewards: [{ currency: 'XP', amount: 20 }],
                },
              ]);
            }}
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

          {/* Celebration Engine Chest Scene (real server-first open) */}
          <button
            type="button"
            onClick={() => { playHaptic('medium'); celebrate({ kind: 'CHEST' }); }}
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
            <Image src="/Tressure box.webp" alt="Chest" width={18} height={18} />
            <span>Mystery Chest</span>
          </button>
        </div>
      </div>

      {/* CELEBRATION ENGINE SCENE BENCH */}
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: '2px dashed #E2E8F0', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: '#7C3AED', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            🎉 Celebration Engine Scenes
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: 6 }}>
            FULL-PAGE
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
          {/* Streak EXTENDED */}
          <button
            type="button"
            onClick={() => {
              playHaptic('medium');
              celebrate({
                kind: 'STREAK',
                mode: 'EXTENDED',
                days: 5,
                previousDays: 4,
                weekDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, idx) => ({
                  label,
                  completed: idx <= 4,
                  isToday: idx === 4,
                })),
                speech: '5 days in a row! Come back tomorrow to keep the fire alive.',
              });
            }}
            style={sceneBtnStyle('#FFF7ED', '#FED7AA', '#EA580C')}
          >
            <Flame size={16} />
            <span>Streak Extended</span>
          </button>

          {/* Streak SAVED */}
          <button
            type="button"
            onClick={() => {
              playHaptic('medium');
              celebrate({ kind: 'STREAK', mode: 'SAVED', days: 5 });
            }}
            style={sceneBtnStyle('#F0F9FF', '#BAE6FD', '#0369A1')}
          >
            <Heart size={16} />
            <span>Streak Saved</span>
          </button>

          {/* Streak LOST */}
          <button
            type="button"
            onClick={() => {
              playHaptic('medium');
              celebrate({
                kind: 'STREAK',
                mode: 'LOST',
                days: 0,
                lostCount: 5,
                speech: 'You missed a day and the streak reset — but your progress is safe.',
              });
            }}
            style={sceneBtnStyle('#FEF2F2', '#FECACA', '#B91C1C')}
          >
            <Flame size={16} />
            <span>Streak Lost</span>
          </button>

          {/* Level Up */}
          <button
            type="button"
            onClick={() => {
              playHaptic('teyroCelebration');
              celebrate({ kind: 'LEVEL_UP', oldLevel: 4, newLevel: 5, bonusCoins: 100 });
            }}
            style={sceneBtnStyle('#EFF6FF', '#BFDBFE', '#1D4ED8')}
          >
            <Award size={16} />
            <span>Level Up</span>
          </button>

          {/* Quest */}
          <button
            type="button"
            onClick={() => {
              playHaptic('medium');
              celebrate({
                kind: 'QUEST',
                headline: '+1 Quest Point!',
                subhead: 'Weekly goal progress',
                rows: [
                  { id: 'q1', label: 'Earn 50 XP', current: 50, target: 50, highlight: true },
                  { id: 'q2', label: 'Complete 2 lessons', current: 1, target: 2 },
                ],
              });
            }}
            style={sceneBtnStyle('#FEFCE8', '#FDE047', '#A16207')}
          >
            <Sparkles size={16} />
            <span>Quest Progress</span>
          </button>

          {/* Chained queue: claim → streak → quest */}
          <button
            type="button"
            onClick={() => {
              playHaptic('teyroCelebration');
              celebrate([
                {
                  kind: 'CLAIM',
                  title: 'Lesson complete!',
                  rewards: [
                    { currency: 'XP', amount: 25 },
                    { currency: 'COINS', amount: 10 },
                  ],
                  claim: async () => {
                    await fetch('/api/gamification/test-reward', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      credentials: 'include',
                      body: JSON.stringify({ xp: 25, coins: 10 }),
                    }).catch(() => {});
                    if (refresh) await refresh();
                  },
                },
                { kind: 'STREAK', mode: 'EXTENDED', days: 6, previousDays: 5 },
                {
                  kind: 'QUEST',
                  headline: '+2 Quest Points!',
                  rows: [{ id: 'q1', label: 'Daily lessons', current: 2, target: 2, highlight: true }],
                },
              ]);
            }}
            style={sceneBtnStyle('#F5F3FF', '#DDD6FE', '#6D28D9')}
          >
            <Zap size={16} />
            <span>Full Chain Queue</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function sceneBtnStyle(bg: string, border: string, color: string): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '10px 12px',
    backgroundColor: bg,
    border: `2px solid ${border}`,
    borderRadius: 12,
    color,
    fontWeight: 800,
    fontSize: 13,
    cursor: 'pointer',
  };
}
