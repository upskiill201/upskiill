import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 19 — the whole changelog, v0.1 to v2.0: the track in one page. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The whole changelog',
  summary: 'Two in the morning, packing. Kofi writes the full changelog page, every version since v0.1. It\'s the whole track, in one list. Tap each part.',
  minutes: 11,
  outcomes: ['Read the full story of a site as a changelog', 'Name what each course added', 'Recall the key idea of each version'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '<h1>What\'s changed</h1>\n<h2>v2.0: Launch night</h2>\n<p>Checked, tidied, backed up and relaunched.</p>\n<h2>v1.9: Found on search</h2>\n<p>Titles, descriptions, previews, fast images.</p>\n<h2>v1.8: Everyone can use it</h2>\n<p>Skip link, focus styles, contrast, alt text.</p>\n<h2>v1.6 to v1.7: Booking and motion</h2>\n<p>A booking form, then kind, purposeful motion.</p>\n<h2>v1.1 to v1.5: Responsive</h2>\n<p>Boxes, classes, Flexbox, Grid, phones first.</p>\n<h2>v1.0: Live</h2>\n<p>The first version on the internet.</p>\n<h2>v0.1: One line</h2>\n<p>I make beats.</p>',
      hotspots: [
        { phrase: 'v2.0: Launch night', note: 'This chapter: the checklist, the 404 page, a tidy folder, the upload and a calm fix.' },
        { phrase: 'v1.9: Found on search', note: 'Chapter 4: what helps people and search engines find you, honestly.' },
        { phrase: 'v1.8: Everyone can use it', note: 'Chapter 3: keyboard, screen readers, contrast, zoom.' },
        { phrase: 'Booking and motion', note: 'Chapters 1 and 2: forms that work for everyone, and motion that helps.' },
        { phrase: 'v1.1 to v1.5: Responsive', note: 'Course 2: layout that fits every screen.' },
        { phrase: 'v1.0: Live', note: 'Course 1: HTML, CSS, colour and type, then online for the first time.' },
        { phrase: 'v0.1: One line', note: 'Where it all started.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The changelog page',
      caption: 'Kofi\'s full changelog, newest first, styled with the site\'s colours.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; padding: 16px; }\n  h1 { color: #FF9600; }\n  h2 { color: #FFC83D; margin-bottom: 0; font-size: 1.1rem; }\n  p { margin-top: 4px; }\n</style>\n<main>\n  <h1>What\'s changed</h1>\n  <h2>v2.0: Launch night</h2>\n  <p>Checked, tidied, backed up and relaunched.</p>\n  <h2>v1.9: Found on search</h2>\n  <p>Titles, descriptions, previews, fast images.</p>\n  <h2>v1.8: Everyone can use it</h2>\n  <p>Skip link, focus styles, contrast, alt text.</p>\n  <h2>v1.0: Live</h2>\n  <p>The first version on the internet.</p>\n  <h2>v0.1: One line</h2>\n  <p>I make beats.</p>\n</main>\n',
      challenge: 'Add the v1.5 entry in the right place.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Every version added one layer. Twelve weeks, one step at a time.',
    },
  ],
  apply: {
    scenario: 'The whole changelog.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the versions in order, oldest first.',
        lines: ['v0.1: one line', 'v1.0: live', 'v1.5: phones first', 'v1.8: everyone can use it', 'v2.0: launch night'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each version to its big idea.',
        pairs: [
          ['v1.0', 'Online for the first time'],
          ['v1.6', 'A booking form'],
          ['v1.8', 'Access for everyone'],
          ['v1.9', 'Found on search'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the v2.0 entry at the top, under the h1: an h2 "v2.0: Launch night" and a paragraph',
        starter: '<main>\n  <h1>What\'s changed</h1>\n\n  <h2>v1.9: Found on search</h2>\n  <p>Titles, descriptions, previews.</p>\n</main>\n',
        solution: '<main>\n  <h1>What\'s changed</h1>\n  <h2>v2.0: Launch night</h2>\n  <p>Checked, tidied, backed up and relaunched.</p>\n  <h2>v1.9: Found on search</h2>\n  <p>Titles, descriptions, previews.</p>\n</main>\n',
        hint: '<h2>v2.0: Launch night</h2> then a <p>, right after the h1.',
        checks: [
          { message: 'Two versions', dom: { selector: 'h2', count: 2 } },
          { message: 'v2.0 comes first', dom: { selector: 'h1 + h2', text: 'v2.0' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which course was it in?',
        groups: ['Course 1 or 2', 'Course 3'],
        items: [
          { text: 'Going live for the first time', group: 0 },
          { text: 'The 404 page', group: 1 },
          { text: 'Phones first', group: 0 },
          { text: 'Preview cards', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write changelog entries newest first?',
        options: [
          { text: 'Browsers require it', why: 'It\'s for readers.' },
          { text: 'Visitors usually want to know what\'s new' },
          { text: 'It\'s random', why: 'Newest first helps readers.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'You should keep v0.1 on the changelog. It\'s embarrassing!',
        options: [
          { text: 'That\'s why I\'m keeping it. It shows how far it came.' },
          { text: 'Delete it.', why: 'It shows the journey.' },
          { text: 'Pretend it started at v2.0.', why: 'Honesty is the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the entry with the wrong idea.',
        lines: ['v1.8: Everyone can use it', 'v1.9: Built the first page', 'v2.0: Launch night'],
        bug: 1,
        explanation: 'v1.9 was search. The first page was v0.1.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour are the version headings?',
        code: 'h1 { color: #FF9600; }\nh2 { color: #FFC83D; }',
        language: 'css',
        options: [
          { text: 'Orange (#FF9600)', why: 'That\'s the h1.' },
          { text: 'Gold (#FFC83D)' },
          { text: 'Cream', why: 'The h2 rule sets gold.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the summary.',
        template: 'Course 3 added forms, motion, [[1]], search and [[2]].',
        blanks: [['accessibility', 'access'], ['launch', 'launching']],
        distractors: ['tables', 'colours', 'frames'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What was the very first version of Mensah Beats? (e.g. v1.0)',
        answers: ['v0.1', '0.1'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'Write the changelog of your own learning in this track. What did each course give you?',
    starters: ['Course 1 gave me...', 'Course 3 gave me...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a changelog page for your own site, from your first version to now, newest first.',
  },
  notes: 'Version mapping matches the course: v1.0 end of Course 1, v1.1–v1.5 Course 2, v1.6–v2.0 Course 3 Ch1–5.',
};

export default lesson;
