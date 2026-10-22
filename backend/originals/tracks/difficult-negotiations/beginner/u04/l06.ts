import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Before/After: when to walk away. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'When to walk away',
  summary: 'Joel wants to stay at almost any price. Kavya wants to walk at the first insult. Arjun has a better test, and it fits on one line: does this deal beat my BATNA?',
  minutes: 12,
  outcomes: [
    'Decide to walk or stay using your BATNA, not your feelings',
    'Include non-money value in the comparison',
    'Avoid walking out too early or staying too long',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Deciding by feeling vs deciding by BATNA',
      before: {
        label: 'By feeling',
        text: 'Joel: "It\'s our biggest client ever. Stay at any price."\nKavya: "Pryce was rude. Walk."\nOne stays too long. One walks too early.\nNeither looks at the numbers.',
      },
      after: {
        label: 'By BATNA',
        text: '£35,000 leaves Arjun £10,000. Kinwell leaves £12,000.\nNon-money: Harlow & Finch would be a great reference; Kinwell is steady and familiar.\nArjun decides: below £37,000, he walks, politely, unless the deal changes.\nHe\'d stay for less than £37,000 only if something else of real value was added.',
      },
      notes: [
        'The test: does this deal beat my BATNA, all things considered?',
        'Add non-money value honestly: references, learning, future work. Don\'t use it to excuse a bad deal.',
        'Walking away is a decision, not a tantrum. Do it calmly, and leave the door open.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Walk or stay? Ask: does this deal beat my BATNA, money and non-money, honestly counted?',
    },
  ],
  apply: {
    scenario: 'Walk or stay.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the one-line test for walking away?',
        options: [
          { text: 'Do I like them?', why: 'Feelings can mislead both ways.' },
          { text: 'Is it a big company?', why: 'Size isn\'t the test.' },
          { text: 'Does this deal beat my BATNA?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At £35,000 with £25,000 costs, Arjun keeps £10,000. Kinwell gives £12,000. How much better is Kinwell, in pounds?',
        answers: ['2000', '2,000', '£2,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Deciding by feeling, or by BATNA?',
        groups: ['Feeling', 'BATNA'],
        items: [
          { text: '"They were rude, walk!"', group: 0 },
          { text: '"It keeps £10,000 vs Kinwell\'s £12,000."', group: 1 },
          { text: '"Biggest client ever, stay!"', group: 0 },
          { text: '"Below £37,000 unless something is added."', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the non-money value to the option.',
        pairs: [
          ['A great reference for big clients', 'Harlow & Finch'],
          ['Steady, familiar work', 'Kinwell'],
          ['Time to pitch new leads', 'Kinwell (Joel is free)'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'The reference alone is worth taking £35,000!',
        prompt: "Grace's best reply?",
        options: [
          { text: 'It\'s worth something, so count it honestly. But don\'t let "reference" excuse any price. Would you take £25,000 for it?' },
          { text: 'Yes, references are priceless.', why: 'They have a value, not infinite value.' },
          { text: 'References are worthless.', why: 'They have real value.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Walking away.',
        template: 'Walking away is a [[1]], not a [[2]].',
        blanks: [['decision'], ['tantrum']],
        distractors: ['threat', 'holiday'],
      },
      {
        kind: 'mcq',
        prompt: 'What could make Arjun stay below £37,000?',
        options: [
          { text: 'Pryce being nicer', why: 'Tone doesn\'t change the numbers.' },
          { text: 'Nothing, ever', why: 'Real added value could change it.' },
          { text: 'Something else of real value added, like guaranteed phase-two work' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the team\'s decision is by feeling?',
        lines: [
          'Kinwell leaves us £12,000.',
          '£35,000 leaves us £10,000.',
          'Pryce annoyed me, so we walk.',
          'Walk-away: £37,000 unless value is added.',
        ],
        bug: 2,
        fix: 'Walk because £35,000 doesn\'t beat Kinwell.',
        explanation: 'Annoyance isn\'t a reason; the numbers are.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is Arjun\'s walk-away for phase one, in pounds?',
        answers: ['37000', '37,000', '£37,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the walk-or-stay decision.',
        lines: ['Compare money with the BATNA', 'Add non-money value honestly', 'Decide', 'Act calmly'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you stayed in a deal too long, or walked out too early? What would the BATNA test have said?',
    starters: ['I once...', 'The test would have said...'],
  },
  deepen: {
    title: 'Sunk costs',
    summary: 'After weeks of talks, it feels wasteful to walk away. But the time already spent is gone either way. Only the future matters: does this deal beat your alternative from here?',
  },
  notes: 'Walk-away decision by BATNA: Getting to Yes. Sunk-cost effect: Arkes & Blumer (1985), OBHDP 35. Fictional: £35,000 → £10,000 kept vs Kinwell £12,000.',
};

export default lesson;
