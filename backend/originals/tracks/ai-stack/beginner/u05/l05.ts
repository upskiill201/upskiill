import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: keyword limits, embeddings, similarity, cosine. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: meaning as numbers',
  summary: 'Keyword search misses meaning, embeddings turn text into vectors, close means similar, and cosine is four lines of Python. Quick check before Joel embeds all 120 products.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Embed and compare texts without notes', 'Explain why meaning beats spelling'],
  learn: [
    {
      kind: 'story',
      title: 'Arrows on a napkin',
      beats: [
        { speaker: 'narrator', text: 'Kavya draws two arrows on a napkin, almost on top of each other. She labels them "wedding" and "shaadi".' },
        { speaker: 'kavya', text: 'Okay. I get it. Now do it for every product.' },
        { speaker: 'joel', text: 'That\'s the next lesson.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: meaning as numbers.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the similarity of "wedding outfit" and "festive lehenga", rounded to 3 places',
        starter: 'from teyro_ai import embed, cosine\n',
        solution: 'from teyro_ai import embed, cosine\nprint(round(cosine(embed("wedding outfit"), embed("festive lehenga")), 3))\n',
        hint: 'round(cosine(embed(a), embed(b)), 3)',
        checks: [{ message: 'Print 0.806', outputEquals: '0.806' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did "shaadi" find no products with keyword search?',
        options: [
          { text: 'No product text contains the word' },
          { text: 'There are no wedding products', why: 'There are 29.' },
          { text: 'Keyword search is broken', why: 'It works; it just matches spelling.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keyword search or search by meaning?',
        groups: ['Keyword', 'Meaning'],
        items: [
          { text: 'Finds "juttis" when you type "shoes"', group: 1 },
          { text: 'Needs the exact word in the text', group: 0 },
          { text: 'Compares embeddings', group: 1 },
          { text: 'Uses "in" on strings', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the length of embed("shaadi")',
        starter: 'from teyro_ai import embed\n',
        solution: 'from teyro_ai import embed\nprint(len(embed("shaadi")))\n',
        hint: 'len(embed("shaadi"))',
        checks: [{ message: 'Print 24', outputEquals: '24' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Keyword search', 'Matches spelling'],
          ['Embedding', 'Text as a list of numbers'],
          ['Cosine', 'Compares directions'],
          ['Score of 1', 'Same direction'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the summary is wrong?',
        lines: [
          'Embeddings turn text into vectors.',
          'Similar meanings point the same way.',
          'A high score proves the answer is correct.',
          'Cosine ignores the arrows\' length.',
        ],
        bug: 2,
        fix: 'A high score means "about the same thing", not "correct".',
        explanation: 'Similarity finds candidates; it doesn\'t check facts.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'In one sentence: why can\'t we just use keyword search?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Customers use their own words, like "shaadi", and keyword search only finds the exact words we wrote.' },
          { text: 'Keyword search is too expensive.', why: 'It\'s cheap; it just misses meaning.' },
          { text: 'Keyword search needs a GPU.', why: 'It doesn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'import math\nprint(math.sqrt(sum(x * x for x in [6, 8])))',
        language: 'python',
        options: [
          { text: '10.0' },
          { text: '14', why: 'Square, add, then square root: √100.' },
          { text: '100', why: 'Take the square root at the end.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Compare two texts.',
        language: 'python',
        template: 'score = [[1]](embed(a), [[2]](b))',
        blanks: [['cosine'], ['embed']],
        distractors: ['cost', 'len'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how cosine similarity is worked out.',
        lines: ['Multiply matching numbers', 'Add them up (the dot product)', 'Work out both lengths', 'Divide the dot product by both lengths'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many numbers are in a practice embedding?',
        answers: ['24', 'twenty-four', 'twenty four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Explain embeddings to a friend in two sentences, without the word "vector".',
    starters: ['An embedding is...', 'It helps because...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4. wedding outfit|festive lehenga 0.806; len(embed) = 24; sqrt(36+64) = 10.0.',
};

export default lesson;
