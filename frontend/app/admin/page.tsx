'use client';

/**
 * Teyro HQ — Overview. The whole platform in one screen: what needs the team
 * now, how the period compares with the one before, today's pulse, the daily
 * trend, and the latest people and money coming in. Deeper looks live on
 * Learning, Creators at a glance and Subscribers.
 */

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import {
  BookOpenCheck,
  CircleDollarSign,
  FolderInput,
  GraduationCap,
  LifeBuoy,
  PartyPopper,
  UserPlus,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { useAdminData } from '@/components/admin/AdminUI';
import {
  Face,
  Hero,
  LoadError,
  MoreLink,
  Panel,
  RangeSwitch,
  SeriesChart,
  Skeleton,
  Tile,
  ago,
  compact,
  greeting,
  hq as h,
  money,
  type Range,
  type Stat,
} from '@/components/admin/hq/HQ';

interface Person {
  id: string;
  fullName: string;
  avatarUrl: string | null;
}

interface Overview {
  range: Range;
  totals: { learners: number; creators: number };
  headline: { signups: Stat; active: Stat; lessons: Stat; revenueMinor: Stat };
  pulse: { dau: number; wau: number; mau: number; stickinessPct: number };
  subscribers: { active: number; cancelling: number; mrrMinor: number; byPlan: Record<string, number> };
  money: { gross: number; refunds: number; net: number; teyro: number; creators: number; sales: number; renewals: number };
  series: { day: string; active: number; signups: number; lessons: number }[];
  attention: { review: number; payouts: number; support: number; importsFailed: number; importsRunning: number };
  latestUsers: (Person & { createdAt: string; hasStudentAccess: boolean; hasCreatorAccess: boolean })[];
  latestSales: { id: string; amountMinor: number; at: string; course: string; buyer: Person | null }[];
}

const NEEDS: { key: keyof Overview['attention']; label: string; href: string; icon: LucideIcon; tone: string }[] = [
  { key: 'review', label: 'courses to review', href: '/admin/courses?reviewStatus=SUBMITTED', icon: BookOpenCheck, tone: 'var(--brand-purple)' },
  { key: 'payouts', label: 'payouts to approve', href: '/admin/payouts', icon: Wallet, tone: 'var(--warning)' },
  { key: 'support', label: 'support messages waiting', href: '/admin/support', icon: LifeBuoy, tone: 'var(--color-brand)' },
  { key: 'importsFailed', label: 'course imports failed', href: '/admin/courses/import', icon: FolderInput, tone: 'var(--error-red)' },
];

export default function AdminOverviewPage() {
  const [range, setRange] = useState<Range>(30);
  const { data, error, mutate } = useAdminData<Overview>(`/api/admin/insights/overview?range=${range}`);

  if (error && !data) return <LoadError onRetry={() => void mutate()} />;
  if (!data) return <Skeleton />;

  const waiting = NEEDS.reduce((s, n) => s + data.attention[n.key], 0);
  const period = `last ${range} days`;

  return (
    <div className={h.page}>
      <Hero
        pose={waiting > 0 ? 'pointing' : 'cheering'}
        title={`${greeting()}! Here’s Teyro right now.`}
        sub={
          waiting > 0
            ? `${waiting} thing${waiting === 1 ? '' : 's'} need${waiting === 1 ? 's' : ''} the team. ${compact(data.totals.learners)} learners and ${compact(data.totals.creators)} creators on the platform.`
            : `Nothing is waiting on the team. ${compact(data.totals.learners)} learners and ${compact(data.totals.creators)} creators on the platform.`
        }
        right={<RangeSwitch value={range} onChange={setRange} />}
      />

      {/* What needs the team */}
      <div className={h.attention}>
        {NEEDS.map((n) => {
          const count = data.attention[n.key];
          const Icon = n.icon;
          return (
            <Link key={n.key} href={n.href} className={`${h.need} ${count === 0 ? h.needCalm : ''}`} style={{ '--tone': n.tone } as CSSProperties}>
              <span className={h.needIcon} aria-hidden="true">
                {count === 0 ? <PartyPopper size={20} strokeWidth={2.5} /> : <Icon size={20} strokeWidth={2.5} />}
              </span>
              <span className={h.needText}>
                <strong>{count}</strong>
                <span>{count === 0 ? `No ${n.label}` : n.label}</span>
              </span>
            </Link>
          );
        })}
      </div>

      {/* Headline */}
      <div className={h.tiles}>
        <Tile icon={<UserPlus size={19} />} tone="var(--color-brand)" label="New signups" value={compact(data.headline.signups.value)} stat={data.headline.signups} href="/admin/users" />
        <Tile icon={<Users size={19} />} tone="var(--brand-purple)" label="Active learners" value={compact(data.headline.active.value)} stat={data.headline.active} href="/admin/learning" />
        <Tile icon={<GraduationCap size={19} />} tone="var(--success-green)" label="Lessons finished" value={compact(data.headline.lessons.value)} stat={data.headline.lessons} href="/admin/learning" />
        <Tile
          icon={<CircleDollarSign size={19} />}
          tone="var(--warning)"
          label="Revenue"
          value={money(data.headline.revenueMinor.value)}
          stat={data.headline.revenueMinor}
          href="/admin/payments"
          foot={data.money.refunds > 0 ? <span>· {money(data.money.refunds)} refunded</span> : undefined}
        />
      </div>

      {/* Today's pulse */}
      <div className={h.pulse}>
        <div className={h.pulseCell}>
          <span className={h.pulseLabel}>Today</span>
          <span className={h.pulseValue}>{compact(data.pulse.dau)}</span>
          <span className={h.pulseHint}>active in 24h</span>
        </div>
        <div className={h.pulseCell}>
          <span className={h.pulseLabel}>This week</span>
          <span className={h.pulseValue}>{compact(data.pulse.wau)}</span>
          <span className={h.pulseHint}>active in 7 days</span>
        </div>
        <div className={h.pulseCell}>
          <span className={h.pulseLabel}>This month</span>
          <span className={h.pulseValue}>{compact(data.pulse.mau)}</span>
          <span className={h.pulseHint}>active in 30 days</span>
        </div>
        <div className={h.pulseCell}>
          <span className={h.pulseLabel}>Stickiness</span>
          <span className={h.pulseValue}>{data.pulse.stickinessPct}%</span>
          <span className={h.pulseHint}>daily ÷ monthly</span>
        </div>
        <div className={h.pulseCell}>
          <span className={h.pulseLabel}>Subscribers</span>
          <span className={h.pulseValue}>{compact(data.subscribers.active)}</span>
          <span className={h.pulseHint}>{data.subscribers.cancelling} cancelling</span>
        </div>
        <div className={h.pulseCell}>
          <span className={h.pulseLabel}>Monthly run rate</span>
          <span className={h.pulseValue}>{money(data.subscribers.mrrMinor)}</span>
          <span className={h.pulseHint}>from active plans</span>
        </div>
      </div>

      <SeriesChart
        title={`Every day, ${period}`}
        tabs={[
          { key: 'active', label: 'Active', tone: 'var(--brand-purple)', summary: (ps) => `${compact(Math.max(0, ...ps.map((x) => x.value)))} on the busiest day`, unit: (n) => `${compact(n)} active`, points: data.series.map((p) => ({ day: p.day, value: p.active })) },
          { key: 'lessons', label: 'Lessons', tone: 'var(--success-green)', unit: (n) => `${compact(n)} lessons`, points: data.series.map((p) => ({ day: p.day, value: p.lessons })) },
          { key: 'signups', label: 'Signups', tone: 'var(--color-brand)', unit: (n) => `${compact(n)} signups`, points: data.series.map((p) => ({ day: p.day, value: p.signups })) },
        ]}
      />

      <div className={h.grid2}>
        <Panel title="Money this period" note={`Learner payments, ${period}`} action={<MoreLink href="/admin/payments">Payments</MoreLink>}>
          <div className={h.bigNums}>
            <span className={h.bigNum}>
              <strong>{money(data.money.gross)}</strong>
              <span>Paid by learners</span>
              <em>
                {data.money.sales} sale{data.money.sales === 1 ? '' : 's'} · {data.money.renewals} renewal{data.money.renewals === 1 ? '' : 's'}
              </em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--color-brand)' }}>{money(data.money.teyro)}</strong>
              <span>Teyro’s share</span>
              <em>after creator shares</em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--brand-purple)' }}>{money(data.money.creators)}</strong>
              <span>Creators earned</span>
              <em>
                <Link href="/admin/payouts">see payouts</Link>
              </em>
            </span>
          </div>
        </Panel>

        <Panel title="Latest sales" flush action={<span style={{ paddingRight: 20 }}><MoreLink href="/admin/payments/transactions">All</MoreLink></span>}>
          {data.latestSales.length === 0 ? (
            <p className={h.empty}>No sales yet.</p>
          ) : (
            <ul className={h.list}>
              {data.latestSales.map((s) => (
                <li key={s.id} className={h.row}>
                  <Face person={s.buyer ?? { fullName: '?', avatarUrl: null }} />
                  <span className={h.rowMain}>
                    <span className={h.rowTitle}>{s.buyer?.fullName ?? 'A learner'}</span>
                    <span className={h.rowMeta}>
                      {s.course} · {ago(s.at)}
                    </span>
                  </span>
                  <span className={h.rowSide} style={{ color: 'var(--success-green)' }}>
                    +{money(s.amountMinor, true)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <Panel title="Newest people" flush action={<span style={{ paddingRight: 20 }}><MoreLink href="/admin/users">All users</MoreLink></span>}>
        {data.latestUsers.length === 0 ? (
          <p className={h.empty}>No signups yet.</p>
        ) : (
          <ul className={h.list}>
            {data.latestUsers.map((u) => (
              <li key={u.id}>
                <Link href={`/admin/users/${u.id}`} className={h.row}>
                  <Face person={u} />
                  <span className={h.rowMain}>
                    <span className={h.rowTitle}>{u.fullName}</span>
                    <span className={h.rowMeta}>Joined {ago(u.createdAt)}</span>
                  </span>
                  <span className={h.rowSide}>
                    {u.hasCreatorAccess && (
                      <span className={h.tag} style={{ '--tone': 'var(--brand-purple)' } as CSSProperties}>
                        Creator
                      </span>
                    )}{' '}
                    {u.hasStudentAccess ? (
                      <span className={h.tag} style={{ '--tone': 'var(--success-green)' } as CSSProperties}>
                        Learner
                      </span>
                    ) : (
                      <span className={h.tag}>Onboarding</span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
