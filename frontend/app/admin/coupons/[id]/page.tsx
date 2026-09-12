'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mutate } from 'swr';
import { ArrowLeft, Ban, Archive, Pause, Play } from 'lucide-react';
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

interface CouponDetail {
  id: string;
  code: string;
  internalName: string | null;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  derivedStatus: string;
  successfulRedemptions: number;
  maxRedemptions: number | null;
  startsAt: string;
  expiresAt: string | null;
  disabledReason: string | null;
  createdAt: string;
  creator: { id: string; fullName: string; email: string };
  eligibleCourses: { course: { id: string; title: string } }[];
  eligiblePlans: { plan: string }[];
  redemptions: {
    id: string;
    publicId: string;
    studentName: string;
    courseId: string;
    plan: string;
    originalPriceUsd: number;
    discountAmountUsd: number;
    finalPriceUsd: number;
    outcome: string;
    createdAt: string;
  }[];
}

const statusTone = (status: string) => {
  if (status === 'ACTIVE') return 'good';
  if (status === 'DISABLED') return 'bad';
  if (status === 'PAUSED' || status === 'SCHEDULED') return 'warn';
  return 'neutral';
};

export default function AdminCouponDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const key = `/api/admin/coupons/${params.id}`;
  const { data: coupon, error, isLoading } = useAdminData<CouponDetail>(key);

  const [dialog, setDialog] = useState<'disable' | 'pause' | 'archive' | null>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !coupon) {
    return (
      <>
        <PageHeader title="Coupon" />
        <Loading />
      </>
    );
  }

  const runAction = async (action: 'disable' | 'pause' | 'archive', reason?: string) => {
    setBusy(true);
    setActionError(null);
    try {
      await adminMutate(`/api/admin/coupons/${coupon.id}/${action}`, {
        method: 'POST',
        body: action === 'disable' ? { reason } : undefined,
      });
      await mutate(key);
      setDialog(null);
    } catch (err) {
      const status = (err as Error & { status?: number }).status;
      setActionError(
        status === 400 ? (err as Error).message : "We couldn't update this coupon. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const canModerate = coupon.derivedStatus !== 'DISABLED' && coupon.derivedStatus !== 'ARCHIVED';

  return (
    <>
      <button
        onClick={() => router.push('/admin/coupons')}
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
          marginBottom: 12,
        }}
      >
        <ArrowLeft size={14} />
        Back to Coupons
      </button>

      <PageHeader title={coupon.code} subtitle={coupon.internalName ?? undefined} />

      {canModerate && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {coupon.derivedStatus === 'PAUSED' ? (
            <Button variant="secondary" onClick={() => void runAction('pause')}>
              <Play size={14} /> Resume
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => setDialog('pause')}>
              <Pause size={14} /> Pause
            </Button>
          )}
          <Button variant="secondary" onClick={() => setDialog('archive')}>
            <Archive size={14} /> Archive
          </Button>
          <Button variant="danger" onClick={() => setDialog('disable')}>
            <Ban size={14} /> Disable
          </Button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <Pill tone={statusTone(coupon.derivedStatus)}>{humanize(coupon.derivedStatus)}</Pill>
        <span className={s.mono}>
          {coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}% off` : `$${coupon.discountValue.toFixed(2)} off`}
        </span>
        <span className={s.mono}>{coupon.eligiblePlans.map((p) => humanize(p.plan)).join(' + ')}</span>
      </div>

      {coupon.disabledReason && (
        <Card title="Disabled reason">
          {coupon.disabledReason}
        </Card>
      )}

      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <Metric label="Creator" value={coupon.creator.fullName} />
        <Metric
          label="Redemptions"
          value={`${coupon.successfulRedemptions}${coupon.maxRedemptions ? ` / ${coupon.maxRedemptions}` : ''}`}
        />
        <Metric label="Expires" value={coupon.expiresAt ? relativeTime(coupon.expiresAt) : 'Never'} />
      </div>

      <Card title="Eligible courses">
        <p>{coupon.eligibleCourses.map((c) => c.course.title).join(', ') || '—'}</p>
      </Card>

      <Card title="Redemption history">
        {coupon.redemptions.length === 0 ? (
          <Empty>No redemptions yet.</Empty>
        ) : (
          <DataTable columns={['Student', 'Plan', 'Original', 'Discount', 'Final', 'Outcome', 'Date']}>
            {coupon.redemptions.map((r) => (
              <tr key={r.id}>
                <td>{r.studentName}</td>
                <td>{humanize(r.plan)}</td>
                <td className={s.mono}>${r.originalPriceUsd.toFixed(2)}</td>
                <td className={s.mono}>−${r.discountAmountUsd.toFixed(2)}</td>
                <td className={s.mono}>${r.finalPriceUsd.toFixed(2)}</td>
                <td>
                  <Pill tone={r.outcome === 'REFUNDED' ? 'bad' : 'good'}>{humanize(r.outcome)}</Pill>
                </td>
                <td className={s.mono}>{relativeTime(r.createdAt)}</td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      {dialog === 'disable' && (
        <ConfirmDialog
          title="Disable this coupon?"
          description={
            <>
              <strong>{coupon.code}</strong> will stop working immediately, and the creator will not be
              able to reactivate it. Use this for fraud, abuse, or policy violations.
              {actionError && (
                <div style={{ color: 'var(--error-red)', marginTop: 8, fontWeight: 600 }}>{actionError}</div>
              )}
            </>
          }
          confirmLabel="Disable"
          tone="danger"
          requireReason
          busy={busy}
          onConfirm={(reason) => void runAction('disable', reason)}
          onCancel={() => {
            setDialog(null);
            setActionError(null);
          }}
        />
      )}

      {dialog === 'pause' && (
        <ConfirmDialog
          title="Pause this coupon?"
          description={
            <>
              Students won&apos;t be able to redeem <strong>{coupon.code}</strong> until it&apos;s resumed. The
              creator can resume it themselves.
              {actionError && (
                <div style={{ color: 'var(--error-red)', marginTop: 8, fontWeight: 600 }}>{actionError}</div>
              )}
            </>
          }
          confirmLabel="Pause"
          busy={busy}
          onConfirm={() => void runAction('pause')}
          onCancel={() => {
            setDialog(null);
            setActionError(null);
          }}
        />
      )}

      {dialog === 'archive' && (
        <ConfirmDialog
          title="Archive this coupon?"
          description={
            <>
              <strong>{coupon.code}</strong> will be permanently retired but its history stays intact for
              reporting.
              {actionError && (
                <div style={{ color: 'var(--error-red)', marginTop: 8, fontWeight: 600 }}>{actionError}</div>
              )}
            </>
          }
          confirmLabel="Archive"
          tone="danger"
          busy={busy}
          onConfirm={() => void runAction('archive')}
          onCancel={() => {
            setDialog(null);
            setActionError(null);
          }}
        />
      )}
    </>
  );
}
