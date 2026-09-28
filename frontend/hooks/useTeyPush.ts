'use client';

import { useCallback, useEffect, useState } from 'react';

export type PushEnableResult =
  | 'granted'
  | 'denied'
  | 'unsupported'
  | 'needs-install'
  | 'error';

export interface TeyPushState {
  /**
   * False until the first `refresh()` has resolved.
   *
   * Every other field below starts at its most pessimistic value — `supported:
   * false`, `permission: 'unsupported'` — and only becomes true after an await
   * on `navigator.serviceWorker.ready`. A caller that branches before this
   * flips reads "this browser cannot do notifications" from every browser,
   * including the ones that can, and silently skips its own permission screen.
   */
  ready: boolean;
  /** The browser can do push at all, here, right now. */
  supported: boolean;
  permission: NotificationPermission | 'unsupported';
  /** True once this browser has an active subscription registered with us. */
  subscribed: boolean;
  /**
   * iOS/iPadOS Safari exposes PushManager only to a PWA installed to the Home
   * Screen (16.4+). Showing a permission button in mobile Safari would prompt
   * nothing and silently fail, so the UI has to offer installation instead.
   */
  needsInstall: boolean;
  busy: boolean;
}

function detectPlatform(): string {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent;
  const isIos = /iP(hone|ad|od)/.test(ua);
  const standalone =
    (typeof window !== 'undefined' &&
      window.matchMedia?.('(display-mode: standalone)').matches) ||
    (navigator as unknown as { standalone?: boolean }).standalone === true;

  if (isIos) return standalone ? 'ios-standalone' : 'other';
  if (/Android/.test(ua)) return 'android';
  return 'desktop';
}

function isIosWithoutInstall(): boolean {
  if (typeof navigator === 'undefined') return false;
  if (!/iP(hone|ad|od)/.test(navigator.userAgent)) return false;
  const standalone =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true;
  return !standalone;
}

/**
 * `navigator.serviceWorker.ready` never settles when no worker registers (in
 * `next dev`, or if registration failed). Awaiting it bare left `ready` false
 * forever — screens waiting on it sat on their default — and made `enable()`
 * spin indefinitely. Race it instead.
 */
function swReady(ms: number): Promise<ServiceWorkerRegistration | null> {
  return Promise.race([
    navigator.serviceWorker.ready,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

/**
 * VAPID keys travel as base64url; PushManager wants raw bytes.
 *
 * Backed by an explicit ArrayBuffer because TypeScript 5.7 made Uint8Array
 * generic over its buffer, and applicationServerKey will not accept the
 * SharedArrayBuffer-compatible default.
 */
function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const normalized = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = window.atob(normalized);
  const output = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
  return output;
}

/**
 * Web push subscription lifecycle.
 *
 * `enable()` must be called from inside a user gesture — browsers ignore a
 * permission request that is not, and Safari treats a programmatic one as a
 * denial, which is unrecoverable without the learner digging through settings.
 */
export function useTeyPush() {
  const [state, setState] = useState<TeyPushState>({
    ready: false,
    supported: false,
    permission: 'unsupported',
    subscribed: false,
    needsInstall: false,
    busy: false,
  });

  const refresh = useCallback(async () => {
    if (typeof window === 'undefined') return;

    const supported =
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window;

    if (!supported) {
      setState((s) => ({
        ...s,
        ready: true,
        supported: false,
        permission: 'unsupported',
        needsInstall: isIosWithoutInstall(),
      }));
      return;
    }

    let subscribed = false;
    try {
      const reg = await swReady(4000);
      subscribed = !!(reg && (await reg.pushManager.getSubscription()));
    } catch {
      subscribed = false;
    }

    setState((s) => ({
      ...s,
      ready: true,
      supported: true,
      permission: Notification.permission,
      subscribed,
      // iOS Safari before 16.4 exposes no PushManager at all and is caught by
      // the `supported` branch above; 16.4+ exposes it ONLY inside the
      // installed app, so a browser tab reaching here still needs the install.
      needsInstall: isIosWithoutInstall(),
    }));
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  /**
   * Re-registers the existing subscription with the backend on every boot.
   *
   * Browsers rotate push endpoints without telling the page, so a subscription
   * saved months ago can silently stop matching what the browser now holds.
   * Without this, subscriptions rot and delivery quietly decays.
   */
  const syncExisting = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    if (Notification.permission !== 'granted') return;

    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (!sub) return;
      await postSubscription(sub);
    } catch {
      // Best effort.
    }
  }, []);

  const enable = useCallback(async (): Promise<PushEnableResult> => {
    if (typeof window === 'undefined') return 'unsupported';

    if (isIosWithoutInstall()) {
      setState((s) => ({ ...s, needsInstall: true }));
      return 'needs-install';
    }

    if (
      !('serviceWorker' in navigator) ||
      !('PushManager' in window) ||
      !('Notification' in window)
    ) {
      return 'unsupported';
    }

    setState((s) => ({ ...s, busy: true }));
    try {
      // Must happen inside the calling user gesture.
      const permission = await Notification.requestPermission();
      setState((s) => ({ ...s, permission }));
      if (permission !== 'granted') return 'denied';

      const keyRes = await fetch('/api/tey/push/public-key', {
        credentials: 'include',
      });
      const { key, configured } = (await keyRes.json()) as {
        key: string | null;
        configured: boolean;
      };
      if (!key || !configured) return 'error';

      const reg = await swReady(10_000);
      if (!reg) return 'error';
      const sub =
        (await reg.pushManager.getSubscription()) ??
        (await reg.pushManager.subscribe({
          // Required by every browser: a push must always show a notification.
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key),
        }));

      await postSubscription(sub);
      setState((s) => ({ ...s, subscribed: true }));
      return 'granted';
    } catch {
      return 'error';
    } finally {
      setState((s) => ({ ...s, busy: false }));
    }
  }, []);

  const disable = useCallback(async () => {
    if (typeof window === 'undefined') return;
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (!sub) return;

      await fetch('/api/tey/push/subscriptions', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: sub.endpoint }),
      });
      await sub.unsubscribe();
      setState((s) => ({ ...s, subscribed: false }));
    } catch {
      // Best effort.
    }
  }, []);

  return { ...state, enable, disable, refresh, syncExisting };
}

async function postSubscription(sub: PushSubscription): Promise<void> {
  const json = sub.toJSON();
  await fetch('/api/tey/push/subscriptions', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: sub.endpoint,
      keys: { p256dh: json.keys?.p256dh, auth: json.keys?.auth },
      userAgent: navigator.userAgent.slice(0, 255),
      platform: detectPlatform(),
    }),
  });
}
