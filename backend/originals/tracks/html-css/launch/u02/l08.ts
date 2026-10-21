import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 8 — @keyframes and the animation property: name, duration, easing, count. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Motion that plays by itself',
  summary: 'Transitions need something to happen first, like a hover. But Kofi wants the "New" badge on his latest beat to pulse when the page opens, without anyone touching it. Tey explains animations, one card at a time.',
  minutes: 11,
  outcomes: ['Describe the steps of an animation with @keyframes', 'Run it with the animation property', 'Control how many times it plays'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Transition vs animation.</strong> A transition smooths a change between two states, like normal and hover. An <strong>animation</strong> plays steps you describe yourself, and it can start on its own when the page loads.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>@keyframes describes the steps.</strong> Give it a name and say what the element looks like at points along the way: from (the start), to (the end), or percentages like 50%.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>animation runs it.</strong> animation: pulse 1.2s ease-in-out 3; means: play the steps called pulse, each time taking 1.2 seconds, easing in and out, 3 times. Then it stops.</p>',
    },
    {
      kind: 'check',
      question: 'animation: pulse 2s ease-in-out 3; How long does the whole thing play?',
      options: ['2 seconds', '6 seconds', 'Forever'],
      answer: 1,
      explanation: 'Three times, two seconds each: six seconds, then it stops.',
    },
    {
      kind: 'tryIt',
      title: 'A pulsing badge',
      caption: 'The badge pulses three times when the page opens, then rests. Run it again to replay.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .new { display: inline-block; padding: 4px 10px; border-radius: 8px; background-color: #FFC83D; color: #14213D; animation: pulse 1.2s ease-in-out 3; }\n  @keyframes pulse {\n    from { transform: scale(1); }\n    50% { transform: scale(1.1); }\n    to { transform: scale(1); }\n  }\n</style>\n<h2>Rain on Zinc <span class="new">New</span></h2>\n',
      challenge: 'Change scale(1.1) to scale(1.3). Still gentle?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '@keyframes name { steps }. animation: name duration easing count. Pick a count, so it stops.',
    },
  ],
  apply: {
    scenario: 'The pulsing badge.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between a transition and an animation?',
        options: [
          { text: 'A transition smooths a change you cause; an animation plays its own steps, even on its own' },
          { text: 'They\'re the same', why: 'Animations can run without a trigger.' },
          { text: 'Animations only work on hover', why: 'They can start when the page loads.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the pulse: give .new the animation pulse 1.2s ease-in-out 3',
        starter: '<style>\n  .new { background-color: #FFC83D; color: #14213D; }\n  @keyframes pulse { 50% { transform: scale(1.1); } }\n</style>\n<span class="new">New</span>\n',
        solution: '<style>\n  .new { background-color: #FFC83D; color: #14213D; animation: pulse 1.2s ease-in-out 3; }\n  @keyframes pulse { 50% { transform: scale(1.1); } }\n</style>\n<span class="new">New</span>\n',
        hint: 'animation: pulse 1.2s ease-in-out 3;',
        checks: [
          { message: 'The badge has an animation', dom: { selector: '.new', style: 'animation' } },
          { message: 'Using pulse', codeIncludes: 'animation: pulse' },
          { message: 'Three times, then stop', codeIncludes: ' 3;' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['@keyframes pulse', 'Describes the steps'],
          ['animation: pulse ...', 'Runs the steps'],
          ['1.2s', 'How long one play takes'],
          ['3', 'How many times'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Transition or animation?',
        groups: ['Transition', 'Animation'],
        items: [
          { text: 'A button glides to gold on hover', group: 0 },
          { text: 'A badge pulses when the page opens', group: 1 },
          { text: 'A card lifts when pointed at', group: 0 },
          { text: 'A loading spinner turns', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can the badge pulse forever?',
        options: [
          { text: 'Forever gets distracting while people read. A few pulses catch the eye, then it rests.' },
          { text: 'Yes, use infinite.', why: 'Endless motion is tiring.' },
          { text: 'Pulse it faster forever.', why: 'Even more distracting.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the animation that won\'t play.',
        language: 'css',
        lines: ['.new { animation: pulse 1.2s ease-in-out 3; }', '@keyframes pluse { 50% { transform: scale(1.1); } }', '.card:hover { transform: translateY(-4px); }'],
        bug: 1,
        explanation: 'The keyframes are called pluse, but the animation asks for pulse. The names must match.',
        fix: '@keyframes pulse { 50% { transform: scale(1.1); } }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens after the third pulse?',
        code: '.new { animation: pulse 1.2s ease-in-out 3; }',
        language: 'css',
        options: [
          { text: 'It stops and the badge rests' },
          { text: 'It keeps going', why: '3 means three times.' },
          { text: 'The badge disappears', why: 'It just stops moving.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Describe the steps.',
        language: 'css',
        template: '[[1]] pulse {\n  [[2]] { transform: scale(1.1); }\n}',
        blanks: [['@keyframes'], ['50%']],
        distractors: ['@animation', 'half', '@media'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which at-rule describes the steps of an animation? (with its symbol)',
        answers: ['@keyframes', 'keyframes'],
        placeholder: 'An at-rule',
      },
      {
        kind: 'mcq',
        prompt: 'animation: pulse 2s ease-in-out 3; How long does it play in total?',
        options: [
          { text: '6 seconds' },
          { text: '2 seconds', why: 'That\'s one play. It plays 3 times.' },
          { text: '3 seconds', why: '3 is the count; each is 2 seconds.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What on your page deserves a small animation when it opens? Why that?',
    starters: ['I\'d animate...', 'Because it\'s...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add a small @keyframes pulse to one "new" thing on your page, with a count of 2 or 3.',
  },
  notes: 'CSS Animations Level 1: @keyframes with from/to/percentages; animation shorthand name duration timing-function iteration-count. A missing 0%/100% keyframe uses the element\'s own style.',
};

export default lesson;
