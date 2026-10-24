import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: input vs output, speed, benchmarks, own-question tests. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: test, don\'t guess',
  summary: 'Output costs more than input, speed has two parts, benchmarks only shortlist, and the shop\'s own 30 questions put three models level. Quick check before the team gets clever with small models.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Cost, time and test models without notes', 'Choose by your own results'],
  learn: [
    {
      kind: 'story',
      title: 'Level pegging',
      beats: [
        { speaker: 'narrator', text: 'On the whiteboard: "20/30, 20/30, 20/30." Under it, Joel has written: "$54, $5.40, $1.08."' },
        { speaker: 'kavya', text: 'Fine. model-c. But I want to know why we miss the other ten.' },
        { speaker: 'arjun', text: 'Good question. Hold it for Chapter 6.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: test, don\'t guess.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the cost on model-a of a chat reading 321 tokens and writing 13',
        starter: 'from teyro_ai import cost\n',
        solution: 'from teyro_ai import cost\nprint(cost("model-a", 321, 13))\n',
        hint: 'cost("model-a", 321, 13)',
        checks: [{ message: 'Print 0.0018', outputEquals: '0.0018' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which is usually priced higher per token?',
        options: [
          { text: 'Input', why: 'Writing costs more than reading on most price lists.' },
          { text: 'Output' },
          { text: 'They\'re always equal', why: 'Usually not.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'model-c: 0.3 s first token, then 90 tokens at its card speed. Print the total time',
        starter: 'from teyro_ai import MODELS\n',
        solution: 'from teyro_ai import MODELS\nprint(0.3 + 90 / MODELS["model-c"]["speed"])\n',
        hint: '0.3 + 90 / MODELS["model-c"]["speed"]',
        checks: [{ message: 'Print 1.3', outputEquals: '1.3' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good evidence for choosing a model, or weak evidence?',
        groups: ['Good evidence', 'Weak evidence'],
        items: [
          { text: 'Score on our own 30 questions', group: 0 },
          { text: 'Being #1 on a leaderboard', group: 1 },
          { text: 'Cost at our real volume', group: 0 },
          { text: 'How famous the lab is', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Output costs 3x input', 'Keep replies short'],
          ['Time to first token', 'The wait customers feel'],
          ['Benchmarks', 'Good for a shortlist'],
          ['Our own questions', 'Make the decision'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the decision note is not supported by the test?',
        lines: [
          'All three models scored 20 of 30.',
          'model-c is the cheapest.',
          'model-a would have scored higher with more time.',
          'Decision: model-c, with model-b as backup.',
        ],
        bug: 2,
        fix: 'Delete it: the test shows no difference.',
        explanation: 'Guesses don\'t belong in a decision note.',
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Why keep model-b as a backup if model-c is just as good?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'No reason; drop it.', why: 'One supplier is a single point of failure.' },
          { text: 'To run both on every chat.', why: 'Only when the main one fails.' },
          { text: 'If model-c\'s host goes down or raises prices, we switch in minutes, to a model we\'ve already tested.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Mark an answer.',
        language: 'python',
        template: 'right += want.[[1]]() in text.[[2]]()',
        blanks: [['lower'], ['lower']],
        distractors: ['upper', 'strip'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import cost\nprint(round(cost("model-c", 321, 13) * 30000, 2))',
        language: 'python',
        options: [
          { text: '1.08' },
          { text: '5.4', why: 'That\'s model-b.' },
          { text: '54.0', why: 'That\'s model-a.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Joel\'s test.',
        lines: ['Load the 30 questions', 'Ask each model with the help page', 'Mark each answer right or wrong', 'Compare scores and costs', 'Pick the cheapest that scores as well'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which model did the team choose as the default? (model-a, model-b or model-c)',
        answers: ['model-c', 'c'],
        placeholder: 'A model',
      },
    ],
  },
  reflect: {
    prompt: 'Kavya wants to know why ten answers are wrong. Why is "why are we wrong?" a more useful question than "which model is best?"',
    starters: ['It\'s more useful because...', 'It leads to...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 6-9. cost(model-a, 321, 13) = 0.0018; model-c 0.3 + 90/90 = 1.3; model-c monthly 1.08.',
};

export default lesson;
