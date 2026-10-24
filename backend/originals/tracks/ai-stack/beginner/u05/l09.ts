import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9 — Indexes: searching fast by not checking everything. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Indexes: searching fast',
  summary: 'Joel\'s store compares the question with every product: 120 comparisons. Fine today. With a million products it would be a million on every search. Indexes fix that by checking only the right neighbourhood.',
  minutes: 12,
  outcomes: [
    'Explain exact search and why it gets slow',
    'Explain what an index does',
    'Know the trade-off: speed for a tiny chance of missing the best match',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From every product to the right few',
      steps: [
        { title: '1. Exact search', body: 'Joel\'s store scores the question against every product, then sorts. 120 products, 120 comparisons. Always finds the true best.' },
        { title: '2. It grows with the shop', body: 'A million products means a million comparisons per search, for every customer, every time. Too slow for a chat.' },
        { title: '3. An index groups similar vectors', body: 'Built once, ahead of time. Like a shop arranged in aisles: to find a saree, you walk to the saree aisle, not past every shelf.', code: 'aisles = {"saree": [...14 items...], "juttis": [...13 items...]}\n# search one aisle: 14 comparisons, not 120', language: 'python' },
        { title: '4. Approximate, and nearly always right', body: 'Real indexes, such as HNSW, jump between neighbouring vectors to reach the closest area fast. They are approximate: very rarely they miss the true best match. In return, searches over millions take milliseconds.' },
        { title: '5. When to bother', body: 'Under a few thousand items, exact search is fine. Indexes matter when the store gets big.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Count the comparisons',
      caption: 'Searching only one "aisle" of the shop.',
      code: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\naisles = {}\nfor r in rows:\n    aisles.setdefault(r["category"], []).append(r)\n\nprint("Exact search:", len(rows), "comparisons")\nprint("Saree aisle only:", len(aisles["saree"]), "comparisons")\nprint("Aisles:", len(aisles))\n',
      challenge: 'How many comparisons for the juttis aisle?',
    },
  ],
  apply: {
    scenario: 'Fast enough at any size.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Group the products by category and print how many are in the "saree" aisle',
        starter: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\naisles = {}\n',
        solution: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\naisles = {}\nfor r in rows:\n    aisles.setdefault(r["category"], []).append(r)\nprint(len(aisles["saree"]))\n',
        hint: 'aisles.setdefault(r["category"], []).append(r)',
        checks: [{ message: 'Print 14', outputEquals: '14' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does exact search get slow?',
        options: [
          { text: 'Vectors get longer over time', why: 'They stay the same length.' },
          { text: 'It compares the question with every single item' },
          { text: 'It uses a GPU', why: 'The problem is the number of comparisons.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the search to its comparisons.',
        pairs: [
          ['Exact search, 120 products', '120'],
          ['Saree aisle only', '14'],
          ['Exact search, a million products', '1,000,000'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Exact search or an index?',
        groups: ['Exact is fine', 'Use an index'],
        items: [
          { text: 'Mr Rao\'s 120 products', group: 0 },
          { text: 'A marketplace with 5 million listings', group: 1 },
          { text: 'A 30-line help page', group: 0 },
          { text: 'Every support message from the last ten years', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'An approximate index can miss the best match? That sounds bad.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'It misses half the time.', why: 'Good indexes find the true best almost always.' },
          { text: 'Never use one.', why: 'At large scale exact search is too slow.' },
          { text: 'Very rarely, and usually the miss is nearly as good. In return, searches over millions take milliseconds instead of seconds.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'aisles = {}\nfor cat in ["saree", "kurta", "saree"]:\n    aisles.setdefault(cat, []).append(cat)\nprint(len(aisles))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '3', why: 'There are only two different categories.' },
          { text: '1', why: '"saree" and "kurta" are two keys.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many different category aisles the products fall into',
        starter: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\n',
        solution: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\nprint(len(set(r["category"] for r in rows)))\n',
        hint: 'len(set(r["category"] for r in rows))',
        checks: [{ message: 'Print 9', outputEquals: '9' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The trade-off.',
        template: 'An index trades a tiny chance of a [[1]] match for much faster [[2]].',
        blanks: [['missed'], ['search', 'searches']],
        distractors: ['cheaper', 'tokens'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the plan is backwards?',
        lines: [
          'Today: 120 products, exact search.',
          'Each search compares with every product.',
          'Build the index again for every single search.',
          'Add an index when the store reaches many thousands.',
        ],
        bug: 2,
        fix: 'Build the index once, and update it as items are added.',
        explanation: 'The index is built ahead of time; that\'s where its speed comes from.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name the popular graph-based index type mentioned in this lesson.',
        answers: ['HNSW', 'hnsw'],
        placeholder: 'Four letters',
      },
    ],
  },
  reflect: {
    prompt: 'A library uses shelves by subject so you don\'t read every spine. Where else do you search "by aisle" without thinking about it?',
    starters: ['I search by aisle when...', 'It saves time because...'],
  },
  deepen: {
    title: 'HNSW in one sentence',
    summary: 'Hierarchical Navigable Small World graphs link each vector to its neighbours in layers: big jumps at the top, small steps at the bottom, like zooming in on a map.',
  },
  notes: 'rao_products.csv: 9 categories; saree 14, juttis 13 (of 120). HNSW: Malkov and Yashunin, 2016/2018; approximate nearest neighbour search used by many vector databases. Aisle grouping is a teaching analogy (similar in spirit to IVF clustering indexes).',
};

export default lesson;
