import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: money sheet v4, surprises built in. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Money sheet v4: surprises built in',
  summary: 'Month 3\'s plan, rebuilt after Cape Coast, the screen and the lab manual. New lines, resized lines, and a rule for beat money. Tap through what changed and why.',
  minutes: 11,
  outcomes: [
    'See how a budget improves from month to month',
    'Read sinking funds and a split rule on a real sheet',
    'Update your own sheet from what last month taught you',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Kofi\'s money sheet v4 (month 3)',
      text: 'INCOME: GH₵1,500. Beats: GH₵0 planned; split 50/25/25 if sold. FIXED: Data GH₵70. Dues GH₵20. Toiletries and laundry GH₵40. FUTURE ME: Savings GH₵200. Surprises GH₵150. SINKING FUNDS: Bus home GH₵100. Phone and laptop fund GH₵30. WEEKLY (GH₵205 x 4): Staples GH₵60. Food out GH₵110. Transport GH₵15. Fun GH₵20. MONTHLY: School GH₵60. Haircut and clothes GH₵40. LEFT WITHOUT A JOB: GH₵0.',
      hotspots: [
        { phrase: 'Beats: GH₵0 planned; split 50/25/25 if sold', note: 'Plan on the lowest month. If a beat sells, half goes to savings or sinking funds, a quarter to the line under pressure, a quarter to enjoy.' },
        { phrase: 'Bus home GH₵100', note: 'New sinking fund: GH₵150 needed by mid-semester. GH₵100 this month plus beat money covers it.' },
        { phrase: 'Phone and laptop fund GH₵30', note: 'New, after the screen. Small, steady, for the devices he can\'t study without. His laptop is five years old.' },
        { phrase: 'Food out GH₵110', note: 'Resized from GH₵100 a week. Over twice in a row was a pattern: lab-day lunches need more.' },
        { phrase: 'Fun GH₵20', note: 'Shrunk from GH₵30 to make room. Still there; never zero.' },
        { phrase: 'School GH₵60', note: 'Shrunk from GH₵100: the big one-off (the lab manual) is paid. Exam costs have their own plan.' },
        { phrase: 'Haircut and clothes GH₵40', note: 'Shrunk from GH₵100. One haircut, no new clothes this month: a trade he chose for the sinking funds.' },
        { phrase: 'LEFT WITHOUT A JOB: GH₵0', note: '130 + 350 + 130 + 820 + 100 = 1,500. Still zero. Different jobs.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good sheet changes every month. Look at what went over, what was left, and what\'s coming; then move the numbers.',
    },
  ],
  apply: {
    scenario: 'What changed in v4.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'New, bigger or smaller than v3?',
        groups: ['New', 'Bigger', 'Smaller'],
        items: [
          { text: 'Phone and laptop fund', group: 0 },
          { text: 'Food out', group: 1 },
          { text: 'Fun', group: 2 },
          { text: 'Bus home', group: 0 },
          { text: 'Haircut and clothes', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Weekly lines: 60 + 110 + 15 + 20. Per week?',
        answers: ['205', 'GH₵205', '205 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why was food out made bigger?',
        options: [
          { text: 'It went over two months in a row: a pattern, not a slip' },
          { text: 'Kofi got lazy', why: 'Lab-day lunches are real. The plan adjusted to reality.' },
          { text: 'Food prices doubled', why: 'They didn\'t. The original line was too small.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'Why a phone AND laptop fund? Your phone\'s fixed.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'You\'re right, I\'ll delete it.', why: 'Predictable risks are exactly what sinking funds are for.' },
          { text: 'Because I can\'t study without either, and my laptop is five years old. Small and steady now beats a crisis later.' },
          { text: 'For a new phone next month.', why: 'His phone works. This fund is for repairs and replacements when they come.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the change to the lesson that caused it.',
        pairs: [
          ['Bus home fund', 'Sinking funds'],
          ['Phone and laptop fund', 'The cracked screen'],
          ['Beats planned at GH₵0', 'Plan on the lowest month'],
          ['Food out resized', 'Slip or pattern?'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Sinking funds this month: bus home GH₵100 + phone and laptop GH₵30. Total?',
        answers: ['130', 'GH₵130', '130 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which v4 line would make the sheet stop adding up?',
        lines: [
          'Fixed GH₵130. Future me GH₵350.',
          'Sinking funds GH₵130. Weekly GH₵820.',
          'Monthly GH₵100. Fun extra GH₵50.',
        ],
        bug: 2,
        fix: 'Monthly GH₵100. (Fun is already in the weekly lines.)',
        explanation: '130 + 350 + 130 + 820 + 100 = 1,500 already. Another GH₵50 would push it to 1,550.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Updating the sheet.',
        template: 'Look at what went [[1]], what was [[2]], and what\'s [[3]].',
        blanks: [['over'], ['left'], ['coming']],
        distractors: ['wrong', 'lost'],
      },
      {
        kind: 'mcq',
        prompt: 'Savings stayed at GH₵200 even after three shocks. Why does that matter?',
        options: [
          { text: 'It shows shocks are handled by surprises and flexible lines, so savings can grow' },
          { text: 'It doesn\'t; savings should have paid for the trip', why: 'Then savings would never last a month.' },
          { text: 'Because Mum checks it', why: 'She might. The real reason is protecting the future.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the blocks on sheet v4.',
        lines: ['Income', 'Fixed', 'Future me', 'Sinking funds', 'Weekly', 'Monthly', 'Left without a job'],
      },
    ],
  },
  reflect: {
    prompt: 'What predictable cost is coming for you in the next three months? Add it to your sheet as a sinking fund line.',
    starters: ['Coming up:...', 'My sinking fund line:...'],
  },
  deepen: {
    title: 'Name your funds',
    summary: '"Bus home" and "phone and laptop" are better names than "savings 2" and "savings 3". Named pots are easier to protect, a finding you\'ll meet again in the next course of this set (How to Save Money on a Low Income).',
  },
  notes: 'Money sheet v4 (fictional), sums to 1,500: fixed 130; future me 350 (savings 200, surprises 150); sinking 130 (bus 100, phone & laptop 30); weekly 205 × 4 = 820 (staples 60, food out 110, transport 15, fun 20); monthly 100 (school 60, haircut & clothes 40). Laptop five years old: setup for the end of Chapter 5 / Course 2.',
};

export default lesson;
