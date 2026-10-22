import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 1 — opens the chapter: most visitors are on phones; one column first, a media query adds columns. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Most of them are on phones',
  summary: 'The record shop asks how many people visit Mensah Beats. Kofi checks his host\'s stats: most visits come from phones. On a phone, the v1.4 page is two squeezed columns. Time to design for phones first.',
  minutes: 11,
  outcomes: ['Explain why sites are designed for phones first', 'Write a first media query with min-width', 'Stack a layout on phones and add columns on wider screens'],
  learn: [
    {
      kind: 'story',
      title: 'Three weeks to uni',
      beats: [
        { speaker: 'narrator', text: 'Three weeks to uni. Kofi opens his host\'s visitor stats. Phones, phones, phones, the odd laptop.' },
        { speaker: 'kofi', text: 'I\'ve been building it on my laptop the whole time. Most people never see that version.' },
        { speaker: 'ama', text: 'The gigs are a skinny strip next to the covers on my phone.' },
        { speaker: 'miracle', text: 'Then flip it round. Design for the phone first, and add the extra columns only when there\'s room.' },
      ],
      choice: {
        prompt: 'How should Kofi fix the layout for phones?',
        options: [
          {
            text: 'One column by default, then a media query that adds the second column only on wider screens.',
            outcome: 'On phones everything stacks neatly: header, beats, gigs. On laptops the two columns appear. One page, every screen.',
            best: true,
          },
          {
            text: 'Build a second, separate site just for phones.',
            outcome: 'Now every new beat has to be added in two places. Within a week the two sites don\'t match.',
          },
          {
            text: 'Leave it, people can pinch to zoom.',
            outcome: 'Visitors zoom in and out and scroll sideways. Most give up before they press play.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>A media query</strong> wraps CSS that only applies when a condition is true. <strong>@media (min-width: 700px) { ... }</strong> means "only when the screen is at least 700px wide". Phones-first: write the simple one-column layout as normal CSS, then add the wider layout inside a min-width media query.</p>',
    },
    {
      kind: 'tryIt',
      title: 'One column, then two',
      caption: 'Switch the preview between phone and laptop. Below 700px everything stacks; from 700px the media query adds two columns.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .page { display: grid; gap: 16px; padding: 16px; }\n  .page section { background-color: #1F2E52; border-radius: 12px; padding: 16px; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; }\n  }\n</style>\n<main class="page">\n  <section><h2>Beats</h2><p>Twelve beats, newest first.</p></section>\n  <section><h2>Gigs</h2><p>Sound Up Saturdays, 25 Oct.</p></section>\n</main>\n',
      challenge: 'Change 700px to 1000px. Now you need a wider screen before the columns appear.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Phones first: the one-column layout is the normal CSS. @media (min-width: ...) adds the wider layout.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> media queries, the viewport tag every phone needs, choosing breakpoints, images and headings that fit, tables that don\'t break, and testing on real screens. The climax: Mensah Beats v1.5, at home on every screen in the house, and Course 2 complete.</p>',
    },
  ],
  apply: {
    scenario: 'Most of them are on phones.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does @media (min-width: 700px) mean?',
        options: [
          { text: 'Make the screen 700px wide', why: 'It checks the width; it doesn\'t set it.' },
          { text: 'Only on phones', why: 'min-width 700px means wider screens.' },
          { text: 'Use these rules only when the screen is at least 700px wide' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a media query: from 700px wide, .page gets grid-template-columns 2fr 1fr',
        starter: '<style>\n  .page { display: grid; gap: 16px; }\n\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        solution: '<style>\n  .page { display: grid; gap: 16px; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; }\n  }\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        hint: '@media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }',
        checks: [
          { message: 'A media query', codeIncludes: '@media' },
          { message: 'For wider screens', codeIncludes: 'min-width' },
          { message: 'From 700px', codeIncludes: '700px' },
          { message: 'Adding the two columns', codeIncludes: '2fr 1fr' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['One column, then a media query', 'Every screen, one page'],
          ['A separate phone site', 'Two sites that don\'t match'],
          ['Pinch to zoom', 'Visitors give up'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Phones-first: normal CSS, or inside @media (min-width: 700px)?',
        groups: ['Normal CSS', 'Inside the media query'],
        items: [
          { text: 'Everything stacked in one column', group: 0 },
          { text: 'Beats and gigs side by side', group: 1 },
          { text: 'Colours and fonts', group: 0 },
          { text: 'A wider two-column page', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why start with the phone? I build on my laptop.',
        options: [
          { text: 'Laptops are going away.', why: 'They\'re not. Phones are just where most visitors are.' },
          { text: 'Most visitors are on phones, and a single column is simpler. It\'s easier to add columns than to take them away.' },
          { text: 'Phones can\'t show columns.', why: 'They can, but one column suits a narrow screen.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken media query.',
        language: 'css',
        lines: ['@media (min-width: 700px) {', '@media min-width: 700px {', '@media (min-width: 1000px) {'],
        bug: 1,
        explanation: 'The condition needs brackets: @media (min-width: 700px).',
        fix: '@media (min-width: 700px) {',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On a 360px phone, how many columns does the page have?',
        code: '.page { display: grid; }\n@media (min-width: 700px) {\n  .page { grid-template-columns: 2fr 1fr; }\n}',
        language: 'css',
        options: [
          { text: 'One: the media query doesn\'t apply below 700px' },
          { text: 'Two', why: '360px is less than 700px.' },
          { text: 'None', why: 'A grid with no columns set has one column.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the media query.',
        language: 'css',
        template: '[[1]] ([[2]]: 700px) {\n  .page { grid-template-columns: 2fr 1fr; }\n}',
        blanks: [['@media'], ['min-width']],
        distractors: ['@screen', 'width', 'max-height'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word starts a media query? (with its symbol)',
        answers: ['@media', 'media'],
        placeholder: 'A word',
      },
      {
        kind: 'mcq',
        prompt: 'Where do most visitors to a site like Mensah Beats usually come from?',
        options: [
          { text: 'Laptops', why: 'Kofi\'s stats say phones.' },
          { text: 'Phones' },
          { text: 'Smart TVs', why: 'Phones, by far.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What does your own page look like on a phone right now? What should stack?',
    starters: ['On my phone...', 'I\'d stack...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'If your host shows visitor stats, check how many come from phones (check locally on your host\'s dashboard). Then make your page one column, with a min-width media query for wider screens.',
  },
  notes: 'Opens Course 2, Chapter 5 (Phones first). Media queries per MDN. Page checks for media-query exercises use codeIncludes, because the loader (jsdom) ignores @media rules; page checks only test properties no media query in the exercise changes.',
};

export default lesson;
