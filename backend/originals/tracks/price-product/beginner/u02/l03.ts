import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Step-by-step: finding the value. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Finding the value',
  summary: 'What exactly does a WashDay bag give a student? David and Clinton list it in four steps and put a rough number on each part. The total is far above 1,500 FCFA.',
  minutes: 12,
  outcomes: [
    'List what your service saves or gives customers',
    'Put rough numbers on time, money and hassle',
    'Compare the value with your price',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'What a bag is worth to a student',
      steps: [
        { title: '1. The next-best option', body: 'Most students\' alternative is hand-washing: free in money, about 3 hours every Saturday. Some pay Mama Rose 2,400 a basket.' },
        { title: '2. Time saved', body: 'WashDay saves about 3 hours. If a student values an hour like a campus job pays, about 1,000 FCFA, that\'s around 3,000 FCFA of time.' },
        { title: '3. Hassle saved', body: 'No carrying baskets up the hill. No damp jeans on Monday. No buying extra clothes to wash less. Hard to price, but real: Brenda would "pay more" just for this.' },
        { title: '4. Compare with the price', body: 'Compared with Mama Rose: WashDay is 900 cheaper AND collects. Compared with washing by hand: it saves about 3,000 FCFA of time for 1,500. Either way, 1,500 is well below the value.' },
        { title: 'Value isn\'t price', body: 'You don\'t charge the full value; customers need a good deal too. But knowing the value shows how much room you have.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Value = what your customer saves or gains compared with their next-best option.',
    },
  ],
  apply: {
    scenario: 'What\'s a bag worth?',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps to find the value.',
        lines: ['Find the next-best option', 'Count the time saved', 'Count the hassle saved', 'Compare the total with your price'],
      },
      {
        kind: 'typeAnswer',
        prompt: '3 hours saved, valued at 1,000 FCFA an hour. What is that time worth, in FCFA?',
        answers: ['3000', '3,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'If a bag saves about 3,000 FCFA of time, why not charge 3,000?',
        options: [
          { text: 'Customers need a good deal too; you price below the value, not at it' },
          { text: 'Time has no value', why: 'It does; that\'s the point.' },
          { text: 'Because 3,000 is below cost', why: 'It\'s far above cost.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Time saved, money saved, or hassle saved?',
        groups: ['Time', 'Money', 'Hassle'],
        items: [
          { text: 'No three-hour Saturday wash', group: 0 },
          { text: '900 less than Mama Rose', group: 1 },
          { text: 'No carrying baskets up the hill', group: 2 },
          { text: 'No damp jeans on Monday', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'How can I put a price on "no damp jeans"?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'You can\'t, so ignore it.', why: 'Hard-to-price value is still value.' },
          { text: 'You don\'t need an exact number. Notice what people do to avoid it: Esther bought extra clothes. That shows it\'s worth something real.' },
          { text: 'Charge 5,000 for it.', why: 'Don\'t invent precise numbers; watch behaviour.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the student to the value she gets.',
        pairs: [
          ['Brenda', 'No carrying up the hill'],
          ['Ama', 'Her Saturday back'],
          ['Esther', 'No extra clothes to buy'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What value means.',
        template: 'Value = what the customer [[1]] or gains compared with their [[2]] option.',
        blanks: [['saves'], ['next-best', 'next best']],
        distractors: ['spends', 'worst'],
      },
      {
        kind: 'mcq',
        prompt: 'Compared with Mama Rose\'s 2,400, how much does a student save in money with WashDay at 1,500?',
        options: [
          { text: '1,500 FCFA', why: 'That\'s WashDay\'s price.' },
          { text: 'Nothing', why: 'WashDay is cheaper.' },
          { text: '900 FCFA, and the carrying' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s value list isn\'t value to the customer?',
        lines: [
          'Saves about 3 hours on Saturday.',
          'Cheaper than Mama Rose.',
          'Clinton gets to ride his bike.',
          'No carrying up the hill.',
        ],
        bug: 2,
        fix: 'Remove it: value is about what the customer gains.',
        explanation: 'Value is measured from the customer\'s side.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A student values an hour at 600 FCFA. What are 3 hours worth to her, in FCFA?',
        answers: ['1800', '1,800'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What does your offer save your customer, in time, money and hassle? Put a rough number on each.',
    starters: ['It saves them...', 'Roughly worth...'],
  },
  deepen: {
    title: 'Different customers, different value',
    summary: 'A student who values an hour at 600 FCFA and one who values it at 2,000 get very different value from the same bag. Chapter 3 uses that difference to design options.',
  },
  notes: 'Value estimate (fictional): hand-washing ~3 hours each Saturday; time valued at ~1,000 FCFA/hour (campus job rate in the story) ≈ 3,000 FCFA; Mama Rose 2,400 vs WashDay 1,500 (900 saved).',
};

export default lesson;
