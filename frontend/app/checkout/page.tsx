'use client';

/**
 * The old cart checkout. It charged course prices without ever granting
 * access, and the backend now refuses it (410). Every course is part of
 * Teyro Pro, so anyone landing here goes to the Pro plans.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TeyroBrandedLoader from '@/components/ui/TeyroBrandedLoader';

export default function CheckoutPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/pro?m=DEEP_LINK');
  }, [router]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <TeyroBrandedLoader suppressConnectionCheck />
    </div>
  );
}
