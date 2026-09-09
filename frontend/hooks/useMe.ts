'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/swr';

/**
 * The shape /api/auth/me returns, narrowed to the fields the client reads.
 * Deliberately permissive — the endpoint returns the full user record and
 * different surfaces read different parts of it.
 */
export interface MeResponse {
  id?: string;
  email?: string;
  fullName?: string;
  /**
   * Raw User.avatarUrl column. Only populated once someone saves a photo
   * through the app's own profile-settings form (PATCH /profile writes it
   * here as well as to Profile.avatarUrl). A Google-signed-up user who never
   * touched settings has this as null even though they have a photo — see
   * `avatarUrl` below, which is what components should actually read.
   */
  avatarUrl?: string | null;
  /** Creator/Google-onboarding avatar, set on Profile.avatarUrl. */
  profile?: { avatarUrl?: string | null; [key: string]: unknown } | null;
  /** Only present for creators; /auth/me doesn't include this relation today. */
  instructorProfile?: { avatarUrl?: string | null; [key: string]: unknown } | null;
  hasStudentAccess?: boolean;
  hasCreatorAccess?: boolean;
  studentProfile?: unknown;
  [key: string]: unknown;
}

/** The single SWR key for the current user. Import it rather than retyping the
 *  string, so every caller lands in the same cache entry. */
export const ME_KEY = '/api/auth/me';

/**
 * Current user, shared across every consumer.
 *
 * StudentShell and the dashboard page both fetched /api/auth/me with a raw
 * `fetch` inside a `useEffect`. Child effects run before parent effects, so the
 * two went out in the same tick — two identical authenticated round trips on
 * every single dashboard entry, neither of them cached.
 *
 * Going through useSWR with a shared key collapses them into one request and
 * gives every caller the 30s deduping and the localStorage-backed cache that
 * lib/swr.ts already configures but which almost nothing in the app was using.
 *
 * `error.status` is populated by the shared fetcher, so callers that need to
 * react to a 401 can do so without their own response handling.
 */
/**
 * Resolves the user's display photo across every place it can land.
 *
 * User.avatarUrl only gets written when someone saves a photo through the
 * app's own profile-settings form. A Google sign-up's picture is written
 * straight to Profile.avatarUrl instead (auth.service.ts) and never
 * backfilled onto the User row, so reading `me.avatarUrl` alone silently
 * drops every Google-onboarded user's photo. Mirrors the same precedence
 * profile.service.ts already uses server-side (instructorProfile → profile →
 * user) — instructorProfile is included here defensively since /auth/me
 * doesn't select that relation today, but student surfaces should never rely
 * on it being present.
 */
export function resolveAvatarUrl(me: MeResponse | undefined): string | null {
  if (!me) return null;
  return me.instructorProfile?.avatarUrl || me.profile?.avatarUrl || me.avatarUrl || null;
}

export function useMe() {
  const { data, error, isLoading, mutate } = useSWR<MeResponse>(ME_KEY, fetcher);

  return {
    me: data,
    avatarUrl: resolveAvatarUrl(data),
    error: error as (Error & { status?: number }) | undefined,
    isLoading,
    mutate,
  };
}
