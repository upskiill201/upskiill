import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 19 — the v1.7 motion stylesheet, read line by line. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Every moving part, explained',
  summary: 'Before v1.7 goes live, Miracle asks Kofi to justify every moving thing on the site. If he can\'t say what it\'s for, it goes. Tap each part.',
  minutes: 11,
  outcomes: ['Read a complete motion stylesheet', 'Say what each piece of motion is for', 'Spot motion that should be removed'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '.play-button, .card { transition: transform 200ms ease-out, background-color 200ms ease-out; }\n.play-button:hover, .play-button:focus-visible { background-color: #FFC83D; }\n.card:hover, .card:focus-visible { transform: translateY(-4px); }\n.play-button:active, .card:active { transform: scale(0.97); }\n:focus-visible { outline: 3px solid #FFC83D; outline-offset: 3px; }\n.countdown { animation: nudge 1.5s ease-in-out 2; }\n@keyframes nudge { 50% { transform: scale(1.03); } }\n@media (prefers-reduced-motion: reduce) {\n  * { animation: none !important; transition: none !important; }\n}',
      hotspots: [
        { phrase: 'transition: transform 200ms ease-out, background-color 200ms ease-out;', note: 'One timing for everything that reacts, so the whole site feels consistent.' },
        { phrase: '.card:hover, .card:focus-visible', note: 'The same lift for mouse and keyboard users. Purpose: "you can press this".' },
        { phrase: 'transform: scale(0.97);', note: 'A press squeeze. Purpose: "you pressed it", on phones too.' },
        { phrase: ':focus-visible { outline: 3px solid #FFC83D; outline-offset: 3px; }', note: 'Not motion, but the most important line here: keyboard users always know where they are.' },
        { phrase: 'animation: nudge 1.5s ease-in-out 2;', note: 'The only thing that moves on its own: a slow nudge, twice, so the countdown gets noticed. Never a flash.' },
        { phrase: '@media (prefers-reduced-motion: reduce) {', note: 'The safety net: for anyone who asked for less motion, it all stops. The words still say everything.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mensah Beats v1.7 motion',
      caption: 'The countdown nudges twice; cards and the Play button react to pointer, keyboard and press.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .countdown { background-color: #FFC83D; color: #14213D; text-align: center; padding: 12px; font-weight: bold; animation: nudge 1.5s ease-in-out 2; }\n  @keyframes nudge { 50% { transform: scale(1.03); } }\n  main { padding: 16px; }\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; }\n  .card { display: block; color: #FFF6E5; background-color: #1F2E52; border-radius: 12px; padding: 8px; }\n  .card img { width: 100%; height: auto; border-radius: 8px; }\n  .play-button { display: inline-block; margin-top: 16px; padding: 12px 20px; background-color: #FF9600; color: #14213D; border-radius: 8px; }\n  .play-button, .card { transition: transform 200ms ease-out, background-color 200ms ease-out; }\n  .play-button:hover, .play-button:focus-visible { background-color: #FFC83D; }\n  .card:hover, .card:focus-visible { transform: translateY(-4px); }\n  .play-button:active, .card:active { transform: scale(0.97); }\n  :focus-visible { outline: 3px solid #FFC83D; outline-offset: 3px; }\n  @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }\n</style>\n<p class="countdown">3 days to the end-of-year show: Sat 20 Dec</p>\n<main>\n  <section class="gallery">\n    <a class="card" href="#rain"><img src="cover-1.png" alt="" width="400" height="400">Rain on Zinc</a>\n    <a class="card" href="#jollof"><img src="cover-2.png" alt="" width="400" height="400">Jollof Bounce</a>\n  </section>\n  <a class="play-button" href="#play">Play Rain on Zinc</a>\n</main>\n',
      challenge: 'Tab through the whole page. Can you always see where you are?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'If you can\'t say what a piece of motion is for, delete it.',
    },
  ],
  apply: {
    scenario: 'Justify every moving part.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each piece of motion to its purpose.',
        pairs: [
          ['Card lift on hover and focus', '"You can press this"'],
          ['Squeeze on :active', '"You pressed it"'],
          ['Countdown nudge, twice', '"Notice this"'],
          ['Reduced-motion block', '"Less motion, as you asked"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which line is the most important for keyboard users?',
        options: [
          { text: '.countdown { animation: ... }', why: 'That\'s a nudge for everyone.' },
          { text: '@keyframes nudge', why: 'The focus outline matters most for keyboard users.' },
          { text: ':focus-visible { outline: 3px solid #FFC83D; }' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Give every pressable thing the same timing: .play-button, .card get transition transform 200ms ease-out',
        starter: '<style>\n\n  .card:hover { transform: translateY(-4px); }\n</style>\n<a class="card" href="#rain">Rain on Zinc</a> <a class="play-button" href="#play">Play</a>\n',
        solution: '<style>\n  .play-button, .card { transition: transform 200ms ease-out; }\n  .card:hover { transform: translateY(-4px); }\n</style>\n<a class="card" href="#rain">Rain on Zinc</a> <a class="play-button" href="#play">Play</a>\n',
        hint: '.play-button, .card { transition: transform 200ms ease-out; }',
        checks: [
          { message: 'Cards have the timing', dom: { selector: '.card', style: 'transition' } },
          { message: 'The Play button too', dom: { selector: '.play-button', style: 'transition' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep it, or delete it?',
        groups: ['Keep', 'Delete'],
        items: [
          { text: 'A focus outline', group: 0 },
          { text: 'A logo that spins on every page load', group: 1 },
          { text: 'A press squeeze on buttons', group: 0 },
          { text: 'A background that pulses forever', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the motion Miracle would delete.',
        language: 'css',
        lines: ['.card:hover { transform: translateY(-4px); }', 'h1 { animation: wobble 0.5s ease-in-out infinite; }', '.play-button:active { transform: scale(0.97); }'],
        bug: 1,
        explanation: 'A heading that wobbles forever has no purpose and never stops.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'What would happen if someone with Reduce motion on visited?',
        options: [
          { text: 'Every animation and transition switches off. The countdown is still, but its words still say "3 days".' },
          { text: 'They\'d see everything moving.', why: 'The safety net stops it.' },
          { text: 'The site would break.', why: 'It just stops moving.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many times does the countdown nudge?',
        code: '.countdown { animation: nudge 1.5s ease-in-out 2; }',
        language: 'css',
        options: [
          { text: 'Forever', why: 'The count is 2.' },
          { text: 'Once', why: 'The count is 2.' },
          { text: 'Twice, then it stays still' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The same reaction for mouse and keyboard.',
        language: 'css',
        template: '.card:[[1]], .card:[[2]] { transform: translateY(-4px); }',
        blanks: [['hover', 'focus-visible'], ['focus-visible', 'hover']],
        distractors: ['active', 'visited', 'checked'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats adds the motion? (e.g. v1.6)',
        answers: ['v1.7', '1.7'],
        placeholder: 'A version',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the motion stylesheet in a sensible order.',
        language: 'css',
        lines: ['.play-button, .card { transition: transform 200ms ease-out; }', '.card:hover, .card:focus-visible { transform: translateY(-4px); }', '.card:active { transform: scale(0.97); }', '@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }'],
      },
    ],
  },
  reflect: {
    prompt: 'List every moving thing on your own page. Can you say what each one is for?',
    starters: ['My... is for...', 'I\'ll delete...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a one-line purpose next to each animation and transition in your CSS as a comment. Delete any you can\'t justify.',
  },
  notes: 'v1.7 motion stylesheet. Shared selector lists keep timing consistent across components.',
};

export default lesson;
