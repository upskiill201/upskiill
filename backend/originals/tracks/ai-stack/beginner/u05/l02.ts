import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2 — Embeddings: meaning as a list of numbers. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Embeddings: meaning as numbers',
  summary: 'Joel shows Kavya an embedding: a list of numbers that stands for what a piece of text is about. "wedding" and "shaadi" turn into almost the same list.',
  minutes: 12,
  outcomes: [
    'Explain what an embedding is',
    'Call embed() and read the numbers',
    'See why two different words can get similar embeddings',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From words to numbers',
      steps: [
        { title: '1. Text in, numbers out', body: 'An embedding model turns any text into a fixed-length list of numbers, called a vector. Same length for "hi" and for a whole paragraph.', code: 'from teyro_ai import embed\nprint(len(embed("hi")))   # 24', language: 'python' },
        { title: '2. Each number is a direction', body: 'In the practice toolkit, the first 16 numbers each stand for a shop idea: festive, everyday, office, women, men, kids, footwear, clothing, delivery, returns, size, price, payment, order, help, greeting. The last 8 are a small spelling signal.' },
        { title: '3. "wedding" points at festive', body: 'embed("wedding") is almost all in number 0, "festive" (0.96), plus a little spelling signal.', code: 'v = embed("wedding")\nprint(round(v[0], 2))   # 0.96', language: 'python' },
        { title: '4. So does "shaadi"', body: 'The practice model has learned that "shaadi" is a festive word too. Its biggest number is in the same place, so the two vectors point almost the same way.' },
        { title: '5. Real embeddings are bigger', body: 'Real embedding models use hundreds or thousands of numbers, learned from huge amounts of text, and nobody labels what each number means. The practice one is tiny so you can read it.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Read an embedding',
      caption: 'Print the shop ideas each word points to.',
      code: 'from teyro_ai import embed, CONCEPTS\n\nfor word in ["wedding", "shaadi", "delivery", "juttis"]:\n    v = embed(word)\n    top = max(range(len(CONCEPTS)), key=lambda i: v[i])\n    print(f"{word}: strongest idea = {CONCEPTS[top]} ({v[top]:.2f})")\n',
      challenge: 'Try "refund". Which idea wins?',
    },
  ],
  apply: {
    scenario: 'Meaning as numbers.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many numbers are in embed("Is delivery free?")',
        starter: 'from teyro_ai import embed\n',
        solution: 'from teyro_ai import embed\nprint(len(embed("Is delivery free?")))\n',
        hint: 'len(embed("..."))',
        checks: [{ message: 'Print 24', outputEquals: '24' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is an embedding?',
        options: [
          { text: 'A list of numbers that stands for what a piece of text means' },
          { text: 'A shorter copy of the text', why: 'It\'s numbers, not words.' },
          { text: 'The text\'s token count', why: 'That\'s one number; an embedding is a whole list.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to the shop idea it points to most.',
        pairs: [
          ['wedding', 'festive'],
          ['delivery', 'delivery'],
          ['juttis', 'footwear'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the name of practice concept number 0',
        starter: 'from teyro_ai import CONCEPTS\n',
        solution: 'from teyro_ai import CONCEPTS\nprint(CONCEPTS[0])\n',
        hint: 'CONCEPTS[0]',
        checks: [{ message: 'Print festive', outputEquals: 'festive' }],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'So someone typed in that "shaadi" means "festive"?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'In the practice toolkit, yes, a small word list. Real embedding models learn it from billions of sentences where "shaadi" and "wedding" appear in similar places.' },
          { text: 'No, the computer just knows.', why: 'It learns it from data, or here, from a list.' },
          { text: 'Every real model is a hand-typed list.', why: 'Real ones are learned, not typed.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import embed\nprint(len(embed("hi")) == len(embed("a very long message about my order")))',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: 'Every embedding has the same length, whatever the text.' },
          { text: '24', why: 'It prints the comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'True of the practice embeddings, or of real ones?',
        groups: ['Practice (teyro_ai)', 'Real models'],
        items: [
          { text: '24 numbers', group: 0 },
          { text: 'Hundreds or thousands of numbers', group: 1 },
          { text: 'You can read what each number means', group: 0 },
          { text: 'Learned from huge amounts of text', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Getting an embedding.',
        language: 'python',
        template: 'from teyro_ai import [[1]]\nv = embed("wedding")\nprint([[2]](v))',
        blanks: [['embed'], ['len']],
        distractors: ['cost', 'sum'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s notes is wrong?',
        lines: [
          'An embedding is a list of numbers.',
          'Similar meanings get similar lists.',
          'Longer text gets a longer list.',
          'The practice toolkit uses 24 numbers.',
        ],
        bug: 2,
        fix: 'Every text gets a list of the same length.',
        explanation: 'That fixed length is what lets us compare any two texts.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is another word for the list of numbers an embedding gives you?',
        answers: ['vector', 'a vector'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'If you described your favourite outfit with five numbers (how festive, how formal, how warm...), what would they be?',
    starters: ['My five numbers would be...', 'The most important one is...'],
  },
  deepen: {
    title: 'Word2vec',
    summary: 'In 2013, word2vec showed that word vectors learned from text could capture meaning, famously "king - man + woman is close to queen". Modern embedding models do this for whole sentences.',
  },
  notes: 'teyro_ai.embed: 24 dims (16 CONCEPTS + 8 spelling dims), unit length. embed("wedding")[0] = 0.957826 (festive), plus spelling dim 16. "shaadi" is in the festive word list (dims 0 and 22). Real embedding models: hundreds to thousands of dimensions. word2vec: Mikolov et al., 2013.',
};

export default lesson;
