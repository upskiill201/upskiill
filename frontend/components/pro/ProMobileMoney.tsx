'use client';

/**
 * Prepaid Teyro Pro over Mobile Money: a month or a year paid up front. No
 * free trial (a wallet can't be held for a later charge) and no automatic
 * renewal, and the screen says both before anyone types a number.
 */

import { Art } from '@/components/onboarding/v3/art/Art';
import { Glyph } from '@/components/onboarding/v3/art/Glyph';
import { useEffect, useMemo, useRef, useState } from 'react';
import CountryOperatorPicker from '@/components/features/course-unlock/CountryOperatorPicker';
import PhoneField from '@/components/features/course-unlock/PhoneField';
import { DEFAULT_MOMO_COUNTRY_CODE, getMomoCountry, MOMO_COUNTRIES } from '@/lib/mesomb-countries.client';
import { normalizeMomoPhone } from '@/lib/momo-phone';
import { formatLocalPrice } from '@/lib/localPrice';
import { proApi, ProApiError, type PlanView, type ProPlan, type ProStatus } from '@/lib/pro/api';
import { formatPrice } from '@/lib/pro/copy';
import styles from './ProPaywall.module.css';

interface Props {
  plans: PlanView[];
  initialPlan: ProPlan;
  onBack: () => void;
  onPro: (status: ProStatus) => void;
}

const POLL_MS = 3000;
const POLL_LIMIT = 60; // three minutes to approve on the phone

export default function ProMobileMoney({ plans, initialPlan, onBack, onPro }: Props) {
  const countries = useMemo(() => MOMO_COUNTRIES.filter((c) => c.enabled), []);
  const [plan, setPlan] = useState<ProPlan>(initialPlan);
  const [countryCode, setCountryCode] = useState(DEFAULT_MOMO_COUNTRY_CODE);
  const country = getMomoCountry(countryCode) ?? countries[0];
  const [operator, setOperator] = useState<string | undefined>(country?.operators[0]?.code);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const polls = useRef(0);

  const chosen = plans.find((p) => p.plan === plan) ?? plans[0];
  // The same conversion and rounding the Mobile Money charge uses.
  const localLabel = country
    ? formatLocalPrice(chosen.priceMinor / 100, country.currency, country.currency === 'XAF' ? 'FCFA' : country.currency)
    : null;

  useEffect(() => {
    if (!waiting) return;
    const id = window.setInterval(async () => {
      polls.current += 1;
      try {
        const status = await proApi.status();
        if (status.isPro) {
          window.clearInterval(id);
          onPro(status);
        }
      } catch {
        /* keep polling */
      }
      if (polls.current >= POLL_LIMIT) {
        window.clearInterval(id);
        setWaiting(false);
        setError("We haven't seen the payment yet. If you approved it, it can take a minute: check back shortly.");
      }
    }, POLL_MS);
    return () => window.clearInterval(id);
  }, [waiting, onPro]);

  async function pay() {
    if (!country || !operator || busy) return;
    const normalized = normalizeMomoPhone(phone, country);
    if (!normalized.ok || !normalized.national) {
      setError(normalized.error ?? 'Check your number.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await proApi.mobileMoney({ plan, phone: normalized.national, service: operator, country: country.code });
      if (res.status === 'ACTIVE') {
        onPro(await proApi.status());
      } else {
        polls.current = 0;
        setWaiting(true);
      }
    } catch (err) {
      setError(err instanceof ProApiError ? err.message : 'Mobile Money is unavailable right now. Try a card instead.');
    } finally {
      setBusy(false);
    }
  }

  if (waiting) {
    return (
      <div className={styles.panel}>
        <div className={styles.momoWaitIcon}>
          <Art name="phone" size={34} />
        </div>
        <h2 className={styles.panelTitle}>Approve it on your phone</h2>
        <p className={styles.panelBody}>
          Check your phone for the {country?.operators.find((o) => o.code === operator)?.label ?? 'Mobile Money'} prompt
          and enter your PIN. Pro switches on the moment it goes through.
        </p>
        <div className={styles.momoPulse} aria-hidden />
        <button type="button" className={styles.ghostLink} onClick={() => setWaiting(false)}>
          I didn&apos;t get a prompt
        </button>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <button type="button" className={styles.backLink} onClick={onBack}>
        <Glyph name="back" size={16} strokeWidth={3} /> Back
      </button>
      <h2 className={styles.panelTitle}>Pay with Mobile Money</h2>
      <p className={styles.panelBody}>
        Pay for a month or a year up front. There&apos;s no free trial with Mobile Money and it never renews by itself:
        we&apos;ll remind you before it ends.
      </p>

      <div className={styles.momoPlans} role="radiogroup" aria-label="Plan">
        {plans.map((p) => (
          <button
            key={p.plan}
            type="button"
            role="radio"
            aria-checked={plan === p.plan}
            className={`${styles.momoPlan} ${plan === p.plan ? styles.momoPlanOn : ''}`}
            onClick={() => setPlan(p.plan)}
          >
            <span>{p.plan === 'YEARLY' ? '1 year' : '1 month'}</span>
            <strong>{formatPrice(p.priceMinor)}</strong>
          </button>
        ))}
      </div>

      {country && (
        <>
          <CountryOperatorPicker
            countries={countries}
            countryCode={country.code}
            onCountryChange={(code) => {
              setCountryCode(code);
              setOperator(getMomoCountry(code)?.operators[0]?.code);
            }}
            operatorCode={operator}
            onOperatorChange={setOperator}
            disabled={busy}
          />
          <PhoneField fieldId="pro-momo-phone" country={country} value={phone} onChange={setPhone} error={error} disabled={busy} />
        </>
      )}

      <button type="button" className={`${styles.cta} ${styles.ctaGreen}`} disabled={busy || !operator} onClick={pay}>
        {busy
          ? 'Sending prompt…'
          : `Pay ${localLabel ?? formatPrice(chosen.priceMinor)}`}
      </button>
      <p className={styles.sheetFine}>
        Charged once in your local currency at today&apos;s rate ({formatPrice(chosen.priceMinor)}). Gives you{' '}
        {plan === 'YEARLY' ? 'a year' : 'a month'} of Teyro Pro.
      </p>
    </div>
  );
}
