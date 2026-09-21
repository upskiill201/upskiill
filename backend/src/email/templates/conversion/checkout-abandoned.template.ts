import { BaseEmailData, RenderedEmail } from '../../types';
import {
  clip,
  ctaButton,
  escapeHtml,
  paragraph,
  renderLayout,
  safeName,
  smallMuted,
} from '../shared';

export type CheckoutAbandonedStage = 1 | 2 | 3 | 4;

export interface CheckoutAbandonedData extends BaseEmailData {
  stage: CheckoutAbandonedStage;
  courseName: string;
  creatorName: string;
  /** What the course teaches — real course data only, never fabricated (spec §12). */
  shortDescription?: string;
  checkoutUrl: string;
  courseUrl: string;
}

/** No fabricated urgency/scarcity anywhere in this file — spec §12/§8 of the
 *  voice guide. Each stage's copy only ever references real course data. */
export function renderCheckoutAbandonedEmail(
  data: CheckoutAbandonedData,
): RenderedEmail {
  const name = safeName(data.firstName);
  const courseName = escapeHtml(clip(data.courseName));
  const creatorName = escapeHtml(clip(data.creatorName));

  switch (data.stage) {
    case 1: {
      const bodyHtml = `
        ${paragraph(`You were almost there, ${name}.`)}
        ${paragraph(`<strong>${courseName}</strong> is still waiting for you. Pick up where you left off whenever you're ready.`)}
        ${ctaButton('Continue checkout', data.checkoutUrl)}
      `;
      return {
        subject: 'Your course is still waiting 👀',
        html: renderLayout({
          bodyHtml,
          preheader: `${data.courseName} is still waiting`,
          unsubscribeUrl: data.unsubscribeUrl,
          preferencesUrl: data.preferencesUrl,
        }),
      };
    }
    case 2: {
      const desc = data.shortDescription
        ? paragraph(escapeHtml(clip(data.shortDescription, 220)))
        : '';
      const bodyHtml = `
        ${paragraph('Fair.')}
        ${paragraph(`Before you decide, here's what you'll actually get from <strong>${courseName}</strong> by ${creatorName}:`)}
        ${desc}
        ${ctaButton('Continue checkout', data.checkoutUrl)}
      `;
      return {
        subject: 'Still thinking about it?',
        html: renderLayout({
          bodyHtml,
          preheader: `What you'll get from ${data.courseName}`,
          unsubscribeUrl: data.unsubscribeUrl,
          preferencesUrl: data.preferencesUrl,
        }),
      };
    }
    case 3: {
      const desc = data.shortDescription
        ? paragraph(escapeHtml(clip(data.shortDescription, 220)))
        : '';
      const bodyHtml = `
        ${paragraph("Still deciding? Here's the quick version.")}
        ${paragraph(`<strong>${courseName}</strong>, taught by ${creatorName}.`)}
        ${desc}
        ${paragraph('Learn at your own pace, on any device. Your access starts the moment you check out.')}
        ${ctaButton('View course', data.courseUrl)}
      `;
      return {
        subject: 'One more thing',
        html: renderLayout({
          bodyHtml,
          preheader: `${data.courseName} — the quick version`,
          unsubscribeUrl: data.unsubscribeUrl,
          preferencesUrl: data.preferencesUrl,
        }),
      };
    }
    case 4:
    default: {
      const bodyHtml = `
        ${paragraph(`Not ready yet, ${name}? That's okay.`)}
        ${paragraph(`<strong>${courseName}</strong> will still be here if you decide to come back.`)}
        ${ctaButton('View course', data.courseUrl)}
        ${smallMuted("We won't keep emailing you about this one.")}
      `;
      return {
        subject: "We'll leave it here",
        html: renderLayout({
          bodyHtml,
          preheader: `${data.courseName} will be here when you're ready`,
          unsubscribeUrl: data.unsubscribeUrl,
          preferencesUrl: data.preferencesUrl,
        }),
      };
    }
  }
}
