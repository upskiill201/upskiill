'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  CircleCheck,
  Crown,
  Heart,
  Loader2,
  Lock,
  RotateCcw,
  ShieldCheck,
  Star,
  Zap,
} from 'lucide-react';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcApplePay,
  FaGooglePay,
  FaMobileAlt,
  FaCreditCard,
} from 'react-icons/fa';
import { playHaptic } from '@/lib/haptics';
import {
  calculateCoursePricingLadder,
  AccessPlanType,
} from '@/lib/pricing-engine';
import PlanRow from '@/components/features/course-paywall/PlanRow';
import BenefitCarousel from '@/components/features/course-paywall/BenefitCarousel';
import { useMesombConfig } from '@/hooks/useMesombConfig';
import { normalizeMomoPhone } from '@/lib/momo-phone';
import { formatLocalFromUsd } from '@/lib/fx-rates';
import CountryOperatorPicker from './CountryOperatorPicker';
import PhoneField from './PhoneField';
import styles from './unlock.module.css';

export type PaymentProvider = 'STRIPE' | 'MESOMB';

export interface SubscribeFields {
  plan: AccessPlanType;
  provider: PaymentProvider;
  service?: string;
  phone?: string;
  country?: string;
}

interface ScenePlansProps {
  /** Course base value in USD from the API — never guessed client-side. */
  basePrice?: number;
  submitting: boolean;
  errorMsg: string | null;
  onSubmit: (fields: SubscribeFields) => void;
  onBack: () => void;
}

/**
 * Scene 3 — the plans + payment form, ported from the paywall modal body:
 * plan radiogroup ladder → Card·Stripe | Mobile Money rail → country/
 * operator picker + phone field with local-amount notice. Autoplay on the
 * benefit carousel is disabled here (motion competes with input).
 */
export default function ScenePlans({
  basePrice,
  submitting,
  errorMsg,
  onSubmit,
  onBack,
}: ScenePlansProps) {
  const { countries, defaultCountry } = useMesombConfig();

  const [selectedPlan, setSelectedPlan] = useState<AccessPlanType>('MONTHLY');
  const [provider, setProvider] = useState<PaymentProvider>('STRIPE');
  const [countryCode, setCountryCode] = useState<string>(defaultCountry);
  const [operatorCode, setOperatorCode] = useState<string>('MTN');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const ladder = useMemo(
    () => calculateCoursePricingLadder(typeof basePrice === 'number' ? basePrice : 0),
    [basePrice],
  );
  const priceKnown = typeof basePrice === 'number';

  const currentPlan =
    selectedPlan === 'WEEKLY'
      ? ladder.weekly
      : selectedPlan === 'YEARLY'
        ? ladder.yearly
        : ladder.monthly;

  const countryMeta = useMemo(
    () => countries.find((c) => c.code === countryCode) ?? countries[0],
    [countries, countryCode],
  );

  const handleCountryChange = (code: string) => {
    setCountryCode(code);
    const next = countries.find((c) => c.code === code);
    if (next && !next.operators.some((op) => op.code === operatorCode)) {
      setOperatorCode(next.operators[0]?.code ?? 'MTN');
    }
    setPhoneError(null);
  };

  const selectRail = (next: PaymentProvider, service?: string) => {
    playHaptic('light');
    setProvider(next);
    if (service) setOperatorCode(service);
  };

  const handleSubmit = () => {
    if (submitting || !priceKnown) return;

    let nationalPhone: string | undefined;
    if (provider === 'MESOMB') {
      const result = normalizeMomoPhone(phone, countryMeta);
      if (!result.ok) {
        setPhoneError(result.error ?? 'Enter a valid Mobile Money number.');
        playHaptic('warning');
        return;
      }
      setPhoneError(null);
      nationalPhone = result.national;
    }

    playHaptic('medium');
    onSubmit({
      plan: selectedPlan,
      provider,
      ...(provider === 'MESOMB'
        ? {
            service: operatorCode,
            phone: nationalPhone,
            country: countryMeta?.code,
          }
        : {}),
    });
  };

  const isMomo = provider === 'MESOMB';
  const priceLabel =
    currentPlan.price > 0 ? `$${currentPlan.price.toFixed(2)}` : 'Free';
  const ctaLabel = submitting
    ? 'Unlocking…'
    : priceKnown
      ? `Unlock Course (${priceLabel})`
      : 'Unlock Course';

  return (
    <>
      <button
        type="button"
        className={styles.backBtn}
        onClick={onBack}
        aria-label="Back"
      >
        <ChevronLeft size={19} />
      </button>

      <div className={styles.sceneScroll}>
        <div className={styles.plansLayout}>
          {/* Desktop-only companion: Tey keeps the wide layout company so
              the form doesn't float in a one-sided void. Hidden on mobile.
              Uses the full-bleed portrait asset — Tey_thinking_desktop is
              800x533 with the robot in ~30% of the canvas, which rendered
              him postage-stamp small at aside widths. */}
          <aside className={styles.plansAside} aria-hidden="true">
            <Image
              src="/User onbarding Assets/Step_7_tey_verified_state.webp"
              alt=""
              /* Asset is 670x1176 — attrs must keep that ratio or Tey squashes. */
              width={230}
              height={403}
              className={styles.plansMascot}
              priority
            />
            <p className={styles.plansAsideNote}>
              Unlock once and I&apos;ll hold onto every lesson, streak and
              coin you&apos;ve earned.
            </p>
          </aside>

          <div className={styles.plansColumn}>
          <h1 className={styles.headline} style={{ textAlign: 'left', maxWidth: 'none' }}>
            Pick the plan that <span className={styles.titleAccent}>works for you</span>
          </h1>

          {/* PLAN RADIOGROUP */}
          <div role="radiogroup" aria-label="Choose your plan" className={styles.planGroup}>
            <PlanRow
              plan={ladder.monthly}
              selected={selectedPlan === 'MONTHLY'}
              onSelect={() => {
                playHaptic('light');
                setSelectedPlan('MONTHLY');
              }}
              badge={{ icon: Star, text: 'Most popular' }}
            />
            <PlanRow
              plan={ladder.yearly}
              selected={selectedPlan === 'YEARLY'}
              onSelect={() => {
                playHaptic('light');
                setSelectedPlan('YEARLY');
              }}
              badge={{ icon: Crown, text: 'Best value' }}
            />
            <PlanRow
              plan={ladder.weekly}
              selected={selectedPlan === 'WEEKLY'}
              onSelect={() => {
                playHaptic('light');
                setSelectedPlan('WEEKLY');
              }}
            />
          </div>

          {/* PAYMENT RAIL SEGMENTED CONTROL */}
          <div className={styles.railGroup} role="group" aria-label="Payment method">
            <button
              type="button"
              className={`${styles.segmentBtn} ${!isMomo ? styles.segmentBtnActive : ''}`}
              aria-pressed={!isMomo}
              onClick={() => selectRail('STRIPE')}
            >
              <FaCreditCard size={12} />
              <span>Card · Stripe</span>
            </button>
            <button
              type="button"
              className={`${styles.segmentBtn} ${isMomo ? styles.segmentBtnActive : ''}`}
              aria-pressed={isMomo}
              onClick={() => selectRail('MESOMB')}
            >
              <FaMobileAlt size={12} />
              <span>Mobile Money</span>
            </button>
          </div>

          {/* MOMO DETAILS */}
          {isMomo && countryMeta && (
            <div className={styles.momoBox}>
              <CountryOperatorPicker
                countries={countries}
                countryCode={countryMeta.code}
                onCountryChange={handleCountryChange}
                operatorCode={operatorCode}
                onOperatorChange={(code) => {
                  playHaptic('light');
                  setOperatorCode(code);
                  setPhoneError(null);
                }}
              />
              <PhoneField
                fieldId="unlock-momo-phone"
                country={countryMeta}
                value={phone}
                onChange={(v) => {
                  setPhone(v);
                  if (phoneError) setPhoneError(null);
                }}
                onBlur={() => {
                  const result = normalizeMomoPhone(phone, countryMeta);
                  if (!result.ok) setPhoneError(result.error ?? null);
                }}
                error={phoneError}
              />
              <p className={styles.localNotice}>
                Amount:{' '}
                <strong>
                  {formatLocalFromUsd(currentPlan.price, countryMeta.currency)}
                </strong>{' '}
                · I&apos;ll send a prompt to your phone to approve.
              </p>
            </div>
          )}

          {/* WHY TEYRO WORKS — autoplay off inside a payment form */}
          <BenefitCarousel autoAdvanceMs={null} />

          {/* FEEDBACK MESSAGES */}
          <div aria-live="polite">
            {errorMsg && (
              <div className={`${styles.msgBox} ${styles.msgError}`} role="alert">
                <Zap size={14} />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* PINNED FOOTER */}
      <footer className={styles.footerDock}>
        <button
          type="button"
          className={styles.cta3D}
          onClick={handleSubmit}
          disabled={!priceKnown || submitting}
        >
          {submitting ? (
            <>
              <Loader2 size={18} className={styles.spinner} />
              <span>{ctaLabel}</span>
            </>
          ) : (
            <>
              <Lock size={15} />
              <span>{ctaLabel}</span>
            </>
          )}
        </button>

        {/* TRUST MICROCOPY */}
        <div className={styles.trustBar}>
          <span className={styles.trustItem}>
            <ShieldCheck size={13} />
            Secure payments
          </span>
          <span className={styles.trustItem}>
            <RotateCcw size={13} />
            Cancel anytime
          </span>
          <span className={styles.trustItem}>
            <Heart size={13} />
            Progress saved
          </span>
        </div>

        {/* PAYMENT LOGOS */}
        <div className={styles.logoChips} aria-label="Accepted payment methods">
          <span className={styles.logoBadge}><FaCcVisa size={20} /></span>
          <span className={styles.logoBadge}><FaCcMastercard size={20} /></span>
          <span className={styles.logoBadge}><FaCcApplePay size={20} /></span>
          <span className={styles.logoBadge}><FaGooglePay size={20} /></span>
          <span className={styles.textChip}>MoMo</span>
          <span className={styles.textChip}>Orange</span>
        </div>

        <p className={styles.billingNotice}>
          <CircleCheck size={11} />
          <span>
            Recurring billing until you cancel.{' '}
            <Link href="/terms" target="_blank" className={styles.refundLink}>
              Refund policy
            </Link>
          </span>
        </p>
      </footer>
    </>
  );
}
