import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Before/After: persevere, pivot or stop. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Persevere, pivot or stop',
  summary: 'Every test ends in one of three decisions. Clinton has already made one of them, a pivot, from CampusEats to WashDay. Now Miracle asks him to compare what the evidence says for the next one.',
  minutes: 12,
  outcomes: [
    'Know the three decisions a test can lead to',
    'Match evidence to the right decision',
    'Set "stop" rules before you need them',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two decisions Clinton has made',
      before: {
        label: 'Pivot: CampusEats',
        text: 'Evidence: 1 of 10 paid for food delivery; 7 said the stalls are close.\nBut interviews found a different, real problem: laundry.\nDecision: keep the customer (hostel students), change the problem.\nA pivot changes one big thing and keeps what you learned.',
      },
      after: {
        label: 'Persevere: WashDay',
        text: 'Evidence: 12, then 19, then 23 paid bags; two-thirds came back.\nProblems: Mama Rose\'s 25-bag limit, late bags uphill, a thin 500 FCFA a bag.\nDecision: keep going, and fix capacity and price.\nPersevering doesn\'t mean changing nothing.',
      },
      notes: [
        'Stop when the riskiest card has failed a fair test and there\'s no new lead.',
        'Pivot when the test fails but uncovers a better problem or customer.',
        'Persevere when tests pass, while fixing what they revealed.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Write your stop rule early: "If fewer than X people pay after Y tries, I stop." Then trust it.',
    },
  ],
  apply: {
    scenario: 'Choosing the decision.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Persevere, pivot or stop?',
        groups: ['Persevere', 'Pivot', 'Stop'],
        items: [
          { text: 'Tests pass, customers come back', group: 0 },
          { text: 'Test fails, but a better problem appears', group: 1 },
          { text: 'Fair tests fail and there\'s no new lead', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What was the CampusEats to WashDay change?',
        options: [
          { text: 'A stop', why: 'He didn\'t stop; he changed direction.' },
          { text: 'A pivot: same customers, different problem' },
          { text: 'Persevering', why: 'He changed the idea completely.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the decision to what it keeps.',
        pairs: [
          ['Pivot', 'What you learned; one big thing changes'],
          ['Persevere', 'The idea, with fixes'],
          ['Stop', 'Your time and money for the next idea'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'If I persevere, does that mean I change nothing?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, change nothing.', why: 'Persevering includes fixing what you learned.' },
          { text: 'Change everything.', why: 'That would be a pivot or a new idea.' },
          { text: 'No: you keep the idea and fix what the tests showed. Capacity, the hill and the price are all on your list.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Clinton\'s stop rule was: fewer than 5 payers after 3 weekends. Fill it in.',
        template: 'If fewer than [[1]] people pay after [[2]] weekends, I stop.',
        blanks: [['5', 'five'], ['3', 'three']],
        distractors: ['50', 'thirty'],
      },
      {
        kind: 'mcq',
        prompt: 'Why write a stop rule before you need it?',
        options: [
          { text: 'Stop rules make tests pass', why: 'They make decisions honest.' },
          { text: 'Once you\'ve invested, it\'s hard to stop honestly' },
          { text: 'They aren\'t needed', why: 'Without one, many founders never stop.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s decision note is wrong?',
        lines: [
          'CampusEats: pivoted after 1 of 10 paid.',
          'WashDay: 12, 19, 23 bags; two-thirds came back.',
          'Decision: persevere and change nothing.',
          'Fix next: capacity, the hill, the price.',
        ],
        bug: 2,
        fix: 'Decision: persevere, fixing capacity, the hill and the price.',
        explanation: 'Persevering still means acting on what the tests revealed.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the name for changing one big thing (like the problem) while keeping what you learned?',
        answers: ['pivot', 'a pivot'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Clinton reaches a decision.',
        lines: ['Look at the pass marks and results', 'Check whether customers come back', 'List what the tests revealed', 'Choose persevere, pivot or stop'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence for persevering, or for changing course?',
        groups: ['Persevere', 'Change course'],
        items: [
          { text: 'Two-thirds of customers came back', group: 0 },
          { text: 'Nobody paid in three fair tests', group: 1 },
          { text: 'Each weekend had more paid bags', group: 0 },
          { text: 'Everyone says the problem isn\'t real', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own stop rule: what result, after how many tries, would make you stop your idea?',
    starters: ['I\'ll stop if...', 'I\'ll pivot if...'],
  },
  deepen: {
    title: 'Pivot or persevere',
    summary: 'Eric Ries describes regular "pivot or persevere" meetings: look at the evidence and decide on purpose, instead of drifting. A pivot isn\'t failure; it\'s a change of direction based on learning.',
  },
  notes: 'Pivot / persevere: Eric Ries, The Lean Startup (2011). Fictional evidence from Chapters 1-5.',
};

export default lesson;
