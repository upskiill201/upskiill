import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: boundaries',
  summary: 'Spotting overload, what a boundary is, saying no kindly and boundaries vs ultimatums. A quick check before Grace learns a four-part way to ask for what she needs.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write boundaries about your own actions', 'Say a kind no at work'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday',
      beats: [
        { speaker: 'narrator', text: 'The survey moved to after launch. Grace left at 6 p.m. Jayden texted at 8: "Can I have the car tomorrow?"' },
        { speaker: 'grace', text: 'He asked. The day before. I nearly cried.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: boundaries.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Boundary or controlling?',
        groups: ['Boundary', 'Controlling'],
        items: [
          { text: '"I don\'t check email at weekends."', group: 0 },
          { text: '"Nobody may email me at weekends."', group: 1 },
          { text: '"I\'ll join calls before 6 p.m."', group: 0 },
          { text: '"You must stop booking late calls."', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the kind no at work.',
        lines: ['Show you want to help', 'Be honest about capacity', 'Ask which matters most', 'Offer an alternative', 'Confirm the decision'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is a boundary, not an ultimatum?',
        options: [
          { text: '"Do it again and you\'ll regret it."', why: 'A threat.' },
          { text: '"I\'ll lend the car when you ask the day before."' },
          { text: '"Never again, ever."', why: 'Unkeepable.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'My manager keeps booking calls at 7 p.m. How do I say no?',
        prompt: "Grace's best reply?",
        options: [
          { text: '"Try: I want to be useful on these calls, and I\'m at my best before 6. Could we move them earlier, or could I send notes instead?"' },
          { text: '"Just don\'t turn up."', why: 'That breaks trust.' },
          { text: '"Tell her she\'s unreasonable."', why: 'A boundary, not an accusation.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A healthy boundary.',
        template: 'About your [[1]], said [[2]], with a path.',
        blanks: [['actions'], ['kindly', 'clearly']],
        distractors: ['boss', 'loudly'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the ultimatum to its boundary version.',
        pairs: [
          ['"Stop or I quit!"', '"Here\'s what I can do, and what I can\'t."'],
          ['"Never again!"', '"If it happens, I\'ll do X that week."'],
          ['"You\'re banned!"', '"I\'ll say yes when you ask first."'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this kind no undoes it?',
        lines: [
          'I\'d love to help with the deck.',
          'This week I\'m on the launch.',
          'But fine, I\'ll stay late, no worries.',
          'Could it wait until Monday?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It gives in before the question is even asked.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What time did Grace leave work on Thursday? (e.g. 6 pm)',
        answers: ['6', '6 pm', '6pm', '6 p.m.', '18:00'],
        placeholder: 'A time',
      },
      {
        kind: 'mcq',
        prompt: 'Why is a consequence you control better than a threat?',
        options: [
          { text: 'It\'s scarier', why: 'It\'s calmer and more believable.' },
          { text: 'You can actually keep it, so it\'s believable' },
          { text: 'It isn\'t', why: 'Keepable consequences work better.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Has a path, or just a no?',
        groups: ['Path', 'Just no'],
        items: [
          { text: '"Could it wait until Monday?"', group: 0 },
          { text: '"Can\'t."', group: 1 },
          { text: '"I can send notes instead."', group: 0 },
          { text: '"Not happening."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What boundary will you set this week? Write it about your own actions, with a path.',
    starters: ['I will...', 'The path is...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4.',
};

export default lesson;
