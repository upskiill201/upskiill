import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 3 — the pre-launch check: validator, links, form, phone, keyboard, speed. Steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The pre-launch check',
  summary: 'Two o\'clock on launch day. Miracle sits Kofi down with a cup of tea and a list. "We go through it in order, and we write down every problem. We fix after." Six steps.',
  minutes: 12,
  outcomes: ['Run a pre-launch check in a sensible order', 'Use an HTML checker to find mistakes', 'Test links, forms, phones, keyboard and speed'],
  learn: [
    {
      kind: 'steps',
      title: 'Six checks before launch',
      steps: [
        { title: '1. Check the HTML', body: 'Paste each page into a free HTML checker (search "W3C HTML validator"). It lists mistakes like a missing closing tag, an unclosed quote or a duplicate id. Fix the errors; read the warnings.', code: '<p>Book Kofi<p>\n<!-- the checker spots the missing </p> -->', language: 'html' },
        { title: '2. Click every link', body: 'Open every page and click every link and button. Each one should go somewhere real. Write down any that land on "page not found".' },
        { title: '3. Send the form', body: 'Fill in the booking form with test details and send it. Does the thanks page show? Does the message arrive? Try leaving a required box empty too.' },
        { title: '4. Phone and laptop', body: 'Open the site on a small phone and a laptop. Nothing should scroll sideways, text should be readable, buttons easy to tap.' },
        { title: '5. Keyboard and zoom', body: 'Use only Tab and Enter. Can you reach and use everything? Zoom to 200%. Does it still work?' },
        { title: '6. Speed and preview', body: 'Run a speed check (Chrome has Lighthouse built into its developer tools). Paste the link into a chat to see the preview card.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Find the mistakes a checker would find',
      caption: 'This page looks fine, but a checker would flag two problems. Can you spot them?',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  a { color: #FFC83D; }\n</style>\n<main>\n  <h1 id="top">Mensah Beats</h1>\n  <p>Beats from Accra.\n  <p id="top">Book Kofi for your event.</p>\n  <a href="book.html">Book now</a>\n</main>\n',
      challenge: 'Fix both: close the first paragraph, and give the second one a different id (or remove it).',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Check in order, write every problem down, then fix. Re-check what you fixed.',
    },
  ],
  apply: {
    scenario: 'The pre-launch check.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s checks in order.',
        lines: ['Check the HTML', 'Click every link', 'Send the form', 'Phone and laptop', 'Keyboard and zoom', 'Speed and preview'],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix what the checker found: close the first paragraph and change the second id to "book"',
        starter: '<main>\n  <h1 id="top">Mensah Beats</h1>\n  <p>Beats from Accra.\n  <p id="top">Book Kofi for your event.</p>\n</main>\n',
        solution: '<main>\n  <h1 id="top">Mensah Beats</h1>\n  <p>Beats from Accra.</p>\n  <p id="book">Book Kofi for your event.</p>\n</main>\n',
        hint: 'Add </p> after "Accra." and change id="top" on the paragraph to id="book".',
        checks: [
          { message: 'Only one element with id top', dom: { selector: '#top', count: 1 } },
          { message: 'The paragraph has id book', dom: { selector: 'p#book', count: 1 } },
          { message: 'The first paragraph is closed', codeIncludes: 'Accra.</p>' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each check to what it catches.',
        pairs: [
          ['HTML checker', 'A missing closing tag'],
          ['Clicking every link', 'A "page not found"'],
          ['Tab key only', 'A button you can\'t reach'],
          ['Pasting the link in a chat', 'A grey preview card'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Error to fix now, or nice-to-have for later?',
        groups: ['Fix before launch', 'Can wait'],
        items: [
          { text: 'The booking form doesn\'t send', group: 0 },
          { text: 'A slightly nicer hover colour', group: 1 },
          { text: 'The menu can\'t be reached by keyboard', group: 0 },
          { text: 'A fourth gallery animation', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does an HTML checker (validator) do?',
        options: [
          { text: 'Reads your HTML and lists mistakes, like unclosed tags or duplicate ids' },
          { text: 'Makes your site rank first', why: 'It only checks the code.' },
          { text: 'Fixes everything for you', why: 'It lists problems; you fix them.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I found a broken link. Should I fix it now, in the middle of the list?',
        options: [
          { text: 'Write it down and keep going. We fix everything together after, then re-check.' },
          { text: 'Stop everything and redesign the page.', why: 'Finish the list first.' },
          { text: 'Ignore it.', why: 'Write it down so it gets fixed.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line a checker would flag.',
        language: 'html',
        lines: ['<a href="gigs.html">Upcoming gigs</a>', '<img src="covers/kente-code.webp" width="600" height="600">', '<label for="email">Email</label>'],
        bug: 1,
        explanation: 'An img must have an alt attribute. Add alt="Kente Code cover".',
        fix: '<img src="covers/kente-code.webp" alt="Kente Code cover" width="600" height="600">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Kofi clicks this link, but there\'s no file called gig.html. What happens?',
        code: '<a href="gig.html">Upcoming gigs</a>',
        language: 'html',
        options: [
          { text: 'A "page not found" error' },
          { text: 'It opens gigs.html anyway', why: 'Browsers don\'t guess.' },
          { text: 'Nothing happens', why: 'It tries the address and finds nothing.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s rule.',
        template: 'Check in [[1]], write every problem [[2]], then fix.',
        blanks: [['order'], ['down']],
        distractors: ['secret', 'away', 'random'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which speed check is built into Chrome\'s developer tools? (one word)',
        answers: ['Lighthouse', 'lighthouse'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the six checks would find the most problems on your site?',
    starters: ['I think...', 'I\'ve never tried...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Run your home page through the W3C HTML validator. Fix every error it lists, then run it again until it\'s clean.',
  },
  notes: 'W3C Nu HTML Checker at validator.w3.org/nu. Lighthouse is in Chrome DevTools. Missing alt on img is a validator error.',
};

export default lesson;
