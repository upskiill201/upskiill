import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 — Two seconds after Send: one message's journey through every layer. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Two seconds after Send',
  summary: 'Joel asks the question that opens up the whole stack: when a customer types "Where is my order R-1042?" and presses Send, what actually happens before the answer appears?',
  minutes: 12,
  outcomes: [
    'Follow one message through every layer of the stack',
    'Know that text becomes tokens before a model sees it',
    'Count the tokens in a message with the practice toolkit',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'One message, top to bottom and back',
      steps: [
        { title: '1. The app', body: 'The chat box on the shop\'s website sends the message to Ask Rao\'s server. This is the application layer.' },
        { title: '2. Orchestration', body: 'Ask Rao\'s code decides what to do: does this need the shop\'s documents? A live order lookup? Both? It builds the prompt.' },
        { title: '3. Data and retrieval', body: 'For an order question it looks up R-1042 in the order records. For a policy question it finds the right paragraph of the help page.' },
        { title: '4. The model', body: 'The prompt, now with the facts in it, is cut into tokens and sent to the model, which writes a reply one token at a time.', code: 'from teyro_ai import count_tokens\nprint(count_tokens("Where is my order R-1042?"))   # 13', language: 'python' },
        { title: '5. Compute', body: 'The model runs on chips (usually GPUs) in a data centre, or on a smaller machine. This is where the money and the speed come from.' },
        { title: '6. Back up, and recorded', body: 'The reply travels back to the chat box. On the way, good systems check it, log it and record what it cost. That\'s the evaluation and governance layer.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Count the tokens',
      caption: 'The model never sees letters, only tokens.',
      code: 'from teyro_ai import tokenize, count_tokens\n\nmessage = "Where is my order R-1042?"\nprint(tokenize(message))\nprint(count_tokens(message))\n',
      challenge: 'Try a longer message. Roughly how many letters make one token?',
    },
  ],
  apply: {
    scenario: 'The journey of one message.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the journey in order.',
        lines: [
          'The customer presses Send in the chat box',
          'Ask Rao\'s code decides what the question needs',
          'It looks up the order or the right policy',
          'The model writes a reply',
          'The reply is checked, logged and shown',
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many practice tokens "Where is my order R-1042?" is',
        starter: 'from teyro_ai import count_tokens\n\nmessage = "Where is my order R-1042?"\n',
        solution: 'from teyro_ai import count_tokens\n\nmessage = "Where is my order R-1042?"\nprint(count_tokens(message))\n',
        hint: 'print(count_tokens(message))',
        checks: [{ message: 'Print 13', outputEquals: '13' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to its layer.',
        pairs: [
          ['The chat box on the website', 'Application'],
          ['Deciding what the question needs', 'Orchestration'],
          ['Finding the right policy paragraph', 'Data and retrieval'],
          ['Writing the reply', 'Model'],
          ['GPUs in a data centre', 'Compute'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the model actually receive?',
        options: [
          { text: 'Tokens: the prompt cut into small pieces' },
          { text: 'The customer\'s screen', why: 'The model only receives text, turned into tokens.' },
          { text: 'The whole shop database', why: 'Only what the orchestration layer puts in the prompt.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import count_tokens\nprint(count_tokens("Hi!"))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '3', why: '"Hi" is one token and "!" is another.' },
          { text: '1', why: 'The "!" is its own token.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Why does it matter how many tokens a message is?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Models are priced and limited by tokens. More tokens means more cost and more time.' },
          { text: 'It doesn\'t matter at all.', why: 'Tokens drive cost, speed and how much fits in.' },
          { text: 'Tokens are just for fun.', why: 'They\'re how the model reads text, and how it\'s billed.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does this happen on the way down, or on the way back up?',
        groups: ['Way down', 'Way back up'],
        items: [
          { text: 'Building the prompt', group: 0 },
          { text: 'Checking the reply is safe', group: 1 },
          { text: 'Looking up the order', group: 0 },
          { text: 'Recording what it cost', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Count the tokens.',
        language: 'python',
        template: 'from teyro_ai import [[1]]\nprint(count_tokens([[2]]))',
        blanks: [['count_tokens'], ['message']],
        distractors: ['tokens', 'len'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence about the journey is wrong?',
        lines: [
          'The app sends the message to Ask Rao\'s server.',
          'Orchestration decides what the question needs.',
          'The model already knows every order in the shop.',
          'The reply is checked before the customer sees it.',
        ],
        bug: 2,
        fix: 'The order is looked up and put into the prompt.',
        explanation: 'The model only knows what it\'s given. Order details must be looked up and added.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What are the small pieces of text a model reads called? (one word)',
        answers: ['tokens', 'token'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Before today, what did you imagine happened when you pressed Send to an AI? What surprised you about the real journey?',
    starters: ['I imagined...', 'I was surprised that...'],
  },
  deepen: {
    title: 'Two seconds',
    summary: 'All six steps usually finish in a second or two. Most of that time is the model writing tokens, which is why chapter 9 shows replies appearing word by word.',
  },
  notes: 'teyro_ai.count_tokens("Where is my order R-1042?") = 13 (practice tokenizer: words split in 4-letter pieces, each digit and symbol one token). count_tokens("Hi!") = 2. Six layers per docs/originals/the-ai-stack-outline.md.',
};

export default lesson;
