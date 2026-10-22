import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 — The six layers: a name and a job for each. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The six layers',
  summary: 'Joel turns the message\'s journey into a list he can pin above his desk: six layers, each with one job. Every logo you\'ll ever see on an "AI stack" diagram belongs in one of them.',
  minutes: 11,
  outcomes: [
    'Name the six layers of the AI stack',
    'Say the one job each layer does',
    'Store the layers in a Python list',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Joel\'s list',
      text: 'From the bottom: infrastructure and compute runs everything. The model writes the words. Data and retrieval brings in facts. Orchestration decides the steps. The application is what people use. Evaluation and governance checks it all.',
      hotspots: [
        { phrase: 'infrastructure and compute runs everything', note: 'Chips (GPUs and similar), the factories that make them, and the clouds or machines that run them. Chapter 2.' },
        { phrase: 'The model writes the words', note: 'The "brain": a closed model you rent through an API, or an open-weight one you can run yourself. Chapters 3 and 4.' },
        { phrase: 'Data and retrieval brings in facts', note: 'Your own documents and records, made searchable so the model can use them. Chapters 5 and 6.' },
        { phrase: 'Orchestration decides the steps', note: 'Prompts, chains, tools and agents, plus guardrails that keep it safe. Chapters 7 and 8.' },
        { phrase: 'The application is what people use', note: 'The chat box, the voice assistant, the button in an app, and the API behind it. Chapter 9.' },
        { phrase: 'Evaluation and governance checks it all', note: 'Is it right? What did it cost? Is it fair and safe? Who changed what? Chapter 10.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The stack as a list',
      caption: 'Bottom layer first.',
      code: 'layers = [\n    "Infrastructure and compute",\n    "Model",\n    "Data and retrieval",\n    "Orchestration",\n    "Application",\n    "Evaluation and governance",\n]\nprint(len(layers))\nprint("Bottom:", layers[0])\nprint("Top:", layers[-1])\n',
      challenge: 'Print the layer that brings in the shop\'s facts.',
    },
  ],
  apply: {
    scenario: 'Six layers, six jobs.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the layer to its job.',
        pairs: [
          ['Infrastructure and compute', 'Runs everything on chips'],
          ['Model', 'Writes the words'],
          ['Data and retrieval', 'Brings in facts'],
          ['Orchestration', 'Decides the steps'],
          ['Application', 'What people use'],
          ['Evaluation and governance', 'Checks it all'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The list is in order from the bottom. Print the 4th layer (position 3)',
        starter: 'layers = ["Infrastructure and compute", "Model", "Data and retrieval",\n          "Orchestration", "Application", "Evaluation and governance"]\n',
        solution: 'layers = ["Infrastructure and compute", "Model", "Data and retrieval",\n          "Orchestration", "Application", "Evaluation and governance"]\nprint(layers[3])\n',
        hint: 'Positions start at 0: layers[3]',
        checks: [{ message: 'Print Orchestration', outputEquals: 'Orchestration' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which layer is it?',
        groups: ['Data and retrieval', 'Orchestration'],
        items: [
          { text: 'Searching the help page', group: 0 },
          { text: 'Deciding to call the order tool', group: 1 },
          { text: 'Storing products for search', group: 0 },
          { text: 'Building the prompt', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which layer is the "brain" that writes the reply?',
        options: [
          { text: 'The application', why: 'The app shows the reply; the model writes it.' },
          { text: 'Compute', why: 'Compute runs the model, but the model writes the words.' },
          { text: 'The model' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The bottom and top of the stack.',
        template: 'At the bottom: infrastructure and [[1]]. At the top: evaluation and [[2]].',
        blanks: [['compute'], ['governance']],
        distractors: ['marketing', 'design'],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Six layers? I only need the model and a chat box.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'True, skip the rest.', why: 'Without data, orchestration and evaluation, it guesses about the shop.' },
          { text: 'Then it won\'t know your shop, can\'t check orders, and you\'ll never know if it\'s right. The other layers are why it works.' },
          { text: 'You need sixty layers.', why: 'Six jobs, each with many possible tools.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'layers = ["Infrastructure and compute", "Model", "Data and retrieval",\n          "Orchestration", "Application", "Evaluation and governance"]\nprint(layers[-1])',
        language: 'python',
        options: [
          { text: 'Infrastructure and compute', why: '[-1] is the last item, not the first.' },
          { text: 'Application', why: 'That\'s [-2].' },
          { text: 'Evaluation and governance' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s notes puts something in the wrong layer?',
        lines: [
          'GPUs: infrastructure and compute.',
          'The chat box: application.',
          'Checking answers are right: model.',
          'The shop\'s help page: data and retrieval.',
        ],
        bug: 2,
        fix: 'Checking answers are right: evaluation and governance.',
        explanation: 'The model writes answers; a separate layer checks them.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the layers from the bottom up.',
        lines: ['Infrastructure and compute', 'Model', 'Data and retrieval', 'Orchestration', 'Application'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many layers are in the AI stack in this course?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which layer do you think most people forget about when they say "we use AI"? Why?',
    starters: ['People forget...', 'Because...'],
  },
  deepen: {
    title: 'Other diagrams',
    summary: 'Some diagrams split or merge these layers differently: guardrails as their own layer, or data and models together. The jobs are the same. If you can place a tool by its job, any diagram makes sense.',
  },
  notes: 'Six-layer model used in this course: infrastructure & compute; model; data & retrieval; orchestration & agents (with guardrails); application & interface; observability, evaluation & governance. Common industry framing (e.g. IBM and others describe similar layered "AI stacks"); exact splits vary.',
};

export default lesson;
