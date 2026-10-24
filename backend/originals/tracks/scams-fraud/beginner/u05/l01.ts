import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story with a choice: the hacked account. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Locked out',
  summary: 'Jayden\'s Instagram is sending crypto scam messages to 600 followers, and he can\'t log in. A "recovery expert" has already DMed his mum offering to get it back for £80. What should they do first?',
  minutes: 12,
  outcomes: [
    'Know the first moves after an account is hacked',
    'Secure your email first',
    'Warn others through a different channel',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Saturday, 9:40 p.m.',
      beats: [
        { speaker: 'jayden', text: 'They changed my password and my email. My friends think I\'m scamming them.' },
        { speaker: 'narrator', text: 'On Grace\'s phone, a message from a stranger: "I can recover hacked Instagram accounts in 1 hour. £80, pay first."' },
        { speaker: 'grace', text: 'Of course you can.' },
        { speaker: 'tey', text: 'Hacked accounts are recoverable more often than people think, through the official routes. What should Jayden and Grace do first?' },
      ],
      choice: {
        prompt: 'What should they do first?',
        options: [
          { text: 'Pay the "recovery expert" £80; it\'s quick.', outcome: 'Recovery "experts" who DM you are usually scammers. They take the fee and vanish, or ask for your details and take more.' },
          { text: 'Secure his email account first, use the platform\'s official account recovery, warn friends through another channel, and change any reused passwords.', outcome: 'Yes. His email is the master key: whoever controls it can reset everything. They secure it, start the official recovery, and Jayden posts a warning from a friend\'s account and messages his group chat.', best: true },
          { text: 'Just make a new account and forget the old one.', outcome: 'The old account would keep scamming his friends, and if he used the same password elsewhere, other accounts are at risk too.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'After a hack: secure your email first, use the official recovery route, warn people through another channel, and change any reused passwords. Ignore "recovery experts" who contact you.',
    },
  ],
  apply: {
    scenario: 'The hacked account.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the first moves.',
        lines: ['Secure the email account', 'Start the official recovery', 'Warn friends another way', 'Change reused passwords', 'Turn on two-step checks'],
      },
      {
        kind: 'mcq',
        prompt: 'Why secure the email account first?',
        options: [
          { text: 'It\'s the easiest', why: 'It\'s the master key.' },
          { text: 'Whoever controls your email can reset your other accounts' },
          { text: 'It doesn\'t matter', why: 'It\'s the most important.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Right move, or trap?',
        groups: ['Right move', 'Trap'],
        items: [
          { text: 'Use the platform\'s official recovery', group: 0 },
          { text: 'Pay a "recovery expert" who DMed you', group: 1 },
          { text: 'Warn friends from another account', group: 0 },
          { text: 'Ignore it and start a new account', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'What do I tell my friends?',
        prompt: 'Grace\'s best suggestion?',
        options: [
          { text: 'Say nothing, it\'s embarrassing.', why: 'Friends might get scammed.' },
          { text: 'Tell them to invest, so it looks normal.', why: 'Never.' },
          { text: '"My account\'s been hacked. Ignore any crypto messages from it and don\'t click anything. I\'m getting it back."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The master key.',
        template: 'Your [[1]] account is the master key: secure it [[2]].',
        blanks: [['email'], ['first']],
        distractors: ['gaming', 'later'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to why it matters.',
        pairs: [
          ['Secure email', 'Stops more resets'],
          ['Official recovery', 'The real way back in'],
          ['Warn friends', 'Stops them being scammed'],
          ['Change reused passwords', 'Protects other accounts'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step is a mistake?',
        lines: [
          'Reset the email password.',
          'Use the platform\'s help pages to recover.',
          'Send the "recovery expert" my new password so he can help.',
        ],
        bug: 2,
        fix: 'Never share passwords with anyone.',
        explanation: 'That hands over the account again.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many followers was Jayden\'s hacked account messaging?',
        answers: ['600', 'six hundred'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is a reused password dangerous after a hack?',
        options: [
          { text: 'Criminals try it on your other accounts' },
          { text: 'It isn\'t', why: 'They try it everywhere.' },
          { text: 'It slows your phone', why: 'They try it elsewhere.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Who are "recovery experts" who DM you, usually?',
        options: [
          { text: 'The platform\'s staff', why: 'Platforms don\'t DM offering paid recovery.' },
          { text: 'Police', why: 'Police don\'t charge.' },
          { text: 'More scammers' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If your main email were hacked tonight, which other accounts could someone get into?',
    starters: ['They could get into...'],
  },
  deepen: {
    title: 'Official recovery pages',
    summary: 'Every major platform has official help pages for hacked accounts, often with identity checks such as a video selfie. Find them by typing the platform\'s address or using its app, never through a link someone sends you.',
  },
  notes: 'Hacked account guidance per NCSC. No platforms named beyond Instagram already used in story as channel context (Ch4 L10). Jayden per CAST.',
};

export default lesson;
