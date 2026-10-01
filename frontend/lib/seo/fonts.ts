import { Baloo_2 } from 'next/font/google';

/**
 * The homepage's display face for the SEO sections (/features, /for,
 * /alternatives) — the root layout doesn't load it, and without it every
 * headline falls back to Plus Jakarta Sans. Same setup as app/blog/layout.tsx.
 */
export const baloo2 = Baloo_2({
  variable: '--font-celebration',
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});
