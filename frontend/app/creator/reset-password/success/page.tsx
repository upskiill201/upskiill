'use client';

import AuthStatusScreen from '@/components/auth/AuthStatusScreen';

/** A new creator password is set. */
export default function ResetSuccessPage() {
  return (
    <AuthStatusScreen
      art="seal"
      tone="good"
      title="Password updated"
      closeHref="/creator/login"
      action={{ label: 'Log in', href: '/creator/login?mode=signin' }}
    >
      You&apos;re all set. Log in with your new password.
    </AuthStatusScreen>
  );
}
