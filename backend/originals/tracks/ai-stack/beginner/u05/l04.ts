import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4 — Cosine similarity in Python: write it yourself, and its myths. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Cosine similarity in Python',
  summary: 'Kavya wants to know what cosine() actually does. Joel writes it in four lines: multiply, add, divide. Then they test some things people believe about it.',
  minutes: 12,
  outcomes: [
    'Compute a dot product and a vector length',
    'Write cosine similarity yourself',
    'Know what the score does and doesn\'t tell you',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Cosine similarity looks at the direction of two arrows, not their length.',
          isFact: true,
          explain: 'Fact. [2, 2] and [1, 1] point the same way, so they score 1.0, though one is twice as long.',
        },
        {
          text: '[1, 1] and [1, 0] are unrelated, so they score 0.',
          isFact: false,
          explain: 'Myth. They share the first direction, so they\'re halfway: 0.707. Only [1, 0] and [0, 1] score 0.',
        },
        {
          text: 'The formula is: multiply matching numbers, add them up, divide by both lengths.',
          isFact: true,
          explain: 'Fact. That\'s the dot product divided by the two lengths. Four lines of Python.',
        },
        {
          text: 'A high score means the answer is correct.',
          isFact: false,
          explain: 'Myth. It means "about the same thing". A wrong return rule can be very similar to a question about returns.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Cosine by hand',
      caption: 'Same formula as the toolkit, on tiny vectors.',
      code: 'import math\n\ndef cos(a, b):\n    dot = sum(x * y for x, y in zip(a, b))\n    length_a = math.sqrt(sum(x * x for x in a))\n    length_b = math.sqrt(sum(y * y for y in b))\n    return dot / (length_a * length_b)\n\nprint(round(cos([1, 0], [0, 1]), 3))\nprint(round(cos([1, 1], [1, 0]), 3))\nprint(round(cos([2, 2], [1, 1]), 3))\n',
      challenge: 'Try [3, 4] with itself. Then [3, 4] and [-3, -4].',
    },
  ],
  apply: {
    scenario: 'Under the hood.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the dot product of [1, 2, 3] and [4, 5, 6] (multiply matching numbers, then add)',
        starter: 'a = [1, 2, 3]\nb = [4, 5, 6]\n',
        solution: 'a = [1, 2, 3]\nb = [4, 5, 6]\nprint(sum(x * y for x, y in zip(a, b)))\n',
        hint: 'sum(x * y for x, y in zip(a, b))',
        checks: [{ message: 'Print 32', outputEquals: '32' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why do [2, 2] and [1, 1] score 1.0?',
        options: [
          { text: 'They point the same way; cosine ignores length' },
          { text: 'They have the same numbers', why: 'They don\'t; one is double.' },
          { text: 'Every pair scores 1.0', why: '[1, 0] and [0, 1] score 0.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the length of the vector [3, 4] (square each number, add, take the square root)',
        starter: 'import math\n\nv = [3, 4]\n',
        solution: 'import math\n\nv = [3, 4]\nprint(math.sqrt(sum(x * x for x in v)))\n',
        hint: 'math.sqrt(sum(x * x for x in v))',
        checks: [{ message: 'Print 5.0', outputEquals: '5.0' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the pair to its cosine score.',
        pairs: [
          ['[1, 0] and [0, 1]', '0.0'],
          ['[1, 1] and [1, 0]', '0.707'],
          ['[2, 2] and [1, 1]', '1.0'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Search found a help line scoring 0.9. So it must be the right answer.',
        prompt: "Joel's best reply?",
        options: [
          { text: '0.9 means it\'s about the same topic. It could still be the wrong rule. Similarity finds candidates; checking comes later.' },
          { text: 'Yes, 0.9 is always right.', why: 'Similar is not the same as correct.' },
          { text: 'Scores above 0.5 are always wrong.', why: 'High scores are usually useful, just not proof.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'a = [1, 0]\nb = [0, 1]\nprint(sum(x * y for x, y in zip(a, b)))',
        language: 'python',
        options: [
          { text: '0' },
          { text: '1', why: '1×0 + 0×1 = 0.' },
          { text: '2', why: 'Multiply matching numbers, then add.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The cosine formula.',
        template: 'cosine = dot product / (length of a [[1]] length of b)',
        blanks: [['*', '×']],
        distractors: ['+', '-'],
      },
      {
        kind: 'findBug',
        prompt: 'This cosine forgets to divide by the lengths. Which line?',
        language: 'python',
        lines: ['def cos(a, b):', '    dot = sum(x * y for x, y in zip(a, b))', '    return dot'],
        bug: 2,
        fix: '    return dot / (math.sqrt(sum(x * x for x in a)) * math.sqrt(sum(y * y for y in b)))',
        explanation: 'Without dividing, longer vectors get bigger scores.',
      },
      {
        kind: 'writeCode',
        prompt: 'Write cos(a, b) and print cos([1, 1], [1, 0]) rounded to 3 places',
        starter: 'import math\n\ndef cos(a, b):\n    return 0\n\nprint(round(cos([1, 1], [1, 0]), 3))\n',
        solution: 'import math\n\ndef cos(a, b):\n    dot = sum(x * y for x, y in zip(a, b))\n    return dot / (math.sqrt(sum(x * x for x in a)) * math.sqrt(sum(y * y for y in b)))\n\nprint(round(cos([1, 1], [1, 0]), 3))\n',
        hint: 'dot / (length_a * length_b)',
        checks: [
          { message: 'Print 0.707', outputEquals: '0.707' },
          { message: 'Same direction scores 1', expr: 'round(cos([2, 2], [1, 1]), 3) == 1.0' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is "multiply matching numbers, then add" called? (dot ...)',
        answers: ['product', 'dot product'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Two people can be "about the same topic" and still disagree. How is that like a high similarity score?',
    starters: ['It\'s like...', 'So a high score means...'],
  },
  deepen: {
    title: 'Why the practice vectors have length 1',
    summary: 'embed() scales every vector to length 1. Then cosine is just the dot product, which is faster. Many vector databases do the same.',
  },
  notes: 'cos([1,0],[0,1]) = 0.0; cos([1,1],[1,0]) = 0.707; cos([2,2],[1,1]) = 1.0; dot([1,2,3],[4,5,6]) = 32; |[3,4]| = 5.0. teyro_ai.embed returns unit-length vectors.',
};

export default lesson;
