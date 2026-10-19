import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 18 — Reading search results: scores, ties and duplicates. */

const BUILD =
  'import csv\nfrom teyro_ai import VectorStore\n\nstore = VectorStore()\nfor r in csv.DictReader(open("rao_products.csv")):\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]))\n';

const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading search results',
  summary: 'Kavya searches "simple cotton kurta for office" and gets five results, all scoring exactly 0.907. Two are the same maroon kurta at different prices. Joel shows her how to read a results list like an engineer.',
  minutes: 12,
  outcomes: [
    'Read scores, gaps and ties',
    'Spot duplicate products in results',
    'Remove duplicates in Python',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Five things to look at',
      html: '<p>Results for "simple cotton kurta for office":</p><pre><code>P101  Maroon linen kurta    0.907  ₹799\nP137  Maroon linen kurta    0.907  ₹1,099\nP146  Mustard linen kurta   0.907  ₹1,599\nP200  Red linen kurta       0.907  ₹999\nP218  Maroon cotton kurta   0.907  ₹2,499</code></pre><ol><li><strong>The top score</strong>: 0.907 is well above the 0.5 minimum, so the match is real.</li><li><strong>The gaps</strong>: all five are tied. The order among them means nothing; it\'s just the order they were added.</li><li><strong>Duplicates</strong>: P101 and P137 have the same text. To search they\'re one product, and showing both wastes a slot. Only 107 of the 120 product texts are different.</li><li><strong>What meaning missed</strong>: the customer said "cotton", and only the last one is cotton. That\'s a job for keywords (lesson 12).</li><li><strong>What a tie-break should be</strong>: when scores tie, pick by something useful, such as the lowest price or in stock first.</li></ol>',
    },
    {
      kind: 'tryIt',
      title: 'Remove duplicates',
      caption: 'Keep the first hit for each different text.',
      code: BUILD + '\nhits = store.search("simple cotton kurta for office", k=len(store))\nseen = set()\nunique = []\nfor h in hits:\n    if h["text"] not in seen:\n        seen.add(h["text"])\n        unique.append(h)\nfor h in unique[:3]:\n    print(h["id"], h["text"].split(".")[0], h["score"], h["price"])\n',
      challenge: 'Among tied hits, keep the cheapest instead of the first.',
    },
  ],
  apply: {
    scenario: 'What the list is telling you.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many different product texts there are among the 120 products',
        starter: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\n',
        solution: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\nprint(len(set(r["name"] + ". " + r["description"] for r in rows)))\n',
        hint: 'len(set(... for r in rows))',
        checks: [{ message: 'Print 107', outputEquals: '107' }],
      },
      {
        kind: 'mcq',
        prompt: 'Five hits all score 0.907. What does their order tell you?',
        options: [
          { text: 'Nothing: they\'re tied, so the order is just the order they were added' },
          { text: 'The first is the best match', why: 'They\'re equally close.' },
          { text: 'The search is broken', why: 'Ties are normal when texts are similar.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A good sign or a warning sign in a results list?',
        groups: ['Good sign', 'Warning sign'],
        items: [
          { text: 'Top score well above the minimum', group: 0 },
          { text: 'The same product twice', group: 1 },
          { text: 'A clear gap after the first hit', group: 0 },
          { text: 'Top score just above the minimum', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what you see to what to do.',
        pairs: [
          ['Duplicates', 'Keep one per text'],
          ['A tie', 'Break it by price or stock'],
          ['A low top score', 'Say there\'s no good match'],
          ['A missed word like "cotton"', 'Add keyword scoring'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'P101 and P137 are the same kurta at ₹799 and ₹1,099. Which should Ask Rao show?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'One of them, probably ₹799, and flag the duplicate to Mr Rao. The same item at two prices confuses customers.' },
          { text: 'Both, side by side.', why: 'It wastes a slot and looks like an error.' },
          { text: 'Neither.', why: 'It\'s a good match; just show it once.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'texts = ["Maroon linen kurta", "Maroon linen kurta", "Red linen kurta"]\nprint(len(set(texts)))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '3', why: 'A set keeps each value once.' },
          { text: '1', why: 'There are two different texts.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Remove duplicate texts from the hits for "simple cotton kurta for office" and print the second unique hit\'s id',
        starter: BUILD + '\nhits = store.search("simple cotton kurta for office", k=len(store))\nseen = set()\nunique = []\n',
        solution: BUILD + '\nhits = store.search("simple cotton kurta for office", k=len(store))\nseen = set()\nunique = []\nfor h in hits:\n    if h["text"] not in seen:\n        seen.add(h["text"])\n        unique.append(h)\nprint(unique[1]["id"])\n',
        hint: 'Only append hits whose text isn\'t in seen yet',
        checks: [{ message: 'Print P146', outputEquals: 'P146' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Reading ties.',
        template: 'When scores [[1]], the order means nothing; break the tie by [[2]].',
        blanks: [['tie'], ['price', 'stock']],
        distractors: ['rise', 'colour'],
      },
      {
        kind: 'findBug',
        prompt: 'Which reading of the results is wrong?',
        lines: [
          'Top score 0.907: a real match.',
          'All five tied: order doesn\'t matter.',
          'P101 is first, so it\'s the best kurta in the shop.',
          'P101 and P137 are duplicates.',
        ],
        bug: 2,
        fix: 'P101 is first only because it was added first.',
        explanation: 'Tied scores carry no ranking.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many different product texts does the shop have?',
        answers: ['107'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When you see search results, what makes you trust them or doubt them?',
    starters: ['I trust results when...', 'I doubt them when...'],
  },
  deepen: {
    title: 'Logging searches',
    summary: 'Save every search with its top scores. Low scores show what customers want that the shop doesn\'t describe, which is great feedback for Mr Rao\'s product list.',
  },
  notes: 'Measured: "simple cotton kurta for office" top-5 all 0.907: P101 Maroon linen kurta 799, P137 Maroon linen kurta 1099, P146 Mustard linen kurta 1599, P200 Red linen kurta 999, P218 Maroon cotton kurta 2499. After removing duplicate texts: P101, P146, P200. 107 distinct texts (name + description) and 95 distinct names among 120 products. Ties keep insertion order (stable sort).',
};

export default lesson;
