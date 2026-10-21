import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 14 — building the full motion set for the beat cards, step by step. Steps. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Motion, done properly',
  summary: 'Time to put the whole chapter together on the beat cards: a lift on hover and focus, a press effect, smooth timing, and a reduced-motion setting. Miracle\'s four steps.',
  minutes: 12,
  outcomes: ['Give cards a hover and focus lift with a transition', 'Add a press effect with :active', 'Switch the motion off for reduced-motion users'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to good motion',
      steps: [
        { title: '1. The timing, on the normal state', body: 'Decide what can move and how fast, once.', code: '.card { transition: transform 200ms ease-out; }', language: 'css' },
        { title: '2. Hover and keyboard focus together', body: 'The same lift for mouse and keyboard users, plus a clear outline for focus.', code: '.card:hover, .card:focus-visible { transform: translateY(-4px); }\n.card:focus-visible { outline: 3px solid #FFC83D; outline-offset: 3px; }', language: 'css' },
        { title: '3. A press', body: 'A tiny squeeze while it\'s being pressed, which works on phones too.', code: '.card:active { transform: scale(0.98); }', language: 'css' },
        { title: '4. Respect reduced motion', body: 'For people who asked for less motion, no lift and no animation. The outline stays.', code: '@media (prefers-reduced-motion: reduce) {\n  .card { transition: none; }\n  .card:hover, .card:focus-visible, .card:active { transform: none; }\n}', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Beat cards that feel right',
      caption: 'Point, Tab and press. Each card reacts the same way for everyone, and stays still for people who reduce motion.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }\n  .card { display: block; color: #FFF6E5; background-color: #1F2E52; border-radius: 12px; padding: 8px; transition: transform 200ms ease-out; }\n  .card img { width: 100%; height: auto; border-radius: 8px; }\n  .card:hover, .card:focus-visible { transform: translateY(-4px); }\n  .card:focus-visible { outline: 3px solid #FFC83D; outline-offset: 3px; }\n  .card:active { transform: scale(0.98); }\n  @media (prefers-reduced-motion: reduce) {\n    .card { transition: none; }\n    .card:hover, .card:focus-visible, .card:active { transform: none; }\n  }\n</style>\n<section class="gallery">\n  <a class="card" href="#rain"><img src="cover-1.png" alt="" width="400" height="400">Rain on Zinc</a>\n  <a class="card" href="#jollof"><img src="cover-2.png" alt="" width="400" height="400">Jollof Bounce</a>\n</section>\n',
      challenge: 'Tab to a card, then press Enter. Did you see the outline and the lift?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Timing on the normal state, the same lift for hover and focus, a press effect, and a reduced-motion block.',
    },
  ],
  apply: {
    scenario: 'Motion, done properly.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Set the transition on the normal state', 'Lift on hover and focus', 'Squeeze on press with :active', 'Switch it off for reduced motion'],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the press: .card:active gets transform scale(0.98)',
        starter: '<style>\n  .card { transition: transform 200ms ease-out; }\n  .card:hover, .card:focus-visible { transform: translateY(-4px); }\n\n</style>\n<a class="card" href="#rain">Rain on Zinc</a>\n',
        solution: '<style>\n  .card { transition: transform 200ms ease-out; }\n  .card:hover, .card:focus-visible { transform: translateY(-4px); }\n  .card:active { transform: scale(0.98); }\n</style>\n<a class="card" href="#rain">Rain on Zinc</a>\n',
        hint: '.card:active { transform: scale(0.98); }',
        checks: [
          { message: 'A press rule', codeIncludes: ':active' },
          { message: 'A tiny squeeze', codeIncludes: 'scale(0.98)' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which state is it for?',
        groups: ['Pointer or keyboard', 'Pressing'],
        items: [
          { text: '.card:hover', group: 0 },
          { text: '.card:active', group: 1 },
          { text: '.card:focus-visible', group: 0 },
          { text: 'scale(0.98)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the cover image have alt="" inside the card link?',
        options: [
          { text: 'The link text already says the beat name; the picture is decoration here' },
          { text: 'Alt text is never needed', why: 'It is; here the link text covers it.' },
          { text: 'To hide the image', why: 'It still shows; screen readers just skip repeating the name.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the reduced-motion rule that leaves the lift on.',
        language: 'css',
        lines: ['@media (prefers-reduced-motion: reduce) {', '  .card { transition: none; }', '}'],
        bug: 1,
        explanation: 'Without a transition, the lift still happens, just instantly. Also set transform: none on the hover, focus and active states.',
        fix: '  .card { transition: none; } .card:hover, .card:focus-visible, .card:active { transform: none; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'When I press a card on my phone, it squishes a tiny bit. Why?',
        options: [
          { text: 'That\'s :active: it shows you pressed it, even without a mouse.' },
          { text: 'Your phone is broken.', why: 'It\'s the press effect.' },
          { text: 'It\'s hover.', why: 'Phones don\'t hover; that\'s :active.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to who it helps.',
        pairs: [
          [':hover lift', 'Mouse users'],
          [':focus-visible outline', 'Keyboard users'],
          [':active squeeze', 'Phone users'],
          ['prefers-reduced-motion', 'People who get motion sick'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Reduce motion is on. A keyboard user Tabs to a card. What do they see?',
        code: '.card:focus-visible { transform: translateY(-4px); outline: 3px solid #FFC83D; }\n@media (prefers-reduced-motion: reduce) { .card:focus-visible { transform: none; } }',
        language: 'css',
        options: [
          { text: 'The gold outline, without the lift' },
          { text: 'Nothing', why: 'The outline is kept.' },
          { text: 'The lift and the outline', why: 'The lift is off for reduced motion.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Switch off the lift for reduced motion.',
        language: 'css',
        template: '@media (prefers-reduced-motion: reduce) {\n  .card:hover { transform: [[1]]; }\n  .card { [[2]]: none; }\n}',
        blanks: [['none'], ['transition']],
        distractors: ['0', 'animation-delay', 'off'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which state applies while a card is being pressed? (one word)',
        answers: ['active', ':active'],
        placeholder: 'A state',
      },
    ],
  },
  reflect: {
    prompt: 'Try your page as a mouse user, a keyboard user and a phone user. Did each get feedback?',
    starters: ['With a mouse...', 'On my phone...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your own cards the four-step motion set, then test with your device\'s Reduce motion setting on.',
  },
  notes: 'Decorative images inside links whose text already names the destination can use alt="" (WAI images tutorial, functional images). Reduced-motion block removes transforms, not focus indicators.',
};

export default lesson;
