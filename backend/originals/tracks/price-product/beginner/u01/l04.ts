import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Before/After: margin in francs and in percent. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Margin in francs and percent',
  summary: 'Clinton thought he kept a third of every bag. The real figure is a quarter. David shows him two ways to say how much a sale leaves behind, and why both matter.',
  minutes: 12,
  outcomes: [
    'Work out margin in francs and as a percentage',
    'Compare margins across prices',
    'Tell margin from markup',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'What Clinton thought vs what\'s true',
      before: {
        label: 'What he thought',
        text: 'Price 1,500. Cost 1,000 (just Mama Rose).\nMargin: 500 FCFA a bag.\nMargin %: 500 ÷ 1,500 = 33%.\n"I keep a third of everything."',
      },
      after: {
        label: 'What\'s true',
        text: 'Price 1,500. Cost 1,125 (everything).\nMargin: 375 FCFA a bag.\nMargin %: 375 ÷ 1,500 = 25%.\nHe keeps a quarter, before paying for his time.',
      },
      notes: [
        'Margin in francs = price − cost per sale. It\'s what each sale leaves.',
        'Margin % = margin ÷ price. It lets you compare prices and products.',
        'Markup is different: margin ÷ cost (375 ÷ 1,125 = 33%). Mixing them up is a common mistake.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Always say which one you mean: margin (÷ price) or markup (÷ cost).',
    },
  ],
  apply: {
    scenario: 'Doing the margin sums.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Price 1,500, cost 1,125. What is the margin per bag in FCFA?',
        answers: ['375'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What is the margin %: 375 ÷ 1,500?',
        options: [
          { text: '25%' },
          { text: '33%', why: 'That\'s 375 ÷ 1,125, the markup.' },
          { text: '37.5%', why: '375 ÷ 1,500 = 0.25.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its formula.',
        pairs: [
          ['Margin in francs', 'Price − cost'],
          ['Margin %', 'Margin ÷ price'],
          ['Markup %', 'Margin ÷ cost'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'What Clinton thought, or what\'s true?',
        groups: ['Thought', 'True'],
        items: [
          { text: 'Cost 1,000 a bag', group: 0 },
          { text: 'Margin 375 a bag', group: 1 },
          { text: 'Margin 33%', group: 0 },
          { text: 'Margin 25%', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I read that a 33% markup is the same as a 33% margin.',
        prompt: "David's best reply?",
        options: [
          { text: 'Not quite. 33% markup on 1,125 gives 375, which is a 25% margin of the 1,500 price. Same francs, different percentages.' },
          { text: 'Yes, they\'re identical.', why: 'Margin divides by price; markup divides by cost.' },
          { text: 'Percentages don\'t matter.', why: 'They do when you compare prices.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If the price rose to 1,800 with the same 1,125 cost, what would the margin be in FCFA?',
        answers: ['675'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'At 1,800, what is the margin %: 675 ÷ 1,800?',
        options: [
          { text: '37.5%' },
          { text: '60%', why: '675 ÷ 1,125 is the markup.' },
          { text: '25%', why: 'That\'s at 1,500.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two margin sums.',
        template: 'Margin = price [[1]] cost. Margin % = margin [[2]] price.',
        blanks: [['minus'], ['divided by']],
        distractors: ['plus', 'times'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s note mixes up margin and markup?',
        lines: [
          'Price 1,500; cost 1,125.',
          'Margin: 375 FCFA.',
          'Margin %: 375 ÷ 1,125 = 33%.',
          'So I keep a quarter of the price.',
        ],
        bug: 2,
        fix: 'Margin %: 375 ÷ 1,500 = 25%.',
        explanation: 'Margin % divides by the price, not the cost.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to find margin %.',
        lines: ['Add up the full cost per sale', 'Take it away from the price', 'Divide the result by the price', 'Multiply by 100 for a percentage'],
      },
    ],
  },
  reflect: {
    prompt: 'Work out the margin on your own product or hour, in money and as a percentage. Is it what you expected?',
    starters: ['My margin is...', 'As a percentage...'],
  },
  deepen: {
    title: 'Margin is what\'s left to run the business',
    summary: 'From the margin you pay yourself, save a buffer and fund growth. A business with a 25% margin can grow, but only if the volume and the price are right.',
  },
  notes: 'Fictional: price 1,500, full cost 1,125 → margin 375 (25%), markup 33%. At 1,800 → margin 675 (37.5%), markup 60%. Standard definitions: margin % = (price − cost) / price; markup % = (price − cost) / cost.',
};

export default lesson;
