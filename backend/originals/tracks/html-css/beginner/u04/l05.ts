import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: Efua's second look. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Efua\'s second look',
  summary: 'Kofi sends Efua the night-mode page. Her reply is two words: "Better. Continue." From Efua, that\'s practically a standing ovation. Before he continues: a quick check on CSS so far.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain what CSS is for', 'Write a rule with its five parts', 'Style the whole page with body'],
  learn: [
    {
      kind: 'story',
      title: 'Two words',
      beats: [
        { speaker: 'narrator', text: 'Kofi sends Efua the new page: midnight-blue background, white text, an orange heading.' },
        { speaker: 'efua', text: 'Better. Continue.' },
        { speaker: 'kofi', text: 'She said BETTER.' },
        { speaker: 'tey', text: 'High praise, by Efua standards. Let\'s make sure it stuck before we go on.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: CSS so far.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which job is CSS\'s?',
        options: [
          { text: 'Saying a line is the main heading', why: 'That\'s HTML.' },
          { text: 'Making the main heading orange' },
          { text: 'Adding a beat to play', why: 'That\'s HTML\'s audio.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the rule in order.',
        language: 'css',
        lines: ['body {', '  background-color: midnightblue;', '  color: white;', '}'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the page ivory with black text, and every h2 teal',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n',
        solution: '<style>\n  body { background-color: ivory; color: black; }\n  h2 { color: teal; }\n</style>\n<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n',
        hint: 'Two rules: one for body, one for h2.',
        checks: [
          { message: 'An ivory page', dom: { selector: 'body', style: 'background-color', styleValue: 'ivory' } },
          { message: 'Black text on the page', dom: { selector: 'body', style: 'color', styleValue: 'black' } },
          { message: 'Teal h2 headings', dom: { selector: 'h2', style: 'color', styleValue: 'teal' } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken line.',
        language: 'css',
        lines: ['h1 {', '  color orange;', '}'],
        bug: 1,
        explanation: 'The colon is missing between the property and the value.',
        fix: '  color: orange;',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of h1 { color: orange; } to its name.',
        pairs: [
          ['h1', 'Selector'],
          ['color', 'Property'],
          ['orange', 'Value'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I\'ll just put style="color: orange" on all twelve headings. Faster.',
        options: [
          { text: 'Great idea.', why: 'Twelve copies means twelve edits later.' },
          { text: 'One h2 rule is faster, and it\'s one edit when you change your mind.' },
          { text: 'Use h1 for all twelve.', why: 'That\'s HTML for looks. Use CSS.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the paragraph look like?',
        code: '<style>\n  body { background-color: midnightblue; color: white; }\n</style>\n<p>Live this Saturday.</p>',
        language: 'html',
        options: [
          { text: 'Black text on white', why: 'body\'s rule changes both.' },
          { text: 'Midnight blue text on white', why: 'Blue is the background; text is white.' },
          { text: 'White text on midnight blue' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        language: 'css',
        template: 'h1 { [[1]]-color: black; }',
        blanks: [['background']],
        distractors: ['back', 'page', 'fill'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'CSS spells the colour property... (one word)',
        answers: ['color'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Selector or property?',
        groups: ['Selector', 'Property'],
        items: [
          { text: 'body', group: 0 },
          { text: 'background-color', group: 1 },
          { text: 'h2', group: 0 },
          { text: 'color', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What was the most surprising thing about CSS so far?',
    starters: ['I didn\'t expect...', 'Now I know...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, give a page three rules: body, h1 and h2. Change only one word and watch what changes.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04. Doubles as Jump ahead / placement questions.',
};

export default lesson;
