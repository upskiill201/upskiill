import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7 — Speed and latency: time to first token and total time. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Speed and latency',
  summary: 'Joel times the three models properly. Two numbers matter: how long until the first word appears, and how long until the reply is finished. They don\'t always point the same way.',
  minutes: 11,
  outcomes: [
    'Tell time to first token from total time',
    'Work out total time for a reply',
    'Choose a model by the speed your customers need',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to measure speed',
      before: {
        label: 'Time to first token',
        text: 'How long before the first word appears.\nIncludes the network trip and reading the whole prompt.\nThis is the wait customers feel most.\nLong prompts make it worse.',
      },
      after: {
        label: 'Total time',
        text: 'First token, plus writing the rest.\nTotal = first-token time + output tokens ÷ tokens per second.\nShort replies keep it low.\nStreaming (Chapter 9) hides most of it.',
      },
      notes: [
        'Practice example on model-b: 0.4 s to the first token, then 60 tokens at 120 a second = 0.9 s in total.',
        'A big model can have a slow first token AND slow writing. A small one is often fast at both.',
        'Measure with your own prompts: speed depends on the prompt length, the provider and how busy it is.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Total time',
      caption: 'Practice first-token times (made up) plus writing time from the cards.',
      code: 'from teyro_ai import MODELS\n\nfirst_token = {"model-a": 0.8, "model-b": 0.4, "model-c": 0.3}\nreply_tokens = 60\nfor name, ttft in first_token.items():\n    total = ttft + reply_tokens / MODELS[name]["speed"]\n    print(f"{name}: {total:.2f} s")\n',
      challenge: 'Make the reply 300 tokens. Which model is fastest now?',
    },
  ],
  apply: {
    scenario: 'How fast does it feel?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'model-b: 0.4 s to the first token, then 60 tokens at its card speed. Print the total time',
        starter: 'from teyro_ai import MODELS\n\nfirst_token = 0.4\nreply_tokens = 60\n',
        solution: 'from teyro_ai import MODELS\n\nfirst_token = 0.4\nreply_tokens = 60\nprint(first_token + reply_tokens / MODELS["model-b"]["speed"])\n',
        hint: 'first_token + reply_tokens / MODELS["model-b"]["speed"]',
        checks: [{ message: 'Print 0.9', outputEquals: '0.9' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which wait do customers feel most?',
        options: [
          { text: 'How long the model took to train', why: 'They never see that.' },
          { text: 'Time to first token: how long before anything appears' },
          { text: 'The GPU\'s power use', why: 'That affects cost, not what they feel.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the measure to what it includes.',
        pairs: [
          ['Time to first token', 'Network trip and reading the prompt'],
          ['Writing time', 'Output tokens ÷ tokens per second'],
          ['Total time', 'Both added together'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes the first token come sooner, or later?',
        groups: ['Sooner', 'Later'],
        items: [
          { text: 'A shorter prompt', group: 0 },
          { text: 'Pasting the whole product list', group: 1 },
          { text: 'A smaller model', group: 0 },
          { text: 'A very busy provider', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'model-a is only a bit slower. Customers won\'t notice.',
        prompt: "Joel's best reply?",
        options: [
          { text: 'True, nobody notices seconds.', why: 'On mobile, every second loses some people.' },
          { text: 'Speed doesn\'t matter for shops.', why: 'Slow replies lose customers.' },
          { text: 'With 300-token replies it\'s 5.8 s against 2.9 on model-b. On a phone, that gap is when people give up. Let\'s measure with real prompts.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(0.8 + 60 / 60)',
        language: 'python',
        options: [
          { text: '1.8' },
          { text: '1.0', why: 'Add the 0.8 s first-token time.' },
          { text: '60.8', why: 'Division happens before addition: 60 / 60 = 1.0.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The total-time formula.',
        template: 'total = first-token time + output tokens [[1]] tokens per [[2]]',
        blanks: [['/', '÷'], ['second']],
        distractors: ['*', 'hour'],
      },
      {
        kind: 'findBug',
        prompt: 'This ignores the wait before the first token. Which line?',
        language: 'python',
        lines: ['first_token = 0.4', 'speed = 120', 'total = 60 / speed', 'print(total)'],
        bug: 2,
        fix: 'total = first_token + 60 / speed',
        explanation: 'Add the time before the first token appears.',
      },
      {
        kind: 'writeCode',
        prompt: 'model-a: 0.8 s first token, 300-token reply at its card speed. Print the total, rounded to 1 place',
        starter: 'from teyro_ai import MODELS\n',
        solution: 'from teyro_ai import MODELS\nprint(round(0.8 + 300 / MODELS["model-a"]["speed"], 1))\n',
        hint: '0.8 + 300 / MODELS["model-a"]["speed"]',
        checks: [{ message: 'Print 5.8', outputEquals: '5.8' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does TTFT stand for? (time to first ...)',
        answers: ['token', 'time to first token'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which feels faster: a page that shows something instantly and fills in, or one that shows everything after two seconds? Why?',
    starters: ['It feels faster when...', 'Because...'],
  },
  deepen: {
    title: 'Latency budgets',
    summary: 'Teams set a "latency budget": for example, first words within 1 second, finished within 3. Every layer of the stack gets a share. Chapter 9 builds one for Ask Rao.',
  },
  notes: 'Practice first-token times (made up): model-a 0.8 s, model-b 0.4 s, model-c 0.3 s; speeds from teyro_ai.MODELS (60, 120, 90 tok/s). model-b 60 tokens: 0.4 + 0.5 = 0.9; model-a 300 tokens: 0.8 + 5.0 = 5.8; model-b 300: 0.4 + 2.5 = 2.9. TTFT = time to first token.',
};

export default lesson;
