'use client';

import { useEffect } from 'react';

/**
 * Registers public/sw.js. Production-only and guarded on browser support —
 * in dev, a cached service worker would otherwise serve stale chunks across
 * hot reloads, which is a much worse debugging experience than no PWA
 * caching at all.
 *
 * NEXT_PUBLIC_ENABLE_SW=true opts back in locally. Push notifications live
 * entirely inside the service worker, so without this escape hatch none of
 * that code path is reachable in `next dev` — which means it can only be
 * tested by deploying, which means it does not get tested.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    const enabled =
      process.env.NODE_ENV === 'production' ||
      process.env.NEXT_PUBLIC_ENABLE_SW === 'true';
    if (!enabled) return;
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
