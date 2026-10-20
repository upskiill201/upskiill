import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 16 — Flexbox myths. Myth or fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Flexbox: myth or fact?',
  summary: 'Clinton has started reading about Flexbox too, and he\'s collected some confident claims. Sort them before Kofi builds anything on top of them.',
  minutes: 11,
  outcomes: ['Separate Flexbox myths from facts', 'Remember that justify-content follows the flex direction', 'Know what Flexbox is and isn\'t for'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'display: flex affects every element inside, however deep.', isFact: false, explain: 'Only direct children become flex items. Grandchildren behave normally unless their parent is a flex container too.' },
        { text: 'justify-content always works left to right.', isFact: false, explain: 'It works along the direction items flow. In a column, that\'s top to bottom.' },
        { text: 'gap works in Flexbox, not just Grid.', isFact: true, explain: 'gap spaces flex items, and the rows when they wrap.' },
        { text: 'The order property changes the order screen readers read things.', isFact: false, explain: 'It changes only what\'s on screen. Screen readers and keyboards follow the HTML.' },
        { text: 'Flexbox is designed for one direction at a time.', isFact: true, explain: 'A row or a column. For rows and columns at once, like a gallery grid, CSS Grid is the better tool: next chapter.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Only the children',
      caption: 'The section is flex, so the two articles sit side by side. Inside each article, the h2 and p still stack.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  section { display: flex; gap: 16px; }\n  article { flex-grow: 1; background-color: #1F2E52; padding: 16px; border-radius: 12px; }\n</style>\n<section>\n  <article><h2>Sunrise in Osu</h2><p>Slow and warm.</p></article>\n  <article><h2>Jollof Bounce</h2><p>Fast and loud.</p></article>\n</section>\n',
      challenge: 'Add article { display: flex; }. Now the h2 and p inside each card sit side by side too.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s Flexbox claims.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Flex lines up grandchildren too', group: 0 },
          { text: 'gap works in Flexbox', group: 1 },
          { text: 'order changes what screen readers hear', group: 0 },
          { text: 'Flexbox handles one direction at a time', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In a column, what does justify-content: center do?',
        options: [
          { text: 'Centres items top to bottom' },
          { text: 'Centres items left to right', why: 'In a column, that\'s align-items.' },
          { text: 'Nothing in a column', why: 'It works along the column.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the cards\' insides line up in a row too: display flex on article',
        starter: '<style>\n  section { display: flex; gap: 16px; }\n\n</style>\n<section><article><h2>Sunrise in Osu</h2><p>Slow and warm.</p></article></section>\n',
        solution: '<style>\n  section { display: flex; gap: 16px; }\n  article { display: flex; }\n</style>\n<section><article><h2>Sunrise in Osu</h2><p>Slow and warm.</p></article></section>\n',
        hint: 'article { display: flex; }',
        checks: [
          { message: 'The card is a flex container too', dom: { selector: 'article', style: 'display', styleValue: 'flex' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Flex reaches every level"', 'Only direct children'],
          ['"justify is always horizontal"', 'It follows the flow'],
          ['"order fixes reading order"', 'Screen only, HTML decides'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'So should Kofi use Flexbox for his gallery of twelve covers in neat rows AND columns?',
        options: [
          { text: 'Flexbox can wrap them, but for rows and columns that line up both ways, Grid is the better tool. Next chapter.' },
          { text: 'Flexbox is the only layout tool.', why: 'Grid exists for exactly this.' },
          { text: 'Use a table.', why: 'Tables are for data.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s myth.',
        lines: ['Only direct children are flex items.', 'gap only works in Grid.', 'align-self moves one item across the row.'],
        bug: 1,
        explanation: 'gap works in Flexbox too.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How do the h2 and p sit inside each article?',
        code: 'section { display: flex; }\n\n<section>\n  <article><h2>A</h2><p>a</p></article>\n</section>',
        language: 'html',
        options: [
          { text: 'Stacked: they\'re grandchildren of the flex section' },
          { text: 'Side by side', why: 'Only the article is a flex item.' },
          { text: 'Hidden', why: 'They show, stacked as normal.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the facts.',
        template: 'Flexbox lines up direct [[1]] in one [[2]] at a time.',
        blanks: [['children'], ['direction']],
        distractors: ['grandchildren', 'page', 'colour'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which layout tool is next, for rows and columns at once? (one word, CSS ___)',
        answers: ['grid'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Is "order changes what screen readers hear" a myth or a fact?',
        options: [
          { text: 'Myth: screen readers follow the HTML order' },
          { text: 'Fact', why: 'order only changes the screen.' },
          { text: 'Only on phones', why: 'It never changes reading order.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these had you believed?',
    starters: ['I thought...', 'Now I know...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN basic concepts of flexbox" and read the part about the main axis and the cross axis.',
  },
  notes: 'Flexbox is one-dimensional; Grid is two-dimensional (MDN "Relationship of grid layout to other layout methods"). gap for flexbox shipped in all major engines by 2021.',
};

export default lesson;
