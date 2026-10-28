import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 16 — motion myths. Myth or fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Motion: myth or fact?',
  summary: 'Clinton watched a "10 insane CSS animations" video and is full of ideas. Some of what he learned is right. Sort the myths from the facts before any of it reaches Mensah Beats.',
  minutes: 11,
  outcomes: ['Separate motion myths from facts', 'Explain why more motion isn\'t better', 'Remember who motion can hurt'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'More animation makes a site look more professional.', isFact: false, explain: 'Professional sites use small, purposeful motion. Lots of it looks busy and gets in the way.' },
        { text: 'Animating transform is usually smoother than animating width.', isFact: true, explain: 'transform doesn\'t change the layout, so the browser has less work each frame.' },
        { text: 'Hover effects work the same on phones.', isFact: false, explain: 'Phones have no hovering pointer. Use :active for presses and never hide information behind hover.' },
        { text: 'Some people can be harmed by flashing content.', isFact: true, explain: 'Fast flashing can trigger seizures. Keep under three flashes a second; better, never flash.' },
        { text: 'If motion is in CSS, everyone sees it, no matter what.', isFact: false, explain: 'Good sites switch it off with prefers-reduced-motion for people who asked for less.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Less is more',
      caption: 'One small lift on hover. That\'s all this card needs to feel alive.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .card { display: inline-block; background-color: #1F2E52; border-radius: 12px; padding: 16px; color: #FFF6E5; transition: transform 200ms ease-out; }\n  .card:hover, .card:focus-visible { transform: translateY(-4px); }\n  @media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover, .card:focus-visible { transform: none; } }\n</style>\n<a class="card" href="#rain">Rain on Zinc</a>\n',
      challenge: 'Add rotate(10deg) and scale(1.3) to the hover. Better, or worse?',
    },
  ],
  apply: {
    scenario: 'Clinton\'s animation ideas.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'More animation is more professional', group: 0 },
          { text: 'Flashing can harm people', group: 1 },
          { text: 'Hover works the same on phones', group: 0 },
          { text: 'transform is usually smoother than width', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes motion look professional?',
        options: [
          { text: 'Being everywhere', why: 'Too much looks busy.' },
          { text: 'Being small, short and purposeful' },
          { text: 'Being as fast as possible', why: 'Short, not frantic.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Calm Clinton\'s card: replace the huge hover (rotate and scale(1.5)) with transform translateY(-4px)',
        starter: '<style>\n  .card { transition: transform 200ms ease-out; }\n  .card:hover { transform: rotate(20deg) scale(1.5); }\n</style>\n<a class="card" href="#rain">Rain on Zinc</a>\n',
        solution: '<style>\n  .card { transition: transform 200ms ease-out; }\n  .card:hover { transform: translateY(-4px); }\n</style>\n<a class="card" href="#rain">Rain on Zinc</a>\n',
        hint: '.card:hover { transform: translateY(-4px); }',
        checks: [
          { message: 'A small lift', codeIncludes: 'translateY(-4px)' },
          { message: 'Hover kept', codeIncludes: ':hover' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"More motion = professional"', 'Small and purposeful'],
          ['"Hover works on phones"', 'Use :active; don\'t hide info'],
          ['"Everyone sees CSS motion"', 'Respect reduced motion'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'The video had a whole page that spins on load. Can Kofi have that?',
        options: [
          { text: 'Yes, spin it twice.', why: 'Big spins are disorienting.' },
          { text: 'Spin only on phones.', why: 'Not kind on any screen.' },
          { text: 'It\'d be disorienting and could make people feel sick. A small arrival animation does the job.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s myth.',
        lines: ['Motion should tell people something.', 'Hover effects work on every phone.', 'Reduce motion is a real device setting.'],
        bug: 1,
        explanation: 'Phones have no hovering pointer.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Reduce motion is on. What happens when this card is hovered?',
        code: '.card:hover { transform: translateY(-4px); }\n@media (prefers-reduced-motion: reduce) { .card:hover { transform: none; } }',
        language: 'css',
        options: [
          { text: 'It lifts 4px', why: 'The media query cancels it.' },
          { text: 'It doesn\'t move' },
          { text: 'It disappears', why: 'Only the movement is cancelled.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the facts.',
        template: 'Animate [[1]] and opacity. Never flash more than [[2]] times a second.',
        blanks: [['transform'], ['three', '3']],
        distractors: ['width', 'ten', 'margin'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is "some people can be harmed by flashing" a myth or a fact? (one word)',
        answers: ['fact'],
        placeholder: 'Myth or fact',
      },
      {
        kind: 'mcq',
        prompt: 'Why test motion on an older phone?',
        options: [
          { text: 'Old phones can\'t show CSS', why: 'They can; heavy motion just struggles.' },
          { text: 'No reason', why: 'Many fans use older phones.' },
          { text: 'Heavy animations judder there first' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths did you believe?',
    starters: ['I thought...', 'Now I know...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN prefers-reduced-motion" and read the examples.',
  },
  notes: 'Large spinning/zooming page transitions can trigger vestibular symptoms (WCAG 2.3.3).',
};

export default lesson;
