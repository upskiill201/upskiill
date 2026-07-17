'use client';

import React, { useEffect, useState } from 'react';
import { 
  ChevronRight, 
  ArrowRight, 
  Lock, 
  Zap, 
  Bot
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { playHaptic } from '@/lib/haptics';
import { useComingSoon } from './layout';
import { getOnboardingState } from '@/lib/user-onboarding';
import styles from './Page.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const { triggerComingSoon } = useComingSoon();
  const [userName, setUserName] = useState('Joel');
  const [streakDays, setStreakDays] = useState(0);
  const [xpPoints, setXpPoints] = useState(0);
  const [livesCount, setLivesCount] = useState(5);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);

  useEffect(() => {
    // 1. Try to fetch user name from backend auth
    const fetchMe = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data?.fullName) {
            setUserName(data.fullName.split(' ')[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load user info', err);
      }
    };
    fetchMe();

    // 2. Read onboarding answers from localStorage to check user setup
    const state = getOnboardingState();
    if (state) {
      if (state.answers?.['1']?.name) {
        const localName = state.answers['1'].name as string;
        setUserName(localName.split(' ')[0]);
      }
    }

    // 3. Fetch user course enrollments
    const fetchEnrollments = async () => {
      try {
        const res = await fetch('/api/auth/me/enrollments', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setEnrollments(data);
        }
      } catch (err) {
        console.error('Failed to load enrollments', err);
      } finally {
        setLoadingEnrollments(false);
      }
    };
    fetchEnrollments();
  }, []);

  const getJourneyIcon = (category: string) => {
    const cat = (category || '').toLowerCase();
    if (cat === 'design') return '🚀';
    if (cat === 'development') return '💻';
    if (cat === 'business') return '🧠';
    if (cat === 'it & software') return '🤖';
    return '📚';
  };

  const getJourneyColor = (category: string) => {
    const cat = (category || '').toLowerCase();
    if (cat === 'design') return '#0172FD';
    if (cat === 'development') return '#22C55E';
    if (cat === 'business') return '#FF8A00';
    if (cat === 'it & software') return '#8B5CF6';
    return '#64748B';
  };

  const handleContinueLearning = () => {
    playHaptic('medium');
    if (enrollments.length > 0) {
      router.push(`/learn/${enrollments[0].course.id}`);
    } else {
      triggerComingSoon('Continue Learning: UI/UX Design');
    }
  };

  const handleJumpToUnit = (courseIdOrName: string) => {
    playHaptic('medium');
    if (courseIdOrName.includes('-')) {
      router.push(`/learn/${courseIdOrName}`);
    } else {
      triggerComingSoon(`Jump to Unit: ${courseIdOrName}`);
    }
  };

  const handleLetsGo = () => {
    playHaptic('medium');
    triggerComingSoon('Tey\'s Challenge: Let\'s Go!');
  };

  const handleClaimReward = () => {
    playHaptic('medium');
    triggerComingSoon('Daily Chest Reward');
  };

  const handleViewAllJourneys = () => {
    playHaptic('medium');
    router.push('/dashboard/journeys');
  };

  const currentEnrollment = enrollments.length > 0 ? enrollments[0] : null;
  const journeysToDisplay = enrollments.length > 0 ? enrollments.slice(0, 2) : [];

  return (
    <div className={styles.container}>
      
      {/* TOP HEADER ROW: Welcome greeting on left, Borderless Stats on right */}
      <div className={styles.topHeaderRow}>
        <div className={styles.welcomeBanner}>
          <h2 className={styles.welcomeTitle}>Welcome back, {userName}! 👋</h2>
          <p className={styles.welcomeSubtitle}>Let&apos;s keep your learning momentum going.</p>
        </div>

        {/* BORDERLESS TOP-RIGHT STATS ROW */}
        <div className={styles.statsRow}>
          {/* Streak */}
          <div className={styles.statItem} onClick={() => triggerComingSoon('Streak History')}>
            <span className={styles.statEmoji}>🔥</span>
            <div className={styles.statText}>
              <span className={styles.statVal}>{streakDays}</span>
              <span className={styles.statLabel}>Day Streak</span>
            </div>
          </div>

          {/* XP Balance */}
          <div className={styles.statItem} onClick={() => triggerComingSoon('XP Analytics')}>
            <span className={styles.statEmoji}>💎</span>
            <div className={styles.statText}>
              <span className={styles.statVal}>{xpPoints}</span>
              <span className={styles.statLabel}>XP Balance</span>
            </div>
          </div>

          {/* Lives */}
          <div className={styles.statItem} onClick={() => triggerComingSoon('Lives Refill')}>
            <span className={styles.statEmoji}>❤️</span>
            <div className={styles.statText}>
              <span className={styles.statVal}>{livesCount}</span>
              <span className={styles.statLabel}>Lives</span>
            </div>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN GRID CONTAINER (Desktop/Tablet) */}
      <div className={styles.dashboardGrid}>
        
        {/* MIDDLE COLUMN: Focus Content */}
        <div className={styles.middleColumn}>
          {/* CURRENT FOCUS CARD */}
          {currentEnrollment ? (
            <div className={styles.focusCard}>
              <div className={styles.focusCardLeft}>
                <span className={styles.focusHeader}>CURRENT FOCUS</span>
                <h3 className={styles.focusCourseTitle}>{currentEnrollment.course.title}</h3>
                <p className={styles.focusCourseDesc}>{currentEnrollment.course.shortDescription || currentEnrollment.course.subtitle}</p>
                
                {/* Focus Progress Bar */}
                <div className={styles.progressContainer}>
                  <div className={styles.progressBarWrapper}>
                    <div className={styles.progressBarFill} style={{ width: `${currentEnrollment.progress}%` }} />
                  </div>
                  <div className={styles.progressLabels}>
                    <span className={styles.progressPct}>{currentEnrollment.progress}% COMPLETE</span>
                    <span className={styles.progressUnit}>
                      LESSON {Math.round((currentEnrollment.progress / 100) * 25) || 1} / 25
                    </span>
                  </div>
                </div>

                {/* 3D Action Button */}
                <button 
                  onClick={handleContinueLearning}
                  className={styles.button3dPrimary}
                >
                  <span>Continue Learning</span>
                  <span className={styles.buttonIconCircle}>
                    <ArrowRight size={16} />
                  </span>
                </button>
              </div>

              {/* Focus Mascot Section */}
              <div className={styles.focusCardRight}>
                <div className={styles.mascotBubble}>
                  <span>Let&apos;s master {currentEnrollment.course.title.split(':')[0]} step-by-step!</span>
                  <div className={styles.mascotBubbleTail} />
                </div>
                <div className={styles.focusMascotImageWrapper}>
                  <Image 
                    src="/dashboard tey.png" 
                    alt="Tey Mascot" 
                    width={150} 
                    height={150} 
                    priority
                    className={styles.focusMascotImage}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.focusCard}>
              <div className={styles.focusCardLeft}>
                <span className={styles.focusHeader}>CURRENT FOCUS</span>
                <h3 className={styles.focusCourseTitle}>UI/UX Design</h3>
                <p className={styles.focusCourseDesc}>Mastering the fundamentals of digital interfaces.</p>
                
                {/* Focus Progress Bar */}
                <div className={styles.progressContainer}>
                  <div className={styles.progressBarWrapper}>
                    <div className={styles.progressBarFill} style={{ width: '65%' }} />
                  </div>
                  <div className={styles.progressLabels}>
                    <span className={styles.progressPct}>65% COMPLETE</span>
                    <span className={styles.progressUnit}>UNIT 4 / 12</span>
                  </div>
                </div>

                {/* 3D Action Button */}
                <button 
                  onClick={handleContinueLearning}
                  className={styles.button3dPrimary}
                >
                  <span>Continue Learning</span>
                  <span className={styles.buttonIconCircle}>
                    <ArrowRight size={16} />
                  </span>
                </button>
              </div>

              {/* Focus Mascot Section */}
              <div className={styles.focusCardRight}>
                <div className={styles.mascotBubble}>
                  <span>I can create intuitive user experiences with Figma.</span>
                  <div className={styles.mascotBubbleTail} />
                </div>
                <div className={styles.focusMascotImageWrapper}>
                  <Image 
                    src="/dashboard tey.png" 
                    alt="Tey Mascot" 
                    width={150} 
                    height={150} 
                    priority
                    className={styles.focusMascotImage}
                  />
                </div>
              </div>
            </div>
          )}

          {/* MY JOURNEYS SECTION */}
          <div className={styles.journeysSection}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>MY JOURNEYS</h4>
              <button 
                onClick={handleViewAllJourneys}
                className={styles.viewAllBtn}
              >
                View All
              </button>
            </div>

            <div className={styles.journeysList}>
              {journeysToDisplay.length > 0 ? (
                journeysToDisplay.map((enrollment) => (
                  <div key={enrollment.id} className={styles.journeyCard}>
                    <div className={styles.journeyCardLeft}>
                      <div className={styles.journeyIconWrapper}>
                        <span className={styles.journeyIcon}>
                          {getJourneyIcon(enrollment.course.category)}
                        </span>
                      </div>
                      <div className={styles.journeyInfo}>
                        <h5 className={styles.journeyTitle}>{enrollment.course.title}</h5>
                        <span className={styles.journeySubtitle}>
                          {enrollment.course.category} · {enrollment.course.level}
                        </span>
                      </div>
                    </div>
                    <div className={styles.journeyCardRight}>
                      <div className={styles.journeyProgressWrapper}>
                        <div className={styles.journeyProgressBar}>
                          <div 
                            className={styles.journeyProgressFill} 
                            style={{ 
                              width: `${enrollment.progress}%`, 
                              backgroundColor: getJourneyColor(enrollment.course.category) 
                            }} 
                          />
                        </div>
                      </div>
                      <button 
                        onClick={() => handleJumpToUnit(enrollment.course.id)}
                        className={styles.button3dOutline}
                      >
                        Jump to Unit
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {/* Journey 1 */}
                  <div className={styles.journeyCard}>
                    <div className={styles.journeyCardLeft}>
                      <div className={styles.journeyIconWrapper}>
                        <span className={styles.journeyIcon}>🚀</span>
                      </div>
                      <div className={styles.journeyInfo}>
                        <h5 className={styles.journeyTitle}>Startup Fundamentals</h5>
                        <span className={styles.journeySubtitle}>280 UNITS</span>
                      </div>
                    </div>
                    <div className={styles.journeyCardRight}>
                      <div className={styles.journeyProgressWrapper}>
                        <div className={styles.journeyProgressBar}>
                          <div className={styles.journeyProgressFill} style={{ width: '30%', backgroundColor: '#FF8A00' }} />
                        </div>
                      </div>
                      <button 
                        onClick={() => handleJumpToUnit('Startup Fundamentals')}
                        className={styles.button3dOutline}
                      >
                        Jump to Unit
                      </button>
                    </div>
                  </div>

                  {/* Journey 2 */}
                  <div className={styles.journeyCard}>
                    <div className={styles.journeyCardLeft}>
                      <div className={styles.journeyIconWrapper}>
                        <span className={styles.journeyIcon}>🧠</span>
                      </div>
                      <div className={styles.journeyInfo}>
                        <h5 className={styles.journeyTitle}>AI for Beginners</h5>
                        <span className={styles.journeySubtitle}>150 UNITS</span>
                      </div>
                    </div>
                    <div className={styles.journeyCardRight}>
                      <div className={styles.journeyProgressWrapper}>
                        <div className={styles.journeyProgressBar}>
                          <div className={styles.journeyProgressFill} style={{ width: '15%', backgroundColor: '#8B5CF6' }} />
                        </div>
                      </div>
                      <button 
                        onClick={() => handleJumpToUnit('AI for Beginners')}
                        className={styles.button3dOutline}
                      >
                        Jump to Unit
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* MASCOT CONSISTENCY MOTIVATION CARD */}
          <div className={styles.motivationCard}>
            <div className={styles.motivationMascotWrapper}>
              <Image 
                src="/User onbarding Assets/Step_7_tey_verified_state.webp" 
                alt="Tey Verified" 
                width={80} 
                height={80} 
                className={styles.motivationMascot}
              />
            </div>
            <div className={styles.motivationBubble}>
              <p>&ldquo;Consistency is the secret to mastery! You&apos;ve maintained your streak for {streakDays} {streakDays === 1 ? 'day' : 'days'}. Keep it up!&rdquo;</p>
              <div className={styles.motivationBubbleTail} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Stats & Quests */}
        <div className={styles.rightColumn}>
          {/* TEY'S MESSAGE CARD */}
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

          {/* DAILY QUESTS CARD */}
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
                <Zap size={18} className={styles.questLightningIcon} />
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

          {/* UNLOCK LEADERBOARDS CARD */}
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

          {/* DAILY REWARD CARD */}
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
        </div>

      </div>
    </div>
  );
}
