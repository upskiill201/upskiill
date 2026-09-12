'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Button,
  DataTable,
  Empty,
  ErrorState,
  Loading,
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

const TYPES = ['', 'SALE', 'RENEWAL', 'REFUND', 'CHARGEBACK', 'REVERSAL', 'ADJUSTMENT'];
const PROVIDERS = ['', 'STRIPE', 'MESOMB', 'MANUAL'];
const SORTS: { value: string; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'amountHighest', label: 'Amount: highest' },
  { value: 'amountLowest', label: 'Amount: lowest' },
];

const money = (minor: number) =>
  `$${(minor / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function typeTone(type: string) {
  if (type === 'SALE' || type === 'RENEWAL' || type === 'REVERSAL') return 'good' as const;
  if (type === 'REFUND' || type === 'CHARGEBACK') return 'bad' as const;
  return 'neutral' as const;
}

export default function AdminTransactionsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [provider, setProvider] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const query = new URLSearchParams({ page: String(page), pageSize: '25', sortBy });
  if (search) query.set('search', search);
  if (type) query.set('type', type);
  if (provider) query.set('provider', provider);

  const { data, error, isLoading } = useAdminData<TransactionsResponse>(
    `/api/admin/payments/transactions?${query}`,
  );

  if (error) return <ErrorState error={error as Error} />;

  return (
    <>
      <PageHeader
        title="Transactions"
        subtitle="The full earnings ledger — every sale, renewal, refund, and adjustment."
      />

      <div style={{ marginBottom: 12 }}>
        <SearchInput
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder="Search by reference, user, or creator…"
        />
      </div>

      <TabGroup
        options={TYPES}
        value={type}
        onChange={(v) => {
          setType(v);
          setPage(1);
        }}
        formatLabel={(v) => (v ? humanize(v) : 'All types')}
      />
      <TabGroup
        options={PROVIDERS}
        value={provider}
        onChange={(v) => {
          setProvider(v);
          setPage(1);
        }}
        formatLabel={(v) => (v ? humanize(v) : 'All providers')}
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
          {search || type || provider
            ? 'No transactions match these filters.'
            : 'No transactions found. Payments will appear here when learners make purchases.'}
        </Empty>
      ) : (
        <>
          <DataTable columns={['Reference', 'User', 'Course', 'Creator', 'Provider', 'Type', 'Amount', 'Date', '']}>
            {data.items.map((t) => (
              <tr
                key={t.id}
                onClick={() => router.push(`/admin/payments/transactions/${t.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td className={s.mono}>{t.publicId}</td>
                <td>{t.student ? `${t.student.fullName}` : '—'}</td>
                <td>{t.course?.title ?? '—'}</td>
                <td>{t.creator?.fullName ?? '—'}</td>
                <td>{humanize(t.provider)}</td>
                <td>
                  <Pill tone={typeTone(t.type)}>{humanize(t.type)}</Pill>
                </td>
                <td className={s.mono}>{money(t.grossMinor)}</td>
                <td className={s.mono} title={t.occurredAt}>
                  {relativeTime(t.occurredAt)}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Link href={`/admin/payments/transactions/${t.id}`}>
                    <Button variant="secondary" size="sm">
                      View
                    </Button>
                  </Link>
                </td>
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
