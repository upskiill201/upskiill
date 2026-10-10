'use client';

/**
 * My Learning — Duolingo's course switcher. The course on your home path sits
 * on top with its next lesson and a big CONTINUE; every other course is a row
 * you can switch to, open the map of, or jump into its community (the
 * Classroom tab in a community lands here via the course map).
 *
 * One cached request (/api/auth/me/enrollments, shared with home), so it
 * paints from cache on return.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, Check, Map as MapIcon, MessagesSquare, Plus } from 'lucide-react';
import { LearnerRail } from '@/components/layout/LearnerRail';
import { lessonHref, pickCurrentEnrollment, preloadCourse, useEnrollments, type Enrollment } from '@/hooks/useCourse';
import { getHomeCourse, setHomeCourse } from '@/lib/homeCourse';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import styles from './MyLearning.module.css';
import { courseHomeHref } from '@/lib/homeCourse';

const TINTS = ['tintBlue', 'tintGreen', 'tintOrange', 'tintPurple'] as const;

function lessonsDone(e: Enrollment) {
  return Math.min(e.completedCount ?? 0, e.course.totalLessons || 0);
}

function pct(e: Enrollment) {
  const total = e.course.totalLessons || 0;
  return total > 0 ? Math.round((lessonsDone(e) / total) * 100) : 0;
}

function isComplete(e: Enrollment) {
  return (e.course.totalLessons || 0) > 0 && !e.nextLesson;
}

function CourseTile({ e, i, size }: { e: Enrollment; i: number; size: 'lg' | 'sm' }) {
  return (
    <span className={`${styles.tile} ${styles[TINTS[i % TINTS.length]]} ${size === 'lg' ? styles.tileLg : ''}`}>
      {e.course.thumbnailUrl ? (
        <Image src={e.course.thumbnailUrl} alt="" fill sizes={size === 'lg' ? '160px' : '64px'} className={styles.tileImg} />
      ) : (
        <span className={styles.tileLetter}>{e.course.title.charAt(0).toUpperCase()}</span>
      )}
      {isComplete(e) && (
        <span className={styles.tileDone} aria-label="Course complete">
          <Check size={size === 'lg' ? 18 : 14} strokeWidth={3.5} />
        </span>
      )}
    </span>
  );
}

export default function MyLearningPage() {
  const router = useRouter();
  const { enrollments, error, mutate } = useEnrollments();
  // Read once: the course home's path shows. Client-only, and it only
  // matters once enrollments exist (never on the first render).
  const [homeId, setHomeId] = useState<string | null>(() => getHomeCourse());

  const list = enrollments ?? [];
  const current = list.find((e) => e.course.id === homeId) ?? pickCurrentEnrollment(list);
  const others = list.filter((e) => e.course.id !== current?.course.id);

  const continueHref = (e: Enrollment) =>
    e.nextLesson ? lessonHref(e.course.id, e.nextLesson.sectionIndex, e.nextLesson.id) : courseHomeHref(e.course.id);

  const switchTo = (e: Enrollment) => {
    playSound('toggleOn');
    playHaptic('success', false);
    setHomeCourse(e.course.id);
    setHomeId(e.course.id);
    preloadCourse(e.course.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <header className={styles.head}>
          <div>
            <h1 className={styles.title}>My courses</h1>
            <p className={styles.sub}>Pick up where you left off, or switch what your home path shows.</p>
          </div>
          <Link href="/dashboard/explore" className={styles.addBtn} onClick={() => playSound('navTap', 2)}>
            <Plus size={18} strokeWidth={3} aria-hidden="true" /> Add a course
          </Link>
        </header>

        {error && !enrollments ? (
          <div className={styles.errorBox} role="alert">
            <AlertCircle size={28} aria-hidden="true" />
            <p>We couldn&apos;t load your courses.</p>
            <button type="button" className={styles.ghostBtn} onClick={() => void mutate()}>
              Try again
            </button>
          </div>
        ) : !enrollments ? (
          <div aria-busy="true" aria-label="Loading your courses" className={styles.stack}>
            <div className={`${styles.skeleton} ${styles.skeletonHero}`} />
            <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
            <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
          </div>
        ) : !current ? (
          <div className={styles.empty}>
            <Image src="/dashboard tey.webp" alt="" width={140} height={140} />
            <h2 className={styles.emptyTitle}>Your first course is one tap away</h2>
            <p className={styles.emptyText}>Pick a skill, finish two lessons, and you&apos;re in its community.</p>
            <Link href="/dashboard/explore" className={styles.primaryBtn} onClick={() => playSound('navTap', 1)}>
              Explore courses
            </Link>
          </div>
        ) : (
          <>
            {/* The course on your home path. */}
            <section className={styles.hero} aria-label="Current course">
              <CourseTile e={current} i={list.indexOf(current)} size="lg" />
              <div className={styles.heroBody}>
                <span className={styles.eyebrow}>{isComplete(current) ? 'Course complete' : 'Current course'}</span>
                <h2 className={styles.heroTitle}>{current.course.title}</h2>
                {current.nextLesson ? (
                  <p className={styles.upNext}>
                    <strong>Up next:</strong> Lesson {current.nextLesson.number} · {current.nextLesson.title}
                  </p>
                ) : (
                  <p className={styles.upNext}>Every lesson done. Revisit any of them from the map.</p>
                )}
                <div className={styles.progress}>
                  <span className={styles.track}>
                    <span className={styles.fill} style={{ width: `${pct(current)}%` }} />
                  </span>
                  <span className={styles.progressText}>
                    {lessonsDone(current)} / {current.course.totalLessons || 0}
                  </span>
                </div>
                <div className={styles.heroActions}>
                  <Link
                    href={continueHref(current)}
                    className={styles.primaryBtn}
                    onMouseEnter={() => preloadCourse(current.course.id)}
                    onClick={() => {
                      playSound('navTap', 1);
                      playHaptic('medium', false);
                    }}
                  >
                    {isComplete(current) ? 'Review' : lessonsDone(current) === 0 ? 'Start' : 'Continue'}
                  </Link>
                  <Link href={courseHomeHref(current.course.id)} className={styles.ghostBtn} onClick={() => playSound('navTap', 2)}>
                    <MapIcon size={18} strokeWidth={2.75} aria-hidden="true" /> Course map
                  </Link>
                  <Link
                    href={`/dashboard/community/${current.course.id}`}
                    className={styles.ghostBtn}
                    onClick={() => playSound('navTap', 3)}
                  >
                    <MessagesSquare size={18} strokeWidth={2.75} aria-hidden="true" /> Community
                  </Link>
                </div>
              </div>
            </section>

            {others.length > 0 && (
              <section aria-label="Your other courses">
                <h2 className={styles.sectionTitle}>Your other courses</h2>
                <ul className={styles.list}>
                  {others.map((e) => (
                    <li key={e.id} className={styles.row}>
                      <Link
                        href={courseHomeHref(e.course.id)}
                        className={styles.rowLink}
                        onMouseEnter={() => preloadCourse(e.course.id)}
                        onClick={() => playSound('navTap', 2)}
                      >
                        <CourseTile e={e} i={list.indexOf(e)} size="sm" />
                        <span className={styles.rowText}>
                          <span className={styles.rowTitle}>{e.course.title}</span>
                          <span className={styles.rowProgress}>
                            <span className={styles.trackSm}>
                              <span className={styles.fill} style={{ width: `${pct(e)}%` }} />
                            </span>
                            <span className={styles.rowMeta}>
                              {isComplete(e) ? 'Complete' : `${lessonsDone(e)} / ${e.course.totalLessons || 0} lessons`}
                            </span>
                          </span>
                        </span>
                      </Link>
                      <button type="button" className={styles.switchBtn} onClick={() => switchTo(e)}>
                        Switch
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <button
              type="button"
              className={styles.homeLink}
              onClick={() => {
                playSound('navTap', 4);
                router.push('/dashboard');
              }}
            >
              Go to your path
            </button>
          </>
        )}
      </div>

      <LearnerRail />
    </div>
  );
}
