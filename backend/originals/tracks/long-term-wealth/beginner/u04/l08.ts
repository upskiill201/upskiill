import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or Fact: debt and status myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The car loan',
  summary: 'The day after her promotion, a letter arrives: "Congratulations! You\'re pre-approved for a car loan." Five beliefs about debt and looking successful, tested.',
  minutes: 10,
  outcomes: [
    'Judge a loan by its total cost',
    'Tell useful borrowing from expensive status spending',
    'Avoid the debts that shrink the gap for years',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Being "pre-approved" means a loan is a good idea.',
          isFact: false,
          explain: 'Myth. It means a lender is happy to earn interest from you. Whether it\'s good for you depends on the total cost and what it\'s for.',
        },
        {
          text: 'The total cost of a loan matters more than the monthly payment.',
          isFact: true,
          explain: 'Fact. A small monthly payment over many years can cost far more in total. Always ask: how much will I pay back altogether?',
        },
        {
          text: 'A new car is an investment.',
          isFact: false,
          explain: 'Myth. Most cars lose value quickly, especially in the first years, and cost money to run. A car can be useful, but it\'s a cost, not an investment.',
        },
        {
          text: 'People who look rich are usually rich.',
          isFact: false,
          explain: 'Myth. Spending shows; saving doesn\'t. Many people with expensive cars and flats have little saved. Many quietly wealthy people look ordinary.',
        },
        {
          text: 'Borrowing to build a skill or a business can be different from borrowing for status.',
          isFact: true,
          explain: 'Fact. Borrowing that raises your future income can make sense if the cost is reasonable and the plan is realistic. Borrowing to look successful usually just shrinks the gap.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'The letter',
      beats: [
        { speaker: 'miracle', text: 'Pre-approved for ₦12 million. At 28% a year over five years.' },
        { speaker: 'folake', text: 'Ask them one question: how much do I pay back altogether?' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ask for the total cost, not the monthly payment. Cars are costs, not investments. Looking rich and being rich are different things.',
    },
  ],
  apply: {
    scenario: 'The pre-approved car loan.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Pre-approved means it\'s a good idea', group: 0 },
          { text: 'Total cost matters more than monthly payment', group: 1 },
          { text: 'A new car is an investment', group: 0 },
          { text: 'Looking rich isn\'t being rich', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What one question should Miracle ask the lender?',
        options: [
          { text: 'How much will I pay back altogether?' },
          { text: 'What colour cars are there?', why: 'Total cost first.' },
          { text: 'How small can the monthly payment be?', why: 'Small monthly can mean huge total.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Leads drive. If you take the bus people won\'t respect you.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'You\'re right, I\'ll get the biggest car.', why: 'Status spending shrinks the gap.' },
          { text: 'Nobody respects me anyway.', why: 'Not true, and not the point.' },
          { text: 'People respect good work. I\'d rather be quietly comfortable than loudly in debt.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rule of 72: a debt at 28% a year doubles in about how many years? (Round to the nearest year.)',
        answers: ['3', 'three', '2.6', '2.57'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Cars.',
        template: 'Most cars lose [[1]] quickly; a car is a [[2]], not an investment.',
        blanks: [['value'], ['cost']],
        distractors: ['weight', 'savings'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each borrowing reason to how it\'s likely to turn out.',
        pairs: [
          ['A reasonably priced course that raises pay', 'Can make sense'],
          ['A big car to look successful', 'Usually shrinks the gap'],
          ['A loan app for a party', 'Expensive and risky'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought makes the loan look better than it is?',
        lines: [
          'I\'ll compare the total paid back with the car\'s price.',
          'I\'ll check how fast that car loses value.',
          'The monthly payment is small, so it\'s cheap.',
        ],
        bug: 2,
        fix: 'Small monthly payments can hide a big total.',
        explanation: 'Long loans make big costs look small each month.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do many quietly wealthy people look ordinary?',
        options: [
          { text: 'They\'re hiding it', why: 'Saving is just invisible.' },
          { text: 'Their money is in savings and investments, which nobody sees' },
          { text: 'They aren\'t wealthy', why: 'Saving doesn\'t show.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to judge any loan.',
        lines: ['What is it for?', 'What\'s the total paid back?', 'Does it raise my future income?', 'Can my plan carry it without cutting saving?'],
      },
      {
        kind: 'mcq',
        prompt: 'What does Miracle decide about the car?',
        options: [
          { text: 'No loan; if she needs a car later, she\'ll save for a modest one' },
          { text: 'Take the full ₦12 million', why: 'That would eat her gap for five years.' },
          { text: 'Take it and skip saving', why: 'That reverses everything she built.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there something you feel you "should" have at your stage of life? Who says so?',
    starters: ['I feel I should have...', 'The pressure comes from...'],
  },
  deepen: {
    title: 'The millionaire next door',
    summary: 'In the 1990s, researchers Thomas Stanley and William Danko studied wealthy households in the US and found many lived modestly, drove older cars and saved steadily. Their point: wealth is usually what you don\'t see.',
  },
  notes: 'Car loan figures illustrative. 72/28 ≈ 2.6. Stanley & Danko, The Millionaire Next Door (1996). No lenders named.',
};

export default lesson;
