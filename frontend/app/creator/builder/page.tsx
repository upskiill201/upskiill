'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/Spinner';

/**
 * /creator/builder
 * 
 * This route is just a landing pad. It immediately redirects
 * the user to /creator/builder/new — a blank, unsaved course form.
 * No API call is made here. The first save happens when the user
 * explicitly clicks "Save draft" or "Save & Continue".
 */
export default function BuilderEntry() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/creator/builder/new');
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '80vh',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px'
    }}>
      <Spinner size="lg" color="blue" />
      <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#1F2A44' }}>
        Opening Course Builder...
      </h2>
    </div>
  );
}
