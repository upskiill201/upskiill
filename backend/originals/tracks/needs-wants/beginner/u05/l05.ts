import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: ₦900,000',
  summary: 'Month 6. Ada opens her Mexico fund: ₦900,000. Exactly. Mum\'s freezer is humming in Surulere. Check what you know: third options, family requests, values-first plans and extra income.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Handle family requests with a plan', 'Give extra income a job'],
  learn: [
    {
      kind: 'story',
      title: 'Exactly',
      beats: [
        { speaker: 'ada', text: '₦900,000. I\'m going to Mexico City.' },
        { speaker: 'narrator', text: 'Lucía, by voice note, shouting: "¡Sí! Bring your best portfolio and your most comfortable shoes!"' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: choosing on purpose.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When two values clash, what should you look for?',
        options: [
          { text: 'A third option: share, earn more, or do it in stages' },
          { text: 'All or nothing', why: 'Rarely the only way.' },
          { text: 'Whatever is cheapest', why: 'Values first.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the family request process.',
        lines: ['Listen', 'Check the need', 'Check who else can help', 'Decide your share', 'Give from a planned line'],
      },
      {
        kind: 'typeAnswer',
        prompt: '₦845,000 + ₦125,000 (café) − ₦70,000 (freezer share). What\'s in the fund?',
        answers: ['900000', '900,000', '₦900,000', '₦900000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Protected or flexes, in a values-first plan?',
        groups: ['Protected', 'Flexes'],
        items: [
          { text: 'Basic food', group: 0 },
          { text: 'Next-trip fund', group: 1 },
          { text: 'Family support', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each freelance split part to its job.',
        pairs: [
          ['Half', 'Goals'],
          ['A quarter', 'Taxes and costs'],
          ['The last quarter', 'Enjoy'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'A cousin wants ₦50,000 for a party. Must-have?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Nice-to-have. A small gift from your family line if you want, or a kind no.' },
          { text: 'Must-have, pay it.', why: 'A party isn\'t a must-have.' },
          { text: 'Use the emergency fund.', why: 'Not an emergency.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Extra income.',
        template: 'Give it a [[1]] before it [[2]].',
        blanks: [['job'], ['lands', 'arrives']],
        distractors: ['name', 'leaves'],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief would undo Ada\'s six months?',
        lines: [
          'My values plan guides my spending.',
          'Extra income gets split the same day.',
          'Now that I\'m going, I can stop all this.',
        ],
        bug: 2,
        fix: 'The habits keep going after Mexico.',
        explanation: 'The plan is for life, not just for one trip.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 4: what\'s the 10/10/10 test?',
        options: [
          { text: 'How you\'ll feel in 10 minutes, 10 months and 10 years' },
          { text: 'Spend 10%, save 10%, give 10%', why: 'Different idea.' },
          { text: 'Ten questions in ten seconds', why: 'It\'s about time horizons.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: what does joy per naira measure?',
        options: [
          { text: 'How much a spending line adds to your life, compared with its cost' },
          { text: 'How cheap something is', why: 'It\'s value for joy.' },
          { text: 'Your salary', why: 'It\'s about spending.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 1: Ada\'s saving went from ₦20,000 to ₦135,000 a month. How much more?',
        answers: ['115000', '115,000', '₦115,000', '₦115000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the biggest change you\'ve made since starting this course?',
    starters: ['The biggest change:...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1–4 with Chapter 1, 3 and 4 review. Fund 845,000 + 125,000 − 70,000 = 900,000 (running numbers). Surulere: Mum\'s shop location (narrated, new detail).',
};

export default lesson;
