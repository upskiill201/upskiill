'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { useGamification } from '@/context/GamificationContext';
import { useCelebration } from '@/context/CelebrationContext';
import { buildMilestoneClaimScenes, type QuestMilestone } from '@/lib/monthlyQuest';
import { useMonthlyQuest } from '@/hooks/useMonthlyQuest';
import styles from './MonthlyQuestCard.module.css';

/**
 * MONTHLY QUEST — compact dashboard card for the month-long goal
 * (hit your daily XP goal on N days). Shows the milestone track
 * (M1 / M2 / FINAL), days remaining, and an inline CLAIM shortcut that
 * plays the full Celebration Engine sequence. Deep-links to the quests page.
 */
export default function MonthlyQuestCard() {
  const { quest, loading, error, refresh } = useMonthlyQuest();
  const { celebrate } = useCelebration();
  const { refresh: refreshWallet } = useGamification();

  const claimable = quest?.milestones.find((m) => m.claimable) ?? null;

  const handleClaim = (milestone: QuestMilestone) => {
    if (!quest) return;
    playHaptic('medium');
    const scenes = buildMilestoneClaimScenes(quest, milestone);
    // Wallet HUD count-up needs fresh balances once the deposit lands
    const last = scenes[scenes.length - 1];
    const prevOnComplete = last.onComplete;
    last.onComplete = () => {
      prevOnComplete?.();
      void refreshWallet();
      void refresh();
    };
    celebrate(scenes);
  };

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <span className={styles.headerTitle}>MONTHLY QUEST</span>
        {quest && (
          <span className={styles.countdownChip}>
            <Clock size={12} />
            {quest.daysRemaining}d left
          </span>
        )}
      </div>

      {loading && !quest ? (
        <div className={styles.skeletonWrap} aria-busy="true">
          <div className={`${styles.skeletonBlock} ${styles.skeleton}`} style={{ height: 16, width: '55%' }} />
          <div className={`${styles.skeletonBlock} ${styles.skeleton}`} style={{ height: 10 }} />
          <div className={`${styles.skeletonBlock} ${styles.skeleton}`} style={{ height: 26, width: '70%' }} />
        </div>
      ) : error && !quest ? (
        <div className={styles.errorWrap}>
          <p className={styles.errorText}>{error}</p>
          <button type="button" className={styles.retryBtn} onClick={() => void refresh()}>
            Try again
          </button>
        </div>
      ) : quest ? (
        <>
          <div className={styles.titleRow}>
            <span className={styles.monthLabel}>{quest.monthLabel} Quest</span>
            <span className={styles.fraction}>
              {quest.goalDays} / {quest.targetDays}
              <span className={styles.fractionUnit}> goal days</span>
            </span>
          </div>

          {/* Milestone track — chest nodes sit at each checkpoint's threshold */}
          <div className={styles.trackZone}>
            <div className={styles.trackBase}>
              <div className={styles.trackFill} style={{ width: `${Math.min(100, quest.progressPct)}%` }} />
              {quest.milestones.map((m) => {
                const leftPct = Math.min(100, Math.round((m.requiredDays / Math.max(1, quest.targetDays)) * 100));
                return (
                  <div
                    key={m.id}
                    className={[
                      styles.node,
                      m.claimed ? styles.nodeClaimed : '',
                      m.claimable ? styles.nodeClaimable : '',
                    ].join(' ')}
                    style={{ left: `${leftPct}%` }}
                    title={`${m.label}: ${m.claimed ? 'claimed' : `${m.requiredDays} goal-days`}`}
                  >
                    <Image
                      src="/Icons/tressure-chest-locked.png"
                      alt=""
                      width={m.claimable ? 17 : 14}
                      height={m.claimable ? 17 : 14}
                      style={{
                        objectFit: 'contain',
                        filter: m.claimed
                          ? 'saturate(0.55) brightness(0.9)'
                          : m.claimable
                          ? 'drop-shadow(0 1px 1px rgba(122, 76, 0, 0.55))'
                          : 'grayscale(1) brightness(0.5)',
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <p className={styles.statusLine}>
            {claimable
              ? `${claimable.label} unlocked — claim your reward!`
              : quest.status === 'FULLY_CLAIMED'
              ? 'Monthly Champion! Badge earned.'
              : `Hit your ${quest.dailyGoalXp} XP daily goal to fill today's slot.`}
          </p>

          <div className={styles.actionRow}>
            {claimable ? (
              <button type="button" className={styles.claimBtn} onClick={() => handleClaim(claimable)}>
                CLAIM {claimable.reward.type === 'FREEZE' ? 'FREEZE' : `+${claimable.reward.amount}`}
              </button>
            ) : (
              <Link href="/dashboard/quests" className={styles.viewBtn}>
                View Quest
                <ArrowRight size={14} strokeWidth={2.8} />
              </Link>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
