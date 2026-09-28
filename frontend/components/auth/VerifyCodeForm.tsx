'use client';

/**
 * "I sent you a code!" — the 6-digit email code, with a resend countdown.
 * POST /auth/verify-code sets the session cookie, so `onVerified` runs with a
 * live session. Used inline by SignupFlow and by /creator/verify-pending.
 */

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Mail } from 'lucide-react';
import { extractErrorMessage } from '@/lib/apiError';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { FieldGroup, FormError, PrimaryButton, authStyles as styles } from './AuthUi';

const RESEND_SECONDS = 60;

export function maskEmail(str: string) {
  if (!str.includes('@')) return str;
  const [name, domain] = str.split('@');
  if (name.length <= 2) return `${name[0] ?? ''}***@${domain}`;
  return `${name.slice(0, 2)}***${name.slice(-1)}@${domain}`;
}

export default function VerifyCodeForm({
  email,
  onVerified,
  startCountdown = true,
}: {
  email: string;
  onVerified: (data: { redirectTo?: string }) => void;
  /** The code was just sent, so resend starts cooling down. */
  startCountdown?: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(startCountdown ? RESEND_SECONDS : 0);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const fail = (message: string) => {
    setError(message);
    playSound('wrong');
    playHaptic('error', false);
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (code.length !== 6) return fail('I need all 6 digits first.');
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.toLowerCase().trim(), code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
      playSound('correct');
      playHaptic('success', false);
      onVerified({ redirectTo: data.redirectTo });
    } catch (err: unknown) {
      fail(err instanceof Error ? err.message : "That code doesn't look right. Try again?");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (countdown > 0 || !email) return;
    setResent(false);
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      if (!res.ok) throw new Error();
      playSound('toggleOn');
      setResent(true);
      setCountdown(RESEND_SECONDS);
    } catch {
      fail("I couldn't resend it just now. Try again in a minute.");
    }
  };

  return (
    <div className={`${styles.form} ${styles.center}`}>
      <motion.span
        className={styles.sentBadge}
        initial={reduce ? false : { scale: 0.4, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 14 }}
      >
        <Mail size={40} strokeWidth={2.5} aria-hidden="true" />
      </motion.span>
      <h1 className={styles.formTitle}>I sent you a code!</h1>
      <p className={styles.formSub}>
        Check <strong>{maskEmail(email.trim())}</strong> for the 6-digit code. It can take a minute, and it
        sometimes lands in spam.
      </p>

      <form onSubmit={verify} className={styles.form}>
        <FieldGroup>
          <label className={styles.field}>
            <span className="sr-only">6-digit code</span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="123456"
              required
              value={code}
              onChange={(e) => {
                setError('');
                setCode(e.target.value.replace(/[^0-9]/g, ''));
              }}
              className={`${styles.input} ${styles.codeInput}`}
            />
          </label>
        </FieldGroup>
        <FormError message={error} />
        <PrimaryButton type="submit" busy={loading}>
          {loading ? 'Checking…' : 'Verify and continue'}
        </PrimaryButton>
      </form>

      <p className={styles.hint}>
        {resent && countdown > 0 && (
          <span className={styles.hintOk}>
            <CheckCircle2 size={14} aria-hidden="true" /> Code resent.{' '}
          </span>
        )}
        {countdown > 0 ? (
          `Resend in ${countdown}s`
        ) : (
          <button type="button" className={styles.forgot} onClick={resend} disabled={!email}>
            Resend code
          </button>
        )}
      </p>
    </div>
  );
}
