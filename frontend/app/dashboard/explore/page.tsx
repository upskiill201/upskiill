'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Clock, BookOpen, Check, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { useTeyroLoader } from '@/components/providers/TeyroLoaderProvider';
import styles from './Explore.module.css';

interface Instructor {
  id: string;
  fullName: string;
  avatarUrl?: string;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  price: number;
  originalPrice?: number;
  category: string;
  level: string;
  duration?: string;
  rating?: number;
  reviewsCount?: number;
  studentsCount?: number;
  instructor?: Instructor;
  sections?: any[];
}

interface Enrollment {
  id: string;
  courseId: string;
  progress: number;
  completedLessons?: string[];
  course?: Course;
}

const CATEGORIES = ['All', 'Design', 'Development', 'Business', 'IT & Software'];
const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function ExplorePage() {
  const router = useRouter();
  const { showLoaderImmediate } = useTeyroLoader();

  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  // Enrolling state per course ID
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);
  const [justEnrolledId, setJustEnrolledId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch courses and student's enrollments in parallel
        const [coursesRes, enrollRes] = await Promise.allSettled([
          fetch('/api/courses'),
          fetch('/api/auth/me/enrollments', { credentials: 'include' }),
        ]);

        if (coursesRes.status === 'fulfilled' && coursesRes.value.ok) {
          const data = await coursesRes.value.json();
          setCourses(Array.isArray(data) ? data : []);
        } else {
          setError('Failed to load course catalog. Please refresh.');
        }

        if (enrollRes.status === 'fulfilled' && enrollRes.value.ok) {
          const enrollData = await enrollRes.value.json();
          setEnrollments(Array.isArray(enrollData) ? enrollData : []);
        }
      } catch (err) {
        console.error('Explore page fetch error:', err);
        setError('Network error. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  // Map of courseId -> Enrollment
  const enrollmentMap = useMemo(() => {
    const map = new Map<string, Enrollment>();
    enrollments.forEach((e) => {
      map.set(e.courseId, e);
    });
    return map;
  }, [enrollments]);

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search term filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        (course.shortDescription || '').toLowerCase().includes(q) ||
        (course.category || '').toLowerCase().includes(q);

      // Category filter
      const matchesCategory =
        selectedCategory === 'All' ||
        course.category?.toLowerCase() === selectedCategory.toLowerCase();

      // Level filter
      const matchesLevel =
        selectedLevel === 'All Levels' ||
        course.level?.toLowerCase() === selectedLevel.toLowerCase();

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  // Handle Enrollment Action
  const handleEnroll = async (courseId: string) => {
    playHaptic('medium');
    setEnrollingCourseId(courseId);

    try {
      const res = await fetch(`/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (res.status === 401) {
        router.push('/login?redirect=/dashboard/explore');
        return;
      }

      if (res.ok) {
        const data = await res.json();
        playHaptic('success');
        setJustEnrolledId(courseId);

        // Optimistically add to enrollments state
        setEnrollments((prev) => [
          ...prev,
          {
            id: data.enrollmentId || `enroll-${Date.now()}`,
            courseId,
            progress: 0,
            completedLessons: [],
          },
        ]);

        // Hide success banner after 3.5 seconds
        setTimeout(() => {
          setJustEnrolledId(null);
        }, 3500);
      } else {
        alert('Could not complete enrollment. Please try again.');
      }
    } catch (err) {
      console.error('Enrollment error:', err);
      alert('Failed to enroll in course.');
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const handleContinueLearning = (courseId: string) => {
    playHaptic('medium');
    showLoaderImmediate('Preparing interactive learning environment...', false, 12000, true, 'working');
    router.push(`/learn/${courseId}`);
  };

  const handleResetFilters = () => {
    playHaptic('light');
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All Levels');
  };

  return (
    <div className={styles.container}>
      {/* HEADER SECTION */}
      <div className={styles.headerSection}>
        <div className={styles.headerTitleRow}>
          <div>
            <h1 className={styles.title}>Explore Courses</h1>
            <p className={styles.subtitle}>
              Discover interactive, gamified learning paths crafted by top industry experts.
            </p>
          </div>
        </div>

        {/* CONTROLS ROW */}
        <div className={styles.controlsRow}>
          {/* Search Input */}
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search courses by keyword, topic, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Chips */}
          <div className={styles.categoriesScroll}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playHaptic('light');
                  setSelectedCategory(cat);
                }}
                className={`${styles.chip} ${selectedCategory === cat ? styles.chipActive : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => {
              playHaptic('light');
              setSelectedLevel(e.target.value);
            }}
            className={styles.filterSelect}
          >
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RECENT ENROLLMENT SUCCESS BANNER */}
      {justEnrolledId && (
        <div
          style={{
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 14px rgba(34, 197, 94, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle2 size={24} />
            <div>
              <strong style={{ fontSize: '15px', display: 'block' }}>You&apos;re Enrolled! 🎉</strong>
              <span style={{ fontSize: '13px', opacity: 0.9 }}>
                Course added to My Learning. Click to start your first lesson!
              </span>
            </div>
          </div>
          <button
            onClick={() => handleContinueLearning(justEnrolledId)}
            style={{
              background: 'white',
              color: '#16A34A',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Start Now →
          </button>
        </div>
      )}

      {/* COURSE CATALOG GRID */}
      {loading ? (
        <div className={styles.courseGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonThumb} />
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonText} />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>Unable to load courses</p>
          <p className={styles.emptyDesc}>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.resetBtn}>
            Retry
          </button>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>No courses found</p>
          <p className={styles.emptyDesc}>
            No published courses match your search &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
          </p>
          <button onClick={handleResetFilters} className={styles.resetBtn}>
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className={styles.courseGrid}>
          {filteredCourses.map((course) => {
            const enrollment = enrollmentMap.get(course.id);
            const isEnrolled = !!enrollment;
            const isEnrolling = enrollingCourseId === course.id;

            return (
              <div key={course.id} className={styles.exploreCardWrapper}>
                {/* Thumbnail Header */}
                <div className={styles.thumbnailContainer}>
                  <Image
                    src={
                      course.thumbnailUrl ||
                      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop'
                    }
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.thumbnailImg}
                  />
                  <span className={styles.categoryBadge}>{course.category || 'General'}</span>

                  {isEnrolled && (
                    <span className={styles.enrolledBadge}>
                      <Check size={12} /> Enrolled
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  <Link href={`/courses/${course.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                  </Link>
                  <p className={styles.courseDesc}>
                    {course.shortDescription || course.description || 'Master real-world skills with interactive challenges and projects.'}
                  </p>

                  {/* Instructor Row */}
                  <div className={styles.instructorRow}>
                    <Image
                      src={
                        course.instructor?.avatarUrl ||
                        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop'
                      }
                      alt={course.instructor?.fullName || 'Instructor'}
                      width={28}
                      height={28}
                      className={styles.instructorAvatar}
                    />
                    <span className={styles.instructorName}>
                      {course.instructor?.fullName || 'Teyro Creator'}
                    </span>
                  </div>

                  {/* Meta Details Row */}
                  <div className={styles.metaRow}>
                    <div className={styles.metaItem}>
                      <Clock size={14} /> {course.duration || '5h'}
                    </div>
                    <div className={styles.metaItem}>
                      <BookOpen size={14} /> {course.sections?.length ? `${course.sections.length} modules` : '5 modules'}
                    </div>
                    <div className={styles.metaItem}>
                      <Sparkles size={14} color="#FF8A00" /> {course.level || 'Beginner'}
                    </div>
                  </div>

                  {/* Footer Action Row */}
                  <div className={styles.cardFooter}>
                    <div className={styles.price}>
                      {course.price === 0 ? (
                        <span className={styles.priceFree}>Free</span>
                      ) : (
                        <span>${course.price.toFixed(2)}</span>
                      )}
                    </div>

                    {isEnrolled ? (
                      <button
                        onClick={() => handleContinueLearning(course.id)}
                        className={styles.continueBtn}
                      >
                        Continue <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id)}
                        disabled={isEnrolling}
                        className={styles.enrollBtn}
                      >
                        {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                        {!isEnrolling && <ArrowRight size={14} />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
