'use client';

/**
 * The "Coming soon" context, on its own so a page can use it without
 * importing StudentShell (and with it the whole learner chrome: stats bar,
 * coins popover, shop engine). StudentShell provides it for the app; the
 * admin course-review lesson viewer mounts the bare provider below.
 * scripts/check-provider-boundary.mjs relies on that separation.
 */

import { createContext, useContext } from 'react';

interface ComingSoonContextType {
  triggerComingSoon: (feature: string) => void;
}

export const ComingSoonContext = createContext<ComingSoonContextType | undefined>(undefined);

export const useComingSoon = () => {
  const context = useContext(ComingSoonContext);
  if (!context) throw new Error('useComingSoon must be used within StudentShell');
  return context;
};

/**
 * Bare context provider for consumers that need `useComingSoon()` without the
 * rest of StudentShell's student nav/chrome (e.g. the admin course-review
 * lesson viewer, which reuses the learner lesson player read-only outside the
 * dashboard sidebar/bottom-nav).
 */
export function ComingSoonProvider({
  children,
  onTrigger,
}: {
  children: React.ReactNode;
  /** Defaults to a no-op — callers outside the student shell rarely want the
   *  "Coming Soon" modal, just a way to swallow the call safely. */
  onTrigger?: (feature: string) => void;
}) {
  return (
    <ComingSoonContext.Provider value={{ triggerComingSoon: onTrigger ?? (() => {}) }}>
      {children}
    </ComingSoonContext.Provider>
  );
}
