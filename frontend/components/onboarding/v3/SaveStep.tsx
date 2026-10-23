'use client';

/**
 * "Save your progress": signup, after they've earned something to lose
 * (Duolingo's "Create a profile"). What's waiting is shown as held; signing
 * up (Google, or email → password → 6-digit code, one field per screen)
 * settles it into the new account on the server.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { signInWithGoogle } from '@/lib/firebase';
import { playHaptic } from '@/lib/haptics';
import type { AnswersV3 } from '@/lib/onboarding/v3/flow';
import { Art, type ArtName } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import { Btn, kitCss as css } from './ui/Kit';

function messageOf(data: unknown, fallback: string): string {
  const d = data as { error?: { message?: string }; message?: string | string[] } | null;
  const m = d?.error?.message ?? (Array.isArray(d?.message) ? d?.message[0] : d?.message);
  return m || fallback;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type View = 'options' | 'email' | 'password' | 'code';

export interface HeldReward {
  art: ArtName;
  label: string;
}

export function SaveStep(props: {
  answers: AnswersV3;
  held: HeldReward[];
  onSaved: (how: 'google' | 'email' | 'existing') => void;
  onLogin: () => void;
}) {
  const reduce = useReducedMotion();
  const [view, setView] = useState<View>('options');
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
  const cleanEmail = email.trim().toLowerCase();

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

  const signup = async () => {
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: cleanEmail,
          fullName: props.answers.name?.trim() || cleanEmail.split('@')[0],
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

  const verify = async () => {
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
        body: JSON.stringify({ email: cleanEmail, code }),
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
      body: JSON.stringify({ email: cleanEmail }),
    }).catch(() => undefined);
    setCooldown(60);
  };

  const go = (v: View) => {
    setError('');
    setView(v);
  };

  const errorLine = error ? (
    <p role="alert" className="text-[14px] font-bold text-[var(--error-red)]">
      {error}
    </p>
  ) : null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={view}
        initial={reduce ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={reduce ? undefined : { opacity: 0, x: -24 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-4"
      >
        {view === 'options' && (
          <>
            <div className="rounded-[20px] border-2 border-[var(--border)] p-4" style={{ boxShadow: '0 4px 0 var(--border)' }}>
              <p className="mb-3 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">Waiting for you</p>
              <ul className="flex flex-col gap-3">
                {props.held.map((h) => (
                  <li key={h.label} className="flex items-center gap-3 text-[16px] font-extrabold text-[var(--color-ink)]">
                    <Art name={h.art} size={36} />
                    {h.label}
                  </li>
                ))}
              </ul>
            </div>
            {errorLine}
            <Btn variant="outline" onClick={google} disabled={busy} className="!normal-case !tracking-normal">
              <span className="inline-flex items-center justify-center gap-3">
                <FaGoogle aria-hidden="true" style={{ color: 'var(--color-brand)' }} /> Continue with Google
              </span>
            </Btn>
            <Btn onClick={() => go('email')}>
              <span className="inline-flex items-center justify-center gap-2">
                <Glyph name="mail" size={22} strokeWidth={2.6} /> Sign up with email
              </span>
            </Btn>
            <p className="text-center text-[14px] font-semibold text-[var(--text-secondary)]">
              Already have an account?{' '}
              <button type="button" onClick={props.onLogin} className="font-extrabold text-[var(--color-brand)]">
                Log in
              </button>
            </p>
          </>
        )}

        {view === 'email' && (
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!EMAIL_RE.test(cleanEmail)) {
                setError("That email doesn't look quite right.");
                return;
              }
              go('password');
            }}
          >
            <h2 className={css.heroTitle} style={{ fontSize: 24, textAlign: 'left' }}>
              What&apos;s your email?
            </h2>
            <label className={css.srOnly} htmlFor="ob-email">
              Email
            </label>
            <input
              id="ob-email"
              className={css.input}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            {errorLine}
            <Btn type="submit" disabled={!email.trim()}>
              Next
            </Btn>
            <Btn variant="ghost" onClick={() => go('options')}>
              Back
            </Btn>
          </form>
        )}

        {view === 'password' && (
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (password.length < 8) {
                setError('Use at least 8 characters.');
                return;
              }
              void signup();
            }}
          >
            <h2 className={css.heroTitle} style={{ fontSize: 24, textAlign: 'left' }}>
              Create a password
            </h2>
            <div className="relative">
              <label className={css.srOnly} htmlFor="ob-password">
                Password
              </label>
              <input
                id="ob-password"
                className={css.input}
                style={{ paddingRight: 56 }}
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                className={`${css.iconBtn} absolute right-2 top-1/2 -translate-y-1/2`}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Glyph name={showPassword ? 'eyeOff' : 'eye'} size={22} strokeWidth={2.4} />
              </button>
            </div>
            {errorLine}
            {exists ? (
              <Btn onClick={props.onLogin}>Log in</Btn>
            ) : (
              <Btn type="submit" disabled={busy || password.length === 0}>
                {busy ? 'Saving…' : 'Save my progress'}
              </Btn>
            )}
            <Btn variant="ghost" onClick={() => go('email')}>
              Back
            </Btn>
          </form>
        )}

        {view === 'code' && (
          <form
            className="flex flex-col items-center gap-4 text-center"
            onSubmit={(e) => {
              e.preventDefault();
              void verify();
            }}
          >
            <Art name="envelope" size={96} />
            <h2 className={css.heroTitle} style={{ fontSize: 24 }}>
              Check your email
            </h2>
            <p className={css.heroBody}>
              I sent a 6-digit code to <strong className="text-[var(--color-ink)]">{cleanEmail}</strong>.
            </p>
            <label className={css.srOnly} htmlFor="ob-code">
              6-digit code
            </label>
            <input
              id="ob-code"
              className={css.input}
              style={{ textAlign: 'center', fontSize: 26, letterSpacing: '0.4em' }}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
              autoFocus
            />
            {errorLine}
            <Btn type="submit" disabled={busy || code.length !== 6}>
              {busy ? 'Checking…' : 'Verify and save'}
            </Btn>
            <Btn variant="ghost" onClick={resend} disabled={cooldown > 0}>
              {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
            </Btn>
          </form>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
