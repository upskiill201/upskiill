import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Myth or Fact: money myths. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Budgets are for rich people (and other myths)',
  summary: 'Kofi thinks budgets are for people with money to spare, and that writing things down won\'t change anything. Efua, who gets less than him and is never broke, disagrees. Who\'s right?',
  minutes: 10,
  outcomes: [
    'Bust five common myths about budgeting',
    'Say what a budget actually is, in one line',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Budgets are only useful when you have lots of money.',
          isFact: false,
          explain: 'Myth. The less you have, the more each cedi matters, and the more a plan helps. A small income has less room for leaks.',
        },
        {
          text: 'Writing down what you spend tends to change how you spend.',
          isFact: true,
          explain: 'Fact. A big review of 138 studies (Harkin and colleagues, 2016) found that keeping track of progress makes people more likely to reach their goals, especially when they write it down.',
        },
        {
          text: 'A budget means never spending money on fun.',
          isFact: false,
          explain: 'Myth. A good budget plans for fun on purpose. Budgets with no fun in them are the ones people quit.',
        },
        {
          text: 'Most people can say roughly where their money went last month without checking.',
          isFact: false,
          explain: 'Myth. Small, frequent payments are easy to forget, and paying by phone makes them even easier to miss. Kofi is not unusual.',
        },
        {
          text: 'You need a special app or spreadsheet to budget.',
          isFact: false,
          explain: 'Myth. Efua uses a notebook. Your phone\'s notes app works. The tool matters far less than looking at it every week.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Efua\'s notebook',
      beats: [
        { speaker: 'narrator', text: 'The library, day 13. Efua, Kofi\'s classmate from Accra, now in Pharmacy, is writing in a small green notebook.' },
        { speaker: 'kofi', text: 'Budgets are for people with money. When you\'re broke, there\'s nothing to budget.' },
        { speaker: 'efua', text: 'My allowance is GH₵1,100. Yours is GH₵1,500. Which of us is broke on day 13?' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A budget is just a plan for your money, made before you spend it. That\'s all. It tells your money where to go instead of wondering where it went.',
    },
  ],
  apply: {
    scenario: 'Kofi vs Efua.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a budget?',
        options: [
          { text: 'A plan for your money, made before you spend it' },
          { text: 'A list of things you\'re not allowed to buy', why: 'A budget includes things you will buy, including fun. It\'s a plan, not a ban.' },
          { text: 'A record of what you spent last month', why: 'That\'s tracking. Useful, and it feeds the budget, but the budget looks forward.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Budgets are for people with lots of money', group: 0 },
          { text: 'Tracking spending helps people reach money goals', group: 1 },
          { text: 'A budget means no fun', group: 0 },
          { text: 'Small payments are easy to forget', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Efua gets GH₵1,100 a month and Kofi gets GH₵1,500. How much more does Kofi get?',
        answers: ['400', 'GH₵400', '400 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I don\'t need a budget. I\'ll just spend less next month.',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'Fine, good luck.', why: 'True to Efua\'s dry style, but it doesn\'t help him see the problem.' },
          { text: 'Less on what? You don\'t know where it went yet. Find that out, then decide.' },
          { text: 'You should stop eating out completely.', why: 'He doesn\'t know yet that food is the leak. Guessing the fix before finding the cause is how plans fail.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Finish the line.',
        template: 'A budget tells your money where to [[1]], instead of wondering where it [[2]].',
        blanks: [['go'], ['went']],
        distractors: ['hide', 'stays'],
      },
      {
        kind: 'mcq',
        prompt: 'Efua gets less than Kofi but isn\'t broke. What is the most likely reason?',
        options: [
          { text: 'She never buys anything', why: 'She buys food, data and the odd treat like everyone. She just knows where it\'s going.' },
          { text: 'Her money is easier to spend', why: 'Same city, same prices, same phone payments.' },
          { text: 'She plans and tracks where her money goes' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Only for the rich"', 'Matters most on a small income'],
          ['"No fun allowed"', 'Plan fun on purpose'],
          ['"Need an app"', 'A notebook works'],
          ['"I know where it went"', 'Small payments slip away'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief in Kofi\'s head is the myth?',
        lines: [
          'Mum sends GH₵1,500 a month.',
          'I\'ll budget once I earn more.',
          'Efua writes down what she spends.',
        ],
        bug: 1,
        fix: 'I\'ll budget now, with what I have.',
        explanation: 'Waiting to earn more before budgeting is backwards: a small income is where planning helps most.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how a budget works, from first to last.',
        lines: ['Money comes in', 'You decide where it goes', 'You spend to the plan', 'You check and adjust'],
      },
      {
        kind: 'mcq',
        prompt: 'Which tool will help Kofi most?',
        options: [
          { text: 'Whichever one he will actually look at every week' },
          { text: 'The most expensive budgeting app', why: 'Cost and features don\'t matter if it sits unopened.' },
          { text: 'A complicated spreadsheet with 40 categories', why: 'Too complicated for a first budget. Simple tools get used.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths did you believe, even a little? What has it cost you?',
    starters: ['I used to think...', 'It meant that I...'],
  },
  deepen: {
    title: 'The study behind "write it down"',
    summary: 'Harkin et al. (2016, Psychological Bulletin) combined 138 studies with nearly 20,000 people. Keeping track of progress made people more likely to reach their goals, and the effect was stronger when the progress was recorded or reported, not just thought about.',
  },
  notes: 'Harkin, B., Webb, T. L., Chang, B. P. I., et al. (2016). Does monitoring goal progress promote goal attainment? A meta-analysis of the experimental evidence. Psychological Bulletin, 142(2), 198–229. 138 studies, N = 19,951; effects larger when progress was physically recorded or reported. Efua allowance GH₵1,100 (fictional). Efua per CAST.md (course-only, Study Smarter), now Pharmacy at KNUST.',
};

export default lesson;
