import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8 — What a vector database does. */

const BUILD =
  'import csv\nfrom teyro_ai import VectorStore\n\nstore = VectorStore()\nfor r in csv.DictReader(open("rao_products.csv")):\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]), occasion=r["occasion"])\n';

const lesson: OriginalLesson = {
  key: 'l08',
  title: 'What a vector database does',
  summary: 'Arjun asks the obvious question: "Is that list in Python memory what big companies use?" Not quite. Tey explains what a real vector database adds to Joel\'s 20-line store.',
  minutes: 11,
  outcomes: [
    'Name the jobs a vector database does',
    'Add a new product and find it',
    'Know when a simple store is enough',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Joel\'s VectorStore does the core job: keep vectors with their text and metadata, and return the nearest ones to a question.', replies: ['So what does a real one add?'] },
        { tey: 'Five things. It saves to disk, so a restart doesn\'t lose everything. It handles millions of vectors. It searches fast with an index. It filters by metadata. And it lets you add, update and delete items while people search.', replies: ['Does Ask Rao need all that?'] },
        { tey: 'Not yet. 120 products fit in memory and a search takes a few milliseconds. But the shop will grow, and the help pages and order notes are coming. The ideas are the same at any size.', replies: ['What about new products?'] },
        { tey: 'Add one and it\'s searchable straight away. Try it: add a gold zari sherwani and search for it.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A new product',
      caption: 'Add one, then find it.',
      code: BUILD + '\nstore.add("P999", "Gold zari sherwani. Gold zari sherwani for men, for weddings and receptions",\n          price=12999, in_stock=1, occasion="wedding")\nprint(len(store), "products")\nfor hit in store.search("gold zari sherwani", k=3):\n    print(hit["id"], hit["score"])\n',
      challenge: 'Search "gold sherwani" instead. Is P999 still first?',
    },
  ],
  apply: {
    scenario: 'More than a list.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add P999 (text below) to the store, then print the id of the top hit for "gold zari sherwani"',
        starter: BUILD + '\ntext = "Gold zari sherwani. Gold zari sherwani for men, for weddings and receptions"\n',
        solution: BUILD + '\ntext = "Gold zari sherwani. Gold zari sherwani for men, for weddings and receptions"\nstore.add("P999", text, price=12999, in_stock=1, occasion="wedding")\nprint(store.search("gold zari sherwani", k=1)[0]["id"])\n',
        hint: 'store.add("P999", text, price=12999, in_stock=1, occasion="wedding")',
        checks: [{ message: 'Print P999', outputEquals: 'P999' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which of these is NOT a job of a vector database?',
        options: [
          { text: 'Writing the reply to the customer' },
          { text: 'Finding the nearest vectors', why: 'That\'s its main job.' },
          { text: 'Filtering by metadata', why: 'Most vector databases do this.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does Joel\'s 20-line store do it, or only a real vector database?',
        groups: ['Joel\'s store', 'Real database only'],
        items: [
          { text: 'Return the nearest vectors', group: 0 },
          { text: 'Survive a restart without losing data', group: 1 },
          { text: 'Search millions of vectors fast', group: 1 },
          { text: 'Keep metadata beside each vector', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feature to why it matters.',
        pairs: [
          ['Saving to disk', 'Nothing lost on restart'],
          ['Index', 'Fast search at scale'],
          ['Updates while searching', 'New products appear at once'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Let\'s set up a big cloud vector database today.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'For 120 products? Keep the simple store until we outgrow it. The code that calls search won\'t change much.' },
          { text: 'Yes, the biggest one available.', why: 'Another bill and more setup for no gain yet.' },
          { text: 'Vector databases are a fad.', why: 'They\'re useful at scale; we just aren\'t there.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The store holds 120 products. What does this print?',
        code: 'store.add("P999", "Gold zari sherwani", price=12999)\nprint(len(store))',
        language: 'python',
        options: [
          { text: '121' },
          { text: '120', why: 'add puts one more item in.' },
          { text: 'P999', why: 'len counts items.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The core job.',
        template: 'A vector database stores [[1]] and returns the [[2]] ones to a question.',
        blanks: [['vectors'], ['nearest', 'closest']],
        distractors: ['prices', 'newest'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s notes is wrong?',
        lines: [
          'A vector database keeps vectors with their metadata.',
          'It returns the nearest items to a question.',
          'It writes Ask Rao\'s replies.',
          'It can add new items while people search.',
        ],
        bug: 2,
        fix: 'The model writes replies; the database finds what to show it.',
        explanation: 'Search and writing are different layers of the stack.',
      },
      {
        kind: 'writeCode',
        prompt: 'Add P999 to the store and print the new number of products',
        starter: BUILD,
        solution: BUILD + 'store.add("P999", "Gold zari sherwani. Gold zari sherwani for men, for weddings and receptions", price=12999, in_stock=1, occasion="wedding")\nprint(len(store))\n',
        hint: 'store.add(...) then len(store)',
        checks: [{ message: 'Print 121', outputEquals: '121' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does a vector database use to search millions of vectors fast?',
        answers: ['index', 'an index'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'A notebook and a filing cabinet both hold papers. When does a small shop need the cabinet? How is that like a vector database?',
    starters: ['The notebook is enough until...', 'It\'s like a vector database because...'],
  },
  deepen: {
    title: 'Vectors in your normal database',
    summary: 'Many apps keep vectors in the database they already use. PostgreSQL has the pgvector extension, so products, orders and vectors can live in one place.',
  },
  notes: 'Measured: after adding P999 "Gold zari sherwani. Gold zari sherwani for men, for weddings and receptions", the store holds 121 and "gold zari sherwani" returns P999 first (0.972); "gold sherwani" returns P155 first (0.923). pgvector is an open-source PostgreSQL extension.',
};

export default lesson;
