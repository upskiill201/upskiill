import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 14 — API, cloud GPU or laptop? Choosing where Ask Rao runs. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'API, cloud GPU or laptop?',
  summary: 'Three options, four questions. Tey helps the team turn everything from this chapter into a simple decision they can explain to Arjun, and to Mr Rao.',
  minutes: 12,
  outcomes: [
    'Choose where to run a model using volume, privacy, skills and speed',
    'Explain the choice in one sentence',
    'Write the decision as a small Python rule',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Ask four questions. One: how many chats? Below millions a month, paying per answer is usually cheapest.', replies: ['Two?'] },
        { tey: 'Two: must the data stay on our own machines? If yes, an open-weight model on a GPU you control, even if it costs more.', replies: ['Three?'] },
        { tey: 'Three: who looks after it? A rented GPU needs someone to set it up, update it and fix it at 2 a.m. An API needs none of that.', replies: ['And four?'] },
        { tey: 'Four: how fast must it be, and how reliable? A laptop is fine for testing, not for customers. For Ask Rao today: about 30,000 chats a month, no strict data rule, a small team. That points to an API, with a local model for experiments.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The decision as code',
      caption: 'Change the inputs.',
      code: 'chats_per_month = 30000\ndata_must_stay_inside = False\n\nif data_must_stay_inside:\n    choice = "Open-weight model on our own GPU"\nelif chats_per_month < 6_000_000:\n    choice = "Pay per answer (model API)"\nelse:\n    choice = "Rent GPUs and compare"\nprint(choice)\n',
      challenge: 'Set data_must_stay_inside to True.',
    },
  ],
  apply: {
    scenario: 'Where should Ask Rao run?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Finish the rule: under 6,000,000 chats print "Pay per answer", otherwise "Rent GPUs"',
        starter: 'chats_per_month = 30000\n',
        solution: 'chats_per_month = 30000\nif chats_per_month < 6_000_000:\n    print("Pay per answer")\nelse:\n    print("Rent GPUs")\n',
        hint: 'if chats_per_month < 6_000_000:',
        checks: [
          { message: 'Print Pay per answer', outputEquals: 'Pay per answer' },
          { message: 'Use if', codeIncludes: 'if ' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which option does this point to?',
        groups: ['Pay per answer (API)', 'Own GPU or rented GPU'],
        items: [
          { text: 'A few thousand chats a month', group: 0 },
          { text: 'Data must never leave our machines', group: 1 },
          { text: 'No one to look after servers', group: 0 },
          { text: 'Millions of chats every day, steadily', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it decides.',
        pairs: [
          ['How many chats?', 'Which option is cheaper'],
          ['Must data stay inside?', 'Whether an API is allowed'],
          ['Who looks after it?', 'Whether we can run our own'],
          ['How fast and reliable?', 'Laptop or a proper service'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'For Ask Rao today (30,000 chats a month, small team, no strict data rule), what\'s the sensible choice?',
        options: [
          { text: 'A model API, with a local model for experiments' },
          { text: 'Buy GPUs', why: 'Far too expensive at this volume, and someone must run them.' },
          { text: 'The office laptop', why: 'Fine for tests, not for customers.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Mr Rao asked if customer messages leave the shop. What do we say?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'With an API, messages go to the model provider. We pick one whose terms say they don\'t train on our data, and we never send card or private details.' },
          { text: 'They never leave anywhere.', why: 'With an API, they go to the provider. Be honest about it.' },
          { text: 'Don\'t mention it.', why: 'Privacy questions deserve straight answers.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule in Python.',
        language: 'python',
        template: 'if data_must_stay_inside:\n    choice = "own GPU"\n[[1]] chats_per_month < 6_000_000:\n    choice = "API"\n[[2]]:\n    choice = "rent GPUs"',
        blanks: [['elif'], ['else']],
        distractors: ['if', 'for'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'data_must_stay_inside = True\nif data_must_stay_inside:\n    print("Own GPU")\nelse:\n    print("API")',
        language: 'python',
        options: [
          { text: 'Own GPU' },
          { text: 'API', why: 'The data rule is True, so the first branch runs.' },
          { text: 'Nothing', why: 'One branch always runs.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s decision ignores a question?',
        lines: [
          'We get about 30,000 chats a month.',
          'There\'s no strict rule about data leaving.',
          'So we\'ll rent four GPUs and run them ourselves.',
          'We\'ll keep a local model for experiments.',
        ],
        bug: 2,
        fix: 'So we\'ll pay per answer through an API.',
        explanation: 'At 30,000 chats, four rented GPUs cost hundreds of times more, and nobody\'s free to look after them.',
      },
      {
        kind: 'mcq',
        prompt: 'Where does the 6,000,000 in the rule come from?',
        options: [
          { text: 'The break-even point: where a $1,080 GPU bill equals $0.00018 per chat' },
          { text: 'A law', why: 'It\'s our own practice maths from Chapter 1.' },
          { text: 'The number of Mr Rao\'s customers', why: 'It\'s where the two bills match.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'For Ask Rao today, which option: API, GPU or laptop?',
        answers: ['API', 'api', 'an API'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which of Tey\'s four questions would matter most for an AI project at your work? Why that one?',
    starters: ['The most important question is...', 'Because...'],
  },
  deepen: {
    title: 'Decisions change',
    summary: 'The right answer today may be wrong next year: traffic grows, prices fall, new rules arrive. Good teams write down why they chose, so they know when to choose again.',
  },
  notes: 'Break-even from Chapter 1 practice numbers: $1,080 / $0.00018 = 6,000,000 chats/month. Decision factors (volume, data residency, operations capacity, latency/reliability) are standard build-vs-buy criteria. Provider data-use terms vary: check them at the time.',
};

export default lesson;
