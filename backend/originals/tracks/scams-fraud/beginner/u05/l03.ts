import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Reading: passwords and two-step checks. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'How Jayden got hacked',
  summary: 'The cause turns out to be boring: Jayden used the same password for a gaming site that was breached two years ago. Here\'s how to make passwords that actually protect you.',
  minutes: 12,
  outcomes: [
    'Explain how reused passwords get accounts hacked',
    'Create strong passwords using three random words',
    'Use a password manager and two-step checks',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'One password, many doors',
      html: '<p>Two years ago, a gaming site Jayden used was hacked. Millions of emails and passwords leaked. Jayden\'s password was the same one he used for Instagram and his email.</p><p>Criminals use software that tries leaked email and password pairs on lots of popular sites automatically. It\'s called <strong>credential stuffing</strong>. One reused password opened several doors.</p><p><strong>Make passwords hard to guess:</strong> the UK\'s National Cyber Security Centre recommends <strong>three random words</strong>, like "BicycleTeapotThunder". Long, easy to remember, hard to crack. Avoid names, birthdays, teams and pets.</p><p><strong>Use a different password for every important account,</strong> especially your email. If one leaks, the others stay safe.</p><p><strong>A password manager</strong> can create and remember strong, different passwords for you. Many browsers and phones have one built in. You only need to remember one strong master password.</p><p><strong>Turn on two-step verification (2SV)</strong> wherever you can, starting with email, banking and social media. Even if someone has your password, they also need the second step, usually a code or approval on your phone.</p><p><strong>Keep devices updated.</strong> Updates often fix security holes that criminals use.</p><p>Jayden\'s new set-up: a password manager, a three-random-words master password, a different password everywhere, and 2SV on everything that offers it.</p>',
    },
    {
      kind: 'check',
      question: 'What made Jayden\'s Instagram easy to hack?',
      options: ['His phone was old', 'He reused a password that had leaked', 'He posted too much'],
      answer: 1,
      explanation: 'A leaked password, reused on other accounts, opened them all.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Three random words for strong passwords. A different one for every important account, especially email. A password manager to remember them. Two-step checks everywhere.',
    },
  ],
  apply: {
    scenario: 'Passwords.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is credential stuffing?',
        options: [
          { text: 'Stuffing a wallet with cards', why: 'It\'s automated password guessing.' },
          { text: 'Writing passwords down', why: 'It\'s trying leaked pairs.' },
          { text: 'Trying leaked email and password pairs on many sites automatically' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong habit, or weak?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Three random words', group: 0 },
          { text: 'Same password everywhere', group: 1 },
          { text: 'A password manager', group: 0 },
          { text: 'Your pet\'s name and birth year', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'I can\'t remember 40 different passwords.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'You don\'t have to. A password manager remembers them. You just need one strong master password.' },
          { text: 'Then reuse one.', why: 'That\'s how you got hacked.' },
          { text: 'Write them on your phone case.', why: 'Use a password manager.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The NCSC tip.',
        template: 'Use three [[1]] [[2]] for a strong password.',
        blanks: [['random'], ['words']],
        distractors: ['short', 'numbers'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to what it protects against.',
        pairs: [
          ['Different password per account', 'One leak opening everything'],
          ['Two-step verification', 'A stolen password alone'],
          ['Device updates', 'Known security holes'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which password is weakest?',
        lines: [
          'BicycleTeapotThunder',
          'MarbleCactusHarbour',
          'Jayden2008',
        ],
        bug: 2,
        fix: 'Use three random words instead.',
        explanation: 'Names and years are easy to guess and common in leaks.',
      },
      {
        kind: 'mcq',
        prompt: 'Which account most needs its own strong password and 2SV?',
        options: [
          { text: 'A games forum', why: 'Email is the master key.' },
          { text: 'A newsletter sign-up', why: 'Email matters most.' },
          { text: 'Your email, because it can reset the others' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many random words does the NCSC recommend?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Jayden\'s new set-up.',
        lines: ['Install a password manager', 'Make a three-random-words master password', 'Change every important password', 'Turn on 2SV'],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep devices updated?',
        options: [
          { text: 'For new emojis only', why: 'Security fixes matter.' },
          { text: 'Updates often fix security holes criminals use' },
          { text: 'They slow phones down', why: 'They fix security holes.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Do you reuse any passwords? Which account would you fix first?',
    starters: ['I reuse...', 'I\'ll fix... first'],
  },
  deepen: {
    title: 'Check for breaches',
    summary: 'Some free, well-known services let you check whether your email address has appeared in known data breaches. If it has, change that password and any others that match.',
  },
  notes: 'NCSC "three random words" and Cyber Aware guidance. Credential stuffing: standard term. Jayden per CAST.',
};

export default lesson;
