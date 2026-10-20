import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Chat with Tey: the riskiest assumption. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The riskiest assumption',
  summary: 'Eleven guesses and one week. Which to test first? Clinton wants to start with the easy ones. Tey explains why you test the one that could kill the idea.',
  minutes: 12,
  outcomes: [
    'Score assumptions by how bad and how unsure',
    'Pick the riskiest assumption to test first',
    'Know why easy tests first is a trap',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Not all guesses matter the same. Ask two questions about each: if this is wrong, how bad is it? And how sure am I really?', replies: ['How bad is "bad"?'] },
        { tey: '"I can deliver in 30 minutes" being wrong means you deliver in 40. Annoying, fixable. "Students will pay for delivery" being wrong means there\'s no business at all.', replies: ['And "how sure"?'] },
        { tey: 'Be honest. Clinton knows he can ride a bike. He has no idea if students will pay 500 FCFA when the food stalls are a five-minute walk from the hostels.', replies: ['So that one goes first?'] },
        { tey: 'Yes: deadly if wrong AND very unsure. That\'s the riskiest assumption. Test it first, because if it\'s wrong, nothing else matters. Testing the easy ones first just feels like progress.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Riskiest = worst if wrong × least sure. Test it first. If it fails, you\'ve saved everything else.',
    },
  ],
  apply: {
    scenario: 'What to test first.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which CampusEats assumption is the riskiest?',
        options: [
          { text: 'Students will pay 500 FCFA for delivery when food is a five-minute walk away' },
          { text: 'Clinton can ride a bike', why: 'He\'s sure, and it\'s fixable if wrong.' },
          { text: 'The group chats exist', why: 'He already knows that.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'How bad if this is wrong?',
        groups: ['Kills the idea', 'Fixable'],
        items: [
          { text: 'Students won\'t pay for delivery', group: 0 },
          { text: 'Delivery takes 40 minutes, not 30', group: 1 },
          { text: 'Nobody struggles to get food', group: 0 },
          { text: 'The logo looks bad', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the assumption to its risk.',
        pairs: [
          ['Students will pay for delivery', 'Deadly and unsure: test first'],
          ['I can ride a bike to Molyko', 'Fixable and sure: test last'],
          ['Restaurants give a discount', 'Hurts, but can work around it'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I\'ll start with the delivery-time test. It\'s easy and I\'ll get a quick win.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'A quick win on something that doesn\'t matter if nobody pays. Test "will they pay" first; it decides everything.' },
          { text: 'Good, easy tests first.', why: 'That feels like progress without testing what matters.' },
          { text: 'Test all eleven at once.', why: 'One at a time, riskiest first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Riskiest = worst if [[1]] × least [[2]].',
        blanks: [['wrong'], ['sure']],
        distractors: ['right', 'fun'],
      },
      {
        kind: 'mcq',
        prompt: 'Clinton scores each assumption 1–5 for "how bad if wrong" and 1–5 for "how unsure". Paying for delivery: 5 and 5. Bike speed: 2 and 1. What are their risk scores (bad × unsure)?',
        options: [
          { text: '25 and 2' },
          { text: '10 and 3', why: 'Multiply, don\'t add: 5 × 5 and 2 × 1.' },
          { text: '5 and 2', why: '5 × 5 is 25.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'An assumption scores 4 for "how bad if wrong" and 3 for "how unsure". What is its risk score?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order these CampusEats assumptions from riskiest to safest.',
        lines: ['Students will pay for delivery (25)', 'Students struggle to get food at night (16)', 'Restaurants will give a discount (9)', 'I can deliver in 30 minutes (2)'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s test plan has the wrong order?',
        lines: [
          'Week 1: test whether students pay for delivery.',
          'Week 2: test whether restaurants give a discount.',
          'Week 0: design the logo and the app colours first.',
          'Week 3: time a few deliveries.',
        ],
        bug: 2,
        fix: 'Drop it until the paying question is answered.',
        explanation: 'The logo is safe and fixable; it shouldn\'t come before the deadly question.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Test first or test later?',
        groups: ['Test first', 'Later'],
        items: [
          { text: 'Will they pay?', group: 0 },
          { text: 'Which colour is the app?', group: 1 },
          { text: 'Do they have the problem at all?', group: 0 },
          { text: 'What should the delivery bags look like?', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Score your five assumptions: how bad if wrong (1–5) × how unsure (1–5). Which is your riskiest?',
    starters: ['My scores are...', 'My riskiest is...'],
  },
  deepen: {
    title: 'Leap-of-faith assumptions',
    summary: 'Eric Ries calls the guesses an idea can\'t survive without its "leap-of-faith assumptions". Usually there are two: people want it (value) and you can reach enough of them (growth).',
  },
  notes: 'Risk scoring (impact × uncertainty) is a common prioritisation heuristic. Leap-of-faith assumptions: Eric Ries, The Lean Startup (2011). Scores in the lesson are Clinton\'s own estimates (fictional).',
};

export default lesson;
