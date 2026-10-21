import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 12 — keyframes with several steps, animation-delay for a staggered arrival. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'One after another',
  summary: 'Efua wants the three newest covers to arrive one after another when the gallery opens: one, two, three, like cards being dealt. Miracle shows Kofi how. Tap each part.',
  minutes: 11,
  outcomes: ['Write keyframes with several steps', 'Stagger animations with animation-delay', 'Keep the starting state sensible'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '@keyframes deal {\n  0% { opacity: 0; transform: translateY(16px); }\n  60% { opacity: 1; transform: translateY(-2px); }\n  100% { opacity: 1; transform: translateY(0); }\n}\n.new-cover { animation: deal 500ms ease-out 1 both; }\n.new-cover:nth-child(2) { animation-delay: 100ms; }\n.new-cover:nth-child(3) { animation-delay: 200ms; }',
      hotspots: [
        { phrase: '0% { opacity: 0; transform: translateY(16px); }', note: 'The start: invisible, 16px lower.' },
        { phrase: '60% { opacity: 1; transform: translateY(-2px); }', note: 'Most of the way through: visible, and just past its spot. A tiny overshoot feels lively.' },
        { phrase: '100% { opacity: 1; transform: translateY(0); }', note: 'The end: settled in place.' },
        { phrase: '500ms ease-out 1 both', note: 'Half a second, once. both keeps the 0% look during the delay and the 100% look after, so covers don\'t flash before they arrive.' },
        { phrase: 'animation-delay: 100ms;', note: 'Wait 100ms before starting. Each cover waits a little longer: one, two, three.' },
        { phrase: ':nth-child(2)', note: 'Picks the second child of its parent. A quick way to pick "the second cover" without a new class.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Deal the covers',
      caption: 'Run it again to replay. Each cover arrives 100ms after the last.',
      code: '<style>\n  body { background-color: #14213D; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }\n  .gallery img { width: 100%; height: auto; border-radius: 6px; }\n  .new-cover { animation: deal 500ms ease-out 1 both; }\n  .new-cover:nth-child(2) { animation-delay: 100ms; }\n  .new-cover:nth-child(3) { animation-delay: 200ms; }\n  @keyframes deal {\n    0% { opacity: 0; transform: translateY(16px); }\n    60% { opacity: 1; transform: translateY(-2px); }\n    100% { opacity: 1; transform: translateY(0); }\n  }\n</style>\n<section class="gallery">\n  <img class="new-cover" src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400">\n  <img class="new-cover" src="cover-2.png" alt="Kumasi Express cover" width="400" height="400">\n  <img class="new-cover" src="cover-3.png" alt="Last Light Jamestown cover" width="400" height="400">\n</section>\n',
      challenge: 'Change the delays to 300ms and 600ms. Too slow to wait for?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Several keyframe steps make motion feel natural. Small delays (around 100ms) stagger things without making people wait.',
    },
  ],
  apply: {
    scenario: 'Dealing the covers.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['0%', 'Where it starts'],
          ['60%', 'A step along the way'],
          ['animation-delay', 'Wait before starting'],
          ['both', 'Hold the start and end looks'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Stagger the third cover: .new-cover:nth-child(3) gets animation-delay 200ms',
        starter: '<style>\n  .new-cover { animation: deal 500ms ease-out 1 both; }\n  .new-cover:nth-child(2) { animation-delay: 100ms; }\n\n  @keyframes deal { from { opacity: 0; } to { opacity: 1; } }\n</style>\n<section><img class="new-cover" src="cover-1.png" alt="Rain on Zinc cover"><img class="new-cover" src="cover-2.png" alt="Kumasi Express cover"><img class="new-cover" src="cover-3.png" alt="Last Light Jamestown cover"></section>\n',
        solution: '<style>\n  .new-cover { animation: deal 500ms ease-out 1 both; }\n  .new-cover:nth-child(2) { animation-delay: 100ms; }\n  .new-cover:nth-child(3) { animation-delay: 200ms; }\n  @keyframes deal { from { opacity: 0; } to { opacity: 1; } }\n</style>\n<section><img class="new-cover" src="cover-1.png" alt="Rain on Zinc cover"><img class="new-cover" src="cover-2.png" alt="Kumasi Express cover"><img class="new-cover" src="cover-3.png" alt="Last Light Jamestown cover"></section>\n',
        hint: '.new-cover:nth-child(3) { animation-delay: 200ms; }',
        checks: [
          { message: 'The third cover waits', codeIncludes: 'nth-child(3)' },
          { message: 'For 200ms', codeIncludes: '200ms' },
          { message: 'The third cover has the delay', dom: { selector: '.new-cover:nth-child(3)', style: 'animation-delay', styleValue: '200ms' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add both to the animation?',
        options: [
          { text: 'So covers stay invisible while waiting, and stay in place after, instead of flashing' },
          { text: 'So it plays twice', why: 'both is about the before and after looks.' },
          { text: 'It does nothing', why: 'Without it, delayed covers show before they arrive.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A sensible delay between staggered items, or too long?',
        groups: ['Sensible', 'Too long'],
        items: [
          { text: '100ms', group: 0 },
          { text: '2s', group: 1 },
          { text: '80ms', group: 0 },
          { text: '1.5s', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should all twelve covers deal in one by one?',
        options: [
          { text: 'Twelve would take ages, and people want to see them now. Just the three newest is a nice touch.' },
          { text: 'Yes, all twelve, 500ms apart.', why: 'That\'s six seconds of waiting.' },
          { text: 'Deal them every time you scroll.', why: 'Repeated motion gets tiring.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes the second cover start before the first.',
        language: 'css',
        lines: ['.new-cover:nth-child(1) { animation-delay: 200ms; }', '.new-cover:nth-child(2) { animation-delay: 100ms; }', '.new-cover:nth-child(3) { animation-delay: 300ms; }'],
        bug: 0,
        explanation: 'The first cover waits 200ms and the second only 100ms, so the order is wrong. Give the first 0ms.',
        fix: '.new-cover:nth-child(1) { animation-delay: 0ms; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which cover finishes arriving last?',
        code: '.new-cover { animation: deal 500ms ease-out 1 both; }\n.new-cover:nth-child(2) { animation-delay: 100ms; }\n.new-cover:nth-child(3) { animation-delay: 200ms; }',
        language: 'css',
        options: [
          { text: 'The third, at 700ms' },
          { text: 'The first', why: 'It has no delay, so it finishes first.' },
          { text: 'They all finish together', why: 'The delays stagger them.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Stagger the second cover.',
        language: 'css',
        template: '.new-cover:[[1]](2) { [[2]]: 100ms; }',
        blanks: [['nth-child'], ['animation-delay']],
        distractors: ['child', 'transition-delay', 'second'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property makes an animation wait before it starts? (hyphenated)',
        answers: ['animation-delay'],
        placeholder: 'A property',
      },
      {
        kind: 'mcq',
        prompt: 'What does :nth-child(2) pick?',
        options: [
          { text: 'An element that is the second child of its parent' },
          { text: 'Every second element on the page', why: 'Just the second child of each parent.' },
          { text: 'Elements with class 2', why: 'It\'s about position, not class.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What on your page could arrive one after another? Would it help, or just make people wait?',
    starters: ['My...', 'It would help because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Stagger two or three items on your page with animation-delay of about 100ms each. Keep the whole thing under a second.',
  },
  notes: 'animation-fill-mode both; :nth-child() structural pseudo-class (Selectors Level 4). Short staggers (50–100ms) are common UI practice.',
};

export default lesson;
