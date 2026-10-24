import { RenderedEmail } from '../../types';
import {
  bulletList,
  ctaButton,
  escapeHtml,
  paragraph,
  renderLayout,
  safeName,
  smallMuted,
  teySays,
  teySignOff,
} from '../shared';

/**
 * Every Teyro Pro billing email, in Tey's voice. One file so the promises
 * these emails make (dates, amounts, "you won't be charged") can be read
 * side by side with the paywall's, and so they never drift apart.
 *
 * Rules: every number is real (passed in from the subscription row or the
 * Stripe invoice), every date is the learner's, and an email that tells
 * someone they won't be charged is only ever sent when that is true (the
 * processor re-checks the subscription before rendering).
 */

export const PRO_BILLING_EMAIL_KINDS = [
  'trial-started',
  'trial-reminder',
  'trial-ended',
  'converted',
  'payment-failed',
  'action-required',
  'access-ended',
  'renewal-upcoming',
  'cancel-confirmed',
  'refunded',
  'prepaid-paid',
  'prepaid-ending',
  'prepaid-ended',
  'checkout-recovery',
  'decide-later',
] as const;
export type ProBillingEmailKind = (typeof PRO_BILLING_EMAIL_KINDS)[number];

/** Marketing ones respect unsubscribes; the rest are about money and always go. */
export const PRO_MARKETING_EMAILS: ReadonlySet<ProBillingEmailKind> = new Set([
  'checkout-recovery',
  'decide-later',
]);

export interface ProBillingEmailData {
  firstName: string;
  appUrl: string;
  /** "yearly" | "monthly" */
  plan?: 'yearly' | 'monthly';
  /** Pre-formatted money, e.g. "$59.99". */
  amount?: string;
  /** Pre-formatted dates in the learner's timezone. */
  date?: string;
  reminderDate?: string;
  /** Lessons finished during the trial (trial reminder only, shown when > 0). */
  trialLessons?: number;
  /** First charge after a trial failed: there is no grace period. */
  noGrace?: boolean;
  /** Stripe's hosted page for a payment that needs the bank's yes. */
  actionUrl?: string;
  /** Prepaid days left: 3 or 1. */
  daysLeft?: number;
  /** A real, unexpired exit offer the learner still holds. */
  offer?: { percentOff: number; endsAt: string };
  /** Never had a trial, so the 7-day free trial is still theirs. */
  trialAvailable?: boolean;
  /** The cancellation was made during the trial. */
  wasTrial?: boolean;
  /** Marketing kinds only. */
  unsubscribeUrl?: string;
  preferencesUrl?: string;
}

const PRO_BENEFITS = [
  'Every course on Teyro, including creator courses',
  'As many lessons a day as you want',
  'Unlimited hearts, so mistakes never stop you',
  'A free streak repair every month',
];

export function renderProBillingEmail(
  kind: ProBillingEmailKind,
  d: ProBillingEmailData,
): RenderedEmail {
  const name = safeName(d.firstName);
  const amount = escapeHtml(d.amount ?? '');
  const date = escapeHtml(d.date ?? '');
  const plan = d.plan ? `${d.plan} ` : '';
  const settings = `${d.appUrl}/dashboard/settings`;
  const learn = `${d.appUrl}/dashboard`;
  const pro = `${d.appUrl}/pro`;
  const updateCard = `${d.appUrl}/pro/billing/update-card`;

  let subject: string;
  let body: string;

  switch (kind) {
    case 'trial-started':
      subject = 'Your 7-day Teyro Pro trial has started';
      body = `
        ${teySays(`You're Pro now, ${name}.`)}
        ${paragraph('Every course is open, lessons are unlimited and mistakes never cost hearts.')}
        ${paragraph(`Your trial runs until <strong>${date}</strong>. I'll email you on ${escapeHtml(d.reminderDate ?? '')}, two days before it ends.`)}
        ${paragraph(`If you keep Pro, your card is charged <strong>${amount}</strong> for ${escapeHtml(plan)}Pro on ${date}. Cancel any time before then in Settings and you won't pay anything.`)}
        ${ctaButton('Keep learning', learn)}
        ${smallMuted('Manage or cancel any time: Settings, then Teyro Pro.')}
      `;
      break;

    case 'trial-reminder':
      subject = `Your Teyro Pro trial ends on ${d.date ?? 'soon'}`;
      body = `
        ${teySays('A heads-up, as promised.')}
        ${paragraph(`Hey ${name}. Your Teyro Pro trial ends on <strong>${date}</strong>.`)}
        ${d.trialLessons ? paragraph(`In your trial you finished <strong>${d.trialLessons}</strong> ${d.trialLessons === 1 ? 'lesson' : 'lessons'}. Nice.`) : ''}
        ${paragraph(`If you do nothing, your card is charged <strong>${amount}</strong> for ${escapeHtml(plan)}Pro and every course stays open.`)}
        ${paragraph("If Pro isn't for you, cancel before then in Settings and you won't be charged. Your progress, streak and Coins stay yours either way.")}
        ${ctaButton('Review my plan', settings)}
      `;
      break;

    case 'trial-ended':
      subject = "Your trial ended. You weren't charged.";
      body = `
        ${teySays('No charge, promise.')}
        ${paragraph(`Hey ${name}. Your Teyro Pro trial is over and no money was taken.`)}
        ${paragraph("You're on the free plan now: Chapter 1 of your course and two lessons a day. Your progress, streak and Coins are all still here.")}
        ${ctaButton('Keep learning', learn)}
        ${smallMuted('You can come back to Pro any time from the app.')}
      `;
      break;

    case 'converted':
      subject = 'Welcome to Teyro Pro, for real';
      body = `
        ${teySays(`It's official, ${name}.`)}
        ${paragraph(`Your trial became ${escapeHtml(plan)}Teyro Pro. We charged <strong>${amount}</strong>${d.date ? ` and it renews on <strong>${date}</strong>` : ''}.`)}
        ${paragraph('Every course stays open. Let’s use it.')}
        ${ctaButton('Keep learning', learn)}
        ${smallMuted('Receipts and your card live in Settings, then Teyro Pro, then Manage billing. Cancel any time there.')}
      `;
      break;

    case 'payment-failed':
      subject = "Your Teyro Pro payment didn't go through";
      body = d.noGrace
        ? `
        ${teySays('Your card said no.')}
        ${paragraph(`Hey ${name}. Your trial ended, but the <strong>${amount}</strong> payment for Teyro Pro didn't go through, so Pro is paused.`)}
        ${paragraph('Update your card and every course opens again straight away. Nothing you did is lost.')}
        ${ctaButton('Update my card', updateCard)}
        ${smallMuted('No money was taken.')}
      `
        : `
        ${teySays('Your card said no.')}
        ${paragraph(`Hey ${name}. We couldn't take the <strong>${amount}</strong> payment for Teyro Pro.`)}
        ${d.date ? paragraph(`You keep Pro until <strong>${date}</strong> while we try again. Update your card before then so you don't lose a day.`) : paragraph("Update your card so you don't lose Pro.")}
        ${ctaButton('Update my card', updateCard)}
        ${smallMuted('No money was taken. If it keeps failing, your bank may be blocking the payment.')}
      `;
      break;

    case 'action-required':
      subject = 'Your bank needs you to confirm a payment';
      body = `
        ${teySays('One quick yes from you.')}
        ${paragraph(`Hey ${name}. Your bank wants you to confirm the <strong>${amount}</strong> payment for Teyro Pro. It takes a few seconds.`)}
        ${ctaButton('Confirm the payment', d.actionUrl || updateCard)}
        ${smallMuted("Nothing is charged until you confirm. If you didn't expect this, you can ignore it and Pro will pause.")}
      `;
      break;

    case 'access-ended':
      subject = 'Your Teyro Pro has ended';
      body = `
        ${teySays('Pro has paused.')}
        ${paragraph(`Hey ${name}. We couldn't take payment for Teyro Pro, so it has ended. You're on the free plan now and nothing you did is lost.`)}
        ${paragraph('Update your card and every course opens again.')}
        ${ctaButton('Restart Pro', pro)}
      `;
      break;

    case 'renewal-upcoming':
      subject = `Your Teyro Pro renews on ${d.date ?? 'soon'}`;
      body = `
        ${teySays('A friendly heads-up.')}
        ${paragraph(`Hey ${name}. Your yearly Teyro Pro renews on <strong>${date}</strong> for <strong>${amount}</strong>.`)}
        ${paragraph("Nothing to do if you'd like to keep it. To cancel, do it before then in Settings.")}
        ${ctaButton('Manage my plan', settings)}
      `;
      break;

    case 'cancel-confirmed':
      subject = d.wasTrial
        ? "Your trial is cancelled. You won't be charged."
        : "You've cancelled Teyro Pro";
      body = `
        ${teySays(d.wasTrial ? 'Done. No charge.' : 'Done.')}
        ${paragraph(`Hey ${name}. Pro stays on until <strong>${date}</strong>. After that you'll be on the free plan, and you won't be charged again.`)}
        ${paragraph('Changed your mind? Turn renewal back on in Settings before then.')}
        ${ctaButton('Keep learning', learn)}
      `;
      break;

    case 'refunded':
      subject = 'Your Teyro Pro refund is on its way';
      body = `
        ${paragraph(`Hey ${name}. We've refunded your Teyro Pro payment${amount ? ` of <strong>${amount}</strong>` : ''}, so Pro has ended.`)}
        ${paragraph('Banks usually show a refund within 5 to 10 business days. Your progress is still here, and Chapter 1 of your course stays free.')}
        ${ctaButton('Keep learning', learn)}
      `;
      break;

    case 'prepaid-paid':
      subject = 'Your Teyro Pro is paid up';
      body = `
        ${teySays(`You're Pro, ${name}.`)}
        ${paragraph(`Your Mobile Money payment of <strong>${amount}</strong> went through. Pro is yours until <strong>${date}</strong>.`)}
        ${paragraph("Mobile Money plans don't renew by themselves. I'll remind you 3 days before it ends.")}
        ${ctaButton('Keep learning', learn)}
      `;
      break;

    case 'prepaid-ending':
      subject = d.daysLeft === 1 ? 'Your Teyro Pro ends tomorrow' : `${d.daysLeft ?? 3} days left on your Teyro Pro`;
      body = `
        ${paragraph(`Hey ${name}. Your Teyro Pro ends on <strong>${date}</strong>.`)}
        ${paragraph("Mobile Money plans don't renew by themselves. Renew before then and the new period starts when this one ends, so you never lose a day.")}
        ${ctaButton('Renew Pro', `${pro}?renew=1`)}
        ${smallMuted('Renewing takes one approval on your phone.')}
      `;
      break;

    case 'prepaid-ended':
      subject = 'Your Teyro Pro has ended';
      body = `
        ${paragraph(`Hey ${name}. Your Mobile Money Teyro Pro ended on <strong>${date}</strong>. You're on the free plan now, and your progress and streak are saved.`)}
        ${ctaButton('Renew Pro', `${pro}?renew=1`)}
      `;
      break;

    case 'checkout-recovery':
      subject = 'Still thinking about Teyro Pro?';
      body = `
        ${teySays(`You were one step away, ${name}.`)}
        ${paragraph(`Your ${escapeHtml(plan)}plan is saved. Here's what's waiting:`)}
        ${bulletList(PRO_BENEFITS.map(escapeHtml))}
        ${d.offer ? paragraph(`Your <strong>${d.offer.percentOff}% off the first year</strong> is still yours until ${escapeHtml(d.offer.endsAt)}.`) : ''}
        ${d.trialAvailable ? paragraph('And it starts with a 7-day free trial. Cancel before it ends and you pay nothing.') : ''}
        ${ctaButton('Pick up where I left off', pro)}
        ${teySignOff()}
      `;
      break;

    case 'decide-later':
      subject = 'You asked me to remind you';
      body = `
        ${teySays('Reminding you, as asked.')}
        ${paragraph(`Hey ${name}. You said you'd decide about Teyro Pro later. Here's the short version:`)}
        ${bulletList(PRO_BENEFITS.map(escapeHtml))}
        ${d.trialAvailable ? paragraph('Your 7-day free trial is still waiting. Cancel before it ends and you pay nothing.') : ''}
        ${ctaButton('See Teyro Pro', pro)}
        ${smallMuted("Not for you? No problem. Chapter 1 of your course stays free, two lessons a day.")}
      `;
      break;
  }

  const footer = PRO_MARKETING_EMAILS.has(kind)
    ? { unsubscribeUrl: d.unsubscribeUrl, preferencesUrl: d.preferencesUrl }
    : {};
  return { subject, html: renderLayout({ bodyHtml: body, preheader: subject, ...footer }) };
}
