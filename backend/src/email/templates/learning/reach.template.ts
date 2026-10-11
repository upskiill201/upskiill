import { BaseEmailData, RenderedEmail } from '../../types';
import { ctaButton, paragraph, renderLayout, safeName, smallMuted, teySays, teySignOff } from '../shared';

export interface ReachData extends BaseEmailData {
  /** They installed the app but notifications are off. */
  installed: boolean;
  /** Their browser said "Block" to notifications. */
  blocked: boolean;
  /** Which ask this is (picks the variant). */
  nag: number;
  /** /start: the install + reminders walkthrough. */
  setupUrl: string;
}

/**
 * "Install me and turn on reminders", in Tey's voice. Sent to learners Tey
 * can't push to, on the REACH cadence, until they can be (and on demand from
 * HQ). The facts are simple and true: reminders only reach a phone from the
 * installed app with notifications allowed.
 */
export function renderReachEmail(data: ReachData): RenderedEmail {
  const name = safeName(data.firstName);
  const layout = (subject: string, preheader: string, bodyHtml: string) => ({
    subject,
    html: renderLayout({
      bodyHtml,
      preheader,
      unsubscribeUrl: data.unsubscribeUrl,
      preferencesUrl: data.preferencesUrl,
    }),
  });

  const howTo = data.blocked
    ? paragraph(
        'Your browser has notifications for Teyro blocked. Open your phone’s settings, allow notifications for Teyro, then turn reminders on in Teyro’s Settings.',
      )
    : paragraph('It takes 20 seconds: add Teyro to your Home Screen, open it, and tap “Turn on reminders”.');

  if (data.installed) {
    return layout(
      'You installed me, then muted me?',
      'I live on your Home Screen and I can’t say a word.',
      `
      ${teySays(`${name}, I live on your Home Screen now.`)}
      ${paragraph('Which is lovely. Except notifications are off, so I just sit there. Silently. Watching your streak wobble.')}
      ${howTo}
      ${ctaButton('Turn on reminders', data.setupUrl)}
      ${teySignOff()}
    `,
    );
  }

  const variants = [
    {
      subject: 'I can’t remind you. Literally.',
      pre: 'You haven’t given me a way. Let’s fix that in 20 seconds.',
      head: `${name}, I have a problem.`,
      body: 'My whole job is reminding you to learn, and right now I can’t. No app on your Home Screen, no notifications. I’m a reminder robot with no voice.',
    },
    {
      subject: 'Put me on your Home Screen',
      pre: 'Teyro works best as an app. It’s free and it’s 20 seconds.',
      head: `Hi ${name}. Small favour?`,
      body: 'Add Teyro to your Home Screen. You get one-tap lessons, and I get to nudge you before your streak runs out. Everybody wins. Mostly you.',
    },
    {
      subject: 'Still can’t reach you',
      pre: 'I’ll keep asking. You know I will.',
      head: `${name}, it’s me. Through email. Again.`,
      body: 'Email is my backup plan. My real plan is a friendly little nudge on your phone, right when your lesson is due. Install me and turn reminders on, and these emails stop.',
    },
  ];
  const v = variants[Math.abs(data.nag) % variants.length];
  return layout(
    v.subject,
    v.pre,
    `
    ${teySays(v.head)}
    ${paragraph(v.body)}
    ${howTo}
    ${ctaButton('Install Teyro + turn on reminders', data.setupUrl)}
    ${smallMuted('On iPhone, reminders only work from the installed app. That’s Apple’s rule, not mine.')}
    ${teySignOff()}
  `,
  );
}
