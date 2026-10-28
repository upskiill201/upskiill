import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 2 — desktop-first (max-width undoing) vs mobile-first (min-width adding). Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Undoing vs adding',
  summary: 'Clinton tried fixing the phone layout the other way round: laptop layout first, then a media query that undoes it all for phones. It works, but look at how much it has to undo. Here are both versions.',
  minutes: 11,
  outcomes: ['Tell desktop-first from mobile-first CSS', 'Explain why min-width queries are usually shorter', 'Rewrite a max-width query as mobile-first'],
  learn: [
    {
      kind: 'compare',
      title: 'Desktop-first vs mobile-first',
      before: { label: 'Desktop-first: undo it all', text: '.page {\n  grid-template-columns: 2fr 1fr;\n  grid-template-areas: "head head" "beats gigs";\n}\n@media (max-width: 699px) {\n  .page {\n    grid-template-columns: 1fr;\n    grid-template-areas: "head" "beats" "gigs";\n  }\n}\n\nThe laptop layout is the default, then everything is undone for phones. Every new laptop rule needs a matching "undo" for phones.' },
      after: { label: 'Mobile-first: add when there\'s room', text: '.page {\n  grid-template-areas: "head" "beats" "gigs";\n}\n@media (min-width: 700px) {\n  .page {\n    grid-template-columns: 2fr 1fr;\n    grid-template-areas: "head head" "beats gigs";\n  }\n}\n\nThe simple stack is the default. The media query only adds what wider screens need. Nothing is undone.' },
      notes: [
        'max-width queries usually undo the main layout for small screens.',
        'min-width queries add to a simple base.',
        'Phones, which get most visitors, get the simplest CSS.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mobile-first areas',
      caption: 'The base is three stacked areas. From 700px, the media query arranges them in two columns.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .page { display: grid; gap: 16px; padding: 16px; grid-template-areas: "head" "beats" "gigs"; }\n  header, section { background-color: #1F2E52; border-radius: 12px; padding: 16px; }\n  header { grid-area: head; } .beats { grid-area: beats; } .gigs { grid-area: gigs; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; }\n  }\n</style>\n<main class="page">\n  <header>Mensah Beats</header>\n  <section class="beats">Beats</section>\n  <section class="gigs">Gigs</section>\n</main>\n',
      challenge: 'At laptop size, change "beats gigs" to "gigs beats" inside the media query. The phone layout doesn\'t change.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Start simple for phones, then add with min-width. You\'ll write less CSS and undo nothing.',
    },
  ],
  apply: {
    scenario: 'Undoing vs adding.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is Clinton\'s desktop-first version longer?',
        options: [
          { text: 'max-width is a longer word', why: 'It\'s the undoing that adds up.' },
          { text: 'It isn\'t longer', why: 'Every laptop rule needs a phone undo.' },
          { text: 'It sets the laptop layout, then has to undo it for phones' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make it mobile-first: stack the areas by default ("head" "beats" "gigs") on .page, outside any media query',
        starter: '<style>\n  .page { display: grid; }\n  header { grid-area: head; } .beats { grid-area: beats; } .gigs { grid-area: gigs; }\n  @media (min-width: 700px) {\n    .page { grid-template-areas: "head head" "beats gigs"; }\n  }\n</style>\n<main class="page"><header>Mensah Beats</header><section class="beats">Beats</section><section class="gigs">Gigs</section></main>\n',
        solution: '<style>\n  .page { display: grid; grid-template-areas: "head" "beats" "gigs"; }\n  header { grid-area: head; } .beats { grid-area: beats; } .gigs { grid-area: gigs; }\n  @media (min-width: 700px) {\n    .page { grid-template-areas: "head head" "beats gigs"; }\n  }\n</style>\n<main class="page"><header>Mensah Beats</header><section class="beats">Beats</section><section class="gigs">Gigs</section></main>\n',
        hint: 'Add grid-template-areas: "head" "beats" "gigs"; to the first .page rule.',
        checks: [
          { message: 'Stacked areas for phones', codeIncludes: '"beats" "gigs"' },
          { message: 'Still a grid', dom: { selector: '.page', style: 'display', styleValue: 'grid' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Desktop-first or mobile-first?',
        groups: ['Desktop-first', 'Mobile-first'],
        items: [
          { text: '@media (max-width: 699px) undoing columns', group: 0 },
          { text: '@media (min-width: 700px) adding columns', group: 1 },
          { text: 'Laptop layout as the default', group: 0 },
          { text: 'One column as the default', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each query to what it usually does.',
        pairs: [
          ['min-width', 'Adds a layout when there\'s room'],
          ['max-width', 'Undoes a layout on small screens'],
          ['No media query', 'The base everyone gets'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Is max-width wrong, then?',
        options: [
          { text: 'Yes, never use it.', why: 'It has uses; mobile-first is just tidier.' },
          { text: 'Not wrong, just usually longer. Mobile-first with min-width means phones get the simplest CSS.' },
          { text: 'It only works on laptops.', why: 'It works anywhere.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'In a mobile-first stylesheet, tap the line in the wrong place.',
        language: 'css',
        lines: ['.page { grid-template-areas: "head" "beats" "gigs"; }', '.page { grid-template-columns: 2fr 1fr; }', '@media (min-width: 700px) { .page { grid-template-areas: "head head" "beats gigs"; } }'],
        bug: 1,
        explanation: 'Two columns are a wider-screen layout. In mobile-first CSS they belong inside the min-width query.',
        fix: '@media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A 1000px laptop. Which area map is used?',
        code: '.page { grid-template-areas: "head" "beats" "gigs"; }\n@media (min-width: 700px) {\n  .page { grid-template-areas: "head head" "beats gigs"; }\n}',
        language: 'css',
        options: [
          { text: 'The stacked one', why: 'At 1000px the min-width query applies and wins.' },
          { text: 'Neither', why: 'The media query\'s map applies.' },
          { text: 'The two-column one: the media query applies and comes later' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Write the mobile-first query.',
        language: 'css',
        template: '@media ([[1]]: 700px) {\n  .page { grid-template-columns: [[2]]; }\n}',
        blanks: [['min-width'], ['2fr 1fr']],
        distractors: ['max-width', '1fr', 'width'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which kind of query does mobile-first CSS mostly use? (hyphenated)',
        answers: ['min-width'],
        placeholder: 'A feature',
      },
      {
        kind: 'mcq',
        prompt: 'Why must the media query come after the base rule?',
        options: [
          { text: 'Both have the same specificity, so the later one wins when it applies' },
          { text: 'Media queries must always be last in a file', why: 'They can go anywhere; order matters for ties.' },
          { text: 'It doesn\'t matter', why: 'With equal specificity, order decides.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is your own stylesheet desktop-first or mobile-first right now?',
    starters: ['It\'s...', 'To switch, I\'d...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rewrite any max-width queries on your page as a simple base plus min-width queries.',
  },
  notes: 'Mobile-first vs desktop-first media query strategies (MDN "Responsive design"). Media queries add no specificity, so source order breaks ties.',
};

export default lesson;
