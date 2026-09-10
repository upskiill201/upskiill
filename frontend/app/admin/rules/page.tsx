'use client';

import { useState } from 'react';
import { Ban, Eye, Sparkles } from 'lucide-react';
import {
  BarList,
  Card,
  DataTable,
  ErrorState,
  Loading,
  PageHeader,
  Pill,
  adminStyles as s,
  humanize,
  useAdminData,
} from '@/components/admin/AdminUI';

interface RuleRow {
  id: string;
  priority: string;
  cooldownHours: number;
  supersedes: string[];
  scheduled: number;
  byStatus: Record<string, number>;
  sent: number;
  suppressed: number;
  opened: number;
  openRate: number;
}

interface RulesResponse {
  windowDays: number;
  rules: RuleRow[];
}

interface Suppressions {
  windowDays: number;
  reasons: { reason: string; count: number }[];
}

interface Preview {
  title: string;
  body: string;
}

const TONES = [
  'URGENT_PLAYFUL',
  'PLAYFUL_PASSIVE_AGGRESSIVE',
  'ENCOURAGING',
  'WARM_WELCOME',
  'CELEBRATORY',
  'NEUTRAL',
];

const priorityTone = (p: string) =>
  p === 'CRITICAL' ? 'bad' : p === 'HIGH' ? 'warn' : 'neutral';

export default function AdminRulesPage() {
  const { data, error, isLoading } = useAdminData<RulesResponse>(
    '/api/tey/admin/rules',
  );
  const { data: suppressions } = useAdminData<Suppressions>(
    '/api/tey/admin/suppressions',
  );

  const [reason, setReason] = useState('STREAK_AT_RISK');
  const [tone, setTone] = useState('URGENT_PLAYFUL');
  const { data: preview } = useAdminData<Preview>(
    `/api/tey/admin/preview?reason=${reason}&tone=${tone}`,
  );

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="Rules" />
        <Loading />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Rules"
        subtitle={`Per-rule funnel over the last ${data.windowDays} days`}
      />

      <div className={s.tableWrap} style={{ marginBottom: 24 }}>
        <DataTable
          columns={[
            'Rule',
            'Priority',
            'Cooldown',
            'Scheduled',
            'Sent',
            'Suppressed',
            'Opened',
            'Open rate',
          ]}
        >
          {data.rules.map((r) => (
            <tr key={r.id}>
              <td>
                <strong>{humanize(r.id)}</strong>
                {r.supersedes.length > 0 && (
                  <div className={s.mono}>
                    supersedes {r.supersedes.map(humanize).join(', ')}
                  </div>
                )}
              </td>
              <td>
                <Pill tone={priorityTone(r.priority)}>{r.priority}</Pill>
              </td>
              <td className={s.mono}>{r.cooldownHours}h</td>
              <td>{r.scheduled.toLocaleString()}</td>
              <td>{r.sent.toLocaleString()}</td>
              <td>{r.suppressed.toLocaleString()}</td>
              <td>{r.opened.toLocaleString()}</td>
              <td>
                {/* Open rate is meaningless on a handful of sends; say so
                    rather than printing a confident 0% or 100%. */}
                {r.sent >= 10 ? (
                  <Pill tone={r.openRate >= 20 ? 'good' : 'neutral'}>
                    {r.openRate}%
                  </Pill>
                ) : (
                  <span className={s.mono}>too few</span>
                )}
              </td>
            </tr>
          ))}
        </DataTable>
      </div>

      <div className={s.grid}>
        <Card title="Why nudges were held back" icon={<Ban size={15} />}>
          {/* The more useful half of the picture: knowing 120 were suppressed
              only helps if you can see which policy did it. */}
          <BarList
            data={Object.fromEntries(
              (suppressions?.reasons ?? []).map((r) => [r.reason, r.count]),
            )}
            variant="warn"
            emptyLabel="Nothing suppressed recently"
          />
        </Card>

        <Card title="Copy preview" icon={<Eye size={15} />}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={s.mono}
              style={selectStyle}
            >
              {data.rules.map((r) => (
                <option key={r.id} value={r.id}>
                  {humanize(r.id)}
                </option>
              ))}
            </select>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className={s.mono}
              style={selectStyle}
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {humanize(t)}
                </option>
              ))}
            </select>
          </div>

          {/* Renders the real template path — no send, no learner involved. */}
          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: 16,
              background: 'var(--bg-section)',
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Sparkles size={14} color="var(--brand-blue)" />
              <strong style={{ fontSize: 14 }}>
                {preview?.title ?? '…'}
              </strong>
            </div>
            <p
              style={{
                margin: '6px 0 0',
                fontSize: 13,
                color: 'var(--text-secondary)',
              }}
            >
              {preview?.body ?? ''}
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}

const selectStyle: React.CSSProperties = {
  flex: 1,
  padding: '8px 10px',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: 'var(--bg-card)',
  color: 'var(--text-primary)',
  fontSize: 13,
};
