'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { useHerald } from '@/context/HeraldContext';
import { useGamification } from '@/context/GamificationContext';
import { useRewardAnimation, RewardCurrency } from '@/context/RewardAnimationContext';
import { playHaptic } from '@/lib/haptics';
import styles from './HeraldMissionsModal.module.css';

interface MissionReward {
  type: 'XP' | 'COINS' | 'GEMS';
  amount: number;
}

interface MissionItem {
  id: string;
  title: string;
  objectiveType: string;
  currentProgress: number;
  targetValue: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CLAIMED' | 'EXPIRED';
  isCompleted: boolean;
  isClaimed: boolean;
  reward: MissionReward;
}

export default function HeraldMissionsModal() {
  const { activeOverlay, setActiveOverlay } = useHerald();
  const { refresh } = useGamification();
  const { openClaimModal } = useRewardAnimation();

  const [missions, setMissions] = useState<MissionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const isOpen = activeOverlay === 'MISSIONS';

  const fetchMissions = useCallback(async () => {
    try {
      setLoading(true);
      const tzOffset = new Date().getTimezoneOffset();
      const res = await fetch(`/api/v2/missions/today?timezoneOffset=${tzOffset}`, {
        credentials: 'include',
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.missions)) {
          setMissions(data.missions);
        }
      }
    } catch (err) {
      console.error('Error fetching missions in HeraldMissionsModal:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      void fetchMissions();
    }
  }, [isOpen, fetchMissions]);

  if (!isOpen) return null;

  const handleClose = () => {
    playHaptic('light');
    setActiveOverlay(null);
  };

  const handleClaimMission = (mission: MissionItem) => {
    playHaptic('medium');
    const currency = mission.reward.type === 'GEMS' ? 'COINS' : (mission.reward.type as RewardCurrency);
    const amount = mission.reward.amount;

    // Close missions modal and open Duolingo Claim Modal
    setActiveOverlay(null);

    openClaimModal({
      title: `+${amount} ${currency === 'XP' ? 'GEMS' : currency}`,
      subtitle: `Completed: ${mission.title}!`,
      rewards: [{ currency, amount }],
      skipBackendPersist: true,
      onClaim: async () => {
        try {
          await fetch(`/api/v2/missions/${mission.id}/claim`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
          if (refresh) await refresh();
        } catch (e) {
          console.error(e);
        }
      },
    });
  };

  // Fallback missions if none returned
  const displayMissions: MissionItem[] = missions.length > 0 ? missions : [
    {
      id: 'm1',
      title: 'Complete your next lesson',
      objectiveType: 'LESSON_COUNT',
      currentProgress: 1,
      targetValue: 1,
      status: 'COMPLETED',
      isCompleted: true,
      isClaimed: false,
      reward: { type: 'XP', amount: 20 },
    },
    {
      id: 'm2',
      title: 'Spend 5 minutes learning',
      objectiveType: 'TIME_SPENT',
      currentProgress: 5,
      targetValue: 5,
      status: 'COMPLETED',
      isCompleted: true,
      isClaimed: false,
      reward: { type: 'COINS', amount: 15 },
    },
    {
      id: 'm3',
      title: 'Complete 2 perfect lessons',
      objectiveType: 'PERFECT_LESSONS',
      currentProgress: 1,
      targetValue: 2,
      status: 'IN_PROGRESS',
      isCompleted: false,
      isClaimed: false,
      reward: { type: 'COINS', amount: 25 },
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className={styles.fullscreenBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className={styles.ambientRadialGlow} />

        {/* Top Bar */}
        <div className={styles.topBarRow}>
          <div className={styles.headerBadge}>
            <Sparkles size={16} />
            <span>DAILY MISSIONS</span>
          </div>
          <button type="button" onClick={handleClose} className={styles.closeBtn} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Center Stage */}
        <div className={styles.centerStage}>
          <h1 className={styles.mainTitle}>TODAY&apos;S MISSIONS</h1>
          <p className={styles.subTitle}>Complete daily missions to earn XP, coins, and rewards</p>

          {/* Mission Cards List */}
          <div className={styles.missionsList}>
            {displayMissions.map((m, idx) => {
              const isClaimable = (m.isCompleted || m.status === 'COMPLETED' || m.currentProgress >= m.targetValue) && !m.isClaimed && m.status !== 'CLAIMED';
              const isClaimed = m.isClaimed || m.status === 'CLAIMED';
              const progressPct = Math.min(100, Math.round((m.currentProgress / m.targetValue) * 100));
              const isGreen = isClaimable || isClaimed || progressPct >= 100;

              return (
                <div
                  key={m.id}
                  className={`${styles.missionItem} ${isClaimable ? styles.missionItemReady : ''} ${isClaimed ? styles.missionItemClaimed : ''}`}
                >
                  <div className={styles.missionIconCircle}>
                    <Image
                      src={m.reward.type === 'COINS' ? '/Icons/Coin.png' : m.reward.type === 'XP' ? '/Icons/gem.png' : '/Tressure box.png'}
                      alt="Reward"
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>

                  <div className={styles.missionDetails}>
                    <div className={styles.missionTitleRow}>
                      <span className={styles.missionTitle}>{m.title}</span>
                      <span className={styles.missionProgressText}>
                        {m.currentProgress} / {m.targetValue}
                      </span>
                    </div>

                    {/* Teyro Signature 3D Progress Track */}
                    <div className={styles.progressTrack3D}>
                      <motion.div
                        className={`${styles.progressFill3D} ${isGreen ? styles.progressFillGreen : ''}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{
                          type: 'spring',
                          stiffness: 80,
                          damping: 16,
                          mass: 0.9,
                          delay: 0.15 + idx * 0.1,
                        }}
                      >
                        <div className={styles.progressFillSheen} />
                      </motion.div>
                    </div>
                  </div>

                  <div className={styles.missionActionSide}>
                    {isClaimable ? (
                      <button
                        type="button"
                        onClick={() => handleClaimMission(m)}
                        className={styles.claimBtn3D}
                      >
                        CLAIM
                      </button>
                    ) : isClaimed ? (
                      <span className={styles.claimedBadge}>✓</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Monthly Missions Banner */}
          <div className={styles.monthlyQuestCard}>
            <div className={styles.monthlyQuestInfo}>
              <h4 className={styles.monthlyQuestTitle}>Monthly Missions</h4>
              <p className={styles.monthlyQuestDesc}>Complete daily missions to unlock special milestone trophies!</p>
            </div>
            <Image
              src="/dashboard tey.png"
              alt="Tey Mascot"
              width={48}
              height={48}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Bottom Action Row */}
        <div className={styles.bottomActionContainer}>
          <button type="button" onClick={handleClose} className={styles.continueBtn3D}>
            CONTINUE
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
