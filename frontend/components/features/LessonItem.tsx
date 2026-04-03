'use client';

import React from 'react';
import { Check, Lock, Play } from 'lucide-react';
import styles from './LessonItem.module.css';

export interface LessonItemProps {
  title: string;
  duration: string;             // e.g. "12:34"
  index?: number;               // lesson number shown when not completed
  isCompleted?: boolean;        // green check
  isLocked?: boolean;           // lock icon, row dimmed
  isFreePreview?: boolean;      // "FREE" badge in green
  isActive?: boolean;           // currently watching — blue left border + highlight
  onClick?: () => void;
}

export const LessonItem = ({
  title,
  duration,
  index,
  isCompleted = false,
  isLocked = false,
  isFreePreview = false,
  isActive = false,
  onClick,
}: LessonItemProps) => {
  const handleClick = () => {
    if (!isLocked) onClick?.();
  };

  return (
    <div
      className={[
        styles.row,
        isActive ? styles.active : '',
        isLocked ? styles.locked : '',
        !isLocked ? styles.clickable : '',
      ].join(' ')}
      onClick={handleClick}
      role={!isLocked ? 'button' : undefined}
      tabIndex={!isLocked ? 0 : undefined}
      onKeyDown={(e) => {
        if (!isLocked && (e.key === 'Enter' || e.key === ' ')) handleClick();
      }}
    >
      {/* LEFT: Status icon */}
      <div className={styles.iconSlot}>
        {isLocked ? (
          <div className={styles.lockIcon}>
            <Lock size={14} strokeWidth={2.5} />
          </div>
        ) : isCompleted ? (
          <div className={styles.checkIcon}>
            <Check size={13} strokeWidth={3} />
          </div>
        ) : isActive ? (
          <div className={styles.playIcon}>
            <Play size={12} fill="currentColor" strokeWidth={0} />
          </div>
        ) : (
          <div className={styles.numberIcon}>
            {index !== undefined ? index : ''}
          </div>
        )}
      </div>

      {/* MIDDLE: Title + Free badge */}
      <div className={styles.middle}>
        <span className={styles.title}>{title}</span>
        {isFreePreview && !isLocked && (
          <span className={styles.freeBadge}>FREE</span>
        )}
      </div>

      {/* RIGHT: Duration */}
      <span className={styles.duration}>{duration}</span>
    </div>
  );
};
