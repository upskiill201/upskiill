import type { MetadataRoute } from 'next';

/**
 * Next.js typed manifest route — served at /manifest.webmanifest.
 * Makes Teyro installable as a standalone PWA. Icons generated from the
 * Tey mark in public/Tey Logo and icons/ by scripts/gen-app-icons.mjs.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Teyro',
    short_name: 'Teyro',
    description: 'Teyro — personalized, gamified learning for everyone.',

    /**
     * Launching the app runs the entry router at app/launch/page.tsx, which
     * sends the learner to /dashboard, their next onboarding step, or screen 0.
     *
     * This was `/dashboard`, which meant the very first launch after install
     * dropped a brand-new learner onto an authenticated screen they had no
     * account for.
     */
    start_url: '/launch?src=pwa',

    /**
     * Pinned to the OLD start_url on purpose.
     *
     * `id` defaults to `start_url`, so installs made before this change carry
     * the identity `/dashboard`. Changing start_url without pinning `id` would
     * make this a *different* app to the browser — existing installs would
     * stop updating and a second Teyro icon could appear alongside the first.
     * The value is not a route and is never navigated to; it is only an
     * identity string, and it must not change again.
     */
    id: '/dashboard',

    /** Explicit rather than inherited from start_url's directory. */
    scope: '/',

    display: 'standalone',
    // Android draws its launch splash from this + the "any" icon; deep brand
    // blue matches the iOS launch screens (public/splash) and /launch.
    background_color: '#0050B3',
    theme_color: '#0172FD',
    icons: [
      {
        src: '/Icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/Icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/Icons/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
