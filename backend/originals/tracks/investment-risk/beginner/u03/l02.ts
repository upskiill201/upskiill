import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Step-by-step: matching money to goals. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Goal, date, amount, risk',
  summary: 'Arjun turns his life into a spec, the way he\'d scope a project. Four fields for every goal. Step by step, here\'s how he fills them in.',
  minutes: 11,
  outcomes: [
    'Turn a vague goal into a dated amount',
    'Choose a risk level from the date',
    'Build a simple goals table',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Four fields for every goal',
      steps: [
        { title: '1. Name the goal', body: '"Appa\'s operation." "Emergency fund." "A home deposit." "Retirement." Specific beats vague: not "the future" but "a flat in Bengaluru".' },
        { title: '2. Give it a date', body: 'Two months. Any time. About five years. Around age 60. The date matters more than anything else in choosing risk.' },
        { title: '3. Put a number on it', body: '₹2.5 lakh. Six months of costs (₹3.6 lakh). A ₹3 lakh deposit to start. For far-off goals, a rough number is fine; he\'ll refine it.' },
        { title: '4. Choose the risk from the date', body: 'Under about 3 years: keep it safe. About 3 to 7 years: some steadier growth, mostly protected. Over about 7 to 10 years: can take more ups and downs. (Rough guides, not rules.)' },
        { title: '5. Check it each year', body: 'As a date gets closer, the pot should usually get safer. A home deposit in five years is a different pot in year four.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Goal, date, amount, risk. The date decides the risk: soon means safe, far means it can carry more ups and downs.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s goals table.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the four fields.',
        lines: ['Name the goal', 'Give it a date', 'Put a number on it', 'Choose the risk from the date'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each date to a rough risk level.',
        pairs: [
          ['Under about 3 years', 'Keep it safe'],
          ['About 3 to 7 years', 'Mostly protected, some growth'],
          ['Over about 7 to 10 years', 'Can take more ups and downs'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Six months of Arjun\'s costs at ₹60,000 a month. How much?',
        answers: ['360000', '3,60,000', '360,000', '₹3,60,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which field matters most for choosing risk?',
        options: [
          { text: 'The goal\'s name', why: 'The date decides how much risk fits.' },
          { text: 'The date' },
          { text: 'Who suggested it', why: 'The date.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific goal, or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: '₹3 lakh home deposit in five years', group: 0 },
          { text: '"The future"', group: 1 },
          { text: 'Six months of costs, kept reachable', group: 0 },
          { text: '"Being rich someday"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'I don\'t know exactly what retirement will cost.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Nobody does. Put a rough number and a rough date, then refine it each year. A rough plan beats no plan.' },
          { text: 'Then skip that goal.', why: 'Far goals still need a pot.' },
          { text: 'Guess a huge number and panic.', why: 'Rough and calm is better.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'The [[1]] decides the risk: soon means [[2]].',
        blanks: [['date'], ['safe']],
        distractors: ['amount', 'bold'],
      },
      {
        kind: 'findBug',
        prompt: 'Which row in the table has the wrong risk?',
        lines: [
          'Appa\'s operation, 2 months: keep safe.',
          'Retirement, 30 years: can take more ups and downs.',
          'Home deposit, 1 year away now: high ups and downs.',
        ],
        bug: 2,
        fix: 'Home deposit, 1 year away: keep safe.',
        explanation: 'With a year left, there\'s no time to recover from a fall.',
      },
      {
        kind: 'mcq',
        prompt: 'What should usually happen to a pot as its date gets closer?',
        options: [
          { text: 'It should get riskier to catch up', why: 'Less time means less room for falls.' },
          { text: 'It should get safer' },
          { text: 'Nothing', why: 'Risk should shrink as the date nears.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Are the year ranges (3, 7, 10) strict rules?',
        options: [
          { text: 'Yes, legally', why: 'They\'re guides.' },
          { text: 'Yes, from SEBI', why: 'They\'re general guides.' },
          { text: 'No: rough guides to think with' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Fill in one row of your own: goal, date, amount, risk.',
    starters: ['Goal:... Date:... Amount:... Risk:...'],
  },
  deepen: {
    title: 'SMART goals',
    summary: 'A common planning tool says goals should be Specific, Measurable, Achievable, Relevant and Time-bound. Arjun\'s four fields cover most of that for money.',
  },
  notes: 'Horizon ranges are common rules of thumb, explicitly hedged. 6 × 60,000 = 3,60,000.',
};

export default lesson;
