'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import WaitlistFooter from './WaitlistFooter';

export default function FooterWrapper() {
  const pathname = usePathname();

  // Define routes that should display the dedicated Waitlist Footer
  const isWaitlistRoute = pathname === '/' || pathname === '/terms' || pathname === '/privacy';

  if (pathname === '/join') return null;

  if (isWaitlistRoute) {
    return <WaitlistFooter />;
  }

  // Fallback to the main global Footer for the rest of the application
  return <Footer />;
}
