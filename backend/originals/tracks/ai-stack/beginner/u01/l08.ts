import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8 — Who works on each layer: the companies and jobs behind the stack. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Who works on each layer',
  summary: 'Joel keeps seeing logos he can\'t place. Tey walks him down the stack, from the factories that make chips to the people who check the answers, and where Ask Rao\'s team fits.',
  minutes: 11,
  outcomes: [
    'Place well-known companies and tools on the right layer',
    'Know which layers a small team actually builds',
    'See the jobs in each layer',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'At the very bottom are chips. Companies like Nvidia design the GPUs most AI runs on, and Google designs its own chips, called TPUs. Factories such as TSMC in Taiwan manufacture chips for many of these designers, using machines from ASML in the Netherlands that print the tiniest patterns.', replies: ['And the clouds?'] },
        { tey: 'Cloud providers like AWS, Microsoft Azure and Google Cloud rent that hardware by the hour. Or you can run smaller models on your own machine with a local runtime such as Ollama.', replies: ['Then the models?'] },
        { tey: 'Model labs train the models. Some keep them closed and rent them through an API, like OpenAI\'s GPT models, Anthropic\'s Claude and Google\'s Gemini. Others publish open weights you can download, like Meta\'s Llama, Mistral, DeepSeek and Alibaba\'s Qwen. They\'re built with frameworks such as PyTorch and TensorFlow.', replies: ['And above the model?'] },
        { tey: 'Vector databases like Pinecone, Chroma, Qdrant, Weaviate or Postgres with pgvector store your searchable data. Frameworks like LangChain, LlamaIndex and Haystack help with orchestration. Tools like Ragas and TruLens help evaluate. Teams like Ask Rao\'s mostly work in these top layers, and rent the rest.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'These names are examples of each layer, checked in October 2026, not recommendations. Logos change every year; the jobs don\'t.',
    },
  ],
  apply: {
    scenario: 'Placing the names.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which layer does each example belong to?',
        groups: ['Compute', 'Model', 'Data and retrieval'],
        items: [
          { text: 'GPUs and TPUs', group: 0 },
          { text: 'Llama, Qwen, Claude, Gemini', group: 1 },
          { text: 'A vector database', group: 2 },
          { text: 'A chip factory', group: 0 },
          { text: 'pgvector in Postgres', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many layers Ask Rao\'s team will build themselves',
        starter: 'build = ["Data and retrieval", "Orchestration", "Application", "Evaluation and governance"]\nrent = ["Infrastructure and compute", "Model"]\n',
        solution: 'build = ["Data and retrieval", "Orchestration", "Application", "Evaluation and governance"]\nrent = ["Infrastructure and compute", "Model"]\nprint(len(build))\n',
        hint: 'len(build)',
        checks: [{ message: 'Print 4', outputEquals: '4' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does a "closed" model mean here?',
        options: [
          { text: 'It\'s switched off', why: 'It works fine; you just can\'t download it.' },
          { text: 'It only works at night', why: 'Closed is about access, not hours.' },
          { text: 'You use it through the lab\'s API; you can\'t download the model itself' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the example to its job.',
        pairs: [
          ['TSMC', 'Manufactures chips'],
          ['ASML', 'Makes chip-printing machines'],
          ['A cloud provider', 'Rents hardware by the hour'],
          ['Ollama', 'Runs models on your own machine'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Do we need to know how chips are made to build Ask Rao?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, you must build a chip first.', why: 'You rent the hardware. Understanding it is enough.' },
          { text: 'Not how they\'re made, but what they cost and why they\'re scarce. That shapes prices and speed in every layer above.' },
          { text: 'Chips don\'t matter at all.', why: 'They decide the cost and speed of every answer.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two kinds of model.',
        template: '[[1]] models are used through an API. [[2]]-weight models can be downloaded and run yourself.',
        blanks: [['Closed'], ['Open']],
        distractors: ['Free', 'Heavy'],
      },
      {
        kind: 'mcq',
        prompt: 'Which layers does a small team like Ask Rao\'s usually build itself?',
        options: [
          { text: 'Chips and factories', why: 'Those cost billions. Small teams rent compute.' },
          { text: 'None of them', why: 'The top layers are exactly their job.' },
          { text: 'Data, orchestration, the app and evaluation' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s notes is wrong?',
        lines: [
          'PyTorch and TensorFlow help build and train models.',
          'LangChain and LlamaIndex help with orchestration.',
          'Vector databases design GPUs.',
          'Ragas and TruLens help evaluate answers.',
        ],
        bug: 2,
        fix: 'Vector databases store searchable data.',
        explanation: 'GPUs are designed by chip companies; vector databases store embeddings.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Closed or open-weight model family?',
        groups: ['Closed (API only)', 'Open weights'],
        items: [
          { text: 'GPT (OpenAI)', group: 0 },
          { text: 'Llama (Meta)', group: 1 },
          { text: 'Claude (Anthropic)', group: 0 },
          { text: 'Qwen (Alibaba)', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is Google\'s own AI chip called? (three letters)',
        answers: ['TPU', 'TPUs'],
        placeholder: 'Three letters',
      },
    ],
  },
  reflect: {
    prompt: 'Which layer\'s jobs sound most interesting to you: chips, models, data, orchestration, apps or evaluation? Why?',
    starters: ['The layer I\'d like to work in...', 'Because...'],
  },
  deepen: {
    title: 'Open is a spectrum',
    summary: 'Some models publish weights but restrict how you can use them; others are fully open. "Open-weight" is the careful phrase. Chapter 4 reads the licences.',
  },
  notes: 'Layer examples as of October 2026 (well-established public facts): Nvidia designs GPUs; Google designs TPUs; TSMC (Taiwan) manufactures chips for many designers; ASML (Netherlands) makes lithography machines, including the only EUV systems; AWS, Azure, Google Cloud rent compute; Ollama runs models locally. Closed API models: OpenAI GPT, Anthropic Claude, Google Gemini. Open-weight families: Meta Llama, Mistral (some models), DeepSeek, Alibaba Qwen. Frameworks: PyTorch, TensorFlow. Vector stores: Pinecone, Chroma, Qdrant, Weaviate, pgvector. Orchestration: LangChain, LlamaIndex, Haystack. Evaluation: Ragas, TruLens. Examples, not endorsements; re-check before publishing updates.',
};

export default lesson;
