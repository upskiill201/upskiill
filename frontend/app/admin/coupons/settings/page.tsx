'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Gift, Settings as SettingsIcon } from 'lucide-react';
import {
  Banner,
  Button,
  Card,
  ErrorState,
  Loading,
  PageHeader,
  adminMutate,
  useAdminData,
} from '@/components/admin/AdminUI';
import styles from './settings.module.css';

interface CouponPlatformSettings {
  id: string;
  couponsEnabled: boolean;
  maxDiscountPercent: number;
  maxActiveCouponsPerCreator: number;
  allowFixedAmountDiscounts: boolean;
  allowUnlimitedRedemptions: boolean;
  allowFreeCoupons: boolean;
  updatedAt: string;
}

type FormState = Pick<
  CouponPlatformSettings,
  | 'couponsEnabled'
  | 'maxDiscountPercent'
  | 'maxActiveCouponsPerCreator'
  | 'allowFixedAmountDiscounts'
  | 'allowUnlimitedRedemptions'
  | 'allowFreeCoupons'
>;

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={`${styles.switch} ${checked ? styles.switchOn : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.switchKnob} />
    </button>
  );
}

export default function AdminCouponSettingsPage() {
  const { data, error, isLoading, mutate } = useAdminData<CouponPlatformSettings>(
    '/api/admin/settings/coupons',
  );

  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  // Only ever seed the form from a fresh server read — never re-sync on a
  // background revalidation once the admin has started editing, or their
  // in-progress edits would get silently clobbered.
  useEffect(() => {
    if (data && !form) {
      setForm({
        couponsEnabled: data.couponsEnabled,
        maxDiscountPercent: data.maxDiscountPercent,
        maxActiveCouponsPerCreator: data.maxActiveCouponsPerCreator,
        allowFixedAmountDiscounts: data.allowFixedAmountDiscounts,
        allowUnlimitedRedemptions: data.allowUnlimitedRedemptions,
        allowFreeCoupons: data.allowFreeCoupons,
      });
    }
  }, [data, form]);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data || !form) {
    return (
      <>
        <PageHeader title="Coupon Settings" />
        <Loading />
      </>
    );
  }

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    setJustSaved(false);
  };

  const save = async () => {
    if (!form) return;
    setSaving(true);
    setSaveError(null);
    try {
      const updated = await adminMutate<CouponPlatformSettings>('/api/admin/settings/coupons', {
        method: 'PATCH',
        body: form,
      });
      await mutate(updated, { revalidate: false });
      setJustSaved(true);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Could not save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Link
        href="/admin/coupons"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          color: 'var(--text-secondary)',
          marginBottom: 16,
          textDecoration: 'none',
        }}
      >
        <ArrowLeft size={14} />
        Back to Coupons
      </Link>

      <PageHeader
        title="Coupon Settings"
        subtitle="Platform-wide rules every creator's coupons are checked against — changes apply immediately to new and edited coupons."
      />

      <div className={styles.section}>
        <Card title="Coupons" icon={<SettingsIcon size={15} />}>
          <div className={styles.row}>
            <div className={styles.rowText}>
              <span className={styles.rowLabel}>Coupons enabled platform-wide</span>
              <span className={styles.rowHint}>
                Turning this off immediately blocks every coupon from being created,
                edited, or redeemed on Teyro — existing coupons stay in the database
                untouched, just inert.
              </span>
            </div>
            <div className={styles.rowControl}>
              <Toggle
                label="Coupons enabled platform-wide"
                checked={form.couponsEnabled}
                onChange={(v) => set('couponsEnabled', v)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowText}>
              <span className={styles.rowLabel}>Max discount percentage</span>
              <span className={styles.rowHint}>
                The highest % off a creator&apos;s PERCENTAGE coupon can apply. A
                fixed-amount coupon is also capped at this share of the plan price.
              </span>
            </div>
            <div className={styles.rowControl}>
              <input
                type="number"
                min={1}
                max={100}
                className={styles.numberInput}
                value={form.maxDiscountPercent}
                onChange={(e) => set('maxDiscountPercent', Number(e.target.value))}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowText}>
              <span className={styles.rowLabel}>Max active coupons per creator</span>
              <span className={styles.rowHint}>
                How many ACTIVE, SCHEDULED, or PAUSED coupons one creator can have
                at once.
              </span>
            </div>
            <div className={styles.rowControl}>
              <input
                type="number"
                min={1}
                className={styles.numberInput}
                value={form.maxActiveCouponsPerCreator}
                onChange={(e) => set('maxActiveCouponsPerCreator', Number(e.target.value))}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowText}>
              <span className={styles.rowLabel}>Allow fixed-amount discounts</span>
              <span className={styles.rowHint}>
                Lets creators discount by a flat $ amount instead of only a
                percentage. Still capped by the max discount percentage above.
              </span>
            </div>
            <div className={styles.rowControl}>
              <Toggle
                label="Allow fixed-amount discounts"
                checked={form.allowFixedAmountDiscounts}
                onChange={(v) => set('allowFixedAmountDiscounts', v)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowText}>
              <span className={styles.rowLabel}>Allow unlimited-redemption coupons</span>
              <span className={styles.rowHint}>
                Lets creators leave a coupon&apos;s usage limit blank (no cap on
                redemptions) instead of requiring a max redemption count.
              </span>
            </div>
            <div className={styles.rowControl}>
              <Toggle
                label="Allow unlimited-redemption coupons"
                checked={form.allowUnlimitedRedemptions}
                onChange={(v) => set('allowUnlimitedRedemptions', v)}
              />
            </div>
          </div>
        </Card>

        <Card title="Free (100% off) coupons" icon={<Gift size={15} />}>
          <Banner tone="warn">
            A 100% coupon makes a course completely free for whoever redeems
            it — Teyro and the creator both earn $0 on that redemption. This is
            the one discount value exempt from the max discount percentage
            above. Only turn this on for campaigns you trust creators to use
            deliberately (giveaways, partner access, etc.).
          </Banner>

          <div className={styles.row} style={{ paddingTop: 20 }}>
            <div className={styles.rowText}>
              <span className={styles.rowLabel}>Allow 100% free coupons</span>
              <span className={styles.rowHint}>
                Lets a creator set a PERCENTAGE coupon&apos;s discount to exactly
                100 — the course unlocks with no payment step at all for anyone
                who redeems it. Every other percentage still respects the max
                discount percentage above.
              </span>
            </div>
            <div className={styles.rowControl}>
              <Toggle
                label="Allow 100% free coupons"
                checked={form.allowFreeCoupons}
                onChange={(v) => set('allowFreeCoupons', v)}
              />
            </div>
          </div>
        </Card>

        <div className={styles.footer}>
          <Button onClick={() => void save()} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
          {justSaved && <span className={styles.savedNote}>Saved.</span>}
          {saveError && <span className={styles.errorNote}>{saveError}</span>}
        </div>
      </div>
    </>
  );
}
