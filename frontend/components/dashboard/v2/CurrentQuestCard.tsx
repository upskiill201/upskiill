'use client';

/**
 * CurrentQuestCard — the home screen's "your next lesson" hero.
 *
 * Every number on this card is real, and comes from `getMyEnrollments`:
 *  - `nextLesson` is the first published lesson not yet completed, in map
 *    order — the same lesson the map highlights;
 *  - LESSON n / total and the % are counted from the same completed-lessons
 *    list the map's checkmarks read, so the two screens can never disagree.
 *
 * It used to derive a "current lesson" from the stored `progress` % (which
 * drifts from the completed list) and fall back to lesson 12 of 25 when that
 * was missing — for everyone. It also showed the empty state while
 * enrollments were still loading, telling learners with three courses that
 * they had none. Loading now has its own skeleton.
 */

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { EXPLORE_HREF, type Enrollment } from '@/hooks/useCourse';
import styles from './CurrentQuestCard.module.css';

interface CurrentQuestCardProps {
  enrollment: Enrollment | null;
  /** Enrollments haven't resolved yet — show a skeleton, not the empty state. */
  loading?: boolean;
  onPlay?: () => void;
}

function Mascot({ line }: { line: string }) {
  return (
    <div className={styles.rightCol}>
      <div className={styles.speechBubble}>
        <span className={styles.speechText}>{line}</span>
      </div>

      <div className={styles.mascotStage}>
        <span className={styles.sparkle1}>
          <Sparkles size={18} className="text-sky-200" />
        </span>
        <span className={styles.sparkle2}>
          <Sparkles size={16} className="text-sky-200" />
        </span>
        <span className={styles.sparkle3}>
          <Sparkles size={14} className="text-sky-200" />
        </span>

        <div className={styles.mascotImg}>
          <Image
            src="/dashboard tey.webp"
            alt=""
            aria-hidden="true"
            fill
            sizes="200px"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default function CurrentQuestCard({ enrollment, loading = false, onPlay }: CurrentQuestCardProps) {
  const router = useRouter();

  // ─── Loading: the card's shape, pulsing — never the empty state. ─────────
  if (loading) {
    return (
      <div className={styles.card} aria-busy="true" aria-label="Loading your next lesson">
        <div className={styles.leftCol}>
          <span className="block h-3.5 w-32 rounded-full bg-white/25 animate-pulse" />
          <span className="block mt-4 h-7 w-4/5 rounded-lg bg-white/30 animate-pulse" />
          <span className="block mt-3 h-4 w-3/5 rounded-md bg-white/20 animate-pulse" />
          <span className="block mt-6 h-3 w-full rounded-full bg-white/20 animate-pulse" />
          <span className="block mt-6 h-12 w-56 rounded-2xl bg-white/35 animate-pulse" />
        </div>
      </div>
    );
  }

  // ─── No course: an honest invitation, never a fabricated enrollment. ─────
  if (!enrollment) {
    return (
      <div className={styles.card}>
        <div className={styles.leftCol}>
          <span className={styles.categoryTag}>GET STARTED</span>
          <h2 className={styles.courseTitle}>Pick your first course</h2>
          <p className={styles.courseDesc}>
            Choose a course and your next lesson will always be waiting right here.
          </p>
          <button
            type="button"
            onClick={() => {
              playHaptic('medium');
              router.push(EXPLORE_HREF);
            }}
            className={styles.continueBtn}
          >
            <Compass size={17} strokeWidth={2.8} />
            <span>Explore courses</span>
          </button>
        </div>
        <Mascot line="Your first lesson is one tap away!" />
      </div>
    );
  }

  const { course, nextLesson, completedCount } = enrollment;
  const total = course.totalLessons;
  const done = Math.min(completedCount ?? 0, total);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const tag = [course.category, course.level].filter(Boolean).join(' • ').toUpperCase();

  // Three honest variants of the active card.
  const finished = total > 0 && !nextLesson;
  const noLessonsYet = total === 0;

  const subtitle = nextLesson
    ? `Next up: ${nextLesson.title}`
    : finished
      ? 'You finished every lesson in this course!'
      : 'The first lessons are on their way.';

  const cta = finished ? 'Review course' : noLessonsYet ? 'View course' : 'Continue';

  const line = nextLesson
    ? `Lesson ${nextLesson.number} is ready for you!`
    : finished
      ? 'You did it! What should we learn next?'
      : 'Lessons are coming soon!';

  return (
    <div className={styles.card}>
      <div className={styles.leftCol}>
        {tag && <span className={styles.categoryTag}>{tag}</span>}

        <h2 className={styles.courseTitle}>{course.title}</h2>
        <p className={styles.courseDesc}>{subtitle}</p>

        {total > 0 && (
          <div className={styles.progressSection}>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={done}
              aria-label={`${done} of ${total} lessons complete`}
            >
              <div
                className={styles.progressFill}
                // A sliver even at 0%, so the bar reads as a bar to fill.
                style={{ width: `${Math.max(4, pct)}%` }}
              />
            </div>

            <div className={styles.progressLabelsRow}>
              <span>{pct}% COMPLETE</span>
              <span>
                {nextLesson ? `LESSON ${nextLesson.number} / ${total}` : `${done} / ${total} LESSONS`}
              </span>
            </div>
          </div>
        )}

        <button
          type="button"
          // The page's handler owns the haptic — firing one here too buzzed twice.
          onClick={() => onPlay?.()}
          className={styles.continueBtn}
        >
          <span>{cta}</span>
          <ArrowRight size={17} strokeWidth={2.8} />
        </button>
      </div>

      <Mascot line={line} />
    </div>
  );
}
