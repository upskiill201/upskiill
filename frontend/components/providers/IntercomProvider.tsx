'use client';

import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';

export function IntercomProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lift the launcher above the fixed mobile bottom nav (64px + safe-area
    // inset) plus a small gap — otherwise it overlaps on small viewports.
    const isMobile = window.innerWidth <= 768;
    const safeAreaBottom = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--safe-area-bottom') || '0'
    ) || 0;

    Intercom({
      app_id: 'p5rfw95h',
      // Mobile: clear the fixed bottom nav (64px + safe-area + gap, matching
      // the dashboard's own nav-clearance convention), and sit on the
      // opposite side from the right-aligned "Quest Hub" FAB so the two
      // floating buttons never stack on top of each other.
      vertical_padding: isMobile ? 76 + safeAreaBottom : 20,
      alignment: isMobile ? 'left' : 'right',
    });
  }, []);

  return <>{children}</>;
}
