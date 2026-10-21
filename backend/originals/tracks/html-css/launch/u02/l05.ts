import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 (:hover, transition, easing, transform). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the record shelf',
  summary: 'Efua points at each beat card in turn. Each one floats up a few pixels and settles back. "Like flicking through records," she says. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Style a hover state', 'Add a transition with duration and easing', 'Lift a card with transform'],
  learn: [
    {
      kind: 'story',
      title: 'Flicking through records',
      beats: [
        { speaker: 'efua', text: 'Like flicking through records. Subtle. I like it.' },
        { speaker: 'kofi', text: 'And not a single spinning cover.' },
        { speaker: 'tey', text: 'Good restraint. Check the basics.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: hover and transitions.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the lift: .card gets transition transform 200ms ease-out, .card:hover gets transform translateY(-4px)',
        starter: '<style>\n  .card { background-color: #1F2E52; }\n\n</style>\n<article class="card">Jollof Bounce</article>\n',
        solution: '<style>\n  .card { background-color: #1F2E52; transition: transform 200ms ease-out; }\n  .card:hover { transform: translateY(-4px); }\n</style>\n<article class="card">Jollof Bounce</article>\n',
        hint: 'transition on the normal rule, transform on :hover.',
        checks: [
          { message: 'A transition on the card', dom: { selector: '.card', style: 'transition' } },
          { message: 'A hover rule', codeIncludes: ':hover' },
          { message: 'That lifts it', codeIncludes: 'translateY(-4px)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The pointer leaves the card. What happens?',
        code: '.card { transition: transform 200ms ease-out; }\n.card:hover { transform: translateY(-4px); }',
        language: 'css',
        options: [
          { text: 'It glides back down over 200ms' },
          { text: 'It snaps down', why: 'The transition is on the normal rule.' },
          { text: 'It stays up', why: ':hover ends when the pointer leaves.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          [':hover', 'While the pointer is over it'],
          ['transition', 'Make the change gradual'],
          ['transform', 'Move, grow or tilt'],
          ['ease-out', 'Quick start, gentle finish'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'On the normal rule, or on :hover?',
        groups: ['Normal rule', ':hover rule'],
        items: [
          { text: 'transition: transform 200ms', group: 0 },
          { text: 'transform: translateY(-4px)', group: 1 },
          { text: 'background-color: #1F2E52', group: 0 },
          { text: 'background-color: #2A2350', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t work.',
        language: 'css',
        lines: ['.card { transition: transform 200ms ease-out; }', '.card hover { transform: translateY(-4px); }', '.card img { width: 100%; }'],
        bug: 1,
        explanation: 'A state needs a colon: .card:hover.',
        fix: '.card:hover { transform: translateY(-4px); }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Make the cards grow to double size on hover!',
        options: [
          { text: 'They\'d cover the other cards and jump around. A tiny lift says "pick me" without the chaos.' },
          { text: 'Great, scale(2).', why: 'Far too big.' },
          { text: 'Triple size.', why: 'Even bigger chaos.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'How long should a hover transition usually take?',
        options: [
          { text: 'About 0.15 to 0.3 seconds' },
          { text: 'About 3 seconds', why: 'Far too slow for a reaction.' },
          { text: 'It doesn\'t matter', why: 'Too slow feels broken.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the lift.',
        language: 'css',
        template: '.card { [[1]]: transform 200ms ease-out; }\n.card:hover { transform: [[2]](-4px); }',
        blanks: [['transition'], ['translateY']],
        distractors: ['animation', 'scale', 'move'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which transform grows an element? (one word)',
        answers: ['scale', 'scale()'],
        placeholder: 'A function',
      },
      {
        kind: 'writeCode',
        prompt: 'Make the button colour glide: .play-button gets transition background-color 200ms ease-out',
        starter: '<style>\n  .play-button { background-color: #FF9600; }\n  .play-button:hover { background-color: #FFC83D; }\n</style>\n<a class="play-button" href="#play">Play</a>\n',
        solution: '<style>\n  .play-button { background-color: #FF9600; transition: background-color 200ms ease-out; }\n  .play-button:hover { background-color: #FFC83D; }\n</style>\n<a class="play-button" href="#play">Play</a>\n',
        hint: 'transition: background-color 200ms ease-out;',
        checks: [
          { message: 'A transition on the button', dom: { selector: '.play-button', style: 'transition' } },
          { message: 'With an easing', codeIncludes: 'ease-out' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Point at every link and card on your page. Do they all react the same way?',
    starters: ['Most of them...', 'I\'ll make them match...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give every card and button on your page the same small hover reaction, with the same timing.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
