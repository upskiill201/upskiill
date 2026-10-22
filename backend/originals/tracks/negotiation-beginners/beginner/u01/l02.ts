import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Step-by-step: what a negotiation is made of. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What a negotiation is',
  summary: 'Ada thought negotiation meant suits and shouting. Tey breaks it into five simple parts that are in every negotiation, from a rent rise to a salary review.',
  minutes: 11,
  outcomes: [
    'Name the five parts of any negotiation',
    'Spot each part in a real situation',
    'See that negotiation is about agreement, not winning',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five parts of every negotiation',
      steps: [
        { title: '1. Two sides who need each other', body: 'Mr Adeyemi needs a tenant who pays. Ada needs a flat. Neither can get it alone.' },
        { title: '2. Something each side wants', body: 'He wants more money. She wants a fair rent she can afford. These are their starting positions.' },
        { title: '3. The reasons behind it', body: 'Why does he want more? Maybe his costs went up, or he wants a reliable tenant. Reasons are where deals hide.' },
        { title: '4. What happens if you don\'t agree', body: 'He has to find a new tenant. She has to move. Both have an alternative; neither is free.' },
        { title: '5. A deal both can accept', body: 'The goal isn\'t to beat him. It\'s an agreement both would choose over their alternative.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Negotiation isn\'t a fight to win. It\'s finding an agreement both sides prefer to no deal.',
    },
  ],
  apply: {
    scenario: 'The five parts.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five parts.',
        lines: ['Two sides who need each other', 'Something each side wants', 'The reasons behind it', 'What happens if you don\'t agree', 'A deal both can accept'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Ada\'s rent situation.',
        pairs: [
          ['Two sides', 'Ada and Mr Adeyemi'],
          ['What he wants', '₦1,500,000 a year'],
          ['A possible reason', 'His costs went up'],
          ['If they don\'t agree', 'She moves; he finds a tenant'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the goal of a negotiation?',
        options: [
          { text: 'Beating the other side', why: 'Beaten people don\'t keep deals.' },
          { text: 'Getting everything you want', why: 'Rarely possible, and rarely lasts.' },
          { text: 'An agreement both sides prefer to no deal' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'What someone wants, or the reason behind it?',
        groups: ['What they want', 'The reason'],
        items: [
          { text: '₦1,500,000 a year', group: 0 },
          { text: 'His property tax went up', group: 1 },
          { text: 'A pay rise', group: 0 },
          { text: 'Ada\'s rent is going up', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So negotiating isn\'t about being tough?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'It\'s all about being tough.', why: 'Toughness without preparation loses deals.' },
          { text: 'It\'s about being prepared and clear. Calm, curious people often do better than tough ones.' },
          { text: 'It\'s about being nice and giving in.', why: 'Giving in isn\'t negotiating.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Where deals hide.',
        template: 'The [[1]] behind what people want is where [[2]] hide.',
        blanks: [['reasons'], ['deals']],
        distractors: ['prices', 'threats'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many parts does every negotiation have?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does it matter that the landlord has an alternative too?',
        options: [
          { text: 'Finding a new tenant costs him time and money, so Ada has more power than she thinks' },
          { text: 'It doesn\'t matter', why: 'His alternative is part of her power.' },
          { text: 'It means she must agree', why: 'It means he needs her too.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s notes misunderstands negotiation?',
        lines: [
          'He needs a tenant; I need a flat.',
          'I should find out why he wants more.',
          'If I don\'t win, I\'ve failed.',
          'A good deal is one we both prefer to no deal.',
        ],
        bug: 2,
        fix: 'If we both prefer the deal to no deal, it worked.',
        explanation: 'Negotiation isn\'t win or lose.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the negotiation is this?',
        groups: ['What they want', 'If we don\'t agree'],
        items: [
          { text: 'Tobi wants the design system owned', group: 0 },
          { text: 'Tobi would have to hire someone', group: 1 },
          { text: 'Mrs Okon wants a logo', group: 0 },
          { text: 'Mrs Okon finds another designer', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Pick one negotiation in your life right now. Write down the five parts.',
    starters: ['The two sides are...', 'If we don\'t agree...'],
  },
  deepen: {
    title: 'Principled negotiation',
    summary: 'Fisher and Ury\'s method focuses on interests, options and fair standards instead of haggling over positions. You\'ll use all of it in Chapters 2 and 4.',
  },
  notes: 'Five-part framing adapted from Fisher, Ury & Patton, Getting to Yes (positions, interests, alternatives, agreement). Fictional rent figures.',
};

export default lesson;
