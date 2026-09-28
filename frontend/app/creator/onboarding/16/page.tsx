import { redirect } from 'next/navigation';

/**
 * The 16-step flow ended here (account, then welcome). Verification emails
 * and old bookmarks still point at it: the new flow continues at the profile
 * step, which sends a guest back to sign up.
 */
export default function LegacyCreatorOnboardingStep() {
  redirect('/creator/onboarding/13');
}
