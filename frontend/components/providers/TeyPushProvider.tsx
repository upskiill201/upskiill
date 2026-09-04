'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTeyPush } from '../../hooks/useTeyPush';

/**
 * Two jobs, both invisible.
 *
 * 1. Route a notification tap client-side. The service worker focuses an
 *    existing tab and posts TEY_NAVIGATE rather than forcing a reload, so the
 *    deep link lands instantly instead of re-booting the app.
 *
 * 2. Attribute the open. A `?tey=<deliveryId>` param means the learner arrived
 *    from a notification; reporting it resets Tey's ignored-nudge counter,
 *    which is what stops the tone escalating at someone who does engage.
 */
export function TeyPushProvider() {
  const router = useRouter();
  const pathname = usePathname();
  const { syncExisting } = useTeyPush();
  const reportedRef = useRef<string | null>(null);

  // Re-register the browser's current subscription on boot. Endpoints rotate
  // silently, so without this, delivery quietly decays over weeks.
  useEffect(() => {
    const id = window.setTimeout(() => void syncExisting(), 2000);
    return () => window.clearTimeout(id);
  }, [syncExisting]);

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
