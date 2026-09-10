'use client';

/**
 * Earnings → Reports. Downloadable financial records: full transaction
 * history, period earnings report with a chosen granularity, and monthly
 * statements.
 */

import { useState } from 'react';
import { CalendarRange, Download, FileSpreadsheet, ReceiptText } from 'lucide-react';
import { InlineError } from './skeletons';
import styles from './earnings.module.css';

export function ReportsTab() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [granularity, setGranularity] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [statementMonth, setStatementMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );
  const [error, setError] = useState<string | null>(null);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const download = async (key: string, path: () => string) => {
    setBusyKey(key);
    setError(null);
    try {
      await import('@/lib/download').then((m) => m.downloadCsv(path()));
    } catch {
      setError('Download failed — please try again.');
    } finally {
      setBusyKey(null);
    }
  };

  const rangeParams = () => {
    const p = new URLSearchParams();
    if (from) p.set('from', `${from}T00:00:00.000Z`);
    if (to) p.set('to', `${to}T23:59:59.999Z`);
    return p.toString();
  };

  return (
    <div className={styles.root}>
      <h3 className={styles.sectionHeading}>Financial reports</h3>
      <p className={styles.sectionSub}>
        Every export reflects the immutable ledger — the same numbers your
        dashboard shows, ready for accounting.
      </p>

      {error && <InlineError message={error} />}

      <div className={styles.card}>
        {/* DATE RANGE FILTER */}
        <div className={styles.filterBar} style={{ marginBottom: 6 }}>
          <CalendarRange size={16} color="#777777" />
          <input
            type="date"
            className={styles.selectInput}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <span className={styles.pagerInfo}>to</span>
          <input
            type="date"
            className={styles.selectInput}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          {(from || to) && (
            <button className={styles.segBtn} onClick={() => { setFrom(''); setTo(''); }}>
              Clear range
            </button>
          )}
        </div>

        {/* TRANSACTION HISTORY */}
        <div className={styles.reportRow}>
          <div className={styles.reportInfo}>
            <div className={styles.reportTitle}>Transaction history</div>
            <div className={styles.reportDesc}>
              Every sale, renewal, refund, chargeback and adjustment{from || to ? ' in the selected range' : ''}, with the full money trail.
            </div>
          </div>
          <button
            className={styles.secondaryBtn}
            disabled={busyKey === 'tx'}
            onClick={() => void download('tx', () => {
              const q = rangeParams();
              return `/api/earnings/reports/transactions.csv${q ? `?${q}` : ''}`;
            })}
          >
            <Download size={14} />
            Download CSV
          </button>
        </div>

        {/* EARNINGS REPORT */}
        <div className={styles.reportRow}>
          <div className={styles.reportInfo}>
            <div className={styles.reportTitle}>Earnings report</div>
            <div className={styles.reportDesc}>Grouped by period — gross, deductions, net, your share and Teyro&apos;s.</div>
            <div className={styles.segRow} style={{ marginTop: 8 }}>
              {(['day', 'week', 'month', 'year'] as const).map((g) => (
                <button
                  key={g}
                  className={`${styles.segBtn} ${granularity === g ? styles.segBtnActive : ''}`}
                  onClick={() => setGranularity(g)}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <button
            className={styles.secondaryBtn}
            disabled={busyKey === 'report'}
            onClick={() =>
              void download('report', () => {
                const q = rangeParams();
                return `/api/earnings/reports/earnings.csv?granularity=${granularity}${q ? `&${q}` : ''}`;
              })
            }
          >
            <FileSpreadsheet size={14} />
            Download CSV
          </button>
        </div>

        {/* MONTHLY STATEMENT */}
        <div className={styles.reportRow}>
          <div className={styles.reportInfo}>
            <div className={styles.reportTitle}>Monthly statement</div>
            <div className={styles.reportDesc}>Day-by-day activity for one month with a month-total row.</div>
            <input
              type="month"
              className={styles.selectInput}
              style={{ marginTop: 8 }}
              value={statementMonth}
              onChange={(e) => setStatementMonth(e.target.value)}
            />
          </div>
          <button
            className={styles.secondaryBtn}
            disabled={busyKey === 'stmt' || !/^\d{4}-\d{2}$/.test(statementMonth)}
            onClick={() =>
              void download('stmt', () => `/api/earnings/reports/statement.csv?month=${statementMonth}`)
            }
          >
            <ReceiptText size={14} />
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}
