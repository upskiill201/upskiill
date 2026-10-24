import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 13 — What it costs to answer once: tokens x price, then x chats. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'What it costs to answer once',
  summary: 'Mr Rao\'s question is still waiting: "How much?" Joel finally has the pieces. Every reply reports its tokens; every model has a price per million tokens. The rest is multiplication.',
  minutes: 12,
  outcomes: [
    'Read the tokens and cost of a reply',
    'Scale one answer\'s cost to 1,000 chats',
    'See how sending fewer tokens cuts the bill',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One answer, priced',
      text: 'With the whole help page in the prompt, one reply on model-b reads 321 tokens and writes 13. At $0.50 per million tokens in and $1.50 per million out, that is $0.00018. For 1,000 chats, about $0.18. Send only the 2 lines that matter instead, and it drops to about $0.04.',
      hotspots: [
        { phrase: 'reads 321 tokens and writes 13', note: 'reply.tokens_in and reply.tokens_out. The help page is most of the 321.' },
        { phrase: '$0.50 per million tokens in and $1.50 per million out', note: 'Practice prices from teyro_ai.MODELS. Output usually costs more than input. Real prices vary by model and change often.' },
        { phrase: 'that is $0.00018', note: '(321 x 0.50 + 13 x 1.50) / 1,000,000 = 0.00018. That\'s reply.cost.' },
        { phrase: 'about $0.04', note: 'Retrieval sends about 44 tokens instead of 321. Fewer tokens in, smaller bill: one reason retrieval matters.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Price an answer',
      caption: 'Try model-a and model-c too.',
      code: 'from teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\nreply = PracticeModel("model-b").reply("Is delivery free?", context=policies)\n\nprint(reply)\nprint("Tokens:", reply.tokens_in, "in,", reply.tokens_out, "out")\nprint(f"One answer: ${reply.cost:.5f}")\nprint(f"1,000 answers: ${reply.cost * 1000:.2f}")\n',
      challenge: 'What would 1,000 answers cost on model-a?',
    },
  ],
  apply: {
    scenario: 'Answering "How much?"',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print what 1,000 answers like this one cost on model-b, rounded to 2 places',
        starter: 'from teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\nreply = PracticeModel("model-b").reply("Is delivery free?", context=policies)\n',
        solution: 'from teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\nreply = PracticeModel("model-b").reply("Is delivery free?", context=policies)\nprint(round(reply.cost * 1000, 2))\n',
        hint: 'round(reply.cost * 1000, 2)',
        checks: [{ message: 'Print 0.18', outputEquals: '0.18' }],
      },
      {
        kind: 'mcq',
        prompt: 'Most of the 321 input tokens came from...',
        options: [
          { text: 'The question "Is delivery free?"', why: 'That\'s only 5 tokens.' },
          { text: 'The reply', why: 'The reply is the 13 output tokens.' },
          { text: 'The whole help page, sent with every question' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Same question on model-a. Print the cost of 1,000 answers, rounded to 2 places',
        starter: 'from teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\nreply = PracticeModel("model-a").reply("Is delivery free?", context=policies)\nprint(round(reply.cost * 1000, 2))\n',
        hint: 'PracticeModel("model-a")',
        checks: [{ message: 'Print 1.8', outputEquals: '1.8' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to the cost of 1,000 answers (whole help page, practice prices).',
        pairs: [
          ['model-a', '$1.80'],
          ['model-b', '$0.18'],
          ['model-c', '$0.04'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it make the bill bigger or smaller?',
        groups: ['Bigger', 'Smaller'],
        items: [
          { text: 'Sending the whole help page every time', group: 0 },
          { text: 'Sending only the 2 lines that matter', group: 1 },
          { text: 'A pricier model', group: 0 },
          { text: 'Shorter replies', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'So, what do we tell Mr Rao it costs?',
        prompt: "Joel's best reply?",
        options: [
          { text: '$0.00018, exactly, forever.', why: 'Real prices and real prompts will differ. Give a range and a date.' },
          { text: 'In practice prices, well under a rupee per hundred chats. We\'ll give a real figure once we pick the model and price it on the day.' },
          { text: 'We can\'t know.', why: 'Tokens times price times chats: it can be estimated.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The cost formula.',
        template: 'cost = (tokens in x price in + tokens [[1]] x price out) / [[2]]',
        blanks: [['out'], ['1,000,000', '1000000', 'a million']],
        distractors: ['in', '100'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import cost\nprint(cost("model-b", 1000000, 0))',
        language: 'python',
        options: [
          { text: '1.5', why: 'That\'s the OUTPUT price. These are input tokens.' },
          { text: '1000000', why: 'It returns dollars, not tokens.' },
          { text: '0.5' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s estimate is wrong?',
        lines: [
          'One answer reads about 321 tokens.',
          'It writes about 13 tokens.',
          'Output tokens are always free.',
          '1,000 answers on model-b cost about $0.18.',
        ],
        bug: 2,
        fix: 'Output tokens usually cost more than input tokens.',
        explanation: 'On these price cards, output is three times the input price.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many input tokens did the answer use with the whole help page?',
        answers: ['321'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'A single answer costs a tiny fraction of a cent, yet AI bills can be huge. How does that happen?',
    starters: ['It happens when...', 'To keep it small, I\'d...'],
  },
  deepen: {
    title: 'Per million tokens',
    summary: 'Real model price lists are usually per million tokens, with separate input and output prices. Chapter 4 reads real pricing pages, with dates, and Chapter 9 builds a monthly cost dashboard.',
  },
  notes: 'teyro_ai practice prices: model-a $5/$15, model-b $0.50/$1.50, model-c $0.10/$0.30 per million tokens (made up). "Is delivery free?" with full rao_policies.md: 321 tokens in, 13 out. model-b 0.00018 -> x1000 = 0.18; model-a 0.0018 -> 1.8; model-c 0.000036 -> 0.04. With 2 retrieved lines: 44 in, 13 out, $0.0000415 (about $0.04 per 1,000).',
};

export default lesson;
