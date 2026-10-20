import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 20 — Chapter Challenge: Mensah Beats v1.1, beat cards with room to breathe. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v1.1',
  summary: 'The organiser wants to feature Kofi\'s beats on the next Sound Up Saturdays poster. "Send me the page with the cards," she says. Build v1.1 from memory, then upload it.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a centred column of roomy beat cards', 'Make buttons thumbs can hit', 'Keep every box inside a phone screen'],
  learn: [
    {
      kind: 'story',
      title: 'Room to breathe',
      beats: [
        { speaker: 'narrator', text: 'Saturday. Seven weeks to uni. The organiser: "I\'m putting three of your beats on the next poster. Send me the page with the cards."' },
        { speaker: 'kofi', text: 'Centred column. Six cards, 16px of room inside, a gap between each. Play buttons Ama can actually hit.' },
        { speaker: 'ama', text: 'I pressed Play. It played.' },
        { speaker: 'efua', text: 'The cards look like they belong on a real music site.' },
        { speaker: 'tey', text: 'Let\'s build v1.1 one more time, from memory. Next chapter: making every card match with one line.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'v1.0 (Course 1)', body: 'A live site: his colours, readable text, style.css, a safe booking email.', code: '<link rel="stylesheet" href="style.css">', language: 'html' },
        { title: 'v1.1 (tonight)', body: 'Beat cards with padding, borders and rounded corners, a centred column, border-box, images that fit, thumb-sized buttons.', code: 'main { max-width: 640px; margin: 0 auto; }', language: 'css' },
        { title: 'Next chapter', body: 'Classes and the cascade: name a style once, reuse it everywhere, and learn which rule wins when two disagree.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v1.1.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the base. Every element border-box, and no margin on the body',
        starter: '<style>\n\n</style>\n<main><article><h2>Sunrise in Osu</h2></article></main>\n',
        solution: '<style>\n  * { box-sizing: border-box; }\n  body { margin: 0; }\n</style>\n<main><article><h2>Sunrise in Osu</h2></article></main>\n',
        hint: '* { box-sizing: border-box; } and body { margin: 0; }',
        checks: [
          { message: 'Border-box everywhere', dom: { selector: 'article', style: 'box-sizing', styleValue: 'border-box' } },
          { message: 'No gap around the page', dom: { selector: 'body', style: 'margin-left', styleValue: '0px' } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: the column. main gets max-width 640px, margin 0 auto and padding 16px',
        starter: '<style>\n\n</style>\n<main><article><h2>Sunrise in Osu</h2></article></main>\n',
        solution: '<style>\n  main { max-width: 640px; margin: 0 auto; padding: 16px; }\n</style>\n<main><article><h2>Sunrise in Osu</h2></article></main>\n',
        hint: 'main { max-width: 640px; margin: 0 auto; padding: 16px; }',
        checks: [
          { message: 'Up to 640px', dom: { selector: 'main', style: 'max-width', styleValue: '640px' } },
          { message: 'Centred', dom: { selector: 'main', style: 'margin-left', styleValue: 'auto' } },
          { message: 'Room at the edges', dom: { selector: 'main', style: 'padding-left', styleValue: '16px' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Padding or margin?',
        groups: ['Padding', 'Margin'],
        items: [
          { text: 'Room between a card\'s border and its name', group: 0 },
          { text: 'The gap between two cards', group: 1 },
          { text: 'Making a button bigger to tap', group: 0 },
          { text: 'Centring the column', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: the cards. 16px padding, 2px solid #FF9600 border, 12px rounded corners, 16px gap below',
        starter: '<style>\n\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
        solution: '<style>\n  article { padding: 16px; border: 2px solid #FF9600; border-radius: 12px; margin-bottom: 16px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
        hint: 'One article rule with padding, border, border-radius and margin-bottom.',
        checks: [
          { message: 'Room inside', dom: { selector: 'article', style: 'padding-top', styleValue: '16px' } },
          { message: 'Orange border', dom: { selector: 'article', style: 'border-top-color', styleValue: '#FF9600' } },
          { message: 'Rounded corners', dom: { selector: 'article', style: 'border-radius', styleValue: '12px' } },
          { message: 'Gap between cards', dom: { selector: 'article', style: 'margin-bottom', styleValue: '16px' } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks the layout on Ama\'s phone.',
        language: 'css',
        lines: ['img { width: 700px; }', 'article { padding: 16px; }', 'main { max-width: 640px; margin: 0 auto; }'],
        bug: 0,
        explanation: 'A fixed 700px image sticks out of every phone. Use max-width: 100%.',
        fix: 'img { max-width: 100%; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'With the default box-sizing, how wide is this card?',
        code: 'article { width: 300px; padding: 16px; border: 2px solid #FF9600; }',
        language: 'css',
        options: [
          { text: '336px' },
          { text: '300px', why: 'Only with border-box.' },
          { text: '318px', why: 'Padding and border count on both sides.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'There\'s a big gap above the name in every card. Why?',
        options: [
          { text: 'The h2\'s default top margin adds to the padding. article h2 { margin-top: 0; } fixes it.' },
          { text: 'The border is too thick.', why: 'It\'s the h2\'s default margin.' },
          { text: 'The browser is broken.', why: 'It\'s a default margin you can change.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem from this chapter to its fix.',
        pairs: [
          ['Words touching the border', 'padding'],
          ['Cards touching each other', 'margin'],
          ['Box wider than its width', 'box-sizing: border-box'],
          ['Card off the edge of a phone', 'max-width'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 4: the buttons. Card links get display inline-block, padding 12px 16px and an 8px right margin',
        starter: '<style>\n  article a { background-color: #FF9600; color: #14213D; }\n</style>\n<article><a href="#play">Play</a><a href="#share">Share</a></article>\n',
        solution: '<style>\n  article a { background-color: #FF9600; color: #14213D; display: inline-block; padding: 12px 16px; margin-right: 8px; }\n</style>\n<article><a href="#play">Play</a><a href="#share">Share</a></article>\n',
        hint: 'display: inline-block; padding: 12px 16px; margin-right: 8px;',
        checks: [
          { message: 'Proper boxes', dom: { selector: 'article a', style: 'display', styleValue: 'inline-block' } },
          { message: 'Thumb-sized', dom: { selector: 'article a', style: 'padding-left', styleValue: '16px' } },
          { message: 'Gaps between', dom: { selector: 'article a', style: 'margin-right', styleValue: '8px' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Keep covers inside their cards.',
        language: 'css',
        template: 'img { [[1]]: 100%; }',
        blanks: [['max-width']],
        distractors: ['width', 'min-width', 'margin'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats has the beat cards? (e.g. v1.0)',
        answers: ['v1.1', '1.1'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'Look at your own page now. Where did boxes make the biggest difference?',
    starters: ['The biggest change was...', 'Next I want to...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Turn the sections of your own site into cards in a centred column, test it on a phone, and upload the new version to your host.',
  },
  notes: 'Chapter 1 finale of Course 2 (Responsive Web Design with CSS). Next chapter: Classes and the cascade.',
};

export default lesson;
