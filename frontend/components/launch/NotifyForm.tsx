'use client';

import { useEffect, useId, useState } from 'react';
import { ArrowRight, Check, Loader2, Users } from 'lucide-react';
import type { WaitlistRole } from '@/lib/launch';
import l from './Launch.module.css';

/**
 * The notify-me / apply form. While the app is gated, every "start" button on
 * the marketing site lands here.
 *
 * `fixedRole` hides the learner/creator choice (the /teach page is creators
 * only). `source` records where the sign-up came from.
 */
export function NotifyForm({
  source,
  fixedRole,
  cta = 'Notify me',
  successText = 'You’re on the list. We’ll email you the day Teyro opens.',
}: {
  source: string;
  fixedRole?: WaitlistRole;
  cta?: string;
  successText?: string;
}) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<WaitlistRole>(fixedRole ?? 'learner');
  const [website, setWebsite] = useState(''); // honeypot — humans never see it
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const emailId = useId();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: fixedRole ?? role, source, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setMessage(data?.error || 'Something went wrong. Please try again.');
        return;
      }
      setStatus('done');
    } catch {
      setStatus('error');
      setMessage('Couldn’t reach us. Check your connection and try again.');
    }
  }

  if (status === 'done') {
    return (
      <div className={l.done} role="status">
        <span className={l.doneTick} aria-hidden="true">
          <Check size={22} strokeWidth={4} />
        </span>
        <p>{successText}</p>
      </div>
    );
  }

  return (
    <form className={l.form} onSubmit={submit} noValidate>
      {!fixedRole && (
        <div className={l.roles} role="radiogroup" aria-label="I want to">
          {(
            [
              ['learner', 'I want to learn'],
              ['creator', 'I want to teach'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={role === value}
              className={`${l.role} ${role === value ? l.roleOn : ''}`}
              onClick={() => setRole(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className={l.row}>
        <label htmlFor={emailId} className={l.srOnly}>
          Email address
        </label>
        <input
          id={emailId}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={l.input}
          aria-invalid={status === 'error'}
        />
        <button type="submit" className={l.submit} disabled={status === 'sending' || email.trim() === ''}>
          {status === 'sending' ? (
            <Loader2 size={18} strokeWidth={3} className={l.spin} aria-hidden="true" />
          ) : (
            <>
              {cta}
              <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className={l.hp}
      />

      <p className={l.fine} aria-live="polite">
        {status === 'error' ? <span className={l.error}>{message}</span> : 'No spam. One email when it’s live.'}
      </p>
    </form>
  );
}

/** "3,6xx people waiting" — the same live number the old waitlist showed. */
export function WaitlistCount({ label = 'people waiting' }: { label?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/webhook/count')
      .then((r) => r.json())
      .then((d) => alive && typeof d.count === 'number' && setCount(d.count))
      .catch(() => {
        /* no number is better than a wrong one */
      });
    return () => {
      alive = false;
    };
  }, []);

  // Render nothing until the real number arrives — no flash of a made-up figure.
  if (count === null) return null;
  return (
    <p className={l.count}>
      <Users size={18} strokeWidth={2.75} aria-hidden="true" />
      <strong>{count.toLocaleString('en-US')}</strong> {label}
    </p>
  );
}
