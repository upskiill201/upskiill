'use client';

import { useState } from 'react';
import {
  DataTable,
  ErrorState,
  Empty,
  Loading,
  PageHeader,
  Pill,
  adminStyles as s,
  humanize,
  relativeTime,
  statusTone,
  useAdminData,
} from '@/components/admin/AdminUI';

interface Delivery {
  id: string;
  ruleId: string;
  channel: string;
  priority: string;
  status: string;
  title: string;
  body: string;
  deepLink: string;
  generatedBy: string;
  sentAt: string;
  openedAt: string | null;
  userId: string;
}

interface DeliveriesResponse {
  total: number;
  page: number;
  pageSize: number;
  items: Delivery[];
}

const STATUSES = ['', 'SENT', 'SUPPRESSED', 'FAILED'];

export default function AdminDeliveriesPage() {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const query = new URLSearchParams({ page: String(page) });
  if (status) query.set('status', status);

  const { data, error, isLoading } = useAdminData<DeliveriesResponse>(
    `/api/tey/admin/deliveries?${query}`,
  );

  if (error) return <ErrorState error={error as Error} />;

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <>
      <PageHeader
        title="Deliveries"
        subtitle="Every nudge Tey composed, including the ones policy held back"
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {STATUSES.map((sv) => (
          <button
            key={sv || 'all'}
            onClick={() => {
              setStatus(sv);
              setPage(1);
            }}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid var(--border)',
              background:
                status === sv ? 'var(--light-blue-bg)' : 'var(--bg-card)',
              color: status === sv ? 'var(--brand-blue)' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: status === sv ? 600 : 500,
              cursor: 'pointer',
            }}
          >
            {sv ? humanize(sv) : 'All'}
          </button>
        ))}
      </div>

      {isLoading || !data ? (
        <Loading />
      ) : data.items.length === 0 ? (
        <Empty>No deliveries recorded yet.</Empty>
      ) : (
        <>
          <DataTable
            columns={['When', 'Rule', 'Status', 'Message', 'Channel', 'Source']}
          >
            {data.items.map((d) => (
              <tr key={d.id}>
                <td className={s.mono} title={d.sentAt}>
                  {relativeTime(d.sentAt)}
                  {d.openedAt && (
                    <div>
                      <Pill tone="good">opened</Pill>
                    </div>
                  )}
                </td>
                <td>{humanize(d.ruleId)}</td>
                <td>
                  <Pill tone={statusTone(d.status)}>{humanize(d.status)}</Pill>
                </td>
                <td style={{ maxWidth: 360 }}>
                  {/* A suppressed row has no rendered copy — it never got that
                      far — so say so rather than showing two empty cells. */}
                  {d.title ? (
                    <>
                      <strong>{d.title}</strong>
                      <div className={s.mono}>{d.body}</div>
                    </>
                  ) : (
                    <span className={s.mono}>held before rendering</span>
                  )}
                </td>
                <td className={s.mono}>{d.channel}</td>
                <td>
                  <Pill tone={d.generatedBy === 'AI' ? 'brand' : 'neutral'}>
                    {d.generatedBy}
                  </Pill>
                </td>
              </tr>
            ))}
          </DataTable>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 16,
              fontSize: 13,
              color: 'var(--text-secondary)',
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              style={pagerStyle(page <= 1)}
            >
              Previous
            </button>
            <span>
              Page {data.page} of {totalPages} · {data.total.toLocaleString()} total
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              style={pagerStyle(page >= totalPages)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

const pagerStyle = (disabled: boolean): React.CSSProperties => ({
  padding: '6px 14px',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: 'var(--bg-card)',
  color: disabled ? 'var(--text-muted)' : 'var(--text-primary)',
  fontSize: 13,
  cursor: disabled ? 'not-allowed' : 'pointer',
});
