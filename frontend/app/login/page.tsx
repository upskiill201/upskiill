'use client';

/**
 * /login — the default entry point for anyone who already has an account.
 *
 * Renders the same welcome screen as /onboarding/0: existing learners sign in
 * (or reset a password) in place, GET STARTED hands new learners to the
 * onboarding steps. The URL stays /login the whole time. `?mode=signin` opens
 * straight on the log-in form (the /signup screen's LOG IN link).
 */

import WelcomeAuthScreen from '@/components/auth/WelcomeAuthScreen';
import { sanitizeNextPath } from '@/lib/return-to';
import { useEffect, useState } from 'react';

export default function Login() {
  // proxy.ts preserves the destination when it bounces a token-less request,
  // so a push notification tapped with an expired session still lands on the
  // lesson it pointed at. Sanitized against open redirects.
  //
  // Read from window in an effect rather than via useSearchParams: this page is
  // a client component at the route root, and the hook would force a Suspense
  // boundary for static prerendering (see PostHogProvider for the same issue).
  const [entry, setEntry] = useState<{ nextPath: string | null; signin: boolean }>({
    nextPath: null,
    signin: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('next');
    // No `next` at all means "let the server decide" — a creator must not be
    // blindly forced to /dashboard by the sanitizer's fallback. Reading the
    // URL after hydration is the point (see above), so this one write is
    // deliberate.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntry({ nextPath: raw ? sanitizeNextPath(raw) : null, signin: params.get('mode') === 'signin' });
  }, []);

  return (
    <WelcomeAuthScreen
      key={entry.signin ? 'signin' : 'welcome'}
      nextPath={entry.nextPath}
      backHref="/"
      initialView={entry.signin ? 'signin' : 'welcome'}
    />
  );
}
