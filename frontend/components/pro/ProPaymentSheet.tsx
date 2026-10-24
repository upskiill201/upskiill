'use client';

/**
 * Teyro Pro payment sheet: Stripe's Payment Element (card, Apple Pay,
 * Google Pay) inside our own bottom sheet, so the paywall knows when someone
 * backs out (moment 4: checkout recovery) or their card is declined.
 *
 * Flow (server confirms, setup-first for trials):
 *   elements.submit → createConfirmationToken → POST /pro/subscribe
 *     succeeded              → finalize → onSuccess
 *     requires_action        → stripe.handleNextAction (3DS) → finalize
 *     requires_confirmation  → stripe.confirmPayment (pay-now plans) → finalize
 *   402 PAYMENT_FAILED       → onFailed (decline screen)
 *   409 TRIAL_ALREADY_USED   → ask before charging (never charge a "free trial" tap)
 */

import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, type Stripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Glyph } from '@/components/art/Glyph';
import { useMemo, useRef, useState } from 'react';
import { newId, proApi, ProApiError, type PaywallMoment, type ProPlan, type ProStatus } from '@/lib/pro/api';
import { formatDay, formatPrice } from '@/lib/pro/copy';
import { playHaptic } from '@/lib/haptics';
import styles from './ProPaywall.module.css';

let stripePromise: Promise<Stripe | null> | null = null;
function getStripe() {
  if (!stripePromise) stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '');
  return stripePromise;
}

/** Stripe can't read CSS variables, so the theme resolves them at mount. */
function cssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

export interface SheetPlan {
  plan: ProPlan;
  trial: boolean;
  trialDays: number;
  /** What is charged after the trial / today (offer applied). */
  amountMinor: number;
  /** Full price the plan renews at. */
  renewalMinor: number;
  offerId?: string;
}

export interface SheetFailure {
  message: string;
  declineCode?: string | null;
  code: string;
}

interface Props {
  open: boolean;
  sheet: SheetPlan;
  moment: PaywallMoment;
  paywallSessionId: string;
  /** Called when the learner closes the sheet without paying. attemptId if they had pressed pay. */
  onClose: (attemptId: string | null) => void;
  onSuccess: (status: ProStatus, trial: boolean) => void;
  onFailed: (failure: SheetFailure, attemptId: string | null) => void;
  onTrialUsed: () => void;
  onSubmit: (attemptId: string) => void;
}

export default function ProPaymentSheet(props: Props) {
  const { open, sheet } = props;
  const reduce = useReducedMotion();

  const options = useMemo<StripeElementsOptions>(() => {
    const appearance = {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: cssVar('--color-brand', '#0172FD'),
        colorText: cssVar('--color-ink', '#071233'),
        colorDanger: cssVar('--error-red', '#EF4444'),
        borderRadius: '12px',
        fontFamily: 'system-ui, sans-serif',
      },
    };
    // A trial only saves the card (setup); paying now needs the amount.
    return sheet.trial
      ? { mode: 'setup', currency: 'usd', appearance }
      : { mode: 'subscription', currency: 'usd', amount: sheet.amountMinor, appearance };
  }, [sheet.trial, sheet.amountMinor]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.sheetBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => props.onClose(null)}
        >
          <motion.div
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Payment details"
            initial={reduce ? { opacity: 0 } : { y: '100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Elements stripe={getStripe()} options={options}>
              <SheetBody {...props} />
            </Elements>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SheetBody({ sheet, moment, paywallSessionId, onClose, onSuccess, onFailed, onTrialUsed, onSubmit }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [inlineError, setInlineError] = useState<string | null>(null);
  const attemptRef = useRef<string | null>(null);

  const trialEnd = useMemo(() => new Date(Date.now() + sheet.trialDays * 86_400_000), [sheet.trialDays]);
  const intervalWord = sheet.plan === 'YEARLY' ? 'year' : 'month';

  async function pay() {
    if (!stripe || !elements || busy) return;
    setBusy(true);
    setInlineError(null);
    playHaptic('medium');

    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Field-level problems (incomplete card) stay inline: no attempt yet.
      setInlineError(submitError.message ?? 'Check your card details.');
      setBusy(false);
      return;
    }
    const { error: tokenError, confirmationToken } = await stripe.createConfirmationToken({ elements });
    if (tokenError || !confirmationToken) {
      setInlineError(tokenError?.message ?? 'Check your card details.');
      setBusy(false);
      return;
    }

    const attemptId = newId();
    attemptRef.current = attemptId;
    onSubmit(attemptId);
    try {
      sessionStorage.setItem('teyro:pro-attempt', attemptId);
    } catch {
      /* private mode: the 3DS return page falls back to /pro/status */
    }

    try {
      const result = await proApi.subscribe({
        plan: sheet.plan,
        confirmationTokenId: confirmationToken.id,
        attemptId,
        expectTrial: sheet.trial,
        offerId: sheet.offerId,
        paywallSessionId,
        moment,
        returnPath: '/pro/welcome',
      });

      if (result.status === 'requires_action' && result.clientSecret) {
        const { error } = await stripe.handleNextAction({ clientSecret: result.clientSecret });
        if (error) throw error;
      } else if (result.status === 'requires_confirmation' && result.clientSecret) {
        const { error } = await stripe.confirmPayment({
          clientSecret: result.clientSecret,
          confirmParams: {
            confirmation_token: confirmationToken.id,
            return_url: `${window.location.origin}/pro/welcome`,
          },
          redirect: 'if_required',
        });
        if (error) throw error;
      }

      const status = await proApi.finalize(attemptId);
      playHaptic('success');
      onSuccess(status, result.trial);
    } catch (err) {
      setBusy(false);
      if (err instanceof ProApiError) {
        if (err.code === 'TRIAL_ALREADY_USED') {
          onTrialUsed();
          return;
        }
        onFailed(
          { message: err.message, code: err.code, declineCode: (err.body.declineCode as string) ?? null },
          attemptId,
        );
        return;
      }
      // Stripe.js errors (3DS failed, card declined on confirm)
      const se = err as { message?: string; code?: string; decline_code?: string };
      onFailed(
        {
          message: se.message || 'Your card was declined. Try another card or payment method.',
          code: se.code || 'card_error',
          declineCode: se.decline_code ?? null,
        },
        attemptId,
      );
    }
  }

  return (
    <div className={styles.sheetInner}>
      <div className={styles.sheetHeader}>
        <div>
          <p className={styles.sheetEyebrow}>Teyro Pro · {sheet.plan === 'YEARLY' ? 'Yearly' : 'Monthly'}</p>
          <h2 className={styles.sheetTitle}>
            {sheet.trial ? `$0 today, then ${formatPrice(sheet.amountMinor)}/${intervalWord}` : `${formatPrice(sheet.amountMinor)} today`}
          </h2>
        </div>
        <button
          type="button"
          className={styles.sheetClose}
          aria-label="Close payment"
          disabled={busy}
          onClick={() => onClose(attemptRef.current)}
        >
          <Glyph name="close" size={20} strokeWidth={3} />
        </button>
      </div>

      <div className={styles.sheetElement}>
        <PaymentElement
          onReady={() => setReady(true)}
          options={{
            layout: 'tabs',
            applePay: sheet.trial
              ? {
                  recurringPaymentRequest: {
                    paymentDescription: 'Teyro Pro',
                    managementURL: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard/settings`,
                    trialBilling: {
                      amount: 0,
                      label: `${sheet.trialDays}-day free trial`,
                      recurringPaymentEndDate: trialEnd,
                    },
                    regularBilling: {
                      amount: sheet.amountMinor,
                      label: `Teyro Pro ${sheet.plan === 'YEARLY' ? 'yearly' : 'monthly'}`,
                      recurringPaymentStartDate: trialEnd,
                      recurringPaymentIntervalUnit: sheet.plan === 'YEARLY' ? 'year' : 'month',
                      recurringPaymentIntervalCount: 1,
                    },
                  },
                }
              : undefined,
          }}
        />
      </div>

      {inlineError && <p className={styles.sheetError}>{inlineError}</p>}

      <button
        type="button"
        className={`${styles.cta} ${styles.ctaGreen}`}
        disabled={!stripe || !ready || busy}
        onClick={pay}
      >
        {busy ? 'Confirming…' : sheet.trial ? `Start my ${sheet.trialDays}-day free trial` : `Pay ${formatPrice(sheet.amountMinor)}`}
      </button>

      <p className={styles.sheetFine}>
        <Glyph name="lock" size={13} strokeWidth={2.6} />
        {sheet.trial
          ? `Nothing is charged today. ${formatPrice(sheet.amountMinor)} on ${formatDay(trialEnd)}, then every ${intervalWord}${
              sheet.renewalMinor !== sheet.amountMinor ? ` (${formatPrice(sheet.renewalMinor)} from the second year)` : ''
            }. We remind you 2 days before. Cancel anytime in Settings.`
          : `Charged today, then every ${intervalWord}. Cancel anytime in Settings.`}
      </p>
    </div>
  );
}
