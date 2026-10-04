'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import s from './Home.module.css';
import gs from './GetNotified.module.css';

export default function GetNotified() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [count, setCount] = useState<number>(3617);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/notify/count')
      .then((r) => r.json())
      .then((d) => { if (typeof d.count === 'number') setCount(d.count); })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setCount((c) => c + 1);
    } catch {
      setErrorMsg('Network error. Please check your connection.');
      setStatus('error');
    }
  }

  return (
    <section className={gs.section} id="get-notified" aria-labelledby="notify-title">
      <div className={`${s.wrap} ${gs.inner}`}>
        {/* Left copy */}
        <div className={gs.copy}>
          <span className={s.eyebrow}>Stay in the loop</span>
          <h2 id="notify-title" className={`${s.display} ${s.h2}`}>
            Be first to know what&apos;s next.
          </h2>
          <p className={s.lead}>
            New tracks, features, and beta invites — straight to your inbox.
            No spam. Unsubscribe any time.
          </p>
          <div className={gs.social}>
            <span className={gs.avatars} aria-hidden="true">
              {['58','47','36','29'].map((seed) => (
                <img
                  key={seed}
                  src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}&size=32`}
                  alt=""
                  width={32}
                  height={32}
                  className={gs.avatar}
                />
              ))}
            </span>
            <span className={gs.socialText}>
              <strong>{count.toLocaleString()}</strong> people already signed up
            </span>
          </div>
        </div>

        {/* Right form */}
        <div className={gs.formWrap}>
          {status === 'success' ? (
            <div className={gs.success} role="status">
              <CheckCircle2 size={40} strokeWidth={2} aria-hidden="true" />
              <p>You&apos;re on the list!</p>
              <p className={gs.successSub}>We&apos;ll reach out as soon as something new drops.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={gs.form} noValidate>
              <label htmlFor="notify-email" className={gs.label}>
                Your email address
              </label>
              <div className={gs.inputRow}>
                <input
                  ref={inputRef}
                  id="notify-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                  className={`${gs.input} ${status === 'error' ? gs.inputError : ''}`}
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  id="notify-submit-btn"
                  className={`${gs.submitBtn} ${status === 'loading' ? gs.submitLoading : ''}`}
                  disabled={status === 'loading'}
                  aria-label="Get notified"
                >
                  {status === 'loading' ? (
                    <Loader2 size={20} strokeWidth={2.5} className={gs.spinner} aria-hidden="true" />
                  ) : (
                    <>
                      Notify me <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
              {status === 'error' && (
                <p className={gs.errorMsg} role="alert">{errorMsg}</p>
              )}
              <p className={gs.privacy}>
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
