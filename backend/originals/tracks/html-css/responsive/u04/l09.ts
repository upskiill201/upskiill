import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 9 — fixed columns on a phone vs repeat(auto-fill, minmax()). Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Four columns on a tiny phone',
  summary: 'The gallery looks perfect on a laptop: four columns. On Grandma\'s phone it\'s still four columns, and every cover is the size of a fingernail. Here\'s the same gallery with one cleverer line.',
  minutes: 11,
  outcomes: ['Spot a grid with too many columns for a phone', 'Let the grid choose the number of columns with auto-fill and minmax()', 'Pick a sensible minimum size'],
  learn: [
    {
      kind: 'compare',
      title: 'Fixed columns vs columns that fit',
      before: { label: 'Always four', text: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 8px;\n}\n\nOn a 360px phone: four columns of about 80px. The covers are tiny, and the titles wrap one word per line.' },
      after: { label: 'As many as fit', text: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: 8px;\n}\n\n"Make as many columns as fit, each at least 150px, then share out the rest." Two columns on a phone, five or six on a laptop. No extra CSS for each screen.' },
      notes: [
        'minmax(150px, 1fr): at least 150px, at most one share of the space.',
        'auto-fill: as many columns as fit at that minimum.',
        'One line replaces a different layout for each screen size.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'A gallery that counts for itself',
      caption: 'Switch the preview between phone and laptop. The number of columns changes on its own.',
      code: '<style>\n  body { background-color: #14213D; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }\n  .gallery img { width: 100%; border-radius: 6px; }\n</style>\n<section class="gallery">\n  <img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover"><img src="cover-3.png" alt="Night Bus to Kumasi cover">\n  <img src="cover-1.png" alt="Accra Sunrise Mix cover"><img src="cover-2.png" alt="Harmattan Morning cover"><img src="cover-3.png" alt="Kente Code cover">\n</section>\n',
      challenge: 'Change 150px to 250px. Fewer, bigger covers per row.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'repeat(auto-fill, minmax(150px, 1fr)): the most useful line in Grid.',
    },
  ],
  apply: {
    scenario: 'Fingernail-sized covers.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why are the covers tiny on Grandma\'s phone?',
        options: [
          { text: 'Her phone shrinks pictures', why: 'The grid forces four columns.' },
          { text: 'The images are low quality', why: 'It\'s the number of columns.' },
          { text: 'repeat(4, 1fr) always makes four columns, however narrow the screen' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Let the gallery choose its columns: grid-template-columns repeat(auto-fill, minmax(150px, 1fr))',
        starter: '<style>\n  /* was: grid-template-columns: repeat(4, 1fr); */\n  .gallery { display: grid; gap: 8px; }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover"></section>\n',
        solution: '<style>\n  /* was: grid-template-columns: repeat(4, 1fr); */\n  .gallery { display: grid; gap: 8px; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover"></section>\n',
        hint: 'Add grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));',
        checks: [
          { message: 'Columns that fit the screen', dom: { selector: '.gallery', style: 'grid-template-columns' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to what it means.',
        pairs: [
          ['auto-fill', 'As many columns as fit'],
          ['minmax(150px, 1fr)', 'At least 150px, up to a share'],
          ['repeat(4, 1fr)', 'Always exactly four'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'With minmax(150px, 1fr) and auto-fill, roughly how many columns?',
        groups: ['About 2', 'About 6'],
        items: [
          { text: 'A 360px phone', group: 0 },
          { text: 'A 1000px laptop', group: 1 },
          { text: 'Grandma\'s small phone', group: 0 },
          { text: 'A wide desktop window', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Do I need separate CSS for phones, tablets and laptops for the gallery?',
        options: [
          { text: 'Yes, three stylesheets.', why: 'One line handles the gallery.' },
          { text: 'Not for this: auto-fill with minmax works out the columns on every screen.' },
          { text: 'Only for tablets.', why: 'It adapts to all of them.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will keep the covers tiny on a phone.',
        language: 'css',
        lines: ['.gallery { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }', '.gallery { grid-template-columns: repeat(6, 1fr); }', '.gallery img { width: 100%; }'],
        bug: 1,
        explanation: 'Six columns on every screen: about 50px each on a phone.',
        fix: '.gallery { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The gallery is 500px wide (gap 8px). How many columns?',
        code: 'grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));',
        language: 'css',
        options: [
          { text: 'Three: 3 × 150 + 2 × 8 = 466px fits; four would need 624px' },
          { text: 'Four', why: 'Four need 624px.' },
          { text: 'One', why: 'Three fit at 150px each.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the self-counting gallery.',
        language: 'css',
        template: 'grid-template-columns: repeat([[1]], [[2]](150px, 1fr));',
        blanks: [['auto-fill', 'auto-fit'], ['minmax']],
        distractors: ['4', 'max', 'clamp'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which function sets a minimum and maximum size for a column? (one word)',
        answers: ['minmax', 'minmax()'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What happens if the minimum is too big, like minmax(600px, 1fr)?',
        options: [
          { text: 'Nothing, it\'s always fine', why: '600px is wider than most phones.' },
          { text: 'Phones narrower than 600px get one column that sticks out' },
          { text: 'The grid hides the covers', why: 'They stick out instead.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What minimum size would suit the items in your own grid?',
    starters: ['At least...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Change your grid to repeat(auto-fill, minmax(150px, 1fr)) and try it on a phone and a laptop.',
  },
  notes: 'auto-fill repetition with minmax() (CSS Grid §7.2.3.2). Too-large minimums overflow narrow containers; min(100%, 600px) inside minmax fixes that but isn\'t taught. Checks confirm grid-template-columns is set, since engines keep the typed text.',
};

export default lesson;
