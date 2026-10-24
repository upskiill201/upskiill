import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Explain cards: one message, one purpose. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'One message, one purpose',
  summary: 'Zanele\'s week-3 draft does four jobs: the result, a question for Emeka, a data problem for Felix, and a lunch invitation. Mrs Achieng shows her how to split it.',
  minutes: 12,
  outcomes: [
    'Give each message one main purpose',
    'Split mixed messages by reader',
    'Write subject lines that match the purpose',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Zanele\'s week-3 draft, sent to everyone, does four jobs. Mrs Achieng splits it:</p><table><tr><th>Purpose</th><th>Reader</th><th>Subject line</th></tr><tr><td>Week-3 result</td><td>Mr Kamau</td><td>Saturday pilot, week 3: late deliveries at 21%</td></tr><tr><td>Request for Lagos data</td><td>Emeka</td><td>Lagos delivery data needed by Thursday</td></tr><tr><td>A data error to fix</td><td>Felix</td><td>Export bug: 14 orders missing dates</td></tr><tr><td>Team lunch</td><td>The team chat</td><td>(no email needed)</td></tr></table><p>Why split?</p><ul><li><strong>Readers act on the part about them.</strong> Mixed messages make everyone hunt for their bit.</li><li><strong>Requests get lost</strong> in a message about something else.</li><li><strong>Subject lines can only promise one thing.</strong></li></ul><p>One message, one purpose, one clear subject. Fewer readers, too: only the people who need it.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One message, one purpose, one subject, and only the readers who need it.',
    },
  ],
  apply: {
    scenario: 'Splitting the week-3 draft.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the purpose to the reader.',
        pairs: [
          ['Week-3 result', 'Mr Kamau'],
          ['Lagos data request', 'Emeka'],
          ['Export bug', 'Felix'],
          ['Team lunch', 'The team chat'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do requests get lost in mixed messages?',
        options: [
          { text: 'Email deletes them', why: 'It\'s about attention.' },
          { text: 'The reader is reading about something else and misses the ask' },
          { text: 'They don\'t', why: 'Mixed messages bury asks.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many orders are missing dates in Felix\'s export?',
        answers: ['14', 'fourteen'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'One purpose, or mixed?',
        groups: ['One purpose', 'Mixed'],
        items: [
          { text: 'Result for Mr Kamau only', group: 0 },
          { text: 'Result + bug + lunch, to everyone', group: 1 },
          { text: 'A data request for Emeka', group: 0 },
          { text: 'An update with five unrelated asks', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Four emails instead of one? That feels like spamming people.',
        prompt: "Mrs Achieng's best reply?",
        options: [
          { text: 'Each person gets one short email about them, instead of one long email mostly about others. That\'s less noise, not more.' },
          { text: 'Yes, send one long one.', why: 'Each reader hunts for their part.' },
          { text: 'Send all four to everyone.', why: 'Only the readers who need each.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'One message, one [[1]], one [[2]].',
        blanks: [['purpose'], ['subject']],
        distractors: ['font', 'joke'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the best subject line for Felix\'s email?',
        options: [
          { text: '"Update"', why: 'Says nothing.' },
          { text: '"Export bug: 14 orders missing dates"' },
          { text: '"Week 3 and other things"', why: 'Mixed and vague.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the email to Mr Kamau doesn\'t belong?',
        lines: [
          'Week 3: late deliveries at 21%.',
          'No decision needed this week.',
          'Felix, can you fix the export bug?',
          'Week 4 on Friday.',
        ],
        bug: 2,
        fix: 'Send it to Felix separately.',
        explanation: 'It\'s for another reader.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What was the late-delivery rate in week 3?',
        answers: ['21', '21%'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to split a mixed message.',
        lines: ['List every purpose', 'Match each to a reader', 'Write one short message each', 'Give each a clear subject'],
      },
    ],
  },
  reflect: {
    prompt: 'Find a recent message that did several jobs. How would you split it?',
    starters: ['It did...', 'I\'d split it into...'],
  },
  deepen: {
    title: 'Fewer recipients',
    summary: 'Copying everyone "just in case" trains people to ignore your messages. Send each message to the people who need to act or know.',
  },
  notes: 'One-purpose messages: Rogers & Lasky-Fink ("fewer ideas, fewer requests"). Fictional week-3 result 21%; Felix\'s export missing dates on 14 orders.',
};

export default lesson;
