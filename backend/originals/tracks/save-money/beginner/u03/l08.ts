import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or Fact: "willpower is enough". */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"Willpower is enough"',
  summary: 'Kofi used to think good savers were just stronger people. Three weeks on autopilot have him rethinking. Five myths about willpower and saving, tested.',
  minutes: 10,
  outcomes: [
    'Explain why systems beat willpower',
    'Design your surroundings to make saving easy',
    'Stop blaming yourself for normal slips',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'People who save well just have more willpower.',
          isFact: false,
          explain: 'Myth, mostly. Research on self-control suggests people who seem "disciplined" often face fewer temptations, because they\'ve arranged their lives that way. Systems do the heavy lifting.',
        },
        {
          text: 'Making a good choice easy, and a bad one a bit harder, changes what people do.',
          isFact: true,
          explain: 'Fact. Behavioural scientists call it choice architecture. Kofi\'s jar is one step away from saving and several steps away from spending.',
        },
        {
          text: 'If you slip once, it proves you can\'t save.',
          isFact: false,
          explain: 'Myth. Two missed Sundays led Kofi to a better system. Slips are information.',
        },
        {
          text: 'Tired, hungry or stressed people find temptation harder to resist.',
          isFact: true,
          explain: 'Fact. That\'s why Yaw\'s raids happened after 10 p.m. Rules set in daytime protect night-time you.',
        },
        {
          text: 'Automatic saving only works for people with steady salaries.',
          isFact: false,
          explain: 'Myth. Kofi\'s allowance is monthly and his beat money is irregular. He automates the steady part and has a rule for the irregular part.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Don\'t rely on willpower. Arrange things so the saving choice is the easy one, especially for tired, late-night you.',
    },
  ],
  apply: {
    scenario: 'Willpower vs systems.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Good savers just have more willpower', group: 0 },
          { text: 'Making good choices easy changes behaviour', group: 1 },
          { text: 'One slip proves you can\'t save', group: 0 },
          { text: 'Tiredness makes temptation harder', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is "choice architecture"?',
        options: [
          { text: 'Arranging options so the good choice is the easy one' },
          { text: 'Building design', why: 'In behavioural science it means how choices are set up.' },
          { text: 'Choosing with your friends', why: 'It\'s about how options are presented.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the temptation to the system that beats it.',
        pairs: [
          ['Forgetting to save', 'Automatic payday transfer'],
          ['Late-night raids', '24-hour rule'],
          ['Savings mixed with spending', 'A separate named pot'],
          ['Losing sight of the goal', 'Lock-screen photo'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'You\'re just more disciplined than me, chale.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'I\'m really not. I missed two Sundays. My system just doesn\'t need me to be disciplined.' },
          { text: 'True, I\'m stronger.', why: 'Not true, and it doesn\'t help Yaw.' },
          { text: 'Try harder.', why: 'Effort fades. Systems don\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea.',
        template: 'Arrange things so the [[1]] choice is the [[2]] one.',
        blanks: [['saving', 'good'], ['easy']],
        distractors: ['hard', 'expensive'],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan relies on willpower at the worst moment?',
        lines: [
          'Savings move automatically on the 1st.',
          'Spending apps deleted from savings.',
          'At 11 p.m. I\'ll just say no to myself.',
        ],
        bug: 2,
        fix: 'A rule set in daytime: no savings withdrawals after 9 p.m., 24-hour wait.',
        explanation: '11 p.m. is when willpower is lowest.',
      },
      {
        kind: 'mcq',
        prompt: 'How does Kofi automate saving with irregular beat money?',
        options: [
          { text: 'Automate the steady allowance part; use the split rule when beat money arrives' },
          { text: 'He can\'t', why: 'He automates the steady part.' },
          { text: 'He spends beat money first', why: 'The split rule gives it a job immediately.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s system: how many decisions does he need to make each payday to save the GH₵230? (A number.)',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a willpower-free saving plan.',
        lines: ['Set rules in the daytime', 'Automate the steady part', 'Add friction to withdrawals', 'Keep the goal visible'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the healthiest response to a slip?',
        options: [
          { text: 'Treat it as information and fix the system' },
          { text: 'Decide you\'re just bad at saving', why: 'That turns a slip into quitting.' },
          { text: 'Ignore it', why: 'Then it happens again.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one change to your surroundings (phone, apps, accounts, routine) that would make saving the easy choice?',
    starters: ['One change:...', 'It helps because...'],
  },
  deepen: {
    title: 'Read more: Nudge',
    summary: 'Richard Thaler and Cass Sunstein\'s Nudge (2008) explains choice architecture with examples from pensions to cafeterias. The big idea: small changes in how choices are set up can have large effects on what people do.',
  },
  notes: 'Self-control and fewer temptations: e.g. Hofmann et al. (2012); Galla & Duckworth (2015) on habits; stated qualitatively. Choice architecture: Thaler & Sunstein (2008). Tiredness/hunger and self-control: findings mixed (ego depletion replication debate); stated generally ("find temptation harder").',
};

export default lesson;
