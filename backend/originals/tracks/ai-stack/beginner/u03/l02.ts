import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2 — Tokens: how text is cut up. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Tokens: how text is cut up',
  summary: 'If the model predicts "tokens", what exactly is a token? Not a word, not a letter, but something in between. Joel cuts up a few shop sentences to see.',
  minutes: 11,
  outcomes: [
    'Explain what a token is',
    'See how words split into pieces',
    'Use tokenize() to cut text up',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Cutting up text',
      steps: [
        { title: '1. Not quite words', body: 'Models work with tokens: common short words are one token, longer or rarer words are split into pieces.', code: 'from teyro_ai import tokenize\nprint(tokenize("Is delivery free?"))\n# [\'Is\', \'deli\', \'very\', \'free\', \'?\']', language: 'python' },
        { title: '2. Pieces of words', body: '"delivery" became "deli" + "very". In the practice tokenizer, English words split into pieces of up to 4 letters.' },
        { title: '3. Punctuation and digits count', body: 'Each "?" or "," is a token, and so is each digit: ₹999 is 4 tokens.', code: 'print(tokenize("₹999"))   # [\'₹\', \'9\', \'9\', \'9\']', language: 'python' },
        { title: '4. Why pieces?', body: 'With pieces, a model can handle any word, even ones it never saw whole, from a fixed list of a few tens of thousands of tokens.' },
        { title: '5. Real tokenizers differ', body: 'Each real model has its own tokenizer, learned from data. Common words like "delivery" are often one token there. The practice one is simpler, so you can predict it by hand.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Cut it up',
      caption: 'Try your own sentences.',
      code: 'from teyro_ai import tokenize\n\nfor text in ["Is delivery free?", "unbelievable", "WhatsApp", "₹999"]:\n    print(text, "->", tokenize(text))\n',
      challenge: 'Tokenize "Kurtas and kurtis come in S, M, L, XL and XXL."',
    },
  ],
  apply: {
    scenario: 'Text into tokens.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a token?',
        options: [
          { text: 'A small piece of text: a short word, part of a word, or a symbol' },
          { text: 'Always one whole word', why: 'Long words split into pieces.' },
          { text: 'Always one letter', why: 'Most tokens are longer than one letter.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the practice tokens of "unbelievable"',
        starter: 'from teyro_ai import tokenize\n',
        solution: 'from teyro_ai import tokenize\nprint(tokenize("unbelievable"))\n',
        hint: 'print(tokenize("unbelievable"))',
        checks: [{ message: "Print ['unbe', 'liev', 'able']", outputEquals: "['unbe', 'liev', 'able']" }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the text to its practice tokens.',
        pairs: [
          ['"Is delivery free?"', 'Is | deli | very | free | ?'],
          ['"₹999"', '₹ | 9 | 9 | 9'],
          ['"WhatsApp"', 'What | sApp'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'One practice token, or more than one?',
        groups: ['One token', 'More than one'],
        items: [
          { text: '"free"', group: 0 },
          { text: '"delivery"', group: 1 },
          { text: '"?"', group: 0 },
          { text: '"₹999"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Why not just use whole words? Simpler!',
        prompt: "Tey's best reply?",
        options: [
          { text: 'There are endless words, names and typos. With pieces, a fixed list of tokens can spell anything, even words never seen before.' },
          { text: 'Whole words would be better.', why: 'A model couldn\'t handle new or misspelled words.' },
          { text: 'Tokens are random.', why: 'They\'re chosen from patterns in lots of text.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import tokenize\nprint(len(tokenize("Hi!")))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '1', why: '"Hi" and "!" are separate tokens.' },
          { text: '3', why: '"Hi" is one token; "!" is another.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Cut up a sentence.',
        language: 'python',
        template: 'from teyro_ai import [[1]]\nprint(tokenize([[2]]))',
        blanks: [['tokenize'], ['"Is delivery free?"']],
        distractors: ['split', 'Is delivery free?'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence about tokens is wrong?',
        lines: [
          'Long words can split into several tokens.',
          'Punctuation marks are tokens too.',
          'Every model uses exactly the same tokenizer.',
          'Digits can each be a token.',
        ],
        bug: 2,
        fix: 'Each model has its own tokenizer.',
        explanation: 'Tokenizers differ, so the same text can be a different number of tokens on different models.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the first token of "delivery" using tokenize() and [0]',
        starter: 'from teyro_ai import tokenize\n',
        solution: 'from teyro_ai import tokenize\nprint(tokenize("delivery")[0])\n',
        hint: 'tokenize("delivery")[0]',
        checks: [{ message: 'Print deli', outputEquals: 'deli' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many practice tokens is "₹999"?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a long word you use at work or school. How do you think a tokenizer would cut it up?',
    starters: ['My word is...', 'It might split into...'],
  },
  deepen: {
    title: 'Byte-pair encoding',
    summary: 'Many real tokenizers are built with a method called byte-pair encoding: start from letters and keep merging the most common pairs, until common words become single tokens.',
  },
  notes: 'teyro_ai.tokenize (practice): ASCII words split into 4-letter pieces; each digit, symbol and non-Latin character is a token. tokenize("unbelievable") = [unbe, liev, able]; "Is delivery free?" = [Is, deli, very, free, ?]; "₹999" = 4 tokens; "WhatsApp" = [What, sApp]. Real tokenizers (often BPE-based) differ per model.',
};

export default lesson;
