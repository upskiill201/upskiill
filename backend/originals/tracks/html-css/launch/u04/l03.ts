import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 3 — how search works: crawl, index, rank, show; what you control. Steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'How search actually works',
  summary: 'Kofi imagines someone at a search company reading his site and deciding where it goes. Miracle explains what really happens, in four steps, and which ones Kofi can help with.',
  minutes: 12,
  outcomes: ['Describe the four stages: crawl, index, rank, show', 'Explain what you can and can\'t control', 'Help search engines find every page with links'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps from your page to a search result',
      steps: [
        { title: '1. Crawl', body: 'Programs called crawlers visit pages and follow links to find new ones, all day, every day. If nothing links to a page, it may never be found. You help by linking your pages to each other.', code: '<a href="gigs.html">Upcoming gigs</a>', language: 'html' },
        { title: '2. Index', body: 'The search engine reads what it found, the title, headings, words, images and links, and stores it in a giant index, like the index at the back of a book.' },
        { title: '3. Rank', body: 'When someone searches, it picks the pages that best match, using many signals: how well the words match, how useful and trustworthy the page seems, whether other sites link to it, whether it works on phones.' },
        { title: '4. Show', body: 'It shows a list: usually your title, a short description, and the address. You can\'t buy your way up the normal results; you can make the page clear, useful and easy to find.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Pages that link to each other',
      caption: 'Every page links to the others with clear words, so crawlers (and people) can find them all.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  a { color: #FFC83D; }\n</style>\n<nav>\n  <a href="index.html">Home</a> |\n  <a href="beats.html">All beats</a> |\n  <a href="gigs.html">Upcoming gigs</a> |\n  <a href="book.html">Book Kofi</a>\n</nav>\n<main><h1>Mensah Beats</h1><p>Beats from Accra.</p></main>\n',
      challenge: 'Add a link to an "about.html" page with the text "About Kofi".',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Crawl, index, rank, show. You help most by making pages clear, useful and linked together.',
    },
  ],
  apply: {
    scenario: 'How search actually works.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the stages in order.',
        lines: ['Crawl: find the page by following links', 'Index: read and store what\'s on it', 'Rank: choose the best matches for a search', 'Show: list the results'],
      },
      {
        kind: 'writeCode',
        prompt: 'Help crawlers find the gigs page: add a link to gigs.html with the text "Upcoming gigs"',
        starter: '<nav>\n  <a href="index.html">Home</a>\n\n</nav>\n',
        solution: '<nav>\n  <a href="index.html">Home</a>\n  <a href="gigs.html">Upcoming gigs</a>\n</nav>\n',
        hint: '<a href="gigs.html">Upcoming gigs</a>',
        checks: [
          { message: 'A link to the gigs page', dom: { selector: 'a[href="gigs.html"]', count: 1 } },
          { message: 'With clear text', dom: { selector: 'a[href="gigs.html"]', text: 'gigs' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each stage to what happens.',
        pairs: [
          ['Crawl', 'Following links to find pages'],
          ['Index', 'Storing what\'s on each page'],
          ['Rank', 'Choosing the best matches'],
          ['Show', 'Listing title, description, address'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Can Kofi control it, or not?',
        groups: ['He can control it', 'He can\'t control it'],
        items: [
          { text: 'Clear titles and headings', group: 0 },
          { text: 'Exactly what position he appears in', group: 1 },
          { text: 'Linking his pages together', group: 0 },
          { text: 'What other people search for', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My new Merch page has no links to it from anywhere. Will search engines find it?',
        options: [
          { text: 'Maybe not. Crawlers follow links, so I\'ll link to it from the nav and the home page.' },
          { text: 'Yes, they find everything instantly.', why: 'Crawlers mostly find pages through links.' },
          { text: 'Only if I pay.', why: 'Linking to it is free.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['Crawlers find pages by following links.', 'You can pay to be first in the normal search results.', 'A page that works well on phones helps.'],
        bug: 1,
        explanation: 'Ads are separate and labelled. Normal results can\'t be bought.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A crawler lands on this page. Which pages can it find next?',
        code: '<a href="beats.html">All beats</a>\n<a href="gigs.html">Upcoming gigs</a>',
        language: 'html',
        options: [
          { text: 'beats.html and gigs.html' },
          { text: 'Every page on the site', why: 'Only the ones linked from here, and then from those.' },
          { text: 'None', why: 'It follows the links.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the stages.',
        template: 'Crawl, [[1]], rank, [[2]].',
        blanks: [['index'], ['show']],
        distractors: ['buy', 'delete', 'hide'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What are the programs that visit pages and follow links called? (one word)',
        answers: ['crawlers', 'crawler', 'bots', 'spiders'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which of these is a ranking signal you can improve?',
        options: [
          { text: 'Whether the page works well on phones' },
          { text: 'How many times you visit your own site', why: 'That doesn\'t affect ranking.' },
          { text: 'The colour of your logo', why: 'Not a ranking signal.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is every page on your site linked from at least one other page?',
    starters: ['Every page...', 'I need to link...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "Google Search Central how search works" and read the short overview of crawling, indexing and serving.',
  },
  notes: 'Crawling, indexing, ranking/serving per Google Search Central "How Search works". Ranking signals simplified; page experience and mobile-friendliness are among many factors.',
};

export default lesson;
