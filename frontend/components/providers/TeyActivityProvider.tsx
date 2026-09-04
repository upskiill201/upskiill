'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { reportTimezone, track } from '../../lib/tey-track';

/** Routes that mean a learner is actually in the product, not on marketing
 *  or auth pages. Tracking anywhere else would just be noise. */
const LEARNER_PREFIXES = ['/dashboard', '/learn', '/my-courses', '/my-learning'];

const isLearnerRoute = (path: string | null) =>
  !!path && LEARNER_PREFIXES.some((p) => path.startsWith(p));

/**
 * Reports app-open activity and the learner's timezone.
 *
 * The timezone half is the load-bearing part: Tey's scheduler decides at
 * runtime whether it is 8pm for a given learner, and it has no browser to ask.
 * Every authenticated app boot is a chance to keep that value current.
 *
 * Deliberately does no auth check of its own -- an unauthenticated call is
 * rejected by the API, and lib/tey-track stops sending after the first 401.
 */
export function TeyActivityProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isLearnerRoute(pathname)) return;

    // Once per mount, off the critical path.
    const id = window.setTimeout(() => {
      void reportTimezone();
      track('app_opened');
    }, 1500);

    return () => window.clearTimeout(id);
    // Intentionally mount-only: this is an app-open signal, not a pageview.
    // PostHogProvider already owns per-navigation tracking.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
