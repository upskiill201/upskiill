'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import styles from './MomentumCard.module.css';

interface MomentumCardProps {
  onAction?: () => void;
}

export default function MomentumCard({ onAction }: MomentumCardProps) {
  const { streakDays, isEligibleForReward, userLevel, xpInCurrentLevel, lastLessonCompletedAt } = useGamification();

  // Priority order evaluation:
  // 1. Protect streak (if last lesson was completed > 24 hours ago)
  // 2. Finish today's lesson (if no lesson completed today)
  // 3. Reach next level (if close to level up)
  // 4. Default prompt

  const todayStr = new Date().toISOString().split('T')[0];
  const lastLessonStr = lastLessonCompletedAt ? new Date(lastLessonCompletedAt).toISOString().split('T')[0] : null;
  const hasCompletedLessonToday = lastLessonStr === todayStr;

  let icon = '/Icons/burn.png';
  let title = `Finish one lesson today to protect your ${streakDays}-day streak.`;
  let xpReward = 10;
  let coinReward = 5;

  if (hasCompletedLessonToday) {
    if (isEligibleForReward) {
      icon = '/Tressure box.webp';
      title = "One more lesson unlocks today's Mystery Chest!";
      xpReward = 15;
      coinReward = 10;
    } else {
      const remainingXp = 100 - xpInCurrentLevel;
      icon = '/Icons/gem.png';
      title = `You're only ${remainingXp} XP away from Level ${userLevel + 1}!`;
      xpReward = 20;
      coinReward = 10;
    }
  }

  return (
    <div className={styles.momentumCard}>
      <div className={styles.leftCol}>
        <div className={styles.iconBox}>
          <Image src={icon} alt="Momentum" width={34} height={34} style={{ objectFit: 'contain' }} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.rewardRow}>
            <span className={styles.rewardPill}>
              <Image src="/Icons/gem.png" alt="XP" width={14} height={14} />
              +{xpReward} XP
            </span>
            <span className={styles.rewardPill}>
              <Image src="/Icons/Coin.png" alt="Coins" width={14} height={14} />
              +{coinReward} Coins
            </span>
          </div>
        </div>
      </div>

      <button type="button" onClick={onAction} className={styles.ctaBtn}>
        <span>Continue</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
