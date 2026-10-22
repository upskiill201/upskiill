import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 12 — the page's language (lang), language changes, and page titles. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Akwaaba, in the right voice',
  summary: 'Kofi\'s welcome line says "Akwaaba!" (welcome, in Twi). Kwesi\'s screen reader, set to English, pronounces it like an English word and it sounds wrong. Small attributes fix big problems. Tap each part.',
  minutes: 11,
  outcomes: ['Set the page language with lang', 'Mark a phrase in another language', 'Write a page title that says where you are'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Gigs | Mensah Beats</title>\n</head>\n<body>\n  <p><span lang="tw">Akwaaba!</span> Welcome to Mensah Beats.</p>\n</body>\n</html>',
      hotspots: [
        { phrase: 'lang="en"', note: 'The page is in English. Screen readers choose the right voice and pronunciation, and browsers can offer translation.' },
        { phrase: '<title>Gigs | Mensah Beats</title>', note: 'The title is the first thing a screen reader says when the page opens. Put the specific page first, then the site.' },
        { phrase: 'lang="tw"', note: 'This phrase is in Twi. Screen readers that have a Twi voice can switch to it; others at least know it isn\'t English.' },
        { phrase: '<meta charset="utf-8">', note: 'Makes letters from any language show correctly, like ɛ and ɔ in Twi.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Languages marked',
      caption: 'The page is English; the greeting is marked as Twi.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Home | Mensah Beats</title>\n  <style>\n    body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  </style>\n</head>\n<body>\n  <h1><span lang="tw">Akwaaba!</span> Welcome to Mensah Beats</h1>\n</body>\n</html>\n',
      challenge: 'Change the title to "Gigs | Mensah Beats", as if this were the gigs page.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'lang on html for the page; lang on a span for a phrase in another language; a title that names the page first.',
    },
  ],
  apply: {
    scenario: 'Akwaaba, in the right voice.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each attribute or element to its job.',
        pairs: [
          ['<html lang="en">', 'The page\'s main language'],
          ['<span lang="tw">', 'A phrase in Twi'],
          ['<title>', 'First thing announced on a new page'],
          ['<meta charset="utf-8">', 'Letters from any language display'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Mark the greeting as Twi: wrap "Akwaaba!" in a span with lang="tw"',
        starter: '<p>Akwaaba! Welcome to Mensah Beats.</p>\n',
        solution: '<p><span lang="tw">Akwaaba!</span> Welcome to Mensah Beats.</p>\n',
        hint: '<span lang="tw">Akwaaba!</span>',
        checks: [
          { message: 'A Twi phrase', dom: { selector: 'span[lang="tw"]', text: 'Akwaaba' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the page title matter for screen reader users?',
        options: [
          { text: 'It sets the colours', why: 'It names the page.' },
          { text: 'It\'s announced first, so they know which page they\'re on' },
          { text: 'It doesn\'t', why: 'It\'s the first thing they hear.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A helpful title, or not?',
        groups: ['Helpful', 'Not helpful'],
        items: [
          { text: 'Gigs | Mensah Beats', group: 0 },
          { text: 'Untitled document', group: 1 },
          { text: 'Book me | Mensah Beats', group: 0 },
          { text: 'page2.html', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Every page has the title "Mensah Beats". Is that fine?',
        options: [
          { text: 'Yes, they\'re all the same site.', why: 'Each page should say which page it is.' },
          { text: 'Remove the titles.', why: 'Then the tab shows the file name.' },
          { text: 'Add the page name first: "Gigs | Mensah Beats". Then people with many tabs open, or a screen reader, know where they are.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will make the screen reader use the wrong voice.',
        language: 'html',
        lines: ['<html>', '<title>Gigs | Mensah Beats</title>', '<meta charset="utf-8">'],
        bug: 0,
        explanation: 'No lang, so the screen reader guesses the language. Add lang="en".',
        fix: '<html lang="en">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does a screen reader announce when this page opens?',
        code: '<title>Book me | Mensah Beats</title>',
        language: 'html',
        options: [
          { text: 'Nothing', why: 'The title is announced first.' },
          { text: '"Book me, Mensah Beats"' },
          { text: 'The file name', why: 'There\'s a proper title.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Set the page language.',
        language: 'html',
        template: '<html [[1]]="[[2]]">',
        blanks: [['lang'], ['en']],
        distractors: ['language', 'english', 'charset'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute tells browsers and screen readers what language the text is in? (one word)',
        answers: ['lang'],
        placeholder: 'An attribute',
      },
      {
        kind: 'mcq',
        prompt: 'Why write "Gigs | Mensah Beats" rather than "Mensah Beats | Gigs"?',
        options: [
          { text: 'It\'s alphabetical', why: 'It\'s about what\'s most useful first.' },
          { text: 'It doesn\'t matter at all', why: 'Putting the specific page first is clearer.' },
          { text: 'The part that changes comes first, so it\'s heard and seen first' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Does your page use any words from another language? Which lang code would they need?',
    starters: ['I use...', 'It would be lang="..."'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check your page has lang on html and a specific title. Mark any phrases in another language with lang. Language codes vary; check locally for the right one.',
  },
  notes: 'WCAG 3.1.1 Language of Page and 3.1.2 Language of Parts; 2.4.2 Page Titled. "tw" is the ISO 639-1 code for Twi. Screen reader support for Twi voices varies; marking the language is still correct.',
};

export default lesson;
