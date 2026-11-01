import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Before/After: Grace's lock-down weekend. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The lock-down weekend',
  summary: 'After Jayden\'s hack, Grace spends a weekend locking down the whole family\'s digital life. Here\'s what changed, before and after.',
  minutes: 11,
  outcomes: [
    'Audit your own accounts and habits',
    'Set up family-wide protections',
    'Make safety easy enough to keep',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The family, before and after',
      before: {
        label: 'Before the weekend',
        text: 'Same two passwords for most accounts\nTwo-step checks: only on banking\nNan: no idea what a scam text looks like\nNo agreed way to check money requests\nBank fraud number: "somewhere"\nPhones: updates postponed for months',
      },
      after: {
        label: 'After the weekend',
        text: 'Password manager for Grace and Jayden; unique passwords everywhere\nTwo-step checks on email, banking and social media\nNan: "ring first" note by the phone, safe word, a printed recipe page\nFamily safe word for any money request\nBank fraud number saved as a contact, and 159 written on the fridge\nAutomatic updates switched on',
      },
      notes: [
        'None of it needed technical skill. It took one weekend and a lot of tea.',
        'The biggest wins were the simplest: unique email password, two-step checks, the safe word.',
        'Making things automatic (updates, password manager) means they keep working without willpower.',
        'Nan\'s note is the most-used safety tool in the family.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One weekend: unique passwords via a manager, two-step checks on key accounts, a family safe word, the fraud number saved, automatic updates on. Simple beats perfect.',
    },
  ],
  apply: {
    scenario: 'The lock-down weekend.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Before or after?',
        groups: ['Before', 'After'],
        items: [
          { text: 'Same two passwords for most accounts', group: 0 },
          { text: 'Password manager', group: 1 },
          { text: 'Updates postponed for months', group: 0 },
          { text: 'Family safe word', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which changes gave the biggest wins?',
        options: [
          { text: 'Buying new phones', why: 'Simple habits mattered most.' },
          { text: 'Unique email password, two-step checks, the safe word' },
          { text: 'Deleting social media', why: 'Not needed.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'That sounds like a lot of work.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'It was unbearable.', why: 'It was one weekend.' },
          { text: 'Don\'t bother.', why: 'It\'s worth it.' },
          { text: 'One weekend. And most of it now runs by itself: updates, the password manager. Way less work than being scammed.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The principle.',
        template: '[[1]] beats perfect. Make things [[2]] so they keep working.',
        blanks: [['Simple', 'simple'], ['automatic']],
        distractors: ['Fast', 'optional'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each family member to their new protection.',
        pairs: [
          ['Grace', 'Password manager and 2SV'],
          ['Jayden', 'Unique passwords, 2SV on everything'],
          ['Nan', '"Ring first" note and safe word'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which "after" item would undo the work?',
        lines: [
          'Bank fraud number saved as a contact.',
          'Automatic updates on.',
          'Family safe word posted in the family group chat for easy reference.',
        ],
        bug: 2,
        fix: 'Keep the safe word offline and private.',
        explanation: 'If it\'s written in a chat, a hacked account could reveal it.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which UK number did Grace write on the fridge?',
        answers: ['159'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why switch on automatic updates?',
        options: [
          { text: 'To get new games', why: 'For security fixes.' },
          { text: 'Security fixes arrive without anyone having to remember' },
          { text: 'They\'re required', why: 'They\'re protective.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a lock-down weekend.',
        lines: ['Set up a password manager', 'Change key passwords', 'Turn on two-step checks', 'Agree a family safe word', 'Save the fraud number'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the family\'s most-used safety tool?',
        options: [
          { text: 'An antivirus subscription', why: 'Nan\'s note.' },
          { text: 'A new router', why: 'Nan\'s note.' },
          { text: 'Nan\'s "ring first" note' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Plan your own lock-down: which three changes would you make first?',
    starters: ['1...', '2...', '3...'],
  },
  deepen: {
    title: 'Cyber Aware',
    summary: 'The UK government\'s Cyber Aware advice lists a few top actions: a strong separate email password, three random words, saving passwords in your browser or a manager, two-step verification, updates and backups.',
  },
  notes: 'NCSC Cyber Aware actions. Femi per CAST.',
};

export default lesson;
