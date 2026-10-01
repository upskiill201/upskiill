'use client';

import React from 'react';
import { CourseWorkspace } from '@/components/course-workspace/CourseWorkspace';

/** /creator/courses/:id — the course workspace (components/course-workspace). */
export default function CourseWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  return <CourseWorkspace courseId={id} />;
}
