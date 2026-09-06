'use client';

/**
 * EnrollmentWizard — full-screen 4-step Duolingo-style enrollment takeover.
 *
 * Steps 1–2 are pure hype/preview (nothing is committed). Step 3 is the
 * commitment moment: pressing the CTA calls `enroll()` — the ONLY place the
 * wizard touches the backend. Step 4 celebrates with whatever the enroll
 * response returned (real welcome reward, first lesson) and hands off.
 *
 * Presentational by design: the parent owns the API call and navigation via
 * `enroll()` / `onFinish()`. Mount it conditionally (`{show && <Wizard/>}`,
 * ideally inside an <AnimatePresence>) — state starts fresh on every mount.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  BookOpen,
  Check,
  Clock,
  Loader2,
  Lock,
  Play,
  Sparkles,
  X,
} from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';
import GamificationIcon from '@/components/ui/GamificationIcon';
import { playHaptic } from '@/lib/haptics';
import { playWinSound } from '@/utils/audio';
import styles from './EnrollmentWizard.module.css';

export interface EnrollResponse {
  enrolled?: boolean;
  alreadyEnrolled?: boolean;
  courseId?: string;
  enrollmentId?: string;
  /** Null when the learner isn't eligible (bonus already granted before). */
  welcomeReward?: { xp: number; coins: number } | null;
  balances?: { xp: number; coins: number } | null;
  firstLesson?: { id: string; title: string } | null;
  stats?: { totalLessons: number; totalXp: number; totalMinutes: number };
}

interface EnrollmentWizardProps {
  courseTitle: string;
  thumbnailUrl?: string | null;
  /** Paid course → surfaces "first 2 lessons free" messaging (not a paywall). */
  isPaid: boolean;
  firstLessonTitle?: string;
  secondLessonTitle?: string;
  stats: { totalLessons: number; totalXp: number; totalMinutes: number };
  /** Fires POST /courses/:id/enroll in the parent. Throws on failure. */
  enroll: () => Promise<EnrollResponse>;
  onClose: () => void;
  /** Parent routes to /learn/[id]. */
  onFinish: () => void;
}

type WizardStep = 1 | 2 | 3 | 4;
type CommitStatus = 'idle' | 'enrolling' | 'error' | 'done';

/** Eased 0→target numeric tween for the step-4 reward count-up. */
function useCountUp(target: number, active: boolean, durationMs = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || target <= 0) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, durationMs]);
  return active ? value : 0;
}

export default function EnrollmentWizard({
  courseTitle,
  thumbnailUrl,
  isPaid,
  firstLessonTitle,
  secondLessonTitle,
  stats,
  enroll,
  onClose,
  onFinish,
}: EnrollmentWizardProps) {
  const [step, setStep] = useState<WizardStep>(1);
  const [direction, setDirection] = useState(1); // 1 = forward slide, -1 = back
  const [commitStatus, setCommitStatus] = useState<CommitStatus>('idle');
  const [enrollResult, setEnrollResult] = useState<EnrollResponse | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending auto-advance when the wizard unmounts
  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    [],
  );

  const goToStep = useCallback((next: WizardStep) => {
    setDirection(next > step ? 1 : -1);
    playHaptic('light');
    setStep(next);
  }, [step]);

  // Escape closes — but never mid-enroll or after committing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && commitStatus !== 'enrolling' && commitStatus !== 'done') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [commitStatus, onClose]);

  const canClose = commitStatus === 'idle' || commitStatus === 'error';

  const handleCommit = useCallback(async () => {
    if (commitStatus === 'enrolling') return; // double-tap guard
    setCommitStatus('enrolling');
    try {
      const result = await enroll();
      setEnrollResult(result);
      setCommitStatus('done');
      playHaptic('medium');
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        fireConfetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.55 },
          colors: ['#0172FD', '#22C55E', '#F59E0B', '#EC4899', '#A855F7'],
        });
      }
      playWinSound();
      // Brief beat so the confetti lands before the reveal screen slides in
      advanceTimer.current = setTimeout(() => goToStep(4), 600);
    } catch {
      // Stay on screen 3 with a visible error — never fake success
      setCommitStatus('error');
    }
  }, [commitStatus, enroll, goToStep]);

  // ─── Direction-aware horizontal slide (same feel as onboarding) ──────────
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
  };

  const formattedDuration =
    stats.totalMinutes > 0
      ? `${Math.floor(stats.totalMinutes / 60) > 0 ? `${Math.floor(stats.totalMinutes / 60)}h ` : ''}${stats.totalMinutes % 60}m`
      : '—';

  const welcomeReward = enrollResult?.welcomeReward ?? null;
  const xpCount = useCountUp(welcomeReward?.xp ?? 0, step === 4);
  const coinCount = useCountUp(welcomeReward?.coins ?? 0, step === 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.fullScreenTakeover}
    >
        {/* Top Step Progress Bar & Close Button */}
        <div className={styles.takeoverHeader}>
          <div className={styles.stepProgressTrack}>
            <div
              className={styles.stepProgressIndicator}
              style={{ width: `${(step / 4) * 100}%` }}
            >
              <div className={styles.progressShine} />
            </div>
          </div>

          {canClose && (
            <button
              type="button"
              onClick={() => {
                playHaptic('light');
                onClose();
              }}
              aria-label="Close"
              className={styles.takeoverCloseBtn}
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          )}
        </div>

        <div className={styles.takeoverBody}>
          <AnimatePresence mode="popLayout" custom={direction}>
            {/* ─── SCREEN 1: THE HOOK — nothing claimed yet ─── */}
            {step === 1 && (
              <motion.div
                key="wizard-step-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 320, damping: 32 },
                  opacity: { duration: 0.15, ease: 'easeOut' },
                }}
                className={styles.takeoverStepCard}
              >
                <div className={styles.takeoverMascotWrap}>
                  <Image
                    src="/dashboard tey.webp"
                    alt="Tey Mascot"
                    width={240}
                    height={240}
                    priority
                    className={styles.mascotCelebrateBig}
                  />
                </div>

                <h1 className={styles.takeoverTitleClean}>YOUR QUEST AWAITS</h1>
                <p className={styles.takeoverSubtitle}>
                  You&apos;re about to begin an adventure through
                  <br />
                  <span className={styles.highlightCourseName}>{courseTitle}</span>
                </p>

                {thumbnailUrl ? (
                  <div className={styles.takeoverThumbCard}>
                    <Image
                      src={thumbnailUrl}
                      alt={courseTitle}
                      fill
                      className={styles.takeoverThumbImg}
                      priority
                    />
                    <div className={styles.thumbCardOverlay}>
                      <Sparkles size={16} color="#0172FD" />
                      <span>Ready to Learn</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.fallbackThumbBig}>
                    <BookOpen size={44} color="#0172FD" />
                    <span>{courseTitle}</span>
                  </div>
                )}

                <div className={styles.duoScoreCardsRow}>
                  <div className={styles.duoScoreCardBlue}>
                    <div className={styles.scoreCardHeaderBlue}>Lessons</div>
                    <div className={styles.scoreCardValueBlue}>
                      <BookOpen size={18} /> {stats.totalLessons}
                    </div>
                  </div>
                  <div className={styles.duoScoreCardYellow}>
                    <div className={styles.scoreCardHeaderYellow}>Total XP</div>
                    <div className={styles.scoreCardValueYellow}>
                      <GamificationIcon type="gem" size={18} /> {stats.totalXp}
                    </div>
                  </div>
                  <div className={styles.duoScoreCardRed}>
                    <div className={styles.scoreCardHeaderRed}>Duration</div>
                    <div className={styles.scoreCardValueRed}>
                      <Clock size={18} /> {formattedDuration}
                    </div>
                  </div>
                </div>

                <div className={styles.takeoverBottomArea}>
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className={styles.takeoverDuoBtn}
                  >
                    LET&apos;S GO! →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── SCREEN 2: JOURNEY PREVIEW — still nothing enrolled ─── */}
            {step === 2 && (
              <motion.div
                key="wizard-step-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 320, damping: 32 },
                  opacity: { duration: 0.15, ease: 'easeOut' },
                }}
                className={styles.takeoverStepCard}
              >
                <div className={styles.takeoverMascotWrapSmall}>
                  <Image
                    src="/User onbarding Assets/Tey_welcome.webp"
                    alt="Tey Mascot"
                    width={160}
                    height={160}
                    priority
                    className={styles.mascotJourneySmall}
                  />
                </div>

                <h1 className={styles.takeoverTitleClean}>Your Learning Path</h1>
                <p className={styles.takeoverSubtitle}>
                  Here&apos;s how your quest unfolds, lesson by lesson.
                </p>

                <div className={styles.duoSerpentinePathBox}>
                  <div className={styles.pathNodeRowActive}>
                    <div className={styles.nodeIconGlow}>
                      <Play size={18} fill="#FFFFFF" color="#FFFFFF" />
                    </div>
                    <div className={styles.nodeStartBubble}>START</div>
                    <div className={styles.nodeInfoBlock}>
                      <div className={styles.nodeInfoTitle}>
                        {firstLessonTitle || 'Lesson 1: Getting Started'}
                      </div>
                      <div className={styles.nodeInfoSub}>First lesson unlocked &amp; ready</div>
                    </div>
                  </div>

                  <div className={styles.pathConnectorLine} />

                  <div className={styles.pathNodeRowLocked}>
                    <div className={styles.nodeIconLocked}>
                      <Lock size={15} color="#64748B" />
                    </div>
                    <div className={styles.nodeInfoBlock}>
                      <div className={styles.nodeInfoTitleLocked}>
                        {secondLessonTitle || 'Lesson 2'}
                      </div>
                      <div className={styles.nodeInfoSubLocked}>Next milestone on the path</div>
                    </div>
                  </div>

                  <div className={styles.pathConnectorLine} />

                  <div className={styles.pathChestRow}>
                    <div className={styles.chestGraphicWrap}>
                      <Image
                        src="/Tressure box.webp"
                        alt="Chest"
                        width={40}
                        height={40}
                        className={styles.chestGraphicImg}
                      />
                    </div>
                    <div className={styles.nodeInfoBlock}>
                      <div className={styles.chestTitleText}>Section 1 Mastery Chest</div>
                      <div className={styles.chestRewardText}>+50 XP Completion Bonus</div>
                    </div>
                  </div>
                </div>

                {isPaid && (
                  <div className={styles.freePreviewChip}>
                    <Sparkles size={14} color="#0172FD" />
                    First 2 lessons free · unlock the rest anytime
                  </div>
                )}

                <div className={styles.takeoverBottomArea}>
                  <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className={styles.takeoverDuoBtn}
                  >
                    CONTINUE →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── SCREEN 3: COMMITMENT — this is where enrollment happens ─── */}
            {step === 3 && (
              <motion.div
                key="wizard-step-3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 320, damping: 32 },
                  opacity: { duration: 0.15, ease: 'easeOut' },
                }}
                className={styles.takeoverStepCard}
              >
                <div className={styles.takeoverMascotWrapSmall}>
                  <Image
                    src="/User onbarding Assets/Step_7_tey_verified_state.webp"
                    alt="Tey Mascot"
                    width={200}
                    height={200}
                    priority
                    className={styles.mascotRewardBig}
                  />
                </div>

                <h1 className={styles.takeoverTitleClean}>
                  {commitStatus === 'error' ? 'HMM, THAT DIDN’T WORK' : 'READY TO BEGIN?'}
                </h1>
                <p className={styles.takeoverSubtitle}>
                  One tap enrolls you in{' '}
                  <span className={styles.highlightCourseName}>{courseTitle}</span> — your
                  progress will be saved from the very first lesson.
                </p>

                {commitStatus === 'error' && (
                  <div className={styles.errorCard}>
                    <AlertTriangle size={20} color="#DC2626" />
                    <span className={styles.errorCardText}>
                      We couldn&apos;t reach Teyro HQ. Check your connection and try again —
                      nothing was charged or lost.
                    </span>
                  </div>
                )}

                <div className={styles.takeoverBottomArea}>
                  <button
                    type="button"
                    onClick={handleCommit}
                    disabled={commitStatus === 'enrolling'}
                    className={`${styles.takeoverDuoBtnGreen} ${commitStatus === 'done' ? styles.takeoverDuoBtnClaimed : ''}`}
                  >
                    {commitStatus === 'enrolling' ? (
                      <span className={styles.btnContent}>
                        <Loader2 size={20} className={styles.btnSpinner} /> JOINING…
                      </span>
                    ) : commitStatus === 'done' ? (
                      <span className={styles.btnContent}>
                        <Check size={20} strokeWidth={3} /> ENROLLED!
                      </span>
                    ) : commitStatus === 'error' ? (
                      'RETRY'
                    ) : (
                      'START MY QUEST'
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── SCREEN 4: YOU'RE ALL SET — real server-granted rewards ─── */}
            {step === 4 && (
              <motion.div
                key="wizard-step-4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 320, damping: 32 },
                  opacity: { duration: 0.15, ease: 'easeOut' },
                }}
                className={styles.takeoverStepCard}
              >
                <h1 className={styles.takeoverTitleClean}>YOU&apos;RE ALL SET!</h1>
                <p className={styles.takeoverSubtitle}>
                  Your quest in{' '}
                  <span className={styles.highlightCourseName}>{courseTitle}</span>{' '}
                  officially begins now.
                </p>

                {welcomeReward && (
                  <div className={styles.duoScoreCardsRow}>
                    <div className={styles.duoScoreCardYellow}>
                      <div className={styles.scoreCardHeaderYellow}>Welcome XP</div>
                      <div className={styles.scoreCardValueYellow}>
                        <GamificationIcon type="gem" size={22} /> +{xpCount} XP
                      </div>
                    </div>
                    <div className={styles.duoScoreCardBlue}>
                      <div className={styles.scoreCardHeaderBlue}>Bonus</div>
                      <div className={styles.scoreCardValueBlue}>
                        <GamificationIcon type="xp" size={22} /> +{coinCount} Coins
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.duoSerpentinePathBox}>
                  <div className={styles.pathNodeRowActive}>
                    <div className={styles.nodeIconGlow}>
                      <Play size={18} fill="#FFFFFF" color="#FFFFFF" />
                    </div>
                    <div className={styles.nodeStartBubble}>UP FIRST</div>
                    <div className={styles.nodeInfoBlock}>
                      <div className={styles.nodeInfoTitle}>
                        {enrollResult?.firstLesson?.title || firstLessonTitle || 'Lesson 1'}
                      </div>
                      <div className={styles.nodeInfoSub}>Ready when you are</div>
                    </div>
                  </div>
                </div>

                {isPaid && (
                  <div className={styles.freePreviewChip}>
                    <Sparkles size={14} color="#0172FD" />
                    Free preview active — Lessons 1–2 unlocked
                  </div>
                )}

                <div className={styles.takeoverBottomArea}>
                  <button
                    type="button"
                    onClick={() => {
                      playHaptic('medium');
                      onFinish();
                    }}
                    className={styles.takeoverDuoBtnGreen}
                  >
                    START LEARNING →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </motion.div>
  );
}
