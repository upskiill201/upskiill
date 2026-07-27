'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, BookOpen, Target, Zap } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import styles from './TodaysMissionsCard.module.css';

export default function TodaysMissionsCard() {
  const { streakDays, xp, lastLessonCompletedAt } = useGamification();

  // Local reset countdown calculation (12:00 AM local midnight)
  const [resetTimer, setResetTimer] = useState('12h 45m');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextMidnight = new Date(now);
      nextMidnight.setHours(24, 0, 0, 0);
      const diffMs = nextMidnight.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setResetTimer(`${hours}h ${mins}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const lastLessonStr = lastLessonCompletedAt ? new Date(lastLessonCompletedAt).toISOString().split('T')[0] : null;
  const isLessonDone = lastLessonStr === todayStr;

  const missions = [
    {
      id: 'm1',
      icon: <BookOpen size={24} className="text-[#0172FD]" />,
      iconClass: styles.iconBlue,
      title: 'Complete 1 lesson',
      progress: isLessonDone ? 1 : 0,
      total: 1,
      xpReward: 10,
      coinReward: 5,
    },
    {
      id: 'm2',
      icon: <Target size={24} className="text-[#EF4444]" />,
      iconClass: styles.iconRed,
      title: 'Maintain your streak',
      progress: streakDays > 0 ? 1 : 0,
      total: 1,
      xpReward: 10,
      coinReward: 5,
    },
    {
      id: 'm3',
      icon: <Zap size={24} className="text-[#EAB308]" />,
      iconClass: styles.iconYellow,
      title: 'Learn for 10 minutes',
      progress: isLessonDone ? 10 : 4,
      total: 10,
      unit: 'min',
      xpReward: 10,
      coinReward: 5,
    },
  ];

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <h2 className={styles.sectionTitle}>TODAY&apos;S MISSIONS</h2>
        </div>
        <div className={styles.resetTimer}>
          <Clock size={16} />
          <span>Resets in {resetTimer}</span>
        </div>
      </div>

      <div className={styles.missionsGrid}>
        {missions.map((m) => {
          const isDone = m.progress >= m.total;
          const pct = Math.min(100, Math.round((m.progress / m.total) * 100));

          return (
            <div key={m.id} className={styles.missionCard}>
              <div className={`${styles.iconWrap} ${m.iconClass}`}>{m.icon}</div>
              <h3 className={styles.missionTitle}>{m.title}</h3>

              <div className={styles.progressContainer}>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                </div>
                <span className={styles.progressText}>
                  {m.progress} / {m.total} {m.unit || ''}
                </span>
              </div>

              <div className={styles.rewardRow}>
                <span className={styles.rewardBadge}>
                  <Image src="/Icons/gem.png" alt="XP" width={14} height={14} />
                  {m.xpReward} XP
                </span>
                <span className={styles.rewardBadge}>
                  <Image src="/Icons/Coin.png" alt="Coins" width={14} height={14} />
                  {m.coinReward} Coins
                </span>
              </div>

              {isDone && <span className={styles.claimedTag}>✓ Completed</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
