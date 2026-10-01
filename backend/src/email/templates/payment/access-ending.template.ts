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

/**
 * Days relative to the access end date: 3 and 1 before it, -1 the day after.
 * Only plans that won't renew by themselves get these (Mobile Money, or a
 * card plan the learner cancelled) — nobody else has to act to keep learning.
 */
export const ACCESS_ENDING_DAYS = [3, 1, -1] as const;
export type AccessEndingDay = (typeof ACCESS_ENDING_DAYS)[number];

export interface AccessEndingData {
  firstName: string;
  courseName: string;
  daysLeft: AccessEndingDay;
  /** Formatted end date, e.g. "Oct 30" */
  endDate: string;
  completedLessons: number;
  totalLessons: number;
  renewUrl: string;
  /** The learner paid with Mobile Money (vs a cancelled card plan) */
  mobileMoney: boolean;
}

export function renderAccessEndingEmail(data: AccessEndingData): RenderedEmail {
  const name = safeName(data.firstName);
  const course = escapeHtml(clip(data.courseName));
  const progress =
    data.totalLessons > 0
      ? `You've finished <strong>${data.completedLessons} of ${data.totalLessons}</strong> lessons.`
      : '';

  let subject: string;
  let lead: string;
  let cta: string;
  if (data.daysLeft === -1) {
    subject = `Your access to ${clip(data.courseName, 40)} has ended`;
    lead = `Your access to <strong>${course}</strong> ended on ${escapeHtml(data.endDate)}. Your progress and streak are saved, so renewing picks up exactly where you stopped.`;
    cta = 'Renew and keep going';
  } else if (data.daysLeft === 1) {
    subject = `Your access to ${clip(data.courseName, 40)} ends tomorrow`;
    lead = `Your access to <strong>${course}</strong> ends tomorrow (${escapeHtml(data.endDate)}). Renew today and you won't lose a single day.`;
    cta = 'Renew now';
  } else {
    subject = `3 days left on ${clip(data.courseName, 40)}`;
    lead = `Your access to <strong>${course}</strong> ends on ${escapeHtml(data.endDate)}. Renew any time before then and the new period starts when this one ends, so you never lose days.`;
    cta = 'Renew my access';
  }

  const how = data.mobileMoney
    ? 'Mobile Money plans don’t renew automatically. Renewing takes one approval on your phone.'
    : 'Your plan was set not to renew. Renewing takes a minute.';

  const bodyHtml = `
    ${paragraph(`Hey ${name}.`)}
    ${paragraph(lead)}
    ${progress ? paragraph(progress) : ''}
    ${ctaButton(cta, data.renewUrl)}
    ${smallMuted(how)}
  `;

  return {
    subject,
    html: renderLayout({ bodyHtml, preheader: subject }),
  };
}
