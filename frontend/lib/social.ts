/**
 * Follow / unfollow, and refresh everything that shows who follows whom
 * (the profile's counts, the Following/Followers lists, classmates, and the
 * followed learner's own profile page).
 */

import { mutate } from 'swr';

export const SOCIAL_KEYS = ['/api/social/following', '/api/social/followers', '/api/social/classmates', '/api/profile'];

export async function setFollowing(userId: string, follow: boolean): Promise<void> {
  const res = await fetch(`/api/social/${follow ? 'follow' : 'unfollow'}/${encodeURIComponent(userId)}`, {
    method: follow ? 'POST' : 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error(follow ? "Couldn't follow right now." : "Couldn't unfollow right now.");
  await Promise.all([...SOCIAL_KEYS, `/api/social/users/${encodeURIComponent(userId)}`].map((k) => mutate(k)));
}
