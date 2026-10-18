import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 16 — Asking a good question: "who will miss?" vs "why do people miss?" */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Asking a good question',
  summary: 'Before writing another line, Miracle makes Halima write the question at the top of a page. Halima\'s first try is "Why do patients miss?" Miracle crosses it out.',
  minutes: 11,
  outcomes: [
    'Turn a vague goal into a question a model can answer',
    'Tell a prediction question from a "why" question',
    'Check the question has data and an action behind it',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The question at the top of the page',
      beats: [
        { speaker: 'halima', text: '"Why do patients miss?" That\'s what I really want to know.' },
        { speaker: 'miracle', text: 'Me too. But a model can\'t answer "why". It finds patterns. Ask something it can answer, and that someone can act on.' },
        { speaker: 'halima', text: '"Which of tomorrow\'s bookings are most likely to be missed?"' },
        { speaker: 'miracle', text: 'Better. Now three checks. Do we have past examples with the answer? Do we know the clues before the day? And will anyone do something different because of it?' },
        { speaker: 'bisi', text: 'If you give me that list by 4 p.m., I\'ll call the top ten that evening.' },
        { speaker: 'miracle', text: 'Then that\'s our question.' },
      ],
      choice: {
        prompt: 'Which question should go at the top of Halima\'s page?',
        options: [
          {
            text: 'Which of tomorrow\'s bookings are most likely to be missed, so Bisi can call them the evening before?',
            outcome: 'A prediction, with data to learn from, clues known in advance, and a clear action. That\'s a good ML question.',
            best: true,
          },
          {
            text: 'Why do patients miss appointments?',
            outcome: 'An important question, but a "why" question. The model can show patterns that help you investigate; it can\'t prove the reasons.',
          },
          {
            text: 'How can AI fix no-shows?',
            outcome: 'Too vague: there\'s nothing to predict and nothing to measure.',
          },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Choosing the question.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'A question a model can answer, or not?',
        groups: ['A model can answer', 'Not a model question'],
        items: [
          { text: 'Which bookings are likely to be missed?', group: 0 },
          { text: 'Why do people feel nervous at clinics?', group: 1 },
          { text: 'How many patients will Ikeja see next week?', group: 0 },
          { text: 'How can AI fix everything?', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: "Print \"Bisi calls 10 of 40 bookings\" using the variables",
        starter: "calls = 10\nbookings = 40\n",
        solution: "calls = 10\nbookings = 40\nprint(f\"Bisi calls {calls} of {bookings} bookings\")\n",
        hint: "print(f\"Bisi calls {calls} of {bookings} bookings\")",
        checks: [
          { message: "Print Bisi calls 10 of 40 bookings", outputEquals: "Bisi calls 10 of 40 bookings" },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Miracle\'s three checks, in her order.',
        lines: [
          'Do we have past examples with the answer?',
          'Do we know the clues before the day?',
          'Will anyone act differently because of it?',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Miracle cross out "Why do patients miss?"',
        options: [
          { text: 'A model finds patterns; it can\'t prove reasons' },
          { text: 'It\'s a bad question to care about', why: 'It\'s important. It just isn\'t a prediction question.' },
          { text: 'It\'s too short', why: 'Length isn\'t the issue. A model can\'t answer "why".' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Let\'s predict which patients are lazy.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'There\'s no "lazy" in the data, and it\'s unfair to the patient. Let\'s predict who\'s likely to miss, so we can help them come.' },
          { text: 'Sure, I\'ll add a lazy column.', why: 'There\'s no such data, and labelling people is harmful.' },
          { text: 'Models can predict anything.', why: 'Only what the examples contain, and only what\'s fair to predict.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A good ML question has...',
        template: 'past examples with the [[1]], clues known [[2]] the day, and an [[3]] someone will take.',
        blanks: [['answer'], ['before'], ['action']],
        distractors: ['after', 'excuse'],
      },
      {
        kind: 'mcq',
        prompt: 'Bisi will call the top 10 risky bookings the evening before. What does that tell Halima?',
        options: [
          { text: 'The model must be ready by 4 p.m. and rank bookings by risk' },
          { text: 'Nothing: Bisi\'s plans don\'t matter to the model', why: 'The action decides what the model must produce, and when.' },
          { text: 'The model should call the patients', why: 'Bisi calls. The model ranks.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem in this plan.',
        lines: [
          'Question: which bookings will be missed?',
          'Examples: last year\'s bookings, with who came.',
          'Clue: whether the nurse called after they missed.',
          'Action: Bisi calls the riskiest the night before.',
        ],
        bug: 2,
        fix: 'Clue: whether an SMS reminder was sent before the day.',
        explanation: 'A clue from after the appointment isn\'t known when we need to predict.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to Halima\'s answer.',
        pairs: [
          ['Past examples with answers?', 'Two years of bookings'],
          ['Clues known in advance?', 'Wait, reminder, distance'],
          ['Someone will act?', 'Bisi calls the top ten'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which question is best for Emmanuel\'s new project?',
        options: [
          { text: 'Which clinics will run out of vaccines next week, so stock can be moved?' },
          { text: 'Why is the supply chain hard?', why: 'A "why" question with nothing to predict.' },
          { text: 'Can AI do logistics?', why: 'Too vague to predict or measure.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'One word: a good question ends in something someone will DO. That\'s an...',
        answers: ['action'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Write one question from your own life that passes Miracle\'s three checks. What would you do differently with the answer?',
    starters: ['My question:', 'With the answer, I\'d...'],
  },
  deepen: {
    title: 'Why still matters',
    summary: 'Patterns from the model can point Halima at good "why" questions: "Patients from far away miss more. Is it the bus fare?" Then she asks patients. Models and conversations work together.',
  },
  notes: 'Problem framing: prediction target, data availability at prediction time, and an actionable decision. Story only; no data claims.',
};

export default lesson;
