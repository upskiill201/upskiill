import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 13 — Prompts vs RAG vs fine-tuning: three ways to change what a model does. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Prompts, RAG or fine-tuning?',
  summary: 'Kavya reads that "serious companies fine-tune". Should Ask Rao? Tey lays out the three ways to change a model\'s answers, from cheapest to most expensive.',
  minutes: 12,
  outcomes: [
    'Tell prompting, RAG and fine-tuning apart',
    'Know which one changes facts and which changes style',
    'Pick the cheapest one that does the job',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Three levers',
      text: 'Start with the prompt: clear instructions cost nothing extra. If the model needs facts it doesn\'t have, add retrieval, also called RAG, so the right lines arrive with each question. Fine-tuning trains the model further on your own examples, which changes its habits and style but is slow to update. Most shop assistants never need it.',
      hotspots: [
        { phrase: 'Start with the prompt', note: 'The system prompt from Chapter 3: tone, length, "say you don\'t know". Change it in seconds and test again.' },
        { phrase: 'RAG', note: 'Retrieval-augmented generation: look up the matching facts (the vector store) and put them in the prompt. Change a price in the help page and the next answer uses it.' },
        { phrase: 'Fine-tuning', note: 'Extra training on hundreds or thousands of example conversations. It shifts how the model writes. It needs data, money and time, and must be redone for each new model.' },
        { phrase: 'slow to update', note: 'Facts baked in by fine-tuning go stale. If delivery becomes free over ₹799, a fine-tuned model still says ₹999 until you train again.' },
        { phrase: 'Most shop assistants never need it', note: 'Prompt plus retrieval covers most help-desk jobs. Fine-tune only after testing shows the cheaper levers can\'t get there.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Which lever?',
      caption: 'A little lookup of problems and fixes.',
      code: 'lever = {\n    "replies are too long": "prompt",\n    "doesn\'t know our prices": "RAG",\n    "must always write in our house style, on every reply": "fine-tuning",\n}\nfor problem, fix in lever.items():\n    print(f"{problem} -> {fix}")\n',
      challenge: 'Add "answers with last month\'s price". Which lever fixes it?',
    },
  ],
  apply: {
    scenario: 'Choosing the lever.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Ask Rao doesn\'t know the shop\'s delivery price. Which lever first?',
        options: [
          { text: 'RAG: put the delivery line from the help page into the prompt' },
          { text: 'Fine-tuning', why: 'Slow, expensive, and the fact goes stale when the price changes.' },
          { text: 'A bigger model', why: 'No model knows Mr Rao\'s prices unless you tell it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Prompt, RAG, or fine-tuning?',
        groups: ['Prompt', 'RAG', 'Fine-tuning'],
        items: [
          { text: '"Keep replies to two sentences"', group: 0 },
          { text: 'Look up the returns rule for each question', group: 1 },
          { text: 'Train on 5,000 past chats to copy the shop\'s tone', group: 2 },
          { text: '"Say you don\'t know if it\'s not in the page"', group: 0 },
          { text: 'Fetch the stock level of the product asked about', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the lever for "doesn\'t know our prices" from the lookup',
        starter: 'lever = {\n    "replies are too long": "prompt",\n    "doesn\'t know our prices": "RAG",\n    "must match our house style": "fine-tuning",\n}\n',
        solution: 'lever = {\n    "replies are too long": "prompt",\n    "doesn\'t know our prices": "RAG",\n    "must match our house style": "fine-tuning",\n}\nprint(lever["doesn\'t know our prices"])\n',
        hint: 'lever["doesn\'t know our prices"]',
        checks: [{ message: 'Print RAG', outputEquals: 'RAG' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lever to how fast you can change it.',
        pairs: [
          ['Prompt', 'Seconds: edit the text'],
          ['RAG', 'Minutes: edit the help page'],
          ['Fine-tuning', 'Days: collect data and train again'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Serious companies fine-tune. Shouldn\'t we?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Only after the cheap levers fail a test. Ours passes 20 of 30, and the misses are retrieval. Fixing RAG is the next step, not fine-tuning.' },
          { text: 'Yes, always fine-tune first.', why: 'It\'s the slowest and most expensive lever.' },
          { text: 'Fine-tuning is never useful.', why: 'It helps with style and narrow formats, when there\'s enough data.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'levers = ["prompt", "RAG", "fine-tuning"]\nprint(levers[0])',
        language: 'python',
        options: [
          { text: 'prompt' },
          { text: 'RAG', why: 'Index 0 is the first item.' },
          { text: 'fine-tuning', why: 'That\'s index 2.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What each lever changes.',
        template: 'RAG changes what the model [[1]]; fine-tuning changes how it [[2]].',
        blanks: [['knows', 'sees'], ['writes', 'behaves']],
        distractors: ['costs', 'runs'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the plan is the wrong lever?',
        lines: [
          'Tone too formal: change the system prompt.',
          'Missing return rules: add retrieval.',
          'Delivery price changed: fine-tune again.',
          'Test all three changes on the 30 questions.',
        ],
        bug: 2,
        fix: 'Delivery price changed: update the help page (RAG picks it up).',
        explanation: 'Changing facts belongs in the documents, not in training.',
      },
      {
        kind: 'mcq',
        prompt: 'What does RAG stand for?',
        options: [
          { text: 'Retrieval-augmented generation' },
          { text: 'Random answer generator', why: 'It\'s about looking up the right facts first.' },
          { text: 'Rapid AI graphics', why: 'Nothing to do with pictures.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which lever should you always try first?',
        answers: ['prompt', 'the prompt', 'prompting'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'New staff can be given a cheat sheet (RAG) or sent on a training course (fine-tuning). When is each the right choice?',
    starters: ['A cheat sheet works when...', 'Training is worth it when...'],
  },
  deepen: {
    title: 'Chapter 6 is RAG',
    summary: 'Ask Rao misses 10 of 30 because it picks the wrong help-page line. Chapter 6 builds real retrieval: splitting the page, embedding, searching and checking.',
  },
  notes: 'RAG = retrieval-augmented generation (Lewis et al., 2020). Common guidance from model providers: try prompting first, then retrieval for knowledge, fine-tune for style/format when you have enough examples. Delivery threshold ₹999 from rao_policies.md; ₹799 is hypothetical.',
};

export default lesson;
