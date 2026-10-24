'use client';

/**
 * Where a bank's 3D Secure page sends the learner back. Finishes the checkout
 * attempt the payment sheet stored, then celebrates. Without a stored attempt
 * (another browser, private mode) it reads Pro status instead: the webhook
 * finishes the subscription either way.
 */

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { proApi, ProApiError, type ProStatus } from '@/lib/pro/api';
import { formatDay } from '@/lib/pro/copy';
import { celebrationHaptic } from '@/lib/haptics';
import styles from '@/components/pro/ProPaywall.module.css';

type State = { kind: 'working' } | { kind: 'done'; status: ProStatus } | { kind: 'failed'; message: string };

export default function ProWelcomePage() {
  const router = useRouter();
  const [state, setState] = useState<State>({ kind: 'working' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let attemptId: string | null = null;
      try {
        attemptId = sessionStorage.getItem('teyro:pro-attempt');
      } catch {
        attemptId = null;
      }
      try {
        let status = attemptId ? await proApi.finalize(attemptId) : await proApi.status();
        // The webhook may still be on its way: give it a few seconds.
        for (let i = 0; !status.isPro && i < 5; i++) {
          await new Promise((r) => setTimeout(r, 2000));
          status = await proApi.status();
        }
        if (cancelled) return;
        if (status.isPro) {
          try {
            sessionStorage.removeItem('teyro:pro-attempt');
          } catch {
            /* ignore */
          }
          celebrationHaptic('big');
          setState({ kind: 'done', status });
        } else {
          setState({ kind: 'failed', message: "We couldn't confirm your payment yet. Nothing extra was charged." });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            kind: 'failed',
            message: err instanceof ProApiError ? err.message : 'Something went wrong confirming your payment.',
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.scroll}>
        <div className={styles.viewWrap}>
          <div className={styles.panel}>
            {state.kind === 'working' && (
              <>
                <h1 className={styles.panelTitle}>Confirming your payment…</h1>
                <p className={styles.panelBody}>This only takes a moment.</p>
              </>
            )}
            {state.kind === 'done' && (
              <>
                <Image src="/User onbarding Assets/tey/cheering.webp" alt="" width={140} height={140} className={styles.panelTey} />
                <h1 className={styles.panelTitle}>Welcome to Teyro Pro</h1>
                <p className={styles.panelBody}>
                  {state.status.trialEndsAt
                    ? `Your free trial runs until ${formatDay(new Date(state.status.trialEndsAt))}.`
                    : 'Every course is open. No limits, unlimited hearts.'}
                </p>
                <button type="button" className={`${styles.cta} ${styles.ctaGreen}`} onClick={() => router.replace('/dashboard')}>
                  Let&apos;s go
                </button>
              </>
            )}
            {state.kind === 'failed' && (
              <>
                <h1 className={styles.panelTitle}>Hmm, not yet</h1>
                <p className={styles.panelBody}>{state.message}</p>
                <button type="button" className={styles.cta} onClick={() => router.replace('/pro')}>
                  Back to plans
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
