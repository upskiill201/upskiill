'use client';

import dynamic from 'next/dynamic';

/**
 * Code-split wrapper for the app-wide portal overlays.
 *
 * These (RewardAnimationOverlay) used to be
 * statically imported straight into the root layout — they all bundle
 * Framer Motion, that put real weight in the shared/global
 * chunk on every route, including ones that never trigger an overlay.
 * `next/dynamic(..., { ssr: false })` is only valid from a Client Component
 * (app/layout.tsx is a Server Component), hence this thin wrapper — the
 * layout renders this one component instead of importing them directly.
 */
const RewardAnimationOverlay = dynamic(() => import('../ui/RewardAnimationOverlay'), { ssr: false });

export function DeferredRewardAnimationOverlay() {
  return <RewardAnimationOverlay />;
}
