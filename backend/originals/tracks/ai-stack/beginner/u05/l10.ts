import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: the store, top-k, vector databases, indexes. */

const BUILD =
  'import csv\nfrom teyro_ai import VectorStore\n\nstore = VectorStore()\nfor r in csv.DictReader(open("rao_products.csv")):\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]), occasion=r["occasion"])\n';

const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: a searchable shop',
  summary: 'Every product embedded once, top-k search best first, a store that can grow, and indexes for when it does. Quick check before the filters.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Build and search the product store without notes', 'Explain what a vector database adds'],
  learn: [
    {
      kind: 'story',
      title: 'Not zero any more',
      beats: [
        { speaker: 'narrator', text: 'Joel replays Monday\'s question. Three silk outfits come back instead of nothing.' },
        { speaker: 'kavya', text: 'Better. But one is a kids\' set and the lehenga is ₹6,699. The customer wanted something for herself, under ₹5,000.' },
        { speaker: 'joel', text: 'Then we need filters.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: a searchable shop.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the store and print the id of the top hit for "simple cotton kurta for office"',
        starter: BUILD,
        solution: BUILD + 'print(store.search("simple cotton kurta for office", k=1)[0]["id"])\n',
        hint: 'store.search("...", k=1)[0]["id"]',
        checks: [{ message: 'Print P101', outputEquals: 'P101' }],
      },
      {
        kind: 'mcq',
        prompt: 'When are product embeddings made?',
        options: [
          { text: 'Once, ahead of time, and again only when a product changes' },
          { text: 'On every search', why: 'Only the question is embedded per search.' },
          { text: 'Never; the database guesses', why: 'Every product needs a vector.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Embedded text or metadata?',
        groups: ['Embedded', 'Metadata'],
        items: [
          { text: '"Navy silk lehenga for women, for festivals and parties"', group: 0 },
          { text: 'price 6699', group: 1 },
          { text: 'in_stock 1', group: 1 },
          { text: '"Black silk sherwani"', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the scores of the top 3 hits for "something to wear to a shaadi", one per line',
        starter: BUILD,
        solution: BUILD + 'for hit in store.search("something to wear to a shaadi", k=3):\n    print(hit["score"])\n',
        hint: 'for hit in store.search(..., k=3): print(hit["score"])',
        checks: [{ message: 'Print 0.704, 0.703 and 0.702', outputEquals: '0.704\n0.703\n0.702' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Embedding the product list', 'Done once, ahead of time'],
          ['Top-k', 'The k closest, best first'],
          ['Vector database', 'Stores, searches, filters, updates'],
          ['Index', 'Fast search over millions'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line embeds the wrong thing?',
        language: 'python',
        lines: ['for r in csv.DictReader(open("rao_products.csv")):', '    text = r["price_rupees"]', '    store.add(r["product_id"], text, price=int(r["price_rupees"]))'],
        bug: 1,
        fix: '    text = r["name"] + ". " + r["description"]',
        explanation: 'Embed the words that carry meaning; keep price as metadata.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Do we need a vector database company today?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Not for 120 products. Exact search takes milliseconds. We\'ll move when the store grows.' },
          { text: 'Yes, today, the biggest plan.', why: 'Nothing to gain at this size.' },
          { text: 'Never.', why: 'It\'ll be worth it at scale.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'hits = [{"id": "P141", "score": 0.704}, {"id": "P163", "score": 0.703}]\nprint(hits[0]["id"])',
        language: 'python',
        options: [
          { text: 'P141' },
          { text: 'P163', why: 'hits[0] is the first item.' },
          { text: '0.704', why: 'It prints the id.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two halves of search by meaning.',
        template: 'Embed the [[1]] once; embed the [[2]] on every search.',
        blanks: [['products'], ['question']],
        distractors: ['prices', 'model'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order what happens on a search.',
        lines: ['Customer types a question', 'Embed the question', 'Score it against the stored vectors', 'Sort best first', 'Return the top k'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many comparisons does exact search make over Mr Rao\'s products?',
        answers: ['120'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Kavya spotted that the results weren\'t what the customer wanted. What else should a search know about the customer?',
    starters: ['It should know...', 'For example...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 6-9. "simple cotton kurta for office" top = P101 (0.907, tied with P137 and P146; insertion order keeps P101 first). Shaadi top-3 scores 0.704 / 0.703 / 0.702. P176 Navy silk lehenga ₹6,699.',
};

export default lesson;
