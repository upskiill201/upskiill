'use client';

import { usePathname } from 'next/navigation';
import WaitlistFooter from './WaitlistFooter';

export default function FooterWrapper() {
  const pathname = usePathname();

  if (
    // Full-bleed app surfaces — see the matching note in HeaderWrapper.
    pathname === '/start' ||
    pathname === '/launch' ||
    pathname === '/join' ||
    // Student auth screens are app screens too (Duolingo-style, full-bleed).
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname?.startsWith('/onboarding') ||
    pathname?.startsWith('/dashboard') ||
    // The lesson route (/learn/…) — not /learn-coding, /learn-ai, /learn-online.
    pathname === '/learn' ||
    pathname?.startsWith('/learn/') ||
    pathname === '/creator' ||
    pathname?.startsWith('/creator/') ||
    // Teyro HQ (the admin center) has its own frame; a marketing footer under
    // an internal tool only gets in the way.
    pathname?.startsWith('/admin')
  ) return null;

  // Everything else is a public page: the marketing footer, which links the
  // real site (courses, learn hubs, teach, blog, features, comparisons).
  //
  // This used to fall back to a legacy "Upskiill" footer for any route not
  // listed above, and the homepage's server-rendered HTML got that one: about
  // thirteen links to pages that 404 (/pricing, /about, /careers…) and none to
  // /learn-coding, /learn-ai or /learn-online, which left those hubs with no
  // internal link from the homepage. Defaulting to the marketing footer fixes
  // both for every route, including any added later.
  return <WaitlistFooter />;
}
