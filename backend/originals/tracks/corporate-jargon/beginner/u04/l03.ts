import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Before/After: greetings and sign-offs that fit — Hi, Hello, Dear, Good morning; Thanks, Best, Kind regards. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Greetings and sign-offs that fit',
  summary: 'The first and last words of a message set the tone for everything in between. Remi has been starting emails with "Hey!!" and ending them with "Cheers mate." Time for an upgrade.',
  minutes: 11,
  outcomes: [
    'Choose a greeting that fits the reader',
    'Choose a sign-off that fits the message',
    'Avoid the greetings and sign-offs that go wrong',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Remi\'s email to Mrs Achieng',
      before: {
        label: 'Before',
        text: 'Hey!! Can I get 10 mins with Mr K this week? Cheers mate, R',
      },
      after: {
        label: 'After',
        text: 'Good morning, Mrs Achieng, I\'d like to ask for ten minutes with Mr Kamau this week to show him the delivery tracker. Would any time suit him? Kind regards, Remi',
      },
      notes: [
        '"Hey!!" became "Good morning, Mrs Achieng": a greeting AND her name, with her title.',
        '"Mr K" became "Mr Kamau". Nicknames for the CEO are for people who know him well.',
        '"Cheers mate" became "Kind regards". "Mate" is very casual, and very British.',
        '"R" became "Remi". Initials only are for people who know your work very well.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>Greetings, from casual to formal:</strong></p><ul><li><strong>Hi [name],</strong> the everyday default with colleagues.</li><li><strong>Hello [name],</strong> slightly more formal, good for people you don't know well.</li><li><strong>Good morning / Good afternoon [name],</strong> warm and polite; common in Kenya, Nigeria and much of the world for seniors.</li><li><strong>Dear [name],</strong> formal; letters, first contact, very senior people, or when your workplace uses it.</li></ul><p><strong>Sign-offs, from casual to formal:</strong></p><ul><li><strong>Thanks / Many thanks,</strong> when you've asked for something.</li><li><strong>Best / Best wishes,</strong> friendly and neutral.</li><li><strong>Kind regards / Regards,</strong> polite and safe almost everywhere.</li><li><strong>Yours sincerely,</strong> formal letters, often to someone you've addressed by name.</li></ul>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Mirror the other person. If Mrs Achieng writes "Dear Remi", reply "Dear Mrs Achieng". If Brian writes "Hi!", "Hi Brian" is perfect.',
    },
  ],
  apply: {
    scenario: 'Monday, 10:00. Remi\'s second attempt.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which greeting fits a first email to Mrs Achieng, the CEO\'s assistant of 25 years?',
        options: [
          { text: 'Hey!!', why: 'Too casual for a first, formal request.' },
          { text: 'Good morning, Mrs Achieng,' },
          { text: 'Yo Mrs A', why: 'No.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'More casual, or more formal?',
        groups: ['More casual', 'More formal'],
        items: [
          { text: 'Hi Brian,', group: 0 },
          { text: 'Dear Mr Kamau,', group: 1 },
          { text: 'Cheers,', group: 0 },
          { text: 'Kind regards,', group: 1 },
          { text: 'Best,', group: 0 },
          { text: 'Yours sincerely,', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s email to a new client. Which line needs changing?',
        lines: [
          'Dear Ms Wekesa,',
          'Thank you for your time on Tuesday. The delivery report is attached.',
          'Cheers mate,',
        ],
        bug: 2,
        fix: 'Kind regards,',
        explanation: 'A formal start and a mate-style ending don\'t match. Keep the whole message on the same step.',
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'Dear Remi, Thank you for your email. Mr Kamau prefers to be asked directly. Please write to him yourself, properly, by Friday. Regards, Mrs Achieng',
        prompt: 'How does Remi reply?',
        options: [
          { text: 'Dear Mrs Achieng, Thank you, I will. Kind regards, Remi' },
          { text: 'ty!!', why: 'She wrote formally. Mirror her.' },
          { text: 'Yo, Friday works.', why: 'We have learned nothing.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A polite sign-off that is safe almost everywhere: "Kind ___". (one word)',
        answers: ['regards'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the sign-off to when it fits.',
        pairs: [
          ['Many thanks,', 'You\'ve asked for something'],
          ['Kind regards,', 'Polite, safe almost anywhere'],
          ['Yours sincerely,', 'A formal letter'],
          ['Cheers,', 'Friendly colleagues'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the "mirror" rule for greetings?',
        options: [
          { text: 'Always be more casual than them', why: 'That\'s how "yo" happens.' },
          { text: 'Match the formality the other person uses' },
          { text: 'Never use their name', why: 'Using their name is warm and polite.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Register', 'How formal your language is'],
          ['Neutral', 'The safe default'],
          ['FYI', 'For your information'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Fix Remi\'s email.',
        template: '[[1]] morning, Mrs Achieng, ... Kind [[2]], [[3]]',
        blanks: [['Good'], ['regards'], ['Remi']],
        distractors: ['Hey', 'mate', 'R'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a warm, neutral sign-off for a colleague who helped.',
        tiles: ['Many', 'thanks', 'for', 'your', 'help,', 'Remi'],
        distractors: ['mate', 'thx'],
      },
    ],
  },
  reflect: {
    prompt: 'How do you usually start and end emails or messages at work or school? Is it the right step for the people you write to?',
    starters: ['I usually start with...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Set your default',
    summary: 'Pick one neutral greeting and one neutral sign-off as your default ("Hi [name]," and "Thanks, [your name]"). Then adjust up or down only when the reader needs it.',
  },
  notes: 'Greeting/sign-off formality is general workplace convention (UK/Commonwealth and international business English). "Mate" is informal British/Australian. Norms vary by country and company; the mirror rule is the practical guide. Ms Wekesa: named extra (client contact).',
};

export default lesson;
