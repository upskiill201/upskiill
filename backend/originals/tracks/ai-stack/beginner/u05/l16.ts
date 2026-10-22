import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 16 — The wedding question: meaning alone puts juttis first. */

const BUILD =
  'import csv\nfrom teyro_ai import VectorStore\n\nstore = VectorStore()\nfor r in csv.DictReader(open("rao_products.csv")):\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]),\n              occasion=r["occasion"], category=r["category"])\n';

const lesson: OriginalLesson = {
  key: 'l16',
  title: 'The wedding question',
  summary: 'Mr Rao tests the search himself: "do you have something for a wedding?" Top answer: black embroidered juttis. "Shoes? For a wedding outfit?" Fact or myth: what went wrong, and what fixes it?',
  minutes: 12,
  outcomes: [
    'Explain why meaning alone put juttis first',
    'Fix it with filters',
    'Spot when filters are too strict',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The top search result is what the customer wants.',
          isFact: false,
          explain: 'Myth. It\'s the closest by meaning. For the wedding question that\'s Black embroidered juttis (0.80): festive, yes, but not an outfit.',
        },
        {
          text: 'Juttis win because "embroidered" and "festivals" are festive words too.',
          isFact: true,
          explain: 'Fact. The practice embeddings put weddings, festivals and embroidery in the same "festive" direction, so festive juttis look very close.',
        },
        {
          text: 'Filtering to in-stock wedding products puts outfits first.',
          isFact: true,
          explain: 'Fact. With where={"in_stock": 1, "occasion": "wedding"}: Mustard, Green and Peach silk lehengas.',
        },
        {
          text: 'Adding more filters can only make results better.',
          isFact: false,
          explain: 'Myth. "kurta for my husband for a wedding" with a kurta filter and a wedding filter finds nothing: the shop marks kurtas festive, never wedding. Filters are only as good as the metadata.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Too loose, right, too strict',
      caption: 'One question, three filters.',
      code: BUILD + '\nq = "do you have something for a wedding?"\nprint("No filter:", [h["id"] for h in store.search(q, k=3)])\nprint("Wedding:", [h["id"] for h in store.search(q, k=3, where={"in_stock": 1, "occasion": "wedding"})])\nstrict = {"in_stock": 1, "occasion": "wedding", "category": "kurta"}\nprint("Wedding kurtas:", store.search("kurta for my husband for a wedding", k=3, where=strict))\n',
      challenge: 'Change the strict filter\'s occasion to "festive". What comes back?',
    },
  ],
  apply: {
    scenario: 'Getting the wedding question right.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the id of the top hit for "do you have something for a wedding?" with no filter',
        starter: BUILD,
        solution: BUILD + 'print(store.search("do you have something for a wedding?", k=1)[0]["id"])\n',
        hint: 'store.search("...", k=1)[0]["id"]',
        checks: [{ message: 'Print P135', outputEquals: 'P135' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did juttis beat wedding outfits?',
        options: [
          { text: 'Juttis are the most popular product', why: 'Search doesn\'t know popularity.' },
          { text: 'Festive words like "embroidered" point the same way as "wedding", and meaning can\'t tell an outfit from shoes here' },
          { text: 'The wedding outfits are all sold out', why: 'Most are in stock.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Filter too loose, about right, or too strict for "something for a wedding"?',
        groups: ['Too loose', 'About right', 'Too strict'],
        items: [
          { text: 'No filter at all', group: 0 },
          { text: 'In stock, occasion wedding', group: 1 },
          { text: 'In stock, wedding, kurta, under ₹500', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many in-stock wedding kurtas the shop has (category "kurta", occasion "wedding")',
        starter: BUILD,
        solution: BUILD + 'print(len(store.search("kurta", k=200, where={"in_stock": 1, "occasion": "wedding", "category": "kurta"})))\n',
        hint: 'where={"in_stock": 1, "occasion": "wedding", "category": "kurta"}',
        checks: [{ message: 'Print 0', outputEquals: '0' }],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'No wedding kurtas! Should Ask Rao just say "nothing found"?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, "nothing found" and stop.', why: 'Offer the nearest good options.' },
          { text: 'Show juttis instead.', why: 'He asked for a kurta.' },
          { text: 'Say there\'s no kurta marked for weddings, then offer festive kurtas or sherwanis. And ask Mr Rao if some kurtas should be tagged for weddings.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'where = {"in_stock": 1}\nwhere["occasion"] = "wedding"\nprint(len(where))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '1', why: 'A second key was added.' },
          { text: 'wedding', why: 'len counts keys.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the filter to what the wedding question gets.',
        pairs: [
          ['No filter', 'Embroidered juttis'],
          ['In stock and wedding', 'Silk lehengas'],
          ['Wedding and kurta', 'Nothing at all'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The lesson.',
        template: 'Filters are only as good as the [[1]]; check it before you trust a [[2]] result.',
        blanks: [['metadata', 'data'], ['empty', 'zero']],
        distractors: ['GPU', 'embedding'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s fix is the risky one?',
        lines: [
          'Filter to in-stock items.',
          'Filter to occasion wedding when the question says wedding or shaadi.',
          'If nothing matches, show the unfiltered top 3 without saying so.',
          'Ask Mr Rao to check the occasion tags.',
        ],
        bug: 2,
        fix: 'If nothing matches, say so, then offer the closest options clearly labelled.',
        explanation: 'Silently showing unrelated items is how the juttis appeared in the first place.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which is the only men\'s clothing category tagged for weddings? (sherwani or kurta)',
        answers: ['sherwani', 'sherwanis'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Mr Rao laughed at the juttis, but a customer might just leave. What does one bad first result cost a shop?',
    starters: ['One bad result...', 'The customer would think...'],
  },
  deepen: {
    title: 'Data quality is search quality',
    summary: 'Most search problems in real shops come from the product data: missing tags, vague descriptions, wrong categories. Fixing the data often beats changing the model.',
  },
  notes: 'Measured: wedding question no filter top-3 P135, P117, P144 (juttis, 0.802 / 0.798 / 0.784); in_stock + occasion wedding -> P212, P203, P167 (silk lehengas). rao_products.csv has no kurta with occasion wedding (kurtas are everyday, festive or office); men\'s wedding category = sherwani. Strict filter returns [].',
};

export default lesson;
