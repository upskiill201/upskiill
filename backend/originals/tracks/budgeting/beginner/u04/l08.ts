import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or Fact: one bad week ruins the budget. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'One bad week ruins it (and other myths)',
  summary: 'Cape Coast, a cracked screen, a surprise lab manual. Kofi\'s month 2 has had three shocks. Is the budget broken? Five myths about bad weeks, tested.',
  minutes: 10,
  outcomes: [
    'Recover from a bad week without quitting',
    'Tell a slip from a pattern',
    'Restart on Monday, not next month',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'One bad week means the whole month\'s budget is ruined.',
          isFact: false,
          explain: 'Myth. A bad week moves some numbers. Rebalance the lines and the rest of the month still works.',
        },
        {
          text: 'People who stick to budgets never overspend.',
          isFact: false,
          explain: 'Myth. They overspend sometimes like everyone. The difference is they notice early and adjust instead of quitting.',
        },
        {
          text: 'It\'s better to restart on Monday than to wait for next month.',
          isFact: true,
          explain: 'Fact. "I\'ll start properly next month" turns one slip into three weeks of no plan. Monday (or tomorrow) is soon enough.',
        },
        {
          text: 'If the same line goes over every month, the line is probably too small.',
          isFact: true,
          explain: 'Fact. Once is a slip. Every month is a pattern: real life needs more there. Resize it and shrink another line.',
        },
        {
          text: 'Hiding a bad week from your sheet makes it easier to get back on track.',
          isFact: false,
          explain: 'Myth. A sheet that doesn\'t match reality stops guiding you. Write the bad week down; it\'s just information.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A slip is one week. A pattern is every month. Slips get rebalanced; patterns get the plan resized. Neither means quitting.',
    },
  ],
  apply: {
    scenario: 'After the bad week.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'One bad week ruins the month', group: 0 },
          { text: 'Restart Monday, not next month', group: 1 },
          { text: 'Good budgeters never overspend', group: 0 },
          { text: 'A line over every month is too small', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Food out went over in month 1 and month 2. What is it?',
        options: [
          { text: 'A slip', why: 'Twice in a row looks like a pattern.' },
          { text: 'A pattern: the line needs resizing' },
          { text: 'Proof budgeting doesn\'t work', why: 'It\'s the budget showing him where real life differs from the plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Three shocks in one month. Maybe I should just start fresh next month.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Good idea, take a break.', why: 'Two weeks without a plan is how day 12 happens again.' },
          { text: 'You handled all three without touching savings. Rebalance tonight and keep going tomorrow.' },
          { text: 'Start a stricter budget.', why: 'Stricter plans break faster. Rebalancing is what works.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the move.',
        pairs: [
          ['A slip', 'Rebalance this week'],
          ['A pattern', 'Resize the line next month'],
          ['Hiding it', 'Makes the sheet useless'],
          ['"Next month"', 'Turns one slip into weeks'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'When to restart.',
        template: 'Restart on [[1]], not next [[2]].',
        blanks: [['Monday', 'tomorrow'], ['month']],
        distractors: ['Friday', 'year'],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought turns a slip into a disaster?',
        lines: [
          'I overspent GH₵40 this week.',
          'I\'ll move it from clothes.',
          'Since I\'ve already blown it, I might as well spend freely till the 1st.',
        ],
        bug: 2,
        fix: 'One slip is fine. Back on the plan tomorrow.',
        explanation: 'This "what-the-hell" thinking is what really ruins budgets, not the GH₵40.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Food out was GH₵40 over in two months. Kofi resizes it from GH₵400 to how much to cover that?',
        answers: ['440', 'GH₵440', '440 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'If food out grows by GH₵40, what else must happen?',
        options: [
          { text: 'Nothing; just spend more', why: 'Then the sheet no longer adds to GH₵1,500.' },
          { text: 'Another line shrinks by GH₵40 so the budget still adds up' },
          { text: 'Savings go to zero', why: 'Take it from a flexible line first, not all of savings.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a bad-week recovery.',
        lines: ['Write the bad week down', 'Ask: slip or pattern?', 'Rebalance or resize', 'Carry on tomorrow'],
      },
      {
        kind: 'mcq',
        prompt: 'What do people who keep budgets for years have in common?',
        options: [
          { text: 'They never have bad weeks', why: 'They have them like everyone.' },
          { text: 'They notice early and adjust instead of quitting' },
          { text: 'They earn a lot', why: 'People keep budgets at every income.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever quit a plan (money, fitness, study) after one bad day? What would "restart tomorrow" have looked like?',
    starters: ['I quit when...', 'Restarting tomorrow would have meant...'],
  },
  deepen: {
    title: 'Progress, not perfection',
    summary: 'Research on habits suggests that missing a day now and then doesn\'t stop a habit forming; what matters is returning to it. Lally and colleagues (2010) found that a single missed day had little effect on how quickly a habit became automatic.',
  },
  notes: 'Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). How are habits formed: Modelling habit formation in the real world. European Journal of Social Psychology, 40(6), 998–1009: missing one opportunity did not materially affect the habit-formation process. Food out resized 400 → 440 (money sheet v4).',
};

export default lesson;
