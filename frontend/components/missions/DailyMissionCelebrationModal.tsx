'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Flame, BookOpen, Sparkles, Check } from 'lucide-react';
import { useRewardAnimation, RewardCurrency } from '@/context/RewardAnimationContext';
import { useGamification } from '@/context/GamificationContext';
import { playHaptic } from '@/lib/haptics';
import styles from './DailyMissionCelebrationModal.module.css';

export interface MissionItem {
  id: string;
  title: string;
  objectiveType: string;
  currentProgress: number;
  targetValue: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CLAIMED' | 'EXPIRED';
  isCompleted: boolean;
  isClaimed: boolean;
  reward: {
    type: 'XP' | 'COINS' | 'GEMS';
    amount: number;
  };
}

interface DailyMissionCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetMissionId?: string;
  onReviewLesson?: () => void;
  showReviewButton?: boolean;
}

export default function DailyMissionCelebrationModal({
  isOpen,
  onClose,
  targetMissionId,
  onReviewLesson,
  showReviewButton = false,
}: DailyMissionCelebrationModalProps) {
  const { openClaimModal } = useRewardAnimation();
  const { refresh } = useGamification();

  const [missions, setMissions] = useState<MissionItem[]>([]);
  const [animatedProgress, setAnimatedProgress] = useState<Record<string, number>>({});
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [poppedChestId, setPoppedChestId] = useState<string | null>(null);

  // Fetch today's missions
  const fetchMissions = useCallback(async () => {
    try {
      const tzOffset = new Date().getTimezoneOffset();
      const res = await fetch(`/api/v2/missions/today?timezoneOffset=${tzOffset}`, {
        credentials: 'include',
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.missions) && data.missions.length > 0) {
          setMissions(data.missions);
          return;
        }
      }
    } catch (e) {
      console.error('Error loading missions for celebration modal:', e);
    }

    // Default fallback missions
    setMissions([
      {
        id: 'm1',
        title: 'Earn 10 XP',
        objectiveType: 'XP_EARNED',
        currentProgress: 10,
        targetValue: 10,
        status: 'COMPLETED',
        isCompleted: true,
        isClaimed: false,
        reward: { type: 'XP', amount: 20 },
      },
      {
        id: 'm2',
        title: 'Earn 10 Combo Bonus XP',
        objectiveType: 'COMBO_XP',
        currentProgress: 5,
        targetValue: 10,
        status: 'IN_PROGRESS',
        isCompleted: false,
        isClaimed: false,
        reward: { type: 'COINS', amount: 10 },
      },
      {
        id: 'm3',
        title: 'Spend 10 minutes learning',
        objectiveType: 'TIME_SPENT',
        currentProgress: 3,
        targetValue: 10,
        status: 'IN_PROGRESS',
        isCompleted: false,
        isClaimed: false,
        reward: { type: 'COINS', amount: 15 },
      },
    ]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      void fetchMissions();
      setIsAnimationFinished(false);
      setPoppedChestId(null);
    }
  }, [isOpen, fetchMissions]);

  // Savour the moment Duolingo sequence: animate progress fill-up
  useEffect(() => {
    if (!isOpen || missions.length === 0) return;

    // Step 1: Initial starting state (completed mission set to 70% or 0% before filling)
    const initialMap: Record<string, number> = {};
    missions.forEach((m) => {
      const isTarget = targetMissionId ? m.id === targetMissionId : m.isCompleted || m.status === 'COMPLETED';
      if (isTarget) {
        initialMap[m.id] = Math.max(0, m.targetValue - 1); // Start slightly before full
      } else {
        initialMap[m.id] = m.currentProgress;
      }
    });
    setAnimatedProgress(initialMap);

    // Step 2: Animate fill-up after 350ms delay
    const timerFill = setTimeout(() => {
      const fullMap: Record<string, number> = {};
      missions.forEach((m) => {
        fullMap[m.id] = m.currentProgress;
      });
      setAnimatedProgress(fullMap);
      playHaptic('medium');
    }, 350);

    // Step 3: Pop the chest & sound after fill reaches 100%
    const timerPop = setTimeout(() => {
      const completedMission = missions.find(
        (m) => (targetMissionId ? m.id === targetMissionId : m.isCompleted || m.status === 'COMPLETED')
      );
      if (completedMission) {
        setPoppedChestId(completedMission.id);
        playHaptic('success');
      }
      setIsAnimationFinished(true);
    }, 1400);

    return () => {
      clearTimeout(timerFill);
      clearTimeout(timerPop);
    };
  }, [isOpen, missions, targetMissionId]);

  if (!isOpen) return null;

  const completedMissions = missions.filter(
    (m) => (m.isCompleted || m.status === 'COMPLETED' || m.currentProgress >= m.targetValue) && !m.isClaimed
  );

  const headingText =
    completedMissions.length > 1
      ? `${completedMissions.length} Daily Missions complete!`
      : completedMissions.length === 1
      ? '1 Daily Mission complete!'
      : 'Daily Missions';

  // Handle Continue & Reward Claim Sequence
  const handleContinue = () => {
    playHaptic('medium');
    onClose();

    // If there is a completed unclimed mission, open the claim modal
    const missionToClaim = completedMissions[0];
    if (missionToClaim) {
      const rewardCurrency = missionToClaim.reward.type === 'GEMS' ? 'COINS' : (missionToClaim.reward.type as RewardCurrency);
      const amount = missionToClaim.reward.amount;

      openClaimModal({
        title: `+${amount} ${rewardCurrency}`,
        subtitle: `Daily Mission: "${missionToClaim.title}" Completed!`,
        rewards: [{ currency: rewardCurrency, amount }],
        skipBackendPersist: true,
        onClaim: async () => {
          try {
            await fetch(`/api/v2/missions/${missionToClaim.id}/claim`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
            window.dispatchEvent(new CustomEvent('mission:refresh'));
            if (refresh) await refresh();
          } catch (err) {
            console.error('Failed to claim mission:', err);
          }
        },
      });
    }
  };

  const getMissionIcon = (type: string, title: string) => {
    const titleLower = title.toLowerCase();
    if (type === 'TIME_SPENT' || titleLower.includes('minute') || titleLower.includes('spend')) {
      return {
        icon: <Clock size={28} strokeWidth={2.6} />,
        iconClass: styles.iconBlue,
      };
    }
    if (type === 'STREAK_ACTIVE' || titleLower.includes('streak')) {
      return {
        icon: <Image src="/Icons/burn.png" alt="Streak" width={28} height={28} style={{ objectFit: 'contain' }} />,
        iconClass: styles.iconOrange,
      };
    }
    return {
      icon: <Zap size={28} strokeWidth={2.8} fill="#EAB308" />,
      iconClass: styles.iconYellow,
    };
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlayBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Center Stage Card Stack */}
        <div className={styles.centerStage}>
          <motion.h1
            className={styles.celebrationHeading}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {headingText}
          </motion.h1>

          <div className={styles.missionsList}>
            {missions.map((m) => {
              const currentVal = animatedProgress[m.id] ?? m.currentProgress;
              const pct = Math.min(100, Math.round((currentVal / m.targetValue) * 100));
              const isTargetComplete = (m.isCompleted || m.status === 'COMPLETED' || m.currentProgress >= m.targetValue);
              const { icon, iconClass } = getMissionIcon(m.objectiveType, m.title);
              const isChestPopped = poppedChestId === m.id;

              return (
                <div
                  key={m.id}
                  className={`${styles.missionCard} ${isTargetComplete ? styles.missionCardCompleted : ''}`}
                >
                  {/* Left Icon Badge */}
                  <div className={`${styles.iconBadge} ${iconClass}`}>
                    {icon}
                  </div>

                  {/* Center Details & Progress Track */}
                  <div className={styles.cardContent}>
                    <h3 className={styles.missionTitle}>{m.title}</h3>

                    <div className={styles.progressRow}>
                      <div className={styles.progressTrack}>
                        <div
                          className={`${styles.progressFill} ${pct >= 100 ? styles.progressFillGlowing : ''}`}
                          style={{ width: `${pct}%` }}
                        />
                        <span className={styles.progressLabel}>
                          {currentVal} / {m.targetValue}
                        </span>
                      </div>

                      {/* Attached Treasure Chest */}
                      <motion.div
                        className={`${styles.chestWrap} ${isChestPopped ? styles.chestWrapPopped : ''}`}
                        animate={isChestPopped ? { scale: [1, 1.35, 1], rotate: [0, -8, 8, 0] } : {}}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      >
                        <Image
                          src="/Tressure box.png"
                          alt="Reward Chest"
                          width={28}
                          height={28}
                          style={{ objectFit: 'contain' }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Row (Desktop: Review Lesson + Continue; Mobile: Continue) */}
        <div className={styles.bottomActionBar}>
          {showReviewButton && onReviewLesson && (
            <button
              type="button"
              onClick={onReviewLesson}
              className={styles.reviewBtn}
            >
              REVIEW LESSON
            </button>
          )}

          <button
            type="button"
            onClick={handleContinue}
            disabled={!isAnimationFinished}
            className={`${styles.continueBtn3D} ${!isAnimationFinished ? styles.continueBtnDisabled : ''}`}
          >
            {isAnimationFinished ? 'CONTINUE' : 'COMPLETING...'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
