'use client';

/**
 * Teyro HQ → Reach: which learners Tey can actually get to. Reminders only
 * land on a phone from the installed app with notifications on, so every
 * learner is one of four: ready, push on but no app, app but no push, or
 * neither. Tey nags the last three automatically (push / email / in-app
 * screen, until they're set up); this page adds a manual layer on top: ask
 * one learner, or everyone who isn't set up, right now.
 */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { mutate } from 'swr';
import { BellRing, CheckCircle2, Smartphone, Send, XCircle } from 'lucide-react';
import {
  Button,
  Card,
  ConfirmDialog,
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

type Status = 'READY' | 'PUSH_NOT_INSTALLED' | 'INSTALLED_NO_PUSH' | 'NEITHER';

interface ReachRow {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  lastActiveAt: string | null;
  installed: boolean;
  installedAt: string | null;
  pushOn: boolean;
  devices: string[];
  permission: string | null;
  askRequestedAt: string | null;
  askShownAt: string | null;
  status: Status;
}

interface ReachPayload {
  summary: Record<Status, number>;
  total: number;
  learners: ReachRow[];
}

const KEY = '/api/tey/admin/reach';

const STATUS: Record<Status, { label: string; tone: 'good' | 'warn' | 'bad' | 'brand' }> = {
  READY: { label: 'Installed + push on', tone: 'good' },
  PUSH_NOT_INSTALLED: { label: 'Push on, no app', tone: 'brand' },
  INSTALLED_NO_PUSH: { label: 'App, push off', tone: 'warn' },
  NEITHER: { label: 'Neither', tone: 'bad' },
};

export default function AdminReachPage() {
  const { data, error, isLoading } = useAdminData<ReachPayload>(KEY);
  const [filter, setFilter] = useState<Status | 'NOT_READY' | 'ALL'>('NOT_READY');
  const [confirm, setConfirm] = useState<{ ids: string[]; label: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const rows = useMemo(() => {
    const all = data?.learners ?? [];
    if (filter === 'ALL') return all;
    if (filter === 'NOT_READY') return all.filter((r) => r.status !== 'READY');
    return all.filter((r) => r.status === filter);
  }, [data, filter]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorState error={error} />;
  if (!data) return <Loading />;

  const notReady = data.learners.filter((r) => r.status !== 'READY');
  const pct = (n: number) => (data.total ? Math.round((n / data.total) * 100) : 0);

  const send = async (ids: string[]) => {
    setBusy(true);
    try {
      const r = await adminMutate<{ asked: number }>(`${KEY}/ask`, { body: { userIds: ids } });
      setNote(`Asked ${r.asked} learner${r.asked === 1 ? '' : 's'}. They'll see Tey's install + reminders screen next time they open Teyro, and get an email or push now.`);
      await mutate(KEY);
    } catch (e) {
      setNote((e as Error).message);
    } finally {
      setBusy(false);
      setConfirm(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Reach"
        subtitle="Who has installed Teyro and turned on reminders. Tey nags everyone else automatically until they do; ask by hand here too."
      />

      <div className={s.grid}>
        <Metric label="Installed + push on" value={`${data.summary.READY}`} hint={`${pct(data.summary.READY)}% of learners`} icon={<CheckCircle2 size={13} />} />
        <Metric label="Push on, no app" value={`${data.summary.PUSH_NOT_INSTALLED}`} hint="Tey pushes them to install" icon={<BellRing size={13} />} />
        <Metric label="App, push off" value={`${data.summary.INSTALLED_NO_PUSH}`} hint="Tey emails them to turn it on" icon={<Smartphone size={13} />} />
        <Metric label="Neither" value={`${data.summary.NEITHER}`} hint="Email + in-app ask only" icon={<XCircle size={13} />} />
      </div>

      <Card
        title="Learners"
        icon={<Send size={15} />}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 12 }}>
          {(['NOT_READY', 'NEITHER', 'INSTALLED_NO_PUSH', 'PUSH_NOT_INSTALLED', 'READY', 'ALL'] as const).map((f) => (
            <Button key={f} size="sm" variant={filter === f ? 'primary' : 'secondary'} onClick={() => setFilter(f)}>
              {f === 'NOT_READY' ? 'Not set up' : f === 'ALL' ? 'Everyone' : STATUS[f].label}
            </Button>
          ))}
          <span style={{ flex: 1 }} />
          <Button
            disabled={busy || notReady.length === 0}
            onClick={() => setConfirm({ ids: notReady.map((r) => r.id), label: `all ${notReady.length} learners who aren't set up` })}
          >
            <Send size={14} /> Ask everyone not set up ({notReady.length})
          </Button>
        </div>
        {note && <p style={{ fontSize: 13, margin: '0 0 12px', color: 'var(--text-secondary)' }}>{note}</p>}

        {rows.length === 0 ? (
          <Empty>Nobody here.</Empty>
        ) : (
          <DataTable columns={['Learner', 'Status', 'Devices', 'Notifications', 'Last active', 'Last HQ ask', '']}>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  <Link href={`/admin/users/${r.id}`} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {r.fullName}
                  </Link>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{r.email}</div>
                </td>
                <td>
                  <Pill tone={STATUS[r.status].tone}>{STATUS[r.status].label}</Pill>
                </td>
                <td style={{ fontSize: 13 }}>{r.devices.length ? r.devices.join(', ') : '—'}</td>
                <td style={{ fontSize: 13 }}>
                  {r.permission === 'denied' ? 'Blocked in browser' : r.permission === 'granted' ? 'Allowed' : r.permission ? 'Not asked yet' : '—'}
                </td>
                <td className={s.mono}>{relativeTime(r.lastActiveAt)}</td>
                <td style={{ fontSize: 13 }}>
                  {r.askRequestedAt
                    ? `${relativeTime(r.askRequestedAt)}${r.askShownAt && r.askShownAt >= r.askRequestedAt ? ', seen' : ''}`
                    : '—'}
                </td>
                <td>
                  {r.status !== 'READY' && (
                    <Button size="sm" variant="secondary" disabled={busy} onClick={() => setConfirm({ ids: [r.id], label: r.fullName })}>
                      Ask
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      {confirm && (
        <ConfirmDialog
          title="Send the install + reminders ask?"
          description={
            <>
              To <strong>{confirm.label}</strong>: Tey&apos;s install and reminders screen on their next app open, plus an
              email now (or a push, if they already have one). At most one email or push per learner per day.
            </>
          }
          confirmLabel="Send ask"
          busy={busy}
          onConfirm={() => void send(confirm.ids)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  );
}
