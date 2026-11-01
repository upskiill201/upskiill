import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 16 — plan your page: sketch first, then outline it in comments and headings. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Plan your page',
  summary: 'Kofi has been typing for an hour and his page has no shape. Miracle makes him close the code and grab a pen. Real developers plan a page before they build it.',
  minutes: 12,
  outcomes: ['Sketch a page before building it', 'Turn a sketch into an outline of headings', 'Plan sections with comments'],
  learn: [
    {
      kind: 'steps',
      title: 'From idea to outline, in four steps',
      steps: [
        { title: '1. Say what the page is for', body: 'One sentence. Kofi\'s: "So the organiser and my fans can hear my beats, see my next gig, and book me." Everything on the page should help with that.' },
        { title: '2. Sketch the boxes', body: 'On paper, draw a phone-shaped rectangle and stack boxes inside it: title at the top, then one box for each section. No details, just boxes with names. Kofi\'s boxes: Mensah Beats, About me, My beats, Gigs, Book me.' },
        { title: '3. Turn boxes into comments', body: 'Each box becomes a comment in the code. Now the page has a plan you can see, before any content is written.', code: '<!-- Title -->\n<!-- About me -->\n<!-- My beats -->\n<!-- Gigs -->\n<!-- Book me -->', language: 'html' },
        { title: '4. Add the headings', body: 'Under each comment, add its heading: one h1 for the title, an h2 for each section. The page now has its whole shape, and filling it in is the easy part.', code: '<!-- Title -->\n<h1>Mensah Beats</h1>\n<!-- About me -->\n<h2>About me</h2>\n<!-- Gigs -->\n<h2>Gigs</h2>', language: 'html' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Kofi\'s plan',
      caption: 'The comments are the plan; the headings are the shape. Look how clear the page already is, with almost no content.',
      code: '<!-- Title -->\n<h1>Mensah Beats</h1>\n<!-- About me -->\n<h2>About me</h2>\n<!-- My beats -->\n<h2>My beats</h2>\n<!-- Gigs -->\n<h2>Gigs</h2>\n<!-- Book me -->\n<h2>Book me</h2>\n',
      challenge: 'Add one paragraph under any section, and notice how easy it is to know where it goes.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ten minutes with a pen saves an hour of moving things around. Plan the boxes, then build them.',
    },
  ],
  apply: {
    scenario: 'Kofi plans before he builds.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the planning steps in order.',
        lines: ['Say what the page is for in one sentence', 'Sketch the boxes on paper', 'Turn each box into a comment', 'Add a heading under each comment'],
      },
      {
        kind: 'mcq',
        prompt: 'What should Kofi\'s one-sentence goal decide?',
        options: [
          { text: 'What colour the page will be', why: 'Colours come later, with CSS. The goal decides what goes ON the page.' },
          { text: 'Which sections the page needs' },
          { text: 'How many tags to use', why: 'Nobody counts tags. The goal decides the sections, and the tags follow.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Turn Kofi\'s sketch into a plan: a comment, then an h2, for About me and for Gigs',
        starter: '<!-- Title -->\n<h1>Mensah Beats</h1>\n',
        solution: '<!-- Title -->\n<h1>Mensah Beats</h1>\n<!-- About me -->\n<h2>About me</h2>\n<!-- Gigs -->\n<h2>Gigs</h2>\n',
        hint: 'For each section: <!-- name -->, then <h2>name</h2> under it.',
        checks: [
          { message: 'A section heading About me', dom: { selector: 'h2', text: 'About me' } },
          { message: 'A section heading Gigs', dom: { selector: 'h2', text: 'Gigs' } },
          { message: 'A comment for the Gigs section', codeIncludes: '<!-- Gigs' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it belong on Kofi\'s page, given his goal?',
        groups: ['Belongs', 'Doesn\'t'],
        items: [
          { text: 'His next gig', group: 0 },
          { text: 'His Chemistry exam results', group: 1 },
          { text: 'A way to book him', group: 0 },
          { text: 'His beats', group: 0 },
          { text: 'His football team\'s league table', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Close the code. Pen and paper. Draw me your page in boxes.',
        options: [
          { text: 'But I\'m so close!', why: 'An hour of typing with no shape isn\'t close. Five minutes of boxes will get him there faster.' },
          { text: 'Okay: title, About me, My beats, Gigs, Book me. Five boxes.' },
          { text: 'I\'ll just ask someone to design it.', why: 'Kofi knows exactly what his page needs. He just has to draw it.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the plan for a Book me section',
        language: 'html',
        tiles: ['<!-- Book me -->', '<h2>', 'Book me', '</h2>'],
        distractors: ['<h1>', '<-- Book me -->'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What shows on the page?',
        code: '<!-- Title -->\n<h1>Mensah Beats</h1>\n<!-- Gigs -->\n<h2>Gigs</h2>',
        language: 'html',
        options: [
          { text: 'Mensah Beats and Gigs, as headings' },
          { text: 'Title, Mensah Beats, Gigs, Gigs', why: 'The comments are the plan; they never show.' },
          { text: 'Nothing, it\'s only a plan', why: 'The headings are real HTML, so they show.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each box in Kofi\'s sketch to its tag.',
        pairs: [
          ['Mensah Beats at the top', 'h1'],
          ['A section like Gigs', 'h2'],
          ['A few lines about him', 'p'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s page has a title and five sections. How many h1 elements does it need?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Plan the whole page: one h1 Mensah Beats, then h2 headings for About me, My beats, Gigs and Book me',
        starter: '<h1>Mensah Beats</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<h2>About me</h2>\n<h2>My beats</h2>\n<h2>Gigs</h2>\n<h2>Book me</h2>\n',
        hint: 'Four h2 lines under the h1. Comments are a bonus.',
        checks: [
          { message: 'One main title', dom: { selector: 'h1', count: 1, text: 'Mensah Beats' } },
          { message: 'Four sections', dom: { selector: 'h2', count: 4 } },
          { message: 'A My beats section', dom: { selector: 'h2', text: 'My beats' } },
          { message: 'A Book me section', dom: { selector: 'h2', text: 'Book me' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Sketch your own page in your head: what\'s it for, in one sentence, and what are its boxes?',
    starters: ['My page is for...', 'Its boxes would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Grab paper and draw your own page as boxes inside a phone shape. You\'ll build it in two lessons\' time.',
  },
  notes: 'Wireframing / sketch-first is standard web design practice (e.g. MDN Learn, "Planning your website" / "What will your website look like?"). Phone-shaped sketch reinforces the course\'s phones-first theme (Chapter 10).',
};

export default lesson;
