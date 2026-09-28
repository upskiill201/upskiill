import { resolveAppEntry } from '../entry';
import { ONBOARDING_STORAGE_KEY, TOTAL_STEPS } from '@/lib/user-onboarding';

/**
 * Where the manifest's start_url actually sends someone.
 *
 * This runs on every single launch of the installed app, so each branch is a
 * distinct user-visible outcome: a returning learner bounced back to sign-in,
 * or a brand-new one dropped into step 1 having never seen the new-user /
 * existing-user fork on screen 0.
 */

function withStoredState(state: unknown) {
  const store = new Map<string, string>();
  if (state !== undefined) {
    store.set(ONBOARDING_STORAGE_KEY, JSON.stringify(state));
  }
  (globalThis as unknown as { window: unknown }).window = {};
  (globalThis as unknown as { localStorage: unknown }).localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
}

afterEach(() => {
  delete (globalThis as unknown as { window?: unknown }).window;
  delete (globalThis as unknown as { localStorage?: unknown }).localStorage;
});

describe('resolveAppEntry', () => {
  it('sends a brand-new learner to screen 0, not step 1', () => {
    // Screen 0 is the new-user / existing-user fork. Skipping to step 1 would
    // leave a returning learner on a fresh device with no route to sign-in.
    withStoredState(undefined);
    expect(resolveAppEntry()).toEqual({ href: '/onboarding/0', reason: 'fresh' });
  });

  it('still sends someone with no completed steps to screen 0', () => {
    // `currentStep` defaults to 1 for a learner who has never started, so it
    // is not on its own evidence of progress.
    withStoredState({ currentStep: 1, completedSteps: [], answers: {} });
    expect(resolveAppEntry()).toEqual({ href: '/onboarding/0', reason: 'fresh' });
  });

  it('resumes at the step after the furthest one completed', () => {
    withStoredState({ currentStep: 5, completedSteps: [1, 2, 3, 4], answers: {} });
    expect(resolveAppEntry()).toEqual({ href: '/onboarding/5', reason: 'resume' });
  });

  it('resumes from the furthest step, not the last one written', () => {
    // Back-navigation leaves currentStep behind completedSteps.
    withStoredState({ currentStep: 2, completedSteps: [1, 2, 3, 4, 5, 6], answers: {} });
    expect(resolveAppEntry()).toEqual({ href: '/onboarding/7', reason: 'resume' });
  });

  it('never points past the last step', () => {
    // Completing the final step without the completion flag (a sync that did
    // not land) must not produce a step number past TOTAL_STEPS, which does
    // not exist as a route.
    withStoredState({
      currentStep: TOTAL_STEPS,
      completedSteps: Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1),
      answers: {},
    });
    expect(resolveAppEntry()).toEqual({
      href: `/onboarding/${TOTAL_STEPS}`,
      reason: 'resume',
    });
  });

  it('sends a finished learner straight to the dashboard', () => {
    withStoredState({
      currentStep: TOTAL_STEPS,
      completedSteps: [1, 2, 3],
      answers: {},
      onboardingComplete: true,
    });
    expect(resolveAppEntry()).toEqual({ href: '/dashboard', reason: 'completed' });
  });

  it('falls back to screen 0 when stored state is corrupt', () => {
    (globalThis as unknown as { window: unknown }).window = {};
    (globalThis as unknown as { localStorage: unknown }).localStorage = {
      getItem: () => '{not json',
      removeItem: () => undefined,
      setItem: () => undefined,
    };
    expect(resolveAppEntry().href).toBe('/onboarding/0');
  });
});
