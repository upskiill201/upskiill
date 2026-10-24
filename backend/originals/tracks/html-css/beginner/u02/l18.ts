import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 18 — the learner's own page gets words: a list of things they love, with emphasis. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your page gets words',
  summary: 'Your own page has your name and one line. Time to give it some life: a short About, a list of things you love, and one thing that stands out. Same tools as Kofi, your words.',
  minutes: 12,
  outcomes: ['Add a scannable About section to your page', 'List the things you love', 'Use strong or em where it means something'],
  learn: [
    {
      kind: 'steps',
      title: 'Your page, chapter 2',
      steps: [
        { title: '1. Where you are', body: 'From Chapter 1: a skeleton, a title, and your name as the h1.', code: '<h1>Your name</h1>\n<p>One true line about you.</p>', language: 'html' },
        { title: '2. A short About', body: 'An h2 that says something, and two or three short sentences. Front-load: the most interesting thing about you first.', code: '<h2>About me</h2>\n<p>I fix bikes in Kisumu and I\'m learning to code.</p>', language: 'html' },
        { title: '3. Things I love', body: 'A list. Bullets if the order doesn\'t matter, numbers if it\'s a ranking. Three to five items is plenty.', code: '<h2>Things I love</h2>\n<ul>\n  <li>Football</li>\n  <li>Jollof</li>\n  <li>Old cartoons</li>\n</ul>', language: 'html' },
        { title: '4. One thing that stands out', body: 'Use strong for something important, or em for a word you\'d stress. Just one or two, so they stand out.', code: '<p>I am <em>really</em> good at jollof.</p>', language: 'html' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Make it yours',
      caption: 'A starting point. Replace every word with your own: your name, your About, the things you love.',
      code: '<h1>Your name</h1>\n<h2>About me</h2>\n<p>The most interesting thing about me, first.</p>\n<h2>Things I love</h2>\n<ul>\n  <li>One</li>\n  <li>Two</li>\n  <li>Three</li>\n</ul>\n',
      challenge: 'Make one word in your About em, the word you\'d say loudest.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Your page will be public at the end of the course. Keep it to things you\'re happy for anyone to read: no address, phone number or school name.',
    },
  ],
  apply: {
    scenario: 'You give your own page some words.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add an About section to your page: an h2 About me and a paragraph about you',
        starter: '<h1>Your name</h1>\n',
        solution: '<h1>Your name</h1>\n<h2>About me</h2>\n<p>I fix bikes and I\'m learning to code.</p>\n',
        hint: 'An h2 About me, then a p with any true sentence about you.',
        checks: [
          { message: 'A heading About me', dom: { selector: 'h2', text: 'About me' } },
          { message: 'A paragraph about you', dom: { selector: 'p:not(:empty)', min: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Your list is "my top 3 films, best first". Which list?',
        options: [
          { text: 'ul', why: 'A ranking has an order, so ol.' },
          { text: 'ol' },
          { text: 'dl', why: 'dl is for names and values. A ranking is ol.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a Things I love section: an h2 and a list with at least three things',
        starter: '<h2>About me</h2>\n<p>I\'m learning to code.</p>\n',
        solution: '<h2>About me</h2>\n<p>I\'m learning to code.</p>\n<h2>Things I love</h2>\n<ul>\n  <li>Football</li>\n  <li>Jollof</li>\n  <li>Old cartoons</li>\n</ul>\n',
        hint: 'An h2, then a ul (or ol) with three li.',
        checks: [
          { message: 'A second section heading', dom: { selector: 'h2', min: 2 } },
          { message: 'A list with at least three things', dom: { selector: 'li:not(:empty)', min: 3 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fine for your public page, or keep it off?',
        groups: ['Fine', 'Keep it off'],
        items: [
          { text: 'Your favourite foods', group: 0 },
          { text: 'Your school\'s name and class', group: 1 },
          { text: 'Your hobbies', group: 0 },
          { text: 'Your phone number', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Read me the first line of your About. Would a stranger want to read the second?',
        options: [
          { text: 'My first line is the most interesting thing about me, so yes.' },
          { text: 'It says "Welcome to my page".', why: 'That wastes the most-read line. Lead with something about you.' },
          { text: 'I\'ll make it longer so they read more.', why: 'Longer doesn\'t mean more read. Make the first line count.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What stands out on this page?',
        code: '<p>I make <strong>the best</strong> jollof in my street.</p>',
        language: 'html',
        options: [
          { text: 'The whole sentence', why: 'Only "the best" is inside strong.' },
          { text: 'Nothing', why: 'strong shows bold by default.' },
          { text: '"the best", in bold' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make one thing stand out: a paragraph with one word or phrase in strong or em',
        starter: '<p>I am really good at jollof.</p>\n',
        solution: '<p>I am <em>really</em> good at jollof.</p>\n',
        hint: 'Wrap one word in <em>...</em> or <strong>...</strong>.',
        checks: [{ message: 'One word or phrase stands out', dom: { selector: 'p strong:not(:empty), p em:not(:empty)', min: 1 } }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete your list.',
        language: 'html',
        template: '<[[1]]>\n  <li>Football</li>\n  <li>Jollof</li>\n</ul>',
        blanks: [['ul']],
        distractors: ['ol', 'li', 'dl'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of your page to its tag.',
        pairs: [
          ['Your name', 'h1'],
          ['About me', 'h2'],
          ['One thing you love', 'li'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which tag holds one item in your Things I love list?',
        answers: ['li', '<li>'],
        placeholder: 'Two letters',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the most interesting first line you could write about yourself? Try three versions in your head.',
    starters: ['Version one...', 'The best one is...'],
  },
  deepen: {
    title: 'Your page, v0.2',
    summary: 'Copy your page into the Code playground and add your About and Things I love sections for real. Keep it there: Chapter 3 adds links and pictures.',
  },
  notes: 'Learner\'s own page, chapter 2 step (outline engagement plan point 3). Checks use :not(:empty) so any real content passes.',
};

export default lesson;
