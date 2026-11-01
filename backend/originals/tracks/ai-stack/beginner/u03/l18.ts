import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 18 — Reading a model card. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading a model card',
  summary: 'Arjun sends Joel a link: the "model card" for an open-weight model they might use. Joel expected marketing. Instead, it lists what the model is bad at.',
  minutes: 11,
  outcomes: [
    'Know what a model card is for',
    'Find the sections that matter for Ask Rao',
    'Read a practice model card in Python',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'What a model card tells you',
      html: '<p>A <strong>model card</strong> is a short document published with a model, like the label on medicine. Good ones include:</p><ul><li><strong>Intended use:</strong> what it was built for, and what it wasn\'t.</li><li><strong>Size and context window:</strong> parameters, and how many tokens it can read.</li><li><strong>Training data:</strong> roughly what it learned from, and its knowledge cut-off.</li><li><strong>Evaluation:</strong> how it scored, and on which tests.</li><li><strong>Limitations and risks:</strong> where it makes mistakes, languages it\'s weak in, known biases.</li><li><strong>Licence:</strong> what you\'re allowed to do with it (Chapter 4).</li></ul><p>For Ask Rao, Joel reads three sections first:</p><ol><li><strong>Limitations</strong>: is it weak in Hindi? Does it make things up often?</li><li><strong>Context window</strong>: will the relevant help-page lines fit, with room for the chat?</li><li><strong>Licence</strong>: can a shop use it commercially?</li></ol><p>The practice price cards in <code>teyro_ai.MODELS</code> are a tiny version: kind, prices, window and speed.</p>',
    },
    {
      kind: 'tryIt',
      title: 'A practice model card',
      caption: 'Read every field for one model.',
      code: 'from teyro_ai import MODELS\n\ncard = MODELS["model-c"]\nfor field, value in card.items():\n    print(f"{field}: {value}")\n',
      challenge: 'Print the card for model-a. What\'s different?',
    },
  ],
  apply: {
    scenario: 'Reading the card.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print model-c\'s context window from its practice card',
        starter: 'from teyro_ai import MODELS\n',
        solution: 'from teyro_ai import MODELS\nprint(MODELS["model-c"]["context"])\n',
        hint: 'MODELS["model-c"]["context"]',
        checks: [{ message: 'Print 32000', outputEquals: '32000' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model-card section to the question it answers.',
        pairs: [
          ['Intended use', 'What was it built for?'],
          ['Limitations', 'Where does it go wrong?'],
          ['Licence', 'What may we do with it?'],
          ['Evaluation', 'How did it score, on what?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a model card?',
        options: [
          { text: 'A payment card for buying models', why: 'It\'s documentation, like a medicine label.' },
          { text: 'A document describing a model\'s uses, data, scores, limits and licence' },
          { text: 'A picture of the model', why: 'It\'s written information about it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Read first for Ask Rao, or less urgent?',
        groups: ['Read first', 'Less urgent'],
        items: [
          { text: 'Limitations in Hindi', group: 0 },
          { text: 'Licence for commercial use', group: 0 },
          { text: 'The research team\'s history', group: 1 },
          { text: 'Context window', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'This card says the model is weak at Hindi. Bad card?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, cards shouldn\'t admit weaknesses.', why: 'Honest limits are what make a card useful.' },
          { text: 'Ignore the limitations section.', why: 'It\'s the most useful part.' },
          { text: 'Great card: it told us before customers found out. Now we know to test Hindi carefully, or pick another model.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import MODELS\nprint(MODELS["model-a"]["kind"])',
        language: 'python',
        options: [
          { text: 'closed' },
          { text: 'open-weight', why: 'model-a is a closed model on the practice cards.' },
          { text: 'model-a', why: 'It prints the "kind" field.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Read a card field.',
        language: 'python',
        template: 'card = MODELS["model-b"]\nprint(card[[[1]]])',
        blanks: [['"speed"', '"context"', '"price_in"', '"price_out"', '"kind"']],
        distractors: ['speed', '"colour"'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s summary of a model card is a guess, not from the card?',
        lines: [
          'Context window: 32,000 tokens.',
          'Licence allows commercial use.',
          'Weak in Hindi, per the limitations.',
          'Probably perfect for every shop.',
        ],
        bug: 3,
        fix: 'Test it on our own questions before deciding.',
        explanation: 'No card says that. Our own tests decide.',
      },
      {
        kind: 'writeCode',
        prompt: 'Loop over the three practice models and print each name with its context window, like "model-a 128000"',
        starter: 'from teyro_ai import MODELS\n\nfor name in ["model-a", "model-b", "model-c"]:\n    pass\n',
        solution: 'from teyro_ai import MODELS\n\nfor name in ["model-a", "model-b", "model-c"]:\n    print(name, MODELS[name]["context"])\n',
        hint: 'print(name, MODELS[name]["context"])',
        checks: [{ message: 'Print all three', outputEquals: 'model-a 128000\nmodel-b 128000\nmodel-c 32000' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which model-card section lists where a model makes mistakes?',
        answers: ['limitations', 'Limitations', 'limitations and risks'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Would you trust a product more or less if its label listed what it\'s bad at? Why?',
    starters: ['I\'d trust it more/less because...', 'An honest label...'],
  },
  deepen: {
    title: 'Where model cards come from',
    summary: 'Model cards were proposed by researchers in 2018 as a standard way to report what a model is for and where it fails. Most major models now publish one.',
  },
  notes: 'Model cards: Mitchell et al., "Model Cards for Model Reporting" (2018, published FAT* 2019). teyro_ai MODELS: model-a closed 128,000; model-b closed 128,000; model-c open-weight 32,000.',
};

export default lesson;
