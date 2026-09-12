'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, DollarSign, RefreshCcw, TrendingUp, Undo2 } from 'lucide-react';
import {
  BarList,
  Button,
  Card,
  DataTable,
  Empty,
  ErrorState,
  Loading,
  Metric,
  PageHeader,
  Pill,
  TabGroup,
  adminStyles as s,
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';

interface PaymentsOverview {
  grossVolumeMinor: number;
  successfulPayments: number;
  refundedAmountMinor: number;
  refundedCount: number;
  creatorEarningsMinor: number;
  teyroRevenueMinor: number;
  failedRenewals: number;
  byProvider: Record<string, number>;
}

interface TransactionRow {
  id: string;
  publicId: string;
  type: string;
  provider: string;
  grossMinor: number;
  occurredAt: string;
  student: { fullName: string; email: string } | null;
  creator: { fullName: string; email: string } | null;
  course: { title: string } | null;
}

interface TransactionsResponse {
  items: TransactionRow[];
  total: number;
  page: number;
  pageSize: number;
}

const RANGES: { value: string; label: string; days: number | null }[] = [
  { value: 'today', label: 'Today', days: 0 },
  { value: '7d', label: 'Last 7 days', days: 7 },
  { value: '30d', label: 'Last 30 days', days: 30 },
  { value: '90d', label: 'Last 90 days', days: 90 },
  { value: 'all', label: 'All time', days: null },
];

const money = (minor: number) =>
  `$${(minor / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function typeTone(type: string) {
  if (type === 'SALE' || type === 'RENEWAL' || type === 'REVERSAL') return 'good' as const;
  if (type === 'REFUND' || type === 'CHARGEBACK') return 'bad' as const;
  return 'neutral' as const;
}

export default function AdminPaymentsPage() {
  const [range, setRange] = useState('30d');

  const query = new URLSearchParams();
  const selected = RANGES.find((r) => r.value === range)!;
  if (selected.days != null) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - selected.days);
    query.set('startDate', start.toISOString());
  }

  const { data, error, isLoading } = useAdminData<PaymentsOverview>(
    `/api/admin/payments/overview?${query}`,
  );
  const { data: recent } = useAdminData<TransactionsResponse>(
    `/api/admin/payments/transactions?pageSize=8`,
  );

  if (error) return <ErrorState error={error as Error} />;

  return (
    <>
      <PageHeader
        title="Payments"
        subtitle="Financial overview of payments flowing through Teyro."
      />

      <TabGroup
        options={RANGES.map((r) => r.value)}
        value={range}
        onChange={setRange}
        formatLabel={(v) => RANGES.find((r) => r.value === v)?.label ?? v}
      />

      {isLoading || !data ? (
        <Loading />
      ) : (
        <>
          <div className={s.grid}>
            <Metric
              label="Gross volume"
              value={money(data.grossVolumeMinor)}
              hint={`${data.successfulPayments} successful`}
              icon={<TrendingUp size={13} />}
            />
            <Metric
              label="Creator earnings"
              value={money(data.creatorEarningsMinor)}
              icon={<DollarSign size={13} />}
            />
            <Metric
              label="Teyro revenue share"
              value={money(data.teyroRevenueMinor)}
              icon={<DollarSign size={13} />}
            />
            <Metric
              label="Refunded"
              value={money(data.refundedAmountMinor)}
              hint={`${data.refundedCount} refund/chargeback rows`}
              icon={<Undo2 size={13} />}
            />
          </div>

          <div className={s.grid}>
            <Card title="Payment provider volume">
              <BarList data={data.byProvider} emptyLabel="No successful payments in this range." />
            </Card>
            <Card title="Subscription renewal failures" icon={<AlertTriangle size={15} />}>
              <Metric label="Failed renewals" value={data.failedRenewals} />
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>
                Counted from recorded PAYMENT_FAILED events. One-off checkout failures
                aren&apos;t persisted anywhere in the current payment architecture, so
                they can&apos;t be shown here — this reflects subscription renewal
                failures only.
              </p>
            </Card>
          </div>
        </>
      )}

      <Card title="Recent transactions" icon={<RefreshCcw size={15} />}>
        {!recent ? (
          <Loading />
        ) : recent.items.length === 0 ? (
          <Empty>No transactions found. Payments will appear here when learners make purchases.</Empty>
        ) : (
          <>
            <DataTable columns={['Reference', 'User', 'Course', 'Provider', 'Type', 'Amount', 'Date']}>
              {recent.items.map((t) => (
                <tr key={t.id}>
                  <td className={s.mono}>
                    <Link href={`/admin/payments/transactions/${t.id}`}>{t.publicId}</Link>
                  </td>
                  <td>{t.student?.fullName ?? t.creator?.fullName ?? '—'}</td>
                  <td>{t.course?.title ?? '—'}</td>
                  <td>{humanize(t.provider)}</td>
                  <td>
                    <Pill tone={typeTone(t.type)}>{humanize(t.type)}</Pill>
                  </td>
                  <td className={s.mono}>{money(t.grossMinor)}</td>
                  <td className={s.mono} title={t.occurredAt}>
                    {relativeTime(t.occurredAt)}
                  </td>
                </tr>
              ))}
            </DataTable>
            <div style={{ marginTop: 16 }}>
              <Link href="/admin/payments/transactions">
                <Button variant="secondary">View all transactions</Button>
              </Link>
            </div>
          </>
        )}
      </Card>
    </>
  );
}
