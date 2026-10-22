import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 (boxes, padding, the four layers, shorthand). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first real card',
  summary: 'Kofi rebuilds the Sunrise in Osu card: border, padding, a gap below. He holds his phone up to the camera. Miracle: "Now that\'s a card." Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Turn a beat into a card with border and padding', 'Space cards apart with margin', 'Read padding and margin shorthand'],
  learn: [
    {
      kind: 'story',
      title: 'Now that\'s a card',
      beats: [
        { speaker: 'narrator', text: 'One card. Orange border, 16px of room inside, 16px of space below. The words finally look like they belong there.' },
        { speaker: 'miracle', text: 'Now that\'s a card. Five more beats to go.' },
        { speaker: 'tey', text: 'Before you copy it five times, let\'s check the basics are solid.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the first card.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the card: every article gets a 2px solid #FF9600 border, 16px padding and a 16px bottom margin',
        starter: '<style>\n\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; padding: 16px; margin-bottom: 16px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
        hint: 'One article rule with border, padding and margin-bottom.',
        checks: [
          { message: 'Orange border', dom: { selector: 'article', style: 'border-color', styleValue: '#FF9600' } },
          { message: '16px padding', dom: { selector: 'article', style: 'padding-left', styleValue: '16px' } },
          { message: 'A gap below', dom: { selector: 'article', style: 'margin-bottom', styleValue: '16px' } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'The four layers, inside out.',
        lines: ['Content', 'Padding', 'Border', 'Margin'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What padding does the right side get?',
        code: 'article { padding: 8px 24px 16px 4px; }',
        language: 'css',
        options: [
          { text: '4px', why: 'That\'s the left: the last of four.' },
          { text: '24px' },
          { text: '8px', why: 'That\'s the top.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Padding or margin?',
        groups: ['Padding', 'Margin'],
        items: [
          { text: 'Room between the words and the border', group: 0 },
          { text: 'The gap between two cards', group: 1 },
          { text: 'Filled by the background colour', group: 0 },
          { text: 'Always see-through', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t work.',
        language: 'css',
        lines: ['article {', '  border: 2px solid #FF9600;', '  padding: 16 px;', '}'],
        bug: 2,
        explanation: 'No space between the number and the unit: 16px.',
        fix: '  padding: 16px;',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Why not just put an empty paragraph between the cards for a gap?',
        options: [
          { text: 'Margin does it in CSS, the same on every card, and you change it in one place.' },
          { text: 'Good idea.', why: 'Empty elements are a hack. Use margin.' },
          { text: 'Use more padding.', why: 'Padding is inside the card.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to its effect.',
        pairs: [
          ['padding: 16px;', 'Room inside, all sides'],
          ['margin-bottom: 16px;', 'Gap below the card'],
          ['border: 2px solid #FF9600;', 'An orange edge'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which element wraps one self-contained beat card?',
        options: [
          { text: '<card>', why: 'There\'s no card element in HTML.' },
          { text: '<article>' },
          { text: '<h2>', why: 'The h2 is the name, inside the card.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Top and bottom 8px, left and right 16px.',
        language: 'css',
        template: 'article { padding: [[1]] [[2]]; }',
        blanks: [['8px'], ['16px']],
        distractors: ['24px', '0', '4px'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which layer is the edge of the box? (one word)',
        answers: ['border'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Build one card on your own page. What will yours hold?',
    starters: ['My card will hold...', 'I\'ll give it...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Turn one part of your page into a card: border, padding and a margin below.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
