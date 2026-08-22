'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import styles from './CurrentQuestCard.module.css';

interface CurrentQuestCardProps {
  currentEnrollment?: any;
  onPlay?: () => void;
}

export default function CurrentQuestCard({ currentEnrollment, onPlay }: CurrentQuestCardProps) {
  const courseTitle = currentEnrollment?.course?.title || 'Digital Marketing Mastery 2025';
  const shortDesc = currentEnrollment?.course?.shortDescription ||
    currentEnrollment?.course?.subtitle ||
    'Create your first social media marketing campaign that converts.';
  const progress = currentEnrollment?.progress || 48;
  const currentMission = Math.max(1, Math.round((progress / 100) * 25) || 12);
  const totalMissions = 25;

  const handleAction = () => {
    playHaptic('medium');
    if (onPlay) onPlay();
  };

  return (
    <div className={styles.card}>
      <span className={styles.questHeader}>CURRENT QUEST</span>

      <div className={styles.contentRow}>
        <div className={styles.leftCol}>
          <div className={styles.titleRow}>
            <div className={styles.targetIconWrap}>
              <span>🎯</span>
            </div>
            <div className={styles.titleGroup}>
              <h2 className={styles.courseTitle}>{courseTitle}</h2>
              <span className={styles.missionSubtitle}>
                Mission {currentMission} / {totalMissions}
              </span>
            </div>
          </div>

          <p className={styles.missionDesc}>{shortDesc}</p>

          <div className={styles.rewardChipsRow}>
            <span className={styles.rewardChip}>
              <Image src="/Icons/gem.png" alt="XP" width={14} height={14} />
              +20 XP
            </span>
            <span className={styles.rewardChip}>
              <Image src="/Icons/Coin.png" alt="Coins" width={14} height={14} />
              +10 Coins
            </span>
          </div>
        </div>

        {/* Right 3D Visual Illustration (Desktop/Tablet) */}
        <div className={styles.rightCol}>
          <div className={styles.illustrationCard}>
            <div className={styles.screenGraphic}>
              <Image src="/Icons/explore.png" alt="Learn" width={36} height={36} />
            </div>
            <div className={styles.reactionBadge1}>❤️</div>
            <div className={styles.reactionBadge2}>👍</div>
          </div>
        </div>
      </div>

      {/* 3D Soft Primary Play Button */}
      <button
        type="button"
        onClick={handleAction}
        className={styles.ctaButton3D}
      >
        <span>PLAY MISSION {currentMission}</span>
        <span className={styles.btnArrowCircle}>
          <ArrowRight size={14} strokeWidth={3} />
        </span>
      </button>
    </div>
  );
}
