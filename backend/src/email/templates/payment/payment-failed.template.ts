import { RenderedEmail } from '../../types';
import {
  clip,
  ctaButton,
  escapeHtml,
  paragraph,
  renderLayout,
  safeName,
  smallMuted,
} from '../shared';

export interface PaymentFailedData {
  firstName: string;
  courseName: string;
  retryUrl: string;
  reason?: string;
}

export function renderPaymentFailedEmail(
  data: PaymentFailedData,
): RenderedEmail {
  const name = safeName(data.firstName);
  const courseName = escapeHtml(clip(data.courseName));

  const bodyHtml = `
    ${paragraph(`Hey ${name}.`)}
    ${paragraph(`Your payment for <strong>${courseName}</strong> didn't go through.`)}
    ${data.reason ? smallMuted(escapeHtml(data.reason)) : ''}
    ${ctaButton('Try again', data.retryUrl)}
    ${smallMuted('No charge was made. If this keeps happening, your bank or card may be declining the transaction.')}
  `;

  return {
    subject: "Your payment didn't go through",
    html: renderLayout({
      bodyHtml,
      preheader: `Payment issue with ${data.courseName}`,
    }),
  };
}
