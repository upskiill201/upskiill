import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 2 — a stacked list of links vs a flex row with gap. Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'A list that lies down',
  summary: 'Kofi\'s links are a proper list: ul and li, the right HTML for a set of links. But a list stacks, with bullets. Same HTML, two lines of CSS, and it becomes a row.',
  minutes: 11,
  outcomes: ['Turn a list of links into a row with display: flex', 'Space items with gap', 'Remove a list\'s bullets and default padding'],
  learn: [
    {
      kind: 'compare',
      title: 'Stacked list vs a row',
      before: { label: 'A stack with bullets', text: '<ul>\n  <li><a href="#beats">Beats</a></li>\n  <li><a href="#gigs">Gigs</a></li>\n  <li><a href="#book">Book me</a></li>\n</ul>\n\nThree bullets, three lines, and some empty space on the left from the list\'s default padding.' },
      after: { label: 'A row', text: 'ul {\n  display: flex;\n  gap: 16px;\n  list-style: none;\n  padding: 0;\n}\n\nSame HTML. The items line up, gap puts 16px between each, the bullets go, and the left padding is gone.' },
      notes: [
        'Keep the ul: a list of links is still a list, and screen readers say how many there are.',
        'gap sets space between flex items, never on the outside edges.',
        'list-style: none removes the bullets.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Lie the list down',
      caption: 'The ul is the container, so its li children line up.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  ul { display: flex; gap: 16px; list-style: none; padding: 0; }\n  a { color: #FF9600; }\n</style>\n<nav>\n  <ul>\n    <li><a href="#beats">Beats</a></li>\n    <li><a href="#gigs">Gigs</a></li>\n    <li><a href="#book">Book me</a></li>\n  </ul>\n</nav>\n',
      challenge: 'Change gap to 32px. Then delete list-style: none and see the bullets come back.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Links in a nav: keep them in a ul, then ul { display: flex; gap: 16px; list-style: none; padding: 0; }.',
    },
  ],
  apply: {
    scenario: 'The list that lies down.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which element gets display: flex to put the links in a row?',
        options: [
          { text: 'Each li', why: 'The container is the parent, the ul.' },
          { text: 'The ul: its li children become the items' },
          { text: 'Each a', why: 'The links are inside the items.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Lie the list down: display flex and a 16px gap on the ul',
        starter: '<style>\n\n</style>\n<ul>\n  <li><a href="#beats">Beats</a></li>\n  <li><a href="#gigs">Gigs</a></li>\n</ul>\n',
        solution: '<style>\n  ul { display: flex; gap: 16px; }\n</style>\n<ul>\n  <li><a href="#beats">Beats</a></li>\n  <li><a href="#gigs">Gigs</a></li>\n</ul>\n',
        hint: 'ul { display: flex; gap: 16px; }',
        checks: [
          { message: 'A row', dom: { selector: 'ul', style: 'display', styleValue: 'flex' } },
          { message: '16px between items', dom: { selector: 'ul', style: 'gap', styleValue: '16px' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['display: flex', 'Puts the items in a row'],
          ['gap: 16px', 'Space between items'],
          ['list-style: none', 'Removes the bullets'],
          ['padding: 0', 'Removes the space on the left'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it put space between flex items?',
        groups: ['Space between items', 'Something else'],
        items: [
          { text: 'gap: 16px on the container', group: 0 },
          { text: 'padding: 0 on the ul', group: 1 },
          { text: 'gap: 8px', group: 0 },
          { text: 'list-style: none', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Why keep a list at all? Just put three links in a row.',
        options: [
          { text: 'Flexbox only works on lists.', why: 'It works on any parent. The list is for meaning.' },
          { text: 'No reason.', why: 'The list gives the links structure.' },
          { text: 'A list tells screen readers "list, 3 items", so people know how many links there are. CSS handles the row.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t remove the bullets.',
        language: 'css',
        lines: ['ul { list-style: none; }', 'ul { bullets: none; }', 'ul { list-style: none; padding: 0; }'],
        bug: 1,
        explanation: 'There\'s no bullets property. It\'s list-style.',
        fix: 'ul { list-style: none; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Is there a 16px gap before the first link?',
        code: 'ul { display: flex; gap: 16px; padding: 0; }',
        language: 'css',
        options: [
          { text: 'Yes, on every side', why: 'gap is only between items.' },
          { text: 'No: gap only goes between items' },
          { text: 'Only on the left', why: 'gap never touches the outside edges.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the nav list.',
        language: 'css',
        template: 'ul { display: flex; [[1]]: 16px; list-style: [[2]]; padding: 0; }',
        blanks: [['gap'], ['none']],
        distractors: ['margin', 'hidden', 'space'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property puts space between flex items? (one word)',
        answers: ['gap'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Remove the bullets and the left padding from the ul',
        starter: '<style>\n  ul { display: flex; gap: 16px; }\n</style>\n<ul>\n  <li><a href="#beats">Beats</a></li>\n  <li><a href="#gigs">Gigs</a></li>\n</ul>\n',
        solution: '<style>\n  ul { display: flex; gap: 16px; list-style: none; padding: 0; }\n</style>\n<ul>\n  <li><a href="#beats">Beats</a></li>\n  <li><a href="#gigs">Gigs</a></li>\n</ul>\n',
        hint: 'list-style: none; padding: 0;',
        checks: [
          { message: 'No bullets', dom: { selector: 'ul', style: 'list-style', styleValue: 'none' } },
          { message: 'No left padding', dom: { selector: 'ul', style: 'padding-left', styleValue: '0px' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What list on your page would look better as a row?',
    starters: ['My list of...', 'As a row it would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Turn the links at the top of your page into a ul inside a nav, and lay it down with display: flex and gap.',
  },
  notes: 'gap applies to flex containers (supported in all major browsers since around 2021). Screen readers announce list item counts; Safari with VoiceOver can drop list semantics when list-style is none (role="list" restores it); not taught here.',
};

export default lesson;
