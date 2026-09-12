'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Clock, DollarSign, Wallet } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import {
  DataTable,
  Empty,
  ErrorState,
  Loading,
  Metric,
  PageHeader,
  Pagination,
  Pill,
  SearchInput,
  TabGroup,
  adminStyles as s,
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';

interface PayoutsOverview {
  pendingReview: { count: number; amountMinor: number };
  processing: { count: number; amountMinor: number };
  failed: { count: number; amountMinor: number };
  paidOut: { count: number; amountMinor: number };
}

interface PayoutRow {
  id: string;
  publicId: string;
  amountMinor: number;
  currency: string;
  status: string;
  methodSnapshot: { type?: string; maskedDisplay?: string } | null;
  requestedAt: string;
  processedAt: string | null;
  paidAt: string | null;
  creator: { id: string; fullName: string; email: string; avatarUrl: string | null } | null;
}

interface PayoutsResponse {
  items: PayoutRow[];
  total: number;
  page: number;
  pageSize: number;
}

const STATUSES = ['', 'REQUESTED', 'UNDER_REVIEW', 'PROCESSING', 'PAID', 'REJECTED', 'FAILED', 'CANCELLED'];
const SORTS: { value: string; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'amountHighest', label: 'Amount: highest' },
  { value: 'amountLowest', label: 'Amount: lowest' },
];

const money = (minor: number) =>
  `$${(minor / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function statusTone(status: string) {
  if (status === 'PAID') return 'good' as const;
  if (status === 'REJECTED' || status === 'FAILED' || status === 'CANCELLED') return 'bad' as const;
  if (status === 'PROCESSING' || status === 'UNDER_REVIEW') return 'brand' as const;
  return 'warn' as const;
}

export default function AdminPayoutsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const { data: overview, error: overviewError } = useAdminData<PayoutsOverview>(
    '/api/admin/payouts/overview',
  );

  const query = new URLSearchParams({ page: String(page), pageSize: '25', sortBy });
  if (search) query.set('search', search);
  if (status) query.set('status', status);

  const { data, error, isLoading } = useAdminData<PayoutsResponse>(
    `/api/admin/payouts?${query}`,
  );

  if (error || overviewError) return <ErrorState error={(error ?? overviewError) as Error} />;

  return (
    <>
      <PageHeader
        title="Payouts"
        subtitle="Review and process creator payout requests."
      />

      {!overview ? (
        <Loading />
      ) : (
        <div className={s.grid}>
          <Metric
            label="Pending review"
            value={overview.pendingReview.count}
            hint={money(overview.pendingReview.amountMinor)}
            icon={<Clock size={13} />}
          />
          <Metric
            label="Processing"
            value={overview.processing.count}
            hint={money(overview.processing.amountMinor)}
            icon={<Wallet size={13} />}
          />
          <Metric
            label="Paid out"
            value={money(overview.paidOut.amountMinor)}
            hint={`${overview.paidOut.count} payouts`}
            icon={<DollarSign size={13} />}
          />
          <Metric
            label="Failed"
            value={overview.failed.count}
            hint={money(overview.failed.amountMinor)}
            icon={<AlertTriangle size={13} />}
          />
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <SearchInput
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder="Search by reference, creator name, or email…"
        />
      </div>

      <TabGroup
        options={STATUSES}
        value={status}
        onChange={(v) => {
          setStatus(v);
          setPage(1);
        }}
        formatLabel={(v) => (v ? humanize(v) : 'All statuses')}
      />
      <TabGroup
        options={SORTS.map((o) => o.value)}
        value={sortBy}
        onChange={(v) => {
          setSortBy(v);
          setPage(1);
        }}
        formatLabel={(v) => SORTS.find((o) => o.value === v)?.label ?? v}
      />

      {isLoading || !data ? (
        <Loading />
      ) : data.items.length === 0 ? (
        <Empty>
          {search || status
            ? 'No payouts match these filters.'
            : 'No payouts found. Creator payouts will appear here when they are requested.'}
        </Empty>
      ) : (
        <>
          <DataTable columns={['Payout', 'Creator', 'Amount', 'Status', 'Method', 'Requested', 'Processed']}>
            {data.items.map((p) => (
              <tr
                key={p.id}
                onClick={() => router.push(`/admin/payouts/${p.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td className={s.mono}>{p.publicId}</td>
                <td>
                  {p.creator ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar src={p.creator.avatarUrl ?? undefined} name={p.creator.fullName} size="sm" />
                      <div>
                        <div style={{ fontWeight: 700 }}>{p.creator.fullName}</div>
                        <div className={s.mono}>{p.creator.email}</div>
                      </div>
                    </div>
                  ) : (
                    '—'
                  )}
                </td>
                <td className={s.mono}>{money(p.amountMinor)}</td>
                <td>
                  <Pill tone={statusTone(p.status)}>{humanize(p.status)}</Pill>
                </td>
                <td>{p.methodSnapshot?.maskedDisplay ?? p.methodSnapshot?.type ?? '—'}</td>
                <td className={s.mono} title={p.requestedAt}>
                  {relativeTime(p.requestedAt)}
                </td>
                <td className={s.mono}>{p.paidAt ? relativeTime(p.paidAt) : p.processedAt ? relativeTime(p.processedAt) : '—'}</td>
              </tr>
            ))}
          </DataTable>

          <Pagination
            page={data.page}
            pageSize={data.pageSize}
            total={data.total}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
}
