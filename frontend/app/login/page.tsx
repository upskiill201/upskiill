'use client';

/**
 * /login — the default entry point for anyone who already has an account.
 *
 * Renders the same welcome screen as /onboarding/0: existing learners sign in
 * (or reset a password) in place, GET STARTED hands new learners to the
 * onboarding steps. The URL stays /login the whole time.
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
  const [nextPath, setNextPath] = useState<string | null>(null);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get('next');
    // No `next` at all means "let the server decide" — a creator must not be
    // blindly forced to /dashboard by the sanitizer's fallback.
    if (raw) setNextPath(sanitizeNextPath(raw));
  }, []);

  return <WelcomeAuthScreen nextPath={nextPath} backHref="/" />;
}
