'use client';

import { usePathname } from 'next/navigation';
import Header from '../Header';
import WaitlistHeader from './WaitlistHeader';

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Waitlist routes: show the dedicated WaitlistHeader
  const isWaitlistRoute = pathname === '/' || pathname === '/terms' || pathname === '/privacy';

  // Routes that show NO header at all
  const isHiddenRoute =
    pathname === '/join' ||
    pathname === '/signup' ||
    pathname === '/login' ||
    pathname === '/instructor/login' ||
    pathname === '/instructor/signup' ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/instructor');

  if (isHiddenRoute) return null;

  if (isWaitlistRoute) {
    return <WaitlistHeader />;
  }

  // Fallback: the main global Header for the rest of the application
  return <Header />;
}
