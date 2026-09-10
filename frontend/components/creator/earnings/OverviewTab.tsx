'use client';

/**
 * Earnings → Overview. Balance card (available / pending / reserved /
 * lifetime), tier badge, granularity-switchable earnings trend, and
 * per-course earnings ranking.
 */

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, ShieldCheck, Wallet, Hourglass, Landmark, Trophy } from 'lucide-react';
import { StatCard, TrendChart, EmptyState } from '@/components/creator/analytics/bits';
import { money, moneyShort, type AgreementInfo } from './shared';
import { InlineError, OverviewSkeleton } from './skeletons';
import styles from './earnings.module.css';

interface Summary {
  lifetimeEarned: number;
  pendingClearing: number;
  reservedForPayout: number;
  available: number;
  totalPaidOut: number;
  reserveDays: number;
  minPayoutMinor: number;
  agreement: AgreementInfo;
  isEmpty: boolean;
}

interface TrendBucket {
  period: string;
  grossMinor: number;
  creatorMinor: number;
  teyroMinor: number;
  count: number;
}

interface CourseEarning {
  courseId: string;
  courseTitle: string;
  grossMinor: number;
  creatorEarningsMinor: number;
  teyroEarningsMinor: number;
  purchases: number;
}

type Granularity = 'day' | 'week' | 'month' | 'year';

const GRANULARITIES: { key: Granularity; label: string }[] = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
];

function periodLabel(period: string): string {
  // Day → "Aug 23", Month → "Aug 2026", Week-of → "W/o Aug 18", Year as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(period)) {
    return new Date(`${period}T00:00:00Z`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }
  if (period.startsWith('W')) {
    const d = new Date(`${period.slice(1)}T00:00:00Z`);
    return `wk of ${d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
  }
  if (/^\d{4}-\d{2}$/.test(period)) {
    return new Date(`${period}-01T00:00:00Z`).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  }
  return period;
}

export function OverviewTab() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [buckets, setBuckets] = useState<TrendBucket[]>([]);
  const [byCourse, setByCourse] = useState<CourseEarning[]>([]);
  const [granularity, setGranularity] = useState<Granularity>('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (g: Granularity) => {
    setError(null);
    try {
      const [sumRes, trendRes, courseRes] = await Promise.all([
        fetch('/api/earnings/summary', { credentials: 'include' }),
        fetch(`/api/earnings/trend?granularity=${g}`, { credentials: 'include' }),
        fetch('/api/earnings/by-course', { credentials: 'include' }),
      ]);
      if (!sumRes.ok) throw new Error(`Could not load your earnings (${sumRes.status})`);
      setSummary(await sumRes.json());
      if (trendRes.ok) setBuckets((await trendRes.json()).buckets ?? []);
      if (courseRes.ok) setByCourse(await courseRes.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load('month');
  }, [load]);

  const switchGranularity = (g: Granularity) => {
    setGranularity(g);
    fetch(`/api/earnings/trend?granularity=${g}`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : { buckets: [] }))
      .then((d) => setBuckets(d.buckets ?? []))
      .catch(() => {});
  };

  if (loading && !summary) return <OverviewSkeleton />;
  if (error && !summary) return <InlineError message={error} onRetry={() => void load(granularity)} />;
  if (!summary) return null;

  if (summary.isEmpty) {
    return (
      <div className={styles.root}>
        <EmptyState
          icon={<Wallet size={30} />}
          title="No earnings yet"
          body={`When students subscribe to your courses, your earnings appear here with a transparent breakdown of every transaction. Your share of net revenue is ${summary.agreement.creatorSharePct}%.`}
        />
      </div>
    );
  }

  const maxCreator = Math.max(1, ...byCourse.map((c) => c.creatorEarningsMinor));
  const founding = summary.agreement.tier === 'FOUNDING';

  return (
    <div className={styles.root}>
      {/* BALANCE CARD */}
      <motion.div
        className={`${styles.card} ${styles.balanceCard}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className={styles.balanceBigLabel}>Available to withdraw</span>
          <span className={styles.balanceBigValue}>{money(Math.max(0, summary.available))}</span>
          <span
            className={`${styles.tierBadge} ${founding ? styles.tierFounding : styles.tierStandard}`}
          >
            <Crown size={12} />
            {founding ? 'Founding Creator' : 'Standard Creator'} · {summary.agreement.creatorSharePct}% share
          </span>
        </div>

        <div className={styles.balanceSide}>
          <div className={styles.balanceLine}>
            <Hourglass size={14} color="#ff9600" />
            <span className={styles.balanceLineLabel}>Pending clearing</span>
            <span className={styles.balanceLineValue}>{money(summary.pendingClearing)}</span>
          </div>
          <div className={styles.balanceLine}>
            <ShieldCheck size={14} color="#8549ba" />
            <span className={styles.balanceLineLabel}>Reserved for payouts</span>
            <span className={styles.balanceLineValue}>{money(summary.reservedForPayout)}</span>
          </div>
          <div className={styles.balanceLine}>
            <Trophy size={14} color="#58a700" />
            <span className={styles.balanceLineLabel}>Lifetime earned</span>
            <span className={styles.balanceLineValue}>{money(summary.lifetimeEarned)}</span>
          </div>
          <div className={styles.balanceLine}>
            <Landmark size={14} color="#1899d6" />
            <span className={styles.balanceLineLabel}>Total paid out</span>
            <span className={styles.balanceLineValue}>{money(summary.totalPaidOut)}</span>
          </div>
        </div>
      </motion.div>

      <p className={styles.holdNote}>
        Earnings clear {summary.reserveDays} days after purchase (refund-safety window), then move
        from Pending to Available. Minimum payout: {money(summary.minPayoutMinor)}.
      </p>

      {/* KPI CARDS */}
      <div className={styles.kpiGrid}>
        <StatCard icon={<Trophy size={22} />} accent="yellow" label="Lifetime Earned" value={money(summary.lifetimeEarned)} />
        <StatCard icon={<Landmark size={22} />} accent="blue" label="Paid Out" value={money(summary.totalPaidOut)} />
        <StatCard icon={<Hourglass size={22} />} accent="red" label="Pending Clearing" value={money(summary.pendingClearing)} sub={`${summary.reserveDays}-day hold`} />
        <StatCard icon={<Crown size={22} />} accent="purple" label="Your Share" value={`${summary.agreement.creatorSharePct}%`} sub={founding ? 'Founding rate — locked per transaction' : 'of net revenue'} />
      </div>

      {/* TREND */}
      <div className={styles.listHead}>
        <h3 className={styles.sectionHeading}>Earnings over time</h3>
        <div className={styles.segRow}>
          {GRANULARITIES.map((g) => (
            <button
              key={g.key}
              className={`${styles.segBtn} ${granularity === g.key ? styles.segBtnActive : ''}`}
              onClick={() => switchGranularity(g.key)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        <TrendChart
          data={buckets.map((b) => ({ date: b.period, count: b.creatorMinor }))}
          color="#58cc02"
          label="Your earnings"
        />
        <TrendChart
          data={buckets.map((b) => ({ date: b.period, count: b.teyroMinor }))}
          color="#ffc800"
          label="Teyro platform share"
        />
      </div>

      {/* BY COURSE */}
      {byCourse.length > 0 && (
        <>
          <h3 className={styles.sectionHeading}>Earnings by course</h3>
          <div className={styles.card}>
            {byCourse.map((c, i) => (
              <motion.div
                key={c.courseId}
                className={styles.courseEarnRow}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className={styles.courseEarnMid}>
                  <span className={styles.courseEarnTitle}>{c.courseTitle}</span>
                  <div className={styles.courseEarnTrack}>
                    <div
                      className={styles.courseEarnFill}
                      style={{ width: `${(c.creatorEarningsMinor / maxCreator) * 100}%` }}
                    />
                  </div>
                  <span className={styles.courseEarnMeta}>
                    {c.purchases} purchase{c.purchases === 1 ? '' : 's'} · gross{' '}
                    {moneyShort(c.grossMinor)}
                  </span>
                </div>
                <span className={styles.courseEarnAmount}>{money(c.creatorEarningsMinor)}</span>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
