import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: four yeses in one week. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Four yeses in one week',
  summary: 'Ada says yes to a second project, a rent rise, a "pay whatever" logo job and the flat\'s fuel bill, all in one week. Then Lucía asks a question that stops her: "Did you ask for anything back?"',
  minutes: 11,
  outcomes: [
    'Notice everyday moments that are really negotiations',
    'See what saying yes too fast can cost',
    'Know what this course will help you do',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Yes, yes, yes, yes',
      beats: [
        { speaker: 'narrator', text: 'Monday. Ada\'s manager, Tobi, asks her to take on a second project. Same pay. She says "Of course!" in two seconds.' },
        { speaker: 'narrator', text: 'Tuesday. Her landlord texts: rent goes from ₦1,200,000 to ₦1,500,000 a year. She replies "OK sir" in four minutes.' },
        { speaker: 'narrator', text: 'Thursday. Mrs Okon, who runs a bakery, wants a logo. Ada says: "Pay whatever you think is fair."' },
        { speaker: 'narrator', text: 'Friday. Her flatmate Ngozi asks her to cover the generator fuel this month. Ada says yes. Again.' },
        { speaker: 'lucia', text: 'Your work for us is excellent. Can I ask something? This week, did you ask for anything back?' },
        { speaker: 'ada', text: '...No. Asking feels so awkward. And what if they say no?' },
        { speaker: 'tey', text: 'Four negotiations, and Ada didn\'t notice any of them. This course: notice them, prepare, ask, find deals where both sides win, and close well.' },
      ],
      choice: {
        prompt: 'Tobi messages again: "Can you also own the design system? It\'s a big job." What should Ada say?',
        options: [
          { text: '"I\'d like to. Can we talk about what comes off my plate, and about my role, at my review?"', outcome: 'Good. A yes with a question attached. She stays helpful and opens a conversation.', best: true },
          { text: '"Of course!"', outcome: 'A fifth free yes. Her work grows; nothing else does.' },
          { text: '"No, I\'m too busy."', outcome: 'A flat no closes the door on a chance to grow. There\'s a better middle.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A negotiation is any moment when you need someone else to agree. Most of them don\'t look like negotiations.',
    },
  ],
  apply: {
    scenario: 'Ada\'s week.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How many of Ada\'s four yeses were negotiations?',
        options: [
          { text: 'Only the rent', why: 'The project, logo and fuel all needed agreement too.' },
          { text: 'All four' },
          { text: 'None of them', why: 'Each one was a chance to agree terms.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rent went from ₦1,200,000 to ₦1,500,000 a year. How much more is that a year, in naira?',
        answers: ['300000', '300,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'A negotiation, or not really?',
        groups: ['A negotiation', 'Not really'],
        items: [
          { text: 'Agreeing a rent rise', group: 0 },
          { text: 'Splitting the fuel bill', group: 0 },
          { text: 'Reading the news', group: 1 },
          { text: 'Pricing a logo job', group: 0 },
          { text: 'Choosing your own breakfast', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each yes to what Ada could have asked.',
        pairs: [
          ['Second project', 'What comes off my plate?'],
          ['Rent rise', 'Can we talk about the amount?'],
          ['Logo job', 'Here is my price'],
          ['Fuel bill', 'Can we split it?'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'If I ask, they\'ll think I\'m greedy.',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Yes, so never ask.', why: 'Then Ada pays for every yes.' },
          { text: 'Demand it, don\'t ask.', why: 'Demands are what feel greedy.' },
          { text: 'Asking politely, with a reason, isn\'t greedy. People ask me for things every day. I only mind when they\'re rude.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'What a negotiation is.',
        template: 'Any moment when you need someone else to [[1]].',
        blanks: [['agree']],
        distractors: ['leave', 'pay'],
      },
      {
        kind: 'mcq',
        prompt: 'What was wrong with "Pay whatever you think is fair"?',
        options: [
          { text: 'It leaves the price to the other side, who will usually pick a low one' },
          { text: 'Nothing, it\'s kind', why: 'Kind, but it hands away the decision.' },
          { text: 'It\'s rude', why: 'It\'s polite; it just costs her.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Ada\'s replies to Tobi gives everything away?',
        lines: [
          'Thanks for trusting me with this.',
          'I\'d like to own the design system.',
          'And don\'t worry about anything else changing.',
          'Can we talk about my workload this week?',
        ],
        bug: 2,
        fix: 'Delete it: she wants to talk about what changes.',
        explanation: 'It promises in advance not to ask for anything.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this course teaches.',
        lines: ['Notice the negotiation', 'Prepare', 'Ask', 'Find a win-win', 'Close well'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In how many minutes did Ada accept the rent rise?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'List the times this week when you needed someone to agree to something. Did you ask for anything back?',
    starters: ['This week I needed...', 'I could have asked...'],
  },
  deepen: {
    title: 'Everyday negotiation',
    summary: 'Getting to Yes (Fisher, Ury and Patton) starts from the idea that everyone negotiates every day: with family, landlords, bosses and clients. Seeing it is the first skill.',
  },
  notes: 'Fictional storyline: Ada (Lagos, junior product designer), manager Tobi, landlord rent ₦1,200,000 → ₦1,500,000/yr, Mrs Okon (bakery), flatmate Ngozi. Everyday negotiation framing from Fisher, Ury & Patton, Getting to Yes (1981/2011).',
};

export default lesson;
