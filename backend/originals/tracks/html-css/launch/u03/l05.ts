import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 (accessibility, main, landmarks, headings, announcements). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Kwesi finds the gigs',
  summary: 'Kwesi tries the new page. "Navigation. Main. Heading level 2, Gigs." He jumps straight there in two seconds and replies: "Now THAT I can use." Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Build a page skeleton from landmarks', 'Write a clean heading outline', 'Predict what a screen reader announces'],
  learn: [
    {
      kind: 'story',
      title: 'Two seconds',
      beats: [
        { speaker: 'narrator', text: 'Kwesi asks his screen reader for headings, hears "Gigs, heading level 2", and jumps there. Two seconds.' },
        { speaker: 'kofi', text: 'Nothing on the screen changed. It just makes sense now.' },
        { speaker: 'tey', text: 'Structure is invisible until you need it. Check it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: structure.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the skeleton: a header with a nav inside, then a main with an h1 "Mensah Beats", then a footer',
        starter: '\n',
        solution: '<header>\n  <nav><a href="#gigs">Gigs</a></nav>\n</header>\n<main>\n  <h1>Mensah Beats</h1>\n</main>\n<footer><small>v1.8</small></footer>\n',
        hint: '<header><nav>...</nav></header> <main><h1>...</h1></main> <footer>...</footer>',
        checks: [
          { message: 'A nav inside the header', dom: { selector: 'header nav', count: 1 } },
          { message: 'One main with the h1', dom: { selector: 'main h1', text: 'Mensah Beats' } },
          { message: 'A footer', dom: { selector: 'footer', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What\'s wrong with this outline?',
        code: '<h1>Mensah Beats</h1>\n<h3>Gigs</h3>\n<h3>Book me</h3>',
        language: 'html',
        options: [
          { text: 'It skips h2: sections should be h2' },
          { text: 'Nothing', why: 'It jumps from h1 to h3.' },
          { text: 'There should be no h1', why: 'One h1 is right.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Landmark, or not?',
        groups: ['Landmark', 'Not a landmark'],
        items: [
          { text: 'main', group: 0 },
          { text: 'div', group: 1 },
          { text: 'nav', group: 0 },
          { text: 'span', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the second h1.',
        language: 'html',
        lines: ['<h1>Mensah Beats</h1>', '<h2>Beats</h2>', '<h1>Book me</h1>'],
        bug: 2,
        explanation: 'One h1 per page. Book me is a section: h2.',
        fix: '<h2>Book me</h2>',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each element to roughly what\'s announced.',
        pairs: [
          ['<main>', 'Main landmark'],
          ['<h3>', 'Heading level 3'],
          ['<a href="#gigs">Gigs</a>', 'Gigs, link'],
          ['<img alt="">', 'Skipped: decoration'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'If the page looks the same, why does Kwesi hear it so differently?',
        options: [
          { text: 'His screen reader got updated.', why: 'The HTML changed.' },
          { text: 'He hears the elements, not the look. Landmarks and headings give him a map; divs don\'t.' },
          { text: 'It\'s random.', why: 'It depends on the elements used.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'About how many people worldwide have a significant disability?',
        options: [
          { text: 'About 1 in 1,000', why: 'Far more: about 1 in 6.' },
          { text: 'Nobody uses screen readers', why: 'Many people do.' },
          { text: 'About 1 in 6' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the outline.',
        language: 'html',
        template: '<h1>Mensah Beats</h1>\n<[[1]]>Gigs</h2>\n<[[2]]>End-of-year show</h3>',
        blanks: [['h2'], ['h3']],
        distractors: ['h1', 'h4', 'div'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which landmark holds the page\'s main links? (tag name)',
        answers: ['nav', '<nav>'],
        placeholder: 'A tag',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the page skeleton in order.',
        language: 'html',
        lines: ['<header>', '  <nav>...</nav>', '</header>', '<main>...</main>', '<footer>...</footer>'],
      },
    ],
  },
  reflect: {
    prompt: 'Listen to your own page with a screen reader for one minute. Can you find the main content?',
    starters: ['I could find...', 'I couldn\'t find...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check your page has header, nav, one main and footer, and a heading outline with one h1 and no skipped levels.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
