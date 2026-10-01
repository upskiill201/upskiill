'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Check, Lock, Star, BookText, X, PanelRightOpen } from 'lucide-react';
import { track } from '@/lib/tey-track';
import { playHaptic } from '@/lib/haptics';
import StudentShell, { useComingSoon } from '@/components/layout/StudentShell';
import TeyroBrandedLoader from '@/components/ui/TeyroBrandedLoader';
import LearnSectionSkeleton from './LearnSectionSkeleton';
import { prefetchLesson, takePrefetchedLesson } from '@/lib/path/lessonPrefetch';
import { StatsBar } from '@/components/ui/StatsBar';
import { usePostPaymentUnlock } from '@/hooks/usePostPaymentUnlock';
import { useCourseDetail, useCourseProgress, useCourseAccess } from '@/hooks/useCourse';
import { buildUnlockHref } from '@/lib/return-to';
import { fireConfetti } from '@/lib/confetti';
import { playAscendingPopSound } from '@/lib/audio/audioEvents';
import { playChestBurst, playSparkle } from '@/lib/audio/celebrationAudio';
import { pickLessonProgressLine, pickLessonReadyToUnlockLine, pickNodeUnlockLine } from '@/lib/tey/lessonVoice';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import TeyLessonCoach from '@/components/learn/TeyLessonCoach';
import { useGamification } from '@/context/GamificationContext';
import { CURRENCY_ICONS } from '@/components/celebration/currency';
import { useCelebration } from '@/context/CelebrationContext';
import styles from './SectionView.module.css';

const cleanHtml = (rawStr: string) => {
  if (!rawStr) return '';
  // Safely strip HTML tags using regex
  let cleaned = rawStr.replace(/<\/?[^>]+(>|$)/g, '');
  // Decode common HTML entities
  cleaned = cleaned.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  return cleaned;
};


const SPRING_BOUNCE = { type: 'spring', stiffness: 400, damping: 22 } as const;
const SPRING_GENTLE = { type: 'spring', stiffness: 280, damping: 28 } as const;

const pageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ...SPRING_GENTLE, staggerChildren: 0.05 } },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 16 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { ...SPRING_BOUNCE, delay: i * 0.05 },
  }),
};

// Sinusoidal offsets for serpentine zig-zag
const getSerpentineMultiplier = (index: number) => {
  const cycle = index % 8;
  switch (cycle) {
    case 0: return 0;      // Center
    case 1: return 2.2;    // Right
    case 2: return 3.6;    // Extreme Right
    case 3: return 1.8;    // Right-Center
    case 4: return -1.8;   // Left-Center
    case 5: return -3.6;   // Extreme Left
    case 6: return -2.2;   // Left
    case 7: return 0;      // Center
    default: return 0;
  }
};

const getLessonColorTheme = (index: number) => {
  const themes = [
    { main: '#58cc02', shadow: '#46a302' }, // Green
    { main: '#1cb0f6', shadow: '#1899d6' }, // Blue
    { main: '#ff9600', shadow: '#e67e00' }, // Orange
    { main: '#ff4b4b', shadow: '#ea2b2b' }, // Red
    { main: '#a346ff', shadow: '#7e22ce' }, // Purple
  ];
  return themes[index % themes.length];
};

/* ─── SIDEBAR PROGRESS COMPONENT ─────────────────────────────────── */
/**
 * What the learner sees between START and the lesson: the lesson start
 * screen's own header, with the body still loading. Shaped like the lesson,
 * not the map, so arriving from home never flashes the section map first.
 * Title is optional — the page-level loading state renders this before the
 * course (and so the unit title) has arrived.
 */
export function LessonEntryLoading({ unitLabel, title }: { unitLabel?: string; title?: string }) {
  return (
    <div className={styles.container} aria-busy="true" aria-label="Opening your lesson">
      <div className={styles.lessonPlayerInnerContainer}>
        <div className={styles.duolingoHeader}>
          <div className={styles.headerLeft}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {unitLabel ? (
                <span style={{ color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', fontSize: 11, fontWeight: 800, letterSpacing: '0.05em' }}>
                  {unitLabel}
                </span>
              ) : (
                <span className="block h-3 w-16 rounded-full bg-white/35 animate-pulse" />
              )}
              {title ? (
                <h1 className={styles.headerTitleText} style={{ color: 'white', margin: 0 }}>
                  {title}
                </h1>
              ) : (
                <span className="block h-5 w-56 rounded-md bg-white/40 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Learn · Apply · Reflect · Deepen, and the lesson card, pulsing. */}
        <div className="flex justify-between px-6 pt-6">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="block w-12 h-12 rounded-full bg-[var(--border)] animate-pulse" style={{ animationDelay: `${i * 90}ms` }} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-3 px-6 pt-12">
          <span className="block h-6 w-24 rounded-full bg-[var(--border)] animate-pulse" />
          <span className="block h-7 w-4/5 max-w-[420px] rounded-lg bg-[var(--border)] animate-pulse" />
          <span className="block h-4 w-3/5 max-w-[320px] rounded-md bg-[var(--border)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

interface SectionSidebarProps {
  completedCount: number;
  totalLessons: number;
  progressPercent: number;
  xpPoints: number;
  triggerComingSoon: (title: string) => void;
  /** True once this browser already played the chest scene — no replay. */
  chestClaimed: boolean;
  /** Opens the section chest: replays the server-computed SECTION_COMPLETE payload. */
  onOpenChest: () => void;
}

function SectionSidebar({
  completedCount,
  totalLessons,
  progressPercent,
  xpPoints,
  triggerComingSoon,
  chestClaimed,
  onOpenChest,
}: SectionSidebarProps) {
  const isCompleted = progressPercent === 100;
  const xpEarned = completedCount * 20;

  const handleClaim = () => {
    playHaptic('medium');
    onOpenChest();
  };

  return (
    <div className={styles.sidebarColumn}>
      {/* SECTION PROGRESS CARD */}
      <div className={styles.sidebarCard}>
        <h4 className={styles.sidebarCardTitle}>Section Progress</h4>
        <div className={styles.progressHeaderRow}>
          <div className={styles.donutContainer}>
            <svg width="90" height="90" viewBox="0 0 100 100" className={styles.donutSvg}>
              {/* Background 3D Track Shadow */}
              <circle cx="50" cy="53" r="41" className={styles.donutBgShadow} strokeWidth="9" />
              {/* Background 3D Track Cap */}
              <circle cx="50" cy="50" r="41" className={styles.donutBg} strokeWidth="9" />
              
              {/* Progress 3D Fill Shadow */}
              <circle 
                cx="50" 
                cy="53" 
                r="41" 
                className={styles.donutFillShadow} 
                strokeWidth="9"
                strokeDasharray="257.61"
                strokeDashoffset={257.61 - (257.61 * progressPercent) / 100}
                transform="rotate(-90 50 51.5)"
              />
              {/* Progress 3D Fill Cap */}
              <circle 
                cx="50" 
                cy="50" 
                r="41" 
                className={styles.donutFill} 
                strokeWidth="9"
                strokeDasharray="257.61"
                strokeDashoffset={257.61 - (257.61 * progressPercent) / 100}
                transform="rotate(-90 50 50)"
              />
              {/* Glossy highlight arc for the candy 3D look */}
              <circle cx="50" cy="50" r="41" className={styles.donutGloss} strokeWidth="9" />
            </svg>
            <div className={styles.donutText}>
              <span className={styles.donutPct}>{progressPercent}%</span>
              <span className={styles.donutLabel}>COMPLETE</span>
            </div>
          </div>

          <div className={styles.progressStatsList}>
            <div className={styles.progressStatItem}>
              <span className={styles.progressStatVal}>
                <strong>{completedCount} / {totalLessons}</strong>
              </span>
              <span className={styles.progressStatLabel}>Lessons Completed</span>
            </div>
            
            <div className={styles.progressStatItem}>
              <span className={styles.progressStatVal}>
                <Image src="/Icons/gem.png" alt="" width={14} height={14} /> <strong>{xpEarned} XP</strong>
              </span>
              <span className={styles.progressStatLabel}>Earned</span>
            </div>

            <div className={styles.progressStatItem}>
              <span className={styles.progressStatSubText}>
                {isCompleted ? "Amazing! You've completed this section." : "Keep learning to complete the section!"}
              </span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => triggerComingSoon(isCompleted ? 'Review Section' : 'Continue Section')}
          className={styles.sidebarCardBtn3D}
        >
          {isCompleted ? 'Review Section' : 'Continue Section'}
        </button>
      </div>

      {/* TEY'S MESSAGE CARD */}
      <div className={styles.messageCard}>
        <div className={styles.messageCardContent}>
          <span className={styles.messageHeader}>TEY&apos;S MESSAGE</span>
          <p className={styles.messageText}>
            {isCompleted 
              ? `"Excellent work! You've completed this section. You're one step closer to becoming a pro! 🚀"`
              : `"Hey! You're doing great. Let's complete the next lesson and keep our momentum high!"`
            }
          </p>
          <button 
            onClick={() => triggerComingSoon("Let's Continue!")}
            className={styles.button3dWhite}
          >
            Let&apos;s Continue!
          </button>
        </div>
        <div className={styles.messageCardMascot}>
          <Image 
            src="/User onbarding Assets/Step_7_tey_verified_state.webp" 
            alt="Tey Mascot" 
            width={76} 
            height={76}
            className={styles.sidebarMascotImg}
            priority
          />
        </div>
      </div>

      {/* UNLOCK BONUS REWARD CARD */}
      <div className={styles.rewardCard}>
        <div className={styles.rewardCardContent}>
          <h4 className={styles.rewardCardTitle}>Unlock Bonus Reward!</h4>
          <p className={styles.rewardCardDesc}>
            Complete all lessons in this section to unlock a mystery chest.
          </p>
          
          <div className={styles.bonusProgressContainer}>
            <div className={styles.bonusProgressBar}>
              <div className={styles.bonusProgressFill} style={{ width: `${progressPercent}%` }} />
            </div>
            <span className={styles.bonusProgressText}>
              <strong>{completedCount} / {totalLessons}</strong> lessons completed
            </span>
          </div>

          <button
            disabled={!isCompleted || chestClaimed}
            onClick={handleClaim}
            className={isCompleted && !chestClaimed ? styles.button3dPrimaryFull : styles.button3dDisabledFull}
          >
            {chestClaimed ? 'Chest Claimed!' : 'Claim Reward'}
          </button>
        </div>

        <div className={styles.chestWrapper}>
          <Image 
            src="/Tressure box.webp" 
            alt="Mystery Chest" 
            width={90} 
            height={80}
            className={styles.chestImage}
            priority
          />
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION VIEW CONTENT ───────────────────────────────────────── */
export interface SectionViewContentProps {
  course: any;
  section: any;
  sectionIndex: number;
  completedLessons: string[];
  setCompletedLessons: React.Dispatch<React.SetStateAction<string[]>>;
  /**
   * Admin-only read-only lesson viewer (course review). When true:
   *  - lesson content is fetched from the admin endpoint instead of the
   *    student one (`openLesson`),
   *  - every mutating call site (complete-lesson, loseLife, refill/power-ups,
   *    the celebration chain, `window.dispatchEvent`, chest localStorage
   *    writes) is a no-op — "finishing" a lesson is pure navigation,
   *  - the out-of-lives/paywall UI never renders (not applicable to an admin).
   * Student-facing behaviour is untouched when this is false/absent.
   */
  adminReviewMode?: boolean;
  /** Lesson id to auto-open (via the admin endpoint) on mount in review mode. */
  reviewLessonId?: string;
  /** Review mode only: replaces every "close the lesson"/"back to map" action. */
  onReviewClose?: () => void;
  /** Review mode only: called instead of the student paywall/toast flow when the admin lesson fetch fails. */
  onReviewLoadError?: (message: string) => void;
}

export function SectionViewContent({
  course,
  section,
  sectionIndex,
  completedLessons,
  setCompletedLessons,
  adminReviewMode = false,
  reviewLessonId,
  onReviewClose,
  onReviewLoadError,
}: SectionViewContentProps) {
  // Use global gamification context for live XP, streak, and lives
  const { xp: xpPoints } = useGamification();
  const { celebrate } = useCelebration();
  const reducedMotion = useReducedMotion();
  const params = useParams();
  const router = useRouter();
  const { triggerComingSoon } = useComingSoon();
  const lessons = section.lessons || [];
  const mapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Read from the shared SWR cache (hooks/useCourse.ts) rather than a
  // private fetch — dedupes against the /learn/[id] page's identical
  // /access request instead of firing a second one for the same course.
  const { access: accessInfo, mutate: mutateAccess } = useCourseAccess(course?.id || (params.id as string));

  // ── Post-payment unlock watcher ─────────────────────────────────────────
  // After Stripe checkout the learner lands back here with ?payment=success,
  // but the entitlement is created by the STRIPE WEBHOOK, which may still be
  // in flight. The shared hook polls access briefly instead of showing the
  // paywall again to someone who just paid.
  usePostPaymentUnlock(course?.id || params.id, {
    onUnlocked: () => {
      mutateAccess();
      setLockedToast({ message: '🎉 Course unlocked — welcome back! Happy learning!', key: Date.now() });
      setTimeout(() => setLockedToast((prev) => (prev?.key ? null : prev)), 5000);
    },
    onExhausted: (message) => {
      setLockedToast({ message, key: Date.now() });
      setTimeout(() => setLockedToast((prev) => (prev?.key ? null : prev)), 6000);
    },
  });

  const completedInSection = lessons.filter((l: any) =>
    completedLessons.includes(l.id)
  ).length;
  const totalLessons = lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedInSection / totalLessons) * 100) : 0;

  const activeLessonIndex = lessons.findIndex(
    (l: any) => !completedLessons.includes(l.id)
  );
  const currentActiveLessonIndex = activeLessonIndex === -1 ? lessons.length - 1 : activeLessonIndex;

  /**
   * Is this lesson behind the paywall for THIS learner?
   *
   * Progress ("have you finished the previous lesson?") and entitlement ("have
   * you paid?") are two independent gates and must both be consulted. Deriving
   * lock state from progress alone silently unlocked the first paid lesson the
   * moment a learner finished the free preview, because the first incomplete
   * lesson is by definition never "ahead of" the progress cursor.
   *
   * The server remains the authority — this only decides what the map draws;
   * /api/courses/:id/lessons/:lessonId still 403s on its own.
   */
  const isPaywalled = useCallback(
    (lessonId: string) => {
      // Access not resolved yet: assume nothing is unlocked. Failing closed
      // here means a slow/failed access fetch shows a lock, never free content.
      if (!accessInfo) return true;
      if (accessInfo.hasAccess) return false;
      return !(accessInfo.freePreviewLessonIds ?? []).includes(lessonId);
    },
    [accessInfo],
  );

  const [activePopoverIndex, setActivePopoverIndex] = useState<number | null>(null);
  const [showGuidebook, setShowGuidebook] = useState(false);
  const [justUnlockedIndex, setJustUnlockedIndex] = useState<number | null>(null);
  // False for the whole anticipation window — the target node renders as
  // still-locked even though the data already unlocked it, so the payoff at
  // t=1400ms is the moment it visibly happens rather than a decoration on top
  // of an already-changed state. See the effect below for the full beat map.
  const [unlockRevealed, setUnlockRevealed] = useState(false);
  const [lockedToast, setLockedToast] = useState<{ message: string; key: number } | null>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);

  // ── Tey deep link: /learn/[id]/section/[n]?lesson=<lessonId> ──────────────
  // A push notification points at a specific unfinished lesson rather than the
  // section, so tapping it opens exactly what Tey was talking about.
  const teyDeepLinkAppliedRef = useRef(false);

  // ── Arriving for ONE lesson (START on home, or a Tey push) ────────────────
  // Captured once, on arrival: the deep-link effect below strips ?lesson=
  // from the URL right after opening it, and re-reading the URL then would
  // make the map flash back for a frame.
  const searchParams = useSearchParams();
  const [requestedLessonId] = useState<string | null>(() =>
    adminReviewMode ? null : searchParams.get('lesson'),
  );
  const [enteredFromHome] = useState(() => searchParams.get('from') === 'home');
  /** Set once the requested lesson has opened — or failed to. */
  const [deepLinkSettled, setDeepLinkSettled] = useState(false);

  /**
   * Leaving a lesson goes back where the learner came from. Arriving from
   * home means home — never the section map they didn't see on the way in.
   */
  const leaveLesson = useCallback(() => {
    if (enteredFromHome) {
      router.push('/dashboard');
      return;
    }
    setActiveLesson(null);
  }, [enteredFromHome, router]);
  useEffect(() => {
    if (teyDeepLinkAppliedRef.current) return;
    if (lessons.length === 0) return;

    const requestedLessonId = new URLSearchParams(window.location.search).get('lesson');
    if (!requestedLessonId) return;

    // One-shot: never re-fire on a back-navigation into this page.
    teyDeepLinkAppliedRef.current = true;

    const idx = lessons.findIndex((l: any) => l.id === requestedLessonId);
    // The security-relevant guard: a deep link must not become a way to skip
    // lesson sequencing (or the paywall behind it). An unknown or not-yet-
    // unlocked id falls through silently to the normal first-incomplete
    // behaviour rather than erroring — the lesson may simply have been
    // completed or unpublished since the notification was sent.
    if (idx === -1 || idx > currentActiveLessonIndex) return;

    // Open it through the guarded endpoint rather than handing over the
    // catalog object directly. Anyone can type ?lesson=<id>, so this path gets
    // the same server-side entitlement check (and 403 → unlock screen) as a
    // normal tap; short-circuiting it made the URL bar a paywall bypass.
    void openLesson(requestedLessonId).finally(() => setDeepLinkSettled(true));

    // Strip the param so a refresh does not re-enter the lesson. Rewrite the
    // CURRENT pathname rather than rebuilding it — this component does not have
    // the section index unpacked, and reconstructing a route is a good way to
    // introduce an off-by-one nobody notices until a learner is bounced.
    const search = new URLSearchParams(window.location.search);
    search.delete('lesson');
    search.delete('from');
    const query = search.toString();
    router.replace(
      `${window.location.pathname}${query ? `?${query}` : ''}`,
      { scroll: false },
    );
  }, [lessons, currentActiveLessonIndex, router]);

  // Tey's current line. `teyToken` lets the same line re-show (a second wrong
  // answer in a row would otherwise be a no-op, since the string is unchanged).
  const [teyLine, setTeyLine] = useState<string | null>(null);
  const [teyTone, setTeyTone] = useState<'neutral' | 'cheer' | 'nudge'>('neutral');
  const [teyToken, setTeyToken] = useState(0);
  const sayTey = useCallback((line: string, tone: 'neutral' | 'cheer' | 'nudge' = 'neutral') => {
    setTeyLine(line);
    setTeyTone(tone);
    setTeyToken((t) => t + 1);
  }, []);

  const isReviewMode = activeLesson ? completedLessons.includes(activeLesson.id) : false;


  // PHASE 1 & 3: Camera Auto-Scroll & Lock Shatter Audio Choreography
  //
  // The reveal used to be backwards: the node's color/icon already showed
  // "unlocked" the instant this screen mounted (React just renders whatever
  // `currentActiveLessonIndex` says right now), and the sound+confetti at
  // t=1400ms landed on top of a change that had already happened — a
  // decoration, not a cause. `unlockRevealed` below is what fixes that: while
  // it's false the node JSX (further down) is told to render as still-locked
  // even though the data already says otherwise, so the payoff at t=1400ms is
  // the moment the lock actually visibly breaks, not an afterthought.
  //
  // The three beats: t=0 the target node starts a quiet charging glow (pure
  // CSS, see .duoPedestalCharging) so the eye is drawn there before anything
  // happens — anticipation is what makes a payoff read as a payoff, not a
  // surprise. t=700ms a soft rising sparkle previews it's about to land.
  // t=1400ms the lock shatters: icon swap, chest-burst sound, confetti, Tey
  // reacts. t=3200ms everything settles back to normal chrome.
  useEffect(() => {
    if (!activeLesson && mapRef.current) {
      const targetNodeIdx = justUnlockedIndex !== null ? justUnlockedIndex : currentActiveLessonIndex;
      if (targetNodeIdx !== -1) {
        const nodeElem = nodeRefs.current[targetNodeIdx];
        if (nodeElem && mapRef.current) {
          const containerHeight = mapRef.current.clientHeight;
          const nodeTop = nodeElem.offsetTop;
          const targetScrollTop = Math.max(0, nodeTop - containerHeight / 2 + 75);

          // Phase 1: Smooth camera auto-scroll to center unlocked node dead-center
          mapRef.current.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth',
          });
        }
      }

      if (justUnlockedIndex !== null) {
        setUnlockRevealed(false);

        const anticipationTimer = setTimeout(() => {
          try {
            playSparkle();
          } catch {}
        }, 700);

        // Phase 3: Lock Shatter & Sound Timing (plays at exact peak moment: t = 1.4s)
        const unlockAudioTimer = setTimeout(() => {
          setUnlockRevealed(true);
          const item = mapItems[targetNodeIdx];
          // A sequence-reached lesson that's still behind the paywall never
          // actually unlocks here — `isLocked` (the real, data-driven value)
          // stays true regardless of `unlockRevealed`. Celebrating it anyway
          // (chest-burst, confetti, the wiggle, "next one's open!") would be
          // theater over a door that's still shut; the honest version tells
          // them it's reached and points at what actually opens it.
          const stillPaywalled = item?.type === 'lesson' && isPaywalled(item.id);
          if (stillPaywalled) {
            sayTey(pickLessonReadyToUnlockLine(), 'nudge');
            return;
          }
          try {
            playChestBurst();
            fireConfetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.5 },
              colors: ['#58CC02', '#0172FD', '#EAB308'],
            });
          } catch {}
          if (item?.type === 'lesson') {
            const isFirstEver = item.lessonIndex === 0 && completedInSection === 0;
            const isFinal = item.lessonIndex === totalLessons - 1;
            sayTey(pickNodeUnlockLine(isFirstEver ? 'first' : isFinal ? 'final' : 'mid'), 'cheer');
          }
        }, 1400);

        const resetTimer = setTimeout(() => {
          setJustUnlockedIndex(null);
        }, 3200);

        return () => {
          clearTimeout(anticipationTimer);
          clearTimeout(unlockAudioTimer);
          clearTimeout(resetTimer);
        };
      }
    }
    // mapItems/completedInSection/totalLessons/sayTey deliberately excluded:
    // `mapItems` (and the `lessons` array it's built from) get a new
    // reference most renders — see the pre-existing "could make deps change
    // every render" warning on `lessons` above. Adding it here would re-run
    // this effect on any unrelated re-render during the 1.4-3.2s unlock
    // window, clearing and rescheduling every timer from t=0 and potentially
    // never reaching the peak. The closure already reads their current
    // values correctly at the moment this effect actually runs (on
    // `justUnlockedIndex` changing) — only the *rerun trigger* needs to
    // stay narrow, not what the closure sees. `sayTey` is a stable
    // useCallback and safe to omit for the same "keep the trigger narrow"
    // reason.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLesson, currentActiveLessonIndex, justUnlockedIndex]);


  /** Close the lesson player and land back on the map with the unlock moment. */
  const returnToMapAfterLesson = () => {
    playHaptic('medium');
    const newlyUnlockedIdx = currentActiveLessonIndex + 1;
    setJustUnlockedIndex(newlyUnlockedIdx);
    setActiveLesson(null);
    try {
      playAscendingPopSound(4);
    } catch {}
    // Beat 0 — before the anticipation glow, before the reveal, Tey
    // acknowledges the effort with the real count ("2 of 5, good pace"),
    // not a generic "keep going." The reveal-peak line (pickNodeUnlockLine,
    // fired ~1.4s later by the node-unlock effect) is what's NEW; this one is
    // how they're DOING — the two together are the full narrative: earned,
    // then rewarded.
    sayTey(pickLessonProgressLine(completedInSection, totalLessons), 'cheer');
  };

  /** A finished lesson goes back where it was started from: home or this map. */
  const finishedLesson = () => {
    if (enteredFromHome) router.push('/dashboard');
    else returnToMapAfterLesson();
  };


  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // Close speech bubble when clicking outside the map area
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (mapRef.current && !mapRef.current.contains(e.target as Node)) {
        setActivePopoverIndex(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Assemble Duolingo mixed milestone track
  const mapItems = React.useMemo(() => {
    const items: any[] = [];
    let lessonCounter = 0;

    lessons.forEach((lesson: any, lIdx: number) => {
      items.push({
        type: 'lesson',
        id: lesson.id,
        title: lesson.title,
        shortDescription: lesson.shortDescription,
        xpReward: lesson.xpReward || 20,
        lessonIndex: lIdx,
      });
      lessonCounter++;

      // Every after two lessons, insert a challenge
      if (lessonCounter % 2 === 0 && lIdx < lessons.length - 1) {
        items.push({
          type: 'challenge',
          id: `challenge-${sectionIndex}-${lessonCounter}`,
          title: 'Unit Challenge',
          shortDescription: 'Test your skills in a rapid-fire review challenge!',
          xpReward: 30,
        });
      }
    });

    // Final Trophy checkpoint
    items.push({
      type: 'trophy',
      id: `trophy-${sectionIndex}`,
      title: 'Section Reward Chest',
      shortDescription: 'Complete all lessons in this unit to open the final reward chest!',
    });

    return items;
  }, [lessons, sectionIndex]);


  const handleNodeClick = (idx: number, isLocked: boolean, isPaywallLocked = false) => {
    if (isLocked) {
      if (isPaywallLocked) {
        // Reached this lesson in sequence, just hasn't paid for it — there's
        // somewhere to go, so send them there instead of a dead-end toast
        // that (incorrectly, for this case) tells them to finish lessons
        // they've already finished.
        playHaptic('light');
        router.push(
          buildUnlockHref(
            String(course?.id || params.id),
            `/learn/${params.id}/section/${sectionIndex}`,
          ),
        );
        return;
      }
      playHaptic('warning');
      setLockedToast({
        message: 'Complete preceding lessons to unlock this step! 🔒',
        key: Date.now(),
      });
      setTimeout(() => {
        setLockedToast((prev) => (prev?.key ? null : prev));
      }, 2500);
      return;
    }

    playHaptic('medium');
    setActivePopoverIndex(activePopoverIndex === idx ? null : idx);
  };

  /** Normalise contentBlocks once — every consumer below assumes an object. */
  const normalizeLesson = (raw: any) => {
    let blocks = raw?.contentBlocks;
    if (typeof blocks === 'string') {
      try { blocks = JSON.parse(blocks); } catch { blocks = {}; }
    }
    return { ...raw, contentBlocks: blocks || {} };
  };

  const [startingLesson, setStartingLesson] = useState(false);
  const [reviewLoadError, setReviewLoadError] = useState<string | null>(null);

  /**
   * Opens a lesson by fetching its FULL content. In review mode this hits the
   * admin lesson-content endpoint (`isAdmin` bypass, same response shape) so
   * an admin never touches the student paywall path; otherwise it fetches
   * from the guarded student endpoint. The catalog response no longer
   * carries paid lesson content, so the server is the single source of truth
   * for the paywall: 403 here means "this lesson is locked" and we route to
   * the full-page unlock experience (student mode only).
   */
  const openLesson = async (lessonId: string) => {
    if (startingLesson) return;
    setStartingLesson(true);
    if (adminReviewMode) setReviewLoadError(null);
    try {
      const endpoint = adminReviewMode
        ? `/api/admin/courses/${course?.id || params.id}/lessons/${lessonId}`
        : `/api/courses/${course?.id || params.id}/lessons/${lessonId}`;
      // A lesson prefetched on home (node tap) is handed over here, so START
      // doesn't wait on a fetch that already happened. Identical status
      // handling either way — a prefetched 403 still goes to the unlock page.
      const pending = adminReviewMode
        ? null
        : takePrefetchedLesson(String(course?.id || params.id), lessonId);
      const prefetched = pending ? await pending : null;
      const res = prefetched ? null : await fetch(endpoint, { credentials: 'include' });
      const status = prefetched ? prefetched.status : res!.status;
      if (status === 403) {
        if (adminReviewMode) {
          const msg = 'This lesson could not be loaded (access denied).';
          setReviewLoadError(msg);
          onReviewLoadError?.(msg);
          return;
        }
        playHaptic('light');
        router.push(
          buildUnlockHref(
            String(course?.id || params.id),
            `/learn/${params.id}/section/${sectionIndex}`,
          ),
        );
        return;
      }
      if (status < 200 || status >= 300) {
        if (adminReviewMode) {
          const msg = 'This lesson could not be loaded.';
          setReviewLoadError(msg);
          onReviewLoadError?.(msg);
          return;
        }
        triggerComingSoon('This lesson could not be loaded');
        return;
      }
      const fullLesson = normalizeLesson(prefetched ? prefetched.body : await res!.json());
      setActiveLesson(fullLesson);
      // Feeds Tey's LESSON_ABANDONED rule — a lesson opened with no later
      // completion. Skipped in admin review: that's an instructor reading
      // content, not a learner's activity signal.
      if (!adminReviewMode) {
        track('lesson_started', { entityType: 'lesson', entityId: lessonId });
      }
    } catch (err) {
      console.error('Failed to load lesson:', err);
      if (adminReviewMode) {
        const msg = 'Could not reach the lesson — check your connection';
        setReviewLoadError(msg);
        onReviewLoadError?.(msg);
        return;
      }
      triggerComingSoon('Could not reach the lesson — check your connection');
    } finally {
      setStartingLesson(false);
    }
  };

  // Review mode auto-opens the requested lesson on mount instead of waiting
  // for a map-node tap (the map is never rendered in review mode).
  useEffect(() => {
    if (!adminReviewMode || !reviewLessonId || activeLesson) return;
    void openLesson(reviewLessonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminReviewMode, reviewLessonId]);

  const handleStartAction = (item: any) => {
    playHaptic('medium');
    setActivePopoverIndex(null);
    if (item.type === 'lesson') {
      const exists = lessons.some((l: any) => l.id === item.id);
      if (exists) {
        void openLesson(item.id);
      } else {
        triggerComingSoon(`Lesson Player: ${item.title}`);
      }
    } else if (item.type === 'challenge') {
      triggerComingSoon('Challenges are coming soon!');
    } else if (item.type === 'chest' || item.type === 'trophy') {
      // Both chest nodes open the section chest — real server numbers only.
      handleOpenChest();
    } else if (item.type === 'book') {
      setShowGuidebook(true);
    } else {
      triggerComingSoon('Completing section and issuing Certificate!');
    }
  };

  // ── Section chest: replay the SERVER-computed completion summary ──────────
  // The bonus XP was already paid by completeLesson when the section finished;
  // this chest replays that real payload instead of the old fictional
  // +100/+50 modal. One playback per browser per section.
  const [chestClaimed, setChestClaimed] = useState(false);
  const chestSectionId = section?.id as string | undefined;
  useEffect(() => {
    // Unreachable in review mode (the map that renders chest nodes never
    // shows), guarded anyway so this never touches localStorage for an admin.
    if (!chestSectionId || adminReviewMode) return;
    try {
      if (localStorage.getItem(`teyro_section_chest_opened_${chestSectionId}`)) {
        setChestClaimed(true);
      }
    } catch {
      // Storage blocked — chest stays claimable; worst case it replays.
    }
  }, [chestSectionId]);

  const handleOpenChest = () => {
    if (adminReviewMode) return;
    let stash: Record<string, unknown> | null = null;
    try {
      const raw = chestSectionId
        ? localStorage.getItem(`teyro_section_chest_${chestSectionId}`)
        : null;
      if (raw) {
        const { savedAt, ...scenePayload } = JSON.parse(raw);
        stash = scenePayload;
      }
    } catch {
      // Corrupt entry → treat as missing.
    }

    if (!stash) {
      // Completed before this feature (or another device) — no stored truth,
      // so never invent numbers.
      triggerComingSoon('This chest was credited when you completed the section');
      return;
    }

    playHaptic('medium');
    celebrate({
      kind: 'SECTION_COMPLETE',
      ...stash,
    } as never);
    try {
      if (chestSectionId) {
        localStorage.setItem(`teyro_section_chest_opened_${chestSectionId}`, '1');
      }
    } catch {}
    setChestClaimed(true);
  };

  // Review mode never renders the map (there is nothing to navigate to
  // besides the one lesson it was opened for) — while that lesson is still
  // loading, show a plain loader instead of a flash of paywall/map UI.
  if (adminReviewMode && !activeLesson) {
    if (reviewLoadError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            minHeight: 400,
            textAlign: 'center',
            padding: 24,
          }}
        >
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--error-red, #B91C1C)', margin: 0 }}>
            {reviewLoadError}
          </p>
          {onReviewClose && (
            <button
              type="button"
              onClick={onReviewClose}
              style={{
                border: 'none',
                borderRadius: 10,
                padding: '10px 20px',
                background: '#3D5AFE',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Back to course
            </button>
          )}
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <TeyroBrandedLoader />
      </div>
    );
  }

  // Arrived for one lesson, and it's one this learner may open: show the
  // lesson's own loading screen — never the map — until it opens. An unknown
  // or not-yet-unlocked id is ignored by the deep-link effect, so this falls
  // through to the map exactly as before.
  const requestedIdx = requestedLessonId
    ? lessons.findIndex((l: { id: string }) => l.id === requestedLessonId)
    : -1;
  const awaitingRequestedLesson =
    requestedIdx !== -1 &&
    requestedIdx <= currentActiveLessonIndex &&
    !activeLesson &&
    !deepLinkSettled;
  if (awaitingRequestedLesson) {
    return <LessonEntryLoading unitLabel={`UNIT ${sectionIndex + 1}`} title={section.title} />;
  }

  return (
    <motion.div
      className={styles.container}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
       {/* Stats bar — only shown on the milestone map screen */}
      {!activeLesson && (
        <div className={styles.topRow}>
          <Link href={`/learn/${params.id}`} onClick={() => playHaptic('light')} className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to Course</span>
          </Link>

          {/* Live stats bar — all five user stats, mirrors the dashboard homescreen */}
          <StatsBar className={styles.topRowStats} />
        </div>
      )}


      {/* Grid */}
      <div className={styles.grid}>
        
        {/* Main Column */}
        <div className={styles.mainColumn}>
          {activeLesson ? (
            <LessonPlayer
              key={activeLesson.id}
              lesson={activeLesson}
              courseId={String(course?.id || params.id)}
              isReview={isReviewMode}
              adminReviewMode={adminReviewMode}
              onExit={() => { if (adminReviewMode) { onReviewClose?.(); } else { leaveLesson(); } }}
              onCompleted={(id) => setCompletedLessons((prev) => (prev.includes(id) ? prev : [...prev, id]))}
              onFinished={() => { if (adminReviewMode) { onReviewClose?.(); } else { finishedLesson(); } }}
              returnHome={enteredFromHome}
            />
          ) : (
            <>
              {/* Tey reacting to a node unlocking — fixed variant since the
                  map has no LessonShell ancestor for the anchored one to
                  position against. */}
              <TeyLessonCoach message={teyLine} token={teyToken} tone={teyTone} variant="fixed" />

              {/* Duolingo Green Header */}
              <motion.div className={styles.duolingoHeader} variants={nodeVariants} custom={0}>
                <div className={styles.headerLeft}>
                  <Link href={`/learn/${params.id}`} className={styles.headerBackBtn}>
                    <ArrowLeft size={18} strokeWidth={3} />
                    <span>UNIT {sectionIndex + 1}</span>
                  </Link>
                  <h1 className={styles.headerTitleText}>
                    {section.title}
                  </h1>
                </div>
                
                <button 
                  type="button" 
                  className={styles.guidebookBtn}
                  onClick={() => { playHaptic('medium'); setShowGuidebook(true); }}
                >
                  <BookText size={18} strokeWidth={2.5} />
                  <span>GUIDEBOOK</span>
                </button>
              </motion.div>

              {/* Locked Node Toast Feedback */}
              <AnimatePresence>
                {lockedToast && (
                  <motion.div
                    key={lockedToast.key}
                    className={styles.lockedToastBanner}
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <span>{lockedToast.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Serpentine Map Container — scrolls independently */}
              <div className={styles.journeyPathContainer} ref={mapRef}>
                
                {/* Always Visible Big Mascots on Left/Right Backdrop */}
                <div className={styles.pathMascotLeft}>
                    <Image
                      src="/User onbarding Assets/Step_7_tey_verified_state.webp"
                      alt="Tey Mascot Left"
                      width={100}
                      height={100}
                      className={styles.sideMascotImg}
                      priority
                    />
                </div>

                <div className={styles.pathMascotRight}>
                  <video
                    src="/Tey Expressions/lesson_map_animation_2.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.sideMascotVideo}
                  />
                </div>

                {mapItems.map((item: any, idx: number) => {
                  // Calculate status of the map item
                  let isCompleted = false;
                  let isActive = false;
                  let isLocked = false;

                  // Set below only for a `lesson` item, and only meaningful
                  // there — a node the learner has actually SEQUENCE-reached
                  // (index <= currentActiveLessonIndex) but hasn't paid for.
                  // `isLocked` below still folds this in (needed so the map
                  // never draws a paid lesson as freely open — see
                  // `isPaywalled`'s own comment on why that check exists at
                  // all), but tapping a node locked for THIS reason, unlike
                  // one that's genuinely not sequence-reached yet, has
                  // somewhere to go: the subscribe flow. Distinguishing it is
                  // what `handleNodeClick` uses to route there instead of the
                  // generic "complete preceding lessons" toast, which was
                  // previously shown here too — actively wrong copy for a
                  // lesson the learner already reached, and a dead end with
                  // no path to actually unlocking the course.
                  let isPaywallLocked = false;

                  if (item.type === 'lesson') {
                    isCompleted = completedLessons.includes(item.id);
                    isPaywallLocked =
                      item.lessonIndex <= currentActiveLessonIndex && isPaywalled(item.id);
                    // Locked when EITHER gate says so: sequencing (haven't
                    // reached it yet) or the paywall (haven't paid for it).
                    isLocked =
                      item.lessonIndex > currentActiveLessonIndex ||
                      isPaywalled(item.id);
                    isActive =
                      item.lessonIndex === currentActiveLessonIndex && !isLocked;
                  } else if (item.type === 'challenge') {
                    // Challenge unlocks once the lesson pair before it is done.
                    // mapItems always interleaves [lesson, lesson, challenge],
                    // so the node directly above (idx-1) IS that second lesson
                    // — matched by position and stable ids, never by title.
                    const prev = mapItems[idx - 1];
                    const prevLessonIdx = prev?.type === 'lesson' ? prev.lessonIndex : -1;
                    isCompleted =
                      prevLessonIdx >= 1 &&
                      completedLessons.includes(lessons[prevLessonIdx]?.id) &&
                      completedLessons.includes(lessons[prevLessonIdx - 1]?.id);
                    isActive =
                      !isCompleted &&
                      prevLessonIdx >= 0 &&
                      completedLessons.includes(lessons[prevLessonIdx]?.id);
                    isLocked = !isCompleted && !isActive;
                  } else if (item.type === 'trophy') {
                    isCompleted = progressPercent === 100;
                    isActive = !isCompleted && completedInSection === totalLessons;
                    isLocked = !isCompleted && !isActive;
                  }

                  const multiplier = getSerpentineMultiplier(idx);
                  const isPopoverOpen = activePopoverIndex === idx;

                  // Alternating layout sides: if wave shifts left (< 0), place bubble on right. Otherwise on left.
                  const isLeftBubble = multiplier >= 0;
                  const theme = item.type === 'lesson' ? getLessonColorTheme(item.lessonIndex) : { main: '#58cc02', shadow: '#46a302' };

                  // This node is mid-reveal: the data already says it's
                  // unlocked, but the anticipation window (see the effect
                  // above) hasn't reached its peak yet — render it as still
                  // locked so the peak is the moment it visibly changes, not
                  // a decoration on top of a change that already happened.
                  // A paywall lock isn't something that resolves via this
                  // animation at all — only payment changes it — so it never
                  // enters the "pretend still locked, then reveal" charade.
                  // It shows its real, distinct state immediately.
                  const isRevealPending = item.type === 'lesson' && justUnlockedIndex === idx && !unlockRevealed && !isPaywallLocked;
                  const displayLocked = isRevealPending ? true : isLocked;
                  const displayActive = isRevealPending ? false : isActive;

                  return (
                    <div 
                      key={item.id} 
                      ref={(el) => { nodeRefs.current[idx] = el; }}
                      className={styles.journeyNodeRow}
                      style={{ height: '150px' }}
                    >
                      
                      {/* Platform Anchor aligned in serpentine curve */}
                      <div 
                        className={styles.duoPlatformAnchor}
                        style={{ '--offset-multiplier': multiplier } as React.CSSProperties}
                      >
                        
                        {/* Floating Active Indicator — also fires for a
                            reached-but-paywalled lesson. Without this, that
                            node had no signal at all that it was reached
                            (displayActive is false there, same as a node the
                            learner hasn't gotten to yet) — just an identical
                            grey padlock with nothing to tell them tapping it
                            leads anywhere. */}
                        {(displayActive || isPaywallLocked) && !isPopoverOpen && (
                          <motion.div
                            className={styles.startBadgeBubble}
                            style={{ color: isPaywallLocked ? '#B45309' : theme.main }}
                            initial={{ scale: 0.8, y: 5 }}
                            animate={{ scale: [0.9, 1.1, 1], y: [0, -6, 0] }}
                            transition={{
                              scale: { duration: 0.4, ease: 'easeOut' },
                              y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                            }}
                          >
                            <span>
                              {isPaywallLocked
                                ? 'SUBSCRIBE TO UNLOCK 🔓'
                                : item.type === 'trophy'
                                ? 'SECTION CHEST!'
                                : item.type === 'challenge'
                                ? 'COMING SOON'
                                : item.lessonIndex === 0 && completedInSection === 0
                                ? 'START 🚀'
                                : item.lessonIndex === totalLessons - 1
                                ? 'FINAL LESSON! 🏆'
                                : 'LESSON UNLOCKED! 🔓'}
                            </span>
                            <div className={styles.badgeArrow} />
                          </motion.div>
                        )}

                        {/* Outer backing target dish ring (Active nodes only) */}
                        {displayActive && (
                          <div className={styles.activeTargetRing} />
                        )}

                        {/* 3D Platform representation according to milestone types */}
                        {item.type === 'lesson' ? (
                          <motion.button
                            type="button"
                            onClick={() => handleNodeClick(idx, isLocked, isPaywallLocked)}
                            className={`
                              ${styles.duoPedestal}
                              ${isCompleted ? styles.duoPedestalCompleted : displayActive ? styles.duoPedestalActive : isPaywallLocked ? styles.duoPedestalPaywalled : styles.duoPedestalLocked}
                              ${isRevealPending ? styles.duoPedestalCharging : ''}
                            `}
                            animate={unlockRevealed && justUnlockedIndex === idx && !isLocked && !reducedMotion ? {
                              scale: [1, 1.3, 0.9, 1.15, 1],
                              rotate: [0, -10, 10, -5, 5, 0],
                            } : undefined}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                            style={(!displayLocked) ? {
                              backgroundColor: theme.main,
                              boxShadow: `0 8px 0 ${theme.shadow}`,
                            } : undefined}
                            whileTap={{
                              y: 8,
                              boxShadow: '0 0px 0 transparent',
                            }}
                          >
                              <AnimatePresence mode="wait" initial={false}>
                                {isCompleted ? (
                                  <motion.span
                                    key="check"
                                    initial={{ scale: 0.3, rotate: -20, opacity: 0 }}
                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 420, damping: 16 }}
                                  >
                                    <Check size={32} strokeWidth={4} color="white" />
                                  </motion.span>
                                ) : displayActive ? (
                                  <motion.span
                                    key="star"
                                    initial={{ scale: 0.3, rotate: -20, opacity: 0 }}
                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 420, damping: 16 }}
                                  >
                                    <Star size={32} strokeWidth={3} fill="white" color="white" />
                                  </motion.span>
                                ) : (
                                  <motion.span
                                    key="lock"
                                    initial={{ scale: 1, rotate: 0, opacity: 1 }}
                                    exit={{ scale: 0.4, rotate: 25, opacity: 0 }}
                                    transition={{ duration: 0.18, ease: 'easeIn' }}
                                  >
                                    <Lock size={28} strokeWidth={2.5} color={isPaywallLocked ? '#FFFFFF' : '#afafaf'} />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                          </motion.button>
                        ) : item.type === 'challenge' ? (
                          <motion.button
                            type="button"
                            onClick={() => handleNodeClick(idx, isLocked)}
                            className={styles.chestNodeButton}
                            whileTap={!isLocked ? { scale: 0.92, y: 4 } : {}}
                          >
                            <Image 
                              src="/Tressure box.webp" 
                              alt="Mystery Chest" 
                              width={74} 
                              height={66}
                              className={`${styles.chestImage} ${isLocked ? styles.chestLockedImg : ''}`}
                            />
                          </motion.button>
                        ) : (
                          <motion.button
                            type="button"
                            onClick={() => handleNodeClick(idx, isLocked)}
                            className={styles.chestNodeButton}
                            whileTap={!isLocked ? { scale: 0.92, y: 4 } : {}}
                          >
                            <Image 
                              src="/Tressure box.webp" 
                              alt="Mystery Chest" 
                              width={74} 
                              height={66}
                              className={`${styles.chestImage} ${isLocked ? styles.chestLockedImg : ''}`}
                            />
                          </motion.button>
                        )}

                        {/* Permanent Lesson Info Card on Side (Desktop Only) */}
                        {item.type === 'lesson' && !isPopoverOpen && (
                          <div className={`
                            ${styles.nodeSideBubble} 
                            ${isLeftBubble ? styles.bubbleLeft : styles.bubbleRight}
                            ${isLocked ? styles.bubbleLocked : ''}
                          `}>
                            <h4 className={styles.bubbleTitle}>
                              {`${item.lessonIndex + 1}. ${item.title}`}
                            </h4>
                            <span className={styles.bubbleXp} style={{ color: theme.main }}>
                              XP +{item.xpReward} • <Image src={CURRENCY_ICONS.COINS} alt="" width={12} height={12} /> +5 Coins
                            </span>
                          </div>
                        )}

                        {/* Speech Bubble Popover dialog when selected */}
                        <AnimatePresence>
                          {isPopoverOpen && (
                            <motion.div 
                              className={`
                                ${styles.nodePopoverBubble}
                                ${item.type === 'lesson' ? (isLocked ? styles.popoverLocked : styles.popoverThemed) : ''}
                              `}
                              style={item.type === 'lesson' && !isLocked ? {
                                backgroundColor: theme.main,
                                borderColor: theme.main,
                                color: 'white',
                              } : undefined}
                              initial={{ opacity: 0, scale: 0.8, y: 15 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.85, y: 10 }}
                              transition={SPRING_BOUNCE}
                            >
                              <div 
                                className={styles.popoverArrowDown}
                                style={item.type === 'lesson' && !isLocked ? {
                                  backgroundColor: theme.main,
                                  borderColor: theme.main,
                                } : undefined}
                              />
                              
                              {item.type === 'lesson' ? (
                                isLocked ? (
                                  <>
                                    <h4 className={styles.popoverLockedTitle}>{item.title}</h4>
                                    <p className={styles.popoverLockedDesc}>Complete preceding lessons to unlock this!</p>
                                    <button className={styles.popoverLockedBtn} disabled>
                                      LOCKED
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <h4 className={styles.popoverThemedTitle}>{item.title}</h4>
                                    {item.shortDescription && (
                                      <p className={styles.popoverThemedDesc}>{cleanHtml(item.shortDescription)}</p>
                                    )}
                                    <button 
                                      className={styles.popoverThemedBtn}
                                      onClick={() => handleStartAction(item)}
                                      style={{
                                        color: theme.main,
                                        borderBottom: `4px solid ${theme.shadow}`,
                                      }}
                                    >
                                      START +{item.xpReward || 10} XP • <Image src={CURRENCY_ICONS.COINS} alt="" width={12} height={12} /> +5 COINS
                                    </button>
                                  </>
                                )
                              ) : (
                                // Fallback default rendering for challenges, trophies, etc.
                                <>
                                  <h4 className={styles.bubbleLessonTitle}>{item.title}</h4>
                                  <p className={styles.bubbleLessonDesc}>{cleanHtml(item.shortDescription)}</p>
                                  
                                  <div className={styles.bubbleFooter}>
                                    <span className={styles.bubbleRewardLabel}>
                                      {item.type === 'challenge' ? (
                                        <>
                                          <Image src={CURRENCY_ICONS.XP} alt="" width={12} height={12} /> +30 XP
                                        </>
                                      ) : 'Milestone'}
                                    </span>
                                    <button
                                      className={styles.bubbleStartBtn}
                                      onClick={() => handleStartAction(item)}
                                    >
                                      {item.type === 'challenge' ? 'COMING SOON' : 'OPEN'}
                                    </button>
                                  </div>
                                </>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>

                    </div>
                  );
                })}

              </div>
            </>
          )}
        </div>

        {/* Sidebar - Fixed (drawer on mobile) */}
        <div
          className={`${styles.rightColumn} ${mobileSidebarOpen ? styles.mobileSidebarOpen : ''}`}
        >
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className={styles.mobileSidebarClose}
            aria-label="Close panel"
          >
            <X size={20} />
          </button>

          {/* Live stats bar inside the lesson-player drawer — all five stats visible during lessons */}
          {activeLesson && (
            <div className={styles.drawerStatsRow}>
              <StatsBar compact />
            </div>
          )}

          <SectionSidebar
            completedCount={completedInSection}
            totalLessons={totalLessons}
            progressPercent={progressPercent}
            xpPoints={xpPoints}
            triggerComingSoon={triggerComingSoon}
            chestClaimed={chestClaimed}
            onOpenChest={handleOpenChest}
          />
        </div>
      </div>

      {/* Mobile gamified toggle for the progress/reward panel */}
      <button
        type="button"
        onClick={() => setMobileSidebarOpen(true)}
        className={styles.mobileSidebarFab}
        aria-label="Open progress panel"
      >
        <PanelRightOpen size={22} />
        {progressPercent > 0 && (
          <span className={styles.mobileSidebarFabBadge}>{progressPercent}%</span>
        )}
      </button>

      {/* Mobile drawer backdrop */}
      {mobileSidebarOpen && (
        <div
          className={styles.mobileSidebarBackdrop}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Guidebook Modal */}
      <AnimatePresence>
        {showGuidebook && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={SPRING_BOUNCE}
            >
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Guidebook</h3>
                <button 
                  onClick={() => setShowGuidebook(false)} 
                  className={styles.modalCloseBtn}
                >
                  <X size={20} />
                </button>
              </div>
              <div className={styles.modalBody}>
                <h4 className={styles.guideSectionTitle}>Section Overview</h4>
                <p className={styles.guideSectionText}>
                  {section.goal || `This section contains ${lessons.length} structured lesson${lessons.length === 1 ? '' : 's'}. Work through each step to master the material.`}
                </p>

                <h4 className={styles.guideSectionTitle}>Lessons in this Section</h4>
                <ul className={styles.guideConceptsList}>
                  {lessons.map((l: any, i: number) => (
                    <li key={l.id || i}>
                      <strong>{i + 1}. {l.title}</strong>
                      {l.shortDescription ? `: ${cleanHtml(l.shortDescription)}` : ''}
                    </li>
                  ))}
                </ul>

                {Array.isArray(course?.outcomes) && course.outcomes.length > 0 && (
                  <>
                    <h4 className={styles.guideSectionTitle}>What You&apos;ll Learn in this Course</h4>
                    <ul className={styles.guideConceptsList}>
                      {course.outcomes.slice(0, 6).map((o: string, i: number) => (
                        <li key={i}>{cleanHtml(String(o))}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── PAGE ENTRY ─────────────────────────────────────────────────── */
export default function SectionViewPage() {
  const params = useParams();
  const router = useRouter();
  // Arriving for one lesson (START on home): the loading state must look like
  // the lesson, not the map. useSearchParams (not window) so the server and
  // client render the same skeleton.
  const searchParams = useSearchParams();
  const arrivingForLesson = searchParams.has('lesson');

  // Arriving cold for one lesson (a Tey push, a fresh tab): fetch the lesson
  // NOW, alongside the course, instead of after it — the two used to run
  // back to back. SectionViewContent's openLesson picks this up. A no-op when
  // home already prefetched it on the node tap.
  const [arrivalLessonId] = useState(() => searchParams.get('lesson'));
  useEffect(() => {
    if (arrivalLessonId) prefetchLesson(String(params.id), arrivalLessonId);
  }, [arrivalLessonId, params.id]);
  // Shared SWR cache (hooks/useCourse.ts): dedupes against the /learn/[id]
  // page's identical /api/courses/:id and /progress fetches, and paints
  // instantly from cache on a repeat visit instead of blocking on network.
  const { course, error } = useCourseDetail(params.id as string);
  const { completedLessons, mutate: mutateProgress } = useCourseProgress(params.id as string);

  // Keeps the call-site shape SectionViewContent already used
  // (`setCompletedLessons(prev => [...prev, id])`) while writing the
  // optimistic update straight into the shared SWR cache entry.
  const setCompletedLessons = useCallback<React.Dispatch<React.SetStateAction<string[]>>>(
    (updater) => {
      mutateProgress(
        (current) => {
          const prevList = current?.completedLessons ?? [];
          const nextList = typeof updater === 'function' ? (updater as (prev: string[]) => string[])(prevList) : updater;
          return { ...(current ?? {}), completedLessons: nextList };
        },
        { revalidate: false },
      );
    },
    [mutateProgress],
  );

  const sectionIndex = parseInt(params.sectionIndex as string, 10);

  /* ── Loading state: only when there is truly no cached data yet ── */
  if (!course && !error) {
    return (
      <StudentShell isWide hideMobileChrome>
        {arrivingForLesson ? <LessonEntryLoading /> : <LearnSectionSkeleton />}
      </StudentShell>
    );
  }

  if (!course) {
    return (
      <StudentShell>
        <div className={styles.errorShell}>
          <h2>Course Not Found</h2>
          <button onClick={() => { playHaptic('light'); router.push('/dashboard/my-learning'); }} className={styles.errorBtn}>
            Back to My Learning
          </button>
        </div>
      </StudentShell>
    );
  }

  const sections = course.sections || course.curriculum || [];
  const section = sections[sectionIndex];

  if (!section) {
    return (
      <StudentShell>
        <div className={styles.errorShell}>
          <h2>Section Not Found</h2>
          <p>This section doesn&apos;t exist in the course.</p>
          <button onClick={() => { playHaptic('light'); router.push(`/learn/${params.id}`); }} className={styles.errorBtn}>
            Back to Course
          </button>
        </div>
      </StudentShell>
    );
  }

  return (
    <StudentShell isWide hideMobileChrome>
      <SectionViewContent
        course={course}
        section={section}
        sectionIndex={sectionIndex}
        completedLessons={completedLessons}
        setCompletedLessons={setCompletedLessons}
      />
    </StudentShell>
  );
}
