import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 13 — moving one item: margin-left: auto, align-self, and why order is risky. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Moving just one item',
  summary: 'Kofi\'s header now has four items: name, Beats, Gigs, and a bright Book me button. He wants the name on the left, the two links in the middle area, and Book me on its own at the far right. Tey shows him how to move one item without touching the rest.',
  minutes: 11,
  outcomes: ['Push one item away with margin-left: auto', 'Align one item differently with align-self', 'Explain why changing order can confuse keyboard and screen reader users'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'space-between spreads everything evenly. To push just one item to the far end, give it margin-left: auto. An auto margin soaks up all the leftover space on that side.',
          replies: ['So Book me goes right, the rest stay left?'],
        },
        {
          tey: 'Exactly. Everything before it stays together on the left; Book me and anything after it move to the right. It\'s the most-used trick in navigation bars.',
          replies: ['Can one item line up differently too?'],
        },
        {
          tey: 'Yes: align-self works like align-items, but for one item. align-self: flex-end on one card in a row drops just that card to the bottom.',
          replies: ['Is there a way to change the order?'],
        },
        {
          tey: 'There\'s an order property, but be careful. It moves things on screen only. Keyboard users tabbing through, and screen readers, still follow the HTML order. If they don\'t match, people get lost. Usually it\'s better to change the order in the HTML itself.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Book me, on its own',
      caption: 'The Book me item has margin-left: auto, so it\'s pushed to the far right.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0; }\n  nav ul { display: flex; align-items: center; gap: 16px; list-style: none; margin: 0; padding: 16px; background-color: #1F2E52; }\n  a { color: #FF9600; }\n  .book { margin-left: auto; }\n  .book a { display: inline-block; background-color: #FF9600; color: #14213D; padding: 12px 16px; border-radius: 8px; }\n</style>\n<nav>\n  <ul>\n    <li><strong>Mensah Beats</strong></li>\n    <li><a href="#beats">Beats</a></li>\n    <li><a href="#gigs">Gigs</a></li>\n    <li class="book"><a href="#book">Book me</a></li>\n  </ul>\n</nav>\n',
      challenge: 'Move class="book" to the Gigs item. Now Gigs and Book me both go right.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'margin-left: auto pushes one item to the end. align-self aligns one item. Change order in the HTML, not with order.',
    },
  ],
  apply: {
    scenario: 'Moving just one item.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does margin-left: auto do to a flex item?',
        options: [
          { text: 'Centres it', why: 'Only auto on both sides centres.' },
          { text: 'Nothing in Flexbox', why: 'Auto margins are very useful in Flexbox.' },
          { text: 'Takes all the leftover space on its left, pushing it to the far end' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Push Book me to the far right: margin-left auto on .book',
        starter: '<style>\n  nav ul { display: flex; gap: 16px; }\n\n</style>\n<nav><ul><li>Mensah Beats</li><li><a href="#beats">Beats</a></li><li class="book"><a href="#book">Book me</a></li></ul></nav>\n',
        solution: '<style>\n  nav ul { display: flex; gap: 16px; }\n  .book { margin-left: auto; }\n</style>\n<nav><ul><li>Mensah Beats</li><li><a href="#beats">Beats</a></li><li class="book"><a href="#book">Book me</a></li></ul></nav>\n',
        hint: '.book { margin-left: auto; }',
        checks: [
          { message: 'Pushed right', dom: { selector: '.book', style: 'margin-left', styleValue: 'auto' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each property to what it does.',
        pairs: [
          ['margin-left: auto', 'Pushes one item to the end'],
          ['align-self', 'Aligns one item across the row'],
          ['order', 'Moves an item on screen only'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Affects one item, or the whole container?',
        groups: ['One item', 'Whole container'],
        items: [
          { text: 'align-self: flex-end', group: 0 },
          { text: 'align-items: center', group: 1 },
          { text: 'margin-left: auto on .book', group: 0 },
          { text: 'justify-content: space-between', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I\'ll use order to show Book me first on the screen but keep it last in the HTML.',
        options: [
          { text: 'Keyboard users and screen readers would still meet it last. If it should be first, move it in the HTML.' },
          { text: 'Good idea, nobody will notice.', why: 'Keyboard and screen reader users will.' },
          { text: 'order changes the HTML too.', why: 'It only changes what\'s on screen.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Book me should go right. Tap the line that centres it instead.',
        language: 'css',
        lines: ['.book { margin-left: auto; }', '.book { margin: 0 auto; }', '.book a { padding: 12px 16px; }'],
        bug: 1,
        explanation: 'auto on both sides splits the space, so it sits in the middle. Only the left should be auto.',
        fix: '.book { margin-left: auto; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which cards sit at the bottom of the row?',
        code: '.row { display: flex; align-items: flex-start; height: 300px; }\n.new { align-self: flex-end; }\n\n<section class="row"><article>A</article><article class="new">B</article><article>C</article></section>',
        language: 'html',
        options: [
          { text: 'All three', why: 'align-self only changes B.' },
          { text: 'A and C', why: 'They follow align-items: flex-start.' },
          { text: 'Only B' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Push Book me right, and drop the New card to the bottom.',
        language: 'css',
        template: '.book { margin-left: [[1]]; }\n.new { [[2]]: flex-end; }',
        blanks: [['auto'], ['align-self']],
        distractors: ['right', 'align-items', '100%'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which value of margin-left pushes a flex item to the far end? (one word)',
        answers: ['auto'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the safe way to change the order items appear in?',
        options: [
          { text: 'Use order on every item', why: 'That splits screen order from reading order.' },
          { text: 'Move them in the HTML' },
          { text: 'Use margins', why: 'Margins move things apart, not reorder them.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Does your header have one item that should stand apart, like a contact button?',
    starters: ['My...', 'should go...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN ordering flex items accessibility" and read why visual and reading order should match.',
  },
  notes: 'Auto margins absorb free space in flex layout (CSS Flexbox §8.1). order affects visual order only; WCAG 1.3.2 Meaningful Sequence and 2.4.3 Focus Order.',
};

export default lesson;
