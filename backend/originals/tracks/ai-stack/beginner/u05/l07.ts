import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7 — Top-k search: the k closest products, best first. */

const BUILD =
  'import csv\nfrom teyro_ai import VectorStore\n\nstore = VectorStore()\nfor r in csv.DictReader(open("rao_products.csv")):\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]), occasion=r["occasion"])\n';

const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Top-k search',
  summary: 'Joel types the shaadi question into the new search. Instead of zero results, he gets a silk sherwani, a silk kids\' set and a silk lehenga. How many results should Ask Rao show?',
  minutes: 12,
  outcomes: [
    'Run a top-k search',
    'Read the score of each hit',
    'Choose k for a job',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Small k vs big k',
      before: {
        label: 'k = 1',
        text: 'Only the single closest product.\nFast and tidy.\nBut if the top one is wrong, nothing else is shown.\nThe shaadi search: Black silk sherwani, 0.704.',
      },
      after: {
        label: 'k = 5',
        text: 'The five closest, best first.\nMore chances to show the right thing.\nMore to read on a phone, and more tokens if sent to a model.\nThe shaadi search adds two more kids\' sets.',
      },
      notes: [
        'search(question, k) embeds the question, scores every product and keeps the top k.',
        'The top three shaadi scores are 0.704, 0.703 and 0.702: nearly a tie. Small gaps mean the order isn\'t very meaningful.',
        'For a shop, k = 3 is a good start: enough choice, still short.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Search by meaning',
      caption: 'The question that found nothing in lesson 1.',
      code: BUILD + '\nfor hit in store.search("something to wear to a shaadi", k=3):\n    print(hit["id"], hit["text"].split(".")[0], hit["score"])\n',
      challenge: 'Change k to 5. What gets added?',
    },
  ],
  apply: {
    scenario: 'The closest few.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Search for "something to wear to a shaadi" with k=1 and print the id of the hit',
        starter: BUILD,
        solution: BUILD + 'print(store.search("something to wear to a shaadi", k=1)[0]["id"])\n',
        hint: 'store.search("...", k=1)[0]["id"]',
        checks: [{ message: 'Print P141', outputEquals: 'P141' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does k mean in a top-k search?',
        options: [
          { text: 'How many of the closest results to return' },
          { text: 'The minimum score', why: 'That\'s a threshold, a different setting.' },
          { text: 'The number of products in the store', why: 'k is how many results come back.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the shaadi hit to its score.',
        pairs: [
          ['Black silk sherwani', '0.704'],
          ['Pink silk kids kurta set', '0.703'],
          ['Navy silk lehenga', '0.702'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Small k or bigger k?',
        groups: ['Small k (1-3)', 'Bigger k (5-10)'],
        items: [
          { text: 'Three suggestions in a phone chat', group: 0 },
          { text: 'A "see more" results page', group: 1 },
          { text: 'One quick "did you mean" answer', group: 0 },
          { text: 'Giving staff lots of options to choose from', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'The top three scores are 0.704, 0.703 and 0.702. So the sherwani is clearly best?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Not clearly: they\'re almost tied. Show all three and let the customer pick.' },
          { text: 'Yes, it\'s first, so it\'s best.', why: 'A 0.001 gap is too small to mean much.' },
          { text: 'Ties mean the search is broken.', why: 'They mean the products are equally close.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The store holds 120 products. What does this print?',
        code: 'hits = store.search("kurta", k=5)\nprint(len(hits))',
        language: 'python',
        options: [
          { text: '5' },
          { text: '120', why: 'Only the top k are returned.' },
          { text: '1', why: 'k=5 returns five.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Search "wedding outfit for women" with k=3 and print the top hit\'s score',
        starter: BUILD,
        solution: BUILD + 'print(store.search("wedding outfit for women", k=3)[0]["score"])\n',
        hint: 'store.search("...", k=3)[0]["score"]',
        checks: [{ message: 'Print 0.971', outputEquals: '0.971' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'A top-3 search.',
        language: 'python',
        template: 'hits = store.[[1]]("something to wear to a shaadi", [[2]]=3)',
        blanks: [['search'], ['k']],
        distractors: ['add', 'n'],
      },
      {
        kind: 'findBug',
        prompt: 'This prints the worst of the three, not the best. Which line?',
        language: 'python',
        lines: ['hits = store.search("shaadi outfit", k=3)', 'best = hits[-1]', 'print(best["id"])'],
        bug: 1,
        fix: 'best = hits[0]',
        explanation: 'Results come best first, so the best is hits[0].',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What k does Joel suggest starting with for the shop?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When you search a shop, how many results do you actually look at? What does that say about k?',
    starters: ['I usually look at...', 'So k should be...'],
  },
  deepen: {
    title: 'Re-ranking',
    summary: 'Some systems fetch a bigger k (say 20), then use a second, more careful model to re-order them and keep the best 3. It\'s slower, but the order is better.',
  },
  notes: 'Measured with teyro_ai over rao_products.csv: "something to wear to a shaadi" top-5 = P141 Black silk sherwani 0.704, P163 Pink silk kids kurta set 0.703, P176 Navy silk lehenga 0.702, P172 0.699, P154 0.693. "wedding outfit for women" top = P121 Navy georgette saree 0.971.',
};

export default lesson;
