'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Lock, Star, BookOpen, BookText, X, Swords, Info, PanelRightOpen, FileText, Video, Link as LinkIcon, Folder, LayoutTemplate, MessagesSquare, Shield } from 'lucide-react';
import { fetchInventory, usePowerUp } from '@/lib/shop/api';
import { playHaptic } from '@/lib/haptics';
import StudentShell, { useComingSoon } from '@/components/layout/StudentShell';
import Skeleton from '@/components/ui/Skeleton';
import TeyroBrandedLoader from '@/components/ui/TeyroBrandedLoader';
import LearnSectionSkeleton from './LearnSectionSkeleton';
import { StatsBar } from '@/components/ui/StatsBar';
import { usePostPaymentUnlock } from '@/hooks/usePostPaymentUnlock';
import { buildUnlockHref } from '@/lib/return-to';
import { fireConfetti } from '@/lib/confetti';
import { playWinSound } from '@/utils/audio';
import { playAscendingPopSound } from '@/lib/audio/audioEvents';
import { useGamification } from '@/context/GamificationContext';
import { CURRENCY_ICONS } from '@/components/celebration/currency';
import { useCelebration, type CelebrationScene, type CelebrationCurrency } from '@/context/CelebrationContext';
import DOMPurify from 'dompurify';
import styles from './SectionView.module.css';

const cleanHtml = (rawStr: string) => {
  if (!rawStr) return '';
  // Safely strip HTML tags using regex
  let cleaned = rawStr.replace(/<\/?[^>]+(>|$)/g, '');
  // Decode common HTML entities
  cleaned = cleaned.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  return cleaned;
};

/**
 * Sanitiser for anything rendered through dangerouslySetInnerHTML.
 *
 * NOTE: cleanHtml above must NEVER feed innerHTML — its order of operations
 * (strip tags, THEN decode entities) resurrects live tags out of encoded
 * ones (`&lt;img onerror&gt;` becomes a real element), which is precisely
 * the injection vector this closes. cleanHtml stays for plain-text-only
 * contexts such as parsePoint and React text children.
 */
const sanitizeHtml = (raw: string | null | undefined): string =>
  DOMPurify.sanitize(raw ?? '', { USE_PROFILES: { html: true } });

const parsePoint = (pointStr: string, index: number) => {
  const clean = cleanHtml(pointStr);
  
  // Regex to extract emoji at the start of the string
  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji})/u;
  const match = clean.match(emojiRegex);
  
  let emoji = '';
  let rest = clean;
  
  if (match) {
    emoji = match[1];
    rest = clean.slice(emoji.length).trim();
  }
  
  let title = rest;
  let desc = '';
  
  const separators = [' - ', ' : ', ': ', ' -'];
  for (const sep of separators) {
    if (rest.includes(sep)) {
      const parts = rest.split(sep);
      title = parts[0].trim();
      desc = parts.slice(1).join(sep).trim();
      break;
    }
  }
  
  const defaultEmojis = ['🎯', '💎', '⭐', '🔥', '🚀'];
  if (!emoji) {
    emoji = defaultEmojis[index % defaultEmojis.length];
  }
  
  const bgColors: { [key: string]: string } = {
    '🎯': '#F3E8FF',
    '💎': '#DCFCE7',
    '⭐': '#FEF9C3',
    '🔥': '#FFEDD5',
    '🚀': '#DBEAFE',
  };
  const bg = bgColors[emoji] || '#F1F5F9';
  
  return { emoji, title, desc, bg };
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
interface SectionViewContentProps {
  course: any;
  section: any;
  sectionIndex: number;
  completedLessons: string[];
  setCompletedLessons: React.Dispatch<React.SetStateAction<string[]>>;
}

function SectionViewContent({
  course,
  section,
  sectionIndex,
  completedLessons,
  setCompletedLessons,
}: SectionViewContentProps) {
  // Use global gamification context for live XP, streak, and lives
  const { xp: xpPoints, lives: livesCount, loseLife, applyLessonReward, refillLivesWithXp, userLevel, xpInCurrentLevel, streakDays, refresh } = useGamification();
  const { celebrate, closeAll: closeCelebrations } = useCelebration();
  const params = useParams();
  const router = useRouter();
  const { triggerComingSoon } = useComingSoon();
  const lessons = section.lessons || [];
  const mapRef = useRef<HTMLDivElement>(null);
  const xpCardRef = useRef<HTMLDivElement>(null);
  const coinCardRef = useRef<HTMLDivElement>(null);
  const lessonStartTimeRef = useRef<number>(Date.now());
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [accessInfo, setAccessInfo] = useState<{
    hasAccess: boolean;
    isInstructor?: boolean;
    isExpired?: boolean;
    freePreviewLessonIds?: string[];
  } | null>(null);

  const fetchAccess = useCallback(async () => {
    try {
      const res = await fetch(`/api/courses/${course?.id || params.id}/access`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setAccessInfo(data);
      }
    } catch (err) {
      console.error('Failed to fetch course access:', err);
    }
  }, [course?.id, params.id]);

  useEffect(() => {
    fetchAccess();
  }, [fetchAccess]);

  // ── Post-payment unlock watcher ─────────────────────────────────────────
  // After Stripe checkout the learner lands back here with ?payment=success,
  // but the entitlement is created by the STRIPE WEBHOOK, which may still be
  // in flight. The shared hook polls access briefly instead of showing the
  // paywall again to someone who just paid.
  usePostPaymentUnlock(course?.id || params.id, {
    onUnlocked: () => {
      fetchAccess();
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
  const [lockedToast, setLockedToast] = useState<{ message: string; key: number } | null>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [lessonPhase, setLessonPhase] = useState<'start' | 'learn' | 'apply' | 'reflect' | 'deepen'>('start');

  // ── Tey deep link: /learn/[id]/section/[n]?lesson=<lessonId> ──────────────
  // A push notification points at a specific unfinished lesson rather than the
  // section, so tapping it opens exactly what Tey was talking about.
  const teyDeepLinkAppliedRef = useRef(false);
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
    void openLesson(requestedLessonId);

    // Strip the param so a refresh does not re-enter the lesson. Rewrite the
    // CURRENT pathname rather than rebuilding it — this component does not have
    // the section index unpacked, and reconstructing a route is a good way to
    // introduce an off-by-one nobody notices until a learner is bounced.
    const search = new URLSearchParams(window.location.search);
    search.delete('lesson');
    const query = search.toString();
    router.replace(
      `${window.location.pathname}${query ? `?${query}` : ''}`,
      { scroll: false },
    );
  }, [lessons, currentActiveLessonIndex, router]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const isReviewMode = activeLesson ? completedLessons.includes(activeLesson.id) : false;

  useEffect(() => {
    if (activeLesson) {
      lessonStartTimeRef.current = Date.now();
    }
  }, [activeLesson]);

  // PHASE 1 & 3: Camera Auto-Scroll & Lock Shatter Audio Choreography
  useEffect(() => {
    if (lessonPhase === 'start' && mapRef.current) {
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

      // Phase 3: Lock Shatter & Sound Timing (plays at exact peak moment: t = 1.4s)
      if (justUnlockedIndex !== null) {
        const unlockAudioTimer = setTimeout(() => {
          try {
            playWinSound();
            fireConfetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.5 },
              colors: ['#58CC02', '#0172FD', '#EAB308'],
            });
          } catch {}
        }, 1400);

        const resetTimer = setTimeout(() => {
          setJustUnlockedIndex(null);
        }, 3200);

        return () => {
          clearTimeout(unlockAudioTimer);
          clearTimeout(resetTimer);
        };
      }
    }
  }, [lessonPhase, currentActiveLessonIndex, justUnlockedIndex]);

  const targetLevelXpNeeded = 100 * (userLevel || 1);
  const targetLevelPct = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / targetLevelXpNeeded) * 100)));

  let applyData = null;
  if (activeLesson?.contentBlocks?.apply && Array.isArray(activeLesson.contentBlocks.apply)) {
    applyData = activeLesson.contentBlocks.apply.find((b: any) => b.type === 'mcqActivity')?.value;
  }

  // NO fake fallback questions — if a creator hasn't built an Apply activity
  // for this lesson, we skip the phase entirely instead of quizzing students
  // on unrelated hardcoded content.
  const applyQuestions = applyData?.questions && Array.isArray(applyData.questions)
    ? applyData.questions.filter((q: any) => q?.questionText && Array.isArray(q.options) && q.options.length >= 2)
    : [];
  const hasApplyActivity = applyQuestions.length > 0;

  const applyScenario = applyData?.scenario || '';
  const currentQuestion = applyQuestions[currentQuestionIndex] || applyQuestions[0];

  // Auto-preselect saved correct answer when in Review Mode
  useEffect(() => {
    if (isReviewMode && lessonPhase === 'apply' && currentQuestion?.options) {
      const correctIdx = currentQuestion.options.findIndex((opt: any) => opt.id === currentQuestion.correctOptionId);
      if (correctIdx !== -1) {
        setSelectedOptionIndex(correctIdx);
        setIsAnswerChecked(true);
        setIsAnswerCorrect(true);
      }
    }
  }, [isReviewMode, lessonPhase, currentQuestionIndex, currentQuestion]);

  // Quiz performance tracking — feeds creator analytics (attempts + accuracy)
  const applyWrongCountRef = useRef(0);

  /** Set when a Perfect Lesson Protection charge ate a wrong answer. */
  const [shieldAbsorbed, setShieldAbsorbed] = useState(false);
  /** Lesson Retry charges held, fetched only when the learner runs dry. */
  const [retryCharges, setRetryCharges] = useState<number | null>(null);
  const [usingRetry, setUsingRetry] = useState(false);

  useEffect(() => {
    if (activeLesson) applyWrongCountRef.current = 0;
  }, [activeLesson]);

  useEffect(() => {
    if (!shieldAbsorbed) return;
    const timer = setTimeout(() => setShieldAbsorbed(false), 2600);
    return () => clearTimeout(timer);
  }, [shieldAbsorbed]);

  // Only ask what's in the locker at the moment it matters — running out of
  // hearts — rather than on every lesson load.
  useEffect(() => {
    if (livesCount !== 0 || lessonPhase !== 'apply' || retryCharges !== null) return;
    fetchInventory()
      .then((inv) => {
        const row = inv.items.find((i) => i.id === 'LESSON_RETRY');
        setRetryCharges(row?.quantity ?? 0);
      })
      .catch(() => setRetryCharges(0));
  }, [livesCount, lessonPhase, retryCharges]);

  const handleCheckAnswer = () => {
    if (selectedOptionIndex === null) return;
    playHaptic('medium');
    setIsAnswerChecked(true);
    const selectedOption = currentQuestion.options[selectedOptionIndex];
    const correct = selectedOption.id === currentQuestion.correctOptionId;
    setIsAnswerCorrect(correct);
    if (correct) {
      playWinSound();
    } else if (!isReviewMode) {
      applyWrongCountRef.current += 1;
      // A Perfect Lesson Protection charge may absorb this instead of costing
      // a heart. The server decides (it holds the charge count); we only
      // surface it, because a shield that saves you silently is a shield the
      // learner never knows they got value from.
      void loseLife().then((result) => {
        if (result?.shieldAbsorbed) setShieldAbsorbed(true);
      });
    }
  };

  const handleApplyContinue = () => {
    playHaptic('medium', false);
    if (currentQuestionIndex < applyQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerChecked(false);
      setIsAnswerCorrect(false);
    } else {
      setLessonPhase('reflect');
      setCurrentQuestionIndex(0);
      setSelectedOptionIndex(null);
      setIsAnswerChecked(false);
    }
  };

  // REFLECT STATE & LOGIC
  const [reflectionText, setReflectionText] = useState('');
  const [guidedAnswers, setGuidedAnswers] = useState<string[]>([]);

  let reflectData = null;
  if (activeLesson?.contentBlocks?.reflect && Array.isArray(activeLesson.contentBlocks.reflect)) {
    reflectData = activeLesson.contentBlocks.reflect.find((b: any) => b.type === 'reflectActivity')?.value;
  }
  
  const reflectPrompt = reflectData?.prompt || "What's one key takeaway from this lesson?";
  const reflectType = reflectData?.type || 'open';
  
  // Open config
  const reflectOpenConfig = reflectData?.openConfig || { useStarters: true, starters: [], minWordCount: 20 };
  const reflectMinWords = reflectOpenConfig.minWordCount;
  const reflectStarters = reflectOpenConfig.useStarters ? reflectOpenConfig.starters : [];
  
  // Guided config
  const reflectGuidedConfig = reflectData?.guidedConfig || { questions: [], minWordCountPerQuestion: 10 };
  
  useEffect(() => {
    if (reflectType === 'guided' && reflectGuidedConfig.questions.length > 0 && guidedAnswers.length === 0) {
      setGuidedAnswers(new Array(reflectGuidedConfig.questions.length).fill(''));
    }
  }, [reflectType, reflectGuidedConfig, guidedAnswers.length]);

  const handleGuidedAnswerChange = (index: number, text: string) => {
    setGuidedAnswers(prev => {
      const newArr = [...prev];
      newArr[index] = text;
      return newArr;
    });
  };

  const handleStarterClick = (starterText: string) => {
    setReflectionText(prev => {
      if (prev.includes(starterText)) return prev;
      return prev ? `${prev}\n${starterText} ` : `${starterText} `;
    });
  };

  let canSubmitReflect = false;
  if (reflectType === 'open') {
    const wordCount = reflectionText.trim().split(/\s+/).filter(w => w.length > 0).length;
    canSubmitReflect = wordCount >= reflectMinWords;
  } else if (reflectType === 'guided') {
    canSubmitReflect = guidedAnswers.length > 0 && guidedAnswers.every(ans => {
      const wc = ans.trim().split(/\s+/).filter(w => w.length > 0).length;
      return wc >= reflectGuidedConfig.minWordCountPerQuestion;
    });
  }

  const handleReflectSubmit = () => {
    if (canSubmitReflect) {
      playHaptic('success', false);
      setLessonPhase('deepen');
    }
  };

  const handleStepBack = () => {
    playHaptic('medium');
    if (lessonPhase === 'learn') {
      setLessonPhase('start');
    } else if (lessonPhase === 'apply') {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
        setSelectedOptionIndex(null);
        setIsAnswerChecked(false);
        setIsAnswerCorrect(false);
      } else {
        setLessonPhase('learn');
      }
    } else if (lessonPhase === 'reflect') {
      // Lessons without an Apply activity step back into Learn instead
      setLessonPhase(hasApplyActivity ? 'apply' : 'learn');
      if (hasApplyActivity) {
        // Go back to the last question of the apply step
        setCurrentQuestionIndex(applyQuestions.length - 1);
        setSelectedOptionIndex(null);
        setIsAnswerChecked(false);
        setIsAnswerCorrect(false);
      }
    } else if (lessonPhase === 'deepen') {
      setLessonPhase('reflect');
    }
  };

  const [selectedResource, setSelectedResource] = useState<any>(null);

  const deepenData = React.useMemo(() => {
    if (!activeLesson) return null;
    let parsedBlocks = activeLesson.contentBlocks;
    if (typeof parsedBlocks === 'string') {
      try { parsedBlocks = JSON.parse(parsedBlocks); } catch (e) {}
    }
    const deepenBlocks = parsedBlocks?.deepen;
    if (Array.isArray(deepenBlocks)) {
      return deepenBlocks.find((b: any) => b.type === 'deepenActivity')?.value;
    }
    return deepenBlocks?.deepenActivity || null;
  }, [activeLesson]);

  const deepenTitle = deepenData?.collectionTitle || 'More Rabbit Holes! 🐰';
  const deepenDesc = deepenData?.collectionDescription || 'Explore these helpful resources to master the topic.';

  const [isCompletingLesson, setIsCompletingLesson] = useState(false);
  const [finishError, setFinishError] = useState<string | null>(null);

  /** Close the lesson player and land back on the map with the unlock moment. */
  const returnToMapAfterLesson = () => {
    playHaptic('medium');
    const newlyUnlockedIdx = currentActiveLessonIndex + 1;
    setJustUnlockedIndex(newlyUnlockedIdx);
    setActiveLesson(null);
    setLessonPhase('start');
    try {
      playAscendingPopSound(4);
    } catch {}
  };

  const handleDeepenFinish = async () => {
    if (isCompletingLesson) return;
    setIsCompletingLesson(true);
    setFinishError(null);
    playHaptic('success');
    try {
      const res = await fetch(`/api/courses/${params.id}/complete-lesson`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: activeLesson.id,
          timezoneOffset: new Date().getTimezoneOffset(),
          // Real wall-clock time + quiz performance — feeds creator analytics
          timeSpentSeconds: Math.max(
            0,
            Math.round((Date.now() - lessonStartTimeRef.current) / 1000),
          ),
          ...(hasApplyActivity && applyQuestions.length > 0 && {
            attemptsCount: applyWrongCountRef.current + 1,
            quizScorePct: Math.round(
              ((applyQuestions.length - Math.min(applyWrongCountRef.current, applyQuestions.length)) /
                applyQuestions.length) * 100,
            ),
          }),
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (!completedLessons.includes(activeLesson.id)) {
          setCompletedLessons(prev => [...prev, activeLesson.id]);
        }
        // Instantly update global context with server-confirmed new totals
        if (data.newXp !== undefined && data.newStreakDays !== undefined) {
          applyLessonReward(data.newXp, data.newStreakDays, data.newCoins);
        }
        // Signal Today's Missions card to re-fetch or merge instantly
        window.dispatchEvent(new Event('lesson:completed'));
        if (data.missionsUpdated) {
          window.dispatchEvent(new CustomEvent('missions:updated', { detail: data.missionsUpdated }));
        }
        window.dispatchEvent(new Event('mission:refresh'));
        // Re-sync level/streak/coins from the server — a level-up here queues a
        // LEVEL_UP scene behind the payout chain below.
        void refresh();

        // ── The Celebration Engine owns the entire lesson-complete moment:
        // CLAIM (XP + coins payout with level progress) → STREAK EXTENDED
        // (first lesson today) → back to the map. No second victory screen —
        // that legacy screen double-celebrated and clashed audio with scenes.
        if (data.isNewCompletion !== false) {
          const newXp = typeof data.newXp === 'number' ? data.newXp : null;
          // Pin post-claim balances from the server so the count-up starts at
          // (total − earned); live balances were already optimistically bumped.
          const targetBalances: Partial<Record<CelebrationCurrency, number>> = {};
          if (newXp !== null) targetBalances.XP = newXp;
          if (typeof data.newCoins === 'number') targetBalances.COINS = data.newCoins;

          const claimScene: CelebrationScene = {
            kind: 'CLAIM',
            // No title override here on purpose — this is the real,
            // everyday lesson-complete moment, so it should get Tey's
            // pooled voice (lib/tey/xpClaimVoice.ts) instead of the same
            // fixed string every time.
            rewards: [
              { currency: 'XP', amount: data.xpEarned ?? (activeLesson?.xpReward || 20) },
              { currency: 'COINS', amount: data.coinsEarned ?? 5 },
            ],
            targetBalances,
            ...(newXp !== null && {
              levelProgress: {
                current: newXp % 100,
                target: 100,
                level: Math.floor(newXp / 100) + 1,
              },
            }),
            progressCaption:
              newXp !== null
                ? `LEVEL ${Math.floor(newXp / 100) + 1} · ${newXp % 100} / 100 XP`
                : undefined,
          };

          const scenes: CelebrationScene[] = [claimScene];
          if (data.isFirstStreakOfDay) {
            const todayIdx = (new Date().getDay() + 6) % 7; // Monday-first index
            scenes.push({
              kind: 'STREAK',
              mode: 'EXTENDED',
              days: data.newStreakDays ?? streakDays,
              weekDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, idx) => ({
                label,
                completed: idx <= todayIdx,
                isToday: idx === todayIdx,
              })),
            });
          }

          // ── Community unlock: the server seats a learner in their course
          // community on their SECOND completed lesson, and returns this
          // payload the one time it does. It plays before the section beats so
          // the chain still ends on a navigation scene.
          const cu = data.communityUnlock;
          if (cu) {
            scenes.push({
              kind: 'COMMUNITY_WELCOME',
              communityId: cu.communityId,
              courseId: cu.courseId,
              name: cu.name,
              courseTitle: cu.courseTitle,
              thumbnailUrl: cu.thumbnailUrl ?? null,
              memberCount: cu.memberCount,
              postCount: cu.postCount,
              instructor: cu.instructor ?? null,
              members: cu.members ?? [],
              samplePost: cu.samplePost ?? null,
              onEnter: () => {
                // Walking into the community ends the celebration chain — any
                // section scenes still queued behind this one would otherwise
                // replay on top of the page the learner just chose to open.
                closeCelebrations();
                router.push(`/dashboard/community/${cu.courseId}?compose=1`);
              },
              dedupeKey: `community-welcome-${cu.communityId}`,
            });
          }

          // ── Section milestone: this lesson was the LAST published lesson of
          // its section. The server computed the whole summary (progress
          // before/after, next-section preview), so every number below is
          // truth, never a client-side guess.
          const sc = data.sectionCompletion;
          if (sc) {
            // Persist the server-computed summary so the section chest can
            // replay the REAL numbers later (the +100/+50 modal was fiction —
            // the bonus XP was already paid at this very completion).
            try {
              localStorage.setItem(
                `teyro_section_chest_${sc.section.id}`,
                JSON.stringify({
                  courseTitle: sc.course.title,
                  sectionTitle: sc.section.title,
                  sectionIndexLabel: `SECTION ${sc.section.index + 1}`,
                  sectionProgress: {
                    lessonsCompleted: sc.section.lessonsCompleted,
                    lessonsTotal: sc.section.lessonsTotal,
                    ...(sc.section.activitiesTotal > 0 && {
                      activitiesCompleted: sc.section.activitiesCompleted,
                      activitiesTotal: sc.section.activitiesTotal,
                    }),
                  },
                  results: {
                    xpEarned: typeof data.xpEarned === 'number' ? data.xpEarned : 0,
                    bonusXp: sc.rewards.bonusXp,
                    coinsEarned: typeof data.coinsEarned === 'number' ? data.coinsEarned : 0,
                    streakDays: data.newStreakDays ?? streakDays,
                  },
                  savedAt: Date.now(),
                })
              );
            } catch {
              // Storage full/blocked — chest falls back to honest toast.
            }
            const next = sc.nextSection;
            scenes.push({
              kind: 'SECTION_COMPLETE',
              courseTitle: sc.course.title,
              sectionTitle: sc.section.title,
              sectionIndexLabel: `SECTION ${sc.section.index + 1}`,
              sectionProgress: {
                lessonsCompleted: sc.section.lessonsCompleted,
                lessonsTotal: sc.section.lessonsTotal,
                ...(sc.section.activitiesTotal > 0 && {
                  activitiesCompleted: sc.section.activitiesCompleted,
                  activitiesTotal: sc.section.activitiesTotal,
                }),
              },
              results: {
                xpEarned: typeof data.xpEarned === 'number' ? data.xpEarned : 0,
                bonusXp: sc.rewards.bonusXp,
                coinsEarned: typeof data.coinsEarned === 'number' ? data.coinsEarned : 0,
                streakDays: data.newStreakDays ?? streakDays,
              },
              dedupeKey: `section-complete-${sc.section.id}-${activeLesson.id}`,
            });
            scenes.push({
              kind: 'COURSE_PROGRESS',
              courseTitle: sc.course.title,
              from: sc.course.progressBefore,
              to: sc.course.progressAfter,
              sectionsCompleted: sc.course.sectionsCompleted,
              sectionsTotal: sc.course.sectionsTotal,
              lessonsCompleted: sc.course.lessonsCompleted,
              lessonsTotal: sc.course.lessonsTotal,
            });

            if (sc.isFinalSection || !next) {
              scenes.push({
                kind: 'COURSE_COMPLETE',
                courseTitle: sc.course.title,
                sectionsCompleted: sc.course.sectionsCompleted,
                sectionsTotal: sc.course.sectionsTotal,
                lessonsCompleted: sc.course.lessonsCompleted,
                lessonsTotal: sc.course.lessonsTotal,
                xpTotal: typeof data.newXp === 'number' ? data.newXp : 0,
                streakDays: data.newStreakDays ?? streakDays,
                onContinue: () => router.push(`/learn/${params.id}`),
              });
            } else {
              scenes.push({
                kind: 'SECTION_UNLOCKED',
                sectionIndexLabel: `SECTION ${next.index + 1}`,
                sectionTitle: next.title,
                description: next.description,
                lessonCount: next.lessonCount,
                estimatedMinutes: next.estimatedMinutes,
                onStartSection: () =>
                  router.push(`/learn/${params.id}/section/${next.index}`),
                onBackToCourse: () => router.push(`/learn/${params.id}`),
                dedupeKey: `section-unlock-${sc.section.id}`,
              });
            }
          }

          // Returning to the map is owned by the LAST scene's completion.
          const last = scenes[scenes.length - 1] as Extract<CelebrationScene, { onComplete?: () => void }>;
          last.onComplete = returnToMapAfterLesson;
          celebrate(scenes);
        } else {
          // Repeat completion (review mode): no payout to replay — head
          // straight back to the map with the unlock shatter.
          returnToMapAfterLesson();
        }
      } else if (res.status === 403) {
        // Server-side paywall refusal — surface it instead of faking success
        setFinishError('This lesson is locked. Unlock the full course to save your progress.');
      } else {
        setFinishError('Your progress could not be saved just now. Check your connection and tap FINISH LESSON again.');
      }
    } catch (e) {
      console.error('Error completing lesson:', e);
      setFinishError('Your progress could not be saved just now. Check your connection and tap FINISH LESSON again.');
    } finally {
      setIsCompletingLesson(false);
    }
  };

  const getSerpentineRows = (items: any[]) => {
    const rows: any[][] = [];
    let currentRow: any[] = [];
    for (let i = 0; i < items.length; i++) {
      currentRow.push(items[i]);
      if (currentRow.length === 3 || i === items.length - 1) {
        const rowIndex = rows.length;
        if (rowIndex % 2 === 1) {
          rows.push([...currentRow].reverse());
        } else {
          rows.push(currentRow);
        }
        currentRow = [];
      }
    }
    return rows;
  };

  const getResourceIconInfo = (type: string) => {
    const t = type?.toLowerCase() || 'link';
    if (t.includes('fig') || t.includes('design') || t.includes('template')) {
      return {
        bg: '#A259FF',
        shadow: '#883EFF',
        icon: <LayoutTemplate size={32} strokeWidth={2.5} color="white" />,
        badge: 'Template'
      };
    } else if (t.includes('pdf') || t.includes('doc') || t.includes('docx')) {
      return {
        bg: '#FF4B4B',
        shadow: '#EA2B2B',
        icon: <FileText size={32} strokeWidth={2.5} color="white" />,
        badge: 'PDF Guide'
      };
    } else if (t.includes('video') || t.includes('mp4') || t.includes('youtube')) {
      return {
        bg: '#7C5CFF',
        shadow: '#613EEA',
        icon: <Video size={32} strokeWidth={2.5} color="white" />,
        badge: 'Video Tutorial'
      };
    } else if (t.includes('xls') || t.includes('xlsx') || t.includes('csv') || t.includes('sheet') || t.includes('data')) {
      return {
        bg: '#1EBE5D',
        shadow: '#119D48',
        icon: <FileText size={32} strokeWidth={2.5} color="white" />,
        badge: 'Data Sheet'
      };
    } else if (t.includes('link') || t.includes('url') || t.includes('website')) {
      return {
        bg: '#FFC800',
        shadow: '#E6B000',
        icon: <LinkIcon size={32} strokeWidth={2.5} color="white" />,
        badge: 'Useful Link'
      };
    } else if (t.includes('zip') || t.includes('rar') || t.includes('folder') || t.includes('source') || t.includes('file')) {
      return {
        bg: '#1CB0F6',
        shadow: '#0F9BD8',
        icon: <Folder size={32} strokeWidth={2.5} color="white" />,
        badge: 'Source Files'
      };
    } else if (t.includes('ppt') || t.includes('pptx') || t.includes('slides') || t.includes('presentation')) {
      return {
        bg: '#00C9A7',
        shadow: '#009E83',
        icon: <BookText size={32} strokeWidth={2.5} color="white" />,
        badge: 'Slide Deck'
      };
    } else {
      return {
        bg: '#FF6B8B',
        shadow: '#E04B6B',
        icon: <BookOpen size={32} strokeWidth={2.5} color="white" />,
        badge: 'Quick Notes'
      };
    }
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

  const wylList = React.useMemo(() => {
    if (!activeLesson || !activeLesson.contentBlocks) return [];
    let parsedBlocks = activeLesson.contentBlocks;
    if (typeof parsedBlocks === 'string') {
      try { parsedBlocks = JSON.parse(parsedBlocks); } catch (e) {}
    }
    const learnBlocks = parsedBlocks?.learn;
    if (Array.isArray(learnBlocks)) {
      const wylBlock = learnBlocks.find((b: any) => b.type === 'whatYouWillLearn');
      if (wylBlock && Array.isArray(wylBlock.value)) {
        return wylBlock.value;
      }
    }
    return [];
  }, [activeLesson]);

  // CAROUSEL AUTO-PLAY INTERACTION
  useEffect(() => {
    if (!wylList || wylList.length <= 1 || lessonPhase !== 'start') return;
    const slideCount = wylList.filter(Boolean).slice(0, 5).length;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slideCount);
    }, 4500);
    return () => clearInterval(timer);
  }, [wylList, lessonPhase]);

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const threshold = 50;
    const slideCount = wylList.filter(Boolean).slice(0, 5).length;
    if (offset < -threshold) {
      setCurrentSlide(prev => (prev + 1) % slideCount);
    } else if (offset > threshold) {
      setCurrentSlide(prev => (prev - 1 + slideCount) % slideCount);
    }
  };

  const videoUrl = React.useMemo(() => {
    if (!activeLesson || !activeLesson.contentBlocks) return null;
    let parsedBlocks = activeLesson.contentBlocks;
    if (typeof parsedBlocks === 'string') {
      try { parsedBlocks = JSON.parse(parsedBlocks); } catch (e) {}
    }
    const learnBlocks = parsedBlocks?.learn;
    if (Array.isArray(learnBlocks)) {
      const videoBlock = learnBlocks.find((b: any) => b.type === 'videoUrl');
      if (videoBlock && typeof videoBlock.value === 'string' && videoBlock.value.trim() !== '') {
        return videoBlock.value;
      }
    }
    return null;
  }, [activeLesson]);

  // Text and audio lessons were previously INVISIBLE — the player only ever
  // rendered video. Now all three Learn formats are supported.
  const learnAudioUrl = React.useMemo(() => {
    const learnBlocks = activeLesson?.contentBlocks?.learn;
    if (Array.isArray(learnBlocks)) {
      const b = learnBlocks.find((x: any) => x.type === 'audioUrl');
      if (b && typeof b.value === 'string' && b.value.trim() !== '') return b.value;
    }
    return null;
  }, [activeLesson]);

  const learnTextHtml = React.useMemo(() => {
    const learnBlocks = activeLesson?.contentBlocks?.learn;
    if (Array.isArray(learnBlocks)) {
      const b = learnBlocks.find((x: any) => x.type === 'text');
      if (typeof b?.value === 'string' && b.value.trim() !== '' && b.value !== '<p><br></p>') {
        return b.value;
      }
    }
    return '';
  }, [activeLesson]);

  // "Watch the full lesson to continue" — now actually enforced: the Learn
  // phase's Continue unlocks once the video finishes (or instantly when there
  // is no video). A broken/unloadable video never traps the student.
  const [videoEnded, setVideoEnded] = useState(false);
  useEffect(() => {
    setVideoEnded(false);
  }, [activeLesson]);
  const canContinueFromLearn = !videoUrl || videoEnded;

  const handleNodeClick = (idx: number, isLocked: boolean) => {
    if (isLocked) {
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

  /**
   * Opens a lesson by fetching its FULL content from the guarded student
   * endpoint. The catalog response no longer carries paid lesson content, so
   * the server is the single source of truth for the paywall: 403 here means
   * "this lesson is locked" and we route to the full-page unlock experience.
   */
  const openLesson = async (lessonId: string) => {
    if (startingLesson) return;
    setStartingLesson(true);
    try {
      const res = await fetch(`/api/courses/${course?.id || params.id}/lessons/${lessonId}`, {
        credentials: 'include',
      });
      if (res.status === 403) {
        playHaptic('light');
        router.push(
          buildUnlockHref(
            String(course?.id || params.id),
            `/learn/${params.id}/section/${sectionIndex}`,
          ),
        );
        return;
      }
      if (!res.ok) {
        triggerComingSoon('This lesson could not be loaded');
        return;
      }
      const fullLesson = normalizeLesson(await res.json());
      setSelectedOptionIndex(null);
      setIsAnswerChecked(false);
      setIsAnswerCorrect(false);
      setCurrentQuestionIndex(0);
      setReflectionText('');
      setGuidedAnswers([]);
      setActiveLesson(fullLesson);
      setLessonPhase('start');
    } catch (err) {
      console.error('Failed to load lesson:', err);
      triggerComingSoon('Could not reach the lesson — check your connection');
    } finally {
      setStartingLesson(false);
    }
  };

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
    if (!chestSectionId) return;
    try {
      if (localStorage.getItem(`teyro_section_chest_opened_${chestSectionId}`)) {
        setChestClaimed(true);
      }
    } catch {
      // Storage blocked — chest stays claimable; worst case it replays.
    }
  }, [chestSectionId]);

  const handleOpenChest = () => {
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

      {/* Perfect Lesson Protection absorbed a miss — say so, briefly. */}
      {shieldAbsorbed && (
        <div
          role="status"
          style={{
            position: 'fixed',
            top: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9000,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 999,
            background: '#059669',
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: 800,
            boxShadow: '0 8px 24px rgba(5, 150, 105, 0.35)',
          }}
        >
          <Shield size={16} strokeWidth={2.8} />
          Perfect Lesson Protection used — no heart lost
        </div>
      )}

      {/* Out-of-lives overlay — blocks Apply phase when lives are 0 */}
      {livesCount === 0 && lessonPhase === 'apply' && (
        <div className={styles.outOfLivesOverlay}>
          <div className={styles.outOfLivesCard}>
            <Image src="/Icons/heart.png" width={72} height={72} alt="No lives" priority />
            <h2 className={styles.outOfLivesTitle}>Out of Lives!</h2>
            <p className={styles.outOfLivesDesc}>
              Your lives refill automatically (1 life every 4 hours).
              Or, restore full lives instantly using your XP!
            </p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {/* Lesson Retry — only offered when they actually hold one, so
                  this never advertises something they'd have to go buy first. */}
              {(retryCharges ?? 0) > 0 && (
                <button
                  disabled={usingRetry}
                  onClick={async () => {
                    if (usingRetry) return;
                    setUsingRetry(true);
                    try {
                      playHaptic('success');
                      await usePowerUp('LESSON_RETRY');
                      setRetryCharges((n) => Math.max(0, (n ?? 1) - 1));
                      await refresh();
                    } catch {
                      // Falls through to the XP refill and the exit below —
                      // never strand the learner on a failed power-up.
                    } finally {
                      setUsingRetry(false);
                    }
                  }}
                  className={styles.outOfLivesBtn}
                  style={{ width: '100%' }}
                >
                  {usingRetry
                    ? 'USING…'
                    : `USE LESSON RETRY (${retryCharges} LEFT)`}
                </button>
              )}

              <button
                disabled={xpPoints < 100}
                onClick={async () => {
                  playHaptic('success');
                  await refillLivesWithXp();
                }}
                className={xpPoints >= 100 ? styles.outOfLivesBtn : styles.outOfLivesBtnDisabled}
                style={{ width: '100%' }}
              >
                {xpPoints >= 100 ? '⚡ REFILL FULL LIVES (100 XP)' : `🔒 NEED 100 XP (YOU HAVE ${xpPoints} XP)`}
              </button>

              <button
                className={styles.outOfLivesBtnSecondary}
                onClick={() => { playHaptic('light'); setActiveLesson(null); setLessonPhase('start'); }}
                style={{ width: '100%', backgroundColor: 'transparent', border: '2px solid #CBD5E1', color: '#64748B', borderBottomWidth: '4px' }}
              >
                Back to Lessons
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className={styles.grid}>
        
        {/* Main Column */}
        <div className={styles.mainColumn}>
          {activeLesson && lessonPhase === 'start' ? (
            <div className={styles.lessonPlayerInnerContainer}>
              {/* Duolingo Green Header matching design */}
              <div className={styles.duolingoHeader}>
                <div className={styles.headerLeft}>
                  <button 
                    onClick={() => { playHaptic('light'); setActiveLesson(null); }} 
                    className={styles.headerBackBtn}
                    style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <ArrowLeft size={18} strokeWidth={3} color="white" />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', fontSize: 'clamp(10px, 2.5vw, 11px)', fontWeight: 800, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>SECTION {sectionIndex + 1}, UNIT 1</span>
                        {isReviewMode && (
                          <span style={{ backgroundColor: '#22C55E', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 900 }}>
                            REVIEW MODE 🟢
                          </span>
                        )}
                      </span>
                      <h1 className={styles.headerTitleText} style={{ color: 'white', margin: 0, padding: 0, fontSize: 'clamp(17px, 4vw, 20px)', fontWeight: 800, lineHeight: 1.2 }}>
                        {section.title}
                      </h1>
                    </div>
                  </button>
                </div>
                
                {/* Guidebook button on the right */}
                <div className={styles.headerRightGroup} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <button 
                    onClick={() => setShowGuidebook(true)}
                    className={styles.guidebookBtn}
                  >
                    <BookOpen size={18} />
                    <span>GUIDEBOOK</span>
                  </button>
                </div>
              </div>

              {/* Bold 3D Gamified Review Mode Banner */}
              {isReviewMode && (
                <div style={{
                  backgroundColor: '#58CC02',
                  color: 'white',
                  padding: '14px 20px',
                  margin: '16px 24px 0 24px',
                  borderRadius: '16px',
                  boxShadow: '0 5px 0 #46A302',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  border: '2px solid #46A302',
                }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.22)', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                    🧪
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ textTransform: 'uppercase', fontSize: '13px', fontWeight: 900, letterSpacing: '0.06em', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span>REPLAY & PRACTICE MODE</span>
                      <span style={{ backgroundColor: '#10B981', color: 'white', padding: '3px 9px', borderRadius: '8px', fontSize: '10px', fontWeight: 900, boxShadow: '0 2px 0 #059669' }}>
                        ZERO HEARTS AT RISK 🛡️
                      </span>
                    </div>
                    <p style={{ margin: '3px 0 0 0', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.96)', lineHeight: 1.3 }}>
                      You already mastered this lesson! Practice freely without losing any hearts! 🦖✨
                    </p>
                  </div>
                </div>
              )}

              {/* Stepper Progress Indicator */}
              <div className={styles.stepperContainer}>
                <div className={styles.stepperWrapper}>
                  {/* Connecting background lines */}
                  <div className={styles.stepperLineBg}></div>
                  <div className={styles.stepperLineActive} style={{ width: '0%' }}></div>

                  {/* Step 1: Learn */}
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${styles.circleActive}`}>1</div>
                    <span className={`${styles.circleText} ${styles.circleTextActive}`}>Learn</span>
                  </div>
                  
                  {/* Step 2: Apply */}
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${styles.circleUpcoming}`}>2</div>
                    <span className={styles.circleText}>Apply</span>
                  </div>
                  
                  {/* Step 3: Reflect */}
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${styles.circleUpcoming}`}>3</div>
                    <span className={styles.circleText}>Reflect</span>
                  </div>
                  
                  {/* Step 4: Deepen */}
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${styles.circleUpcoming}`}>4</div>
                    <span className={styles.circleText}>Deepen</span>
                  </div>
                </div>
              </div>

              {/* Start Screen Body */}
              <div className={styles.startScreenBody}>
                {/* Mascot on Left with Floating Glowing Star */}
                <div className={styles.mascotLeftCol}>
                  <div className={styles.mascotContainer}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.mascotStar}>
                      <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" fill="#58cc02" />
                    </svg>
                    <Image
                      src="/lesson Player/Start_lesson_Tey.webp"
                      alt="Tey Start Lesson Mascot"
                      width={360}
                      height={360}
                      className={styles.mascotWavingImg}
                      priority
                    />
                  </div>
                </div>

                {/* Details on Right */}
                <div className={styles.infoRightCol}>
                  <span className={styles.lessonIndexBadge}>
                    LESSON {lessons.findIndex((l: any) => l.id === activeLesson.id) + 1}
                  </span>

                  <h2 className={styles.lessonPlayerTitle}>
                    {activeLesson.title}
                  </h2>

                  {activeLesson.shortDescription && (
                    <div className={styles.lessonPlayerDesc}>
                      {cleanHtml(activeLesson.shortDescription)}
                    </div>
                  )}

                  {/* Community deep-link — course community pre-filtered to this lesson */}
                  <Link
                    href={`/dashboard/community/${course?.id || params.id}?lesson=${activeLesson.id}&lessonTitle=${encodeURIComponent(activeLesson.title ?? '')}`}
                    className={styles.discussLessonLink}
                    onClick={() => playHaptic('light')}
                  >
                    <MessagesSquare size={15} />
                    Discuss this lesson
                  </Link>

                  {/* What you'll learn Carousel Slider */}
                  {wylList && Array.isArray(wylList) && wylList.filter(Boolean).length > 0 && (
                    <div className={styles.carouselContainer}>
                      <h3 className={styles.pointsListHeader}>You&apos;ll learn to:</h3>
                      <div className={styles.carouselWrapper}>
                        <AnimatePresence mode="wait">
                          {wylList.filter(Boolean).slice(0, 5).map((point: string, idx: number) => {
                            if (idx !== currentSlide) return null;
                            const { emoji, title, desc, bg } = parsePoint(point, idx);

                            return (
                              <motion.div
                                key={idx}
                                className={styles.carouselCard}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                initial={{ opacity: 0, x: 80, scale: 0.92 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -80, scale: 0.92 }}
                                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                              >
                                <div className={styles.emojiCircle} style={{ backgroundColor: bg }}>
                                  <span style={{ fontSize: '18px' }}>{emoji}</span>
                                </div>
                                <div className={styles.carouselTextContainer}>
                                  <span className={styles.carouselTitle}>{title}</span>
                                  {desc && <span className={styles.carouselDesc}>{desc}</span>}
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>

                      {/* Dots indicators */}
                      <div className={styles.carouselDots}>
                        {wylList.filter(Boolean).slice(0, 5).map((_, idx: number) => (
                          <button
                            key={idx}
                            className={`${styles.carouselDot} ${idx === currentSlide ? styles.carouselDotActive : ''}`}
                            onClick={() => setCurrentSlide(idx)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Centered 3D Start Button */}
              <div className={styles.btnContainerCentred}>
                <button 
                  onClick={() => {
                    playHaptic('medium');
                    setLessonPhase('learn');
                  }}
                  className={styles.startLessonBtn3D}
                >
                  START LESSON
                </button>
              </div>
            </div>
          ) : activeLesson && lessonPhase !== 'start' ? (
            <div className={styles.lessonLearnContainer}>
              {/* Stepper Progress Indicator (reusing same logic) */}
              <div className={styles.stepperContainer}>
                <div className={styles.stepperWrapper}>
                  <div className={styles.stepperLineBg}></div>
                  <div className={styles.stepperLineActive} style={{ width: lessonPhase === 'learn' ? '0%' : lessonPhase === 'apply' ? '33%' : lessonPhase === 'reflect' ? '66%' : '100%' }}></div>
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${lessonPhase === 'learn' ? styles.circleActive : styles.circleCompleted}`}>1</div>
                    <span className={`${styles.circleText} ${lessonPhase === 'learn' ? styles.circleTextActive : ''}`}>Learn</span>
                  </div>
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${lessonPhase === 'apply' ? styles.circleActive : (lessonPhase === 'learn' ? styles.circleUpcoming : styles.circleCompleted)}`}>2</div>
                    <span className={`${styles.circleText} ${lessonPhase === 'apply' ? styles.circleTextActive : ''}`}>Apply</span>
                  </div>
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${lessonPhase === 'reflect' ? styles.circleActive : (['learn', 'apply'].includes(lessonPhase) ? styles.circleUpcoming : styles.circleCompleted)}`}>3</div>
                    <span className={`${styles.circleText} ${lessonPhase === 'reflect' ? styles.circleTextActive : ''}`}>Reflect</span>
                  </div>
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${lessonPhase === 'deepen' ? styles.circleActive : styles.circleUpcoming}`}>4</div>
                    <span className={`${styles.circleText} ${lessonPhase === 'deepen' ? styles.circleTextActive : ''}`}>Deepen</span>
                  </div>
                </div>

                {/* Close Button on Right side of Stepper */}
                <button
                  onClick={() => { playHaptic('medium'); setActiveLesson(null); setLessonPhase('start'); }}
                  className={styles.closeLearnBtn}
                >
                  <X size={20} strokeWidth={2.5} color="#AFBFCF" />
                </button>
              </div>

              {/* LEARN PHASE */}
              {lessonPhase === 'learn' && (
                <>
                  <div className={styles.learnContentScroll}>
                <div className={styles.learnHeader}>
                  <span className={styles.letsLearnText}>Let&apos;s learn!</span>
                  <h2 className={styles.learnTitle}>{activeLesson.title}</h2>
                </div>

                {videoUrl ? (
                  <div className={styles.videoPlayerWrap} style={{ background: '#000' }}>
                    <video
                      src={videoUrl}
                      controls
                      controlsList="nodownload"
                      onEnded={() => setVideoEnded(true)}
                      onError={() => setVideoEnded(true)}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                ) : learnAudioUrl ? (
                  <div className={styles.videoPlayerWrap} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', flexDirection: 'column', gap: 16, padding: 24 }}>
                    <Image src="/Icons/headphones.png" width={64} height={64} alt="Audio lesson" />
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <audio
                      src={learnAudioUrl}
                      controls
                      onEnded={() => setVideoEnded(true)}
                      onError={() => setVideoEnded(true)}
                      style={{ width: '100%', maxWidth: 480 }}
                    />
                  </div>
                ) : !learnTextHtml ? (
                  <div className={styles.videoPlayerWrap} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9', boxShadow: 'none', border: '2px dashed #E2E8F0' }}>
                    <div style={{ textAlign: 'center', color: '#64748B' }}>
                      <Info size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#071233' }}>No lesson content yet</h3>
                      <p style={{ margin: '8px 0 0', fontSize: '14px' }}>The creator hasn&apos;t attached media or reading material to this lesson yet.</p>
                    </div>
                  </div>
                ) : null}

                {learnTextHtml && (
                  <div
                    className={styles.learnArticleBody}
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(learnTextHtml) }}
                  />
                )}

                {/* Resources Section */}
                <div className={styles.resourcesSection}>
                  <div className={styles.resourcesTitleBox}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#64748B"><path d="M4 6h16v12H4z" /></svg>
                    <h4>Resources</h4>
                  </div>
                  {/* "Download all" button removed — it had no handler; per-resource
                      downloads below are the real path */}

                  {activeLesson?.resources && activeLesson.resources.length > 0 ? (
                    <div className={styles.resourcesGrid}>
                      {activeLesson.resources.map((resource: any) => {
                        const type = resource.type?.toLowerCase() || 'unknown';
                        let iconClass = styles.resourceIconImg;
                        if (type.includes('pdf')) iconClass = styles.resourceIconPdf;
                        else if (type.includes('doc')) iconClass = styles.resourceIconDoc;
                        else if (type.includes('png') || type.includes('jpg') || type.includes('jpeg')) iconClass = styles.resourceIconImg;

                        const sizeText = resource.sizeBytes 
                          ? (resource.sizeBytes > 1024 * 1024 
                              ? `${(resource.sizeBytes / (1024 * 1024)).toFixed(1)} MB` 
                              : `${Math.round(resource.sizeBytes / 1024)} KB`)
                          : 'Unknown size';

                        return (
                          <a 
                            key={resource.id}
                            href={resource.storageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.resourceCard}
                            style={{ textDecoration: 'none' }}
                          >
                            <div className={iconClass}>{type.substring(0, 4).toUpperCase()}</div>
                            <div className={styles.resourceInfo}>
                              <span className={styles.resourceName}>{resource.title || resource.originalName || 'Resource'}</span>
                              <span className={styles.resourceMeta}>{type.toUpperCase()} • {sizeText}</span>
                            </div>
                            <button className={styles.downloadIconBtn} type="button">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m7-5l5 5 5-5m-5 5V3"/></svg>
                            </button>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ padding: '24px', textAlign: 'center', backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px dashed #E2E8F0', color: '#64748B' }}>
                      <p style={{ margin: 0, fontSize: '14px' }}>No resources attached to this lesson.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.stickyBottomBanner}>
                <div className={styles.bannerLeft}>
                  <Image src="/lesson Player/Hi there tey.webp" width={100} height={100} alt="Tey" className={styles.bannerMascot} />
                  <div className={styles.bannerTextGroup}>
                    <h5>Watch the full lesson to continue</h5>
                    <p>You&apos;ll unlock the next step once you finish.</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.reflectBottomBtnWrap}>
                <button
                  className={`${styles.reflectSubmitBtn} ${!canContinueFromLearn ? styles.reflectBtnDisabled : ''}`}
                  onClick={() => {
                    playHaptic('medium');
                    // Lessons with a real Apply activity go to the quiz; the
                    // rest skip straight to Reflect instead of faking one.
                    setLessonPhase(hasApplyActivity ? 'apply' : 'reflect');
                  }}
                  disabled={!canContinueFromLearn}
                >
                  {!canContinueFromLearn && <Lock size={18} strokeWidth={2.5} />}
                  {hasApplyActivity ? 'CONTINUE' : 'CONTINUE TO REFLECTION'}
                </button>
              </div>
            </>
          )}

          {/* APPLY PHASE */}
          {lessonPhase === 'apply' && (
            <>
              <div className={styles.learnContentScroll}>
                <div className={styles.applyHeaderRow}>
                  <span className={styles.applyBadge}>QUESTION {currentQuestionIndex + 1} OF {applyQuestions.length}</span>
                </div>
                {applyScenario && (
                  <div className={styles.applyScenarioBox}>
                    <p className={styles.applyScenarioText}>{applyScenario}</p>
                  </div>
                )}
                <div className={styles.applyQuestionContainer}>
                  <h2 className={styles.applyQuestionTitle}>{currentQuestion?.questionText || 'Question unavailable'}</h2>
                  <div className={styles.applyMascotWrap}>
                    <Image src="/lesson Player/Hi there tey.webp" width={160} height={160} alt="Tey Quiz" className={styles.applyMascotImg} />
                    <div className={styles.questionMarkBubble}>?</div>
                  </div>
                </div>
                <div className={styles.applyOptionsGrid}>
                  {(currentQuestion?.options || []).map((option: any, idx: number) => {
                    const isSelected = selectedOptionIndex === idx;
                    return (
                      <button 
                        key={idx}
                        className={`${styles.applyOptionCard} ${isSelected ? styles.optionSelected : ''}`}
                        onClick={() => {
                          if (!isAnswerChecked) {
                            playHaptic('light');
                            setSelectedOptionIndex(idx);
                          }
                        }}
                        disabled={isAnswerChecked}
                      >
                        <div className={`${styles.optionLetter} ${isSelected ? styles.optionLetterSelected : ''}`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className={styles.optionText}>{option.text}</span>
                        {isReviewMode && isSelected && (
                          <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                            Tey&apos;s Saved Choice 🎯
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CELEBRATION INLINE BANNER & BOTTOM AREA */}
              <div className={styles.applyBottomArea}>
                <div 
                  className={`${styles.applyBottomBtnWrap} ${isAnswerChecked && isAnswerCorrect ? styles.applyBottomBtnWrapCorrect : ''} ${isAnswerChecked && !isAnswerCorrect ? styles.applyBottomBtnWrapWrong : ''}`}
                >
                  <AnimatePresence>
                    {isAnswerChecked && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={styles.celebrationHeaderRow}
                      >
                        <div className={styles.celebrationHeaderLeft}>
                          <div className={isAnswerCorrect ? styles.celebrationIconCircleCorrect : styles.celebrationIconCircleWrong}>
                            {isAnswerCorrect ? <Check size={20} strokeWidth={4} /> : <X size={20} strokeWidth={4} />}
                          </div>
                          <div>
                            <h4 className={isAnswerCorrect ? styles.celebrationTitleCorrect : styles.celebrationTitleWrong}>
                              {isAnswerCorrect ? (isReviewMode ? 'Bullseye! You still got it! 🎯' : 'Awesome!') : 'Incorrect'}
                            </h4>
                            <p className={isAnswerCorrect ? styles.celebrationExplanation : styles.celebrationExplanationWrong}>
                              {isAnswerCorrect 
                                ? currentQuestion.explanation 
                                : (selectedOptionIndex !== null && currentQuestion.options[selectedOptionIndex]?.misconception 
                                    ? currentQuestion.options[selectedOptionIndex].misconception 
                                    : currentQuestion.explanation)
                              }
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {!isAnswerChecked ? (
                    <button 
                      className={`${styles.checkAnswerBtn} ${selectedOptionIndex === null ? styles.btnDisabled : ''}`}
                      onClick={handleCheckAnswer}
                      disabled={selectedOptionIndex === null}
                    >
                      CHECK ANSWER
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '12px' }}>
                      <button 
                        className={isAnswerCorrect ? styles.continueBtnCorrect : styles.continueBtnWrong}
                        onClick={isAnswerCorrect ? handleApplyContinue : () => { setIsAnswerChecked(false); setSelectedOptionIndex(null); }}
                        style={{ flex: 1 }}
                      >
                        {isAnswerCorrect ? 'CONTINUE' : 'GOT IT'}
                      </button>
                      {isReviewMode && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOptionIndex(null);
                            setIsAnswerChecked(false);
                            setIsAnswerCorrect(false);
                          }}
                          style={{
                            padding: '12px 18px',
                            borderRadius: '12px',
                            backgroundColor: '#FEF08A',
                            color: '#854D0E',
                            fontWeight: 900,
                            fontSize: '13px',
                            border: '2px solid #EAB308',
                            boxShadow: '0 3px 0 #CA8A04',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          ⚡ TRY AGAIN FOR FUN!
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {lessonPhase === 'reflect' && (
            <>
              {/* TOP AND MIDDLE CONTAINERS */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflowY: 'auto' }}>
                <div className={styles.reflectTitleRow}>
                  <div>
                    <span className={styles.applyBadge}>
                      {isReviewMode ? 'TEY\'S MEMORY VAULT 📦' : 'REFLECTION'}
                    </span>
                    <h2 className={styles.reflectTitle}>
                      {isReviewMode ? 'Your Saved Reflections ✨' : 'Take a moment to reflect ✨'}
                    </h2>
                    {isReviewMode && (
                      <div style={{ backgroundColor: '#EFF6FF', border: '2px solid #BFDBFE', padding: '12px 16px', borderRadius: '14px', margin: '14px 0', color: '#1E40AF', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>💡</span>
                        <span>Tey stored your notes from your first completion! Feel free to polish or update your thoughts below.</span>
                      </div>
                    )}
                    <div className={styles.reflectPrompt} dangerouslySetInnerHTML={{ __html: sanitizeHtml(reflectPrompt) }} />
                  </div>
                  <Image src="/lesson Player/Hi there tey.webp" width={180} height={180} alt="Reflect Mascot" className={styles.reflectMascotImg} />
                </div>

                {reflectType === 'open' ? (
                  <>
                    {reflectStarters.length > 0 && (
                      <div style={{ marginTop: '24px' }}>
                        <p className={styles.reflectStartersTitle}>Need a little inspiration? Try these starters</p>
                        <div className={styles.reflectStartersWrap}>
                          {reflectStarters.map((starter: any, idx: number) => (
                            <button key={idx} className={styles.reflectStarterPill} onClick={() => handleStarterClick(starter.text)}>
                              <span className={styles.reflectStarterIcon}>+</span>
                              <span>{starter.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={styles.reflectTextareaWrap}>
                      <textarea 
                        className={styles.reflectTextarea} 
                        placeholder="Write your reflection here..."
                        value={reflectionText}
                        onChange={(e) => setReflectionText(e.target.value)}
                      />
                      <div className={`${styles.reflectWordCount} ${reflectionText.trim().split(/\s+/).filter(w => w.length > 0).length >= reflectMinWords ? styles.reflectWordCountSuccess : ''}`}>
                        {reflectionText.trim().split(/\s+/).filter(w => w.length > 0).length} / {reflectMinWords} words
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={styles.guidedQuestionsContainer}>
                    {reflectGuidedConfig.questions.map((q: any, idx: number) => {
                      const text = guidedAnswers[idx] || '';
                      const wc = text.trim().split(/\s+/).filter(w => w.length > 0).length;
                      const hasMet = wc >= reflectGuidedConfig.minWordCountPerQuestion;
                      return (
                        <div key={idx} className={styles.guidedQuestionCard}>
                          <h4 className={styles.guidedQuestionTitle}>
                            <span className={styles.guidedQuestionNum}>{idx + 1}.</span> {q.text}
                          </h4>
                          <div className={styles.reflectTextareaWrap}>
                            <textarea 
                              className={styles.reflectTextarea} 
                              placeholder="Type your answer here..."
                              value={text}
                              onChange={(e) => handleGuidedAnswerChange(idx, e.target.value)}
                            />
                            <div className={`${styles.reflectWordCount} ${hasMet ? styles.reflectWordCountSuccess : ''}`}>
                              {wc} / {reflectGuidedConfig.minWordCountPerQuestion} words
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className={styles.reflectGrowthBanner}>
                  <Image
                    src="/lesson Player/Hi there tey.webp"
                    alt="Growth Mascot"
                    width={100}
                    height={100}
                    className={styles.reflectGrowthMascot}
                  />
                  <p className={styles.reflectGrowthText}>
                    Your reflection helps you turn knowledge into growth.<br/>
                    Be honest. Be thoughtful. Be you. 💙
                  </p>
                </div>
              </div>

              {/* BOTTOM CONTAINER (Submit Button) */}
              <div className={styles.reflectBottomBtnWrap}>
                <button 
                  className={`${styles.reflectSubmitBtn} ${!canSubmitReflect ? styles.reflectBtnDisabled : ''}`}
                  onClick={handleReflectSubmit}
                  disabled={!canSubmitReflect}
                >
                  {!canSubmitReflect && <Lock size={18} strokeWidth={2.5} />}
                  SUBMIT REFLECTION
                </button>
              </div>
            </>
          )}

          {/* DEEPEN PHASE */}
          {lessonPhase === 'deepen' && (
            <>
              {/* TOP AND MIDDLE CONTAINERS */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflowY: 'auto' }} className={styles.deepenContentScroll}>
                <div className={styles.deepenHeader}>
                  <span className={styles.applyBadge}>DEEPEN</span>
                  <h2 className={styles.deepenTitle}>{deepenTitle}</h2>
                  <div className={styles.deepenDescription} dangerouslySetInnerHTML={{ __html: sanitizeHtml(deepenDesc) }} />
                </div>

                {/* Serpentine Pathway Grid */}
                {activeLesson?.resources && activeLesson.resources.length > 0 ? (
                  <div className={styles.deepenPathContainer}>
                    {/* SVG Connector Path Behind Buttons */}
                    <svg className={styles.deepenPathSvg} viewBox="0 0 600 400" fill="none" preserveAspectRatio="none">
                      <path 
                        d="M 100 60 C 250 60, 350 60, 500 60 C 560 60, 560 180, 500 180 C 350 180, 250 180, 100 180 C 40 180, 40 300, 100 300 C 250 300, 350 300, 500 300"
                        stroke="#E2E8F0"
                        strokeWidth="4"
                        strokeDasharray="8 8"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className={styles.deepenGrid}>
                      {getSerpentineRows(activeLesson.resources.slice(0, 8)).map((rowItems, rowIndex) => (
                        <div key={rowIndex} className={styles.deepenGridRow}>
                          {rowItems.map((res: any) => {
                            const iconInfo = getResourceIconInfo(res.type);
                            return (
                              <div key={res.id} className={styles.deepenGridItem}>
                                <motion.button
                                  type="button"
                                  onClick={() => { playHaptic('medium'); setSelectedResource(res); }}
                                  className={styles.deepenNodeBtn}
                                  style={{
                                    backgroundColor: iconInfo.bg,
                                    boxShadow: `0 8px 0 ${iconInfo.shadow}`
                                  }}
                                  whileTap={{
                                    y: 8,
                                    boxShadow: '0 0px 0 transparent'
                                  }}
                                >
                                  {iconInfo.icon}
                                </motion.button>
                                <span className={styles.deepenNodeTitle}>{res.title || 'Resource'}</span>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '40px 24px', textAlign: 'center', backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px dashed #E2E8F0', color: '#64748B', margin: '24px 0' }}>
                    <p style={{ margin: 0, fontSize: '15px' }}>No additional resources uploaded by the creator.</p>
                  </div>
                )}
              </div>

              {/* RECOMMENDED NEXT STEP & FINISH LESSON BOTTOM AREA */}
              <div className={styles.deepenBottomArea}>
                {/* Image container carrying the mascot image */}
                <div className={styles.deepenMascotCol}>
                  <Image
                    src="/User onbarding Assets/Step_7_tey_verified_state.webp"
                    alt="Tey Verified"
                    width={220}
                    height={220}
                    className={styles.deepenMascotImg}
                    />
                </div>

                {/* Text container carrying the recommended step banner and finish lesson button */}
                <div className={styles.deepenTextCol}>
                  {finishError && (
                    <div style={{
                      backgroundColor: '#FEF2F2',
                      border: '1.5px solid #FECACA',
                      color: '#B91C1C',
                      borderRadius: 14,
                      padding: '12px 16px',
                      fontSize: 13,
                      fontWeight: 700,
                      marginBottom: 12,
                    }}>
                      ⚠️ {finishError}
                    </div>
                  )}
                  {/* Finish Lesson Button */}
                  <button 
                    className={styles.finishLessonBtn3D}
                    onClick={handleDeepenFinish}
                    disabled={isCompletingLesson}
                    style={isCompletingLesson ? { opacity: 0.7, cursor: 'not-allowed' } : undefined}
                  >
                    {isCompletingLesson ? 'SAVING PROGRESS...' : 'FINISH LESSON'}
                  </button>
                </div>
              </div>

              {/* Resource Details Pop-up Modal */}
              <AnimatePresence>
                {selectedResource && (
                  <motion.div 
                    className={styles.modalOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedResource(null)}
                  >
                    <motion.div 
                      className={styles.resourceModal}
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className={styles.modalCloseBtn} onClick={() => setSelectedResource(null)}>
                        <X size={20} strokeWidth={2.5} />
                      </button>

                      <div className={styles.modalHeaderIcon} style={{ backgroundColor: getResourceIconInfo(selectedResource.type).bg }}>
                        {getResourceIconInfo(selectedResource.type).icon}
                      </div>

                      <span className={styles.modalBadge}>
                        {getResourceIconInfo(selectedResource.type).badge}
                      </span>

                      <h3 className={styles.modalResourceTitle}>{selectedResource.title || selectedResource.originalName}</h3>
                      
                      {selectedResource.description && (
                        <p className={styles.modalResourceDesc}>{selectedResource.description}</p>
                      )}

                      <div className={styles.modalMetaInfo}>
                        {selectedResource.sizeBytes && (
                          <span>Size: {(selectedResource.sizeBytes / (1024 * 1024)).toFixed(2)} MB</span>
                        )}
                        <span>Format: {selectedResource.type?.toUpperCase()}</span>
                      </div>

                      <a 
                        href={selectedResource.storageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.modalDownloadBtn3D}
                        onClick={() => setSelectedResource(null)}
                      >
                        DOWNLOAD RESOURCE
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

        </div>
          ) : (
            <>
              {/* Duolingo Green Header */}
              <motion.div className={styles.duolingoHeader} variants={nodeVariants} custom={0}>
                <div className={styles.headerLeft}>
                  <Link href={`/learn/${params.id}`} className={styles.headerBackBtn}>
                    <ArrowLeft size={18} strokeWidth={3} />
                    <span>SECTION {sectionIndex + 1}, UNIT 1</span>
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

                  if (item.type === 'lesson') {
                    isCompleted = completedLessons.includes(item.id);
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
                        
                        {/* Floating Active Indicator */}
                        {isActive && !isPopoverOpen && (
                          <motion.div 
                            className={styles.startBadgeBubble} 
                            style={{ color: theme.main }}
                            initial={{ scale: 0.8, y: 5 }}
                            animate={{ scale: [0.9, 1.1, 1], y: [0, -6, 0] }}
                            transition={{
                              scale: { duration: 0.4, ease: 'easeOut' },
                              y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                            }}
                          >
                            <span>
                              {item.type === 'trophy'
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
                        {isActive && (
                          <div className={styles.activeTargetRing} />
                        )}

                        {/* 3D Platform representation according to milestone types */}
                        {item.type === 'lesson' ? (
                          <motion.button
                            type="button"
                            onClick={() => handleNodeClick(idx, isLocked)}
                            className={`
                              ${styles.duoPedestal} 
                              ${isCompleted ? styles.duoPedestalCompleted : isActive ? styles.duoPedestalActive : styles.duoPedestalLocked}
                            `}
                            animate={justUnlockedIndex === idx ? {
                              scale: [1, 1.3, 0.9, 1.15, 1],
                              rotate: [0, -10, 10, -5, 5, 0],
                            } : undefined}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                            style={(!isLocked) ? {
                              backgroundColor: theme.main,
                              boxShadow: `0 8px 0 ${theme.shadow}`,
                            } : undefined}
                            whileTap={{
                              y: 8,
                              boxShadow: '0 0px 0 transparent',
                            }}
                          >
                              {isCompleted ? (
                                <Check size={32} strokeWidth={4} color="white" />
                              ) : isActive ? (
                                <Star size={32} strokeWidth={3} fill="white" color="white" />
                              ) : (
                                <Lock size={28} strokeWidth={2.5} color="#afafaf" />
                              )}
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
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const sectionIndex = parseInt(params.sectionIndex as string, 10);

  useEffect(() => {
    const run = async () => {
      try {
        // course + progress used to be strictly serial (progress only
        // started after course resolved); they don't depend on each other,
        // so they now fire together like the parent /learn/[id] page does.
        const [res, progRes] = await Promise.all([
          fetch(`/api/courses/${params.id}`),
          fetch(`/api/courses/${params.id}/progress`, { credentials: 'include' }),
        ]);

        if (!res.ok) {
          setCourse(null);
        } else {
          const data = await res.json();
          setCourse(data);
        }

        if (progRes.ok) {
          const pd = await progRes.json();
          setCompletedLessons(pd.completedLessons || []);
        }
      } catch (e) {
        console.error('Failed to load course:', e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [params.id]);

  if (loading) {
    return (
      <StudentShell isWide hideMobileChrome>
        <LearnSectionSkeleton />
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
