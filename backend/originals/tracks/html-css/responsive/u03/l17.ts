import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 17 — the header on a small phone: wrap the nav instead of hiding or shrinking. Story choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'The header that ran off the screen',
  summary: 'Kofi adds two more links: Videos and Merch. On his laptop, fine. On Ama\'s small phone, the last two links have slid off the right edge, and she can\'t find Book me at all. Choose the fix.',
  minutes: 11,
  outcomes: ['Spot a flex row that\'s too wide for a phone', 'Let a header and its links wrap', 'Choose fixes that keep every link reachable'],
  learn: [
    {
      kind: 'story',
      title: 'Where\'s Book me?',
      beats: [
        { speaker: 'narrator', text: 'Five links and a name in one row. On Ama\'s phone, Merch and Book me are off the edge. The page scrolls sideways again.' },
        { speaker: 'ama', text: 'Where do I book you? Mum wants you for my birthday.' },
        { speaker: 'kofi', text: 'It\'s right there... on my laptop.' },
        { speaker: 'tey', text: 'A flex row stays on one line unless you let it wrap.' },
      ],
      choice: {
        prompt: 'How should Kofi fix the header on small phones?',
        options: [
          {
            text: 'Let the header and the links wrap, so on a narrow screen the links drop to a second line.',
            outcome: 'On Ama\'s phone, the name sits on top and the links wrap neatly below. Every link, including Book me, is on screen.',
            best: true,
          },
          {
            text: 'Make the links tiny so they all fit.',
            outcome: 'They fit, but they\'re too small to read and too small to tap. Ama hits Merch instead of Book me.',
          },
          {
            text: 'Delete Book me and Merch on phones.',
            outcome: 'The header fits, but most of his visitors are on phones, and now none of them can book him.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'A header that wraps',
      caption: 'Switch to phone size. Both the header and the links can wrap, so nothing runs off the edge.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0; }\n  .site-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px; padding: 8px 16px; background-color: #1F2E52; }\n  .logo { color: #FFF6E5; font-weight: bold; }\n  .nav-links { display: flex; flex-wrap: wrap; gap: 4px; list-style: none; margin: 0; padding: 0; }\n  .nav-links a { display: inline-block; padding: 12px; color: #FF9600; }\n</style>\n<header class="site-header">\n  <a class="logo" href="#top">Mensah Beats</a>\n  <nav>\n    <ul class="nav-links">\n      <li><a href="#beats">Beats</a></li>\n      <li><a href="#gigs">Gigs</a></li>\n      <li><a href="#videos">Videos</a></li>\n      <li><a href="#merch">Merch</a></li>\n      <li><a href="#book">Book me</a></li>\n    </ul>\n  </nav>\n</header>\n',
      challenge: 'Delete both flex-wrap lines and look at phone size again.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A row that might not fit a phone needs flex-wrap: wrap. Never hide the important links or make them tiny.',
    },
  ],
  apply: {
    scenario: 'The header that ran off the screen.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Merch and Book me disappear off the edge?',
        options: [
          { text: 'A flex row stays on one line by default, and the links couldn\'t shrink any smaller' },
          { text: 'Phones only show four links', why: 'There\'s no limit. The row didn\'t wrap.' },
          { text: 'The links were deleted', why: 'They\'re there, off the edge.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Let the links wrap on small screens: flex-wrap wrap on .nav-links',
        starter: '<style>\n  .nav-links { display: flex; gap: 4px; list-style: none; padding: 0; }\n</style>\n<ul class="nav-links"><li><a href="#beats">Beats</a></li><li><a href="#merch">Merch</a></li><li><a href="#book">Book me</a></li></ul>\n',
        solution: '<style>\n  .nav-links { display: flex; gap: 4px; list-style: none; padding: 0; flex-wrap: wrap; }\n</style>\n<ul class="nav-links"><li><a href="#beats">Beats</a></li><li><a href="#merch">Merch</a></li><li><a href="#book">Book me</a></li></ul>\n',
        hint: 'flex-wrap: wrap;',
        checks: [
          { message: 'The links can wrap', dom: { selector: '.nav-links', style: 'flex-wrap', styleValue: 'wrap' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Let it wrap', 'Every link on screen'],
          ['Tiny links', 'Too small to read or tap'],
          ['Hide links on phones', 'Phone visitors can\'t book'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good fix for a crowded header, or a bad one?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'flex-wrap: wrap on the header and links', group: 0 },
          { text: 'font-size: 0.6rem on the links', group: 1 },
          { text: 'A slightly smaller gap', group: 0 },
          { text: 'Removing the Book me link', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I hide the less important links on phones?',
        options: [
          { text: 'Most visitors are on phones, so they need the same links. Wrapping keeps them all reachable.' },
          { text: 'Yes, phones don\'t need everything.', why: 'Phone users want the same things.' },
          { text: 'Hide all of them.', why: 'Then nobody can get around the site.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes the links impossible to tap on a phone.',
        language: 'css',
        lines: ['.nav-links { display: flex; flex-wrap: wrap; }', '.nav-links a { font-size: 0.5rem; padding: 0; }', '.site-header { flex-wrap: wrap; }'],
        bug: 1,
        explanation: 'Tiny text with no padding: unreadable, and far too small for a thumb.',
        fix: '.nav-links a { padding: 12px; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On a narrow phone, where does the nav go?',
        code: '.site-header { display: flex; flex-wrap: wrap; justify-content: space-between; }\n\n<header class="site-header"><a class="logo">Mensah Beats</a><nav>...</nav></header>',
        language: 'html',
        options: [
          { text: 'Onto a second line under the name' },
          { text: 'Off the right edge', why: 'flex-wrap lets it drop to a new line.' },
          { text: 'On top of the name', why: 'It moves to its own line.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Let both rows wrap.',
        language: 'css',
        template: '.site-header { display: flex; [[1]]: wrap; }\n.nav-links { display: flex; flex-wrap: [[2]]; }',
        blanks: [['flex-wrap'], ['wrap']],
        distractors: ['nowrap', 'overflow', 'hidden'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which link did Ama need most? (two words)',
        answers: ['book me', 'bookme'],
        placeholder: 'The link text',
      },
      {
        kind: 'writeCode',
        prompt: 'Let the whole header wrap too: flex-wrap wrap on .site-header',
        starter: '<style>\n  .site-header { display: flex; justify-content: space-between; }\n</style>\n<header class="site-header"><a class="logo" href="#top">Mensah Beats</a><nav><a href="#book">Book me</a></nav></header>\n',
        solution: '<style>\n  .site-header { display: flex; justify-content: space-between; flex-wrap: wrap; }\n</style>\n<header class="site-header"><a class="logo" href="#top">Mensah Beats</a><nav><a href="#book">Book me</a></nav></header>\n',
        hint: 'flex-wrap: wrap;',
        checks: [
          { message: 'The header can wrap', dom: { selector: '.site-header', style: 'flex-wrap', styleValue: 'wrap' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Open your own header on the smallest phone you can find. Is every link on screen?',
    starters: ['On a small phone...', 'I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add flex-wrap: wrap to your header and its links, and check it on a small phone.',
  },
  notes: 'Collapsible "hamburger" menus need JavaScript or extra patterns and are out of scope; wrapping keeps all links visible with CSS alone. Chapter 5 adds media queries for bigger phone layouts.',
};

export default lesson;
