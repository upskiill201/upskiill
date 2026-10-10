'use client';

/**
 * The community before you've earned your seat — Duolingo's locked-node
 * screen. A learner joins their course community by finishing two of its
 * lessons (the welcome scene plays the moment they do). Until then, opening
 * the community lands here: how close they are, what's waiting inside, and
 * one button straight into the next lesson.
 */

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Lock } from 'lucide-react';
import { lessonHref, useEnrollments } from '@/hooks/useCourse';
import { playSound } from '@/lib/audio/lessonSounds';
import PostTypeArt from './PostTypeArt';
import styles from './CommunityLocked.module.css';
import { courseHomeHref } from '@/lib/homeCourse';

export interface CommunityLockInfo {
  lessonsDone: number;
  lessonsNeeded: number;
  courseId: string;
  communityName?: string;
  memberCount?: number;
}

/** Pulls the lock out of a fetcher error (lib/swr attaches the JSON body as `info`). */
export function communityLockFrom(error: unknown): CommunityLockInfo | null {
  const info = (error as { info?: Record<string, unknown> } | null)?.info;
  const code = (info?.error as { code?: string } | undefined)?.code;
  if (!info || code !== 'COMMUNITY_LOCKED') return null;
  return {
    lessonsDone: Number(info.lessonsDone ?? 0),
    lessonsNeeded: Number(info.lessonsNeeded ?? 2),
    courseId: String(info.courseId ?? ''),
    communityName: typeof info.communityName === 'string' ? info.communityName : undefined,
    memberCount: typeof info.memberCount === 'number' ? info.memberCount : undefined,
  };
}

export default function CommunityLocked({ lock }: { lock: CommunityLockInfo }) {
  const { enrollments } = useEnrollments();
  const enrollment = enrollments?.find((e) => e.course.id === lock.courseId);
  const next = enrollment?.nextLesson;
  const href = next ? lessonHref(lock.courseId, next.sectionIndex, next.id) : courseHomeHref(lock.courseId);
  const left = Math.max(0, lock.lessonsNeeded - lock.lessonsDone);

  useEffect(() => {
    playSound('nodeLocked');
  }, []);

  return (
    <section className={styles.wrap} aria-labelledby="community-locked-title">
      <div className={styles.art}>
        <Image src="/art/ui/community.svg" alt="" width={132} height={132} priority />
        <span className={styles.lock} aria-hidden="true">
          <Lock size={22} strokeWidth={3} />
        </span>
      </div>

      <h1 id="community-locked-title" className={styles.title}>
        {left === 1 ? 'One more lesson to unlock your community' : `Finish ${left} lessons to unlock your community`}
      </h1>
      <p className={styles.sub}>
        {lock.communityName ? <b>{lock.communityName}</b> : 'Your course community'}
        {typeof lock.memberCount === 'number' && lock.memberCount > 0
          ? ` · ${lock.memberCount.toLocaleString()} ${lock.memberCount === 1 ? 'learner' : 'learners'} inside`
          : ''}
      </p>

      {/* The lessons, as Duolingo's path nodes. */}
      <ol className={styles.nodes} aria-label={`${lock.lessonsDone} of ${lock.lessonsNeeded} lessons done`}>
        {Array.from({ length: lock.lessonsNeeded }, (_, i) => {
          const done = i < lock.lessonsDone;
          const current = i === lock.lessonsDone;
          return (
            <li key={i} className={styles.nodeItem}>
              {i > 0 && <span className={`${styles.link} ${i <= lock.lessonsDone ? styles.linkDone : ''}`} aria-hidden="true" />}
              <span className={`${styles.node} ${done ? styles.nodeDone : current ? styles.nodeCurrent : ''}`}>
                {done ? <Check size={26} strokeWidth={3.5} /> : i + 1}
              </span>
              <span className={styles.nodeLabel}>Lesson {i + 1}</span>
            </li>
          );
        })}
        <li className={styles.nodeItem}>
          <span className={styles.link} aria-hidden="true" />
          <span className={`${styles.node} ${styles.nodeGoal}`}>
            <Image src="/art/ui/community.svg" alt="" width={34} height={34} />
          </span>
          <span className={styles.nodeLabel}>Community</span>
        </li>
      </ol>

      <div className={styles.perks}>
        <h2 className={styles.perksTitle}>What&apos;s waiting inside</h2>
        <ul className={styles.perkList}>
          <li>
            <PostTypeArt postType="QUESTION" size={36} />
            <span>
              <b>Get unstuck fast.</b> Ask the people who hit the same wall a lesson ago.
            </span>
          </li>
          <li>
            <Image src="/Icons/burn.png" alt="" width={36} height={36} />
            <span>
              <b>Learn with friends.</b> Follow classmates, see their streaks, keep each other going.
            </span>
          </li>
          <li>
            <PostTypeArt postType="WIN" size={36} />
            <span>
              <b>Share your wins.</b> Post what you build and get cheered on.
            </span>
          </li>
          <li>
            <Image src="/art/ui/medal-1.svg" alt="" width={36} height={36} />
            <span>
              <b>Climb the leaderboard.</b> Helping others earns points and levels.
            </span>
          </li>
        </ul>
      </div>

      <Link href={href} className={styles.cta} onClick={() => playSound('navTap', 1)}>
        {lock.lessonsDone === 0 ? 'Start learning' : 'Continue learning'}
      </Link>
    </section>
  );
}
