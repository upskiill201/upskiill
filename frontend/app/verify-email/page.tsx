'use client';

/**
 * Email magic-link landing page.
 *
 * The verification link in the welcome email points here (APP origin) — never
 * at the API origin, where a session cookie would be set for the wrong domain.
 * The token is exchanged through the proxied /api route so the httpOnly
 * cookie lands first-party.
 *
 * Deliberately does NOT verify on mount: email scanners prefetch links, and
 * an auto-verify would consume the token before the human clicks. Verification
 * happens only on an explicit user action (POST).
 */

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Art } from '@/components/art/Art';
import { TeyLine } from '@/components/kit/Kit';
import AuthStatusScreen from '@/components/auth/AuthStatusScreen';
import { FormError, PrimaryButton, authStyles as styles } from '@/components/auth/AuthUi';
import { extractErrorMessage } from '@/lib/apiError';
import { saveAccount } from '@/lib/auth/savedAccount';
import { clearClientSession } from '@/lib/user-cache';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';

export default function VerifyEmailPage() {
  const reduce = useReducedMotion() ?? false;
  // Read after mount: no useSearchParams, so no Suspense boundary.
  const [link, setLink] = useState<{ token: string; email: string } | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    hydrateSoundPreferences();
    const q = new URLSearchParams(window.location.search);
    setLink({ token: q.get('token') ?? '', email: q.get('email') ?? '' });
  }, []);

  const confirm = async () => {
    if (!link?.token || !link.email || verifying) return;
    setVerifying(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token: link.token, email: link.email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
      playSound('correct');
      playHaptic('success', false);
      // Server decides where to send them based on their real role:
      // creators continue onboarding, students go to their dashboard.
      const role = data?.user?.role === 'INSTRUCTOR' ? 'INSTRUCTOR' : 'STUDENT';
      clearClientSession();
      saveAccount({ email: link.email, fullName: data?.user?.fullName ?? null, avatarUrl: data?.user?.avatarUrl ?? null, role });
      window.location.href = role === 'INSTRUCTOR' ? '/creator/onboarding/16' : '/dashboard';
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'This link is invalid or has expired.');
      playSound('wrong');
      playHaptic('error', false);
      setVerifying(false);
    }
  };

  if (!link) return <div className={styles.screen} aria-busy="true" />;

  if (!link.token || !link.email) {
    return (
      <AuthStatusScreen
        art="linkBroken"
        tone="bad"
        title="This link is incomplete"
        closeHref="/login"
        action={{ label: 'Log in for a fresh code', href: '/login?mode=signin' }}
      >
        It may come from an older email. Log in with your email and password and I&apos;ll send you a new 6-digit
        code.
      </AuthStatusScreen>
    );
  }

  return (
    <div className={styles.screen}>
      <main className={`${styles.formPane} ${styles.center}`}>
        <TeyLine teySrc="/User onbarding Assets/tey/waving.webp" text="One tap and your Teyro account is officially yours." />
        <motion.span
          initial={reduce ? false : { scale: 0.4, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 14 }}
        >
          <Art name="envelope" size={120} />
        </motion.span>
        <h1 className={styles.formTitle}>Confirm your email</h1>
        <p className={styles.formSub}>
          Your streak, XP and Coins stay saved to <strong>{link.email}</strong>.
        </p>
        <FormError message={error} />
        <PrimaryButton type="button" busy={verifying} onClick={confirm}>
          {verifying ? 'Confirming…' : 'Confirm my email'}
        </PrimaryButton>
        <a href="/login?mode=signin" className={styles.forgot}>
          Link expired? Log in for a fresh code
        </a>
      </main>
    </div>
  );
}
