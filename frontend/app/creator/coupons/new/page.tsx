'use client';

/**
 * Creator Studio → Coupons → Create. All financial/eligibility validation is
 * re-enforced server-side (max discount %, ownership, code format) — this
 * form's client-side checks are only for immediate feedback, never the
 * source of truth.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Shuffle } from 'lucide-react';
import type { AccessPlan, CouponDiscountType } from '@/components/creator/coupons/shared';
import styles from '@/components/creator/coupons/coupons.module.css';

interface MyCourse {
  id: string;
  title: string;
  price: number;
}

const PLANS: { key: AccessPlan; label: string }[] = [
  { key: 'WEEKLY', label: 'Weekly' },
  { key: 'MONTHLY', label: 'Monthly' },
  { key: 'YEARLY', label: 'Yearly' },
];

function randomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default function NewCouponPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<MyCourse[] | null>(null);
  const [coursesError, setCoursesError] = useState<string | null>(null);

  const [code, setCode] = useState('');
  const [internalName, setInternalName] = useState('');
  const [discountType, setDiscountType] = useState<CouponDiscountType>('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState('20');
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const [plans, setPlans] = useState<AccessPlan[]>(['MONTHLY', 'YEARLY']);
  const [scheduleLater, setScheduleLater] = useState(false);
  const [startsAt, setStartsAt] = useState('');
  const [hasExpiry, setHasExpiry] = useState(false);
  const [expiresAt, setExpiresAt] = useState('');
  const [hasLimit, setHasLimit] = useState(false);
  const [maxRedemptions, setMaxRedemptions] = useState('100');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/courses/instructor/me', { credentials: 'include' });
        if (!res.ok) throw new Error('Could not load your courses');
        const data: unknown = await res.json();
        type RawCourse = { id: string; title: string; price: number };
        const raw: RawCourse[] = Array.isArray(data)
          ? (data as RawCourse[])
          : ((data as { courses?: RawCourse[] })?.courses ?? []);
        setCourses(raw.map((c) => ({ id: c.id, title: c.title, price: c.price })));
      } catch (e) {
        setCoursesError(e instanceof Error ? e.message : 'Something went wrong');
      }
    })();
  }, []);

  const togglePlan = (plan: AccessPlan) => {
    setPlans((prev) => (prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan]));
  };

  const toggleCourse = (id: string) => {
    setCourseIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const submit = async () => {
    setError(null);
    if (!code.trim()) return setError('Enter a coupon code');
    if (courseIds.length === 0) return setError('Select at least one course');
    if (plans.length === 0) return setError('Select at least one plan');
    if (!discountValue || Number(discountValue) <= 0) return setError('Enter a discount value');

    setSubmitting(true);
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim(),
          internalName: internalName.trim() || undefined,
          discountType,
          discountValue: Number(discountValue),
          courseIds,
          plans,
          startsAt: scheduleLater && startsAt ? new Date(startsAt).toISOString() : undefined,
          expiresAt: hasExpiry && expiresAt ? new Date(expiresAt).toISOString() : null,
          maxRedemptions: hasLimit ? Number(maxRedemptions) : null,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Could not create coupon (${res.status})`);
      }
      const created = await res.json();
      router.push(`/creator/coupons/${created.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <button className={styles.backLink} onClick={() => router.push('/creator/coupons')}>
        <ArrowLeft size={14} />
        Back to Coupons
      </button>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Create Coupon</h1>
          <p className={styles.subtitle}>Set up a promotional code for one or more of your courses.</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.formGrid}>
          {error && <div className={styles.errorText}>{error}</div>}

          <div className={styles.field}>
            <label className={styles.label}>Coupon code</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className={styles.input}
                style={{ flex: 1, textTransform: 'uppercase' }}
                placeholder="SAVE20"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                maxLength={32}
              />
              <button type="button" className={styles.secondaryBtn} onClick={() => setCode(randomCode())}>
                <Shuffle size={13} />
                Generate
              </button>
            </div>
            <span className={styles.hint}>Letters, numbers, and hyphens only. Not case-sensitive.</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Internal name (optional)</label>
            <input
              className={styles.input}
              placeholder="September Launch Campaign"
              value={internalName}
              onChange={(e) => setInternalName(e.target.value)}
            />
            <span className={styles.hint}>Only visible to you — students never see this.</span>
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Discount type</label>
              <select
                className={styles.select}
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as CouponDiscountType)}
              >
                <option value="PERCENTAGE">Percentage off</option>
                <option value="FIXED_AMOUNT">Fixed amount off</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                {discountType === 'PERCENTAGE' ? 'Discount (%)' : 'Discount ($)'}
              </label>
              <input
                className={styles.input}
                type="number"
                min={0}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Eligible courses</label>
            {coursesError && <div className={styles.errorText}>{coursesError}</div>}
            {!coursesError && !courses && <span className={styles.hint}>Loading your courses…</span>}
            {courses && courses.length === 0 && (
              <span className={styles.hint}>You don&apos;t have any courses yet.</span>
            )}
            {courses && courses.length > 0 && (
              <div className={styles.courseList}>
                {courses.map((c) => (
                  <label key={c.id} className={styles.courseItem}>
                    <input
                      type="checkbox"
                      checked={courseIds.includes(c.id)}
                      onChange={() => toggleCourse(c.id)}
                    />
                    {c.title}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Eligible unlocking plans</label>
            <div className={styles.checkboxGroup}>
              {PLANS.map((p) => (
                <label key={p.key} className={styles.checkboxRow}>
                  <input type="checkbox" checked={plans.includes(p.key)} onChange={() => togglePlan(p.key)} />
                  {p.label}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Start</label>
              <div className={styles.checkboxRow}>
                <input type="checkbox" checked={scheduleLater} onChange={(e) => setScheduleLater(e.target.checked)} />
                Schedule for later
              </div>
              {scheduleLater && (
                <input
                  className={styles.input}
                  type="datetime-local"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                />
              )}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Expiration</label>
              <div className={styles.checkboxRow}>
                <input type="checkbox" checked={hasExpiry} onChange={(e) => setHasExpiry(e.target.checked)} />
                Set expiration date
              </div>
              {hasExpiry && (
                <input
                  className={styles.input}
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                />
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Usage limit</label>
            <div className={styles.checkboxRow}>
              <input type="checkbox" checked={hasLimit} onChange={(e) => setHasLimit(e.target.checked)} />
              Limit total redemptions
            </div>
            {hasLimit && (
              <input
                className={styles.input}
                type="number"
                min={1}
                style={{ maxWidth: 160 }}
                value={maxRedemptions}
                onChange={(e) => setMaxRedemptions(e.target.value)}
              />
            )}
          </div>

          <div>
            <button className={styles.primaryBtn} disabled={submitting} onClick={() => void submit()}>
              {submitting ? 'Creating…' : 'Create Coupon'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
