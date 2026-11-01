import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 13 — When embeddings get it wrong: negation, opposites, unknown words, other scripts. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'When embeddings get it wrong',
  summary: 'Kavya goes looking for trouble and finds plenty: "cheap" and "expensive" kurtas look the same, "not for a wedding" looks like a wedding, and Hindi text vanishes. Every embedding has blind spots. Know yours.',
  minutes: 12,
  outcomes: [
    'Spot four common embedding blind spots',
    'Test a blind spot in code',
    'Pick the fix for each one',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Kavya\'s trouble list',
      text: '"cheap kurta" and "expensive kurta" score 0.97: the same topic, opposite wishes. "not for a wedding" still scores 0.60 with "wedding outfit", because "not" carries little weight. A word the model never learned, like "nuptials", scores 0. And "शादी" in Devanagari turns into all zeros in the practice toolkit, so it matches nothing.',
      hotspots: [
        { phrase: 'the same topic, opposite wishes', note: 'Embeddings capture what text is about, not what the customer wants from it. Price wishes belong in a price filter.' },
        { phrase: '"not" carries little weight', note: 'Real models handle negation better than the practice one, but still not reliably. Turn "not for a wedding" into a filter (occasion is not wedding).' },
        { phrase: 'never learned', note: 'Rare, new or misspelled words can land nowhere. Hybrid search and spelling fixes help.' },
        { phrase: 'all zeros', note: 'The practice toolkit only knows English shop words. Real multilingual embedding models handle Hindi and many other languages. Check yours supports your customers\' languages.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Find the blind spots',
      caption: 'Pairs that should score low, or high, but don\'t.',
      code: 'from teyro_ai import embed, cosine\n\npairs = [\n    ("cheap kurta", "expensive kurta"),\n    ("not for a wedding", "wedding outfit"),\n    ("nuptials", "wedding"),\n    ("शादी", "wedding"),\n]\nfor a, b in pairs:\n    print(f"{a} | {b}: {cosine(embed(a), embed(b)):.3f}")\n',
      challenge: 'Try "kurta" and "kurti". One is for men, one for women. What score?',
    },
  ],
  apply: {
    scenario: 'Knowing the blind spots.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the similarity of "cheap kurta" and "expensive kurta", rounded to 3 places',
        starter: 'from teyro_ai import embed, cosine\n',
        solution: 'from teyro_ai import embed, cosine\nprint(round(cosine(embed("cheap kurta"), embed("expensive kurta")), 3))\n',
        hint: 'round(cosine(embed(a), embed(b)), 3)',
        checks: [{ message: 'Print 0.973', outputEquals: '0.973' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why do "cheap kurta" and "expensive kurta" score so high?',
        options: [
          { text: 'Cheap and expensive mean the same', why: 'They\'re opposites; the topic is the same.' },
          { text: 'Both are about kurtas and price, so they point the same way, though the wishes are opposite' },
          { text: 'The model is broken', why: 'This is a normal limit of similarity.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the blind spot to its fix.',
        pairs: [
          ['"cheap" vs "expensive"', 'A price filter'],
          ['"not for a wedding"', 'An occasion filter'],
          ['A word it never learned', 'Hybrid keyword search'],
          ['Hindi text', 'A multilingual embedding model'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does embedding search handle it well, or is it a blind spot?',
        groups: ['Handles well', 'Blind spot'],
        items: [
          { text: '"shoes" finding juttis', group: 0 },
          { text: '"not for a wedding"', group: 1 },
          { text: '"shaadi" finding wedding outfits', group: 0 },
          { text: '"under ₹2,000"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'So embeddings are useless?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, go back to keywords.', why: 'Keywords fail on "shaadi".' },
          { text: 'Bigger embeddings fix everything.', why: 'Better models help, but blind spots remain.' },
          { text: 'They\'re great at "what is this about". Prices, "not", codes and stock need filters or keywords alongside.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'In the practice toolkit, what does this print?',
        code: 'from teyro_ai import embed\nprint(sum(embed("शादी")))',
        language: 'python',
        options: [
          { text: '0.0' },
          { text: '1.0', why: 'The practice toolkit knows no Devanagari words, so every number is 0.' },
          { text: '24', why: 'It sums the numbers, which are all 0.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the similarity of "kurta" and "kurti", rounded to 3 places',
        starter: 'from teyro_ai import embed, cosine\n',
        solution: 'from teyro_ai import embed, cosine\nprint(round(cosine(embed("kurta"), embed("kurti")), 3))\n',
        hint: 'round(cosine(embed("kurta"), embed("kurti")), 3)',
        checks: [{ message: 'Print 0.478', outputEquals: '0.478' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'What embeddings capture.',
        template: 'Embeddings capture what text is [[1]], not what the customer [[2]].',
        blanks: [['about'], ['wants']],
        distractors: ['costs', 'spells'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s plan trusts embeddings too much?',
        lines: [
          'Use meaning for "something for a shaadi".',
          'Use a price filter for "under ₹2,000".',
          'Trust meaning alone for "not for a wedding".',
          'Check our model supports Hindi before launch.',
        ],
        bug: 2,
        fix: 'Turn "not for a wedding" into a filter that removes wedding items.',
        explanation: 'Embeddings handle negation poorly.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What kind of embedding model handles Hindi and English together? (one word: multi...)',
        answers: ['multilingual'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Every tool has blind spots. Name one tool you use and the thing it gets wrong. How do you work around it?',
    starters: ['My ... gets ... wrong.', 'I work around it by...'],
  },
  deepen: {
    title: 'Test your embeddings',
    summary: 'Before choosing an embedding model, run your own tricky pairs through it: opposites, negations, your customers\' languages, product codes. Like Chapter 4\'s model test, but for search.',
  },
  notes: 'Measured with teyro_ai: cheap kurta|expensive kurta 0.973; not for a wedding|wedding outfit 0.595; nuptials|wedding 0.0; शादी|wedding 0.0 (practice embed returns all zeros for Devanagari); kurta|kurti 0.478; wedding|diwali 0.917. Real multilingual embedding models exist and support Hindi; negation is a known weakness of embedding similarity.',
};

export default lesson;
