import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: closed, open-weight, licences, per-million prices. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: kinds of model',
  summary: 'The team can tell closed from open-weight, knows to read licences, and can turn a per-million price into a monthly bill. Quick check before they look at what tokens cost in and out.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Compare model kinds and prices without notes', 'Check a licence'],
  learn: [
    {
      kind: 'story',
      title: 'The shortlist',
      beats: [
        { speaker: 'narrator', text: 'Joel\'s shortlist: model-a (closed, $54 a month), model-b (closed, $5.40), model-c (open-weight, Apache 2.0, $1.08, through a host).' },
        { speaker: 'arjun', text: 'Good shortlist. No decision until we\'ve tested them on our questions.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: kinds of model.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print model-b\'s monthly bill for 30,000 chats of 321 in and 13 out, rounded to 2 places',
        starter: 'from teyro_ai import cost\n',
        solution: 'from teyro_ai import cost\nprint(round(cost("model-b", 321, 13) * 30000, 2))\n',
        hint: 'round(cost("model-b", 321, 13) * 30000, 2)',
        checks: [{ message: 'Print 5.4', outputEquals: '5.4' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which can you download and run yourself?',
        options: [
          { text: 'An open-weight model' },
          { text: 'A closed frontier model', why: 'Closed means API only.' },
          { text: 'Neither', why: 'Open-weight models can be downloaded.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Allowed in Ask Rao, or not?',
        groups: ['Allowed (check details)', 'Not for a product'],
        items: [
          { text: 'An Apache 2.0 model', group: 0 },
          { text: 'A research-only model', group: 1 },
          { text: 'A closed model under its API terms', group: 0 },
          { text: 'A model with no licence stated', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to the bill for 30,000 chats.',
        pairs: [
          ['model-a', '$54.00'],
          ['model-b', '$5.40'],
          ['model-c', '$1.08'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is wrong?',
        language: 'python',
        lines: ['from teyro_ai import cost', 'per_chat = cost("model-a", 321, 13)', 'monthly = per_chat + 30000', 'print(monthly)'],
        bug: 2,
        fix: 'monthly = per_chat * 30000',
        explanation: 'Multiply the cost per chat by the number of chats.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the input cost of 1,000 tokens at $0.50 per million, rounded to 4 places',
        starter: 'tokens = 1000\nprice_per_million = 0.50\n',
        solution: 'tokens = 1000\nprice_per_million = 0.50\nprint(round(tokens * price_per_million / 1_000_000, 4))\n',
        hint: 'tokens * price_per_million / 1_000_000',
        checks: [{ message: 'Print 0.0005', outputEquals: '0.0005' }],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'model-c is cheapest and open. Can we ship it now?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Licence checks out. Now test it on our questions. Cheap only counts if it answers well.' },
          { text: 'Yes, cheapest wins without testing.', why: 'Untested cheap can be the most expensive mistake.' },
          { text: 'Open models aren\'t allowed in shops.', why: 'This one is, under Apache 2.0.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The shortlist rule.',
        template: 'No decision until we\'ve [[1]] them on our own [[2]].',
        blanks: [['tested'], ['questions']],
        distractors: ['priced', 'logos'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import MODELS\nprint(MODELS["model-b"]["kind"])',
        language: 'python',
        options: [
          { text: 'closed' },
          { text: 'open-weight', why: 'model-b is closed on the practice cards.' },
          { text: 'model-b', why: 'It prints the kind.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps of choosing a model.',
        lines: ['Make a shortlist', 'Check each licence', 'Work out the cost at our volume', 'Test on our own questions', 'Decide, with a backup'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which practice model is open-weight: model-a, model-b or model-c?',
        answers: ['model-c', 'c'],
        placeholder: 'A model',
      },
    ],
  },
  reflect: {
    prompt: 'Arjun won\'t decide until the models are tested. When have you decided too early, and what did it cost?',
    starters: ['I decided too early when...', 'It cost me...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4. model-b x 30,000 = 5.4; 1000 x 0.5 / 1e6 = 0.0005.',
};

export default lesson;
