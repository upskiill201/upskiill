import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 18 — the learner's own page gets CSS. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your page gets style',
  summary: 'Miracle\'s challenge from Chapter 1 continues: your own page. It has your name, the things you love, links and a picture. Now it gets a look that\'s yours, in four steps.',
  minutes: 12,
  outcomes: ['Style your own page with a body rule, headings and links', 'Pick three colours and two fonts', 'Make your text easy to read'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to your own look',
      steps: [
        { title: '1. The page', body: 'A body rule: your background, your text colour and your body font with fallbacks.', code: 'body {\n  background-color: ivory;\n  color: black;\n  font-family: Verdana, sans-serif;\n}', language: 'css' },
        { title: '2. The accent', body: 'One accent colour, on headings and links, grouped in one rule.', code: 'h1, h2, a { color: teal; }', language: 'css' },
        { title: '3. The headings', body: 'A heading font and size, if you want them to stand out.', code: 'h1 { font-family: Georgia, serif; font-size: 40px; }', language: 'css' },
        { title: '4. Breathing room', body: 'Easy-to-read paragraphs.', code: 'p { line-height: 1.6; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Your page, styled',
      caption: 'Swap in your own name, colours and fonts.',
      code: '<style>\n  body { background-color: ivory; color: black; font-family: Verdana, sans-serif; }\n  h1, h2, a { color: teal; }\n  h1 { font-family: Georgia, serif; font-size: 40px; }\n  p { line-height: 1.6; }\n</style>\n<h1>Your name</h1>\n<p>One line about you.</p>\n<h2>Things I love</h2>\n<p><a href="#">Something you love</a></p>\n',
      challenge: 'Change the three colours and two fonts to ones that feel like you.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Page, accent, headings, breathing room. Three colours, two fonts.',
    },
  ],
  apply: {
    scenario: 'You style your own page.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the four steps in order.',
        lines: ['Style the page with body', 'Add one accent colour', 'Style the headings', 'Give paragraphs breathing room'],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 1: give the page an ivory background, black text and Verdana with a sans-serif fallback',
        starter: '<style>\n\n</style>\n<h1>Your name</h1>\n',
        solution: '<style>\n  body { background-color: ivory; color: black; font-family: Verdana, sans-serif; }\n</style>\n<h1>Your name</h1>\n',
        hint: 'One body rule with three properties.',
        checks: [
          { message: 'An ivory page', dom: { selector: 'body', style: 'background-color', styleValue: 'ivory' } },
          { message: 'Black text', dom: { selector: 'body', style: 'color', styleValue: 'black' } },
          { message: 'Verdana with a fallback', dom: { selector: 'body', style: 'font-family', styleValue: 'Verdana, sans-serif' } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: one grouped rule that makes h1, h2 and links teal',
        starter: '<style>\n\n</style>\n<h1>Your name</h1>\n<h2>Things I love</h2>\n<p><a href="#">Football</a></p>\n',
        solution: '<style>\n  h1, h2, a { color: teal; }\n</style>\n<h1>Your name</h1>\n<h2>Things I love</h2>\n<p><a href="#">Football</a></p>\n',
        hint: 'h1, h2, a { color: teal; }',
        checks: [
          { message: 'Teal h1', dom: { selector: 'h1', style: 'color', styleValue: 'teal' } },
          { message: 'Teal h2', dom: { selector: 'h2', style: 'color', styleValue: 'teal' } },
          { message: 'Teal links', dom: { selector: 'a', style: 'color', styleValue: 'teal' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many accent colours should your first design use?',
        options: [
          { text: 'One per heading', why: 'One accent, used everywhere, looks like a brand.' },
          { text: 'One' },
          { text: 'As many as possible', why: 'Remember Kofi\'s rainbow page.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good for your page, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Fallback fonts', group: 0 },
          { text: 'Centred long paragraphs', group: 1 },
          { text: 'One accent on links and headings', group: 0 },
          { text: 'Five different fonts', group: 1 },
          { text: 'line-height: 1.6', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Does your page look like you yet?',
        options: [
          { text: 'Getting there. My colours feel like me, and the text is easy to read.' },
          { text: 'I copied Kofi\'s exactly.', why: 'Make it yours: your colours, your fonts.' },
          { text: 'I added every colour.', why: 'Three colours, one accent.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that stops the rest working.',
        language: 'css',
        lines: ['body { background-color: ivory; }', 'h1, h2, a { color: teal;', 'p { line-height: 1.6; }'],
        bug: 1,
        explanation: 'A missing closing brace swallows the p rule.',
        fix: 'h1, h2, a { color: teal; }',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the heading rule.',
        language: 'css',
        template: 'h1 { font-family: Georgia, [[1]]; font-[[2]]: 40px; }',
        blanks: [['serif'], ['size']],
        distractors: ['bold', 'weight', 'monospace'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many fonts does Tey suggest for your page? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Your accent is pale yellow on an ivory page. What\'s the problem?',
        options: [
          { text: 'Yellow isn\'t allowed', why: 'It is. It just needs enough contrast.' },
          { text: 'It\'s hard to read: too little difference from the background' },
          { text: 'Nothing', why: 'Pale on pale is hard to read. Chapter 5 shows how to check.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Describe your page\'s new look in three words. Do they match who you are?',
    starters: ['Three words:', 'They match because...'],
  },
  deepen: {
    title: 'Your page, styled',
    summary: 'In the playground, give your own page all four steps: body, accent, headings, breathing room. Keep it: Chapter 5 publishes it.',
  },
  notes: 'Continues the learner\'s own page (Chapter 1 l18). Contrast is taught properly in Chapter 5.',
};

export default lesson;
