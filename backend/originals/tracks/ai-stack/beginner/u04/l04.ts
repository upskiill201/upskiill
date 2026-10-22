import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4 — Price per million tokens: myths and facts. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Price per million tokens',
  summary: 'Model prices are quoted per million tokens, which makes every number look tiny or huge. Joel and Kavya argue about what "$5 per million" really means for Ask Rao.',
  minutes: 11,
  outcomes: [
    'Read a price per million tokens',
    'Convert it into cost per chat and per month',
    'Spot common myths about model pricing',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: '"$5 per million tokens" means each chat costs $5.',
          isFact: false,
          explain: 'Myth. A chat of 321 tokens in costs 321 / 1,000,000 of $5: about $0.0016 for the input.',
        },
        {
          text: 'You pay for tokens you send AND tokens the model writes.',
          isFact: true,
          explain: 'Fact. Input and output are billed separately, usually at different prices. Lesson 6.',
        },
        {
          text: 'The help page costs money every time it\'s sent.',
          isFact: true,
          explain: 'Fact. 316 tokens on every chat. Sending only the lines that matter cuts most of the bill.',
        },
        {
          text: 'Prices per token only ever go up.',
          isFact: false,
          explain: 'Myth. Prices for a given level of capability have tended to fall as models and chips improve. Check them regularly.',
        },
        {
          text: 'The cheapest model per token is always the cheapest to run.',
          isFact: false,
          explain: 'Myth. A model that writes long replies, or needs a retry, can cost more per answer. Compare the cost per finished answer.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'From per-million to per-chat',
      caption: 'cost(model, tokens_in, tokens_out) does the division for you.',
      code: 'from teyro_ai import cost\n\nper_chat = cost("model-a", 321, 13)\nprint(f"One chat: ${per_chat:.5f}")\nprint(f"1,000 chats: ${per_chat * 1000:.2f}")\nprint(f"30,000 chats: ${per_chat * 30000:.2f}")\n',
      challenge: 'Do the same for model-c.',
    },
  ],
  apply: {
    scenario: 'Reading per-million prices.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the input cost of 321 tokens at $5 per million, by hand (no cost()), rounded to 6 places',
        starter: 'tokens_in = 321\nprice_per_million = 5.0\n',
        solution: 'tokens_in = 321\nprice_per_million = 5.0\nprint(round(tokens_in * price_per_million / 1_000_000, 6))\n',
        hint: 'tokens_in * price_per_million / 1_000_000',
        checks: [{ message: 'Print 0.001605', outputEquals: '0.001605' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: '$5 per million = $5 per chat', group: 0 },
          { text: 'Input and output are both billed', group: 1 },
          { text: 'Cheapest per token is always cheapest overall', group: 0 },
          { text: 'Every token of the help page is billed', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'At $0.50 per million input tokens, what do 1,000,000 input tokens cost?',
        options: [
          { text: '$500,000', why: 'The price IS for a million tokens.' },
          { text: '$0.50' },
          { text: '$0.0000005', why: 'That would be per token.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its practice price per million INPUT tokens.',
        pairs: [
          ['model-a', '$5.00'],
          ['model-b', '$0.50'],
          ['model-c', '$0.10'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: '$5 per million sounds like nothing. Why worry?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'It is nothing.', why: 'Multiplied by volume, it adds up.' },
          { text: 'It\'s $5 per chat.', why: 'It\'s $5 per million tokens.' },
          { text: 'Per chat it\'s tiny, but it\'s multiplied by every token of every chat. At 30,000 chats that\'s $54 a month on model-a, and it scales with growth.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import cost\nprint(cost("model-c", 1000000, 1000000))',
        language: 'python',
        options: [
          { text: '0.4' },
          { text: '0.1', why: 'Add the output price too: 0.10 + 0.30.' },
          { text: '2000000', why: 'It returns dollars.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Per-million to per-chat.',
        template: 'cost = tokens x price per [[1]] / [[2]]',
        blanks: [['million'], ['1,000,000', '1000000', 'a million']],
        distractors: ['token', '100'],
      },
      {
        kind: 'findBug',
        prompt: 'This prints a cost a million times too big. Which line?',
        language: 'python',
        lines: ['tokens_in = 321', 'price_per_million = 5.0', 'cost = tokens_in * price_per_million', 'print(cost)'],
        bug: 2,
        fix: 'cost = tokens_in * price_per_million / 1_000_000',
        explanation: 'The price is per million tokens, so divide by a million.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print what 1,000 chats cost on model-c (321 in, 13 out), rounded to 3 places',
        starter: 'from teyro_ai import cost\n',
        solution: 'from teyro_ai import cost\nprint(round(cost("model-c", 321, 13) * 1000, 3))\n',
        hint: 'round(cost("model-c", 321, 13) * 1000, 3)',
        checks: [{ message: 'Print 0.036', outputEquals: '0.036' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Model prices are usually quoted per how many tokens? (a word)',
        answers: ['million', 'a million', '1000000', '1,000,000'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Prices "per million" make small things look cheap. Where else does a unit hide the real cost (per day, per kilobyte, per cup)?',
    starters: ['A price per... hides...', 'The real cost was...'],
  },
  deepen: {
    title: 'Price trends',
    summary: 'For the same level of capability, token prices have generally fallen over time. A choice that was too expensive last year may be cheap now: re-check prices when you review a decision.',
  },
  notes: 'Practice prices per million tokens (teyro_ai.MODELS). 321 x 5 / 1e6 = 0.001605; model-c 321 in / 13 out = $0.000036 -> x1000 = 0.036; cost("model-c", 1e6, 1e6) = 0.4. Industry trend: per-token prices for a fixed capability level have fallen substantially since 2023 (general trend; check current prices).',
};

export default lesson;
