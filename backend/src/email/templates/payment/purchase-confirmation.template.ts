import { RenderedEmail } from '../../types';
import {
  clip,
  ctaButton,
  escapeHtml,
  paragraph,
  renderLayout,
  safeName,
} from '../shared';

export interface PurchaseConfirmationData {
  firstName: string;
  courseName: string;
  creatorName: string;
  amount: number;
  currency: string;
  paidAt: Date;
  courseUrl: string;
  transactionId?: string;
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

function row(label: string, value: string): string {
  return `<tr style="border-bottom:1px solid #f1f5f9;">
    <td style="padding:8px 0;font-size:14px;color:#64748b;">${label}</td>
    <td style="padding:8px 0;font-size:14px;color:#0f172a;font-weight:700;text-align:right;">${value}</td>
  </tr>`;
}

export function renderPurchaseConfirmationEmail(
  data: PurchaseConfirmationData,
): RenderedEmail {
  const name = safeName(data.firstName);
  const courseName = escapeHtml(clip(data.courseName));
  const amount = formatAmount(data.amount, data.currency);
  const date = data.paidAt.toLocaleDateString('en-US', { dateStyle: 'medium' });

  const rows = [
    row('Course', courseName),
    row('Creator', escapeHtml(clip(data.creatorName))),
    row('Amount', amount),
    row('Date', escapeHtml(date)),
  ];
  if (data.transactionId)
    rows.push(row('Reference', escapeHtml(data.transactionId)));

  const bodyHtml = `
    ${paragraph(`You're in, ${name}. 🎉`)}
    ${paragraph(`<strong>${courseName}</strong> is yours.`)}
    <table style="width:100%;border-collapse:collapse;margin:20px 0;border-top:1px solid #f1f5f9;">
      ${rows.join('')}
    </table>
    ${ctaButton('Start learning', data.courseUrl)}
  `;

  return {
    subject: `You're in. ${clip(data.courseName, 60)} is yours.`,
    html: renderLayout({
      bodyHtml,
      preheader: `Payment confirmed — ${amount}`,
    }),
  };
}
