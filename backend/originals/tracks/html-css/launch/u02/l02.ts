import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 2 — an instant hover snap vs a smooth transition. Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Snap vs glide',
  summary: 'The hover colour works, but it snaps from orange to gold in an instant, like a light switch. Add one line and it glides. Compare them.',
  minutes: 11,
  outcomes: ['Add a transition so a change happens smoothly', 'Put the transition on the normal state, not the hover', 'Keep transitions short'],
  learn: [
    {
      kind: 'compare',
      title: 'Instant vs transition',
      before: { label: 'Snap', text: '.play-button { background-color: #FF9600; }\n.play-button:hover { background-color: #FFC83D; }\n\nThe colour jumps the moment the pointer arrives. It works, but it feels abrupt.' },
      after: { label: 'Glide', text: '.play-button {\n  background-color: #FF9600;\n  transition: background-color 0.2s;\n}\n.play-button:hover { background-color: #FFC83D; }\n\nThe colour fades over a fifth of a second, on the way in and on the way out. Same change, but it feels finished.' },
      notes: [
        'transition says: when this property changes, change it gradually.',
        'Put it on the normal rule, so it works both ways.',
        'Short is best: around 0.15 to 0.3 seconds.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Feel the difference',
      caption: 'Point at each button. The second one glides.',
      code: '<style>\n  body { background-color: #14213D; font-family: Verdana, sans-serif; }\n  a { display: inline-block; margin: 8px; padding: 12px 20px; background-color: #FF9600; color: #14213D; border-radius: 8px; }\n  a:hover { background-color: #FFC83D; }\n  .glide { transition: background-color 0.2s; }\n</style>\n<a href="#a">Snap</a>\n<a class="glide" href="#b">Glide</a>\n',
      challenge: 'Change 0.2s to 2s. Too slow? Find the speed that feels right.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'transition: background-color 0.2s; on the normal rule. Short and subtle.',
    },
  ],
  apply: {
    scenario: 'Snap vs glide.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does transition: background-color 0.2s do?',
        options: [
          { text: 'Changes the colour every 0.2 seconds', why: 'It smooths a change; it doesn\'t repeat.' },
          { text: 'When the background colour changes, it changes gradually over 0.2 seconds' },
          { text: 'Delays the page by 0.2 seconds', why: 'It only affects that property\'s changes.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the hover glide: add transition: background-color 0.2s to the normal .play-button rule',
        starter: '<style>\n  .play-button { background-color: #FF9600; color: #14213D; }\n  .play-button:hover { background-color: #FFC83D; }\n</style>\n<a class="play-button" href="#play">Play</a>\n',
        solution: '<style>\n  .play-button { background-color: #FF9600; color: #14213D; transition: background-color 0.2s; }\n  .play-button:hover { background-color: #FFC83D; }\n</style>\n<a class="play-button" href="#play">Play</a>\n',
        hint: 'transition: background-color 0.2s; inside .play-button { }',
        checks: [
          { message: 'A transition', codeIncludes: 'transition' },
          { message: 'Over 0.2 seconds', codeIncludes: '0.2s' },
          { message: 'On the normal button', dom: { selector: '.play-button', style: 'transition' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good transition speed, or not?',
        groups: ['Feels right', 'Too slow or too fast'],
        items: [
          { text: '0.2s', group: 0 },
          { text: '3s', group: 1 },
          { text: '0.15s', group: 0 },
          { text: '0.001s', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the transition to what it means.',
        pairs: [
          ['transition', 'Change gradually'],
          ['background-color', 'Which property'],
          ['0.2s', 'How long it takes'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I put the transition on the :hover rule, and it only glides on the way in.',
        options: [
          { text: 'Move it to the normal rule. Then it applies on the way in and on the way out.' },
          { text: 'Transitions only work one way.', why: 'On the normal rule they work both ways.' },
          { text: 'Add it twice.', why: 'Once, on the normal rule, is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the transition that will feel sluggish.',
        language: 'css',
        lines: ['.card { transition: background-color 0.2s; }', '.play-button { transition: background-color 4s; }', '.tag { transition: color 0.15s; }'],
        bug: 1,
        explanation: 'Four seconds for a hover is far too slow. People will wonder if it\'s broken.',
        fix: '.play-button { transition: background-color 0.2s; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The pointer leaves the button. What happens to the colour?',
        code: '.play-button { background-color: #FF9600; transition: background-color 0.2s; }\n.play-button:hover { background-color: #FFC83D; }',
        language: 'css',
        options: [
          { text: 'It snaps back instantly', why: 'The transition is on the normal rule, so it works both ways.' },
          { text: 'It fades back to orange over 0.2s' },
          { text: 'It stays gold', why: ':hover ends when the pointer leaves.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the transition.',
        language: 'css',
        template: '.play-button { [[1]]: background-color [[2]]; }',
        blanks: [['transition'], ['0.2s']],
        distractors: ['animation', '20s', 'hover'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property makes a change happen gradually? (one word)',
        answers: ['transition'],
        placeholder: 'A property',
      },
      {
        kind: 'mcq',
        prompt: 'Where should the transition go?',
        options: [
          { text: 'On the :hover rule only', why: 'Then it only works on the way in.' },
          { text: 'On body', why: 'Put it on the element that changes.' },
          { text: 'On the normal rule, so it works both ways' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which buttons or links on your page would feel better with a short transition?',
    starters: ['My...', 'would glide...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add transition: background-color 0.2s; to your button\'s normal rule, and try a few speeds.',
  },
  notes: 'CSS Transitions (W3C). Durations around 150–300ms are common UI guidance. The page check only confirms a transition is set on the element.',
};

export default lesson;
