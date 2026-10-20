import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 (borders and radius, the full card, display, debugging). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Efua\'s one word',
  summary: 'The neon is gone. Thin orange borders, soft corners, a real Play button in every card. Kofi sends a screenshot to Efua. Three dots, then one word: "Better." From Efua, that\'s huge. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Style calm borders with rounded corners', 'Make a link into a button with inline-block', 'Find which box owns a gap'],
  learn: [
    {
      kind: 'story',
      title: '"Better."',
      beats: [
        { speaker: 'narrator', text: 'Thin borders. Soft corners. An orange Play button in every card, with room around its words.' },
        { speaker: 'efua', text: 'Better.' },
        { speaker: 'kofi', text: 'She said better. Out loud. Well, in a message.' },
        { speaker: 'tey', text: 'Let\'s make sure it sticks.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: the calm card.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make the Play link a button: inline-block, padding 12px 20px, border-radius 8px',
        starter: '<style>\n  a { background-color: #FF9600; color: #14213D; }\n</style>\n<article><h2>Jollof Bounce</h2><a href="#play">Play</a></article>\n',
        solution: '<style>\n  a { background-color: #FF9600; color: #14213D; display: inline-block; padding: 12px 20px; border-radius: 8px; }\n</style>\n<article><h2>Jollof Bounce</h2><a href="#play">Play</a></article>\n',
        hint: 'display: inline-block; padding: 12px 20px; border-radius: 8px;',
        checks: [
          { message: 'A proper box', dom: { selector: 'a', style: 'display', styleValue: 'inline-block' } },
          { message: 'Room around the word', dom: { selector: 'a', style: 'padding-top', styleValue: '12px' } },
          { message: 'Soft corners', dom: { selector: 'a', style: 'border-radius', styleValue: '8px' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm card, or neon phase?',
        groups: ['Calm', 'Neon phase'],
        items: [
          { text: 'border: 2px solid #FF9600', group: 0 },
          { text: 'border: 8px dashed with two colours', group: 1 },
          { text: 'border-radius: 12px on every card', group: 0 },
          { text: 'A different border style on every card', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the border that won\'t appear.',
        language: 'css',
        lines: ['article { border: 2px solid #FF9600; }', 'img { border: 1px #FFF6E5; }', 'h2 { border-bottom: 1px solid #FF9600; }'],
        bug: 1,
        explanation: 'No border style. Add solid.',
        fix: 'img { border: 1px solid #FFF6E5; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens to the lines around this link?',
        code: 'a { padding: 20px; }\n\n<p>Above<br><a href="#play">Play</a><br>Below</p>',
        language: 'html',
        options: [
          { text: 'The padding overlaps them: the link is still inline' },
          { text: 'They move 20px away', why: 'Only with inline-block or block.' },
          { text: 'They disappear', why: 'They\'re still there, just overlapped.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each display value to an example.',
        pairs: [
          ['block', 'A paragraph'],
          ['inline', 'A plain link in a sentence'],
          ['inline-block', 'A Play button next to text'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'There\'s a gap above the footer and I don\'t know where it\'s from.',
        options: [
          { text: 'Add * { outline: 1px solid red; } for a minute, see which box owns the gap, fix that one property, then delete the outline.' },
          { text: 'Delete the footer.', why: 'Find the gap\'s owner instead.' },
          { text: 'Add a negative padding.', why: 'Padding can\'t be negative. Find the owner first.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What does border-radius: 50% do to a square image?',
        options: [
          { text: 'Makes it a circle' },
          { text: 'Halves its size', why: 'It rounds the corners, all the way.' },
          { text: 'Adds a border', why: 'It only rounds the corners.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the calm card.',
        language: 'css',
        template: 'article {\n  background-color: #1F2E52;\n  border: 2px solid #FF9600;\n  [[1]]: 12px;\n  [[2]]: 16px;\n}',
        blanks: [['border-radius'], ['padding']],
        distractors: ['outline', 'corner', 'display'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property draws an edge that takes no space? (one word)',
        answers: ['outline'],
        placeholder: 'A property',
      },
      {
        kind: 'writeCode',
        prompt: 'Give the card a calm border: 2px solid #FF9600 with 12px rounded corners',
        starter: '<style>\n  article { padding: 16px; }\n</style>\n<article><h2>Night Bus to Kumasi</h2></article>\n',
        solution: '<style>\n  article { padding: 16px; border: 2px solid #FF9600; border-radius: 12px; }\n</style>\n<article><h2>Night Bus to Kumasi</h2></article>\n',
        hint: 'border: 2px solid #FF9600; border-radius: 12px;',
        checks: [
          { message: 'Orange border', dom: { selector: 'article', style: 'border-top-color', styleValue: '#FF9600' } },
          { message: '2px thick', dom: { selector: 'article', style: 'border-top-width', styleValue: '2px' } },
          { message: 'Rounded', dom: { selector: 'article', style: 'border-radius', styleValue: '12px' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Show your page to someone whose taste you trust. What one word did they use?',
    starters: ['They said...', 'Next I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make your most important link a button, and check every border on your page uses the same calm style.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
