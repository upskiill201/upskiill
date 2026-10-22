import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Myth or Fact: pensions and long-term saving. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Pension myths at the coffee machine',
  summary: 'After the payroll fix, everyone at Afiya has an opinion about pensions. "You\'ll never see that money." "It\'s for old people." Five beliefs, tested.',
  minutes: 10,
  outcomes: [
    'Bust common pension myths',
    'Know what a pension can and can\'t do',
    'Decide whether to add extra',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Pensions are only something to think about when you\'re old.',
          isFact: false,
          explain: 'Myth. The years when pension money grows the most are the early ones. Thinking about it at 25 matters more than at 55.',
        },
        {
          text: 'Your workplace pension alone may not be enough for a comfortable retirement.',
          isFact: true,
          explain: 'Fact, for many people. It\'s a strong base. Extra saving, and other long-term pots, usually make the difference.',
        },
        {
          text: 'You\'ll never see your pension money.',
          isFact: false,
          explain: 'Myth. It\'s your money, invested for you, paid out under the scheme\'s rules, usually from retirement age. Check the rules where you live.',
        },
        {
          text: 'Checking your pension statement can catch mistakes.',
          isFact: true,
          explain: 'Fact. Miracle\'s missing four months are proof. Payroll errors happen.',
        },
        {
          text: 'It\'s better to spend now and rely on your children later.',
          isFact: false,
          explain: 'Myth, and a heavy load to pass on. Family support is love; relying on it entirely puts your children where Miracle is now.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Coffee machine',
      beats: [
        { speaker: 'chidi', text: 'I\'ll rely on my kids. That\'s what kids are for.' },
        { speaker: 'miracle', text: 'My dad\'s relying on me right now. I love him. It\'s also why I\'m starting my pension properly at 25.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A pension is your money for later, growing most in the early years. It\'s a base, not always the whole plan. Check it, and add to it if you can.',
    },
  ],
  apply: {
    scenario: 'Pension myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Pensions are only for old people to think about', group: 0 },
          { text: 'A workplace pension alone may not be enough', group: 1 },
          { text: 'You\'ll never see the money', group: 0 },
          { text: 'Checking statements can catch mistakes', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When does pension money grow the most?',
        options: [
          { text: 'In the early years, because it has the longest to compound' },
          { text: 'In the last five years', why: 'Early money has the most time.' },
          { text: 'It doesn\'t grow', why: 'It\'s invested for growth.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I\'ll just rely on my kids when I\'m old.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'That\'s selfish.', why: 'Harsh. A question works better.' },
          { text: 'They\'d help, I\'m sure. But wouldn\'t you rather they could help because they want to, not because they have to?' },
          { text: 'Good plan.', why: 'It passes the load on.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'What a pension is.',
        template: 'A [[1]], not always the whole [[2]].',
        blanks: [['base'], ['plan']],
        distractors: ['loan', 'prize'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Only for old people"', 'Early years matter most'],
          ['"You\'ll never see it"', 'It\'s yours, paid under the rules'],
          ['"Rely on your kids"', 'A heavy load to pass on'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief is wrong?',
        lines: [
          'My pension is my money.',
          'Checking it twice a year is wise.',
          'My pension alone is guaranteed to cover everything.',
        ],
        bug: 2,
        fix: 'My pension is a strong base; I may need more.',
        explanation: 'For many people, the pension alone isn\'t enough.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is Miracle starting her pension properly at 25?',
        options: [
          { text: 'Her boss told her to', why: 'It\'s her own decision.' },
          { text: 'It\'s required', why: 'The basic one is; extra is her choice.' },
          { text: 'She\'s seeing what it\'s like when a parent has to rely on their children' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Chidi is 28. Retirement at 60 is how many years away?',
        answers: ['32', 'thirty-two'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a sensible pension approach.',
        lines: ['Know your scheme', 'Check contributions twice a year', 'Add extra once basics are in place', 'Keep other long-term pots too'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the healthiest view of family support in old age?',
        options: [
          { text: 'Never accept help', why: 'Help is love.' },
          { text: 'Welcome help, but don\'t make it the whole plan' },
          { text: 'It\'s the only plan you need', why: 'That puts the whole load on others.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What did you believe about pensions before this lesson? What will you do differently?',
    starters: ['I used to think...', 'Now I\'ll...'],
  },
  deepen: {
    title: 'How much is enough?',
    summary: 'A common rule of thumb is to aim for a retirement income of a large share of your working income, but it depends on your costs, housing and family. The Investment Risk course and a qualified, independent adviser can help with your own numbers.',
  },
  notes: 'Chidi per CAST (Afiya; top performer). Pension payout rules vary by scheme/country (Nigeria: retirement age per PRA, with limited early access rules); stated generally. No product named.',
};

export default lesson;
