import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 8 — clear addresses and links: descriptive file names, link text, links from other sites. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Addresses that make sense',
  summary: 'Kofi\'s pages are called page2.html, new-final.html and test3.html. Even he forgets which is which. Tey explains why names and links matter, to people and to search engines.',
  minutes: 11,
  outcomes: ['Name pages and images descriptively', 'Write link text that says where it goes', 'Explain why links from other sites help, and why buying them doesn\'t'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>File names become addresses.</strong> mensahbeats.example.app/gigs.html tells everyone, before they click, what\'s there. page2.html tells nobody anything. Use short, lowercase words with hyphens: gigs.html, book.html, rain-on-zinc.jpg.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Link text is a clue.</strong> "See upcoming gigs" tells people and search engines what the linked page is about. "Click here" doesn\'t. You learned that for screen readers; it helps search too.</p>',
    },
    {
      kind: 'check',
      question: 'Which address tells you most before you click?',
      options: ['/page2.html', '/gigs.html', '/new-final-v3.html'],
      answer: 1,
      explanation: 'gigs.html says exactly what\'s there.',
    },
    {
      kind: 'text',
      html: '<p><strong>Links from other sites</strong> are like recommendations. When the Sound Up Saturdays site links to Mensah Beats, that helps. Ask people you work with to link to you. Never buy links: search engines treat paid link schemes as spam.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Clear names, clear links',
      caption: 'Every address and every link text says what\'s there.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  a { color: #FFC83D; }\n</style>\n<nav>\n  <a href="gigs.html">See upcoming gigs</a> |\n  <a href="book.html">Book Kofi for your event</a> |\n  <a href="beats/rain-on-zinc.html">Listen to Rain on Zinc</a>\n</nav>\n',
      challenge: 'Add a link to "about.html" whose text says what\'s on that page.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Short, lowercase, hyphenated names. Link text that says where it goes. Earn links; never buy them.',
    },
  ],
  apply: {
    scenario: 'Addresses that make sense.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why rename page2.html to gigs.html?',
        options: [
          { text: 'Shorter names load faster', why: 'It\'s about meaning.' },
          { text: 'The address then says what\'s on the page, to people and search engines' },
          { text: 'page2 isn\'t allowed', why: 'It\'s allowed, just unhelpful.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the link: point it at gigs.html and make the text "See upcoming gigs"',
        starter: '<a href="page2.html">Click here</a>\n',
        solution: '<a href="gigs.html">See upcoming gigs</a>\n',
        hint: '<a href="gigs.html">See upcoming gigs</a>',
        checks: [
          { message: 'A clear address', dom: { selector: 'a[href="gigs.html"]', count: 1 } },
          { message: 'Clear link text', dom: { selector: 'a', text: 'upcoming gigs' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good file name, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'book.html', group: 0 },
          { text: 'New Page (2).html', group: 1 },
          { text: 'rain-on-zinc.jpg', group: 0 },
          { text: 'IMG_20261218_2213.jpg', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to what it tells people.',
        pairs: [
          ['/gigs.html', 'The gigs page'],
          ['"Book Kofi for your event"', 'The booking page'],
          ['rain-on-zinc.jpg', 'The Rain on Zinc cover'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'The organiser asked if she can link to my site from hers. Should I say yes?',
        options: [
          { text: 'Yes, please: a real link from a related site helps people and search engines find me.' },
          { text: 'No, links hurt.', why: 'Earned links from real sites help.' },
          { text: 'Only if she pays me.', why: 'Paid links are a spam scheme.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the link with unhelpful text.',
        language: 'html',
        lines: ['<a href="gigs.html">See upcoming gigs</a>', '<a href="book.html">here</a>', '<a href="beats.html">All beats</a>'],
        bug: 1,
        explanation: '"here" says nothing about the page.',
        fix: '<a href="book.html">Book Kofi for your event</a>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone sees this address in a search result. What do they expect?',
        code: 'https://mensahbeats.example.app/book.html',
        language: 'html',
        options: [
          { text: 'A page of books', why: 'In context, book means booking.' },
          { text: 'A page about booking Kofi' },
          { text: 'They can\'t tell', why: 'The name says it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A good name for the Jollof Bounce cover.',
        template: '[[1]]-[[2]].jpg',
        blanks: [['jollof'], ['bounce']],
        distractors: ['IMG', 'final', 'Copy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should replace spaces in file names? (name the symbol)',
        answers: ['hyphen', 'hyphens', 'dash', 'a hyphen'],
        placeholder: 'A symbol name',
      },
      {
        kind: 'mcq',
        prompt: 'An offer: "1,000 links to your site for GHS 100". Good idea?',
        options: [
          { text: 'Yes, more links is always better', why: 'Bought links break the rules.' },
          { text: 'Only if they\'re cheap', why: 'Price doesn\'t matter; it\'s the scheme.' },
          { text: 'No: paid link schemes are treated as spam and can hurt the site' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of your own pages or images have unhelpful names? What would you rename them?',
    starters: ['I\'d rename... to...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rename any unclear pages or images on your site, then update every link and src that points to them. Test every link afterwards.',
  },
  notes: 'Google Search Central URL structure guidance (simple, descriptive URLs, hyphens). Link schemes are listed in spam policies. mensahbeats.example.app is a placeholder address.',
};

export default lesson;
