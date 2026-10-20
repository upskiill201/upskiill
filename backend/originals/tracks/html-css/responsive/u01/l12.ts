import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 12 — the finished beat-card stylesheet, line by line. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Anatomy of a beat card',
  summary: 'Miracle sends back Kofi\'s card CSS with nothing changed. "This is good. Tell me why each line is there." Tap each line and find out what it\'s doing.',
  minutes: 11,
  outcomes: ['Read a complete card stylesheet', 'Explain the job of each box property', 'Give a card a background that fills its padding'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of the beat card',
      text: '* { box-sizing: border-box; }\narticle {\n  max-width: 500px;\n  background-color: #1F2E52;\n  padding: 16px;\n  border: 2px solid #FF9600;\n  border-radius: 12px;\n  margin-bottom: 16px;\n}\narticle h2 { margin: 0 0 8px; }\narticle img { max-width: 100%; border-radius: 8px; }',
      hotspots: [
        { phrase: '* { box-sizing: border-box; }', note: 'Every box counts padding and border inside its width. Sizes mean what they say.' },
        { phrase: 'max-width: 500px;', note: 'Up to 500px on a laptop, shrinking to fit on Ama\'s phone.' },
        { phrase: 'background-color: #1F2E52;', note: 'A slightly lighter night blue, so the card lifts off the page. It fills the padding too.' },
        { phrase: 'padding: 16px;', note: 'Room inside, so the name and cover don\'t touch the border.' },
        { phrase: 'border-radius: 12px;', note: 'Soft corners. Calm, and it matches the rounded cover below.' },
        { phrase: 'margin-bottom: 16px;', note: 'The gap between one card and the next.' },
        { phrase: 'article h2 { margin: 0 0 8px; }', note: 'Removes the heading\'s default space on top, which would add to the padding, and keeps 8px below it.' },
        { phrase: 'article img { max-width: 100%; border-radius: 8px; }', note: 'The cover never sticks out of the card, and its corners echo the card\'s.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The beat card',
      caption: 'The whole card. Switch the preview between phone and laptop size.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { max-width: 500px; background-color: #1F2E52; padding: 16px; border: 2px solid #FF9600; border-radius: 12px; margin-bottom: 16px; }\n  article h2 { margin: 0 0 8px; }\n  article img { max-width: 100%; border-radius: 8px; }\n</style>\n<article>\n  <h2>Sunrise in Osu</h2>\n  <img src="cover-1.png" alt="Album cover for Sunrise in Osu">\n  <p>Slow, warm, made at 5am.</p>\n</article>\n',
      challenge: 'Delete the article h2 rule. See the extra space appear above the name?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A good card: border-box, max-width, a background, padding, a calm border, a gap below, and images that fit.',
    },
  ],
  apply: {
    scenario: 'Why each line is there.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['max-width: 500px', 'Shrinks on phones'],
          ['padding: 16px', 'Room inside the card'],
          ['margin-bottom: 16px', 'Gap to the next card'],
          ['border-radius: 12px', 'Soft corners'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Lift the card off the page: give it the background #1F2E52 and 16px of padding',
        starter: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  article { border: 2px solid #FF9600; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  article { border: 2px solid #FF9600; background-color: #1F2E52; padding: 16px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        hint: 'background-color: #1F2E52; padding: 16px;',
        checks: [
          { message: 'Card background', dom: { selector: 'article', style: 'background-color', styleValue: '#1F2E52' } },
          { message: 'Room inside', dom: { selector: 'article', style: 'padding-top', styleValue: '16px' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why remove the h2\'s top margin inside the card?',
        options: [
          { text: 'It adds to the padding, making a bigger gap at the top than the sides' },
          { text: 'Headings can\'t have margins', why: 'They have default ones. That\'s the point.' },
          { text: 'To make the heading bigger', why: 'Margin doesn\'t change text size.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Inside the card\'s border, or outside it?',
        groups: ['Inside', 'Outside'],
        items: [
          { text: 'The card background', group: 0 },
          { text: 'margin-bottom', group: 1 },
          { text: 'padding', group: 0 },
          { text: 'The page\'s night blue', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Why #1F2E52 for the card, not the same night blue as the page?',
        options: [
          { text: 'A slightly lighter blue lifts the card off the page, so you can see where it begins even without the border.' },
          { text: 'No reason.', why: 'It separates the card from the page.' },
          { text: 'Because the page colour can\'t be reused.', why: 'It can. Lighter just stands out.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will let the cover stick out on a phone.',
        language: 'css',
        lines: ['article { max-width: 500px; padding: 16px; }', 'article img { width: 600px; }', 'article h2 { margin: 0 0 8px; }'],
        bug: 1,
        explanation: 'A fixed 600px image is wider than the card. Use max-width: 100%.',
        fix: 'article img { max-width: 100%; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On a 1200px laptop, how wide is each card?',
        code: '* { box-sizing: border-box; }\narticle { max-width: 500px; padding: 16px; border: 2px solid #FF9600; }',
        language: 'css',
        options: [
          { text: '500px, edges and all' },
          { text: '536px', why: 'border-box keeps padding and border inside.' },
          { text: '1200px', why: 'max-width stops it at 500px.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the cover rule.',
        language: 'css',
        template: 'article img { [[1]]: 100%; border-radius: [[2]]; }',
        blanks: [['max-width'], ['8px']],
        distractors: ['width', 'margin', '600px'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property makes the gap between one card and the next? (hyphenated, one side)',
        answers: ['margin-bottom', 'margin'],
        placeholder: 'A property',
      },
      {
        kind: 'writeCode',
        prompt: 'Remove the space above the card heading: article h2 gets margin-top 0',
        starter: '<style>\n  article { padding: 16px; border: 2px solid #FF9600; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  article { padding: 16px; border: 2px solid #FF9600; }\n  article h2 { margin-top: 0; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        hint: 'article h2 { margin-top: 0; }',
        checks: [
          { message: 'No space above the name', dom: { selector: 'h2', style: 'margin-top', styleValue: '0px' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Explain one card on your own page, line by line, the way Miracle asked Kofi to.',
    starters: ['This line is there because...', 'I\'m not sure why...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Copy the beat-card rules into your page and change the colours to your own palette.',
  },
  notes: '#1F2E52 is a lighter tint of Kofi\'s night blue; cream #FFF6E5 on it stays well above 4.5:1 (about 12.5:1). Image is the course\'s own cover-1.png.',
};

export default lesson;
