import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 6 — default margins, removing body's margin, stacked margins (the bigger one wins). Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Space you didn\'t ask for',
  summary: 'Kofi sets his page background to night blue, and there\'s a thin gap around the edge of the page he never added. His headings have space above them he never added either. Tey explains the browser\'s built-in margins.',
  minutes: 11,
  outcomes: ['Explain that browsers add default margins', 'Remove the body\'s default margin', 'Predict the gap between two stacked boxes'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Browsers give some elements margins before you write any CSS. The body usually gets 8px on every side. Headings and paragraphs get space above and below. That\'s why a plain page isn\'t jammed against the edges.',
          replies: ['So where\'s my mystery gap from?'],
        },
        {
          tey: 'Your header has a background colour, and the body\'s 8px margin is around it. Set body { margin: 0; } and the header reaches the edges.',
          replies: ['And the space above my headings?'],
        },
        {
          tey: 'The h2\'s own default margin. You can change it like any margin: h2 { margin-top: 0; }. Nothing\'s fixed. The browser just starts you somewhere sensible.',
          replies: ['Anything weird I should know?'],
        },
        {
          tey: 'One thing. When two boxes stack, one above the other, their margins don\'t add up. A 24px bottom margin above a 16px top margin gives a 24px gap: the bigger one wins. Side by side, margins do add. It surprises everyone once.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Remove the mystery gap',
      caption: 'The header\'s background stops short of the edges. That\'s the body\'s default margin.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  header { background-color: #FF9600; color: #14213D; padding: 16px; }\n</style>\n<header><h1>Mensah Beats</h1></header>\n<p>Beats from Accra.</p>\n',
      challenge: 'Add margin: 0; to the body rule. Now the header reaches the edges. (The p loses no space: it has its own margins.)',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Browsers add default margins. body { margin: 0; } removes the gap around the page. Stacked margins: the bigger one wins.',
    },
  ],
  apply: {
    scenario: 'The mystery gap.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where does the thin gap around Kofi\'s page come from?',
        options: [
          { text: 'The body\'s default margin, usually 8px' },
          { text: 'A bug in his CSS', why: 'The browser adds it before any CSS.' },
          { text: 'The phone screen', why: 'It\'s the body\'s margin.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Remove the body\'s default margin',
        starter: '<style>\n  body { background-color: #14213D; }\n</style>\n<header><h1>Mensah Beats</h1></header>\n',
        solution: '<style>\n  body { background-color: #14213D; margin: 0; }\n</style>\n<header><h1>Mensah Beats</h1></header>\n',
        hint: 'Add margin: 0; to the body rule.',
        checks: [
          { message: 'No gap at the top', dom: { selector: 'body', style: 'margin-top', styleValue: '0px' } },
          { message: 'No gap on the left', dom: { selector: 'body', style: 'margin-left', styleValue: '0px' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How big is the gap between the two cards?',
        code: 'article { margin-top: 16px; margin-bottom: 24px; }\n\n<article>One</article>\n<article>Two</article>',
        language: 'html',
        options: [
          { text: '24px: the bigger margin wins' },
          { text: '40px', why: 'Stacked margins don\'t add up.' },
          { text: '16px', why: 'The bigger one wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the browser give it margin by default?',
        groups: ['Default margin', 'No default margin'],
        items: [
          { text: 'body', group: 0 },
          { text: 'An h1', group: 0 },
          { text: 'An article', group: 1 },
          { text: 'A paragraph', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My h2 inside the card has a big gap above it, even with padding 16px.',
        options: [
          { text: 'That\'s the h2\'s own default margin on top of the padding. Set h2 { margin-top: 0; }.' },
          { text: 'Add more padding.', why: 'That makes the gap even bigger.' },
          { text: 'You can\'t change default margins.', why: 'You can change any margin.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t remove the gap around the page.',
        language: 'css',
        lines: ['body { margin: 0; }', 'body { padding: 0; }', 'body { margin: 0 0 0 0; }'],
        bug: 1,
        explanation: 'The gap is the body\'s margin, not its padding.',
        fix: 'body { margin: 0; }',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the fix.',
        pairs: [
          ['Gap around the whole page', 'body { margin: 0; }'],
          ['Gap above the card\'s heading', 'h2 { margin-top: 0; }'],
          ['Cards touching', 'article { margin-bottom: 16px; }'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the header reach the edges.',
        language: 'css',
        template: 'body { [[1]]: [[2]]; }',
        blanks: [['margin'], ['0']],
        distractors: ['padding', 'auto', '8px'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many pixels of margin does the body usually get by default? (a number)',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Two boxes sit one above the other. One has a 30px bottom margin, the next a 10px top margin. The gap?',
        options: [
          { text: '30px' },
          { text: '40px', why: 'Stacked margins don\'t add.' },
          { text: '10px', why: 'The bigger one wins.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever had space on a page you couldn\'t explain? What do you think caused it now?',
    starters: ['I had a gap...', 'It was probably...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your page\'s header a background colour, then remove the body\'s margin and see it reach the edges.',
  },
  notes: 'Default body margin 8px is in the HTML spec\'s suggested rendering and all major browsers. Vertical margin collapsing between adjacent block siblings: the larger margin wins (CSS 2.1 §8.3.1); horizontal margins don\'t collapse. header element used for the banner only; semantic elements are taught in Course 3.',
};

export default lesson;
