import { BaseEmailData, RenderedEmail } from '../../types';
import {
  ctaButton,
  paragraph,
  renderLayout,
  safeName,
  smallMuted,
} from '../shared';

export interface StreakAtRiskData extends BaseEmailData {
  streakDays: number;
  continueUrl: string;
}

export function renderStreakAtRiskEmail(data: StreakAtRiskData): RenderedEmail {
  const name = safeName(data.firstName);
  const bodyHtml = `
    ${paragraph(`Hey ${name}.`)}
    ${paragraph(`Your <strong>${data.streakDays}-day streak</strong> is still alive.`)}
    ${paragraph(`Tey is not saying anything... yet. 👀`)}
    ${ctaButton('Keep learning', data.continueUrl)}
    ${smallMuted('A few minutes today keeps it going.')}
  `;

  return {
    subject: 'Your streak is still alive 👀',
    html: renderLayout({
      bodyHtml,
      preheader: `Day ${data.streakDays}. Don't let today break it.`,
      unsubscribeUrl: data.unsubscribeUrl,
      preferencesUrl: data.preferencesUrl,
    }),
  };
}
