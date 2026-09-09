'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { X, Menu } from 'lucide-react';
import Image from 'next/image';
import { playHaptic } from '@/lib/haptics';
import { useComingSoon, useMobileMenu } from '@/components/layout/StudentShell';
import { getOnboardingState } from '@/lib/user-onboarding';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { StatsBar } from '@/components/ui/StatsBar';
import { useGamification } from '@/context/GamificationContext';
import { useTeyroLoader } from '@/components/providers/TeyroLoaderProvider';
import LevelProgressionBanner from '@/components/dashboard/v2/LevelProgressionBanner';
import CurrentQuestCard from '@/components/dashboard/v2/CurrentQuestCard';
import JourneyPathMap from '@/components/dashboard/v2/JourneyPathMap';
import TodaysMissionsCard from '@/components/dashboard/v2/TodaysMissionsCard';
import MonthlyQuestCard from '@/components/dashboard/v2/MonthlyQuestCard';
import MysteryChestCard from '@/components/dashboard/v2/MysteryChestCard';
import WeeklyProgressCard from '@/components/dashboard/v2/WeeklyProgressCard';
import LevelUpIncomingBanner from '@/components/dashboard/v2/LevelUpIncomingBanner';
import ContinueLearningCarousel from '@/components/dashboard/v2/ContinueLearningCarousel';
import PwaPushNudgeCard from '@/components/dashboard/v2/PwaPushNudgeCard';
import { getCachedUser, setCachedUser } from '@/lib/user-cache';
import { useMe } from '@/hooks/useMe';
import { useEnrollments } from '@/hooks/useCourse';
import NotificationBell from '@/components/community/NotificationBell';
import styles from './Page.module.css';

// Dev-only reward/celebration test bench. The component already self-guards on
// NEXT_PUBLIC_ENVIRONMENT and renders null in production, so this is not a
// behaviour change — but a static import still shipped all 586 lines of it, and
// its GSAP/celebration imports, into the dashboard bundle for every learner.
// Loading it dynamically behind the same guard means production never fetches it.
const RewardRunTestWidget = dynamic(
  () => import('@/components/dashboard/v2/RewardRunTestWidget'),
  { ssr: false },
);

export default function DashboardPage() {
  const router = useRouter();
  const { triggerComingSoon } = useComingSoon();
  const { openMobileMenu } = useMobileMenu();
  const { streakDays, xp: xpPoints, lives: livesCount, coins, userLevel } = useGamification();
  const [userName, setUserName] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { showLoader, showLoaderImmediate, hideLoader } = useTeyroLoader();

  // Shared with StudentShell — one request, not two.
  const { me } = useMe();
  // Shared SWR cache (hooks/useCourse.ts) — dedupes against My Learning's
  // identical /api/auth/me/enrollments fetch, and paints instantly on a
  // revisit to the dashboard instead of reloading from scratch.
  const { enrollments: enrollmentsData } = useEnrollments();
  const enrollments = enrollmentsData ?? [];

  useEffect(() => {
    if (me?.fullName) {
      setUserName(me.fullName.split(' ')[0]);
      setCachedUser(me);
    }
  }, [me]);

  useEffect(() => {
    // Hydrate cached user on client mount safely to prevent SSR hydration mismatch
    const cached = getCachedUser();
    if (cached?.fullName) {
      setUserName(cached.fullName.split(' ')[0]);
    } else {
      const state = getOnboardingState();
      if (state?.answers?.['1']?.name) {
        setUserName((state.answers['1'].name as string).split(' ')[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (enrollmentsData) {
      hideLoader(); // Only hide once data has actually resolved (fresh or cached).
      return;
    }
    // No cached data yet — trigger loader with suppressed connection-check
    // popups; loader hides itself the instant cached-or-fresh data lands above.
    showLoader(undefined, false, undefined, true);
  }, [enrollmentsData, showLoader, hideLoader]);

  const handleContinueLearning = () => {
    playHaptic('medium');
    showLoaderImmediate(
      "Tey is preparing your custom learning path...",
      false, // Preserves desktop sidebar (replaces middle column + right sidebar)!
      undefined, // No artificial hold — loader clears as soon as the next page's data resolves
      true,  // Suppress connection check unless actual error occurs
      'working'
    );
    if (enrollments.length > 0) {
      router.push(`/learn/${enrollments[0].course.id}`);
    } else {
      router.push('/learn/advanced-product-design-ux-strategy');
    }
  };

  const currentEnrollment = enrollments.length > 0 ? enrollments[0] : null;
  const currentTotalLessons = currentEnrollment?.course?.totalLessons || 25;
  const currentMissionNum = currentEnrollment
    ? Math.max(1, Math.round((currentEnrollment.progress / 100) * currentTotalLessons) || 12)
    : 12;

  return (
    <div className={styles.container}>
      
      {/* TOP GAME HUD ROW */}
      <div className={styles.topHeaderRow}>
        {/* MOBILE HUD CLUSTER: inline menu trigger + stat pills (Duolingo-style headerless home) */}
        <div className={styles.hudTopCluster}>
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => { playHaptic('light'); openMobileMenu(); }}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>

          {/* Bell sits OUTSIDE the drawer menu so notifications are always
              reachable on the headerless home (panel opens rightward, away
              from the left screen edge). */}
          <div className={styles.hudBell}>
            <NotificationBell panelAlign="left" />
          </div>

          {/* FLAT DUOLINGO-STYLE GAME HUD STAT PILLS */}
          <StatsBar className={styles.hudStats} />
        </div>

        <div className={styles.welcomeBanner}>
          <h2 className={styles.welcomeTitle}>
            Welcome back, {userName ? `${userName}!` : <span className="inline-block w-28 h-7 bg-slate-200 animate-pulse rounded-md align-middle mx-1" />}
          </h2>
          <p className={styles.welcomeSubtitle}>Let&apos;s keep your learning momentum going.</p>
        </div>
      </div>

      {/* TWO-COLUMN GRID CONTAINER (Desktop / Mobile) */}
      <div className={styles.dashboardGrid}>
        
        {/* MIDDLE COLUMN: GAME ACTION LOOP */}
        <div className={styles.middleColumn}>

          {/* iOS PWA install / push-permission nudge — only shows once the
              learner has completed a lesson, so it never competes with the
              onboarding flow's own Step 15 prompt for a brand-new signup. */}
          <PwaPushNudgeCard />

          {/* 1. LEVEL PROGRESSION BANNER */}
          <LevelProgressionBanner />

          {/* 2. CURRENT QUEST HERO CARD */}
          <CurrentQuestCard
            currentEnrollment={currentEnrollment}
            currentLessonIndex={currentMissionNum}
            onPlay={handleContinueLearning}
          />

          {/* 3. YOUR JOURNEY PATH MAP */}
          <JourneyPathMap
            currentEnrollment={currentEnrollment}
            currentLessonIndex={currentMissionNum}
            totalLessons={currentTotalLessons}
            onNodeClick={handleContinueLearning}
          />

          {/* 4. TODAY'S MISSIONS */}
          <TodaysMissionsCard />

          {/* 5. MONTHLY QUEST */}
          <MonthlyQuestCard />

          {/* 6. 2-COLUMN GAME GRID: MYSTERY CHEST + WEEKLY PROGRESS */}
          <div className={styles.gameCardsGrid}>
            <MysteryChestCard />
            <WeeklyProgressCard />
          </div>

          {/* 7. LEVEL UP INCOMING! BANNER */}
          <LevelUpIncomingBanner onPlay={handleContinueLearning} />

          {/* 8. CONTINUE LEARNING CAROUSEL */}
          <ContinueLearningCarousel enrollments={enrollments} />

          {/* 9. DEV TEST BENCH (Collapsible) */}

          {process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' && <RewardRunTestWidget />}

        </div>

        {/* RIGHT COLUMN: Sidebar Stats & Quests (Desktop View) */}
        <div className={styles.rightColumn}>
          <RightSidebar />
        </div>

      </div>

      {/* ─── MOBILE GAMIFIED SIDEBAR FLOATING ACTION BUTTON ─── */}
      <button
        type="button"
        onClick={() => {
          playHaptic('medium');
          setMobileSidebarOpen(true);
        }}
        className={styles.mobileSidebarFab}
        aria-label="Open Gamified Quests & Sidebar"
      >
        <Image src="/Tressure box.webp" width={26} height={26} alt="Quests" priority />
        <span className={styles.mobileSidebarFabBadge}>Quest HUD</span>
      </button>

      {/* ─── MOBILE SIDEBAR DRAWER OVERLAY ─── */}
      <div className={`${styles.mobileSidebarDrawer} ${mobileSidebarOpen ? styles.mobileSidebarDrawerOpen : ''}`}>
        <div className={styles.mobileSidebarHeader}>
          <div className={styles.drawerTitleRow}>
            <Image src="/Tressure box.webp" width={24} height={24} alt="Quests" />
            <span className={styles.mobileSidebarTitle}>Rewards & Quests</span>
          </div>
          <button 
            type="button" 
            onClick={() => {
              playHaptic('light');
              setMobileSidebarOpen(false);
            }} 
            className={styles.mobileSidebarCloseBtn}
            aria-label="Close drawer"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
        <div className={styles.mobileSidebarBody}>
          {/* Mounted only while the drawer is open — this drawer sits in the
              DOM at all times (for its slide-in transition), and mounting a
              second live RightSidebar unconditionally used to double every
              one of its network requests on every dashboard load. */}
          {mobileSidebarOpen && <RightSidebar />}
        </div>
      </div>
      {mobileSidebarOpen && (
        <div 
          className={styles.mobileSidebarBackdrop} 
          onClick={() => setMobileSidebarOpen(false)} 
        />
      )}
    </div>
  );
}
