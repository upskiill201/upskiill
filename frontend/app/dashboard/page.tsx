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
import { StatsBar } from '@/components/ui/StatsBar';
import { useGamification } from '@/context/GamificationContext';
import { useTeyroLoader } from '@/components/providers/TeyroLoaderProvider';
import MomentumCard from '@/components/dashboard/v2/MomentumCard';
import RewardRunTestWidget from '@/components/dashboard/v2/RewardRunTestWidget';
import TodaysMissionsCard from '@/components/dashboard/v2/TodaysMissionsCard';
import MysteryChestCard from '@/components/dashboard/v2/MysteryChestCard';
import WeeklyProgressCard from '@/components/dashboard/v2/WeeklyProgressCard';
import NextAchievementCard from '@/components/dashboard/v2/NextAchievementCard';
import AlmostThereCard from '@/components/dashboard/v2/AlmostThereCard';
import ContinueLearningCarousel from '@/components/dashboard/v2/ContinueLearningCarousel';
import { getCachedUser, setCachedUser } from '@/lib/user-cache';
import styles from './Page.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const { triggerComingSoon } = useComingSoon();
  const { streakDays, xp: xpPoints, lives: livesCount, coins, userLevel } = useGamification();
  const [userName, setUserName] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);

  const { showLoader, showLoaderImmediate, hideLoader } = useTeyroLoader();

  useEffect(() => {
    // 1. Hydrate cached user on client mount safely to prevent SSR hydration mismatch
    const cached = getCachedUser();
    if (cached?.fullName) {
      setUserName(cached.fullName.split(' ')[0]);
    } else {
      const state = getOnboardingState();
      if (state?.answers?.['1']?.name) {
        setUserName((state.answers['1'].name as string).split(' ')[0]);
      }
    }

    // 2. Trigger loader with 15s hold configuration and suppressed connection check popups
    showLoader(undefined, false, 15000, true);

    // 2. Fetch all backend data (me & enrollments) in parallel
    const loadAllDashboardData = async () => {
      try {
        await Promise.allSettled([
          fetch('/api/auth/me', { credentials: 'include' })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
              if (data?.fullName) {
                setUserName(data.fullName.split(' ')[0]);
                setCachedUser(data);
              }
            }),
          fetch('/api/auth/me/enrollments', { credentials: 'include' })
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => {
              if (Array.isArray(data)) {
                setEnrollments(data);
              }
            }),
        ]);
      } catch (err) {
        console.error('Failed loading dashboard data', err);
      } finally {
        setLoadingEnrollments(false);
        // Hold loading screen for 15 seconds after all elements are loaded
        setTimeout(() => {
          hideLoader();
        }, 15000);
      }
    };

    loadAllDashboardData();
  }, [showLoader, hideLoader]);

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
    showLoaderImmediate(
      "Tey is preparing your custom learning path...",
      false, // Preserves desktop sidebar (replaces middle column + right sidebar)!
      15000, // 15 seconds display duration so user can comfortably read message
      true,  // Suppress connection check unless actual error occurs
      'working'
    );
    if (enrollments.length > 0) {
      router.push(`/learn/${enrollments[0].course.id}`);
    } else {
      router.push('/learn/advanced-product-design-ux-strategy');
    }
  };

  const handleJumpToUnit = (courseIdOrName: string) => {
    playHaptic('medium');
    showLoaderImmediate(
      "Tey is building your interactive practice cards...",
      false, // Preserves desktop sidebar
      15000, // 15 seconds display duration
      true,  // Suppress connection check unless actual error occurs
      'working'
    );
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
          <h2 className={styles.welcomeTitle}>
            Welcome back, {userName ? `${userName}! 👋` : <span className="inline-block w-28 h-7 bg-slate-200 animate-pulse rounded-md align-middle mx-1" />}
          </h2>
          <p className={styles.welcomeSubtitle}>Let&apos;s keep your learning momentum going.</p>
        </div>

        {/* BORDERLESS TOP-RIGHT STATS ROW */}
        <StatsBar />
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
                  <span>Let&apos;s master {currentEnrollment ? currentEnrollment.course.title.split(':')[0] : 'UI/UX'} step-by-step!</span>
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
                <span className={styles.focusHeader}>GET STARTED</span>
                <h3 className={styles.focusCourseTitle}>Welcome to Teyro!</h3>
                <p className={styles.focusCourseDesc}>You haven&apos;t enrolled in any courses yet. Explore our interactive catalog to start learning!</p>
                
                {/* 3D Action Button */}
                <button 
                  onClick={() => router.push('/courses')}
                  className={styles.button3dPrimary}
                  style={{ marginTop: '16px' }}
                >
                  <span>Explore Courses</span>
                  <span className={styles.buttonIconCircle}>
                    <ArrowRight size={16} />
                  </span>
                </button>
              </div>

              {/* Focus Mascot Section */}
              <div className={styles.focusCardRight}>
                <div className={styles.mascotBubble}>
                  <span>Pick a course from our catalog to start building skills!</span>
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

          {/* REWARDRUN LAB & TEST BENCH WIDGET */}
          <RewardRunTestWidget />

          {/* 1. MOMENTUM CARD */}
          <MomentumCard onAction={handleContinueLearning} />

          {/* 2. TODAY'S MISSIONS */}
          <TodaysMissionsCard />

          {/* 3. MYSTERY CHEST + WEEKLY PROGRESS (2-Column Grid Row) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <MysteryChestCard />
            <WeeklyProgressCard />
          </div>

          {/* 4. NEXT ACHIEVEMENT + ALMOST THERE (2-Column Grid Row) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <NextAchievementCard />
            <AlmostThereCard onAction={handleContinueLearning} />
          </div>

          {/* 5. CONTINUE LEARNING CAROUSEL */}
          <ContinueLearningCarousel enrollments={enrollments} />

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
                <div style={{ padding: '24px', textAlign: 'center', background: '#FFFFFF', borderRadius: '16px', border: '1px dashed #CBD5E1', width: '100%' }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#475569' }}>
                    You haven&apos;t enrolled in any courses yet.
                  </p>
                  <button
                    onClick={() => router.push('/courses')}
                    style={{ marginTop: '12px', background: '#0172FD', color: '#FFFFFF', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Browse Catalog →
                  </button>
                </div>
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
