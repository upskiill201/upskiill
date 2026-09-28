'use client';

import { usePathname } from 'next/navigation';
import Header from '../Header';
import WaitlistHeader from './WaitlistHeader';
import OnboardingHeader from './OnboardingHeader';

const SEO_SECTIONS = ['/features', '/for', '/alternatives', '/teach'];

function isSeoSection(pathname: string | null) {
  return SEO_SECTIONS.some((s) => pathname === s || pathname?.startsWith(`${s}/`));
}

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Waitlist routes: show the dedicated WaitlistHeader
  const isWaitlistRoute =
    pathname === '/' ||
    pathname === '/terms' ||
    pathname === '/privacy' ||
    pathname === '/teach' ||
    pathname?.startsWith('/blog') ||
    // SEO sections (features, use cases, comparisons) share the homepage chrome
    isSeoSection(pathname);

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
    pathname === '/creator/login' ||
    pathname === '/creator/signup' ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/courses') ||
    pathname.startsWith('/learn') ||
    pathname.startsWith('/creator') ||
    // The Admin Center has its own shell (AdminShell) with its own sidebar
    // and branding — the marketing header (with logged-out Login/Sign Up
    // CTAs) has no business rendering above an internal, admin-only tool.
    pathname.startsWith('/admin');

  if (isHiddenRoute) return null;

  if (pathname?.startsWith('/onboarding')) {
    return null;
  }

  if (isWaitlistRoute) {
    return <WaitlistHeader />;
  }

  // Fallback: the main global Header for the rest of the application
  return <Header />;
}
