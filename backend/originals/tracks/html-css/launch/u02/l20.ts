import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 20 — Chapter Challenge: Mensah Beats v1.7, alive without making anyone dizzy. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v1.7',
  summary: 'Three days to the end-of-year show. The site needs to feel alive for the fans arriving from the poster, and calm for Grandma. Build the motion for v1.7 from memory.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Add hover, focus and press feedback with transitions', 'Add a gentle animation that stops', 'Switch motion off for people who ask'],
  learn: [
    {
      kind: 'story',
      title: 'Alive and calm',
      beats: [
        { speaker: 'narrator', text: 'One week to uni. Three days to the show. Fans from the poster open the site: the countdown nudges twice, the covers lift when they point.' },
        { speaker: 'efua', text: 'It doesn\'t feel like a poster on a wall any more. It feels like it\'s listening.' },
        { speaker: 'narrator', text: 'Grandma opens it with Reduce motion on. Everything is still, and she can read every word.' },
        { speaker: 'kofi', text: 'Alive for the fans. Calm for Grandma. Same site.' },
        { speaker: 'tey', text: 'Build v1.7 from memory. Next chapter: making sure everyone can use the site, whatever they use to browse.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'v1.6', body: 'A booking form with labels, the right types, required fields and honest privacy.' },
        { title: 'v1.7 (tonight)', body: 'Motion with a purpose: hover and focus lifts, press squeezes, smooth timing, a countdown that nudges twice, and a reduced-motion safety net.', code: '@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }', language: 'css' },
        { title: 'Next chapter', body: 'Everyone can use it: semantic structure, keyboard and screen reader checks, headings, and skip links.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v1.7.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the timing. .card gets transition transform 200ms ease-out',
        starter: '<style>\n  .card { background-color: #1F2E52; }\n\n</style>\n<a class="card" href="#rain">Rain on Zinc</a>\n',
        solution: '<style>\n  .card { background-color: #1F2E52; transition: transform 200ms ease-out; }\n</style>\n<a class="card" href="#rain">Rain on Zinc</a>\n',
        hint: 'transition: transform 200ms ease-out;',
        checks: [
          { message: 'The card has a transition', dom: { selector: '.card', style: 'transition' } },
          { message: 'For transform', codeIncludes: 'transform 200ms' },
          { message: 'With a natural easing', codeIncludes: 'ease-out' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: the reaction. .card:hover, .card:focus-visible get transform translateY(-4px); .card:active gets scale(0.97)',
        starter: '<style>\n  .card { transition: transform 200ms ease-out; }\n\n</style>\n<a class="card" href="#rain">Rain on Zinc</a>\n',
        solution: '<style>\n  .card { transition: transform 200ms ease-out; }\n  .card:hover, .card:focus-visible { transform: translateY(-4px); }\n  .card:active { transform: scale(0.97); }\n</style>\n<a class="card" href="#rain">Rain on Zinc</a>\n',
        hint: 'Two rules: hover + focus-visible, then active.',
        checks: [
          { message: 'Lift for mouse', codeIncludes: ':hover' },
          { message: 'And keyboard', codeIncludes: ':focus-visible' },
          { message: 'The lift', codeIncludes: 'translateY(-4px)' },
          { message: 'A press squeeze', codeIncludes: ':active' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of v1.7, or left out on purpose?',
        groups: ['In v1.7', 'Left out'],
        items: [
          { text: 'A countdown that nudges twice', group: 0 },
          { text: 'A flashing red banner', group: 1 },
          { text: 'A gold focus outline', group: 0 },
          { text: 'An endless sliding strip', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: the countdown. Write @keyframes nudge with 50% { transform: scale(1.03); }, and give .countdown animation nudge 1.5s ease-in-out 2',
        starter: '<style>\n  .countdown { background-color: #FFC83D; color: #14213D; padding: 12px; }\n\n</style>\n<p class="countdown">3 days to the end-of-year show</p>\n',
        solution: '<style>\n  .countdown { background-color: #FFC83D; color: #14213D; padding: 12px; animation: nudge 1.5s ease-in-out 2; }\n  @keyframes nudge { 50% { transform: scale(1.03); } }\n</style>\n<p class="countdown">3 days to the end-of-year show</p>\n',
        hint: '@keyframes nudge { 50% { transform: scale(1.03); } } and the animation on .countdown.',
        checks: [
          { message: 'Keyframes called nudge', codeIncludes: '@keyframes nudge' },
          { message: 'A gentle grow', codeIncludes: 'scale(1.03)' },
          { message: 'The banner runs it', dom: { selector: '.countdown', style: 'animation' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How long does the countdown nudge in total?',
        code: '.countdown { animation: nudge 1.5s ease-in-out 2; }',
        language: 'css',
        options: [
          { text: '1.5 seconds', why: 'It plays twice.' },
          { text: '3 seconds, then it\'s still' },
          { text: 'Forever', why: 'The count is 2.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would hurt someone.',
        language: 'css',
        lines: ['.countdown { animation: nudge 1.5s ease-in-out 2; }', '.alert { animation: flash 0.1s linear infinite; }', '.card:active { transform: scale(0.97); }'],
        bug: 1,
        explanation: 'Ten flashes a second, forever: dangerous for people with photosensitive epilepsy. Remove it.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'For the show, can we make the whole page shake with excitement?',
        options: [
          { text: 'Shaking would be hard to read and could make people feel ill. The countdown nudge says "exciting" without that.' },
          { text: 'Yes, shake it.', why: 'Disorienting and unkind.' },
          { text: 'Only on phones.', why: 'Not on any screen.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem from this chapter to its fix.',
        pairs: [
          ['Colour snaps on hover', 'A transition'],
          ['Gallery judders', 'Animate transform, not margin'],
          ['Phone users never see hover', ':active, and nothing hidden behind hover'],
          ['Grandma feels dizzy', 'prefers-reduced-motion'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Final step: the safety net. Inside @media (prefers-reduced-motion: reduce), * gets animation none !important and transition none !important',
        starter: '<style>\n  .card { transition: transform 200ms ease-out; }\n  .countdown { animation: nudge 1.5s ease-in-out 2; }\n\n</style>\n<p class="countdown">3 days to go</p>\n',
        solution: '<style>\n  .card { transition: transform 200ms ease-out; }\n  .countdown { animation: nudge 1.5s ease-in-out 2; }\n  @media (prefers-reduced-motion: reduce) {\n    * { animation: none !important; transition: none !important; }\n  }\n</style>\n<p class="countdown">3 days to go</p>\n',
        hint: '@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }',
        checks: [
          { message: 'Listens for reduced motion', codeIncludes: 'prefers-reduced-motion' },
          { message: 'Stops animations', codeIncludes: 'animation: none' },
          { message: 'Stops transitions', codeIncludes: 'transition: none' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Show keyboard users where they are.',
        language: 'css',
        template: ':focus-visible { [[1]]: 3px solid #FFC83D; outline-[[2]]: 3px; }',
        blanks: [['outline'], ['offset']],
        distractors: ['border', 'width', 'margin'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats is alive without making anyone dizzy? (e.g. v1.6)',
        answers: ['v1.7', '1.7'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'Ask two people to use your page: one who likes motion, one who turns it off. What did each say?',
    starters: ['The first said...', 'The second said...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Give your own site purposeful motion and a reduced-motion safety net, test it every way you can, and upload it.',
  },
  notes: 'Chapter 2 finale of Course 3. Next chapter: Everyone can use it (accessibility).',
};

export default lesson;
