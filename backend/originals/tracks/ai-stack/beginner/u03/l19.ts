import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 19 — What the model can and can't know about the shop. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'What the model can know',
  summary: 'Before they build any more, Joel and Kavya sort every kind of customer question by one test: where would the answer come from? It becomes the plan for the next four chapters.',
  minutes: 12,
  outcomes: [
    'Sort questions by where their answers come from',
    'Know what the model knows by itself, and what it must be given',
    'Turn the sort into a small Python lookup',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Where would the answer come from?',
      beats: [
        { speaker: 'joel', text: '"How do I wash silk?" The model knows that from general training. Fine to answer by itself, carefully.' },
        { speaker: 'kavya', text: '"Is delivery free?" Only the help page knows that. It must be given the page.' },
        { speaker: 'joel', text: '"Where is order R-1042?" Only the order system knows, and it changes by the minute. It needs a tool.' },
        { speaker: 'kavya', text: '"Do you have a red kurta in L?" The product list. Search by meaning: Chapter 5.' },
        { speaker: 'arjun', text: 'And "Can I get a refund on a damaged item?" The policy says what to do; a person decides. Sort every question like this and the stack designs itself.' },
      ],
      choice: {
        prompt: 'Where should the answer to "Is delivery free?" come from?',
        options: [
          { text: 'The shop\'s help page, given to the model in the prompt.', outcome: 'Right: it\'s a shop fact, not general knowledge.', best: true },
          { text: 'The model\'s general knowledge.', outcome: 'That\'s where "free 1-day delivery anywhere" came from. Wrong for this shop.' },
          { text: 'A person, every time.', outcome: 'The help page answers it; people are for decisions.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Where answers come from',
      caption: 'A small lookup: question type to source.',
      code: 'source = {\n    "general care advice": "the model itself",\n    "shop policy": "the help page (in the prompt)",\n    "a live order": "a tool that reads the orders",\n    "a product": "search over the product list",\n    "a refund decision": "a person",\n}\nfor kind, where in source.items():\n    print(f"{kind}: {where}")\n',
      challenge: 'Add "today\'s date": where should that come from?',
    },
  ],
  apply: {
    scenario: 'Sorting the questions.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Where should the answer come from?',
        groups: ['Help page', 'Tool or search', 'The model itself'],
        items: [
          { text: 'Is delivery free?', group: 0 },
          { text: 'Where is order R-1042?', group: 1 },
          { text: 'How do I wash a silk saree?', group: 2 },
          { text: 'Do you have a red kurta in L?', group: 1 },
          { text: 'What is your return policy?', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Look up where the answer to "a live order" comes from and print it',
        starter: 'source = {\n    "shop policy": "the help page",\n    "a live order": "a tool that reads the orders",\n    "a product": "search over the product list",\n}\n',
        solution: 'source = {\n    "shop policy": "the help page",\n    "a live order": "a tool that reads the orders",\n    "a product": "search over the product list",\n}\nprint(source["a live order"])\n',
        hint: 'source["a live order"]',
        checks: [{ message: 'Print the tool line', outputEquals: 'a tool that reads the orders' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question type to the chapter that handles it.',
        pairs: [
          ['Products by meaning', 'Chapter 5: embeddings'],
          ['Shop policies', 'Chapter 6: answers from your data'],
          ['Live orders', 'Chapter 7: tools'],
          ['Risky requests', 'Chapter 8: guardrails'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the order question need a tool, not the help page?',
        options: [
          { text: 'The help page is too long', why: 'Length isn\'t the issue; the data isn\'t there.' },
          { text: 'Order status changes constantly and lives in the order system' },
          { text: 'Models can\'t read numbers', why: 'They can; the status just isn\'t in any document.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Can the model answer "How do I wash silk?" by itself?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Never: only the help page.', why: 'General knowledge is what models are good at, with care.' },
          { text: 'Ask a tool.', why: 'There\'s no system that holds washing advice; general knowledge is fine.' },
          { text: 'It\'s general knowledge, so usually yes, briefly. If the product has its own care label, that beats general advice.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The sorting question.',
        template: 'For every question, ask: where would the [[1]] come [[2]]?',
        blanks: [['answer'], ['from']],
        distractors: ['logo', 'to'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'source = {"shop policy": "help page", "a product": "search"}\nprint(len(source))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '4', why: 'It counts the key-value pairs.' },
          { text: 'search', why: 'len() gives the number of entries.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the sort is wrong?',
        lines: [
          'Return policy: help page.',
          'Order R-1042: order tool.',
          'Refund decision: the model decides alone.',
          'Washing silk: general knowledge.',
        ],
        bug: 2,
        fix: 'Refund decision: a person, with the model helping.',
        explanation: 'Decisions that move money go to a person.',
      },
      {
        kind: 'writeCode',
        prompt: 'Count how many question types need data from the shop (anything that isn\'t "the model itself") and print it',
        starter: 'source = {\n    "general care advice": "the model itself",\n    "shop policy": "the help page",\n    "a live order": "a tool",\n    "a product": "search",\n}\ncount = 0\n',
        solution: 'source = {\n    "general care advice": "the model itself",\n    "shop policy": "the help page",\n    "a live order": "a tool",\n    "a product": "search",\n}\ncount = 0\nfor kind, where in source.items():\n    if where != "the model itself":\n        count += 1\nprint(count)\n',
        hint: 'Loop over source.items() and count where != "the model itself"',
        checks: [{ message: 'Print 3', outputEquals: '3' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who should decide a refund for a damaged item? (one word)',
        answers: ['person', 'a person', 'human', 'a human', 'people', 'staff'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of the questions people ask you at work. Which could a model answer by itself, and which need your files, systems or judgement?',
    starters: ['A model could answer...', 'It would need...'],
  },
  deepen: {
    title: 'Grounding',
    summary: 'Connecting a model\'s answers to real sources (documents, databases, tools) is called grounding. Most of the AI stack above the model exists to ground it.',
  },
  notes: 'Question-to-source sort is the course\'s design framework for Chapters 5-8. Grounding = tying model outputs to external sources. Refunds require human approval (Chapter 8 rule).',
};

export default lesson;
