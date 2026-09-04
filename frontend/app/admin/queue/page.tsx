'use client';

import { useState } from 'react';
import { mutate } from 'swr';
import {
  DataTable,
  Empty,
  ErrorState,
  Loading,
  PageHeader,
  Pill,
  adminStyles as s,
  humanize,
  relativeTime,
  statusTone,
  useAdminData,
} from '@/components/admin/AdminUI';

interface QueueItem {
  id: string;
  userId: string;
  ruleId: string;
  priority: string;
  status: string;
  dueAt: string;
  expiresAt: string | null;
  attempts: number;
  lastError: string | null;
  skipReason: string | null;
}

const STATUSES = ['PENDING', 'CLAIMED', 'FAILED', 'SKIPPED'];

export default function AdminQueuePage() {
  const [status, setStatus] = useState('PENDING');
  const url = `/api/tey/admin/queue?status=${status}`;
  const { data, error, isLoading } = useAdminData<{ items: QueueItem[] }>(url);
  const [cancelling, setCancelling] = useState<string | null>(null);

  if (error) return <ErrorState error={error as Error} />;

  const cancel = async (id: string) => {
    setCancelling(id);
    try {
      await fetch(`/api/tey/admin/queue/${id}/cancel`, {
        method: 'POST',
        credentials: 'include',
      });
      await mutate(url);
    } finally {
      setCancelling(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Queue"
        subtitle="Scheduled actions waiting on the tick. Cancelling one is safe — the learner simply is not nudged for that reason today."
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {STATUSES.map((sv) => (
          <button
            key={sv}
            onClick={() => setStatus(sv)}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid var(--border)',
              background:
                status === sv ? 'var(--light-blue-bg)' : 'var(--bg-card)',
              color:
                status === sv ? 'var(--brand-blue)' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: status === sv ? 600 : 500,
              cursor: 'pointer',
            }}
          >
            {humanize(sv)}
          </button>
        ))}
      </div>

      {isLoading || !data ? (
        <Loading />
      ) : data.items.length === 0 ? (
        <Empty>Nothing {humanize(status).toLowerCase()}.</Empty>
      ) : (
        <DataTable
          columns={['Due', 'Rule', 'Status', 'Attempts', 'Detail', '']}
        >
          {data.items.map((a) => {
            const overdue =
              a.status === 'PENDING' && new Date(a.dueAt).getTime() < Date.now();
            return (
              <tr key={a.id}>
                <td className={s.mono} title={a.dueAt}>
                  {relativeTime(a.dueAt)}
                  {/* Overdue-and-pending is the signal that the tick is not
                      running — most often a spun-down instance. */}
                  {overdue && (
                    <div>
                      <Pill tone="warn">overdue</Pill>
                    </div>
                  )}
                </td>
                <td>{humanize(a.ruleId)}</td>
                <td>
                  <Pill tone={statusTone(a.status)}>{humanize(a.status)}</Pill>
                </td>
                <td className={s.mono}>{a.attempts}</td>
                <td style={{ maxWidth: 320 }} className={s.mono}>
                  {a.lastError || (a.skipReason ? humanize(a.skipReason) : '—')}
                </td>
                <td>
                  {a.status === 'PENDING' && (
                    <button
                      onClick={() => void cancel(a.id)}
                      disabled={cancelling === a.id}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 10,
                        border: '1px solid var(--border)',
                        background: 'var(--bg-card)',
                        color: 'var(--error-red)',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {cancelling === a.id ? '…' : 'Cancel'}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </DataTable>
      )}
    </>
  );
}
