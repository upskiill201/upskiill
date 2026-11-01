import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 8 — width vs max-width, %, why fixed widths break on phones. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Too wide for Ama\'s phone',
  summary: 'Kofi makes the cards 500px wide. On his laptop: lovely. On Ama\'s old phone: the cards hang off the edge and she has to scroll sideways. Tey explains the fix every phone needs: max-width.',
  minutes: 11,
  outcomes: ['Explain why fixed widths break on small screens', 'Use max-width so a box shrinks on phones', 'Use % for widths that follow the screen'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Fixed widths don\'t bend.</strong> width: 500px means 500px, even on a phone screen that\'s only about 360px wide. The card sticks out, and the page scrolls sideways. Ama hates that.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>% follows the space.</strong> width: 100% means "as wide as the space I\'m in". On a phone, that\'s the phone. On a laptop, that\'s a huge, stretched card, which can look odd too.</p>',
    },
    {
      kind: 'check',
      question: 'A card is width: 500px. Ama\'s screen is about 360px wide. What happens?',
      options: ['It shrinks to fit', 'It sticks out, and the page scrolls sideways', 'It disappears'],
      answer: 1,
      explanation: 'A fixed width never shrinks. Part of the card is off the screen.',
    },
    {
      kind: 'text',
      html: '<p><strong>max-width: the best of both.</strong> max-width: 500px means "up to 500px, but never wider than the space". On a laptop the card stops at 500px. On Ama\'s phone it shrinks to fit. One line, every screen.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Shrink the preview',
      caption: 'Switch the preview to phone size. The first card sticks out; the second shrinks.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { border: 2px solid #FF9600; padding: 16px; margin-bottom: 16px; }\n  h2 { margin: 0; }\n</style>\n<article style="width: 500px;"><h2>width: 500px</h2></article>\n<article style="max-width: 500px;"><h2>max-width: 500px</h2></article>\n',
      challenge: 'Change the first card to max-width too. Now neither sticks out.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'width is fixed; max-width bends. For cards, images and columns, prefer max-width.',
    },
  ],
  apply: {
    scenario: 'Ama scrolls sideways.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does Ama have to scroll sideways?',
        options: [
          { text: 'Her phone is broken', why: 'Any small screen would do the same.' },
          { text: 'The padding is too small', why: 'It\'s the fixed width.' },
          { text: 'The cards are a fixed 500px, wider than her screen' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the cards: replace width: 500px with max-width: 500px',
        starter: '<style>\n  article { border: 2px solid #FF9600; width: 500px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; max-width: 500px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        hint: 'Change width to max-width.',
        checks: [
          { message: 'Up to 500px', dom: { selector: 'article', style: 'max-width', styleValue: '500px' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Will it shrink on a small phone?',
        groups: ['Shrinks', 'Sticks out'],
        items: [
          { text: 'max-width: 500px', group: 0 },
          { text: 'width: 500px', group: 1 },
          { text: 'width: 100%', group: 0 },
          { text: 'width: 800px', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['width: 500px', 'Always 500px'],
          ['width: 100%', 'As wide as the space'],
          ['max-width: 500px', 'Up to 500px, smaller if needed'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'The pictures go off the side of my phone too!',
        options: [
          { text: 'Buy a bigger phone.', why: 'Ama\'s phone is the test. Fix the page.' },
          { text: 'I\'ll give the images max-width: 100%, so they shrink to fit the card.' },
          { text: 'I\'ll make them 800px wide.', why: 'Even wider.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will make Ama scroll sideways.',
        language: 'css',
        lines: ['img { max-width: 100%; }', 'article { width: 600px; }', 'p { max-width: 40rem; }'],
        bug: 1,
        explanation: 'A fixed 600px is wider than most phones. Use max-width: 600px.',
        fix: 'article { max-width: 600px; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On a laptop 1200px wide, how wide is the card?',
        code: 'article { max-width: 500px; }',
        language: 'css',
        options: [
          { text: '1200px', why: 'max-width stops it at 500px.' },
          { text: 'Exactly as wide as the words', why: 'It fills the space up to 500px.' },
          { text: '500px: it stops there' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make images fit their card on any screen.',
        language: 'css',
        template: 'img { [[1]]: [[2]]; }',
        blanks: [['max-width'], ['100%']],
        distractors: ['width', '800px', 'min-width'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property lets a box shrink but never grow past a size? (hyphenated)',
        answers: ['max-width'],
        placeholder: 'A property',
      },
      {
        kind: 'writeCode',
        prompt: 'Stop the cover image from sticking out: give img a max-width of 100%',
        starter: '<style>\n\n</style>\n<article>\n  <img src="cover-1.png" alt="Sunrise in Osu cover">\n</article>\n',
        solution: '<style>\n  img { max-width: 100%; }\n</style>\n<article>\n  <img src="cover-1.png" alt="Sunrise in Osu cover">\n</article>\n',
        hint: 'img { max-width: 100%; }',
        checks: [
          { message: 'Images shrink to fit', dom: { selector: 'img', style: 'max-width', styleValue: '100%' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Open your own page on the smallest phone you can find. Does anything stick out?',
    starters: ['On a small phone...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find every fixed width on your page and swap it for max-width. Add img { max-width: 100%; }.',
  },
  notes: 'Common phone viewport widths are around 360–430 CSS px. max-width per MDN; img { max-width: 100% } is the standard flexible-image pattern. Inline style attributes in the tryIt only to compare two cards side by side.',
};

export default lesson;
