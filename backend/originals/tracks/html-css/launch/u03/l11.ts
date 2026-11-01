import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 11 — a skip link: jump past the nav to main; hidden until focused. Story choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Tab, tab, tab, tab, tab',
  summary: 'David counts: on every page, he has to press Tab nine times to get past the logo and nav links before he reaches anything new. Choose how Kofi saves him the trip.',
  minutes: 11,
  outcomes: ['Explain what a skip link is for', 'Add a skip link to main as the first thing on the page', 'Hide it until it gets keyboard focus'],
  learn: [
    {
      kind: 'story',
      title: 'Nine presses',
      beats: [
        { speaker: 'david', text: 'Nine Tabs. Every page. Logo, Beats, Gigs, Videos, Merch, Book me, Instagram, TikTok, YouTube. Then the actual page.' },
        { speaker: 'kofi', text: 'Should I remove some links?' },
        { speaker: 'miracle', text: 'Keep them. Give keyboard users a shortcut instead: a skip link.' },
      ],
      choice: {
        prompt: 'How should Kofi help David?',
        options: [
          {
            text: 'Add a "Skip to main content" link as the very first thing, pointing to main. It stays hidden until it gets keyboard focus.',
            outcome: 'David presses Tab once, sees "Skip to main content", presses Enter, and he\'s straight in. Mouse users never notice it.',
            best: true,
          },
          {
            text: 'Delete most of the nav links.',
            outcome: 'Fewer Tabs, but now nobody can find the Merch or Videos pages.',
          },
          {
            text: 'Move the nav to the bottom of every page.',
            outcome: 'Now everyone who wants the menu has to scroll or tab through the whole page first.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>A skip link</strong> is a normal jump link, &lt;a href="#main"&gt;Skip to main content&lt;/a&gt;, placed first in the body, with id="main" on the main element. CSS moves it off the top of the screen with <strong>position: absolute</strong> and a negative top, then brings it back on :focus. So only keyboard users see it, exactly when they need it.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The hidden shortcut',
      caption: 'Click in the preview, then press Tab once. The skip link slides into view. Press Enter to jump to main.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .skip-link { position: absolute; top: -100px; left: 8px; padding: 12px 16px; background-color: #FFC83D; color: #14213D; border-radius: 8px; }\n  .skip-link:focus { top: 8px; }\n  header { padding: 16px; background-color: #1F2E52; }\n  nav a { color: #FF9600; margin-right: 12px; }\n  main { padding: 16px; }\n</style>\n<a class="skip-link" href="#main">Skip to main content</a>\n<header>\n  <nav><a href="#beats">Beats</a> <a href="#gigs">Gigs</a> <a href="#videos">Videos</a> <a href="#merch">Merch</a> <a href="#book">Book me</a></nav>\n</header>\n<main id="main">\n  <h1>Mensah Beats</h1>\n  <p>New every Friday.</p>\n</main>\n',
      challenge: 'Remove top: -100px from .skip-link. Now everyone sees it all the time.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Skip link first in the body, href="#main", and id="main" on main. Hidden off-screen until :focus.',
    },
  ],
  apply: {
    scenario: 'Nine presses.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a skip link do?',
        options: [
          { text: 'Lets keyboard users jump past the repeated nav straight to the main content' },
          { text: 'Skips the next song', why: 'It skips the nav, not the music.' },
          { text: 'Hides the nav', why: 'The nav stays; you just jump past it.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the skip link: first in the page, an a with class skip-link and href="#main" saying "Skip to main content", and give main id="main"',
        starter: '<header><nav><a href="#beats">Beats</a> <a href="#gigs">Gigs</a></nav></header>\n<main>\n  <h1>Mensah Beats</h1>\n</main>\n',
        solution: '<a class="skip-link" href="#main">Skip to main content</a>\n<header><nav><a href="#beats">Beats</a> <a href="#gigs">Gigs</a></nav></header>\n<main id="main">\n  <h1>Mensah Beats</h1>\n</main>\n',
        hint: '<a class="skip-link" href="#main">Skip to main content</a> at the top, and <main id="main">.',
        checks: [
          { message: 'A skip link', dom: { selector: 'a.skip-link[href="#main"]', count: 1 } },
          { message: 'It comes before the header', dom: { selector: 'a.skip-link ~ header', count: 1 } },
          { message: 'main is its target', dom: { selector: 'main#main', count: 1 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['A skip link', 'One Tab, then straight in'],
          ['Delete nav links', 'Pages become unfindable'],
          ['Nav at the bottom', 'Everyone has to go through the page first'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of a working skip link, or not?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'href="#main"', group: 0 },
          { text: 'display: none on the link', group: 1 },
          { text: 'id="main" on main', group: 0 },
          { text: 'Placing it at the bottom of the page', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why not hide the skip link with display: none?',
        options: [
          { text: 'display: none is fine.', why: 'Then nobody can reach it.' },
          { text: 'Make it the same colour as the background.', why: 'Keyboard users couldn\'t see it when it\'s focused.' },
          { text: 'display: none removes it for everyone, keyboard users too. It must be off-screen, then appear on focus.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the reason the skip link goes nowhere.',
        language: 'html',
        lines: ['<a class="skip-link" href="#main">Skip to main content</a>', '<header>...</header>', '<main id="content">...</main>'],
        bug: 2,
        explanation: 'The link points to #main but main\'s id is content. They must match.',
        fix: '<main id="main">...</main>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A keyboard user presses Tab once on this page. What do they see?',
        code: '.skip-link { position: absolute; top: -100px; }\n.skip-link:focus { top: 8px; }\n\n<a class="skip-link" href="#main">Skip to main content</a>',
        language: 'html',
        options: [
          { text: 'Nothing, it stays hidden', why: ':focus brings it back on screen.' },
          { text: 'The skip link slides into view at the top' },
          { text: 'The first nav link', why: 'The skip link comes first.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Bring the skip link back when focused.',
        language: 'css',
        template: '.skip-link { position: [[1]]; top: -100px; }\n.skip-link:[[2]] { top: 8px; }',
        blanks: [['absolute'], ['focus']],
        distractors: ['static', 'hover', 'none'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which id should main have for the skip link href="#main" to work? (one word)',
        answers: ['main'],
        placeholder: 'An id',
      },
      {
        kind: 'mcq',
        prompt: 'Where must the skip link go in the HTML?',
        options: [
          { text: 'First, before the header and nav' },
          { text: 'In the footer', why: 'Then you\'d tab through everything first.' },
          { text: 'Inside main', why: 'It must come before the nav to skip it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Count how many Tabs it takes to reach your page\'s main content. Would a skip link help?',
    starters: ['It takes...', 'A skip link would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add a skip link to your own page, give main id="main", and test it with Tab and Enter.',
  },
  notes: 'Skip links ("bypass blocks"): WCAG 2.4.1. Off-screen until focus via position: absolute; position isn\'t otherwise taught in this track and is explained only for this pattern. The order check confirms the skip link comes before the header.',
};

export default lesson;
