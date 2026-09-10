'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import styles from './ContinueLearningCarousel.module.css';

interface CourseItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  progressPct: number;
  completedLessons: number;
  totalLessons: number;
}

interface ContinueLearningCarouselProps {
  enrollments?: any[];
}

export default function ContinueLearningCarousel({ enrollments = [] }: ContinueLearningCarouselProps) {
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);

  // Use enrollments if present, or provide default high-fidelity game cards matching mockup
  const coursesToRender = enrollments.length > 0
    ? enrollments.slice(0, 5).map((e: any, idx: number) => ({
        id: e.course?.id || String(idx),
        title: e.course?.title || 'Enrolled Course',
        category: e.course?.category || 'General',
        icon: idx === 0 ? '📚' : idx === 1 ? '💻' : '🤖',
        progressPct: e.progress || 0,
        completedLessons: Math.round(((e.progress || 0) / 100) * 25) || 1,
        totalLessons: 25,
      }))
    : [
        {
          id: 'c1',
          title: 'Digital Marketing Mastery 2025',
          category: 'Marketing',
          icon: '📚',
          progressPct: 48,
          completedLessons: 12,
          totalLessons: 25,
        },
        {
          id: 'c2',
          title: 'Full-Stack Web Development',
          category: 'Development',
          icon: '💻',
          progressPct: 22,
          completedLessons: 4,
          totalLessons: 18,
        },
        {
          id: 'c3',
          title: 'AI for Business',
          category: 'AI & Data',
          icon: '🤖',
          progressPct: 0,
          completedLessons: 0,
          totalLessons: 16,
        },
      ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    playHaptic('light');
    const scrollAmount = direction === 'left' ? -200 : 200;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleCourseClick = (courseId: string) => {
    playHaptic('medium');
    if (courseId && !courseId.startsWith('c')) {
      router.push(`/learn/${courseId}`);
    } else {
      router.push('/courses');
    }
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>CONTINUE LEARNING</h2>
          <span
            onClick={() => router.push('/dashboard/my-learning')}
            className={styles.viewAllLink}
          >
            View all
          </span>
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
            <div
              key={c.id}
              className={`${styles.courseCard} ${isActive ? styles.courseCardActive : ''}`}
              onClick={() => handleCourseClick(c.id)}
            >
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>
                  <span>{c.icon}</span>
                </div>
                <h3 className={styles.courseTitle}>{c.title}</h3>
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.progressLabelRow}>
                  <span>Lesson {c.completedLessons} / {c.totalLessons}</span>
                  <span>{c.progressPct}%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${c.progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
