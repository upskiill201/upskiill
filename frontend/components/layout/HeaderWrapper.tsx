'use client';

import { usePathname } from 'next/navigation';
import WaitlistHeader from './WaitlistHeader';

/**
 * One header for the whole site: the Tey header (WaitlistHeader), on the
 * homepage, SEO sections, blog, legal, cart, certificates, the 404 and every
 * other public page. The app, auth screens, onboarding, Studio and Teyro HQ
 * have their own chrome and show none. The old marketplace Header is retired.
 */
export default function HeaderWrapper() {
  const pathname = usePathname();

  // Routes that show NO header at all
  const isHiddenRoute =
    // The install gateway and the PWA launch router are full-bleed app
    // surfaces, not site pages — marketing chrome on either would break the
    // "I'm entering Teyro" handoff and, on /start, push the CTA off a short
    // phone's viewport.
    pathname === '/start' ||
    pathname === '/launch' ||
    pathname === '/join' ||
    pathname === '/signup' ||
    pathname === '/login' ||
    // The rest of the student auth screens are full-bleed app screens too.
    pathname === '/forgot-password' ||
    pathname === '/reset-password' ||
    pathname === '/verify-email' ||
    pathname === '/creator/login' ||
    pathname === '/creator/signup' ||
    pathname.startsWith('/dashboard') ||
    // The lesson route (/learn/…) — not /learn-coding, /learn-ai, /learn-online.
    pathname === '/learn' ||
    pathname.startsWith('/learn/') ||
    pathname === '/creator' ||
    pathname.startsWith('/creator/') ||
    // The Admin Center has its own shell (AdminShell) with its own sidebar
    // and branding — the marketing header (with logged-out Login/Sign Up
    // CTAs) has no business rendering above an internal, admin-only tool.
    pathname.startsWith('/admin');

  if (isHiddenRoute) return null;

  if (pathname?.startsWith('/onboarding')) {
    return null;
  }

  return <WaitlistHeader />;
}
