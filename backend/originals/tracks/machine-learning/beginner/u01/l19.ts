import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 19 — The plan: the road from v0.1 (a rule) to v1.0 (a model the clinics trust). */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The plan',
  summary: 'Miracle and Halima sketch the road ahead on the whiteboard: one model, improved chapter by chapter, from a sticky note to the board meeting. Every step has a version number.',
  minutes: 10,
  outcomes: [
    'See the whole journey from v0.1 to v1.0',
    'Know which chapter answers which question',
    'Know you can jump ahead if you already know a part',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>The plan, as Miracle wrote it on the whiteboard. Each chapter makes the same predictor better:</p><ul><li><strong>v0.1</strong> (this chapter): a rule found by hand, written in Python.</li><li><strong>v0.2</strong>: the Python and pandas you need, and a clean table of bookings.</li><li><strong>v0.3</strong>: a predictor that finds similar past patients ("neighbours").</li><li><strong>v0.4</strong>: a fair test, and the leak that fooled Chidi.</li><li><strong>v0.5–v0.6</strong>: real models with scikit-learn: predicting numbers, then yes or no.</li><li><strong>v0.7</strong>: honest scores: baselines, precision and recall.</li><li><strong>v0.8–v0.95</strong>: better features, no overfitting, and forests of trees.</li><li><strong>v0.97</strong>: finding kinds of clinics, with no labels.</li><li><strong>v0.99</strong>: fair and safe for every clinic and every patient.</li><li><strong>v1.0</strong>: the model, documented and presented at the board meeting.</li></ul><p><strong>Already know some of this?</strong> Every chapter on the map has a <strong>Jump here</strong> test. Pass it and that chapter unlocks. If you already know pandas, you can skip Chapter 2.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Version 0.1',
      caption: 'The whole of v0.1, for one patient.',
      code: 'wait_days = 19\nreminder = False\n\nif wait_days > 14 and not reminder:\n    prediction = "Likely to miss"\nelse:\n    prediction = "Likely to come"\n\nprint(f"Predictor v0.1: {prediction}")\n',
      challenge: 'Change it to a patient who got a reminder.',
    },
  ],
  apply: {
    scenario: 'The road to v1.0.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the version to what it adds.',
        pairs: [
          ['v0.1', 'A rule found by hand'],
          ['v0.4', 'A fair test'],
          ['v0.7', 'Honest scores'],
          ['v1.0', 'The board meeting'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put these steps in the order the course takes them.',
        lines: ['Find a rule by hand', 'Clean the data', 'Set up a fair test', 'Train real models', 'Check fairness', 'Present it'],
      },
      {
        kind: 'mcq',
        prompt: 'You already use pandas every day. What can you do?',
        options: [
          { text: 'Nothing: everyone must do every lesson', why: 'Jump here tests let you skip what you already know.' },
          { text: 'Take the Jump here test for the next chapter and skip ahead if you pass' },
          { text: 'Skip straight to v1.0', why: 'You can jump chapter by chapter by passing each one\'s test.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'wait_days = 19\nreminder = False\n\nif wait_days > 14 and not reminder:\n    prediction = "Likely to miss"\nelse:\n    prediction = "Likely to come"\n\nprint(f"Predictor v0.1: {prediction}")',
        language: 'python',
        options: [
          { text: 'Predictor v0.1: Likely to miss' },
          { text: 'Predictor v0.1: Likely to come', why: '19 > 14 and no reminder.' },
          { text: 'Predictor v0.1: prediction', why: 'The {} put the value of prediction in the text.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Set reminder to True and print "Predictor v0.1: Likely to come"',
        starter: 'wait_days = 19\nreminder = False\n\nif wait_days > 14 and not reminder:\n    prediction = "Likely to miss"\nelse:\n    prediction = "Likely to come"\n\nprint(f"Predictor v0.1: {prediction}")\n',
        solution: 'wait_days = 19\nreminder = True\n\nif wait_days > 14 and not reminder:\n    prediction = "Likely to miss"\nelse:\n    prediction = "Likely to come"\n\nprint(f"Predictor v0.1: {prediction}")\n',
        hint: 'reminder = True',
        checks: [{ message: 'Print Predictor v0.1: Likely to come', outputEquals: 'Predictor v0.1: Likely to come' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the course?',
        groups: ['Data and testing', 'Models'],
        items: [
          { text: 'Cleaning the bookings table', group: 0 },
          { text: 'Nearest neighbours', group: 1 },
          { text: 'Catching a leak', group: 0 },
          { text: 'Random forests', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Why not skip to the fancy forest model now?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Sure, let\'s skip everything.', why: 'Skipping the fair test is how teams fool themselves.' },
          { text: 'Because a forest trained on messy data with an unfair test would fool us. The early steps make the later scores trustworthy.' },
          { text: 'Forests don\'t exist.', why: 'They do: Chapter 10.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea behind the plan.',
        template: 'One [[1]], made better every [[2]].',
        blanks: [['model', 'predictor'], ['chapter']],
        distractors: ['robot', 'day'],
      },
      {
        kind: 'mcq',
        prompt: 'From which chapter does the course use scikit-learn?',
        options: [
          { text: 'Chapter 1', why: 'Chapter 1 uses plain rules and a little Python.' },
          { text: 'Never', why: 'It\'s the main tool from Chapter 5.' },
          { text: 'Chapter 5' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version is Halima\'s predictor at the end of Chapter 1?',
        answers: ['v0.1', '0.1'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'Which version on the plan are you most curious about? Why that one?',
    starters: ['I\'m most curious about...', 'Because...'],
  },
  deepen: {
    title: 'Practice data',
    summary: 'From Chapter 2 you\'ll work with 2,400 practice appointments at 8 clinics. The data is made up, so no real patient is in it, but it\'s built to behave like the real thing, messy parts included.',
  },
  notes: 'Roadmap mirrors docs/originals/machine-learning-for-beginners-outline.md. Jump ahead: every locked Original chapter has a test-out. appointments.csv: 2,400 rows, 8 clinics, made up.',
};

export default lesson;
