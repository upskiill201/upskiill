import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 17 — Common embedding mistakes. */

const BUILD =
  'import csv\nfrom teyro_ai import VectorStore\n\nstore = VectorStore()\nfor r in csv.DictReader(open("rao_products.csv")):\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]))\n';

const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common embedding mistakes',
  summary: 'Arjun asks for the list again: every search mistake the team nearly made, and what they do instead. One of them would have shown juttis to someone asking about laptops.',
  minutes: 11,
  outcomes: [
    'Name five common embedding mistakes',
    'Add a minimum score so "no match" is possible',
    'Know when vectors must be rebuilt',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Nearly did vs did',
      before: {
        label: 'Nearly did',
        text: 'Always showed the top 3, however low the score.\nEmbedded the whole catalogue as one vector.\nEdited descriptions without re-embedding.\nEmbedded questions with one model and products with another.\nTrusted meaning for prices and stock.',
      },
      after: {
        label: 'Did instead',
        text: 'A minimum score of 0.5: below it, "no match".\nOne vector per product.\nRe-embed a product whenever its text changes.\nOne embedding model for both, always.\nFilters for prices and stock.',
      },
      notes: [
        '"Do you sell laptops?" tops out at 0.36 (Maroon leather juttis). With a 0.5 minimum, Ask Rao says it doesn\'t sell that, instead of offering shoes.',
        'Vectors from different embedding models don\'t share directions. Comparing them gives meaningless scores, with no error message.',
        'Change embedding model, and every product must be embedded again.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'A minimum score',
      caption: 'Without it, every question gets three products.',
      code: BUILD + '\nfor q in ["Do you sell laptops?", "something to wear to a shaadi"]:\n    hits = store.search(q, k=3)\n    good = [h for h in hits if h["score"] >= 0.5]\n    print(q, "| top score:", hits[0]["score"], "| kept:", len(good))\n',
      challenge: 'Try "What is the weather in Pune?".',
    },
  ],
  apply: {
    scenario: 'Not making the usual mistakes.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the top score for "Do you sell laptops?"',
        starter: BUILD,
        solution: BUILD + 'print(store.search("Do you sell laptops?", k=1)[0]["score"])\n',
        hint: 'store.search("...", k=1)[0]["score"]',
        checks: [{ message: 'Print 0.36', outputEquals: '0.36' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why add a minimum score?',
        options: [
          { text: 'To make search faster', why: 'It\'s about honest results.' },
          { text: 'So questions with no good match get "no match" instead of random products' },
          { text: 'Because scores below 0.5 are errors', why: 'They\'re valid, just not close.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Mistake or good practice?',
        groups: ['Mistake', 'Good practice'],
        items: [
          { text: 'One vector for the whole catalogue', group: 0 },
          { text: 'Re-embed a product after editing it', group: 1 },
          { text: 'Different models for questions and products', group: 0 },
          { text: 'A minimum score before showing results', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to what goes wrong.',
        pairs: [
          ['No minimum score', 'Juttis for a laptop question'],
          ['Not re-embedding', 'Search uses the old description'],
          ['Two embedding models', 'Meaningless scores, no error'],
          ['Meaning for prices', 'Cheap and expensive look the same'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'A new embedding model came out. I\'ll switch it just for questions.',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Good idea, questions matter most.', why: 'Both sides must use the same model.' },
          { text: 'Models don\'t matter for search.', why: 'Mixing them breaks it silently.' },
          { text: 'Then the questions and products live in different spaces. Switch both, re-embed all 120 products, and re-test.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'hits = [{"score": 0.36}, {"score": 0.33}, {"score": 0.32}]\nprint(len([h for h in hits if h["score"] >= 0.5]))',
        language: 'python',
        options: [
          { text: '0' },
          { text: '3', why: 'None reaches 0.5.' },
          { text: '0.36', why: 'It counts the hits kept.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Keep only hits scoring at least 0.5 for "What is the weather in Pune?" (k=3) and print how many are left',
        starter: BUILD + '\nhits = store.search("What is the weather in Pune?", k=3)\n',
        solution: BUILD + '\nhits = store.search("What is the weather in Pune?", k=3)\nprint(len([h for h in hits if h["score"] >= 0.5]))\n',
        hint: 'len([h for h in hits if h["score"] >= 0.5])',
        checks: [{ message: 'Print 0', outputEquals: '0' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Two rules.',
        template: 'Use the [[1]] embedding model for questions and products; [[2]] a product whenever its text changes.',
        blanks: [['same'], ['re-embed', 'reembed']],
        distractors: ['biggest', 'delete'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line shows products even for laptop questions?',
        language: 'python',
        lines: ['hits = store.search(q, k=3)', 'hits = [h for h in hits if h["score"] >= 0.0]', 'print(hits or "Sorry, we don\'t sell that.")'],
        bug: 1,
        fix: 'hits = [h for h in hits if h["score"] >= 0.5]',
        explanation: 'A minimum of 0 keeps everything.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What minimum score did the team choose?',
        answers: ['0.5', '.5'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: '"I don\'t know" is better than a wrong answer. Where else would you rather hear "no match" than a guess?',
    starters: ['I\'d rather hear "no match" when...', 'A guess would...'],
  },
  deepen: {
    title: 'Choosing the threshold',
    summary: 'The right minimum depends on the embedding model. Run good and bad questions, look at their scores, and pick a line between them. Re-check it when the model changes.',
  },
  notes: 'Measured: "Do you sell laptops?" top 0.36 (P108 Maroon leather juttis); "What is the weather in Pune?" top 0.271; "Is delivery free?" top 0.087; "something to wear to a shaadi" top 0.704. Threshold 0.5 chosen between them for the practice embeddings. Vectors from different embedding models are not comparable.',
};

export default lesson;
