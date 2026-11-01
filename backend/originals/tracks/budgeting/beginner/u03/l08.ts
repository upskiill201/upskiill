import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or Fact: fun money is allowed. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Fun money is allowed',
  summary: 'Kofi feels guilty about the GH₵30 fun line. Shouldn\'t a broke student save every cedi? Five myths about fun, guilt and budgets, tested.',
  minutes: 10,
  outcomes: [
    'Explain why planned fun makes budgets last',
    'Spend fun money without guilt',
    'Keep fun inside its line',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A serious budget has no money for fun.',
          isFact: false,
          explain: 'Myth. Budgets with zero fun are the ones people abandon. A small, fixed fun line protects the rest of the plan.',
        },
        {
          text: 'Spending your fun money on fun means the budget is working.',
          isFact: true,
          explain: 'Fact. The fun line has a job: fun. Spending it as planned is success, not failure.',
        },
        {
          text: 'If you have fun money left at the end of the week, you should spend it before Sunday.',
          isFact: false,
          explain: 'Myth. Leftover fun money can roll over to next week, or go to savings. Nothing has to be spent "because it\'s there".',
        },
        {
          text: 'Guilt about spending makes people better with money.',
          isFact: false,
          explain: 'Myth. Guilt tends to lead to hiding and avoiding, not planning. Clear rules beat guilty feelings.',
        },
        {
          text: 'Planned treats feel better than unplanned ones.',
          isFact: true,
          explain: 'Fact, for most people. A treat you planned and can afford comes with no "should I have?" afterwards.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Friday',
      beats: [
        { speaker: 'kofi', text: 'GH₵12 on kelewele. Should I feel bad?' },
        { speaker: 'efua', text: 'Is it in the plan?' },
        { speaker: 'kofi', text: 'GH₵30 fun line. Yes.' },
        { speaker: 'efua', text: 'Then the only bad thing would be not enjoying it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Fun inside the line is the plan working. Fun outside the line is the problem. Guilt helps with neither.',
    },
  ],
  apply: {
    scenario: 'Fun, without guilt.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Serious budgets have no fun', group: 0 },
          { text: 'Spending fun money on fun is success', group: 1 },
          { text: 'Leftover fun money must be spent', group: 0 },
          { text: 'Guilt makes people better with money', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi spends GH₵12 of his GH₵30 fun line on Friday. Is his budget working?',
        options: [
          { text: 'No, he should have saved it', why: 'It was planned for fun. That\'s its job.' },
          { text: 'Yes, he spent planned fun money on fun' },
          { text: 'Only if he feels guilty', why: 'Guilt isn\'t part of the plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Fun line GH₵30, spent GH₵12. How much is left?',
        answers: ['18', 'GH₵18', '18 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I have GH₵18 of fun money left on Saturday. Should I spend it before Sunday?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Yes, use it or lose it!', why: 'It isn\'t lost. It can roll over or go to savings.' },
          { text: 'Only if there\'s something you really want. Otherwise roll it over or save it.' },
          { text: 'Never spend fun money.', why: 'Then why have a fun line?' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the right reaction.',
        pairs: [
          ['Fun inside the line', 'Enjoy it'],
          ['Fun over the line', 'Adjust next week'],
          ['Fun money left over', 'Roll over or save'],
          ['Feeling guilty', 'Check the plan instead'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Efua\'s question.',
        template: 'Is it in the [[1]]? Then [[2]] it.',
        blanks: [['plan'], ['enjoy']],
        distractors: ['bank', 'hide'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Yaw\'s thinking is the problem?',
        lines: [
          'My fun line is GH₵150 this month.',
          'I\'ve spent GH₵90 so far.',
          'I went over on food, so I\'ll take it from fun without telling myself.',
        ],
        bug: 2,
        fix: 'I\'ll move GH₵20 from fun to food, on purpose, and write it down.',
        explanation: 'Moving money between lines is fine. Doing it secretly is how plans dissolve.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do zero-fun budgets fail so often?',
        options: [
          { text: 'People feel deprived, then break the plan completely' },
          { text: 'Fun is a need', why: 'It\'s a want, but a want people won\'t give up for long.' },
          { text: 'Banks don\'t allow them', why: 'Banks have nothing to do with it.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a guilt-free treat.',
        lines: ['Check it\'s in the fun line', 'Buy it', 'Enjoy it', 'Note what\'s left'],
      },
      {
        kind: 'mcq',
        prompt: 'What does guilt about spending usually lead to?',
        options: [
          { text: 'Better planning', why: 'Usually the opposite.' },
          { text: 'Saving more', why: 'Guilt rarely turns into a savings habit.' },
          { text: 'Hiding and avoiding the numbers' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one treat you\'d happily plan for every week? How much would your fun line need to be?',
    starters: ['My weekly treat would be...', 'My fun line would be...'],
  },
  deepen: {
    title: 'Fun money in couples and families',
    summary: 'Many couples and families give each person a small amount of "no questions asked" money each month. It reduces arguments about small spending and keeps the shared budget calm. The same idea works for one person: fun money is yours, no explanations needed.',
  },
  notes: 'Myth statements kept qualitative and framed around common budgeting practice; no specific study cited for "planned treats feel better" (stated as "for most people").',
};

export default lesson;
