import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 8 — flex-direction: row vs column, and how the axes swap. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Rows and columns',
  summary: 'Inside each beat card, Kofi wants the cover, name and Play button stacked neatly, and the Play button pushed to the bottom. Flexbox does columns too. Tey explains, one card at a time.',
  minutes: 11,
  outcomes: ['Stack items with flex-direction: column', 'Explain how justify-content and align-items swap jobs in a column', 'Use gap in a column'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>flex-direction</strong> chooses the line items follow. row (the default) goes left to right. <strong>column</strong> goes top to bottom.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Why bother, if blocks already stack?</strong> Because a flex column gets everything Flexbox has: gap between items, and justify-content and align-items to place them. Plain stacking has none of that.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>The directions swap.</strong> justify-content always works along the direction items flow. In a column, that\'s top to bottom. align-items works across it: in a column, that\'s left to right.</p>',
    },
    {
      kind: 'check',
      question: 'In a column, which property moves items left and right?',
      options: ['justify-content', 'align-items', 'gap'],
      answer: 1,
      explanation: 'In a column, align-items works across: left to right. justify-content works along: top to bottom.',
    },
    {
      kind: 'tryIt',
      title: 'A card as a column',
      caption: 'The card is a flex column with a gap. align-items: flex-start stops the Play button stretching full width.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .card { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; max-width: 260px; background-color: #1F2E52; padding: 16px; border-radius: 12px; }\n  .card h2 { margin: 0; }\n  .card img { max-width: 100%; border-radius: 8px; }\n  .play-button { background-color: #FF9600; color: #14213D; padding: 12px 16px; border-radius: 8px; }\n</style>\n<article class="card">\n  <img src="cover-2.png" alt="Album cover for Jollof Bounce">\n  <h2>Jollof Bounce</h2>\n  <a class="play-button" href="#play">Play</a>\n</article>\n',
      challenge: 'Delete align-items: flex-start. The Play button stretches across the card.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'flex-direction: column stacks items. justify-content follows the flow; align-items works across it.',
    },
  ],
  apply: {
    scenario: 'Cards as columns.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does flex-direction: column do?',
        options: [
          { text: 'Makes the container a column of the page', why: 'It changes how its items flow.' },
          { text: 'Lines the items up top to bottom' },
          { text: 'Nothing, blocks already stack', why: 'A flex column adds gap and alignment.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the card a flex column with an 8px gap',
        starter: '<style>\n  .card { display: flex; }\n</style>\n<article class="card"><h2>Jollof Bounce</h2><p>Fast, loud, for dancing.</p></article>\n',
        solution: '<style>\n  .card { display: flex; flex-direction: column; gap: 8px; }\n</style>\n<article class="card"><h2>Jollof Bounce</h2><p>Fast, loud, for dancing.</p></article>\n',
        hint: 'flex-direction: column; gap: 8px;',
        checks: [
          { message: 'A column', dom: { selector: '.card', style: 'flex-direction', styleValue: 'column' } },
          { message: '8px between items', dom: { selector: '.card', style: 'gap', styleValue: '8px' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'In a COLUMN, match each property to its direction.',
        pairs: [
          ['justify-content', 'Top to bottom'],
          ['align-items', 'Left to right'],
          ['gap', 'Between items'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'row or column?',
        groups: ['row', 'column'],
        items: [
          { text: 'Name left, links right', group: 0 },
          { text: 'Cover, name, button stacked in a card', group: 1 },
          { text: 'Three buttons side by side', group: 0 },
          { text: 'A form: label, box, label, box', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My Play button stretches across the whole card. Why?',
        options: [
          { text: 'Links are always full width.', why: 'It\'s the column\'s stretch.' },
          { text: 'Add more padding.', why: 'That makes it bigger, not narrower.' },
          { text: 'In a column, items stretch across by default. align-items: flex-start lets it be its own width.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t make a column.',
        language: 'css',
        lines: ['.card { display: flex; flex-direction: column; }', '.card { display: flex; direction: column; }', '.card { display: flex; flex-direction: column; gap: 8px; }'],
        bug: 1,
        explanation: 'The property is flex-direction. direction is something else (text direction).',
        fix: '.card { display: flex; flex-direction: column; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where do the items sit?',
        code: '.card { display: flex; flex-direction: column; align-items: center; }',
        language: 'css',
        options: [
          { text: 'Stacked, each centred left to right' },
          { text: 'In a row, centred', why: 'It\'s a column.' },
          { text: 'Stacked at the bottom', why: 'align-items works across: left to right.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Stack the card\'s items.',
        language: 'css',
        template: '.card { display: flex; [[1]]: [[2]]; gap: 8px; }',
        blanks: [['flex-direction'], ['column']],
        distractors: ['direction', 'stack', 'vertical'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the default flex-direction? (one word)',
        answers: ['row'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Stop the Play button stretching: align-items flex-start on the card',
        starter: '<style>\n  .card { display: flex; flex-direction: column; }\n</style>\n<article class="card"><h2>Jollof Bounce</h2><a href="#play">Play</a></article>\n',
        solution: '<style>\n  .card { display: flex; flex-direction: column; align-items: flex-start; }\n</style>\n<article class="card"><h2>Jollof Bounce</h2><a href="#play">Play</a></article>\n',
        hint: 'align-items: flex-start;',
        checks: [
          { message: 'Items keep their own width', dom: { selector: '.card', style: 'align-items', styleValue: 'flex-start' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What on your page is really a column of items that could use gap?',
    starters: ['My...', 'would look better with...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make one card or section on your page a flex column with a gap, and decide whether its items should stretch.',
  },
  notes: 'flex-direction values row, row-reverse, column, column-reverse; reverse values omitted (they reorder visually only). In a column flex container, the main axis is vertical (CSS Flexbox §2).',
};

export default lesson;
