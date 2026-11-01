import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 (flex-grow, flex shorthand, auto margins, align-self, order, nav bar). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the bar is up',
  summary: 'Name on the left, Beats and Gigs beside it, a bright Book me button alone on the right. Below, beat cards that pick their own rows. Miracle: "I\'d hire you to build that." Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Share space with flex-grow and the flex shorthand', 'Push one item away with an auto margin', 'Build a nav bar'],
  learn: [
    {
      kind: 'story',
      title: '"I\'d hire you"',
      beats: [
        { speaker: 'narrator', text: 'Miracle opens the site on her laptop, then on her phone. The bar holds. The cards rearrange.' },
        { speaker: 'miracle', text: 'I\'d hire you to build that.' },
        { speaker: 'kofi', text: 'Five weeks ago I didn\'t know what a box was.' },
        { speaker: 'tey', text: 'One last check, then we deal with Ama\'s phone.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: sharing space and the bar.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Push Book me to the far right of the links row: margin-left auto on .book',
        starter: '<style>\n  .nav-links { display: flex; gap: 8px; list-style: none; padding: 0; }\n\n</style>\n<ul class="nav-links"><li><a href="#beats">Beats</a></li><li class="book"><a href="#book">Book me</a></li></ul>\n',
        solution: '<style>\n  .nav-links { display: flex; gap: 8px; list-style: none; padding: 0; }\n  .book { margin-left: auto; }\n</style>\n<ul class="nav-links"><li><a href="#beats">Beats</a></li><li class="book"><a href="#book">Book me</a></li></ul>\n',
        hint: '.book { margin-left: auto; }',
        checks: [
          { message: 'Book me pushed right', dom: { selector: '.book', style: 'margin-left', styleValue: 'auto' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each number in flex: 1 1 220px.',
        pairs: [
          ['1 (first)', 'Grow into leftover space'],
          ['1 (second)', 'Shrink if needed'],
          ['220px', 'Starting size'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Leftover space is 120px. How much does each item get?',
        code: '.a, .b, .c { flex-grow: 1; }',
        language: 'css',
        options: [
          { text: '120px each', why: 'They share the 120px.' },
          { text: '40px each' },
          { text: 'All to .a', why: 'Equal grow values share equally.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe, or will it confuse keyboard users?',
        groups: ['Safe', 'Confusing'],
        items: [
          { text: 'Changing the order in the HTML', group: 0 },
          { text: 'order: -1 to show the last link first', group: 1 },
          { text: 'margin-left: auto to push one item', group: 0 },
          { text: 'Different order on screen and in the HTML', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that leaves an empty gap at the end of each row.',
        language: 'css',
        lines: ['.beat-list { display: flex; flex-wrap: wrap; gap: 16px; }', '.beat-list .card { flex: 0 0 220px; }', '.card { padding: 16px; }'],
        bug: 1,
        explanation: 'No growing (and no shrinking), so cards stay 220px and the leftover space sits empty. Use flex: 1 1 220px.',
        fix: '.beat-list .card { flex: 1 1 220px; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'One gig card should sit lower than the others in the row. Possible?',
        options: [
          { text: 'Only by changing every card.', why: 'align-self changes one.' },
          { text: 'Use order.', why: 'order changes position along the row, not up and down.' },
          { text: 'Yes: align-self: flex-end on just that card.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Why remove margin and padding from the nav\'s ul?',
        options: [
          { text: 'Lists have default spacing that pushes the links out of line' },
          { text: 'Flexbox needs zero padding', why: 'It\'s the list\'s defaults getting in the way.' },
          { text: 'To make it faster', why: 'It\'s about spacing.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Cards that pick their own row.',
        language: 'css',
        template: '.beat-list { display: flex; flex-wrap: [[1]]; }\n.beat-list .card { flex: 1 1 [[2]]; }',
        blanks: [['wrap'], ['220px']],
        distractors: ['nowrap', '100%', 'auto'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property aligns just one flex item across the row? (hyphenated)',
        answers: ['align-self'],
        placeholder: 'A property',
      },
      {
        kind: 'writeCode',
        prompt: 'Make the three boxes share the row equally: flex-grow 1 on .actions article',
        starter: '<style>\n  .actions { display: flex; gap: 16px; }\n\n</style>\n<section class="actions"><article>Listen</article><article>Gigs</article><article>Book me</article></section>\n',
        solution: '<style>\n  .actions { display: flex; gap: 16px; }\n  .actions article { flex-grow: 1; }\n</style>\n<section class="actions"><article>Listen</article><article>Gigs</article><article>Book me</article></section>\n',
        hint: '.actions article { flex-grow: 1; }',
        checks: [
          { message: 'Equal shares', dom: { selector: '.actions article', style: 'flex-grow', styleValue: '1' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Would you hire yourself to build your own page yet? What would make you say yes?',
    starters: ['Not yet, because...', 'Yes, because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add an auto-margin button to your nav bar, and make your card row fill every line.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
