import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Chat: a story and a number. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'A story and a number',
  summary: 'Lucía\'s middle section is all numbers. Tey shows her how to pair each big number with a small story, starting with Doña Rosa\'s corner shop.',
  minutes: 11,
  outcomes: [
    'Pair a number with a short story',
    'Tell a work story in under a minute',
    'Keep numbers few and memorable',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Numbers prove. Stories make people care. Pair them: one short story, then the number that shows it wasn\'t a one-off.', replies: ['What story would I use?'] },
        { tey: 'Sofía\'s visit to Doña Rosa\'s shop in Guadalajara. Customers kept asking for "something spicy with lime". That\'s 40 seconds.', replies: ['And then the number?'] },
        { tey: '"We asked 200 more shop owners. 140 said the same." Now the story is evidence, not an anecdote.', replies: ['How many numbers should I use?'] },
        { tey: 'Few. Three or four in 15 minutes, each with a picture or a story. A slide of 20 numbers is a slide of none.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One short story, then the number that shows it\'s real. Three or four numbers in a whole talk.',
    },
  ],
  apply: {
    scenario: 'A story and a number.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the pairing.',
        lines: ['A short story', 'The number behind it', 'What it means'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Doña Rosa\'s customers ask for?',
        options: [
          { text: '"Something spicy with lime"' },
          { text: 'Bigger bags', why: 'Spicy with lime.' },
          { text: 'Cheaper chips', why: 'Spicy with lime.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of 200 more shop owners, how many said the same?',
        answers: ['140', 'one hundred and forty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Story or number?',
        groups: ['Story', 'Number'],
        items: [
          { text: 'Sofía\'s visit to Doña Rosa', group: 0 },
          { text: '140 of 200 shop owners', group: 1 },
          { text: 'A customer asking for lime', group: 0 },
          { text: '38% above target', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the job to the tool.',
        pairs: [
          ['Makes people care', 'A story'],
          ['Proves it\'s not a one-off', 'A number'],
          ['Makes a number stick', 'A picture or a story'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Isn\'t one shop owner\'s story too small for 300 people?',
        prompt: "Tey\'s best reply?",
        options: [
          { text: 'Small stories are easy to picture. The 140 of 200 shows it\'s big. Together they\'re stronger than either.' },
          { text: 'Yes, use only numbers.', why: 'Stories make people care.' },
          { text: 'Tell ten stories instead.', why: 'One story, one number.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Numbers [[1]]. Stories make people [[2]].',
        blanks: [['prove'], ['care']],
        distractors: ['bore', 'leave'],
      },
      {
        kind: 'mcq',
        prompt: 'How long is Doña Rosa\'s story?',
        options: [
          { text: 'About 40 seconds' },
          { text: 'About ten minutes', why: 'About 40 seconds.' },
          { text: 'An hour', why: 'About 40 seconds.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which slide plan breaks the rule?',
        lines: [
          'Slide 3: Doña Rosa\'s shop, one photo.',
          'Slide 4: 140 of 200 shop owners agreed.',
          'Slide 5: a table of 20 numbers from the survey.',
          'Slide 6: 38% above target, one chart.',
        ],
        bug: 2,
        fix: 'One number from the survey, or cut it.',
        explanation: 'A slide of 20 numbers is a slide of none.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which city is Doña Rosa\'s shop?',
        answers: ['Guadalajara', 'guadalajara'],
        placeholder: 'A city',
      },
    ],
  },
  reflect: {
    prompt: 'Pick one number you use at work. Find a short story that shows what it means.',
    starters: ['The number:...', 'The story:...'],
  },
  deepen: {
    title: 'Anecdote vs evidence',
    summary: 'A story alone can be dismissed as one case. A number alone can be forgotten. A story backed by a number is both easy to remember and hard to dismiss.',
  },
  notes: 'Fictional: Doña Rosa (narrated only, not in CAST), 140 of 200 shop owners. Story-plus-data pairing: common presentation advice.',
};

export default lesson;
