'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import styles from './CurrentQuestCard.module.css';

interface CurrentQuestCardProps {
  currentEnrollment?: any;
  onPlay?: () => void;
}

export default function CurrentQuestCard({ currentEnrollment, onPlay }: CurrentQuestCardProps) {
  // Course info
  const course = currentEnrollment?.course;
  const category = (course?.category || 'DESIGN').toUpperCase();
  const level = (course?.level || 'BEGINNER').toUpperCase();
  const courseTitle = course?.title || 'Figma UI/UX Essentials: Zero to Hero';
  const shortDesc =
    course?.shortDescription ||
    course?.subtitle ||
    'Master the complete design lifecycle in Figma — components, auto-layout, prototyping, and developer handoff.';

  // Progress metrics
  const completedLessons = Array.isArray(currentEnrollment?.completedLessons)
    ? currentEnrollment.completedLessons
    : [];
  const completedCount = completedLessons.length;
  
  // Calculate total lessons from sections if available
  const sections = course?.sections || [];
  let allLessons: any[] = [];
  sections.forEach((sec: any) => {
    if (Array.isArray(sec.lessons)) {
      allLessons.push(...sec.lessons);
    }
  });

  const totalLessons = allLessons.length > 0 ? allLessons.length : 25;
  const currentLessonNum = Math.min(totalLessons, completedCount + 1);
  const progressPct =
    currentEnrollment?.progress !== undefined
      ? Math.round(currentEnrollment.progress)
      : Math.round((completedCount / totalLessons) * 100) || 8;

  // Find the actual next lesson the student needs to learn
  const nextLesson = allLessons.find(
    (lesson: any) => !completedLessons.includes(lesson.id)
  );

  const speechBubbleText = nextLesson?.title
    ? `${nextLesson.title} will level up your skills!`
    : 'Figma variants and auto-layout make designs 10x faster!';

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
            <span>
              LESSON {currentLessonNum} / {totalLessons}
            </span>
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
