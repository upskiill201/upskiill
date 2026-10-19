import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 12 — Hybrid search: keywords plus meaning. */

const BUILD =
  'import csv, re\nfrom teyro_ai import VectorStore\n\nstore = VectorStore()\nfor r in csv.DictReader(open("rao_products.csv")):\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]))\n\ndef words(text):\n    return set(re.findall(r"[a-z0-9]+", text.lower()))\n\ndef keyword_score(q, text):\n    return len(words(q) & words(text)) / len(words(q))\n';

const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Hybrid search',
  summary: 'A customer types exactly what she wants: "navy georgette saree". Search by meaning shows a maroon one first. Kavya laughs: "Now keyword search would have got it." She\'s right. So Joel uses both.',
  minutes: 12,
  outcomes: [
    'See where meaning beats keywords, and where keywords win',
    'Combine both scores into one',
    'Know when to skip search entirely',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The maroon problem',
      beats: [
        { speaker: 'narrator', text: 'Search by meaning for "navy georgette saree": first, Maroon georgette saree (0.90). The real navy one is fourth (0.84).' },
        { speaker: 'kavya', text: 'Colour isn\'t one of the practice ideas, so meaning can\'t see it. But the words match exactly.' },
        { speaker: 'joel', text: 'Then score both. Half meaning, half "how many of the customer\'s words are in the product".' },
        { speaker: 'narrator', text: 'Hybrid score: Navy georgette saree 0.92. Maroon drops to 0.78.' },
        { speaker: 'kavya', text: 'And when someone types "P121"?' },
        { speaker: 'joel', text: 'That\'s not a search, it\'s a lookup. If it looks like a product code, go straight to that product.' },
        { speaker: 'tey', text: 'That\'s hybrid search: meaning for "something for a shaadi", keywords for "navy georgette", exact lookup for codes. Most real product search works this way.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Meaning, then hybrid',
      caption: '0.5 x meaning + 0.5 x keyword match.',
      code: BUILD + '\nq = "navy georgette saree"\nhits = store.search(q, k=len(store))\nfor h in hits:\n    h["hybrid"] = round(0.5 * h["score"] + 0.5 * keyword_score(q, h["text"]), 3)\nprint("Meaning:", [h["text"].split(".")[0] for h in hits[:2]])\nhits.sort(key=lambda h: -h["hybrid"])\nprint("Hybrid:", [(h["text"].split(".")[0], h["hybrid"]) for h in hits[:2]])\n',
      challenge: 'Try "pink juttis". Does hybrid change the top result?',
    },
  ],
  apply: {
    scenario: 'Both kinds of match.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print keyword_score("navy georgette saree", ...) for the text below',
        starter: 'import re\n\ndef words(text):\n    return set(re.findall(r"[a-z0-9]+", text.lower()))\n\ndef keyword_score(q, text):\n    return len(words(q) & words(text)) / len(words(q))\n\ntext = "Maroon georgette saree. Maroon georgette saree for women"\n',
        solution: 'import re\n\ndef words(text):\n    return set(re.findall(r"[a-z0-9]+", text.lower()))\n\ndef keyword_score(q, text):\n    return len(words(q) & words(text)) / len(words(q))\n\ntext = "Maroon georgette saree. Maroon georgette saree for women"\nprint(round(keyword_score("navy georgette saree", text), 2))\n',
        hint: 'round(keyword_score("navy georgette saree", text), 2)',
        checks: [{ message: 'Print 0.67 (2 of 3 words match)', outputEquals: '0.67' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did meaning alone put the maroon saree first?',
        options: [
          { text: 'Colour isn\'t one of the practice ideas, so navy and maroon look the same to it' },
          { text: 'Maroon is more popular', why: 'Search doesn\'t know popularity.' },
          { text: 'The navy saree is sold out', why: 'It\'s in stock; meaning just can\'t see colour.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Best handled by meaning, keywords, or an exact lookup?',
        groups: ['Meaning', 'Keywords', 'Exact lookup'],
        items: [
          { text: 'something to wear to a shaadi', group: 0 },
          { text: 'navy georgette saree', group: 1 },
          { text: 'P121', group: 2 },
          { text: 'a gift for my daughter for diwali', group: 0 },
          { text: 'order 1042', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the result to its score for "navy georgette saree".',
        pairs: [
          ['Navy, meaning only', '0.842'],
          ['Maroon, meaning only', '0.9'],
          ['Navy, hybrid', '0.921'],
          ['Maroon, hybrid', '0.783'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'So keyword search was right all along?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'For exact words, yes. For "shaadi", no. Each is blind where the other sees, so we use both.' },
          { text: 'Yes, delete the embeddings.', why: 'Then "shaadi" finds nothing again.' },
          { text: 'No, keywords never help.', why: 'They found the navy saree.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(round(0.5 * 0.842 + 0.5 * 1.0, 3))',
        language: 'python',
        options: [
          { text: '0.921' },
          { text: '1.842', why: 'Each score is halved first.' },
          { text: '0.842', why: 'The keyword half adds 0.5.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run hybrid search for "navy georgette saree" and print the top hit\'s id',
        starter: BUILD + '\nq = "navy georgette saree"\nhits = store.search(q, k=len(store))\n',
        solution: BUILD + '\nq = "navy georgette saree"\nhits = store.search(q, k=len(store))\nfor h in hits:\n    h["hybrid"] = 0.5 * h["score"] + 0.5 * keyword_score(q, h["text"])\nhits.sort(key=lambda h: -h["hybrid"])\nprint(hits[0]["id"])\n',
        hint: 'Add a "hybrid" score to each hit, then sort by it',
        checks: [{ message: 'Print P121', outputEquals: 'P121' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The hybrid score.',
        template: 'hybrid = 0.5 x [[1]] score + 0.5 x [[2]] score',
        blanks: [['meaning', 'similarity'], ['keyword']],
        distractors: ['price', 'token'],
      },
      {
        kind: 'findBug',
        prompt: 'This sorts the worst hybrid score first. Which line?',
        language: 'python',
        lines: ['for h in hits:', '    h["hybrid"] = 0.5 * h["score"] + 0.5 * keyword_score(q, h["text"])', 'hits.sort(key=lambda h: h["hybrid"])', 'print(hits[0]["id"])'],
        bug: 2,
        fix: 'hits.sort(key=lambda h: -h["hybrid"])',
        explanation: 'Sort highest first, with the minus sign.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is search that combines keywords and meaning called?',
        answers: ['hybrid', 'hybrid search'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'When you search your own photos or messages, do you type exact words or describe what you mean? Which works better for you?',
    starters: ['I usually type...', 'It works better when...'],
  },
  deepen: {
    title: 'BM25',
    summary: 'Real keyword search usually scores with BM25, which also rewards rare words ("georgette") more than common ones ("for"). Hybrid systems blend it with vector scores.',
  },
  notes: 'Measured: "navy georgette saree" meaning-only top = P157 Maroon georgette saree 0.9, P220 Pink 0.89, P188 Navy chiffon dupatta 0.883; P121 Navy georgette saree 0.842. Keyword score (share of query words in text): P121 1.0, P157 0.667. Hybrid 0.5/0.5: P121 0.921, P157 0.783, P220 0.778. "P121" by meaning returns P179 (0.361): codes need exact lookup. BM25: Robertson et al.',
};

export default lesson;
