import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 14 — Vector databases you'll meet. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Vector databases you\'ll meet',
  summary: 'Arjun keeps hearing names in meetings: Pinecone, pgvector, Qdrant, Chroma. Tey sorts them into three kinds, and gives one question that picks between them.',
  minutes: 11,
  outcomes: [
    'Recognise common vector database names',
    'Sort them into three kinds',
    'Choose one for a small shop',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Three kinds. One: vector search added to a database you already have. pgvector for PostgreSQL is the best known; many others have it too.', replies: ['Two?'] },
        { tey: 'Two: databases built just for vectors. Pinecone is a hosted service. Weaviate, Qdrant and Milvus are open source you can host yourself, or pay them to host.', replies: ['And three?'] },
        { tey: 'Three: libraries that run inside your program. FAISS, from Meta, and Chroma for quick projects. Fast and free, but you look after saving and scaling.', replies: ['Which for Ask Rao?'] },
        { tey: 'Ask one question: where does the rest of the shop\'s data live? If products and orders are already in PostgreSQL, pgvector keeps everything in one place. One less service to pay for and watch.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Sort the names',
      caption: 'A little lookup of the three kinds.',
      code: 'kinds = {\n    "pgvector": "added to a database you have",\n    "Pinecone": "vector database, hosted",\n    "Qdrant": "vector database, open source",\n    "FAISS": "library inside your program",\n    "Chroma": "library inside your program",\n}\nfor name, kind in kinds.items():\n    print(f"{name}: {kind}")\n',
      challenge: 'Add Weaviate and Milvus.',
    },
  ],
  apply: {
    scenario: 'Names you\'ll hear.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The shop\'s products and orders already live in PostgreSQL. Which is the simplest start?',
        options: [
          { text: 'A new hosted vector database', why: 'Another service and bill, for 120 products.' },
          { text: 'pgvector, so vectors sit beside the products' },
          { text: 'Build our own database', why: 'Far more work than adding an extension.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which kind is it?',
        groups: ['Added to a database', 'Built for vectors', 'Library'],
        items: [
          { text: 'pgvector', group: 0 },
          { text: 'Pinecone', group: 1 },
          { text: 'Qdrant', group: 1 },
          { text: 'FAISS', group: 2 },
          { text: 'Chroma', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the kind of "FAISS" from the lookup',
        starter: 'kinds = {\n    "pgvector": "added to a database",\n    "Pinecone": "built for vectors",\n    "FAISS": "library",\n}\n',
        solution: 'kinds = {\n    "pgvector": "added to a database",\n    "Pinecone": "built for vectors",\n    "FAISS": "library",\n}\nprint(kinds["FAISS"])\n',
        hint: 'kinds["FAISS"]',
        checks: [{ message: 'Print library', outputEquals: 'library' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the name to the fact.',
        pairs: [
          ['pgvector', 'An extension for PostgreSQL'],
          ['Pinecone', 'A hosted vector service'],
          ['FAISS', 'A search library from Meta'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Which vector database is the best one?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Always the most expensive.', why: 'Price isn\'t the test.' },
          { text: 'They\'re all identical.', why: 'They differ in hosting, scale and features.' },
          { text: 'The one that fits where your data already lives and your size. For a small shop on PostgreSQL, pgvector. Test before you move.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'kinds = {"pgvector": "added", "Pinecone": "built", "FAISS": "library"}\nprint(len(kinds))',
        language: 'python',
        options: [
          { text: '3' },
          { text: '6', why: 'len counts keys.' },
          { text: 'pgvector', why: 'It prints the count.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The one question.',
        template: 'Where does the rest of the shop\'s [[1]] live? Put the [[2]] there too, if you can.',
        blanks: [['data'], ['vectors']],
        distractors: ['GPUs', 'models'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the notes is wrong?',
        lines: [
          'pgvector adds vector search to PostgreSQL.',
          'Pinecone is a hosted vector database.',
          'FAISS is a hosted service you pay monthly for.',
          'Chroma is popular for quick projects.',
        ],
        bug: 2,
        fix: 'FAISS is a free library that runs inside your program.',
        explanation: 'FAISS is open source code, not a hosted service.',
      },
      {
        kind: 'mcq',
        prompt: 'What does a library like FAISS leave for you to handle?',
        options: [
          { text: 'Computing similarity', why: 'That\'s exactly what it does.' },
          { text: 'Nothing at all', why: 'You look after storage and scaling.' },
          { text: 'Saving the vectors and scaling to more machines' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which PostgreSQL extension adds vector search?',
        answers: ['pgvector'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever added a new app for something an app you already used could do? What did it cost you?',
    starters: ['I added...', 'It cost me...'],
  },
  deepen: {
    title: 'Moving later is fine',
    summary: 'Vectors can be rebuilt from your text at any time. Keep the code that calls search small and in one place, and changing database later is a day\'s work, not a rewrite.',
  },
  notes: 'pgvector: open-source PostgreSQL extension. Pinecone: managed vector database service. Weaviate, Qdrant, Milvus: open-source vector databases with managed options. FAISS: open-source similarity search library from Meta AI Research. Chroma: open-source embedding database popular for prototypes.',
};

export default lesson;
