import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: next-token prediction, tokens, counting, training. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: guess the next token',
  summary: 'Joel can now explain what a model does in one sentence, cut text into tokens, count a document and draw the training loop. Quick check before the numbers inside the model.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain next-token prediction without notes', 'Count and estimate tokens'],
  learn: [
    {
      kind: 'story',
      title: 'The explanation',
      beats: [
        { speaker: 'narrator', text: 'Joel explains it to Kavya: "It predicts the next token, over and over, from patterns it learned. It doesn\'t know our shop unless we tell it."' },
        { speaker: 'kavya', text: 'That\'s the most useful sentence I\'ve heard all week.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: inside the model.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the number of practice tokens in "Kurtas and kurtis come in S, M, L, XL and XXL."',
        starter: 'from teyro_ai import count_tokens\n',
        solution: 'from teyro_ai import count_tokens\nprint(count_tokens("Kurtas and kurtis come in S, M, L, XL and XXL."))\n',
        hint: 'count_tokens("...")',
        checks: [{ message: 'Print 17', outputEquals: '17' }],
      },
      {
        kind: 'mcq',
        prompt: 'A reply of 60 tokens is made of...',
        options: [
          { text: '60 next-token predictions, one after another' },
          { text: 'One prediction', why: 'Each token is its own prediction.' },
          { text: '60 database lookups', why: 'It predicts; it doesn\'t look up.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Count which word follows "is" in the text, and print the counts dictionary',
        starter: 'text = "returns is easy . delivery is fast . sizes is easy"\nwords = text.split()\nafter_is = {}\n',
        solution: 'text = "returns is easy . delivery is fast . sizes is easy"\nwords = text.split()\nafter_is = {}\nfor i in range(len(words) - 1):\n    if words[i] == "is":\n        nxt = words[i + 1]\n        after_is[nxt] = after_is.get(nxt, 0) + 1\nprint(after_is)\n',
        hint: 'Loop over positions; when words[i] == "is", count words[i + 1]',
        checks: [{ message: "Print {'easy': 2, 'fast': 1}", outputEquals: "{'easy': 2, 'fast': 1}" }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its meaning.',
        pairs: [
          ['Token', 'A small piece of text'],
          ['Next-token prediction', 'Guessing what comes next'],
          ['Training', 'Guess, check, adjust'],
          ['Cut-off', 'When its knowledge stops'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'One practice token, or more?',
        groups: ['One', 'More than one'],
        items: [
          { text: '"Hi"', group: 0 },
          { text: '"unbelievable"', group: 1 },
          { text: '","', group: 0 },
          { text: '"WhatsApp"', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s notes is wrong?',
        lines: [
          'A model writes one token at a time.',
          'Tokens can be pieces of words.',
          'The model was trained on Mr Rao\'s help page.',
          'Its knowledge stops at a cut-off.',
        ],
        bug: 2,
        fix: 'It has never seen the help page unless we put it in the prompt.',
        explanation: 'The shop\'s page wasn\'t in its training data.',
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'If it\'s just predicting, why does it sound so sure?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Confident-sounding text is very common in what it learned from, so it writes confidently, whether or not it\'s right.' },
          { text: 'Because it checked.', why: 'It doesn\'t check facts by itself.' },
          { text: 'It\'s never sure.', why: 'It sounds sure; that\'s the danger.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Estimate tokens.',
        template: '100 English words is roughly [[1]] tokens, by the 4-[[2]] rule.',
        blanks: [['130'], ['letter']],
        distractors: ['25', 'word'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import tokenize\nprint(tokenize("free"))',
        language: 'python',
        options: [
          { text: "['free']" },
          { text: "['f', 'r', 'e', 'e']", why: 'Short English words stay whole in the practice tokenizer.' },
          { text: "['fr', 'ee']", why: '4 letters or fewer stay as one token.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the life of a model.',
        lines: ['Trained on huge amounts of text', 'Trained further on good answers', 'Released by the lab', 'Ask Rao sends it a prompt', 'It predicts a reply token by token'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many practice tokens is the shop\'s whole help page?',
        answers: ['316'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Kavya called Joel\'s sentence "the most useful of the week". What\'s the most useful one-sentence explanation you\'ve ever been given?',
    starters: ['Someone once told me...', 'It helped because...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4. count_tokens of the kurta sizes line = 17. Toy counts: easy 2, fast 1.',
};

export default lesson;
