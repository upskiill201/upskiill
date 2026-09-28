import { BaseEmailData, RenderedEmail } from '../../types';
import {
  ctaButton,
  paragraph,
  renderLayout,
  safeName,
  smallMuted,
  teySays,
  teySignOff,
} from '../shared';

export interface StreakAtRiskData extends BaseEmailData {
  streakDays: number;
  continueUrl: string;
}

/**
 * The evening streak saver, for learners Tey can't reach by push (no device
 * subscribed, or push switched off) — push owns everyone else, so nobody
 * gets the same warning twice. States the fact, the one fix, then the owl.
 */
export function renderStreakAtRiskEmail(data: StreakAtRiskData): RenderedEmail {
  const name = safeName(data.firstName);
  const days = `${data.streakDays}-day streak`;
  const bodyHtml = `
    ${teySays(`${name}, your ${days} ends tonight.`)}
    ${paragraph(`You haven’t done a lesson today yet. One lesson — a few minutes — keeps your <strong>${days}</strong> alive.`)}
    ${paragraph(data.streakDays >= 7 ? `${data.streakDays} days of showing up. I refuse to let that go quietly.` : 'I’m not being dramatic. (I’m being a little dramatic.)')}
    ${ctaButton('Save my streak', data.continueUrl)}
    ${smallMuted('It resets at midnight, your time.')}
    ${teySignOff()}
  `;

  return {
    subject: `Your ${days} ends tonight 🔥`,
    html: renderLayout({
      bodyHtml,
      preheader: 'One lesson keeps it alive.',
      unsubscribeUrl: data.unsubscribeUrl,
      preferencesUrl: data.preferencesUrl,
    }),
  };
}
