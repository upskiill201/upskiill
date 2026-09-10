'use client';

import { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Check, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playHaptic } from '@/lib/haptics';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import styles from './unlock.module.css';

/** Loose lesson container — mirrors the raw course API shape. */
interface SceneCourseSection {
  lessons?: unknown[];
}

interface SceneCelebrateProps {
  courseTitle?: string;
  sections?: SceneCourseSection[];
  completedLessons: string[];
  onContinue: () => void;
}

const MAX_CIRCLES = 9; // done circles + compress bubble + locked frontier

function extractLessonId(lesson: unknown): string | null {
  if (typeof lesson === 'string' || typeof lesson === 'number') return String(lesson);
  if (lesson && typeof lesson === 'object' && 'id' in lesson) {
    const v = (lesson as { id?: unknown }).id;
    if (typeof v === 'string' || typeof v === 'number') return String(v);
  }
  return null;
}

const columnVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const popVariants: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 18 },
  },
};

/**
 * Scene 1 — celebrates the learner's REAL progress with a staggered
 * timeline of completed lessons ending on a pulsing locked frontier.
 * Big courses compress ("+K lessons"); zero-progress gets a
 * "your journey starts now" variant. Small confetti burst once the
 * final node lands.
 */
export default function SceneCelebrate({
  courseTitle,
  sections,
  completedLessons,
  onContinue,
}: SceneCelebrateProps) {
  const reducedMotion = usePrefersReducedMotion();
  const burstTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allLessonIds = useMemo(() => {
    const ids: string[] = [];
    for (const section of sections ?? []) {
      if (!Array.isArray(section?.lessons)) continue;
      for (const lesson of section.lessons) {
        const id = extractLessonId(lesson);
        if (id) ids.push(id);
      }
    }
    return ids;
  }, [sections]);

  const model = useMemo(() => {
    const total = allLessonIds.length;
    const completedSet = new Set(completedLessons);
    const completedIds = allLessonIds.filter((id) => completedSet.has(id));
    const remaining = Math.max(0, total - completedIds.length);
    return { total, completedCount: completedIds.length, remaining, completedIds };
  }, [allLessonIds, completedLessons]);

  // Compress big histories: first completed + last N + "+K lessons" bubble.
  const rows = useMemo(() => {
    const { completedIds, completedCount } = model;
    let shown = completedIds;
    let hidden = 0;
    if (completedIds.length + 2 > MAX_CIRCLES && completedIds.length > 0) {
      const budget = MAX_CIRCLES - 2; // reserve compress bubble + frontier
      hidden = completedIds.length - budget;
      shown = [completedIds[0], ...completedIds.slice(completedIds.length - budget + 1)];
    }
    return { shown, hidden, hasProgress: completedCount > 0 };
  }, [model]);

  // One small celebratory burst after the last node pops in.
  useEffect(() => {
    if (reducedMotion) return;
    const delay = rows.shown.length * 90 + 500;
    burstTimerRef.current = setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 60,
        startVelocity: 28,
        origin: { y: 0.55 },
        colors: ['#22C55E', '#3D5AFE', '#FFC800', '#F59E0B'],
      });
    }, delay);
    return () => {
      if (burstTimerRef.current !== null) clearTimeout(burstTimerRef.current);
    };
  }, [rows.shown.length, reducedMotion]);

  const handleContinue = () => {
    playHaptic('medium');
    onContinue();
  };

  return (
    <>
      <div className={styles.sceneScroll}>
        <motion.div
          className={styles.sceneHead}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Image
            src="/User onbarding Assets/Step_7_tey_verified_state.webp"
            alt=""
            /* Asset is 670x1176 — attrs must keep that ratio or the robot squashes. */
            width={110}
            height={193}
            className={styles.celebrateMascot}
            priority
          />
          <h1 className={styles.headline}>
            {rows.hasProgress ? (
              <>
                Look how far you&apos;ve{' '}
                <span className={styles.titleAccent}>already come</span>!
              </>
            ) : (
              <>
                Your journey <span className={styles.titleAccent}>starts now</span>
              </>
            )}
          </h1>
          <p className={styles.subtitle}>
            {rows.hasProgress ? (
              <>
                I&apos;ve watched you conquer <strong>{model.completedCount} lessons</strong>
                {courseTitle ? (
                  <>
                    {' '}in <em>{courseTitle}</em>
                  </>
                ) : null}
                . Let&apos;s keep that momentum going.
              </>
            ) : (
              <>Every expert was once a beginner — I&apos;ll walk you through where it begins.</>
            )}
          </p>
        </motion.div>

        <motion.div
          className={styles.nodeColumn}
          variants={columnVariants}
          initial="hidden"
          animate="visible"
          aria-hidden="true"
        >
          {rows.hasProgress ? (
            <>
              {rows.shown.map((id, i) => (
                <div key={`done-${id}-${i}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  {i > 0 && <span className={styles.nodeLink} />}
                  <motion.span variants={popVariants} className={`${styles.timelineNode} ${styles.nodeDone}`}>
                    <Check size={18} strokeWidth={3.25} className={styles.nodeCheck} />
                  </motion.span>
                </div>
              ))}
              {rows.hidden > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <span className={styles.nodeLink} />
                  <motion.span variants={popVariants} className={`${styles.timelineNode} ${styles.nodeCompress}`}>
                    +{rows.hidden}
                  </motion.span>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span className={styles.nodeLink} />
                <motion.span variants={popVariants} className={`${styles.timelineNode} ${styles.nodeFrontier}`}>
                  <Lock size={16} strokeWidth={2.75} />
                </motion.span>
              </div>
            </>
          ) : (
            <motion.span variants={popVariants} className={`${styles.timelineNode} ${styles.nodeFrontier}`}>
              <Lock size={16} strokeWidth={2.75} />
            </motion.span>
          )}
        </motion.div>
      </div>

      <div className={styles.sceneDock}>
        <button type="button" className={styles.cta3D} onClick={handleContinue}>
          <span>{rows.hasProgress ? 'Keep going' : "Let's go"}</span>
          <ArrowRight size={17} strokeWidth={2.75} />
        </button>
      </div>
    </>
  );
}
