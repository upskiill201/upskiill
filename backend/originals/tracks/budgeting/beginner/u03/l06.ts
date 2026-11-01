import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Before/After: a budget that's too tight vs one that works. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Too tight vs just right',
  summary: 'Yaw catches the budgeting bug and writes his own plan. It\'s heroic, strict, and doomed. Side by side with a plan that works, see exactly why.',
  minutes: 11,
  outcomes: [
    'Spot the signs of a budget that will break',
    'Fix a too-tight budget without giving up its goal',
    'Use your real spending to set believable numbers',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Yaw\'s plan, before and after Efua',
      before: {
        label: 'Yaw\'s first plan (GH₵1,800 a month)',
        text: 'Food: GH₵200 (last month: GH₵950)\nFun: GH₵0\nClothes and sneakers: GH₵0 (last month: GH₵400)\nSurprises: nothing planned\nSavings: GH₵1,300\n"Starting Monday I\'m a new man."',
      },
      after: {
        label: 'Yaw\'s plan after Efua',
        text: 'Food: GH₵700 (cut from GH₵950, with shared cooking)\nFun: GH₵150\nClothes: GH₵150 (cut from GH₵400)\nSurprises: GH₵150\nApp repayments: GH₵250\nSavings: GH₵400\n"Starting Monday, a slightly better man."',
      },
      notes: [
        'The first plan cuts food by almost 80% overnight. Nobody changes that fast; the plan breaks in days.',
        'Zero fun and zero clothes for someone who loves both means a binge by week two.',
        'No surprises line means the first surprise wrecks the month.',
        'The second plan still cuts GH₵250 from food and GH₵250 from clothes. Big change, but believable.',
        'It also names a line Yaw kept quiet about: app repayments. A budget only works if everything\'s in it.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Start from what you really spent last month, then cut by an amount you\'d bet on. A smaller cut you keep beats a huge one you drop.',
    },
  ],
  apply: {
    scenario: 'Fixing Yaw\'s plan.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Sign of a plan that will break, or of one that works?',
        groups: ['Will break', 'Works'],
        items: [
          { text: 'Food cut by 80% overnight', group: 0 },
          { text: 'A surprises line', group: 1 },
          { text: 'Zero fun', group: 0 },
          { text: 'Numbers based on last month\'s real spending', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Yaw\'s food last month: GH₵950. New plan: GH₵700. How much is he cutting?',
        answers: ['250', 'GH₵250', '250 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is GH₵200 for food a bad target for Yaw?',
        options: [
          { text: 'He spent GH₵950 last month; dropping that far overnight isn\'t believable' },
          { text: 'Food should never be cut', why: 'Food out can be cut. Just not by 80% in a day.' },
          { text: 'GH₵200 is too much', why: 'The opposite: it\'s far too little for his real habits.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'GH₵1,300 savings! Starting Monday I\'m a new man.',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'You\'ll never save anything, Yaw.', why: 'Discouraging, and not true. He can, with a believable plan.' },
          { text: 'Love the energy. Now let\'s make it a plan you\'ll still be following in week 3.' },
          { text: 'Amazing, do it!', why: 'Cheering on a plan that will break sets him up to quit.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'What\'s missing from Yaw\'s first plan that his second one has?',
        lines: [
          'Food: GH₵200.',
          'Fun: GH₵0.',
          'Savings: GH₵1,300.',
          'Everything I owe: not mentioned.',
        ],
        bug: 3,
        fix: 'App repayments: GH₵250.',
        explanation: 'Debts left out of a budget don\'t disappear. They arrive as surprises.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Food cut by 80%', 'Cut by an amount you\'d bet on'],
          ['Zero fun', 'A small, fixed fun line'],
          ['No surprises line', 'Add GH₵150 for surprises'],
          ['Hidden debts', 'Put repayments in the plan'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'A smaller cut you [[1]] beats a huge one you [[2]].',
        blanks: [['keep'], ['drop']],
        distractors: ['spend', 'borrow'],
      },
      {
        kind: 'mcq',
        prompt: 'Yaw\'s second plan saves GH₵400, not GH₵1,300. Which is better?',
        options: [
          { text: 'GH₵1,300, because it\'s bigger', why: 'Only on paper. If it breaks in a week, he saves nothing.' },
          { text: 'GH₵400, because he\'ll actually save it' },
          { text: 'Neither: he shouldn\'t save', why: 'Saving something is the point.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the fix for a too-tight plan.',
        lines: ['Look at last month\'s real spending', 'Cut each line by a believable amount', 'Add fun and surprises lines', 'Put every debt in', 'Check it adds up'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Yaw\'s clothes: GH₵400 last month, GH₵150 in the new plan. How much does he cut?',
        answers: ['250', 'GH₵250', '250 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Pick one line from your own spending. What did you really spend last month, and what cut would you actually bet on?',
    starters: ['Last month I spent...', 'A cut I\'d bet on is...'],
  },
  deepen: {
    title: 'The "what-the-hell" effect',
    summary: 'Psychologists describe a pattern where breaking a strict rule once makes people abandon it completely: "I\'ve blown it, so what the hell." Strict budgets trigger it. Believable ones, with room built in, don\'t.',
  },
  notes: 'Yaw\'s numbers fictional: income 1,800 (allowance + family in Takoradi). Plan 2 sums: 700 + 150 + 150 + 150 + 250 + 400 = 1,800 (other lines like data folded in elsewhere; lesson shows the main lines). First mention of Yaw\'s "app repayments" — seed for Course 3 Ch4 (GH₵2,900 pay-later debt). "What-the-hell effect": Polivy & Herman (1985) on dieting; Cochran & Tesser (1996) term; stated generally.',
};

export default lesson;
