'use client';

/**
 * "Save your progress": signup, after they've earned something to lose.
 * Their lesson, streak day 1 and the gift are shown as waiting; signing up
 * (Google or email + code) settles them into the new account on the server.
 */

import { AnimatePresence, motion } from 'framer-motion';
import { Coins, Eye, EyeOff, Flame, Mail, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Divider,
  EmailTypoHint,
  Field,
  FieldGroup,
  FormError,
  GoogleButton,
  PrimaryButton,
  authStyles,
} from '@/components/auth/AuthUi';
import { signInWithGoogle } from '@/lib/firebase';
import { playHaptic } from '@/lib/haptics';
import type { AnswersV3 } from '@/lib/onboarding/v3/flow';

function messageOf(data: unknown, fallback: string): string {
  const d = data as { error?: { message?: string }; message?: string | string[] } | null;
  const m = d?.error?.message ?? (Array.isArray(d?.message) ? d?.message[0] : d?.message);
  return m || fallback;
}

export function SaveStep(props: {
  answers: AnswersV3;
  rewards: { lessonXp: number; chestCoins: number } | null;
  onSaved: (how: 'google' | 'email' | 'existing') => void;
  onLogin: () => void;
}) {
  const [view, setView] = useState<'options' | 'email' | 'code'>('options');
  const [name, setName] = useState(props.answers.name ?? '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [exists, setExists] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Already signed in (finished onboarding from inside the app): nothing to
  // create, the answers sync to the account instead.
  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => r.ok && props.onSaved('existing'))
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

  const answersForServer = () => ({
    ...props.answers,
    lesson: props.answers.lesson ? { ...props.answers.lesson, timezoneOffset: new Date().getTimezoneOffset() } : undefined,
  });

  const google = async () => {
    setError('');
    setBusy(true);
    try {
      const result = await signInWithGoogle();
      const idToken = await result.user.getIdToken();
      const res = await fetch('/api/auth/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken, role: 'STUDENT', onboarding: answersForServer() }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(messageOf(data, 'Google sign-in failed. Try again?'));
      playHaptic('success');
      props.onSaved('google');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google didn't cooperate. Try again?");
    } finally {
      setBusy(false);
    }
  };

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          fullName: name.trim() || email.split('@')[0],
          password,
          role: 'STUDENT',
          onboarding: answersForServer(),
        }),
      });
      const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;
      if (!res.ok) {
        if (res.status === 409) {
          setExists(true);
          throw new Error('You already have a Teyro account with this email. Log in to keep going.');
        }
        throw new Error(messageOf(data, "That didn't go through. Try again?"));
      }
      if (data?.linked && data?.verified) {
        props.onSaved('email');
        return;
      }
      setView('code');
      setCooldown(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : "That didn't go through. Try again?");
    } finally {
      setBusy(false);
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('I need all 6 digits.');
      return;
    }
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim().toLowerCase(), code }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(messageOf(data, "That code doesn't look right. Try again?"));
      playHaptic('success');
      props.onSaved('email');
    } catch (err) {
      setError(err instanceof Error ? err.message : "That didn't work. Try again?");
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    if (cooldown > 0) return;
    await fetch('/api/auth/resend-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    }).catch(() => undefined);
    setCooldown(60);
  };

  return (
    <div className="w-full max-w-[420px] mx-auto flex flex-col gap-4">
      {props.rewards && view === 'options' && (
        <ul className="flex flex-wrap justify-center gap-2" aria-label="Waiting for you">
          <li className="flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-[var(--bg-section)] text-[14px] font-extrabold text-[var(--color-ink)]">
            <Sparkles className="w-4 h-4 text-[var(--color-brand)]" aria-hidden="true" /> +{props.rewards.lessonXp} XP
          </li>
          <li className="flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-[var(--bg-section)] text-[14px] font-extrabold text-[var(--color-ink)]">
            <Flame className="w-4 h-4 text-[var(--warning)]" aria-hidden="true" /> Day 1 streak
          </li>
          <li className="flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-[var(--bg-section)] text-[14px] font-extrabold text-[var(--color-ink)]">
            <Coins className="w-4 h-4 text-[var(--warning)]" aria-hidden="true" /> +{props.rewards.chestCoins} Coins
          </li>
        </ul>
      )}

      <AnimatePresence mode="wait">
        {view === 'options' && (
          <motion.div key="options" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
            <FormError message={error} />
            <GoogleButton onClick={google} disabled={busy} />
            <Divider />
            <PrimaryButton type="button" onClick={() => setView('email')}>
              Sign up with email
            </PrimaryButton>
            <p className="text-center text-[13px] font-semibold text-[var(--text-secondary)]">
              Already have an account?{' '}
              <button type="button" onClick={props.onLogin} className="font-extrabold text-[var(--color-brand)]">
                Log in
              </button>
            </p>
          </motion.div>
        )}

        {view === 'email' && (
          <motion.form key="email" onSubmit={signup} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-4 text-left">
            <FieldGroup>
              <Field label="Name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
              <Field label="Email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <Field
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                trailing={
                  <span className={authStyles.trailing}>
                    <button type="button" className={authStyles.eye} onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </span>
                }
              />
            </FieldGroup>
            <EmailTypoHint email={email} onFix={setEmail} />
            <FormError message={error} />
            {exists ? (
              <PrimaryButton type="button" onClick={props.onLogin}>
                Log in
              </PrimaryButton>
            ) : (
              <PrimaryButton type="submit" busy={busy}>
                {busy ? 'Saving…' : 'Save my progress'}
              </PrimaryButton>
            )}
            <button type="button" className={authStyles.forgot} style={{ alignSelf: 'center' }} onClick={() => setView('options')}>
              Back
            </button>
          </motion.form>
        )}

        {view === 'code' && (
          <motion.form key="code" onSubmit={verify} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4 text-center">
            <span className={authStyles.sentBadge}>
              <Mail size={36} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <p className={authStyles.formSub}>
              I sent a 6-digit code to <strong>{email}</strong>.
            </p>
            <FieldGroup>
              <label className={authStyles.field}>
                <span className="sr-only">6-digit code</span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                  className={authStyles.input}
                  style={{ textAlign: 'center', fontSize: 24, letterSpacing: '0.4em' }}
                />
              </label>
            </FieldGroup>
            <FormError message={error} />
            <PrimaryButton type="submit" busy={busy}>
              {busy ? 'Checking…' : 'Verify and save'}
            </PrimaryButton>
            <button type="button" onClick={resend} disabled={cooldown > 0} className={authStyles.forgot}>
              {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
