import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Myth or Fact: what an MVP is, and isn't. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What an MVP is, and isn\'t',
  summary: 'Clinton hears "minimum viable product" and pictures a small, wobbly app. Tey sets him straight: an MVP is the smallest thing that answers your riskiest question. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Explain what a minimum viable product is',
    'Know that an MVP doesn\'t have to be software',
    'Match an MVP to the question it answers',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'An MVP is a cheap, buggy version of the full product.',
          isFact: false,
          explain: 'Myth. It\'s the smallest thing that answers your riskiest question. WashDay\'s MVP isn\'t a small app; it\'s a WhatsApp post and a bicycle.',
        },
        {
          text: 'An MVP doesn\'t have to be software.',
          isFact: true,
          explain: 'Fact. A post, a video, a form, or you doing the work by hand all count, if they test something real.',
        },
        {
          text: 'You should only show an MVP to customers when it\'s polished.',
          isFact: false,
          explain: 'Myth. Polish costs time before you know if anyone cares. Customers forgive a rough start if the job gets done.',
        },
        {
          text: 'A good MVP is built to answer one clear question.',
          isFact: true,
          explain: 'Fact. WashDay\'s: "Will hostel students pay 1,500 FCFA for laundry pickup?" Everything else can wait.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'MVP: the smallest thing that answers your riskiest question with real customer behaviour.',
    },
  ],
  apply: {
    scenario: 'What counts as an MVP?',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a minimum viable product?',
        options: [
          { text: 'A small version of the full app', why: 'It doesn\'t have to be an app at all.' },
          { text: 'The cheapest product on the market', why: 'It\'s about learning, not price.' },
          { text: 'The smallest thing that tests your riskiest assumption with real customers' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Could this be an MVP for WashDay?',
        groups: ['Good MVP', 'Not an MVP'],
        items: [
          { text: 'A WhatsApp post that takes real payments', group: 0 },
          { text: 'A full app with tracking and ratings', group: 1 },
          { text: 'Clinton collecting bags by hand', group: 0 },
          { text: 'A logo and nothing else', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'WashDay\'s MVP question.',
        template: 'Will hostel students [[1]] 1,500 FCFA for laundry [[2]]?',
        blanks: [['pay'], ['pickup']],
        distractors: ['like', 'apps'],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'A WhatsApp post isn\'t a product. Shouldn\'t my MVP at least be a website?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'A website would test the same question, slower. The post plus real payment answers it this weekend.' },
          { text: 'Yes, it must be a website.', why: 'The format doesn\'t matter; the question does.' },
          { text: 'MVPs must be apps.', why: 'Many famous MVPs weren\'t software.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the MVP to the question it answers.',
        pairs: [
          ['A paid WhatsApp offer', 'Will they pay?'],
          ['Collecting bags by hand', 'Can we deliver on time?'],
          ['Mama Rose washing for a weekend', 'Will the partnership work?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why shouldn\'t Clinton wait until WashDay is polished?',
        options: [
          { text: 'Customers hate polish', why: 'They don\'t mind it; it just isn\'t needed yet.' },
          { text: 'Polish is impossible', why: 'Possible, just premature.' },
          { text: 'Polish costs time before he knows if anyone will pay' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s MVP plan isn\'t needed to answer "will they pay?"',
        lines: [
          'Post the offer with the price.',
          'Take payment on Mobile Money.',
          'Design branded laundry bags first.',
          'Collect and return by hand.',
        ],
        bug: 2,
        fix: 'Use any clean bag with a name tag for now.',
        explanation: 'Branding doesn\'t help answer the paying question.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does the "M" in MVP stand for?',
        answers: ['minimum', 'Minimum'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the MVP thinking.',
        lines: ['Pick the riskiest assumption', 'Ask what would prove or kill it', 'Find the smallest thing that tests it', 'Run it with real customers'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needed for this weekend\'s MVP, or later?',
        groups: ['This weekend', 'Later'],
        items: [
          { text: 'A price customers can pay', group: 0 },
          { text: 'Order tracking', group: 1 },
          { text: 'A way to collect bags', group: 0 },
          { text: 'Customer accounts and passwords', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What is the riskiest question about your idea? What\'s the smallest MVP that could answer it?',
    starters: ['My question is...', 'My MVP could be...'],
  },
  deepen: {
    title: 'Where the term comes from',
    summary: '"Minimum viable product" was popularised by Eric Ries in The Lean Startup: the version that lets you complete a build-measure-learn loop with the least effort.',
  },
  notes: 'MVP: Eric Ries, The Lean Startup (2011), building on Frank Robinson\'s earlier use of the term. WashDay price 1,500 FCFA is Clinton\'s guess, tested in this chapter.',
};

export default lesson;
