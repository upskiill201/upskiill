import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 11 — sharing leftover space: flex-grow. Story choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Three uneven boxes',
  summary: 'Kofi adds three boxes under his header: Listen, Gigs, Book me. With no width set, each is only as wide as its words, so "Book me for your event" is huge and "Gigs" is tiny. Choose how they share the row.',
  minutes: 11,
  outcomes: ['Explain how flex items size themselves by default', 'Share leftover space with flex-grow', 'Give items equal shares'],
  learn: [
    {
      kind: 'story',
      title: 'Uneven',
      beats: [
        { speaker: 'narrator', text: 'Three boxes in a row. One stretches halfway across the page. One is barely wider than its word. And there\'s a gap of nothing on the right.' },
        { speaker: 'efua', text: 'They should be equal. Three matching boxes, filling the row.' },
        { speaker: 'kofi', text: 'Width: 33%?' },
        { speaker: 'miracle', text: 'That works until you add the gap. Flexbox can share the space for you.' },
      ],
      choice: {
        prompt: 'How should the three boxes share the row?',
        options: [
          {
            text: 'Give each one flex-grow: 1, so they share the leftover space and fill the row.',
            outcome: 'The boxes stretch to fill the row, gaps and all. Add a fourth box and they all adjust.',
            best: true,
          },
          {
            text: 'Set each one to width: 33%.',
            outcome: '33% + 33% + 33% plus two gaps is more than 100%, so the browser squeezes all three to fit. Change the gap and the sums are wrong again.',
          },
          {
            text: 'Shorten the words so they\'re similar lengths.',
            outcome: '"Book me" loses its useful "for your event", and the boxes still aren\'t equal.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>flex-grow</strong> says how much of the leftover space an item takes. Default 0: none, so items stay the width of their content. Give every item flex-grow: 1, and the leftover space is shared equally between them. Give one item 2, and it gets twice as big a share as the others.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Share the row',
      caption: 'Every box has flex-grow: 1, so the leftover space is shared out and they fill the row.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .actions { display: flex; gap: 16px; }\n  .actions article { flex-grow: 1; background-color: #1F2E52; border: 2px solid #FF9600; border-radius: 12px; padding: 16px; }\n</style>\n<section class="actions">\n  <article>Listen</article>\n  <article>Gigs</article>\n  <article>Book me for your event</article>\n</section>\n',
      challenge: 'Delete flex-grow: 1. The boxes shrink back to their words.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'flex-grow shares the leftover space. All set to 1: equal shares that fill the row.',
    },
  ],
  apply: {
    scenario: 'Three uneven boxes.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why were the boxes different widths?',
        options: [
          { text: 'With flex-grow 0, each item is only as wide as its content' },
          { text: 'Flexbox makes items random widths', why: 'They size to their content by default.' },
          { text: 'The gap was wrong', why: 'Content decides the width by default.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the boxes share the row: flex-grow 1 on .actions article',
        starter: '<style>\n  .actions { display: flex; gap: 16px; }\n\n</style>\n<section class="actions"><article>Listen</article><article>Gigs</article></section>\n',
        solution: '<style>\n  .actions { display: flex; gap: 16px; }\n  .actions article { flex-grow: 1; }\n</style>\n<section class="actions"><article>Listen</article><article>Gigs</article></section>\n',
        hint: '.actions article { flex-grow: 1; }',
        checks: [
          { message: 'The boxes grow', dom: { selector: '.actions article', style: 'flex-grow', styleValue: '1' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['flex-grow: 1 on each', 'They fill the row'],
          ['width: 33% each', 'Squeezed, sums never right'],
          ['Shorter words', 'Lost useful text, still uneven'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the item grow to take leftover space?',
        groups: ['Grows', 'Stays its content width'],
        items: [
          { text: 'flex-grow: 1', group: 0 },
          { text: 'flex-grow: 0', group: 1 },
          { text: 'flex-grow: 2', group: 0 },
          { text: 'No flex-grow set', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why didn\'t width: 33% work?',
        options: [
          { text: '% doesn\'t work in Flexbox.', why: 'It works. The gaps push it over 100%.' },
          { text: 'It needs 34%.', why: 'Even more over 100%.' },
          { text: 'The gaps take space too, so three 33% boxes plus gaps add up to more than the row.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule on the wrong element.',
        language: 'css',
        lines: ['.actions { display: flex; gap: 16px; }', '.actions { flex-grow: 1; }', '.actions article { padding: 16px; }'],
        bug: 1,
        explanation: 'flex-grow belongs on the items, not the container.',
        fix: '.actions article { flex-grow: 1; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The leftover space is 300px. How much does each item get?',
        code: '.a { flex-grow: 1; }\n.b { flex-grow: 2; }',
        language: 'css',
        options: [
          { text: 'Both get 150px', why: 'b asks for two shares, a for one.' },
          { text: 'a gets 100px, b gets 200px' },
          { text: 'b gets it all', why: 'They share: 1 share and 2 shares.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the items share the row equally.',
        language: 'css',
        template: '.actions article { [[1]]: [[2]]; }',
        blanks: [['flex-grow'], ['1']],
        distractors: ['width', '33%', 'grow'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the default flex-grow? (a number)',
        answers: ['0', 'zero'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Give the Listen box a double share: .listen gets flex-grow 2',
        starter: '<style>\n  .actions { display: flex; }\n  .actions article { flex-grow: 1; }\n\n</style>\n<section class="actions"><article class="listen">Listen</article><article>Gigs</article></section>\n',
        solution: '<style>\n  .actions { display: flex; }\n  .actions article { flex-grow: 1; }\n  .actions .listen { flex-grow: 2; }\n</style>\n<section class="actions"><article class="listen">Listen</article><article>Gigs</article></section>\n',
        hint: '.actions .listen { flex-grow: 2; } (it needs to beat .actions article, 0-1-1)',
        checks: [
          { message: 'Listen gets two shares', dom: { selector: '.listen', style: 'flex-grow', styleValue: '2' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where on your page would equal boxes look better than content-sized ones?',
    starters: ['My...', 'would look better equal because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Put three boxes in a flex row on your page and give each flex-grow: 1.',
  },
  notes: 'flex-grow initial 0; leftover space distributed proportionally (CSS Flexbox §9.7). Note the specificity reminder in the last exercise: .listen (0-1-0) alone would lose to .actions article (0-1-1), so .actions .listen (0-2-0) is used.',
};

export default lesson;
