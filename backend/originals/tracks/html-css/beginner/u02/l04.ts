import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4 — numbered lists: ol, when order matters, and start. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Numbered lists',
  summary: 'Kofi\'s track list has an order: track 1 opens the set, track 3 is the big finish. When order matters, the list gets numbers, and the browser counts for you.',
  minutes: 11,
  outcomes: ['Make a numbered list with ol', 'Choose between ul and ol', 'Start a list at a different number'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap the parts of Kofi\'s track list',
      text: '<h2>Tonight\'s set</h2>\n<ol>\n  <li>Sunrise in Osu</li>\n  <li>Jollof Bounce</li>\n  <li>Night Bus to Kumasi</li>\n</ol>\n<ol start="4">\n  <li>Encore</li>\n</ol>',
      hotspots: [
        { phrase: '<ol>', note: 'ol means "ordered list": the order matters, so the browser numbers each item 1, 2, 3...' },
        { phrase: '<li>Sunrise in Osu</li>', note: 'The same li as in a bullet list. The ol around it is what turns bullets into numbers.' },
        { phrase: '<li>Night Bus to Kumasi</li>', note: 'You never type the numbers. Move this line to the top and it becomes number 1.' },
        { phrase: '<ol start="4">', note: 'The start attribute makes the list count from 4 instead of 1. Handy when a list continues after a break.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The browser counts for you',
      caption: 'Kofi\'s set, numbered. Swap two lines and watch the numbers stay in order.',
      code: '<h2>Tonight\'s set</h2>\n<ol>\n  <li>Sunrise in Osu</li>\n  <li>Jollof Bounce</li>\n  <li>Night Bus to Kumasi</li>\n</ol>\n',
      challenge: 'Move Night Bus to Kumasi to the top. Then change ol to ul and see the numbers turn into bullets.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'ol when order matters (steps, rankings, a set list). ul when it doesn\'t (genres, things to bring). Both use li.',
    },
  ],
  apply: {
    scenario: 'Kofi plans his set.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which list should Kofi\'s set list be?',
        options: [
          { text: 'ol, because the order of the tracks matters' },
          { text: 'ul, because all lists are ul', why: 'There are two kinds. When order matters, use ol.' },
          { text: 'A paragraph', why: 'Three tracks in order is a perfect numbered list.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a numbered list of Kofi\'s set: Sunrise in Osu, Jollof Bounce, Night Bus to Kumasi',
        starter: '',
        solution: '<ol>\n  <li>Sunrise in Osu</li>\n  <li>Jollof Bounce</li>\n  <li>Night Bus to Kumasi</li>\n</ol>\n',
        hint: '<ol>, three <li> lines, </ol>.',
        checks: [
          { message: 'A numbered list with three tracks', dom: { selector: 'ol > li', count: 3 } },
          { message: 'Sunrise in Osu is in it', dom: { selector: 'ol li', text: 'Sunrise in Osu' } },
          { message: 'Night Bus to Kumasi is in it', dom: { selector: 'ol li', text: 'Night Bus to Kumasi' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Numbered (ol) or bullets (ul)?',
        groups: ['ol', 'ul'],
        items: [
          { text: 'Kofi\'s top 3 beats, best first', group: 0 },
          { text: 'Genres he makes', group: 1 },
          { text: 'Steps to download a beat', group: 0 },
          { text: 'Things to bring to the gig', group: 1 },
          { text: 'The order of tonight\'s set', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What number does Encore get?',
        code: '<ol start="4">\n  <li>Encore</li>\n</ol>',
        language: 'html',
        options: [
          { text: '1', why: 'start="4" makes the list begin at 4.' },
          { text: '4' },
          { text: 'No number', why: 'It\'s an ol, so it\'s numbered, starting at 4.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Why don\'t you just type 1. 2. 3. in front of each track?',
        options: [
          { text: 'Because ol counts for me. If I reorder the tracks, the numbers fix themselves.' },
          { text: 'Good idea, I\'ll do that.', why: 'Then every time Kofi changes the order, he has to fix every number by hand.' },
          { text: 'Numbers aren\'t allowed in HTML.', why: 'They are. But ol does the counting for you, which is better.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the numbered list.',
        language: 'html',
        template: '<[[1]]>\n  <[[2]]>Sunrise in Osu</li>\n</ol>',
        blanks: [['ol'], ['li']],
        distractors: ['ul', 'list', 'p'],
      },
      {
        kind: 'writeCode',
        prompt: 'The set has a bonus round. Make a numbered list that starts at 4 with one item: Encore',
        starter: '<ol>\n  <li>Encore</li>\n</ol>\n',
        solution: '<ol start="4">\n  <li>Encore</li>\n</ol>\n',
        hint: 'Add start="4" inside the opening ol tag.',
        checks: [
          { message: 'The list starts at 4', dom: { selector: 'ol', attr: 'start', attrValue: '4' } },
          { message: 'Encore is in the list', dom: { selector: 'ol li', text: 'Encore' } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which tag makes a numbered list?',
        answers: ['ol', '<ol>'],
        placeholder: 'Two letters',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each list to its tag.',
        pairs: [
          ['Bullets, order doesn\'t matter', 'ul'],
          ['Numbers, order matters', 'ol'],
          ['One item in either list', 'li'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Kofi\'s top 3: an h2 My top 3, then a numbered list with three beats',
        starter: '',
        solution: '<h2>My top 3</h2>\n<ol>\n  <li>Jollof Bounce</li>\n  <li>Sunrise in Osu</li>\n  <li>Night Bus to Kumasi</li>\n</ol>\n',
        hint: 'An h2, then an ol with three li.',
        checks: [
          { message: 'A heading My top 3', dom: { selector: 'h2', text: 'My top 3' } },
          { message: 'A numbered list of three', dom: { selector: 'ol > li', count: 3 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s your top 3 of anything right now? Songs, foods, films? Why is number 1 number 1?',
    starters: ['My top 3 is...', 'Number 1 wins because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write the steps of a recipe you know as a numbered list. Then shuffle them and watch the numbers follow.',
  },
  notes: 'HTML Living Standard §4.4.5 ol ("a list of items, where the items have been intentionally ordered"), start attribute (integer). Track names match Teyro-made cover art in frontend/public/originals/html-css (cover-1..3).',
};

export default lesson;
