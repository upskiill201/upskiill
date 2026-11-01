import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 11 — border styles, widths and border-radius; restraint. Story choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'The neon border phase',
  summary: 'Kofi discovers border styles. Within an hour every card has an 8px dashed neon border, the header has a double one, and the buttons are dotted. Efua sends one word: "Why." Choose how he styles his edges.',
  minutes: 11,
  outcomes: ['Set border width, style and colour', 'Round corners with border-radius', 'Use borders to support the content, not shout over it'],
  learn: [
    {
      kind: 'story',
      title: '"Why."',
      beats: [
        { speaker: 'narrator', text: 'Dashed, dotted, double, 8px thick, pink and orange together. The cards look like they\'re vibrating.' },
        { speaker: 'efua', text: 'Why.' },
        { speaker: 'kofi', text: 'Because I CAN. Look, double borders!' },
        { speaker: 'miracle', text: 'You can. The question is what helps people find the beats.' },
      ],
      choice: {
        prompt: 'How should the beat cards look?',
        options: [
          {
            text: 'A thin solid border in one colour, with softly rounded corners. Same on every card.',
            outcome: 'The cards look calm and clickable, and the covers and names stand out instead of the edges.',
            best: true,
          },
          {
            text: 'Keep the neon: 8px dashed borders in two colours.',
            outcome: 'The borders are the loudest thing on the page. Nobody notices the play buttons.',
          },
          {
            text: 'No border and no background at all.',
            outcome: 'The cards melt into the page. It\'s hard to tell where one beat ends and the next begins.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>A border has three parts:</strong> width (2px), style (solid, dashed, dotted, double) and colour. You can write them together, as in border: 2px solid #FF9600, or one side at a time with border-top, border-bottom and so on. <strong>border-radius</strong> rounds the corners: 12px is soft, 50% turns a square into a circle.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Calm cards',
      caption: 'A thin border, a dark card background and rounded corners. Compare it with the neon version below.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n  aside { border: 8px dashed #F0438A; padding: 16px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n<aside><h2>Neon phase</h2></aside>\n',
      challenge: 'Change border-radius to 24px, then 0. Which suits Kofi\'s covers?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Borders should frame the content, not compete with it. One thin style, one colour, used the same way everywhere.',
    },
  ],
  apply: {
    scenario: 'The neon border phase.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with the neon borders?',
        options: [
          { text: 'Browsers can\'t show dashed borders', why: 'They can. It\'s about what people notice.' },
          { text: 'Nothing, more is better', why: 'Nobody noticed the play buttons.' },
          { text: 'They\'re the loudest thing on the page, so the beats get lost' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Round the card\'s corners: border-radius 12px',
        starter: '<style>\n  article { border: 2px solid #FF9600; padding: 16px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; padding: 16px; border-radius: 12px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        hint: 'border-radius: 12px;',
        checks: [
          { message: 'Rounded corners', dom: { selector: 'article', style: 'border-radius', styleValue: '12px' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Thin, solid, rounded', 'The beats stand out'],
          ['8px neon dashes', 'Nobody sees the play buttons'],
          ['No border or background', 'Cards melt into the page'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of a border is it?',
        groups: ['Width', 'Style'],
        items: [
          { text: '2px', group: 0 },
          { text: 'dashed', group: 1 },
          { text: '8px', group: 0 },
          { text: 'solid', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can I have a line only under the heading, not a whole box?',
        options: [
          { text: 'Yes: border-bottom: 2px solid #FF9600; on the h2 draws just one side.' },
          { text: 'No, borders go all the way round.', why: 'border-bottom draws one side.' },
          { text: 'Only with an image.', why: 'border-bottom does it in CSS.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the border that won\'t show.',
        language: 'css',
        lines: ['article { border: 2px solid #FF9600; }', 'h2 { border-bottom: 2px #FF9600; }', 'img { border: 1px solid #FFF6E5; }'],
        bug: 1,
        explanation: 'No style. Without solid (or dashed, dotted...) the border isn\'t drawn.',
        fix: 'h2 { border-bottom: 2px solid #FF9600; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What shape does the square cover become?',
        code: 'img { width: 120px; height: 120px; border-radius: 50%; }',
        language: 'css',
        options: [
          { text: 'A square with slightly soft corners', why: '50% rounds it all the way into a circle.' },
          { text: 'It disappears', why: 'It\'s still there, just round.' },
          { text: 'A circle' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the calm card.',
        language: 'css',
        template: 'article {\n  border: 2px [[1]] #FF9600;\n  [[2]]: 12px;\n}',
        blanks: [['solid'], ['border-radius']],
        distractors: ['neon', 'corner', 'round'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property rounds a box\'s corners? (hyphenated)',
        answers: ['border-radius'],
        placeholder: 'A property',
      },
      {
        kind: 'writeCode',
        prompt: 'Draw a line under each card heading only: border-bottom 2px solid #FF9600 on article h2',
        starter: '<style>\n\n</style>\n<article><h2>Jollof Bounce</h2><p>Fast, loud, for dancing.</p></article>\n',
        solution: '<style>\n  article h2 { border-bottom: 2px solid #FF9600; }\n</style>\n<article><h2>Jollof Bounce</h2><p>Fast, loud, for dancing.</p></article>\n',
        hint: 'article h2 { border-bottom: 2px solid #FF9600; }',
        checks: [
          { message: 'A line under the heading', dom: { selector: 'h2', style: 'border-bottom-style', styleValue: 'solid' } },
          { message: 'In orange', dom: { selector: 'h2', style: 'border-bottom-color', styleValue: '#FF9600' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at two apps you use. Do their cards have borders, shadows, or just a background? What does that feel like?',
    starters: ['One app uses...', 'It feels...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give the cards or sections on your page one calm border style and border-radius. Use the same on every one.',
  },
  notes: 'border shorthand (width style colour), border-style is required for a border to render (default none). border-radius 50% on a square makes a circle (MDN). aside used only to show the neon contrast in the tryIt.',
};

export default lesson;
