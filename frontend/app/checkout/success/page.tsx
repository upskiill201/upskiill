import { redirect } from 'next/navigation';

/**
 * /checkout/success — retired 2026-10-23. Old per-course payment links land in the app.
 * Teyro Pro (one subscription, every course) replaced per-course buying, so
 * this old marketplace page is retired and sends people on.
 */
export default function Retired() {
  redirect('/dashboard');
}
