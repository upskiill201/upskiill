'use client';

import React, { useEffect, useState } from 'react';
import { 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { playHaptic } from '@/lib/haptics';
import { useComingSoon } from './layout';
import { getOnboardingState } from '@/lib/user-onboarding';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { StatPill } from '@/components/ui/StatPill';
import { useGamification } from '@/context/GamificationContext';
import styles from './Page.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const { triggerComingSoon } = useComingSoon();
  const { streakDays, xp: xpPoints, lives: livesCount } = useGamification();
  const [userName, setUserName] = useState('Joel');
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
      router.push('/learn/advanced-product-design-ux-strategy');
    }
  };

  const handleJumpToUnit = (courseIdOrName: string) => {
    playHaptic('medium');
    if (courseIdOrName && (courseIdOrName.includes('-') || courseIdOrName.startsWith('sec-') || courseIdOrName.length > 15)) {
      router.push(`/learn/${courseIdOrName}`);
    } else {
      router.push('/learn/advanced-product-design-ux-strategy');
    }
  };

  const handleViewAllJourneys = () => {
    playHaptic('medium');
    router.push('/dashboard/my-learning');
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
          <StatPill type="streak" value={streakDays} onClick={() => triggerComingSoon('Streak History')} />
          <StatPill type="gem" value={xpPoints} onClick={() => triggerComingSoon('XP Analytics')} />
          <StatPill type="lives" value={livesCount} onClick={() => triggerComingSoon('Lives Refill')} />
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
        <RightSidebar />

      </div>
    </div>
  );
}
