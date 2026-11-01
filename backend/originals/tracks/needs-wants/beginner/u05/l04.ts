import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Chat with Tey: extra income without creep. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Extra money, no creep',
  summary: 'The café pays ₦125,000 for the logo, and two more cafés want one. Ada could earn an extra ₦250,000 a month. Tey makes sure this money doesn\'t vanish the way her raise did.',
  minutes: 11,
  outcomes: [
    'Give extra income a job before it arrives',
    'Avoid a second round of lifestyle creep',
    'Price freelance work fairly',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Two more cafés want logos. Ada could earn ₦250,000 extra next month. What happened last time her income went up?', replies: ['It disappeared into rides and delivery.'] },
        { tey: 'Right. So this time, every naira gets a job before it lands. Ada\'s rule: half to goals, a quarter to taxes and business costs, a quarter to enjoy.', replies: ['Taxes?'] },
        { tey: 'Freelance income is usually taxable, and she\'ll need software, a better drawing tablet one day, transport to client meetings. Setting a quarter aside means no nasty surprises.', replies: ['And the half to goals?'] },
        { tey: 'Car fund, laptop fund, emergency fund: the values plan already tells her where. The quarter to enjoy can be guilt-free: a nice dinner, a new sketchbook.', replies: ['What about pricing? The first café got ₦125,000.'] },
        { tey: 'She remembered her negotiation lessons: she checked what other designers charge, and quoted the café ₦125,000 with two rounds of changes. She\'ll quote the next ones the same, maybe a little more as her portfolio grows.', replies: ['Will she burn out?'] },
        { tey: 'Good question. Two logos a month, not ten. Extra income is only worth it if it doesn\'t eat her sleep, her art class and her Friday dinners.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Extra income gets a job before it lands: half to goals, a quarter set aside for taxes and costs, a quarter to enjoy. And don\'t trade away the values the money is for.',
    },
  ],
  apply: {
    scenario: 'The café logos.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₦250,000 extra: half to goals. How much?',
        answers: ['125000', '125,000', '₦125,000', '₦125000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: '₦250,000 split by Ada\'s rule. Match each part.',
        pairs: [
          ['Goals (half)', '₦125,000'],
          ['Taxes and costs (a quarter)', '₦62,500, set aside'],
          ['Enjoy (a quarter)', '₦62,500, guilt-free'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why set aside a quarter for taxes and costs?',
        options: [
          { text: 'To give it away', why: 'It\'s for taxes and tools.' },
          { text: 'Freelance income is usually taxable and has business costs' },
          { text: 'No reason', why: 'Surprise tax bills are common for freelancers.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Healthy extra income, or creep risk?',
        groups: ['Healthy', 'Creep risk'],
        items: [
          { text: 'Every naira given a job before it lands', group: 0 },
          { text: '"I earn more now, so rides are back"', group: 1 },
          { text: 'Two logos a month, art class protected', group: 0 },
          { text: 'Ten logos a month, no sleep', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I\'m earning more now. Can I go back to rides every day?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Yes, you earned it.', why: 'That\'s lifestyle creep, round two.' },
          { text: 'Never ride again.', why: 'Rides on bad days are fine.' },
          { text: 'That\'s how the raise disappeared. Rides on bad days are already in your plan. Put the extra where your values are.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Extra income gets a [[1]] before it [[2]].',
        blanks: [['job'], ['lands', 'arrives']],
        distractors: ['name', 'leaves'],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan would let creep back in?',
        lines: [
          'Half of freelance money to goals.',
          'A quarter set aside for taxes.',
          'Whatever\'s left after I spend the rest.',
        ],
        bug: 2,
        fix: 'A quarter to enjoy, decided in advance.',
        explanation: '"Whatever\'s left" is how raises vanish.',
      },
      {
        kind: 'mcq',
        prompt: 'How did Ada price the first logo?',
        options: [
          { text: 'She guessed', why: 'She used what she learned about negotiating.' },
          { text: 'She checked what other designers charge and quoted ₦125,000 with two rounds of changes' },
          { text: 'She did it for free', why: 'She charged a fair price.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada handles each freelance payment.',
        lines: ['Quote a fair price', 'Do the work', 'Get paid', 'Split it by the rule the same day'],
      },
      {
        kind: 'mcq',
        prompt: 'Why limit it to two logos a month?',
        options: [
          { text: 'Cafés only want two', why: 'It\'s her choice, for balance.' },
          { text: 'Laziness', why: 'It\'s protecting her values.' },
          { text: 'Extra income isn\'t worth losing sleep and the things she values' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If you earned extra money next month, what job would each part get, before it arrived?',
    starters: ['Goals:...', 'Taxes and costs:...', 'Enjoy:...'],
  },
  deepen: {
    title: 'Freelance taxes',
    summary: 'In most countries, income from freelance or side work is taxable, and rules differ widely. Keeping a portion aside and records of what you earn and spend on work makes tax time much easier. Check your country\'s tax authority for the rules.',
  },
  notes: 'Freelance split 50/25/25 is a teaching device. Tax treatment varies by country (Nigeria: personal income tax applies to freelance income; stated generally). Ada\'s pricing references Negotiation Skills for Beginners.',
};

export default lesson;
