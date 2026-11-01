'use client';

import { useEffect } from 'react';
import { rememberReferral } from '@/components/referral/ReferralCapture';

/** A friend opening a share link arrives with the sharer's invite. */
export default function RememberInvite({ code }: { code: string | null }) {
  useEffect(() => {
    rememberReferral(code);
  }, [code]);
  return null;
}
