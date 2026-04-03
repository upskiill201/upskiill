'use client';

import React, { useState } from 'react';
import { ChevronDown, CheckCircle, Clock } from 'lucide-react';
import { LessonItem, LessonItemProps } from './LessonItem';
import styles from './SectionAccordion.module.css';

export interface SectionAccordionProps {
  title: string;              // e.g. "Section 3: Advanced JavaScript"
  lessonCount: number;
  totalDuration: string;      // e.g. "1h 24m"
  completedCount?: number;    // optional — shows "X / Y complete"
  defaultOpen?: boolean;
  lessons: LessonItemProps[]; // array of lesson items to render
}

export const SectionAccordion = ({
  title,
  lessonCount,
  totalDuration,
  completedCount,
  defaultOpen = false,
  lessons,
}: SectionAccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const allComplete = completedCount !== undefined && completedCount === lessonCount;

  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.open : ''}`}>
      {/* HEADER — click to toggle */}
      <button
        className={styles.header}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        {/* Left: title + meta */}
        <div className={styles.headerLeft}>
          <div className={styles.titleRow}>
            {allComplete && (
              <CheckCircle size={16} className={styles.allDoneIcon} />
            )}
            <span className={styles.sectionTitle}>{title}</span>
          </div>
          <div className={styles.meta}>
            <span className={styles.metaChip}>
              <Clock size={12} />
              {totalDuration}
            </span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaChip}>
              {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
            </span>
            {completedCount !== undefined && (
              <>
                <span className={styles.metaDot}>·</span>
                <span className={`${styles.metaChip} ${allComplete ? styles.allDoneChip : ''}`}>
                  {completedCount}/{lessonCount} complete
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right: chevron */}
        <ChevronDown
          size={18}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          strokeWidth={2.5}
        />
      </button>

      {/* BODY — collapsible */}
      <div className={`${styles.body} ${isOpen ? styles.bodyOpen : ''}`}>
        <div className={styles.lessonList}>
          {lessons.map((lesson, i) => (
            <LessonItem key={lesson.title + i} {...lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};
