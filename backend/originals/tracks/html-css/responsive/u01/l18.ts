import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 18 — a centred page column: main with max-width and margin: 0 auto; padding for phone edges. Steps. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'A column down the middle',
  summary: 'On Kofi\'s laptop, the cards sit hard against the left edge with a huge empty space on the right. Miracle\'s fix is three lines that nearly every website uses: a centred column.',
  minutes: 12,
  outcomes: ['Wrap a page\'s content in main', 'Centre a box with margin: 0 auto', 'Keep content off the screen edges on phones with padding'],
  learn: [
    {
      kind: 'steps',
      title: 'Three lines to a centred column',
      steps: [
        { title: '1. Wrap the content', body: 'Put everything under the header inside one main element. It holds the main content of the page, and gives you one box to size.', code: '<main>\n  <article>...</article>\n  <article>...</article>\n</main>', language: 'html' },
        { title: '2. Limit the width', body: 'Long lines and stretched cards are hard to read on a laptop. Cap the column.', code: 'main { max-width: 640px; }', language: 'css' },
        { title: '3. Centre it', body: 'margin: 0 auto means no margin on the top and bottom, and "split the leftover space evenly" on the left and right. The column sits in the middle.', code: 'main { max-width: 640px; margin: 0 auto; }', language: 'css' },
        { title: '4. Breathing room on phones', body: 'On a phone the column fills the screen, so add padding to keep words off the very edge.', code: 'main { max-width: 640px; margin: 0 auto; padding: 16px; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The centred column',
      caption: 'Switch between phone and laptop size. On a laptop the column sits in the middle; on a phone it fills the screen with room at the edges.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0; }\n  main { max-width: 640px; margin: 0 auto; padding: 16px; }\n  article { border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n</style>\n<main>\n  <article><h2>Sunrise in Osu</h2></article>\n  <article><h2>Jollof Bounce</h2></article>\n</main>\n',
      challenge: 'Remove margin: 0 auto. Where does the column go on a laptop?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'max-width + margin: 0 auto + padding: a centred column that also works on phones.',
    },
  ],
  apply: {
    scenario: 'Cards stuck on the left.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Wrap the content in main', 'Give main a max-width', 'Centre it with margin: 0 auto', 'Add padding for phone edges'],
      },
      {
        kind: 'writeCode',
        prompt: 'Centre the column: main gets max-width 640px and margin 0 auto',
        starter: '<style>\n\n</style>\n<main>\n  <article><h2>Sunrise in Osu</h2></article>\n</main>\n',
        solution: '<style>\n  main { max-width: 640px; margin: 0 auto; }\n</style>\n<main>\n  <article><h2>Sunrise in Osu</h2></article>\n</main>\n',
        hint: 'main { max-width: 640px; margin: 0 auto; }',
        checks: [
          { message: 'Up to 640px', dom: { selector: 'main', style: 'max-width', styleValue: '640px' } },
          { message: 'Auto on the left', dom: { selector: 'main', style: 'margin-left', styleValue: 'auto' } },
          { message: 'Auto on the right', dom: { selector: 'main', style: 'margin-right', styleValue: 'auto' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does margin: 0 auto do?',
        options: [
          { text: 'Removes all margins', why: 'auto on the sides centres the box.' },
          { text: 'No top/bottom margin; the left and right share the leftover space, centring the box' },
          { text: 'Makes the box full width', why: 'It centres a box that has a max-width.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Is this line part of a centred column?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'max-width: 640px', group: 0 },
          { text: 'margin: 0 auto', group: 0 },
          { text: 'width: 2000px', group: 1 },
          { text: 'margin-left: 300px', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the reason the column isn\'t centred.',
        language: 'css',
        lines: ['main {', '  margin: 0 auto;', '  padding: 16px;', '}'],
        bug: 1,
        explanation: 'Without a max-width, main already fills the whole width, so there\'s no leftover space to split. Add max-width: 640px.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why not just make the column 640px wide?',
        options: [
          { text: 'Good idea.', why: 'A fixed width breaks on phones.' },
          { text: 'Use 6400px.', why: 'Far too wide everywhere.' },
          { text: 'On Ama\'s phone, 640px would stick out. max-width stops at 640px on laptops and shrinks on phones.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['max-width: 640px', 'Stops the column getting too wide'],
          ['margin: 0 auto', 'Puts it in the middle'],
          ['padding: 16px', 'Keeps words off the phone\'s edge'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On a 1000px laptop, how much space is to the left of the column?',
        code: 'main { max-width: 600px; margin: 0 auto; }',
        language: 'css',
        options: [
          { text: '200px: the 400px left over, split evenly' },
          { text: '400px', why: 'Half goes on each side.' },
          { text: '0px', why: 'auto shares the leftover space.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the centred column.',
        language: 'css',
        template: 'main { max-width: 640px; margin: 0 [[1]]; padding: 16px; }',
        blanks: [['auto']],
        distractors: ['center', 'middle', '50%'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element holds the main content of a page? (tag name)',
        answers: ['main', '<main>'],
        placeholder: 'A tag',
      },
    ],
  },
  reflect: {
    prompt: 'Open three websites on a laptop. Do they use a centred column? How wide does it look?',
    starters: ['Most of them...', 'The widest was...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Wrap your own page\'s content in main and give it max-width, margin: 0 auto and padding. Check it on a phone and a laptop.',
  },
  notes: 'Auto horizontal margins centre a block with a definite (or max-) width narrower than its container (CSS 2.1 §10.3.3). main represents the dominant content of the body (HTML spec); deeper semantics in Course 3.',
};

export default lesson;
