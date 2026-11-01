import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the 1st',
  summary: 'The 1st. GH₵1,500 lands, and for the first time Kofi knows exactly where every cedi is going. Check what you know: realistic plans, zero-based budgets, 50/30/20 and weekly money.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Build and check a zero-based budget', 'Split monthly money into weeks'],
  learn: [
    {
      kind: 'story',
      title: 'Payday',
      beats: [
        { speaker: 'narrator', text: 'The 1st, 7 a.m. "You have received GH₵1,500.00 from A. MENSAH."' },
        { speaker: 'kofi', text: 'GH₵205 to my spending money. The rest stays put. Week 1, go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the plan.',
    items: [
      {
        kind: 'fillBlank',
        prompt: 'The zero-based rule.',
        template: 'Income − every [[1]] = [[2]].',
        blanks: [['job'], ['0', 'zero']],
        distractors: ['want', '100'],
      },
      {
        kind: 'mcq',
        prompt: 'Which plan is most likely to last a month?',
        options: [
          { text: 'Save GH₵1,000, food GH₵300, no fun', why: 'Too tight. It breaks in week one.' },
          { text: '"I\'ll be careful"', why: 'No numbers to check against.' },
          { text: 'Every line believable, room for fun and surprises, adds up to the income' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to its share.',
        pairs: [
          ['Needs', '50%'],
          ['Wants', '30%'],
          ['Savings', '20%'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵820 of flexible money over 4 weeks. Per week?',
        answers: ['205', 'GH₵205', '205 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Decide first, or plan after?',
        groups: ['Decide first', 'Plan after'],
        items: [
          { text: 'Fixed costs', group: 0 },
          { text: 'Savings', group: 0 },
          { text: 'Food out', group: 1 },
          { text: 'Fun', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'My needs are 57%. Did I fail the rule?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'No. On a small income needs are bigger. Keep saving something; that\'s the habit.' },
          { text: 'Yes, cut needs to 50%.', why: 'Squeezing real needs breaks the plan.' },
          { text: 'Forget the rule and forget saving.', why: 'Bend the rule, keep the habit.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this budget breaks zero-based budgeting?',
        lines: [
          'Income GH₵1,500.',
          'Fixed GH₵130, savings GH₵200, surprises GH₵150.',
          'Flexible GH₵820, school and personal GH₵200.',
          'Left without a job: GH₵100.',
        ],
        bug: 3,
        fix: 'Give the GH₵100 a job, or check the sums.',
        explanation: '130 + 200 + 150 + 820 + 200 = 1,500, so nothing should be left. If there is, something\'s missing or wrong.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: which comes first when money is short?',
        options: [
          { text: 'Costs with penalties', why: 'Level 3. Staying alive and safe comes first.' },
          { text: 'Staying alive and safe: food, medicine, a safe place' },
          { text: 'Whatever friends ask for', why: 'That\'s the "loudest first" trap.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: GH₵10 a day is how much a month (30 days)?',
        options: [
          { text: 'GH₵30', why: '10 × 30 = 300.' },
          { text: 'GH₵100', why: 'That\'s 10 days.' },
          { text: 'GH₵300' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the zero-based steps.',
        lines: ['Income', 'Fixed costs', 'Savings and surprises', 'Flexible costs', 'Check it equals zero'],
      },
      {
        kind: 'mcq',
        prompt: 'Why spend from a weekly amount?',
        options: [
          { text: 'A week is short enough to notice when you\'re running low' },
          { text: 'Shops are cheaper on Sundays', why: 'Nothing to do with shop prices.' },
          { text: 'It means you spend less on food', why: 'It means you see your spending in time to act.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'On your next payday, what will you do in the first hour?',
    starters: ['First, I\'ll...', 'Then...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1–4 with Chapter 1 and 2 review items.',
};

export default lesson;
