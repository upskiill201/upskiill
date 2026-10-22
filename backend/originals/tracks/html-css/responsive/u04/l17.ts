import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 17 — grid line numbers (grid-column: 1 / 3) and keeping visual order matching HTML order. Story choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Top left, but last in the code',
  summary: 'The newest beat is the last figure in Kofi\'s HTML, because he adds each new one at the bottom. Efua wants it big in the top-left corner. Kofi learns he can place it there with grid line numbers. Should he?',
  minutes: 11,
  outcomes: ['Place an item with grid line numbers', 'Explain how placement can split screen order from reading order', 'Choose to fix order in the HTML'],
  learn: [
    {
      kind: 'story',
      title: 'Newest last',
      beats: [
        { speaker: 'narrator', text: 'Twelve figures in the HTML, oldest first. The newest, Rain on Zinc, is at the very bottom.' },
        { speaker: 'efua', text: 'Newest should be big, top left. That\'s where eyes go first.' },
        { speaker: 'kofi', text: 'Miracle says I can put it anywhere with grid-column: 1 / 3 and grid-row: 1 / 3. Easy.' },
        { speaker: 'tey', text: 'Easy on screen. Now think about Ama\'s friend who uses a keyboard, and Grandma\'s screen reader.' },
      ],
      choice: {
        prompt: 'How should the newest beat end up top left?',
        options: [
          {
            text: 'Move its figure to the top of the HTML, then give it the feature class to span two by two.',
            outcome: 'It\'s first on screen AND first for keyboard and screen reader users. From now on, Kofi adds new beats at the top of the HTML.',
            best: true,
          },
          {
            text: 'Leave it last in the HTML and place it with grid line numbers.',
            outcome: 'It looks right, but a screen reader announces it last, and pressing Tab reaches it after eleven others. Screen and reading order disagree.',
          },
          {
            text: 'Make a second copy of the figure at the top.',
            outcome: 'Now the beat appears twice, and screen readers read it twice. Updating it means editing two places.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Grid lines:</strong> a grid with 4 columns has 5 lines, numbered 1 to 5 from the left. grid-column: 1 / 3 means "from line 1 to line 3": the first two columns. It\'s powerful, and like order in Flexbox and named areas, it changes only what\'s on screen. If an item moves a long way from its HTML position, move it in the HTML instead.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Line numbers',
      caption: 'The feature is placed from line 1 to line 3 in both directions: the top-left two-by-two block.',
      code: '<style>\n  body { background-color: #14213D; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }\n  .gallery img { width: 100%; border-radius: 6px; }\n  .feature { grid-column: 1 / 3; grid-row: 1 / 3; }\n</style>\n<section class="gallery">\n  <img class="feature" src="cover-1.png" alt="Rain on Zinc cover, the newest beat">\n  <img src="cover-2.png" alt="Jollof Bounce cover"><img src="cover-3.png" alt="Night Bus to Kumasi cover">\n  <img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Harmattan Morning cover">\n</section>\n',
      challenge: 'Change grid-column to 3 / 5. The feature moves to the right half.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'grid-column: 1 / 3 = from line 1 to line 3. Keep screen order and HTML order the same: move things in the HTML.',
    },
  ],
  apply: {
    scenario: 'Newest last.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is placing the last figure top left with line numbers a problem?',
        options: [
          { text: 'Line numbers don\'t work', why: 'They work. That\'s why it\'s tempting.' },
          { text: 'It makes the picture blurry', why: 'It\'s about order, not image quality.' },
          { text: 'Keyboard and screen reader users still meet it last, so the screen and reading order disagree' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Place the feature across the first two columns with line numbers: grid-column 1 / 3',
        starter: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); }\n\n</style>\n<section class="gallery"><img class="feature" src="cover-1.png" alt="Rain on Zinc cover"></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); }\n  .feature { grid-column: 1 / 3; }\n</style>\n<section class="gallery"><img class="feature" src="cover-1.png" alt="Rain on Zinc cover"></section>\n',
        hint: '.feature { grid-column: 1 / 3; }',
        checks: [
          { message: 'Placed by lines', dom: { selector: '.feature', style: 'grid-column' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Move it first in the HTML', 'First on screen and for everyone'],
          ['Place it with line numbers', 'Screen and reading order disagree'],
          ['Copy it to the top', 'Read out twice'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Changes only the screen, or the real order?',
        groups: ['Only the screen', 'The real order'],
        items: [
          { text: 'grid-column: 1 / 3 on the last item', group: 0 },
          { text: 'Moving the figure up in the HTML', group: 1 },
          { text: 'Swapping names in grid-template-areas', group: 0 },
          { text: 'Writing new beats at the top of the HTML', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'But adding new beats at the top of the HTML is more work!',
        options: [
          { text: 'Then use line numbers.', why: 'That splits screen and reading order.' },
          { text: 'It\'s the same amount of typing, just in a different spot, and everyone meets the newest beat first.' },
          { text: 'Don\'t add new beats.', why: 'He\'s a producer. He will.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'A 4-column grid. Tap the line that would make the feature 3 columns wide.',
        language: 'css',
        lines: ['.feature { grid-column: 1 / 3; }', '.feature { grid-column: 1 / 4; }', '.feature { grid-column: span 2; }'],
        bug: 1,
        explanation: 'From line 1 to line 4 covers columns 1, 2 and 3.',
        fix: '.feature { grid-column: 1 / 3; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does a 4-column grid have, left to right?',
        code: 'grid-template-columns: repeat(4, 1fr);',
        language: 'css',
        options: [
          { text: 'Four', why: 'One more line than columns: both edges count.' },
          { text: 'Three', why: 'Count the outside edges too.' },
          { text: 'Five' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Place the feature in the top-left two-by-two block.',
        language: 'css',
        template: '.feature { grid-column: 1 [[1]] 3; grid-row: [[2]] / 3; }',
        blanks: [['/'], ['1']],
        distractors: ['-', '2', 'to'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Where should you move an item when it needs to come first for everyone? (two words: in the ___)',
        answers: ['html', 'the html', 'in the html'],
        placeholder: 'Where',
      },
      {
        kind: 'mcq',
        prompt: 'When is line-number placement fine?',
        options: [
          { text: 'When the screen order still matches the HTML order, like an item that\'s already first' },
          { text: 'Never', why: 'It\'s fine when the order still makes sense.' },
          { text: 'Always', why: 'Not when it moves an item far from its reading position.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'On your own page, does anything appear in a different order on screen than in the HTML?',
    starters: ['I think...', 'I\'ll move...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Press Tab repeatedly on your own page. Does the focus move through the links in the same order you see them?',
  },
  notes: 'Line-based placement (CSS Grid §8.3); grid placement does not change DOM/reading order (CSS Grid §5.4 reordering and accessibility; WCAG 1.3.2, 2.4.3). The fillBlank slash is accepted as written.',
};

export default lesson;
