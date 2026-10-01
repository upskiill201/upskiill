'use client';

/**
 * Who is doing creator onboarding: a guest, or a signed-in account (a
 * learner becoming a creator, or a creator re-running it). One /auth/me call;
 * `refresh` re-reads it after sign-up or become-creator.
 */

import { useCallback, useEffect, useState } from 'react';

export interface CreatorSessionUser {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  hasStudentAccess: boolean;
  hasCreatorAccess: boolean;
  profile?: { username?: string | null; headline?: string | null; avatarUrl?: string | null } | null;
}

export type CreatorSession =
  | { status: 'loading' }
  | { status: 'guest' }
  | { status: 'signed-in'; user: CreatorSessionUser };

export function useCreatorSession(): { session: CreatorSession; refresh: () => Promise<CreatorSession> } {
  const [session, setSession] = useState<CreatorSession>({ status: 'loading' });

  const refresh = useCallback(async (): Promise<CreatorSession> => {
    let next: CreatorSession = { status: 'guest' };
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include', cache: 'no-store' });
      if (res.ok) {
        const user = (await res.json()) as CreatorSessionUser | null;
        if (user?.id) next = { status: 'signed-in', user };
      }
    } catch {
      // Offline or the API is down: treat as a guest; sign-up will say why.
    }
    setSession(next);
    return next;
  }, []);

  useEffect(() => {
    // The state lands after the fetch resolves, not synchronously.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);

  return { session, refresh };
}
