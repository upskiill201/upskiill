import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (people-first words, search history, names and links, Open Graph). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the preview card',
  summary: 'Efua shares the link again. This time a card appears in the group chat: Kofi\'s cover, "Mensah Beats | Beat producer in Accra", and a line about booking. Three friends tap it. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write plain, natural words people search for', 'Use clear addresses and link text', 'Add Open Graph tags'],
  learn: [
    {
      kind: 'story',
      title: 'Three taps',
      beats: [
        { speaker: 'efua', text: 'Now it looks like a real site in the chat. Three people tapped it already.' },
        { speaker: 'kofi', text: 'And it just says what I do, in plain words.' },
        { speaker: 'tey', text: 'Clear words, clear links, a proper preview. Check them.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: words, links and previews.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add the preview description and URL: og:description "Listen free, see gigs, and book Kofi." and og:url "https://mensahbeats.example.app/"',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:title" content="Mensah Beats | Beat producer in Accra">\n\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:title" content="Mensah Beats | Beat producer in Accra">\n  <meta property="og:description" content="Listen free, see gigs, and book Kofi.">\n  <meta property="og:url" content="https://mensahbeats.example.app/">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: 'Two meta tags with property="og:description" and property="og:url".',
        checks: [
          { message: 'A preview description', dom: { selector: 'meta[property="og:description"]', attr: 'content' } },
          { message: 'A preview address', dom: { selector: 'meta[property="og:url"][content^="https://"]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps people find and choose the page, or doesn\'t?',
        groups: ['Helps', 'Doesn\'t'],
        items: [
          { text: '/gigs.html', group: 0 },
          { text: 'meta keywords', group: 1 },
          { text: '"See upcoming gigs" link text', group: 0 },
          { text: 'Repeating "beats Accra" 40 times', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Why won\'t this preview image appear?',
        code: '<meta property="og:image" content="/share.jpg">',
        language: 'html',
        options: [
          { text: 'It needs the full address, starting with https://' },
          { text: 'og:image doesn\'t exist', why: 'It does; it needs a full address.' },
          { text: 'The file is too small', why: 'The address is the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the heading a stranger wouldn\'t understand.',
        language: 'html',
        lines: ['<h2>Upcoming gigs</h2>', '<h2>Vibes incoming!!</h2>', '<h2>Book a producer for your wedding or party</h2>'],
        bug: 1,
        explanation: 'It doesn\'t say what the section is. Say it plainly.',
        fix: '<h2>New beats</h2>',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to its year.',
        pairs: [
          ['Google launches', '1998'],
          ['Meta keywords ignored by Google', '2009'],
          ['Mensah Beats gets a preview card', '2026'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should Kofi buy a pack of 500 links to his site?',
        options: [
          { text: 'No: bought links count as spam. Real links from the organiser and venues are what help.' },
          { text: 'Yes, cheap links work.', why: 'They break the rules and can hurt.' },
          { text: 'Buy 5,000.', why: 'Even more spam.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which sentence uses search words naturally?',
        options: [
          { text: '"Kofi Mensah is a beat producer in Accra who plays weddings and parties."' },
          { text: '"Beat producer Accra producer beats Accra."', why: 'That\'s stuffing.' },
          { text: '"Sonic architect crafting vibes."', why: 'Nobody searches those words.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A clear link.',
        language: 'html',
        template: '<a href="[[1]].html">See upcoming [[2]]</a>',
        blanks: [['gigs'], ['gigs']],
        distractors: ['page2', 'here', 'click'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute do Open Graph meta tags use instead of name? (one word)',
        answers: ['property'],
        placeholder: 'An attribute',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the head tags in a sensible order.',
        language: 'html',
        lines: ['<meta charset="utf-8">', '<title>Mensah Beats | Beat producer in Accra</title>', '<meta name="description" content="...">', '<meta property="og:title" content="...">'],
      },
    ],
  },
  reflect: {
    prompt: 'Share your link with a friend. Did the preview make them want to tap it?',
    starters: ['They said...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add the four og: tags to each main page, and check your headings and link text use plain words.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
