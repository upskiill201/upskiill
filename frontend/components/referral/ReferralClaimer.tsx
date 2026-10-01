'use client';

/**
 * Once a learner is signed in, claims the invite they arrived with (stored by
 * ReferralCapture). The server decides if it counts (new learners only, not
 * your own code, once); any definite answer clears the stored code, and only
 * a network failure keeps it for next time.
 */

import { useEffect } from 'react';
import { useGamification } from '@/context/GamificationContext';
import { clearStoredReferral, readStoredReferral } from './ReferralCapture';

export default function ReferralClaimer() {
  const { profileLoaded } = useGamification();

  useEffect(() => {
    if (!profileLoaded) return;
    const code = readStoredReferral();
    if (!code) return;
    fetch('/api/referrals/claim', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
      .then((res) => {
        if (res.status < 500) clearStoredReferral();
      })
      .catch(() => {
        // Offline — try again next session.
      });
  }, [profileLoaded]);

  return null;
}
