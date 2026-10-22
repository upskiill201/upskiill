import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Myth or Fact: difficult-negotiation myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Difficult-negotiation myths',
  summary: 'Joel thinks the tougher side always wins. Kavya thinks being calm means being a pushover. Grace has seen 18 years of very difficult conversations in hospital. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Drop common beliefs about tough negotiators',
    'See calm as strength, not weakness',
    'Know that hard negotiators are often under pressure',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The tougher side always wins.',
          isFact: false,
          explain: 'Myth. Toughness can win a single round, but prepared, calm negotiators with good alternatives usually get better deals over time.',
        },
        {
          text: 'People who negotiate hard are often under pressure themselves.',
          isFact: true,
          explain: 'Fact. Mr Pryce has a savings target and a boss. Hard behaviour often comes from targets, deadlines or fear.',
        },
        {
          text: 'Staying calm means you\'re a pushover.',
          isFact: false,
          explain: 'Myth. Calm is what lets you say no clearly. Grace said no to angry relatives many times, calmly.',
        },
        {
          text: 'You can ask for time to think, even in a tough negotiation.',
          isFact: true,
          explain: 'Fact. "Let me think about that and come back to you" is almost always acceptable, and it stops rushed mistakes.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Calm isn\'t weak. Calm is what lets you say no, ask for time, and think while the other side pushes.',
    },
  ],
  apply: {
    scenario: 'Myths about hard negotiations.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'The tougher side always wins', group: 0 },
          { text: 'Hard negotiators are often under pressure', group: 1 },
          { text: 'Calm means pushover', group: 0 },
          { text: 'You can ask for time to think', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might Mr Pryce negotiate so hard?',
        options: [
          { text: 'He has a savings target and a boss to report to' },
          { text: 'He hates small agencies', why: 'That\'s a villain story.' },
          { text: 'No reason', why: 'Targets usually explain it.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'They\'re a huge company. The tougher side wins, and that\'s them.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Yes, give up now.', why: 'Arjun has real value to offer.' },
          { text: 'Then be tougher than them.', why: 'Prepared and calm works better.' },
          { text: 'Size isn\'t everything. They need an app before the spring sale, and you can build it. Preparation beats toughness.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Tougher wins"', 'Prepared and calm win over time'],
          ['"Calm is weak"', 'Calm lets you say no clearly'],
          ['"You must answer now"', 'You can ask for time'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Asking for time.',
        template: '"Let me [[1]] about that and come [[2]] to you."',
        blanks: [['think'], ['back']],
        distractors: ['shout', 'never'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Grace learn from 18 years in hospital?',
        options: [
          { text: 'Always give people what they want', why: 'She said no when she had to.' },
          { text: 'You can say no calmly, even to very upset people' },
          { text: 'Never talk to upset people', why: 'She talked to them every day.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which belief in Joel\'s notes is a myth?',
        lines: [
          'Pryce has targets too.',
          'We can ask for time to think.',
          'If we stay calm, they\'ll walk all over us.',
          'They need the app before spring.',
        ],
        bug: 2,
        fix: 'If we stay calm, we can say no clearly.',
        explanation: 'Calm and firm go together.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many years did Grace work as a nurse?',
        answers: ['18', 'eighteen'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm and firm, or pushover?',
        groups: ['Calm and firm', 'Pushover'],
        items: [
          { text: '"That doesn\'t work for us. Here\'s what could."', group: 0 },
          { text: '"Whatever you think is best."', group: 1 },
          { text: '"Let me come back to you tomorrow."', group: 0 },
          { text: '"OK, we\'ll do it for £28,000."', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a calm, firm answer.',
        lines: ['Acknowledge what they said', 'Say clearly what doesn\'t work', 'Say what could work', 'Suggest a next step'],
      },
    ],
  },
  reflect: {
    prompt: 'Who is the calmest person you know under pressure? What do they do that you could copy?',
    starters: ['They...', 'I could...'],
  },
  deepen: {
    title: 'Calm under pressure',
    summary: 'Hostage negotiators, nurses and pilots are trained to slow down when things heat up: lower voice, slower speech, shorter sentences. It calms them and the people around them.',
  },
  notes: 'Myth/fact framing draws on Ury, Getting Past No, and Getting to Yes. Fictional: Grace, 18 years a ward nurse (CAST.md).',
};

export default lesson;
