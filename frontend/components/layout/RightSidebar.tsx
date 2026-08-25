'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bot, Lock, BookOpen, Target, Check } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { useComingSoon } from '@/app/dashboard/layout';
import { useGamification } from '@/context/GamificationContext';
import { useRewardAnimation } from '@/context/RewardAnimationContext';
import LearningStatsCard from '@/components/dashboard/v2/LearningStatsCard';
import WeeklyLuckySpinCard from '@/components/dashboard/v2/WeeklyLuckySpinCard';
import MonthlyQuestWidget from '@/components/quests/MonthlyQuestWidget';
import styles from './RightSidebar.module.css';

export interface RightSidebarProps {
  course?: any;
  completedLessons?: string[];
  section?: any;
  sectionIndex?: number;
  userName?: string;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ course, completedLessons, section, sectionIndex, userName }) => {
  const { triggerComingSoon } = useComingSoon();
  const {
    xp: userXpTotal,
    completedQuests,
    claimQuest,
    lastRewardClaimedAt,
    dailyRewardCyclePosition,
    isEligibleForReward,
    nextRewardClaimInMs,
    claimDailyReward,
    refresh,
  } = useGamification();
  const { openClaimModal } = useRewardAnimation();

  const [countdownStr, setCountdownStr] = useState('');

  useEffect(() => {
    if (isEligibleForReward || !nextRewardClaimInMs) {
      setCountdownStr('');
      return;
    }

    let remainingMs = nextRewardClaimInMs;
    // Tick immediately
    const updateTick = () => {
      if (remainingMs <= 0) {
        setCountdownStr('00:00:00');
        return;
      }
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
      setCountdownStr(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
      remainingMs -= 1000;
    };

    updateTick();
    const interval = setInterval(updateTick, 1000);
    return () => clearInterval(interval);
  }, [isEligibleForReward, nextRewardClaimInMs]);

  const handleClaimReward = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!isEligibleForReward) return;
    playHaptic('success');
    const isDay7 = dailyRewardCyclePosition === 7;

    // Full-page Celebration scene — onClaim (the real daily-reward API, which
    // throws on failure) runs server-first inside the scene.
    openClaimModal({
      title: isDay7 ? '+30 COINS  +50 XP' : '+20 COINS  +10 XP',
      subtitle: isDay7 ? 'Day 7 Mystery Chest Unlocked!' : `Day ${dailyRewardCyclePosition} Daily Reward Claimed!`,
      // Mirrors the backend grant: 20 coins + 10 XP (30 + 50 on day 7)
      rewards: isDay7
        ? [
            { currency: 'COINS', amount: 30 },
            { currency: 'XP', amount: 50 },
          ]
        : [
            { currency: 'COINS', amount: 20 },
            { currency: 'XP', amount: 10 },
          ],
      skipBackendPersist: true,
      onClaim: async () => {
        await claimDailyReward();
      },
      onComplete: () => {
        void refresh();
      },
    });
  };

  const handleLetsGo = () => {
    playHaptic('medium');
    triggerComingSoon("Tey's Challenge: Let's Go!");
  };

  // Section-level progress
  const hasSection = !!section;
  let sectionLessons: any[] = [];
  let sectionCompletedCount = 0;
  let sectionTotalLessons = 0;
  let sectionProgressPercent = 0;
  let sectionXpEarned = 0;
  let sectionComplete = false;

  if (hasSection) {
    sectionLessons = section.lessons || [];
    sectionTotalLessons = sectionLessons.length;
    sectionCompletedCount = sectionLessons.filter((l: any) => completedLessons?.includes(l.id)).length;
    sectionProgressPercent = sectionTotalLessons > 0 ? Math.round((sectionCompletedCount / sectionTotalLessons) * 100) : 0;
    sectionXpEarned = sectionLessons
      .filter((l: any) => completedLessons?.includes(l.id))
      .reduce((acc: number, l: any) => acc + (l.xpReward || 10), 0);
    sectionComplete = sectionCompletedCount === sectionTotalLessons && sectionTotalLessons > 0;
  }

  // Calculate Course Progress if course and completedLessons are passed
  const hasCourse = !!course;
  let totalSections = 0;
  let totalLessons = 0;
  let completedLessonsCount = 0;
  let completedSectionsCount = 0;
  let progressPercent = 0;
  let totalXp = userXpTotal; // Use unified XP from context instead of local formula

  if (hasCourse) {
    const sectionsList = course.sections || [];
    const curriculumList = course.curriculum || [];
    
    totalSections = sectionsList.length || curriculumList.length || 0;
    completedLessonsCount = completedLessons?.length || 0;

    if (sectionsList.length > 0) {
      totalLessons = sectionsList.reduce((acc: number, s: any) => acc + (s.lessons?.length || 0), 0);
      completedSectionsCount = sectionsList.filter((s: any) => {
        if (!s.lessons || s.lessons.length === 0) return false;
        return s.lessons.every((l: any) => completedLessons?.includes(l.id));
      }).length;
    } else if (curriculumList.length > 0) {
      totalLessons = curriculumList.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);
      completedSectionsCount = curriculumList.filter((m: any) => {
        if (!m.lessons || m.lessons.length === 0) return false;
        return m.lessons.every((l: any) => completedLessons?.includes(l.id || String(l.index)));
      }).length;
    }

    progressPercent = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
  }

  return (
    <div className={styles.rightColumn}>
      {/* LEARNING STATS (First card in sidebar) */}
      <LearningStatsCard />

      {/* SECTION PROGRESS CARD (Only shown if section prop is provided) */}
      {hasSection && (
        <div className={styles.courseProgressCard}>
          <h4 className={styles.cardSectionTitle}>Section Progress</h4>

          <div className={styles.progressHeaderRow}>
            <div className={styles.donutContainer}>
              <svg width="100" height="100" viewBox="0 0 100 100" className={styles.donutSvg}>
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className={styles.donutBg}
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className={sectionComplete ? styles.donutFillGreen : styles.donutFill}
                  strokeWidth="8"
                  strokeDasharray="263.89"
                  strokeDashoffset={263.89 - (263.89 * sectionProgressPercent) / 100}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className={styles.donutText}>
                <span className={styles.donutPct}>{sectionProgressPercent}%</span>
                <span className={styles.donutLabel}>COMPLETE</span>
              </div>
            </div>

            <div className={styles.courseStatsList}>
              <div className={styles.courseStatItem}>
                <span className={styles.courseStatVal}>
                  <strong>{sectionCompletedCount} / {sectionTotalLessons}</strong>
                </span>
                <span className={styles.courseStatSubLabel}>Lessons Completed</span>
              </div>

              <div className={styles.courseStatItem}>
                <span className={styles.courseStatVal}>
                  <strong>{sectionXpEarned} XP</strong>
                </span>
                <span className={styles.courseStatSubLabel}>Earned</span>
              </div>
            </div>
          </div>

          {sectionComplete && (
            <p className={styles.sectionCompleteMsg}>
              Amazing! You&apos;ve completed this section.
            </p>
          )}

          <button
            className={styles.button3dOutlineFull}
            onClick={() => triggerComingSoon(sectionComplete ? 'Review Section' : 'Continue Learning')}
          >
            {sectionComplete ? 'Review Section' : 'Continue Learning'}
          </button>
        </div>
      )}

      {/* TEY'S MESSAGE CARD (contextual for section view) */}
      {hasSection && (
        <div className={styles.messageCard}>
          <div className={styles.messageCardMascot}>
            <Image
              src="/User onbarding Assets/Step_7_tey_verified_state.PNG"
              alt="Tey"
              width={80}
              height={80}
              className={styles.messageCardMascotImg}
            />
          </div>

          <div className={styles.messageCardContent}>
            <span className={styles.messageHeader}>Tey&apos;s Message</span>
            <p className={styles.messageText}>
              {sectionComplete
                ? `"Excellent work${userName ? `, ${userName}` : ''}! You've completed this section. You're one step closer to becoming a pro!"`
                : `"Keep going${userName ? `, ${userName}` : ''}! You're making great progress. ${sectionTotalLessons - sectionCompletedCount} more lesson${sectionTotalLessons - sectionCompletedCount !== 1 ? 's' : ''} to go!"`
              }
            </p>
            <button
              onClick={handleLetsGo}
              className={styles.button3dWhite}
            >
              Let&apos;s Continue!
            </button>
          </div>
        </div>
      )}

      {/* MONTHLY QUEST CARD (section view — live widget) */}
      {hasSection && (
        <div className={styles.questsCard} style={{ background: 'none', border: 'none' }}>
          <MonthlyQuestWidget />
        </div>
      )}

      {/* DAILY REWARD LOGIN CHEST CARD */}
      <div className={styles.dailyRewardCard}>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes chestIdle {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(-2deg); }
          }
          @keyframes pulseGold {
            0%, 100% { transform: scale(1); box-shadow: 0 0 8px rgba(255, 184, 0, 0.6); }
            50% { transform: scale(1.1); box-shadow: 0 0 16px rgba(255, 184, 0, 0.95); }
          }
          .chestAnimate {
            animation: chestIdle 2.2s infinite ease-in-out;
          }
          .day7Glow {
            animation: pulseGold 1.8s infinite ease-in-out;
          }
        `}} />

        {/* Top Side-by-Side row: Text on left, Chest badge on right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            <span style={{ fontWeight: 800, fontSize: '18px', color: '#3C3C3C', fontFamily: 'var(--font-jakarta), sans-serif' }}>
              Daily Reward
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#777777', fontFamily: 'var(--font-jakarta), sans-serif', lineHeight: '1.4' }}>
              {(() => {
                if (isEligibleForReward) {
                  if (dailyRewardCyclePosition === 7) return "Day 7 Mystery Chest is ready!";
                  return "Claim your reward to build a daily habit!";
                } else {
                  if (dailyRewardCyclePosition === 1) return "Nice job! Mystery chest unlocked!";
                  return `Next chest in ${countdownStr}`;
                }
              })()}
            </span>
          </div>
          
          <div
            onClick={isEligibleForReward ? handleClaimReward : undefined}
            style={{
              width: '64px',
              height: '54px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              cursor: isEligibleForReward ? 'pointer' : 'default',
              transition: 'transform 0.15s ease',
            }}
          >
            <Image
              src="/Tressure box.png"
              alt="Mystery Chest"
              width={64}
              height={52}
              className={isEligibleForReward ? 'chestAnimate' : ''}
              style={{ objectFit: 'contain', filter: isEligibleForReward ? 'none' : 'grayscale(30%) opacity(85%)' }}
            />
          </div>
        </div>

        {/* 7-pip calendar-style streak tracker */}
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0 16px', width: '100%', gap: '6px' }}>
          {Array.from({ length: 7 }).map((_, i) => {
            const dayNum = i + 1;
            const isActive = dayNum === dailyRewardCyclePosition && isEligibleForReward;
            
            let isCompleted = false;
            if (isEligibleForReward) {
              isCompleted = dayNum < dailyRewardCyclePosition;
            } else {
              const dayJustClaimed = dailyRewardCyclePosition === 1 ? 7 : dailyRewardCyclePosition - 1;
              isCompleted = dayNum <= dayJustClaimed;
            }

            const isDay7 = dayNum === 7;

            return (
              <div
                key={dayNum}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 800, color: isDay7 ? '#FF8A00' : '#A0A0A0', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                  D{dayNum}
                </span>
                <div
                  onClick={isActive ? handleClaimReward : undefined}
                  className={isDay7 && !isCompleted ? 'day7Glow' : ''}
                  style={{
                    width: isDay7 ? '32px' : '28px',
                    height: isDay7 ? '32px' : '28px',
                    borderRadius: '50%',
                    background: isCompleted
                      ? '#58cc02'
                      : isDay7
                        ? 'linear-gradient(135deg, #FFC700 0%, #FF8A00 100%)'
                        : isActive
                          ? '#FF8A00'
                          : '#E2E8F0',
                    border: isActive || (isDay7 && !isCompleted) ? '2px solid white' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isCompleted || isActive || isDay7 ? 'white' : '#A0A0A0',
                    fontWeight: 800,
                    fontSize: '11px',
                    boxShadow: isActive && !isDay7 ? '0 0 8px rgba(255, 138, 0, 0.6)' : 'none',
                    cursor: isActive ? 'pointer' : 'default',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isCompleted ? (
                    <Check size={14} />
                  ) : isDay7 ? (
                    <div style={{ position: 'relative', width: 20, height: 18 }}>
                      <Image
                        src="/Tressure box.png"
                        alt="Day 7 Chest"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  ) : (
                    dayNum
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleClaimReward}
          disabled={!isEligibleForReward}
          className={isEligibleForReward ? styles.dailyRewardClaimBtn : styles.dailyRewardClaimBtnDisabled}
        >
          {isEligibleForReward
            ? (dailyRewardCyclePosition === 7 ? 'CLAIM MYSTERY CHEST' : `CLAIM DAY ${dailyRewardCyclePosition} REWARD`)
            : (dailyRewardCyclePosition === 1 ? 'MYSTERY CHEST CLAIMED' : 'CLAIMED')
          }
        </button>
      </div>

      {/* ─── COURSE-LEVEL CARDS (shown when no section prop) ─── */}

      {/* COURSE PROGRESS CARD (Only shown if course prop is provided and no section) */}
      {hasCourse && !hasSection && (
        <div className={styles.courseProgressCard}>
          <h4 className={styles.cardSectionTitle}>Course Progress</h4>
          
          <div className={styles.progressHeaderRow}>
            {/* SVG Donut Chart */}
            <div className={styles.donutContainer}>
              <svg width="100" height="100" viewBox="0 0 100 100" className={styles.donutSvg}>
                <circle
                  cx="50"
                  cy="54"
                  r="42"
                  className={styles.donutBgShadow}
                  strokeWidth="8"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="42" 
                  className={styles.donutBg} 
                  strokeWidth="8"
                />
                <circle 
                  cx="50" 
                  cy="54" 
                  r="42" 
                  className={styles.donutFillShadow} 
                  strokeWidth="8"
                  strokeDasharray="263.89"
                  strokeDashoffset={263.89 - (263.89 * progressPercent) / 100}
                  transform="rotate(-90 50 52)"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="42" 
                  className={styles.donutFill} 
                  strokeWidth="8"
                  strokeDasharray="263.89"
                  strokeDashoffset={263.89 - (263.89 * progressPercent) / 100}
                  transform="rotate(-90 50 50)"
                />
                <circle cx="50" cy="50" r="42" className={styles.donutGloss} strokeWidth="8" />
              </svg>
              <div className={styles.donutText}>
                <span className={styles.donutPct}>{progressPercent}%</span>
                <span className={styles.donutLabel}>COMPLETE</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className={styles.courseStatsList}>
              <div className={styles.courseStatItem}>
                <span className={styles.courseStatLabel}>Completed</span>
                <span className={styles.courseStatVal}>
                  <strong>{completedSectionsCount} / {totalSections}</strong>
                </span>
                <span className={styles.courseStatSubLabel}>Sections</span>
              </div>
              
              <div className={styles.courseStatItem}>
                <span className={styles.courseStatLabel}>Lessons Done</span>
                <span className={styles.courseStatVal}>
                  <strong>{completedLessonsCount} / {totalLessons}</strong>
                </span>
              </div>

              <div className={styles.courseStatItem}>
                <span className={styles.courseStatLabel}>Total XP Earned</span>
                <span className={styles.courseStatVal} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Image src="/Icons/gem.png" alt="XP" width={14} height={14} /> <strong>{totalXp} XP</strong>
                </span>
              </div>
            </div>
          </div>

          <Link href={`/courses/${course.slug || course.id}`} style={{ textDecoration: 'none' }}>
            <button className={styles.button3dOutlineFull}>
              View Course Overview
            </button>
          </Link>
        </div>
      )}

      {/* TEY'S MESSAGE CARD (default - non-section view) */}
      {!hasSection && (
      <div className={styles.messageCard}>
        {/* Outline mascot watermark */}
        <div className={styles.messageCardWatermark}>
          <Bot size={120} />
        </div>

        <div className={styles.messageCardContent}>
          <span className={styles.messageHeader}>TEY&apos;S MESSAGE</span>
          <p className={styles.messageText}>
            &ldquo;Ready to earn 50 XP today? You&apos;re so close to the next league!&rdquo;
          </p>
          <button
            onClick={handleLetsGo}
            className={styles.button3dWhite}
          >
            Let&apos;s Go!
          </button>
        </div>
      </div>
      )}

      {/* MONTHLY QUEST CARD (default — live widget) */}
      {!hasSection && (
        <div className={styles.questsCard} style={{ background: 'none', border: 'none' }}>
          <MonthlyQuestWidget />
        </div>
      )}

      {/* UNLOCK LEADERBOARDS CARD (default) */}
      {!hasSection && (
      <div className={styles.leaderboardsCard}>
        <div className={styles.lockIconOuter}>
          <div className={styles.lockIconInner}>
            <Lock size={18} className={styles.lockSvg} />
          </div>
        </div>
        <h4 className={styles.leaderboardCardTitle}>UNLOCK LEADERBOARDS!</h4>
        <p className={styles.leaderboardCardDesc}>
          Complete 2 more lessons to start competing!
        </p>
        <div className={styles.leaderboardProgressContainer}>
          <div className={styles.leaderboardProgressBar}>
            <div className={styles.leaderboardProgressBar} style={{ backgroundColor: '#F1F5F9' }}>
              <div className={styles.leaderboardProgressFill} style={{ width: '33.3%' }} />
            </div>
          </div>
          <span className={styles.leaderboardProgressText}><strong>1 / 3</strong> lessons completed</span>
        </div>
      </div>
      )}

      {/* LUCKY SPIN CARD */}
      <WeeklyLuckySpinCard />
    </div>
  );
};
