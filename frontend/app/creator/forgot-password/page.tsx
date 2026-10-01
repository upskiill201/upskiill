'use client';

/**
 * /creator/forgot-password — the creator welcome screen, opened on its
 * "Forgot password" view (the reset email links to the creator reset page).
 */

import WelcomeAuthScreen from '@/components/auth/WelcomeAuthScreen';
import { CREATOR_WELCOME_COPY } from '../login/copy';

export default function CreatorForgotPasswordPage() {
  return (
    <WelcomeAuthScreen
      role="INSTRUCTOR"
      copy={CREATOR_WELCOME_COPY}
      getStartedHref="/creator/onboarding/1"
      backHref="/creator/login"
      initialView="forgot"
    />
  );
}
