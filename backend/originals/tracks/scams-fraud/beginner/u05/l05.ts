import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Jayden\'s back in',
  summary: 'Sunday afternoon: Jayden gets his account back through the official route. Nobody paid the "recovery expert". Check what you know about hacked accounts, the first hour, passwords and reporting.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Recover from a hack', 'Act in the first hour'],
  learn: [
    {
      kind: 'story',
      title: 'Back in',
      beats: [
        { speaker: 'jayden', text: 'I\'m back in. Video selfie and everything. And I\'ve got 2SV now. On everything.' },
        { speaker: 'grace', text: 'Look at you. A protocol.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: protect and report.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the first hour after a scam.',
        lines: ['Stop', 'Call your bank', 'Secure accounts', 'Save evidence', 'Report'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong habit, or risky?',
        groups: ['Strong', 'Risky'],
        items: [
          { text: 'Different password for email', group: 0 },
          { text: 'Paying a recovery expert who DMed you', group: 1 },
          { text: 'Two-step checks on banking', group: 0 },
          { text: 'One password everywhere', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each thing to report to its route.',
        pairs: [
          ['Scam text', '7726'],
          ['Money lost', 'Your bank first'],
          ['Hacked social account', 'The platform\'s official recovery'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which account should you secure first after a hack?',
        options: [
          { text: 'Email' },
          { text: 'A shopping site', why: 'Email resets the others.' },
          { text: 'A games account', why: 'Email first.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Should I keep the same password now I\'m back in?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Yes, it\'s fine now.', why: 'It leaked; change it.' },
          { text: 'Use your old one from before.', why: 'Use a new unique one.' },
          { text: 'No. New, unique, three random words, saved in your password manager.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Passwords.',
        template: 'A [[1]] password for every important account, remembered by a password [[2]].',
        blanks: [['different', 'unique'], ['manager']],
        distractors: ['shared', 'notebook'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many random words should a strong password have, per the NCSC?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which step is wrong?',
        lines: [
          'Save screenshots of the scam.',
          'Report to the platform.',
          'Delete all the messages before reporting, to move on.',
        ],
        bug: 2,
        fix: 'Keep the evidence until it\'s been reported.',
        explanation: 'Evidence helps banks and police.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 4: what is a money mule?',
        options: [
          { text: 'A delivery job', why: 'It\'s laundering.' },
          { text: 'Someone whose account moves criminal money' },
          { text: 'A savings scheme', why: 'It\'s laundering.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: what should you never do to withdraw money from a platform?',
        options: [
          { text: 'Pay a fee first' },
          { text: 'Log in', why: 'Paying fees is the trap.' },
          { text: 'Check your balance', why: 'Paying fees is the trap.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which one change from this chapter will you make today?',
    starters: ['Today I\'ll...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1–4 with Chapter 2 and 4 review.',
};

export default lesson;
