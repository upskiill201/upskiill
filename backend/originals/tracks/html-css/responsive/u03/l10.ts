import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (align-items, centring, flex-direction, wrapping). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: no more spaghetti',
  summary: 'Ama scrolls the beat cards on her phone: one per line, full words, Play buttons that fit. On Kofi\'s laptop, the same cards sit three in a row. Same CSS. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Centre items with align-items and justify-content', 'Build a card as a flex column', 'Let a row of cards wrap'],
  learn: [
    {
      kind: 'story',
      title: 'Same CSS, two screens',
      beats: [
        { speaker: 'ama', text: 'No spaghetti. One card, then the next.' },
        { speaker: 'kofi', text: 'And on my laptop, three in a row. I didn\'t write anything special for either.' },
        { speaker: 'tey', text: 'That\'s wrapping doing its job. Quick check before we share out the space.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: columns, centring, wrapping.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make the beat list a wrapping flex row with a 16px gap',
        starter: '<style>\n\n  .card { width: 200px; }\n</style>\n<section class="beat-list"><article class="card">A</article><article class="card">B</article></section>\n',
        solution: '<style>\n  .beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n  .card { width: 200px; }\n</style>\n<section class="beat-list"><article class="card">A</article><article class="card">B</article></section>\n',
        hint: '.beat-list { display: flex; flex-wrap: wrap; gap: 16px; }',
        checks: [
          { message: 'A flex row', dom: { selector: '.beat-list', style: 'display', styleValue: 'flex' } },
          { message: 'That wraps', dom: { selector: '.beat-list', style: 'flex-wrap', styleValue: 'wrap' } },
          { message: 'With gaps', dom: { selector: '.beat-list', style: 'gap', styleValue: '16px' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'In this column, where is the button?',
        code: '.card { display: flex; flex-direction: column; align-items: center; }',
        language: 'css',
        options: [
          { text: 'Centred left to right' },
          { text: 'Centred top to bottom', why: 'In a column, align-items works left to right.' },
          { text: 'Stretched full width', why: 'center stops the stretch.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'In a ROW: along or across?',
        groups: ['Along (left to right)', 'Across (top to bottom)'],
        items: [
          { text: 'justify-content', group: 0 },
          { text: 'align-items', group: 1 },
          { text: 'space-between', group: 0 },
          { text: 'Lining up middles of different heights', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The banner should be dead centre. Tap what\'s missing.',
        language: 'css',
        lines: ['section {', '  display: flex;', '  justify-content: center;', '  height: 200px;', '}'],
        bug: 2,
        explanation: 'Only one direction is centred. Add align-items: center for top to bottom.',
        fix: '  justify-content: center; align-items: center;',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each layout to its CSS.',
        pairs: [
          ['Dead-centre banner', 'justify-content + align-items: center'],
          ['Stacked card', 'flex-direction: column'],
          ['Cards that drop to new lines', 'flex-wrap: wrap'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why didn\'t align-items move anything in my banner?',
        options: [
          { text: 'The banner had no extra height, so there was no room to move. Give it a height.' },
          { text: 'It only works in columns.', why: 'It works in rows too.' },
          { text: 'Use !important.', why: 'It needs room, not force.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'By default, what do flex items do when the row is too narrow?',
        options: [
          { text: 'Stay on one line and shrink' },
          { text: 'Wrap onto new lines', why: 'Only with flex-wrap: wrap.' },
          { text: 'Disappear', why: 'They shrink.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Stack and centre the card.',
        language: 'css',
        template: '.card { display: flex; flex-direction: [[1]]; align-items: [[2]]; }',
        blanks: [['column'], ['center']],
        distractors: ['row', 'middle', 'stack'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property lets flex items move onto new lines? (hyphenated)',
        answers: ['flex-wrap'],
        placeholder: 'A property',
      },
      {
        kind: 'writeCode',
        prompt: 'Make the card a column whose items keep their own width: flex-direction column, align-items flex-start',
        starter: '<style>\n  .card { display: flex; }\n</style>\n<article class="card"><h2>Sunrise in Osu</h2><a href="#play">Play</a></article>\n',
        solution: '<style>\n  .card { display: flex; flex-direction: column; align-items: flex-start; }\n</style>\n<article class="card"><h2>Sunrise in Osu</h2><a href="#play">Play</a></article>\n',
        hint: 'flex-direction: column; align-items: flex-start;',
        checks: [
          { message: 'A column', dom: { selector: '.card', style: 'flex-direction', styleValue: 'column' } },
          { message: 'No stretching', dom: { selector: '.card', style: 'align-items', styleValue: 'flex-start' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Check your page on a phone and a laptop. Does it wrap well on both?',
    starters: ['On a phone...', 'On a laptop...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make your card list wrap, and centre one thing on your page both ways.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
