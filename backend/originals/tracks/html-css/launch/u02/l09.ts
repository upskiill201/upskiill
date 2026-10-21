import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 9 — animating layout properties (width, margin) vs transform and opacity. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Smooth vs juddery',
  summary: 'Kofi\'s first lift effect changed margin-top on hover. On his laptop it was fine. On Ama\'s old phone, the whole gallery juddered. Here\'s why, and the version that stays smooth.',
  minutes: 11,
  outcomes: ['Explain why animating layout properties can judder', 'Animate transform and opacity instead', 'Pick the smooth way to move, grow and fade'],
  learn: [
    {
      kind: 'compare',
      title: 'Moving the layout vs moving the picture',
      before: { label: 'Animating margin', text: '.card { transition: margin-top 200ms; }\n.card:hover { margin-top: -4px; }\n\nChanging margin moves the card in the layout, so the browser has to work out the positions of everything around it again, many times a second. On slower phones, the whole gallery judders.' },
      after: { label: 'Animating transform', text: '.card { transition: transform 200ms ease-out; }\n.card:hover { transform: translateY(-4px); }\n\nA transform moves only how the card is drawn. Nothing else needs working out again, so browsers can keep it smooth even on older phones. The same goes for opacity when fading.' },
      notes: [
        'width, height, margin and top change the layout: the browser redoes its sums.',
        'transform and opacity change only the drawing: usually smooth.',
        'Move with translate, grow with scale, fade with opacity.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Fade and lift, smoothly',
      caption: 'The card fades in from slightly lower when the page opens, using only opacity and transform.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .card { max-width: 240px; background-color: #1F2E52; border-radius: 12px; padding: 16px; animation: arrive 600ms ease-out 1; }\n  @keyframes arrive {\n    from { opacity: 0; transform: translateY(12px); }\n    to { opacity: 1; transform: translateY(0); }\n  }\n</style>\n<article class="card"><h2>Rain on Zinc</h2><p>Out now.</p></article>\n',
      challenge: 'Change 12px to 40px. Subtle, or too much?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Animate transform and opacity. Avoid animating width, height, margin and top.',
    },
  ],
  apply: {
    scenario: 'The juddering gallery.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the margin-top lift judder on Ama\'s phone?',
        options: [
          { text: 'Changing margin moves the layout, so the browser recalculates everything around it many times a second' },
          { text: 'Her phone can\'t show cards', why: 'It can. Layout animations are just heavy.' },
          { text: 'margin can\'t be animated', why: 'It can, but it\'s expensive.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make it smooth: replace the margin-top lift with transform translateY(-4px), and transition transform instead of margin-top',
        starter: '<style>\n  .card { transition: margin-top 200ms; }\n  .card:hover { margin-top: -4px; }\n</style>\n<article class="card">Rain on Zinc</article>\n',
        solution: '<style>\n  .card { transition: transform 200ms ease-out; }\n  .card:hover { transform: translateY(-4px); }\n</style>\n<article class="card">Rain on Zinc</article>\n',
        hint: 'transition: transform 200ms ease-out; and transform: translateY(-4px);',
        checks: [
          { message: 'Transitions the transform', codeIncludes: 'transform 200ms' },
          { message: 'Lifts with translateY', codeIncludes: 'translateY(-4px)' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Smooth to animate, or likely to judder?',
        groups: ['Smooth', 'May judder'],
        items: [
          { text: 'transform', group: 0 },
          { text: 'width', group: 1 },
          { text: 'opacity', group: 0 },
          { text: 'margin-top', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each effect to the smooth way to do it.',
        pairs: [
          ['Move', 'translate'],
          ['Grow', 'scale'],
          ['Fade', 'opacity'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'It\'s smooth on my laptop, so does it matter?',
        options: [
          { text: 'Most fans are on phones, many older than mine. transform keeps it smooth for them too.' },
          { text: 'No, laptops are what count.', why: 'Most visitors are on phones.' },
          { text: 'Only test on new phones.', why: 'Test on older ones too.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the animation most likely to judder.',
        language: 'css',
        lines: ['@keyframes a { to { opacity: 0.5; } }', '@keyframes b { to { width: 400px; } }', '@keyframes c { to { transform: scale(1.1); } }'],
        bug: 1,
        explanation: 'Animating width reworks the layout every frame. Use scale to grow.',
        fix: '@keyframes b { to { transform: scale(1.1); } }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the card do when the page opens?',
        code: '@keyframes arrive {\n  from { opacity: 0; transform: translateY(12px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.card { animation: arrive 600ms ease-out 1; }',
        language: 'css',
        options: [
          { text: 'Fades in while rising 12px into place, once' },
          { text: 'Disappears', why: 'It ends at opacity 1, fully visible.' },
          { text: 'Bounces forever', why: 'It plays once.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Fade in smoothly.',
        language: 'css',
        template: '@keyframes arrive {\n  from { [[1]]: 0; }\n  to { [[2]]: 1; }\n}',
        blanks: [['opacity'], ['opacity']],
        distractors: ['width', 'margin', 'display'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property fades an element in or out smoothly? (one word)',
        answers: ['opacity'],
        placeholder: 'A property',
      },
      {
        kind: 'mcq',
        prompt: 'What does opacity: 0 mean?',
        options: [
          { text: 'Fully see-through, invisible' },
          { text: 'Fully visible', why: 'That\'s opacity: 1.' },
          { text: 'Half visible', why: 'That\'s about 0.5.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Do any of your own animations change width, height or margin? How would you swap them?',
    starters: ['My...', 'I\'d use transform instead...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check your page\'s motion: make sure everything that moves uses transform or opacity. Test it on the oldest phone you can borrow.',
  },
  notes: 'Animating layout-affecting properties triggers layout (reflow) and paint each frame; transform and opacity can usually be composited (MDN "Animation performance and frame rate"). Kept general: "usually smooth".',
};

export default lesson;
