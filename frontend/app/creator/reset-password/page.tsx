'use client';

/**
 * /creator/reset-password?token= — choose a new password, in the auth
 * screens' Duolingo style. Same honest rule as sign-up: at least 8
 * characters (the old fake strength meter is gone). The token is checked up
 * front so an expired link says so before any typing.
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Eye, EyeOff, X, XCircle } from 'lucide-react';
import { Field, FieldGroup, FormError, PrimaryButton, authStyles as styles } from '@/components/auth/AuthUi';
import AuthStatusScreen from '@/components/auth/AuthStatusScreen';
import { extractErrorMessage } from '@/lib/apiError';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';

const MIN_PASSWORD = 8;
const DEAD_TOKEN = new Set(['token_expired', 'token_used', 'invalid_token']);

export default function CreatorResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'checking' | 'valid' | 'invalid'>('checking');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    hydrateSoundPreferences();
    const t = new URLSearchParams(window.location.search).get('token');
    if (!t) {
      router.replace('/creator/forgot-password');
      return;
    }
    setToken(t);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate-token?token=${encodeURIComponent(t)}`)
      .then((res) => res.json().then((data) => setStatus(res.ok && data.valid ? 'valid' : 'invalid')))
      // Can't check right now: let the submit be the judge.
      .catch(() => setStatus('valid'));
  }, [router]);

  const longEnough = password.length >= MIN_PASSWORD;

  const fail = (message: string) => {
    setError(message);
    playSound('wrong');
    playHaptic('error', false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    if (!longEnough) return fail(`Your password needs at least ${MIN_PASSWORD} characters.`);
    if (password !== confirm) return fail("Those passwords don't match.");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (DEAD_TOKEN.has(data.error)) {
          setStatus('invalid');
          return;
        }
        throw new Error(extractErrorMessage(data, res.status));
      }
      router.push('/creator/reset-password/success');
    } catch (err: unknown) {
      fail(err instanceof Error ? err.message : 'Something went wrong. Try again?');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'invalid') {
    return (
      <AuthStatusScreen
        Icon={XCircle}
        tone="bad"
        title="This link has expired"
        closeHref="/creator/login"
        action={{ label: 'Send a new link', href: '/creator/forgot-password' }}
      >
        Reset links last 30 minutes and work once. Ask for a fresh one and you&apos;ll be back in.
      </AuthStatusScreen>
    );
  }

  const eye = (
    <span className={styles.trailing}>
      <button
        type="button"
        className={styles.eye}
        onClick={() => {
          playSound(show ? 'toggleOff' : 'toggleOn');
          setShow((s) => !s);
        }}
        aria-label={show ? 'Hide passwords' : 'Show passwords'}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </span>
  );

  return (
    <div className={styles.screen}>
      <header className={styles.topBar}>
        <Link href="/creator/login" className={styles.iconBtn} aria-label="Close" onClick={() => playSound('cardBack')}>
          <X size={26} strokeWidth={3} />
        </Link>
      </header>
      <main className={styles.formPane}>
        <h1 className={styles.formTitle}>Choose a new password</h1>
        {status === 'checking' ? (
          <p className={styles.formSub} aria-busy="true">
            Checking your link…
          </p>
        ) : (
          <form onSubmit={submit} className={styles.form}>
            <FieldGroup>
              <Field
                label="New password"
                type={show ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                trailing={eye}
              />
              <Field
                label="Confirm new password"
                type={show ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </FieldGroup>
            <p className={`${styles.hint} ${longEnough ? styles.hintOk : ''}`}>
              {longEnough && <Check size={14} strokeWidth={4} aria-hidden="true" />}
              At least {MIN_PASSWORD} characters
            </p>
            <FormError message={error} />
            <PrimaryButton type="submit" busy={loading}>
              {loading ? 'Saving…' : 'Save new password'}
            </PrimaryButton>
          </form>
        )}
      </main>
    </div>
  );
}
