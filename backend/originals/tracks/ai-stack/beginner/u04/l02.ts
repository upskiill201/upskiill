import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2 — Open-weight models: download, host, or rent from a provider. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Open-weight models',
  summary: 'Joel looks closer at model-c, the cheapest on the cards. It\'s "open-weight". That turns out to mean more choice than Kavya\'s laptop experiment suggested.',
  minutes: 11,
  outcomes: [
    'Explain what open weights are',
    'Know the three ways to use an open-weight model',
    'Compare the trade-offs with closed models',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Three ways to use open weights',
      steps: [
        { title: '1. What "open weights" means', body: 'The lab publishes the model\'s numbers (its weights) for anyone to download. Llama, Mistral, DeepSeek and Qwen are well-known families.' },
        { title: '2. Way one: on your own machine', body: 'A local runtime, as in Chapter 2. Private and free per answer, limited by your hardware.' },
        { title: '3. Way two: on a GPU you rent', body: 'Full control, data stays with you, but you pay by the hour and look after it.' },
        { title: '4. Way three: through a hosting provider\'s API', body: 'Many providers run open-weight models and sell them per token, often cheaply. As easy as a closed API.', code: 'from teyro_ai import MODELS\nprint(MODELS["model-c"])\n# kind: open-weight, $0.10 in / $0.30 out per million', language: 'python' },
        { title: '5. The trade-off', body: 'Open weights give choice and no lock-in: if one host gets expensive, switch hosts, same model. Closed models are often the most capable at the hardest tasks.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Closed vs open on the cards',
      caption: 'Kind and price for each practice model.',
      code: 'from teyro_ai import MODELS\n\nfor name in ["model-a", "model-b", "model-c"]:\n    card = MODELS[name]\n    print(f"{name}: {card[\'kind\']}, ${card[\'price_in\']} in / ${card[\'price_out\']} out")\n',
      challenge: 'Which is cheapest per input token?',
    },
  ],
  apply: {
    scenario: 'Open-weight models.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "open-weight" mean?',
        options: [
          { text: 'The model\'s weights are published, so anyone can download and run them' },
          { text: 'The model is free to use for anything', why: 'Licences can still limit use: lesson 3.' },
          { text: 'It only runs on laptops', why: 'It can run anywhere you put it, including a host\'s API.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the kind of model-c from its practice card',
        starter: 'from teyro_ai import MODELS\n',
        solution: 'from teyro_ai import MODELS\nprint(MODELS["model-c"]["kind"])\n',
        hint: 'MODELS["model-c"]["kind"]',
        checks: [{ message: 'Print open-weight', outputEquals: 'open-weight' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the way of using open weights to its trade-off.',
        pairs: [
          ['Your own machine', 'Private, limited by your hardware'],
          ['A rented GPU', 'Full control, pay by the hour'],
          ['A hosting provider\'s API', 'Easy, pay per token'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Closed or open-weight family?',
        groups: ['Closed (API only)', 'Open weights'],
        items: [
          { text: 'Llama', group: 1 },
          { text: 'Gemini', group: 0 },
          { text: 'Qwen', group: 1 },
          { text: 'Claude', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Open-weight means running it on my laptop, and we already saw that fail.',
        prompt: "Joel's best reply?",
        options: [
          { text: 'That\'s one way. Hosting providers also run open-weight models behind an API, per token, with no laptop involved.' },
          { text: 'Yes, laptop only.', why: 'Hosted APIs and rented GPUs can run them too.' },
          { text: 'Open models can\'t be used commercially.', why: 'Many can; check the licence.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import MODELS\nprint(MODELS["model-c"]["price_in"] < MODELS["model-b"]["price_in"])',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: '$0.10 is less than $0.50.' },
          { text: '0.1', why: 'It prints the comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'No lock-in.',
        template: 'With open weights, if one [[1]] gets expensive, you can switch to another and keep the same [[2]].',
        blanks: [['host', 'provider'], ['model']],
        distractors: ['laptop', 'logo'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence is wrong?',
        lines: [
          'Open-weight models can be downloaded.',
          'Some providers sell open-weight models per token.',
          'Closed models can be downloaded and run offline.',
          'Open weights reduce lock-in to one provider.',
        ],
        bug: 2,
        fix: 'Closed models are only available through the lab\'s API.',
        explanation: 'That\'s what "closed" means.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the names of the practice models whose kind is "open-weight", one per line',
        starter: 'from teyro_ai import MODELS\n',
        solution: 'from teyro_ai import MODELS\nfor name, card in MODELS.items():\n    if card["kind"] == "open-weight":\n        print(name)\n',
        hint: 'Loop over MODELS.items() and check card["kind"]',
        checks: [{ message: 'Print model-c and practice-tiny', outputEquals: 'model-c\npractice-tiny' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What are the numbers inside a model, published with open-weight models, called?',
        answers: ['weights', 'parameters', 'the weights'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Being able to switch providers without changing the model is "no lock-in". Where in your life have you been locked in to one provider?',
    starters: ['I was locked in to...', 'Switching would have...'],
  },
  deepen: {
    title: 'Same weights, different hosts',
    summary: 'The same open-weight model can cost different amounts, and run at different speeds, on different hosts. Compare hosts, not just models.',
  },
  notes: 'Open-weight families (examples, checked 2026-10): Meta Llama, Mistral (some models), DeepSeek, Alibaba Qwen; hosted by many inference providers per token. teyro_ai MODELS kinds: model-a/b closed, model-c and practice-tiny open-weight.',
};

export default lesson;
