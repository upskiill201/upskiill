'use client';

import { useState } from 'react';
import { Activity, CheckCircle2, Send, XCircle } from 'lucide-react';
import {
  Card,
  DataTable,
  Empty,
  ErrorState,
  Loading,
  Metric,
  PageHeader,
  Pill,
  adminStyles as s,
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';

interface Health {
  config: {
    schedulerEnabled: boolean;
    dryRun: boolean;
    pushKillSwitch: boolean;
    externalTickConfigured: boolean;
    vapidConfigured: boolean;
  };
  scheduler: { backlog: number; failedActions: number; staleClaims: number };
  delivery: { failedLastHour: number; lastSentAt: string | null };
  recentErrors: {
    id: string;
    ruleId: string;
    lastError: string;
    updatedAt: string;
  }[];
}

/** Config rows where the *interesting* value is not always `true`. */
const CONFIG_ROWS: {
  key: keyof Health['config'];
  label: string;
  goodWhen: boolean;
  note: string;
}[] = [
  {
    key: 'schedulerEnabled',
    label: 'Scheduler running',
    goodWhen: true,
    note: 'Off means no action is ever claimed.',
  },
  {
    key: 'dryRun',
    label: 'Dry-run',
    goodWhen: false,
    note: 'On means everything is evaluated but nothing is delivered.',
  },
  {
    key: 'pushKillSwitch',
    label: 'Push kill switch',
    goodWhen: false,
    note: 'On suppresses every nudge before it reaches a channel.',
  },
  {
    key: 'vapidConfigured',
    label: 'VAPID keys',
    goodWhen: true,
    note: 'Without these, push cannot be sent at all.',
  },
  {
    key: 'externalTickConfigured',
    label: 'External tick',
    goodWhen: true,
    note: 'A spun-down free-plan instance runs no cron — this is what wakes it.',
  },
];

export default function AdminHealthPage() {
  const { data, error, isLoading } = useAdminData<Health>(
    '/api/tey/admin/health',
  );
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="Health" />
        <Loading />
      </>
    );
  }

  const sendTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/tey/admin/test-push', {
        method: 'POST',
        credentials: 'include',
      });
      const json = (await res.json()) as { note?: string };
      setTestResult(json.note ?? 'Done.');
    } catch {
      setTestResult('Request failed.');
    } finally {
      setTesting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Health"
        subtitle="Enough to answer “is it running, and is it sending?” — not an observability platform."
      />

      <div className={s.grid}>
        <Metric
          label="Backlog"
          value={data.scheduler.backlog}
          hint="Due, not yet processed"
          accent={data.scheduler.backlog > 50 ? 'warn' : 'good'}
        />
        <Metric
          label="Stale claims"
          value={data.scheduler.staleClaims}
          hint="Reaped on the next tick"
          accent={data.scheduler.staleClaims > 0 ? 'warn' : 'good'}
        />
        <Metric
          label="Failed actions"
          value={data.scheduler.failedActions}
          hint="Exhausted their retries"
          accent={data.scheduler.failedActions > 0 ? 'bad' : 'good'}
        />
        <Metric
          label="Last sent"
          value={relativeTime(data.delivery.lastSentAt)}
          hint={`${data.delivery.failedLastHour} failed in the last hour`}
        />
      </div>

      <div className={s.grid}>
        <Card title="Configuration" icon={<Activity size={15} />}>
          <div className={s.bars}>
            {CONFIG_ROWS.map(({ key, label, goodWhen, note }) => {
              const value = data.config[key];
              const healthy = value === goodWhen;
              return (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    padding: '8px 0',
                  }}
                >
                  {healthy ? (
                    <CheckCircle2 size={16} color="var(--success-green)" />
                  ) : (
                    <XCircle size={16} color="var(--warning)" />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                      {label}{' '}
                      <Pill tone={healthy ? 'good' : 'warn'}>
                        {value ? 'on' : 'off'}
                      </Pill>
                    </div>
                    <div className={s.metricHint}>{note}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Send a test" icon={<Send size={15} />}>
          <p className={s.metricHint} style={{ marginTop: 0 }}>
            Delivers a real notification to <strong>your own account</strong>.
            There is deliberately no way to target another learner — policy,
            quiet hours and caps all apply exactly as they would in production.
          </p>
          <button
            onClick={() => void sendTest()}
            disabled={testing}
            style={{
              marginTop: 12,
              padding: '10px 18px',
              borderRadius: 10,
              border: 'none',
              background: 'var(--brand-blue)',
              color: 'var(--text-on-blue)',
              fontSize: 14,
              fontWeight: 600,
              cursor: testing ? 'wait' : 'pointer',
            }}
          >
            {testing ? 'Sending…' : 'Send test push'}
          </button>
          {testResult && (
            <p style={{ marginTop: 12, fontSize: 13 }}>{testResult}</p>
          )}
        </Card>
      </div>

      <Card title="Recent errors">
        {data.recentErrors.length === 0 ? (
          <Empty>No errors recorded.</Empty>
        ) : (
          <DataTable columns={['When', 'Rule', 'Error']}>
            {data.recentErrors.map((e) => (
              <tr key={e.id}>
                <td className={s.mono}>{relativeTime(e.updatedAt)}</td>
                <td>{humanize(e.ruleId)}</td>
                <td className={s.mono}>{e.lastError}</td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>
    </>
  );
}
