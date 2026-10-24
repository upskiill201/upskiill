'use client';

/**
 * Teyro HQ — one learner's Pro story: their subscriptions, every payment and
 * refund, every billing transition from the audit trail, the paywalls they
 * saw and what they told the exit survey. Support answers "why was I
 * charged?" from here.
 */

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Glyph } from '@/components/art/Glyph';
import { useAdminData } from '@/components/admin/AdminUI';
import { Hero, LoadError, Panel, Skeleton, hq as h, money } from '@/components/admin/hq/HQ';
import g from '@/components/admin/hq/growth.module.css';
import {
  eventLabel,
  exitReasonLabel,
  exitRouteLabel,
  momentLabel,
  planLabel,
  proStatusLabel,
  providerLabel,
} from '@/lib/admin/growthLabels';

type Row = Record<string, string | number | boolean | null>;

interface Timeline {
  user: { id: string; fullName: string | null; email: string; avatarUrl: string | null } | null;
  subscriptions: Row[];
  invoices: Row[];
  events: Row[];
  paywall: Row[];
  surveys: Row[];
}

const when = (v: unknown) =>
  typeof v === 'string'
    ? new Date(v).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '–';
const day = (v: unknown) =>
  typeof v === 'string' ? new Date(v).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '–';
const str = (v: unknown) => (typeof v === 'string' ? v : '');

export default function ProTimelinePage() {
  const params = useParams<{ userId: string }>();
  const id = params?.userId;
  const { data, error, mutate } = useAdminData<Timeline>(id ? `/api/admin/insights/pro/users/${id}` : null);

  if (error && !data) return <LoadError onRetry={() => void mutate()} />;
  if (!data) return <Skeleton />;

  const name = data.user?.fullName ?? 'This learner';

  return (
    <div className={h.page}>
      <Link href="/admin/pro" className={g.back}>
        <Glyph name="back" size={16} strokeWidth={3} /> Pro & payments
      </Link>
      <Hero
        pose="tablet"
        title={name}
        sub={data.user ? `${data.user.email} · ${data.subscriptions.length} subscription${data.subscriptions.length === 1 ? '' : 's'}` : 'Account not found.'}
        right={
          data.user ? (
            <Link href={`/admin/users/${data.user.id}`} className={g.back}>
              Their account <Glyph name="arrow" size={16} strokeWidth={3} />
            </Link>
          ) : undefined
        }
      />

      <Panel title="Subscriptions" flush>
        {data.subscriptions.length === 0 ? (
          <p className={h.empty}>No Pro subscription.</p>
        ) : (
          <ul className={h.list}>
            {data.subscriptions.map((s) => (
              <li key={str(s.id)} className={h.row}>
                <span className={h.rowMain}>
                  <span className={h.rowTitle}>
                    {planLabel(str(s.plan))} · {providerLabel(str(s.provider))}
                  </span>
                  <span className={h.rowMeta}>
                    Started {day(s.createdAt)}
                    {s.trialEnd ? ` · trial to ${day(s.trialEnd)}` : ''}
                    {s.currentPeriodEnd ? ` · period to ${day(s.currentPeriodEnd)}` : ''}
                    {s.cancelAtPeriodEnd ? ' · cancels at period end' : ''}
                    {s.cancellationReason ? ` · reason: ${str(s.cancellationReason)}` : ''}
                  </span>
                </span>
                <span className={h.rowSide}>
                  <span className={`${g.pill} ${s.status === 'ACTIVE' ? g.good : s.status === 'PAST_DUE' ? g.bad : s.status === 'TRIALING' ? g.brand : ''}`}>
                    {proStatusLabel(str(s.status))}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <div className={h.grid2}>
        <Panel title="Payments" flush>
          {data.invoices.length === 0 ? (
            <p className={h.empty}>No payments yet.</p>
          ) : (
            <ul className={h.list}>
              {data.invoices.map((i) => (
                <li key={str(i.id)} className={h.row}>
                  <span className={h.rowMain}>
                    <span className={h.rowTitle}>{money(Number(i.amountPaidMinor ?? 0), true)}</span>
                    <span className={h.rowMeta}>
                      {when(i.paidAt)} · {planLabel(str(i.plan))} · {providerLabel(str(i.provider))}
                      {Number(i.discountMinor) > 0 ? ` · ${money(Number(i.discountMinor), true)} off` : ''}
                    </span>
                  </span>
                  <span className={h.rowSide}>
                    {Number(i.amountRefundedMinor) > 0 && <span className={`${g.pill} ${g.bad}`}>Refunded {money(Number(i.amountRefundedMinor), true)}</span>}
                    {Number(i.amountDisputedMinor) > 0 && <span className={`${g.pill} ${g.bad}`}>Disputed</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Billing events" note="The server's audit trail, newest first">
          {data.events.length === 0 ? (
            <p className={h.empty}>Nothing recorded.</p>
          ) : (
            <ol className={g.timeline}>
              {data.events.map((e) => (
                <li key={str(e.id)} className={g.event} style={{ gridTemplateColumns: '120px 1fr' }}>
                  <span className={g.eventTime}>{when(e.createdAt)}</span>
                  <span className={g.eventText}>
                    {eventLabel(str(e.type))}
                    {e.fromStatus || e.toStatus ? (
                      <span className={g.muted}>
                        {' '}
                        · {proStatusLabel(str(e.fromStatus) || '–')} → {proStatusLabel(str(e.toStatus) || '–')}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </div>

      <div className={h.grid2}>
        <Panel title="Paywalls they saw" note="Newest first">
          {data.paywall.length === 0 ? (
            <p className={h.empty}>None.</p>
          ) : (
            <ol className={g.timeline}>
              {data.paywall.map((p, i) => (
                <li key={i} className={g.event} style={{ gridTemplateColumns: '120px 1fr' }}>
                  <span className={g.eventTime}>{when(p.createdAt)}</span>
                  <span className={g.eventText}>
                    {eventLabel(str(p.type))} <span className={g.muted}>· {momentLabel(str(p.moment))}</span>
                    {p.plan ? <span className={g.muted}> · {planLabel(str(p.plan))}</span> : null}
                    {p.declineCode ? <span className={g.muted}> · {str(p.declineCode)}</span> : null}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </Panel>

        <Panel title="What they told us" note="Exit survey answers">
          {data.surveys.length === 0 ? (
            <p className={h.empty}>No answers.</p>
          ) : (
            <div className={g.stack}>
              {data.surveys.map((s, i) => (
                <p key={i} className={g.quote}>
                  {exitReasonLabel(str(s.reason))} → {exitRouteLabel(str(s.route))}
                  {s.freeText ? <>: “{str(s.freeText)}”</> : null}
                  <span className={g.quoteMeta}>{when(s.createdAt)}</span>
                </p>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
