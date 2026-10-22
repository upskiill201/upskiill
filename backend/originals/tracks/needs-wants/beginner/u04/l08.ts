import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or Fact: big choices. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"The cheapest option is always smartest"',
  summary: 'After the car, Ada swings the other way: "From now on, I only buy the cheapest of everything." Is that smart? Five beliefs about big choices, tested.',
  minutes: 10,
  outcomes: [
    'Avoid swinging from overspending to false economy',
    'Choose value over lowest price for things that matter',
    'Make fewer, better big decisions',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The cheapest option is always the smartest.',
          isFact: false,
          explain: 'Myth. For things you use a lot or rely on (shoes, a laptop for work, a mattress), better quality often costs less per use. Cheap that breaks is expensive.',
        },
        {
          text: 'A few big decisions matter more than hundreds of small ones.',
          isFact: true,
          explain: 'Fact. Housing, transport, debt and big purchases can outweigh years of small choices. Ada\'s "no" to the car saved more than any amount of skipped snacks.',
        },
        {
          text: 'If you can afford the monthly payment, you can afford the thing.',
          isFact: false,
          explain: 'Myth. The monthly payment ignores running costs, total cost and what else the money could do.',
        },
        {
          text: 'Writing down a big decision before making it leads to better choices.',
          isFact: true,
          explain: 'Fact, for many people. Writing the costs, the trade-off and 10/10/10 slows the excitement and makes the decision clearer.',
        },
        {
          text: 'Saying "not now" to something means you\'ll never have it.',
          isFact: false,
          explain: 'Myth. "Not now" with a number and a date is how big wants actually happen. Ada\'s car is on her list for three years from now.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Not the cheapest, not the flashiest: the best value for what you\'ll really use. Spend your thinking on the few big decisions.',
    },
  ],
  apply: {
    scenario: 'Big choices.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Cheapest is always smartest', group: 0 },
          { text: 'A few big decisions matter most', group: 1 },
          { text: 'Affordable monthly means affordable', group: 0 },
          { text: '"Not now" means never', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ada\'s work laptop: a ₦250,000 one that may last 2 years, or a ₦450,000 one likely to last 5. Which costs less per year?',
        options: [
          { text: 'The ₦450,000 one: about ₦90,000 a year' },
          { text: 'The ₦250,000 one: about ₦125,000 a year', why: 'That\'s more per year.' },
          { text: 'They\'re the same', why: '125,000 vs 90,000 a year.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'From now on I\'ll only buy the cheapest of everything.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Great, always cheapest.', why: 'False economy.' },
          { text: 'Buy the most expensive.', why: 'Price isn\'t quality either.' },
          { text: 'Cheapest for things you don\'t care about, sure. For things you use every day, buy the best value. Cheap that breaks costs more.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Not the cheapest, not the [[1]]: the best [[2]] for what you\'ll really use.',
        blanks: [['flashiest'], ['value']],
        distractors: ['oldest', 'price'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each purchase to the smart approach.',
        pairs: [
          ['Toiletries', 'Cheapest that works'],
          ['Work laptop', 'Best value for years of use'],
          ['A car', 'Total cost, opportunity cost, 10/10/10'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which decision is false economy?',
        lines: [
          'Cheapest soap.',
          'Good shoes for her daily walk to the BRT.',
          'The cheapest laptop for her design work, which keeps crashing.',
        ],
        bug: 2,
        fix: 'A reliable laptop at the best value for design work.',
        explanation: 'A work tool that crashes costs time, clients and replacements.',
      },
      {
        kind: 'typeAnswer',
        prompt: '₦450,000 laptop over 5 years. Cost per year?',
        answers: ['90000', '90,000', '₦90,000', '₦90000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why write down a big decision before making it?',
        options: [
          { text: 'For your records', why: 'Mostly it improves the decision.' },
          { text: 'It slows the excitement and makes the costs and trade-offs clear' },
          { text: 'No reason', why: 'It helps many people decide better.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to make a big decision.',
        lines: ['Write the choice', 'Find the total cost', 'Name the opportunity cost', 'Run 10/10/10', 'Decide: now, later or never'],
      },
      {
        kind: 'mcq',
        prompt: 'Which decision saved Ada more: no to the car, or skipping snacks for a year?',
        options: [
          { text: 'No to the car' },
          { text: 'Skipping snacks', why: 'Snacks are tiny next to ₦240,000 a month.' },
          { text: 'The same', why: 'Not close.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one thing you use every day that\'s worth paying a bit more for? And one where the cheapest is fine?',
    starters: ['Worth paying more:...', 'Cheapest is fine:...'],
  },
  deepen: {
    title: 'The boots theory',
    summary: 'Novelist Terry Pratchett described how a poor man buys cheap boots that wear out and must keep buying them, while a rich man\'s good boots last for years: being poor can cost more. Planning and saving for quality, where it matters, is one way out.',
  },
  notes: 'Pratchett, T. Men at Arms (1993) "Sam Vimes boots theory" (paraphrased, not quoted). Laptop example fictional: 250,000/2 = 125,000/yr vs 450,000/5 = 90,000/yr.',
};

export default lesson;
