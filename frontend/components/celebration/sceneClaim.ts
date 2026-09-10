'use client';

/**
 * Shared server-first claim execution for scenes with a `claim()` (CLAIM,
 * ACHIEVEMENT). The claim must persist exactly once per scene, while every
 * mount of the scene still learns the outcome — React 19 StrictMode runs
 * mount → cleanup → mount in dev, so a WeakSet "already started" guard would
 * leave the second mount permanently waiting on a result it can never see.
 * The executed promise is cached per scene object instead; each mount simply
 * subscribes to it.
 */

import type { CelebrationCurrency } from '@/context/CelebrationContext';

/**
 * Exact post-claim balances a claim may resolve with, for the count-up.
 * A claim may also resolve with `pendingCaption` when the payout was recorded
 * server-side but settles at signup (pre-signup learners) — scenes show that
 * caption instead of implying an account balance already exists.
 */
export type SceneClaimBalances = Partial<Record<CelebrationCurrency, number>> & {
  pendingCaption?: string;
};

type ClaimableScene = { claim?: () => Promise<SceneClaimBalances | void> | SceneClaimBalances | void };

const executedClaims = new WeakMap<object, Promise<SceneClaimBalances | undefined>>();

export function runSceneClaim(scene: ClaimableScene): Promise<SceneClaimBalances | undefined> {
  const cached = executedClaims.get(scene);
  if (cached) return cached;

  const executed = Promise.resolve()
    .then(() => scene.claim?.())
    .then((result): SceneClaimBalances | undefined => {
      // A claim may return nothing (void) or its post-claim balances.
      if (typeof result !== 'object' || result === null) return undefined;
      return result;
    });
  // Defensive no-op branch so a scene unmounting before settlement never
  // surfaces an unhandledrejection; real subscribers attach their own handlers.
  executed.catch(() => {});
  executedClaims.set(scene, executed);
  return executed;
}
