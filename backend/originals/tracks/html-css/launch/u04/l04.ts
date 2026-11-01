import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 4 — the head for search: lang, viewport, title, description, h1 that matches. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Everything search engines read first',
  summary: 'Miracle opens the head of Kofi\'s gigs page and the start of its body. "This is what a search engine reads before anything else," she says. Tap each part.',
  minutes: 11,
  outcomes: ['Read a search-ready head', 'Match the title, description and h1 to each other', 'Explain why phone-friendliness matters for search'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Upcoming gigs | Mensah Beats</title>\n  <meta name="description" content="See where Mensah Beats is playing next in Accra and Kumasi, with dates, venues and tickets.">\n</head>\n<body>\n  <main>\n    <h1>Upcoming gigs</h1>',
      hotspots: [
        { phrase: 'lang="en"', note: 'Tells search engines which language the page is in, so it can be shown to people searching in English.' },
        { phrase: 'name="viewport"', note: 'Search engines mostly look at the phone version of pages now. A page that works on phones is ready for that.' },
        { phrase: '<title>Upcoming gigs | Mensah Beats</title>', note: 'Says exactly what this page is, then whose site.' },
        { phrase: 'name="description"', note: 'A one-sentence summary for the result, with real details people care about: places, dates, tickets.' },
        { phrase: '<h1>Upcoming gigs</h1>', note: 'The h1 matches the title. Title, description and heading all agree about what the page is.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The gigs page head',
      caption: 'Title, description and h1 all say the same thing in slightly different ways.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Upcoming gigs | Mensah Beats</title>\n  <meta name="description" content="See where Mensah Beats is playing next in Accra and Kumasi, with dates, venues and tickets.">\n  <style>body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }</style>\n</head>\n<body>\n  <main>\n    <h1>Upcoming gigs</h1>\n    <p>End-of-year show, Saturday 20 December, Accra.</p>\n  </main>\n</body>\n</html>\n',
      challenge: 'Write a matching head for a "Book Kofi" page: title, description and h1.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Title, description and h1 should agree about what the page is.',
    },
  ],
  apply: {
    scenario: 'What search engines read first.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job for search.',
        pairs: [
          ['lang="en"', 'The page\'s language'],
          ['viewport', 'Ready for phone-first indexing'],
          ['<title>', 'The result\'s clickable line'],
          ['meta description', 'The result\'s summary'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the h1 agree with the title: change the h1 to "Upcoming gigs"',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head><meta charset="utf-8"><title>Upcoming gigs | Mensah Beats</title></head>\n<body><main><h1>Welcome!</h1></main></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head><meta charset="utf-8"><title>Upcoming gigs | Mensah Beats</title></head>\n<body><main><h1>Upcoming gigs</h1></main></body>\n</html>\n',
        hint: '<h1>Upcoming gigs</h1>',
        checks: [
          { message: 'The h1 matches the title', dom: { selector: 'h1', text: 'Upcoming gigs' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the viewport tag matter for search?',
        options: [
          { text: 'It doesn\'t', why: 'Phone-friendliness matters to search.' },
          { text: 'Search engines mostly look at the phone version of pages, so it needs to work well on phones' },
          { text: 'It sets the page title', why: 'It sets the phone layout width.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Do these agree about the page, or not?',
        groups: ['They agree', 'They don\'t'],
        items: [
          { text: 'Title "Upcoming gigs", h1 "Upcoming gigs"', group: 0 },
          { text: 'Title "Gigs", h1 "Welcome!"', group: 1 },
          { text: 'Title "Book Kofi", h1 "Book Kofi for your event"', group: 0 },
          { text: 'Title "Home", description about merch', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should every page\'s description be the same, to save time?',
        options: [
          { text: 'Yes, copy it everywhere.', why: 'Identical descriptions don\'t help people choose.' },
          { text: 'Only the home page needs one.', why: 'Every important page benefits.' },
          { text: 'Each page is different, so each description should say what that page offers.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that disagrees with the rest.',
        language: 'html',
        lines: ['<title>Upcoming gigs | Mensah Beats</title>', '<meta name="description" content="Shop for Mensah Beats T-shirts.">', '<h1>Upcoming gigs</h1>'],
        bug: 1,
        explanation: 'The description talks about T-shirts on the gigs page. Describe the gigs.',
        fix: '<meta name="description" content="See where Mensah Beats is playing next, with dates, venues and tickets.">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone searches "Mensah Beats gigs Kumasi". Which page fits best?',
        code: 'A: <title>Home | Mensah Beats</title>\nB: <title>Upcoming gigs | Mensah Beats</title> with Kumasi dates on the page',
        language: 'html',
        options: [
          { text: 'A', why: 'B is about gigs and mentions Kumasi.' },
          { text: 'B: its title and content match the search' },
          { text: 'Neither', why: 'B matches well.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A head for the booking page.',
        language: 'html',
        template: '<title>[[1]] | Mensah Beats</title>\n<meta name="[[2]]" content="Book Kofi for weddings, parties and club nights in Ghana.">',
        blanks: [['Book Kofi', 'Book me'], ['description']],
        distractors: ['index', 'keywords', 'title'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which heading should agree with the page title? (tag name)',
        answers: ['h1', '<h1>'],
        placeholder: 'A tag',
      },
      {
        kind: 'mcq',
        prompt: 'Which version of a page do search engines mostly look at now?',
        options: [
          { text: 'The printed version', why: 'They mostly use the mobile version.' },
          { text: 'Only the desktop version', why: 'Mobile-first indexing is now the default.' },
          { text: 'The phone version' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Do your pages\' titles, descriptions and h1s agree with each other?',
    starters: ['My... page says...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'For each page on your site, check the title, description and h1 all describe the same thing.',
  },
  notes: 'Google uses mobile-first indexing (the mobile version of content) for crawling and indexing (Google Search Central). Search engines also detect language from content; lang helps.',
};

export default lesson;
