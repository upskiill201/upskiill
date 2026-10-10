'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import WaitlistFooter from './WaitlistFooter';

const SEO_SECTIONS = ['/features', '/for', '/alternatives', '/teach', '/courses', '/learn-online', '/learn-coding', '/learn-ai'];

function isSeoSection(pathname: string | null) {
  return SEO_SECTIONS.some((s) => pathname === s || pathname?.startsWith(`${s}/`));
}

export default function FooterWrapper() {
  const pathname = usePathname();

  // Define routes that should display the dedicated Waitlist Footer
  const isWaitlistRoute =
    pathname === '/' ||
    pathname === '/terms' ||
    pathname === '/privacy' ||
    pathname === '/teach' ||
    pathname?.startsWith('/blog') ||
    // SEO sections (features, use cases, comparisons) share the homepage chrome
    isSeoSection(pathname);

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
    pathname?.startsWith('/creator') ||
    // Teyro HQ (the admin center) has its own frame; a marketing footer under
    // an internal tool only gets in the way.
    pathname?.startsWith('/admin')
  ) return null;

  if (isWaitlistRoute) {
    return <WaitlistFooter />;
  }

  // Fallback to the main global Footer for the rest of the application
  return <Footer />;
}
