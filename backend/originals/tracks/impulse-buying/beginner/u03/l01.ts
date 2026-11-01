import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story with a choice: behind Mum's table at Makola. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Behind Mum\'s table',
  summary: 'The mid-semester break. Kofi goes home to Accra and helps at Mum\'s cloth stall in Makola Market. For the first time, he sees selling from the other side. Then a customer asks him a question, and he has to choose.',
  minutes: 12,
  outcomes: [
    'See how selling tricks look from the seller\'s side',
    'Tell honest selling from manipulation',
    'Know the question to ask any seller',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Makola, 10 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Makola Market, Accra. Heat, noise, colour. Mum\'s stall: shelves of wax print and kente from floor to ceiling. Kofi is folding cloth.' },
        { speaker: 'narrator', text: 'The young woman at the next stall calls out to a hesitating customer: "Sister, last two pieces! Buy now or it\'s gone!" She has at least twenty under the table.' },
        { speaker: 'narrator', text: 'Mum doesn\'t look up from her notebook. "Never say \'last two\' when you have twenty. She\'ll sell today. You\'ll sell for twenty years."' },
        { speaker: 'narrator', text: 'An hour later a customer picks up a blue print, holds it up to the light, and turns to Kofi. Mum is at the back.' },
        { speaker: 'narrator', text: '"Is this the last one? I\'m not sure if I should buy it today."' },
        { speaker: 'narrator', text: 'Kofi knows there are six more of that print on the shelf behind him.' },
        { speaker: 'tey', text: 'Now you\'re on the other side of the table. Every trick that\'s been used on Kofi is right here, in his hands. What does he say?' },
      ],
      choice: {
        prompt: 'What should Kofi say?',
        options: [
          { text: '"Yes, the last one! Today only."', outcome: 'She buys it, and it\'s a lie. Next month she sees the same print on the shelf. She doesn\'t come back. Mum would be furious, and right.' },
          { text: '"We have a few more. Take your time. This one\'s good quality, though: feel how thick the wax is. It holds its colour."', outcome: 'Yes. Honest about the stock, clear about the real value. She thinks, walks round the market, and comes back an hour later to buy two. Mum, from the back: "That\'s my son."', best: true },
          { text: '"If you buy now, I\'ll give you 30% off."', outcome: 'An invented discount to rush her, on Mum\'s cloth, without asking Mum. Pressure, not honesty.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Honest sellers tell you the truth about what\'s left and what something is worth. Pressure sellers rush you. The question for any seller: "Is that really true?"',
    },
  ],
  apply: {
    scenario: 'The other side of the table.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Honest selling or pressure selling?',
        groups: ['Honest', 'Pressure'],
        items: [
          { text: '"Last two pieces!" with twenty under the table', group: 1 },
          { text: '"Feel how thick the wax is"', group: 0 },
          { text: '"Take your time"', group: 0 },
          { text: '"Buy now or it\'s gone!"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Mum mean by "She\'ll sell today. You\'ll sell for twenty years"?',
        options: [
          { text: 'The neighbour is a better seller', why: 'For one day. Mum means the long run.' },
          { text: 'Selling takes twenty years', why: 'She means trust builds a business that lasts.' },
          { text: 'Lies win one sale; honesty wins customers who come back' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to the trick it uses.',
        pairs: [
          ['"Last two pieces!"', 'Fake scarcity'],
          ['"Today only!"', 'Fake urgency'],
          ['"30% off if you buy now"', 'Invented discount'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Mum, the neighbour sells faster with "last two pieces". Why don\'t we?',
        prompt: 'What would Mum say?',
        options: [
          { text: 'Because customers remember. The ones who find twenty under the table never come back. Ours do.' },
          { text: 'We should start.', why: 'Mum\'s whole business is built on not doing that.' },
          { text: 'Because we\'re lazy.', why: 'It\'s a choice, not laziness.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Mum\'s rule.',
        template: 'Never say "last [[1]]" when you have [[2]].',
        blanks: [['two'], ['twenty']],
        distractors: ['one', 'none'],
      },
      {
        kind: 'mcq',
        prompt: 'The customer came back an hour later and bought two. Why?',
        options: [
          { text: 'She was tricked', why: 'Nobody tricked her. That\'s the point.' },
          { text: 'It was cheaper', why: 'Same price. She bought on trust.' },
          { text: 'She trusted the stall, and she\'d had time to decide she really wanted it' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which thing Kofi could say is the manipulation?',
        lines: [
          'This print is heavy wax; it holds its colour.',
          'We have six more, so no rush.',
          'Only one left and the price goes up tomorrow.',
        ],
        bug: 2,
        fix: 'Tell the truth about stock and price.',
        explanation: 'False scarcity and a fake price rise are designed to rush the customer.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The neighbour said "last two" but had about 20. How many more did she really have than she said?',
        answers: ['18', 'eighteen'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what honest selling looks like.',
        lines: ['Tell the truth about what\'s left', 'Show the real value', 'Give the customer time', 'Let them decide'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the one question to ask any seller\'s claim?',
        options: [
          { text: '"Can I have it free?"', why: 'Fun, but not the point.' },
          { text: '"Is that really true?"' },
          { text: '"How fast can I buy?"', why: 'That\'s the question pressure sellers want.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a seller (in person or online) who rushed you. What did they say? Was it true?',
    starters: ['They said...', 'It was / wasn\'t true because...'],
  },
  deepen: {
    title: 'Markets and trust',
    summary: 'In markets around the world, regular customers and long relationships are a seller\'s biggest asset. That\'s why the best traders, like Mum, rarely use pressure. Online, where shoppers may never return, some sellers are more tempted to use tricks.',
  },
  notes: 'Makola Market (Accra) is a real, large market; Mum\'s stall and the neighbour are fictional. Course 3 Ch3 is set during the mid-semester break at home.',
};

export default lesson;
