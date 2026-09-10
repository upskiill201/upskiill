'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Gift, Lock } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { useCelebration } from '@/context/CelebrationContext';
import styles from './JourneyPathMap.module.css';

interface JourneyPathMapProps {
  currentEnrollment?: any;
  currentLessonIndex?: number;
  totalLessons?: number;
  onNodeClick?: (lessonNum: number) => void;
}

export default function JourneyPathMap({
  currentEnrollment,
  currentLessonIndex,
  totalLessons: totalLessonsProp,
  onNodeClick,
}: JourneyPathMapProps) {
  const router = useRouter();
  const { celebrate } = useCelebration();
  const [lockedTooltip, setLockedTooltip] = useState<number | null>(null);

  // Real per-course lesson count (auth.service.ts getMyEnrollments) — falls
  // back to the caller's prop, then 25, only if the enrollment truly has none.
  const totalLessons = currentEnrollment?.course?.totalLessons || totalLessonsProp || 25;

  // Compute actual completed lessons from enrollment. `currentLessonIndex`
  // (derived from the enrollment's real `progress` %) is the source of truth
  // when passed — `completedLessons` alone under/over-counts whenever a
  // student skips ahead or a lesson is re-opened, so it's only a fallback.
  const completedLessons = Array.isArray(currentEnrollment?.completedLessons)
    ? currentEnrollment.completedLessons
    : [];
  const completedCount = completedLessons.length;
  const activeLessonNum = Math.min(
    totalLessons,
    currentLessonIndex ?? completedCount + 1
  );
  // 100%-complete course: the clamp above pins activeLessonNum to the final
  // lesson, which would otherwise render as "current" (You are here) on a
  // lesson the student already finished.
  const courseComplete = (currentEnrollment?.progress ?? 0) >= 100;

  // Generate 6 display nodes as a sliding window CENTERED on the user's real
  // position (activeLessonNum), not a fixed lesson-1-through-6 range — a
  // student on lesson 16/25 must see lessons ~14-19 (2 completed behind them,
  // "you are here", then locked ahead), never a wall of 6 checkmarks because
  // the window itself was hardcoded to 1-6 regardless of actual progress.
  const windowSize = 6;
  const windowStart = Math.max(
    1,
    Math.min(activeLessonNum - 2, totalLessons - windowSize + 1)
  );
  const lessonNodes = Array.from({ length: Math.min(windowSize, totalLessons) }, (_, i) => {
    const num = windowStart + i;
    const type =
      num < activeLessonNum || (courseComplete && num === activeLessonNum)
        ? 'completed'
        : num === activeLessonNum
          ? 'current'
          : 'locked';
    return { type, num, label: String(num) };
  });
  // Finish-line milestone — always the last slot, reachable once every
  // lesson before it (i.e. the whole course) is done.
  const nodes = [
    ...lessonNodes,
    { type: 'reward', num: totalLessons, label: 'gift' },
  ];

  const handleNodeClick = (node: (typeof nodes)[0]) => {
    playHaptic('medium');

    if (node.type === 'reward') {
      // Milestone Gift Chest — full-page Celebration Engine reveal
      celebrate({ kind: 'CHEST' });
      return;
    }

    if (node.type === 'locked') {
      // Locked node alert
      setLockedTooltip(node.num);
      setTimeout(() => setLockedTooltip(null), 2500);
      return;
    }

    // Interactive navigation to lesson
    if (onNodeClick) {
      onNodeClick(node.num);
      return;
    }

    // No per-lesson deep link available here (this enrollment payload has no
    // section/lesson breakdown) — route into the course root and let the
    // learn page's own resume logic pick up wherever the student left off,
    // instead of hardcoding section 1 (wrong for anyone past section 1).
    const courseId = currentEnrollment?.courseId || currentEnrollment?.course?.id;
    if (courseId) {
      router.push(`/learn/${courseId}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <span className={styles.title}>YOUR JOURNEY</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>
          Step {activeLessonNum} of {totalLessons}
        </span>
      </div>

      <div className={styles.pathContainer}>
        {nodes.map((node, i) => (
          <React.Fragment key={i}>
            <div className={styles.nodeItem}>
              <button
                type="button"
                onClick={() => handleNodeClick(node)}
                className={[
                  styles.nodeCircle,
                  node.type === 'completed' ? styles.nodeCompleted : '',
                  node.type === 'current' ? styles.nodeCurrent : '',
                  node.type === 'locked' ? styles.nodeLocked : '',
                  node.type === 'reward' ? styles.nodeReward : '',
                ].join(' ')}
                aria-label={`Lesson ${node.num}`}
              >
                {node.type === 'completed' ? (
                  <Check size={15} strokeWidth={3} />
                ) : node.type === 'reward' ? (
                  <Gift size={16} className="text-[#9333EA]" />
                ) : node.type === 'locked' ? (
                  <Lock size={13} strokeWidth={2.5} />
                ) : (
                  node.label
                )}
              </button>

              {node.type === 'current' && (
                <span className={styles.hereTooltip}>You are here</span>
              )}

              {lockedTooltip === node.num && node.type === 'locked' && (
                <span className={styles.hereTooltip} style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }}>
                  Complete previous lessons to unlock
                </span>
              )}
            </div>

            {/* Connecting line to next node */}
            {i < nodes.length - 1 && (
              <div
                className={[
                  styles.connectorLine,
                  node.type === 'completed' && nodes[i + 1].type !== 'locked'
                    ? styles.connectorLineCompleted
                    : '',
                ].join(' ')}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
