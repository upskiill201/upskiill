import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 20 — Chapter challenge: search by meaning, properly. */

const BUILD =
  'import csv\nfrom teyro_ai import VectorStore\n\nstore = VectorStore()\nfor r in csv.DictReader(open("rao_products.csv")):\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]),\n              occasion=r["occasion"], category=r["category"])\n';

const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter challenge: search by meaning',
  summary: 'Arjun\'s challenge: "The shoe-shop cousin wants product search too. Show her how it works from scratch: embeddings, scores, filters, a minimum, hybrid ranking." Everything from Chapter 5, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build product search by meaning from the pieces', 'Use everything from Chapter 5 together'],
  learn: [
    {
      kind: 'story',
      title: 'From scratch',
      beats: [
        { speaker: 'arjun', text: 'She\'ll ask why "shaadi" works and "laptop" doesn\'t. I want every step in code.' },
        { speaker: 'joel', text: 'Embeddings, cosine, the store, filters, a minimum score, hybrid. In that order.' },
        { speaker: 'tey', text: 'Then this is the chapter in one go. No hints you haven\'t already used.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 5 challenge: search by meaning.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Write cos(a, b) yourself (no import of cosine) and print the similarity of embed("shoes") and embed("juttis"), rounded to 3 places',
        starter: 'import math\nfrom teyro_ai import embed\n\ndef cos(a, b):\n    return 0\n',
        solution: 'import math\nfrom teyro_ai import embed\n\ndef cos(a, b):\n    dot = sum(x * y for x, y in zip(a, b))\n    return dot / (math.sqrt(sum(x * x for x in a)) * math.sqrt(sum(y * y for y in b)))\n\nprint(round(cos(embed("shoes"), embed("juttis")), 3))\n',
        hint: 'dot product / (length a * length b)',
        checks: [
          { message: 'Print 0.917', outputEquals: '0.917' },
          { message: 'cos works on small vectors too', expr: 'round(cos([1, 1], [1, 0]), 3) == 0.707' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "shaadi" find wedding outfits by meaning but not by keywords?',
        options: [
          { text: 'The products contain "shaadi"', why: 'None do; that\'s why keywords fail.' },
          { text: 'Its embedding points the same way as "wedding", though the word never appears in the products' },
          { text: 'It\'s a product code', why: 'It\'s a word for wedding.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the ids of the top 3 in-stock wedding products for "do you have something for a wedding?", as a list',
        starter: BUILD,
        solution: BUILD + 'hits = store.search("do you have something for a wedding?", k=3, where={"in_stock": 1, "occasion": "wedding"})\nprint([h["id"] for h in hits])\n',
        hint: 'where={"in_stock": 1, "occasion": "wedding"}',
        checks: [{ message: "Print ['P212', 'P203', 'P167']", outputEquals: "['P212', 'P203', 'P167']" }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool handles it: meaning, a filter, or a lookup?',
        groups: ['Meaning', 'Filter', 'Lookup'],
        items: [
          { text: 'shoes for a festival', group: 0 },
          { text: 'under ₹2,000', group: 1 },
          { text: 'P108', group: 2 },
          { text: 'only in stock', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Search "Do you sell laptops?" with k=3, keep hits scoring at least 0.5, and print "no match" if none are left, otherwise the ids',
        starter: BUILD,
        solution: BUILD + 'hits = [h for h in store.search("Do you sell laptops?", k=3) if h["score"] >= 0.5]\nprint([h["id"] for h in hits] if hits else "no match")\n',
        hint: 'Filter by score, then print "no match" if the list is empty',
        checks: [{ message: 'Print no match', outputEquals: 'no match' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to what it measures.',
        pairs: [
          ['24', 'Numbers in a practice embedding'],
          ['0.5', 'The minimum score'],
          ['107', 'Different product texts'],
          ['13', 'Products out of stock'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'The shoe shop\'s descriptions just say "Size 7, black". Will search by meaning work for her?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Perfectly; embeddings need no text.', why: 'They embed the text; thin text gives thin meaning.' },
          { text: 'Use a bigger embedding model.', why: 'The problem is the data, not the model.' },
          { text: 'Barely: there\'s little meaning to embed. Better descriptions ("black leather formal shoes for office") will help more than any model.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Run hybrid ranking for "navy georgette saree" (0.5 meaning + 0.5 share of query words in the text) and print the top id',
        starter: BUILD + '\nimport re\n\ndef words(text):\n    return set(re.findall(r"[a-z0-9]+", text.lower()))\n\nq = "navy georgette saree"\nhits = store.search(q, k=len(store))\n',
        solution: BUILD + '\nimport re\n\ndef words(text):\n    return set(re.findall(r"[a-z0-9]+", text.lower()))\n\nq = "navy georgette saree"\nhits = store.search(q, k=len(store))\nfor h in hits:\n    h["hybrid"] = 0.5 * h["score"] + 0.5 * len(words(q) & words(h["text"])) / len(words(q))\nhits.sort(key=lambda h: -h["hybrid"])\nprint(hits[0]["id"])\n',
        hint: 'Score each hit, sort highest first, print hits[0]["id"]',
        checks: [{ message: 'Print P121', outputEquals: 'P121' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the cousin\'s setup will silently break search?',
        lines: [
          'Embed every product\'s name and description.',
          'Store price and stock as metadata.',
          'Embed customer questions with a different, newer model.',
          'Keep a minimum score of 0.5.',
        ],
        bug: 2,
        fix: 'Use the same embedding model for questions and products.',
        explanation: 'Vectors from different models aren\'t comparable.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import embed, cosine\nprint(round(cosine(embed("cheap kurta"), embed("expensive kurta")), 1))',
        language: 'python',
        options: [
          { text: '1.0' },
          { text: '0.0', why: 'Same topic, so the score is very high (0.973).' },
          { text: '0.5', why: 'It rounds 0.973 to 1.0.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'Meaning finds what\'s [[1]]; filters keep what\'s [[2]].',
        blanks: [['close'], ['allowed']],
        distractors: ['cheap', 'popular'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to build product search.',
        lines: ['Embed every product once', 'Embed the question', 'Filter by stock and occasion', 'Score, then drop anything under 0.5', 'Rank with meaning plus keywords'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the list of numbers that stands for a text\'s meaning called?',
        answers: ['embedding', 'an embedding', 'vector'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'You can now explain why "shaadi" works and "laptop" doesn\'t. What would you change first in a shop\'s search you use?',
    starters: ['I\'d change...', 'Because it...'],
  },
  notes: 'Chapter 5 challenge. Measured with teyro_ai: shoes|juttis 0.917; wedding question in stock + wedding -> [P212, P203, P167]; laptops top 0.36 -> no match at 0.5; hybrid navy georgette saree -> P121; cheap|expensive kurta 0.973 -> 1.0. 107 distinct texts; 13 out of stock.',
};

export default lesson;
