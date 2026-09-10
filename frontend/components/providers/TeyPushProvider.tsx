'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTeyPush } from '../../hooks/useTeyPush';

/**
 * Notification routing and open-attribution. Both are invisible, and both must
 * work on ANY page the learner might have open when a notification is tapped —
 * including the marketing pages — so this half lives in the root layout.
 *
 * 1. Route a notification tap client-side. The service worker focuses an
 *    existing tab and posts TEY_NAVIGATE rather than forcing a reload, so the
 *    deep link lands instantly instead of re-booting the app.
 *
 * 2. Attribute the open. A `?tey=<deliveryId>` param means the learner arrived
 *    from a notification; reporting it resets Tey's ignored-nudge counter,
 *    which is what stops the tone escalating at someone who does engage. This
 *    only makes a request when the param is actually present, so it costs
 *    nothing on an ordinary page view.
 */
export function TeyPushNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const reportedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; url?: string } | undefined;
      if (data?.type === 'TEY_NAVIGATE' && typeof data.url === 'string') {
        // Same-origin only — the URL comes from our own SW, but routing on an
        // unvalidated string is not a habit worth having.
        if (data.url.startsWith('/') && !data.url.startsWith('//')) {
          router.push(data.url);
        }
      }
    };

    navigator.serviceWorker.addEventListener('message', onMessage);
    return () =>
      navigator.serviceWorker.removeEventListener('message', onMessage);
  }, [router]);

  // Open attribution, once per delivery.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const deliveryId = params.get('tey');
    if (!deliveryId || reportedRef.current === deliveryId) return;
    reportedRef.current = deliveryId;

    void fetch(
      `/api/tey/deliveries/${encodeURIComponent(deliveryId)}/opened`,
      { method: 'POST', credentials: 'include' },
    ).catch(() => undefined);

    // Strip the token so a refresh or a shared URL does not re-report it.
    params.delete('tey');
    const query = params.toString();
    router.replace(`${window.location.pathname}${query ? `?${query}` : ''}`, {
      scroll: false,
    });
  }, [pathname, router]);

  return null;
}

/**
 * Re-registers the browser's current push subscription on boot. Endpoints
 * rotate silently, so without this, delivery quietly decays over weeks.
 *
 * Split out of the navigation half above and mounted only inside the
 * authenticated (app) group: this call is unconditional and authenticated, so
 * in the root layout it fired a guaranteed 401 two seconds after every
 * anonymous visit to the landing page, the blog and the legal pages.
 */
export function TeyPushSync() {
  const { syncExisting } = useTeyPush();

  useEffect(() => {
    const id = window.setTimeout(() => void syncExisting(), 2000);
    return () => window.clearTimeout(id);
  }, [syncExisting]);

  return null;
}
