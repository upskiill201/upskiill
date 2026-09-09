'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
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

interface UserRow {
  id: string;
  fullName: string;
  email: string;
  role: string;
  accountStatus: string;
  avatarUrl: string | null;
  createdAt: string;
  lastActiveAt: string | null;
  lastLoginAt: string | null;
  hasStudentAccess: boolean;
  hasCreatorAccess: boolean;
}

interface UsersResponse {
  items: UserRow[];
  total: number;
  page: number;
  pageSize: number;
}

const ROLES = ['', 'STUDENT', 'INSTRUCTOR', 'ADMIN'];
const STATUSES = ['', 'ACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED', 'LOCKED', 'DELETED'];

const statusPillTone = (status: string) => {
  if (status === 'ACTIVE') return 'good';
  if (status === 'SUSPENDED' || status === 'LOCKED' || status === 'DELETED') return 'bad';
  return 'warn';
};

export default function AdminUsersPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [accountStatus, setAccountStatus] = useState('');
  const [page, setPage] = useState(1);

  const query = new URLSearchParams({ page: String(page), pageSize: '25' });
  if (search) query.set('search', search);
  if (role) query.set('role', role);
  if (accountStatus) query.set('accountStatus', accountStatus);

  const { data, error, isLoading } = useAdminData<UsersResponse>(
    `/api/admin/users?${query}`,
  );

  if (error) return <ErrorState error={error as Error} />;

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Every account on Teyro — search, filter, and open a profile for the full picture."
      />

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
        options={ROLES}
        value={role}
        onChange={(v) => {
          setRole(v);
          setPage(1);
        }}
        formatLabel={(v) => (v ? humanize(v) : 'All roles')}
      />
      <TabGroup
        options={STATUSES}
        value={accountStatus}
        onChange={(v) => {
          setAccountStatus(v);
          setPage(1);
        }}
        formatLabel={(v) => (v ? humanize(v) : 'All statuses')}
      />

      {isLoading || !data ? (
        <Loading />
      ) : data.items.length === 0 ? (
        <Empty>No users match these filters.</Empty>
      ) : (
        <>
          <DataTable columns={['User', 'Role', 'Status', 'Joined', 'Last active', '']}>
            {data.items.map((u) => (
              <tr
                key={u.id}
                onClick={() => router.push(`/admin/users/${u.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar src={u.avatarUrl ?? undefined} name={u.fullName} size="sm" />
                    <div>
                      <div style={{ fontWeight: 700 }}>{u.fullName}</div>
                      <div className={s.mono}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <Pill tone={u.role === 'ADMIN' ? 'brand' : 'neutral'}>
                    {humanize(u.role)}
                  </Pill>
                </td>
                <td>
                  <Pill tone={statusPillTone(u.accountStatus)}>
                    {humanize(u.accountStatus)}
                  </Pill>
                </td>
                <td className={s.mono} title={u.createdAt}>
                  {relativeTime(u.createdAt)}
                </td>
                <td className={s.mono} title={u.lastActiveAt ?? undefined}>
                  {relativeTime(u.lastActiveAt)}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Link href={`/admin/users/${u.id}`}>
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
