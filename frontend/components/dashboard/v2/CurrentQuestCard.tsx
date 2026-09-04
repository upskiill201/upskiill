'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import styles from './CurrentQuestCard.module.css';

interface CurrentQuestCardProps {
  currentEnrollment?: any;
  /** Real current lesson number, derived from `progress`% — see dashboard/page.tsx. */
  currentLessonIndex?: number;
  onPlay?: () => void;
}

export default function CurrentQuestCard({ currentEnrollment, currentLessonIndex, onPlay }: CurrentQuestCardProps) {
  const router = useRouter();

  // ─── Empty state: never fabricate a course. A brand-new learner sees an
  // honest invitation instead of a hardcoded placeholder enrollment.
  if (!currentEnrollment?.course) {
    return (
      <div className={styles.card}>
        <div className={styles.leftCol}>
          <span className={styles.categoryTag}>GET STARTED</span>

          <h2 className={styles.courseTitle}>No course in progress yet</h2>
          <p className={styles.courseDesc}>
            Pick your first course and this quest card becomes your journey —
            progress, next lesson, all of it.
          </p>

          <button
            type="button"
            onClick={() => {
              playHaptic('medium');
              router.push('/courses');
            }}
            className={styles.continueBtn}
          >
            <Compass size={17} strokeWidth={2.8} />
            <span>Find your first course</span>
          </button>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.speechBubble}>
            <span className={styles.speechText}>
              Your first lesson is one tap away!
            </span>
          </div>

          <div className={styles.mascotStage}>
            <span className={styles.sparkle1}>
              <Sparkles size={18} className="text-[#BAE6FD]" />
            </span>
            <span className={styles.sparkle2}>
              <Sparkles size={16} className="text-[#BAE6FD]" />
            </span>
            <span className={styles.sparkle3}>
              <Sparkles size={14} className="text-[#BAE6FD]" />
            </span>

            <div className={styles.mascotImg}>
              <Image
                src="/dashboard tey.png"
                alt="Tey Mascot Celebrating"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Course info
  const course = currentEnrollment.course;
  const category = (course?.category || 'DESIGN').toUpperCase();
  const level = (course?.level || 'BEGINNER').toUpperCase();
  const courseTitle = course?.title || 'Untitled course';
  const shortDesc = course?.shortDescription || course?.subtitle || '';

  // Progress metrics
  const completedLessons = Array.isArray(currentEnrollment?.completedLessons)
    ? currentEnrollment.completedLessons
    : [];
  const completedCount = completedLessons.length;

  // `course.sections` is never present on this endpoint's payload (the
  // enrollments query only selects flat course fields) — deriving lesson
  // count from it always produced 0, silently hiding the "LESSON X / Y"
  // label. `course.totalLessons` is the real per-course count the backend
  // already computes in one grouped query (auth.service.ts getMyEnrollments).
  const sections = course?.sections || [];
  let allLessons: any[] = [];
  sections.forEach((sec: any) => {
    if (Array.isArray(sec.lessons)) {
      allLessons.push(...sec.lessons);
    }
  });

  const totalLessons = allLessons.length || course?.totalLessons || 0;
  // `currentLessonIndex` (from real `progress`%) is the source of truth —
  // `completedLessons` alone is frequently empty/stale (e.g. progress can be
  // 64% while the array has 0 entries), which showed "LESSON 1/25" for
  // students who were actually most of the way through the course.
  const currentLessonNum = Math.min(totalLessons, currentLessonIndex ?? completedCount + 1);
  const progressPct =
    currentEnrollment?.progress !== undefined
      ? Math.round(currentEnrollment.progress)
      : totalLessons > 0
        ? Math.round((completedCount / totalLessons) * 100)
        : 0;

  // Find the actual next lesson the student needs to learn
  const nextLesson = allLessons.find(
    (lesson: any) => !completedLessons.includes(lesson.id)
  );

  const speechBubbleText = nextLesson?.title
    ? `${nextLesson.title} will level up your skills!`
    : 'Every lesson moves your streak forward!';

  const handleAction = () => {
    playHaptic('medium');
    if (onPlay) onPlay();
  };

  return (
    <div className={styles.card}>
      {/* Left Column: Course Info, Progress Bar & CTA */}
      <div className={styles.leftCol}>
        <span className={styles.categoryTag}>
          {category} • {level}
        </span>

        <h2 className={styles.courseTitle}>{courseTitle}</h2>
        <p className={styles.courseDesc}>{shortDesc}</p>

        {/* Progress Bar & Labels */}
        <div className={styles.progressSection}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.max(6, Math.min(100, progressPct))}%` }}
            />
          </div>

          <div className={styles.progressLabelsRow}>
            <span>{progressPct}% COMPLETE</span>
            {totalLessons > 0 && (
              <span>
                LESSON {currentLessonNum} / {totalLessons}
              </span>
            )}
          </div>
        </div>

        {/* 3D White CTA Button */}
        <button
          type="button"
          onClick={handleAction}
          className={styles.continueBtn}
        >
          <span>Continue Learning</span>
          <ArrowRight size={17} strokeWidth={2.8} />
        </button>
      </div>

      {/* Right Column: Speech Bubble + Celebrating Mascot */}
      <div className={styles.rightCol}>
        {/* White Speech Bubble */}
        <div className={styles.speechBubble}>
          <span className={styles.speechText}>{speechBubbleText}</span>
        </div>

        {/* Mascot with Vector Sparkle Stars */}
        <div className={styles.mascotStage}>
          <span className={styles.sparkle1}>
            <Sparkles size={18} className="text-[#BAE6FD]" />
          </span>
          <span className={styles.sparkle2}>
            <Sparkles size={16} className="text-[#BAE6FD]" />
          </span>
          <span className={styles.sparkle3}>
            <Sparkles size={14} className="text-[#BAE6FD]" />
          </span>

          <div className={styles.mascotImg}>
            <Image
              src="/dashboard tey.png"
              alt="Tey Mascot Celebrating"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
