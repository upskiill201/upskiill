import { redirect } from 'next/navigation';
import { courseHomeHref } from '@/lib/homeCourse';

/**
 * The old course map. Home's path is the only map now, so this route — kept
 * because notifications, emails and old links point at it — goes straight to
 * home showing this course.
 */
export default async function CourseMapRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(courseHomeHref(id));
}
