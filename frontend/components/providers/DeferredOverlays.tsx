'use client';

import dynamic from 'next/dynamic';

/**
 * Code-split wrapper for the app-wide portal overlays.
 *
 * These four (RewardAnimationOverlay, HeraldSpinReveal + HeraldStreakReveal,
 * StreakModal) used to be statically imported straight into the root
 * layout — since HeraldSpinReveal alone drags in GSAP + CustomEase, and all
 * four bundle Framer Motion, that put real weight in the shared/global
 * chunk on every route, including ones that never trigger an overlay.
 * `next/dynamic(..., { ssr: false })` is only valid from a Client Component
 * (app/layout.tsx is a Server Component), hence this thin wrapper — the
 * layout renders this one component instead of importing the four directly.
 */
const RewardAnimationOverlay = dynamic(() => import('../ui/RewardAnimationOverlay'), { ssr: false });
const HeraldSpinReveal = dynamic(() => import('../herald/HeraldSpinReveal'), { ssr: false });
const HeraldStreakReveal = dynamic(() => import('../herald/HeraldStreakReveal'), { ssr: false });
const StreakModal = dynamic(() => import('../streak/StreakModal'), { ssr: false });

export function DeferredRewardAnimationOverlay() {
  return <RewardAnimationOverlay />;
}

export function DeferredHeraldReveals() {
  return (
    <>
      <HeraldSpinReveal />
      <HeraldStreakReveal />
    </>
  );
}

export function DeferredStreakModal() {
  return <StreakModal />;
}
