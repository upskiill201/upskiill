import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 18 — the learner's own site gets the full accessibility pass. Steps. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your site, for everyone',
  summary: 'Your turn. Four steps to give your own site the structure, names and shortcuts that make it work for everyone, then the fifteen-minute check.',
  minutes: 12,
  outcomes: ['Add landmarks, a heading outline and a skip link to your site', 'Name every link, button and image', 'Run the fifteen-minute check on your own site'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps for your site',
      steps: [
        { title: '1. The head', body: 'lang on html, utf-8, the viewport tag, and a title that names the page first.', code: '<html lang="en">\n<title>Projects | Your Name</title>', language: 'html' },
        { title: '2. The skeleton', body: 'A skip link first, then header with nav, one main with id="main", and a footer.', code: '<a class="skip-link" href="#main">Skip to main content</a>\n<header><nav>...</nav></header>\n<main id="main">...</main>\n<footer>...</footer>', language: 'html' },
        { title: '3. Headings and names', body: 'One h1, h2 per section. Every link says where it goes, every image has alt (or alt="" if decorative), icon-only links get aria-label.' },
        { title: '4. The fifteen-minute check', body: 'Automated tool, keyboard only, 200% zoom and big text, a screen reader minute. Fix, upload, repeat.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'An accessible page like yours',
      caption: 'Every piece from this chapter in one small page. Swap in your own name and sections.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Home | Your Name</title>\n  <style>\n    body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n    .skip-link { position: absolute; top: -100px; left: 8px; padding: 8px 12px; background-color: #FFC83D; color: #14213D; }\n    .skip-link:focus { top: 8px; }\n    header, main, footer { padding: 16px; }\n    a { color: #FFC83D; }\n    :focus-visible { outline: 3px solid #FFF6E5; outline-offset: 3px; }\n  </style>\n</head>\n<body>\n  <a class="skip-link" href="#main">Skip to main content</a>\n  <header><nav><a href="#projects">Projects</a> <a href="#contact">Contact</a></nav></header>\n  <main id="main">\n    <h1>Your Name</h1>\n    <h2 id="projects">Projects</h2>\n    <p>Something I made and I\'m proud of.</p>\n    <h2 id="contact">Contact</h2>\n    <p><a href="mailto:hello@example.com">Email hello@example.com</a></p>\n  </main>\n  <footer><small>Built by me, tested with a keyboard.</small></footer>\n</body>\n</html>\n',
      challenge: 'Tab through it once. Press Enter on the skip link.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Head, skeleton, headings and names, then the check. Repeat the check every time you change the layout.',
    },
  ],
  apply: {
    scenario: 'Your own site.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Fix the head: lang, charset, viewport, title', 'Build the skeleton with a skip link', 'Fix headings and names', 'Run the fifteen-minute check'],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix your page\'s outline: one h1 "Your Name", then the two section headings as h2',
        starter: '<main id="main">\n  <h1>Your Name</h1>\n  <h1>Projects</h1>\n  <h4>Contact</h4>\n</main>\n',
        solution: '<main id="main">\n  <h1>Your Name</h1>\n  <h2>Projects</h2>\n  <h2>Contact</h2>\n</main>\n',
        hint: 'Projects and Contact both become h2.',
        checks: [
          { message: 'Only one h1', dom: { selector: 'h1', count: 1 } },
          { message: 'Two section headings', dom: { selector: 'main h2', count: 2 } },
          { message: 'No skipped levels', dom: { selector: 'h4', count: 0 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'In the head, or in the body?',
        groups: ['Head (or html tag)', 'Body'],
        items: [
          { text: 'lang="en"', group: 0 },
          { text: 'The skip link', group: 1 },
          { text: '<title>Home | Your Name</title>', group: 0 },
          { text: '<main id="main">', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Your profile photo is next to your name in the h1. What alt should it have?',
        options: [
          { text: 'A short description, like "Me at the school science fair", or alt="" if it adds nothing new' },
          { text: 'alt="photo"', why: 'Say what it shows, or leave it empty if decorative.' },
          { text: 'No alt at all', why: 'Every image needs an alt attribute, even an empty one.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will fail the screen reader minute.',
        language: 'html',
        lines: ['<a href="#projects">Projects</a>', '<a href="https://example.com/me"><img src="ig.png" alt=""></a>', '<h2 id="contact">Contact</h2>'],
        bug: 1,
        explanation: 'An icon-only link with no name. Add aria-label or visible text.',
        fix: '<a href="https://example.com/me" aria-label="Me on Instagram"><img src="ig.png" alt=""></a>',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Who will you ask to test your site?',
        options: [
          { text: 'Friends on different devices, someone who uses big text, and, if I can, someone who uses a screen reader every day.' },
          { text: 'Nobody, the tool passed.', why: 'Tools miss a lot.' },
          { text: 'Only myself.', why: 'Others find what you miss.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the step that finds it.',
        pairs: [
          ['Missing alt', 'Automated check'],
          ['Can\'t reach a button', 'Keyboard only'],
          ['Text cut off', '200% zoom'],
          ['Links named "here"', 'Screen reader minute'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A keyboard user presses Tab once on your page. What do they see?',
        code: '<a class="skip-link" href="#main">Skip to main content</a>\n.skip-link:focus { top: 8px; }',
        language: 'html',
        options: [
          { text: 'The skip link, ready to press' },
          { text: 'Your h1', why: 'Headings aren\'t focusable; the skip link is first.' },
          { text: 'Nothing', why: 'The skip link appears on focus.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A specific page title.',
        language: 'html',
        template: '<title>[[1]] | [[2]]</title>',
        blanks: [['Projects', 'Home', 'Contact'], ['Your Name']],
        distractors: ['Untitled', 'page.html', 'index'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long does Miracle\'s check take, roughly? (a number of minutes)',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'After this chapter, what will you do differently every time you build a page?',
    starters: ['From now on I\'ll...', 'Before going live I\'ll...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Give your own site the four steps, run the fifteen-minute check, fix what it finds, and upload it.',
  },
  notes: 'Learner project step for Chapter 3.',
};

export default lesson;
