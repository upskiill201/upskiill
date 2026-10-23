'use client';

/**
 * Teyro HQ — Pro & payments. The subscription business at a glance: MRR and
 * ARR, subscribers by plan and how they pay, trials and how many turn into
 * payments, the paywall funnel for each of the four moments, why people
 * close it, offers, backed-out and declined checkouts, refunds, churn, the
 * creator pool runs, and every subscriber's billing timeline.
 *
 * Data: GET /admin/insights/pro. Money is in minor units (US cents).
 */

import Link from 'next/link';
import { useState } from 'react';
import { Glyph } from '@/components/art/Glyph';
import { Banner, Button, ConfirmDialog, adminMutate, useAdminData } from '@/components/admin/AdminUI';
import {
  Bars,
  Hero,
  LoadError,
  Panel,
  RangeSwitch,
  SeriesChart,
  Skeleton,
  Tile,
  ago,
  compact,
  hq as h,
  money,
  type Range,
  type Stat,
} from '@/components/admin/hq/HQ';
import g from '@/components/admin/hq/growth.module.css';
import {
  exitReasonLabel,
  exitRouteLabel,
  momentLabel,
  planLabel,
  proStatusLabel,
  providerLabel,
} from '@/lib/admin/growthLabels';

interface ProInsights {
  range: Range;
  now: {
    subscribers: number;
    activeTrials: number;
    pastDue: number;
    mrrMinor: number;
    arrMinor: number;
    byPlan: { plan: string; count: number }[];
    byProvider: { provider: string; count: number }[];
  };
  money: {
    grossMinor: number;
    refundedMinor: number;
    disputedMinor: number;
    feesMinor: number;
    taxMinor: number;
    netMinor: number;
    payments: number;
    payers: number;
    grossStat: Stat;
    netStat: Stat;
    series: { day: string; grossMinor: number }[];
  };
  trials: { started: Stat; ended: number; converted: number; canceledDuringTrial: number; trialToPaidPct: number };
  cancellations: { reason: string; duringTrial: boolean; count: number }[];
  churn: { ended: number; ratePct: number };
  moments: {
    moment: string;
    views: number;
    planPick: number;
    sheet: number;
    submit: number;
    failed: number;
    succeeded: number;
    closed: number;
    mobileMoney: number;
    started: number;
    trials: number;
    paid: number;
    startPct: number;
  }[];
  exitSurvey: {
    reasons: { reason: string; route: string; count: number }[];
    freeText: { reason: string; text: string; at: string; name: string | null; userId: string }[];
  };
  offers: { shown: number; redeemed: number; expired: number; open: number; redeemPct: number };
  checkout: { attempts: number; succeeded: number; failed: number; abandoned: number; recovered: number; declines: { code: string; count: number }[] };
  subscriberList: {
    id: string;
    userId: string;
    name: string | null;
    plan: string;
    provider: string;
    status: string;
    hasPaid: boolean;
    trialEnd: string | null;
    periodEnd: string | null;
    cancelAtPeriodEnd: boolean;
    createdAt: string;
    paidMinor: number;
  }[];
  poolRuns: {
    id: string;
    month: string;
    revision: number;
    status: string;
    recognizedMinor: number;
    poolMinor: number;
    allocatedMinor: number;
    retainedMinor: number;
    unallocatedMinor: number;
    learners: number;
    postedAt: string | null;
  }[];
}

const statusTone = (s: string) =>
  s === 'ACTIVE' ? g.good : s === 'TRIALING' ? g.brand : s === 'PAST_DUE' ? g.bad : '';

const date = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '–';

const monthName = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'long', year: 'numeric', timeZone: 'UTC' });

export function ProInsights() {
  const [range, setRange] = useState<Range>(30);
  const { data, error, mutate } = useAdminData<ProInsights>(`/api/admin/insights/pro?range=${range}`);
  const [poolBusy, setPoolBusy] = useState(false);
  const [poolError, setPoolError] = useState<string | null>(null);
  const [confirmRun, setConfirmRun] = useState<ProInsights['poolRuns'][number] | null>(null);

  // The month that just finished: the one the pool can be worked out for.
  const [lastMonth] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  });
  const lastMonthName = lastMonth.toLocaleDateString(undefined, { month: 'long', timeZone: 'UTC' });

  const workOut = async () => {
    setPoolBusy(true);
    setPoolError(null);
    try {
      await adminMutate('/api/admin/pro/pool/runs', { body: { month: lastMonth.toISOString().slice(0, 7) } });
      await mutate();
    } catch (err) {
      setPoolError(err instanceof Error ? err.message : 'Could not work the pool out.');
    } finally {
      setPoolBusy(false);
    }
  };

  const post = async (id: string) => {
    setPoolBusy(true);
    setPoolError(null);
    try {
      await adminMutate(`/api/admin/pro/pool/runs/${id}/post`);
      setConfirmRun(null);
      await mutate();
    } catch (err) {
      setPoolError(err instanceof Error ? err.message : 'Could not post the pool.');
      setConfirmRun(null);
    } finally {
      setPoolBusy(false);
    }
  };

  if (error && !data) return <LoadError onRetry={() => void mutate()} />;
  if (!data) return <Skeleton />;

  const { now: live, money: m, trials, checkout, offers } = data;
  const period = `last ${range} days`;
  const plan = (p: string) => live.byPlan.find((x) => x.plan === p)?.count ?? 0;
  const provider = (p: string) => live.byProvider.find((x) => x.provider === p)?.count ?? 0;
  // One bar per reason (the same reason can be routed two ways).
  const exitReasons = Object.entries(
    data.exitSurvey.reasons.reduce<Record<string, number>>((acc, r) => ({ ...acc, [r.reason]: (acc[r.reason] ?? 0) + r.count }), {}),
  )
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className={h.page}>
      <Hero
        pose="podium"
        title="Pro & payments"
        sub={`${compact(live.subscribers)} paying subscriber${live.subscribers === 1 ? '' : 's'} and ${compact(live.activeTrials)} on a free trial right now.`}
        right={<RangeSwitch value={range} onChange={setRange} />}
      />

      <div className={h.tiles}>
        <Tile
          icon={<Glyph name="chart" size={19} />}
          tone="var(--success-green)"
          label="Monthly recurring revenue"
          value={money(live.mrrMinor)}
          foot={<>{money(live.arrMinor)} a year at this rate</>}
        />
        <Tile
          icon={<Glyph name="crown" size={19} />}
          tone="var(--warning)"
          label="Paying subscribers"
          value={compact(live.subscribers)}
          foot={<>{plan('YEARLY')} yearly · {plan('MONTHLY')} monthly · {provider('MESOMB')} Mobile Money</>}
        />
        <Tile
          icon={<Glyph name="clock" size={19} />}
          tone="var(--color-brand)"
          label="On a free trial"
          value={compact(live.activeTrials)}
          foot={live.pastDue > 0 ? <>{live.pastDue} with a failed payment</> : 'No failed payments'}
        />
        <Tile
          icon={<Glyph name="wallet" size={19} />}
          tone="var(--brand-purple)"
          label="Kept after refunds and fees"
          value={money(m.netMinor)}
          stat={m.netStat}
        />
      </div>

      <SeriesChart
        title={`Money taken every day, ${period}`}
        tabs={[
          {
            key: 'gross',
            label: 'Charged',
            tone: 'var(--success-green)',
            unit: (v) => money(v),
            points: m.series.map((p) => ({ day: p.day, value: p.grossMinor })),
          },
        ]}
      />

      <div className={h.grid2}>
        <Panel title="Free trials" note={`Trials that ended in the ${period}`}>
          <div className={h.bigNums}>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--color-brand)' }}>{compact(trials.started.value)}</strong>
              <span>Started</span>
              <em>this period</em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--success-green)' }}>{trials.trialToPaidPct}%</strong>
              <span>Became paid</span>
              <em>
                {trials.converted} of {trials.ended}
              </em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--error-red)' }}>{compact(trials.canceledDuringTrial)}</strong>
              <span>Canceled</span>
              <em>during the trial</em>
            </span>
          </div>
          <p className={h.note}>
            Every trial needs a card, and the reminder goes out two days before the first charge.
            {trials.ended < 20 ? ' With this few trials ended, expect the rate to move a lot.' : ''}
          </p>
        </Panel>

        <Panel title="Leaving" note={`Cancellations and endings in the ${period}`}>
          <div className={h.bigNums} style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--error-red)' }}>{compact(data.churn.ended)}</strong>
              <span>Paying, ended</span>
              <em>canceled or expired</em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--warning)' }}>{data.churn.ratePct}%</strong>
              <span>Churn</span>
              <em>of paying subscribers</em>
            </span>
          </div>
          {data.cancellations.length === 0 ? (
            <p className={h.note}>No cancellations in this period.</p>
          ) : (
            <Bars
              tone="var(--error-red)"
              rows={data.cancellations.map((c) => ({ label: `${c.reason}${c.duringTrial ? ' (in trial)' : ''}`, value: c.count }))}
            />
          )}
        </Panel>
      </div>

      <Panel
        title="The paywall, moment by moment"
        note="Sessions that saw the paywall, and how far they got. Started means a trial or payment went through from that moment; paid means real money followed."
      >
        {data.moments.length === 0 ? (
          <p className={h.empty}>No one has seen the paywall in this period.</p>
        ) : (
          <div className={g.scroll}>
            <table className={g.table}>
              <thead>
                <tr>
                  <th>Moment</th>
                  <th className={g.num}>Saw it</th>
                  <th className={g.num}>Picked a plan</th>
                  <th className={g.num}>Opened payment</th>
                  <th className={g.num}>Pressed pay</th>
                  <th className={g.num}>Started</th>
                  <th className={g.num}>Paid</th>
                  <th className={g.num}>Closed it</th>
                </tr>
              </thead>
              <tbody>
                {data.moments.map((r) => (
                  <tr key={r.moment}>
                    <td>{momentLabel(r.moment)}</td>
                    <td className={g.num}>{compact(r.views)}</td>
                    <td className={g.num}>{compact(r.planPick)}</td>
                    <td className={g.num}>{compact(r.sheet)}</td>
                    <td className={g.num}>{compact(r.submit)}</td>
                    <td className={g.num}>
                      {compact(r.started)} <span className={g.muted}>({r.startPct}%)</span>
                    </td>
                    <td className={g.num}>{compact(r.paid)}</td>
                    <td className={g.num}>{compact(r.closed)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <div className={h.grid2}>
        <Panel title="Why they closed it" note="The one-question survey on the paywall's close button">
          {exitReasons.length === 0 ? (
            <p className={h.empty}>No answers in this period.</p>
          ) : (
            <>
              <Bars tone="var(--warning)" rows={exitReasons.map((r) => ({ label: exitReasonLabel(r.reason), value: r.count }))} />
              <p className={h.note}>
                Where they were sent:{' '}
                {data.exitSurvey.reasons.map((r) => `${exitReasonLabel(r.reason)} ${exitRouteLabel(r.route)} (${r.count})`).join(' · ')}.
              </p>
            </>
          )}
        </Panel>
        <Panel title="In their words" note="The latest 'something else' answers">
          {data.exitSurvey.freeText.length === 0 ? (
            <p className={h.empty}>No one has written anything yet.</p>
          ) : (
            <div className={g.stack}>
              {data.exitSurvey.freeText.map((t, i) => (
                <p key={i} className={g.quote}>
                  “{t.text}”
                  <span className={g.quoteMeta}>
                    {t.name ?? 'A learner'} · {ago(t.at)}
                  </span>
                </p>
              ))}
            </div>
          )}
        </Panel>
      </div>

      <div className={h.grid2}>
        <Panel title="The one-time offer" note="30% off the first year, once per person ever, for 24 hours">
          <div className={h.bigNums}>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--color-brand)' }}>{compact(offers.shown)}</strong>
              <span>Shown</span>
              <em>this period</em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--success-green)' }}>{offers.redeemPct}%</strong>
              <span>Taken</span>
              <em>{offers.redeemed} people</em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--text-secondary)' }}>{compact(offers.open)}</strong>
              <span>Still open</span>
              <em>{offers.expired} expired</em>
            </span>
          </div>
        </Panel>

        <Panel title="Checkouts" note={`Every press of "Start my trial" or "Subscribe", ${period}`}>
          <div className={h.bigNums}>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--success-green)' }}>{compact(checkout.succeeded)}</strong>
              <span>Went through</span>
              <em>of {compact(checkout.attempts)}</em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--warning)' }}>{compact(checkout.abandoned)}</strong>
              <span>Backed out</span>
              <em>{checkout.recovered} recovered</em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--error-red)' }}>{compact(checkout.failed)}</strong>
              <span>Failed</span>
              <em>declined or errored</em>
            </span>
          </div>
          {checkout.declines.length > 0 && (
            <Bars tone="var(--error-red)" rows={checkout.declines.map((d) => ({ label: d.code.replace(/_/g, ' '), value: d.count }))} />
          )}
        </Panel>
      </div>

      <Panel title="Money in detail" note={`Payments taken in the ${period}: ${m.payments} payment${m.payments === 1 ? '' : 's'} from ${m.payers} ${m.payers === 1 ? 'person' : 'people'}`}>
        <div className={h.bigNums} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
          <span className={h.bigNum}>
            <strong style={{ color: 'var(--success-green)' }}>{money(m.grossMinor)}</strong>
            <span>Charged</span>
          </span>
          <span className={h.bigNum}>
            <strong style={{ color: 'var(--error-red)' }}>{money(m.refundedMinor)}</strong>
            <span>Refunded</span>
          </span>
          <span className={h.bigNum}>
            <strong style={{ color: 'var(--error-red)' }}>{money(m.disputedMinor)}</strong>
            <span>Disputed</span>
          </span>
          <span className={h.bigNum}>
            <strong style={{ color: 'var(--text-secondary)' }}>{money(m.feesMinor)}</strong>
            <span>Card fees</span>
          </span>
          <span className={h.bigNum}>
            <strong style={{ color: 'var(--text-secondary)' }}>{money(m.taxMinor)}</strong>
            <span>Tax</span>
          </span>
          <span className={h.bigNum}>
            <strong style={{ color: 'var(--brand-purple)' }}>{money(m.netMinor)}</strong>
            <span>Kept</span>
          </span>
        </div>
      </Panel>

      <Panel title="Subscribers" note="The newest 40. Open one for their whole billing timeline." flush>
        {data.subscriberList.length === 0 ? (
          <p className={h.empty}>No one has started Pro yet.</p>
        ) : (
          <ul className={h.list}>
            {data.subscriberList.map((s) => (
              <li key={s.id}>
                <Link href={`/admin/pro/${s.userId}`} className={h.row}>
                  <span className={h.rowMain}>
                    <span className={h.rowTitle}>{s.name ?? 'Unnamed learner'}</span>
                    <span className={h.rowMeta}>
                      {planLabel(s.plan)} · {providerLabel(s.provider)} · started {date(s.createdAt)}
                      {s.status === 'TRIALING' && s.trialEnd ? ` · trial ends ${date(s.trialEnd)}` : ''}
                      {s.status !== 'TRIALING' && s.periodEnd ? ` · ${s.cancelAtPeriodEnd ? 'ends' : 'renews'} ${date(s.periodEnd)}` : ''}
                    </span>
                  </span>
                  <span className={h.rowSide} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className={g.muted}>{money(s.paidMinor)}</span>
                    <span className={`${g.pill} ${statusTone(s.status)}`}>{proStatusLabel(s.status)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel
        title="Creator pool"
        note="Each month half of every Pro learner's net payment goes to the creators whose courses they learned, split by minutes. Originals' share and unused learners' share stay with Teyro. Work a month out, check it, then post it to creators' earnings."
        action={
          <Button size="sm" variant="secondary" disabled={poolBusy} onClick={() => void workOut()}>
            {poolBusy ? 'Working…' : `Work out ${lastMonthName}`}
          </Button>
        }
        flush
      >
        {poolError && (
          <div style={{ padding: '0 20px 12px' }}>
            <Banner tone="warn">{poolError}</Banner>
          </div>
        )}
        {data.poolRuns.length === 0 ? (
          <p className={h.empty}>No pool has been worked out yet. The first runs after the first full month of Pro.</p>
        ) : (
          <ul className={h.list}>
            {data.poolRuns.map((r) => (
              <li key={r.id} className={h.row}>
                <span className={h.rowMain}>
                  <span className={h.rowTitle}>
                    {new Date(r.month).toLocaleDateString(undefined, { month: 'long', year: 'numeric', timeZone: 'UTC' })}
                    {r.revision > 1 ? ` · revision ${r.revision}` : ''}
                  </span>
                  <span className={h.rowMeta}>
                    {money(r.recognizedMinor)} recognised · {money(r.allocatedMinor)} to creators · {money(r.retainedMinor)} Originals ·{' '}
                    {money(r.unallocatedMinor)} unused · {r.learners} learners
                  </span>
                </span>
                <span className={h.rowSide} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`${g.pill} ${r.status === 'POSTED' ? g.good : r.status === 'DRAFT' ? g.warn : ''}`}>
                    {r.status === 'POSTED' ? `Posted ${date(r.postedAt)}` : r.status === 'DRAFT' ? 'Draft' : 'Replaced'}
                  </span>
                  {r.status === 'DRAFT' && (
                    <Button size="sm" disabled={poolBusy} onClick={() => setConfirmRun(r)}>
                      Post
                    </Button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {confirmRun && (
        <ConfirmDialog
          title={`Post ${monthName(confirmRun.month)}'s pool?`}
          description={
            <>
              {money(confirmRun.allocatedMinor, true)} goes into creators&apos; earnings now, and each creator is told.
              {confirmRun.revision > 1 ? ' This is a revision: only the difference from the last posted run is written.' : ''} This
              can&apos;t be undone, only corrected by a later revision.
            </>
          }
          confirmLabel="Post to creators"
          busy={poolBusy}
          onCancel={() => setConfirmRun(null)}
          onConfirm={() => void post(confirmRun.id)}
        />
      )}
    </div>
  );
}
