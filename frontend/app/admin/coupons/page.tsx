'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Settings as SettingsIcon } from 'lucide-react';
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

type CouponDerivedStatus =
  | 'SCHEDULED' | 'ACTIVE' | 'PAUSED' | 'DISABLED' | 'ARCHIVED' | 'EXPIRED' | 'USAGE_LIMIT_REACHED';

interface CouponRow {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  derivedStatus: CouponDerivedStatus;
  successfulRedemptions: number;
  maxRedemptions: number | null;
  expiresAt: string | null;
  createdAt: string;
  creator: { id: string; fullName: string; email: string };
  eligibleCourses: { course: { id: string; title: string } }[];
  eligiblePlans: { plan: string }[];
  _count: { redemptions: number };
}

interface CouponsResponse {
  items: CouponRow[];
  total: number;
  page: number;
  pageSize: number;
}

const STATUSES: CouponDerivedStatus[] | string[] = [
  '',
  'ACTIVE',
  'SCHEDULED',
  'PAUSED',
  'EXPIRED',
  'USAGE_LIMIT_REACHED',
  'DISABLED',
  'ARCHIVED',
];

const statusTone = (status: CouponDerivedStatus) => {
  if (status === 'ACTIVE') return 'good';
  if (status === 'DISABLED') return 'bad';
  if (status === 'PAUSED' || status === 'SCHEDULED') return 'warn';
  return 'neutral';
};

function discountLabel(c: Pick<CouponRow, 'discountType' | 'discountValue'>) {
  return c.discountType === 'PERCENTAGE' ? `${c.discountValue}% off` : `$${c.discountValue.toFixed(2)} off`;
}

export default function AdminCouponsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const query = new URLSearchParams({ page: String(page), pageSize: '25' });
  if (search) query.set('search', search);
  if (status) query.set('state', status);

  const { data, error, isLoading } = useAdminData<CouponsResponse>(`/api/admin/coupons?${query}`);

  if (error) return <ErrorState error={error as Error} />;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <PageHeader
          title="Coupons & Discounts"
          subtitle="Every promotional code created by any creator on Teyro — search, filter, and moderate."
        />
        <Link href="/admin/coupons/settings">
          <Button variant="secondary" size="sm">
            <SettingsIcon size={13} />
            Platform settings
          </Button>
        </Link>
      </div>

      <div style={{ marginBottom: 12 }}>
        <SearchInput
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder="Search by code, campaign name, or creator…"
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

      {isLoading || !data ? (
        <Loading />
      ) : data.items.length === 0 ? (
        <Empty>No coupons match these filters.</Empty>
      ) : (
        <>
          <DataTable columns={['Code', 'Creator', 'Discount', 'Courses', 'Plans', 'Uses', 'Status', '']}>
            {data.items.map((c) => (
              <tr key={c.id} onClick={() => router.push(`/admin/coupons/${c.id}`)} style={{ cursor: 'pointer' }}>
                <td>
                  <div className={s.mono} style={{ fontWeight: 700 }}>{c.code}</div>
                  <div className={s.mono}>{relativeTime(c.createdAt)}</div>
                </td>
                <td>
                  <div>{c.creator.fullName}</div>
                  <div className={s.mono}>{c.creator.email}</div>
                </td>
                <td>{discountLabel(c)}</td>
                <td>{c.eligibleCourses.length} course{c.eligibleCourses.length === 1 ? '' : 's'}</td>
                <td>{c.eligiblePlans.map((p) => humanize(p.plan)).join(' + ')}</td>
                <td className={s.mono}>
                  {c.successfulRedemptions}
                  {c.maxRedemptions ? ` / ${c.maxRedemptions}` : ''}
                </td>
                <td>
                  <Pill tone={statusTone(c.derivedStatus)}>{humanize(c.derivedStatus)}</Pill>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Link href={`/admin/coupons/${c.id}`}>
                    <Button variant="secondary" size="sm">View</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </DataTable>

          <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onPageChange={setPage} />
        </>
      )}
    </>
  );
}
