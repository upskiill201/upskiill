'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Skeleton from '@/components/ui/Skeleton';

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
      gap: '24px',
      padding: '0 40px'
    }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Skeleton height={24} width={150} style={{ marginBottom: 30 }} />
        <Skeleton height={200} style={{ marginBottom: 20 }} />
        <Skeleton height={150} style={{ marginBottom: 20 }} />
      </div>
    </div>
  );
}
