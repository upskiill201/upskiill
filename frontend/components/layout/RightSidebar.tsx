'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bot, Lock, BookOpen } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { useComingSoon } from '@/app/dashboard/layout';
import { useGamification } from '@/context/GamificationContext';
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
  } = useGamification();

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

  const handleClaimReward = async () => {
    playHaptic('success');
    await claimDailyReward();
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
              Amazing! 🎉 You&apos;ve completed this section.
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
                ? `"Excellent work${userName ? `, ${userName}` : ''}! You've completed this section. You're one step closer to becoming a pro! 🎉"`
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

      {/* DAILY QUESTS CARD (section view) */}
      {hasSection && (
        <div className={styles.questsCard} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className={styles.cardHeaderWithLink}>
            <h4 className={styles.cardSectionTitle}>Daily Quests</h4>
          </div>

          {/* Quest 1: Complete 1 Lesson */}
          {(() => {
            const isFinished = sectionCompletedCount >= 1;
            const isClaimed = completedQuests.includes('daily-lesson');
            return (
              <div className={styles.questItem} style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
                <div className={styles.questIconWrapper}>
                  <span>🎯</span>
                </div>
                <div className={styles.questContent} style={{ width: '100%' }}>
                  <div className={styles.questInfoRow} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={styles.questTitle} style={{ fontWeight: 700, fontSize: '14px', color: '#071233' }}>Complete 1 Lesson</span>
                    <span className={styles.questProgressText} style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>
                      {Math.min(sectionCompletedCount, 1)} / 1
                    </span>
                  </div>
                  <div className={styles.questProgressBar} style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', margin: '6px 0 10px', overflow: 'hidden' }}>
                    <div className={styles.questProgressFill} style={{ height: '100%', backgroundColor: '#58cc02', width: `${isFinished ? 100 : 0}%` }} />
                  </div>
                  {isClaimed ? (
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#58cc02' }}>Claimed! ✓</span>
                  ) : isFinished ? (
                    <button
                      onClick={() => claimQuest('daily-lesson')}
                      style={{ backgroundColor: '#0172FD', border: 'none', borderBottom: '2.5px solid #0050B3', color: 'white', fontWeight: 800, fontSize: '11px', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      CLAIM +20 XP
                    </button>
                  ) : (
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>In Progress</span>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Quest 2: Earn 10 XP */}
          {(() => {
            const isFinished = sectionXpEarned >= 10;
            const isClaimed = completedQuests.includes('daily-consistent');
            return (
              <div className={styles.questItem}>
                <div className={styles.questIconWrapper}>
                  <span>💎</span>
                </div>
                <div className={styles.questContent} style={{ width: '100%' }}>
                  <div className={styles.questInfoRow} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={styles.questTitle} style={{ fontWeight: 700, fontSize: '14px', color: '#071233' }}>Earn 10 XP Today</span>
                    <span className={styles.questProgressText} style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>
                      {Math.min(sectionXpEarned, 10)} / 10
                    </span>
                  </div>
                  <div className={styles.questProgressBar} style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', margin: '6px 0 10px', overflow: 'hidden' }}>
                    <div className={styles.questProgressFill} style={{ height: '100%', backgroundColor: '#0172FD', width: `${Math.min((sectionXpEarned / 10) * 100, 100)}%` }} />
                  </div>
                  {isClaimed ? (
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#0172FD' }}>Claimed! ✓</span>
                  ) : isFinished ? (
                    <button
                      onClick={() => claimQuest('daily-consistent')}
                      style={{ backgroundColor: '#0172FD', border: 'none', borderBottom: '2.5px solid #0050B3', color: 'white', fontWeight: 800, fontSize: '11px', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      CLAIM +10 XP
                    </button>
                  ) : (
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>In Progress</span>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* DAILY REWARD LOGIN CHEST CARD */}
      <div 
        style={{ 
          backgroundColor: '#FFFDF5', 
          border: '2px solid #E2E8F0', 
          borderRadius: '16px', 
          padding: '16px', 
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'none',
          position: 'relative'
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes chestIdle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .chestAnimate {
            animation: chestIdle 2s infinite ease-in-out;
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
                  if (dailyRewardCyclePosition === 7) return "🔥 Day 7 Mystery Chest is ready!";
                  return "Claim your reward to build a daily habit!";
                } else {
                  if (dailyRewardCyclePosition === 1) return "Nice job! Mystery chest unlocked! 🎉";
                  return `Next chest in ${countdownStr}`;
                }
              })()}
            </span>
          </div>
          
          <div style={{ width: '64px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#A0A0A0', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                  D{dayNum}
                </span>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: isCompleted ? '#58cc02' : isActive ? '#FF8A00' : '#E2E8F0',
                    border: isActive ? '2px solid white' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isCompleted || isActive ? 'white' : '#A0A0A0',
                    fontWeight: 800,
                    fontSize: '11px',
                    boxShadow: isActive ? '0 0 8px rgba(255, 138, 0, 0.6)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isCompleted ? '✓' : dayNum === 7 ? '🎁' : dayNum}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleClaimReward}
          disabled={!isEligibleForReward}
          style={isEligibleForReward ? {
            width: '100%',
            backgroundColor: '#0172FD',
            border: 'none',
            borderBottom: '4px solid #0050B3',
            color: 'white',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '13px',
            padding: '12px',
            cursor: 'pointer',
            fontFamily: 'var(--font-jakarta), sans-serif',
            transition: 'transform 0.1s ease'
          } : {
            width: '100%',
            backgroundColor: '#E2E8F0',
            border: 'none',
            borderBottom: '4px solid #CBD5E1',
            color: '#A0A0A0',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '13px',
            padding: '12px',
            cursor: 'not-allowed',
            fontFamily: 'var(--font-jakarta), sans-serif'
          }}
        >
          {isEligibleForReward
            ? (dailyRewardCyclePosition === 7 ? 'CLAIM MYSTERY CHEST 🎉' : `CLAIM DAY ${dailyRewardCyclePosition} REWARD`)
            : (dailyRewardCyclePosition === 1 ? 'MYSTERY CHEST CLAIMED ✓' : 'CLAIMED ✓')
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
                <span className={styles.courseStatVal}>
                  💎 <strong>{totalXp} XP</strong>
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
            Let&apos;s Go! 🚀
          </button>
        </div>
      </div>
      )}

      {/* DAILY QUESTS CARD (default) */}
      {!hasSection && (
      <div className={styles.questsCard}>
        <div className={styles.cardHeaderWithLink}>
          <h4 className={styles.cardSectionTitle}>DAILY QUESTS</h4>
          <button
            onClick={() => triggerComingSoon('All Quests')}
            className={styles.cardViewAllBtn}
          >
            View All
          </button>
        </div>

        <div className={styles.questItem}>
          <div className={styles.questIconWrapper}>
            <span>💎</span>
          </div>
          <div className={styles.questContent}>
            <div className={styles.questInfoRow}>
              <span className={styles.questTitle}>Earn 10 XP</span>
              <span className={styles.questProgressText}>10/10</span>
            </div>
            <div className={styles.questProgressBar}>
              <div className={styles.questProgressFill} style={{ width: '100%' }} />
            </div>
          </div>
        </div>
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

      {/* DAILY REWARD CARD (default) */}
      {!hasSection && (
      <div className={styles.rewardCard}>
        <span className={styles.rewardHeader}>DAILY REWARD</span>
        <div className={styles.treasureBoxWrapper}>
          <span className={`${styles.sparkleStar} ${styles.sparkle1}`}>✨</span>
          <span className={`${styles.sparkleStar} ${styles.sparkle2}`}>✨</span>
          <span className={`${styles.sparkleStar} ${styles.sparkle3}`}>✨</span>
          <Image
            src="/Tressure box.png"
            alt="Treasure Box"
            width={120}
            height={100}
            className={styles.treasureBoxImage}
          />
        </div>
        <button
          onClick={handleClaimReward}
          className={styles.button3dWhiteReward}
        >
          Claim Reward
        </button>
      </div>
      )}
    </div>
  );
};
