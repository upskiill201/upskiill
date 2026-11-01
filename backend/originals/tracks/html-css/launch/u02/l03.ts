import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 3 — transition in detail: property, duration, easing, several properties. Steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The three parts of a transition',
  summary: 'Miracle shows Kofi that a transition is a short sentence: what changes, how long it takes, and how it speeds up and slows down. Four steps.',
  minutes: 12,
  outcomes: ['Write a transition with property, duration and easing', 'Transition more than one property', 'Choose an easing that feels natural'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to a good transition',
      steps: [
        { title: '1. What changes', body: 'Name the property: background-color, color, transform. Naming it means only that property glides.', code: 'transition: background-color', language: 'css' },
        { title: '2. How long', body: 'A duration in seconds (s) or milliseconds (ms). 0.2s and 200ms are the same.', code: 'transition: background-color 200ms', language: 'css' },
        { title: '3. How it moves', body: 'The easing. ease-out starts quick and settles gently, which feels natural for things reacting to you. linear is the same speed throughout and can feel mechanical.', code: 'transition: background-color 200ms ease-out', language: 'css' },
        { title: '4. More than one', body: 'Separate several transitions with a comma.', code: 'transition: background-color 200ms ease-out, color 200ms ease-out', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two properties, one feel',
      caption: 'Both the background and the text colour glide, with the same timing.',
      code: '<style>\n  body { background-color: #14213D; font-family: Verdana, sans-serif; }\n  .play-button { display: inline-block; padding: 12px 20px; background-color: #1F2E52; color: #FF9600; border-radius: 8px;\n    transition: background-color 200ms ease-out, color 200ms ease-out; }\n  .play-button:hover { background-color: #FF9600; color: #14213D; }\n</style>\n<p><a class="play-button" href="#play">Play Rain on Zinc</a></p>\n',
      challenge: 'Change ease-out to linear, then to ease-in. Which feels best?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'transition: property duration easing. Separate several with commas. ease-out feels natural for hovers.',
    },
  ],
  apply: {
    scenario: 'The three parts.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the parts of a transition in order.',
        lines: ['transition:', 'background-color', '200ms', 'ease-out;'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make both colours glide: transition background-color 200ms ease-out, color 200ms ease-out',
        starter: '<style>\n  .play-button { background-color: #1F2E52; color: #FF9600; }\n  .play-button:hover { background-color: #FF9600; color: #14213D; }\n</style>\n<a class="play-button" href="#play">Play</a>\n',
        solution: '<style>\n  .play-button { background-color: #1F2E52; color: #FF9600; transition: background-color 200ms ease-out, color 200ms ease-out; }\n  .play-button:hover { background-color: #FF9600; color: #14213D; }\n</style>\n<a class="play-button" href="#play">Play</a>\n',
        hint: 'transition: background-color 200ms ease-out, color 200ms ease-out;',
        checks: [
          { message: 'A transition', codeIncludes: 'transition' },
          { message: 'With an easing', codeIncludes: 'ease-out' },
          { message: 'For both colours', codeIncludes: ', color' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each easing to how it feels.',
        pairs: [
          ['ease-out', 'Quick start, gentle finish'],
          ['ease-in', 'Slow start, quick finish'],
          ['linear', 'Same speed throughout'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Same length of time, or different?',
        groups: ['Same as 0.2s', 'Different'],
        items: [
          { text: '200ms', group: 0 },
          { text: '2s', group: 1 },
          { text: '0.2s', group: 0 },
          { text: '20ms', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can I just write transition: all 200ms?',
        options: [
          { text: 'all is always best.', why: 'It can animate things you didn\'t intend.' },
          { text: 'It works, but then anything that changes will glide, even things you didn\'t mean. Naming the properties is safer.' },
          { text: 'all is not allowed.', why: 'It\'s allowed, just less precise.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken transition.',
        language: 'css',
        lines: ['transition: color 200ms ease-out;', 'transition: background-color 200ms ease-out color 200ms;', 'transition: background-color 0.2s;'],
        bug: 1,
        explanation: 'Two transitions need a comma between them.',
        fix: 'transition: background-color 200ms ease-out, color 200ms;',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On hover, which properties glide?',
        code: '.card { transition: background-color 200ms; }\n.card:hover { background-color: #2A2350; color: #FF9600; }',
        language: 'css',
        options: [
          { text: 'Both', why: 'Only background-color is in the transition.' },
          { text: 'Neither', why: 'The background glides.' },
          { text: 'Only the background colour; the text colour snaps' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'A natural-feeling hover.',
        language: 'css',
        template: 'transition: background-color [[1]] [[2]];',
        blanks: [['200ms', '0.2s'], ['ease-out']],
        distractors: ['2000ms', 'linear-out', 'fast'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What separates two transitions in one transition line? (name the symbol)',
        answers: ['comma', 'a comma'],
        placeholder: 'A symbol name',
      },
      {
        kind: 'mcq',
        prompt: 'Which easing usually feels most natural for something reacting to you?',
        options: [
          { text: 'ease-out' },
          { text: 'linear', why: 'Can feel mechanical.' },
          { text: 'ease-in', why: 'Starts slow, so it feels laggy for a reaction.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which properties on your own buttons change on hover? Are they all in the transition?',
    starters: ['My button changes...', 'I\'ll add...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a full transition on your button: property, duration and ease-out. Add a second property with a comma.',
  },
  notes: 'transition shorthand <property> <duration> <timing-function> <delay>; delay omitted here. Easing keywords per CSS Easing Functions.',
};

export default lesson;
