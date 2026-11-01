import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Myth or Fact: "save first, enjoy later". */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '"Save now, enjoy later"',
  summary: 'Is the goal of saving to never enjoy money? Kofi\'s semester says no. Five myths about saving and living, tested.',
  minutes: 10,
  outcomes: [
    'Balance saving with enjoying life now',
    'Spend on what brings real value without guilt',
    'Know that saving is for living, not instead of it',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Good savers never spend money on fun.',
          isFact: false,
          explain: 'Myth. Kofi kept a fun line all semester: Friday kelewele, team drinks, the Cape Coast day trip. Fun on purpose is part of a plan that lasts.',
        },
        {
          text: 'Saving is about having choices later, not about having less now.',
          isFact: true,
          explain: 'Fact. The laptop jar isn\'t about denying himself. It\'s about being able to choose his degree, without debt.',
        },
        {
          text: 'You should save every cedi of a windfall.',
          isFact: false,
          explain: 'Myth. A split rule (part saved, part enjoyed) is easier to stick to, and honours the joy of a gift.',
        },
        {
          text: 'Spending on experiences and on other people tends to bring more happiness than spending on things.',
          isFact: true,
          explain: 'Fact, for many people. Research by Dunn, Gilbert and Wilson and others suggests experiences and generosity often give more lasting happiness than new possessions.',
        },
        {
          text: 'Once you reach your goal, you should stop saving.',
          isFact: false,
          explain: 'Myth. The habit is the real prize. After the goal, the same weekly amount can build the emergency fund, the next goal, and a bit more fun.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Saving is for living. Save on purpose, spend on purpose, and keep the habit after the goal.',
    },
  ],
  apply: {
    scenario: 'Saving and living.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Good savers never have fun', group: 0 },
          { text: 'Saving is about choices later', group: 1 },
          { text: 'Save every cedi of a windfall', group: 0 },
          { text: 'Stop saving once you reach the goal', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the laptop jar really buying Kofi?',
        options: [
          { text: 'The choice to do his degree without debt' },
          { text: 'A laptop and nothing else', why: 'It\'s the laptop, plus no GH₵2,260 extra and no debt.' },
          { text: 'A reason to never have fun', why: 'He had fun all semester.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each spend to what research says about it.',
        pairs: [
          ['A trip with friends', 'Experiences: often lasting joy'],
          ['A gift for Mum', 'Giving: often lasting joy'],
          ['A fourth pair of sneakers', 'Things: joy fades fast'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'So when you get the laptop, you\'ll finally stop saving and live a little?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Yes, saving is over.', why: 'The habit is the prize. Stopping wastes it.' },
          { text: 'I\'ve been living all semester. After the laptop, the GH₵125 goes to my emergency fund, my next goal, and a bit more fun.' },
          { text: 'No, I\'ll never have fun.', why: 'He\'s had fun all semester.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Saving is for...',
        template: 'Saving is for [[1]], not instead of it.',
        blanks: [['living']],
        distractors: ['banks', 'later'],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief will make saving miserable?',
        lines: [
          'I keep a fun line.',
          'I split windfalls.',
          'Every cedi I enjoy is a cedi I failed to save.',
        ],
        bug: 2,
        fix: 'Every cedi has a job, and fun is one of the jobs.',
        explanation: 'Guilt about planned fun makes saving feel like punishment, and people quit punishment.',
      },
      {
        kind: 'mcq',
        prompt: 'Which spending tends to bring longer-lasting happiness?',
        options: [
          { text: 'Newer versions of things you have', why: 'The joy of new things tends to fade quickly.' },
          { text: 'The most expensive option', why: 'Price isn\'t what makes it last.' },
          { text: 'Experiences and generosity' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After the laptop, Kofi splits his GH₵125 a week: GH₵50 emergency fund, GH₵50 next goal, the rest fun. How much is fun?',
        answers: ['25', 'GH₵25', '25 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s plan after the goal.',
        lines: ['Reach the goal', 'Keep the weekly habit', 'Split it across new jobs', 'Enjoy a little more, on purpose'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the real prize of a semester of saving?',
        options: [
          { text: 'Only the laptop', why: 'The habit outlasts the laptop.' },
          { text: 'The habit, which keeps working long after the laptop' },
          { text: 'Being able to stop', why: 'Stopping throws away the habit.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What do you enjoy spending on that\'s really worth it to you? How will you protect it in your plan?',
    starters: ['Worth it to me:...', 'I\'ll protect it by...'],
  },
  deepen: {
    title: 'Happy Money',
    summary: 'Elizabeth Dunn and Michael Norton\'s Happy Money (2013) collects research on spending that makes people happier: buying experiences, buying time, treating yourself occasionally rather than constantly, and spending on others.',
  },
  notes: 'Dunn, E. W., Gilbert, D. T., & Wilson, T. D. (2011). If money doesn\'t make you happy, then you probably aren\'t spending it right. JCP. Dunn & Norton (2013). Van Boven & Gilovich (2003). After-goal split (fictional): 50 EF, 50 next goal, 25 fun.',
};

export default lesson;
