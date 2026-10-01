import type { ReactNode } from 'react';
import { Baloo_2 } from 'next/font/google';

/**
 * Baloo 2 is the display face of the homepage and the in-app celebrations
 * (--font-celebration). The root layout deliberately doesn't load it, so the
 * blog self-hosts it here — without this every blog headline silently fell
 * back to Plus Jakarta Sans.
 */
const baloo2 = Baloo_2({
  variable: '--font-celebration',
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className={baloo2.variable}>{children}</div>;
}
