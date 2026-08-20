import { redirect } from 'next/navigation';

export default async function ProfileUsernamePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  redirect(`/creator-profile/${encodeURIComponent(username)}`);
}
