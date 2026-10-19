import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3 — Similar means close: comparing embeddings with a score. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Similar means close',
  summary: 'If meanings are directions, similar meanings point the same way. Joel scores pairs of phrases from 0 to 1, and the scores look a lot like common sense.',
  minutes: 11,
  outcomes: [
    'Explain "close" for vectors',
    'Score two texts with cosine()',
    'Read a similarity score',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Closeness scores',
      text: 'Picture every text as an arrow. Texts about the same thing point in nearly the same direction. The similarity score is 1 for the same direction and 0 for unrelated. "wedding outfit" and "festive lehenga" score 0.81. "wedding" and "delivery" score 0. "shoes" and "juttis" score 0.92, though they share no letters.',
      hotspots: [
        { phrase: 'an arrow', note: 'Each vector is an arrow from the centre. With 24 numbers it lives in 24 dimensions: impossible to draw, easy to compute.' },
        { phrase: 'score 0.81', note: 'Both are festive clothing, so the arrows point almost the same way.' },
        { phrase: 'score 0', note: 'Nothing in common: one is about festive clothes, the other about shipping. The arrows are at right angles.' },
        { phrase: 'share no letters', note: 'This is why embeddings beat keyword search: closeness comes from meaning, not spelling.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Score some pairs',
      caption: 'cosine() compares two embeddings.',
      code: 'from teyro_ai import embed, cosine\n\npairs = [\n    ("wedding outfit", "festive lehenga"),\n    ("wedding outfit", "cotton kurta for office"),\n    ("wedding", "delivery"),\n    ("shoes", "juttis"),\n]\nfor a, b in pairs:\n    print(f"{a} | {b}: {cosine(embed(a), embed(b)):.3f}")\n',
      challenge: 'Score "Is delivery free?" against "When will my order arrive?".',
    },
  ],
  apply: {
    scenario: 'How close is close?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the similarity of "shoes" and "juttis", rounded to 3 places',
        starter: 'from teyro_ai import embed, cosine\n',
        solution: 'from teyro_ai import embed, cosine\nprint(round(cosine(embed("shoes"), embed("juttis")), 3))\n',
        hint: 'round(cosine(embed("shoes"), embed("juttis")), 3)',
        checks: [{ message: 'Print 0.917', outputEquals: '0.917' }],
      },
      {
        kind: 'mcq',
        prompt: 'A similarity score of 0 means...',
        options: [
          { text: 'The two texts are about unrelated things' },
          { text: 'The two texts are identical', why: 'Identical is 1.' },
          { text: 'One of them is empty', why: 'An empty text has no direction at all; 0 here means unrelated.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the pair to its practice score.',
        pairs: [
          ['shoes | juttis', '0.917'],
          ['wedding outfit | festive lehenga', '0.806'],
          ['wedding outfit | cotton kurta for office', '0.354'],
          ['wedding | delivery', '0.0'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Would you expect a high score or a low score?',
        groups: ['High', 'Low'],
        items: [
          { text: 'sherwani | groom\'s outfit', group: 0 },
          { text: 'refund | festive lehenga', group: 1 },
          { text: 'Is delivery free? | When will my order arrive?', group: 0 },
          { text: 'juttis | payment by UPI', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: '"shoes" and "juttis" share no letters. How can they score 0.92?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Both point at the footwear idea. The score compares meaning, not spelling. That\'s the whole point.' },
          { text: 'It\'s a bug.', why: 'It\'s exactly what embeddings are for.' },
          { text: 'They share the letter s.', why: 'Letters aren\'t what\'s compared.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import embed, cosine\nprint(round(cosine(embed("wedding"), embed("wedding")), 1))',
        language: 'python',
        options: [
          { text: '1.0' },
          { text: '0.0', why: 'A text compared with itself points the same way.' },
          { text: '24', why: 'It returns a score, not a length.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the similarity of "wedding" and "delivery", rounded to 1 place',
        starter: 'from teyro_ai import embed, cosine\n',
        solution: 'from teyro_ai import embed, cosine\nprint(round(cosine(embed("wedding"), embed("delivery")), 1))\n',
        hint: 'round(cosine(embed("wedding"), embed("delivery")), 1)',
        checks: [{ message: 'Print 0.0', outputEquals: '0.0' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The scale.',
        template: 'A score of [[1]] means the same direction; [[2]] means unrelated.',
        blanks: [['1'], ['0']],
        distractors: ['100', '24'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line compares the wrong things?',
        language: 'python',
        lines: ['from teyro_ai import embed, cosine', 'a = embed("shoes")', 'b = "juttis"', 'print(cosine(a, b))'],
        bug: 2,
        fix: 'b = embed("juttis")',
        explanation: 'cosine compares two vectors, so embed both texts.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What score does a text get when compared with itself?',
        answers: ['1', '1.0', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Pick two things that look nothing alike but mean nearly the same to you. What makes them "close"?',
    starters: ['They look different but...', 'They\'re close because...'],
  },
  deepen: {
    title: 'Distance or similarity',
    summary: 'Some tools measure distance (smaller is closer) instead of similarity (bigger is closer). Check which one a tool returns before you sort its results.',
  },
  notes: 'Measured with teyro_ai.cosine(embed(a), embed(b)): wedding outfit|festive lehenga 0.806; wedding outfit|cotton kurta for office 0.354; wedding|delivery 0.0; shoes|juttis 0.917; Is delivery free?|When will my order arrive? 0.62.',
};

export default lesson;
