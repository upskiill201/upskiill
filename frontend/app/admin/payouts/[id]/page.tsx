'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mutate } from 'swr';
import {
  ArrowLeft,
  Ban,
  CheckCircle2,
  Eye,
  Search,
  Wallet,
  XCircle,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
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
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';

interface PayoutDetail {
  payout: {
    id: string;
    publicId: string;
    amountMinor: number;
    currency: string;
    status: string;
    methodSnapshot: { type?: string; maskedDisplay?: string; holderName?: string } | null;
    requestedAt: string;
    reviewedAt: string | null;
    processedAt: string | null;
    paidAt: string | null;
    closedAt: string | null;
    reviewedBy: string | null;
    rejectionReason: string | null;
    failureReason: string | null;
    cancelReason: string | null;
    adminNote: string | null;
    externalReference: string | null;
  };
  creator: { id: string; fullName: string; email: string; avatarUrl: string | null } | null;
  auditHistory: {
    id: string;
    actorId: string;
    action: string;
    reason: string | null;
    createdAt: string;
  }[];
}

type ActionDialog = 'review' | 'approve' | 'reject' | 'markPaid' | 'fail' | 'cancel' | null;

const money = (minor: number) =>
  `$${(minor / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function statusTone(status: string) {
  if (status === 'PAID') return 'good' as const;
  if (status === 'REJECTED' || status === 'FAILED' || status === 'CANCELLED') return 'bad' as const;
  if (status === 'PROCESSING' || status === 'UNDER_REVIEW') return 'brand' as const;
  return 'warn' as const;
}

export default function AdminPayoutDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const key = `/api/admin/payouts/${params.id}`;
  const { data, error, isLoading } = useAdminData<PayoutDetail>(key);

  const [dialog, setDialog] = useState<ActionDialog>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<{
    holderName: string | null;
    type: string;
    details: Record<string, string>;
  } | null>(null);
  const [revealing, setRevealing] = useState(false);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="Payout" />
        <Loading />
      </>
    );
  }

  const { payout, creator, auditHistory } = data;

  const closeDialog = () => {
    setDialog(null);
    setActionError(null);
  };

  const handleError = (err: unknown) => {
    const e = err as Error & { status?: number };
    setActionError(
      e.status === 400 || e.status === 409
        ? e.message
        : "We couldn't update this payout. Please try again.",
    );
  };

  const runAction = async (path: string, body?: Record<string, unknown>) => {
    setBusy(true);
    setActionError(null);
    try {
      await adminMutate(`/api/admin/payouts/${payout.id}/${path}`, {
        method: 'POST',
        body,
      });
      await mutate(key);
      setDialog(null);
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(false);
    }
  };

  const reveal = async () => {
    setRevealing(true);
    try {
      const result = await adminMutate<{
        holderName: string | null;
        type: string;
        details: Record<string, string>;
      }>(`/api/admin/payouts/${payout.id}/reveal-method`, { method: 'POST' });
      setRevealed(result);
    } catch {
      setActionError("We couldn't reveal the payout method. This creator may have no method on file.");
    } finally {
      setRevealing(false);
    }
  };

  const ErrorBlock = () =>
    actionError ? (
      <div style={{ color: 'var(--error-red)', marginTop: 8, fontWeight: 600 }}>
        {actionError}
      </div>
    ) : null;

  const canReview = payout.status === 'REQUESTED';
  const canApprove = payout.status === 'REQUESTED' || payout.status === 'UNDER_REVIEW';
  const canReject = payout.status === 'REQUESTED' || payout.status === 'UNDER_REVIEW';
  const canCancel = payout.status === 'REQUESTED' || payout.status === 'UNDER_REVIEW';
  const canMarkPaid = payout.status === 'PROCESSING';
  const canFail = payout.status === 'PROCESSING';

  return (
    <>
      <button
        onClick={() => router.push('/admin/payouts')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          padding: 0,
          marginBottom: 16,
        }}
      >
        <ArrowLeft size={14} /> Back to Payouts
      </button>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
              fontSize: 22,
              fontWeight: 800,
              margin: 0,
            }}
          >
            {payout.publicId}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
            <Pill tone={statusTone(payout.status)}>{humanize(payout.status)}</Pill>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Requested {relativeTime(payout.requestedAt)}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {canReview && (
            <Button variant="secondary" onClick={() => setDialog('review')} disabled={busy}>
              Start review
            </Button>
          )}
          {canApprove && (
            <Button onClick={() => setDialog('approve')} disabled={busy}>
              <CheckCircle2 size={15} /> Approve
            </Button>
          )}
          {canReject && (
            <Button variant="secondary" onClick={() => setDialog('reject')} disabled={busy}>
              <XCircle size={15} /> Reject
            </Button>
          )}
          {canMarkPaid && (
            <Button onClick={() => setDialog('markPaid')} disabled={busy}>
              <Wallet size={15} /> Mark paid
            </Button>
          )}
          {canFail && (
            <Button variant="danger" onClick={() => setDialog('fail')} disabled={busy}>
              Mark failed
            </Button>
          )}
          {canCancel && (
            <Button variant="danger" onClick={() => setDialog('cancel')} disabled={busy}>
              <Ban size={15} /> Cancel
            </Button>
          )}
        </div>
      </div>

      <div className={s.grid}>
        <Metric label="Amount" value={money(payout.amountMinor)} />
        <Metric label="Currency" value={payout.currency} />
        <Metric label="Reviewed by" value={payout.reviewedBy ?? '—'} />
        <Metric label="Reference" value={payout.externalReference ?? '—'} />
      </div>

      <div className={s.grid}>
        <Card title="Creator">
          {creator ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar src={creator.avatarUrl ?? undefined} name={creator.fullName} size="sm" />
              <div>
                <div style={{ fontWeight: 700 }}>
                  <Link href={`/admin/creators/${creator.id}`}>{creator.fullName}</Link>
                </div>
                <div className={s.mono}>{creator.email}</div>
              </div>
            </div>
          ) : (
            <Empty>Creator not found.</Empty>
          )}
        </Card>

        <Card title="Payout method" icon={<Eye size={15} />}>
          <div className={s.bars}>
            <DetailRow label="Type" value={payout.methodSnapshot?.type ?? '—'} />
            <DetailRow label="Display" value={payout.methodSnapshot?.maskedDisplay ?? '—'} />
            <DetailRow label="Holder" value={payout.methodSnapshot?.holderName ?? '—'} />
          </div>
          {revealed ? (
            <div style={{ marginTop: 12, fontSize: 13 }}>
              {Object.entries(revealed.details).map(([k, v]) => (
                <DetailRow key={k} label={humanize(k)} value={String(v)} />
              ))}
            </div>
          ) : (
            <div style={{ marginTop: 12 }}>
              <Button variant="secondary" size="sm" onClick={() => void reveal()} disabled={revealing}>
                <Search size={13} /> {revealing ? 'Revealing…' : 'Reveal full details'}
              </Button>
            </div>
          )}
        </Card>
      </div>

      {(payout.rejectionReason || payout.failureReason || payout.cancelReason || payout.adminNote) && (
        <Card title="Notes">
          <div className={s.bars}>
            <DetailRow label="Rejection reason" value={payout.rejectionReason ?? '—'} />
            <DetailRow label="Failure reason" value={payout.failureReason ?? '—'} />
            <DetailRow label="Cancel reason" value={payout.cancelReason ?? '—'} />
            <DetailRow label="Admin note" value={payout.adminNote ?? '—'} />
          </div>
        </Card>
      )}

      <Card title="Administrative history">
        {auditHistory.length === 0 ? (
          <Empty>No admin actions recorded on this payout.</Empty>
        ) : (
          <DataTable columns={['When', 'Action', 'Reason', 'Admin']}>
            {auditHistory.map((h) => (
              <tr key={h.id}>
                <td className={s.mono} title={h.createdAt}>
                  {relativeTime(h.createdAt)}
                </td>
                <td>{humanize(h.action)}</td>
                <td>{h.reason || '—'}</td>
                <td className={s.mono}>{h.actorId}</td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      {dialog === 'review' && (
        <ConfirmDialog
          title="Start reviewing this payout?"
          description={<>Moves the payout to Under review. No money moves yet.<ErrorBlock /></>}
          confirmLabel="Start review"
          busy={busy}
          onConfirm={() => void runAction('review')}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'approve' && (
        <ConfirmDialog
          title="Approve this payout?"
          description={
            <>
              Moves <strong>{payout.publicId}</strong> to Processing — the payout should
              then be sent externally and marked paid once confirmed.
              <ErrorBlock />
            </>
          }
          confirmLabel="Approve"
          busy={busy}
          onConfirm={() => void runAction('approve')}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'reject' && (
        <ConfirmDialog
          title="Reject this payout?"
          description={<>The creator&apos;s requested balance becomes available again.<ErrorBlock /></>}
          confirmLabel="Reject payout"
          tone="danger"
          requireReason
          busy={busy}
          onConfirm={(reason) => reason && void runAction('reject', { reason })}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'markPaid' && (
        <ConfirmDialog
          title="Mark this payout as paid?"
          description={
            <>
              Only confirm this after the money has actually been sent and confirmed —
              this is not reversible through the app.
              <ErrorBlock />
            </>
          }
          confirmLabel="Mark paid"
          busy={busy}
          onConfirm={() => void runAction('mark-paid')}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'fail' && (
        <ConfirmDialog
          title="Mark this payout as failed?"
          description={<>The creator&apos;s balance is not deducted — funds remain available to retry.<ErrorBlock /></>}
          confirmLabel="Mark failed"
          tone="danger"
          requireReason
          busy={busy}
          onConfirm={(reason) => reason && void runAction('fail', { reason })}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'cancel' && (
        <ConfirmDialog
          title="Cancel this payout request?"
          description={<>The creator&apos;s requested balance becomes available again.<ErrorBlock /></>}
          confirmLabel="Cancel payout"
          tone="danger"
          requireReason
          busy={busy}
          onConfirm={(reason) => reason && void runAction('cancel', { reason })}
          onCancel={closeDialog}
        />
      )}
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  );
}
