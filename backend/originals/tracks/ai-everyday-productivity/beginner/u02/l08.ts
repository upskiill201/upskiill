import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Before/After: better research questions. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Ask better research questions',
  summary: 'Lucía needs a washing machine for the new flat. Tomás asks AI "what\'s the best washing machine?" and gets a famous expensive one. Lucía asks differently. See exactly what changed.',
  minutes: 12,
  outcomes: [
    'Turn "what\'s the best X?" into a question about your needs',
    'Ask for options and trade-offs, not one winner',
    'Ask the AI what you should check before you buy',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The washing machine',
      before: {
        label: 'Tomás: "What\'s the best washing machine?"',
        text: 'The best washing machine is usually a large front-loader from a premium brand, with steam cleaning and smart features. Expect to pay a premium for the best quality.',
      },
      after: {
        label: 'Lucía: needs, options, trade-offs, checks',
        text: 'Prompt: "I live alone in a small flat with low water pressure, wash about 3 times a week, and have up to MX$9,000. Give me 3 types of machine that fit, the trade-offs of each, and what I should check in the shop or the reviews before buying."\n\nReply: 1) Compact front-loader: uses less water, fits small spaces, slower cycles. 2) Top-loader: often cheaper and fast, but may use more water. 3) Washer-dryer: saves space, but can be pricier and dry slowly. Check: the size against your space, the water pressure it needs, the warranty, and current prices in shops.',
      },
      notes: [
        '"Best" became "best for me": she gave her space, water, habits and budget.',
        'She asked for 3 options with trade-offs, so she chooses, not the AI.',
        'She asked what to check, which turned the answer into a shopping plan.',
        'She asked for types, not brands or prices: those change, and she\'ll check them in shops.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The research formula: my situation + my limits + "give me options and trade-offs" + "what should I check?"',
    },
  ],
  apply: {
    scenario: 'Better research questions.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Tomás get an expensive premium machine?',
        options: [
          { text: '"Best" with no situation means "best in general", which is often the priciest' },
          { text: 'AI works for the shops', why: 'It had no information about his needs.' },
          { text: 'Washing machines are all expensive', why: 'Lucía\'s answer fits MX$9,000.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of Lucía\'s prompt to what it gave her.',
        pairs: [
          ['"Small flat, low water pressure"', 'Machines that fit her flat'],
          ['"Up to MX$9,000"', 'Nothing she can\'t afford'],
          ['"3 types and the trade-offs"', 'A choice, not a verdict'],
          ['"What should I check?"', 'A shopping plan'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Upgrade the question.',
        template: 'Not "what\'s the best X?" but "what\'s best for [[1]]?" Ask for options and [[2]].',
        blanks: [['me', 'my situation'], ['trade-offs', 'tradeoffs']],
        distractors: ['everyone', 'brands'],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Why didn\'t you ask which brand to buy?',
        prompt: 'Lucía\'s reason?',
        options: [
          { text: 'I hate brands.', why: 'It\'s about what changes, not taste.' },
          { text: 'Brands and prices change. I asked for types and what to check, then I compare brands in the shop.' },
          { text: 'AI doesn\'t know brands.', why: 'It may know; the details can be out of date.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good research question, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Best phone?', group: 1 },
          { text: 'Which 3 phone types suit someone who mostly takes photos, under MX$6,000, and what should I check?', group: 0 },
          { text: 'Best city to live in?', group: 1 },
          { text: 'What are the trade-offs between a gym and running outside for someone with 30 minutes a day?', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Marta wants a gym. Which prompt follows the formula?',
        options: [
          { text: 'Best gym in Mexico City?', why: 'No situation.' },
          { text: 'Which gym is cheapest?', why: 'Cheap isn\'t her only need, and prices change.' },
          { text: 'I want to get fit, work near Colonia Juárez, train 3 mornings a week, budget MX$800 a month. What types of gym or class fit, trade-offs, and what should I ask on a trial visit?' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line weakens Lucía\'s prompt?',
        lines: [
          'I live alone in a small flat.',
          'Just tell me the single best model, nothing else.',
          'Give me 3 types and the trade-offs of each.',
        ],
        bug: 1,
        fix: 'Delete it. She wants options and trade-offs.',
        explanation: 'One "best model" brings back a verdict she can\'t check, and the details can be out of date.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the last question in the research formula? (Finish it: "What should I ___?")',
        answers: ['check', 'check?', 'check before buying'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Build the research formula in order.',
        lines: ['My situation', 'My limits', 'Give me options', 'And the trade-offs', 'What should I check?'],
      },
      {
        kind: 'mcq',
        prompt: 'Which of these does Lucía still need to check herself in the shop?',
        options: [
          { text: 'That front-loaders usually use less water', why: 'A general idea, fine as a start.' },
          { text: 'The current price and warranty of the machine she picks' },
          { text: 'That washer-dryers save space', why: 'A general idea, fine as a start.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something you\'ve searched "best ..." for? Rewrite it with your situation, your limits, options, trade-offs and "what should I check?".',
    starters: ['I searched "best..."', 'Better: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask an AI tool "What\'s the best ...?" for something you need. Then ask with the full formula. Which answer would you actually act on?',
  },
  notes: 'Washing machine trade-offs are general (front-loaders typically use less water; washer-dryers save space). No brands or prices named.',
};

export default lesson;
