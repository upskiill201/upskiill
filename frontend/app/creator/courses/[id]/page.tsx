import { redirect } from 'next/navigation';

export default async function CreatorCourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  redirect(`/creator/courses/${resolvedParams.id}/manage`);
}
