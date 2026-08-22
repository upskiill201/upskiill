'use client';

import React from 'react';
import { Check } from 'lucide-react';
import styles from './JourneyPathMap.module.css';

interface JourneyPathMapProps {
  currentLessonIndex?: number;
  totalLessons?: number;
}

export default function JourneyPathMap({ currentLessonIndex = 12 }: JourneyPathMapProps) {
  // Generate 7 display nodes: 3 completed, 1 current (12), 2 upcoming (13, 14), 1 gift/reward node
  const nodes = [
    { type: 'completed', label: '1' },
    { type: 'completed', label: '2' },
    { type: 'completed', label: '3' },
    { type: 'current', label: String(currentLessonIndex) },
    { type: 'locked', label: String(currentLessonIndex + 1) },
    { type: 'locked', label: String(currentLessonIndex + 2) },
    { type: 'reward', label: '🎁' },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <span className={styles.title}>YOUR JOURNEY</span>
      </div>

      <div className={styles.pathContainer}>
        {nodes.map((node, i) => (
          <React.Fragment key={i}>
            <div className={styles.nodeItem}>
              <div
                className={[
                  styles.nodeCircle,
                  node.type === 'completed' ? styles.nodeCompleted : '',
                  node.type === 'current' ? styles.nodeCurrent : '',
                  node.type === 'locked' ? styles.nodeLocked : '',
                  node.type === 'reward' ? styles.nodeReward : '',
                ].join(' ')}
              >
                {node.type === 'completed' ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  node.label
                )}
              </div>

              {node.type === 'current' && (
                <span className={styles.hereTooltip}>You are here</span>
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
