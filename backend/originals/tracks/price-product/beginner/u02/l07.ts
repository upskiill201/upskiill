import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Myth or Fact: value myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Value myths',
  summary: 'Clinton\'s friends push back: "Students are broke!" "Charge more and everyone leaves!" David checks each claim against what students actually do. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Spot myths that keep prices too low',
    'Know that customers value the same thing differently',
    'See how a low price can look like low quality',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Students can\'t pay more than 1,500 for laundry.',
          isFact: false,
          explain: 'Myth. Six of fifteen interviewees paid Mama Rose 2,400 a basket this semester. Some can\'t pay more; many already do.',
        },
        {
          text: 'Raise the price at all and everyone leaves.',
          isFact: false,
          explain: 'Myth. Some may leave, but a higher margin means you can lose some customers and still earn more (Chapter 4 does the sums).',
        },
        {
          text: 'Different customers value the same service very differently.',
          isFact: true,
          explain: 'Fact. A third-year with a part-time job values a Saturday more than a first-year with free weekends. Chapter 3 uses that difference.',
        },
        {
          text: 'A price that\'s very low can make people doubt the quality.',
          isFact: true,
          explain: 'Fact. "Why is it so cheap? Will my clothes come back?" Price is a signal. Too low can worry people, not attract them.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '"They can\'t afford more" is a guess. Check what they already pay.',
    },
  ],
  apply: {
    scenario: 'Testing the myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'No student can pay more than 1,500', group: 0 },
          { text: 'Customers value the same thing differently', group: 1 },
          { text: 'Any rise makes everyone leave', group: 0 },
          { text: 'Very low prices can signal low quality', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What evidence shows that many students can pay more than 1,500?',
        options: [
          { text: 'Several already pay Mama Rose 2,400 a basket' },
          { text: 'A poll said so', why: 'Polls give guesses.' },
          { text: 'Clinton feels it', why: 'Feelings aren\'t evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'If I charge more, people will think I\'m greedy.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'A fair price for real value isn\'t greedy, especially if you explain it: you pay Mama Rose fairly, you carry it, and you need to keep going.' },
          { text: 'Yes, never raise prices.', why: 'Then WashDay pays him less than a library job.' },
          { text: 'Charge as much as possible.', why: 'Fair means good value for them too.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the customer to how much she likely values a Saturday.',
        pairs: [
          ['Third-year with a weekend job', 'Very highly'],
          ['First-year with free weekends', 'Less'],
          ['Student studying for exams', 'Highly, at exam time'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Price as a signal.',
        template: 'A price that is too [[1]] can make people doubt the [[2]].',
        blanks: [['low'], ['quality']],
        distractors: ['high', 'logo'],
      },
      {
        kind: 'mcq',
        prompt: 'Why might a very cheap laundry service lose customers?',
        options: [
          { text: 'People worry their clothes won\'t come back clean or at all' },
          { text: 'Cheap is illegal', why: 'It\'s about trust.' },
          { text: 'It never does', why: 'Too cheap can look risky.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At 1,500 a bag Clinton keeps 375; at 1,800 he keeps 675. How many more FCFA per bag is that?',
        answers: ['300'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the group-chat advice is a myth?',
        lines: [
          'Check what students already pay elsewhere.',
          'Remember some value it more than others.',
          'Students are all broke, so never go above 1,500.',
          'Explain why the price is what it is.',
        ],
        bug: 2,
        fix: 'Many pay Mama Rose 2,400; check before assuming.',
        explanation: 'It\'s a guess contradicted by what students already pay.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the honest way to handle "they can\'t afford it".',
        lines: ['Notice the assumption', 'Check what they already pay', 'Offer a cheaper option for tight budgets', 'Test the main price'],
      },
      {
        kind: 'sortGroups',
        prompt: 'A reason to keep a cheaper option, or not?',
        groups: ['Good reason', 'Not a good reason'],
        items: [
          { text: 'Some first-years have tight budgets', group: 0 },
          { text: 'Clinton is scared of any price rise', group: 1 },
          { text: 'End-of-month cash is short for many', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which value myth have you believed about your customers? What do they actually spend?',
    starters: ['I assumed...', 'They actually...'],
  },
  deepen: {
    title: 'Price signals quality',
    summary: 'Research on price-quality inference shows that when people can\'t judge quality easily, they use price as a clue. A service that handles your clothes is exactly that kind of thing.',
  },
  notes: 'Fictional: 6 of 15 paid Mama Rose; margin 375 at 1,500, 675 at 1,800. Price-quality inference is well documented in consumer research (e.g. Rao & Monroe, 1989 meta-analysis).',
};

export default lesson;
