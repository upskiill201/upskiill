import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 (titles, descriptions, how search works, a matching head). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: every tab has a name',
  summary: 'Kofi opens every page of his site in a row of tabs. "Home | Mensah Beats", "Upcoming gigs | Mensah Beats", "Book Kofi | Mensah Beats". No more "index". Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write specific titles for every page', 'Add honest meta descriptions', 'Link pages so they can be found'],
  learn: [
    {
      kind: 'story',
      title: 'No more "index"',
      beats: [
        { speaker: 'narrator', text: 'A row of tabs, each with its own name. Each page has a description too.' },
        { speaker: 'kofi', text: 'Even the tabs look professional now.' },
        { speaker: 'tey', text: 'And search engines can tell the pages apart. Check it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: titles and descriptions.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make the booking page search-ready: title "Book Kofi | Mensah Beats" and a meta description about booking him for events',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>index</title>\n\n</head>\n<body><h1>Book Kofi</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Book Kofi | Mensah Beats</title>\n  <meta name="description" content="Book Mensah Beats for weddings, parties and club nights in Ghana. Send your date and venue and get a reply with a price.">\n</head>\n<body><h1>Book Kofi</h1></body>\n</html>\n',
        hint: 'Change the title, and add <meta name="description" content="...">.',
        checks: [
          { message: 'A specific title', dom: { selector: 'title', text: 'Book Kofi' } },
          { message: 'A description', dom: { selector: 'meta[name="description"]', attr: 'content' } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the stages of search in order.',
        lines: ['Crawl', 'Index', 'Rank', 'Show'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good search habit, or a trick that backfires?',
        groups: ['Good habit', 'Backfires'],
        items: [
          { text: 'A clear title for each page', group: 0 },
          { text: 'Hidden lists of keywords', group: 1 },
          { text: 'Linking your pages together', group: 0 },
          { text: 'The same title on every page', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'No meta description. What might the search result show under the title?',
        code: '<title>Mensah Beats | Beat producer in Accra</title>\n<!-- no description -->',
        language: 'html',
        options: [
          { text: 'Some text the search engine picks from the page, maybe the nav links' },
          { text: 'Nothing at all', why: 'It usually picks text from the page.' },
          { text: 'A perfect summary', why: 'It has to guess.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken tag.',
        language: 'html',
        lines: ['<title>Upcoming gigs | Mensah Beats</title>', '<meta name="description" value="Gigs in Accra.">', '<meta name="viewport" content="width=device-width, initial-scale=1">'],
        bug: 1,
        explanation: 'A meta description uses content, not value.',
        fix: '<meta name="description" content="Gigs in Accra.">',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each page to a good title.',
        pairs: [
          ['The home page', 'Mensah Beats | Beat producer in Accra'],
          ['The gigs page', 'Upcoming gigs | Mensah Beats'],
          ['The booking page', 'Book Kofi | Mensah Beats'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My cousin says to put "best producer" in every title.',
        options: [
          { text: 'Good idea.', why: 'Be specific and true instead.' },
          { text: 'Put it twice.', why: 'Even more spammy.' },
          { text: 'Titles should say what the page really is. Empty boasts don\'t help people choose, and can look spammy.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'How do crawlers usually find a new page?',
        options: [
          { text: 'By reading your mind', why: 'They follow links.' },
          { text: 'By following links to it from other pages' },
          { text: 'Only if you pay', why: 'Links are free.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the description.',
        language: 'html',
        template: '<meta [[1]]="description" [[2]]="Upcoming gigs in Accra and Kumasi.">',
        blanks: [['name'], ['content']],
        distractors: ['value', 'property', 'type'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should never be a page\'s whole title? (one word, a common file name)',
        answers: ['index', 'untitled'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Open all your pages in tabs. Can you tell them apart from the tab names alone?',
    starters: ['I can tell...', 'I need to rename...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give every page a specific title and a one-sentence description. Make sure every page is linked from another.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
