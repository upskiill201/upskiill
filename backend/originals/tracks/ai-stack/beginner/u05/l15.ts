import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: filters, hybrid search, blind spots, vector databases. */

const BUILD =
  'import csv\nfrom teyro_ai import VectorStore\n\nstore = VectorStore()\nfor r in csv.DictReader(open("rao_products.csv")):\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]), occasion=r["occasion"])\n';

const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: close and allowed',
  summary: 'Filters for what\'s allowed, keywords for exact words, lookups for codes, and a list of blind spots. Quick check before the wedding question gets its proper answer.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Filter and combine searches without notes', 'Name the blind spots and their fixes'],
  learn: [
    {
      kind: 'story',
      title: 'The search card',
      beats: [
        { speaker: 'narrator', text: 'Joel writes a card for the wall: "Meaning for what it\'s about. Keywords for exact words. Filters for what\'s allowed. Lookup for codes."' },
        { speaker: 'kavya', text: 'And a second card: "Never pretend a saree is a lehenga."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: close and allowed.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many products are out of stock (search with k=200 and where={"in_stock": 0})',
        starter: BUILD,
        solution: BUILD + 'print(len(store.search("anything", k=200, where={"in_stock": 0})))\n',
        hint: 'len(store.search("anything", k=200, where={"in_stock": 0}))',
        checks: [{ message: 'Print 13', outputEquals: '13' }],
      },
      {
        kind: 'mcq',
        prompt: 'A customer types "P121". What should Ask Rao do?',
        options: [
          { text: 'Search by meaning', why: 'Codes carry no meaning; it returned a dupatta.' },
          { text: 'Look up product P121 directly' },
          { text: 'Say it doesn\'t understand', why: 'It\'s a valid product code.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Meaning, a filter, or an exact lookup?',
        groups: ['Meaning', 'Filter', 'Lookup'],
        items: [
          { text: 'something for my sister\'s big day', group: 0 },
          { text: 'under ₹3,000', group: 1 },
          { text: 'P205', group: 2 },
          { text: 'only things in stock', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Search "do you have something for a wedding?" in stock with occasion "wedding", k=3, and print the three ids, one per line',
        starter: BUILD,
        solution: BUILD + 'for h in store.search("do you have something for a wedding?", k=3, where={"in_stock": 1, "occasion": "wedding"}):\n    print(h["id"])\n',
        hint: 'where={"in_stock": 1, "occasion": "wedding"}',
        checks: [{ message: 'Print P212, P203 and P167', outputEquals: 'P212\nP203\nP167' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the blind spot to the example.',
        pairs: [
          ['Opposites look alike', 'cheap vs expensive kurta'],
          ['Negation', 'not for a wedding'],
          ['Unknown words', 'nuptials'],
          ['Another script', 'शादी'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line filters too late?',
        language: 'python',
        lines: ['hits = store.search(q, k=3)', 'hits = [h for h in hits if h["price"] <= 5000 and h["in_stock"] == 1]', 'print(hits)'],
        bug: 0,
        fix: 'hits = store.search(q, k=len(store), where={"in_stock": 1})',
        explanation: 'Taking only 3 first can leave nothing after filtering.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Which vector database for Ask Rao?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'The most famous one, today.', why: 'Fit and size decide, not fame.' },
          { text: 'None, ever.', why: 'We\'ll need one as the shop grows.' },
          { text: 'Our products are in PostgreSQL, so pgvector, when we outgrow the in-memory store.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'q = {"navy", "georgette", "saree"}\nt = {"maroon", "georgette", "saree", "for", "women"}\nprint(len(q & t))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '3', why: '"navy" isn\'t in t.' },
          { text: '5', why: '& keeps only words in both.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Joel\'s card.',
        template: 'Meaning for what it\'s [[1]]; filters for what\'s [[2]].',
        blanks: [['about'], ['allowed']],
        distractors: ['worth', 'spelled'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps of a filtered search.',
        lines: ['Embed the question', 'Keep only in-stock items for the occasion', 'Score and sort the rest', 'Drop anything over the price limit', 'Show the top 3, or say none match'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of the shop\'s products are out of stock?',
        answers: ['13', 'thirteen'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four tools (meaning, keywords, filters, lookup) do you think customers will need most at Mr Rao\'s shop? Why?',
    starters: ['Most of all...', 'Because customers...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 11-14. Out of stock: 13. Wedding question in stock + occasion wedding: P212, P203, P167.',
};

export default lesson;
