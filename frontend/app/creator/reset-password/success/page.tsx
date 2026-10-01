'use client';

import { CheckCircle2 } from 'lucide-react';
import AuthStatusScreen from '@/components/auth/AuthStatusScreen';

/** A new creator password is set. */
export default function ResetSuccessPage() {
  return (
    <AuthStatusScreen
      Icon={CheckCircle2}
      tone="good"
      title="Password updated"
      closeHref="/creator/login"
      action={{ label: 'Log in', href: '/creator/login?mode=signin' }}
    >
      You&apos;re all set. Log in with your new password.
    </AuthStatusScreen>
  );
}
