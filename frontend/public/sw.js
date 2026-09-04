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

const CACHE_VERSION = 'teyro-v1';
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
