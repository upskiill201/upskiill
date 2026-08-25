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
  currentLessonIndex = 1,
  totalLessons = 25,
  onNodeClick,
}: JourneyPathMapProps) {
  const router = useRouter();
  const { celebrate } = useCelebration();
  const [lockedTooltip, setLockedTooltip] = useState<number | null>(null);

  // Compute actual completed lessons from enrollment
  const completedLessons = Array.isArray(currentEnrollment?.completedLessons)
    ? currentEnrollment.completedLessons
    : [];
  const completedCount = completedLessons.length;
  const activeLessonNum = Math.min(totalLessons, completedCount + 1);

  // Generate 7 display nodes centered around the user's current progress:
  // (3 completed, 1 active "You are here", 2 locked, 1 milestone gift node)
  const nodes = [
    { type: activeLessonNum > 1 ? 'completed' : 'current', num: 1, label: '1' },
    { type: activeLessonNum > 2 ? 'completed' : activeLessonNum === 2 ? 'current' : 'locked', num: 2, label: '2' },
    { type: activeLessonNum > 3 ? 'completed' : activeLessonNum === 3 ? 'current' : 'locked', num: 3, label: '3' },
    { type: activeLessonNum > 4 ? 'completed' : activeLessonNum === 4 ? 'current' : 'locked', num: 4, label: '4' },
    { type: activeLessonNum > 5 ? 'completed' : activeLessonNum === 5 ? 'current' : 'locked', num: 5, label: '5' },
    { type: activeLessonNum > 6 ? 'completed' : activeLessonNum === 6 ? 'current' : 'locked', num: 6, label: '6' },
    { type: 'reward', num: 7, label: 'gift' },
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

    const courseId = currentEnrollment?.courseId || currentEnrollment?.course?.id;
    if (courseId) {
      router.push(`/learn/${courseId}/section/1`);
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
                ) : (
                  node.label
                )}
              </button>

              {node.type === 'current' && (
                <span className={styles.hereTooltip}>You are here</span>
              )}

              {lockedTooltip === node.num && (
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
