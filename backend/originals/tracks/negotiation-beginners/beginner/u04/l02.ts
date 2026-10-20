import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Before/After: splitting the difference vs trading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Splitting vs trading',
  summary: 'The obvious end to the rent talk: Ada says ₦1,300,000, he says ₦1,450,000, they meet in the middle. Lucía shows her a deal that\'s better for both of them than the middle.',
  minutes: 12,
  outcomes: [
    'See why splitting the difference often leaves value behind',
    'Add more issues so both sides can gain',
    'Compare a split with a trade in numbers',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Meeting in the middle vs trading',
      before: {
        label: 'Split the difference',
        text: '₦1,300,000 and ₦1,450,000. Middle: ₦1,375,000.\nOne-year lease, like before.\nNext year they do it all again.\nNobody\'s unhappy. Nobody\'s happy either.',
      },
      after: {
        label: 'Trade',
        text: '₦1,350,000 a year, on a two-year lease.\nAda fixes the broken gate lock herself (about ₦35,000).\nHe gets two years with no empty months and one repair off his list.\nAda saves ₦150,000 a year against his first ask and gets a stable budget.',
      },
      notes: [
        'Splitting the difference only moves one number. Trades use several issues.',
        'A two-year lease is worth a lot to him (no empty months) and costs Ada little (she wants to stay anyway).',
        'Ada pays less than the middle, and he\'s better off than with a one-year deal at the middle.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Splitting divides one number. Trading adds issues, so both sides can get more of what matters to them.',
    },
  ],
  apply: {
    scenario: 'Middle or trade?',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the midpoint of ₦1,300,000 and ₦1,450,000, in naira?',
        answers: ['1375000', '1,375,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At ₦1,350,000 instead of ₦1,500,000, how much does Ada save each year, in naira?',
        answers: ['150000', '150,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is the two-year lease a good trade?',
        options: [
          { text: 'It\'s worth a lot to him (no empty months) and costs Ada little (she wants to stay)' },
          { text: 'Longer is always better', why: 'It works because they value it differently.' },
          { text: 'It\'s a legal requirement', why: 'It\'s a choice they make.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of a split, or part of a trade?',
        groups: ['Split', 'Trade'],
        items: [
          { text: 'Meet in the middle at ₦1,375,000', group: 0 },
          { text: 'Two-year lease for a lower rent', group: 1 },
          { text: 'Ada fixes the gate lock', group: 1 },
          { text: '"Let\'s just go halfway."', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Isn\'t meeting in the middle the fairest thing?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'It feels fair, but it only uses one number. Add the lease length and repairs, and you can both do better than the middle.' },
          { text: 'Yes, always split.', why: 'Splitting leaves value on the table.' },
          { text: 'No, never compromise.', why: 'The point is better trades, not refusing.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the issue to who values it more.',
        pairs: [
          ['Two-year lease', 'Mr Adeyemi (no empty months)'],
          ['Lower yearly rent', 'Ada (her budget)'],
          ['Gate lock fixed', 'Mr Adeyemi (one less job)'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The difference.',
        template: 'Splitting divides one [[1]]. Trading adds [[2]].',
        blanks: [['number'], ['issues']],
        distractors: ['friend', 'threats'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Saving ₦150,000 a year for two years, minus ₦35,000 for the lock. Net saving, in naira?',
        answers: ['265000', '265,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s plan misses the trade?',
        lines: [
          'Open at ₦1,300,000, with evidence.',
          'Offer a two-year lease.',
          'If he says ₦1,450,000, just meet in the middle.',
          'Offer to fix the gate lock myself.',
        ],
        bug: 2,
        fix: 'If he says ₦1,450,000, add the lease and the lock.',
        explanation: 'Jumping to the middle drops the trades.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the move from splitting to trading.',
        lines: ['Notice there\'s only one number', 'List other issues', 'Find what each side values more', 'Trade those issues'],
      },
    ],
  },
  reflect: {
    prompt: 'In your negotiation, what other issues could you add besides price?',
    starters: ['Besides price, we could discuss...'],
  },
  deepen: {
    title: 'Leaving value on the table',
    summary: 'Studies of negotiators find that many agreements leave both sides worse off than they could have been, often because they argued over one issue and never explored the others.',
  },
  notes: 'Fictional: split ₦1,375,000 (1 year) vs trade ₦1,350,000 on a 2-year lease + Ada fixes the gate lock (~₦35,000). Savings vs ₦1,500,000: ₦150,000/yr; net over 2 years ₦265,000. Leaving value on the table: Thompson & Hastie (1990), "Social perception in negotiation", OBHDP.',
};

export default lesson;
