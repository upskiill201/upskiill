import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: broken layers, build vs buy, who's who, the 12 lines. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the toy stack',
  summary: 'The team can place a symptom on its layer, compare two monthly bills, name the companies behind each layer, and run a tiny assistant end to end. Quick check before Kavya\'s Friday demo.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Diagnose and cost the stack without notes', 'Run and change the 12-line assistant'],
  learn: [
    {
      kind: 'story',
      title: 'Version zero runs',
      beats: [
        { speaker: 'narrator', text: 'Joel\'s 12 lines answer "Is delivery free?" correctly, at about $0.00004 a question in practice prices.' },
        { speaker: 'kavya', text: 'Then let\'s demo it to Mr Rao on Friday.' },
        { speaker: 'arjun', text: 'Demo what it does. And what it doesn\'t do yet.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the toy stack.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask the 12-line assistant "Do you take cash on delivery?" and print the reply',
        starter: 'from teyro_ai import PracticeModel, VectorStore\n\npolicies = open("rao_policies.md").read()\nstore = VectorStore()\nfor line in policies.splitlines():\n    if line.startswith("- "):\n        store.add(len(store) + 1, line[2:])\n\nquestion = "Is delivery free?"\nhits = store.search(question, k=2)\ncontext = "\\n".join(h["text"] for h in hits)\nreply = PracticeModel().reply(question, context=context)\nprint(reply)\n',
        solution: 'from teyro_ai import PracticeModel, VectorStore\n\npolicies = open("rao_policies.md").read()\nstore = VectorStore()\nfor line in policies.splitlines():\n    if line.startswith("- "):\n        store.add(len(store) + 1, line[2:])\n\nquestion = "Do you take cash on delivery?"\nhits = store.search(question, k=2)\ncontext = "\\n".join(h["text"] for h in hits)\nreply = PracticeModel().reply(question, context=context)\nprint(reply)\n',
        hint: 'Change the question line',
        checks: [{ message: 'Mention cash on delivery', outputIncludes: 'cash on delivery' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the symptom to the first layer to check.',
        pairs: [
          ['Made-up delivery times', 'Data and retrieval'],
          ['Very slow replies', 'Model or compute'],
          ['Shared a staff code', 'Guardrails'],
          ['No idea if it\'s right', 'Evaluation'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the pay-per-answer bill for 100,000 chats at $0.00018, rounded to 2 places',
        starter: 'per_chat = 0.00018\nchats = 100000\n',
        solution: 'per_chat = 0.00018\nchats = 100000\nprint(round(per_chat * chats, 2))\n',
        hint: 'round(per_chat * chats, 2)',
        checks: [{ message: 'Print 18.0', outputEquals: '18.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Rented by Ask Rao\'s team, or built by them?',
        groups: ['Rented', 'Built'],
        items: [
          { text: 'GPUs', group: 0 },
          { text: 'The help-page search', group: 1 },
          { text: 'The model', group: 0 },
          { text: 'The tests that check answers', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'TSMC, ASML and Nvidia all belong to which layer?',
        options: [
          { text: 'Infrastructure and compute' },
          { text: 'Model', why: 'They make chips and chip machines, not the models.' },
          { text: 'Application', why: 'They\'re at the very bottom of the stack.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line crashes with a KeyError?',
        language: 'python',
        lines: ['where = {"slow": "Model or compute", "wrong": "Data and retrieval"}', 'print(where["wrong"])', 'print(where["expensive"])'],
        bug: 2,
        fix: 'Add "expensive" to the dictionary first',
        explanation: 'There is no "expensive" key in this dictionary.',
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'For the demo, should I say it can answer anything?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, promise everything.', why: 'It can\'t check orders yet. Overpromising backfires.' },
          { text: 'Say it answers from the help page, and that orders, guardrails and the chat box come next. Honest demos build trust.' },
          { text: 'Don\'t demo it at all.', why: 'Showing early work, honestly, is useful.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A monthly GPU bill.',
        language: 'python',
        template: 'gpu_bill = gpu_per_hour * [[1]] * [[2]]',
        blanks: [['24'], ['30']],
        distractors: ['60', '7'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'build = ["Data", "Orchestration", "Application", "Evaluation"]\nprint(build[1])',
        language: 'python',
        options: [
          { text: 'Data', why: 'Positions start at 0, so [1] is the second item.' },
          { text: '4', why: 'That would be len(build).' },
          { text: 'Orchestration' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps of the 12-line assistant.',
        lines: ['Load the help page into a store', 'Search for the closest lines', 'Give them to the model as context', 'Print the reply and its cost'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which kind of model can you download and run yourself? (open-...)',
        answers: ['open-weight', 'open weight', 'weight'],
        placeholder: 'open-...',
      },
    ],
  },
  reflect: {
    prompt: 'Arjun says "demo what it does, and what it doesn\'t do yet". Why is that harder than it sounds?',
    starters: ['It\'s hard because...', 'It builds trust because...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 6-9. 0.00018 x 100000 = 18.0. 12-line assistant for "Do you take cash on delivery?" returns the payment line (contains "cash on delivery"); exact line verified by the checker run.',
};

export default lesson;
