import { redirect } from 'next/navigation';

/** The old course studio page: now the course workspace. */
export default async function OldManagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/creator/courses/${id}`);
}
