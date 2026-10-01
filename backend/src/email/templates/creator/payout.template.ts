import { RenderedEmail } from '../../types';
import {
  ctaButton,
  escapeHtml,
  paragraph,
  renderLayout,
  safeName,
  smallMuted,
} from '../shared';

export type PayoutStatus = 'INITIATED' | 'COMPLETED' | 'FAILED';

export interface PayoutEmailData {
  firstName: string;
  status: PayoutStatus;
  amount: number;
  currency: string;
  earningsUrl: string;
  failureReason?: string;
}

function formatAmount(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

const COPY: Record<
  PayoutStatus,
  { subject: string; line: (amt: string) => string }
> = {
  INITIATED: {
    subject: 'Your payout is on its way',
    line: (amt) => `Your payout of <strong>${amt}</strong> is on its way.`,
  },
  COMPLETED: {
    subject: 'Your payout has landed',
    line: (amt) => `Your payout of <strong>${amt}</strong> is complete.`,
  },
  FAILED: {
    subject: "Your payout didn't go through",
    line: (amt) =>
      `We tried to send your payout of <strong>${amt}</strong>, but it failed.`,
  },
};

export function renderPayoutEmail(data: PayoutEmailData): RenderedEmail {
  const name = safeName(data.firstName);
  const amount = formatAmount(data.amount, data.currency);
  const copy = COPY[data.status];

  const bodyHtml = `
    ${paragraph(`Hey ${name}.`)}
    ${paragraph(copy.line(amount))}
    ${data.status === 'FAILED' && data.failureReason ? smallMuted(escapeHtml(data.failureReason)) : ''}
    ${ctaButton('View earnings', data.earningsUrl)}
  `;

  return {
    subject: copy.subject,
    html: renderLayout({ bodyHtml, preheader: copy.subject }),
  };
}
