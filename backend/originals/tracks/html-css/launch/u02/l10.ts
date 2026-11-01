import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (focus-visible, active, history, keyframes, smooth properties). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: smooth on every phone',
  summary: 'The New badge pulses three times and rests. Tab through the buttons and a gold outline follows you. On Ama\'s old phone, nothing judders. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Show keyboard focus clearly', 'Write a keyframe animation that stops', 'Animate only smooth properties'],
  learn: [
    {
      kind: 'story',
      title: 'Nothing judders',
      beats: [
        { speaker: 'ama', text: 'The cards don\'t shake any more. And the New thing only wiggles a bit.' },
        { speaker: 'kofi', text: 'Three pulses. Then it lets you read.' },
        { speaker: 'tey', text: 'Purposeful and smooth. Check it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: motion that behaves.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Write the pulse: @keyframes pulse with 50% { transform: scale(1.1); }, and give .new the animation pulse 1.2s ease-in-out 3',
        starter: '<style>\n  .new { background-color: #FFC83D; color: #14213D; }\n\n</style>\n<span class="new">New</span>\n',
        solution: '<style>\n  .new { background-color: #FFC83D; color: #14213D; animation: pulse 1.2s ease-in-out 3; }\n  @keyframes pulse { 50% { transform: scale(1.1); } }\n</style>\n<span class="new">New</span>\n',
        hint: '@keyframes pulse { 50% { transform: scale(1.1); } } and animation on .new.',
        checks: [
          { message: 'Keyframes called pulse', codeIncludes: '@keyframes pulse' },
          { message: 'A gentle grow', codeIncludes: 'scale(1.1)' },
          { message: 'The badge runs it', dom: { selector: '.new', style: 'animation' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Smooth, or may judder?',
        groups: ['Smooth', 'May judder'],
        items: [
          { text: 'transform: translateY(-4px)', group: 0 },
          { text: 'height growing from 0 to 300px', group: 1 },
          { text: 'opacity fading', group: 0 },
          { text: 'margin-left sliding', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How long does this play in total?',
        code: '.new { animation: pulse 1.5s ease-in-out 2; }',
        language: 'css',
        options: [
          { text: '1.5 seconds', why: 'It plays twice.' },
          { text: 'Forever', why: 'The count is 2.' },
          { text: '3 seconds' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that leaves keyboard users lost.',
        language: 'css',
        lines: ['a:focus-visible { outline: 3px solid #FFC83D; }', 'button:focus-visible { outline: none; }', 'a:active { transform: scale(0.97); }'],
        bug: 1,
        explanation: 'No visible focus on buttons. Give them an outline.',
        fix: 'button:focus-visible { outline: 3px solid #FFC83D; }',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to its year or era.',
        pairs: [
          ['blink and marquee', 'Mid-1990s'],
          ['CSS animations proposed', '2007'],
          ['Flash support ends', '2020'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Can the price appear only when you hover a gig card? It\'d look cleaner.',
        options: [
          { text: 'Phone users never hover, so they\'d never see the price. Keep it visible.' },
          { text: 'Yes, cleaner is better.', why: 'Hidden on phones means hidden from most visitors.' },
          { text: 'Show it on focus only.', why: 'Keep it visible for everyone.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between :hover and :focus-visible?',
        options: [
          { text: 'They\'re the same', why: 'Different people, different devices.' },
          { text: ':focus-visible is for phones', why: 'It\'s mainly for keyboard focus.' },
          { text: ':hover is a mouse pointing; :focus-visible is reaching it with the keyboard' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'A press effect for phones and mice.',
        language: 'css',
        template: '.play-button:[[1]] { transform: [[2]](0.97); }',
        blanks: [['active'], ['scale']],
        distractors: ['hover', 'rotate', 'pressed'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which state styles an element reached with the keyboard? (hyphenated)',
        answers: ['focus-visible', ':focus-visible'],
        placeholder: 'A state',
      },
      {
        kind: 'writeCode',
        prompt: 'Give keyboard focus the same lift as hover: change the selector to .card:hover, .card:focus-visible',
        starter: '<style>\n  .card { transition: transform 200ms ease-out; }\n  .card:hover { transform: translateY(-4px); }\n</style>\n<a class="card" href="#beat">Rain on Zinc</a>\n',
        solution: '<style>\n  .card { transition: transform 200ms ease-out; }\n  .card:hover, .card:focus-visible { transform: translateY(-4px); }\n</style>\n<a class="card" href="#beat">Rain on Zinc</a>\n',
        hint: '.card:hover, .card:focus-visible { ... }',
        checks: [
          { message: 'Keyboard focus included', codeIncludes: ':focus-visible' },
          { message: 'Hover kept', codeIncludes: ':hover' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Use your page three ways: mouse, keyboard and phone. Does the motion help all three?',
    starters: ['With a mouse...', 'With the keyboard...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make every hover effect on your page also apply to :focus-visible, and check all animations stop after a few plays.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
