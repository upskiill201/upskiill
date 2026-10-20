import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (default margins, width, max-width, box-sizing). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Ama stops scrolling',
  summary: 'Ama scrolls down the beat cards on her old phone. Down, down, down. Never sideways. She gives the page a thumbs up without looking up. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Remove default margins', 'Size cards with max-width', 'Use border-box so widths mean what they say'],
  learn: [
    {
      kind: 'story',
      title: 'Never sideways',
      beats: [
        { speaker: 'narrator', text: 'Ama\'s thumb moves up and down the screen. Every card fits. Every cover shrinks to fit its card.' },
        { speaker: 'ama', text: 'It doesn\'t wobble sideways any more.' },
        { speaker: 'tey', text: 'max-width, border-box and img { max-width: 100%; }. Three lines that save every phone user. Let\'s check them.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: fits every phone.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make the cards fit: every element border-box, and articles a max-width of 500px',
        starter: '<style>\n\n  article { padding: 16px; border: 2px solid #FF9600; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  * { box-sizing: border-box; }\n  article { padding: 16px; border: 2px solid #FF9600; max-width: 500px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        hint: 'A * rule at the top, and max-width: 500px; on article.',
        checks: [
          { message: 'Border-box everywhere', dom: { selector: 'h2', style: 'box-sizing', styleValue: 'border-box' } },
          { message: 'Cards up to 500px', dom: { selector: 'article', style: 'max-width', styleValue: '500px' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How wide is this card, edges and all?',
        code: 'article {\n  width: 200px;\n  padding: 10px;\n  border: 5px solid #FF9600;\n}',
        language: 'css',
        options: [
          { text: '230px: 200 + 10 + 10 + 5 + 5' },
          { text: '200px', why: 'Only with border-box.' },
          { text: '215px', why: 'Padding and border count on both sides.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good for phones, or will it stick out?',
        groups: ['Good for phones', 'Sticks out'],
        items: [
          { text: 'max-width: 500px', group: 0 },
          { text: 'width: 700px', group: 1 },
          { text: 'img { max-width: 100%; }', group: 0 },
          { text: 'width: 100% with padding and content-box', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line causing the gap around the page.',
        language: 'css',
        lines: ['* { box-sizing: border-box; }', 'body { padding: 0; }', 'header { background-color: #FF9600; }'],
        bug: 1,
        explanation: 'The gap is the body\'s default margin. It needs margin: 0.',
        fix: 'body { margin: 0; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Why does the big cover picture fit now?',
        options: [
          { text: 'It has max-width: 100%, so it\'s never wider than its card.' },
          { text: 'Because your phone got bigger.', why: 'The image shrinks to fit.' },
          { text: 'I deleted it.', why: 'It\'s still there, just shrunk to fit.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to the problem it fixes.',
        pairs: [
          ['body { margin: 0; }', 'Gap around the page'],
          ['max-width: 500px', 'Cards too wide for phones'],
          ['* { box-sizing: border-box; }', 'Padding making boxes wider'],
          ['img { max-width: 100%; }', 'Pictures off the edge'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Two stacked cards: 20px bottom margin on the first, 12px top margin on the second. The gap?',
        options: [
          { text: '20px' },
          { text: '32px', why: 'Stacked margins don\'t add.' },
          { text: '12px', why: 'The bigger one wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the phone-proof lines.',
        language: 'css',
        template: 'article { [[1]]: 500px; }\nimg { max-width: [[2]]; }',
        blanks: [['max-width'], ['100%']],
        distractors: ['width', '500px', 'min-width'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The selector * picks every element. What is the * symbol called? (one word)',
        answers: ['asterisk', 'star'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Kofi\'s stylesheet in a sensible order.',
        language: 'css',
        lines: ['* { box-sizing: border-box; }', 'body { margin: 0; }', 'article { max-width: 500px; padding: 16px; }', 'img { max-width: 100%; }'],
      },
    ],
  },
  reflect: {
    prompt: 'Test your page on the smallest screen you can. Does it scroll sideways anywhere?',
    starters: ['On a small phone...', 'I fixed...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add the three phone-proof lines to your page: border-box everywhere, max-width on cards, and max-width: 100% on images.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
