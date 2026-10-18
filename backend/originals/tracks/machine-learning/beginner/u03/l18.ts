import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 18 — Reading someone's neighbour code: predict what Emmanuel's version does before running it. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading someone\'s neighbour code',
  summary: 'Emmanuel has been quietly writing his own predictor at lunch. He asks Halima to review it. She reads it line by line, predicting what each part does before she runs anything.',
  minutes: 12,
  outcomes: [
    'Read nearest-neighbour code someone else wrote',
    'Predict what it prints before running it',
    'Give kind, specific review comments',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Emmanuel\'s lunch-break predictor',
      beats: [
        { speaker: 'emmanuel', text: 'Don\'t laugh. I wanted to see if I could do it too.' },
        { speaker: 'halima', text: 'You built the whole thing: distances, a sort, a vote. Line 4 takes dists[:5], so k is 5. Odd, good.' },
        { speaker: 'halima', text: 'One question: your features are wait and km only. Past no-shows were the strongest clue in Chapter 2. Want to add them, scaled?' },
        { speaker: 'emmanuel', text: 'I didn\'t think of that. Yes.' },
        { speaker: 'miracle', text: 'That\'s a good review: say what works, ask about one thing, explain why. Not "this is wrong".' },
      ],
      choice: {
        prompt: 'How should Halima start her review?',
        options: [
          { text: 'With what works, then one specific question and the reason for it.', outcome: 'Emmanuel improves the code and keeps building. Reviews are for the code, not against the person.', best: true },
          { text: '"This is wrong: you\'re missing features."', outcome: 'Accurate, but he hears "you\'re bad at this" and stops trying.' },
          { text: 'Say nothing and rewrite it herself.', outcome: 'He learns nothing, and she now owns code she didn\'t need to write.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Emmanuel\'s code',
      caption: 'Predict the output, then run it.',
      code: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\ndists = []\nfor p in notebook:\n    dists.append([((p[1] - 19) ** 2 + (p[2] - 4) ** 2) ** 0.5, p[3]])\ndists.sort()\nvotes = 0\nfor n in dists[:5]:\n    votes = votes + n[1]\nprint(votes / 5)\n',
      challenge: 'Before running: Kunle\'s 5 nearest are Ireti, Hauwa, Tolu, Zainab and Kelechi. What will it print?',
    },
  ],
  apply: {
    scenario: 'Reviewing Emmanuel\'s predictor.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Kunle\'s 5 nearest answers are [0, 1, 1, 0, 0]. What does Emmanuel\'s code print?',
        code: 'votes = 0\nfor n in [0, 1, 1, 0, 0]:\n    votes = votes + n\nprint(votes / 5)',
        language: 'python',
        options: [
          { text: '0.4' },
          { text: '2', why: 'It divides the votes by 5.' },
          { text: '0.5', why: '2 ÷ 5 = 0.4.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Work out the risk from Kunle\'s 5 nearest answers and print it',
        starter: 'nearest5 = [0, 1, 1, 0, 0]\n',
        solution: 'nearest5 = [0, 1, 1, 0, 0]\nprint(sum(nearest5) / len(nearest5))\n',
        hint: 'sum(nearest5) / len(nearest5)',
        checks: [{ message: 'Print 0.4', outputEquals: '0.4' }],
      },
      {
        kind: 'mcq',
        prompt: 'In Emmanuel\'s code, each item is [distance, answer]. What is n[1]?',
        options: [
          { text: 'The answer: 1 missed, 0 came' },
          { text: 'The distance', why: 'That\'s n[0].' },
          { text: 'The name', why: 'Emmanuel didn\'t store names.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A kind, useful review comment, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: '"k = 5 is odd, nice. Could we add past no-shows, scaled?"', group: 0 },
          { text: '"This is wrong."', group: 1 },
          { text: '"Line 4: why 5 and not 15? Did you test both?"', group: 0 },
          { text: '"I\'d never write it like this."', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Emmanuel\'s second version gives risks above 1. Which line?',
        language: 'python',
        lines: ['votes = 0', 'for n in dists[:5]:', '    votes = votes + n[1]', 'print(votes / 3)'],
        bug: 3,
        fix: 'print(votes / 5)',
        explanation: 'He takes 5 neighbours but divides by 3. Divide by the same k.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Emmanuel\'s line to what it does.',
        pairs: [
          ['dists.append([d, p[3]])', 'Stores distance and answer'],
          ['dists.sort()', 'Nearest first'],
          ['dists[:5]', 'The 5 nearest'],
          ['votes / 5', 'The risk'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Is my version as good as yours?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Let\'s test both on the same week 12 bookings and see. That\'s the only fair way to compare.' },
          { text: 'No, mine is better.', why: 'You don\'t know until you test both the same way.' },
          { text: 'Yes, all predictors are the same.', why: 'They differ in features, k and scaling. Test to compare.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A risk from the nearest k.',
        language: 'python',
        template: 'risk = [[1]](nearest) / [[2]](nearest)',
        blanks: [['sum'], ['len']],
        distractors: ['max', 'round'],
      },
      {
        kind: 'mcq',
        prompt: 'What does Emmanuel\'s code leave out that Halima\'s v0.3 includes?',
        options: [
          { text: 'Past no-shows and reminders, and scaling' },
          { text: 'The loop', why: 'He has a loop.' },
          { text: 'The sort', why: 'He sorts the distances.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Emmanuel\'s code, what is k?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Miracle\'s review rule: what works, one question, the reason. How do you like to receive feedback on your work?',
    starters: ['I like feedback that...', 'I find it hard when...'],
  },
  deepen: {
    title: 'Predict, then run',
    summary: 'Guessing the output before running code is the fastest way to understand it. When your guess is wrong, you\'ve found exactly the line you didn\'t understand.',
  },
  notes: 'Kunle 5-NN (2 features): Ireti 0, Hauwa 1, Tolu 1, Zainab 0, Kelechi 0 -> 2/5 = 0.4.',
};

export default lesson;
