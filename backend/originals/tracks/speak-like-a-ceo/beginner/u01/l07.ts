import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Chat: PREP for surprise questions. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'When you\'re put on the spot',
  summary: 'Surprise questions freeze Lucía. Tey gives her a pattern to fall back on when there\'s no time to prepare: PREP.',
  minutes: 11,
  outcomes: [
    'Use PREP to answer on the spot',
    'Buy a second to think, calmly',
    'Keep a surprise answer short',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'When you\'re put on the spot, try PREP: Point, Reason, Example, Point again.', replies: ['Show me with a real question.'] },
        { tey: '"Should we launch mango-chili next?" Point: "Yes, in spring." Reason: "Chili-lime shows the flavour works." Example: "38% above target." Point: "So, spring."', replies: ['And if my mind goes blank?'] },
        { tey: 'Buy a second honestly: "Good question. Let me think for a second." Then pause. That\'s calmer than "um" for ten seconds.', replies: ['How long should it be?'] },
        { tey: 'Under 30 seconds. If they want more, they\'ll ask. PREP keeps you from wandering.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'On the spot: Point, Reason, Example, Point. Under 30 seconds. Need a second? Say so, and pause.',
    },
  ],
  apply: {
    scenario: 'PREP.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order PREP.',
        lines: ['Point', 'Reason', 'Example', 'Point again'],
      },
      {
        kind: 'mcq',
        prompt: 'What does the "E" in PREP stand for?',
        options: [
          { text: 'Example' },
          { text: 'Ending', why: 'Example.' },
          { text: 'Emotion', why: 'Example.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the PREP step to Lucía\'s line.',
        pairs: [
          ['Point', '"Yes, in spring."'],
          ['Reason', '"Chili-lime shows the flavour works."'],
          ['Example', '"38% above target."'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm way to buy time, or not?',
        groups: ['Calm', 'Not calm'],
        items: [
          { text: '"Good question. Let me think for a second."', group: 0 },
          { text: 'Ten seconds of "um"', group: 1 },
          { text: 'A short pause', group: 0 },
          { text: '"Oh no, I don\'t know, sorry, sorry..."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'carmen',
        message: 'Lucía, quickly: should Tomás run the next campaign email?',
        prompt: "Lucía\'s best PREP answer?",
        options: [
          { text: '"Well, Tomás is, um, he\'s been, you know..."', why: 'Point first.' },
          { text: '"I\'d need a week to think."', why: 'Give a point now.' },
          { text: '"Yes. He ran the launch email well: 22% opened it. So yes, with Marta checking it first."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The length.',
        template: 'Keep a PREP answer under [[1]] seconds. If they want more, they\'ll [[2]].',
        blanks: [['30', 'thirty'], ['ask']],
        distractors: ['90', 'leave'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which season does Lucía suggest for mango-chili?',
        answers: ['spring', 'Spring'],
        placeholder: 'A season',
      },
      {
        kind: 'mcq',
        prompt: 'Why repeat the point at the end?',
        options: [
          { text: 'To fill time', why: 'It closes the answer.' },
          { text: 'It reminds listeners of your answer and signals you\'re done' },
          { text: 'You shouldn\'t', why: 'It closes the loop.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks PREP?',
        lines: [
          'Point: yes, in spring.',
          'Reason: the flavour works.',
          'Example: and also, the office move, and my holiday plans...',
          'Point: so, spring.',
        ],
        bug: 2,
        fix: 'Example: 38% above target.',
        explanation: 'The example must support the point.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does the "R" in PREP stand for?',
        answers: ['Reason', 'reason'],
        placeholder: 'A word',
      },
    ],
  },
  reflect: {
    prompt: 'Ask a friend to put a surprise question to you. Answer with PREP and record it.',
    starters: ['The question was...', 'My point was...'],
  },
  deepen: {
    title: 'Patterns beat panic',
    summary: 'When you\'re nervous, it\'s hard to invent a structure. A simple pattern you\'ve practised gives you somewhere to go, so your mind has less to do.',
  },
  notes: 'PREP (Point, Reason, Example, Point): a widely taught speaking framework. Fictional: mango-chili idea; launch email 22% open rate.',
};

export default lesson;
