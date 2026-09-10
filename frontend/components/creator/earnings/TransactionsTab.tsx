'use client';

/**
 * Earnings → Transactions. Every ledger entry, filterable, with an
 * expandable transparency breakdown per row:
 * learner paid → deductions → net eligible → your % → you earn → Teyro.
 */

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown, ChevronRight, Download, ShoppingCart, RefreshCw,
  Undo2, ShieldAlert, RotateCcw, SlidersHorizontal,
} from 'lucide-react';
import { EmptyState } from '@/components/creator/analytics/bits';
import { downloadCsv } from '@/lib/download';
import { money, type EarningsTx, type TxType } from './shared';
import { InlineError, TransactionsSkeleton } from './skeletons';
import styles from './earnings.module.css';

const TYPE_META: Record<TxType, { label: string; icon: React.ReactNode; cls: string }> = {
  SALE: { label: 'Sale', icon: <ShoppingCart size={16} />, cls: styles.txSale },
  RENEWAL: { label: 'Renewal', icon: <RefreshCw size={16} />, cls: styles.txRenewal },
  REFUND: { label: 'Refund', icon: <Undo2 size={16} />, cls: styles.txRefund },
  CHARGEBACK: { label: 'Chargeback', icon: <ShieldAlert size={16} />, cls: styles.txChargeback },
  REVERSAL: { label: 'Reversal', icon: <RotateCcw size={16} />, cls: styles.txReversal },
  ADJUSTMENT: { label: 'Adjustment', icon: <SlidersHorizontal size={16} />, cls: styles.txAdjustment },
};

const TYPE_FILTERS: { key: string; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'SALE', label: 'Sales' },
  { key: 'RENEWAL', label: 'Renewals' },
  { key: 'REFUND', label: 'Refunds' },
  { key: 'CHARGEBACK', label: 'Chargebacks' },
  { key: 'ADJUSTMENT', label: 'Adjustments' },
];

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

export function TransactionsTab() {
  const [items, setItems] = useState<EarningsTx[] | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 25;

  const load = useCallback(async (p: number, t: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(p), pageSize: String(pageSize) });
      if (t !== 'ALL') params.set('type', t);
      const res = await fetch(`/api/earnings/transactions?${params}`, { credentials: 'include' });
      if (!res.ok) throw new Error(`Could not load transactions (${res.status})`);
      const data = await res.json();
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(page, typeFilter);
  }, [page, typeFilter, load]);

  const exportCsv = async () => {
    try {
      const params = typeFilter !== 'ALL' ? `?type=${typeFilter}` : '';
      await downloadCsv(`/api/earnings/reports/transactions.csv${params}`);
    } catch {
      setError('Download failed — please try again.');
    }
  };

  if (loading && items === null) return <TransactionsSkeleton />;

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className={styles.root}>
      <div className={styles.listHead}>
        <h3 className={styles.sectionHeading}>Transaction history</h3>
        <button className={styles.secondaryBtn} onClick={() => void exportCsv()}>
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {error && <InlineError message={error} onRetry={() => void load(page, typeFilter)} />}

      <div className={styles.filterBar}>
        {TYPE_FILTERS.map((f) => (
          <button
            key={f.key}
            className={`${styles.segBtn} ${typeFilter === f.key ? styles.segBtnActive : ''}`}
            onClick={() => {
              setTypeFilter(f.key);
              setPage(1);
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {!error && items && items.length === 0 && (
        <EmptyState
          icon={<ShoppingCart size={30} />}
          title="No transactions yet"
          body="Every sale, renewal, refund and adjustment on your courses will appear here with a full money trail."
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(items ?? []).map((tx, i) => {
          const meta = TYPE_META[tx.type] ?? TYPE_META.SALE;
          const expanded = expandedId === tx.id;
          const positive = tx.creatorAmountMinor >= 0;
          return (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.25) }}
            >
              <button
                className={`${styles.txRow} ${meta.cls}`}
                style={{ width: '100%', textAlign: 'left' }}
                onClick={() => setExpandedId(expanded ? null : tx.id)}
              >
                <span className={styles.txTypeBubble}>{meta.icon}</span>
                <span className={styles.txMain}>
                  <span className={styles.txTitle}>
                    {meta.label}
                    {tx.courseTitle ? ` — ${tx.courseTitle}` : ''}
                  </span>
                  <span className={styles.txMeta}>
                    {fmtDate(tx.occurredAt)} · {tx.publicId} · {tx.provider}
                  </span>
                </span>
                <span className={styles.txAmountCol}>
                  <span className={`${styles.txAmount} ${positive ? styles.txAmountPos : styles.txAmountNeg}`}>
                    {positive ? '+' : ''}
                    {money(tx.creatorAmountMinor)}
                  </span>
                  {expanded ? (
                    <ChevronDown size={13} color="#afafaf" />
                  ) : (
                    <ChevronRight size={13} color="#afafaf" />
                  )}
                </span>
              </button>

              {/* TRANSPARENCY BREAKDOWN */}
              {expanded && (
                <div className={styles.breakdown}>
                  <div className={styles.bdRow}>
                    <span className={styles.bdLabel}>Learner paid</span>
                    <span className={styles.bdValue}>{money(tx.grossMinor)}</span>
                  </div>
                  <div className={styles.bdRow}>
                    <span className={styles.bdLabel}>Discounts</span>
                    <span className={styles.bdValue}>−{money(tx.discountMinor)}</span>
                  </div>
                  <div className={styles.bdRow}>
                    <span className={styles.bdLabel}>Processing fees</span>
                    <span className={styles.bdValue}>
                      −{money(tx.feeMinor)}
                      {tx.feeMinor === 0 && (
                        <span style={{ fontWeight: 600, color: '#afafaf' }}> (absorbed by Teyro)</span>
                      )}
                    </span>
                  </div>
                  <div className={styles.bdDivider} />
                  <div className={styles.bdRow}>
                    <span className={styles.bdLabel}>Net revenue eligible for sharing</span>
                    <span className={styles.bdValue}>{money(tx.netMinor)}</span>
                  </div>
                  <div className={styles.bdRow}>
                    <span className={styles.bdLabel}>Your share ({tx.creatorSharePct}%)</span>
                    <span className={`${styles.bdValue} ${positive ? styles.bdYou : ''}`}>
                      {money(tx.creatorAmountMinor)}
                    </span>
                  </div>
                  <div className={styles.bdRow}>
                    <span className={styles.bdLabel}>Teyro share ({100 - tx.creatorSharePct}%)</span>
                    <span className={`${styles.bdValue} ${styles.bdTeyro}`}>
                      {money(tx.teyroAmountMinor)}
                    </span>
                  </div>
                  {tx.reason && <div className={styles.reasonNote}>{tx.reason}</div>}
                  <div className={styles.bdRow}>
                    <span className={styles.bdLabel}>Reference</span>
                    <span className={styles.bdValue}>{tx.publicId}</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {pages > 1 && (
        <div className={styles.pagerRow}>
          <button className={styles.pagerBtn} disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          <span className={styles.pagerInfo}>
            Page {page} of {pages}
          </span>
          <button className={styles.pagerBtn} disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
