'use client';

import { usePathname } from 'next/navigation';
import Header from '../Header';
import WaitlistHeader from './WaitlistHeader';
import OnboardingHeader from './OnboardingHeader';

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Waitlist routes: show the dedicated WaitlistHeader
  const isWaitlistRoute = pathname === '/' || pathname === '/terms' || pathname === '/privacy';

  // Routes that show NO header at all
  const isHiddenRoute =
    pathname === '/join' ||
    pathname === '/signup' ||
    pathname === '/login' ||
    pathname === '/creator/login' ||
    pathname === '/creator/signup' ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/creator');

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
