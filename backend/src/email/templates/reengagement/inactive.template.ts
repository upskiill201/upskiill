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
/** Days away an email goes out: thick early, then easing off, never "the last". */
export const INACTIVE_EMAIL_DAYS: readonly number[] = [
  1, 3, 5, 7, 10, 14, 21, 30, 45, 60, 75, 90, 120, 150, 180, 240, 300, 365,
];
export type InactiveEmailDay = number;

export interface InactiveData extends BaseEmailData {
  daysAway: InactiveEmailDay;
  /** The course they were last in, when there is one. */
  courseName?: string;
  courseProgressPct?: number;
  longestStreak: number;
  continueUrl: string;
}

/**
 * The win-back ladder by email, in Tey's voice: a nudge, a warmer "it's still
 * here", a guilt-trip, and then Tey simply refusing to give up. There is no
 * goodbye email: the ladder eases off but keeps going until they come back
 * (the unsubscribe link is the learner's off switch).
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

  const bucket =
    data.daysAway <= 1 ? 1 : data.daysAway <= 5 ? 3 : data.daysAway <= 10 ? 7 : data.daysAway <= 21 ? 14 : 30;
  switch (bucket) {
    case 1:
      return layout(
        'You skipped yesterday. I noticed.',
        'One lesson today and nobody has to know.',
        `
        ${teySays(`${name}. Yesterday. No lesson. I’m not mad.`)}
        ${paragraph(`${where}. Do one today and we’ll pretend it never happened.`)}
        ${ctaButton('Do one lesson', data.continueUrl)}
        ${teySignOff()}
      `,
      );
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
    default: {
      const variants = [
        {
          subject: 'These reminders don’t seem to be working',
          pre: 'So I’m going to keep sending them.',
          head: 'These reminders don’t seem to be working.',
          body: 'So I’m going to keep sending them. That’s how this works. One lesson and they turn into celebrations instead.',
        },
        {
          subject: `${data.daysAway} days. I’m still counting.`,
          pre: 'Your progress is saved. My patience is... mostly saved.',
          head: `${data.daysAway} days, ${name}. I counted every one.`,
          body: 'I don’t do goodbyes. I do “one more lesson?”. So: one more lesson?',
        },
        {
          subject: 'Plot twist: you come back today',
          pre: 'Best comeback story ever. I’ll bring the confetti.',
          head: 'I have a script for today.',
          body: 'You open Teyro. You do one lesson. I lose my mind with joy. Roll credits.',
        },
      ];
      const v = variants[Math.max(0, INACTIVE_EMAIL_DAYS.indexOf(data.daysAway)) % variants.length];
      return layout(
        v.subject,
        v.pre,
        `
        ${teySays(v.head)}
        ${paragraph(v.body)}
        ${paragraph(`${where}.`)}
        ${data.longestStreak >= 3 ? paragraph(`You once kept a <strong>${data.longestStreak}-day streak</strong>. That person is still in there.`) : ''}
        ${ctaButton('Take me back', data.continueUrl)}
        ${teySignOff()}
      `,
      );
    }
  }
}
