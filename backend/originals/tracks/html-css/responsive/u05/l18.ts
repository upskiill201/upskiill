import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 18 — the learner's own page goes phones-first, then the full test. Steps. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your page, phones first',
  summary: 'Your turn to finish the course the way Kofi did. Four steps to make your own site work on every screen, ending with the ten-minute test.',
  minutes: 12,
  outcomes: ['Make your own page phones-first', 'Add breakpoints where your content needs them', 'Test your page on real screens'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps for your page',
      steps: [
        { title: '1. The head', body: 'Check your index.html has the viewport tag.', code: '<meta name="viewport" content="width=device-width, initial-scale=1">', language: 'html' },
        { title: '2. A phone base', body: 'Your base CSS should be one stacked column, images that fit, and a comfortable heading.', code: 'img { max-width: 100%; height: auto; }\nh1 { font-size: 2.25rem; }', language: 'css' },
        { title: '3. One or two breakpoints', body: 'Widen the preview slowly. Where it starts to look wrong, add a min-width query with the wider layout.', code: '@media (min-width: 700px) {\n  main { grid-template-columns: 2fr 1fr; }\n}', language: 'css' },
        { title: '4. The ten-minute test', body: '320px, 200% zoom, big text, real phones, sideways. Fix anything that breaks, then upload.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A page like yours, phones first',
      caption: 'A stacked base with one breakpoint. Swap in your own name and sections.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n  main { display: grid; gap: 16px; padding: 16px; }\n  h1 { font-size: 2.25rem; margin: 0; }\n  img { max-width: 100%; height: auto; border-radius: 8px; }\n  section { background-color: #1F2E52; border-radius: 12px; padding: 16px; }\n  @media (min-width: 700px) {\n    main { grid-template-columns: 2fr 1fr; }\n    h1 { font-size: 3.5rem; }\n  }\n</style>\n<main>\n  <section><h1>Your Name</h1><img src="cover-1.png" alt="A sunrise over the sea" width="400" height="400"></section>\n  <section><h2>About me</h2><p>A few lines about what you love.</p></section>\n</main>\n',
      challenge: 'Change the breakpoint to where YOUR content starts to look stretched.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Viewport tag, phone base, breakpoints from the content, then test. That\'s the whole method.',
    },
  ],
  apply: {
    scenario: 'Your own page.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Add the viewport tag', 'Write a phone base', 'Add breakpoints where the content needs them', 'Run the ten-minute test'],
      },
      {
        kind: 'writeCode',
        prompt: 'Your phone base: images get max-width 100% and height auto, and h1 is 2.25rem',
        starter: '<style>\n\n</style>\n<h1>Your Name</h1>\n<img src="cover-1.png" alt="A sunrise over the sea" width="400" height="400">\n',
        solution: '<style>\n  img { max-width: 100%; height: auto; }\n  h1 { font-size: 2.25rem; }\n</style>\n<h1>Your Name</h1>\n<img src="cover-1.png" alt="A sunrise over the sea" width="400" height="400">\n',
        hint: 'img { max-width: 100%; height: auto; } h1 { font-size: 2.25rem; }',
        checks: [
          { message: 'Images fit', dom: { selector: 'img', style: 'max-width', styleValue: '100%' } },
          { message: 'And keep their shape', dom: { selector: 'img', style: 'height', styleValue: 'auto' } },
          { message: 'A phone-sized heading', dom: { selector: 'h1', style: 'font-size', styleValue: '2.25rem' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of your phone base, or a wider-screen extra?',
        groups: ['Phone base', 'Wider-screen extra'],
        items: [
          { text: 'One stacked column', group: 0 },
          { text: 'A second column beside the main one', group: 1 },
          { text: 'img { max-width: 100%; height: auto; }', group: 0 },
          { text: 'A bigger h1', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where should your first breakpoint go?',
        options: [
          { text: 'At the width of your own phone', why: 'Follow the content, not a device.' },
          { text: 'Where your content starts to look stretched as you widen the preview' },
          { text: 'At 100px', why: 'Far too narrow to need a change.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that isn\'t phones-first.',
        language: 'css',
        lines: ['main { display: grid; gap: 16px; }', 'main { grid-template-columns: 2fr 1fr; }', '@media (min-width: 700px) { h1 { font-size: 3.5rem; } }'],
        bug: 1,
        explanation: 'Two columns in the base squeeze phones. Move them into the min-width query.',
        fix: '@media (min-width: 700px) { main { grid-template-columns: 2fr 1fr; } }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Who will you test your page with?',
        options: [
          { text: 'My own phone, a friend\'s older one, and someone who uses big text, plus 320px and 200% zoom.' },
          { text: 'Just my laptop.', why: 'Most visitors won\'t use your laptop.' },
          { text: 'Nobody, it looks fine.', why: 'Test before visitors find problems.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to why it matters.',
        pairs: [
          ['Viewport tag', 'Phones use their real width'],
          ['Phone base', 'Most visitors get the simple layout'],
          ['Breakpoints from content', 'They don\'t go out of date'],
          ['The test', 'Catches what you missed'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On your phone, how many columns does main have?',
        code: 'main { display: grid; }\n@media (min-width: 700px) { main { grid-template-columns: 2fr 1fr; } }',
        language: 'css',
        options: [
          { text: 'Two', why: 'Phones are under 700px.' },
          { text: 'One' },
          { text: 'Three', why: 'There are at most two.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Your first breakpoint.',
        language: 'css',
        template: '@media ([[1]]: 700px) {\n  main { grid-template-columns: [[2]]; }\n}',
        blanks: [['min-width'], ['2fr 1fr']],
        distractors: ['max-width', '1fr', 'device'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does Tey\'s full test take? (a number)',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'After this course, what can your page do that it couldn\'t before?',
    starters: ['Now it...', 'I\'m proudest of...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Make your own site phones-first with the four steps, run the ten-minute test, and upload the new version.',
  },
  notes: 'Learner project step for Chapter 5. Images use real width/height attributes (cover-1.png is 400×400).',
};

export default lesson;
