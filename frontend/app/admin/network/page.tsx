'use client';

/**
 * Teyro HQ → Network: is the network making people learn?
 *
 * The north star first (lessons started because of another person, per daily
 * learner), then what feeds it: card engagement, the buddy graph, whether
 * buddied learners stay, squads/duels/help, whether the notifications are
 * welcome — and the feed's learned ranking, with a button to retrain it.
 * docs/TEYRO_NETWORK_PLAN.md §8 and phase 5.
 */

import { useState } from 'react';
import { mutate } from 'swr';
import { Glyph } from '@/components/art/Glyph';
import {
  BarList,
  Banner,
  Button,
  Card,
  DataTable,
  Empty,
  ErrorState,
  Loading,
  Metric,
  PageHeader,
  Pill,
  adminMutate,
  adminStyles as s,
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';
import ns from './NetworkAdmin.module.css';

interface ModelRow {
  id: string;
  trainedAt: string;
  samples: number;
  positives: Record<string, number>;
  metrics: Record<string, { gain?: number; holdoutLoss?: number; baselineLoss?: number; skipped?: string }>;
  active: boolean;
  note: string | null;
}

interface Overview {
  northStar: { lessonsFromCards: number; avgDailyLearners: number; perDailyLearner: number };
  cards: { impressions: number; taps: number; cheers: number; profileOpens: number; tapRate: number; enrolmentsFromCards: number };
  graph: { buddyPairs: number; learnersWithBuddy: number; pendingRequests: number };
  firstWeekBuddy: { signups: number; withBuddy: number; rate: number };
  activeThisWeek: {
    withBuddy: { total: number; active: number; rate: number };
    withoutBuddy: { total: number; active: number; rate: number };
  };
  squads: { squads: number; members: number; goalsMet: number };
  duels: Record<string, number>;
  help: { routed: number; answered: number; helped: number };
  notifications: {
    sent: number;
    opened: number;
    openRate: number;
    byKind: Record<string, { sent: number; opened: number }>;
    heldBack: Record<string, number>;
    optedOut: number;
  };
  models: ModelRow[];
}

const KEY = '/api/network/admin/overview';
const pct = (n: number) => `${Math.round(n * 100)}%`;

export default function AdminNetworkPage() {
  const { data, error, isLoading } = useAdminData<Overview>(KEY);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  if (isLoading) return <Loading />;
  if (error) return <ErrorState error={error} />;
  if (!data) return <Empty>No network data yet.</Empty>;

  const retrain = async () => {
    setBusy(true);
    setNote(null);
    try {
      const r = await adminMutate<{ note: string }>('/api/network/admin/retrain');
      setNote(r.note);
      await mutate(KEY);
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Retraining failed.');
    } finally {
      setBusy(false);
    }
  };

  const active = data.models.find((m) => m.active);
  const a = data.activeThisWeek;

  return (
    <>
      <PageHeader
        title="Network"
        subtitle="Last 7 days. The goal: people get each other learning. Everything here serves the first number."
      />

      <div className={s.grid}>
        <Metric
          label="Lessons started from the network"
          value={data.northStar.lessonsFromCards}
          hint={`${data.northStar.perDailyLearner} per daily learner a day · ${data.northStar.avgDailyLearners} daily learners`}
          accent={data.northStar.lessonsFromCards > 0 ? 'good' : 'none'}
          icon={<Glyph name="target" size={18} />}
        />
        <Metric
          label="Card tap rate"
          value={pct(data.cards.tapRate)}
          hint={`${data.cards.taps} taps on ${data.cards.impressions} cards seen`}
          icon={<Glyph name="upRight" size={18} />}
        />
        <Metric
          label="Started a course from a card"
          value={data.cards.enrolmentsFromCards}
          hint={`${data.cards.cheers} cheers · ${data.cards.profileOpens} profile opens`}
          icon={<Glyph name="sparkle" size={18} />}
        />
        <Metric
          label="Buddy in their first week"
          value={pct(data.firstWeekBuddy.rate)}
          hint={`${data.firstWeekBuddy.withBuddy} of ${data.firstWeekBuddy.signups} who joined 7–14 days ago`}
          icon={<Glyph name="users" size={18} />}
        />
      </div>

      <Card title="Do buddies keep people learning?" icon={<Glyph name="trendUp" size={18} />}>
        <p className={ns.muted}>Learners 8–60 days in who finished a lesson this week.</p>
        <div className={s.grid}>
          <Metric
            label="With a buddy"
            value={pct(a.withBuddy.rate)}
            hint={`${a.withBuddy.active} of ${a.withBuddy.total}`}
            accent={a.withBuddy.rate > a.withoutBuddy.rate ? 'good' : 'none'}
          />
          <Metric label="Without a buddy" value={pct(a.withoutBuddy.rate)} hint={`${a.withoutBuddy.active} of ${a.withoutBuddy.total}`} />
          <Metric
            label="Buddy pairs"
            value={data.graph.buddyPairs}
            hint={`${data.graph.learnersWithBuddy} learners · ${data.graph.pendingRequests} requests waiting`}
          />
        </div>
      </Card>

      <div className={s.grid}>
        <Metric label="Squads" value={data.squads.squads} hint={`${data.squads.members} members · ${data.squads.goalsMet} hit this week's goal`} />
        <Metric
          label="Duels started"
          value={Object.values(data.duels).reduce((n, v) => n + v, 0)}
          hint={`${data.duels.DONE ?? 0} finished · ${data.duels.EXPIRED ?? 0} ran out of time`}
        />
        <Metric
          label="Lesson questions routed"
          value={data.help.routed}
          hint={`${data.help.answered} answered · ${data.help.helped} helped someone finish`}
        />
      </div>

      <Card title="Network notifications" icon={<Glyph name="bellRing" size={18} />}>
        <div className={s.grid}>
          <Metric label="Pushes sent" value={data.notifications.sent} hint={`${pct(data.notifications.openRate)} opened`} />
          <Metric
            label="Turned off"
            value={data.notifications.optedOut}
            hint="Learners who switched off Study buddies notifications"
            accent={data.notifications.optedOut > 0 ? 'warn' : 'none'}
          />
        </div>
        <h3 className={ns.subTitle}>Sent, by kind</h3>
        <BarList data={Object.fromEntries(Object.entries(data.notifications.byKind).map(([k, v]) => [humanize(k), v.sent]))} />
        <h3 className={ns.subTitle}>Held back, and why</h3>
        <BarList
          variant="muted"
          data={Object.fromEntries(Object.entries(data.notifications.heldBack).map(([k, v]) => [humanize(k), v]))}
          emptyLabel="Nothing held back"
        />
      </Card>

      <Card title="Feed ranking" icon={<Glyph name="sliders" size={18} />}>
        <Banner tone={active ? 'info' : 'warn'}>
          {active
            ? `Learned ranking on since ${relativeTime(active.trainedAt)}: it learned from ${active.samples} cards seen.`
            : 'The feed uses the hand-set formula. A learned ranking switches on once there is enough data and it beats guessing.'}
        </Banner>
        <div className={ns.actions}>
          <Button onClick={() => void retrain()} disabled={busy}>
            {busy ? 'Training…' : 'Retrain now'}
          </Button>
          <span className={ns.muted}>Also runs every Monday 03:00 UTC.</span>
        </div>
        {note && <p className={ns.muted}>{note}</p>}
        {data.models.length === 0 ? (
          <Empty>No training runs yet.</Empty>
        ) : (
          <DataTable columns={['Trained', 'Cards seen', 'Taps · cheers · lessons', 'Better than guessing', 'Status']}>
            {data.models.map((m) => (
              <tr key={m.id}>
                <td>{relativeTime(m.trainedAt)}</td>
                <td>{m.samples}</td>
                <td>
                  {m.positives.cta ?? 0} · {m.positives.cheer ?? 0} · {m.positives.lesson ?? 0}
                </td>
                <td>
                  {(['cta', 'cheer', 'lesson'] as const)
                    .map((o) => {
                      const r = m.metrics[o];
                      return r?.gain !== undefined ? `${humanize(o)} ${pct(r.gain)}` : null;
                    })
                    .filter(Boolean)
                    .join(' · ') || '—'}
                </td>
                <td title={m.note ?? undefined}>
                  <Pill tone={m.active ? 'good' : 'neutral'}>{m.active ? 'Active' : 'Not used'}</Pill>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>
    </>
  );
}
