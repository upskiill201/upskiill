'use client';

import React, { useState } from 'react';
import { Check, Gift, Lock } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { useCelebration } from '@/context/CelebrationContext';
import type { Enrollment } from '@/hooks/useCourse';
import styles from './JourneyPathMap.module.css';

interface JourneyPathMapProps {
  enrollment: Enrollment;
  /** Opens the map at the learner's next lesson. */
  onContinue: () => void;
}

/**
 * A compact strip of the path around the learner's real position.
 *
 * Built only from `nextLesson.number` and `totalLessons`, both computed
 * server-side from the same completed-lessons list the map reads. It used to
 * fall back to "Step 12 of 25" for anyone without progress data — every new
 * learner saw themselves twelve lessons into a course they had not started.
 */
export default function JourneyPathMap({ enrollment, onContinue }: JourneyPathMapProps) {
  const { celebrate } = useCelebration();
  const [lockedTooltip, setLockedTooltip] = useState<number | null>(null);

  const totalLessons = enrollment.course.totalLessons;
  const courseComplete = !enrollment.nextLesson;
  // Finished course: the "current" position is past the last lesson.
  const activeLessonNum = enrollment.nextLesson?.number ?? totalLessons;

  // A window of up to 6 lessons centred on the learner — two done behind
  // them, "you are here", then what's ahead.
  const windowSize = 6;
  const windowStart = Math.max(1, Math.min(activeLessonNum - 2, totalLessons - windowSize + 1));
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
  // Finish-line milestone — always the last slot.
  const nodes = [...lessonNodes, { type: 'reward', num: totalLessons, label: 'gift' }];

  const handleNodeClick = (node: (typeof nodes)[0]) => {
    if (node.type === 'reward') {
      playHaptic('medium');
      // Milestone Gift Chest — self-fetches /chest/today, same underlying
      // resource as the dashboard card and Herald banner (one Daily Chest
      // per user per day server-side). Shared dedupeKey so this can't queue
      // a second CHEST scene alongside one already surfaced this session.
      celebrate({ kind: 'CHEST', dedupeKey: 'daily-chest' });
      return;
    }

    if (node.type === 'locked') {
      playHaptic('light');
      setLockedTooltip(node.num);
      setTimeout(() => setLockedTooltip(null), 2500);
      return;
    }

    // Done or current: open the map at the learner's next lesson. The
    // handler owns the haptic, so this tap doesn't buzz twice.
    onContinue();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <span className={styles.title}>YOUR JOURNEY</span>
        <span className="text-[11px] font-bold text-slate-500">
          {courseComplete ? 'Course complete!' : `Lesson ${activeLessonNum} of ${totalLessons}`}
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
                  <Gift size={16} className="text-purple-600" />
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
                <span className={`${styles.hereTooltip} !bg-red-500 !text-white`}>
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
