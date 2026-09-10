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

    let refreshing = false;

    /**
     * Hand over to a waiting worker at a moment the user cannot perceive.
     *
     * The worker no longer calls skipWaiting() on install. It used to, which
     * meant a new SW took control of pages still running the previous build's
     * JavaScript; those pages then requested chunk hashes the new deployment
     * no longer serves and died with "Unexpected token '<'". Handing over while
     * the tab is hidden, and reloading only while it stays hidden, means the
     * user never sees an interruption — and no toast or banner is introduced.
     */
    const scheduleUpdate = (worker: ServiceWorker) => {
      const applyWhenHidden = () => {
        if (document.visibilityState === 'hidden') {
          worker.postMessage({ type: 'SKIP_WAITING' });
        }
      };
      document.addEventListener('visibilitychange', applyWhenHidden);
      applyWhenHidden();
    };

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      // Only reload out of sight. On a visible tab the new worker simply takes
      // effect on the next natural navigation.
      if (document.visibilityState === 'hidden') {
        window.location.reload();
      }
    });

    const register = () => {
      // The ?v= is what versions the worker: a byte-different script URL is a
      // different SW, so a deploy installs a new one and its activate handler
      // drops every cache from the previous build. Without this the caches
      // never rotated, because the version was a hardcoded constant in a static
      // file that no build step touched.
      const buildId = process.env.NEXT_PUBLIC_BUILD_ID || 'dev';

      navigator.serviceWorker
        .register(`/sw.js?v=${encodeURIComponent(buildId)}`)
        .then((registration) => {
          if (registration.waiting) scheduleUpdate(registration.waiting);

          registration.addEventListener('updatefound', () => {
            const installing = registration.installing;
            if (!installing) return;
            installing.addEventListener('statechange', () => {
              // A worker that reaches "installed" while one is already in
              // control is an update, not a first install.
              if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                scheduleUpdate(installing);
              }
            });
          });
        })
        .catch((err) => {
          console.error('Service worker registration failed:', err);
        });
    };

    // Ask for durable storage once the learner has actually engaged. Completing
    // a lesson is the clearest signal we have, and it is dispatched app-wide
    // already. See requestPersistentStorage below for why timing matters.
    const onEngaged = () => {
      void requestPersistentStorage();
    };
    window.addEventListener('lesson:completed', onEngaged, { once: true });

    // Defer registration off the critical path — it should never compete
    // with the initial page's own network requests.
    if (document.readyState === 'complete') {
      register();
    } else {
      window.addEventListener('load', register, { once: true });
      return () => {
        window.removeEventListener('load', register);
        window.removeEventListener('lesson:completed', onEngaged);
      };
    }

    return () => window.removeEventListener('lesson:completed', onEngaged);
  }, []);

  return null;
}

/**
 * Asks the browser to keep Teyro's storage across eviction sweeps.
 *
 * This matters most on iOS: Safari purges an origin's Cache Storage after
 * roughly seven days without interaction unless the app is installed to the
 * home screen, so a weekly learner otherwise gets zero PWA benefit and pays a
 * full cold download every visit.
 *
 * Deliberately NOT called on cold boot. The prompt (where one is shown) can be
 * denied permanently, and asking before the learner has done anything is the
 * most likely way to get a no. Call this after a real engagement signal —
 * a completed lesson, or a home-screen install.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.storage?.persist) return false;
  try {
    if (await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}
