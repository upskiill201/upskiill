import { redirect } from 'next/navigation';

/** Old per-course URL: the hub now switches courses itself. */
export default async function CourseAnalyticsRedirect({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  redirect(`/creator/analytics?course=${encodeURIComponent(courseId)}`);
}
