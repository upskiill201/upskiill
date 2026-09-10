'use client';

/**
 * Hub → Revenue. Reads from the immutable earnings ledger: gross sales +
 * renewals, with refunds/chargebacks deducted into Net. Same numbers as the
 * Earnings section — one source of truth for money.
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BadgeDollarSign, Crown, Receipt, TrendingUp, Users,
} from 'lucide-react';
import { StatCard, TrendChart, DeltaChip } from '../bits';
import { money } from '@/components/creator/earnings/shared';
import styles from './hubtabs.module.css';

interface RevenuePayload {
  isEmpty?: boolean;
  currency?: string;
  totals?: {
    grossAllTime: number; // minor units
    refundsAllTime: number; // minor units, positive magnitude
    netAllTime: number;
    thisMonth: number;
    last7: number;
    last30: number;
    prev30: number;
    delta30Pct: number;
  };
  series30?: { date: string; count: number }[];
  byCourse?: {
    courseId: string;
    title: string;
    grossMinor: number;
    payments: number;
    refundsMinor: number;
  }[];
  payingUsers?: number;
  arpuMinor?: number;
  creatorEarningsAllTimeMinor?: number;
}

export function RevenueTab({ data }: { data: RevenuePayload }) {
  if (data.isEmpty || !data.totals) {
    return (
      <div className={styles.emptyBox}>
        No payments yet. When a student subscribes to one of your courses,
        revenue shows up here.
      </div>
    );
  }

  const t = data.totals;
  const maxRev = Math.max(1, ...(data.byCourse ?? []).map((c) => c.grossMinor));

  return (
    <div className={styles.hubTabRoot}>
      <h3 className={styles.sectionHeading}>Revenue</h3>
      <p className={styles.sectionSub}>
        Straight from your immutable earnings ledger — gross sales and
        renewals, with refunds and chargebacks already deducted from Net.
      </p>

      <div className={styles.kpiGrid}>
        <StatCard
          icon={<TrendingUp size={22} />}
          accent="green"
          label="Net Revenue (All Time)"
          value={money(t.netAllTime)}
          sub={
            <span>
              gross {money(t.grossAllTime)} · refunds −{money(t.refundsAllTime)}
            </span>
          }
        />
        <StatCard icon={<Receipt size={22} />} accent="yellow" label="This Month" value={money(t.thisMonth)} />
        <StatCard
          icon={<BadgeDollarSign size={22} />}
          accent="purple"
          label="Last 30 Days"
          value={money(t.last30)}
          sub={<DeltaChip pct={t.delta30Pct} caption="vs the previous 30 days" />}
        />
        <StatCard icon={<BadgeDollarSign size={22} />} accent="blue" label="Last 7 Days" value={money(t.last7)} />
        <StatCard icon={<Users size={22} />} accent="red" label="Paying Learners" value={data.payingUsers ?? 0} />
        <StatCard
          icon={<Crown size={22} />}
          accent="yellow"
          label="Your Take-Home"
          value={money(data.creatorEarningsAllTimeMinor ?? 0)}
          sub="after your revenue share"
        />
      </div>

      {/* Sparkline in whole dollars for readability; exact figures above */}
      <TrendChart
        data={(data.series30 ?? []).map((p) => ({ date: p.date, count: Math.round(p.count / 100) }))}
        color="#ffc800"
        label="Gross Sales per Day (30 days)"
      />

      {(data.byCourse?.length ?? 0) > 0 && (
        <>
          <h3 className={styles.sectionHeading}>By Course</h3>
          <div className={styles.revRankList}>
            {(data.byCourse ?? []).map((c, i) => (
              <motion.div
                key={c.courseId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/creator/analytics/${encodeURIComponent(c.courseId)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className={styles.revRankRow}>
                    <span className={styles.revRankBubble}>{i + 1}</span>
                    <div className={styles.revRankMid}>
                      <span className={styles.revRankTitle}>{c.title}</span>
                      <div className={styles.revRankTrack}>
                        <motion.div
                          className={styles.revRankFill}
                          style={{ background: '#ffc800' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(c.grossMinor / maxRev) * 100}%` }}
                          transition={{ duration: 0.7, delay: 0.15 + i * 0.05 }}
                        />
                      </div>
                      <span className={styles.revRankMeta}>
                        {c.payments} payment{c.payments === 1 ? '' : 's'}
                        {c.refundsMinor > 0 && <> · refunds −{money(c.refundsMinor)}</>}
                      </span>
                    </div>
                    <span className={styles.revAmount}>{money(c.grossMinor)}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </>
      )}

      <p className={styles.grossNote}>
        Processing fees are absorbed by Teyro. For your share of every single
        transaction, see the Earnings section — it breaks down the full money
        trail per sale.
      </p>
    </div>
  );
}
