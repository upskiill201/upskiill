import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 18 — the learner's own page gets kind motion. Steps. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your page comes alive',
  summary: 'Your turn. Four steps to add motion to your own site that helps people, feels smooth, and switches off for anyone who asks.',
  minutes: 12,
  outcomes: ['Add hover, focus and press feedback to your own page', 'Add one small entrance animation', 'Respect reduced motion on your whole site'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps for your page',
      steps: [
        { title: '1. Feedback on what\'s pressable', body: 'Buttons and cards get the same small reaction on hover and focus, and a squeeze on press.', code: '.button { transition: transform 200ms ease-out; }\n.button:hover, .button:focus-visible { transform: translateY(-2px); }\n.button:active { transform: scale(0.97); }', language: 'css' },
        { title: '2. A visible focus outline', body: 'Everyone using a keyboard can see where they are.', code: ':focus-visible { outline: 3px solid #FFC83D; outline-offset: 3px; }', language: 'css' },
        { title: '3. One small entrance, at most', body: 'Something new, gently, once. Not everything.', code: '.new { animation: pulse 1.2s ease-in-out 2; }', language: 'css' },
        { title: '4. A reduced-motion safety net', body: 'For anyone who asked for less motion, switch off animations and transitions across the whole site.', code: '@media (prefers-reduced-motion: reduce) {\n  * { animation: none !important; transition: none !important; }\n}', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A page like yours, gently alive',
      caption: 'One button, one new item, a focus outline, and the safety net. Change it to suit your page.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .button { display: inline-block; padding: 12px 20px; background-color: #FF9600; color: #14213D; border-radius: 8px; transition: transform 200ms ease-out; }\n  .button:hover, .button:focus-visible { transform: translateY(-2px); }\n  .button:active { transform: scale(0.97); }\n  :focus-visible { outline: 3px solid #FFC83D; outline-offset: 3px; }\n  .new { display: inline-block; padding: 2px 8px; border-radius: 8px; background-color: #FFC83D; color: #14213D; animation: pulse 1.2s ease-in-out 2; }\n  @keyframes pulse { 50% { transform: scale(1.1); } }\n  @media (prefers-reduced-motion: reduce) {\n    * { animation: none !important; transition: none !important; }\n  }\n</style>\n<h2>My latest project <span class="new">New</span></h2>\n<p><a class="button" href="#contact">Say hello</a></p>\n',
      challenge: 'Change the button text and the heading to match your own page.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Feedback, a focus outline, one small entrance, and a reduced-motion safety net. That\'s plenty.',
    },
  ],
  apply: {
    scenario: 'Your own page.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Feedback on what\'s pressable', 'A visible focus outline', 'One small entrance', 'A reduced-motion safety net'],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the safety net: inside @media (prefers-reduced-motion: reduce), set * to animation none !important and transition none !important',
        starter: '<style>\n  .button { transition: transform 200ms ease-out; }\n  .new { animation: pulse 1.2s ease-in-out 2; }\n\n</style>\n<span class="new">New</span> <a class="button" href="#contact">Say hello</a>\n',
        solution: '<style>\n  .button { transition: transform 200ms ease-out; }\n  .new { animation: pulse 1.2s ease-in-out 2; }\n  @media (prefers-reduced-motion: reduce) {\n    * { animation: none !important; transition: none !important; }\n  }\n</style>\n<span class="new">New</span> <a class="button" href="#contact">Say hello</a>\n',
        hint: '@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }',
        checks: [
          { message: 'Listens for reduced motion', codeIncludes: 'prefers-reduced-motion' },
          { message: 'Stops animations', codeIncludes: 'animation: none' },
          { message: 'Stops transitions', codeIncludes: 'transition: none' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In Chapter 2 of the last course you learned to avoid !important. Why is it reasonable here?',
        options: [
          { text: 'It never matters', why: 'It usually causes trouble; here it\'s on purpose.' },
          { text: 'It\'s a deliberate safety net that must beat every other rule for people who asked for less motion' },
          { text: 'It makes animations faster', why: 'It turns them off.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good for your page, or too much?',
        groups: ['Good', 'Too much'],
        items: [
          { text: 'A 2px lift on buttons', group: 0 },
          { text: 'Every heading bouncing in', group: 1 },
          { text: 'One "New" badge pulsing twice', group: 0 },
          { text: 'A background that slowly spins forever', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that hides keyboard focus everywhere.',
        language: 'css',
        lines: [':focus-visible { outline: 3px solid #FFC83D; }', '* { outline: none; }', '.button:active { transform: scale(0.97); }'],
        bug: 1,
        explanation: 'It removes every focus outline on the page. Delete it.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'What\'s the one thing on your page that deserves to move?',
        options: [
          { text: 'Everything.', why: 'Too much motion gets in the way.' },
          { text: 'The background, forever.', why: 'Endless motion is tiring.' },
          { text: 'My newest project, a gentle pulse twice. Everything else just reacts when you use it.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to its job.',
        pairs: [
          [':hover, :focus-visible lift', 'Shows what\'s pressable'],
          [':active squeeze', 'Confirms a press'],
          [':focus-visible outline', 'Shows keyboard position'],
          ['reduced-motion block', 'Turns motion off on request'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Reduce motion is on. Does the New badge pulse?',
        code: '.new { animation: pulse 1.2s ease-in-out 2; }\n@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }',
        language: 'css',
        options: [
          { text: 'Yes, .new is more specific', why: '!important wins here.' },
          { text: 'No: the safety net turns every animation off' },
          { text: 'Only once', why: 'It\'s turned off completely.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Show keyboard focus everywhere.',
        language: 'css',
        template: ':[[1]] { outline: 3px solid #FFC83D; outline-[[2]]: 3px; }',
        blanks: [['focus-visible'], ['offset']],
        distractors: ['hover', 'width', 'gap'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many entrance animations should most pages have, at most? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What does your page feel like now? Does the motion help, or just decorate?',
    starters: ['It feels...', 'The motion helps by...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Add the four steps to your own site, then test with a mouse, the keyboard, a phone and Reduce motion on. Upload it.',
  },
  notes: 'A global reduced-motion override with !important is a widely used pattern. outline-offset adds space between the outline and the element.',
};

export default lesson;
