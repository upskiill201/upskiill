import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Card deck: the half-the-raise rule. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Half of every raise',
  summary: 'Miracle\'s first payslip at ₦1,250,000 is ten days away. Three cards for splitting a raise so that both future Miracle and present Miracle win.',
  minutes: 10,
  outcomes: [
    'Split a raise between future you and now',
    'Set it up before the payslip lands',
    'Apply the rule to any extra money',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: split it before it lands.</strong> Miracle\'s raise is ₦250,000. She decides now: ₦125,000 to future her, ₦125,000 to life now. The saving part is set up as an automatic transfer on payday, so it never sits in her current account.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: give the "now" half a plan too.</strong> Her ₦125,000 for life now: ₦50,000 for a better flat in Yaba, ₦75,000 for more of what she loves (trips to see her dad, books, dinners with friends). Planned upgrades feel better than creeping ones, because she chose them.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: use it for all extra money.</strong> Bonuses, gifts, side income, a paid-off loan\'s old repayment: the same split works. Half to future you, half to now. It\'s simple enough to do without thinking.</p>',
    },
    {
      kind: 'check',
      question: 'Miracle gets a ₦400,000 bonus. Using her rule, how much goes to future her?',
      options: ['₦400,000', '₦100,000', '₦200,000'],
      answer: 2,
      explanation: 'Half of ₦400,000.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Half of any extra money to future you, automatically, before it lands. Plan the other half on purpose.',
    },
  ],
  apply: {
    scenario: 'Splitting the raise.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'A ₦250,000 raise, split in half. How much goes to life now?',
        answers: ['125000', '125,000', '₦125,000', '₦125000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps.',
        lines: ['Know the size of the raise', 'Decide the split', 'Set up the automatic transfer for payday', 'Plan the "now" half'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the "now" half to its amount.',
        pairs: [
          ['Better flat', '₦50,000'],
          ['Trips, books, dinners', '₦75,000'],
          ['Total for now', '₦125,000'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why set up the saving transfer for payday?',
        options: [
          { text: 'Banks require it', why: 'It\'s a habit trick.' },
          { text: 'So the money never sits in her current account waiting to be spent' },
          { text: 'To earn interest that day', why: 'It\'s about not spending it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the half rule apply?',
        groups: ['Yes', 'No: it\'s not extra money'],
        items: [
          { text: 'A bonus', group: 0 },
          { text: 'Money for this month\'s rent', group: 1 },
          { text: 'Side income', group: 0 },
          { text: 'A paid-off loan\'s old repayment', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Half? That\'s too much. I\'d never enjoy my money.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'You still get half to enjoy, every time. And your old lifestyle doesn\'t shrink at all. Start with a quarter if half feels big.' },
          { text: 'Then save all of it.', why: 'That\'s harder, not easier.' },
          { text: 'Don\'t save then.', why: 'A smaller share beats none.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Half of any [[1]] money to future you, [[2]].',
        blanks: [['extra'], ['automatically']],
        distractors: ['rent', 'someday'],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan breaks the rule?',
        lines: [
          'Bonus ₦400,000: ₦200,000 to saving.',
          'Raise ₦250,000: ₦125,000 to saving.',
          'Side income: spend it all, it\'s "extra".',
        ],
        bug: 2,
        fix: 'Side income: half to saving too.',
        explanation: '"Extra" money is exactly what the rule is for.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Emmanuel starts with a quarter. His raise is ₦80,000. How much does he save?',
        answers: ['20000', '20,000', '₦20,000', '₦20000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why do planned upgrades feel better than creeping ones?',
        options: [
          { text: 'They cost less', why: 'They can cost the same; choice is the difference.' },
          { text: 'You chose them, so they feel like a reward, not a leak' },
          { text: 'They don\'t', why: 'Choosing on purpose feels better.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'If you got extra money next month, what split would you use? What would the "now" part be for?',
    starters: ['My split:...', 'The "now" part would go on...'],
  },
  deepen: {
    title: 'Save more tomorrow',
    summary: 'Economists Richard Thaler and Shlomo Benartzi designed "Save More Tomorrow", where workers commit in advance to saving part of future raises. Because the money never reached their pockets, many stuck with it and their savings rates rose a lot over a few years.',
  },
  notes: 'Raise split: 125,000 saving + 50,000 rent + 75,000 wants. Thaler & Benartzi 2004, Journal of Political Economy (SMarT).',
};

export default lesson;
