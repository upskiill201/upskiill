'use client';

/**
 * Dev bench for lesson content v2: plays the sample Coding and AI lessons
 * (lib/lesson/sampleLessons.ts) through the real LessonPlayer, in admin
 * review mode so nothing is written and no hearts are at risk.
 * Not linked anywhere — visit /dev/lesson-blocks?track=coding|ai.
 */

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import { SAMPLE_AI_LESSON, SAMPLE_CODING_LESSON } from '@/lib/lesson/sampleLessons';

export default function LessonBlocksBench() {
  const [track, setTrack] = useState<'coding' | 'ai' | null>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTrack(new URLSearchParams(window.location.search).get('track') === 'ai' ? 'ai' : 'coding');
  }, []);

  if (process.env.NODE_ENV === 'production') notFound();
  if (!track) return null;
  const lesson = track === 'ai' ? SAMPLE_AI_LESSON : SAMPLE_CODING_LESSON;

  return (
    <LessonPlayer
      key={`${track}-${run}`}
      lesson={lesson}
      courseId="dev"
      isReview={false}
      adminReviewMode
      onExit={() => setRun((r) => r + 1)}
      onCompleted={() => {}}
      onFinished={() => setRun((r) => r + 1)}
    />
  );
}
