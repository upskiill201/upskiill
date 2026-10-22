import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Chat with Tey: buying together, buying used, haggling. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Yaw\'s haggling school',
  summary: 'Yaw can\'t save to save his life, but at Kejetia market he\'s a legend. Saturday morning, he teaches Kofi three ways to pay less for the same things: buy together, buy used, and haggle well.',
  minutes: 12,
  outcomes: [
    'Save by buying together with people you trust',
    'Know what\'s worth buying used, and what isn\'t',
    'Haggle politely and effectively',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Saturday, Kejetia, the biggest market in West Africa by some counts. Yaw is in his element. First lesson: buy together.', replies: ['Why together?'] },
        { tey: 'Sellers give better prices on bigger amounts. A 5 kg bag of rice split three ways costs each person less than three 1 kg bags. Same for oil, onions, soap. Kofi, Efua and Yaw now shop once a week as a team.', replies: ['And buying used?'] },
        { tey: 'Great for things that last and don\'t carry health risks: textbooks, a desk lamp, a bicycle, a calculator, even a laptop if you check it carefully. Less great for things that wear out invisibly, or affect safety: helmets, phone chargers of unknown make, mattresses.', replies: ['Now the haggling.'] },
        { tey: 'Yaw\'s rules. One: know the price before you go. Ask two other stalls. Two: be friendly first. Greet, chat, show you like the thing. Three: make a fair first offer, lower than you\'ll pay but not insulting.', replies: ['Then?'] },
        { tey: 'Four: be ready to walk away, politely. Often the price comes after you. Five: bundle. "If I take three, what\'s your best price?" Six: when you agree, pay happily and come back. Regulars get the best prices.', replies: ['Does haggling work everywhere?'] },
        { tey: 'No. In markets and with informal sellers it\'s normal in many countries. In supermarkets with printed prices, it isn\'t. But asking "is there a discount for students?" or "do you have a cheaper option?" works almost anywhere.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Know the price, be friendly, offer fair, be ready to walk, bundle, and pay happily. Same things, less money.',
    },
  ],
  apply: {
    scenario: 'Saturday at Kejetia.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Yaw\'s haggling rules.',
        lines: ['Know the price before you go', 'Be friendly first', 'Make a fair first offer', 'Be ready to walk away', 'Bundle for a better price', 'Pay happily and come back'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good to buy used, or better new?',
        groups: ['Good used', 'Better new'],
        items: [
          { text: 'A textbook', group: 0 },
          { text: 'A bicycle helmet', group: 1 },
          { text: 'A desk lamp', group: 0 },
          { text: 'A phone charger of unknown make', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 5 kg bag of rice costs GH₵90. Split three ways, what does each pay?',
        answers: ['30', 'GH₵30', '30 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Three separate 1 kg bags cost GH₵22 each. How much does each person save by sharing the 5 kg bag (GH₵30 each for about 1.7 kg)?',
        options: [
          { text: 'Nothing; it\'s more expensive', why: 'Per kilo it\'s far cheaper: GH₵18 vs GH₵22.' },
          { text: 'They pay GH₵8 more but get 70% more rice: much better value' },
          { text: 'They save GH₵22', why: 'Compare price per kilo: 18 vs 22.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Madam, GH₵40 for this lamp? I\'ll give you GH₵10.',
        prompt: 'What would Yaw say Kofi did wrong?',
        options: [
          { text: 'He skipped the greeting, and GH₵10 is an insulting first offer. Friendly first, fair offer second.' },
          { text: 'Nothing, perfect haggling.', why: 'Too low and too cold. Sellers stop wanting to help.' },
          { text: 'He should have paid GH₵40.', why: 'In a market, a fair offer is normal and expected.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The bundle question.',
        template: '"If I take [[1]], what\'s your best [[2]]?"',
        blanks: [['three', 'two', 'more'], ['price']],
        distractors: ['name', 'colour'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the place to what works there.',
        pairs: [
          ['Market stall', 'Friendly haggling'],
          ['Supermarket', 'Printed price; ask about deals'],
          ['Student shop', '"Is there a student discount?"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step will make Kofi pay more?',
        lines: [
          'Ask two other stalls first.',
          'Greet the seller warmly.',
          'Tell the seller "I\'ll pay anything, I need it today!"',
          'Offer a fair price below what I\'ll pay.',
        ],
        bug: 2,
        fix: 'Stay calm and ready to walk away.',
        explanation: 'Showing you\'ll pay anything removes all your bargaining power.',
      },
      {
        kind: 'mcq',
        prompt: 'Why "pay happily and come back"?',
        options: [
          { text: 'To show off', why: 'It\'s about the relationship.' },
          { text: 'Regular, friendly customers tend to get the best prices' },
          { text: 'It doesn\'t matter', why: 'Relationships matter in markets.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The lamp starts at GH₵40 and Kofi pays GH₵28. How much does he save?',
        answers: ['12', 'GH₵12', '12 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What do you buy regularly that you could buy with others, or buy used? Where could you politely ask for a better price?',
    starters: ['I could buy ... together with...', 'I could buy ... used', 'I could ask for a better price at...'],
  },
  deepen: {
    title: 'Check used items properly',
    summary: 'For used electronics, test before paying: switch it on, check the battery, ports, screen and keyboard, and ask for a short guarantee in writing. A cheap item that breaks in a week is the most expensive kind.',
  },
  notes: 'Kejetia Market (Kumasi) is often described as one of the largest single markets in West Africa; stated as "by some counts". Prices fictional: 5 kg rice GH₵90 (18/kg), 1 kg GH₵22. Lamp 40 → 28. Haggling norms vary by country and setting.',
};

export default lesson;
