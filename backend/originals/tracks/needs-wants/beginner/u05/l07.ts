import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Myth or Fact: keeping it going. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '"Once you know, you\'re done"',
  summary: 'Ada knows needs from wants now. Is that it, forever? Not quite. Five beliefs about keeping good spending choices going for years, tested.',
  minutes: 10,
  outcomes: [
    'Know that good spending choices need light upkeep',
    'Plan for the next raise before it comes',
    'Keep your line current as life changes',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Once you understand needs and wants, you\'ll never overspend again.',
          isFact: false,
          explain: 'Myth. Knowing helps a lot, but creep is quiet. A monthly look at your line catches it early.',
        },
        {
          text: 'The next raise is the next big risk for lifestyle creep.',
          isFact: true,
          explain: 'Fact. Decide now: when income rises, half of the increase goes to goals before the first payday.',
        },
        {
          text: 'Good choices stay hard forever.',
          isFact: false,
          explain: 'Myth. The bus, the cook-up and the art class are now just Ada\'s normal. The treadmill works for good habits too.',
        },
        {
          text: 'Your need–want line should change as your life changes.',
          isFact: true,
          explain: 'Fact. A child, a new city, a car later: each changes what\'s a must-have. Redraw the line after big changes.',
        },
        {
          text: 'You have to track every naira forever to stay on track.',
          isFact: false,
          explain: 'Myth. Once the plan is set up, a 15-minute monthly check of the line is usually enough.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Normal',
      beats: [
        { speaker: 'narrator', text: 'Ngozi, over breakfast: "You took the bus in the rain this morning and didn\'t even complain."' },
        { speaker: 'ada', text: 'I didn\'t notice. It\'s just how I get to work now.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A 15-minute monthly line check, a rule for the next raise, and a redraw after big life changes. That\'s all the upkeep it takes.',
    },
  ],
  apply: {
    scenario: 'Keeping it going.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'You\'ll never overspend again once you know', group: 0 },
          { text: 'The next raise is a creep risk', group: 1 },
          { text: 'Good choices stay hard forever', group: 0 },
          { text: 'Your line should change with your life', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s Ada\'s rule for the next raise?',
        options: [
          { text: 'Spend it all, she deserves it', why: 'That\'s how the last raise vanished.' },
          { text: 'Half of the increase to goals, before the first payday' },
          { text: 'Refuse raises', why: 'Raises are great with a plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Next raise: ₦480,000 → ₦560,000. Half the increase to goals is how much?',
        answers: ['40000', '40,000', '₦40,000', '₦40000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Do I have to check my spending every day forever?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Yes, every naira, every day.', why: 'Too much; it would burn out.' },
          { text: 'Never check again.', why: 'Creep is quiet. A monthly look catches it.' },
          { text: 'No. Fifteen minutes a month on your line, plus a redraw after big changes. The habits do the rest.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The upkeep.',
        template: 'A [[1]]-minute monthly line check, a rule for the next [[2]], and a redraw after big [[3]].',
        blanks: [['15', 'fifteen'], ['raise'], ['changes']],
        distractors: ['5', 'loan'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each life change to how the line might shift.',
        pairs: [
          ['Moving to a new city', 'Transport and rent change'],
          ['A child', 'New must-haves'],
          ['Buying a car later', 'Running costs become must-haves'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which habit will let creep back in slowly?',
        lines: [
          'Monthly 15-minute line check.',
          'Half of every raise to goals.',
          'Stop checking once things feel fine.',
        ],
        bug: 2,
        fix: 'Keep the monthly check, especially when things feel fine.',
        explanation: 'Creep starts in good months, quietly.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the bus stop feeling hard for Ada?',
        options: [
          { text: 'It became her new normal: adaptation works for good habits too' },
          { text: 'The buses improved', why: 'Same buses.' },
          { text: 'She stopped going to work', why: 'She still goes.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s monthly line check.',
        lines: ['Open last month\'s spending', 'Compare with the line', 'Spot any creep', 'Adjust next month', 'Check goals are on track'],
      },
      {
        kind: 'mcq',
        prompt: 'When should Ada redraw her line completely?',
        options: [
          { text: 'Every day', why: 'Too often.' },
          { text: 'Never', why: 'Life changes; the line should too.' },
          { text: 'After big life changes' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'When will you do your monthly line check? What\'s your rule for the next raise?',
    starters: ['My check:...', 'My raise rule:...'],
  },
  deepen: {
    title: 'Save More Tomorrow',
    summary: 'In a famous programme, employees agreed in advance to save more when their pay went up. Savings rates rose steadily and few people dropped out, because the increase came from future raises, not current pay (Thaler and Benartzi, 2004).',
  },
  notes: 'Thaler & Benartzi (2004), JPE. Next raise example fictional (560,000; increase 80,000; half 40,000).',
};

export default lesson;
