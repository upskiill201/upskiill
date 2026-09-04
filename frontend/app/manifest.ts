import type { MetadataRoute } from 'next';

/**
 * Next.js typed manifest route — served at /manifest.webmanifest.
 * Makes Teyro installable as a standalone PWA. Icons generated from the
 * square brand mark at public/teyro-logo-blue.png (see public/Icons/icon-*).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Teyro',
    short_name: 'Teyro',
    description: 'Teyro — personalized, gamified learning for everyone.',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#3D5AFE',
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
