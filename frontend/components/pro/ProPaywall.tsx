'use client';

/**
 * Teyro Pro paywall: one full-page takeover for every moment in the
 * founder's playbook ("your paywall is four moments, not one screen").
 *
 *   1. Onboard / Lock: the plans screen, headline built from the learner's
 *      goal and the moment that brought them here.
 *   3. Exit: closing asks one question and answers it (real 30% first-year
 *      offer only for "too expensive", once ever).
 *   4. Checkout: backing out of the payment sheet offers the same plan again
 *      or a smaller one; a declined card gets its own screen.
 *
 * Everything shown is real: prices and savings come from /pro/plans, the
 * offer countdown from the server's expiry, the trial dates from today.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Art, type ArtName } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { captureEvent } from '@/lib/analytics';
import { fireConfetti } from '@/lib/confetti';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { playClaimArpeggio, playScenePop, playWhoosh } from '@/lib/audio/celebrationAudio';
import {
  newId,
  proApi,
  trackPaywall,
  type ExitReason,
  type ExitRoute,
  type OfferView,
  type PaywallEventType,
  type PaywallMoment,
  type ProPlan,
  type ProPlans,
  type ProStatus,
} from '@/lib/pro/api';
import {
  benefitsFor,
  ctaFor,
  formatDay,
  formatPrice,
  headlineFor,
  planLabel,
  type PaywallContext,
} from '@/lib/pro/copy';
import ProMobileMoney from './ProMobileMoney';
import ProPaymentSheet, { type SheetFailure, type SheetPlan } from './ProPaymentSheet';
import styles from './ProPaywall.module.css';

export type PaywallDismissal = 'closed' | 'let_in' | 'remind_later' | 'thanks';

interface Props {
  moment: PaywallMoment;
  context?: PaywallContext;
  /** The learner left without Pro. */
  onDismiss: (why: PaywallDismissal) => void;
  /** Pro is on (trial or paid). */
  onPro: (status: ProStatus) => void;
  /** Seconds before the close button appears (Adapty: a short delay lifts conversion). */
  closeDelaySeconds?: number;
}

type View =
  | 'plans'
  | 'survey'
  | 'offer'
  | 'monthly'
  | 'proof'
  | 'note'
  | 'recovery'
  | 'failed'
  | 'trialUsed'
  | 'momo'
  | 'success';

const TEY = '/User onbarding Assets/tey';
/** Teyro's own illustrations (components/art), never a stock icon. */
const BENEFIT_ART: Record<string, ArtName> = {
  courses: 'books',
  limit: 'infinity',
  hearts: 'heart',
  streak: 'shield',
};

const REASONS: { reason: ExitReason; label: string; art: ArtName }[] = [
  { reason: 'TOO_EXPENSIVE', label: "It's too expensive", art: 'wallet' },
  { reason: 'NOT_SURE', label: "I'm not sure it's for me", art: 'question' },
  { reason: 'JUST_LOOKING', label: "I'm just looking around", art: 'compass' },
  { reason: 'DECIDE_LATER', label: "I'll decide later", art: 'hourglass' },
  { reason: 'OTHER', label: 'Something else', art: 'bubbles' },
];

export default function ProPaywall({ moment, context = {}, onDismiss, onPro, closeDelaySeconds = 3 }: Props) {
  const reduce = useReducedMotion();
  const sessionId = useMemo(() => newId(), []);
  const [plans, setPlans] = useState<ProPlans | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [view, setView] = useState<View>('plans');
  const [selected, setSelected] = useState<ProPlan>('YEARLY');
  const [sheet, setSheet] = useState<SheetPlan | null>(null);
  const [offer, setOffer] = useState<OfferView | null>(null);
  const [failure, setFailure] = useState<SheetFailure | null>(null);
  const [note, setNote] = useState<{ title: string; body: string; why: PaywallDismissal } | null>(null);
  const [proof, setProof] = useState<{ lessonsCompletedThisWeek: number | null; learnersThisWeek: number | null } | null>(null);
  const [otherText, setOtherText] = useState('');
  const [otherOpen, setOtherOpen] = useState(false);
  const [surveyBusy, setSurveyBusy] = useState(false);
  const [showClose, setShowClose] = useState(closeDelaySeconds <= 0);
  const [proStatus, setProStatus] = useState<ProStatus | null>(null);
  const [startedTrial, setStartedTrial] = useState(false);
  const viewed = useRef(false);

  const track = useCallback(
    (type: PaywallEventType, extra: { plan?: ProPlan; offerId?: string; attemptId?: string; errorCode?: string; declineCode?: string } = {}) => {
      captureEvent(`paywall_${type.toLowerCase()}`, { moment, ...extra });
      return trackPaywall({ sessionId, moment, type, ...extra });
    },
    [moment, sessionId],
  );

  useEffect(() => {
    let cancelled = false;
    proApi
      .plans()
      .then((p) => {
        if (cancelled) return;
        setPlans(p);
        if (p.offer) setOffer(p.offer);
      })
      .catch(() => !cancelled && setLoadError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!plans || viewed.current) return;
    viewed.current = true;
    void track('VIEW');
    playWhoosh('up');
  }, [plans, track]);

  useEffect(() => {
    if (showClose) return;
    const t = window.setTimeout(() => setShowClose(true), closeDelaySeconds * 1000);
    return () => window.clearTimeout(t);
  }, [closeDelaySeconds, showClose]);

  const planOf = (p: ProPlan) => plans?.plans.find((x) => x.plan === p) ?? null;
  const yearly = planOf('YEARLY');
  const monthly = planOf('MONTHLY');
  const trialEligible = !!plans?.trialEligible;
  const trialDays = plans?.trialDays ?? 7;
  // Pro covers every course, so an old course plan stops renewing once Pro is paid for.
  const renewals = plans?.courseRenewals ?? [];
  const renewalNote =
    renewals.length === 1
      ? `Your ${renewals[0].title} plan stops renewing once Pro is paid for. You keep it until ${new Date(renewals[0].renewsAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}, at no extra charge.`
      : renewals.length > 1
        ? `Your ${renewals.length} course plans stop renewing once Pro is paid for. You keep each one until it ends, at no extra charge.`
        : null;
  const headline = headlineFor(moment, context);
  const benefits = benefitsFor(moment);

  const openSheet = useCallback(
    (plan: ProPlan, opts: { offer?: OfferView | null; trial?: boolean } = {}) => {
      const p = plans?.plans.find((x) => x.plan === plan);
      if (!p) return;
      const useOffer = opts.offer && opts.offer.plan === plan ? opts.offer : null;
      setSheet({
        plan,
        trial: opts.trial ?? trialEligible,
        trialDays,
        amountMinor: useOffer ? useOffer.firstYearMinor : p.priceMinor,
        renewalMinor: p.priceMinor,
        offerId: useOffer?.id,
      });
      playHaptic('light');
      void track('SHEET_OPEN', { plan, offerId: useOffer?.id });
    },
    [plans, trialEligible, trialDays, track],
  );

  const close = useCallback(async () => {
    playHaptic('light');
    const next = await track('CLOSE');
    if (next?.type === 'EXIT_SURVEY') {
      setView('survey');
      void track('SURVEY_SHOWN');
      return;
    }
    onDismiss('closed');
  }, [track, onDismiss]);

  async function answer(reason: ExitReason) {
    if (surveyBusy) return;
    if (reason === 'OTHER' && !otherOpen) {
      setOtherOpen(true);
      return;
    }
    setSurveyBusy(true);
    playHaptic('selection');
    try {
      const res = await proApi.exitSurvey({
        sessionId,
        reason,
        freeText: reason === 'OTHER' ? otherText.trim() || undefined : undefined,
        plan: selected,
        moment,
      });
      routeTo(res.route, res.offer, res.proof ?? null);
    } catch {
      onDismiss('closed');
    } finally {
      setSurveyBusy(false);
    }
  }

  function routeTo(
    route: ExitRoute,
    newOffer: OfferView | null,
    proofData: { lessonsCompletedThisWeek: number | null; learnersThisWeek: number | null } | null,
  ) {
    switch (route) {
      case 'DISCOUNT_OFFER':
        if (newOffer) {
          setOffer(newOffer);
          setView('offer');
          void track('OFFER_SHOWN', { offerId: newOffer.id, plan: newOffer.plan });
          playScenePop(0);
          return;
        }
        setView('monthly');
        return;
      case 'MONTHLY_PLAN':
        setView('monthly');
        return;
      case 'PROOF':
        setProof(proofData);
        setView('proof');
        return;
      case 'REMINDER':
        setNote({ title: "Got it. We'll remind you tomorrow", body: 'Keep learning for free in the meantime.', why: 'remind_later' });
        setView('note');
        return;
      case 'LET_IN':
        onDismiss('let_in');
        return;
      default:
        setNote({ title: 'Thanks for telling us', body: 'It helps us make Teyro better for you.', why: 'thanks' });
        setView('note');
    }
  }

  async function onSheetClosed(attemptId: string | null) {
    const plan = sheet?.plan ?? selected;
    setSheet(null);
    const next = await track('SHEET_CLOSE', { plan, attemptId: attemptId ?? undefined });
    if (next?.type === 'RECOVERY') {
      if (next.offer) setOffer(next.offer);
      setView('recovery');
      void track('RECOVERY_SHOWN', { plan, offerId: next.offer?.id });
    }
  }

  function onSucceeded(status: ProStatus, trial: boolean) {
    setSheet(null);
    setProStatus(status);
    setStartedTrial(trial);
    setView('success');
    void track('PAYMENT_SUCCEEDED', { plan: status.plan ?? undefined });
    captureEvent(trial ? 'pro_trial_started' : 'pro_subscribed', { moment, plan: status.plan });
    celebrationHaptic('big');
    playClaimArpeggio();
    if (!reduce) {
      fireConfetti({ particleCount: 140, spread: 90, origin: { y: 0.35 } });
    }
  }

  function onFailed(f: SheetFailure, attemptId: string | null) {
    setSheet(null);
    setFailure(f);
    setView('failed');
    playHaptic('error');
    void track('PAYMENT_FAILED', {
      plan: selected,
      attemptId: attemptId ?? undefined,
      errorCode: f.code,
      declineCode: f.declineCode ?? undefined,
    });
  }

  // ── Render ────────────────────────────────────────────────────────────────
  if (loadError) {
    return (
      <Shell onClose={() => onDismiss('closed')} showClose>
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Plans didn&apos;t load</h2>
          <p className={styles.panelBody}>Check your connection and try again.</p>
          <button type="button" className={styles.cta} onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </Shell>
    );
  }

  if (!plans || !yearly || !monthly) {
    return (
      <Shell onClose={() => onDismiss('closed')} showClose={false}>
        <div className={styles.skeleton} aria-busy="true" aria-label="Loading plans">
          <div className={styles.skelHero} />
          <div className={styles.skelLine} />
          <div className={styles.skelLineShort} />
          <div className={styles.skelCard} />
          <div className={styles.skelCard} />
        </div>
      </Shell>
    );
  }

  if (!plans.enabled) {
    return (
      <Shell onClose={() => onDismiss('closed')} showClose>
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Teyro Pro is almost here</h2>
          <p className={styles.panelBody}>Pro isn&apos;t open yet. Keep learning for free and we&apos;ll let you know.</p>
          <button type="button" className={styles.cta} onClick={() => onDismiss('closed')}>
            Keep learning
          </button>
        </div>
      </Shell>
    );
  }

  const chosen = selected === 'YEARLY' ? yearly : monthly;
  const trialEnd = new Date(Date.now() + trialDays * 86_400_000);
  const reminder = new Date(trialEnd.getTime() - 2 * 86_400_000);

  return (
    <Shell onClose={view === 'plans' ? close : () => onDismiss('closed')} showClose={showClose && view !== 'success'}>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          className={styles.viewWrap}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {view === 'plans' && (
            <div className={styles.plansView}>
              <motion.div
                className={styles.hero}
                initial={reduce ? false : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              >
                <Image src={`${TEY}/cheering.webp`} alt="" width={96} height={96} priority className={styles.heroTey} />
                <span className={styles.proPill}>PRO</span>
              </motion.div>

              <h1 className={styles.title}>{headline.title}</h1>
              <p className={styles.subtitle}>{headline.sub}</p>

              <ul className={styles.benefits}>
                {benefits.map((b, i) => {
                  const art = BENEFIT_ART[b.key] ?? 'spark';
                  return (
                    <motion.li
                      key={b.key}
                      className={styles.benefit}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                    >
                      <span className={styles.benefitIcon}>
                        <Art name={art} size={34} />
                      </span>
                      <strong title={b.body}>{b.title}</strong>
                    </motion.li>
                  );
                })}
              </ul>

              <div className={styles.planCards} role="radiogroup" aria-label="Choose a plan">
                <PlanCard
                  active={selected === 'YEARLY'}
                  onClick={() => {
                    setSelected('YEARLY');
                    void track('PLAN_SELECT', { plan: 'YEARLY' });
                  }}
                  label="Yearly"
                  badge={yearly.savingsPct > 0 ? `Best value · Save ${yearly.savingsPct}%` : 'Best value'}
                  price={`${formatPrice(yearly.perMonthMinor)}/mo`}
                  detail={`${formatPrice(yearly.priceMinor)} a year${trialEligible ? ` after your ${trialDays}-day free trial` : ''}`}
                  strike={formatPrice(monthly.priceMinor * 12)}
                />
                <PlanCard
                  active={selected === 'MONTHLY'}
                  onClick={() => {
                    setSelected('MONTHLY');
                    void track('PLAN_SELECT', { plan: 'MONTHLY' });
                  }}
                  label="Monthly"
                  price={`${formatPrice(monthly.priceMinor)}/mo`}
                  detail={trialEligible ? `After your ${trialDays}-day free trial` : 'Billed every month'}
                />
              </div>

              {trialEligible && (
                <TrialTimeline
                  trialDays={trialDays}
                  reminder={reminder}
                  charge={trialEnd}
                  amount={formatPrice(chosen.priceMinor)}
                  interval={selected === 'YEARLY' ? 'year' : 'month'}
                />
              )}

              <div className={styles.ctaDock}>
                <button
                  type="button"
                  className={`${styles.cta} ${styles.ctaGreen}`}
                  onClick={() => openSheet(selected)}
                  disabled={!plans.checkoutReady}
                >
                  {ctaFor({ trial: trialEligible, trialDays, plan: selected, dueTodayMinor: chosen.priceMinor })}
                </button>
                <p className={styles.reassure}>
                  {!plans.checkoutReady
                    ? 'Card payments are switched off in this environment.'
                    : trialEligible
                      ? `No charge today. ${formatPrice(chosen.priceMinor)} on ${formatDay(trialEnd)}. Cancel anytime in 2 taps.`
                      : 'Cancel anytime in 2 taps.'}
                </p>
                {plans.mobileMoney.enabled && (
                  <button
                    type="button"
                    className={styles.ghostLink}
                    onClick={() => {
                      setView('momo');
                      void track('MOBILE_MONEY_OPEN', { plan: selected });
                    }}
                  >
                    <Art name="wallet" size={22} /> Pay with Mobile Money instead
                  </button>
                )}
              </div>

              {renewalNote && <p className={styles.fine}>{renewalNote}</p>}
              <p className={styles.fine}>
                Teyro Pro renews automatically until you cancel. Manage or cancel anytime in Settings.{' '}
                <a href="/terms" target="_blank" rel="noreferrer">
                  Terms
                </a>{' '}
                ·{' '}
                <a href="/privacy" target="_blank" rel="noreferrer">
                  Privacy
                </a>
              </p>
            </div>
          )}

          {view === 'survey' && (
            <div className={styles.panel}>
              <Image src={`${TEY}/thinking.webp`} alt="" width={96} height={96} className={styles.panelTey} />
              <h2 className={styles.panelTitle}>Before you go, what&apos;s holding you back?</h2>
              <div className={styles.reasons}>
                {REASONS.map(({ reason, label, art }) => (
                  <button
                    key={reason}
                    type="button"
                    className={styles.reason}
                    disabled={surveyBusy}
                    onClick={() => answer(reason)}
                  >
                    <Art name={art} size={36} />
                    {label}
                  </button>
                ))}
              </div>
              {otherOpen && (
                <div className={styles.otherBox}>
                  <textarea
                    value={otherText}
                    maxLength={500}
                    placeholder="Tell us in a few words (optional)"
                    onChange={(e) => setOtherText(e.target.value)}
                  />
                  <button type="button" className={styles.cta} disabled={surveyBusy} onClick={() => answer('OTHER')}>
                    Send
                  </button>
                </div>
              )}
              <button type="button" className={styles.ghostLink} onClick={() => onDismiss('closed')}>
                Skip
              </button>
            </div>
          )}

          {view === 'offer' && offer && (
            <OfferPanel
              offer={offer}
              trialEligible={trialEligible}
              trialDays={trialDays}
              onAccept={() => {
                void track('OFFER_ACCEPTED', { offerId: offer.id, plan: offer.plan });
                setSelected('YEARLY');
                openSheet('YEARLY', { offer });
              }}
              onDecline={() => {
                void track('OFFER_DISMISSED', { offerId: offer.id });
                onDismiss('closed');
              }}
            />
          )}

          {view === 'monthly' && (
            <div className={styles.panel}>
              <Image src={`${TEY}/pointing.webp`} alt="" width={96} height={96} className={styles.panelTey} />
              <h2 className={styles.panelTitle}>Start smaller: month by month</h2>
              <p className={styles.panelBody}>
                {formatPrice(monthly.priceMinor)} a month, cancel whenever you like.
                {trialEligible ? ` Your first ${trialDays} days are free.` : ''}
              </p>
              <button
                type="button"
                className={`${styles.cta} ${styles.ctaGreen}`}
                onClick={() => {
                  setSelected('MONTHLY');
                  openSheet('MONTHLY');
                }}
              >
                {ctaFor({ trial: trialEligible, trialDays, plan: 'MONTHLY', dueTodayMinor: monthly.priceMinor })}
              </button>
              <button type="button" className={styles.ghostLink} onClick={() => onDismiss('closed')}>
                Not now
              </button>
            </div>
          )}

          {view === 'proof' && (
            <div className={styles.panel}>
              <Image src={`${TEY}/tablet.webp`} alt="" width={96} height={96} className={styles.panelTey} />
              <h2 className={styles.panelTitle}>Try it before you decide</h2>
              <p className={styles.panelBody}>
                {trialEligible
                  ? `Use everything free for ${trialDays} days. We remind you 2 days before it ends, and you can cancel in 2 taps.`
                  : 'Cancel anytime in 2 taps. No questions.'}
              </p>
              {(proof?.lessonsCompletedThisWeek || proof?.learnersThisWeek) && (
                <div className={styles.proofRow}>
                  {proof.learnersThisWeek && (
                    <span>
                      <strong>{proof.learnersThisWeek.toLocaleString()}</strong> people learned this week
                    </span>
                  )}
                  {proof.lessonsCompletedThisWeek && (
                    <span>
                      <strong>{proof.lessonsCompletedThisWeek.toLocaleString()}</strong> lessons finished
                    </span>
                  )}
                </div>
              )}
              <ul className={styles.benefitsCompact}>
                {benefits.slice(0, 3).map((b) => (
                  <li key={b.key}>
                    <Art name={BENEFIT_ART[b.key] ?? 'spark'} size={26} /> {b.title}
                  </li>
                ))}
              </ul>
              <button type="button" className={`${styles.cta} ${styles.ctaGreen}`} onClick={() => openSheet(selected)}>
                {ctaFor({ trial: trialEligible, trialDays, plan: selected, dueTodayMinor: chosen.priceMinor })}
              </button>
              <button type="button" className={styles.ghostLink} onClick={() => onDismiss('closed')}>
                Not now
              </button>
            </div>
          )}

          {view === 'note' && note && (
            <div className={styles.panel}>
              <span className={styles.noteIcon}>
                <Art name="bell" size={72} />
              </span>
              <h2 className={styles.panelTitle}>{note.title}</h2>
              <p className={styles.panelBody}>{note.body}</p>
              <button type="button" className={styles.cta} onClick={() => onDismiss(note.why)}>
                Keep learning
              </button>
            </div>
          )}

          {view === 'recovery' && (
            <div className={styles.panel}>
              <Image src={`${TEY}/flame.webp`} alt="" width={96} height={96} className={styles.panelTey} />
              <h2 className={styles.panelTitle}>Still want Teyro Pro {planLabel(selected)}?</h2>
              <p className={styles.panelBody}>
                {trialEligible
                  ? `You're one step from your free trial. Nothing is charged today.`
                  : `You're one step away. Cancel anytime in 2 taps.`}
              </p>
              <button
                type="button"
                className={`${styles.cta} ${styles.ctaGreen}`}
                onClick={() => {
                  void track('RECOVERY_ACCEPTED', { plan: selected });
                  openSheet(selected);
                }}
              >
                Continue with {planLabel(selected)}
              </button>
              {selected === 'YEARLY' && offer && (
                <button
                  type="button"
                  className={styles.offerChip}
                  onClick={() => {
                    void track('OFFER_ACCEPTED', { offerId: offer.id, plan: 'YEARLY' });
                    openSheet('YEARLY', { offer });
                  }}
                >
                  Or take {offer.percentOff}% off your first year: {formatPrice(offer.firstYearMinor)}
                </button>
              )}
              {selected === 'YEARLY' && (
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={() => {
                    setSelected('MONTHLY');
                    void track('RECOVERY_ACCEPTED', { plan: 'MONTHLY' });
                    openSheet('MONTHLY');
                  }}
                >
                  Try Monthly instead · {formatPrice(monthly.priceMinor)}/mo
                </button>
              )}
              <button
                type="button"
                className={styles.ghostLink}
                onClick={() => {
                  void track('RECOVERY_DISMISSED', { plan: selected });
                  onDismiss('closed');
                }}
              >
                Not now
              </button>
            </div>
          )}

          {view === 'failed' && failure && (
            <div className={styles.panel}>
              <span className={styles.failIcon}>
                <Art name="card" size={72} />
              </span>
              <h2 className={styles.panelTitle}>That payment didn&apos;t go through</h2>
              <p className={styles.panelBody}>{failure.message}</p>
              <button type="button" className={`${styles.cta} ${styles.ctaGreen}`} onClick={() => openSheet(selected, { offer })}>
                Try again
              </button>
              {plans.mobileMoney.enabled && (
                <button type="button" className={styles.secondaryBtn} onClick={() => setView('momo')}>
                  Pay with Mobile Money instead
                </button>
              )}
              <button type="button" className={styles.ghostLink} onClick={() => onDismiss('closed')}>
                Not now
              </button>
            </div>
          )}

          {view === 'trialUsed' && (
            <div className={styles.panel}>
              <span className={styles.noteIcon}>
                <Art name="card" size={72} />
              </span>
              <h2 className={styles.panelTitle}>This card already had a free trial</h2>
              <p className={styles.panelBody}>
                Free trials are one per person and per card. You can still join Pro today: nothing was charged.
              </p>
              <button
                type="button"
                className={`${styles.cta} ${styles.ctaGreen}`}
                onClick={() => openSheet(selected, { trial: false, offer })}
              >
                Subscribe for {formatPrice(offer && selected === 'YEARLY' ? offer.firstYearMinor : chosen.priceMinor)}
              </button>
              <button type="button" className={styles.ghostLink} onClick={() => onDismiss('closed')}>
                Not now
              </button>
            </div>
          )}

          {view === 'momo' && (
            <ProMobileMoney
              plans={plans.plans}
              initialPlan={selected}
              onBack={() => setView('plans')}
              onPro={(status) => onSucceeded(status, false)}
            />
          )}

          {view === 'success' && (
            <div className={styles.panel}>
              <motion.div
                initial={reduce ? false : { scale: 0.6, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 12 }}
              >
                <Image src={`${TEY}/cheering.webp`} alt="" width={140} height={140} className={styles.panelTey} />
              </motion.div>
              <h2 className={styles.panelTitle}>Welcome to Teyro Pro</h2>
              <p className={styles.panelBody}>
                {startedTrial && proStatus?.trialEndsAt
                  ? `Your free trial runs until ${formatDay(new Date(proStatus.trialEndsAt))}. We'll remind you on ${formatDay(
                      new Date(new Date(proStatus.trialEndsAt).getTime() - 2 * 86_400_000),
                    )}.`
                  : 'Every course is open. No limits, unlimited hearts.'}
              </p>
              <button
                type="button"
                className={`${styles.cta} ${styles.ctaGreen}`}
                onClick={() => proStatus && onPro(proStatus)}
              >
                Let&apos;s go
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {sheet && (
        <ProPaymentSheet
          open={!!sheet}
          sheet={sheet}
          moment={moment}
          paywallSessionId={sessionId}
          onClose={onSheetClosed}
          onSubmit={(attemptId) => void track('PAYMENT_SUBMIT', { plan: sheet.plan, attemptId, offerId: sheet.offerId })}
          onSuccess={onSucceeded}
          onFailed={onFailed}
          onTrialUsed={() => {
            setSheet(null);
            setView('trialUsed');
          }}
        />
      )}
    </Shell>
  );
}

function Shell({ children, onClose, showClose }: { children: React.ReactNode; onClose: () => void; showClose: boolean }) {
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Teyro Pro">
      <div className={styles.glow} aria-hidden />
      <AnimatePresence>
        {showClose && (
          <motion.button
            type="button"
            className={styles.close}
            aria-label="Close"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <Glyph name="close" size={20} strokeWidth={3.2} />
          </motion.button>
        )}
      </AnimatePresence>
      <div className={styles.scroll}>{children}</div>
    </div>
  );
}

function PlanCard(props: {
  active: boolean;
  onClick: () => void;
  label: string;
  price: string;
  detail: string;
  badge?: string;
  strike?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={props.active}
      className={`${styles.planCard} ${props.active ? styles.planCardOn : ''}`}
      onClick={props.onClick}
    >
      {props.badge && <span className={styles.planBadge}>{props.badge}</span>}
      <span className={styles.planRadio} aria-hidden>
        {props.active && <Glyph name="check" size={14} strokeWidth={3.8} />}
      </span>
      <span className={styles.planText}>
        <span className={styles.planLabel}>{props.label}</span>
        <span className={styles.planDetail}>{props.detail}</span>
      </span>
      <span className={styles.planPriceCol}>
        <span className={styles.planPrice}>{props.price}</span>
        {props.strike && (
          <span className={styles.planStrike}>
            <s>{props.strike}</s> on Monthly
          </span>
        )}
      </span>
    </button>
  );
}

/** Playbook: remove the fear of forgetting to cancel, right on the paywall. */
function TrialTimeline(props: { trialDays: number; reminder: Date; charge: Date; amount: string; interval: string }) {
  const steps = [
    { art: 'gift' as ArtName, title: 'Today', body: 'Every course opens. No limits, unlimited hearts.' },
    { art: 'bell' as ArtName, title: formatDay(props.reminder), body: 'We remind you your trial ends in 2 days.' },
    { art: 'card' as ArtName, title: formatDay(props.charge), body: `You're charged ${props.amount}/${props.interval}. Cancel anytime before.` },
  ];
  return (
    <ol className={styles.timeline} aria-label="How your free trial works">
      {steps.map((s, i) => (
        <li key={s.title} className={styles.timelineStep}>
          <span className={`${styles.timelineDot} ${i === 0 ? styles.timelineDotNow : ''}`}>
            <Art name={s.art} size={30} />
          </span>
          <span>
            <strong>{s.title}</strong>
            <span className={styles.timelineBody}>{s.body}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/** A real offer with a real deadline: the countdown is the server's expiry. */
function OfferPanel(props: {
  offer: OfferView;
  trialEligible: boolean;
  trialDays: number;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const [left, setLeft] = useState(() => new Date(props.offer.expiresAt).getTime() - Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setLeft(new Date(props.offer.expiresAt).getTime() - Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [props.offer.expiresAt]);
  const expired = left <= 0;
  const h = Math.max(0, Math.floor(left / 3_600_000));
  const m = Math.max(0, Math.floor((left % 3_600_000) / 60_000));
  const s = Math.max(0, Math.floor((left % 60_000) / 1000));
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className={styles.panel}>
      <Image src={`${TEY}/badge.webp`} alt="" width={96} height={96} className={styles.panelTey} />
      <span className={styles.offerBadge}>One-time offer</span>
      <h2 className={styles.panelTitle}>{props.offer.percentOff}% off your first year</h2>
      <p className={styles.offerPrice}>
        <span className={styles.offerOld}>{formatPrice(props.offer.renewalMinor)}</span>
        <strong>{formatPrice(props.offer.firstYearMinor)}</strong>
        <span className={styles.offerPer}>for your first year</span>
      </p>
      <p className={styles.panelBody}>
        Then {formatPrice(props.offer.renewalMinor)} a year.
        {props.trialEligible ? ` Still starts with ${props.trialDays} days free.` : ''} Shown once, just for you.
      </p>
      {!expired ? (
        <p className={styles.countdown} aria-live="polite">
          Ends in {pad(h)}:{pad(m)}:{pad(s)}
        </p>
      ) : (
        <p className={styles.countdown}>This offer has ended.</p>
      )}
      <button type="button" className={`${styles.cta} ${styles.ctaGold}`} disabled={expired} onClick={props.onAccept}>
        Claim {props.offer.percentOff}% off
      </button>
      <button type="button" className={styles.ghostLink} onClick={props.onDecline}>
        No thanks
      </button>
    </div>
  );
}
