import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1 — Why keyword search fails: the shaadi question finds nothing. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Why keyword search fails',
  summary: 'A customer types "something to wear to a shaadi". Kavya\'s product search finds nothing, though the shop has 29 wedding outfits. The words don\'t match, but the meaning does.',
  minutes: 11,
  outcomes: [
    'See why matching words misses what customers mean',
    'Count keyword matches in the product list',
    'Know what search by meaning has to do instead',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Zero results',
      beats: [
        { speaker: 'narrator', text: 'Monday, 9:14. A message on Ask Rao: "do you have something for a wedding?"' },
        { speaker: 'kavya', text: 'Easy. My search looks for the question inside each product description.' },
        { speaker: 'narrator', text: 'Zero results. No description contains "do you have something for a wedding?".' },
        { speaker: 'kavya', text: 'Fine, one word at a time then. "shaadi"?' },
        { speaker: 'narrator', text: 'Zero again. The products say "for weddings and receptions". Not one says "shaadi".' },
        { speaker: 'joel', text: 'We have 29 wedding outfits. The customer means them. The words just don\'t match.' },
        { speaker: 'tey', text: 'Keyword search matches spelling. Customers type meaning. This chapter turns words into numbers, so "shaadi" and "wedding" end up close together.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Kavya\'s search',
      caption: 'The question, then a single word, then a different word with the same meaning.',
      code: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\ndef text(r):\n    return (r["name"] + ". " + r["description"]).lower()\n\nfor search in ["do you have something for a wedding?", "wedding", "shaadi"]:\n    hits = [r for r in rows if search in text(r)]\n    print(f"{search!r}: {len(hits)} products")\n',
      challenge: 'Try "diwali" and "festival". Which one finds products?',
    },
  ],
  apply: {
    scenario: 'When words don\'t match.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Count the products whose name or description contains "wedding" and print the number',
        starter: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\ndef text(r):\n    return (r["name"] + ". " + r["description"]).lower()\n',
        solution: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\ndef text(r):\n    return (r["name"] + ". " + r["description"]).lower()\n\nprint(len([r for r in rows if "wedding" in text(r)]))\n',
        hint: 'len([r for r in rows if "wedding" in text(r)])',
        checks: [{ message: 'Print 29', outputEquals: '29' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "shaadi" find no products?',
        options: [
          { text: 'No product text contains that word, even though the meaning matches' },
          { text: 'The shop sells no wedding clothes', why: 'It has 29.' },
          { text: 'Python can\'t search Hindi words', why: 'It can; the word just isn\'t in the descriptions.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Would Kavya\'s keyword search find wedding products for this message?',
        groups: ['Finds them', 'Finds nothing'],
        items: [
          { text: 'wedding', group: 0 },
          { text: 'shaadi', group: 1 },
          { text: 'something for my sister\'s big day', group: 1 },
          { text: 'weddings', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the search to how many products it finds.',
        pairs: [
          ['The whole question', '0 products'],
          ['"wedding"', '29 products'],
          ['Every product', '120 products'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'I\'ll just add "shaadi" to every wedding description.',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Then "my sister\'s big day" fails, and "nikah", and a hundred others. We need search that matches meaning, not a longer word list.' },
          { text: 'Perfect, that fixes it for good.', why: 'Customers have endless ways to say the same thing.' },
          { text: 'Delete the search box.', why: 'Customers need search; it just has to understand them.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'description = "teal silk saree for women, for weddings and receptions"\nprint("shaadi" in description, "wedding" in description)',
        language: 'python',
        options: [
          { text: 'False True' },
          { text: 'True True', why: '"shaadi" isn\'t in the text.' },
          { text: 'False False', why: '"wedding" is inside "weddings".' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Count the products containing "shaadi" and print the number',
        starter: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\ndef text(r):\n    return (r["name"] + ". " + r["description"]).lower()\n\nprint(len(rows))\n',
        solution: 'import csv\n\nrows = list(csv.DictReader(open("rao_products.csv")))\ndef text(r):\n    return (r["name"] + ". " + r["description"]).lower()\n\nprint(len([r for r in rows if "shaadi" in text(r)]))\n',
        hint: 'Same as before, with "shaadi"',
        checks: [{ message: 'Print 0', outputEquals: '0' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The problem in one line.',
        template: 'Keyword search matches [[1]]; customers type [[2]].',
        blanks: [['spelling', 'words'], ['meaning']],
        distractors: ['prices', 'tokens'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the search find nothing for almost every question?',
        language: 'python',
        lines: ['question = "do you have something for a wedding?"', 'hits = [r for r in rows if question in text(r)]', 'print(len(hits))'],
        bug: 1,
        fix: 'Search by meaning instead of looking for the whole question inside each description.',
        explanation: 'No description contains a whole customer question word for word.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many products are in the shop\'s product list?',
        answers: ['120'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time a search box found nothing although you knew the thing existed. What words did you try?',
    starters: ['I searched for...', 'It was listed as...'],
  },
  deepen: {
    title: 'Synonyms by hand',
    summary: 'Before embeddings, shops kept long synonym lists ("shaadi = wedding"). They help, but someone has to keep adding to them. Embeddings learn closeness from huge amounts of text instead.',
  },
  notes: 'Measured on rao_products.csv (120 rows), text = name + ". " + description, lowercased: the whole question 0 matches, "wedding" 29, "shaadi" 0. occasion=wedding also counts 29.',
};

export default lesson;
