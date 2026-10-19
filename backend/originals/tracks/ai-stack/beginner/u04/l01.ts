import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1 — Closed frontier models, and Kavya's $54 choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Closed frontier models',
  summary: 'Kavya switches Ask Rao to the biggest, most famous kind of model: a closed "frontier" model. Arjun asks one question: "What will 30,000 chats a month cost?" The answer is ten times Joel\'s plan.',
  minutes: 11,
  outcomes: [
    'Explain what a closed frontier model is',
    'Know their strengths and their costs',
    'Work out a monthly bill for a model choice',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The biggest model',
      beats: [
        { speaker: 'kavya', text: 'I\'ve moved Ask Rao to model-a: the top tier, the one in the news. Best answers, surely.' },
        { speaker: 'arjun', text: 'What does it cost for 30,000 chats a month?' },
        { speaker: 'joel', text: 'Each chat reads about 321 tokens and writes 13. On model-a\'s practice prices that\'s $54 a month. On model-b, $5.40. On model-c, $1.08.' },
        { speaker: 'kavya', text: 'But model-a is the smartest!' },
        { speaker: 'tey', text: 'Closed frontier models are the most capable models labs offer, used through an API. Brilliant at hard reasoning. The question is whether "Is delivery free?" needs a genius.' },
      ],
      choice: {
        prompt: 'What should the team do before deciding?',
        options: [
          { text: 'Test all three models on the shop\'s real questions, then compare quality and cost.', outcome: 'That\'s exactly this chapter. Spoiler for lesson 9: the answer surprises Kavya.', best: true },
          { text: 'Keep model-a: famous means best.', outcome: 'Famous for hard tasks. You don\'t yet know if it\'s better at YOUR task.' },
          { text: 'Pick the cheapest without testing.', outcome: 'Cheap and wrong is the most expensive choice. Test first.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Three monthly bills',
      caption: 'Practice prices, 30,000 chats of 321 tokens in and 13 out.',
      code: 'from teyro_ai import cost\n\nchats = 30000\nfor name in ["model-a", "model-b", "model-c"]:\n    monthly = cost(name, 321, 13) * chats\n    print(f"{name}: ${monthly:,.2f} a month")\n',
      challenge: 'What if chats grow to 300,000 a month?',
    },
  ],
  apply: {
    scenario: 'Frontier models and the bill.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a closed frontier model?',
        options: [
          { text: 'One of a lab\'s most capable models, used only through its API' },
          { text: 'A model you download and run yourself', why: 'That\'s open-weight. Closed means API only.' },
          { text: 'A model that has been switched off', why: 'Closed means you can\'t download it, not that it\'s off.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print model-a\'s monthly bill for 30,000 chats of 321 tokens in and 13 out, rounded to 2 places',
        starter: 'from teyro_ai import cost\n\nchats = 30000\n',
        solution: 'from teyro_ai import cost\n\nchats = 30000\nprint(round(cost("model-a", 321, 13) * chats, 2))\n',
        hint: 'round(cost("model-a", 321, 13) * chats, 2)',
        checks: [{ message: 'Print 54.0', outputEquals: '54.0' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its monthly bill (practice prices, 30,000 chats).',
        pairs: [
          ['model-a', '$54.00'],
          ['model-b', '$5.40'],
          ['model-c', '$1.08'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Where frontier models shine, or where they\'re overkill?',
        groups: ['Shine', 'Overkill'],
        items: [
          { text: 'Hard, multi-step reasoning', group: 0 },
          { text: '"Is delivery free?" with the answer in the prompt', group: 1 },
          { text: 'Tricky writing in many languages', group: 0 },
          { text: 'Saying "Namaste!"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: '$54 isn\'t much for the best model.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'It\'s ten times model-b, and it grows with every chat. If a cheaper model answers the shop\'s questions just as well, the extra buys nothing.' },
          { text: 'You\'re right, money doesn\'t matter.', why: 'It\'s Mr Rao\'s money, and it scales with chats.' },
          { text: 'It\'s too expensive for any business.', why: 'Some jobs are worth it. Test whether this one is.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import cost\nprint(cost("model-a", 1000000, 0))',
        language: 'python',
        options: [
          { text: '5.0' },
          { text: '15.0', why: 'That\'s model-a\'s OUTPUT price. These are input tokens.' },
          { text: '0.5', why: 'That\'s model-b.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question to ask.',
        template: 'Not "which model is [[1]]?" but "which model is good enough for [[2]] job?"',
        blanks: [['best', 'biggest', 'smartest'], ['this', 'our']],
        distractors: ['loudest', 'every'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s note has no evidence yet?',
        lines: [
          'model-a costs about $54 a month at our volume.',
          'model-b costs about $5.40.',
          'model-a will answer our questions far better.',
          'We haven\'t tested either on our questions.',
        ],
        bug: 2,
        fix: 'We\'ll test both on our own questions first.',
        explanation: 'Better at hard tasks in general doesn\'t mean better at shop questions.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is model-a ten times model-b\'s bill?',
        options: [
          { text: 'Its price per token is ten times higher, for the same tokens' },
          { text: 'It writes ten times more', why: 'Same 321 in and 13 out; only the price differs.' },
          { text: 'It reads the help page ten times', why: 'Same prompt; different price.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is model-c\'s monthly bill at 30,000 chats? (dollars, two decimals)',
        answers: ['1.08', '$1.08'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When have you paid for "the best" of something and found a cheaper option would have done the job just as well?',
    starters: ['I paid for...', 'The cheaper one would have...'],
  },
  deepen: {
    title: 'Model families',
    summary: 'Labs usually offer a family: a top model, a mid model and a small fast one, at very different prices. The real choice is often which size in a family, not which lab.',
  },
  notes: 'Practice prices (teyro_ai.MODELS): model-a $5/$15, model-b $0.50/$1.50, model-c $0.10/$0.30 per million tokens. Chat with the full help page: 321 in, 13 out. x 30,000: model-a 54.0, model-b 5.4, model-c 1.08. Closed frontier examples (named in Chapter 1): OpenAI GPT, Anthropic Claude, Google Gemini; real prices change, check the provider.',
};

export default lesson;
