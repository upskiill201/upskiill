import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 (no flashing, staggered keyframes, reduced motion, the full set). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Grandma isn\'t dizzy',
  summary: 'Grandma turns on Reduce motion and opens the site. The covers are just there, the banner is still, and the gold focus outline still follows the keyboard. "Much better," she says. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Get attention without flashing', 'Stagger an entrance', 'Respect reduced motion'],
  learn: [
    {
      kind: 'story',
      title: 'Much better',
      beats: [
        { speaker: 'narrator', text: 'Reduce motion on. Nothing pulses, nothing deals in. Everything is still there.' },
        { speaker: 'narrator', text: 'Grandma nods. "Much better. And I can still see the show is in three days."' },
        { speaker: 'tey', text: 'The words carry the information; the motion was only a nudge. Check it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: kind motion.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Respect reduced motion: inside @media (prefers-reduced-motion: reduce), set .countdown animation none and .card transition none',
        starter: '<style>\n  .countdown { animation: nudge 1.5s ease-in-out 2; }\n  .card { transition: transform 200ms ease-out; }\n  @keyframes nudge { 50% { transform: scale(1.03); } }\n\n</style>\n<p class="countdown">3 days to the show</p><a class="card" href="#rain">Rain on Zinc</a>\n',
        solution: '<style>\n  .countdown { animation: nudge 1.5s ease-in-out 2; }\n  .card { transition: transform 200ms ease-out; }\n  @keyframes nudge { 50% { transform: scale(1.03); } }\n  @media (prefers-reduced-motion: reduce) {\n    .countdown { animation: none; }\n    .card { transition: none; }\n  }\n</style>\n<p class="countdown">3 days to the show</p><a class="card" href="#rain">Rain on Zinc</a>\n',
        hint: '@media (prefers-reduced-motion: reduce) { .countdown { animation: none; } .card { transition: none; } }',
        checks: [
          { message: 'Listens for reduced motion', codeIncludes: 'prefers-reduced-motion: reduce' },
          { message: 'Stops the banner', codeIncludes: 'animation: none' },
          { message: 'Stops the card glide', codeIncludes: 'transition: none' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe, or harmful?',
        groups: ['Safe', 'Harmful'],
        items: [
          { text: 'A slow pulse, twice', group: 0 },
          { text: 'Flashing 5 times a second', group: 1 },
          { text: 'A bold, still banner', group: 0 },
          { text: 'Red/white flashing forever', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'When does the third cover start its animation?',
        code: '.new-cover { animation: deal 500ms ease-out 1 both; }\n.new-cover:nth-child(3) { animation-delay: 200ms; }',
        language: 'css',
        options: [
          { text: 'Straight away', why: 'It has a 200ms delay.' },
          { text: 'After 500ms', why: 'The delay is 200ms.' },
          { text: '200ms after the page opens' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the animation that could trigger a seizure.',
        language: 'css',
        lines: ['.new { animation: pulse 1.2s ease-in-out 3; }', '.alert { animation: flash 0.2s linear infinite; }', '.card { transition: transform 200ms ease-out; }'],
        bug: 1,
        explanation: 'A 0.2s flash is five flashes a second, forever. Never.',
        fix: '.alert { animation: pulse 1.5s ease-in-out 2; }',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each technique to its job.',
        pairs: [
          ['animation-delay', 'Stagger arrivals'],
          ['both', 'Hold the start look while waiting'],
          ['prefers-reduced-motion', 'Listen to the motion setting'],
          ['A count like 2', 'Make it stop'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'With reduced motion on, should I hide the countdown banner completely?',
        options: [
          { text: 'Yes, hide it.', why: 'They still need the information.' },
          { text: 'No: keep the banner and its words; only the pulse goes.' },
          { text: 'Make it flash instead.', why: 'Definitely not.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the safest number of flashes per second on a website?',
        options: [
          { text: 'None' },
          { text: 'Ten', why: 'Dangerous.' },
          { text: 'Five', why: 'Above the three-per-second limit.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Keep covers hidden while they wait to arrive.',
        language: 'css',
        template: '.new-cover { animation: deal 500ms ease-out 1 [[1]]; }\n.new-cover:nth-child(2) { [[2]]: 100ms; }',
        blanks: [['both'], ['animation-delay']],
        distractors: ['none', 'transition', 'infinite'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which media feature reads the "Reduce motion" setting? (hyphenated)',
        answers: ['prefers-reduced-motion'],
        placeholder: 'A media feature',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the motion checklist in order.',
        lines: ['Does the motion have a purpose?', 'Is it short, and does it stop?', 'Does it avoid flashing?', 'Is it off for reduced motion?'],
      },
    ],
  },
  reflect: {
    prompt: 'Turn on Reduce motion and use your own page. Is anything missing or broken?',
    starters: ['With reduce motion on...', 'I need to fix...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check every animation on your page against the checklist: purposeful, short, stops, never flashes, off for reduced motion.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
