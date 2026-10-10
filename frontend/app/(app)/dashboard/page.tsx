'use client';

/**
 * Home — the learning path, Duolingo-style.
 *
 * Home used to be a feed: nine stacked cards (level banner, quest hero,
 * journey strip, missions, monthly quest, chest, weekly progress, level-up
 * banner, carousel) running six phone-screens tall, with "take my next
 * lesson" as one card among nine. Now home IS the path:
 *
 *  - Phone: a sticky HUD (menu · course · streak · Coins · XP · hearts ·
 *    bell) and the winding road of lessons, landing on the next one.
 *  - Desktop: the road in the centre and Duolingo's right rail — stats,
 *    level, daily quests, chest.
 *  - The feed's other cards were not deleted: missions and the monthly quest
 *    live on the Quests tab, and the desktop rail keeps the daily ones.
 *
 * Open app → tap the glowing node → START. Two taps to a lesson.
 */

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { Menu, RotateCcw } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { useMobileMenu } from '@/components/layout/StudentShell';
import { StatsBar } from '@/components/ui/StatsBar';
import LevelProgressionBanner from '@/components/dashboard/v2/LevelProgressionBanner';
import DailyQuestsCard from '@/components/quests/DailyQuestsCard';
import DailyChestCard from '@/components/quests/DailyChestCard';
import NotificationBell from '@/components/community/NotificationBell';
import { CoursePicker } from '@/components/home/CoursePicker';
import { LearningPath } from '@/components/home/LearningPath';
import { PathSkeleton } from '@/components/home/PathSkeleton';
import { NewLearnerHome } from '@/components/home/NewLearnerHome';
import { ComingSoonPath } from '@/components/home/ComingSoonPath';
import { useMe } from '@/hooks/useMe';
import { getOnboardingState } from '@/lib/user-onboarding';
import { isLearningTrack } from '@/lib/path/trackCourse';
import { HOME_COURSE_KEY } from '@/lib/homeCourse';
import type { LearningCategory } from '@/lib/onboarding/types';
import {
  lessonHref,
  pickCurrentEnrollment,
  preloadCourse,
  useEnrollments,
  useLearningPath,
  type Enrollment,
} from '@/hooks/useCourse';

// Dev-only reward/celebration test bench. The component already self-guards on
// NEXT_PUBLIC_ENVIRONMENT and renders null in production, so this is not a
// behaviour change — but a static import still shipped all 586 lines of it, and
// its GSAP/celebration imports, into the dashboard bundle for every learner.
// Loading it dynamically behind the same guard means production never fetches it.
const RewardRunTestWidget = dynamic(
  () => import('@/components/dashboard/v2/RewardRunTestWidget'),
  { ssr: false },
);

// Treasure Chest scene bench. Separate from the widget above so it can be
// enabled in staging (NEXT_PUBLIC_SHOW_CHEST_BENCH) without exposing that
// widget's real-reward triggers. Self-guards and renders null when unset.
const TreasureChestBench = dynamic(
  () => import('@/components/dashboard/v2/TreasureChestBench'),
  { ssr: false },
);

/** Which course the path shows. A per-device convenience, so localStorage. */
const COURSE_KEY = HOME_COURSE_KEY;

/** The mobile HUD's height — sticky unit banners stop just under it. */
const MOBILE_HUD = 'calc(60px + env(safe-area-inset-top))';

export default function DashboardPage() {
  const router = useRouter();
  const { openMobileMenu } = useMobileMenu();

  const { enrollments, error: enrollmentsError } = useEnrollments();
  const { me } = useMe();

  // The learner's track (Coding / AI): their profile first, else the
  // onboarding answers on this device (a learner who just finished
  // onboarding may land here before the profile write is read back).
  const [localTrack] = useState<LearningCategory | null>(() => {
    if (typeof window === 'undefined') return null;
    const c = getOnboardingState().answers.category;
    return isLearningTrack(c) ? c : null;
  });
  const profileTrack = (me?.studentProfile as { learningTrack?: unknown } | null | undefined)?.learningTrack;
  const track: LearningCategory | null = isLearningTrack(profileTrack) ? profileTrack : localTrack;

  // Development-only preview of the new-learner home, for accounts that
  // already have courses: ?preview=new-coding | new-ai | new-none |
  // soon-coding | soon-ai. Inert everywhere else.
  const searchParams = useSearchParams();
  const preview =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? searchParams.get('preview') : null;
  const loadingEnrollments = enrollments === undefined && !enrollmentsError;

  // ── Which course the path shows ─────────────────────────────────────────
  // Default: the course you're partway through. A choice made in the course
  // picker sticks, as long as you're still enrolled in it.
  //
  // Read once at mount. Safe from hydration mismatch: the choice only matters
  // once enrollments have loaded, and they never exist on the first render
  // (server or client) — home's first frame is always the path skeleton.
  // ?course=<id> (courseHomeHref — every "go to this course" link) wins and
  // is remembered, the way picking it in the course picker would be.
  const courseParam = searchParams.get('course');
  const [chosenId, setChosenId] = useState<string | null>(() => {
    if (courseParam) return courseParam;
    try {
      return typeof window === 'undefined' ? null : localStorage.getItem(COURSE_KEY);
    } catch {
      return null; // Storage blocked — the default course is fine.
    }
  });
  useEffect(() => {
    if (!courseParam) return;
    setChosenId(courseParam);
    try {
      localStorage.setItem(COURSE_KEY, courseParam);
    } catch {
      // Not persisted; still shows this course for this visit.
    }
  }, [courseParam]);
  const active: Enrollment | null =
    enrollments?.find((e) => e.course.id === chosenId) ?? pickCurrentEnrollment(enrollments);
  const activeId = active?.course.id ?? null;

  const choose = (courseId: string) => {
    setChosenId(courseId);
    try {
      localStorage.setItem(COURSE_KEY, courseId);
    } catch {
      // Not persisted this time; still switches for this visit.
    }
  };

  const { path, error: pathError, mutate: retryPath } = useLearningPath(activeId);

  // Warm the lesson route for the next lesson — its data AND its code — so
  // START opens a painted lesson instead of a skeleton. (Next skips route
  // prefetch in `next dev`; it shows in production.)
  const nextHref = active?.nextLesson
    ? lessonHref(active.course.id, active.nextLesson.sectionIndex, active.nextLesson.id)
    : null;
  useEffect(() => {
    if (activeId) preloadCourse(activeId);
  }, [activeId]);
  useEffect(() => {
    if (nextHref) router.prefetch(nextHref);
  }, [nextHref, router]);

  const picker =
    active && enrollments && enrollments.length > 0 ? (
      <CoursePicker enrollments={enrollments} current={active} onSelect={choose} />
    ) : null;

  // ── The centre column ───────────────────────────────────────────────────
  let centre: React.ReactNode;
  const previewTrack = preview?.split('-')[1];
  if (preview?.startsWith('soon-') && isLearningTrack(previewTrack)) {
    centre = <ComingSoonPath track={previewTrack} stickyTop="var(--path-sticky-top)" />;
  } else if (preview?.startsWith('new-')) {
    centre = (
      <NewLearnerHome
        track={isLearningTrack(previewTrack) ? previewTrack : null}
        stickyTop="var(--path-sticky-top)"
        previewCourse={
          searchParams.get('course')
            ? { id: searchParams.get('course') as string, isWarmUp: searchParams.get('warmup') === '1' }
            : undefined
        }
      />
    );
  } else if (loadingEnrollments || (active && !path && !pathError)) {
    centre = <PathSkeleton />;
  } else if (!active) {
    // No course yet: their track's course, or its coming-soon path.
    centre = <NewLearnerHome track={track} stickyTop="var(--path-sticky-top)" />;
  } else if (pathError || !path) {
    centre = (
      <div className="py-16 text-center">
        <p className="text-[18px] font-extrabold text-ink">We couldn&apos;t load your path.</p>
        <p className="mt-2 text-[15px] text-ink-soft">Check your connection and try again.</p>
        <button
          type="button"
          onClick={() => {
            playHaptic('light');
            void retryPath();
          }}
          className="mt-5 inline-flex items-center gap-2 h-12 px-6 rounded-[14px] bg-brand text-white text-[15px] font-extrabold uppercase tracking-wide cursor-pointer"
          style={{ boxShadow: '0 4px 0 var(--color-brand-dark)' }}
        >
          <RotateCcw className="w-4 h-4 stroke-[3]" aria-hidden="true" />
          Try again
        </button>
      </div>
    );
  } else {
    // Keyed by course: switching courses remounts the path, so it lands on
    // the NEW course's next lesson instead of keeping the old scroll spot.
    centre = <LearningPath key={path.course.id} path={path} stickyTop="var(--path-sticky-top)" />;
  }

  return (
    <div
      className="relative [--path-sticky-top:calc(60px+env(safe-area-inset-top))] md:[--path-sticky-top:16px]"
    >
      {/* ═══ PHONE HUD — Duolingo's top bar ═══════════════════════════════
          Edge to edge: cancels the shell's 14px/16px mobile content padding. */}
      <div
        className="md:hidden sticky top-0 z-40 -mx-[14px] -mt-4 mb-2 px-2.5 bg-white border-b-2 border-[var(--border)]"
        style={{ paddingTop: 'env(safe-area-inset-top)', minHeight: MOBILE_HUD }}
      >
        <div className="h-[58px] flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              playHaptic('light');
              openMobileMenu();
            }}
            aria-label="Open menu"
            className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-ink hover:bg-slate-100 cursor-pointer"
          >
            <Menu className="w-6 h-6 stroke-[2.5]" />
          </button>
          {picker}
          <StatsBar compact show={['streak', 'coin', 'gem', 'lives']} className="flex-1 min-w-0 justify-evenly" />
          {/* ml keeps the bell's count badge off the hearts number. */}
          <div className="shrink-0 ml-2">
            <NotificationBell panelAlign="right" />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-10 xl:gap-14">
        {/* ═══ THE PATH ═══════════════════════════════════════════════════ */}
        {/* Not a <main>: the shell already provides the page's main landmark,
            and a nested second one confuses screen-reader navigation. */}
        <section id="home-path" aria-label="Your learning path" className="w-full max-w-[560px] min-w-0">
          {/* Tablet: no phone HUD and no right rail — stats go on top. */}
          <div className="hidden md:flex lg:hidden items-center justify-between gap-4 mb-4">
            {picker}
            <StatsBar />
          </div>

          {centre}

          {/* Dev-only benches: below the path, never in the rail, where
              their height pushed the learner's own stats off-screen. */}
          {process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' && <RewardRunTestWidget />}
          {(process.env.NEXT_PUBLIC_SHOW_CHEST_BENCH === 'true' ||
            process.env.NEXT_PUBLIC_ENVIRONMENT === 'development') && <TreasureChestBench />}
        </section>

        {/* ═══ RIGHT RAIL — desktop ═══════════════════════════════════════ */}
        {/* Sticky, and scrolls inside itself when taller than the window —
            otherwise its top (your stats) scrolls out of view while the
            path is centred on your lesson. */}
        <aside
          className="hidden lg:flex flex-col gap-5 w-[364px] shrink-0 sticky self-start overflow-y-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ top: 16, maxHeight: 'calc(100vh - 32px)' }}
          aria-label="Your stats and quests"
        >
          <div className="flex items-center justify-between gap-2">
            {picker}
            <StatsBar compact show={['streak', 'coin', 'gem', 'lives']} className="flex-1 justify-end" />
          </div>
          <LevelProgressionBanner />
          <DailyQuestsCard />
          <DailyChestCard />
        </aside>
      </div>
    </div>
  );
}
