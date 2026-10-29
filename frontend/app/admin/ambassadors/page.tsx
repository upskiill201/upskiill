'use client';

/**
 * Teyro HQ → Ambassadors: "invite friends, earn Pro" (founder, 2026-10-29).
 *
 * The switch and every number first (so the founder can turn it on or off,
 * or tune it, any time), then whether it works: ambassadors, friends who
 * came and stayed, Pro switching on and off, whether nudges bring friends
 * back, the leaderboard, and a live feed of everything that happened.
 */

import React, { useEffect, useState } from 'react';
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
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';
import ns from '../network/NetworkAdmin.module.css';

interface Rules {
  enabled: boolean;
  friendsForPro: number;
  qualifyLessons: number;
  qualifyStreak: number;
  activeDays: number;
  graceDays: number;
}

interface Overview {
  rules: Rules;
  totals: {
    ambassadors: number;
    fromOnboarding: number;
    fromApp: number;
    proOn: number;
    inGrace: number;
    withAFriend: number;
    nearPro: number;
    friendsInvited: number;
    friendsQualified: number;
    friendsActive: number;
    friendsAtRisk: number;
  };
  week: Record<string, number>;
  month: Record<string, number>;
  nudges: { sent30: number; cheers30: number; worked30: number; workedRate: number };
  daily: { day: string; type: string; n: number }[];
  top: {
    userId: string;
    name: string;
    email: string;
    source: string;
    joinedAt: string;
    invited: number;
    qualified: number;
    active: number;
    peak: number;
    proActive: boolean;
    proSince: string | null;
    graceUntil: string | null;
  }[];
  recent: { id: string; type: string; at: string; ambassadorId: string; ambassador: string; friend: string | null; meta: unknown }[];
}

const KEY = '/api/ambassador/admin/overview';
const pct = (n: number) => `${Math.round(n * 100)}%`;

/** What each feed event means, in a sentence. */
function describe(e: Overview['recent'][number]): string {
  const f = e.friend ?? 'a friend';
  switch (e.type) {
    case 'JOINED':
      return `became an ambassador${(e.meta as { source?: string } | null)?.source === 'ONBOARDING' ? ' during onboarding' : ''}`;
    case 'FRIEND_JOINED':
      return `${f} joined with their link`;
    case 'FRIEND_QUALIFIED':
      return `${f} now counts (lessons + streak done)`;
    case 'FRIEND_AT_RISK':
      return `${f} is slipping`;
    case 'FRIEND_INACTIVE':
      return `${f} stopped counting`;
    case 'FRIEND_BACK':
      return `${f} is learning again`;
    case 'PRO_ON':
      return 'earned Pro';
    case 'PRO_GRACE':
      return 'dropped below the bar: grace window started';
    case 'PRO_OFF':
      return 'Pro paused';
    case 'PRO_RESTORED':
      return 'kept Pro: a friend came back in time';
    case 'NUDGE':
      return `nudged ${f}`;
    case 'CHEER':
      return `cheered ${f}`;
    case 'NUDGE_WORKED':
      return `nudge worked: ${f} learned`;
    case 'LEARN_WITH':
      return `${f} joined their crew`;
    case 'SETTINGS':
      return 'changed the programme settings';
    default:
      return e.type.toLowerCase();
  }
}

const TONE: Record<string, 'good' | 'warn' | 'bad' | 'brand' | 'neutral'> = {
  PRO_ON: 'good',
  PRO_RESTORED: 'good',
  FRIEND_QUALIFIED: 'good',
  NUDGE_WORKED: 'good',
  FRIEND_BACK: 'good',
  PRO_GRACE: 'warn',
  FRIEND_AT_RISK: 'warn',
  PRO_OFF: 'bad',
  FRIEND_INACTIVE: 'bad',
  JOINED: 'brand',
  SETTINGS: 'brand',
};

const NUMBERS: { key: keyof Omit<Rules, 'enabled'>; label: string; hint: string; min: number; max: number }[] = [
  { key: 'friendsForPro', label: 'Friends for Pro', hint: 'Learning friends an ambassador needs for Pro', min: 1, max: 100 },
  { key: 'qualifyLessons', label: 'Lessons to count', hint: 'Lessons a friend must finish before they count', min: 1, max: 50 },
  { key: 'qualifyStreak', label: 'Streak to count (days)', hint: 'Streak a friend must reach before they count', min: 1, max: 60 },
  { key: 'activeDays', label: 'Active window (days)', hint: 'A counting friend must learn at least this often', min: 2, max: 60 },
  { key: 'graceDays', label: 'Grace (days)', hint: 'Time to bring a friend back before Pro pauses', min: 0, max: 30 },
];

export default function AdminAmbassadorsPage() {
  const { data, error, isLoading } = useAdminData<Overview>(KEY);
  if (isLoading) return <Loading />;
  if (error) return <ErrorState error={error} />;
  if (!data) return <Empty>No ambassador data yet.</Empty>;

  const t = data.totals;
  const daily = (type: string) => Object.fromEntries(data.daily.filter((d) => d.type === type).map((d) => [d.day.slice(5), d.n]));

  return (
    <>
      <PageHeader
        title="Ambassadors"
        subtitle="Invite friends, earn Pro. Pro stays on while an ambassador's friends keep learning."
      />

      <Controls rules={data.rules} />

      <div className={s.grid}>
        <Metric
          label="Ambassadors"
          value={t.ambassadors}
          hint={`${t.fromOnboarding} from onboarding · ${t.fromApp} from the app`}
          icon={<Glyph name="userPlus" size={18} />}
        />
        <Metric
          label="Earning Pro now"
          value={t.proOn}
          hint={`${t.inGrace} in a grace window · ${t.nearPro} halfway there`}
          accent={t.proOn > 0 ? 'good' : 'none'}
          icon={<Glyph name="crown" size={18} />}
        />
        <Metric
          label="Friends who joined"
          value={t.friendsInvited}
          hint={`${t.withAFriend} ambassadors have at least one`}
          icon={<Glyph name="users" size={18} />}
        />
        <Metric
          label="Friends who count"
          value={t.friendsQualified}
          hint={`${t.friendsInvited ? pct(t.friendsQualified / t.friendsInvited) : '0%'} of joined · ${t.friendsActive} learning now`}
          accent={t.friendsQualified > 0 ? 'good' : 'none'}
          icon={<Glyph name="checkCircle" size={18} />}
        />
      </div>

      <div className={s.grid}>
        <Metric
          label="Friends slipping"
          value={t.friendsAtRisk}
          hint="Counting friends with no lesson for a few days"
          accent={t.friendsAtRisk > 0 ? 'warn' : 'none'}
          icon={<Glyph name="warning" size={18} />}
        />
        <Metric
          label="Nudges (30 days)"
          value={data.nudges.sent30}
          hint={`${pct(data.nudges.workedRate)} brought a friend back · ${data.nudges.cheers30} cheers`}
          icon={<Glyph name="bellRing" size={18} />}
        />
        <Metric
          label="Pro switched on (7 days)"
          value={data.week.PRO_ON ?? 0}
          hint={`${data.week.PRO_OFF ?? 0} paused · ${data.week.PRO_RESTORED ?? 0} saved in grace`}
          icon={<Glyph name="trendUp" size={18} />}
        />
      </div>

      <Card title="Last 30 days" icon={<Glyph name="chart" size={18} />}>
        <h3 className={ns.subTitle}>New ambassadors, by day</h3>
        <BarList data={daily('JOINED')} emptyLabel="No one joined yet" />
        <h3 className={ns.subTitle}>Friends who joined, by day</h3>
        <BarList data={daily('FRIEND_JOINED')} emptyLabel="No friends joined yet" />
        <h3 className={ns.subTitle}>Friends who started counting, by day</h3>
        <BarList data={daily('FRIEND_QUALIFIED')} emptyLabel="No friend has qualified yet" />
      </Card>

      <Card title="Top ambassadors" icon={<Glyph name="trophy" size={18} />}>
        {data.top.length === 0 ? (
          <Empty>No ambassadors yet.</Empty>
        ) : (
          <DataTable columns={['Ambassador', 'Joined', 'Friends', 'Counting', 'Learning now', 'Pro']}>
            {data.top.map((a) => (
              <tr key={a.userId}>
                <td>
                  <strong>{a.name}</strong>
                  <br />
                  <span className={ns.muted}>{a.email}</span>
                </td>
                <td>
                  {relativeTime(a.joinedAt)}
                  <br />
                  <span className={ns.muted}>{a.source === 'ONBOARDING' ? 'Onboarding' : 'App'}</span>
                </td>
                <td>{a.invited}</td>
                <td>
                  {a.qualified}
                  {a.peak > a.qualified ? ` (peak ${a.peak})` : ''}
                </td>
                <td>{a.active}</td>
                <td>
                  {a.proActive ? (
                    a.graceUntil ? (
                      <Pill tone="warn">Grace until {new Date(a.graceUntil).toLocaleDateString()}</Pill>
                    ) : (
                      <Pill tone="good">On {a.proSince ? relativeTime(a.proSince) : ''}</Pill>
                    )
                  ) : (
                    <Pill tone="neutral">Not yet</Pill>
                  )}
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      <Card title="What's happening" icon={<Glyph name="activity" size={18} />}>
        {data.recent.length === 0 ? (
          <Empty>Nothing has happened yet.</Empty>
        ) : (
          <DataTable columns={['When', 'What', 'Who']}>
            {data.recent.map((e) => (
              <tr key={e.id}>
                <td>{relativeTime(e.at)}</td>
                <td>
                  <Pill tone={TONE[e.type] ?? 'neutral'}>{e.type.replace(/_/g, ' ').toLowerCase()}</Pill>
                </td>
                <td>
                  <strong>{e.ambassador}</strong> {describe(e)}
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>
    </>
  );
}

function Controls({ rules }: { rules: Rules }) {
  const [draft, setDraft] = useState(rules);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => setDraft(rules), [rules]);

  const save = async (patch: Partial<Rules>, done: string) => {
    setBusy(true);
    setNote(null);
    try {
      await adminMutate('/api/ambassador/admin/settings', { method: 'PATCH', body: patch });
      // Recheck everyone at once, so a new number applies now rather than within the hour.
      await adminMutate('/api/ambassador/admin/evaluate').catch(() => undefined);
      await mutate(KEY);
      setNote(done);
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'That did not save.');
    } finally {
      setBusy(false);
    }
  };

  const changed = NUMBERS.filter((n) => draft[n.key] !== rules[n.key]);

  return (
    <Card title="Programme" icon={<Glyph name="sliders" size={18} />}>
      <Banner tone={rules.enabled ? 'info' : 'warn'}>
        {rules.enabled
          ? 'On. Learners see "get Pro free with friends" as the last option when they leave the paywall, and new ambassadors can join.'
          : 'Off. The offer is hidden and nobody new can join or switch Pro on. Ambassadors who already have Pro keep it while their friends keep learning.'}
      </Banner>
      <div className={ns.actions}>
        <Button
          variant={rules.enabled ? 'danger' : 'primary'}
          disabled={busy}
          onClick={() => void save({ enabled: !rules.enabled }, rules.enabled ? 'Switched off.' : 'Switched on.')}
        >
          {rules.enabled ? 'Turn the programme off' : 'Turn the programme on'}
        </Button>
      </div>

      <div className={s.grid}>
        {NUMBERS.map((n) => (
          <label key={n.key} className="flex flex-col gap-1 text-[14px]">
            <span className="font-extrabold text-[var(--text-primary)]">{n.label}</span>
            <input
              type="number"
              min={n.min}
              max={n.max}
              value={draft[n.key]}
              onChange={(e) => setDraft((d) => ({ ...d, [n.key]: Number(e.target.value) }))}
              className="rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-[15px] font-bold text-[var(--text-primary)]"
            />
            <span className="text-[12px] text-[var(--text-secondary)]">{n.hint}</span>
          </label>
        ))}
      </div>
      <div className={ns.actions}>
        <Button
          disabled={busy || changed.length === 0}
          onClick={() =>
            void save(Object.fromEntries(changed.map((n) => [n.key, draft[n.key]])), 'Saved. Everyone was rechecked with the new numbers.')
          }
        >
          {busy ? 'Saving…' : 'Save numbers'}
        </Button>
        {changed.length > 0 && (
          <Button variant="secondary" disabled={busy} onClick={() => setDraft(rules)}>
            Undo changes
          </Button>
        )}
        {note && <span className={ns.muted}>{note}</span>}
      </div>
    </Card>
  );
}
