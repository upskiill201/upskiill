import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 12 — the v2.0 stylesheet, top to bottom: tokens, base, layout, components, motion, phones. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'The v2.0 stylesheet',
  summary: 'Miracle asks Kofi to explain his own style.css, top to bottom, before it goes live. He finds it\'s in layers, each one from a different chapter. Tap each part.',
  minutes: 11,
  outcomes: ['Read a complete stylesheet in sensible layers', 'Say what each layer is for', 'Spot where a new rule belongs'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '/* 1. Base */\nbody { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\na { color: #FFC83D; }\n:focus-visible { outline: 3px solid #FFC83D; }\n\n/* 2. Layout */\n.site-header nav { display: flex; gap: 16px; flex-wrap: wrap; }\n.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; }\n\n/* 3. Components */\n.button { padding: 12px 24px; border-radius: 999px; transition: transform 0.15s ease-out; }\n\n/* 4. Motion */\n@media (prefers-reduced-motion: reduce) { * { transition: none; animation: none; } }\n\n/* 5. Bigger screens */\n@media (min-width: 768px) { main { max-width: 960px; margin: 0 auto; } }',
      hotspots: [
        { phrase: '/* 1. Base */', note: 'Course 1: colours, fonts and spacing for the whole page.' },
        { phrase: ':focus-visible', note: 'Chapter 3 of this course: keyboard users always see where they are.' },
        { phrase: 'display: flex', note: 'Course 2, Chapter 3: the nav in a row that wraps.' },
        { phrase: 'repeat(auto-fit, minmax(160px, 1fr))', note: 'Course 2, Chapter 4: a gallery that fits any screen.' },
        { phrase: 'transition: transform 0.15s ease-out', note: 'Chapter 2: a quick, kind hover.' },
        { phrase: 'prefers-reduced-motion', note: 'Chapter 2: motion switches off for people who ask for less.' },
        { phrase: '(min-width: 768px)', note: 'Course 2, Chapter 5: phones first, then bigger screens.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Layers in action',
      caption: 'A short version of the stylesheet. Make the preview narrow and wide.',
      code: '<style>\n  /* 1. Base */\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n  a { color: #FFC83D; }\n  /* 2. Layout */\n  main { padding: 16px; }\n  .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; }\n  .gallery img { width: 100%; height: auto; border-radius: 12px; }\n  /* 3. Components */\n  .button { display: inline-block; margin-top: 16px; padding: 12px 24px; background-color: #FF9600; color: #14213D; border-radius: 999px; text-decoration: none; font-weight: bold; transition: transform 0.15s ease-out; }\n  .button:hover { transform: translateY(-2px); }\n  /* 4. Motion */\n  @media (prefers-reduced-motion: reduce) { * { transition: none; } }\n  /* 5. Bigger screens */\n  @media (min-width: 768px) { main { max-width: 960px; margin: 0 auto; } }\n</style>\n<main>\n  <h1>Mensah Beats</h1>\n  <section class="gallery">\n    <img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400">\n    <img src="cover-2.png" alt="Kente Code cover" width="400" height="400">\n    <img src="cover-3.png" alt="Labadi Waves cover" width="400" height="400">\n  </section>\n  <a class="button" href="book.html">Book Kofi</a>\n</main>\n',
      challenge: 'Add a footer style in the right layer.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Base, layout, components, motion, bigger screens. A new rule goes in the layer it belongs to.',
    },
  ],
  apply: {
    scenario: 'The v2.0 stylesheet.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to its layer.',
        pairs: [
          ['body { font-family: ... }', 'Base'],
          ['.gallery { display: grid; }', 'Layout'],
          ['.button { border-radius: 999px; }', 'Components'],
          ['prefers-reduced-motion', 'Motion'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add to the Components layer: give .card a background-color of #1F2E52 and padding of 16px',
        starter: '<style>\n  /* 1. Base */\n  body { background-color: #14213D; color: #FFF6E5; }\n  /* 3. Components */\n\n</style>\n<article class="card"><h2>Rain on Zinc</h2></article>\n',
        solution: '<style>\n  /* 1. Base */\n  body { background-color: #14213D; color: #FFF6E5; }\n  /* 3. Components */\n  .card { background-color: #1F2E52; padding: 16px; }\n</style>\n<article class="card"><h2>Rain on Zinc</h2></article>\n',
        hint: '.card { background-color: #1F2E52; padding: 16px; }',
        checks: [
          { message: 'Card background', dom: { selector: '.card', style: 'background-color', styleValue: '#1F2E52' } },
          { message: 'Card padding', dom: { selector: '.card', style: 'padding', styleValue: '16px' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the bigger-screens media query come last?',
        options: [
          { text: 'Phones first: later rules win, so the bigger-screen changes override the phone styles' },
          { text: 'Media queries must always be last', why: 'It\'s about which rule wins.' },
          { text: 'It doesn\'t matter where it goes', why: 'Order decides which rule wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which layer does it belong in?',
        groups: ['Base or layout', 'Components or motion'],
        items: [
          { text: 'a { color: #FFC83D; }', group: 0 },
          { text: '.button:hover { transform: ... }', group: 1 },
          { text: 'nav { display: flex; }', group: 0 },
          { text: 'transition: none for reduced motion', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that hides where keyboard users are.',
        language: 'css',
        lines: ['a { color: #FFC83D; }', ':focus-visible { outline: none; }', '.button { border-radius: 999px; }'],
        bug: 1,
        explanation: 'Never remove the focus outline without a clear replacement.',
        fix: ':focus-visible { outline: 3px solid #FFC83D; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Where would you put a new style for the 404 heading?',
        options: [
          { text: 'In Components, next to the other page parts, with a clear class name.' },
          { text: 'At the very top, before body.', why: 'It belongs with components.' },
          { text: 'In a new random file.', why: 'Keep one tidy stylesheet.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A visitor has reduced motion switched on. What happens when they hover the button?',
        code: '.button { transition: transform 0.15s ease-out; }\n.button:hover { transform: translateY(-2px); }\n@media (prefers-reduced-motion: reduce) { * { transition: none; } }',
        language: 'css',
        options: [
          { text: 'It still lifts, but instantly, with no animation' },
          { text: 'It animates slowly', why: 'Transitions are switched off.' },
          { text: 'The button disappears', why: 'Only the animation is removed.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the gallery.',
        language: 'css',
        template: '.gallery { display: [[1]]; grid-template-columns: repeat(auto-fit, [[2]](160px, 1fr)); }',
        blanks: [['grid'], ['minmax']],
        distractors: ['flex', 'block', 'max'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the layers in order.',
        lines: ['Base', 'Layout', 'Components', 'Motion', 'Bigger screens'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which CSS feature lets the site change on bigger screens? (two words)',
        answers: ['media query', 'media queries', '@media'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'Is your own stylesheet in layers, or one long pile?',
    starters: ['Mine is...', 'I\'ll add comments for...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add layer comments to your own style.css (Base, Layout, Components, Motion, Bigger screens) and move each rule to where it belongs.',
  },
  notes: 'Layer order is a convention for readability, not cascade layers (@layer). Reduced-motion block removes transitions, so state changes still apply instantly.',
};

export default lesson;
