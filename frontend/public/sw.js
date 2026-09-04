/**
 * Teyro service worker — hand-written (not next-pwa/workbox; both lag Next
 * releases and next-pwa in particular conflicts with Turbopack).
 *
 * Strategy:
 *  - Precache a small app shell on install.
 *  - Cache-first for hashed /_next/static/* build assets and /Icons/* — safe
 *    to cache aggressively since Next fingerprints these filenames.
 *  - Network-first, NEVER cached, for /api/* — SWR (frontend/lib/swr.ts)
 *    already owns API freshness client-side, and caching auth-bearing JSON
 *    responses in a service worker is a security footgun (stale/leaked
 *    data across accounts on a shared device).
 *  - Everything else: network-first with a cache fallback, so a flaky
 *    connection still renders the last-seen shell instead of erroring.
 */

const CACHE_VERSION = 'teyro-v2';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;

const SHELL_URLS = [
  '/',
  '/dashboard',
  '/favicon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_URLS)).catch(() => {
      // Best-effort — a single failed precache entry shouldn't block install.
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('teyro-') && key !== SHELL_CACHE && key !== STATIC_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

function isApiRequest(url) {
  return url.pathname.startsWith('/api/');
}

function isStaticAsset(url) {
  return url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/Icons/');
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never intercept API calls — always go to the network, never cached.
  if (isApiRequest(url)) return;

  if (isStaticAsset(url)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      })
    );
    return;
  }

  // Everything else: network-first, falling back to the shell cache when offline.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          caches.open(SHELL_CACHE).then((cache) => cache.put(request, response.clone()));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match('/dashboard')))
  );
});

/* ───────────────────────────────────────────────────────────────────────────
 * Tey push notifications.
 *
 * The payload carries both halves the engagement system needs: prose for the
 * human, and structured data (reason, teyState, url, deliveryId) so nothing
 * has to be inferred from message text. See backend/src/tey/README.md.
 * ─────────────────────────────────────────────────────────────────────────── */

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    // A malformed payload is not worth a blank notification.
    return;
  }
  if (!data.title) return;

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body || '',
      icon: '/Icons/icon-192.png',
      badge: '/Icons/icon-192.png',
      // Same reason replaces rather than stacks, so a retry cannot pile up
      // three copies of the same nudge on the lock screen.
      tag: data.tag || 'tey',
      renotify: true,
      data: {
        url: data.url || '/dashboard',
        deliveryId: data.deliveryId,
        reason: data.reason,
      },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || '/dashboard';

  event.waitUntil(
    (async () => {
      const clientList = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      // Prefer focusing an open tab and routing client-side — a full reload
      // would throw away app state and make the deep link feel slow.
      for (const client of clientList) {
        if (new URL(client.url).origin === self.location.origin) {
          await client.focus();
          client.postMessage({ type: 'TEY_NAVIGATE', url: target });
          return;
        }
      }

      await self.clients.openWindow(target);
    })()
  );
});
