'use client';

/**
 * /creator/login — the creator portal's front door, in the same Duolingo
 * style as the learner's /login (components/auth/WelcomeAuthScreen).
 *
 * Welcome: Tey with his tablet, "Teach Coding and AI on Teyro", GET STARTED
 * (creator onboarding) and I ALREADY HAVE AN ACCOUNT. Logging in here as
 * INSTRUCTOR also opens a creator profile on a learner-only account; the
 * server's redirectTo then picks /creator, /role-select or onboarding.
 */

import { useEffect, useState } from 'react';
import WelcomeAuthScreen from '@/components/auth/WelcomeAuthScreen';
import { sanitizeNextPath } from '@/lib/return-to';
import { CREATOR_WELCOME_COPY } from './copy';

export default function CreatorLogin() {
  // Same reasoning as /login: read the URL after hydration instead of
  // useSearchParams, so this client page needs no Suspense boundary.
  const [entry, setEntry] = useState<{ nextPath: string | null; signin: boolean }>({
    nextPath: null,
    signin: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('next');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntry({ nextPath: raw ? sanitizeNextPath(raw) : null, signin: params.get('mode') === 'signin' });
  }, []);

  return (
    <WelcomeAuthScreen
      key={entry.signin ? 'signin' : 'welcome'}
      role="INSTRUCTOR"
      copy={CREATOR_WELCOME_COPY}
      getStartedHref="/creator/onboarding/1"
      backHref="/"
      nextPath={entry.nextPath}
      initialView={entry.signin ? 'signin' : 'welcome'}
    />
  );
}
