import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final challenge: go? */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: Go?',
  summary: 'Decision day. Clinton, David and Miracle go through everything on one video call. Make the call with them, from the evidence. Everything from the course, together.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Make a go / change / stop decision from evidence', 'Use everything from the course together'],
  learn: [
    {
      kind: 'story',
      title: 'Decision day',
      beats: [
        { speaker: 'miracle', text: 'Five weeks ago you had forty fire emojis and a food app. What do you have now?' },
        { speaker: 'clinton', text: 'Fifty-four paid bags. Thirty customers, ten regulars. Two-thirds of the first twelve came back. 45% would be very disappointed without it. And one honest problem: I keep 500 francs a bag.' },
        { speaker: 'david', text: 'And Mama Rose stops at 25 bags. I\'ve written down every franc in and out, by the way. We should talk about that.' },
        { speaker: 'miracle', text: 'Then the decision is yours. Go, change, or stop?' },
        { speaker: 'narrator', text: 'Clinton looks at his board, then at the 350,000 FCFA app quote he never paid. "Go. With a second washer and a better price."' },
        { speaker: 'tey', text: 'That\'s validation: an idea turned into evidence, one cheap test at a time. Clinton\'s next problem is the price. That\'s the next course: How to Price a Product or Service.' },
      ],
      choice: {
        prompt: 'What would you decide for WashDay?',
        options: [
          { text: 'Go, and fix capacity and price next.', outcome: 'That\'s Clinton\'s call too. The demand evidence is strong; the open cards are capacity and price.', best: true },
          { text: 'Stop: 500 FCFA a bag is too little.', outcome: 'The margin is a problem to test, not proof the idea fails. Customers clearly value it.' },
          { text: 'Go big: build the app and advertise everywhere.', outcome: 'Capacity is 25 bags and the price is unproven. Scaling now would scale the problems.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Final challenge: decision day.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Based on the evidence, what is the best decision?',
        options: [
          { text: 'Stop', why: 'Payment, return and pull are all supported.' },
          { text: 'Persevere: go ahead, fixing capacity and price' },
          { text: 'Pivot to food delivery again', why: 'That card was killed.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence for going ahead, or a problem to fix?',
        groups: ['Evidence to go', 'Problem to fix'],
        items: [
          { text: '54 paid bags', group: 0 },
          { text: 'Mama Rose\'s 25-bag limit', group: 1 },
          { text: '8 of 12 came back', group: 0 },
          { text: 'Only 500 FCFA kept per bag', group: 1 },
          { text: '45% very disappointed', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each chapter to what it taught.',
        pairs: [
          ['Chapter 1', 'Ideas are guesses; test the riskiest'],
          ['Chapter 2', 'Ask about yesterday, not tomorrow'],
          ['Chapter 3', 'Size it bottom-up; know the competition'],
          ['Chapter 4', 'Test by hand with real money'],
          ['Chapter 5', 'Go, change or stop, with evidence'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '54 bags at 1,500 FCFA each. How much did WashDay take in over three weekends, in FCFA?',
        answers: ['81000', '81,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Of that 81,000 FCFA, Mama Rose received 1,000 per bag. How much did she get?',
        options: [
          { text: '27,000 FCFA', why: 'That\'s what Clinton kept.' },
          { text: '81,000 FCFA', why: 'That\'s the total.' },
          { text: '54,000 FCFA' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Now that it\'s validated, should I order the 350,000 FCFA app?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Not yet. Your limits are washing and carrying, and an app fixes neither. Sort capacity and price first, then see what an app would really need to do.' },
          { text: 'Yes, today.', why: 'It doesn\'t solve his current limits.' },
          { text: 'Never build an app.', why: 'Maybe later, when it solves a real problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s decision memo goes against the course?',
        lines: [
          'Decision: persevere.',
          'Next test 1: find a second washer.',
          'Next test 2: test a price that pays me fairly.',
          'Next test 3: skip testing and spend my savings on ads.',
        ],
        bug: 3,
        fix: 'Next test 3: track every franc in and out for a month.',
        explanation: 'Spending big before fixing capacity and price repeats the week-one mistake.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The course in one line.',
        template: 'Turn an idea into [[1]], one [[2]] test at a time.',
        blanks: [['evidence'], ['cheap']],
        distractors: ['an app', 'big'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the whole course\'s method.',
        lines: ['List your assumptions', 'Talk to customers about the past', 'Size the market bottom-up', 'Test by hand with real money', 'Decide: go, change or stop'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong evidence, or weak?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Customers paying a second time', group: 0 },
          { text: 'Forty fire emojis', group: 1 },
          { text: 'Payments from strangers', group: 0 },
          { text: 'Mum says it\'s brilliant', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is Clinton\'s next problem, and the next course?',
        options: [
          { text: 'The logo', why: 'Not on his list.' },
          { text: 'Finding the problem', why: 'That\'s validated.' },
          { text: 'The price: he keeps only 500 FCFA a bag' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much did the app quote Clinton never paid come to, in FCFA?',
        answers: ['350000', '350,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'For your own idea: go, change, or stop? What evidence decides it, and what\'s the next cheap test?',
    starters: ['My decision is...', 'My next test is...'],
  },
  deepen: {
    title: 'What comes next',
    summary: 'How to Price a Product or Service picks up Clinton\'s story: why 500 FCFA a bag isn\'t enough, and how to set a price customers accept and that pays him. Then Profit, Revenue and Cash Flow opens David\'s notebook.',
  },
  notes: 'Final challenge (fictional): 54 bags × 1,500 = 81,000 FCFA in; Mama Rose 54,000; Clinton 27,000; 30 customers, 10 regulars, 8 of 12 returned, 45% very disappointed; app quote 350,000 FCFA never paid. Decision: persevere, then capacity and price.',
};

export default lesson;
