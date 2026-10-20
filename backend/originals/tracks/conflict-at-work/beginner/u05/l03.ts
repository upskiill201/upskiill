import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Step-by-step: saying no kindly at work. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Saying no kindly',
  summary: 'Grace goes back to Priya about the survey. Five steps for saying no, or "not like this", to a manager, without seeming unhelpful.',
  minutes: 12,
  outcomes: [
    'Say no to extra work without seeming unhelpful',
    'Let your manager choose priorities',
    'Offer a realistic alternative',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to a kind no at work',
      steps: [
        { title: '1. Show you want to help', body: '"I\'d like to help the clinics team. The survey sounds useful."' },
        { title: '2. Be honest about capacity', body: '"This week I\'m on the pilot test, step 3 reviews and launch support. I\'m already working late."' },
        { title: '3. Ask which matters most', body: '"Which should move to make room: the survey or one of those?"' },
        { title: '4. Offer an alternative', body: '"I could run it the week after launch, or give their team my survey template now so they can start."' },
        { title: '5. Confirm the decision', body: '"Great: template today, survey from the 24th. I\'ll let the clinics team know."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Want to help, be honest about capacity, ask what matters most, offer an alternative, confirm.',
    },
  ],
  apply: {
    scenario: 'Back to Priya.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Show you want to help', 'Be honest about capacity', 'Ask which matters most', 'Offer an alternative', 'Confirm the decision'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask the manager which task should move?',
        options: [
          { text: 'Priorities are the manager\'s call; asking makes it a shared decision' },
          { text: 'To avoid work', why: 'It\'s about choosing what matters most.' },
          { text: 'To test the manager', why: 'It\'s an honest question.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Grace\'s line.',
        pairs: [
          ['Want to help', '"The survey sounds useful."'],
          ['Capacity', '"I\'m already working late."'],
          ['Ask what matters', '"Which should move?"'],
          ['Alternative', '"My template now, survey after launch."'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A kind no, or a harsh one?',
        groups: ['Kind', 'Harsh'],
        items: [
          { text: '"Which should move to make room?"', group: 0 },
          { text: '"Not my job."', group: 1 },
          { text: '"I could do it the week after launch."', group: 0 },
          { text: '"Ask someone else."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'Oh! I didn\'t realise you had all that. Can the survey wait?',
        prompt: "Grace's best reply?",
        options: [
          { text: '"Yes, if that works for the clinics team. I can send them my template today so they can prepare."' },
          { text: '"It should never have been asked."', why: 'Priya is being helpful.' },
          { text: '"No, I\'ll do it all."', why: 'Back to overload.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The key question.',
        template: '"Which should [[1]] to make [[2]]?"',
        blanks: [['move'], ['room']],
        distractors: ['stay', 'money'],
      },
      {
        kind: 'mcq',
        prompt: 'Why might Priya not know Grace is overloaded?',
        options: [
          { text: 'Grace kept saying yes and working late without telling anyone' },
          { text: 'Priya doesn\'t care', why: 'She reacted with concern.' },
          { text: 'Grace wasn\'t overloaded', why: 'She was working until 10 p.m.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s reply undoes the boundary?',
        lines: [
          'I\'d like to help the clinics team.',
          'This week I\'m on the pilot and launch.',
          'But don\'t worry, I\'ll find the time somehow.',
          'Which should move to make room?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: '"I\'ll find the time" means evenings again.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'From which date will Grace run the survey, after launch? (day of the month)',
        answers: ['24', '24th', 'the 24th'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest capacity, or hiding it?',
        groups: ['Honest', 'Hiding'],
        items: [
          { text: '"I\'m already working late."', group: 0 },
          { text: '"Sure, easy!"', group: 1 },
          { text: '"This week I\'m on three things."', group: 0 },
          { text: 'Doing it at 11 p.m. secretly', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write a kind no to an extra request you\'re facing, using the five steps.',
    starters: ['I\'d like to help...', 'Which should move...'],
  },
  deepen: {
    title: 'Managers want to know',
    summary: 'Most managers would rather hear "I\'m at capacity" than find out a week later that work slipped or someone burned out. Honest capacity is a professional skill.',
  },
  notes: 'Fictional exchange. Kind-no structure parallels Ury\'s positive no (Yes! No. Yes?).',
};

export default lesson;
