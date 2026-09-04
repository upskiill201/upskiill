'use client';

import { useEffect } from 'react';

/**
 * Registers public/sw.js. Production-only and guarded on browser support —
 * in dev, a cached service worker would otherwise serve stale chunks across
 * hot reloads, which is a much worse debugging experience than no PWA
 * caching at all.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    // Defer registration off the critical path — it should never compete
    // with the initial page's own network requests.
    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.error('Service worker registration failed:', err);
      });
    };

    if (document.readyState === 'complete') {
      register();
    } else {
      window.addEventListener('load', register, { once: true });
      return () => window.removeEventListener('load', register);
    }
  }, []);

  return null;
}
