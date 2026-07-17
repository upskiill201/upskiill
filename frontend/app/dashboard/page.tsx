'use client';

import React, { useEffect, useState } from 'react';
import { 
  ChevronRight, 
  ArrowRight, 
  Lock, 
  Flame, 
  Zap, 
  Heart,
  Bot
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { playHaptic } from '@/lib/haptics';
import { useComingSoon } from './layout';
import { getOnboardingState } from '@/lib/user-onboarding';
import styles from './Page.module.css';

export default function DashboardPage() {
  const { triggerComingSoon } = useComingSoon();
  const [userName, setUserName] = useState('Joel');
  const [userFullName, setUserFullName] = useState('Joel Ndakwe');
  const [streakDays, setStreakDays] = useState(12);
  const [xpPoints, setXpPoints] = useState(505);
  const [livesCount, setLivesCount] = useState(5);

  useEffect(() => {
    // 1. Try to fetch user name from backend auth
    const fetchMe = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data?.fullName) {
            setUserFullName(data.fullName);
            setUserName(data.fullName.split(' ')[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load user info', err);
      }
    };
    fetchMe();

    // 2. Read onboarding answers from localStorage to align state
    const state = getOnboardingState();
    if (state) {
      // If they completed onboarding steps, check for any custom stored values
      // We can also default to design mock values to guarantee visual alignment
      if (state.answers?.['1']?.name) {
        const localName = state.answers['1'].name as string;
        setUserName(localName.split(' ')[0]);
        setUserFullName(localName);
      }
    }
  }, []);

  const handleContinueLearning = () => {
    playHaptic('medium');
    triggerComingSoon('Continue Learning: UI/UX Design');
  };

  const handleJumpToUnit = (journeyName: string) => {
    playHaptic('medium');
    triggerComingSoon(`Jump to Unit: ${journeyName}`);
  };

  const handleLetsGo = () => {
    playHaptic('medium');
    triggerComingSoon('Tey\'s Challenge: Let\'s Go!');
  };

  const handleClaimReward = () => {
    playHaptic('medium');
    triggerComingSoon('Daily Chest Reward');
  };

  return (
    <div className={styles.container}>
      {/* THREE-COLUMN GRID CONTAINER (Desktop/Tablet) */}
      <div className={styles.dashboardGrid}>
        
        {/* MIDDLE COLUMN: Focus Content (approx 65% width on desktop) */}
        <div className={styles.middleColumn}>
          {/* Welcome back greeting */}
          <div className={styles.welcomeBanner}>
            <h2 className={styles.welcomeTitle}>Welcome back, {userName}! 👋</h2>
            <p className={styles.welcomeSubtitle}>Let&apos;s keep your learning momentum going.</p>
          </div>

          {/* CURRENT FOCUS CARD */}
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

          {/* MY JOURNEYS SECTION */}
          <div className={styles.journeysSection}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>MY JOURNEYS</h4>
              <button 
                onClick={() => triggerComingSoon('My Journeys Library')}
                className={styles.viewAllBtn}
              >
                View All
              </button>
            </div>

            <div className={styles.journeysList}>
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
              <p>&ldquo;Consistency is the secret to mastery! You&apos;ve maintained your streak for 12 days. Keep it up!&rdquo;</p>
              <div className={styles.motivationBubbleTail} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Stats & Quests (approx 35% width on desktop) */}
        <div className={styles.rightColumn}>
          {/* HEADER STATS ROW */}
          <div className={styles.statsRow}>
            {/* Streak */}
            <div className={styles.statPill} onClick={() => triggerComingSoon('Streak History')}>
              <Flame size={18} className={styles.statIconStreak} />
              <div className={styles.statPillText}>
                <span className={styles.statPillVal}>{streakDays}</span>
                <span className={styles.statPillLabel}>Day Streak</span>
              </div>
            </div>

            {/* XP Balance */}
            <div className={styles.statPill} onClick={() => triggerComingSoon('XP Analytics')}>
              <div className={styles.statIconXp}>
                <span className={styles.diamondPillIcon}>🔷</span>
              </div>
              <div className={styles.statPillText}>
                <span className={styles.statPillVal}>{xpPoints}</span>
                <span className={styles.statPillLabel}>XP Balance</span>
              </div>
            </div>

            {/* Lives */}
            <div className={styles.statPill} onClick={() => triggerComingSoon('Lives Refill')}>
              <Heart size={18} className={styles.statIconLives} />
              <div className={styles.statPillText}>
                <span className={styles.statPillVal}>{livesCount}</span>
                <span className={styles.statPillLabel}>Lives</span>
              </div>
            </div>
          </div>

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
                <div className={styles.leaderboardProgressFill} style={{ width: '33.3%' }} />
              </div>
              <span className={styles.leaderboardProgressText}><strong>1 / 3</strong> lessons completed</span>
            </div>
          </div>

          {/* DAILY REWARD CARD */}
          <div className={styles.rewardCard}>
            <span className={styles.rewardHeader}>DAILY REWARD</span>
            <div className={styles.treasureBoxWrapper}>
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
