import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 2 — v0.1 vs v2.0: how far the site has come. Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'From one line to v2.0',
  summary: 'Before the launch, Efua digs out the very first version of Mensah Beats from twelve weeks ago. Kofi laughs, then goes quiet. Here they are side by side.',
  minutes: 11,
  outcomes: ['Describe how a site grows from a first page to a full site', 'Name what each course added', 'Recognise how much you have learned'],
  learn: [
    {
      kind: 'compare',
      title: 'v0.1 vs v2.0',
      before: { label: 'v0.1, twelve weeks ago', text: '<h1>Mensah Beats</h1>\n<p>I make beats.</p>\n\nOne heading, one line. No colours, no links, no pictures, not online. It only opened on Kofi\'s phone.' },
      after: { label: 'v2.0, tonight', text: '<a class="skip-link" href="#main">Skip to main content</a>\n<header class="site-header"><nav>...</nav></header>\n<main id="main">\n  <section class="gallery">...</section>\n  <form action="/thanks" method="post">...</form>\n</main>\n<footer>...</footer>\n\nA live site with his own colours, a gallery that fits every screen, a booking form, kind motion, access for everyone, and a preview card. Found on search.' },
      notes: [
        'Course 1: a real page, words, links, media, CSS, colour and type, then live.',
        'Course 2: boxes, classes, Flexbox, Grid, phones first.',
        'Course 3: forms, motion, accessibility, search, and launch.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Where it started',
      caption: 'This is all v0.1 was. Run it, then remember everything you know now.',
      code: '<h1>Mensah Beats</h1>\n<p>I make beats.</p>\n',
      challenge: 'Add one thing from each course: a colour (Course 1), a card with padding (Course 2), and a label and box (Course 3).',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Every site starts as one line. Each version adds one layer.',
    },
  ],
  apply: {
    scenario: 'From one line to v2.0.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each version to what it added.',
        pairs: [
          ['v1.0', 'Live on the internet'],
          ['v1.4', 'A Grid cover wall'],
          ['v1.6', 'The booking form'],
          ['v1.8', 'Access for everyone'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Upgrade v0.1 a little: give the h1 Kofi\'s orange (#FF9600) and the page his night blue (#14213D)',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n<p>I make beats.</p>\n',
        solution: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  h1 { color: #FF9600; }\n</style>\n<h1>Mensah Beats</h1>\n<p>I make beats.</p>\n',
        hint: 'body { background-color: #14213D; } h1 { color: #FF9600; }',
        checks: [
          { message: 'Night blue page', dom: { selector: 'body', style: 'background-color', styleValue: '#14213D' } },
          { message: 'Orange name', dom: { selector: 'h1', style: 'color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which course taught it?',
        groups: ['Course 1 or 2', 'Course 3'],
        items: [
          { text: 'Media queries', group: 0 },
          { text: 'A booking form', group: 1 },
          { text: 'Hex colours', group: 0 },
          { text: 'A skip link', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the versions in order.',
        lines: ['v0.1: one heading', 'v1.0: live online', 'v1.5: phones first', 'v1.9: found on search', 'v2.0: launch night'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Did you ever think v0.1 would turn into this?',
        options: [
          { text: 'No. It happened one small version at a time.' },
          { text: 'It was always this good.', why: 'It grew step by step.' },
          { text: 'v0.1 was better.', why: 'It was one line long.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['v0.1 only opened on Kofi\'s phone.', 'v2.0 was built in one night.', 'Each version added one layer.'],
        bug: 1,
        explanation: 'It took twelve weeks, one version at a time.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does v0.1 look like?',
        code: '<h1>Mensah Beats</h1>\n<p>I make beats.</p>',
        language: 'html',
        options: [
          { text: 'A big heading and one line, in default black on white' },
          { text: 'A full music site', why: 'It\'s just two lines.' },
          { text: 'Nothing', why: 'It shows a heading and a line.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the summary.',
        template: 'Course 2 taught boxes, classes, Flexbox, [[1]] and phones [[2]].',
        blanks: [['Grid'], ['first']],
        distractors: ['tables', 'last', 'forms'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many courses make up the HTML and CSS track? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the main lesson of Kofi\'s twelve weeks?',
        options: [
          { text: 'Big things are built in small versions, each one a bit better' },
          { text: 'You need to know everything before you start', why: 'He started with one line.' },
          { text: 'Websites are built in a day', why: 'It took twelve weeks.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at the first version of your own page. What\'s the biggest change since then?',
    starters: ['My first version...', 'The biggest change is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'If you kept your first page, open it next to your current site. Write three things you can do now that you couldn\'t then.',
  },
  notes: 'Version history recap across the three courses.',
};

export default lesson;
