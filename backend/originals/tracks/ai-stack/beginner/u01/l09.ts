import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9 — A stack in 12 lines: the whole flow in toy Python with the practice toolkit. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'A stack in 12 lines',
  summary: 'Arjun\'s challenge: "Show me every layer in code, small enough to fit on one screen." Joel writes it in 12 lines. It\'s a toy, and it\'s also the exact shape of a real AI assistant.',
  minutes: 13,
  outcomes: [
    'Read a tiny assistant that uses data, a model and a cost check',
    'Point at the line that belongs to each layer',
    'Change the question and see the whole stack respond',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Joel\'s 12 lines',
      steps: [
        { title: '1. Data: load the shop\'s facts', body: 'Each bullet line of the help page goes into a tiny vector store.', code: 'from teyro_ai import PracticeModel, VectorStore\npolicies = open("rao_policies.md").read()\nstore = VectorStore()\nfor line in policies.splitlines():\n    if line.startswith("- "):\n        store.add(len(store) + 1, line[2:])', language: 'python' },
        { title: '2. Retrieval: find the right facts', body: 'Search for the 2 lines closest in meaning to the question.', code: 'question = "Is delivery free?"\nhits = store.search(question, k=2)\ncontext = "\\n".join(h["text"] for h in hits)', language: 'python' },
        { title: '3. Model: answer from those facts', body: 'The practice model replies using only the context it was given.', code: 'reply = PracticeModel().reply(question, context=context)\nprint(reply)', language: 'python' },
        { title: '4. Evaluation: what did it cost?', body: 'Every reply knows its tokens and its cost.', code: 'print(reply.tokens_in, reply.tokens_out, reply.cost)', language: 'python' },
        { title: '5. What\'s missing', body: 'No chat box (application), no order tool or guardrails (orchestration), and the chips are hidden inside the model. Each chapter adds one.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Ask Rao, version zero',
      caption: 'Change the question.',
      code: 'from teyro_ai import PracticeModel, VectorStore\n\npolicies = open("rao_policies.md").read()\nstore = VectorStore()\nfor line in policies.splitlines():\n    if line.startswith("- "):\n        store.add(len(store) + 1, line[2:])\n\nquestion = "Is delivery free?"\nhits = store.search(question, k=2)\ncontext = "\\n".join(h["text"] for h in hits)\nreply = PracticeModel().reply(question, context=context)\nprint(reply)\nprint(reply.tokens_in, "tokens in,", reply.tokens_out, "out")\n',
      challenge: 'Ask "What sizes do kurtas come in?"',
    },
  ],
  apply: {
    scenario: 'The whole stack in a few lines.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Change the question to "What sizes do kurtas come in?" and print the reply',
        starter: 'from teyro_ai import PracticeModel, VectorStore\n\npolicies = open("rao_policies.md").read()\nstore = VectorStore()\nfor line in policies.splitlines():\n    if line.startswith("- "):\n        store.add(len(store) + 1, line[2:])\n\nquestion = "Is delivery free?"\nhits = store.search(question, k=2)\ncontext = "\\n".join(h["text"] for h in hits)\nreply = PracticeModel().reply(question, context=context)\nprint(reply)\n',
        solution: 'from teyro_ai import PracticeModel, VectorStore\n\npolicies = open("rao_policies.md").read()\nstore = VectorStore()\nfor line in policies.splitlines():\n    if line.startswith("- "):\n        store.add(len(store) + 1, line[2:])\n\nquestion = "What sizes do kurtas come in?"\nhits = store.search(question, k=2)\ncontext = "\\n".join(h["text"] for h in hits)\nreply = PracticeModel().reply(question, context=context)\nprint(reply)\n',
        hint: 'Only the question line changes',
        checks: [{ message: 'Print the kurta sizes', outputEquals: 'Kurtas and kurtis come in S, M, L, XL and XXL.' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to its layer.',
        pairs: [
          ['store.add(...)', 'Data'],
          ['store.search(question, k=2)', 'Retrieval'],
          ['PracticeModel().reply(...)', 'Model'],
          ['reply.cost', 'Evaluation'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does store.search(question, k=2) return?',
        options: [
          { text: 'The 2 stored lines closest in meaning to the question' },
          { text: 'The model\'s answer', why: 'Search finds facts; the model writes the answer.' },
          { text: 'Every line of the help page', why: 'Only the top 2.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'How many lines did the help page put into the store? Print len(store)',
        starter: 'from teyro_ai import VectorStore\n\npolicies = open("rao_policies.md").read()\nstore = VectorStore()\nfor line in policies.splitlines():\n    if line.startswith("- "):\n        store.add(len(store) + 1, line[2:])\n',
        solution: 'from teyro_ai import VectorStore\n\npolicies = open("rao_policies.md").read()\nstore = VectorStore()\nfor line in policies.splitlines():\n    if line.startswith("- "):\n        store.add(len(store) + 1, line[2:])\nprint(len(store))\n',
        hint: 'print(len(store))',
        checks: [{ message: 'Print 15', outputEquals: '15' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'In Joel\'s 12 lines already, or still missing?',
        groups: ['Already there', 'Still missing'],
        items: [
          { text: 'Searching the help page', group: 0 },
          { text: 'A chat box on the website', group: 1 },
          { text: 'Looking up a live order', group: 1 },
          { text: 'Counting tokens and cost', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Twelve lines? Real AI apps can\'t be that simple.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'The shape is the same; real ones add care at every step: better search, tools, guardrails, tests. That\'s the rest of the course.' },
          { text: 'They are exactly this, nothing more.', why: 'Real ones need far more care in every layer.' },
          { text: 'Real apps don\'t use search.', why: 'Many real assistants work exactly this way.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Retrieve, then answer.',
        language: 'python',
        template: 'hits = store.[[1]](question, k=2)\nreply = PracticeModel().reply(question, [[2]]=context)',
        blanks: [['search'], ['context']],
        distractors: ['find', 'prompt'],
      },
      {
        kind: 'findBug',
        prompt: 'The search finds the right facts, but the model still makes answers up. Which line?',
        language: 'python',
        lines: ['hits = store.search(question, k=2)', 'context = "\\n".join(h["text"] for h in hits)', 'reply = PracticeModel().reply(question)'],
        bug: 2,
        fix: 'reply = PracticeModel().reply(question, context=context)',
        explanation: 'The facts were found but never given to the model, so it answered from nothing.',
      },
      {
        kind: 'mcq',
        prompt: 'Why give the model only 2 lines instead of the whole help page?',
        options: [
          { text: 'Fewer tokens: cheaper and faster, and less to get confused by' },
          { text: 'The model can only read 2 lines', why: 'It could read more. It\'s about cost and focus.' },
          { text: 'No reason', why: 'Every token in the prompt costs money and time.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines does store.search(question, k=2) return?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of Joel\'s 12 lines would you most want to improve first, and why?',
    starters: ['I\'d improve...', 'Because...'],
  },
  deepen: {
    title: 'This shape has a name',
    summary: 'Find the relevant facts, then have the model answer from them: that\'s retrieval-augmented generation, or RAG. Chapter 6 builds it properly.',
  },
  notes: 'rao_policies.md has 15 bullet lines. Search "Is delivery free?" k=2 -> the delivery-fee line (score 0.769) and the size-chart line; reply "Delivery is free on orders over ₹999." (44 tokens in, 13 out). "What sizes do kurtas come in?" -> "Kurtas and kurtis come in S, M, L, XL and XXL."',
};

export default lesson;
