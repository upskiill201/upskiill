'use client';

/**
 * /forgot-password — the log in screen's own "forgot" view (Tey asks for the
 * email, the envelope says it's sent), so there is one design and one code
 * path for resets. Its back button goes to the log in form.
 */

import WelcomeAuthScreen from '@/components/auth/WelcomeAuthScreen';

export default function StudentForgotPasswordPage() {
  return <WelcomeAuthScreen role="STUDENT" initialView="forgot" backHref="/login" />;
}
