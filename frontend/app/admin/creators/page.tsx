'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BadgeCheck, BookOpen, Users as UsersIcon, UserCheck } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import {
  Button,
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
  accountStatusTone,
  adminStyles as s,
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';

interface CreatorRow {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  accountStatus: string;
  createdAt: string;
  lastActiveAt: string | null;
  displayName: string | null;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | null;
  coursesCount: number;
  publishedCoursesCount: number;
  enrollmentsCount: number;
  earningsMinor: number;
}

interface CreatorsResponse {
  items: CreatorRow[];
  total: number;
  page: number;
  pageSize: number;
}

interface CreatorsSummary {
  total: number;
  activeLast30d: number;
  withPublishedCourses: number;
  pendingVerification: number;
}

const STATUSES = ['', 'ACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED', 'LOCKED', 'DELETED'];
const VERIFICATION = ['', 'PENDING', 'VERIFIED', 'REJECTED'];
const SORTS: { value: string; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'mostCourses', label: 'Most courses' },
  { value: 'recentlyActive', label: 'Recently active' },
];

const money = (minor: number) =>
  `$${(minor / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function verificationTone(status: string | null) {
  if (status === 'VERIFIED') return 'good' as const;
  if (status === 'REJECTED') return 'bad' as const;
  return 'warn' as const;
}

export default function AdminCreatorsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [accountStatus, setAccountStatus] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const query = new URLSearchParams({ page: String(page), pageSize: '25', sortBy });
  if (search) query.set('search', search);
  if (accountStatus) query.set('accountStatus', accountStatus);
  if (verificationStatus) query.set('verificationStatus', verificationStatus);

  const { data, error, isLoading } = useAdminData<CreatorsResponse>(
    `/api/admin/creators?${query}`,
  );
  const { data: summary } = useAdminData<CreatorsSummary>('/api/admin/creators/summary');

  if (error) return <ErrorState error={error as Error} />;

  return (
    <>
      <PageHeader
        title="Creators"
        subtitle="Manage and monitor creators across the Teyro platform."
      />

      <div className={s.grid}>
        <Metric
          label="Total creators"
          value={summary?.total ?? '—'}
          icon={<UsersIcon size={13} />}
        />
        <Metric
          label="Active (30d)"
          value={summary?.activeLast30d ?? '—'}
          icon={<UserCheck size={13} />}
        />
        <Metric
          label="With published courses"
          value={summary?.withPublishedCourses ?? '—'}
          icon={<BookOpen size={13} />}
        />
        <Metric
          label="Pending verification"
          value={summary?.pendingVerification ?? '—'}
          icon={<BadgeCheck size={13} />}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <SearchInput
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder="Search by name or email…"
        />
      </div>

      <TabGroup
        options={STATUSES}
        value={accountStatus}
        onChange={(v) => {
          setAccountStatus(v);
          setPage(1);
        }}
        formatLabel={(v) => (v ? humanize(v) : 'All statuses')}
      />
      <TabGroup
        options={VERIFICATION}
        value={verificationStatus}
        onChange={(v) => {
          setVerificationStatus(v);
          setPage(1);
        }}
        formatLabel={(v) => (v ? humanize(v) : 'All verification')}
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
          {search || accountStatus || verificationStatus
            ? 'No creators match these filters.'
            : 'No creators yet. Creator accounts will appear here as people join Teyro as creators.'}
        </Empty>
      ) : (
        <>
          <DataTable
            columns={['Creator', 'Status', 'Verification', 'Courses', 'Enrollments', 'Earnings', 'Joined', '']}
          >
            {data.items.map((c) => (
              <tr
                key={c.id}
                onClick={() => router.push(`/admin/creators/${c.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar src={c.avatarUrl ?? undefined} name={c.displayName ?? c.fullName} size="sm" />
                    <div>
                      <div style={{ fontWeight: 700 }}>{c.displayName ?? c.fullName}</div>
                      <div className={s.mono}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <Pill tone={accountStatusTone(c.accountStatus)}>{humanize(c.accountStatus)}</Pill>
                </td>
                <td>
                  <Pill tone={verificationTone(c.verificationStatus)}>
                    {c.verificationStatus ? humanize(c.verificationStatus) : 'No profile'}
                  </Pill>
                </td>
                <td className={s.mono}>
                  {c.coursesCount} total · {c.publishedCoursesCount} published
                </td>
                <td className={s.mono}>{c.enrollmentsCount.toLocaleString()}</td>
                <td className={s.mono}>{money(c.earningsMinor)}</td>
                <td className={s.mono} title={c.createdAt}>
                  {relativeTime(c.createdAt)}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Link href={`/admin/creators/${c.id}`}>
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
