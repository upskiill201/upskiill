'use client';

/**
 * Earnings → Payment Info. Where creators get paid: bank account or mobile
 * money. Full details are encrypted server-side; this page only ever shows
 * masked data back.
 */

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, Landmark, Smartphone } from 'lucide-react';
import { InlineError, PaymentInfoSkeleton } from './skeletons';
import styles from './earnings.module.css';

interface MethodView {
  type: 'BANK' | 'MOBILE_MONEY';
  holderName?: string | null;
  maskedDisplay?: string | null;
  bankName?: string | null;
  country?: string | null;
  receivingCurrency?: string | null;
  isVerified: boolean;
  verifiedAt?: string | null;
  eligibilityNote?: string | null;
  updatedAt?: string | null;
}

export function PaymentInfoTab() {
  const [method, setMethod] = useState<MethodView | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'BANK' | 'MOBILE_MONEY'>('BANK');
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [holderName, setHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [country, setCountry] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/earnings/payout-method', { credentials: 'include' });
      if (res.ok) {
        const m = await res.json();
        setMethod(m);
        if (m) setMode(m.type);
      }
    } catch {
      setError('Could not load your payout method.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const save = async () => {
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('/api/earnings/payout-method', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          type: mode,
          holderName,
          accountNumber,
          institutionName,
          country,
          receivingCurrency: 'USD',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(Array.isArray(data?.message) ? data.message.join('. ') : data?.message ?? `Save failed (${res.status})`);
      }
      setSuccess('Payout details saved and verified. You can request payouts now.');
      setAccountNumber('');
      setEditing(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <PaymentInfoSkeleton />;

  return (
    <div className={styles.root}>
      <h3 className={styles.sectionHeading}>Where your money goes</h3>
      <p className={styles.sectionSub}>
        Bank or mobile-money account for payouts. Full account numbers are
        encrypted at rest and only used by Teyro&apos;s payout team — they are
        never shown again in full.
      </p>

      {method && !editing && (
        <motion.div className={`${styles.card} ${styles.methodCard}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <span className={styles.methodIconWrap}>
            {method.type === 'BANK' ? <Building2 size={24} /> : <Smartphone size={24} />}
          </span>
          <div className={styles.methodLines}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className={styles.methodMasked}>{method.maskedDisplay}</span>
              <span className={`${styles.verifyChip} ${method.isVerified ? styles.verifyOk : styles.verifyNo}`}>
                {method.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
            <span className={styles.methodSub}>
              {method.holderName} · updated{' '}
              {method.updatedAt ? new Date(method.updatedAt).toLocaleDateString() : 'recently'}
            </span>
            {method.eligibilityNote && (
              <span className={styles.methodSub}>{method.eligibilityNote}</span>
            )}
          </div>
          <button className={styles.secondaryBtn} style={{ marginLeft: 'auto' }} onClick={() => {
            setEditing(true);
            setHolderName(method.holderName ?? '');
            setInstitutionName(method.bankName ?? '');
            setCountry(method.country ?? '');
          }}>
            Update details
          </button>
        </motion.div>
      )}

      {(editing || !method) && (
        <div className={styles.card}>
          {/* METHOD TYPE */}
          <div className={styles.segRow} style={{ marginBottom: 16 }}>
            <button className={`${styles.segBtn} ${mode === 'BANK' ? styles.segBtnActive : ''}`} onClick={() => setMode('BANK')}>
              <Landmark size={12} /> Bank transfer
            </button>
            <button className={`${styles.segBtn} ${mode === 'MOBILE_MONEY' ? styles.segBtnActive : ''}`} onClick={() => setMode('MOBILE_MONEY')}>
              <Smartphone size={12} /> Mobile money
            </button>
          </div>

          <div className={styles.formGrid}>
            <label className={styles.fieldGroup}>
              <span className={styles.fieldLabel}>Account holder name</span>
              <input className={styles.fieldInput} value={holderName} onChange={(e) => setHolderName(e.target.value)} placeholder="As registered with your bank" />
            </label>
            <label className={styles.fieldGroup}>
              <span className={styles.fieldLabel}>{mode === 'BANK' ? 'Account number' : 'Mobile-money number'}</span>
              <input className={styles.fieldInput} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder={mode === 'BANK' ? 'e.g. 0001234567' : 'e.g. +237 6XX XXX XXX'} />
            </label>
            <label className={styles.fieldGroup}>
              <span className={styles.fieldLabel}>{mode === 'BANK' ? 'Bank name' : 'Operator (MTN, Orange…)'}</span>
              <input className={styles.fieldInput} value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} placeholder={mode === 'BANK' ? 'e.g. Ecobank' : 'e.g. MTN'} />
            </label>
            <label className={styles.fieldGroup}>
              <span className={styles.fieldLabel}>Country</span>
              <input className={styles.fieldInput} value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. Cameroon" />
            </label>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className={styles.primaryBtn} disabled={busy} onClick={() => void save()}>
              <CheckCircle2 size={15} />
              {busy ? 'Saving…' : 'Save payout details'}
            </button>
            {method && (
              <button className={styles.secondaryBtn} onClick={() => setEditing(false)}>
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {success && <div className={styles.bannerSuccess}><CheckCircle2 size={15} /> {success}</div>}
      {error && <InlineError message={error} />}
    </div>
  );
}
