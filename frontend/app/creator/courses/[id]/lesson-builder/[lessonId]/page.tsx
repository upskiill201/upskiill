'use client';

import React from 'react';
import { LessonBuilder } from '@/components/lesson-builder/LessonBuilder';

/** /creator/courses/:id/lesson-builder/:lessonId — see components/lesson-builder. */
export default function LessonBuilderPage({ params }: { params: Promise<{ id: string; lessonId: string }> }) {
  const { id, lessonId } = React.use(params);
  return <LessonBuilder courseId={id} lessonId={lessonId} />;
}
