import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: Samuel, training vs predicting, models as guess-makers, the rule in code. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: rules in code',
  summary: 'The sticky note is now five lines of Python, with a distance clue that catches Obi. Halima knows where the name came from and what "training" means. Quick check before she learns to measure a model.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain training, predicting and models without notes', 'Read and change a rule written in Python'],
  learn: [
    {
      kind: 'story',
      title: 'Five lines',
      beats: [
        { speaker: 'narrator', text: 'Halima runs the rule for every patient on the notebook page. It now gets all 12 right.' },
        { speaker: 'miracle', text: 'All 12 on the page you built it from. The real question is new patients. Hold that thought.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: models and rules.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which step uses examples where the answer is already known?',
        options: [
          { text: 'Training' },
          { text: 'Predicting', why: 'Predicting is for new examples.' },
          { text: 'Printing', why: 'Printing just shows a result.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'wait_days = 16\nreminder = False\n\nif wait_days > 14 and not reminder:\n    print("Likely to miss")\nelse:\n    print("Likely to come")',
        language: 'python',
        options: [
          { text: 'Likely to miss' },
          { text: 'Likely to come', why: '16 > 14 and no reminder.' },
          { text: 'An error', why: 'It runs.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Set reminder to True so the model predicts "Likely to come"',
        starter: 'wait_days = 21\nreminder = False\n\nif wait_days > 14 and not reminder:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        solution: 'wait_days = 21\nreminder = True\n\nif wait_days > 14 and not reminder:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        hint: 'reminder = True',
        checks: [
          { message: 'Print Likely to come', outputEquals: 'Likely to come' },
          { message: 'reminder is True', expr: 'reminder == True' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its meaning.',
        pairs: [
          ['Model', 'Features in, prediction out'],
          ['Training', 'Learning from labelled examples'],
          ['Predicting', 'Guessing for new examples'],
          ['0.8', 'About 8 in 10 like this'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Arthur Samuel\'s program learned to play which game?',
        answers: ['checkers', 'draughts'],
        placeholder: 'A game',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the wrong sentence.',
        lines: [
          'Samuel\'s program improved by playing many games.',
          'A model\'s prediction is a guess.',
          'We train a model on tomorrow\'s appointments.',
          'A hand-written rule is a good place to start.',
        ],
        bug: 2,
        fix: 'We train on past appointments, then predict tomorrow\'s.',
        explanation: 'Tomorrow has no answers yet, so it can only be predicted.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The distance clue.',
        language: 'python',
        template: 'if (wait_days > 14 and not reminder) [[1]] distance_km > 12:',
        blanks: [['or']],
        distractors: ['and', 'not'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Certain, or a guess?',
        groups: ['Certain', 'A guess'],
        items: [
          { text: 'Tolu waited 21 days (it\'s in the booking)', group: 0 },
          { text: 'Tolu will probably miss', group: 1 },
          { text: 'A 0.7 chance of missing', group: 1 },
          { text: 'Tolu got no reminder (we checked)', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: '12 out of 12 now. Done, right?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'It\'s 12 out of 12 on the page I built it from. I need to try it on patients it has never seen.' },
          { text: 'Yes, it\'s perfect.', why: 'Perfect on its own examples proves very little.' },
          { text: 'No, it\'s useless.', why: 'It might be good. We have to test it fairly.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines.',
        language: 'python',
        lines: ['wait_days = 9', 'reminder = False', 'distance_km = 14', 'if (wait_days > 14 and not reminder) or distance_km > 12:', '    print("Likely to miss")'],
      },
      {
        kind: 'mcq',
        prompt: 'Bisi has time for 2 calls. Model chances: Amaka 0.9, Kunle 0.3, Rita 0.7. Who does she call?',
        options: [
          { text: 'Amaka and Rita' },
          { text: 'Kunle and Rita', why: 'Kunle is the least likely to miss.' },
          { text: 'Amaka and Kunle', why: 'Rita (0.7) is more likely to miss than Kunle (0.3).' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The two words for training and guessing in code: fit and...',
        answers: ['predict'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Miracle says 12 out of 12 on your own page proves very little. Why do you think she\'s so cautious?',
    starters: ['She\'s cautious because...', 'A fairer test would be...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 6-9.',
};

export default lesson;
