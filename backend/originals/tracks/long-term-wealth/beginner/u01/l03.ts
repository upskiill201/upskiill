import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Myth or Fact: wealth myths. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Who gets wealthy? (Myths)',
  summary: 'Miracle\'s team has opinions: "Wealth is for people with rich parents." "You need a big salary." "Start when you\'re 40." Five beliefs about who builds wealth, tested.',
  minutes: 10,
  outcomes: [
    'Bust common myths about building wealth',
    'See what actually drives long-term wealth',
    'Know why starting early matters',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'You need a high salary to build wealth.',
          isFact: false,
          explain: 'Myth. A high salary helps, but the habits matter more: spending less than you earn, starting early, and letting it grow for years.',
        },
        {
          text: 'Starting to save in your twenties can matter more than how much you save later.',
          isFact: true,
          explain: 'Fact. Because of compounding, money saved early has many more years to grow. Lesson 6 shows the numbers.',
        },
        {
          text: 'Wealth mostly comes from one lucky break.',
          isFact: false,
          explain: 'Myth. Lucky breaks are rare and unpredictable. Most lasting wealth is built slowly by ordinary habits.',
        },
        {
          text: 'Expensive debt can cancel out the benefit of saving.',
          isFact: true,
          explain: 'Fact. Saving at a low rate while paying a high rate on a loan means you\'re going backwards. Chapter 3 explains.',
        },
        {
          text: 'It\'s too late to start after 40.',
          isFact: false,
          explain: 'Myth. Earlier is easier, but later is far better than never. Miracle\'s dad, at 59, still has choices. Chapter 5 is partly about his plan.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'The team lunch',
      beats: [
        { speaker: 'emmanuel', text: 'Wealth is for people with rich parents. The rest of us just survive.' },
        { speaker: 'folake', text: 'My father was a bus driver. I started saving 20% at 23. It\'s mostly patience, Emmanuel. Pass the chin chin.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Wealth comes mostly from habits and time, not from luck or a huge salary. Start early if you can; start now if you can\'t.',
    },
  ],
  apply: {
    scenario: 'Who gets wealthy?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'You need a high salary', group: 0 },
          { text: 'Starting early matters a lot', group: 1 },
          { text: 'It\'s too late after 40', group: 0 },
          { text: 'Expensive debt can cancel out saving', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Folake say built her wealth?',
        options: [
          { text: 'Rich parents', why: 'Her father was a bus driver.' },
          { text: 'Saving 20% from 23, and patience' },
          { text: 'A lucky investment', why: 'She said patience.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'I\'m 27. Isn\'t it too late for me?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, too late.', why: 'At 27, there are decades ahead.' },
          { text: 'Wait until you\'re 40.', why: 'Waiting costs years of growth.' },
          { text: 'You have over 30 working years ahead. That\'s a lot of time for money to grow. Start this month.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'What builds wealth.',
        template: 'Mostly [[1]] and [[2]], not luck.',
        blanks: [['habits'], ['time', 'patience']],
        distractors: ['salary', 'luck'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Need a big salary"', 'Habits matter more'],
          ['"One lucky break"', 'Built slowly, over years'],
          ['"Too late after 40"', 'Later beats never'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is the myth talking?',
        lines: [
          'I can save something every month.',
          'Starting at 25 gives me decades.',
          'I\'ll wait until I earn more; my salary is too small now.',
        ],
        bug: 2,
        fix: 'I\'ll start with what I can now and raise it as I earn more.',
        explanation: 'Waiting for a bigger salary costs the years that matter most.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Folake started at 23 and is now 45. How many years has she been saving?',
        answers: ['22', 'twenty-two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why can expensive debt cancel out saving?',
        options: [
          { text: 'Debt is illegal', why: 'It\'s legal; it\'s the cost.' },
          { text: 'You pay more in interest on the debt than you earn on the savings' },
          { text: 'It can\'t', why: 'High-interest debt grows faster than most savings.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how most lasting wealth is built.',
        lines: ['Spend less than you earn', 'Avoid expensive debt', 'Save and invest regularly', 'Give it many years'],
      },
      {
        kind: 'mcq',
        prompt: 'Miracle\'s dad is 59. Does he still have choices?',
        options: [
          { text: 'No, it\'s over', why: 'He still has options.' },
          { text: 'Only if he wins the lottery', why: 'Real choices exist.' },
          { text: 'Yes: later is far better than never' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which myth about wealth have you believed? How has it affected what you do?',
    starters: ['I believed...', 'It meant I...'],
  },
  deepen: {
    title: 'Habits beat headlines',
    summary: 'Stories about overnight millionaires get attention because they\'re rare. The common story, saving a part of every pay cheque for decades, is too boring to make headlines, and it\'s how most people who build wealth actually do it.',
  },
  notes: 'Emmanuel and Folake per CAST (Motivate a Team / ML; Emmanuel always eating chin chin). Folake\'s backstory (father a bus driver, saving 20% from 23) is new detail.',
};

export default lesson;
