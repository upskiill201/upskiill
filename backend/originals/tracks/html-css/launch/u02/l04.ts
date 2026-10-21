import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 4 — transform: translateY, scale, rotate; with a transition, a card that lifts. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Lift, grow, tilt',
  summary: 'Colour changes are nice, but Efua wants the beat cards to lift slightly when you point at them, like picking a record off a shelf. That\'s transform. Tap each part.',
  minutes: 11,
  outcomes: ['Move, scale and rotate an element with transform', 'Combine transform with a transition', 'Keep transforms small and subtle'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '.card {\n  transition: transform 200ms ease-out;\n}\n.card:hover {\n  transform: translateY(-4px);\n}\n\ntransform: scale(1.05);\ntransform: rotate(-2deg);\ntransform: translateY(-4px) scale(1.02);',
      hotspots: [
        { phrase: 'transition: transform 200ms ease-out;', note: 'Glide the transform, so the card floats up instead of jumping.' },
        { phrase: 'translateY(-4px)', note: 'Move up 4px (negative is up). The card lifts without pushing anything else around.' },
        { phrase: 'scale(1.05)', note: 'Grow to 105%. 1 is normal size; small numbers like 1.02 to 1.05 feel best.' },
        { phrase: 'rotate(-2deg)', note: 'Tilt 2 degrees anticlockwise. Fun for a sticker or a tag, too much for a whole card.' },
        { phrase: 'translateY(-4px) scale(1.02)', note: 'Combine them with a space: lift and grow a little at once.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Pick a record off the shelf',
      caption: 'Point at a card. It lifts and grows a tiny bit, smoothly.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; }\n  .card { background-color: #1F2E52; border-radius: 12px; padding: 8px; transition: transform 200ms ease-out; }\n  .card:hover { transform: translateY(-4px) scale(1.02); }\n  .card img { width: 100%; height: auto; border-radius: 8px; }\n</style>\n<section class="gallery">\n  <article class="card"><img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400"></article>\n  <article class="card"><img src="cover-2.png" alt="Jollof Bounce cover" width="400" height="400"></article>\n  <article class="card"><img src="cover-3.png" alt="Night Bus to Kumasi cover" width="400" height="400"></article>\n</section>\n',
      challenge: 'Try rotate(-2deg) on hover instead. Fun, or too much?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'transform moves things without moving anything else. Small numbers: 4px, 1.02, 2deg.',
    },
  ],
  apply: {
    scenario: 'Lift, grow, tilt.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each transform to what it does.',
        pairs: [
          ['translateY(-4px)', 'Moves up 4px'],
          ['scale(1.05)', 'Grows to 105%'],
          ['rotate(-2deg)', 'Tilts slightly'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Lift the card on hover: .card:hover gets transform translateY(-4px), and .card gets transition transform 200ms ease-out',
        starter: '<style>\n  .card { background-color: #1F2E52; padding: 8px; }\n\n</style>\n<article class="card">Rain on Zinc</article>\n',
        solution: '<style>\n  .card { background-color: #1F2E52; padding: 8px; transition: transform 200ms ease-out; }\n  .card:hover { transform: translateY(-4px); }\n</style>\n<article class="card">Rain on Zinc</article>\n',
        hint: 'transition on .card, transform on .card:hover.',
        checks: [
          { message: 'A hover rule', codeIncludes: ':hover' },
          { message: 'That lifts the card', codeIncludes: 'translateY(-4px)' },
          { message: 'Gliding', codeIncludes: 'transition' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does transform not push the cards below it down?',
        options: [
          { text: 'It moves how the element is drawn, not its place in the layout' },
          { text: 'It does push them', why: 'Transforms don\'t affect layout.' },
          { text: 'Because of the grid', why: 'Transforms never move neighbours.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Subtle, or too much for a card?',
        groups: ['Subtle', 'Too much'],
        items: [
          { text: 'scale(1.02)', group: 0 },
          { text: 'scale(2)', group: 1 },
          { text: 'translateY(-4px)', group: 0 },
          { text: 'rotate(180deg)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Should the cards lift 40px?',
        options: [
          { text: 'A few pixels is enough to feel like lifting. 40px would jump around and cover other cards.' },
          { text: 'Yes, the more the better.', why: 'Big moves are distracting.' },
          { text: 'Lift them 400px.', why: 'Way too far.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken transform.',
        language: 'css',
        lines: ['.card:hover { transform: translateY(-4px); }', '.card:hover { transform: translateY(-4px), scale(1.02); }', '.card:hover { transform: scale(1.02); }'],
        bug: 1,
        explanation: 'Combine transforms with a space, not a comma.',
        fix: '.card:hover { transform: translateY(-4px) scale(1.02); }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does scale(1) do?',
        code: '.card:hover { transform: scale(1); }',
        language: 'css',
        options: [
          { text: 'Nothing visible: 1 is normal size' },
          { text: 'Doubles the size', why: 'That\'s scale(2).' },
          { text: 'Makes it disappear', why: 'That\'s scale(0).' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Lift and grow a little.',
        language: 'css',
        template: '.card:hover { transform: [[1]](-4px) [[2]](1.02); }',
        blanks: [['translateY'], ['scale']],
        distractors: ['rotate', 'move', 'grow'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property moves, scales or rotates an element? (one word)',
        answers: ['transform'],
        placeholder: 'A property',
      },
      {
        kind: 'mcq',
        prompt: 'In translateY(-4px), what does the minus mean?',
        options: [
          { text: 'Up' },
          { text: 'Down', why: 'Positive Y is down; negative is up.' },
          { text: 'Smaller', why: 'It\'s a direction.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which items on your page would feel good if they lifted slightly when you pointed at them?',
    starters: ['My...', 'would lift...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your cards transition: transform 200ms ease-out and a hover transform of translateY(-4px).',
  },
  notes: 'CSS Transforms Level 1: transforms don\'t affect layout flow. Multiple transform functions are space-separated and applied in order.',
};

export default lesson;
