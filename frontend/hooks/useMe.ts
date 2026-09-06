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
  avatarUrl?: string | null;
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
export function useMe() {
  const { data, error, isLoading, mutate } = useSWR<MeResponse>(ME_KEY, fetcher);

  return {
    me: data,
    error: error as (Error & { status?: number }) | undefined,
    isLoading,
    mutate,
  };
}
