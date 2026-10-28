import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 11 — Metadata filters: price, stock, occasion. */

const BUILD =
  'import csv\nfrom teyro_ai import VectorStore\n\nstore = VectorStore()\nfor r in csv.DictReader(open("rao_products.csv")):\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]), occasion=r["occasion"],\n              category=r["category"], gender=r["gender"])\n';

const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Metadata filters',
  summary: 'Meaning finds "close". Filters find "allowed": in stock, under ₹5,000, for women, for a wedding. Joel adds them, and the results start looking like what a shop assistant would show.',
  minutes: 12,
  outcomes: [
    'Filter search results by exact metadata',
    'Apply a price limit',
    'Say honestly when nothing matches',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Close, and allowed',
      html: '<p>Similarity can\'t know that a product is sold out or too expensive. That\'s what metadata is for. Two kinds of filter:</p><ol><li><strong>Exact match</strong>, passed to the search: <code>where={"in_stock": 1, "occasion": "wedding"}</code>. Only items matching every key are scored.</li><li><strong>Ranges</strong>, like a price limit. The practice store only does exact matches, so Joel searches everything and keeps hits under the limit:</li></ol><pre><code>hits = store.search(q, k=len(store), where={"in_stock": 1})\nhits = [h for h in hits if h["price"] &lt;= 5000][:3]</code></pre><p>Real vector databases take ranges in the filter itself.</p><p>Watch what filters do to the wedding question:</p><ul><li><strong>No filter</strong>: three embroidered juttis, one of them sold out.</li><li><strong>In stock</strong>: the sold-out pair disappears. Still juttis.</li><li><strong>In stock and occasion = wedding</strong>: Mustard silk lehenga, Green silk lehenga, Peach silk lehenga.</li></ul><p>And sometimes the honest answer is none. "Lehenga under ₹3,000"? The cheapest lehenga is ₹4,799. Zero results, and Ask Rao should say so rather than show sarees instead.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Add the filters one by one',
      caption: 'Same question, three filters.',
      code: BUILD + '\nq = "do you have something for a wedding?"\nfor where in [None, {"in_stock": 1}, {"in_stock": 1, "occasion": "wedding"}]:\n    print(where)\n    for h in store.search(q, k=3, where=where):\n        print("  ", h["id"], h["text"].split(".")[0], h["price"])\n',
      challenge: 'Add "gender": "men" to the last filter.',
    },
  ],
  apply: {
    scenario: 'Only what\'s allowed.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Search "do you have something for a wedding?" with k=1, in stock and occasion "wedding", and print the hit\'s id',
        starter: BUILD,
        solution: BUILD + 'hit = store.search("do you have something for a wedding?", k=1, where={"in_stock": 1, "occasion": "wedding"})[0]\nprint(hit["id"])\n',
        hint: 'where={"in_stock": 1, "occasion": "wedding"}',
        checks: [{ message: 'Print P212', outputEquals: 'P212' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t similarity alone hide sold-out products?',
        options: [
          { text: 'Sold-out products have no vector', why: 'They still have one; stock is separate.' },
          { text: 'Stock isn\'t part of the meaning; it\'s a fact stored as metadata' },
          { text: 'It can, with a bigger k', why: 'Bigger k shows more, sold out or not.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Exact-match filter or range filter?',
        groups: ['Exact match', 'Range'],
        items: [
          { text: 'In stock', group: 0 },
          { text: 'Under ₹5,000', group: 1 },
          { text: 'Occasion is wedding', group: 0 },
          { text: 'Between ₹1,000 and ₹3,000', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Find in-stock lehengas under ₹3,000 and print how many there are',
        starter: BUILD,
        solution: BUILD + 'hits = store.search("lehenga", k=len(store), where={"category": "lehenga", "in_stock": 1})\nprint(len([h for h in hits if h["price"] < 3000]))\n',
        hint: 'Filter by category, then keep hits with price < 3000',
        checks: [{ message: 'Print 0', outputEquals: '0' }],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'No lehengas under ₹3,000. Let\'s just show the closest things under ₹3,000 instead.',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, show sarees as if they were lehengas.', why: 'Customers notice, and stop trusting the search.' },
          { text: 'Show nothing and no message.', why: 'Tell the customer why, and offer something.' },
          { text: 'Say there\'s no lehenga under ₹3,000, then offer the cheapest at ₹4,799 or sarees under budget. Don\'t pretend a saree is a lehenga.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'hits = [{"id": "P121", "price": 4299}, {"id": "P212", "price": 10599}]\nprint([h["id"] for h in hits if h["price"] <= 5000])',
        language: 'python',
        options: [
          { text: "['P121']" },
          { text: "['P121', 'P212']", why: 'P212 costs more than 5000.' },
          { text: "['P212']", why: 'Kept items are the ones at or under 5000.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the filter to the wedding question\'s top hit.',
        pairs: [
          ['No filter', 'Black embroidered juttis'],
          ['In stock and wedding', 'Mustard silk lehenga'],
          ['Women, wedding, up to ₹5,000', 'Navy georgette saree'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'An exact-match filter.',
        language: 'python',
        template: 'store.search(q, k=3, [[1]]={"in_stock": [[2]]})',
        blanks: [['where'], ['1']],
        distractors: ['filter', '0'],
      },
      {
        kind: 'findBug',
        prompt: 'This only filters the first 3 hits by price, so it can return fewer than it should. Which line?',
        language: 'python',
        lines: ['hits = store.search(q, k=3, where={"in_stock": 1})', 'hits = [h for h in hits if h["price"] <= 5000]', 'print(len(hits))'],
        bug: 0,
        fix: 'hits = store.search(q, k=len(store), where={"in_stock": 1})',
        explanation: 'Filter all candidates first, then keep the top 3.',
      },
      {
        kind: 'writeCode',
        prompt: 'Search "wedding outfit for women" for in-stock items at most ₹5,000 and print the top hit\'s id',
        starter: BUILD,
        solution: BUILD + 'hits = store.search("wedding outfit for women", k=len(store), where={"in_stock": 1})\nhits = [h for h in hits if h["price"] <= 5000]\nprint(hits[0]["id"])\n',
        hint: 'Search everything in stock, then keep price <= 5000',
        checks: [{ message: 'Print P121', outputEquals: 'P121' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the cheapest lehenga in the shop, in rupees?',
        answers: ['4799', '4,799', '₹4,799', '₹4799'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'A shop assistant would never show you something sold out. What other rules does a good assistant follow that a search should too?',
    starters: ['A good assistant...', 'So the search should...'],
  },
  deepen: {
    title: 'Pre-filter or post-filter',
    summary: 'Filtering before the vector search is exact but can be slower; filtering after can return too few results. Vector databases handle this for you, but it\'s why "filtered search" is a feature they compete on.',
  },
  notes: 'Measured over rao_products.csv: wedding question no filter -> P135, P117, P144 (P144 out of stock); in_stock -> P135, P117, P189; in_stock + occasion wedding -> P212 Mustard silk lehenga, P203 Green silk lehenga, P167 Peach silk lehenga. "wedding outfit for women" in stock <= 5000 -> P121 (4299); + occasion wedding + women -> P121, P130, P103. Lehengas under 3000: 0; cheapest lehenga 4799. 13 products out of stock.',
};

export default lesson;
