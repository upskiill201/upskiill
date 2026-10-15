'use client';

/**
 * A push that arrives while Teyro is open and in front.
 *
 * The OS shows a notification for a push; with the app already on screen that
 * would be a banner over the thing you are looking at. So the service worker
 * (public/sw.js) hands the push to the page instead, and this turns it into
 * Tey's notice card — the same drop-in card with its own chime and haptic as
 * every other in-app moment — and refreshes the bell so the new row is there.
 *
 * With the app closed or in the background there is no page to do this, and
 * the OS notification plays the device's own notification sound: browsers
 * give a web app no way to choose that sound.
 */

import { useEffect } from 'react';
import { useSWRConfig } from 'swr';
import { notify } from '@/lib/awareness/notices';
import { markPushHandled } from '@/lib/push/pushSound';

interface PushMessage {
  type?: string;
  title?: string;
  body?: string;
  url?: string;
  deliveryId?: string;
  tag?: string;
}

const isNotificationKey = (key: unknown) =>
  typeof key === 'string' && key.startsWith('/api/notifications');

export default function PushSoundListener() {
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const onMessage = (event: MessageEvent) => {
      const data = event.data as PushMessage | undefined;
      if (data?.type !== 'TEY_PUSH' || !data.title) return;

      markPushHandled();
      const url = typeof data.url === 'string' && data.url.startsWith('/') && !data.url.startsWith('//') ? data.url : undefined;
      notify({
        id: `push:${data.deliveryId ?? `${data.tag ?? 'tey'}:${Date.now()}`}`,
        tone: 'info',
        icon: 'tey',
        title: data.title,
        body: data.body,
        action: 'Open',
        href: url,
      });
      // The bell: new unread count, new row.
      void mutate(isNotificationKey);
    };

    navigator.serviceWorker.addEventListener('message', onMessage);
    return () => navigator.serviceWorker.removeEventListener('message', onMessage);
  }, [mutate]);

  return null;
}
