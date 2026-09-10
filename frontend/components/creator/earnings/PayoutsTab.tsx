'use client';

/**
 * Earnings → Payouts. Request a withdrawal from the available balance,
 * watch it move REQUESTED → UNDER REVIEW → PROCESSING → PAID, and browse
 * full payout history with reasons on any rejected/failed/cancelled one.
 */

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Banknote, CheckCircle2, CircleDashed, Clock, Download, Landmark, XCircle,
} from 'lucide-react';
import { EmptyState } from '@/components/creator/analytics/bits';
import { downloadCsv } from '@/lib/download';
import { money, type Balances } from './shared';
import { InlineError, PayoutsSkeleton } from './skeletons';
import styles from './earnings.module.css';

interface PayoutRow {
  id: string;
  publicId: string;
  amountMinor: number;
  status: string;
  requestedAt: string;
  paidAt?: string | null;
  methodSnapshot?: { maskedDisplay?: string; holderName?: string | null } | null;
  rejectionReason?: string | null;
  failureReason?: string | null;
  cancelReason?: string | null;
}

const STATUS_PILL: Record<string, string> = {
  REQUESTED: styles.stRequested,
  UNDER_REVIEW: styles.stUnderReview,
  PROCESSING: styles.stProcessing,
  PAID: styles.stPaid,
  REJECTED: styles.stRejected,
  FAILED: styles.stFailed,
  CANCELLED: styles.stCancelled,
};

const STATUS_LABEL: Record<string, string> = {
  REQUESTED: 'Requested',
  UNDER_REVIEW: 'Under review',
  PROCESSING: 'Processing',
  PAID: 'Paid',
  REJECTED: 'Rejected',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
};

const TIMELINE = ['REQUESTED', 'UNDER_REVIEW', 'PROCESSING', 'PAID'];

function fmtDate(iso?: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function PayoutsTab({ onChanged }: { onChanged?: () => void }) {
  const [payouts, setPayouts] = useState<PayoutRow[] | null>(null);
  const [balances, setBalances] = useState<Balances | null>(null);
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [pRes, sRes] = await Promise.all([
        fetch('/api/earnings/payouts', { credentials: 'include' }),
        fetch('/api/earnings/summary', { credentials: 'include' }),
      ]);
      if (pRes.ok) setPayouts((await pRes.json()).items ?? []);
      if (sRes.ok) setBalances(await sRes.json());
    } catch {
      setError('Could not load your payouts.');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const requestPayout = async () => {
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const dollars = Number(amount);
      if (!Number.isFinite(dollars) || dollars <= 0) {
        throw new Error('Enter the amount you want to withdraw');
      }
      const res = await fetch('/api/earnings/payouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ amountMinor: Math.round(dollars * 100) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(Array.isArray(data?.message) ? data.message.join('. ') : data?.message ?? `Request failed (${res.status})`);
      }
      setSuccess(`Payout ${data.publicId} requested. Teyro will review and process it shortly.`);
      setAmount('');
      await load();
      onChanged?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  if (payouts === null && !error) return <PayoutsSkeleton />;

  const available = balances?.available ?? 0;
  const min = balances?.minPayoutMinor ?? 5000;
  const dollarsValue = Number(amount);
  const canRequest =
    balances !== null &&
    Number.isFinite(dollarsValue) &&
    dollarsValue > 0 &&
    Math.round(dollarsValue * 100) >= min &&
    Math.round(dollarsValue * 100) <= available;

  return (
    <div className={styles.root}>
      {/* BALANCE + REQUEST */}
      <motion.div className={`${styles.card} ${styles.balanceCard}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className={styles.balanceBigLabel}>Available now</span>
          <span className={styles.balanceBigValue}>{money(Math.max(0, available))}</span>
          <span className={styles.methodSub}>
            Minimum {money(min)} · earnings clear {balances?.reserveDays ?? 14} days after purchase
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className={styles.amountInputWrap}>
            <span className={styles.amountPrefix}>$</span>
            <input
              className={styles.amountInput}
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            />
          </div>
          <button className={styles.primaryBtn} disabled={!canRequest || busy} onClick={() => void requestPayout()}>
            <Banknote size={16} />
            {busy ? 'Requesting…' : 'Request payout'}
          </button>
        </div>
      </motion.div>

      {success && <div className={styles.bannerSuccess}><CheckCircle2 size={15} /> {success}</div>}
      {error && <InlineError message={error} />}

      {balances && available < min && (
        <p className={styles.noteText}>
          You need at least {money(min)} available to request a payout
          {available >= 0 ? ` — ${money(min - Math.max(0, available))} to go.` : '.'}
        </p>
      )}

      {/* HISTORY */}
      <h3 className={styles.sectionHeading}>Payout history</h3>

      {payouts !== null && payouts.length === 0 && (
        <EmptyState
          icon={<Landmark size={30} />}
          title="No payouts yet"
          body="When you withdraw your earnings, every payout shows here with its status, date and reference."
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(payouts ?? []).map((p, i) => {
          const stepIdx = TIMELINE.indexOf(p.status);
          const terminalBad = ['REJECTED', 'FAILED', 'CANCELLED'].includes(p.status);
          return (
            <motion.div
              key={p.id}
              className={styles.card}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.2) }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span className={`${styles.statusPill} ${STATUS_PILL[p.status] ?? ''}`}>
                  {p.status === 'PAID' ? <CheckCircle2 size={11} /> : terminalBad ? <XCircle size={11} /> : p.status === 'PROCESSING' ? <Download size={11} /> : <Clock size={11} />}
                  {STATUS_LABEL[p.status] ?? p.status}
                </span>
                <span className={styles.methodMasked}>{money(p.amountMinor)}</span>
                <span className={styles.methodSub}>{p.publicId}</span>
                <span className={styles.methodSub} style={{ marginLeft: 'auto' }}>
                  Requested {fmtDate(p.requestedAt)}
                  {p.paidAt ? ` · Paid ${fmtDate(p.paidAt)}` : ''}
                </span>
              </div>

              {!terminalBad && (
                <div className={styles.timeline} style={{ marginTop: 10 }}>
                  {TIMELINE.map((step, idx) => (
                    <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <span className={`${styles.tlStep} ${idx < stepIdx ? styles.tlStepDone : idx === stepIdx ? styles.tlStepCurrent : ''}`}>
                        {idx <= stepIdx ? <CheckCircle2 size={9} /> : <CircleDashed size={9} />}
                        {STATUS_LABEL[step]}
                      </span>
                      {idx < TIMELINE.length - 1 && <ChevronArrow />}
                    </span>
                  ))}
                </div>
              )}

              {(p.rejectionReason || p.failureReason || p.cancelReason) && (
                <div className={styles.reasonNote} style={{ marginTop: 10 }}>
                  {p.rejectionReason || p.failureReason || p.cancelReason}
                </div>
              )}
              {p.methodSnapshot?.maskedDisplay && (
                <span className={styles.methodSub} style={{ display: 'block', marginTop: 8 }}>
                  To {p.methodSnapshot.maskedDisplay}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ChevronArrow() {
  return <span className={styles.tlArrow}>→</span>;
}
