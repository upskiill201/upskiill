import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 20 — Chapter Challenge: Mensah Beats v1.3, a professional header and self-arranging cards. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v1.3',
  summary: 'A radio presenter in Accra mentions Mensah Beats on air and reads out the web address. Hundreds of people open it in the next hour, on every kind of screen. Build v1.3 from memory, the version they see.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a header with Flexbox that works on any screen', 'Lay out cards that arrange themselves', 'Push one item away and centre others'],
  learn: [
    {
      kind: 'story',
      title: 'On the radio',
      beats: [
        { speaker: 'narrator', text: 'Saturday morning. Five weeks to uni. A presenter on an Accra station: "Check out a young producer called Mensah Beats," and reads out the address.' },
        { speaker: 'kofi', text: 'Hundreds of visitors. Phones, laptops, a tablet in Kumasi.' },
        { speaker: 'efua', text: 'And the header looks professional on every one of them.' },
        { speaker: 'ama', text: 'And I can find Book me.' },
        { speaker: 'tey', text: 'Let\'s build v1.3 one more time, from memory. Next chapter: a gallery that lines up in rows and columns at once.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'v1.1', body: 'Beat cards with room to breathe, a centred column.' },
        { title: 'v1.2', body: 'Classes: one .card base, extras, tags, restyled in one line.', code: '.card { border-color: #FFC83D; }', language: 'css' },
        { title: 'v1.3 (tonight)', body: 'Flexbox: a header bar that wraps, a links row, Book me pushed right, cards that pick their own row.', code: '.beat-list .card { flex: 1 1 220px; }', language: 'css' },
        { title: 'Next chapter', body: 'CSS Grid: a gallery of covers and a gig calendar in neat rows and columns.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v1.3.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the header. .site-header gets display flex, flex-wrap wrap, justify-content space-between, align-items center',
        starter: '<style>\n\n</style>\n<header class="site-header"><a class="logo" href="#top">Mensah Beats</a><nav><a href="#gigs">Gigs</a></nav></header>\n',
        solution: '<style>\n  .site-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; }\n</style>\n<header class="site-header"><a class="logo" href="#top">Mensah Beats</a><nav><a href="#gigs">Gigs</a></nav></header>\n',
        hint: 'Four properties on .site-header.',
        checks: [
          { message: 'A flex bar', dom: { selector: '.site-header', style: 'display', styleValue: 'flex' } },
          { message: 'That wraps', dom: { selector: '.site-header', style: 'flex-wrap', styleValue: 'wrap' } },
          { message: 'Opposite ends', dom: { selector: '.site-header', style: 'justify-content', styleValue: 'space-between' } },
          { message: 'Middles lined up', dom: { selector: '.site-header', style: 'align-items', styleValue: 'center' } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: the links. .nav-links becomes a wrapping flex row with an 8px gap, no bullets and no padding',
        starter: '<style>\n\n</style>\n<ul class="nav-links"><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li></ul>\n',
        solution: '<style>\n  .nav-links { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; }\n</style>\n<ul class="nav-links"><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li></ul>\n',
        hint: 'display, flex-wrap, gap, list-style, padding.',
        checks: [
          { message: 'A row', dom: { selector: '.nav-links', style: 'display', styleValue: 'flex' } },
          { message: 'That wraps', dom: { selector: '.nav-links', style: 'flex-wrap', styleValue: 'wrap' } },
          { message: 'With gaps', dom: { selector: '.nav-links', style: 'gap', styleValue: '8px' } },
          { message: 'No bullets', dom: { selector: '.nav-links', style: 'list-style', styleValue: 'none' } },
          { message: 'No left padding', dom: { selector: '.nav-links', style: 'padding-left', styleValue: '0px' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Container property or item property?',
        groups: ['Container', 'Item'],
        items: [
          { text: 'justify-content', group: 0 },
          { text: 'flex-grow', group: 1 },
          { text: 'flex-wrap', group: 0 },
          { text: 'align-self', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: Book me alone on the right. .book gets margin-left auto',
        starter: '<style>\n  .nav-links { display: flex; gap: 8px; }\n\n</style>\n<ul class="nav-links"><li><a href="#beats">Beats</a></li><li class="book"><a href="#book">Book me</a></li></ul>\n',
        solution: '<style>\n  .nav-links { display: flex; gap: 8px; }\n  .book { margin-left: auto; }\n</style>\n<ul class="nav-links"><li><a href="#beats">Beats</a></li><li class="book"><a href="#book">Book me</a></li></ul>\n',
        hint: '.book { margin-left: auto; }',
        checks: [
          { message: 'Pushed right', dom: { selector: '.book', style: 'margin-left', styleValue: 'auto' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On a 1000px laptop, how many cards fit per row (gap 16px)?',
        code: '.beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n.beat-list .card { flex: 1 1 220px; }',
        language: 'css',
        options: [
          { text: 'Five', why: 'Five need 1164px.' },
          { text: 'Four, each grown a little past 220px' },
          { text: 'One', why: 'That\'s a phone.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will hide Book me on a small phone.',
        language: 'css',
        lines: ['.site-header { display: flex; flex-wrap: wrap; }', '.nav-links { display: flex; gap: 8px; flex-wrap: nowrap; }', '.nav-links a { padding: 12px; }'],
        bug: 1,
        explanation: 'nowrap forces every link onto one line, so the last ones run off the edge. Use wrap.',
        fix: '.nav-links { display: flex; gap: 8px; flex-wrap: wrap; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should the radio listeners on phones get fewer links?',
        options: [
          { text: 'Yes, hide most of them.', why: 'Phone visitors need the same links.' },
          { text: 'Make them tiny.', why: 'Then nobody can tap them.' },
          { text: 'No: same links, they just wrap onto two lines. Phone visitors want to book me too.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem from this chapter to its fix.',
        pairs: [
          ['Name and links stacked', 'display: flex'],
          ['Links off the edge', 'flex-wrap: wrap'],
          ['Uneven boxes', 'flex-grow: 1'],
          ['Words not in the middle', 'justify-content + align-items: center'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Final step: the cards. .beat-list .card gets flex-grow 1 and flex-basis 220px',
        starter: '<style>\n  .beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n\n</style>\n<section class="beat-list"><article class="card">Sunrise in Osu</article><article class="card">Jollof Bounce</article></section>\n',
        solution: '<style>\n  .beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n  .beat-list .card { flex-grow: 1; flex-basis: 220px; }\n</style>\n<section class="beat-list"><article class="card">Sunrise in Osu</article><article class="card">Jollof Bounce</article></section>\n',
        hint: '.beat-list .card { flex: 1 1 220px; } works too.',
        checks: [
          { message: 'Cards grow', dom: { selector: '.card', style: 'flex-grow', styleValue: '1' } },
          { message: 'Start at 220px', dom: { selector: '.card', style: 'flex-basis', styleValue: '220px' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Centre the "New beat Friday" banner both ways.',
        language: 'css',
        template: '.banner { display: flex; justify-content: [[1]]; align-items: [[2]]; height: 200px; }',
        blanks: [['center'], ['center']],
        distractors: ['middle', 'space-between', 'flex-end'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats was live when it was on the radio? (e.g. v1.2)',
        answers: ['v1.3', '1.3'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'If a radio station read out your web address tomorrow, would your page be ready?',
    starters: ['It would...', 'I\'d still fix...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Give your own site a Flexbox header and card row, test it on a phone and a laptop, and upload the new version.',
  },
  notes: 'Chapter 3 finale of Course 2. 1000px: four cards need 4×220 + 3×16 = 928px; five need 1164px. Next chapter: CSS Grid ("The beat grid", 4 weeks).',
};

export default lesson;
