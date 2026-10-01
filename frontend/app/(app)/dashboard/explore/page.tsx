'use client';

/**
 * Explore — Duolingo's "add a course" screen, for skills.
 *
 *  - A chunky search, category chips with icons, and a level switch. Filters
 *    come from the real catalog, never a hardcoded list.
 *  - Browsing with no filter: a featured course (the most-learned one you
 *    haven't added), then everything. Any filter: a counted results grid.
 *  - Every card opens the course page, where enrolment, auth and the paywall
 *    live. Courses you already have say ADDED and CONTINUE straight into the
 *    next lesson, like My Learning.
 *
 * Both requests go through the shared SWR cache (enrolments are the same key
 * home and My Learning read), so returning here paints instantly.
 */

import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AlertCircle,
  BookOpen,
  Check,
  Compass,
  LayoutGrid,
  Search,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react';
import { fetcher } from '@/lib/swr';
import { lessonHref, preloadCourse, useEnrollments, type Enrollment } from '@/hooks/useCourse';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { LearnerRail } from '@/components/layout/LearnerRail';
import { CourseCover, categoryGlyph } from '@/components/course/CourseCover';
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
  category: string;
  level: string;
  lessonsCount?: number;
  durationMinutes?: number;
  studentsCount?: number;
  ratingAvg?: number | null;
  reviewsCount?: number;
  instructor?: Instructor;
}

const ALL = 'All';
const MAX_CATEGORY_CHIPS = 10;
/** Below this many courses a "featured" pick just repeats the grid. */
const FEATURE_MIN_CATALOG = 4;

function prettyLevel(level: string) {
  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}

function formatDuration(minutes?: number) {
  if (!minutes || minutes <= 0) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`;
}

function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, '')}k` : String(n);
}

const isFree = (c: Course) => !c.price || c.price === 0;

export default function ExplorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, error, isLoading, mutate } = useSWR<Course[]>('/api/courses', fetcher);
  // Guests can browse: a failed enrolments request just means nothing's ADDED.
  const { enrollments } = useEnrollments();

  // Search can be seeded via /dashboard/explore?q=...
  const [query, setQuery] = useState(searchParams?.get('q') ?? '');
  const [category, setCategory] = useState(ALL);
  const [level, setLevel] = useState(ALL);

  const courses = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const enrolledById = useMemo(() => {
    const map = new Map<string, Enrollment>();
    (enrollments ?? []).forEach((e) => map.set(e.courseId ?? e.course.id, e));
    return map;
  }, [enrollments]);

  // Filters derived from the real catalog, most-populated categories first.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    courses.forEach((c) => {
      if (c.category && c.category !== 'Uncategorized') counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
    });
    const top = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, MAX_CATEGORY_CHIPS)
      .map(([name]) => name);
    return [ALL, ...top];
  }, [courses]);

  const levels = useMemo(() => {
    const order = ['beginner', 'intermediate', 'advanced'];
    const set = new Set<string>();
    courses.forEach((c) => c.level && set.add(prettyLevel(c.level)));
    const list = Array.from(set).sort((a, b) => {
      const ia = order.indexOf(a.toLowerCase());
      const ib = order.indexOf(b.toLowerCase());
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
    });
    return [ALL, ...list];
  }, [courses]);

  // A filter that no longer exists (after a refetch) quietly falls back.
  const activeCategory = categories.includes(category) ? category : ALL;
  const activeLevel = levels.includes(level) ? level : ALL;

  const q = query.toLowerCase().trim();
  const filtering = !!q || activeCategory !== ALL || activeLevel !== ALL;

  const results = useMemo(
    () =>
      courses.filter((c) => {
        const matchesSearch =
          !q ||
          [c.title, c.shortDescription, c.description, c.category, c.instructor?.fullName].some((s) =>
            (s ?? '').toLowerCase().includes(q),
          );
        const matchesCategory = activeCategory === ALL || c.category?.toLowerCase() === activeCategory.toLowerCase();
        const matchesLevel = activeLevel === ALL || c.level?.toLowerCase() === activeLevel.toLowerCase();
        return matchesSearch && matchesCategory && matchesLevel;
      }),
    [courses, q, activeCategory, activeLevel],
  );

  // The most-learned course you don't have yet (ties: the newest, which the
  // API already sorts first).
  const featured = useMemo(() => {
    if (filtering || courses.length < FEATURE_MIN_CATALOG) return null;
    return (
      courses
        .filter((c) => !enrolledById.has(c.id))
        .reduce<Course | null>((best, c) => ((c.studentsCount ?? 0) > (best?.studentsCount ?? -1) ? c : best), null) ?? null
    );
  }, [courses, enrolledById, filtering]);

  const grid = featured ? results.filter((c) => c.id !== featured.id) : results;

  const openCourse = (c: Course) => {
    playSound('nodeTap');
    playHaptic('medium', false);
    router.push(`/courses/${c.slug || c.id}`);
  };

  const continueCourse = (e: Enrollment) => {
    playSound('start');
    playHaptic('medium', false);
    router.push(e.nextLesson ? lessonHref(e.course.id, e.nextLesson.sectionIndex, e.nextLesson.id) : `/learn/${e.course.id}`);
  };

  const pickCategory = (cat: string, i: number) => {
    playSound('navTap', i);
    playHaptic('light', false);
    setCategory(cat);
  };

  const pickLevel = (lvl: string, i: number) => {
    playSound('navTap', i + 2);
    playHaptic('light', false);
    setLevel(lvl);
  };

  const resetFilters = () => {
    playSound('toggleOff');
    playHaptic('light', false);
    setQuery('');
    setCategory(ALL);
    setLevel(ALL);
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <header className={styles.head}>
          <h1 className={styles.title}>Explore</h1>
          <p className={styles.sub}>Pick a skill. Every course starts free.</p>
        </header>

        {/* ── Search + filters ─────────────────────────────────────────── */}
        <div className={styles.controls}>
          <label className={styles.search}>
            <Search size={20} strokeWidth={2.75} className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search skills, topics or creators"
              aria-label="Search courses"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className={styles.searchClear}
                aria-label="Clear search"
                onClick={() => {
                  playSound('toggleOff');
                  setQuery('');
                }}
              >
                <X size={16} strokeWidth={3} />
              </button>
            )}
          </label>

          {categories.length > 1 && (
            <div className={styles.chips} role="group" aria-label="Category">
              {categories.map((cat, i) => {
                const on = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                    aria-pressed={on}
                    onClick={() => pickCategory(cat, i)}
                  >
                    {cat === ALL ? <LayoutGrid size={18} strokeWidth={2.5} aria-hidden="true" /> : categoryGlyph(cat, 18)}
                    {cat === ALL ? 'All skills' : cat}
                  </button>
                );
              })}
            </div>
          )}

          {levels.length > 2 && (
            <div className={styles.levels} role="group" aria-label="Level">
              {levels.map((lvl, i) => {
                const on = activeLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    className={`${styles.level} ${on ? styles.levelOn : ''}`}
                    aria-pressed={on}
                    onClick={() => pickLevel(lvl, i)}
                  >
                    {lvl === ALL ? 'Any level' : lvl}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Catalog ──────────────────────────────────────────────────── */}
        {error && !data ? (
          <div className={styles.stateBox} role="alert">
            <AlertCircle size={32} className={styles.stateIconError} aria-hidden="true" />
            <h2 className={styles.stateTitle}>We couldn&apos;t load the courses</h2>
            <p className={styles.stateText}>Check your connection and try again.</p>
            <button
              type="button"
              className={styles.ghostBtn}
              onClick={() => {
                playSound('navTap', 1);
                void mutate();
              }}
            >
              Try again
            </button>
          </div>
        ) : isLoading && !data ? (
          <div aria-busy="true" aria-label="Loading courses" className={styles.grid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonCover} />
                <div className={styles.skeletonLine} />
                <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className={styles.stateBox}>
            <Image src="/dashboard tey.webp" alt="" width={120} height={120} />
            <h2 className={styles.stateTitle}>New courses are on the way</h2>
            <p className={styles.stateText}>Creators are building them right now. Check back soon.</p>
          </div>
        ) : results.length === 0 ? (
          <div className={styles.stateBox}>
            <Image src="/dashboard tey.webp" alt="" width={120} height={120} />
            <h2 className={styles.stateTitle}>No courses match that</h2>
            <p className={styles.stateText}>
              {q ? <>Nothing for &ldquo;{query.trim()}&rdquo;. </> : null}Try another word or clear the filters.
            </p>
            <button type="button" className={styles.primaryBtn} onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {featured && (
              <FeaturedCard
                course={featured}
                onOpen={() => openCourse(featured)}
              />
            )}

            <section aria-label={filtering ? 'Search results' : 'All courses'}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>
                  {filtering ? `${results.length} course${results.length === 1 ? '' : 's'}` : 'All courses'}
                </h2>
                {filtering && (
                  <button type="button" className={styles.textBtn} onClick={resetFilters}>
                    Clear
                  </button>
                )}
              </div>
              <ul className={styles.grid}>
                {grid.map((c) => (
                  <CourseCard
                    key={c.id}
                    course={c}
                    enrollment={enrolledById.get(c.id)}
                    onOpen={() => openCourse(c)}
                    onContinue={continueCourse}
                  />
                ))}
              </ul>
            </section>
          </>
        )}
      </div>

      <LearnerRail label="Your level and quests" />
    </div>
  );
}

// ─── Pieces ──────────────────────────────────────────────────────────────────

function Cover({ course, sizes }: { course: Course; sizes: string }) {
  return (
    <CourseCover id={course.id} category={course.category} thumbnailUrl={course.thumbnailUrl} sizes={sizes} className={styles.cover} />
  );
}

function Meta({ course }: { course: Course }) {
  const duration = formatDuration(course.durationMinutes);
  const hasRating = (course.reviewsCount ?? 0) > 0 && !!course.ratingAvg;
  return (
    <span className={styles.meta}>
      {!!course.lessonsCount && (
        <span className={styles.metaItem}>
          <BookOpen size={14} strokeWidth={2.75} aria-hidden="true" />
          {course.lessonsCount} lesson{course.lessonsCount === 1 ? '' : 's'}
        </span>
      )}
      {duration && <span className={styles.metaItem}>{duration}</span>}
      {!!course.studentsCount && (
        <span className={styles.metaItem}>
          <Users size={14} strokeWidth={2.75} aria-hidden="true" />
          {formatCount(course.studentsCount)}
        </span>
      )}
      {hasRating && (
        <span className={`${styles.metaItem} ${styles.rating}`}>
          <Star size={14} strokeWidth={2.5} fill="currentColor" aria-hidden="true" />
          {course.ratingAvg}
        </span>
      )}
    </span>
  );
}

function FeaturedCard({ course, onOpen }: { course: Course; onOpen: () => void }) {
  return (
    <section className={styles.featured} aria-label="Featured course">
      <button type="button" className={styles.featuredCoverBtn} onClick={onOpen} tabIndex={-1} aria-hidden="true">
        <Cover course={course} sizes="(max-width: 700px) 100vw, 280px" />
      </button>
      <div className={styles.featuredBody}>
        <span className={styles.eyebrow}>
          <Sparkles size={14} strokeWidth={2.75} aria-hidden="true" />
          {(course.studentsCount ?? 0) > 0 ? 'Most popular' : 'Featured'}
        </span>
        <h2 className={styles.featuredTitle}>{course.title}</h2>
        {(course.shortDescription || course.description) && (
          <p className={styles.featuredDesc}>{course.shortDescription || course.description}</p>
        )}
        <Meta course={course} />
        <div className={styles.featuredActions}>
          <button type="button" className={styles.primaryBtn} onClick={onOpen}>
            Start learning
          </button>
          <span className={`${styles.priceTag} ${isFree(course) ? styles.priceFree : ''}`}>
            {isFree(course) ? 'Free' : 'Premium'}
          </span>
        </div>
      </div>
    </section>
  );
}

function CourseCard({
  course,
  enrollment,
  onOpen,
  onContinue,
}: {
  course: Course;
  enrollment?: Enrollment;
  onOpen: () => void;
  onContinue: (e: Enrollment) => void;
}) {
  const added = !!enrollment;
  const total = enrollment?.course.totalLessons ?? 0;
  const done = Math.min(enrollment?.completedCount ?? 0, total);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <li className={styles.card}>
      <button
        type="button"
        className={styles.cardHit}
        aria-label={`Open ${course.title}`}
        onClick={onOpen}
        onMouseEnter={added ? () => preloadCourse(course.id) : undefined}
      />
      <Cover course={course} sizes="(max-width: 600px) 96px, (max-width: 1100px) 33vw, 240px" />
      <span className={styles.tags}>
        {added ? (
          <span className={`${styles.tag} ${styles.tagAdded}`}>
            <Check size={12} strokeWidth={4} aria-hidden="true" /> Added
          </span>
        ) : (
          <span className={`${styles.tag} ${isFree(course) ? styles.tagFree : ''}`}>
            {isFree(course) ? 'Free' : 'Premium'}
          </span>
        )}
      </span>

      <span className={styles.cardBody}>
        {course.category && course.category !== 'Uncategorized' && (
          <span className={styles.cardCategory}>{course.category}</span>
        )}
        <span className={styles.cardTitle}>{course.title}</span>
        {course.instructor?.fullName && (
          <span className={styles.byline}>
            by{' '}
            {course.instructor.username ? (
              <Link
                href={`/creator-profile/${course.instructor.username}`}
                className={styles.bylineLink}
                onClick={() => playSound('navTap', 3)}
              >
                {course.instructor.fullName}
              </Link>
            ) : (
              course.instructor.fullName
            )}
          </span>
        )}

        {added ? (
          <span className={styles.cardProgress}>
            <span className={styles.track}>
              <span className={styles.fill} style={{ width: `${pct}%` }} />
            </span>
            <span className={styles.progressText}>
              {done} / {total}
            </span>
          </span>
        ) : (
          <Meta course={course} />
        )}

        {added ? (
          <button type="button" className={`${styles.cardBtn} ${styles.cardBtnContinue}`} onClick={() => onContinue(enrollment)}>
            {enrollment.nextLesson ? (done === 0 ? 'Start' : 'Continue') : 'Review'}
          </button>
        ) : (
          <button type="button" className={styles.cardBtn} onClick={onOpen} tabIndex={-1} aria-hidden="true">
            <Compass size={16} strokeWidth={3} aria-hidden="true" /> View course
          </button>
        )}
      </span>
    </li>
  );
}
