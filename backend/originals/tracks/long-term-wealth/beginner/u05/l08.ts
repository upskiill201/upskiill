import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Myth or Fact: long-game myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Myths about the long game',
  summary: '"Retirement is far away, I\'ll worry later." "I\'ll catch up when I earn more." "My children will look after me." Five beliefs that quietly shape people\'s sixties, tested.',
  minutes: 10,
  outcomes: [
    'Spot the beliefs that delay long-term saving',
    'See why catching up later is hard',
    'Plan for your own later years, whatever your family does',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Retirement is far away, so there\'s no need to think about it yet.',
          isFact: false,
          explain: 'Myth. Because of compounding, the early years do the most work. Thinking about it at 25 is much cheaper than at 50.',
        },
        {
          text: 'It\'s easy to catch up later when you earn more.',
          isFact: false,
          explain: 'Myth. Starting ten years later can mean saving far more each month to reach the same place, while costs like children and housing also arrive.',
        },
        {
          text: 'You may live a long time after you stop working.',
          isFact: true,
          explain: 'Fact. Many people live 20 years or more after retiring. Plans should cover a long retirement, not a short one.',
        },
        {
          text: 'You can rely on your children to support you in old age.',
          isFact: false,
          explain: 'Myth, or at least a risky plan. Children may be able to help, as Miracle helps her dad, but they may also be struggling. Your own savings give everyone more choices.',
        },
        {
          text: 'Small, boring habits kept for decades usually beat big, exciting moves.',
          isFact: true,
          explain: 'Fact. Automatic saving, avoiding expensive debt, spreading investments and staying calm in falls aren\'t exciting. Kept for decades, they\'re what usually works.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Saturday call',
      beats: [
        { speaker: 'narrator', text: 'Dad, on the phone: "I want you to promise me something. Don\'t do what I did. Don\'t wait for next year."' },
        { speaker: 'miracle', text: 'I already started, Dad. Because of you.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Start early, because catching up is hard. Plan for a long retirement. Don\'t make your children your only plan. Boring habits, kept for decades, win.',
    },
  ],
  apply: {
    scenario: 'Long-game myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'No need to think about retirement yet', group: 0 },
          { text: 'You may live 20+ years after retiring', group: 1 },
          { text: 'Easy to catch up later', group: 0 },
          { text: 'Boring habits kept for decades usually win', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is catching up later hard?',
        options: [
          { text: 'It\'s illegal', why: 'It\'s maths, not law.' },
          { text: 'It isn\'t', why: 'Lost years are hard to replace.' },
          { text: 'You lose years of compounding and need to save much more each month' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'My kids will look after me, that\'s how it works at home.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Your kids won\'t care.', why: 'Unkind and unfair.' },
          { text: 'Maybe they\'ll help, like I help Dad. But your own savings mean they can help because they want to, not because they have to.' },
          { text: 'That\'s a perfect plan.', why: 'It\'s risky as the only plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'What wins.',
        template: 'Small, [[1]] habits kept for [[2]].',
        blanks: [['boring'], ['decades']],
        distractors: ['exciting', 'weeks'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Retirement is far away"', 'Early years do the most work'],
          ['"I\'ll catch up later"', 'Lost years are hard to replace'],
          ['"My children will support me"', 'Your own savings give everyone choices'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Retire at 60 and live to 85. How many years of retirement is that?',
        answers: ['25', 'twenty-five'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Chidi\'s plan rests on a myth?',
        lines: [
          'Save 10% automatically from this month.',
          'Clear the car loan first.',
          'Start my pension at 45; I\'ll catch up then.',
        ],
        bug: 2,
        fix: 'Start the pension now, even small.',
        explanation: 'Waiting until 45 loses twenty years of compounding.',
      },
      {
        kind: 'mcq',
        prompt: 'What did Dad ask Miracle to promise?',
        options: [
          { text: 'To buy a house', why: 'He asked her not to wait.' },
          { text: 'To send more money', why: 'He asked about her future.' },
          { text: 'Not to wait for next year' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the boring habits that win.',
        lines: ['Save automatically', 'Avoid expensive debt', 'Spread long-term money out', 'Stay calm in falls'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the most dangerous belief for a 25-year-old?',
        options: [
          { text: '"There\'s plenty of time, I\'ll start later"' },
          { text: '"I\'ll save a little now"', why: 'That\'s the good habit.' },
          { text: '"I\'ll plan for a long retirement"', why: 'That\'s sensible.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths have you believed? What would change if you stopped?',
    starters: ['I\'ve believed...', 'If I stopped, I\'d...'],
  },
  deepen: {
    title: 'Life expectancy at 60',
    summary: 'Life expectancy at birth is pulled down by deaths in childhood. People who reach 60 often live well beyond the national average at birth. That\'s why retirement plans need to last longer than people expect.',
  },
  notes: 'Life expectancy-at-60 point: standard demographic framing (WHO data). Chidi per CAST.',
};

export default lesson;
