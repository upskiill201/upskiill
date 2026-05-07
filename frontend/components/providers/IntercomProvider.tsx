'use client';

import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';

export function IntercomProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Intercom({
      app_id: 'p5rfw95h',
    });
  }, []);

  return <>{children}</>;
}
