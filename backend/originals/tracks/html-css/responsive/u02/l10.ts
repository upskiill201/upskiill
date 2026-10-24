import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (id vs class, the cascade, specificity, !important). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: no more guessing',
  summary: 'Efua asks why a heading is the wrong colour. This time Kofi doesn\'t guess. He counts: "0-1-1 beats 0-0-2. Fixed." Miracle claps on the video call. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Choose a class or an id for the job', 'Predict which rule wins', 'Keep a stylesheet free of !important'],
  learn: [
    {
      kind: 'story',
      title: 'He counts',
      beats: [
        { speaker: 'efua', text: 'The Gigs heading is orange. It should be cream.' },
        { speaker: 'kofi', text: 'main h2 makes it orange, and that\'s 0-0-2. A .section-title rule would be 0-1-0, so I add one that says cream. Fixed.' },
        { speaker: 'miracle', text: 'No guessing. That\'s the whole skill.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: who wins.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make the Gigs heading cream (#FFF6E5) without !important or an id: add a .section-title rule',
        starter: '<style>\n  main h2 { color: #FF9600; }\n\n</style>\n<main><h2 class="section-title">Gigs</h2></main>\n',
        solution: '<style>\n  main h2 { color: #FF9600; }\n  .section-title { color: #FFF6E5; }\n</style>\n<main><h2 class="section-title">Gigs</h2></main>\n',
        hint: '.section-title { color: #FFF6E5; } scores 0-1-0, beating 0-0-2.',
        checks: [
          { message: 'The heading is cream', dom: { selector: '.section-title', style: 'color', styleValue: '#FFF6E5' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the heading?',
        code: 'h2 { color: #FFF6E5; }\n.title { color: #F0438A; }\nh2 { color: #FF9600; }\n\n<h2 class="title">Beats</h2>',
        language: 'html',
        options: [
          { text: 'Orange: it\'s last', why: 'Specificity before order.' },
          { text: 'Cream: it\'s first', why: 'The class wins.' },
          { text: 'Pink: the class is more specific' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Class or id?',
        groups: ['Class', 'Id'],
        items: [
          { text: 'Styling every gig card', group: 0 },
          { text: 'The target of href="#book"', group: 1 },
          { text: 'A featured label on three cards', group: 0 },
          { text: 'One unique section to jump to', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each selector to its score.',
        pairs: [
          ['main h2', '0-0-2'],
          ['.section-title', '0-1-0'],
          ['#gigs h2', '1-0-1'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that starts a specificity war.',
        language: 'css',
        lines: ['.beat-card { padding: 16px; }', '#sunrise .beat-card h2 { color: #F0438A !important; }', '.featured h2 { color: #F0438A; }'],
        bug: 1,
        explanation: 'An id and !important together. Nothing normal can override it again.',
        fix: '.featured h2 { color: #F0438A; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Why does the inline style="color: white" beat your class?',
        options: [
          { text: 'Because white is stronger.', why: 'Colours have no strength. The style attribute does.' },
          { text: 'A style attribute beats any selector in the stylesheet. That\'s why we moved styles into classes.' },
          { text: 'It doesn\'t.', why: 'Style attributes beat stylesheet rules.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Two rules score 0-1-1 each. How is it decided?',
        options: [
          { text: 'The shorter one wins', why: 'Length doesn\'t matter. Order breaks ties.' },
          { text: 'The browser mixes them', why: 'One value wins.' },
          { text: 'The later one wins' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the cascade questions.',
        template: 'Important? Origin? [[1]]? Then [[2]].',
        blanks: [['Specificity', 'specificity'], ['order', 'Order']],
        distractors: ['colour', 'size', 'speed'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which symbol starts an id selector? (name it)',
        answers: ['hash', 'hashtag', 'pound', 'number sign'],
        placeholder: 'A symbol name',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the debugging steps in order.',
        lines: ['Find every rule that targets the element', 'Score each selector', 'Find the winner', 'Fix the right rule, without !important'],
      },
    ],
  },
  reflect: {
    prompt: 'Find one style on your page that confused you. Can you explain the winner now?',
    starters: ['The winner was...', 'Because it scored...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick any element on your page, list every rule that targets it, and score them. Check your answer in the browser\'s inspector.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
