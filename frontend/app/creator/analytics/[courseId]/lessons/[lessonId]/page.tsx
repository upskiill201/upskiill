import { LessonInsightView } from '@/components/studio/analytics/LessonInsightView';

export default async function LessonInsightPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  return <LessonInsightView courseId={courseId} lessonId={lessonId} />;
}
