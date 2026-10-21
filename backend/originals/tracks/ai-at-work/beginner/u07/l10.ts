import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 10 — Checkpoint 2. Tables, trends, charts, checking maths. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: tables, trends and charts',
  summary: 'Summary tables, real trends, honest charts and checked maths. Show you can turn rows into a clear, true picture.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can summarise data and spot real trends', 'Show you can chart honestly and check AI maths'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 2. Midnight. The table is built; now the story.', replies: ['Ready'] },
        { tey: 'Warm-up: two weeks up. Trend?', replies: ['Not yet'] },
        { tey: 'Enough points, real size, no one-offs. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: midnight before the meeting.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Rows or columns in the weekly table?',
        groups: ['Rows', 'Columns'],
        items: [
          { text: 'Week 1', group: 0 },
          { text: 'Kaneshie', group: 1 },
          { text: 'Week 3', group: 0 },
          { text: 'Total', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which row\'s total is wrong?',
        lines: ['Week 1: 280 + 120 = 400', 'Week 2: 320 + 150 = 470', 'Week 3: 360 + 170 = 560', 'Week 4: 412 + 188 = 600'],
        bug: 2,
        fix: 'Week 3: 360 + 170 = 530',
        explanation: '360 + 170 is 530.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Median of 1, 2, 2, 5, 90?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Payments: 400, 470, 530, 600. Trend or noise?',
        options: [
          { text: 'A likely trend: four points, real size, same direction' },
          { text: 'Noise', why: 'It\'s a steady, sizeable rise.' },
          { text: 'Can\'t tell from numbers', why: 'This pattern is clear.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the chart.',
        pairs: [
          ['Change over weeks', 'Line'],
          ['Compare markets', 'Sorted bar'],
          ['Relationship between two numbers', 'Scatter'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can the bar chart start at 550 so Week 4 looks huge?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Let\'s start at zero and put "up 50% in four weeks" in the title. It\'s strong and honest.' },
          { text: 'Sure.', why: 'Misleading.' },
          { text: 'No charts then.', why: 'Use an honest one.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which pattern request is best?',
        options: [
          { text: 'Show me the growth.', why: 'Assumes growth.' },
          { text: 'Describe any patterns in this table, how confident you are, and one-offs that could explain them.' },
          { text: 'Make it exciting.', why: 'Not analysis.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the maths checks.',
        lines: ['Estimate in your head', 'Recalculate in the sheet', 'Check the inputs'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Bars start at [[1]]. The title is the [[2]].',
        blanks: [['zero'], ['message']],
        distractors: ['ten', 'date'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'AI arithmetic is always exact', group: 0 },
          { text: 'Head estimates catch big errors', group: 1 },
          { text: '3D charts are clearer', group: 0 },
          { text: 'Medians resist extreme values', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a message title.',
        tiles: ['Payments', 'grew', '50%', 'in', 'four', 'weeks'],
        distractors: ['Chart'],
      },
      {
        kind: 'findBug',
        prompt: 'Which claim is a one-off, not a trend?',
        lines: ['Weeks 1-4 rose steadily', 'Week 3 spiked during the market festival', 'So festivals double our sales forever', 'Week 4 was back to normal growth'],
        bug: 2,
        fix: 'Festivals gave a one-week spike.',
        explanation: 'One festival week can\'t predict "forever".',
      },
      {
        kind: 'mcq',
        prompt: 'Why add a note saying "completed payments only"?',
        options: [
          { text: 'Readers need to know what\'s counted' },
          { text: 'To fill space', why: 'It changes the meaning.' },
          { text: 'Legal reasons', why: 'It\'s about clarity.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '50 shops x 10 payments x 100 GHS. Rough total?',
        answers: ['50000', '50,000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI says the average payment is 1,274 GHS. Sound right?',
        prompt: 'Most payments are 50-200 GHS. Best reply?',
        options: [
          { text: 'That looks about ten times too high. I\'ll recalculate it with a formula and send the real number.' },
          { text: 'Yes, the AI is precise.', why: 'The estimate says it\'s wrong.' },
          { text: 'Averages don\'t matter.', why: 'Check it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these skills would make your next report clearer?',
    starters: ['The skill:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 7 lessons 6-9.',
};

export default lesson;
