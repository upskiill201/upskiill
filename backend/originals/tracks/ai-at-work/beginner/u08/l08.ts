import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 8 — image tools: what they're good at. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Image tools: what they\'re good at',
  summary: 'Ada wants a cover image for the deck. AI image tools are great at some things and bad at others. Sort the myths from the facts first.',
  minutes: 12,
  outcomes: [
    'Know what AI image tools do well',
    'Know where they usually fail',
    'Decide when to use a photo, a chart or an AI image',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'AI image tools are good at mood, style and illustration, like "a bright market stall at sunrise".',
          isFact: true,
          explain: 'Atmosphere and illustration are their strength. Use them for covers, section breaks and concept images.',
        },
        {
          text: 'AI image tools reliably draw accurate text, logos and numbers.',
          isFact: false,
          explain: 'They often garble words and invent logos. Add text yourself in the slide tool instead.',
        },
        {
          text: 'An AI image can show real data, like your pilot\'s payment growth.',
          isFact: false,
          explain: 'Images aren\'t data. Use a real chart from your spreadsheet for numbers.',
        },
        {
          text: 'Real photos of your actual shops are often more convincing than AI images.',
          isFact: true,
          explain: 'For a pilot story, real photos (with permission) show it really happened. AI images can\'t.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'AI images for mood and concepts. Real charts for numbers. Real photos (with permission) for real events. Add text yourself.',
    },
  ],
  apply: {
    scenario: 'Ada chooses visuals for the deck.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Best visual for each slide?',
        groups: ['AI image', 'Real chart', 'Real photo'],
        items: [
          { text: 'A cover with a bright market mood', group: 0 },
          { text: 'Weekly payment growth', group: 1 },
          { text: 'Shop owners at the launch morning', group: 2 },
          { text: 'Failure rate by week', group: 1 },
          { text: 'A section break: "What\'s next"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What do AI image tools often get wrong?',
        options: [
          { text: 'Text, logos and numbers in the image' },
          { text: 'Colours', why: 'Text and logos are the usual problem.' },
          { text: 'Lighting', why: 'Text and logos are the usual problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can you generate an image of a chart showing our growth? Looks fancier than Excel.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'An AI image might draw the numbers wrong. I\'ll make the chart from the real data and style it nicely instead.' },
          { text: 'Sure, it\'s close enough.', why: 'Images aren\'t data.' },
          { text: 'Charts are boring; skip it.', why: 'The chart is the evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'AI images for [[1]]. Real charts for [[2]].',
        blanks: [['mood'], ['numbers']],
        distractors: ['data', 'jokes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which visual plan is a mistake?',
        lines: [
          'Cover: AI illustration of a market at sunrise',
          'Slide 3: real chart of weekly payments',
          'Slide 4: AI image of "our 50 real shops"',
          'Slide 6: photo from launch morning, with permission',
        ],
        bug: 2,
        fix: 'Use real photos of the shops, with permission, or no image.',
        explanation: 'An AI image presented as your real shops is misleading.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the need to the right visual.',
        pairs: [
          ['Set the mood', 'AI illustration'],
          ['Prove growth', 'Chart from real data'],
          ['Show it happened', 'Real photo'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI image has garbled words on a shop sign. What should Ada do?',
        options: [
          { text: 'Use an image with no text, and add any words in the slide tool' },
          { text: 'Keep it; nobody will notice', why: 'Garbled text looks sloppy.' },
          { text: 'Ask for more text', why: 'More text, more garbling.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Real photos of shop owners need their ... (one word)',
        answers: ['permission', 'consent'],
        placeholder: 'One word',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s visuals rule.',
        tiles: ['Real', 'data,', 'real', 'chart'],
        distractors: ['fake'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'AI images draw logos accurately', group: 0 },
          { text: 'AI images are good at mood', group: 1 },
          { text: 'An AI image can show real data', group: 0 },
          { text: 'Real photos prove it happened', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada picks a visual.',
        lines: ['Ask what the slide must show', 'Numbers? Use a real chart', 'Real event? Use a real photo', 'Mood or concept? Try an AI image'],
      },
      {
        kind: 'mcq',
        prompt: 'Why add text in the slide tool rather than in the AI image?',
        options: [
          { text: 'Slide tools render text exactly; image tools often garble it' },
          { text: 'It\'s required', why: 'It\'s about accuracy.' },
          { text: 'No difference', why: 'Image tools often garble text.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'For your next deck, which slides need a real chart, a real photo or just a mood image?',
    starters: ['Real chart:', 'Mood image:'],
  },
  deepen: { title: 'Try it today', summary: 'Generate one mood image with no text in it. Add your title on top in your slide tool.' },
  notes: 'Image models\' weaknesses with text and fine detail are well known, though improving. Always get consent before using photos of people.',
};

export default lesson;
