import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 3 — container and items: only direct children are items; nesting flex containers. Steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Parents and children',
  summary: 'Kofi puts display: flex on the header and expects the links to spread out. Instead the whole nav moves as one block. Miracle draws a family tree: "Flex only talks to its children. Not its grandchildren."',
  minutes: 12,
  outcomes: ['Find the direct children of a flex container', 'Explain why grandchildren aren\'t flex items', 'Nest one flex container inside another'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to read a flex layout',
      steps: [
        { title: '1. Find the container', body: 'The element with display: flex. Here, the header.', code: 'header { display: flex; }', language: 'css' },
        { title: '2. Find its direct children', body: 'Only the elements directly inside it become flex items: the p with the name, and the nav. Not the ul or the links deeper down.', code: '<header>\n  <p>Mensah Beats</p>\n  <nav>...</nav>\n</header>', language: 'html' },
        { title: '3. Grandchildren behave normally', body: 'The ul inside the nav is still an ordinary block. Its links stack like before, unless...', code: '<nav>\n  <ul>\n    <li>...</li>\n  </ul>\n</nav>', language: 'html' },
        { title: '4. Make another container', body: 'Give the ul its own display: flex. Now the li elements are its items. A flex item can be a flex container too.', code: 'header { display: flex; }\nnav ul { display: flex; gap: 16px; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two containers, one inside the other',
      caption: 'The header lines up the name and the nav. The ul lines up the links.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0; }\n  header { display: flex; gap: 32px; background-color: #1F2E52; padding: 0 16px; }\n  nav ul { display: flex; gap: 16px; list-style: none; padding: 0; }\n  a { color: #FF9600; }\n</style>\n<header>\n  <p><strong>Mensah Beats</strong></p>\n  <nav>\n    <ul>\n      <li><a href="#beats">Beats</a></li>\n      <li><a href="#gigs">Gigs</a></li>\n      <li><a href="#book">Book me</a></li>\n    </ul>\n  </nav>\n</header>\n',
      challenge: 'Delete the nav ul rule. The links stack again inside the nav, even though the header is still flex.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Flex lines up direct children only. To line up grandchildren, make their parent a flex container too.',
    },
  ],
  apply: {
    scenario: 'The family tree.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Find the container', 'Find its direct children', 'Check the grandchildren behave normally', 'Make another container if needed'],
      },
      {
        kind: 'writeCode',
        prompt: 'Line up the links too: give nav ul display flex and gap 16px',
        starter: '<style>\n  header { display: flex; }\n\n</style>\n<header>\n  <p>Mensah Beats</p>\n  <nav><ul><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li></ul></nav>\n</header>\n',
        solution: '<style>\n  header { display: flex; }\n  nav ul { display: flex; gap: 16px; }\n</style>\n<header>\n  <p>Mensah Beats</p>\n  <nav><ul><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li></ul></nav>\n</header>\n',
        hint: 'nav ul { display: flex; gap: 16px; }',
        checks: [
          { message: 'The list is a container', dom: { selector: 'nav ul', style: 'display', styleValue: 'flex' } },
          { message: 'With gaps', dom: { selector: 'nav ul', style: 'gap', styleValue: '16px' } },
          { message: 'The header still is too', dom: { selector: 'header', style: 'display', styleValue: 'flex' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'header { display: flex; }: is it a flex item?',
        groups: ['Flex item', 'Not a flex item'],
        items: [
          { text: 'The p directly in the header', group: 0 },
          { text: 'The nav directly in the header', group: 0 },
          { text: 'The ul inside the nav', group: 1 },
          { text: 'A link inside an li', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why didn\'t display: flex on the header spread out the links?',
        options: [
          { text: 'Links can\'t be flex items', why: 'They can, inside a flex parent.' },
          { text: 'The header is too small', why: 'It\'s about which elements are direct children.' },
          { text: 'The links are grandchildren. Only the header\'s direct children are items' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each element to its role.',
        pairs: [
          ['header (display: flex)', 'Container for the name and nav'],
          ['nav', 'An item of the header'],
          ['nav ul (display: flex)', 'Container for the links'],
          ['li', 'An item of the ul'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can something be a flex item and a flex container at the same time?',
        options: [
          { text: 'Yes: the nav\'s ul is inside the header\'s row and also lines up its own links.' },
          { text: 'No, it\'s one or the other.', why: 'Nesting containers is normal.' },
          { text: 'Only the body can.', why: 'Any element can be both.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'The links should sit in a row. Tap the selector that targets the wrong element.',
        language: 'css',
        lines: ['header { display: flex; }', 'nav li a { display: flex; }', 'nav ul { list-style: none; }'],
        bug: 1,
        explanation: 'Flex on each link lines up what\'s inside the link. The container should be the ul, the parent of the li elements.',
        fix: 'nav ul { display: flex; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many flex items does the section have?',
        code: 'section { display: flex; }\n\n<section>\n  <article><h2>A</h2><p>a</p></article>\n  <article><h2>B</h2><p>b</p></article>\n</section>',
        language: 'html',
        options: [
          { text: 'Four: every h2 and p', why: 'Those are grandchildren.' },
          { text: 'Six', why: 'Only direct children count.' },
          { text: 'Two: the articles' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the list its own container.',
        language: 'css',
        template: '[[1]] ul { display: [[2]]; }',
        blanks: [['nav'], ['flex']],
        distractors: ['header li', 'block', 'row'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Flex lines up a container\'s direct ___. (one word)',
        answers: ['children', 'child'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Draw your page\'s header as a family tree. Which elements are children, which grandchildren?',
    starters: ['The children are...', 'The grandchildren are...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make your page\'s header a flex container, and the list of links inside it a second flex container.',
  },
  notes: 'Only in-flow direct children of a flex container are flex items (CSS Flexbox §4). Nested flex containers are standard practice.',
};

export default lesson;
