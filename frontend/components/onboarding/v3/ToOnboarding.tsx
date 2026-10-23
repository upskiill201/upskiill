'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Onboarding v2 lived at /onboarding/0 … /onboarding/14 and /complete. v3 is
 * one route, so every old link (emails, the PWA start URL, bookmarks,
 * server redirects) lands in the new flow instead of a dead end.
 */
export default function ToOnboarding() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/onboarding');
  }, [router]);
  return <div className="h-[100dvh] bg-[var(--bg-page)]" aria-busy="true" />;
}
