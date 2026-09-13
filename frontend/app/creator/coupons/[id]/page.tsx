'use client';

/**
 * Creator Studio → Coupons → Detail. Shows config, redemption history, and
 * analytics. Once a coupon has any redemption, discount/eligibility fields
 * are locked (backend-enforced — this UI just reflects that, it doesn't
 * invent the rule) and only pause/resume/archive remain available.
 */

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Pause, Play, Archive, Trash2 } from 'lucide-react';
import { ErrorState, RowsSkeleton } from '@/components/creator/analytics/bits';
import {
  type CouponDetail,
  discountLabel,
  STATUS_LABEL,
  STATUS_PILL_CLASS,
  usd,
} from '@/components/creator/coupons/shared';
import styles from '@/components/creator/coupons/coupons.module.css';

export default function CouponDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [coupon, setCoupon] = useState<CouponDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/coupons/${params.id}`, { credentials: 'include' });
      if (!res.ok) throw new Error(`Could not load this coupon (${res.status})`);
      setCoupon(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const runAction = async (action: 'pause' | 'resume' | 'archive' | 'delete') => {
    setActionError(null);
    setBusy(true);
    try {
      const res = await fetch(
        action === 'delete' ? `/api/coupons/${params.id}` : `/api/coupons/${params.id}/${action}`,
        { method: action === 'delete' ? 'DELETE' : 'POST', credentials: 'include' },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'That action failed');
      }
      if (action === 'delete') {
        router.push('/creator/coupons');
      } else {
        await load();
      }
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  if (loading && !coupon) {
    return (
      <div className={styles.page}>
        <RowsSkeleton count={4} />
      </div>
    );
  }

  if (error || !coupon) {
    return (
      <div className={styles.page}>
        <ErrorState message={error ?? 'Coupon not found'} onRetry={() => void load()} />
      </div>
    );
  }

  const locked = coupon.successfulRedemptions > 0;
  const status = coupon.derivedStatus;

  return (
    <div className={styles.page}>
      <button className={styles.backLink} onClick={() => router.push('/creator/coupons')}>
        <ArrowLeft size={14} />
        Back to Coupons
      </button>

      <div className={styles.headRow}>
        <div>
          <h1 className={styles.title} style={{ fontFamily: 'ui-monospace, monospace' }}>
            {coupon.code}
          </h1>
          <p className={styles.subtitle}>
            {discountLabel(coupon)} · {coupon.eligiblePlans.map((p) => p.plan).join(' + ')}
          </p>
        </div>
        <span className={`${styles.pill} ${styles[STATUS_PILL_CLASS[status]]}`}>{STATUS_LABEL[status]}</span>
      </div>

      {actionError && <div className={styles.errorText}>{actionError}</div>}

      <div className={styles.statGrid}>
        <div className={styles.statCard}>
          <div className={styles.statCardLabel}>Redemptions</div>
          <div className={styles.statCardValue}>
            {coupon.successfulRedemptions}
            {coupon.maxRedemptions ? ` / ${coupon.maxRedemptions}` : ''}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardLabel}>Gross value</div>
          <div className={styles.statCardValue}>{usd(coupon.analytics.grossUsd)}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardLabel}>Discount given</div>
          <div className={styles.statCardValue}>{usd(coupon.analytics.discountUsd)}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardLabel}>Your earnings</div>
          <div className={styles.statCardValue}>{usd(coupon.analytics.creatorEarningsUsd)}</div>
        </div>
      </div>

      {locked && (
        <div className={styles.lockedNote} style={{ marginBottom: 16 }}>
          This coupon has been redeemed, so its discount and eligibility are locked to keep reporting
          accurate. You can still pause, resume, or archive it.
        </div>
      )}

      <div className={styles.card} style={{ marginBottom: 20 }}>
        <div className={styles.formGrid}>
          <div className={styles.row2}>
            <div className={styles.field}>
              <span className={styles.label}>Eligible courses</span>
              <span className={styles.hint}>
                {coupon.eligibleCourses.map((c) => c.course?.title ?? c.courseId).join(', ')}
              </span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Expires</span>
              <span className={styles.hint}>
                {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : 'No expiration'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {status !== 'DISABLED' && status !== 'ARCHIVED' && (
              <>
                {status === 'PAUSED' ? (
                  <button className={styles.secondaryBtn} disabled={busy} onClick={() => void runAction('resume')}>
                    <Play size={14} />
                    Resume
                  </button>
                ) : (
                  <button className={styles.secondaryBtn} disabled={busy} onClick={() => void runAction('pause')}>
                    <Pause size={14} />
                    Pause
                  </button>
                )}
                <button className={styles.secondaryBtn} disabled={busy} onClick={() => void runAction('archive')}>
                  <Archive size={14} />
                  Archive
                </button>
              </>
            )}
            {!locked && status !== 'DISABLED' && (
              <button className={styles.dangerBtn} disabled={busy} onClick={() => void runAction('delete')}>
                <Trash2 size={14} />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 800, color: '#0F172A' }}>
          Redemption history
        </h3>
        {coupon.redemptions.length === 0 ? (
          <span className={styles.hint}>No redemptions yet.</span>
        ) : (
          coupon.redemptions.map((r) => (
            <div key={r.id} className={styles.redemptionRow}>
              <span>
                {r.plan} · {new Date(r.createdAt).toLocaleDateString()}
                {r.outcome === 'REFUNDED' && (
                  <span style={{ color: '#DC2626', fontWeight: 700 }}> · Refunded</span>
                )}
              </span>
              <span>
                {usd(r.originalPriceUsd)} → {usd(r.finalPriceUsd)} (−{usd(r.discountAmountUsd)})
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
