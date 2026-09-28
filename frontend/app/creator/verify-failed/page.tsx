'use client';

import { XCircle } from 'lucide-react';
import AuthStatusScreen from '@/components/auth/AuthStatusScreen';
import { ACCOUNT_STEP } from '@/lib/creator-onboarding/steps';

/** A verification link that was invalid or expired. */
export default function VerifyFailedPage() {
  return (
    <AuthStatusScreen
      Icon={XCircle}
      tone="bad"
      title="That link didn't work"
      closeHref="/creator/login"
      action={{ label: 'Log in', href: '/creator/login?mode=signin' }}
      secondary={{ label: 'Sign up again', href: `/creator/onboarding/${ACCOUNT_STEP}` }}
    >
      It may have expired or already been used. Log in to get a fresh code, or sign up again.
    </AuthStatusScreen>
  );
}
