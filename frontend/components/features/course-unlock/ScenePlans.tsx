'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { playSound } from '@/lib/audio/lessonSounds';
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
import CouponField, { COUPON_REASON_COPY, type CouponQuoteValid } from './CouponField';
import styles from './unlock.module.css';
import { pendingCouponCode } from '@/lib/coupons/pendingCode';

export type PaymentProvider = 'STRIPE' | 'MESOMB';

export interface SubscribeFields {
  plan: AccessPlanType;
  provider: PaymentProvider;
  service?: string;
  phone?: string;
  country?: string;
  /** Set only when a coupon has been validated for the selected plan. The
   *  backend re-validates and recomputes the price itself — this is never
   *  trusted as the charge amount. */
  couponCode?: string;
  /** What the learner was shown they'd pay (after any coupon). Display only —
   *  for the "approve on your phone" screen; never sent to the backend. */
  amountUsd?: number;
}

interface ScenePlansProps {
  /** Needed to re-validate a coupon against THIS course on every plan switch. */
  courseId?: string;
  /** Course base value in USD from the API — never guessed client-side. */
  basePrice?: number;
  /** A returning learner renewing (expired, or a plan that doesn't auto-renew). */
  renewing?: boolean;
  /** ISO end of the access they still have, when renewing early. */
  accessEndsAt?: string | null;
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
  courseId,
  basePrice,
  renewing = false,
  accessEndsAt = null,
  submitting,
  errorMsg,
  onSubmit,
  onBack,
}: ScenePlansProps) {
  const { countries, defaultCountry } = useMesombConfig();

  // Yearly is the default: it's the creator's own price, the best deal for the
  // learner (the saving is real, from the ladder) and the plan that keeps them
  // learning long enough to finish. Monthly stays one tap away.
  const [selectedPlan, setSelectedPlan] = useState<AccessPlanType>('YEARLY');
  const [provider, setProvider] = useState<PaymentProvider>('STRIPE');
  const [countryCode, setCountryCode] = useState<string>(defaultCountry);
  const [operatorCode, setOperatorCode] = useState<string>('MTN');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // ── Coupon ────────────────────────────────────────────────────────────
  const [couponExpanded, setCouponExpanded] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponQuote, setCouponQuote] = useState<CouponQuoteValid | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponChecking, setCouponChecking] = useState(false);

  const validateCoupon = useCallback(
    async (code: string, plan: AccessPlanType) => {
      if (!code.trim() || !courseId) return;
      setCouponChecking(true);
      try {
        const res = await fetch('/api/coupons/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ courseId, plan, code: code.trim() }),
        });
        const data = await res.json();
        if (data?.valid) {
          setCouponQuote(data);
          setCouponError(null);
        } else {
          setCouponQuote(null);
          setCouponError(
            COUPON_REASON_COPY[data?.reason] ?? "This coupon isn't valid for the selected plan.",
          );
        }
      } catch {
        setCouponQuote(null);
        setCouponError('Could not check that code — try again.');
      } finally {
        setCouponChecking(false);
      }
    },
    [courseId],
  );

  const applyCoupon = () => {
    playHaptic('light', false);
    playSound('select');
    void validateCoupon(couponCode, selectedPlan);
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponQuote(null);
    setCouponError(null);
    setCouponExpanded(false);
  };

  // A code that came in a creator's share link: filled in and checked for
  // the default plan, so the discount is already on screen.
  useEffect(() => {
    if (!courseId) return;
    const pending = pendingCouponCode(courseId);
    if (!pending) return;
    setCouponCode(pending);
    setCouponExpanded(true);
    void validateCoupon(pending, selectedPlan);
    // Once, when the plans open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  // Plan-switch revalidation: a coupon valid for Monthly must not silently
  // keep discounting once the learner switches to Yearly. Clear immediately
  // (not just on the async response) so the old discount never lingers on
  // screen while the new check is in flight.
  useEffect(() => {
    if (!couponCode) return;
    setCouponQuote(null);
    void validateCoupon(couponCode, selectedPlan);
    // Only the plan is a meaningful re-trigger here — validateCoupon itself
    // is stable per courseId and couponCode changes are handled by applyCoupon.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlan]);

  const ladder = useMemo(
    () => calculateCoursePricingLadder(typeof basePrice === 'number' ? basePrice : 0),
    [basePrice],
  );
  const priceKnown = typeof basePrice === 'number';

  const currentPlan = selectedPlan === 'YEARLY' ? ladder.yearly : ladder.monthly;
  // Real numbers from the ladder — the anchor and the saving are never invented.
  const yearAtMonthlyRate = Math.round(ladder.monthly.price * 12 * 100) / 100;
  const yearlySavingUsd = ladder.isFree ? 0 : Math.round((yearAtMonthlyRate - ladder.yearly.price) * 100) / 100;

  const choosePlan = (plan: AccessPlanType) => {
    playHaptic('light', false);
    playSound('select');
    setSelectedPlan(plan);
  };

  // Defensive: only trust the quote if it was computed for the plan
  // currently selected — by construction the revalidation effect above keeps
  // these in sync, but a quote for a stale plan must never render a discount.
  const activeCouponQuote =
    couponQuote && couponQuote.appliedPlan === selectedPlan ? couponQuote : null;
  const effectivePrice = activeCouponQuote ? activeCouponQuote.finalPriceUsd : currentPlan.price;

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
    playHaptic('light', false);
    playSound('navTap', next === 'STRIPE' ? 1 : 3);
    setProvider(next);
    if (service) setOperatorCode(service);
  };

  // A coupon can discount a plan all the way to $0 — no payment method is
  // needed at all in that case, so the rail/MoMo section is skipped entirely.
  const isFree = activeCouponQuote?.finalPriceUsd === 0;

  const handleSubmit = () => {
    if (submitting || !priceKnown) return;

    let nationalPhone: string | undefined;
    if (!isFree && provider === 'MESOMB') {
      const result = normalizeMomoPhone(phone, countryMeta);
      if (!result.ok) {
        setPhoneError(result.error ?? 'Enter a valid Mobile Money number.');
        playHaptic('warning', false);
        playSound('nodeLocked');
        return;
      }
      setPhoneError(null);
      nationalPhone = result.national;
    }

    playHaptic('medium', false);
    playSound('start');
    onSubmit({
      plan: selectedPlan,
      provider,
      ...(!isFree && provider === 'MESOMB'
        ? {
            service: operatorCode,
            phone: nationalPhone,
            country: countryMeta?.code,
          }
        : {}),
      // subscribeCourse() re-validates this server-side at charge time —
      // never trusts this earlier /coupons/validate response.
      ...(activeCouponQuote ? { couponCode } : {}),
      amountUsd: effectivePrice,
    });
  };

  const isMomo = !isFree && provider === 'MESOMB';
  const isYearly = selectedPlan === 'YEARLY';
  const priceLabel = effectivePrice > 0 ? `$${effectivePrice.toFixed(2)}` : 'Free';
  const ctaLabel = submitting
    ? 'Unlocking…'
    : priceKnown
      ? isFree
        ? 'Enroll for Free'
        : `${renewing ? 'Renew' : 'Unlock'} ${isYearly ? '12 months' : '1 month'} · ${priceLabel}`
      : renewing
        ? 'Renew'
        : 'Unlock Course';
  // Renewing before access runs out adds the new period on top (the backend
  // stacks it onto expiresAt), so say so — it removes the "I'll lose days" worry.
  const endsLabel =
    accessEndsAt && Date.parse(accessEndsAt) > Date.now()
      ? new Date(accessEndsAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      : null;

  // Exactly what happens to the learner's money — required for auto-renewing
  // plans, and it removes the hesitation that stops people at checkout. Only
  // card (Stripe) subscriptions renew; Mobile Money buys one period.
  const period = isYearly ? 'year' : 'month';
  const billingLine = isFree
    ? 'No payment required. Enjoy the course!'
    : isMomo
      ? `One payment of ${priceLabel} for ${isYearly ? '12 months' : '30 days'} of access. It won’t renew automatically.`
      : `${priceLabel} today, then ${`$${currentPlan.price.toFixed(2)}`} every ${period} until you cancel. Cancel anytime in Settings.`;

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
            {renewing ? (
              <>
                Renew and <span className={styles.titleAccent}>keep going</span>
              </>
            ) : (
              <>
                Pick the plan that <span className={styles.titleAccent}>works for you</span>
              </>
            )}
          </h1>
          {renewing && (
            <p className={styles.renewNote}>
              {endsLabel
                ? `Your access runs until ${endsLabel}. Renew now and the new period starts then, so you don’t lose a day.`
                : 'Your progress and streak are saved. Renew and pick up exactly where you left off.'}
            </p>
          )}

          {/* PLAN RADIOGROUP — yearly first: the anchor is the real monthly
              rate × 12, and the saving comes straight from the ladder. */}
          <div role="radiogroup" aria-label="Choose your plan" className={styles.planGroup}>
            <PlanRow
              plan={ladder.yearly}
              selected={selectedPlan === 'YEARLY'}
              onSelect={() => choosePlan('YEARLY')}
              badge={{
                icon: Crown,
                text: ladder.yearly.savingsPercent ? `Best value · save ${ladder.yearly.savingsPercent}%` : 'Best value',
              }}
              anchorPrice={ladder.isFree ? undefined : yearAtMonthlyRate}
              discountedPrice={
                activeCouponQuote && selectedPlan === 'YEARLY' ? activeCouponQuote.finalPriceUsd : undefined
              }
            />
            <PlanRow
              plan={ladder.monthly}
              selected={selectedPlan === 'MONTHLY'}
              onSelect={() => choosePlan('MONTHLY')}
              discountedPrice={
                activeCouponQuote && selectedPlan === 'MONTHLY' ? activeCouponQuote.finalPriceUsd : undefined
              }
            />
          </div>

          {/* One honest nudge back to yearly, with the real dollar saving. */}
          {selectedPlan === 'MONTHLY' && yearlySavingUsd > 0 && (
            <button type="button" className={styles.switchNudge} onClick={() => choosePlan('YEARLY')}>
              <Crown size={14} strokeWidth={2.75} aria-hidden="true" />
              <span>
                Switch to yearly and keep <strong>${yearlySavingUsd.toFixed(2)}</strong> a year
              </span>
            </button>
          )}

          {/* COUPON CODE */}
          {courseId && (
            <CouponField
              expanded={couponExpanded}
              onExpand={() => setCouponExpanded(true)}
              code={couponCode}
              onCodeChange={setCouponCode}
              quote={activeCouponQuote}
              error={couponError}
              checking={couponChecking}
              onApply={applyCoupon}
              onRemove={removeCoupon}
            />
          )}

          {/* PAYMENT RAIL SEGMENTED CONTROL — a fully free coupon needs no
              payment method at all, so this whole rail is skipped. */}
          {!isFree && (
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
          )}

          {/* MOMO DETAILS */}
          {isMomo && countryMeta && (
            <div className={styles.momoBox}>
              <CountryOperatorPicker
                countries={countries}
                countryCode={countryMeta.code}
                onCountryChange={handleCountryChange}
                operatorCode={operatorCode}
                onOperatorChange={(code) => {
                  playHaptic('light', false);
                  playSound('select');
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
                <strong>{formatLocalFromUsd(effectivePrice, countryMeta.currency)}</strong>{' '}
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

        {/* PAYMENT LOGOS — no payment method involved for a free coupon. */}
        {!isFree && (
          <div className={styles.logoChips} aria-label="Accepted payment methods">
            <span className={styles.logoBadge}><FaCcVisa size={20} /></span>
            <span className={styles.logoBadge}><FaCcMastercard size={20} /></span>
            <span className={styles.logoBadge}><FaCcApplePay size={20} /></span>
            <span className={styles.logoBadge}><FaGooglePay size={20} /></span>
            <span className={styles.textChip}>MoMo</span>
            <span className={styles.textChip}>Orange</span>
          </div>
        )}

        <p className={styles.billingNotice}>
          <CircleCheck size={11} />
          <span>
            {billingLine}
            {!isFree && (
              <>
                {' '}
                <Link href="/terms" target="_blank" className={styles.refundLink}>
                  Refund policy
                </Link>
              </>
            )}
          </span>
        </p>
      </footer>
    </>
  );
}
