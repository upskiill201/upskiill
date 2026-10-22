import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Step-by-step: find your values. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What do you want money to do?',
  summary: 'Lucía sends Ada an exercise she does every January: five questions that show what you actually value, and whether your spending agrees. Step by step.',
  minutes: 11,
  outcomes: [
    'Name your top money values',
    'Compare last month\'s spending with them',
    'Find the gap between what you value and what you pay for',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Lucía\'s values exercise',
      steps: [
        { title: '1. Imagine an extra ₦100,000', body: 'If it arrived tomorrow and you could only spend it on things that make life genuinely better, what would you do with it? Write five things. Ada: help Mum, a design course, travel, dinners with friends, a better laptop later.' },
        { title: '2. Find the theme behind each', body: 'Help Mum: family. Design course and laptop: growth. Travel: adventure. Dinners with friends: connection.' },
        { title: '3. Rank your top four', body: 'Ada: 1. Family. 2. Growth. 3. Adventure. 4. Connection.' },
        { title: '4. Put last month\'s spending next to them', body: 'Which lines serve which value? Art class: growth. Family support: family. Friday dinners: connection. Daily delivery, unused gym, random online shopping: none of them.' },
        { title: '5. Find the gap', body: 'Ada spends ₦35,000 a month on online shopping she barely remembers, and only ₦15,000 on growth, her number-two value. That\'s the gap.' },
        { title: '6. Write one sentence', body: '"I want my money to look after my family, help me grow as a designer, and take me places." Read it before big decisions.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Name your top values, put your spending next to them, and look for money going to things that serve none of them. That\'s your easiest saving, and your clearest guide.',
    },
  ],
  apply: {
    scenario: 'Ada\'s values.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s exercise.',
        lines: ['Imagine an extra ₦100,000', 'Find the theme behind each idea', 'Rank your top four', 'Put last month\'s spending next to them', 'Find the gap', 'Write one sentence'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each of Ada\'s ideas to its value.',
        pairs: [
          ['Help Mum', 'Family'],
          ['Design course', 'Growth'],
          ['Travel', 'Adventure'],
          ['Dinners with friends', 'Connection'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which of Ada\'s spending lines serve a value, and which serve none?',
        groups: ['Serves a value', 'Serves none'],
        items: [
          { text: 'Art class', group: 0 },
          { text: 'Random online shopping', group: 1 },
          { text: 'Family support', group: 0 },
          { text: 'Unused gym', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Online shopping ₦35,000 vs growth ₦15,000. How much more goes to the thing she doesn\'t value?',
        answers: ['20000', '20,000', '₦20,000', '₦20000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the "gap"?',
        options: [
          { text: 'Your overdraft', why: 'It\'s about values.' },
          { text: 'The difference between what you value and what you actually pay for' },
          { text: 'The Mexico shortfall', why: 'Related, but the gap is between values and spending.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'This feels a bit deep for a money lesson.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'You\'re right, skip it.', why: 'Values make every decision easier.' },
          { text: 'Money has nothing to do with values.', why: 'Money is how values show up in real life.' },
          { text: 'It\'s the most practical money lesson there is. Once you know what matters, every "should I buy this?" gets easier.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s sentence.',
        template: '"I want my money to look after my [[1]], help me [[2]] as a designer, and take me [[3]]."',
        blanks: [['family'], ['grow'], ['places']],
        distractors: ['friends', 'shop'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step would give Ada the wrong values?',
        lines: [
          'Imagine extra money and list what would make life better.',
          'Copy the values from a famous influencer\'s list.',
          'Rank my top four.',
        ],
        bug: 1,
        fix: 'Find the themes behind my own list.',
        explanation: 'Your values are yours. Someone else\'s list won\'t guide your decisions.',
      },
      {
        kind: 'mcq',
        prompt: 'Why read the sentence before big decisions?',
        options: [
          { text: 'It\'s a ritual for luck', why: 'It\'s a practical guide.' },
          { text: 'It reminds you what money is for, so the decision is clearer' },
          { text: 'No reason', why: 'It\'s a quick check against your values.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Ada cut online shopping from ₦35,000 to ₦10,000, how much would she free?',
        answers: ['25000', '25,000', '₦25,000', '₦25000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Do the exercise: imagine an extra amount, list five things, find the themes, rank four. What\'s your sentence?',
    starters: ['My top values:...', 'My sentence:...'],
  },
  deepen: {
    title: 'Values change',
    summary: 'Your values at 24 won\'t be the same at 40. Redo the exercise once a year, or after big life changes: a new job, a move, a relationship, children. Your spending should follow.',
  },
  notes: 'Values exercise is a teaching device (common in financial coaching). Ada\'s other spending introduced: online shopping ₦35,000/month (part of the ~₦160,000 of categories not shown on line v1).',
};

export default lesson;
