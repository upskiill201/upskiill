'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  Clock,
  BookOpen,
  Check,
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  Users,
  Lock,
} from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { useTeyroLoader } from '@/components/providers/TeyroLoaderProvider';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import styles from './Explore.module.css';

interface Instructor {
  id: string;
  fullName: string;
  avatarUrl?: string | null;
  username?: string | null;
}

/** Shape returned by GET /api/courses — every stat is computed server-side
 *  from real relations, so the UI never has to invent one. */
interface Course {
  id: string;
  slug: string;
  title: string;
  description?: string;
  shortDescription?: string;
  thumbnailUrl?: string | null;
  price: number;
  originalPrice?: number | null;
  category: string;
  level: string;
  duration?: string;
  modulesCount?: number;
  lessonsCount?: number;
  durationMinutes?: number;
  studentsCount?: number;
  ratingAvg?: number | null;
  reviewsCount?: number;
  instructor?: Instructor;
}

const MAX_FILTER_CHIPS = 10;

export default function ExplorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showLoaderImmediate } = useTeyroLoader();

  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State — search can be seeded via /dashboard/explore?q=...
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') ?? '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const fetchCatalog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch courses and student's enrollments in parallel. Enrollment
      // failure is non-fatal (guests can browse); catalog failure is.
      const [coursesRes, enrollRes] = await Promise.allSettled([
        fetch('/api/courses'),
        fetch('/api/auth/me/enrollments', { credentials: 'include' }),
      ]);

      if (coursesRes.status === 'fulfilled' && coursesRes.value.ok) {
        const data = await coursesRes.value.json();
        setCourses(Array.isArray(data) ? data : []);
      } else {
        setError('Failed to load course catalog.');
        setCourses([]);
      }

      if (enrollRes.status === 'fulfilled' && enrollRes.value.ok) {
        const enrollData = await enrollRes.value.json();
        const ids = Array.isArray(enrollData)
          ? new Set<string>(enrollData.map((e: { courseId: string }) => e.courseId))
          : new Set<string>();
        setEnrolledIds(ids);
      }
    } catch (err) {
      console.error('Explore page fetch error:', err);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  // Filters derived from the REAL catalog — hardcoded lists drifted out
  // of sync with what creators actually publish ("IT & Software" matched
  // nothing; real categories were unreachable).
  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => {
      if (c.category && c.category !== 'Uncategorized') set.add(c.category);
    });
    return ['All', ...Array.from(set).sort().slice(0, MAX_FILTER_CHIPS)];
  }, [courses]);

  const levels = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => {
      if (c.level) set.add(c.level);
    });
    return ['All', ...Array.from(set).sort()];
  }, [courses]);

  // Reset a filter that no longer exists in the derived chip list (e.g. after
  // a refetch shrinks the catalog)
  useEffect(() => {
    if (!categories.includes(selectedCategory)) setSelectedCategory('All');
    if (!levels.includes(selectedLevel)) setSelectedLevel('All');
  }, [categories, levels, selectedCategory, selectedLevel]);

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        (course.shortDescription || '').toLowerCase().includes(q) ||
        (course.description || '').toLowerCase().includes(q) ||
        (course.category || '').toLowerCase().includes(q) ||
        (course.instructor?.fullName || '').toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'All' ||
        course.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesLevel =
        selectedLevel === 'All' ||
        course.level?.toLowerCase() === selectedLevel.toLowerCase();

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  const formatDuration = (minutes?: number) => {
    if (!minutes || minutes <= 0) return null;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ''}`.trim() : `${m}m`;
  };

  // EVERY card click — thumbnail, body, and the CTA button alike — advances
  // the funnel to the course page, where the enrollment wizard lives (with
  // auth gating, the welcome reward celebration, and the paywall). Enrollment
  // never happens silently from the grid anymore.
  const openCourse = (course: Course) => {
    playHaptic('medium');
    router.push(`/courses/${course.slug || course.id}`);
  };

  const handleContinueLearning = (courseId: string) => {
    playHaptic('medium');
    showLoaderImmediate('Preparing interactive learning environment...', false, undefined, true, 'working');
    router.push(`/learn/${courseId}`);
  };

  const handleResetFilters = () => {
    playHaptic('light');
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
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
              aria-label="Search courses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Chips */}
          <div className={styles.categoriesScroll}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playHaptic('light');
                  setSelectedCategory(cat);
                }}
                className={`${styles.chip} ${selectedCategory === cat ? styles.chipActive : ''}`}
                aria-pressed={selectedCategory === cat}
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
            aria-label="Filter by level"
          >
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

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
          <button onClick={fetchCatalog} className={styles.resetBtn}>
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
            const isEnrolled = enrolledIds.has(course.id);
            const isFree = !course.price || course.price === 0;
            const duration = formatDuration(course.durationMinutes);
            const hasRating = (course.reviewsCount ?? 0) > 0 && !!course.ratingAvg;

            return (
              <div
                key={course.id}
                role="link"
                tabIndex={0}
                aria-label={`View ${course.title}`}
                onClick={() => openCourse(course)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCourse(course);
                  }
                }}
                className={styles.exploreCardWrapper}
              >
                {/* Thumbnail Header */}
                <div className={styles.thumbnailContainer}>
                  {course.thumbnailUrl ? (
                    <Image
                      src={course.thumbnailUrl}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.thumbnailImg}
                    />
                  ) : (
                    <div className={styles.thumbFallback}>
                      <BookOpen size={28} />
                      <span>{course.title}</span>
                    </div>
                  )}
                  <span className={styles.categoryBadge}>{course.category || 'General'}</span>

                  {/* Price tag — real pricing, hidden once enrolled */}
                  {!isEnrolled && (
                    <span
                      className={`${styles.priceTagBadge} ${isFree ? styles.priceTagFree : ''}`}
                    >
                      {isFree ? 'FREE' : (<><Lock size={11} /> Premium</>)}
                    </span>
                  )}

                  {isEnrolled && (
                    <span className={styles.enrolledBadge}>
                      <Check size={12} /> Enrolled
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseDesc}>
                    {course.shortDescription || course.description}
                  </p>

                  {/* Instructor Row — the one link that goes sideways (to the
                      creator profile), so it opts out of the card navigation */}
                  <div className={styles.instructorRow}>
                    <Avatar
                      src={course.instructor?.avatarUrl || undefined}
                      name={course.instructor?.fullName || 'Creator'}
                      size="xs"
                    />
                    {course.instructor?.username ? (
                      <Link
                        href={`/creator-profile/${course.instructor.username}`}
                        className={styles.instructorName}
                        style={{ textDecoration: 'none' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {course.instructor.fullName}
                      </Link>
                    ) : (
                      <span className={styles.instructorName}>{course.instructor?.fullName}</span>
                    )}
                  </div>

                  {/* Meta Details Row — real stats only; items without data are omitted */}
                  <div className={styles.metaRow}>
                    {duration && (
                      <div className={styles.metaItem}>
                        <Clock size={14} /> {duration}
                      </div>
                    )}
                    {!!course.lessonsCount && (
                      <div className={styles.metaItem}>
                        <BookOpen size={14} /> {course.lessonsCount} lesson{course.lessonsCount === 1 ? '' : 's'}
                      </div>
                    )}
                    {!!course.modulesCount && (
                      <div className={styles.metaItem}>
                        <Sparkles size={14} /> {course.modulesCount} modules
                      </div>
                    )}
                    {hasRating && (
                      <div className={styles.metaItem}>
                        <Star size={13} color="#F59E0B" fill="#F59E0B" /> {course.ratingAvg}
                      </div>
                    )}
                    {!!course.studentsCount && (
                      <div className={styles.metaItem}>
                        <Users size={14} /> {course.studentsCount.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Footer Action Row — both buttons advance to the course page;
                      only enrolled learners skip ahead into /learn */}
                  <div className={styles.cardFooter}>
                    <div className={styles.price}>
                      {isFree ? (
                        <span className={styles.priceFree}>Free</span>
                      ) : (
                        <Badge variant="purple" size="sm" icon={<Lock size={11} />}>Premium</Badge>
                      )}
                    </div>

                    {isEnrolled ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContinueLearning(course.id);
                        }}
                        className={styles.continueBtn}
                      >
                        Continue <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openCourse(course);
                        }}
                        className={styles.enrollBtn}
                        aria-label={
                          isFree
                            ? `Enroll in ${course.title} for free`
                            : `Start ${course.title} free`
                        }
                      >
                        {isFree ? (
                          'Enroll for Free'
                        ) : (
                          <>
                            <Zap size={15} fill="currentColor" /> Start Learning Free
                          </>
                        )}
                        <ArrowRight size={14} />
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
