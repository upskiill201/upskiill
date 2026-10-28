import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Ama's reading test. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Ama\'s reading test',
  summary: 'Ama reads Kofi\'s story paragraph out loud, timing herself. Last week she gave up halfway. This week: one accent, a calm font, room between the lines. She reaches the end. Now it\'s your turn to prove it stuck.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use colour on purpose', 'Style text size, weight, alignment and spacing', 'Predict which rule wins and set fonts with fallbacks'],
  learn: [
    {
      kind: 'story',
      title: 'To the end',
      beats: [
        { speaker: 'ama', text: '(reading, slowly) "...and this page is where they live now." I finished it!' },
        { speaker: 'kofi', text: 'Last week you stopped halfway.' },
        { speaker: 'ama', text: 'Last week it was bold and yellow and squashed.' },
        { speaker: 'tey', text: 'One accent, a calm font, room to breathe. Quick check.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: Ama\'s reading test.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make Ama\'s paragraph easy to read: Verdana with a sans-serif fallback, and a line-height of 1.6',
        starter: '<style>\n  p {\n\n  }\n</style>\n<p>Kofi makes beats on his phone in Accra. This page is where they live now.</p>\n',
        solution: '<style>\n  p {\n    font-family: Verdana, sans-serif;\n    line-height: 1.6;\n  }\n</style>\n<p>Kofi makes beats on his phone in Accra. This page is where they live now.</p>\n',
        hint: 'font-family: Verdana, sans-serif; and line-height: 1.6;',
        checks: [
          { message: 'Verdana with a fallback', dom: { selector: 'p', style: 'font-family', styleValue: 'Verdana, sans-serif' } },
          { message: 'Room between the lines', dom: { selector: 'p', style: 'line-height', styleValue: '1.6' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the heading?',
        code: 'h1 { color: white; }\nh1 { color: orange; }',
        language: 'css',
        options: [
          { text: 'White', why: 'Same selector: the later rule wins.' },
          { text: 'Orange' },
          { text: 'Black', why: 'Both rules set a colour; the later wins.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Accent colour, or stay calm?',
        groups: ['Accent', 'Calm'],
        items: [
          { text: 'Listen now link', group: 0 },
          { text: 'The story paragraph', group: 1 },
          { text: 'Main heading', group: 0 },
          { text: 'Footer small print', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line Ama would complain about.',
        language: 'css',
        lines: ['h1 { text-align: center; }', 'p { text-align: center; }', 'p { line-height: 1.6; }'],
        bug: 1,
        explanation: 'Long centred paragraphs are hard to read. Keep paragraphs left-aligned.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each property to its job.',
        pairs: [
          ['font-family', 'Which font'],
          ['font-size', 'How big'],
          ['line-height', 'Space between lines'],
          ['text-align', 'Left, centre or right'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'li a { color: gold; } and a { color: orange; }. Which wins for links in my gig list?',
        options: [
          { text: 'a, because it\'s later.', why: 'Order only decides between equally specific rules.' },
          { text: 'li a, because it\'s more specific, even though it comes first.' },
          { text: 'Neither.', why: 'The more specific rule wins.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why end a font stack with sans-serif or serif?',
        options: [
          { text: 'It\'s the fanciest font', why: 'It\'s a safety net, not a style.' },
          { text: 'It\'s required for the page to load', why: 'It\'s a safety net.' },
          { text: 'Every device has one, so there\'s always a font of the right style' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the stack.',
        language: 'css',
        template: 'h1 { font-family: [[1]] MS", sans-serif; }',
        blanks: [['"Trebuchet']],
        distractors: ['Trebuchet', '(Trebuchet', '\'Trebuchet MS'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property makes letters bold? (two words joined by a dash)',
        answers: ['font-weight'],
        placeholder: 'property-name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Inherits from body, or not?',
        groups: ['Inherits', 'Doesn\'t'],
        items: [
          { text: 'font-family', group: 0 },
          { text: 'background-color', group: 1 },
          { text: 'color (for paragraphs)', group: 0 },
          { text: 'color (for links)', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Read your own page\'s longest paragraph out loud. Where did you slow down, and what CSS would help?',
    starters: ['I slowed down at...', 'CSS that would help:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask someone to read your page out loud. Fix one thing that slowed them down.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14. Link colour "doesn\'t inherit" is simplified: browsers set an explicit link colour, which beats inheritance.',
};

export default lesson;
