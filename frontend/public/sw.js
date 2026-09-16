/**
 * Teyro service worker — hand-written (not next-pwa/workbox; both lag Next
 * releases and next-pwa in particular conflicts with Turbopack).
 *
 * ── Versioning ─────────────────────────────────────────────────────────────
 * The cache version comes from the `?v=` query on the script URL, which
 * ServiceWorkerRegistrar sets to NEXT_PUBLIC_BUILD_ID. A different script URL
 * is a different worker, so a deploy installs a new SW and the activate handler
 * below drops every cache that is not on the current version.
 *
 * This replaces a hardcoded `CACHE_VERSION = 'teyro-v2'` that no build step
 * touched, which meant caches never rotated on deploy: the static cache
 * accumulated the hashed chunks of every build ever shipped and served them
 * cache-first, forever, with no revalidation.
 *
 * ── Strategy ───────────────────────────────────────────────────────────────
 *  - PRECACHE: the offline page, the manifest and the icons, at install.
 *  - STATIC:   cache-first for /_next/static/* only. Next fingerprints those
 *              filenames, so they are immutable and safe to pin. Fonts land
 *              here too — next/font emits to /_next/static/media/*.woff2.
 *  - IMAGES:   stale-while-revalidate, LRU-capped. Covers /_next/image output
 *              and /Icons/*, whose filenames are NOT hashed and so must not be
 *              pinned cache-first the way /_next/static can be.
 *  - PAGES:    network-first for navigations only, LRU-capped, falling back to
 *              the cached page and then to /offline.
 *  - /api/*:   never cached, never intercepted. SWR owns API freshness client
 *              side, and caching auth-bearing JSON in a service worker leaks
 *              data across accounts on a shared device.
 *
 * Everything not matched above goes straight to the network and is not stored.
 * The previous version cached every same-origin response into one unbounded
 * cache with no allowlist, no cap and no expiry, which on a mid-range Android
 * eventually blew the origin quota — taking localStorage, and therefore the
 * session, with it.
 */

const VERSION = new URL(self.location.href).searchParams.get('v') || 'dev';

const PRECACHE = `teyro-${VERSION}-precache`;
const STATIC_CACHE = `teyro-${VERSION}-static`;
const IMAGE_CACHE = `teyro-${VERSION}-images`;
const PAGE_CACHE = `teyro-${VERSION}-pages`;

const CURRENT_CACHES = [PRECACHE, STATIC_CACHE, IMAGE_CACHE, PAGE_CACHE];

const OFFLINE_URL = '/offline';

/**
 * Documents are deliberately NOT precached. Precaching '/' and '/dashboard'
 * (as the previous version did) is what made a post-deploy white screen
 * possible: a stale HTML document could be served to a client whose JS chunks
 * no longer exist.
 */
const PRECACHE_URLS = [
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/favicon.png',
  '/Icons/icon-192.png',
];

const MAX_IMAGE_ENTRIES = 60;
const MAX_PAGE_ENTRIES = 20;

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Cache.put that cannot throw or reject unobserved.
 *
 * Three real failure modes this covers, all previously unhandled:
 *  - 206 Partial Content. Every <video> Range request returns one, and the
 *    Cache API rejects put() with a TypeError for it. Response.ok is true for
 *    206, so an `if (response.ok)` guard does NOT catch this.
 *  - QuotaExceededError once storage fills.
 *  - The worker being terminated mid-write.
 */
async function safePut(cacheName, request, response) {
  if (!response || response.status !== 200 || response.type === 'opaque') return;
  if ((response.headers.get('Cache-Control') || '').includes('no-store')) return;

  try {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
  } catch (err) {
    if (err && err.name === 'QuotaExceededError') {
      // Make room and give up on this entry rather than retrying forever.
      await trimCache(IMAGE_CACHE, Math.floor(MAX_IMAGE_ENTRIES / 2)).catch(() => {});
      await trimCache(PAGE_CACHE, Math.floor(MAX_PAGE_ENTRIES / 2)).catch(() => {});
    }
    // Any other failure is not worth breaking the response for.
  }
}

/** Evicts oldest-first. Cache Storage preserves insertion order. */
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  await Promise.all(keys.slice(0, keys.length - maxEntries).map((k) => cache.delete(k)));
}

function isApiRequest(url) {
  return url.pathname.startsWith('/api/');
}

/** Hashed by Next, therefore immutable and safe to pin. */
function isImmutableAsset(url) {
  return url.pathname.startsWith('/_next/static/');
}

/** Not content-hashed — cached, but revalidated and capped. */
function isImageRequest(url, request) {
  if (url.pathname.startsWith('/_next/image')) return true;
  if (url.pathname.startsWith('/Icons/')) return true;
  if (request.destination === 'image') return true;
  return /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(url.pathname);
}

// ── Lifecycle ──────────────────────────────────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      // addAll is atomic — one 404 would reject the whole install — so each
      // entry is added independently and best-effort.
      await Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => {}),
        ),
      );
    })(),
  );

  // NOTE: no skipWaiting() here. The previous version called it
  // unconditionally, so a new worker seized control of pages still running the
  // previous build's JavaScript; those pages then requested chunk hashes the
  // new deployment no longer serves, got the HTML fallback, and died with
  // "Unexpected token '<'". The page now decides when to hand over — see the
  // SKIP_WAITING message handler below, which the registrar triggers at a
  // moment the user cannot perceive.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Runs the navigation request in parallel with booting this worker. On
      // mobile the SW is killed after ~30s idle, so without this every
      // navigation pays 100-300ms of dead time before the fetch even starts.
      // Unsupported on Safari/iOS, where preloadResponse simply resolves to
      // undefined and the normal path below runs.
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable().catch(() => {});
      }

      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('teyro-') && !CURRENT_CACHES.includes(key))
          .map((key) => caches.delete(key)),
      );

      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ── Fetch ──────────────────────────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never intercept API calls — always network, never cached.
  if (isApiRequest(url)) return;

  // Range requests (video seeking) must reach the network untouched; a cached
  // 200 cannot satisfy a Range header, and the 206 response cannot be stored.
  if (request.headers.has('range')) return;

  // ── Navigations: network-first, then cache, then the offline page ────────
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloaded = await event.preloadResponse;
          if (preloaded) {
            event.waitUntil(safePut(PAGE_CACHE, request, preloaded.clone()));
            event.waitUntil(trimCache(PAGE_CACHE, MAX_PAGE_ENTRIES).catch(() => {}));
            return preloaded;
          }

          const response = await fetch(request);
          event.waitUntil(safePut(PAGE_CACHE, request, response.clone()));
          event.waitUntil(trimCache(PAGE_CACHE, MAX_PAGE_ENTRIES).catch(() => {}));
          return response;
        } catch {
          const cached = await caches.match(request);
          if (cached) return cached;
          const offline = await caches.match(OFFLINE_URL);
          if (offline) return offline;
          return Response.error();
        }
      })(),
    );
    return;
  }

  // ── Immutable build assets: cache-first ──────────────────────────────────
  if (isImmutableAsset(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        event.waitUntil(safePut(STATIC_CACHE, request, response.clone()));
        return response;
      })(),
    );
    return;
  }

  // ── Images: stale-while-revalidate, capped ───────────────────────────────
  if (isImageRequest(url, request)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);

        const network = fetch(request)
          .then((response) => {
            event.waitUntil(safePut(IMAGE_CACHE, request, response.clone()));
            event.waitUntil(trimCache(IMAGE_CACHE, MAX_IMAGE_ENTRIES).catch(() => {}));
            return response;
          })
          .catch(() => null);

        if (cached) {
          // Refresh in the background; serve instantly.
          event.waitUntil(network);
          return cached;
        }

        const response = await network;
        return response || Response.error();
      })(),
    );
    return;
  }

  // Everything else: straight to the network, not stored. Notably this no
  // longer writes arbitrary same-origin responses into an unbounded cache.
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
      // The only genuinely controllable "alert" lever Web Push has — there is
      // no cross-browser way to attach a custom sound file to a notification,
      // on any browser, today. Default OS/browser sound already plays unless
      // something external (Do Not Disturb, a silenced site permission) is
      // suppressing it. Deliberately NOT setting `silent` here — leaving it
      // unset is what lets that default sound through.
      vibrate: [200, 100, 200],
      data: {
        url: data.url || '/dashboard',
        deliveryId: data.deliveryId,
        reason: data.reason,
      },
    }),
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
    })(),
  );
});
