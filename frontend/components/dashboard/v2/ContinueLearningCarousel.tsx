'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ContinueLearningCarousel.module.css';

interface CourseItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  bg: string;
  progressPct: number;
  completedLessons: number;
  totalLessons: number;
}

interface ContinueLearningCarouselProps {
  enrollments?: any[];
}

export default function ContinueLearningCarousel({ enrollments = [] }: ContinueLearningCarouselProps) {
  const router = Router();
  const trackRef = useRef<HTMLDivElement>(null);

  const defaultCourses: CourseItem[] = [
    {
      id: 'c1',
      title: 'Figma UI/UX Essentials',
      category: 'Design',
      icon: '🎨',
      bg: '#FCE7F3',
      progressPct: 40,
      completedLessons: 10,
      totalLessons: 25,
    },
    {
      id: 'c2',
      title: 'Full-Stack Web Development',
      category: 'Development',
      icon: '💻',
      bg: '#DBEAFE',
      progressPct: 25,
      completedLessons: 6,
      totalLessons: 24,
    },
    {
      id: 'c3',
      title: 'Python for Beginners',
      category: 'IT & Software',
      icon: '🐍',
      bg: '#FEF9C3',
      progressPct: 60,
      completedLessons: 12,
      totalLessons: 20,
    },
    {
      id: 'c4',
      title: 'UI Design Fundamentals',
      category: 'Design',
      icon: '🎨',
      bg: '#DCFCE7',
      progressPct: 15,
      completedLessons: 3,
      totalLessons: 20,
    },
  ];

  const coursesToRender = enrollments.length > 0
    ? enrollments.slice(0, 5).map((e: any, idx: number) => ({
        id: e.course?.id || String(idx),
        title: e.course?.title || 'Enrolled Course',
        category: e.course?.category || 'General',
        icon: e.course?.category?.toLowerCase().includes('dev') ? '💻' : '📚',
        bg: '#F1F5F9',
        progressPct: e.progress || 20,
        completedLessons: e.completedLessons?.length || 2,
        totalLessons: e.course?.sections?.reduce((acc: number, s: any) => acc + (s.lessons?.length || 0), 0) || 10,
      }))
    : defaultCourses;

  const handleScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = direction === 'left' ? -240 : 240;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleCourseClick = async (courseId: string) => {
    if (!courseId || courseId.startsWith('c')) {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiBase}/courses`);
        if (res.ok) {
          const courses = await res.json();
          const list = Array.isArray(courses) ? courses : courses?.courses || [];
          if (list.length > 0) {
            router.push(`/learn/${list[0].id}`);
            return;
          }
        }
      } catch (err) {
        console.error('Failed fetching fallback courses', err);
      }
      router.push('/dashboard');
      return;
    }
    router.push(`/learn/${courseId}`);
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>CONTINUE LEARNING</h2>
        <div className={styles.navControls}>
          <button type="button" onClick={() => handleScroll('left')} className={styles.arrowBtn} aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => handleScroll('right')} className={styles.arrowBtn} aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className={styles.carouselTrack} ref={trackRef}>
        {coursesToRender.map((c) => (
          <div
            key={c.id}
            className={styles.courseCard}
            onClick={() => handleCourseClick(c.id)}
          >
            <div className={styles.iconBox} style={{ backgroundColor: c.bg }}>
              <span>{c.icon}</span>
            </div>

            <h3 className={styles.courseTitle}>{c.title}</h3>

            <div className={styles.progressContainer}>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${c.progressPct}%` }} />
              </div>
              <div className={styles.metaRow}>
                <span>Lesson {c.completedLessons} / {c.totalLessons}</span>
                <span>{c.progressPct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Router() {
  return useRouter();
}
