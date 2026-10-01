'use client';

/**
 * EnrollmentWizard — the full-screen enrolment scene, Duolingo-style.
 *
 * Three beats, one tap each:
 *   1. hook    Tey waves, the course tile pops in, and the stat tiles land
 *              one by one with a tick. Nothing is committed.
 *   2. path    Unit 1 as a mini path: lesson 1 glowing with START, lesson 2,
 *              the unit chest. START COURSE is the commitment: it calls
 *              `enroll()` — the scene's only backend call. A failure shows a
 *              Duolingo-style bottom sheet with TRY AGAIN; nothing is faked.
 *   3. done    Confetti, the "enrolled" fanfare and a big haptic. Tey cheers,
 *              the welcome reward (whatever the
 *              server actually granted) counts up, and START LESSON 1 goes
 *              straight into the first lesson — no stop at the course map.
 *
 * Presentational: the parent owns the API call and navigation. Mount it
 * conditionally inside <AnimatePresence>; state starts fresh on every mount.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, Lock, Star, X } from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { CourseCover } from './CourseCover';
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
  courseId?: string;
  courseTitle: string;
  category?: string | null;
  thumbnailUrl?: string | null;
  /** Paid course → "first 2 lessons free" (a preview, not a paywall). */
  isPaid: boolean;
  firstLessonTitle?: string;
  secondLessonTitle?: string;
  unitTitle?: string;
  stats: { totalLessons: number; totalXp: number; totalMinutes: number };
  /** POST /courses/:id/enroll in the parent. Throws on failure. */
  enroll: () => Promise<EnrollResponse>;
  onClose: () => void;
  /** Parent routes into the first lesson. */
  onFinish: (result: EnrollResponse | null) => void;
}

type Beat = 'hook' | 'path' | 'done';
const BEATS: Beat[] = ['hook', 'path', 'done'];
type Commit = 'idle' | 'enrolling' | 'error';

/** Eased 0→target tween; ticks a coin sound every few steps. */
function useCountUp(target: number, active: boolean, delayMs = 0, durationMs = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || target <= 0) return;
    let raf = 0;
    let lastTick = 0;
    const t0 = performance.now() + delayMs;
    const tick = (now: number) => {
      const p = Math.max(0, Math.min(1, (now - t0) / durationMs));
      const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
      setValue(v);
      if (p > 0 && now - lastTick > 90 && p < 1) {
        lastTick = now;
        playSound('statTick', Math.floor(p * 5));
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, delayMs, durationMs]);
  return active ? value : 0;
}

function formatMinutes(total: number) {
  if (total <= 0) return null;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`;
}

export default function EnrollmentWizard({
  courseId,
  courseTitle,
  category,
  thumbnailUrl,
  isPaid,
  firstLessonTitle,
  secondLessonTitle,
  unitTitle,
  stats,
  enroll,
  onClose,
  onFinish,
}: EnrollmentWizardProps) {
  const reduce = useReducedMotion() ?? false;
  const [beat, setBeat] = useState<Beat>('hook');
  const [commit, setCommit] = useState<Commit>('idle');
  const [result, setResult] = useState<EnrollResponse | null>(null);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Entrance: Tey pops in, then each stat tile lands with a rising tick.
  useEffect(() => {
    playSound('teyPop');
    const statCount = [stats.totalLessons > 0, stats.totalXp > 0, stats.totalMinutes > 0].filter(Boolean).length;
    for (let i = 0; i < statCount; i++) later(() => playSound('statTick', i + 1), 520 + i * 160);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canClose = beat !== 'done' && commit !== 'enrolling';

  // Escape closes, but never mid-enrol or once enrolled.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && canClose) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [canClose, onClose]);

  // The page behind shouldn't scroll under the scene.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const toPath = () => {
    playHaptic('light', false);
    playSound('phaseTravel');
    setBeat('path');
    // The path draws in: lesson 1, lesson 2, the chest.
    [0, 1, 2].forEach((i) => later(() => playSound('pathCheck', i), 380 + i * 170));
  };

  const handleCommit = useCallback(async () => {
    if (commit === 'enrolling') return; // double-tap guard
    playHaptic('medium', false);
    setCommit('enrolling');
    try {
      const r = await enroll();
      setResult(r);
      setCommit('idle');
      setBeat('done');
      playSound('enrolled');
      celebrationHaptic('big');
      if (!reduce) {
        fireConfetti({ particleCount: 110, spread: 80, origin: { y: 0.45 } });
        later(() => fireConfetti({ particleCount: 60, spread: 110, origin: { y: 0.3 } }), 450);
      }
    } catch {
      playSound('wrong');
      playHaptic('error', false);
      setCommit('error');
    }
  }, [commit, enroll, reduce]);

  const start = () => {
    if (leaving) return;
    setLeaving(true);
    playSound('start');
    playHaptic('medium', false);
    onFinish(result);
  };

  const reward = result?.welcomeReward ?? null;
  const xp = useCountUp(reward?.xp ?? 0, beat === 'done', 700);
  const coins = useCountUp(reward?.coins ?? 0, beat === 'done', 1100);
  const firstTitle = result?.firstLesson?.title || firstLessonTitle || 'Lesson 1';
  const minutes = formatMinutes(stats.totalMinutes);
  const step = BEATS.indexOf(beat);

  const pop = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, scale: 0.6, y: 12 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { type: 'spring' as const, stiffness: 420, damping: 18, delay },
        };

  return (
    <motion.div
      className={styles.scene}
      role="dialog"
      aria-modal="true"
      aria-label={`Start ${courseTitle}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ── Top: close + progress ─────────────────────────────────────── */}
      <div className={styles.top}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={() => {
            if (!canClose) return;
            playSound('menuClose');
            onClose();
          }}
          style={{ visibility: canClose ? 'visible' : 'hidden' }}
        >
          <X size={26} strokeWidth={3} />
        </button>
        <div className={styles.progress} role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1}>
          <motion.span
            className={styles.progressFill}
            animate={{ width: `${((step + 1) / BEATS.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          />
        </div>
      </div>

      {/* ── Stage ─────────────────────────────────────────────────────── */}
      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          {beat === 'hook' && (
            <motion.div
              key="hook"
              className={styles.beat}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            >
              <div className={styles.teyRow}>
                <motion.div {...pop(0)} className={styles.teyWrap}>
                  <Image src="/User onbarding Assets/tey/welcome.webp" alt="" width={124} height={155} priority className={styles.teyImg} />
                </motion.div>
                <motion.p className={styles.bubble} {...pop(0.15)}>
                  Great pick! Let&apos;s get you started with <strong>{courseTitle}</strong>.
                </motion.p>
              </div>

              <motion.div {...pop(0.3)} className={styles.tileWrap}>
                <CourseCover
                  id={courseId}
                  category={category}
                  thumbnailUrl={thumbnailUrl}
                  sizes="200px"
                  glyphSize={52}
                  className={styles.tile}
                  priority
                />
              </motion.div>

              <div className={styles.stats}>
                {stats.totalLessons > 0 && (
                  <motion.div className={`${styles.stat} ${styles.statBlue}`} {...pop(0.5)}>
                    <span className={styles.statLabel}>Lessons</span>
                    <span className={styles.statValue}>{stats.totalLessons}</span>
                  </motion.div>
                )}
                {stats.totalXp > 0 && (
                  <motion.div className={`${styles.stat} ${styles.statGold}`} {...pop(0.66)}>
                    <span className={styles.statLabel}>XP to earn</span>
                    <span className={styles.statValue}>
                      <Image src="/art/ui/xp-bolt.svg" alt="" width={22} height={22} />
                      {stats.totalXp.toLocaleString()}
                    </span>
                  </motion.div>
                )}
                {minutes && (
                  <motion.div className={`${styles.stat} ${styles.statGreen}`} {...pop(0.82)}>
                    <span className={styles.statLabel}>Total time</span>
                    <span className={styles.statValue}>{minutes}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {beat === 'path' && (
            <motion.div
              key="path"
              className={styles.beat}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            >
              <div className={styles.teyRow}>
                <motion.div {...pop(0)} className={styles.teyWrap}>
                  <Image src="/User onbarding Assets/tey/pointing.webp" alt="" width={116} height={150} priority className={styles.teyImg} />
                </motion.div>
                <motion.p className={styles.bubble} {...pop(0.12)}>
                  {isPaid
                    ? 'Here’s your path. The first 2 lessons are free, so jump in.'
                    : 'Here’s your path. A few minutes a day and you’ll fly through it.'}
                </motion.p>
              </div>

              <div className={styles.path}>
                <motion.div className={styles.unitBanner} {...pop(0.2)}>
                  <span className={styles.unitNumber}>Unit 1</span>
                  <span className={styles.unitTitle}>{unitTitle || courseTitle}</span>
                </motion.div>

                <div className={styles.nodes}>
                  <motion.div className={`${styles.nodeRow} ${styles.nodeLeft}`} {...pop(0.38)}>
                    <span className={styles.startBubble}>START</span>
                    <span className={`${styles.node} ${styles.nodeActive}`} aria-hidden="true">
                      <Star size={30} strokeWidth={2.5} fill="currentColor" />
                    </span>
                    <span className={styles.nodeLabel}>{firstTitle}</span>
                  </motion.div>
                  <motion.div className={`${styles.nodeRow} ${styles.nodeRight}`} {...pop(0.55)}>
                    <span className={`${styles.node} ${styles.nodeNext}`} aria-hidden="true">
                      {isPaid ? <Star size={26} strokeWidth={2.5} fill="currentColor" /> : <Lock size={24} strokeWidth={3} />}
                    </span>
                    <span className={styles.nodeLabel}>{secondLessonTitle || 'Lesson 2'}</span>
                  </motion.div>
                  <motion.div className={`${styles.nodeRow} ${styles.nodeCenter}`} {...pop(0.72)}>
                    <Image src="/art/items/chest-bronze.svg" alt="" width={64} height={64} />
                    <span className={styles.nodeLabel}>Unit chest</span>
                  </motion.div>
                </div>
              </div>

              {isPaid && (
                <motion.p className={styles.freeChip} {...pop(0.85)}>
                  First 2 lessons free · unlock the rest anytime
                </motion.p>
              )}
            </motion.div>
          )}

          {beat === 'done' && (
            <motion.div
              key="done"
              className={`${styles.beat} ${styles.doneBeat}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.glow} aria-hidden="true" />
              <motion.div
                className={styles.cheer}
                initial={reduce ? false : { scale: 0.3, y: 60, opacity: 0 }}
                animate={reduce ? undefined : { scale: 1, y: [60, -18, 0], opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <Image src="/User onbarding Assets/tey/cheering.webp" alt="" width={190} height={221} priority className={styles.teyImg} />
              </motion.div>

              <motion.h1 className={styles.headline} {...pop(0.25)}>
                You&apos;re in!
              </motion.h1>
              <motion.p className={styles.sub} {...pop(0.35)}>
                <strong>{courseTitle}</strong> is now on your path.
              </motion.p>

              {reward && (reward.xp > 0 || reward.coins > 0) && (
                <div className={styles.rewards}>
                  {reward.xp > 0 && (
                    <motion.div className={`${styles.reward} ${styles.rewardGold}`} {...pop(0.6)}>
                      <span className={styles.rewardLabel}>Welcome XP</span>
                      <span className={styles.rewardValue}>
                        <Image src="/art/ui/xp-bolt.svg" alt="" width={26} height={26} />+{xp}
                      </span>
                    </motion.div>
                  )}
                  {reward.coins > 0 && (
                    <motion.div className={`${styles.reward} ${styles.rewardBlue}`} {...pop(0.8)}>
                      <span className={styles.rewardLabel}>Bonus coins</span>
                      <span className={styles.rewardValue}>
                        <Image src="/Icons/Coin.png" alt="" width={26} height={26} />+{coins}
                      </span>
                    </motion.div>
                  )}
                </div>
              )}

              <motion.div className={styles.upFirst} {...pop(reward ? 1 : 0.6)}>
                <span className={`${styles.node} ${styles.nodeActive} ${styles.nodeSm}`} aria-hidden="true">
                  <Star size={22} strokeWidth={2.5} fill="currentColor" />
                </span>
                <span className={styles.upFirstText}>
                  <span className={styles.upFirstLabel}>Up first</span>
                  <span className={styles.upFirstTitle}>{firstTitle}</span>
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom action bar (the lesson player's) ───────────────────── */}
      <div className={`${styles.footer} ${commit === 'error' ? styles.footerError : ''}`}>
        <div className={styles.footerInner}>
          {commit === 'error' && (
            <div className={styles.errorMsg} role="alert">
              <AlertCircle size={28} strokeWidth={2.75} aria-hidden="true" />
              <span>
                <strong>That didn&apos;t go through.</strong>
                <br />
                Check your connection. Nothing was charged.
              </span>
            </div>
          )}

          {beat === 'hook' && (
            <button type="button" className={styles.btn} onClick={toPath}>
              Continue
            </button>
          )}
          {beat === 'path' && (
            <button
              type="button"
              className={`${styles.btn} ${commit === 'error' ? styles.btnError : ''}`}
              onClick={handleCommit}
              disabled={commit === 'enrolling'}
              aria-busy={commit === 'enrolling'}
            >
              {commit === 'enrolling' ? <span className={styles.spinner} aria-hidden="true" /> : null}
              {commit === 'enrolling' ? 'Joining…' : commit === 'error' ? 'Try again' : 'Start course'}
            </button>
          )}
          {beat === 'done' && (
            <>
              <button type="button" className={styles.btn} onClick={start} disabled={leaving}>
                Start lesson 1
              </button>
              <button
                type="button"
                className={styles.laterBtn}
                onClick={() => {
                  playSound('menuClose');
                  onClose();
                }}
              >
                Later
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
