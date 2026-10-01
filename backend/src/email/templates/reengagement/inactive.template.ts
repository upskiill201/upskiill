import { BaseEmailData, RenderedEmail } from '../../types';
import {
  clip,
  ctaButton,
  escapeHtml,
  paragraph,
  renderLayout,
  safeName,
  smallMuted,
  teySays,
  teySignOff,
} from '../shared';

/** Days away at which a win-back email goes out. The last one is a goodbye. */
export const INACTIVE_EMAIL_DAYS = [3, 7, 14, 30] as const;
export type InactiveEmailDay = (typeof INACTIVE_EMAIL_DAYS)[number];

export interface InactiveData extends BaseEmailData {
  daysAway: InactiveEmailDay;
  /** The course they were last in, when there is one. */
  courseName?: string;
  courseProgressPct?: number;
  longestStreak: number;
  continueUrl: string;
}

/**
 * The win-back ladder by email — Duolingo's shape, in Tey's voice: a nudge,
 * a warmer "it's still here", a light guilt-trip about the owl, and finally
 * an honest "I'll stop". The goodbye is a real promise: nothing in this
 * ladder sends after day 30.
 */
export function renderInactiveEmail(data: InactiveData): RenderedEmail {
  const name = safeName(data.firstName);
  const course = data.courseName ? escapeHtml(clip(data.courseName)) : null;
  const where = course
    ? `<strong>${course}</strong>${data.courseProgressPct ? ` is ${data.courseProgressPct}% done` : ' is right where you left it'}`
    : 'Your lessons are right where you left them';
  const layout = (subject: string, preheader: string, bodyHtml: string) => ({
    subject,
    html: renderLayout({
      bodyHtml,
      preheader,
      unsubscribeUrl: data.unsubscribeUrl,
      preferencesUrl: data.preferencesUrl,
    }),
  });

  switch (data.daysAway) {
    case 3:
      return layout(
        'Three days, huh? 👀',
        'Three days. One lesson fixes it.',
        `
        ${teySays(`Hey ${name}, it’s been three days.`)}
        ${paragraph(`${where}. One short lesson today and you’re back in rhythm.`)}
        ${ctaButton('Do a 5-minute lesson', data.continueUrl)}
        ${teySignOff()}
      `,
      );
    case 7:
      return layout(
        'It’s been a week. I counted.',
        'A week away — your progress is saved.',
        `
        ${teySays('It’s been a week. I counted.')}
        ${paragraph(`${where}, and nothing is lost. The hardest lesson is the first one back — after that it’s easy again.`)}
        ${data.longestStreak >= 3 ? paragraph(`You once kept a <strong>${data.longestStreak}-day streak</strong>. That person is still in there.`) : ''}
        ${ctaButton('Start a new streak', data.continueUrl)}
        ${teySignOff()}
      `,
      );
    case 14:
      return layout(
        'I’m not saying I miss you. (I miss you.)',
        'Two weeks. Come back for one lesson?',
        `
        ${teySays('I’m not saying I miss you.')}
        ${paragraph('(I miss you.)')}
        ${paragraph(`${where}. Come back for one lesson — just to see if you still like it. No streak pressure, promise.`)}
        ${ctaButton('Just one lesson', data.continueUrl)}
        ${teySignOff()}
      `,
      );
    case 30:
    default:
      return layout(
        'These reminders don’t seem to be working',
        'So I’ll stop sending them.',
        `
        ${teySays('These reminders don’t seem to be working.')}
        ${paragraph('So I’ll stop sending them for now. No hard feelings — life gets busy.')}
        ${paragraph(`${where}. If you ever want to pick it back up, everything will be waiting.`)}
        ${ctaButton('Take me back', data.continueUrl)}
        ${smallMuted('This is my last reminder. You won’t hear from me again unless you come back.')}
        ${teySignOff()}
      `,
      );
  }
}
