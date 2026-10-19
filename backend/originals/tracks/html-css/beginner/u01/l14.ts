import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 14 — view source: every page's HTML is readable, and reading it is how you learn. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'View source',
  summary: 'Kofi finds a producer\'s website he loves and wonders how it\'s built. Here\'s a secret most beginners don\'t know: you can read the HTML of almost any page on the web.',
  minutes: 11,
  outcomes: ['Open the source of a web page', 'Read a page\'s HTML and find its parts', 'Learn from other pages without copying them'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Kofi has found a producer in Lagos with a gorgeous website. He\'s been staring at it for twenty minutes. "How did they DO that?"',
          replies: ['No idea', 'Can he look inside?'],
        },
        {
          tey: 'He can. Every web page is sent to your browser as a file of HTML, remember? So you can ask the browser to show you that file. It\'s called "view source".',
          replies: ['How?'],
        },
        {
          tey: 'On a computer: right-click the page and choose View page source, or press Ctrl+U (Cmd+Option+U on a Mac). On an Android phone in Chrome, type view-source: before the address. iPhones make it harder; a computer is easiest.',
          replies: ['Is that allowed?', 'What will I see?'],
        },
        {
          tey: 'Completely allowed. Developers have learned this way since 1991. You\'ll see tags you know: h1, p, title, lang. And lots you don\'t yet. That\'s fine. Find the parts you recognise, and you\'ll recognise more every chapter.',
          replies: ['Can I copy it?'],
        },
        {
          tey: 'Learn from it, don\'t copy it. Reading how someone built a heading is learning. Copying their whole page, words and pictures, is taking their work. Kofi wants HIS site, not a copy of someone else\'s.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Read it like a developer',
      caption: 'This is a simplified version of the first website at info.cern.ch. Read the source, then look at the page. Can you match each line to what you see?',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>The World Wide Web project</title>\n</head>\n<body>\n  <h1>World Wide Web</h1>\n  <p>The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents.</p>\n</body>\n</html>\n',
      challenge: 'Change the h1 to your own project\'s name.',
    },
  ],
  apply: {
    scenario: 'Kofi reads other people\'s pages.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can you read the HTML of almost any web page?',
        options: [
          { text: 'Because hackers leaked it', why: 'Nothing is leaked. The page is sent to your browser as HTML, so the browser can show it to you.' },
          { text: 'Because the browser receives the HTML file, and can show it to you' },
          { text: 'Because every website is open source', why: 'Many aren\'t. But the HTML a browser receives is always readable.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Learning from it, or copying it?',
        groups: ['Learning', 'Copying'],
        items: [
          { text: 'Seeing how they used h2 for each section', group: 0 },
          { text: 'Pasting their whole page and changing the name', group: 1 },
          { text: 'Noticing they added lang="en"', group: 0 },
          { text: 'Using their photos on your page', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Rebuild the start of the first website: a main heading World Wide Web, and a paragraph under it',
        starter: '',
        solution: '<h1>World Wide Web</h1>\n<p>A way to share documents.</p>\n',
        hint: 'An h1 that says World Wide Web, then any sentence in a p.',
        checks: [
          { message: 'A main heading that says World Wide Web', dom: { selector: 'h1', text: 'World Wide Web' } },
          { message: 'A paragraph under it', dom: { selector: 'p', min: 1 } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Kofi views the source and sees this. What does the browser tab say?',
        code: '<head>\n  <title>Tunde Beats | Lagos</title>\n</head>\n<body>\n  <h1>Tunde</h1>\n</body>',
        language: 'html',
        options: [
          { text: 'Tunde', why: 'That\'s the h1, shown on the page. The tab uses the title.' },
          { text: 'index.html', why: 'The page has a title, so the tab uses it.' },
          { text: 'Tunde Beats | Lagos' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what Kofi sees in the source to what it does.',
        pairs: [
          ['<title>', 'The name on the tab'],
          ['lang="en"', 'Says the page is in English'],
          ['<!-- Nav -->', 'A note for developers'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'I saw your page. Why don\'t you just copy that Lagos producer\'s website? It\'s nicer.',
        options: [
          { text: 'Fine, I\'ll copy it all.', why: 'That\'s someone else\'s work, and it wouldn\'t be Kofi\'s site anyway.' },
          { text: 'I\'m learning how they built it, but the site has to be mine.' },
          { text: 'Their website is ugly.', why: 'Kofi literally stared at it for twenty minutes. Learn from it instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Kofi is reading a page\'s source. Tap the line that\'s a comment, not something shown.',
        language: 'html',
        lines: ['<h1>Tunde Beats</h1>', '<!-- TODO: add new beat -->', '<p>Producer from Lagos.</p>'],
        bug: 1,
        explanation: 'That\'s a comment, a note the developer left for themselves. You can read it in the source, but it never shows on the page.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do you type before an address in Chrome on Android to see a page\'s source? (two words joined by a dash, ending in a colon)',
        answers: ['view-source:', 'view-source', 'view source'],
        placeholder: 'something-something:',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the sentence.',
        template: 'Viewing source is for [[1]] how a page is built, not [[2]] it.',
        blanks: [['learning'], ['copying']],
        distractors: ['deleting', 'hacking', 'printing'],
      },
      {
        kind: 'writeCode',
        prompt: 'Kofi liked the producer\'s idea of a heading per section. Add an h2 Beats and an h2 Gigs under his title',
        starter: '<h1>Mensah Beats</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<h2>Beats</h2>\n<h2>Gigs</h2>\n',
        hint: 'Two h2 lines under the h1.',
        checks: [
          { message: 'A section heading Beats', dom: { selector: 'h2', text: 'Beats' } },
          { message: 'A section heading Gigs', dom: { selector: 'h2', text: 'Gigs' } },
          { message: 'Still one main title', dom: { selector: 'h1', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which website do you love the look of? What would you look for first if you viewed its source?',
    starters: ['A website I love is...', 'I\'d look for...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'On a computer, open info.cern.ch and press Ctrl+U (Cmd+Option+U on a Mac). Find the title, the h1 and a link. You know most of it already.',
  },
  notes: 'View source: Ctrl+U (Chrome/Firefox/Edge on Windows), Cmd+Option+U (Chrome on Mac), view-source: URL scheme works in Chrome for Android. Safari on iOS has no built-in view source. The tryIt text paraphrases info.cern.ch\'s first line ("The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents."), which is public CERN history.',
};

export default lesson;
