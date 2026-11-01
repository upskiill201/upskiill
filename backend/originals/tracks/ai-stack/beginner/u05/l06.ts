import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6 — Embedding a product list: 120 products into a vector store. */

const BUILD =
  'import csv\nfrom teyro_ai import VectorStore\n\nstore = VectorStore()\nfor r in csv.DictReader(open("rao_products.csv")):\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]), occasion=r["occasion"])\n';

const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Embedding a product list',
  summary: 'Joel embeds every product once and keeps the vectors in a store. Four lines of Python, 120 products, and each one remembers its price and stock too.',
  minutes: 12,
  outcomes: [
    'Choose what text to embed for each product',
    'Load 120 products into a vector store',
    'See what each stored item holds',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Search by meaning works in two halves:</p><ol><li><strong>Once, ahead of time</strong>: embed every product and keep the vectors.</li><li><strong>On every question</strong>: embed the question and find the closest products.</li></ol><p>For each product Joel embeds its <strong>name and description</strong> together:</p><pre><code>Teal silk saree. Teal silk saree for women, for weddings and receptions</code></pre><p>That\'s the text that carries meaning. Price and stock aren\'t meaning, so they\'re stored <strong>beside</strong> the vector as <strong>metadata</strong>, ready for filters later.</p><p>Each stored item holds:</p><ul><li><strong>id</strong>: P103</li><li><strong>text</strong>: the line above</li><li><strong>vector</strong>: 24 numbers</li><li><strong>metadata</strong>: price 3299, in_stock 1, occasion "wedding"</li></ul><p>Embedding happens once per product, not once per search. Change a description, and you embed that one product again.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Fill the store',
      caption: 'Every product, embedded once.',
      code: BUILD + '\nprint(len(store), "products")\nfirst = store.items[0]\nprint(first["id"], "|", first["text"])\nprint(len(first["vector"]), "numbers, price", first["price"])\n',
      challenge: 'Print the last product in the store instead.',
    },
  ],
  apply: {
    scenario: 'One vector per product.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the store and print how many products it holds',
        starter: BUILD,
        solution: BUILD + 'print(len(store))\n',
        hint: 'len(store)',
        checks: [{ message: 'Print 120', outputEquals: '120' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why store price as metadata instead of embedding it?',
        options: [
          { text: 'Embeddings can\'t hold numbers', why: 'They\'re all numbers; price just doesn\'t belong in the meaning.' },
          { text: 'Price isn\'t meaning; it\'s used for exact filters like "under ₹3,000"' },
          { text: 'To save money', why: 'It\'s about getting the right results.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Embed it, or keep it as metadata?',
        groups: ['Embed', 'Metadata'],
        items: [
          { text: 'Product name', group: 0 },
          { text: 'Price in rupees', group: 1 },
          { text: 'Description', group: 0 },
          { text: 'In stock: 1 or 0', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of a stored item to its value for P103.',
        pairs: [
          ['id', 'P103'],
          ['vector', '24 numbers'],
          ['price', '3299'],
          ['occasion', 'wedding'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Do we embed all 120 products every time someone searches?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, every search.', why: 'That would waste time and money.' },
          { text: 'Only on Mondays.', why: 'Only when a product is added or changed.' },
          { text: 'No, once, ahead of time. Each search only embeds the question, then compares.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'r = {"name": "Teal silk saree", "description": "for weddings"}\nprint(r["name"] + ". " + r["description"])',
        language: 'python',
        options: [
          { text: 'Teal silk saree. for weddings' },
          { text: 'Teal silk saree for weddings', why: 'The ". " is added between them.' },
          { text: 'r["name"]. r["description"]', why: 'Python looks up the values.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Build the store and print the id of the first item',
        starter: BUILD,
        solution: BUILD + 'print(store.items[0]["id"])\n',
        hint: 'store.items[0]["id"]',
        checks: [{ message: 'Print P101', outputEquals: 'P101' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Adding a product.',
        language: 'python',
        template: 'store.[[1]](r["product_id"], text, [[2]]=int(r["price_rupees"]))',
        blanks: [['add'], ['price']],
        distractors: ['search', 'vector'],
      },
      {
        kind: 'findBug',
        prompt: 'This embeds only the id, so search can\'t find anything by meaning. Which line?',
        language: 'python',
        lines: ['store = VectorStore()', 'for r in csv.DictReader(open("rao_products.csv")):', '    store.add(r["product_id"], r["product_id"])', 'print(len(store))'],
        bug: 2,
        fix: '    store.add(r["product_id"], r["name"] + ". " + r["description"])',
        explanation: 'Embed the words that carry meaning: name and description.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the extra information stored beside a vector, such as price, called?',
        answers: ['metadata', 'meta data'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'If you were describing a product so a search could find it, what would you make sure the description said?',
    starters: ['I\'d mention...', 'Customers would search for...'],
  },
  deepen: {
    title: 'Batch embedding',
    summary: 'Real embedding APIs take many texts per request, and cost per token like models do, but far less. Embedding a 120-product shop costs a fraction of a cent.',
  },
  notes: 'Measured: store built from rao_products.csv holds 120 items; items[0] is P101 "Maroon linen kurta. Maroon linen kurta for men, comfortable for everyday wear", vector length 24. P103 Teal silk saree price 3299, occasion wedding, in stock. Embedding APIs are priced per token, typically far below chat model prices.',
};

export default lesson;
