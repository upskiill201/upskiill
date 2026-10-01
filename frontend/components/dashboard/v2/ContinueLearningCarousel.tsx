'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, BrainCircuit, ChevronLeft, ChevronRight, CodeXml, type LucideIcon } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { nextLessonHref, preloadCourse, type Enrollment } from '@/hooks/useCourse';
import styles from './ContinueLearningCarousel.module.css';

interface ContinueLearningCarouselProps {
  /** The learner's OTHER courses — the current one is already the hero card. */
  enrollments?: Enrollment[];
}

/** A category icon, so each card is recognisable at a glance (no emoji). */
function iconFor(category: string | null): LucideIcon {
  const c = (category ?? '').toLowerCase();
  if (/(ai|artificial|machine|data)/.test(c)) return BrainCircuit;
  if (/develop|software|code|coding|programming|it/.test(c)) return CodeXml;
  return BookOpen;
}

/**
 * Real enrollments only. This used to invent three demo courses ("Digital
 * Marketing Mastery 2025", 48%…) when the list was empty, fake every real
 * card's "Lesson x / 25", and treat any course id starting with "c" as one of
 * those demos — sending real courses like `c1-joel` to the catalogue instead.
 * With nothing to show, it now renders nothing.
 */
export default function ContinueLearningCarousel({ enrollments = [] }: ContinueLearningCarouselProps) {
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);

  if (enrollments.length === 0) return null;

  const coursesToRender = enrollments.slice(0, 8).map((e) => {
    const total = e.course.totalLessons;
    const done = Math.min(e.completedCount ?? 0, total);
    return {
      enrollment: e,
      id: e.course.id,
      title: e.course.title,
      Icon: iconFor(e.course.category),
      total,
      done,
      progressPct: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  });

  const handleScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    playHaptic('light');
    const scrollAmount = direction === 'left' ? -200 : 200;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleCourseClick = (enrollment: Enrollment) => {
    playHaptic('medium');
    router.push(nextLessonHref(enrollment));
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>CONTINUE LEARNING</h2>
          <button
            type="button"
            onClick={() => router.push('/dashboard/my-learning')}
            className={styles.viewAllLink}
          >
            View all
          </button>
        </div>
        <div className={styles.navControls}>
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className={styles.arrowBtn}
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className={styles.arrowBtn}
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className={styles.carouselTrack} ref={trackRef}>
        {coursesToRender.map((c, idx) => {
          const isActive = idx === 0;
          return (
            <button
              type="button"
              key={c.id}
              className={`${styles.courseCard} ${isActive ? styles.courseCardActive : ''} text-left`}
              onClick={() => handleCourseClick(c.enrollment)}
              // Warm the map on intent, so the tap opens it from cache.
              onPointerEnter={() => preloadCourse(c.id)}
              onFocus={() => preloadCourse(c.id)}
            >
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>
                  <c.Icon size={18} strokeWidth={2.4} aria-hidden="true" />
                </div>
                <h3 className={styles.courseTitle}>{c.title}</h3>
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.progressLabelRow}>
                  <span>{c.total > 0 ? `${c.done} / ${c.total} lessons` : 'Lessons coming soon'}</span>
                  <span>{c.progressPct}%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${c.progressPct}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
