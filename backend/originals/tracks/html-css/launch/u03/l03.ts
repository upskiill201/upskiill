import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 3 — a heading outline: one h1, h2 for sections, h3 inside, no skipping, not for size. Steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'A page you can skim by ear',
  summary: 'Kwesi explains how he skims a page: he asks his screen reader for a list of headings, and jumps to the one he wants. On Mensah Beats, the list is a mess. Miracle\'s four steps to a clean heading outline.',
  minutes: 12,
  outcomes: ['Give a page one h1', 'Use h2 for sections and h3 inside them, without skipping levels', 'Choose heading levels for meaning, not size'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to a heading outline',
      steps: [
        { title: '1. One h1', body: 'The page\'s main title. On Kofi\'s home page: Mensah Beats.', code: '<h1>Mensah Beats</h1>', language: 'html' },
        { title: '2. h2 for each section', body: 'Beats, Gigs, About, Book me. Each section starts with an h2.', code: '<h2>Gigs</h2>', language: 'html' },
        { title: '3. h3 inside a section', body: 'Each gig or beat inside a section gets an h3. Don\'t jump from h2 to h4.', code: '<h2>Gigs</h2>\n<h3>End-of-year show</h3>', language: 'html' },
        { title: '4. Size with CSS, not with levels', body: 'If an h3 looks too big, change its font-size. Never pick h4 just because it\'s smaller.', code: 'h3 { font-size: 1.125rem; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A clean outline',
      caption: 'One h1, an h2 for each section, h3s inside. Read just the headings: they tell you the whole page.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  h3 { font-size: 1.125rem; color: #FF9600; }\n</style>\n<h1>Mensah Beats</h1>\n<h2>Beats</h2>\n<h3>Rain on Zinc</h3>\n<h3>Jollof Bounce</h3>\n<h2>Gigs</h2>\n<h3>End-of-year show, 20 Dec</h3>\n<h2>Book me</h2>\n',
      challenge: 'Add an About section with its own h2.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One h1. h2 for sections, h3 inside. No skipped levels. Size comes from CSS.',
    },
  ],
  apply: {
    scenario: 'Skimming by ear.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the outline in order.',
        language: 'html',
        lines: ['<h1>Mensah Beats</h1>', '<h2>Gigs</h2>', '<h3>End-of-year show</h3>', '<h2>Book me</h2>'],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the outline: there should be one h1 (Mensah Beats). Change the second h1 "Gigs" to an h2',
        starter: '<h1>Mensah Beats</h1>\n<h2>Beats</h2>\n<h1>Gigs</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<h2>Beats</h2>\n<h2>Gigs</h2>\n',
        hint: 'Change <h1>Gigs</h1> to <h2>Gigs</h2>.',
        checks: [
          { message: 'Only one h1', dom: { selector: 'h1', count: 1 } },
          { message: 'Gigs is a section heading', dom: { selector: 'h2', text: 'Gigs' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'For Kofi\'s home page: which level?',
        groups: ['h2', 'h3'],
        items: [
          { text: 'Gigs', group: 0 },
          { text: 'End-of-year show, 20 Dec', group: 1 },
          { text: 'Beats', group: 0 },
          { text: 'Rain on Zinc', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'An h3 looks too big. What\'s the right fix?',
        options: [
          { text: 'Change its font-size in CSS' },
          { text: 'Change it to an h5', why: 'Levels are for meaning; CSS handles size.' },
          { text: 'Make it a paragraph', why: 'It\'s still a heading.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the heading that skips a level.',
        language: 'html',
        lines: ['<h2>Gigs</h2>', '<h4>End-of-year show</h4>', '<h2>Book me</h2>'],
        bug: 1,
        explanation: 'From h2 straight to h4 skips h3. A screen reader user wonders what\'s missing.',
        fix: '<h3>End-of-year show</h3>',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I used h1 for every section so they all look big. Is that okay?',
        options: [
          { text: 'Use h2 for sections and make them big with CSS. One h1 tells everyone what the page is.' },
          { text: 'Yes, more h1s are better.', why: 'The outline becomes flat and confusing.' },
          { text: 'Use h6 so they\'re small.', why: 'Levels are for meaning.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each level to its job.',
        pairs: [
          ['h1', 'What the whole page is'],
          ['h2', 'Each section'],
          ['h3', 'Things inside a section'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Kwesi asks for a list of h2 headings. What does he hear?',
        code: '<h1>Mensah Beats</h1>\n<h2>Beats</h2>\n<h3>Rain on Zinc</h3>\n<h2>Gigs</h2>\n<h2>Book me</h2>',
        language: 'html',
        options: [
          { text: 'Beats, Gigs, Book me' },
          { text: 'Mensah Beats, Rain on Zinc', why: 'Those are h1 and h3.' },
          { text: 'Everything', why: 'Only the h2s.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A gig inside the Gigs section.',
        language: 'html',
        template: '<[[1]]>Gigs</h2>\n<[[2]]>End-of-year show</h3>',
        blanks: [['h2'], ['h3']],
        distractors: ['h1', 'h4', 'p'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many h1 headings should a page usually have? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write down only the headings of your own page. Do they tell the whole story?',
    starters: ['My headings are...', 'I\'m missing...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Fix your page\'s outline: one h1, h2 per section, h3 inside, no skipped levels. Adjust sizes with CSS.',
  },
  notes: 'Heading structure per WAI page structure tutorial; WCAG 1.3.1 and 2.4.6. One h1 per page is common best practice. Screen readers offer heading-list navigation (e.g. VoiceOver rotor, NVDA H key).',
};

export default lesson;
