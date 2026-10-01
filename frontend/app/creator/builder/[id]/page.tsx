import { redirect } from 'next/navigation';

/** The old course builder: everything now lives in the course workspace. */
export default async function OldCourseBuilder({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(id === 'new' ? '/creator/create' : `/creator/courses/${id}`);
}
