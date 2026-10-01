'use client';

import { useState } from 'react';
import { CircleCheck, Loader2, RotateCcw, Smartphone, Zap } from 'lucide-react';
import { usePollCourseAccess } from '@/hooks/usePostPaymentUnlock';
import styles from './unlock.module.css';

interface WaitingForApprovalProps {
  courseId: string;
  /**
   * 'momo' = a Mobile Money push was sent ("approve on your phone" copy).
   * 'card' = returning from Stripe with ?payment=success while the webhook
   * is still in flight ("finishing your unlock" copy).
   */
  variant: 'momo' | 'card';
  amountLabel?: string;
  operatorLabel?: string;
  phoneNational?: string;
  /** Renewal of access that is still active: wait for the end date to move. */
  renewedPast?: string | null;
  onUnlocked: () => void;
  onCancel: () => void;
}

/**
 * PENDING panel — the honest in-between state.
 *
 * Polls our own access endpoint (~3s × 20) so a late webhook flips this to
 * success automatically; "Check again" mounts a FRESH poller (key change)
 * after exhaustion. This panel must NEVER celebrate — no confetti, no win
 * sound. Victory belongs exclusively to SuccessBeat.
 */
export default function WaitingForApproval({
  courseId,
  variant,
  amountLabel,
  operatorLabel,
  phoneNational,
  renewedPast = null,
  onUnlocked,
  onCancel,
}: WaitingForApprovalProps) {
  const [phase, setPhase] = useState<'polling' | 'exhausted'>('polling');
  const [attempt, setAttempt] = useState(0);

  return (
    <div className={styles.waitingPanel} aria-live="polite">
      {/* Keyed child: one poll loop per mount — "Check again" remounts it. */}
      {phase === 'polling' && (
        <PollWatcher
          key={attempt}
          courseId={courseId}
          renewedPast={renewedPast}
          onUnlocked={onUnlocked}
          onExhausted={() => setPhase('exhausted')}
        />
      )}

      <span className={styles.waitingSpinnerWrap}>
        <Loader2 size={28} className={styles.spinner} />
      </span>

      <h1 className={styles.wallCount} style={{ margin: 0 }}>
        {variant === 'momo' ? 'Approve on your phone' : 'Finishing your unlock…'}
      </h1>

      {variant === 'momo' ? (
        <p className={styles.wallSub}>
          {operatorLabel ?? 'Mobile Money'} sent a prompt
          {phoneNational ? (
            <>
              {' '}to •••{phoneNational.slice(-4)}
            </>
          ) : null}
          {amountLabel ? (
            <>
              {' '}for <strong>{amountLabel}</strong>
            </>
          ) : null}
          . Approve it and I&apos;ll unlock this automatically — feel free to
          leave the page, I&apos;ll keep watching for it.
        </p>
      ) : (
        <p className={styles.wallSub}>
          Your payment went through — I&apos;m confirming it now. This usually
          takes only a few seconds.
        </p>
      )}

      {phase === 'polling' && (
        <p className={styles.localNotice}>
          <CircleCheck size={12} style={{ display: 'inline', marginRight: 4 }} />
          I&apos;m checking automatically…
        </p>
      )}

      {phase === 'exhausted' && (
        <div className={`${styles.msgBox} ${styles.msgError}`} role="alert" style={{ width: '100%' }}>
          <Zap size={14} />
          <span>
            Still processing — some providers take a minute or two. Your
            payment isn&apos;t lost, I promise.
          </span>
        </div>
      )}

      <div className={styles.waitingActions}>
        {phase === 'exhausted' ? (
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => {
              setPhase('polling');
              setAttempt((a) => a + 1);
            }}
          >
            <RotateCcw size={15} />
            Check again
          </button>
        ) : null}
        <button type="button" className={styles.secondaryBtn} onClick={onCancel}>
          {variant === 'momo' && <Smartphone size={15} />}
          {variant === 'momo' ? 'Use another method' : 'Back'}
        </button>
      </div>
    </div>
  );
}

/** Headless poll-loop host — renders nothing, owns exactly one loop. */
function PollWatcher({
  courseId,
  renewedPast,
  onUnlocked,
  onExhausted,
}: {
  courseId: string;
  renewedPast: string | null;
  onUnlocked: () => void;
  onExhausted: () => void;
}) {
  usePollCourseAccess(courseId, {
    enabled: true,
    pollIntervalMs: 3000,
    maxAttempts: 20,
    renewedPast,
    onUnlocked,
    onExhausted,
  });
  return null;
}
