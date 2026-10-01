'use client';

/**
 * /creator/earnings — the creator's wallet, Duolingo-style.
 *
 *   Balance     ready to cash out (big), clearing, lifetime, paid out; the
 *               CASH OUT button and "you keep 70%"
 *   Trend       what you earned per week / month / year
 *   By course   which courses earn
 *   Activity    every sale, renewal and refund, grouped by day
 *   Payouts     each cash-out moving requested → paid
 *   Paid to     the (masked) bank or mobile-money account
 *   Reports     CSV downloads for tax and bookkeeping
 *
 * Money is integer cents from the immutable earnings ledger; nothing here
 * computes a balance itself.
 */

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  Crown,
  FileDown,
  Hourglass,
  Landmark,
  PencilLine,
  RotateCcw,
  Smartphone,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { playSound } from '@/lib/audio/lessonSounds';
import { celebrationHaptic } from '@/lib/haptics';
import { downloadCsv } from '@/lib/download';
import { studioFetch, studioSend } from '@/lib/creator/studio';
import { BarList, Columns } from '../Charts';
import {
  EmptyCard,
  ErrorCard,
  PageHead,
  Pill,
  Section,
  Segmented,
  Sheet,
  Skel,
  TeyLine,
  studio as s,
  useToast,
} from '../StudioParts';
import e from './earnings.module.css';

/* ── shapes (backend/src/earnings/earnings.service.ts) ── */

interface Summary {
  lifetimeEarned: number;
  pendingClearing: number;
  reservedForPayout: number;
  available: number;
  totalPaidOut: number;
  reserveDays: number;
  minPayoutMinor: number;
  agreement: { tier: 'STANDARD' | 'FOUNDING'; creatorSharePct: number; isFounding: boolean };
  isEmpty: boolean;
}
interface Bucket {
  period: string;
  creatorMinor: number;
  count: number;
}
interface CourseEarning {
  courseId: string;
  courseTitle: string;
  creatorEarningsMinor: number;
  purchases: number;
}
type TxType = 'SALE' | 'RENEWAL' | 'REFUND' | 'CHARGEBACK' | 'REVERSAL' | 'ADJUSTMENT';
interface Tx {
  id: string;
  publicId: string;
  type: TxType;
  occurredAt: string;
  courseTitle: string | null;
  grossMinor: number;
  discountMinor: number;
  feeMinor: number;
  creatorAmountMinor: number;
  reason: string | null;
}
interface Payout {
  id: string;
  publicId: string;
  amountMinor: number;
  status: 'REQUESTED' | 'UNDER_REVIEW' | 'PROCESSING' | 'PAID' | 'REJECTED' | 'FAILED' | 'CANCELLED';
  requestedAt: string;
  paidAt?: string | null;
  methodSnapshot?: { maskedDisplay?: string } | null;
  rejectionReason?: string | null;
  failureReason?: string | null;
  cancelReason?: string | null;
}
interface Method {
  type: 'BANK' | 'MOBILE_MONEY';
  holderName?: string | null;
  maskedDisplay?: string | null;
  bankName?: string | null;
  country?: string | null;
}

/* ── money ── */

export const money = (minor: number) =>
  `$${(minor / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const moneyShort = (minor: number) => {
  const d = minor / 100;
  return Math.abs(d) >= 1000 ? `$${(d / 1000).toFixed(1).replace(/\.0$/, '')}k` : `$${Math.round(d)}`;
};

const TX: Record<TxType, { label: string; incoming: boolean; tone: string }> = {
  SALE: { label: 'Sale', incoming: true, tone: 'var(--success-green)' },
  RENEWAL: { label: 'Renewal', incoming: true, tone: 'var(--success-green)' },
  REFUND: { label: 'Refund', incoming: false, tone: 'var(--error-red)' },
  CHARGEBACK: { label: 'Chargeback', incoming: false, tone: 'var(--error-red)' },
  REVERSAL: { label: 'Reversal', incoming: false, tone: 'var(--error-red)' },
  ADJUSTMENT: { label: 'Adjustment', incoming: true, tone: 'var(--color-brand)' },
};

const PAYOUT: Record<Payout['status'], { label: string; tone: string }> = {
  REQUESTED: { label: 'Requested', tone: 'var(--color-brand)' },
  UNDER_REVIEW: { label: 'In review', tone: 'var(--warning)' },
  PROCESSING: { label: 'Sending', tone: 'var(--brand-purple)' },
  PAID: { label: 'Paid', tone: 'var(--success-green)' },
  REJECTED: { label: 'Rejected', tone: 'var(--error-red)' },
  FAILED: { label: 'Failed', tone: 'var(--error-red)' },
  CANCELLED: { label: 'Cancelled', tone: 'var(--text-muted)' },
};
const PAYOUT_STEPS: Payout['status'][] = ['REQUESTED', 'UNDER_REVIEW', 'PROCESSING', 'PAID'];

type Granularity = 'week' | 'month' | 'year';

function periodLabel(period: string, short = false): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(period) || period.startsWith('W')) {
    const d = new Date(`${period.replace(/^W/, '')}T00:00:00Z`);
    return (short ? '' : 'Week of ') + d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  }
  if (/^\d{4}-\d{2}$/.test(period)) {
    return new Date(`${period}-01T00:00:00Z`).toLocaleDateString(undefined, { month: 'short', ...(short ? {} : { year: 'numeric' }), timeZone: 'UTC' });
  }
  return period;
}

function dayGroup(iso: string): string {
  const t = Date.parse(iso);
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  if (t >= start.getTime()) return 'Today';
  if (t >= start.getTime() - 86400000) return 'Yesterday';
  if (t >= start.getTime() - 6 * 86400000) return 'This week';
  return new Date(t).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

export function EarningsHub() {
  useStandaloneSound();
  const summary = useSWR<Summary>('/api/earnings/summary', studioFetch);
  const payouts = useSWR<{ items: Payout[] }>('/api/earnings/payouts', studioFetch);
  const method = useSWR<Method | null>('/api/earnings/payout-method', studioFetch);
  const [cashOut, setCashOut] = useState(false);
  const [editMethod, setEditMethod] = useState(false);
  const toast = useToast();

  const refresh = () => {
    void summary.mutate();
    void payouts.mutate();
  };

  if (summary.error) {
    return (
      <div className={s.page}>
        <PageHead title="Earnings" />
        <ErrorCard message={summary.error.message || 'Your earnings didn’t load.'} onRetry={() => void summary.mutate()} />
      </div>
    );
  }
  if (!summary.data) {
    return (
      <div className={s.page} aria-busy="true">
        <Skel h={56} w="40%" />
        <Skel h={220} />
        <Skel h={220} />
        <Skel h={300} />
      </div>
    );
  }

  const sum = summary.data;
  const open = (payouts.data?.items ?? []).filter((p) => ['REQUESTED', 'UNDER_REVIEW', 'PROCESSING'].includes(p.status));

  return (
    <div className={s.page}>
      <PageHead title="Earnings" sub="What your courses earn, and getting paid." />

      <div className={e.wallet}>
        <div className={e.walletMain}>
          <span className={e.walletLabel}>Ready to cash out</span>
          <span className={e.walletValue}>{money(Math.max(0, sum.available))}</span>
          <span className={e.walletChips}>
            <Pill tone={sum.agreement.isFounding ? 'var(--warning)' : 'var(--color-brand)'}>
              {sum.agreement.isFounding ? <Crown size={11} aria-hidden="true" /> : <Sparkles size={11} aria-hidden="true" />}
              You keep {sum.agreement.creatorSharePct}%{sum.agreement.isFounding ? ' · Founding creator' : ''}
            </Pill>
          </span>
          <button
            type="button"
            className={s.btnGood}
            style={{ alignSelf: 'flex-start', minHeight: 48, padding: '0 24px', fontSize: 15 }}
            disabled={sum.available < sum.minPayoutMinor}
            onClick={() => {
              playSound('start');
              if (!method.data) setEditMethod(true);
              else setCashOut(true);
            }}
          >
            <Wallet size={18} aria-hidden="true" /> Cash out
          </button>
          {sum.available < sum.minPayoutMinor && (
            <span className={e.walletHint}>You can cash out from {money(sum.minPayoutMinor)}.</span>
          )}
        </div>
        <div className={e.walletSide}>
          <WalletLine icon={<Hourglass size={16} />} label="Clearing" value={money(sum.pendingClearing)} hint={`Sales clear after ${sum.reserveDays} days`} />
          {sum.reservedForPayout > 0 && (
            <WalletLine icon={<Landmark size={16} />} label="On its way to you" value={money(sum.reservedForPayout)} />
          )}
          <WalletLine icon={<Sparkles size={16} />} label="Earned all time" value={money(sum.lifetimeEarned)} />
          <WalletLine icon={<ArrowUpRight size={16} />} label="Paid out" value={money(sum.totalPaidOut)} />
        </div>
      </div>

      {sum.isEmpty ? (
        <EmptyCard pose="tablet" title="Your first sale is on its way">
          When learners unlock your course, every sale shows up here, with exactly what you keep ({sum.agreement.creatorSharePct}% of net).
        </EmptyCard>
      ) : (
        <>
          <Trend />
          <div className={s.grid2}>
            <ByCourse />
            <PayoutsCard
              payouts={payouts.data?.items}
              error={payouts.error}
              onRetry={() => void payouts.mutate()}
              onCancelled={() => {
                refresh();
                toast.show('Payout cancelled');
              }}
            />
          </div>
          <Activity />
        </>
      )}

      <div className={s.grid2}>
        <Section title="Paid to">
          <MethodCard method={method.data} loading={!method.data && !method.error && method.isLoading} onEdit={() => setEditMethod(true)} />
        </Section>
        <Section title="Reports" note="CSV files for your records and taxes.">
          <Reports toast={toast.show} />
        </Section>
      </div>

      <CashOutSheet
        open={cashOut}
        summary={sum}
        method={method.data ?? null}
        pendingCount={open.length}
        onClose={() => setCashOut(false)}
        onDone={refresh}
      />
      <MethodSheet
        open={editMethod}
        current={method.data ?? null}
        onClose={() => setEditMethod(false)}
        onSaved={() => {
          void method.mutate();
          setEditMethod(false);
          toast.show('Payout details saved');
        }}
      />
      {toast.node}
    </div>
  );
}

function WalletLine({ icon, label, value, hint }: { icon: ReactNode; label: string; value: string; hint?: string }) {
  return (
    <div className={e.line}>
      <span className={e.lineIcon} aria-hidden="true">
        {icon}
      </span>
      <span className={e.lineText}>
        <span className={e.lineLabel}>{label}</span>
        {hint && <span className={e.lineHint}>{hint}</span>}
      </span>
      <span className={e.lineValue}>{value}</span>
    </div>
  );
}

/* ── trend ── */

function Trend() {
  const [g, setG] = useState<Granularity>('month');
  const { data, error, mutate } = useSWR<{ buckets: Bucket[] }>(`/api/earnings/trend?granularity=${g}`, studioFetch, { keepPreviousData: true });
  const buckets = (data?.buckets ?? []).slice(g === 'week' ? -12 : g === 'month' ? -12 : -6);
  const total = buckets.reduce((a, b) => a + b.creatorMinor, 0);
  return (
    <Section
      title="What you earned"
      note={data ? `${money(total)} across the ${buckets.length} ${g === 'week' ? 'weeks' : g === 'month' ? 'months' : 'years'} shown` : undefined}
      side={
        <Segmented
          label="Group by"
          value={g}
          onChange={setG}
          options={[
            { value: 'week', label: 'Weeks' },
            { value: 'month', label: 'Months' },
            { value: 'year', label: 'Years' },
          ]}
        />
      }
    >
      <div className={s.card}>
        {error && !data ? (
          <ErrorCard message="The trend didn’t load." onRetry={() => void mutate()} />
        ) : !data ? (
          <Skel h={190} />
        ) : buckets.length === 0 ? (
          <div className={s.empty}>Nothing earned in this period yet.</div>
        ) : (
          <Columns
            points={buckets.map((b) => ({ key: b.period, axis: periodLabel(b.period, true), label: periodLabel(b.period), value: b.creatorMinor }))}
            unit={moneyShort}
            caption="Your earnings by period"
            tone="var(--success-green)"
          />
        )}
      </div>
    </Section>
  );
}

function ByCourse() {
  const { data, error, mutate } = useSWR<CourseEarning[]>('/api/earnings/by-course', studioFetch);
  return (
    <Section title="By course">
      <div className={s.card}>
        {error && !data ? (
          <ErrorCard message="Didn’t load." onRetry={() => void mutate()} />
        ) : !data ? (
          <Skel h={140} />
        ) : data.length === 0 ? (
          <div className={s.empty}>No course has earned yet.</div>
        ) : (
          <BarList
            caption="Earnings by course"
            unit={moneyShort}
            rows={data
              .slice()
              .sort((a, b) => b.creatorEarningsMinor - a.creatorEarningsMinor)
              .slice(0, 6)
              .map((c) => ({ key: c.courseId, label: c.courseTitle, value: c.creatorEarningsMinor, tone: 'var(--success-green)', title: `${c.courseTitle}: ${money(c.creatorEarningsMinor)} from ${c.purchases} payments` }))}
          />
        )}
      </div>
    </Section>
  );
}

/* ── activity ── */

const TX_FILTERS: { value: '' | 'SALE' | 'RENEWAL' | 'REFUND'; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'SALE', label: 'Sales' },
  { value: 'RENEWAL', label: 'Renewals' },
  { value: 'REFUND', label: 'Refunds' },
];

function Activity() {
  const [type, setType] = useState<'' | 'SALE' | 'RENEWAL' | 'REFUND'>('');
  const pageSize = 20;
  const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite<{ items: Tx[]; total: number }>(
    (i) => `/api/earnings/transactions?page=${i + 1}&pageSize=${pageSize}${type ? `&type=${type}` : ''}`,
    studioFetch,
  );
  const items = useMemo(() => (data ?? []).flatMap((d) => d.items ?? []), [data]);
  const total = data?.[0]?.total ?? 0;
  const groups = useMemo(() => {
    const out: { label: string; rows: Tx[] }[] = [];
    for (const tx of items) {
      const label = dayGroup(tx.occurredAt);
      const last = out[out.length - 1];
      if (last && last.label === label) last.rows.push(tx);
      else out.push({ label, rows: [tx] });
    }
    return out;
  }, [items]);

  return (
    <Section
      title="Activity"
      side={
        <div className={s.chips} role="group" aria-label="Filter activity">
          {TX_FILTERS.map((f, i) => (
            <button
              key={f.value || 'all'}
              type="button"
              className={`${s.chip} ${type === f.value ? s.chipOn : ''}`}
              onClick={() => {
                setType(f.value);
                playSound('navTap', i);
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      }
    >
      {error && !data ? (
        <ErrorCard message="Activity didn’t load." onRetry={() => void mutate()} />
      ) : !data ? (
        <Skel h={260} />
      ) : items.length === 0 ? (
        <div className={s.empty}>Nothing here yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {groups.map((g) => (
            <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span className={s.statLabel}>{g.label}</span>
              <div className={s.list}>
                {g.rows.map((tx) => {
                  const t = TX[tx.type] ?? TX.ADJUSTMENT;
                  const amount = tx.creatorAmountMinor;
                  return (
                    <div key={tx.id} className={s.row}>
                      <span className={s.statIcon} style={{ '--tone': t.tone, width: 40, height: 40 } as CSSProperties} aria-hidden="true">
                        {t.incoming ? <ArrowDownLeft size={18} /> : <RotateCcw size={18} />}
                      </span>
                      <span className={s.rowMain}>
                        <span className={s.rowTitle}>
                          {t.label}
                          {tx.courseTitle ? ` · ${tx.courseTitle}` : ''}
                        </span>
                        <span className={s.rowMeta}>
                          <span>
                            {['Today', 'Yesterday'].includes(g.label)
                              ? new Date(tx.occurredAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
                              : new Date(tx.occurredAt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                          <span>
                            {t.incoming ? 'Paid' : 'Refunded'} {money(Math.abs(tx.grossMinor))}
                          </span>
                          {tx.discountMinor > 0 && <span>Coupon −{money(tx.discountMinor)}</span>}
                          {tx.feeMinor > 0 && <span>Fees −{money(tx.feeMinor)}</span>}
                          {tx.reason && <span>{tx.reason}</span>}
                        </span>
                      </span>
                      <span className={e.amount} style={{ color: amount < 0 ? 'var(--error-red)' : 'var(--success-green)' }}>
                        {amount < 0 ? '−' : '+'}
                        {money(Math.abs(amount))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {items.length < total && (
            <button type="button" className={s.btn} style={{ alignSelf: 'center' }} disabled={isValidating} onClick={() => void setSize(size + 1)}>
              {isValidating ? 'Loading…' : 'Show more'}
            </button>
          )}
        </div>
      )}
    </Section>
  );
}

/* ── payouts ── */

function PayoutsCard({
  payouts,
  error,
  onRetry,
  onCancelled,
}: {
  payouts: Payout[] | undefined;
  error: Error | undefined;
  onRetry: () => void;
  onCancelled: () => void;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const cancel = async (p: Payout) => {
    if (!window.confirm(`Cancel the ${money(p.amountMinor)} payout? The money goes back to your balance.`)) return;
    setBusy(p.id);
    try {
      await studioSend(`/api/earnings/payouts/${p.id}/cancel`, 'POST');
      playSound('cardBack');
      onCancelled();
    } catch {
      playSound('wrong');
    } finally {
      setBusy(null);
    }
  };
  return (
    <Section title="Payouts">
      {error && !payouts ? (
        <ErrorCard message="Payouts didn’t load." onRetry={onRetry} />
      ) : !payouts ? (
        <Skel h={160} />
      ) : payouts.length === 0 ? (
        <div className={s.empty}>No cash-outs yet. Your payouts and where each one is show up here.</div>
      ) : (
        <div className={s.list}>
          {payouts.slice(0, 6).map((p) => {
            const st = PAYOUT[p.status];
            const step = PAYOUT_STEPS.indexOf(p.status);
            const why = p.rejectionReason || p.failureReason || p.cancelReason;
            return (
              <div key={p.id} className={s.row} style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong style={{ fontSize: 17 }}>{money(p.amountMinor)}</strong>
                  <Pill tone={st.tone}>{st.label}</Pill>
                  <span className={s.hint} style={{ marginLeft: 'auto' }}>
                    {new Date(p.paidAt ?? p.requestedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </span>
                {step >= 0 && (
                  <span className={e.steps} aria-label={`Step ${step + 1} of 4: ${st.label}`}>
                    {PAYOUT_STEPS.map((x, i) => (
                      <span key={x} className={e.step} data-on={i <= step || undefined} />
                    ))}
                  </span>
                )}
                <span className={s.rowMeta}>
                  {p.methodSnapshot?.maskedDisplay && <span>To {p.methodSnapshot.maskedDisplay}</span>}
                  {why && <span style={{ color: 'var(--error-red)' }}>{why}</span>}
                  {p.status === 'REQUESTED' && (
                    <button type="button" className={s.btnGhost} style={{ minHeight: 24, padding: 0, fontSize: 12 }} disabled={busy === p.id} onClick={() => void cancel(p)}>
                      Cancel
                    </button>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}

function MethodCard({ method, loading, onEdit }: { method: Method | null | undefined; loading: boolean; onEdit: () => void }) {
  if (loading) return <Skel h={96} />;
  if (!method) {
    return (
      <div className={s.card} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span className={s.sub}>Add the bank or mobile-money account your payouts go to.</span>
        <button type="button" className={s.btnPrimary} style={{ alignSelf: 'flex-start' }} onClick={onEdit}>
          Add payout details
        </button>
      </div>
    );
  }
  return (
    <div className={s.card} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span className={s.statIcon} style={{ width: 48, height: 48 }} aria-hidden="true">
        {method.type === 'BANK' ? <Building2 size={22} /> : <Smartphone size={22} />}
      </span>
      <span className={s.rowMain}>
        <span className={s.rowTitle}>{method.maskedDisplay ?? (method.type === 'BANK' ? 'Bank account' : 'Mobile money')}</span>
        <span className={s.rowMeta}>
          {method.holderName && <span>{method.holderName}</span>}
          {method.bankName && <span>{method.bankName}</span>}
          {method.country && <span>{method.country}</span>}
        </span>
      </span>
      <button type="button" className={`${s.btn} ${s.btnSm}`} onClick={onEdit}>
        <PencilLine size={14} aria-hidden="true" /> Edit
      </button>
    </div>
  );
}

function Reports({ toast }: { toast: (m: string) => void }) {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const get = async (path: string) => {
    try {
      await downloadCsv(path);
      playSound('select');
    } catch {
      toast('The download didn’t start. Try again.');
    }
  };
  return (
    <div className={s.card} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button type="button" className={s.btn} onClick={() => void get('/api/earnings/reports/transactions.csv')}>
        <FileDown size={16} aria-hidden="true" /> Every transaction
      </button>
      <button type="button" className={s.btn} onClick={() => void get('/api/earnings/reports/earnings.csv?granularity=month')}>
        <FileDown size={16} aria-hidden="true" /> Earnings by month
      </button>
      <span style={{ display: 'flex', gap: 8 }}>
        <label style={{ flex: 1 }}>
          <span className={s.srOnly}>Statement month</span>
          <input type="month" className={s.input} value={month} onChange={(ev) => setMonth(ev.target.value)} />
        </label>
        <button type="button" className={s.btn} disabled={!month} onClick={() => void get(`/api/earnings/reports/statement.csv?month=${month}`)}>
          Statement
        </button>
      </span>
    </div>
  );
}

/* ── cash out ── */

function CashOutSheet({
  open,
  summary,
  method,
  pendingCount,
  onClose,
  onDone,
}: {
  open: boolean;
  summary: Summary;
  method: Method | null;
  pendingCount: number;
  onClose: () => void;
  onDone: () => void;
}) {
  const available = Math.max(0, summary.available);
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const cents = Math.round(Number(amount) * 100);
  const valid = Number.isFinite(cents) && cents >= summary.minPayoutMinor && cents <= available;

  const reset = () => {
    setAmount('');
    setError(null);
    setDone(null);
    onClose();
  };
  const submit = async () => {
    if (!valid || busy) return;
    setBusy(true);
    setError(null);
    try {
      const r = await studioSend<{ publicId: string }>('/api/earnings/payouts', 'POST', { amountMinor: cents });
      setDone(r.publicId);
      playSound('cashOut');
      celebrationHaptic('win');
      onDone();
    } catch (err) {
      playSound('wrong');
      setError(err instanceof Error ? err.message : 'That didn’t go through.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Sheet open={open} onClose={reset} title={done ? 'On its way!' : 'Cash out'}>
      {done ? (
        <>
          <TeyLine pose="cheering">
            {money(cents)} is on its way to {method?.maskedDisplay ?? 'your account'}. Teyro reviews it first, usually within a few days.
          </TeyLine>
          <span className={s.hint}>Reference {done}</span>
          <button type="button" className={s.btnPrimary} onClick={reset}>
            Done
          </button>
        </>
      ) : (
        <>
          <span className={s.sub}>
            {money(available)} ready. The minimum is {money(summary.minPayoutMinor)}.
            {pendingCount > 0 && ` You already have ${pendingCount} payout${pendingCount === 1 ? '' : 's'} in progress.`}
          </span>
          <label className={s.label}>
            Amount (USD)
            <input
              className={s.input}
              inputMode="decimal"
              placeholder={(available / 100).toFixed(2)}
              value={amount}
              onChange={(ev) => setAmount(ev.target.value.replace(/[^0-9.]/g, ''))}
              style={{ fontSize: 24, fontWeight: 800 }}
            />
          </label>
          <div className={s.chips}>
            <button type="button" className={s.chip} onClick={() => setAmount((available / 100).toFixed(2))}>
              Everything
            </button>
            {available / 2 >= summary.minPayoutMinor && (
              <button type="button" className={s.chip} onClick={() => setAmount((Math.floor(available / 2) / 100).toFixed(2))}>
                Half
              </button>
            )}
          </div>
          <span className={s.hint}>
            To {method?.maskedDisplay ?? 'your payout account'}. Converted to your local currency when it’s sent.
          </span>
          {amount && !valid && (
            <span className={s.hint} style={{ color: 'var(--error-red)' }}>
              {cents > available ? `You have ${money(available)} ready.` : `Cash out at least ${money(summary.minPayoutMinor)}.`}
            </span>
          )}
          {error && (
            <div className={s.errorBox} role="alert">
              <span>{error}</span>
            </div>
          )}
          <div className={s.sheetActions}>
            <button type="button" className={s.btn} onClick={reset}>
              Cancel
            </button>
            <button type="button" className={s.btnGood} disabled={!valid || busy} onClick={() => void submit()}>
              {busy ? 'Sending…' : valid ? `Cash out ${money(cents)}` : 'Cash out'}
            </button>
          </div>
        </>
      )}
    </Sheet>
  );
}

/* ── payout details ── */

function MethodSheet({
  open,
  current,
  onClose,
  onSaved,
}: {
  open: boolean;
  current: Method | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [type, setType] = useState<'BANK' | 'MOBILE_MONEY'>(current?.type ?? 'BANK');
  const [holderName, setHolderName] = useState(current?.holderName ?? '');
  const [accountNumber, setAccountNumber] = useState('');
  const [routing, setRouting] = useState('');
  const [institution, setInstitution] = useState(current?.bankName ?? '');
  const [country, setCountry] = useState(current?.country ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Refill from the saved details each time the sheet opens (they may load after mount).
  useEffect(() => {
    if (!open) return;
    setType(current?.type ?? 'BANK');
    setHolderName(current?.holderName ?? '');
    setInstitution(current?.bankName ?? '');
    setCountry(current?.country ?? '');
    setAccountNumber('');
    setRouting('');
    setError(null);
  }, [open, current]);
  const bank = type === 'BANK';
  const ready = holderName.trim() && accountNumber.trim() && institution.trim() && country.trim();

  const save = async () => {
    if (!ready || busy) return;
    setBusy(true);
    setError(null);
    try {
      await studioSend('/api/earnings/payout-method', 'PUT', {
        type,
        holderName: holderName.trim(),
        accountNumber: accountNumber.trim(),
        routingOrExtra: bank && routing.trim() ? routing.trim() : undefined,
        institutionName: institution.trim(),
        country: country.trim(),
        receivingCurrency: 'USD',
      });
      playSound('profileSaved');
      setAccountNumber('');
      onSaved();
    } catch (err) {
      playSound('wrong');
      setError(err instanceof Error ? err.message : 'Didn’t save.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Sheet open={open} onClose={onClose} title={current ? 'Payout details' : 'Where should we pay you?'}>
      <Segmented
        label="Account type"
        value={type}
        onChange={setType}
        options={[
          { value: 'BANK', label: 'Bank account' },
          { value: 'MOBILE_MONEY', label: 'Mobile money' },
        ]}
      />
      <label className={s.label}>
        Account holder
        <input className={s.input} value={holderName} onChange={(ev) => setHolderName(ev.target.value)} placeholder="As registered with your bank" autoComplete="name" />
      </label>
      <label className={s.label}>
        {bank ? 'Account number or IBAN' : 'Mobile money number'}
        <input
          className={s.input}
          value={accountNumber}
          onChange={(ev) => setAccountNumber(ev.target.value)}
          placeholder={current ? 'Enter it again to change it' : bank ? 'e.g. 0001234567' : 'e.g. +237 6XX XXX XXX'}
          autoComplete="off"
        />
      </label>
      {bank && (
        <label className={s.label}>
          SWIFT or routing code <span className={s.hint}>Optional</span>
          <input className={s.input} value={routing} onChange={(ev) => setRouting(ev.target.value)} placeholder="e.g. ABCDEFGH" autoComplete="off" />
        </label>
      )}
      <label className={s.label}>
        {bank ? 'Bank' : 'Provider'}
        <input className={s.input} value={institution} onChange={(ev) => setInstitution(ev.target.value)} placeholder={bank ? 'e.g. Ecobank' : 'e.g. MTN'} />
      </label>
      <label className={s.label}>
        Country
        <input className={s.input} value={country} onChange={(ev) => setCountry(ev.target.value)} placeholder="e.g. Cameroon" autoComplete="country-name" />
      </label>
      <span className={s.hint}>Encrypted and only used by Teyro’s payouts team. We only ever show it back masked.</span>
      {error && (
        <div className={s.errorBox} role="alert">
          <span>{error}</span>
        </div>
      )}
      <div className={s.sheetActions}>
        <button type="button" className={s.btn} onClick={onClose}>
          Cancel
        </button>
        <button type="button" className={s.btnPrimary} disabled={!ready || busy} onClick={() => void save()}>
          {busy ? 'Saving…' : 'Save'}
        </button>
      </div>
    </Sheet>
  );
}
