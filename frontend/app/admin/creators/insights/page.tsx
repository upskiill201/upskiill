'use client';

/**
 * Teyro HQ — Creators at a glance. The supply side: how many creators and
 * courses, where every course sits on its way to live, what's waiting for a
 * reviewer (oldest first), the money creators are making and waiting on,
 * and the courses and creators pulling learners in.
 */

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { BookOpen, CircleDollarSign, Rocket, UserPlus } from 'lucide-react';
import { useAdminData } from '@/components/admin/AdminUI';
import {
  Face,
  Hero,
  LoadError,
  MoreLink,
  Panel,
  Pipeline,
  RangeSwitch,
  SeriesChart,
  Skeleton,
  Tile,

  compact,
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

interface Creators {
  range: Range;
  creators: { total: number; withLiveCourse: number; new: Stat };
  courses: { draft: number; inReview: number; changes: number; approved: number; live: number; rejected: number };
  coursesSeries: { day: string; created: number }[];
  reviewQueue: {
    id: string;
    title: string;
    category: string | null;
    status: string;
    submittedAt: string | null;
    waitingDays: number | null;
    modules: number;
    creator: Person;
  }[];
  money: { grossMinor: Stat; creatorShareMinor: Stat; teyroShareMinor: number; refundsMinor: number; sales: number; renewals: number };
  payouts: { pendingCount: number; pendingMinor: number; paidCount: number; paidMinor: number };
  topCourses: { id: string; title: string; creator: string; learners: number; newLearners: number }[];
  topCreators: { creator: Person; earnedMinor: number; grossMinor: number; transactions: number }[];
}

export default function AdminCreatorsInsightsPage() {
  const [range, setRange] = useState<Range>(30);
  const { data, error, mutate } = useAdminData<Creators>(`/api/admin/insights/creators?range=${range}`);

  if (error && !data) return <LoadError onRetry={() => void mutate()} />;
  if (!data) return <Skeleton />;

  const c = data.courses;
  const total = c.draft + c.inReview + c.changes + c.approved + c.live + c.rejected;
  const period = `last ${range} days`;

  return (
    <div className={h.page}>
      <Hero
        pose="tablet"
        title="The creator side"
        sub={`${compact(data.creators.total)} creators and ${compact(total)} courses. What's being built, what's waiting on a reviewer, and who's earning.`}
        right={<RangeSwitch value={range} onChange={setRange} />}
      />

      <div className={h.tiles}>
        <Tile icon={<UserPlus size={19} />} tone="var(--brand-purple)" label="New creators" value={compact(data.creators.new.value)} stat={data.creators.new} href="/admin/creators" />
        <Tile
          icon={<Rocket size={19} />}
          tone="var(--success-green)"
          label="Creators with a live course"
          value={compact(data.creators.withLiveCourse)}
          foot={<>of {compact(data.creators.total)} creators</>}
        />
        <Tile icon={<BookOpen size={19} />} tone="var(--color-brand)" label="Live courses" value={compact(c.live)} foot={<>{compact(total)} courses in total</>} href="/admin/courses" />
        <Tile
          icon={<CircleDollarSign size={19} />}
          tone="var(--warning)"
          label="Creators earned"
          value={money(data.money.creatorShareMinor.value)}
          stat={data.money.creatorShareMinor}
        />
      </div>

      <Panel title="Where every course is" note="From first draft to live. Tap a stage to see those courses.">
        <Pipeline
          stages={[
            { label: 'Draft', count: c.draft, tone: 'var(--text-muted)', href: '/admin/courses?reviewStatus=DRAFT' },
            { label: 'In review', count: c.inReview, tone: 'var(--brand-purple)', href: '/admin/courses?reviewStatus=SUBMITTED' },
            { label: 'Changes asked', count: c.changes, tone: 'var(--warning)', href: '/admin/courses?reviewStatus=CHANGES_REQUESTED' },
            { label: 'Approved', count: c.approved, tone: 'var(--color-brand)', href: '/admin/courses?reviewStatus=APPROVED' },
            { label: 'Live', count: c.live, tone: 'var(--success-green)', href: '/admin/courses' },
            { label: 'Rejected', count: c.rejected, tone: 'var(--error-red)', href: '/admin/courses?reviewStatus=REJECTED' },
          ]}
        />
      </Panel>

      <div className={h.grid2}>
        <Panel
          title="Waiting for a reviewer"
          note="Oldest first. Creators can't edit a course while it's in review."
          flush
          action={
            <span style={{ paddingRight: 20 }}>
              <MoreLink href="/admin/courses?reviewStatus=SUBMITTED">Review queue</MoreLink>
            </span>
          }
        >
          {data.reviewQueue.length === 0 ? (
            <p className={h.empty}>Nothing waiting. Every submitted course has been reviewed.</p>
          ) : (
            <ul className={h.list}>
              {data.reviewQueue.map((q) => (
                <li key={q.id}>
                  <Link href={`/admin/courses/${q.id}`} className={h.row}>
                    <Face person={q.creator} />
                    <span className={h.rowMain}>
                      <span className={h.rowTitle}>{q.title}</span>
                      <span className={h.rowMeta}>
                        {q.creator.fullName} · {q.category ?? 'No track'} · {q.modules} module{q.modules === 1 ? '' : 's'}
                      </span>
                    </span>
                    <span className={h.rowSide}>
                      <span
                        className={h.tag}
                        style={{ '--tone': (q.waitingDays ?? 0) >= 3 ? 'var(--error-red)' : 'var(--brand-purple)' } as CSSProperties}
                      >
                        {q.waitingDays === null ? 'Waiting' : q.waitingDays === 0 ? 'Today' : `${q.waitingDays}d waiting`}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Creator money" note={`Learner payments for creators' courses, ${period}`} action={<MoreLink href="/admin/payouts">Payouts</MoreLink>}>
          <div className={h.bigNums}>
            <span className={h.bigNum}>
              <strong>{money(data.money.grossMinor.value)}</strong>
              <span>Paid by learners</span>
              <em>
                {data.money.sales} sales · {data.money.renewals} renewals
              </em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--warning)' }}>{money(data.payouts.pendingMinor)}</strong>
              <span>Payouts pending</span>
              <em>{data.payouts.pendingCount} requests</em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--color-brand)' }}>{money(data.payouts.paidMinor)}</strong>
              <span>Paid out</span>
              <em>{data.payouts.paidCount} this period</em>
            </span>
          </div>
          {data.money.refundsMinor > 0 && <p className={h.note}>{money(data.money.refundsMinor)} refunded this period.</p>}
        </Panel>
      </div>

      <div className={h.grid2}>
        <Panel title="Courses pulling learners in" note={`Live courses by new learners, ${period}`} flush>
          {data.topCourses.length === 0 ? (
            <p className={h.empty}>No live courses yet.</p>
          ) : (
            <ul className={h.list}>
              {data.topCourses.map((t) => (
                <li key={t.id}>
                  <Link href={`/admin/courses/${t.id}`} className={h.row}>
                    <span className={h.rowMain}>
                      <span className={h.rowTitle}>{t.title}</span>
                      <span className={h.rowMeta}>
                        {t.creator} · {compact(t.learners)} learners in total
                      </span>
                    </span>
                    <span className={h.rowSide} style={{ color: 'var(--success-green)' }}>
                      +{compact(t.newLearners)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Top-earning creators" note={`Their share, ${period}`} flush>
          {data.topCreators.length === 0 ? (
            <p className={h.empty}>No creator earnings in this period.</p>
          ) : (
            <ul className={h.list}>
              {data.topCreators.map((t) => (
                <li key={t.creator.id}>
                  <Link href={`/admin/creators/${t.creator.id}`} className={h.row}>
                    <Face person={t.creator} />
                    <span className={h.rowMain}>
                      <span className={h.rowTitle}>{t.creator.fullName}</span>
                      <span className={h.rowMeta}>
                        {t.transactions} payment{t.transactions === 1 ? '' : 's'} · {money(t.grossMinor)} from learners
                      </span>
                    </span>
                    <span className={h.rowSide} style={{ color: 'var(--success-green)' }}>
                      {money(t.earnedMinor, true)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <SeriesChart
        title={`New courses started, ${period}`}
        tabs={[
          {
            key: 'created',
            label: 'Courses',
            tone: 'var(--color-brand)',
            unit: (n) => `${compact(n)} course${n === 1 ? '' : 's'}`,
            points: data.coursesSeries.map((p) => ({ day: p.day, value: p.created })),
          },
        ]}
      />
    </div>
  );
}
