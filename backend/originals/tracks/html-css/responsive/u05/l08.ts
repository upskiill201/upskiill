import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 8 — images that fit: max-width, height: auto with width/height attributes, object-fit. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Pictures that fit and don\'t squash',
  summary: 'The covers shrink on phones now, but the photo of Kofi\'s phone studio looks squashed, tall and thin. Tey explains the one extra line that keeps pictures in shape.',
  minutes: 11,
  outcomes: ['Keep images in proportion with height: auto', 'Explain why width and height attributes still help', 'Fill a box with an image using object-fit'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Remember the size attributes?</strong> In Course 1 you gave pictures width and height in the HTML, so the page doesn\'t jump while they load. Keep them. But when max-width: 100% shrinks the width on a phone, the height attribute stays the same, and the picture gets squashed.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>The fix: height: auto.</strong> img { max-width: 100%; height: auto; } shrinks the width to fit and lets the height follow, so the picture keeps its shape. Browsers still use the attributes to save the right amount of space while it loads.</p>',
    },
    {
      kind: 'check',
      question: 'An image has width="800" height="800" and max-width: 100%. On a 360px phone, without height: auto, what happens?',
      options: ['It stays square', 'It\'s squashed: narrow but still 800px tall', 'It disappears'],
      answer: 1,
      explanation: 'The width shrinks to fit, but the height attribute keeps it 800px tall. height: auto fixes it.',
    },
    {
      kind: 'text',
      html: '<p><strong>Filling a box: object-fit.</strong> Sometimes you want every cover in a perfectly square box even if the photo isn\'t square. Give the img a width and height, then object-fit: cover: it fills the box and trims the edges, without squashing.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Squashed vs in shape',
      caption: 'Both images have width and height attributes. Only the second has height: auto. Try it at phone size.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  img { max-width: 100%; border-radius: 8px; }\n  .in-shape { height: auto; }\n</style>\n<img src="images/phone-studio.png" alt="A phone recording a beat in Kofi\'s bedroom studio" width="600" height="400">\n<img class="in-shape" src="images/phone-studio.png" alt="A phone recording a beat in Kofi\'s bedroom studio" width="600" height="400">\n',
      challenge: 'Add height: auto to the img rule, so both are in shape.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Keep width and height attributes, and add img { max-width: 100%; height: auto; }. For square boxes, object-fit: cover.',
    },
  ],
  apply: {
    scenario: 'The squashed photo.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is Kofi\'s photo squashed on a phone?',
        options: [
          { text: 'The width shrinks to fit, but the height attribute keeps it tall' },
          { text: 'The photo file is broken', why: 'It\'s the fixed height.' },
          { text: 'Phones squash all photos', why: 'Only when the height can\'t follow the width.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Keep pictures in shape: img gets max-width 100% and height auto',
        starter: '<style>\n\n</style>\n<img src="images/phone-studio.png" alt="A phone recording a beat in Kofi\'s bedroom studio" width="600" height="400">\n',
        solution: '<style>\n  img { max-width: 100%; height: auto; }\n</style>\n<img src="images/phone-studio.png" alt="A phone recording a beat in Kofi\'s bedroom studio" width="600" height="400">\n',
        hint: 'img { max-width: 100%; height: auto; }',
        checks: [
          { message: 'Shrinks to fit', dom: { selector: 'img', style: 'max-width', styleValue: '100%' } },
          { message: 'Height follows', dom: { selector: 'img', style: 'height', styleValue: 'auto' } },
          { message: 'Size attributes kept', dom: { selector: 'img', attr: 'height' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['max-width: 100%', 'Never wider than its box'],
          ['height: auto', 'Height follows the width'],
          ['object-fit: cover', 'Fill a box, trim the edges'],
          ['width and height attributes', 'Save space while loading'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'In shape on a phone, or squashed?',
        groups: ['In shape', 'Squashed'],
        items: [
          { text: 'max-width: 100%; height: auto;', group: 0 },
          { text: 'max-width: 100% with a fixed height attribute only', group: 1 },
          { text: 'width/height set, with object-fit: cover', group: 0 },
          { text: 'width: 100%; height: 300px; with no object-fit', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I just delete the width and height attributes then?',
        options: [
          { text: 'Yes, they cause the problem.', why: 'They help loading; height: auto fixes the shape.' },
          { text: 'Make them both 100.', why: 'They should be the real image size.' },
          { text: 'Keep them: they stop the page jumping while it loads. height: auto handles the shape.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that squashes the photos on phones.',
        language: 'css',
        lines: ['img { max-width: 100%; height: auto; }', 'img { max-width: 100%; height: 800px; }', 'img { border-radius: 8px; }'],
        bug: 1,
        explanation: 'A fixed height can\'t follow the shrinking width. Use height: auto.',
        fix: 'img { max-width: 100%; height: auto; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A 1200 × 800 photo in a 200 × 200 box. What does it look like?',
        code: 'img { width: 200px; height: 200px; object-fit: cover; }',
        language: 'css',
        options: [
          { text: 'Squashed into a square', why: 'object-fit: cover keeps the proportions and trims.' },
          { text: 'A 200px square, filled, with the sides trimmed, not squashed' },
          { text: 'The full photo with empty bands', why: 'That\'s object-fit: contain.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The standard image rule.',
        language: 'css',
        template: 'img { max-width: [[1]]; height: [[2]]; }',
        blanks: [['100%'], ['auto']],
        distractors: ['800px', 'fit', '100vh'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which value of object-fit fills the box and trims the edges? (one word)',
        answers: ['cover'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Make every gallery cover a square 150px box that fills without squashing: width 150px, height 150px, object-fit cover',
        starter: '<style>\n\n</style>\n<section class="gallery"><img src="images/kofi.png" alt="Kofi wearing headphones"></section>\n',
        solution: '<style>\n  .gallery img { width: 150px; height: 150px; object-fit: cover; }\n</style>\n<section class="gallery"><img src="images/kofi.png" alt="Kofi wearing headphones"></section>\n',
        hint: '.gallery img { width: 150px; height: 150px; object-fit: cover; }',
        checks: [
          { message: 'Fills without squashing', dom: { selector: '.gallery img', style: 'object-fit', styleValue: 'cover' } },
          { message: '150px tall', dom: { selector: '.gallery img', style: 'height', styleValue: '150px' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at every picture on your page on a phone. Are any squashed?',
    starters: ['The one that\'s squashed is...', 'I\'ll add...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add img { max-width: 100%; height: auto; } to your stylesheet, keep your width and height attributes, and check every picture on a phone.',
  },
  notes: 'height: auto with width/height attributes preserves aspect ratio and lets browsers compute aspect-ratio before load (modern browsers map attributes to aspect-ratio). object-fit per MDN. images/phone-studio.png (600x400) and images/kofi.png (400x400) are Teyro-made illustrations.',
};

export default lesson;
