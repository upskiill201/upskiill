import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Step-by-step: zero-based budgeting. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Give every cedi a job',
  summary: 'Draft C works because of one rule: income minus every planned job equals zero. Here\'s how to build a budget like that, step by step, for any income.',
  minutes: 12,
  outcomes: [
    'Build a zero-based budget in six steps',
    'Put savings and surprises in as jobs, not leftovers',
    'Check your budget adds up',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Zero-based budgeting',
      steps: [
        { title: '1. Write your income for the month', body: 'Only money you\'re sure of. Kofi: GH₵1,500 from Mum. Beat money isn\'t certain, so it doesn\'t go in yet (Chapter 4 shows what to do with it).' },
        { title: '2. List fixed costs first', body: 'Same amount every month: data plan GH₵70, dues GH₵20, toiletries and laundry GH₵40. Total GH₵130.' },
        { title: '3. Pay your future self', body: 'Decide savings now, not "if there\'s some left". Kofi: GH₵200. Then surprises: GH₵150. These are jobs too.' },
        { title: '4. Plan the flexible costs', body: 'Food staples GH₵240, food out GH₵400, transport GH₵60, fun GH₵120, school GH₵100, haircut and clothes GH₵100. Use your case file from Chapter 1 to make the numbers believable.' },
        { title: '5. Make it equal zero', body: 'Income − all jobs = 0. If it\'s above zero, give the extra a job (more savings, or a line you squeezed). If it\'s below zero, trim flexible lines until it balances.' },
        { title: '6. Write it where you\'ll see it', body: 'One page, phone notes or a notebook. You\'ll check against it every week (Chapter 5).' },
      ],
    },
    {
      kind: 'check',
      question: 'Kofi\'s income is GH₵1,500 and his jobs add to GH₵1,450. What should he do?',
      options: ['Give the GH₵50 a job, like more savings', 'Leave it unplanned as spending money', 'Spend it now'],
      answer: 0,
      explanation: 'Unplanned money tends to drift. In zero-based budgeting every cedi gets a job, even if the job is "save".',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Income − every job = 0. Zero doesn\'t mean you spend it all. It means nothing is left without a plan.',
    },
  ],
  apply: {
    scenario: 'Building month 2.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the zero-based steps.',
        lines: ['Write income', 'List fixed costs', 'Set savings and surprises', 'Plan flexible costs', 'Make it equal zero', 'Write it where you\'ll see it'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Fixed costs: data GH₵70 + dues GH₵20 + toiletries GH₵40 = ?',
        answers: ['130', 'GH₵130', '130 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does saving come before the flexible costs?',
        options: [
          { text: 'Because savings decided first actually happen; "whatever\'s left" rarely does' },
          { text: 'Because savings are more fun', why: 'Not the reason. Order decides whether it happens.' },
          { text: 'It doesn\'t matter when', why: 'It matters a lot: leftovers tend to get spent.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Income [[1]] every job = [[2]].',
        blanks: [['−', '-', 'minus'], ['0', 'zero']],
        distractors: ['+', '100'],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s jobs add to GH₵1,560 but income is GH₵1,500. What now?',
        options: [
          { text: 'Borrow GH₵60', why: 'Building borrowing into the plan starts the month in a hole.' },
          { text: 'Ignore it; close enough', why: 'GH₵60 short becomes a day-27 crisis.' },
          { text: 'Trim GH₵60 from flexible lines until it balances' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step does each belong to?',
        groups: ['Fixed costs', 'Future self', 'Flexible costs'],
        items: [
          { text: 'Data plan GH₵70', group: 0 },
          { text: 'Savings GH₵200', group: 1 },
          { text: 'Food out GH₵400', group: 2 },
          { text: 'Surprises GH₵150', group: 1 },
          { text: 'Fun GH₵120', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Zero left? So you\'re broke on purpose now?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Yes, I like being broke.', why: 'Funny, but wrong. He has GH₵200 saved and GH₵150 for surprises.' },
          { text: 'Zero unplanned, not zero money. GH₵200 is saved and GH₵150 is for surprises. It all has a job.' },
          { text: 'Leave me alone.', why: 'A chance to explain, and maybe help Yaw too.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which step did this budget skip?',
        lines: [
          'Income: GH₵2,000.',
          'Fixed: rent GH₵800, phone GH₵100.',
          'Flexible: food GH₵500, transport GH₵200, fun GH₵400.',
          'Savings: whatever\'s left.',
        ],
        bug: 3,
        fix: 'Savings: a set amount, decided before the flexible lines.',
        explanation: 'Fixed + flexible here = 2,000. "Whatever\'s left" is GH₵0. Savings must be a job, planned early.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Income GH₵1,500. Jobs so far: GH₵1,380. How much still needs a job?',
        answers: ['120', 'GH₵120', '120 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t Kofi count beat money in month 2\'s income?',
        options: [
          { text: 'Because it isn\'t certain, and plans should be built on money you\'re sure of' },
          { text: 'Because beat money doesn\'t count as income', why: 'It counts when it arrives. It just isn\'t certain in advance.' },
          { text: 'Because it\'s too much', why: 'It\'s small and irregular, which is exactly why he doesn\'t rely on it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own income for next month, then your fixed costs and a savings amount. How much is left for flexible costs?',
    starters: ['Income:...', 'Fixed:...', 'Savings:...', 'Left for flexible:...'],
  },
  deepen: {
    title: 'Where zero-based budgeting comes from',
    summary: 'Zero-based budgeting began in business and government in the 1970s: every cost had to be justified from zero each year instead of copying last year. For a person it\'s simpler: start from your income and give each unit a job.',
  },
  notes: 'Kofi month 2 (fictional) as in L01 notes. Zero-based budgeting: Peter Pyhrr (Texas Instruments, 1970; Harvard Business Review 1970), later used by US government under Carter; stated generally.',
};

export default lesson;
