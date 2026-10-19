import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 16 — The surprise bill: myths about what drives cost. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'The surprise bill',
  summary: 'Kavya\'s test version pastes the whole product list into every prompt "so it knows everything". On model-a, that turns a $54 month into more than $1,000. Fact or myth: what really drives the bill?',
  minutes: 11,
  outcomes: [
    'Spot the prompt habits that blow up a bill',
    'Work out the cost of pasting a big file into every prompt',
    'Know the guard rails: limits and alerts',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Pasting the whole product list into every prompt is harmless if the model is cheap.',
          isFact: false,
          explain: 'Myth. The list is 6,686 tokens. Sent with every chat, it makes model-b\'s month about $105.69 instead of $5.40, nearly 20 times more.',
        },
        {
          text: 'Long chats cost more per message than short ones.',
          isFact: true,
          explain: 'Fact. The history is resent each turn, so message 10 carries the nine before it. A 10-turn chat costs far more than 10 separate one-question chats.',
        },
        {
          text: 'The model provider will stop you before you spend too much.',
          isFact: false,
          explain: 'Myth. Only if you set a spending limit. Set limits and alerts on day one.',
        },
        {
          text: 'The number of customers matters as much as the price per token.',
          isFact: true,
          explain: 'Fact. Cost per chat times chats per month. A tiny cost per chat becomes real money at 30,000 chats.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'What the product list costs',
      caption: 'The full product list added to every prompt, at 30,000 chats a month.',
      code: 'from teyro_ai import cost, count_tokens\n\nproducts = open("rao_products.csv").read()\nextra = count_tokens(products)\nprint("Product list:", extra, "tokens")\nfor name in ["model-a", "model-b", "model-c"]:\n    normal = cost(name, 321, 13) * 30000\n    pasted = cost(name, 321 + extra, 13) * 30000\n    print(f"{name}: ${normal:.2f} -> ${pasted:.2f} a month")\n',
      challenge: 'What if you only pasted the 3 matching products (about 170 tokens)?',
    },
  ],
  apply: {
    scenario: 'Avoiding the surprise.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many tokens the product list is',
        starter: 'from teyro_ai import count_tokens\n\nproducts = open("rao_products.csv").read()\n',
        solution: 'from teyro_ai import count_tokens\n\nproducts = open("rao_products.csv").read()\nprint(count_tokens(products))\n',
        hint: 'count_tokens(products)',
        checks: [{ message: 'Print 6686', outputEquals: '6686' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does a long chat cost more per message?',
        options: [
          { text: 'The earlier messages are resent as history with every new one' },
          { text: 'Providers charge a fee per minute', why: 'You pay per token, not per minute.' },
          { text: 'The model gets tired', why: 'It\'s the growing history that costs.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes the bill bigger, or keeps it small?',
        groups: ['Bigger', 'Smaller'],
        items: [
          { text: 'Pasting the full product list into every prompt', group: 0 },
          { text: 'Sending only the 3 matching help-page lines', group: 1 },
          { text: 'Never trimming old chat history', group: 0 },
          { text: 'Asking for two-sentence replies', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its monthly bill with the product list pasted in.',
        pairs: [
          ['model-a', '$1,056.90'],
          ['model-b', '$105.69'],
          ['model-c', '$21.14'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'But with the full list it can answer anything about products!',
        prompt: "Joel's best reply?",
        options: [
          { text: 'It only needs the 3 products the customer asked about. Retrieve those, and keep the bill at a few dollars.' },
          { text: 'True, paste it in.', why: 'Nearly 20 times the bill for lines it mostly ignores.' },
          { text: 'Products don\'t matter to customers.', why: 'They do; just send the relevant ones.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'per_chat = 0.0002\nchats = 30000\nprint(round(per_chat * chats, 2))',
        language: 'python',
        options: [
          { text: '6.0' },
          { text: '0.0002', why: 'Multiply by the number of chats.' },
          { text: '30000.0002', why: 'It multiplies, not adds.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print model-b\'s monthly bill (30,000 chats) with the 6,686-token product list added to the 321-token prompt, rounded to 2 places',
        starter: 'from teyro_ai import cost\n',
        solution: 'from teyro_ai import cost\nprint(round(cost("model-b", 321 + 6686, 13) * 30000, 2))\n',
        hint: 'cost("model-b", 321 + 6686, 13) * 30000',
        checks: [{ message: 'Print 105.69', outputEquals: '105.69' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The bill formula.',
        template: 'monthly bill = cost per [[1]] x chats per [[2]]',
        blanks: [['chat'], ['month']],
        distractors: ['GPU', 'year'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the launch checklist is risky?',
        lines: [
          'Set a monthly spending limit with the provider.',
          'Turn on an alert at 80% of the budget.',
          'Paste the whole product list into the system prompt.',
          'Check the bill after the first week.',
        ],
        bug: 2,
        fix: 'Retrieve only the products the customer asks about.',
        explanation: '6,686 extra tokens on every chat multiplies the bill.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should you set with the provider on day one so the bill can\'t run away? (a spending ...)',
        answers: ['limit', 'spending limit', 'cap', 'spending cap'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'A phone plan with no data cap can give you a surprise bill. What "caps" do you set in your own life to avoid surprises?',
    starters: ['I set a limit on...', 'An alert would help with...'],
  },
  deepen: {
    title: 'Watching costs',
    summary: 'Chapter 10 adds a cost log: every chat records its tokens and dollars, so a sudden jump shows up the same day, not on the monthly bill.',
  },
  notes: 'Measured with teyro_ai: count_tokens(rao_products.csv) = 6686. Monthly at 30,000 chats with the list added (321 + 6686 in, 13 out): model-a 1056.9, model-b 105.69, model-c 21.14; without: 54.0 / 5.4 / 1.08. Providers generally offer usage limits and budget alerts on API accounts; check the specific dashboard.',
};

export default lesson;
