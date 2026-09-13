'use client';

/**
 * Creator Studio → Coupons. List of the creator's promotional codes, each
 * showing discount, eligible courses/plans, usage, and status at a glance.
 * Backend is the sole source of truth for status/analytics — this page never
 * derives them itself (see CouponsService.deriveCouponStatus on the backend).
 */

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tag, Plus } from 'lucide-react';
import { EmptyState, ErrorState, RowsSkeleton } from '@/components/creator/analytics/bits';
import {
  type Coupon,
  discountLabel,
  STATUS_LABEL,
  STATUS_PILL_CLASS,
} from '@/components/creator/coupons/shared';
import styles from '@/components/creator/coupons/coupons.module.css';

export default function CouponsListPage() {
  const router = useRouter();
  const [coupons, setCoupons] = useState<Coupon[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/coupons', { credentials: 'include' });
      if (!res.ok) throw new Error(`Could not load coupons (${res.status})`);
      const data = await res.json();
      setCoupons(data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerIconWrap}>
          <Tag size={24} />
        </div>
        <div>
          <h1 className={styles.title}>Coupons & Discounts</h1>
          <p className={styles.subtitle}>
            Create promotional codes to offer discounts and grow your course enrollments.
          </p>
        </div>
      </div>

      <div className={styles.headRow}>
        <div />
        <button className={styles.primaryBtn} onClick={() => router.push('/creator/coupons/new')}>
          <Plus size={16} />
          Create Coupon
        </button>
      </div>

      {loading && coupons === null && <RowsSkeleton count={4} />}

      {error && <ErrorState message={error} onRetry={() => void load()} />}

      {!loading && !error && coupons && coupons.length === 0 && (
        <EmptyState
          icon={<Tag size={30} />}
          title="No coupons yet"
          body="Create your first promo code to offer a discount on one of your courses."
        />
      )}

      {!error && coupons && coupons.length > 0 && (
        <div className={styles.listGrid}>
          {coupons.map((c) => (
            <div
              key={c.id}
              className={styles.couponRow}
              onClick={() => router.push(`/creator/coupons/${c.id}`)}
            >
              <div className={styles.couponMain}>
                <span className={styles.couponCode}>{c.code}</span>
                <span className={styles.couponMeta}>
                  <span>{discountLabel(c)}</span>
                  <span>
                    {c.eligibleCourses.length} course{c.eligibleCourses.length === 1 ? '' : 's'}
                  </span>
                  <span>{c.eligiblePlans.map((p) => p.plan.charAt(0) + p.plan.slice(1).toLowerCase()).join(' + ')}</span>
                  {c.expiresAt && <span>Expires {new Date(c.expiresAt).toLocaleDateString()}</span>}
                </span>
              </div>
              <div className={styles.couponStats}>
                <div className={styles.statCol}>
                  <div className={styles.statLabel}>Uses</div>
                  <div className={styles.statValue}>
                    {c.successfulRedemptions}
                    {c.maxRedemptions ? ` / ${c.maxRedemptions}` : ''}
                  </div>
                </div>
                <span className={`${styles.pill} ${styles[STATUS_PILL_CLASS[c.derivedStatus]]}`}>
                  {STATUS_LABEL[c.derivedStatus]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
