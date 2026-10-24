import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 14 — building the beat gallery step by step: figures, auto-fill columns, images, feature. Steps. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Build the beat gallery',
  summary: 'Everything from this chapter in one place. Four steps, and Kofi\'s twelve covers become a gallery with captions, a feature cover, and the right number of columns on every screen.',
  minutes: 12,
  outcomes: ['Build a gallery of figures with captions', 'Use auto-fill columns with minmax()', 'Make images fill their cells and feature one cover'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to the gallery',
      steps: [
        { title: '1. The HTML', body: 'One section with a class, and a figure for each beat: cover plus caption.', code: '<section class="gallery">\n  <figure>\n    <img src="cover-1.png" alt="Sunrise in Osu cover">\n    <figcaption>Sunrise in Osu</figcaption>\n  </figure>\n</section>', language: 'html' },
        { title: '2. The grid', body: 'As many columns as fit, at least 150px each.', code: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: 16px;\n}', language: 'css' },
        { title: '3. Tidy figures and images', body: 'Remove the figures\' default margin, and make each cover fill its cell.', code: '.gallery figure { margin: 0; }\n.gallery img { width: 100%; border-radius: 8px; }', language: 'css' },
        { title: '4. The feature', body: 'The newest beat spans two columns and two rows.', code: '.gallery .feature {\n  grid-column: span 2;\n  grid-row: span 2;\n}', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The beat gallery',
      caption: 'All four steps. Try phone and laptop sizes.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }\n  .gallery figure { margin: 0; }\n  .gallery img { width: 100%; border-radius: 8px; }\n  .gallery figcaption { font-size: 0.875rem; }\n  .gallery .feature { grid-column: span 2; grid-row: span 2; }\n</style>\n<section class="gallery">\n  <figure class="feature"><img src="cover-3.png" alt="Night Bus to Kumasi cover"><figcaption>Night Bus to Kumasi (new)</figcaption></figure>\n  <figure><img src="cover-1.png" alt="Sunrise in Osu cover"><figcaption>Sunrise in Osu</figcaption></figure>\n  <figure><img src="cover-2.png" alt="Jollof Bounce cover"><figcaption>Jollof Bounce</figcaption></figure>\n  <figure><img src="cover-1.png" alt="Accra Sunrise Mix cover"><figcaption>Accra Sunrise Mix</figcaption></figure>\n  <figure><img src="cover-2.png" alt="Harmattan Morning cover"><figcaption>Harmattan Morning</figcaption></figure>\n</section>\n',
      challenge: 'Move class="feature" to Harmattan Morning.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Figures for each item, auto-fill columns, images at width: 100%, one feature that spans.',
    },
  ],
  apply: {
    scenario: 'Building the beat gallery.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Write a figure for each beat', 'Make the section a grid with auto-fill columns', 'Tidy the figures and images', 'Make one figure the feature'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make each cover fill its cell: .gallery img gets width 100%',
        starter: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }\n\n</style>\n<section class="gallery"><figure><img src="cover-1.png" alt="Sunrise in Osu cover"></figure></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }\n  .gallery img { width: 100%; }\n</style>\n<section class="gallery"><figure><img src="cover-1.png" alt="Sunrise in Osu cover"></figure></section>\n',
        hint: '.gallery img { width: 100%; }',
        checks: [
          { message: 'Covers fill their cells', dom: { selector: '.gallery img', style: 'width', styleValue: '100%' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'HTML or CSS?',
        groups: ['HTML', 'CSS'],
        items: [
          { text: '<figure class="feature">', group: 0 },
          { text: 'grid-column: span 2', group: 1 },
          { text: '<figcaption>Sunrise in Osu</figcaption>', group: 0 },
          { text: 'repeat(auto-fill, minmax(150px, 1fr))', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why use figure and figcaption for each cover?',
        options: [
          { text: 'They tie each cover to its title, for everyone, including screen reader users' },
          { text: 'Grid only works with figures', why: 'Any element can be a grid item.' },
          { text: 'To make the covers round', why: 'That\'s border-radius.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the reason the covers have big gaps on each side inside their cells.',
        language: 'css',
        lines: ['.gallery { display: grid; gap: 16px; }', '.gallery img { width: 100%; }', '/* no rule for .gallery figure */'],
        bug: 2,
        explanation: 'Figures have default side margins (often 40px). Add .gallery figure { margin: 0; }.',
        fix: '.gallery figure { margin: 0; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'On my phone the big cover is two covers wide. Is that right?',
        options: [
          { text: 'No, it\'s broken.', why: 'Spanning two columns on a two-column phone fills the row.' },
          { text: 'Yes, it spans two columns, so on your phone it fills the whole row. Nice and big.' },
          { text: 'It should be tiny on phones.', why: 'The feature should be the biggest.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['.gallery figure { margin: 0; }', 'No default figure gaps'],
          ['.gallery img { width: 100%; }', 'Covers fill their cells'],
          ['.feature { grid-column: span 2; }', 'The newest is bigger'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On a 360px phone (2 columns), where does the second figure go?',
        code: '.feature { grid-column: span 2; grid-row: span 2; }\n\n<figure class="feature">...</figure>\n<figure>...</figure>',
        language: 'html',
        options: [
          { text: 'Beside the feature', why: 'The feature takes both columns.' },
          { text: 'Nowhere', why: 'It fills the next free cell.' },
          { text: 'Below the feature, which fills the first two rows' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tidy the figures and images.',
        language: 'css',
        template: '.gallery figure { [[1]]: 0; }\n.gallery img { width: [[2]]; }',
        blanks: [['margin'], ['100%']],
        distractors: ['padding', '150px', 'auto'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element holds a cover\'s title under it? (tag name)',
        answers: ['figcaption', '<figcaption>'],
        placeholder: 'A tag',
      },
    ],
  },
  reflect: {
    prompt: 'Which pictures on your own site would go in a gallery like this? What would the captions say?',
    starters: ['My gallery would show...', 'The captions...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Build the four-step gallery on your own page with your own pictures and captions.',
  },
  notes: 'figure default margin 1em 40px in most browser stylesheets. On a two-column grid the span-2 feature fills full rows. width: 100% inside a grid cell matches the cell width.',
};

export default lesson;
