'use client';

/**
 * /pro — the paywall as a page, for deep links from push, email, Settings
 * and anywhere that can't open it in place.
 *
 *   /pro?m=DAILY_LIMIT&returnTo=/learn/abc
 *
 * `m` picks the moment (and with it the headline); anything unknown falls
 * back to DEEP_LINK. Leaving or subscribing returns to `returnTo`.
 */

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProPaywall from '@/components/pro/ProPaywall';
import { type PaywallMoment } from '@/lib/pro/api';
import { usePaywallContext } from '@/lib/pro/usePaywallContext';
import { sanitizeReturnTo } from '@/lib/return-to';

const MOMENTS: PaywallMoment[] = [
  'ONBOARDING',
  'LOCKED_LESSON',
  'DAILY_LIMIT',
  'OUT_OF_HEARTS',
  'AFTER_SUCCESS',
  'RETURN_AFTER_BREAK',
  'DEEP_LINK',
  'SETTINGS',
  'STREAK_REPAIR',
];

export default function ProPage() {
  const router = useRouter();
  const [params] = useState(() =>
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams(),
  );
  const moment = (MOMENTS as string[]).includes(params.get('m') ?? '')
    ? (params.get('m') as PaywallMoment)
    : 'DEEP_LINK';
  const returnTo = sanitizeReturnTo(params.get('returnTo'));
  const context = usePaywallContext(params.get('course'));

  return (
    <ProPaywall
      moment={moment}
      context={context}
      onDismiss={() => router.replace(returnTo)}
      onPro={() => router.replace(returnTo)}
    />
  );
}
