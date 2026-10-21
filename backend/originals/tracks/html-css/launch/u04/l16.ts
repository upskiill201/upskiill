import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 16 — search myths. Myth or fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Search: myth or fact?',
  summary: 'Clinton\'s cousin sells "SEO packages" and has given Kofi a list of rules. Some are real. Many are old tricks or plain wrong. Sort them.',
  minutes: 11,
  outcomes: ['Separate search myths from facts', 'Spot promises nobody can keep', 'Know what actually helps a small site'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'You can pay a search engine to rank first in the normal results.', isFact: false, explain: 'Ads are separate and labelled. The normal results can\'t be bought.' },
        { text: 'Anyone can guarantee you the number 1 spot.', isFact: false, explain: 'Nobody outside the search engine controls rankings. A guarantee is a red flag.' },
        { text: 'Clear titles and useful content help pages get found.', isFact: true, explain: 'They help search engines understand the page, and help people choose it.' },
        { text: 'The more times you repeat a keyword, the better.', isFact: false, explain: 'Stuffing reads badly and is treated as spam.' },
        { text: 'A new site can take weeks or months to show up well.', isFact: true, explain: 'Pages have to be crawled and indexed first, and trust builds over time.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'What actually helps',
      caption: 'A small, honest page: clear title, description, heading, useful words, and links to the other pages.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Upcoming gigs | Mensah Beats</title>\n  <meta name="description" content="Where Mensah Beats is playing next in Accra and Kumasi, with dates and tickets.">\n  <style>body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; } a { color: #FFC83D; }</style>\n</head>\n<body>\n  <main>\n    <h1>Upcoming gigs</h1>\n    <p>End-of-year show: Saturday 20 December, Accra. Tickets at the door.</p>\n    <p><a href="book.html">Book Kofi for your own event</a></p>\n  </main>\n</body>\n</html>\n',
      challenge: 'Name three things on this page that help it get found.',
    },
  ],
  apply: {
    scenario: 'The SEO package.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'You can buy the top normal result', group: 0 },
          { text: 'New sites take time to show up', group: 1 },
          { text: 'Number 1 can be guaranteed', group: 0 },
          { text: 'Clear titles help', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Someone guarantees "number 1 on Google in a week". What should Kofi think?',
        options: [
          { text: 'It\'s a red flag: nobody outside the search engine can guarantee rankings' },
          { text: 'Great deal', why: 'Nobody can promise that.' },
          { text: 'It\'s possible if you pay more', why: 'Normal results can\'t be bought.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Help the gigs page get found: add a link to book.html with the text "Book Kofi for your own event"',
        starter: '<main>\n  <h1>Upcoming gigs</h1>\n  <p>End-of-year show: Saturday 20 December, Accra.</p>\n\n</main>\n',
        solution: '<main>\n  <h1>Upcoming gigs</h1>\n  <p>End-of-year show: Saturday 20 December, Accra.</p>\n  <p><a href="book.html">Book Kofi for your own event</a></p>\n</main>\n',
        hint: '<a href="book.html">Book Kofi for your own event</a>',
        checks: [
          { message: 'A link to the booking page', dom: { selector: 'a[href="book.html"]', count: 1 } },
          { message: 'With clear text', dom: { selector: 'a[href="book.html"]', text: 'Book Kofi' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Pay to rank first"', 'Ads are separate; results aren\'t for sale'],
          ['"Guaranteed number 1"', 'Nobody can promise it'],
          ['"Repeat keywords more"', 'Stuffing counts as spam'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My site went live yesterday and isn\'t on the first page yet. Is it broken?',
        options: [
          { text: 'Probably not. New pages take time to be crawled and indexed. Keep making it clear and useful.' },
          { text: 'Yes, start again.', why: 'It just takes time.' },
          { text: 'Buy an SEO package.', why: 'Patience and good pages work.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the false promise.',
        lines: ['Clear titles help people choose your page.', 'Our package guarantees you rank first by Friday.', 'Links from related sites can help.'],
        bug: 1,
        explanation: 'Nobody can guarantee rankings.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'An ad appears at the top of the results. What is it?',
        code: 'Sponsored · mensahbeats.example.app\nMensah Beats | Beat producer in Accra',
        language: 'html',
        options: [
          { text: 'A paid ad, labelled as sponsored, separate from the normal results' },
          { text: 'The top normal result', why: 'It\'s labelled sponsored.' },
          { text: 'A virus', why: 'It\'s a labelled ad.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the facts.',
        template: 'Normal results can\'t be [[1]]. Nobody can [[2]] number 1.',
        blanks: [['bought'], ['guarantee']],
        distractors: ['read', 'see', 'find'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is "a new site can take weeks to show up well" a myth or a fact? (one word)',
        answers: ['fact'],
        placeholder: 'Myth or fact',
      },
      {
        kind: 'mcq',
        prompt: 'What helps a small site most?',
        options: [
          { text: 'Clear titles, useful content, working on phones, and real links from related sites' },
          { text: 'Buying a package of links', why: 'Bought links are spam.' },
          { text: 'Hiding keywords', why: 'An old trick that gets caught.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Have you seen ads promising "guaranteed" results? What would you ask them now?',
    starters: ['I\'ve seen...', 'I\'d ask...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "Google Search Central do you need an SEO" and read what to watch out for when hiring help.',
  },
  notes: 'Google Search Central "Do you need an SEO?" warns against ranking guarantees. Ads are labelled (e.g. "Sponsored") and separate from organic results.',
};

export default lesson;
