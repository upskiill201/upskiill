import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 — Examples, features, labels: the words for rows, columns and the answer. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Examples, features, labels',
  summary: 'Halima opens her old clinic notebook. Every line is a patient: how long they waited, whether they got a reminder, how far they live, and whether they came. Miracle: "That page is a dataset. Let\'s name the parts."',
  minutes: 10,
  outcomes: [
    'Call each row an example',
    'Call the clues features and the answer the label',
    'Pick the label for a prediction problem',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One line from Halima\'s notebook',
      text: 'Tolu waited 21 days, got no reminder, lives 9 km away, and missed the appointment. Each patient is one example. The clues we know before the day are features. The answer we want to predict is the label.',
      hotspots: [
        { phrase: 'Each patient is one example', note: 'One row of the table. Also called a sample, a record or an observation.' },
        { phrase: 'The clues we know before the day are features', note: 'Waited 21 days, no reminder, 9 km. Features are the inputs the model uses to guess.' },
        { phrase: 'The answer we want to predict is the label', note: 'Missed: yes or no. The model learns from examples where the label is known.' },
        { phrase: 'before the day', note: 'This matters. A clue you only learn after the appointment can\'t help you guess beforehand. Chapter 4 is all about this trap.' },
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      caption: 'Halima\'s notebook as a table: features on the left, the label on the right.',
      code: 'name    wait_days  reminder  distance_km  |  missed\nAmina        3       yes          2        |  no\nTolu        21       no           9        |  yes\nMusa         5       yes          4        |  no\nChioma      30       no          12        |  yes',
    },
  ],
  apply: {
    scenario: 'Naming the parts of a dataset.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In Halima\'s table, what is the label?',
        options: [
          { text: 'missed' },
          { text: 'wait_days', why: 'That\'s a clue (a feature). The label is the answer we want to predict.' },
          { text: 'name', why: 'The name identifies the row. It isn\'t the answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "Tolu's features and label are stored below. Print only the label",
        starter: "wait_days = 21\nreminder = False\ndistance_km = 9\nmissed = True\n",
        solution: "wait_days = 21\nreminder = False\ndistance_km = 9\nmissed = True\nprint(missed)\n",
        hint: "The label is the answer: print(missed)",
        checks: [
          { message: "Print True", outputEquals: "True" },
          { message: "Print the label", codeIncludes: "print(missed)" },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Feature or label, when predicting "will this patient miss?"',
        groups: ['Feature (a clue)', 'Label (the answer)'],
        items: [
          { text: 'wait_days', group: 0 },
          { text: 'missed', group: 1 },
          { text: 'reminder', group: 0 },
          { text: 'distance_km', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to its meaning.',
        pairs: [
          ['Example', 'One row: one patient'],
          ['Feature', 'A clue the model uses'],
          ['Label', 'The answer to predict'],
          ['Dataset', 'All the examples together'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The table has 4 patients and 3 feature columns. How many examples?',
        options: [
          { text: '4' },
          { text: '3', why: 'Columns are features. Examples are rows.' },
          { text: '12', why: 'That counts cells, not patients.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Name the parts.',
        template: 'Each row is an [[1]]. The clues are [[2]]. The answer is the [[3]].',
        blanks: [['example'], ['features'], ['label']],
        distractors: ['model', 'guess'],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'I can add a column: "did the nurse call them after they missed?" More features is better, right?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'That one only exists after they\'ve missed. We have to guess before the day, so it can\'t be a feature.' },
          { text: 'Yes, add every column we have.', why: 'A clue from after the appointment would let the model cheat. Chapter 4.' },
          { text: 'Columns don\'t matter.', why: 'Choosing the right features matters a lot (Chapter 8).' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Folake wants to predict how many patients a clinic will see next week. What is the label?',
        options: [
          { text: 'The number of patients next week' },
          { text: 'The clinic\'s name', why: 'That might be a feature. The label is what we want to predict.' },
          { text: 'Whether it rains', why: 'Rain could be a clue. The answer is the patient count.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Emmanuel\'s plan is wrong?',
        lines: [
          'Each appointment is one example.',
          'wait_days and reminder are features.',
          'The label is the patient\'s phone number.',
          'The model learns from appointments where we know who came.',
        ],
        bug: 2,
        fix: 'The label is whether the patient missed the appointment.',
        explanation: 'The label is the answer you want to predict. A phone number isn\'t an answer, and it\'s private too.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'One word: the answer a model tries to predict is called the...',
        answers: ['label', 'target'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Known before the appointment, or only after?',
        groups: ['Known before', 'Only after'],
        items: [
          { text: 'How many days they waited', group: 0 },
          { text: 'Whether they came', group: 1 },
          { text: 'Distance from home', group: 0 },
          { text: 'How long the visit lasted', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Pick something you\'d like to predict (your bus being late, a match result). What would the label be? Name three features you\'d want.',
    starters: ['I\'d predict...', 'The features would be...'],
  },
  deepen: {
    title: 'Other names',
    summary: 'You\'ll see the same ideas under other names: features are also called inputs or variables (X), and the label is also called the target (y). In code, X is the features and y is the label.',
  },
  notes: 'Standard ML terms: example/sample, feature, label/target. The 12-patient notebook table is made up for Chapter 1 and stays the same across the chapter.',
};

export default lesson;
