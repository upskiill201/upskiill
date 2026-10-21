import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Before/After: overspent a line? Move money, don't quit. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Overspent? Move it, don\'t quit',
  summary: 'Week 3, Wednesday. Food out is already GH₵40 over. Month 1 Kofi would have said "the budget\'s ruined" and stopped tracking. Month 2 Kofi does something better.',
  minutes: 11,
  outcomes: [
    'Rebalance a budget after overspending one line',
    'Choose which line to take from',
    'Keep tracking after a bad week',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to handle GH₵40 over',
      before: {
        label: 'Month 1 Kofi',
        text: '"Food out is GH₵40 over. The budget\'s ruined."\nStops checking the sheet.\nSpends freely "until next month, when I\'ll start properly".\nDay 28: out of money again.',
      },
      after: {
        label: 'Month 2 Kofi',
        text: '"Food out is GH₵40 over. Where can GH₵40 come from?"\nFun this week: GH₵0 (already moved to Cape Coast).\nHaircut and clothes: GH₵70 left. Moves GH₵40 from there.\nWrites it down. Adds a note: "lab days need more lunch money."\nNext month: food out GH₵440, clothes GH₵60.',
      },
      notes: [
        'Going over one line isn\'t failure. It\'s information: the line was too small for real life.',
        'Move money from a flexible line, not from savings, surprises or level 1 needs.',
        'Write the move down, so the sheet still matches reality.',
        'Fix the plan next month: a line that keeps going over needs to be bigger, with another line smaller.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Overspent a line? Ask "where can this come from?", move it on purpose, write it down, and adjust next month\'s plan.',
    },
  ],
  apply: {
    scenario: 'GH₵40 over on food out.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Month 1 Kofi do wrong?',
        options: [
          { text: 'He overspent on food', why: 'Everyone overspends a line sometimes. The mistake was quitting.' },
          { text: 'He treated one overspent line as the end of the whole budget' },
          { text: 'He moved money between lines', why: 'He didn\'t. That would have been the right move.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good line to move GH₵40 from, or not?',
        groups: ['Good to move from', 'Don\'t touch'],
        items: [
          { text: 'Haircut and clothes', group: 0 },
          { text: 'Savings', group: 1 },
          { text: 'Food staples', group: 1 },
          { text: 'Fun (if any is left)', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Clothes line: GH₵70. Kofi moves GH₵40 to food out. How much is left in clothes?',
        answers: ['30', 'GH₵30', '30 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the rebalance.',
        lines: ['Notice the overspend', 'Ask where it can come from', 'Move it from a flexible line', 'Write it down', 'Adjust next month\'s plan'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'You went over? So budgets don\'t work. Told you.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'You\'re right, I\'m done.', why: 'One overspent line is information, not proof.' },
          { text: 'I moved GH₵40 from clothes and wrote it down. Still on track. That\'s the budget working.' },
          { text: 'I didn\'t go over.', why: 'Hiding it would break the sheet. Honesty keeps it useful.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question.',
        template: 'Not "the budget\'s [[1]]", but "where can this [[2]] from?"',
        blanks: [['ruined'], ['come']],
        distractors: ['perfect', 'go'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step would quietly break the budget?',
        lines: [
          'Food out is GH₵40 over.',
          'Take GH₵40 from clothes.',
          'Leave the sheet as it was; it\'s only GH₵40.',
          'Make food out bigger next month.',
        ],
        bug: 2,
        fix: 'Update the sheet: clothes down GH₵40, food out up GH₵40.',
        explanation: 'A sheet that doesn\'t match reality stops being useful very quickly.',
      },
      {
        kind: 'mcq',
        prompt: 'Food out has gone over two months in a row. What should Kofi do?',
        options: [
          { text: 'Try harder next month', why: 'Two months of evidence says the line is too small for real life.' },
          { text: 'Stop budgeting food', why: 'Then it grows unchecked.' },
          { text: 'Make food out bigger and another flexible line smaller' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the move.',
        pairs: [
          ['One line over once', 'Move money, write it down'],
          ['Same line over every month', 'Resize it in next month\'s plan'],
          ['Line under budget', 'Roll over or save the extra'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does an overspent line tell you?',
        options: [
          { text: 'That you\'re bad with money', why: 'It tells you about the plan, not your character.' },
          { text: 'That the line was smaller than real life needed' },
          { text: 'Nothing useful', why: 'It\'s some of the most useful information a budget gives.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which of your spending lines would most likely go over? Which line would you move money from?',
    starters: ['Most likely to go over:...', 'I\'d move from...'],
  },
  deepen: {
    title: 'Budgets are drafts',
    summary: 'Most people need three months before a budget fits their life. Month 1 is a guess, month 2 is better, month 3 is close. Every overspend is a correction, not a failure. Chapter 5 is about exactly this.',
  },
  notes: 'Fictional: food out over by 40 in week 3; clothes line 70 (after Cape Coast move) → 30. Next-month plan: food out 440, clothes 60 (money sheet v4).',
};

export default lesson;
