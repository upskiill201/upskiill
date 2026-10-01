'use client';

import { MailCheck } from 'lucide-react';
import AuthStatusScreen from '@/components/auth/AuthStatusScreen';

/** After requesting a creator password reset. */
export default function CheckEmailPage() {
  return (
    <AuthStatusScreen
      Icon={MailCheck}
      tone="good"
      title="Check your inbox"
      closeHref="/creator/login"
      action={{ label: 'Back to log in', href: '/creator/login?mode=signin' }}
    >
      If that email belongs to a Teyro creator account, a reset link is on its way. It expires in 30 minutes,
      and sometimes lands in spam.
    </AuthStatusScreen>
  );
}
