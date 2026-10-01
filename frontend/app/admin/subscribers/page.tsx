'use client';

/**
 * Teyro HQ — Subscribers. Everyone paying for a course right now, those who
 * have cancelled but still have access until their period ends, and those
 * whose access has ended. The run rate converts yearly plans to a monthly
 * figure so the number is comparable month to month.
 */

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { CalendarClock, CircleDollarSign, LogOut, UserPlus, WalletCards } from 'lucide-react';
import { Pagination, SearchInput, useAdminData } from '@/components/admin/AdminUI';
import {
  Face,
  Hero,
  LoadError,
  Panel,
  RangeSwitch,
  Skeleton,
  Tile,
  compact,
  hq as h,
  money,
  type Range,
} from '@/components/admin/hq/HQ';

interface Row {
  id: string;
  plan: string;
  status: string;
  startDate: string;
  expiresAt: string;
  cancelAtPeriodEnd: boolean;
  pricePaid: number | null;
  createdAt: string;
  user: { id: string; fullName: string; email: string; avatarUrl: string | null };
  course: { id: string; title: string };
}

interface Subscribers {
  range: Range;
  snapshot: {
    active: number;
    cancelling: number;
    mrrMinor: number;
    byPlan: Record<string, number>;
    startedInRange: number;
    endedInRange: number;
  };
  total: number;
  page: number;
  pageSize: number;
  items: Row[];
}

type Status = 'active' | 'cancelling' | 'ended';
const TABS: { v: Status; label: string }[] = [
  { v: 'active', label: 'Active' },
  { v: 'cancelling', label: 'Cancelling' },
  { v: 'ended', label: 'Ended' },
];

const date = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

export default function AdminSubscribersPage() {
  const [range, setRange] = useState<Range>(30);
  const [status, setStatus] = useState<Status>('active');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const q = new URLSearchParams({ range: String(range), status, page: String(page) });
  if (search) q.set('search', search);
  const { data, error, mutate } = useAdminData<Subscribers>(`/api/admin/insights/subscribers?${q}`);

  if (error && !data) return <LoadError onRetry={() => void mutate()} />;
  if (!data) return <Skeleton />;

  const s = data.snapshot;
  const plans = Object.entries(s.byPlan);

  return (
    <div className={h.page}>
      <Hero
        pose="badge"
        title="Subscribers"
        sub="Learners paying for a course. Paid courses keep two lessons free, then learners subscribe monthly or yearly."
        right={<RangeSwitch value={range} onChange={(r) => { setRange(r); setPage(1); }} />}
      />

      <div className={h.tiles}>
        <Tile
          icon={<WalletCards size={19} />}
          tone="var(--success-green)"
          label="Paying now"
          value={compact(s.active)}
          foot={plans.length ? plans.map(([p, c]) => `${c} ${p.toLowerCase()}`).join(' · ') : 'No plans yet'}
        />
        <Tile icon={<CircleDollarSign size={19} />} tone="var(--warning)" label="Monthly run rate" value={money(s.mrrMinor)} foot="yearly plans counted as ÷12" />
        <Tile icon={<UserPlus size={19} />} tone="var(--color-brand)" label="New subscriptions" value={compact(s.startedInRange)} foot={`last ${range} days`} />
        <Tile icon={<LogOut size={19} />} tone="var(--error-red)" label="Ended" value={compact(s.endedInRange)} foot={<>{s.cancelling} more cancelling</>} upIsGood={false} />
      </div>

      <Panel
        title="Everyone"
        note={`${compact(data.total)} ${status === 'active' ? 'active' : status === 'cancelling' ? 'cancelling (access until period end)' : 'ended'} subscription${data.total === 1 ? '' : 's'}`}
        action={
          <div className={h.seg} role="radiogroup" aria-label="Status">
            {TABS.map((t) => (
              <button
                key={t.v}
                type="button"
                role="radio"
                aria-checked={status === t.v}
                className={`${h.segBtn} ${status === t.v ? h.segOn : ''}`}
                onClick={() => {
                  setStatus(t.v);
                  setPage(1);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        }
      >
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by learner, email or course" />
        {data.items.length === 0 ? (
          <p className={h.empty}>{search ? `No subscriptions match “${search}”.` : 'No subscriptions here yet.'}</p>
        ) : (
          <ul className={h.list} style={{ margin: '0 -20px' }}>
            {data.items.map((r) => {
              const renews = r.status === 'ACTIVE' && !r.cancelAtPeriodEnd && new Date(r.expiresAt) > new Date();
              return (
                <li key={r.id}>
                  <Link href={`/admin/users/${r.user.id}`} className={h.row}>
                    <Face person={r.user} />
                    <span className={h.rowMain}>
                      <span className={h.rowTitle}>{r.user.fullName}</span>
                      <span className={h.rowMeta}>
                        {r.course.title} · since {date(r.startDate)}
                      </span>
                    </span>
                    <span className={h.rowSide}>
                      <span className={h.tag} style={{ '--tone': r.plan === 'YEARLY' ? 'var(--brand-purple)' : 'var(--color-brand)' } as CSSProperties}>
                        {r.plan.toLowerCase()}
                      </span>
                      <span style={{ display: 'block', marginTop: 4, fontSize: 12.5, color: 'var(--text-muted)' }}>
                        <CalendarClock size={12} aria-hidden="true" style={{ verticalAlign: '-1px' }} />{' '}
                        {renews ? 'Renews' : r.cancelAtPeriodEnd ? 'Ends' : 'Ended'} {date(r.expiresAt)}
                        {r.pricePaid ? ` · $${r.pricePaid.toFixed(2)}` : ''}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onPageChange={setPage} />
      </Panel>
    </div>
  );
}
